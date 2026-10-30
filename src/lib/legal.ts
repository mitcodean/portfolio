import { z } from "zod";

export const LEGAL_SECTION_IDS = {
  notice: ["company", "trade", "activities", "media", "copyright", "external-links", "privacy"],
  privacy: ["controller", "general", "hosting", "contact", "ai-demo", "abuse-prevention", "booking", "cookies", "recipients", "retention", "rights", "complaints", "updates"],
  terms: ["scope", "offers", "cooperation", "third-party", "fees", "timelines", "acceptance", "introduction", "software-rights", "support", "security-ai", "privacy", "liability", "late-payment", "termination", "law-languages"],
} as const;
export type LegalKind = keyof typeof LEGAL_SECTION_IDS;

const text = z.string().trim().min(1);
const block = z.discriminatedUnion("type", [
  z.object({ type: z.literal("paragraph"), text }).strict(),
  z.object({ type: z.literal("list"), ordered: z.boolean(), items: z.array(text).min(1) }).strict(),
  z.object({ type: z.literal("details"), rows: z.array(z.object({ label: text, value: text }).strict()).min(1) }).strict(),
]);
export const legalDocumentSchema = z.object({
  title: text,
  updated: text,
  notice: z.string(),
  intro: z.array(text),
  sections: z.array(z.object({ id: text, title: text, blocks: z.array(block).min(1) }).strict()).min(1),
}).strict();
export type LegalDocumentData = z.infer<typeof legalDocumentSchema>;

export function parseLegalDocument(value: unknown, kind: LegalKind): LegalDocumentData {
  const document = legalDocumentSchema.parse(value);
  const ids = document.sections.map(section => section.id);
  if (JSON.stringify(ids) !== JSON.stringify(LEGAL_SECTION_IDS[kind])) {
    throw new Error(`Incomplete or incorrectly ordered legal document: ${kind}`);
  }
  return document;
}

export function legalHref(href: string, locale: "de" | "en"): string | null {
  if (/^\/legal-compliance\/(legal-notice|privacy-policy|terms-and-conditions)\/?$/.test(href)) {
    return `/${locale}${href.replace(/\/$/, "")}/`;
  }
  if (/^mailto:[^\s<>]+@[^\s<>]+$/.test(href) || /^tel:\+?[\d\s-]+$/.test(href)) return href;
  try {
    const url = new URL(href);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
  } catch { return null; }
}
