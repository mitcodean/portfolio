import assert from "node:assert/strict";
import { setTimeout as wait } from "node:timers/promises";
import { loadEnvConfig } from "@next/env";
import { getInquiryExamples } from "../src/data/inquiry-examples";
import { inquiryModelSchema, inquirySuccessSchema } from "../src/lib/inquiry/schema";
import { createOpenAIClient } from "../src/lib/inquiry/analyze";
import { getInquiryConfig } from "../src/lib/inquiry/config";
import { checkResponsesAccess } from "../src/lib/inquiry/check-access";

async function main() {
  loadEnvConfig(process.cwd());
  const base = new URL(process.env.INQUIRY_LIVE_BASE_URL ?? "http://127.0.0.1:3000");
  if (!["localhost", "127.0.0.1", "[::1]"].includes(base.hostname)) throw new Error("Live checks are restricted to a local server.");
  const model = inquiryModelSchema.parse(process.env.OPENAI_MODEL ?? "gpt-5-nano");
  // Catch missing permissions before using one of the visitor's five actual attempts.
  const config = getInquiryConfig();
  await checkResponsesAccess(createOpenAIClient(config.OPENAI_API_KEY));
  const selectedCase = process.argv.find(arg => arg.startsWith("--case="))?.slice(7);
  const examples = getInquiryExamples("de").filter(example => !selectedCase || example.id === selectedCase);
  if (!examples.length) throw new Error("Unknown case. Use laser, incomplete or welding.");
  let cookie = "";
  console.log(`Live check: ${model}, ${examples.length} fictional inquiries, maximum ${examples.length} paid API calls. Server must already be running.`);
  for (const [index, example] of examples.entries()) {
    if (index) await wait(15_100); // Respect the REAL limiter; never bypass or reset its counters.
    const response = await fetch(new URL("/api/analyze-inquiry/", base), {
      method: "POST", signal: AbortSignal.timeout(55_000),
      headers: { "content-type": "application/json", origin: base.origin, ...(cookie ? { cookie } : {}) },
      body: JSON.stringify({ inquiry: example.inquiry, model, locale: "de" }),
    });
    const newCookie = response.headers.get("set-cookie");
    if (newCookie) cookie = newCookie.split(";")[0];
    const payload: unknown = await response.json();
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${JSON.stringify(payload)}. No automatic retry; attempt may have been charged.`);
    const { result, remainingAttempts } = inquirySuccessSchema.parse(payload);
    console.log(JSON.stringify({ example: example.id, model, remainingAttempts, result }, null, 2));
    if (example.id === "laser") {
      assert.match(result.service ?? "", /Haltewinkel/i);
      assert.equal(result.quantity, 50);
      assert.match(result.material ?? "", /1\.4301/);
      assert.equal(result.thicknessMm, 3);
      assert.ok(result.deliveryWish && example.inquiry.includes(result.deliveryWish));
      assert.equal(result.attachmentMentioned, true);
    } else if (example.id === "incomplete") {
      assert.equal(result.quantity, 120);
      assert.match(result.material ?? "", /Aluminium/i);
      assert.match(result.unit ?? "", /ungefähr/);
      assert.equal(result.thicknessMm, null);
      assert.equal(result.deliveryWish, null);
      assert.equal(result.attachmentMentioned, false);
      assert.ok(result.missingInformation.length > 0);
    } else {
      assert.equal(result.quantity, null);
      assert.match(result.material ?? "", /Stahl/i);
      assert.equal(result.deliveryWish, null);
      assert.equal(result.attachmentMentioned, false);
    }
    assert.doesNotMatch(result.summary, /€|EUR|Angebotspreis|Zeichnung (?:gelesen|analysiert)/i);
  }
  console.log(`${examples.length} fictional live inquiries passed. No limits were reset.`);
}

main().catch(error => {
  // Only local test diagnostics: API never returns credentials or upstream error messages.
  console.error(error instanceof Error ? error.message : "Live check failed.");
  process.exitCode = 1;
});
