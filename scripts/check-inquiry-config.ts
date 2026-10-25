import { loadEnvConfig } from "@next/env";
import { createOpenAIClient } from "../src/lib/inquiry/analyze";
import { getInquiryConfig } from "../src/lib/inquiry/config";
import { checkResponsesAccess } from "../src/lib/inquiry/check-access";

async function main() {
  loadEnvConfig(process.cwd());
  const config = getInquiryConfig();
  await checkResponsesAccess(createOpenAIClient(config.OPENAI_API_KEY));
  console.log(`Responses-Berechtigung vorhanden. Modellvorauswahl: ${config.OPENAI_MODEL}. Kein Modellaufruf und kein Demo-Versuch verbraucht.`);
}
main().catch(error => {
  console.error(error instanceof Error ? error.message : "Konfigurationsprüfung fehlgeschlagen.");
  process.exitCode = 1;
});
