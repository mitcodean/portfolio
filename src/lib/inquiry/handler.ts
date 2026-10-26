import "server-only";
import { analyzeInquiry, createOpenAIClient, OPENAI_TIMEOUT_MS } from "./analyze";
import { getInquiryConfig, isUnlimitedLocalTesting, type InquiryConfig } from "./config";
import { InquiryError } from "./errors";
import { createRateStore, getNetwork, getVisitor, hashIdentity, reserveAttempt, type RateStore, type Reservation } from "./rate-limit";
import { inquiryRequestSchema, inquiryResultSchema, type InquiryModel, type InquiryRequest, type InquiryResult } from "./schema";

const MAX_BODY_BYTES = 8192;
type Dependencies = {
  config: () => InquiryConfig;
  store: (config: InquiryConfig) => RateStore;
  analyze: (input: InquiryRequest, model: InquiryModel, config: InquiryConfig, signal: AbortSignal) => Promise<InquiryResult>;
  now: () => number;
  environment: () => NodeJS.ProcessEnv["NODE_ENV"] | undefined;
};
const defaults: Dependencies = {
  config: getInquiryConfig,
  store: createRateStore,
  analyze: (input, model, config, signal) => analyzeInquiry(input, model, createOpenAIClient(config.OPENAI_API_KEY), signal),
  now: Date.now,
  environment: () => process.env.NODE_ENV,
};

async function readJson(request: Request) {
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") throw new InquiryError("UNSUPPORTED_MEDIA_TYPE", 415);
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) throw new InquiryError("PAYLOAD_TOO_LARGE", 413);
  if (!request.body) throw new InquiryError("INVALID_INPUT", 400);
  const reader = request.body.getReader();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const text = await Promise.race([
      (async () => {
        let bytes = 0;
        const decoder = new TextDecoder("utf-8", { fatal: true });
        let output = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          bytes += value.byteLength;
          if (bytes > MAX_BODY_BYTES) throw new InquiryError("PAYLOAD_TOO_LARGE", 413);
          output += decoder.decode(value, { stream: true });
        }
        return output + decoder.decode();
      })(),
      new Promise<never>((_, reject) => {
        timer = setTimeout(() => { reject(new InquiryError("TIMEOUT", 408)); void reader.cancel().catch(() => {}); }, 5000);
      }),
    ]);
    return JSON.parse(text) as unknown;
  } catch (error) {
    void reader.cancel().catch(() => {});
    if (error instanceof InquiryError) throw error;
    throw new InquiryError("INVALID_INPUT", 400);
  } finally { if (timer) clearTimeout(timer); }
}

export function createInquiryHandler(overrides: Partial<Dependencies> = {}) {
  const deps = { ...defaults, ...overrides };
  return async function handle(request: Request): Promise<Response> {
    const headers = new Headers({ "Cache-Control": "no-store, max-age=0", "X-Content-Type-Options": "nosniff", "Vary": "Origin, Cookie" });
    let reservation: Reservation | undefined;
    let store: RateStore | undefined;
    try {
      const url = new URL(request.url);
      // Next's internal request URL can use localhost even when the browser uses 127.0.0.1.
      // Host is browser-controlled only through the actual destination; never use Forwarded-Host.
      const destination = new URL(`${url.protocol}//${request.headers.get("host") ?? url.host}`);
      const origin = request.headers.get("origin");
      if ((origin && origin !== destination.origin) || request.headers.get("sec-fetch-site") === "cross-site") throw new InquiryError("FORBIDDEN", 403);
      const input = inquiryRequestSchema.safeParse(await readJson(request));
      if (!input.success) throw new InquiryError("INVALID_INPUT", 400);
      const config = deps.config();
      if (config.INQUIRY_LOCAL_ONLY === "true" && !["localhost", "127.0.0.1", "[::1]"].includes(destination.hostname)) throw new InquiryError("FORBIDDEN", 403);
      if (request.signal.aborted) throw new InquiryError("ABORTED", 499);
      const rateLimitDisabled = isUnlimitedLocalTesting(config, deps.environment());
      if (!rateLimitDisabled) {
        const visitor = getVisitor(request, config.INQUIRY_RATE_LIMIT_SECRET, deps.now());
        if (visitor.cookie) headers.set("Set-Cookie", visitor.cookie);
        store = deps.store(config);
        try {
          reservation = await store.transaction(state => reserveAttempt(state, hashIdentity(visitor.id, config.INQUIRY_RATE_LIMIT_SECRET), getNetwork(request, config), config.INQUIRY_GLOBAL_DAILY_LIMIT, deps.now()));
        } catch (error) {
          if (error instanceof InquiryError) throw error;
          throw new InquiryError("PROTECTION_UNAVAILABLE", 503);
        }
        headers.set("X-RateLimit-Limit", "5");
        headers.set("X-RateLimit-Remaining", String(reservation.remainingAttempts));
        headers.set("X-RateLimit-Reset", String(Math.ceil(reservation.resetAt / 1000)));
      }
      const model = input.data.model ?? config.OPENAI_MODEL;
      const signal = AbortSignal.any([request.signal, AbortSignal.timeout(OPENAI_TIMEOUT_MS)]);
      const parsed = inquiryResultSchema.safeParse(await deps.analyze(input.data, model, config, signal));
      if (!parsed.success) throw new InquiryError("INVALID_OUTPUT", 502);
      return Response.json({ result: parsed.data, model, rateLimitDisabled, remainingAttempts: reservation?.remainingAttempts ?? null, resetAt: reservation?.resetAt ?? null }, { headers });
    } catch (error) {
      const failure = error instanceof InquiryError ? error : new InquiryError("UPSTREAM_UNAVAILABLE", 502);
      if (failure.retryAfterSeconds) headers.set("Retry-After", String(failure.retryAfterSeconds));
      return Response.json({ error: failure.code, ...(failure.retryAfterSeconds ? { retryAfterSeconds: failure.retryAfterSeconds } : {}), ...(reservation ? { remainingAttempts: reservation.remainingAttempts, resetAt: reservation.resetAt } : {}) }, { status: failure.status, headers });
    } finally {
      if (store && reservation) {
        const token = reservation.token;
        // Lease expiry is the safe fallback if cleanup cannot reach storage.
        await store.transaction(state => { delete state.leases[token]; }).catch(() => {});
      }
    }
  };
}

export const handleInquiry = createInquiryHandler();
