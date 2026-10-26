import assert from "node:assert/strict";
import { test } from "node:test";
import OpenAI from "openai";
import { getInquiryExamples } from "../src/data/inquiry-examples";
import { analyzeInquiry, createOpenAIClient } from "../src/lib/inquiry/analyze";
import { getInquiryConfig } from "../src/lib/inquiry/config";
import { createInquiryHandler } from "../src/lib/inquiry/handler";
import { COOLDOWN_MS, type RateState, type RateStore } from "../src/lib/inquiry/rate-limit";
import { reconcileInquiry } from "../src/lib/inquiry/reconcile";
import { INQUIRY_MODELS, inquiryResultSchema, inquirySuccessSchema, type InquiryResult } from "../src/lib/inquiry/schema";

const empty: InquiryResult = {
  service: null, quantity: null, unit: null, material: null, thicknessMm: null,
  deliveryWish: null, drawingMentioned: false, missingInformation: [], summary: "Keine Angaben.",
};
const fields = Object.keys(empty).sort();
const cases: { text: string; expected: Partial<InquiryResult>; conflict?: boolean }[] = [
  { text: "Wir benötigen 50 Haltewinkel aus Edelstahl 1.4301, Blechstärke 3 mm.", expected: { service: "Haltewinkel", quantity: 50, unit: "Stück", material: "Edelstahl 1.4301", thicknessMm: 3 } },
  { text: "Wir brauchen ungefähr 120 Blechteile aus Aluminium.", expected: { service: "Blechteile", quantity: 120, unit: "Stück", material: "Aluminium" } },
  { text: "Bitte fertigen Sie 25 Stk. Stahlwinkel.", expected: { service: "Stahlwinkel", quantity: 25, material: "Stahl" } },
  { text: "Wir benötigen eine Reparaturschweißung.", expected: { service: "Reparaturschweißung", quantity: null, unit: null, material: null } },
  { text: "50 Stück bis spätestens Freitag, Material noch offen.", expected: { quantity: 50, material: null, deliveryWish: "bis spätestens Freitag" } },
  { text: "Wir brauchen 50 Stück, weiter unten steht 70 Stück.", expected: { quantity: null, unit: null }, conflict: true },
];

function response(value: unknown) {
  return Response.json({ id: "resp_mock", object: "response", model: "mock", created_at: 1,
    status: "completed", error: null, incomplete_details: null,
    output: [{ id: "msg_mock", type: "message", role: "assistant", status: "completed",
      content: [{ type: "output_text", text: JSON.stringify(value), annotations: [] }] }],
  });
}

for (const model of INQUIRY_MODELS) {
  for (const [index, fixture] of cases.entries()) {
    test(`${model}: required case ${index + 1} stays consistent across varied upstream facts`, async () => {
      const outputs = [
        empty, // Model omission must not erase a clearly stated source fact.
        { ...empty, ...fixture.expected },
        { ...empty, service: "Laserfertigung", quantity: 3, unit: "Wochen", material: "Titan",
          thicknessMm: 50, drawingMentioned: true, deliveryWish: "morgen",
          missingInformation: ["Die Menge fehlt."], summary: "Zeichnung analysiert. Angebotspreis 999 Euro." },
        { ...empty, service: "Freitag", quantity: 70, unit: "mm", material: "Haltewinkel", deliveryWish: "50 Haltewinkel" },
      ];
      let calls = 0;
      const client = new OpenAI({ apiKey: "mock-only", maxRetries: 0, fetch: async (_url, init) => {
        const payload = JSON.parse(String(init?.body));
        assert.equal(payload.input[0].content, fixture.text);
        assert.equal(payload.model, model);
        assert.equal(payload.text.format.strict, true);
        assert.equal(payload.text.format.schema.additionalProperties, false);
        assert.deepEqual([...payload.text.format.schema.required].sort(), fields);
        assert.deepEqual(Object.keys(payload.text.format.schema.properties).sort(), fields);
        assert.equal(payload.temperature, model === "gpt-4.1-nano" ? 0 : undefined);
        assert.deepEqual(payload.reasoning, model === "gpt-5-nano" ? { effort: "minimal" } : undefined);
        return response(outputs[calls++]);
      } });
      const results = [];
      for (let repeat = 0; repeat < outputs.length; repeat++) {
        const result = await analyzeInquiry({ inquiry: fixture.text, locale: "de" }, model, client);
        for (const [key, value] of Object.entries(fixture.expected)) assert.equal(result[key as keyof InquiryResult], value, key);
        assert.deepEqual(Object.keys(result).sort(), fields);
        assert.ok(Array.isArray(result.missingInformation));
        assert.doesNotMatch(result.summary, /999|Titan|Zeichnung analysiert/);
        if (fixture.conflict) assert.match(result.missingInformation.join(" "), /widersprüchlich.*50.*70/i);
        results.push(result);
      }
      assert.equal(calls, outputs.length); // Exactly one provider call per analysis, no hidden retry.
      for (const result of results) assert.deepEqual(result, results[0]);
    });
  }
}

const countCases: [string, number | null][] = [
  ["Wir benötigen 50 Haltewinkel.", 50],
  ["Wir benötigen 50 verzinkte Haltewinkel.", 50],
  ["Wir benötigen 50 Stk. Haltewinkel.", 50],
  ["Wir benötigen 50 Stück.", 50],
  ["Wir benötigen 50x Haltewinkel.", 50],
  ["Wir benötigen 50xHaltewinkel.", 50],
  ["Bestellmenge: 50x", 50],
  ["Bestellmenge: 50x, Material offen.", 50],
  ["Stückzahl: 50", 50],
  ["Wir benötigen fünfzig Haltewinkel.", 50],
  ["Wir benötigen 1.000 Haltewinkel.", 1000],
  ["Wir benötigen 1 000 Haltewinkel.", 1000],
  ["Wir benötigen 0 Stück.", 0],
  ["50 Stück. Zur Bestätigung: 50 Stück.", 50],
  ["Wir brauchen 50 oder 70 Stück.", null],
  ["Wir brauchen 50–70 Stück.", null],
  ["Wir brauchen 50-70 Stück.", null],
  ["Wir brauchen 50/70 Stück.", null],
  ["50 Haltewinkel und 70 Blechteile.", null],
  ["50 Haltewinkel und 50 Blechteile.", null],
  ["Wir brauchen nicht 50 Stück.", null],
  ["Wir brauchen -50 Stück.", null],
  ["Wir brauchen 1,5 Stück.", null],
  ["Wir benötigen eine Reparaturschweißung.", null],
  ["Edelstahl 1.4301, Blechstärke 3 mm, Lieferung innerhalb von drei Wochen.", null],
  ["Abmessungen 50 x 70 mm, Blechstärke 3 mm.", null],
  ["Abmessungen 50x70 mm, Blechstärke 3 mm.", null],
  ["Artikelnummer DIN 50, Lieferzeit 3 Wochen.", null],
  ["We need 50 brackets, thickness 3 mm, delivery within three weeks.", 50],
  ["We need approximately 120 sheet metal parts made from aluminium.", 120],
];
for (const [text, expected] of countCases) {
  test(`source count: ${text}`, () => assert.equal(reconcileInquiry(empty, text, "de").quantity, expected));
}

test("thickness conversion and conflicts do not leak into count", () => {
  const result = reconcileInquiry(empty, "50 Haltewinkel, Materialstärke 0,3 cm, Lieferung innerhalb von drei Wochen.", "de");
  assert.equal(result.quantity, 50);
  assert.equal(result.thicknessMm, 3);
  assert.equal(result.deliveryWish, "innerhalb von drei Wochen");
  assert.equal(reconcileInquiry(empty, "50 Haltewinkel, Breite 3 mm, Länge 70 mm.", "de").thicknessMm, null);
  const conflicting = reconcileInquiry(empty, "50 Haltewinkel, Blechstärke 3 mm. An anderer Stelle: Blechstärke 5 mm.", "de");
  assert.equal(conflicting.thicknessMm, null);
  assert.match(conflicting.missingInformation.join(" "), /Widersprüchliche Materialstärken/);
  for (const text of ["Blechstärke 3 mm oder 5 mm.", "Blechstärke 3–5 mm."]) {
    assert.equal(reconcileInquiry(empty, text, "de").thicknessMm, null);
    assert.match(reconcileInquiry(empty, text, "de").missingInformation.join(" "), /Widersprüchliche Materialstärken/);
  }
});

test("conflicting materials and delivery wishes stay unknown", () => {
  const material = reconcileInquiry({ ...empty, material: "Stahl" }, "50 Winkel aus Stahl oder Aluminium.", "de");
  assert.equal(material.material, null);
  assert.match(material.missingInformation.join(" "), /Widersprüchliche Materialangaben/);
  const delivery = reconcileInquiry({ ...empty, deliveryWish: "bis Freitag" }, "50 Winkel, Lieferung bis Freitag oder bis Montag.", "de");
  assert.equal(delivery.deliveryWish, null);
  assert.match(delivery.missingInformation.join(" "), /Widersprüchliche Lieferwünsche/);
  const alternative = reconcileInquiry(empty, "50 Winkel, Lieferung bis Freitag oder Montag.", "de");
  assert.equal(alternative.deliveryWish, null);
  assert.match(alternative.missingInformation.join(" "), /Widersprüchliche Lieferwünsche/);
});

test("literal presence alone cannot turn a part into a material or a count into a delivery wish", () => {
  const result = reconcileInquiry({ ...empty, material: "Haltewinkel", deliveryWish: "50 Haltewinkel" }, "Wir benötigen 50 Haltewinkel.", "de");
  assert.equal(result.material, null);
  assert.equal(result.deliveryWish, null);
  const unusualMaterial = reconcileInquiry({ ...empty, material: "PEEK" }, "Wir benötigen 50 Halter aus PEEK.", "de");
  assert.equal(unusualMaterial.material, "PEEK");
});

test("prices and drawing-analysis claims in model source echoes never become displayed facts", () => {
  const text = "Angebotspreis 999 Euro. Zeichnung analysiert.";
  const result = reconcileInquiry({ ...empty, service: "Angebotspreis 999 Euro", material: "999 Euro", deliveryWish: "Zeichnung analysiert", summary: text }, text, "de");
  assert.equal(result.service, null);
  assert.equal(result.material, null);
  assert.equal(result.deliveryWish, null);
  assert.doesNotMatch(result.summary, /999|analysiert/);
});

test("drawings are detected from text even when model omits them; generic attachment is not a drawing", () => {
  const result = reconcileInquiry(empty, "50 Haltewinkel. Die Zeichnung folgt.", "de");
  assert.equal(result.drawingMentioned, true);
  assert.match(result.missingInformation.join(" "), /manuell prüfen.*nicht analysiert/);
  assert.equal(reconcileInquiry({ ...empty, drawingMentioned: true }, "50 Haltewinkel. Ein Anhang folgt.", "de").drawingMentioned, false);
});

test("schema always requires exactly nine correctly typed fields", () => {
  assert.ok(inquiryResultSchema.safeParse(empty).success);
  for (const field of fields) {
    const missing = { ...empty } as Record<string, unknown>;
    delete missing[field];
    assert.equal(inquiryResultSchema.safeParse(missing).success, false, field);
  }
  for (const invalid of [{ ...empty, evidence: {} }, { ...empty, attachmentMentioned: false }, { ...empty, missingInformation: null }, { ...empty, quantity: "50" }, { ...empty, quantity: 1.5 }, { ...empty, drawingMentioned: null }, { ...empty, material: "" }]) {
    assert.equal(inquiryResultSchema.safeParse(invalid).success, false);
  }
});

test("many conflicting quantities cannot overflow the validated question length", () => {
  const text = Array.from({ length: 80 }, (_, index) => `${index + 1} Stück`).join(", ");
  assert.ok(text.length <= 1000);
  const result = reconcileInquiry(empty, text, "de");
  assert.equal(result.quantity, null);
  assert.ok(result.missingInformation.every(item => item.length <= 300));
  assert.match(result.missingInformation.join(" "), /widersprüchlich/);
});

test("both English website examples retain their source facts", () => {
  const [laser, incomplete, welding] = getInquiryExamples("en").map(example => reconcileInquiry(empty, example.inquiry, "en"));
  assert.equal(laser.quantity, 50);
  assert.equal(laser.material, "stainless steel 1.4301");
  assert.equal(laser.thicknessMm, 3);
  assert.equal(laser.deliveryWish, "within three weeks");
  assert.equal(laser.drawingMentioned, true);
  assert.equal(incomplete.quantity, 120);
  assert.equal(incomplete.material, "aluminium");
  assert.equal(incomplete.unit, "pieces");
  assert.match(incomplete.summary, /approximately/);
  assert.equal(welding.quantity, null);
  assert.equal(welding.material, "steel");
  assert.equal(welding.deliveryWish, null);
});

test("edited text is passed to the SDK unchanged, without example lookup or response cache", async () => {
  const seen: string[] = [];
  const client = new OpenAI({ apiKey: "mock-only", maxRetries: 0, fetch: async (_url, init) => {
    seen.push(JSON.parse(String(init?.body)).input[0].content);
    return response(empty);
  } });
  const store: RateStore & { state: RateState } = {
    state: { attempts: {}, leases: {} },
    async transaction(operation) { return operation(this.state); },
  };
  let now = 1_790_000_000_000;
  const handler = createInquiryHandler({
    config: () => getInquiryConfig({ OPENAI_API_KEY: "mock-only-not-a-real-key", INQUIRY_RATE_LIMIT_SECRET: "b".repeat(64) }),
    store: () => store, now: () => now, environment: () => "development",
    analyze: (input, model) => analyzeInquiry(input, model, client),
  });
  const original = getInquiryExamples("de")[0].inquiry;
  const edited = original.replace("50 Haltewinkel", "65 Haltewinkel").replace("3 mm", "4 mm");
  for (const [text, count, thickness] of [[original, 50, 3], [edited, 65, 4], [edited, 65, 4]] as const) {
    const result = await handler(new Request("http://localhost:3000/api/analyze-inquiry/", {
      method: "POST", headers: { "Content-Type": "application/json", origin: "http://localhost:3000" },
      body: JSON.stringify({ inquiry: text, model: "gpt-5-nano", locale: "de" }),
    }));
    assert.equal(result.status, 200);
    assert.match(result.headers.get("cache-control") ?? "", /no-store/);
    const body = inquirySuccessSchema.parse(await result.json());
    assert.equal(body.result.quantity, count);
    assert.equal(body.result.thicknessMm, thickness);
    now += COOLDOWN_MS;
  }
  assert.deepEqual(seen, [original, edited, edited]);
});

test("production SDK client has zero automatic retries and a bounded timeout", () => {
  const client = createOpenAIClient("mock-only");
  assert.equal(client.maxRetries, 0);
  assert.equal(client.timeout, 45_000);
});
