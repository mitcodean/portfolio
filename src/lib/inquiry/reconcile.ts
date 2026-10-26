import "server-only";
import { inquiryResultSchema, type InquiryResult } from "./schema";

const normalize = (text: string) => text.normalize("NFKC").replace(/\s+/g, " ").trim().toLowerCase();
const unique = (values: string[]) => [...new Map(values.map(value => [normalize(value), value.trim()])).values()];
const parts = /(?:teile?|winkel|halter(?:ungen)?|platten?|bleche?|baugruppen?|komponenten?|schrauben?|muttern|rohre?|profile?|gehäuse|flansche|bolzen|brackets?|parts?|plates?|assemblies|components?|bolts?|screws?|tubes?|gaskets?)$/iu;
const notAComponent = /^(?:mm|cm|m|kg|g|liter|tage?|tagen|wochen?|monate?|stunden?|days?|weeks?|months?|hours?|euro|eur|usd|preis|material|werkstoff|edelstahl|stahl|aluminium|aluminum|alu|steel|stainless|din|en|iso|und|oder|bis|weiter|aus|für|noch|am|ab|zum|von|auf|ca|ungefähr|innerhalb|lieferung|liefertermin|freitag|montag|dienstag|mittwoch|donnerstag|samstag|sonntag|januar|februar|märz|april|mai|juni|juli|august|september|oktober|november|dezember)$/iu;
const countWords: Record<string, number> = { eins: 1, zwei: 2, drei: 3, vier: 4, fünf: 5, sechs: 6, sieben: 7, acht: 8, neun: 9, zehn: 10, zwanzig: 20, fünfzig: 50, hundert: 100, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, twenty: 20, fifty: 50, hundred: 100 };
const unsafeFact = /€|\b(?:EUR|USD|Euro|Preis|Kosten|price|cost|gelesen|analysiert|analyzed|instructions?|ignorier\w*|ignore)\b/iu;

function findSource(text: string, proposed: string | null) {
  if (!proposed || unsafeFact.test(proposed)) return null;
  const escaped = proposed.trim().split(/\s+/).map(word => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("\\s+");
  return new RegExp(escaped, "iu").exec(text);
}

function componentAt(text: string): string | null {
  // Skip modifiers, including English "sheet metal parts", without crossing punctuation.
  const phrase = text.trimStart().match(/^[\p{L}][\p{L}\s-]{0,100}/u)?.[0] ?? "";
  for (const word of phrase.trim().split(/\s+/).slice(0, 4)) {
    if (notAComponent.test(word)) return null;
    if (parts.test(word) || /^\p{Lu}/u.test(word)) return word;
  }
  return null;
}

export function extractQuantity(text: string) {
  const tokens = [...text.matchAll(/\d{1,3}(?:[ .]\d{3})+(?![\d.,])|\d+(?:[.,]\d+)*/g)].map(match => ({ raw: match[0], start: match.index, end: match.index + match[0].length }));
  for (const match of text.matchAll(new RegExp(`\\b(${Object.keys(countWords).join("|")})\\b`, "giu"))) {
    tokens.push({ raw: match[0], start: match.index, end: match.index + match[0].length });
  }
  const candidates: { value: number; component: string | null; start: number }[] = [];
  let ambiguous = false;
  for (const token of tokens.sort((a, b) => a.start - b.start)) {
    if (token.start > 0 && /[\p{L}\p{N}.,]/u.test(text[token.start - 1])) continue;
    const before = text.slice(0, token.start);
    const after = text.slice(token.end);
    const pieceUnit = after.match(/^\s*(?:stück(?:e)?|stueck(?:e)?|stk\.?|pcs\.?|pieces?|units?)(?=\s|$|[,.;:])/iu);
    const times = after.match(/^\s*[x×](?=\s|$|[,.;:]|\p{L})\s*/iu);
    const component = componentAt(after.slice(pieceUnit?.[0].length ?? times?.[0].length ?? 0));
    const labeled = /(?:menge|stückzahl|anzahl|quantity|qty)\s*[:=]?\s*$/iu.test(before.slice(-35));
    const measurement = /^\s*(?:mm|cm|kg|g|tage?|wochen?|days?|weeks?)\b/iu.test(after);
    const dimension = /^\s*[x×]\s*\d/iu.test(after);
    const codeOrMeasurement = /(?:artikel(?:nummer)?|nr\.?|din|iso|werkstoff|güte|blechstärke|materialstärke|wandstärke|dicke|stärke|länge|breite|durchmesser|thickness|length|width|diameter)\s*[:=]?\s*$/iu.test(before.slice(-35));
    if (measurement || dimension || (!pieceUnit && !times && !labeled && (!component || codeOrMeasurement))) continue;
    const value = countWords[normalize(token.raw)] ?? (/^\d{1,3}(?:[ .]\d{3})+$/.test(token.raw) ? Number(token.raw.replace(/[ .]/g, "")) : Number(token.raw.replace(",", ".")));
    if (!Number.isSafeInteger(value) || value < 0) { ambiguous = true; continue; }
    candidates.push({ value, component, start: token.start });
    if (/(?:nicht|keine?|not|[-−])\s*$/iu.test(before.slice(-15))) ambiguous = true;
    const alternative = before.match(/(\d+)\s*(?:oder|or|und|and|bis|to|[-–/])\s*$/iu);
    if (alternative && Number(alternative[1]) !== value) ambiguous = true;
  }
  const values = [...new Set(candidates.map(candidate => candidate.value))];
  const components = unique(candidates.flatMap(candidate => candidate.component ? [candidate.component] : []));
  const conflict = ambiguous || values.length > 1 || components.length > 1;
  const quantity = !conflict && values.length === 1 ? values[0] : null;
  const approximate = candidates.some(candidate => /(?:ungefähr|circa|ca\.|etwa|approximately|about|around)\s*$/iu.test(text.slice(Math.max(0, candidate.start - 25), candidate.start)));
  return { quantity, conflict, values, components, approximate };
}

function extractThickness(text: string) {
  const values: number[] = [];
  const label = "(?:blech[- ]?stärke|material[- ]?stärke|wand[- ]?stärke|dicke|stärke|thickness)";
  for (const match of text.matchAll(/(\d+(?:[.,]\d+)?)\s*(mm|cm)\b/giu)) {
    const before = text.slice(Math.max(0, match.index - 45), match.index);
    const after = text.slice(match.index + match[0].length, match.index + match[0].length + 12);
    const range = new RegExp(`${label}\\s*[:=]?\\s*(\\d+(?:[.,]\\d+)?)\\s*(mm|cm)?\\s*(?:oder|or|bis|to|[-–/])\\s*$`, "iu").exec(before);
    if (!new RegExp(`${label}\\s*(?::|=|von|of)?\\s*$`, "iu").test(before) && !/^\s*(?:dick|stark|thick)\b/iu.test(after) && !range) continue;
    values.push(Number(match[1].replace(",", ".")) * (match[2].toLowerCase() === "cm" ? 10 : 1));
    if (range) values.push(Number(range[1].replace(",", ".")) * ((range[2] ?? match[2]).toLowerCase() === "cm" ? 10 : 1));
  }
  const distinct = [...new Set(values)];
  return { value: distinct.length === 1 ? distinct[0] : null, conflict: distinct.length > 1 };
}

function extractMaterial(text: string, proposed: string | null) {
  const found: string[] = [];
  for (const match of text.matchAll(/\b(stainless\s+steel|edelstahl|aluminium|aluminum|alu|stahl|steel|messing|brass|kupfer|copper|titanium|titan|kunststoff|plastic)([\p{L}-]*)/giu)) {
    if (match[2] && !parts.test(match[1] + match[2]) && !/^bauteil(?:e)?$/iu.test(match[2])) continue;
    found.push(/^alu$/iu.test(match[1]) ? "Aluminium" : match[1]);
  }
  const bases = unique(found);
  const grades = unique([...text.matchAll(/\b(?:1\.\d{4}|EN\s*AW[- ]?\d{4}|S\d{3}[A-Z0-9]*|DC\d{2})\b/giu)].map(match => match[0]));
  const open = /(?:material|werkstoff)[^.!?;]{0,25}(?:offen|unklar|unbekannt|noch\s+nicht|not\s+(?:known|specified|decided))/iu.test(text);
  const conflict = bases.length > 1 || grades.length > 1;
  if (open || conflict) return { value: null, conflict };
  if (bases.length === 1) return { value: [bases[0], grades[0]].filter(Boolean).join(" "), conflict: false };
  const match = findSource(text, proposed);
  const context = match ? text.slice(Math.max(0, match.index - 35), match.index) : "";
  // Rare material names may come from the model, but must appear in a material context.
  const supported = match && /(?:aus|material|werkstoff|made\s+(?:from|of))\s*[:=]?\s*$/iu.test(context);
  return { value: supported ? match[0] : grades[0] ?? null, conflict: false };
}

function extractDelivery(text: string, proposed: string | null) {
  const candidates: { value: string; start: number; end: number }[] = [];
  const days = "Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday";
  const patterns = [
    /\binnerhalb\s+(?:von\s+)?(?:\d+|ein(?:er|em|en)?|zwei|drei|vier|fünf|sechs|sieben|acht|neun|zehn)\s+(?:(?:arbeits|werk)tage?n?|wochen?|monate?n?)\b/giu,
    /\bwithin\s+(?:\d+|one|two|three|four|five|six|seven|eight|nine|ten)\s+(?:working\s+)?(?:days?|weeks?|months?)\b/giu,
    new RegExp(`\\b(?:bis\\s+(?:spätestens\\s+)?|spätestens\\s+(?:bis\\s+)?|by\\s+|before\\s+|no later than\\s+)(?:(?:nächsten|kommenden|diesen|next|this)\\s+)?(?:${days}|nächste(?:r|n)?\\s+Woche|next week|\\d{1,2}\\.\\d{1,2}(?:\\.\\d{2,4})?)\\b`, "giu"),
  ];
  for (const pattern of patterns) for (const match of text.matchAll(pattern)) candidates.push({ value: match[0], start: match.index, end: match.index + match[0].length });
  const isDropOff = (start: number, end: number) => {
    const before = text.slice(Math.max(text.lastIndexOf(".", start - 1) + 1, start - 60), start);
    const after = text.slice(end, end + 40).split(/[.!?;]/)[0];
    return /vorbeibringen|anliefern|abholen|bring|drop.?off|collect/iu.test(before + after) && !/fertig|fertigstellung|completion|complete|ready/iu.test(before);
  };
  const valid = candidates.filter(candidate => !isDropOff(candidate.start, candidate.end));
  const distinct = unique(valid.filter(candidate => !valid.some(other => other !== candidate && other.start <= candidate.start && other.end >= candidate.end && other.value.length > candidate.value.length)).map(candidate => candidate.value));
  const alternative = valid.some(candidate => new RegExp(`^\\s*(?:oder|or|und|and)\\s+(?:${days})\\b`, "iu").test(text.slice(candidate.end)));
  if (distinct.length) return { value: distinct.length === 1 && !alternative ? distinct[0] : null, conflict: distinct.length > 1 || alternative };
  if (proposed && /\d{1,2}[./-]\d|\b(?:Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Woche\w*|Tag\w*|Monat\w*|morgen|übermorgen|week\w*|day\w*|month\w*|tomorrow)\b/iu.test(proposed)) {
    const match = findSource(text, proposed);
    if (match && !isDropOff(match.index, match.index + match[0].length) && /liefer|fertig|benötig|brauchen|delivery|complete|ready|need/iu.test(text.slice(Math.max(0, match.index - 60), match.index))) return { value: match[0], conflict: false };
  }
  return { value: null, conflict: false };
}

function extractService(text: string, components: string[], proposed: string | null) {
  const services = unique([...text.matchAll(/\b(?:Reparaturschweißung|Reparaturschweißen|Schweißen|Laserschneiden|Laserfertigung|CNC[- ]?Fräsen|Pulverbeschichtung|Eloxierung|Blechbiegen|repair welding|laser cutting|powder coating)\b/giu)].map(match => match[0]));
  const nouns = components.length ? components : unique([...text.matchAll(/\b[\p{L}-]*(?:haltewinkel|stahlwinkel|blechteile?|stahlbauteile?|brackets?|components?)\b/giu)].map(match => match[0]));
  const explicit = unique([...services, ...nouns]);
  if (explicit.length) return explicit.join(" – ").slice(0, 300);
  const match = findSource(text, proposed);
  if (!match || notAComponent.test(match[0])) return null;
  const before = text.slice(Math.max(0, match.index - 60), match.index);
  // A rare service must itself be requested, not just be another literal input field.
  return /(?:benötigen|brauchen|wünschen|anfragen|need|request|fertigen\s+Sie)\s+(?:(?:eine?n?|das|die|a|an|some)\s+)?$/iu.test(before) ? match[0] : null;
}

/** Conservative reconciliation of explicit source facts; no model-response cache or mock lookup. */
export function reconcileInquiry(model: InquiryResult, text: string, locale: "de" | "en"): InquiryResult {
  const count = extractQuantity(text);
  const thickness = extractThickness(text);
  const material = extractMaterial(text, model.material);
  const delivery = extractDelivery(text, model.deliveryWish);
  const service = extractService(text, count.components, model.service);
  const drawingMentioned = /zeichnung|drawings?/iu.test(text);
  const de = locale === "de";
  const result: InquiryResult = {
    service, quantity: count.quantity, unit: count.quantity === null ? null : de ? "Stück" : "pieces",
    material: material.value, thicknessMm: thickness.value, deliveryWish: delivery.value, drawingMentioned,
    missingInformation: [], summary: "Pending source verification.",
  };
  const missing: string[] = [];
  const conflictValues = count.values.length ? ` (${count.values.slice(0, 8).join(" / ")}${count.values.length > 8 ? " / …" : ""})` : "";
  if (count.conflict) missing.push(de ? `Unklare oder widersprüchliche Stückzahlen${conflictValues}: verbindliche Menge bestätigen.` : `Unclear or conflicting quantities${conflictValues}: confirm the quantity.`);
  else if (count.quantity === null) missing.push(de ? "Verbindliche Stückzahl klären." : "Confirm the quantity.");
  else if (count.approximate) missing.push(de ? "Ungefähre Stückzahl genannt: verbindliche Menge bestätigen." : "An approximate quantity was given: confirm the exact count.");
  if (!service) missing.push(de ? "Leistung oder Bauteil benennen." : "Specify the service or component.");
  if (material.conflict) missing.push(de ? "Widersprüchliche Materialangaben: Material und Güte klären." : "Conflicting materials: confirm material and grade.");
  else if (!result.material) missing.push(de ? "Material und Materialgüte klären." : "Specify material and grade.");
  else if (!/\d/u.test(result.material)) missing.push(de ? "Materialgüte oder genaue Materialbezeichnung bei Bedarf präzisieren." : "Clarify material grade or exact specification if needed.");
  if (thickness.conflict) missing.push(de ? "Widersprüchliche Materialstärken: Stärke klären." : "Conflicting thicknesses: confirm the material thickness.");
  else if (result.thicknessMm === null) missing.push(de ? "Materialstärke klären, falls für den Auftrag relevant." : "Specify material thickness if relevant to this request.");
  if (delivery.conflict) missing.push(de ? "Widersprüchliche Lieferwünsche: gewünschten Termin bestätigen." : "Conflicting delivery dates: confirm the requested date.");
  else if (!result.deliveryWish) missing.push(de ? "Gewünschten Liefer- oder Fertigstellungstermin klären." : "Specify the requested delivery or completion date.");
  if (/reparatur|repair/iu.test(service ?? "")) missing.push(de ? "Schadensbild und Reparaturumfang fachlich prüfen." : "Have damage and repair scope reviewed by a specialist.");
  if (drawingMentioned) missing.push(de ? "Erwähnte Zeichnung einschließlich Maße und Geometrie manuell prüfen; Inhalte wurden nicht analysiert." : "Review the drawing mentioned, including dimensions and geometry, manually; contents were not analyzed.");
  else if (!/\d+\s*[x×]\s*\d+|abmess|maße|dimensions?/iu.test(text)) missing.push(de ? "Zeichnung oder Abmessungen bei Bedarf nachreichen." : "Provide a drawing or dimensions if needed.");
  result.missingInformation = missing;
  const facts = [
    service && `${de ? "Leistung / Bauteil" : "Service / component"}: ${service}`,
    count.quantity !== null && `${de ? "Menge" : "Quantity"}: ${count.approximate ? de ? "ungefähr " : "approximately " : ""}${count.quantity} ${result.unit}`,
    result.material && `Material: ${result.material}`,
    result.thicknessMm !== null && `${de ? "Materialstärke" : "Material thickness"}: ${result.thicknessMm} mm`,
    result.deliveryWish && `${de ? "Lieferwunsch" : "Requested delivery"}: ${result.deliveryWish.replace(/[.!?]+$/, "")}`,
  ].filter(Boolean);
  result.summary = facts.length ? `${facts.join(". ")}.` : de ? "Keine eindeutigen Fertigungsangaben gefunden. Bitte die Anfrage ergänzen." : "No unambiguous manufacturing details found. Please complete the inquiry.";
  if (count.conflict) result.summary += de ? " Die Stückzahl ist widersprüchlich oder unklar." : " The quantity is conflicting or unclear.";
  return inquiryResultSchema.parse(result);
}
