export const MAX_INQUIRY_LENGTH = 3000;
export const MOCK_DELAY_MS = 1100;

export type InquiryResult = {
  service: string | null;
  quantity: number | null;
  unit: string | null;
  material: string | null;
  thicknessMm: number | null;
  deliveryWish: string | null;
  attachmentMentioned: boolean | null;
  missingInformation: string[];
  summary: string;
};

type InquiryExample = {
  id: "laser" | "incomplete" | "welding";
  label: string;
  inquiry: string;
  result: InquiryResult;
};

// Prepared fixtures only. Free text must never receive an unrelated example result.
const examples: Record<"de" | "en", InquiryExample[]> = {
  de: [
    {
      id: "laser",
      label: "Laserfertigung",
      inquiry: "Guten Tag, wir benötigen 50 Haltewinkel aus Edelstahl 1.4301, Blechstärke 3 mm. Die Zeichnung ist im Anhang. Die Lieferung sollte innerhalb von drei Wochen erfolgen. Bitte senden Sie uns ein Angebot.",
      result: {
        service: "Haltewinkel",
        quantity: 50,
        unit: "Stück",
        material: "Edelstahl 1.4301",
        thicknessMm: 3,
        deliveryWish: "innerhalb von drei Wochen",
        attachmentMentioned: true,
        missingInformation: ["Maße und Geometrie: Die erwähnte Zeichnung wird in dieser Demo nicht gelesen."],
        summary: "Angebotsanfrage für 50 Haltewinkel aus Edelstahl 1.4301 mit 3 mm Blechstärke. Gewünschte Lieferung innerhalb von drei Wochen. Die erwähnte Zeichnung muss manuell geprüft werden.",
      },
    },
    {
      id: "incomplete",
      label: "Unvollständige Anfrage",
      inquiry: "Hallo, wir brauchen ungefähr 120 Blechteile aus Aluminium. Könnten Sie uns einen Preis machen? Genauere Informationen können wir nachreichen.",
      result: {
        service: "Blechteile",
        quantity: 120,
        unit: "Stück (ungefähr)",
        material: "Aluminium",
        thicknessMm: null,
        deliveryWish: null,
        attachmentMentioned: false,
        missingInformation: ["Genaue Maße und Geometrie", "Blechstärke", "Zeichnung", "Liefertermin", "Materialgüte", "Verbindliche Stückzahl (ungefähr 120 genannt)"],
        summary: "Preisanfrage für ungefähr 120 Blechteile aus Aluminium. Für eine Angebotsvorbereitung fehlen unter anderem Maße, Blechstärke, Zeichnung und Liefertermin.",
      },
    },
    {
      id: "welding",
      label: "Reparaturschweißen",
      inquiry: "Sehr geehrte Damen und Herren, wir möchten ein beschädigtes Stahlbauteil reparieren lassen. Wir könnten es nächste Woche vorbeibringen. Ist eine Reparaturschweißung bei Ihnen möglich?",
      result: {
        service: "Reparaturschweißung an einem Stahlbauteil",
        quantity: null,
        unit: null,
        material: "Stahl (Materialgüte nicht angegeben)",
        thicknessMm: null,
        deliveryWish: null,
        attachmentMentioned: false,
        missingInformation: ["Mengenangabe", "Materialgüte", "Bauteilmaße bzw. Materialstärke", "Schadensbeschreibung oder Zeichnung", "Gewünschter Fertigstellungstermin"],
        summary: "Anfrage zur Reparaturschweißung eines beschädigten Stahlbauteils. „Nächste Woche vorbeibringen“ beschreibt die Anlieferung, keinen Fertigstellungstermin. Eine verbindliche Mengenangabe fehlt.",
      },
    },
  ],
  en: [
    {
      id: "laser",
      label: "Laser manufacturing",
      inquiry: "Hello, we need 50 brackets made from stainless steel 1.4301, sheet thickness 3 mm. The drawing is attached. Delivery should be within three weeks. Please send us a quotation.",
      result: {
        service: "Brackets",
        quantity: 50,
        unit: "pieces",
        material: "Stainless steel 1.4301",
        thicknessMm: 3,
        deliveryWish: "within three weeks",
        attachmentMentioned: true,
        missingInformation: ["Dimensions and geometry: the drawing mentioned is not read in this demo."],
        summary: "Quotation request for 50 brackets in stainless steel 1.4301 with a sheet thickness of 3 mm. Delivery requested within three weeks. The drawing mentioned requires manual review.",
      },
    },
    {
      id: "incomplete",
      label: "Incomplete inquiry",
      inquiry: "Hi, we need approximately 120 sheet metal parts made from aluminium. Could you give us a price? We can provide more details later.",
      result: {
        service: "Sheet metal parts",
        quantity: 120,
        unit: "pieces (approximately)",
        material: "Aluminium",
        thicknessMm: null,
        deliveryWish: null,
        attachmentMentioned: false,
        missingInformation: ["Exact dimensions and geometry", "Sheet thickness", "Drawing", "Delivery date", "Material grade", "Confirmed quantity (approximately 120 mentioned)"],
        summary: "Price inquiry for approximately 120 aluminium sheet metal parts. Dimensions, thickness, drawing and delivery date are among the details still needed to prepare a quotation.",
      },
    },
    {
      id: "welding",
      label: "Repair welding",
      inquiry: "Dear team, we would like to have a damaged steel component repaired. We could bring it in next week. Do you offer repair welding?",
      result: {
        service: "Repair welding of a steel component",
        quantity: null,
        unit: null,
        material: "Steel (grade not specified)",
        thicknessMm: null,
        deliveryWish: null,
        attachmentMentioned: false,
        missingInformation: ["Quantity", "Material grade", "Component dimensions or material thickness", "Description of damage or drawing", "Requested completion date"],
        summary: "Inquiry about repair welding of a damaged steel component. “Bring it in next week” refers to drop-off, not a completion date. No confirmed quantity is provided.",
      },
    },
  ],
};

export function getInquiryExamples(locale: string): InquiryExample[] {
  return examples[locale === "de" ? "de" : "en"];
}

export function findInquiryExample(inquiry: string, locale: string) {
  const normalize = (text: string) => text.trim().replace(/\s+/g, " ");
  return getInquiryExamples(locale).find(
    (example) => normalize(example.inquiry) === normalize(inquiry),
  );
}

export function getEmptyMockResult(summary: string, missingInformation: string[]): InquiryResult {
  return {
    service: null,
    quantity: null,
    unit: null,
    material: null,
    thicknessMm: null,
    deliveryWish: null,
    attachmentMentioned: null,
    missingInformation,
    summary,
  };
}
