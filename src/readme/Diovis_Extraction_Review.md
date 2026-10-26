# Anfrageassistent: Extraktionsprüfung

## Befund im bestehenden Code

Der Browser sendete bereits den aktuellen kontrollierten Textarea-Wert. Die Beispielauswahl
setzte nur den Eingabetext; `demoData.js` und vorbereitete Ergebnisse wurden nicht verwendet.
Antworten wurden ohne Cache verarbeitet, beim Bearbeiten verworfen und über AbortController
gegen verspätete Antworten abgesichert. Es gab keine Überschreibung durch Frontend-Standardwerte.

Die entscheidenden Schwächen lagen im serverseitigen Abgleich:

- Das Modell musste zusätzlich zum Ergebnis ein separates `evidence`-Objekt liefern. Richtige
  Fakten konnten verloren gehen, wenn dieses zusätzliche Zitat fehlte oder anders formuliert war.
  Bei Textfeldern wurde außerdem eine wörtliche Übereinstimmung der gesamten Modellformulierung verlangt.
- Für Zahlen wurde nur geprüft, ob dieselbe Zahl im Zitat vorkam. Ihr Kontext (Stückzahl,
  Millimeter, Werkstoffnummer, Zeitraum) war nicht ausreichend abgesichert.
- Widersprüchliche Mengen hatten keine ausdrückliche Konfliktbehandlung.
- Fragen und Mengenqualifizierungen konnten variieren; „ungefähr“ wurde in das Einheitenfeld geschrieben.

## Umsetzung

`inquiryResultSchema` ist der einzige Ausgabevertrag. `zodTextFormat` erzeugt daraus das strikte
JSON-Schema für `responses.parse`; dasselbe Schema prüft die Rohantwort, das abgeglichene Ergebnis,
die API-Rückgabe und den Empfang im Browser. Alle neun Felder sind erforderlich; zusätzliche Felder
führen zu einem Validierungsfehler. `drawingMentioned` ersetzt das
bisherige `attachmentMentioned`. Der Boolean bedeutet ausschließlich eine Erwähnung im Text.

Systemanweisungen mit vollständigen Few-Shot-Beispielen unterscheiden Mengen, Maße, Werkstoffe,
Termine und Unsicherheit. Anschließend prüft `reconcileInquiry` eindeutige Angaben direkt am
aktuellen Eingabetext. Dies ist ein allgemeiner Regelabgleich, keine Zuordnung zu Beispiel-IDs oder
gespeicherten Mock-Ergebnissen. Klare Mengen werden auch bei Modell-Auslassungen erkannt;
Konflikte führen zu `null` und einer Rückfrage. Kein Aufaddieren getrennter Positionen.

Zusammenfassung und Rückfragen entstehen aus den geprüften Feldern. Seltene Material-/Leistungs-
oder Terminformulierungen aus der Modellantwort werden nur bei passendem Quelltext übernommen.
Preisangaben und Behauptungen einer Zeichnungsanalyse werden nicht als Fakten übernommen.
Die bestehende Oberfläche, Freigabesimulation und Calendly-Verlinkung bleiben bestehen.

## Automatisierte Prüfung

`npm run test:inquiry`: **85 bestandene Tests**, keine echten API-Aufrufe.
Die sechs geforderten Fälle werden für beide Modelle jeweils mit vier unterschiedlichen
simulierten Antworten durch das offizielle SDK geprüft. Verglichen werden die vollständigen
abgeglichenen Ergebnisse, nicht nur die sprachliche Zusammenfassung.

| Eingabe | Verifiziertes Ergebnis |
| --- | --- |
| 50 Haltewinkel aus Edelstahl 1.4301, Blechstärke 3 mm | 50 Stück, Edelstahl 1.4301, 3 mm |
| ungefähr 120 Blechteile aus Aluminium | 120 Stück, Aluminium, ungefähr im Überblick |
| 25 Stk. Stahlwinkel | 25 Stück, Stahl |
| eine Reparaturschweißung | Menge und Einheit `null` |
| 50 Stück bis spätestens Freitag, Material noch offen | 50 Stück, Material `null`, Lieferwunsch erhalten |
| 50 Stück und später 70 Stück | Menge und Einheit `null`, Konflikt mit 50/70 sichtbar |

Zusätzlich geprüft: 50x, Zahlwörter, Tausenderzahlen, Nullwerte, Mengenbereiche, mehrere Positionen,
negative/fractionale Mengen, Maße statt Stückzahl, cm→mm, widersprüchliche Materialstärken,
Materialien und Termine, englische Beispiele, Zeichnungsbezug ohne Dateiinhalt, nachträglich
bearbeitete Texte, exakte Pflichtfelder/Datentypen und fehlende automatische SDK-Wiederholungen.
Die bisherigen Schutztests für fünf Versuche/24 Stunden, globale Grenze, Parallelität, Wartezeit,
Cookies, Origin, Dateizähler, Redis-Atomarität, Fehlerfälle und nicht erlaubte Modelle bestehen.

TypeScript-Prüfung, Produktionsbuild und ESLint für alle geänderten Code-Dateien bestehen.
Alle 51 Dateien unter `.next/static` wurden auf den lokalen API-Schlüssel geprüft; kein Treffer.
Der projektweite Lint hat weiterhin einen Fehler in der unveränderten Datei
`src/components/cookie/CookieConsent.tsx:41` (`react-hooks/set-state-in-effect`) sowie bestehende
Warnungen außerhalb dieser Änderung.

Die Mocks ersetzen keine statistische Qualitätsmessung der beiden Live-Modelle. Ein erneuter
Live-Test wurde wegen des bereits ausgeschöpften lokalen Netzwerkkontingents nicht erzwungen.
Es wurden keine gespeicherten Zähler zurückgesetzt und keine Limits für Tests umgangen.

## Grenzen

Freie Sprache lässt sich weder durch ein JSON-Schema noch durch einen begrenzten Regelabgleich
vollständig absichern. Ungewohnte oder mehrdeutige Formulierungen können zusätzliche Rückfragen
benötigen. Mehrere Positionen erhalten bewusst keine einzelne Gesamtstückzahl; die Anwendung
besitzt kein Positionsschema. Zeichnungsinhalte bleiben unbekannt. Die manuelle Freigabe bleibt nötig.

## Geänderte Dateien

- `src/lib/inquiry/schema.ts`: ein gemeinsames striktes Schema, neun Pflichtfelder.
- `src/lib/inquiry/analyze.ts`: direkte Nutzung dieses Schemas, neuer Prompt und Quelltextabgleich.
- `src/lib/inquiry/prompt.ts` (neu): Extraktionsregeln und vollständige Beispiele.
- `src/lib/inquiry/reconcile.ts` (neu): kontextabhängiger Fakten- und Konfliktabgleich.
- `src/app/[locale]/sections/anfrage-demo/AnfrageDemo.tsx`: `drawingMentioned` auswerten, Layout unverändert.
- `src/messages/de.json`, `src/messages/en.json`: genaue Beschriftung zur Zeichnungserwähnung.
- `tests/inquiry-fixtures.ts`, `tests/inquiry.test.ts`: auf neuen Vertrag umgestellt.
- `tests/inquiry-reliability.test.ts` (neu): Regressionen, Varianten und Konsistenztests.
- `scripts/check-inquiry-live.ts`: Live-Prüfung an Feldnamen und ungefähre Mengen angepasst.
- `package.json`: neue Testdatei in `test:inquiry` aufgenommen; keine neuen Abhängigkeiten.
- `src/readme/Diovis_KI_Setup.md`, dieser Bericht: aktualisierte Einrichtung und Prüfgrenzen.
- `.env.local` (ignoriert, nicht im Git): lokaler Testschalter wieder `false`;
  die lokalen Versuchsgrenzen sind auf Benutzerwunsch wieder aktiviert.

API-Schlüssel und produktive Einstellungen wurden nicht geändert. Modelle bleiben ausschließlich
`gpt-4.1-nano` (Temperatur 0) und `gpt-5-nano` (Reasoning minimal, kein Temperaturparameter).
Je Analyse gibt es genau einen Provider-Aufruf, `maxRetries: 0`, Zeitlimit 45 Sekunden,
maximal 2200 Ausgabe-Tokens und `store: false`.
