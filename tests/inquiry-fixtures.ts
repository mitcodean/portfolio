import { getInquiryExamples } from "../src/data/inquiry-examples";
import type { InquiryResult } from "../src/lib/inquiry/schema";

// Simulated upstream responses for contract/security tests; NEVER used by the application.
const inquiries = getInquiryExamples("de");
export const inquiryFixtures: { inquiry: string; extraction: InquiryResult }[] = [
  {
    inquiry: inquiries[0].inquiry,
    extraction: {
      service: "Haltewinkel", quantity: 50, unit: null, material: "Edelstahl 1.4301", thicknessMm: 3,
      deliveryWish: "innerhalb von drei Wochen", drawingMentioned: true,
      missingInformation: ["Maße und Geometrie aus der Zeichnung manuell prüfen"], summary: "50 Haltewinkel angefragt.",
    },
  },
  {
    inquiry: inquiries[1].inquiry,
    extraction: {
      service: "Blechteile", quantity: 120, unit: null, material: "Aluminium", thicknessMm: null,
      deliveryWish: null, drawingMentioned: false,
      missingInformation: ["Genaue Maße", "Blechstärke", "Zeichnung", "Liefertermin", "Materialgüte"], summary: "Unvollständige Anfrage.",
    },
  },
  {
    inquiry: inquiries[2].inquiry,
    extraction: {
      service: "Reparaturschweißung", quantity: null, unit: null, material: "Stahl", thicknessMm: null,
      deliveryWish: null, drawingMentioned: false,
      missingInformation: ["Menge", "Materialgüte", "Fertigstellungstermin"], summary: "Reparatur angefragt, Fertigstellung offen.",
    },
  },
];
