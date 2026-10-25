type InquiryExample = { id: "laser" | "incomplete" | "welding"; label: string; inquiry: string };

const examples: Record<"de" | "en", InquiryExample[]> = {
  de: [
    { id: "laser", label: "Laserfertigung", inquiry: "Guten Tag, wir benötigen 50 Haltewinkel aus Edelstahl 1.4301, Blechstärke 3 mm. Die Zeichnung ist im Anhang. Die Lieferung sollte innerhalb von drei Wochen erfolgen. Bitte senden Sie uns ein Angebot." },
    { id: "incomplete", label: "Unvollständige Anfrage", inquiry: "Hallo, wir brauchen ungefähr 120 Blechteile aus Aluminium. Könnten Sie uns einen Preis machen? Genauere Informationen können wir nachreichen." },
    { id: "welding", label: "Reparaturschweißen", inquiry: "Sehr geehrte Damen und Herren, wir möchten ein beschädigtes Stahlbauteil reparieren lassen. Wir könnten es nächste Woche vorbeibringen. Ist eine Reparaturschweißung bei Ihnen möglich?" },
  ],
  en: [
    { id: "laser", label: "Laser manufacturing", inquiry: "Hello, we need 50 brackets made from stainless steel 1.4301, sheet thickness 3 mm. The drawing is attached. Delivery should be within three weeks. Please send us a quotation." },
    { id: "incomplete", label: "Incomplete inquiry", inquiry: "Hi, we need approximately 120 sheet metal parts made from aluminium. Could you give us a price? We can provide more details later." },
    { id: "welding", label: "Repair welding", inquiry: "Dear team, we would like to have a damaged steel component repaired. We could bring it in next week. Do you offer repair welding?" },
  ],
};

export function getInquiryExamples(locale: string): InquiryExample[] {
  return examples[locale === "de" ? "de" : "en"];
}

export function findInquiryExample(inquiry: string, locale: string) {
  const normalize = (text: string) => text.trim().replace(/\s+/g, " ");
  return getInquiryExamples(locale).find(example => normalize(example.inquiry) === normalize(inquiry));
}
