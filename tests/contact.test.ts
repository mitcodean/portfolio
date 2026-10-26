import assert from "node:assert/strict";
import { test } from "node:test";
import { createContactHandler } from "../src/lib/contact/handler";

const valid = { name: "Demo Testperson", email: "demo@example.com", message: "Dies ist eine fiktive Testanfrage, keine Kundendaten." };
function request(body: unknown = valid, headers: Record<string, string> = {}) {
  return new Request("http://localhost:3000/api/contact/", { method: "POST", headers: { "Content-Type": "application/json", Origin: "http://localhost:3000", ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });
}
function harness(options: { key?: string; error?: unknown; throws?: boolean } = { key: "test-only" }) {
  const sent: { to: string[]; html: string; text: string; subject: string }[] = [];
  const handler = createContactHandler({
    config: () => ({ apiKey: options.key, from: "test@example.com", to: "owner@example.com" }),
    send: async mail => { sent.push(mail); if (options.throws) throw new Error("private-provider-error"); return { error: options.error }; },
  });
  return { handler, sent };
}

test("valid fictional form sends once using only the server recipient and honest success", async () => {
  const { handler, sent } = harness();
  const response = await handler(request({ ...valid, to: "attacker@example.com" }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(sent.length, 1);
  assert.deepEqual(sent[0].to, ["owner@example.com"]);
  assert.ok(sent[0].subject.includes(valid.name));
});

for (const [label, fields] of Object.entries({
  blank: { name: " ", message: " " },
  email: { email: "invalid" },
  nameHeader: { name: "Demo\r\nBcc: attacker@example.com" },
  subjectHeader: { subject: "Demo\nBcc: attacker@example.com" },
  tooLong: { message: "x".repeat(5001) },
  wrongType: { name: 42 },
  honeypot: { website: "https://spam.example" },
})) test(`invalid form (${label}) is rejected before contacting the provider`, async () => {
  const { handler, sent } = harness();
  const response = await handler(request({ ...valid, ...fields }));
  assert.equal(response.status, 400);
  assert.equal(sent.length, 0);
});

test("cross-site and non-JSON requests never send mail", async () => {
  const inputs: Record<string, string>[] = [{ Origin: "https://other.example" }, { "Sec-Fetch-Site": "cross-site" }, { "Content-Type": "text/plain" }];
  for (const headers of inputs) {
    const { handler, sent } = harness();
    assert.ok([403, 415].includes((await handler(request(valid, headers))).status));
    assert.equal(sent.length, 0);
  }
});

test("invalid JSON and oversized declared or streamed bodies are rejected", async () => {
  for (const [body, headers, status] of [
    ["{bad", {}, 400],
    [valid, { "Content-Length": "25000" }, 413],
    [{ ...valid, message: "x".repeat(25000) }, {}, 413],
  ] as const) {
    const { handler, sent } = harness();
    assert.equal((await handler(request(body, headers))).status, status);
    assert.equal(sent.length, 0);
  }
});

test("provider failures never return success or expose provider details", async () => {
  for (const options of [{ key: "test-only", error: { message: "private-provider-error" } }, { key: "test-only", throws: true }]) {
    const { handler } = harness(options);
    const response = await handler(request());
    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { error: "DELIVERY_FAILED" });
  }
});

test("missing server credentials give a configuration error without sending", async () => {
  const { handler, sent } = harness({});
  assert.equal((await handler(request())).status, 503);
  assert.equal(sent.length, 0);
});

test("HTML in form fields is escaped; the plain text version remains readable", async () => {
  const { handler, sent } = harness();
  const response = await handler(request({ ...valid, message: '<script>alert("test")</script> & Text' }));
  assert.equal(response.status, 200);
  assert.ok(!sent[0].html.includes("<script>"));
  assert.ok(sent[0].html.includes("&lt;script&gt;"));
  assert.ok(sent[0].text.includes("<script>"));
});
