import { z } from "zod";

export const MAX_INQUIRY_LENGTH = 1000;
export const INQUIRY_MODELS = ["gpt-4.1-nano", "gpt-5-nano"] as const;
export const DEFAULT_INQUIRY_MODEL = "gpt-5-nano";
export const VISITOR_ATTEMPTS = 5;
export const inquiryModelSchema = z.enum(INQUIRY_MODELS);
export type InquiryModel = z.infer<typeof inquiryModelSchema>;

export const inquiryRequestSchema = z.object({
  inquiry: z.string().max(MAX_INQUIRY_LENGTH).trim().min(1),
  model: inquiryModelSchema.optional(),
  locale: z.enum(["de", "en"]).default("de"),
}).strict();
export type InquiryRequest = z.infer<typeof inquiryRequestSchema>;

// The very same strict schema is sent to OpenAI and validates server/browser results.
const fieldText = z.string().regex(/^\S[\s\S]{0,299}$/);
export const inquiryResultSchema = z.object({
  service: fieldText.nullable().describe("Explicit requested service or component; no inferred manufacturing method."),
  quantity: z.number().int().nonnegative().nullable().describe("Component count, including 50 brackets, 50 Stk., 50 Stück or 50x. Never a thickness, material grade or duration. Null for conflicting counts."),
  unit: fieldText.nullable().describe("Stück for a clearly stated component count; otherwise the explicitly stated unit or null."),
  material: fieldText.nullable().describe("Only the named material and explicitly provided grade."),
  thicknessMm: z.number().nonnegative().nullable().describe("Only a clearly stated material thickness in millimetres; not a length or diameter."),
  deliveryWish: fieldText.nullable().describe("Short original delivery/completion expression, not a drop-off time. Null if unclear or contradictory."),
  drawingMentioned: z.boolean().describe("A drawing is mentioned in the text. This never means a file has been read."),
  missingInformation: z.array(z.string().regex(/^\S[\s\S]{0,299}$/))
    .max(15)
    .describe("Up to 15 separate, concise missing details or follow-up questions. Each item starts with a non-whitespace character and contains at most 300 characters."),
  summary: z.string().regex(/^\S[\s\S]{0,1199}$/).describe("Concise factual summary, including any uncertainty; no price or invented facts."),
}).strict();
export type InquiryResult = z.infer<typeof inquiryResultSchema>;

export const inquirySuccessSchema = z.object({
  result: inquiryResultSchema,
  model: inquiryModelSchema,
  rateLimitDisabled: z.boolean().default(false),
  remainingAttempts: z.number().int().min(0).max(VISITOR_ATTEMPTS).nullable(),
  resetAt: z.number().int().positive().nullable(),
}).strict().refine(value => value.rateLimitDisabled
  ? value.remainingAttempts === null && value.resetAt === null
  : value.remainingAttempts !== null && value.resetAt !== null,
{ message: "Quota metadata must match rate-limit mode" });

export const inquiryErrorCodeSchema = z.enum([
  "INVALID_INPUT", "PAYLOAD_TOO_LARGE", "UNSUPPORTED_MEDIA_TYPE", "FORBIDDEN",
  "NOT_CONFIGURED", "PROTECTION_UNAVAILABLE", "RATE_LIMITED", "GLOBAL_LIMIT",
  "BUSY", "TIMEOUT", "UPSTREAM_UNAVAILABLE", "PROVIDER_ACCESS", "PROVIDER_LIMIT", "REFUSED", "INVALID_OUTPUT", "ABORTED",
]);
export type InquiryErrorCode = z.infer<typeof inquiryErrorCodeSchema>;
export const inquiryErrorSchema = z.object({
  error: inquiryErrorCodeSchema,
  retryAfterSeconds: z.number().int().positive().optional(),
  remainingAttempts: z.number().int().min(0).max(VISITOR_ATTEMPTS).optional(),
  resetAt: z.number().int().positive().optional(),
}).strict();
