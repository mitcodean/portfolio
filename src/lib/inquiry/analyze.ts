import "server-only";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";
import { InquiryError } from "./errors";
import { EXTRACTION_INSTRUCTIONS } from "./prompt";
import { reconcileInquiry } from "./reconcile";
import { inquiryResultSchema, type InquiryModel, type InquiryRequest, type InquiryResult } from "./schema";

export const OPENAI_TIMEOUT_MS = 45_000;

export function createOpenAIClient(apiKey: string) {
  return new OpenAI({ apiKey, baseURL: "https://api.openai.com/v1", timeout: OPENAI_TIMEOUT_MS, maxRetries: 0 });
}

export async function analyzeInquiry(
  request: InquiryRequest,
  model: InquiryModel,
  client: OpenAI,
  signal?: AbortSignal,
): Promise<InquiryResult> {
  try {
    const response = await client.responses.parse({
      model,
      store: false,
      max_output_tokens: 2200,
      ...(model === "gpt-5-nano" ? { reasoning: { effort: "minimal" as const } } : { temperature: 0 }),
      instructions: `${EXTRACTION_INSTRUCTIONS}\nWrite missingInformation and summary in ${request.locale === "de" ? "German" : "English"}. Keep source expressions in their original language.`,
      input: [{ role: "user", content: request.inquiry }],
      text: { format: zodTextFormat(inquiryResultSchema, "manufacturing_inquiry") },
    }, { signal });
    if (response.output.some(item => item.type === "message" && item.content.some(content => content.type === "refusal"))) throw new InquiryError("REFUSED", 422);
    if (response.status !== "completed" || !response.output_parsed) {
      console.warn("[inquiry] Model response could not be parsed", {
        model, status: response.status, reason: response.incomplete_details?.reason ?? null,
        outputTypes: response.output.map(item => item.type),
      });
      throw new InquiryError("INVALID_OUTPUT", 502);
    }
    return reconcileInquiry(inquiryResultSchema.parse(response.output_parsed), request.inquiry, request.locale);
  } catch (error) {
    if (error instanceof InquiryError) throw error;
    if (error instanceof OpenAI.APIConnectionTimeoutError || signal?.reason?.name === "TimeoutError") throw new InquiryError("TIMEOUT", 504);
    if (error instanceof OpenAI.APIUserAbortError || signal?.aborted) throw new InquiryError("ABORTED", 499);
    if (error instanceof z.ZodError || error instanceof SyntaxError) {
      console.warn("[inquiry] Structured output parsing failed", {
        model, stage: error instanceof z.ZodError ? "structured_schema" : "json_syntax",
        ...(error instanceof z.ZodError ? { issues: error.issues.map(issue => ({ path: issue.path.join("."), code: issue.code })) } : {}),
      });
      throw new InquiryError("INVALID_OUTPUT", 502);
    }
    if (error instanceof OpenAI.APIError) {
      // Diagnostic codes only: never log the upstream message, input or credentials.
      console.warn("[inquiry] OpenAI API error", {
        status: error.status,
        code: typeof error.code === "string" && /^[a-z_]+$/.test(error.code) ? error.code : null,
        param: typeof error.param === "string" && /^[a-z0-9_.]+$/i.test(error.param) ? error.param : null,
      });
      if (error.status === 401 || error.status === 403) throw new InquiryError("PROVIDER_ACCESS", 503);
      if (error.status === 429) throw new InquiryError("PROVIDER_LIMIT", 503);
    }
    // Never return upstream messages, request bodies, keys or stack traces to the browser.
    throw new InquiryError("UPSTREAM_UNAVAILABLE", 502);
  }
}
