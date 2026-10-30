import assert from "node:assert/strict";
import { test } from "node:test";
import de from "../src/messages/de.json";
import en from "../src/messages/en.json";
import { legalHref, parseLegalDocument, type LegalDocumentData } from "../src/lib/legal";

const flatten = (document: LegalDocumentData) => JSON.stringify(document);
const messages = { de, en };
const kinds = ["notice", "privacy", "terms"] as const;

test("all six legal documents have complete matching section and clause structures", () => {
  for (const kind of kinds) {
    const documents = [de, en].map(messages => parseLegalDocument(messages.legal[kind], kind));
    assert.equal(documents[0].sections.length, { notice: 7, privacy: 13, terms: 16 }[kind]);
    const shape = (doc: LegalDocumentData) => doc.sections.map(section => ({ id: section.id, blocks: section.blocks.map(block => ({ type: block.type, count: block.type === "list" ? block.items.length : block.type === "details" ? block.rows.length : 1 })) }));
    assert.deepEqual(shape(documents[0]), shape(documents[1]));
    for (const document of documents) assert.match(document.updated, /Version 1/);
  }
});

test("missing or reordered legal sections fail instead of being silently hidden", () => {
  for (const kind of kinds) {
    const document = structuredClone(de.legal[kind]);
    document.sections.splice(4, 1);
    assert.throws(() => parseLegalDocument(document, kind));
  }
  const document = structuredClone(en.legal.terms);
  document.sections.reverse();
  assert.throws(() => parseLegalDocument(document, "terms"));
});

test("confirmed business information and the exact requested register placeholder are preserved", () => {
  for (const locale of ["de", "en"] as const) {
    const notice = flatten(parseLegalDocument(messages[locale].legal.notice, "notice"));
    for (const expected of ["Diovis e.U.", "Dean-Silviu Mitco", "Landesgericht Steyr", "Bezirkshauptmannschaft Steyr-Land", "39462992", "39491251", "ATU83838778", "+43 664 9494891", "https://mitcodean.com", "Das ist die FIrmenbuchnummer noch einzutragen"]) assert.ok(notice.includes(expected), expected);
    assert.ok(!notice.includes("mitcodea.com"));
    assert.ok(!notice.includes("mitcoean.com"));
  }
});

test("payment triggers use invoice date and distinguish order acceptance from go-live", () => {
  const german = flatten(parseLegalDocument(de.legal.terms, "terms"));
  const english = flatten(parseLegalDocument(en.legal.terms, "terms"));
  assert.ok(german.includes("50 % bei Beauftragung, 50 % nach Inbetriebnahme"));
  assert.ok(german.includes("14 Tage ab Rechnungsdatum"));
  assert.ok(english.includes("50% upon order acceptance and 50% after go-live"));
  assert.ok(english.includes("14 days from the invoice date"));
  assert.ok(!english.includes("on commissioning"));
  for (const text of [german, english]) {
    assert.ok(text.includes("50 % / 30 % / 20 %") || text.includes("50% / 30% / 20%"));
    assert.ok(!text.includes("15 %"));
    assert.doesNotMatch(text, /gesetzlichen Umsatzsteuer \(20 %\)|statutory VAT \(20 %\)/);
    assert.doesNotMatch(text, /\b(?:85|255)\s*(?:€|EUR)|90 (?:Minuten|minutes)/);
  }
});

test("privacy describes actual providers and uncertain account facts without invented retention", () => {
  for (const locale of ["de", "en"] as const) {
    const doc = parseLegalDocument(messages[locale].legal.privacy, "privacy");
    const text = flatten(doc);
    for (const provider of ["Hostinger", "Resend", "OpenAI", "Upstash", "Calendly"]) assert.ok(text.includes(provider));
    for (const cookie of ["mitcodean_cookie_consent", "diovis_inquiry_visitor", "NEXT_LOCALE"]) assert.ok(text.includes(cookie));
    assert.ok(text.includes("store=false"));
    assert.ok(!text.includes("Vercel"));
    assert.ok(!text.includes("Anthropic"));
    assert.match(doc.notice, locale === "de" ? /nicht abschließend bestätigt/ : /not yet been conclusively confirmed/);
    const retention = doc.sections.find(section => section.id === "retention")!;
    assert.match(flatten({ ...doc, sections: [retention] }), locale === "de" ? /nach dessen Wegfall gelöscht/ : /deleted when that purpose ends/);
  }
});

test("remaining internal review instructions are removed except the user-requested FN placeholder", () => {
  for (const locale of ["de", "en"] as const) for (const kind of kinds) {
    const text = flatten(parseLegalDocument(messages[locale].legal[kind], kind));
    assert.doesNotMatch(text, /\[(PRÜFEN|VERIFY|CONFIRM|INSERT|FIRMENBUCH|ADD REGISTER|OFFEN|OPENAI-)/);
    assert.doesNotMatch(text, /Wichtiger Freigabevermerk|INTERNAL REVIEW NOTE|NICHT VERÖFFENTLICHEN/);
  }
});

test("legal links preserve locale and reject unsafe protocols and off-site redirects", () => {
  for (const locale of ["de", "en"] as const) {
    assert.equal(legalHref("/legal-compliance/privacy-policy", locale), `/${locale}/legal-compliance/privacy-policy/`);
    assert.equal(legalHref("/legal-compliance/terms-and-conditions/", locale), `/${locale}/legal-compliance/terms-and-conditions/`);
  }
  assert.equal(legalHref("https://www.dsb.gv.at/", "de"), "https://www.dsb.gv.at/");
  assert.equal(legalHref("mailto:contact@mitcodean.com", "en"), "mailto:contact@mitcodean.com");
  for (const href of ["javascript:alert(1)", "data:text/html,test", "//evil.example", "https://user:password@example.com", "/does-not-exist"]) assert.equal(legalHref(href, "de"), null);
});
