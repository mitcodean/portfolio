import "server-only";
import OpenAI from "openai";

/** Local setup check only. An empty body cannot start inference or generate billable output. */
export async function checkResponsesAccess(client: OpenAI): Promise<void> {
  try {
    await client.post("/responses", { body: {} });
    throw new Error("OpenAI hat eine absichtlich unvollständige Anfrage unerwartet akzeptiert.");
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      if (error.status === 400 && (error.param === "model" || /required.*model|model.*required/i.test(error.message))) return;
      if (error.status === 401 || error.status === 403) {
        throw new Error("OpenAI verweigert Responses-Zugriff. Beim Schlüssel aus .env.local Responses: Write (api.responses.write) erlauben und die Änderung mit Save speichern. Auch die Projektrolle muss Modellaufrufe erlauben. Nach einem Schlüsselwechsel den Dev-Server neu starten. Dieser Check hat keinen KI-Versuch verbraucht.");
      }
      throw new Error(`OpenAI-Konfigurationsprüfung: HTTP ${error.status ?? "unbekannt"}. Kein Modellaufruf und kein Demo-Versuch verbraucht.`);
    }
    throw new Error("OpenAI-Konfigurationsprüfung nicht erreichbar. Kein Modellaufruf gestartet.");
  }
}
