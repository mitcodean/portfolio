import "server-only";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { isIP } from "node:net";
import { mkdir, open, readFile, rename, unlink } from "node:fs/promises";
import path from "node:path";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import type { InquiryConfig } from "./config";
import { InquiryError } from "./errors";
import { VISITOR_ATTEMPTS } from "./schema";

export const WINDOW_MS = 24 * 60 * 60 * 1000;
export const COOLDOWN_MS = 15_000;
export const LEASE_MS = 60_000;
const COOKIE_NAME = "diovis_inquiry_visitor";
const stateSchema = z.object({
  attempts: z.record(z.string(), z.array(z.number().int().nonnegative()).max(500)),
  leases: z.record(z.string(), z.number().int().nonnegative()),
}).strict();
export type RateState = z.infer<typeof stateSchema>;
export type Reservation = { token: string; remainingAttempts: number; resetAt: number };
type Transaction<T> = (state: RateState) => T;
export interface RateStore { transaction<T>(operation: Transaction<T>): Promise<T> }
const emptyState = (): RateState => ({ attempts: {}, leases: {} });

function prune(state: RateState, now: number) {
  for (const [key, timestamps] of Object.entries(state.attempts)) {
    const active = timestamps.filter(time => time > now - WINDOW_MS);
    if (active.length) state.attempts[key] = active;
    else delete state.attempts[key];
  }
  for (const [token, expiry] of Object.entries(state.leases)) if (expiry <= now) delete state.leases[token];
}

export function reserveAttempt(state: RateState, visitor: string, network: string, globalLimit: number, now = Date.now()): Reservation {
  prune(state, now);
  const visitorKey = `visitor:${visitor}`;
  const networkKey = `network:${network}`;
  const visitorTimes = state.attempts[visitorKey] ?? [];
  const networkTimes = state.attempts[networkKey] ?? [];
  const globalTimes = state.attempts.global ?? [];
  if (Math.max(visitorTimes.length, networkTimes.length) >= VISITOR_ATTEMPTS) {
    const retryAt = Math.max(...[visitorTimes, networkTimes].filter(times => times.length >= VISITOR_ATTEMPTS).map(times => times[0] + WINDOW_MS));
    throw new InquiryError("RATE_LIMITED", 429, Math.max(1, Math.ceil((retryAt - now) / 1000)));
  }
  if (globalTimes.length >= globalLimit) throw new InquiryError("GLOBAL_LIMIT", 429, Math.max(1, Math.ceil((globalTimes[0] + WINDOW_MS - now) / 1000)));
  const last = Math.max(visitorTimes.at(-1) ?? 0, networkTimes.at(-1) ?? 0);
  if (last && now - last < COOLDOWN_MS) throw new InquiryError("BUSY", 429, Math.ceil((COOLDOWN_MS - now + last) / 1000));
  if (Object.keys(state.leases).length >= 2) throw new InquiryError("BUSY", 429, 5);
  // Reserve budget BEFORE contacting OpenAI. Failures and disconnects still consume one attempt.
  state.attempts[visitorKey] = [...visitorTimes, now];
  state.attempts[networkKey] = [...networkTimes, now];
  state.attempts.global = [...globalTimes, now];
  const token = randomUUID();
  state.leases[token] = now + LEASE_MS;
  return {
    token,
    remainingAttempts: VISITOR_ATTEMPTS - Math.max(visitorTimes.length, networkTimes.length) - 1,
    resetAt: Math.min(visitorTimes[0] ?? now, networkTimes[0] ?? now) + WINDOW_MS,
  };
}

// Persistent, cross-process lock for local single-host demos. Never fall back to memory.
export class FileRateStore implements RateStore {
  constructor(private readonly directory = path.join(process.cwd(), ".diovis")) {}

  async transaction<T>(operation: Transaction<T>): Promise<T> {
    await mkdir(this.directory, { recursive: true, mode: 0o700 });
    const filename = path.join(this.directory, "inquiry-limits.json");
    const lockname = path.join(this.directory, "inquiry-limits.lock");
    let lock;
    try { lock = await open(lockname, "wx", 0o600); }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code === "EEXIST") throw new InquiryError("BUSY", 429, 1);
      throw error;
    }
    const temporary = path.join(this.directory, `${randomUUID()}.tmp`);
    try {
      let state = emptyState();
      try { state = stateSchema.parse(JSON.parse(await readFile(filename, "utf8"))); }
      catch (error) { if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error; }
      const result = operation(state);
      const file = await open(temporary, "wx", 0o600);
      try { await file.writeFile(JSON.stringify(state)); await file.sync(); }
      finally { await file.close(); }
      await rename(temporary, filename);
      return result;
    } finally {
      await unlink(temporary).catch(() => {});
      await lock.close();
      await unlink(lockname);
    }
  }
}

const COMPARE_AND_SET = `
local current = redis.call('GET', KEYS[1])
if (current or '') ~= ARGV[1] then return 0 end
redis.call('SET', KEYS[1], ARGV[2], 'EX', 86460)
return 1
`;

// Atomic compare-and-set makes the same quota safe across workers and serverless instances.
export class RedisRateStore implements RateStore {
  constructor(private readonly redis: Redis, private readonly key = "diovis:inquiry:limits:v1") {}

  async transaction<T>(operation: Transaction<T>): Promise<T> {
    for (let attempt = 0; attempt < 4; attempt++) {
      const previous = await this.redis.get<string>(this.key);
      const state = previous === null ? emptyState() : stateSchema.parse(JSON.parse(previous));
      const result = operation(state);
      const committed = await this.redis.eval<string[], number>(COMPARE_AND_SET, [this.key], [previous ?? "", JSON.stringify(state)]);
      if (committed === 1) return result;
    }
    throw new InquiryError("BUSY", 429, 1);
  }
}

export function createRateStore(config: InquiryConfig): RateStore {
  if (config.INQUIRY_LIMITER === "file") return new FileRateStore();
  return new RedisRateStore(new Redis({
    url: config.UPSTASH_REDIS_REST_URL!, token: config.UPSTASH_REDIS_REST_TOKEN!,
    automaticDeserialization: false, retry: false,
    signal: () => AbortSignal.timeout(2500),
  }));
}

export function hashIdentity(value: string, secret: string): string {
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function getVisitor(request: Request, secret: string, now = Date.now()) {
  const cookie = request.headers.get("cookie")?.split(";").map(item => item.trim()).find(item => item.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1);
  if (cookie && cookie.length < 200) {
    const [id, issued, signature] = cookie.split(".");
    if (/^[a-f0-9-]{36}$/.test(id) && /^\d{13}$/.test(issued ?? "") && Number(issued) <= now && now - Number(issued) < WINDOW_MS) {
      const expected = hashIdentity(`${id}.${issued}`, secret);
      if (/^[a-f0-9]{64}$/.test(signature ?? "") && timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return { id, cookie: null };
    }
  }
  const id = randomUUID();
  const value = `${id}.${now}`;
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return { id, cookie: `${COOKIE_NAME}=${value}.${hashIdentity(value, secret)}; Path=/api/analyze-inquiry; Max-Age=86400; HttpOnly; SameSite=Strict${secure}` };
}

export function getNetwork(request: Request, config: InquiryConfig): string {
  // Never trust arbitrary X-Forwarded-For supplied by a caller.
  const ip = config.INQUIRY_TRUSTED_IP_HEADER ? request.headers.get(config.INQUIRY_TRUSTED_IP_HEADER)?.trim() : null;
  if (config.INQUIRY_TRUSTED_IP_HEADER && (!ip || !isIP(ip))) throw new InquiryError("PROTECTION_UNAVAILABLE", 503);
  // Without a trusted edge, share ONE conservative network bucket (also defeats cookie rotation).
  return hashIdentity(ip ?? "unverified-network", config.INQUIRY_RATE_LIMIT_SECRET);
}
