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

// Keep the model schema within Structured Outputs' JSON Schema subset.
export const inquiryFieldsSchema = z.object({
  service: z.string().nullable(),
  quantity: z.number().nonnegative().nullable(),
  unit: z.string().nullable(),
  material: z.string().nullable(),
  thicknessMm: z.number().nonnegative().nullable(),
  deliveryWish: z.string().nullable(),
  attachmentMentioned: z.boolean(),
  missingInformation: z.array(z.string().regex(/^\S[\s\S]{0,299}$/))
    .max(15)
    .describe("Up to 15 separate, concise missing details or follow-up questions. Each item starts with a non-whitespace character and contains at most 300 characters."),
  summary: z.string(),
}).strict();

export const inquiryResultSchema = inquiryFieldsSchema.superRefine((value, ctx) => {
  for (const [key, text] of Object.entries(value)) {
    if (typeof text === "string" && (text.trim().length === 0 || text.length > (key === "summary" ? 1200 : 300))) {
      ctx.addIssue({ code: "custom", path: [key], message: "Invalid output text length" });
    }
  }
  if (value.missingInformation.length > 15 || value.missingInformation.some(text => !text.trim() || text.length > 300)) {
    ctx.addIssue({ code: "custom", path: ["missingInformation"], message: "Invalid missing information" });
  }
});
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
