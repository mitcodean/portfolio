import "server-only";
import { z } from "zod";
import { DEFAULT_INQUIRY_MODEL, inquiryModelSchema } from "./schema";
import { InquiryError } from "./errors";

const configSchema = z.object({
  OPENAI_API_KEY: z.string().trim().min(20),
  OPENAI_MODEL: inquiryModelSchema.default(DEFAULT_INQUIRY_MODEL),
  INQUIRY_RATE_LIMIT_SECRET: z.string().min(32),
  INQUIRY_GLOBAL_DAILY_LIMIT: z.coerce.number().int().min(5).max(500).default(25),
  INQUIRY_LOCAL_ONLY: z.enum(["true", "false"]).default("true"),
  INQUIRY_UNLIMITED_LOCAL_TESTS: z.enum(["true", "false"]).default("false"),
  INQUIRY_LIMITER: z.enum(["file", "redis"]).default("file"),
  INQUIRY_TRUSTED_IP_HEADER: z.enum(["cf-connecting-ip", "x-real-ip"]).optional(),
  UPSTASH_REDIS_REST_URL: z.url().startsWith("https://").optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
});
export type InquiryConfig = z.infer<typeof configSchema>;

export function getInquiryConfig(env: Record<string, unknown> = process.env): InquiryConfig {
  // Blank optional entries in .env.example should behave like missing entries.
  const cleaned = Object.fromEntries(Object.entries(env).filter(([, value]) => value !== ""));
  const parsed = configSchema.safeParse(cleaned);
  if (!parsed.success) throw new InquiryError("NOT_CONFIGURED", 503);
  const config = parsed.data;
  if (config.INQUIRY_UNLIMITED_LOCAL_TESTS === "true" && config.INQUIRY_LOCAL_ONLY !== "true") {
    throw new InquiryError("PROTECTION_UNAVAILABLE", 503);
  }
  if (config.INQUIRY_LIMITER === "redis" && (!config.UPSTASH_REDIS_REST_URL || !config.UPSTASH_REDIS_REST_TOKEN)) {
    throw new InquiryError("PROTECTION_UNAVAILABLE", 503);
  }
  // Public operation must use shared, atomic limits and a verified edge IP header.
  if (config.INQUIRY_LOCAL_ONLY === "false" && (config.INQUIRY_LIMITER !== "redis" || !config.INQUIRY_TRUSTED_IP_HEADER)) {
    throw new InquiryError("PROTECTION_UNAVAILABLE", 503);
  }
  return config;
}

export function isUnlimitedLocalTesting(config: InquiryConfig, environment: string | undefined = process.env.NODE_ENV): boolean {
  return environment === "development"
    && config.INQUIRY_LOCAL_ONLY === "true"
    && config.INQUIRY_UNLIMITED_LOCAL_TESTS === "true";
}
