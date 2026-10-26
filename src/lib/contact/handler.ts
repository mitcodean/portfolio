import "server-only";
import { Resend } from "resend";
import { contactSchema } from "./schema";

type Config = { apiKey?: string; from: string; to: string };
type Mail = { from: string; to: string[]; replyTo: string; subject: string; html: string; text: string };
type Dependencies = { config: () => Config; send: (mail: Mail, config: Config) => Promise<{ error?: unknown }> };
const defaults: Dependencies = {
  config: () => ({ apiKey: process.env.RESEND_API_KEY, from: process.env.EMAIL_FROM || "Kontaktformular <noreply@mitcodean.com>", to: process.env.CONTACT_EMAIL || "contact@mitcodean.com" }),
  send: (mail, config) => new Resend(config.apiKey).emails.send(mail),
};
export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]!));

async function readBody(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 24_000) throw new Error("PAYLOAD_TOO_LARGE");
  if (!request.body) throw new Error("INVALID_INPUT");
  const reader = request.body.getReader();
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const text = await Promise.race([
      (async () => { let bytes = 0; let text = ""; const decoder = new TextDecoder("utf-8", { fatal: true }); while (true) { const { done, value } = await reader.read(); if (done) break; bytes += value.byteLength; if (bytes > 24_000) throw new Error("PAYLOAD_TOO_LARGE"); text += decoder.decode(value, { stream: true }); } return text + decoder.decode(); })(),
      new Promise<never>((_, reject) => { timer = setTimeout(() => { reject(new Error("TIMEOUT")); void reader.cancel().catch(() => {}); }, 5000); }),
    ]);
    return JSON.parse(text) as unknown;
  } finally { if (timer) clearTimeout(timer); void reader.cancel().catch(() => {}); }
}

export function createContactHandler(overrides: Partial<Dependencies> = {}) {
  const deps = { ...defaults, ...overrides };
  return async (request: Request) => {
    const headers = { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" };
    const fail = (error: string, status: number) => Response.json({ error }, { status, headers });
    try {
      const url = new URL(request.url);
      const destination = new URL(`${url.protocol}//${request.headers.get("host") ?? url.host}`);
      if ((request.headers.get("origin") && request.headers.get("origin") !== destination.origin) || request.headers.get("sec-fetch-site") === "cross-site") return fail("FORBIDDEN", 403);
      if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return fail("UNSUPPORTED_MEDIA_TYPE", 415);
      const parsed = contactSchema.safeParse(await readBody(request));
      if (!parsed.success) return fail("INVALID_INPUT", 400);
      if (request.signal.aborted) return fail("ABORTED", 499);
      const config = deps.config();
      if (!config.apiKey) return fail("NOT_CONFIGURED", 503);
      const { name, email, phone, subject, message } = parsed.data;
      const rows = [["Name", name], ["E-Mail", email], ["Telefon", phone], ["Betreff", subject], ["Nachricht", message]].filter(([, value]) => value);
      const html = `<h1>Neue Kontaktanfrage an Diovis</h1>${rows.map(([label, value]) => `<h2>${label}</h2><p style="white-space:pre-wrap">${escapeHtml(value)}</p>`).join("")}`;
      const response = await deps.send({ from: config.from, to: [config.to], replyTo: email, subject: subject || `Neue Anfrage von ${name}`, html, text: rows.map(([label, value]) => `${label}: ${value}`).join("\n\n") }, config);
      if (response.error) return fail("DELIVERY_FAILED", 502);
      return Response.json({ success: true }, { headers });
    } catch (error) {
      const code = error instanceof Error ? error.message : "";
      if (code === "PAYLOAD_TOO_LARGE") return fail(code, 413);
      if (code === "TIMEOUT") return fail(code, 408);
      if (error instanceof SyntaxError || code === "INVALID_INPUT") return fail("INVALID_INPUT", 400);
      // Do not expose provider errors, email contents or credentials in responses or logs.
      return fail("DELIVERY_FAILED", 502);
    }
  };
}
