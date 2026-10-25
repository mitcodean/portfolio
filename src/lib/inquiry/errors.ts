import "server-only";
import type { InquiryErrorCode } from "./schema";

export class InquiryError extends Error {
  constructor(
    public readonly code: InquiryErrorCode,
    public readonly status: number,
    public readonly retryAfterSeconds?: number,
  ) {
    super(code);
  }
}
