import assert from "node:assert/strict";
import { test } from "node:test";
import { readFile, rm, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";
import OpenAI from "openai";
import { Redis } from "@upstash/redis";
import { analyzeInquiry } from "../src/lib/inquiry/analyze";
import { reconcileInquiry } from "../src/lib/inquiry/reconcile";
import { getInquiryConfig, isUnlimitedLocalTesting } from "../src/lib/inquiry/config";
import { InquiryError } from "../src/lib/inquiry/errors";
import { createInquiryHandler } from "../src/lib/inquiry/handler";
import { checkResponsesAccess } from "../src/lib/inquiry/check-access";
import { COOLDOWN_MS, FileRateStore, RedisRateStore, WINDOW_MS, getVisitor, reserveAttempt, type RateState, type RateStore } from "../src/lib/inquiry/rate-limit";
import { INQUIRY_MODELS, inquiryRequestSchema, inquiryResultSchema, inquirySuccessSchema, type InquiryResult } from "../src/lib/inquiry/schema";
import { inquiryFixtures } from "./inquiry-fixtures";

const config = () => getInquiryConfig({ OPENAI_API_KEY: "test-key-never-use-for-real-requests", INQUIRY_RATE_LIMIT_SECRET: "a".repeat(64) });
class MemoryStore implements RateStore {
  state: RateState = { attempts: {}, leases: {} };
  async transaction<T>(operation: (state: RateState) => T) { return operation(this.state); }
}
const start = 1_790_000_000_000;
function request(body: unknown, extra: Record<string, string> = {}) {
  return new Request("http://localhost:3000/api/analyze-inquiry/", {
    method: "POST", headers: { "content-type": "application/json", origin: "http://localhost:3000", ...extra }, body: JSON.stringify(body),
  });
}
const goodResult = () => reconcileInquiry(inquiryFixtures[0].extraction, inquiryFixtures[0].inquiry, "de");
function wireResponse(extraction: unknown, options: { refusal?: boolean; incomplete?: boolean } = {}) {
  return Response.json({
    id: "resp_test", object: "response", created_at: 1_790_000_000, model: "gpt-5-nano",
    status: options.incomplete ? "incomplete" : "completed", error: null,
    incomplete_details: options.incomplete ? { reason: "max_output_tokens" } : null,
    output: [{ id: "msg_test", type: "message", role: "assistant", status: "completed", content: [options.refusal ? { type: "refusal", refusal: "Test refusal" } : { type: "output_text", text: JSON.stringify(extraction), annotations: [] }] }],
  });
}

for (const model of INQUIRY_MODELS) {
  for (const [index, fixture] of inquiryFixtures.entries()) {
    test(`${model}: official SDK parses fictional inquiry ${index + 1} with strict schema`, async () => {
      let calls = 0;
      const client = new OpenAI({ apiKey: "test-key-not-real", maxRetries: 0, fetch: async (_url, init) => {
        calls++;
        const payload = JSON.parse(String(init?.body));
        assert.equal(payload.model, model);
        assert.equal(payload.store, false);
        assert.equal(payload.max_output_tokens, 2200);
        assert.equal(payload.text.format.type, "json_schema");
        assert.equal(payload.text.format.strict, true);
        const missingSchema = payload.text.format.schema.properties.missingInformation;
        assert.equal(missingSchema.maxItems, 15);
        const missingPattern = new RegExp(missingSchema.items.pattern);
        assert.equal(missingPattern.test("x".repeat(300)), true);
        assert.equal(missingPattern.test("x".repeat(306)), false);
        assert.equal(payload.input[0].content, fixture.inquiry);
        assert.equal(payload.instructions.includes("untrusted DATA"), true);
        assert.deepEqual(payload.reasoning, model === "gpt-5-nano" ? { effort: "minimal" } : undefined);
        return wireResponse(fixture.extraction);
      } });
      const result = await analyzeInquiry({ inquiry: fixture.inquiry, locale: "de" }, model, client);
      assert.equal(calls, 1);
      assert.equal(result.quantity, fixture.extraction.quantity);
      assert.equal(result.thicknessMm, fixture.extraction.thicknessMm);
      assert.equal(result.deliveryWish, fixture.extraction.deliveryWish);
      assert.equal(result.drawingMentioned, fixture.extraction.drawingMentioned);
      assert.equal(result.material, fixture.extraction.material);
      assert.ok(inquiryResultSchema.safeParse(result).success);
      assert.ok(!("evidence" in result));
      if (index === 1) assert.match(result.summary, /ungefähr/);
    });
  }
}

test("unsupported fields, guessed numbers, invented material, prices and drop-off deadline are not displayed", () => {
  const fixture = inquiryFixtures[2];
  const extraction: InquiryResult = {
    ...fixture.extraction, quantity: 1, material: "Titan", thicknessMm: 99,
    deliveryWish: "nächste Woche vorbeibringen", unit: "999 Euro", summary: "Angebotspreis: 999 Euro. Zeichnung gelesen.",
  };
  const result = reconcileInquiry(extraction, fixture.inquiry, "de");
  assert.equal(result.quantity, null);
  assert.equal(result.unit, null);
  assert.equal(result.material, "Stahl");
  assert.equal(result.thicknessMm, null);
  assert.equal(result.deliveryWish, null);
  assert.doesNotMatch(result.summary, /999|Preis|gelesen|Titan/);
  assert.ok(result.missingInformation.some(value => /Liefer.*termin/.test(value)));
  assert.equal(inquiryResultSchema.safeParse({ ...goodResult(), price: 999 }).success, false);
});

test("input schema rejects blank, wrong types, >1000 characters, extra fields and unapproved models", () => {
  for (const value of [null, [], {}, { inquiry: " " }, { inquiry: 10 }, { inquiry: "x".repeat(1001) }, { inquiry: "x", model: "gpt-5-mini" }, { inquiry: "x", secret: "unexpected" }]) assert.equal(inquiryRequestSchema.safeParse(value).success, false);
  assert.equal(inquiryRequestSchema.safeParse({ inquiry: "x".repeat(1000) }).success, true);
});

test("server configuration only permits the two models and refuses unsafe public operation", () => {
  for (const model of INQUIRY_MODELS) assert.equal(getInquiryConfig({ ...config(), OPENAI_MODEL: model }).OPENAI_MODEL, model);
  assert.throws(() => getInquiryConfig({ ...config(), OPENAI_MODEL: "gpt-6" }), InquiryError);
  assert.throws(() => getInquiryConfig({ ...config(), OPENAI_API_KEY: "" }), InquiryError);
  assert.throws(() => getInquiryConfig({ ...config(), INQUIRY_LOCAL_ONLY: "false" }), InquiryError);
  assert.throws(() => getInquiryConfig({ ...config(), INQUIRY_LIMITER: "redis" }), InquiryError);
});

test("invalid HTTP requests never reach OpenAI or consume attempts", async () => {
  const store = new MemoryStore();
  let calls = 0;
  const handler = createInquiryHandler({ config, store: () => store, analyze: async () => { calls++; return goodResult(); } });
  for (const body of [{ inquiry: "" }, { inquiry: "x".repeat(1001) }, { inquiry: 12 }, { inquiry: "test", model: "other" }]) assert.equal((await handler(request(body))).status, 400);
  assert.equal((await handler(request({ inquiry: "x" }, { origin: "https://attacker.example" }))).status, 403);
  assert.equal((await handler(request({ inquiry: "x" }, { "sec-fetch-site": "cross-site" }))).status, 403);
  assert.equal((await handler(request({ inquiry: "x" }, { "content-type": "text/plain" }))).status, 415);
  assert.equal((await handler(request({ inquiry: "x" }, { "content-length": "9000" }))).status, 413);
  assert.equal((await handler(new Request("http://localhost:3000/api/analyze-inquiry/", { method: "POST", headers: { "content-type": "application/json" }, body: "not json" }))).status, 400);
  assert.equal((await handler(request({ inquiry: "x".repeat(9000) }))).status, 413);
  assert.equal(calls, 0);
  assert.deepEqual(store.state.attempts, {});
});

test("API returns real analyzer results for all three fixtures, quota metadata and safe cookies", async () => {
  const store = new MemoryStore();
  let now = start;
  const handler = createInquiryHandler({ config, store: () => store, now: () => now, analyze: async input => {
    const fixture = inquiryFixtures.find(item => item.inquiry === input.inquiry)!;
    return reconcileInquiry(fixture.extraction, input.inquiry, input.locale);
  } });
  for (const [index, fixture] of inquiryFixtures.entries()) {
    const response = await handler(request({ inquiry: fixture.inquiry, model: INQUIRY_MODELS[index % 2] }));
    assert.equal(response.status, 200);
    assert.match(response.headers.get("set-cookie")!, /HttpOnly; SameSite=Strict/);
    assert.match(response.headers.get("cache-control")!, /no-store/);
    const payload = await response.json();
    assert.equal(payload.result.quantity, fixture.extraction.quantity);
    assert.equal(payload.remainingAttempts, 4 - index);
    assert.equal(payload.resetAt, start + WINDOW_MS);
    assert.doesNotMatch(JSON.stringify(payload), /test-key|aaaaaaa|evidence/);
    now += COOLDOWN_MS;
  }
});

test("five attempts persist across cookie/model/header changes and expire only after 24 hours", async () => {
  const store = new MemoryStore();
  let now = start;
  let calls = 0;
  const handler = createInquiryHandler({ config, store: () => store, now: () => now, analyze: async () => { calls++; return goodResult(); } });
  for (let index = 0; index < 7; index++) {
    const response = await handler(request({ inquiry: inquiryFixtures[0].inquiry, model: INQUIRY_MODELS[index % 2] }, { "x-forwarded-for": `10.0.0.${index}`, cookie: `diovis_inquiry_visitor=forged-${index}` }));
    assert.equal(response.status, index < 5 ? 200 : 429);
    if (index >= 5) {
      assert.equal((await response.json()).error, "RATE_LIMITED");
      assert.ok(Number(response.headers.get("retry-after")) > 0);
    }
    now += COOLDOWN_MS;
  }
  assert.equal(calls, 5);
  now = start + WINDOW_MS;
  assert.equal((await handler(request({ inquiry: inquiryFixtures[0].inquiry }))).status, 200);
});

test("global cap protects the key across different visitors and trusted IPs", () => {
  const state: RateState = { attempts: {}, leases: {} };
  for (let index = 0; index < 5; index++) {
    const reservation = reserveAttempt(state, `visitor-${index}`, `ip-${index}`, 5, start + index * COOLDOWN_MS);
    delete state.leases[reservation.token];
  }
  assert.throws(() => reserveAttempt(state, "new-visitor", "new-ip", 5, start + 90_000), (error: unknown) => error instanceof InquiryError && error.code === "GLOBAL_LIMIT");
});

test("origin check uses actual destination Host and local-only mode rejects public Host", async () => {
  const handler = createInquiryHandler({ config, store: () => new MemoryStore(), analyze: async () => goodResult() });
  assert.equal((await handler(request({ inquiry: "test" }, { host: "127.0.0.1:3000", origin: "http://127.0.0.1:3000" }))).status, 200);
  assert.equal((await handler(request({ inquiry: "test" }, { host: "public.example", origin: "http://public.example" }))).status, 403);
});

test("minimum spacing, concurrent lease cap and expired leases are enforced", () => {
  const state: RateState = { attempts: {}, leases: {} };
  reserveAttempt(state, "a", "a", 25, start);
  assert.throws(() => reserveAttempt(state, "a", "a", 25, start + 1), (error: unknown) => error instanceof InquiryError && error.code === "BUSY");
  reserveAttempt(state, "b", "b", 25, start + 1);
  assert.throws(() => reserveAttempt(state, "c", "c", 25, start + 2), (error: unknown) => error instanceof InquiryError && error.code === "BUSY");
  assert.ok(reserveAttempt(state, "c", "c", 25, start + 60_001));
});

test("upstream failures consume budget and never return fake results or raw errors", async () => {
  const store = new MemoryStore();
  const handler = createInquiryHandler({ config, store: () => store, now: () => start, analyze: async () => { throw new Error("OPENAI_API_KEY=do-not-leak"); } });
  const response = await handler(request({ inquiry: inquiryFixtures[0].inquiry }));
  assert.equal(response.status, 502);
  const payload = await response.json();
  assert.deepEqual(payload, { error: "UPSTREAM_UNAVAILABLE", remainingAttempts: 4, resetAt: start + WINDOW_MS });
  assert.equal(store.state.attempts.global.length, 1);
  assert.equal(Object.keys(store.state.leases).length, 0);
});

test("missing secrets and unavailable quota storage fail closed without contacting OpenAI", async () => {
  let calls = 0;
  for (const configFn of [() => getInquiryConfig({}), config]) {
    const handler = createInquiryHandler({ config: configFn, store: () => ({ transaction: async () => { throw new Error("offline"); } }), analyze: async () => { calls++; return goodResult(); } });
    const response = await handler(request({ inquiry: "fiktiv" }));
    assert.equal(response.status, 503);
    assert.ok(["NOT_CONFIGURED", "PROTECTION_UNAVAILABLE"].includes((await response.json()).error));
  }
  assert.equal(calls, 0);
});

test("signed visitor identity cannot be forged, including malformed Unicode signatures", () => {
  const secret = config().INQUIRY_RATE_LIMIT_SECRET;
  const visitor = getVisitor(request({ inquiry: "test" }), secret, start);
  const cookie = visitor.cookie!.split(";")[0];
  assert.equal(getVisitor(request({}, { cookie }), secret, start + 1).id, visitor.id);
  assert.notEqual(getVisitor(request({}, { cookie: cookie.slice(0, -64) + "b".repeat(64) }), secret, start + 1).id, visitor.id);
  assert.notEqual(getVisitor(request({}, { cookie }), secret, start + WINDOW_MS).id, visitor.id);
});

test("persistent file quotas survive new store instances and corrupt state fails closed", async () => {
  const directory = path.join(process.cwd(), ".diovis", `test-${randomUUID()}`);
  try {
    const first = new FileRateStore(directory);
    await first.transaction(state => { const reserved = reserveAttempt(state, "v", "n", 25, start); delete state.leases[reserved.token]; });
    const second = new FileRateStore(directory);
    await second.transaction(state => { assert.equal(state.attempts.global.length, 1); });
    assert.doesNotMatch(await readFile(path.join(directory, "inquiry-limits.json"), "utf8"), /Haltewinkel|OPENAI/);
    await writeFile(path.join(directory, "inquiry-limits.json"), "corrupt");
    await assert.rejects(() => second.transaction(() => undefined));
    await writeFile(path.join(directory, "inquiry-limits.lock"), "locked");
    await assert.rejects(() => second.transaction(() => undefined), (error: unknown) => error instanceof InquiryError && error.code === "BUSY");
  } finally {
    assert.equal(path.dirname(directory), path.join(process.cwd(), ".diovis"));
    await rm(directory, { recursive: true, force: true });
  }
});

test("Redis compare-and-set prevents concurrent reservations from losing quota updates", async () => {
  let stored: string | null = null;
  const redis = {
    get: async () => stored,
    eval: async (_script: string, _keys: string[], args: string[]) => {
      if ((stored ?? "") !== args[0]) return 0;
      stored = args[1];
      return 1;
    },
  } as unknown as Redis;
  const store = new RedisRateStore(redis);
  await Promise.allSettled(Array.from({ length: 12 }, (_, index) => store.transaction(state => {
    const reservation = reserveAttempt(state, `v-${index}`, `n-${index}`, 5, start + index * COOLDOWN_MS);
    delete state.leases[reservation.token];
    return reservation;
  })));
  assert.ok(stored);
  const state = JSON.parse(stored!);
  assert.ok(state.attempts.global.length <= 5);
  assert.ok(state.attempts.global.length > 0);
});

for (const [name, response] of [
  ["refusal", () => wireResponse(null, { refusal: true })],
  ["incomplete output", () => wireResponse(inquiryFixtures[0].extraction, { incomplete: true })],
  ["invalid output", () => wireResponse({ ...inquiryFixtures[0].extraction, quantity: "guessed" })],
] as const) {
  test(`official SDK handles ${name} without returning an invented success`, async () => {
    const client = new OpenAI({ apiKey: "test-only", maxRetries: 0, fetch: async () => response() });
    await assert.rejects(() => analyzeInquiry({ inquiry: inquiryFixtures[0].inquiry, locale: "de" }, "gpt-5-nano", client), InquiryError);
  });
}

test("upstream HTTP 500 has no automatic SDK retries", async () => {
  let calls = 0;
  const client = new OpenAI({ apiKey: "test-only", maxRetries: 0, fetch: async () => { calls++; return Response.json({ error: { message: "do-not-leak" } }, { status: 500 }); } });
  await assert.rejects(() => analyzeInquiry({ inquiry: "fiktiv", locale: "de" }, "gpt-4.1-nano", client), (error: unknown) => error instanceof InquiryError && error.code === "UPSTREAM_UNAVAILABLE");
  assert.equal(calls, 1);
});

for (const [status, code] of [[401, "PROVIDER_ACCESS"], [403, "PROVIDER_ACCESS"], [429, "PROVIDER_LIMIT"]] as const) {
  test(`provider HTTP ${status} returns an actionable safe error`, async () => {
    const client = new OpenAI({ apiKey: "test-only", maxRetries: 0, fetch: async () => Response.json({ error: { message: "Private provider diagnostic" } }, { status }) });
    await assert.rejects(() => analyzeInquiry({ inquiry: "fiktiv", locale: "de" }, "gpt-5-nano", client), (error: unknown) => error instanceof InquiryError && error.code === code);
  });
}

test("configuration probe never supplies a model or starts inference", async () => {
  const client = new OpenAI({ apiKey: "test-only", maxRetries: 0, fetch: async (_url, init) => {
    assert.deepEqual(JSON.parse(String(init?.body)), {});
    return Response.json({ error: { message: "Missing required parameter: model", param: "model" } }, { status: 400 });
  } });
  await checkResponsesAccess(client);
});

test("configuration probe rejects missing write permission without exposing credentials", async () => {
  const client = new OpenAI({ apiKey: "test-only", maxRetries: 0, fetch: async () => Response.json({ error: { message: "Missing scopes: api.responses.write" } }, { status: 401 }) });
  await assert.rejects(() => checkResponsesAccess(client), /api\.responses\.write/);
});

test("temporary local mode allows repeated attempts without reading or resetting saved quotas", async () => {
  let calls = 0;
  const localConfig = () => getInquiryConfig({ ...config(), INQUIRY_UNLIMITED_LOCAL_TESTS: "true" });
  const handler = createInquiryHandler({
    config: localConfig, environment: () => "development",
    store: () => { throw new Error("Local testing must not access saved quotas"); },
    analyze: async () => { calls++; return goodResult(); },
  });
  for (let index = 0; index < 8; index++) {
    const response = await handler(request({ inquiry: inquiryFixtures[0].inquiry }));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("x-ratelimit-limit"), null);
    const payload = inquirySuccessSchema.parse(await response.json());
    assert.equal(payload.rateLimitDisabled, true);
    assert.equal(payload.remainingAttempts, null);
    assert.equal(payload.resetAt, null);
  }
  assert.equal(calls, 8);
  assert.equal((await handler(request({ inquiry: "test" }, { host: "public.example", origin: "http://public.example" }))).status, 403);
  assert.equal((await handler(request({ inquiry: "" }))).status, 400);
  assert.equal(calls, 8);
});

test("production cannot bypass the five-attempt limit with the local test flag", async () => {
  const enabled = getInquiryConfig({ ...config(), INQUIRY_UNLIMITED_LOCAL_TESTS: "true" });
  assert.equal(isUnlimitedLocalTesting(enabled, "development"), true);
  assert.equal(isUnlimitedLocalTesting(enabled, "production"), false);
  assert.equal(isUnlimitedLocalTesting(enabled, "test"), false);
  const store = new MemoryStore();
  let now = start;
  const handler = createInquiryHandler({ config: () => enabled, environment: () => "production", store: () => store, now: () => now, analyze: async () => goodResult() });
  for (let index = 0; index < 6; index++) {
    assert.equal((await handler(request({ inquiry: "fiktiv" }))).status, index < 5 ? 200 : 429);
    now += COOLDOWN_MS;
  }
  assert.throws(() => getInquiryConfig({ ...enabled, INQUIRY_LOCAL_ONLY: "false", INQUIRY_LIMITER: "redis", INQUIRY_TRUSTED_IP_HEADER: "x-real-ip", UPSTASH_REDIS_REST_URL: "https://example.upstash.io", UPSTASH_REDIS_REST_TOKEN: "test-only" }), InquiryError);
});

test("unlimited response metadata cannot pretend to have a remaining attempt counter", () => {
  const payload = { result: goodResult(), model: "gpt-5-nano", rateLimitDisabled: true, remainingAttempts: null, resetAt: null };
  assert.equal(inquirySuccessSchema.safeParse(payload).success, true);
  assert.equal(inquirySuccessSchema.safeParse({ ...payload, rateLimitDisabled: false }).success, false);
  assert.equal(inquirySuccessSchema.safeParse({ ...payload, remainingAttempts: 5 }).success, false);
});

test("structured output rejects the observed 306-character follow-up before display", async () => {
  const client = new OpenAI({ apiKey: "test-only", maxRetries: 0, fetch: async () => wireResponse({ ...inquiryFixtures[1].extraction, missingInformation: ["x".repeat(306)] }) });
  await assert.rejects(() => analyzeInquiry({ inquiry: inquiryFixtures[1].inquiry, locale: "de" }, "gpt-5-nano", client), (error: unknown) => error instanceof InquiryError && error.code === "INVALID_OUTPUT");
});
