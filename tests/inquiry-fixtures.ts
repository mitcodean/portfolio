import { getInquiryExamples } from "../src/data/inquiry-examples";
import type { Extraction } from "../src/lib/inquiry/analyze";

// Simulated upstream responses for contract/security tests; NEVER used by the application.
const inquiries = getInquiryExamples("de");
export const inquiryFixtures: { inquiry: string; extraction: Extraction }[] = [
  {
    inquiry: inquiries[0].inquiry,
    extraction: {
      service: "Haltewinkel", quantity: 50, unit: null, material: "Edelstahl 1.4301", thicknessMm: 3,
      deliveryWish: "innerhalb von drei Wochen", attachmentMentioned: true,
      missingInformation: ["Maße und Geometrie aus der Zeichnung manuell prüfen"], summary: "50 Haltewinkel angefragt.",
      evidence: { service: "50 Haltewinkel", quantity: "50 Haltewinkel", material: "Edelstahl 1.4301", thicknessMm: "Blechstärke 3 mm", deliveryWish: "innerhalb von drei Wochen", attachmentMentioned: "Die Zeichnung ist im Anhang." },
    },
  },
  {
    inquiry: inquiries[1].inquiry,
    extraction: {
      service: "Blechteile", quantity: 120, unit: null, material: "Aluminium", thicknessMm: null,
      deliveryWish: null, attachmentMentioned: false,
      missingInformation: ["Genaue Maße", "Blechstärke", "Zeichnung", "Liefertermin", "Materialgüte"], summary: "Unvollständige Anfrage.",
      evidence: { service: "120 Blechteile", quantity: "ungefähr 120 Blechteile", material: "Aluminium", thicknessMm: null, deliveryWish: null, attachmentMentioned: null },
    },
  },
  {
    inquiry: inquiries[2].inquiry,
    extraction: {
      service: "Reparaturschweißung", quantity: null, unit: null, material: "Stahl", thicknessMm: null,
      deliveryWish: null, attachmentMentioned: false,
      missingInformation: ["Menge", "Materialgüte", "Fertigstellungstermin"], summary: "Reparatur angefragt, Fertigstellung offen.",
      evidence: { service: "Reparaturschweißung", quantity: null, material: "Stahlbauteil", thicknessMm: null, deliveryWish: null, attachmentMentioned: null },
    },
  },
];
