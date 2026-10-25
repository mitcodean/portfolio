Diovis – Projektbriefing für die erste KI-Demo
Stand: 25. Oktober 2026
Ziel
In einer vorhandenen React-Website eine funktionierende, lokal vorführbare Demo namens „Diovis Anfrageassistent“ entwickeln. Sie extrahiert aus frei eingegebenem Text einer fiktiven Fertigungs-Kundenanfrage strukturierte Daten zur Angebotsvorbereitung. Die Demo dient dem Test einer Vertriebshypothese, nicht als fertiges Produkt. Sie soll zunächst lokal funktionstüchtig sein; die öffentliche Website kann stattdessen ein Bildschirmvideo zeigen.
Nicht im Umfang
Kein echter E-Mail-Zugriff, kein automatischer E-Mail-Versand, kein ERP, keine Preisermittlung, keine PDF/CAD-Analyse, keine echte Freigabe oder Ablage in Fremdsystemen, keine tatsächlichen Kundendaten.
Nutzerablauf
1. Ein fiktives Anfragebeispiel über einen der drei Auswahlknöpfe einfügen oder eigenen fiktiven Text (max. 3000 Zeichen) eingeben.
2. Mit „Anfrage analysieren“ eine sichere Server-API aufrufen (Ladezustand anzeigen).
3. Ergebnis als übersichtliche Karten/Formular darstellen: Leistung, Menge, Material, Blechstärke (falls vorhanden), Lieferwunsch, „Zeichnung/Anhang erwähnt“, fehlende Angaben, ein kurzer Überblick.
4. Nicht gefundene Felder als „Nicht angegeben“ statt erfundenem Wert ausgeben.
5. Eine lokale „Geprüft“-Aktion ermöglicht die Simulation einer Mitarbeiterfreigabe; kein Speichern und keine Drittintegration.
6. Hinweis permanent anzeigen: „Demo mit fiktiven Angaben. Keine echten Kunden- oder vertraulichen Daten eingeben. Anhänge werden nicht gelesen.“
7. Leicht sichtbarer CTA zur Terminbuchung.
Technischer Vorschlag
- Bestehenden Framework-/Build-Stack beibehalten, React-Komponente AnfrageDemo im vorhandenen Projekt ergänzen.
- Zuerst einen Mock-Modus für das UI entwickeln. Danach eine tatsächliche KI-Auswertung über einen Node/Express-Endpunkt oder vorhandene serverseitige Funktion integrieren.
- Serverroute POST /api/analyze-inquiry mit Payload { "inquiry": "..." } und Ergebnis als JSON.
- OpenAI-JavaScript-SDK mit Responses API + Structured Outputs (responses.parse, zodTextFormat) und einem unterstützten kleinen Textmodell wie gpt-5-mini; Modell per Umgebungsvariable überschreibbar machen.
- Felder des Ergebnisses: service: string | null, quantity: number | null, unit: string | null, material: string | null, thicknessMm: number | null, deliveryWish: string | null, attachmentMentioned: boolean, missingInformation: string[], summary: string.
- Das Modell darf ausschließlich explizite Informationen als Fakten extrahieren. Es darf fehlende Angaben benennen, aber nicht ergänzen. Lieferzeit als ursprünglichen Text belassen.
- Backend prüft Eingabelänge, Eingabetypen und Ausgabe vor Rückgabe; zeigt verständliche Fehler, falls API nicht erreichbar ist.
- API-Key serverseitig ausschließlich OPENAI_API_KEY, nie im React-Client, nicht in VITE_-Variablen und nicht im Git. .env und secrets ignorieren.
- Öffentliche Freischaltung einer echten KI-Demo erst nach Rate Limiting, Kostenlimits, Eingabevalidierung, Datenschutzprüfung und angemessenem Missbrauchsschutz.
- Fehlerfall und langsame Antworten freundlich behandeln, keine erfundenen Erfolgsmeldungen.
- Visuelle Anpassung an bestehendes Design, responsive, Tastaturzugänglichkeit.
- Vor Eingriff: bestehenden Code lesen, Git-Branch anlegen, existierende Website nicht kaputtmachen, Diff prüfen, nachher Tests/Build ausführen.
Testdaten (vollständig fiktiv)
Anfrage 1 – Laserfertigung
Guten Tag, wir benötigen 50 Haltewinkel aus Edelstahl 1.4301, Blechstärke 3 mm. Die Zeichnung ist im Anhang. Die Lieferung sollte innerhalb von drei Wochen erfolgen. Bitte senden Sie uns ein Angebot.
Erwartet: Haltewinkel, Menge 50, Edelstahl 1.4301, 3 mm, Lieferwunsch 3 Wochen, Anhang erwähnt; Zeichnungsinhalte nicht auswertbar.
Anfrage 2 – unvollständig
Hallo, wir brauchen ungefähr 120 Blechteile aus Aluminium. Könnten Sie uns einen Preis machen? Genauere Informationen können wir nachreichen.
Erwartet: Blechteile, ca. 120, Aluminium; fehlend: genaue Maße, Blechstärke, Zeichnung, Termin; nichts dazu erfinden.
Anfrage 3 – Schweißen
Sehr geehrte Damen und Herren, wir möchten ein beschädigtes Stahlbauteil reparieren lassen. Wir könnten es nächste Woche vorbeibringen. Ist eine Reparaturschweißung bei Ihnen möglich?
Erwartet: Reparaturschweißung an Stahlbauteil; Menge, Materialgüte und Fertigstellungstermin unbekannt; „nächste Woche vorbeibringen“ ist KEIN Fertigstellungstermin.
Robustheitstests
- Leere Eingabe wird vor API-Aufruf abgewiesen.
- Anfrage ohne Mengenangabe ergibt null statt Zahl.
- Sehr lange Eingabe >3000 Zeichen wird abgewiesen.
- Zeichnung im Text erwähnt heißt nicht, dass sie gelesen wurde.
- Bei API-Ausfall erscheint eine hilfreiche Fehlermeldung, kein vorgetäuschtes Ergebnis.
- Darstellung auf Smartphone und Desktop funktioniert.
- Benutzer kann Ergebnis als geprüfte Simulation markieren.
Landingpage-Aufbau
1. Hero: „Weniger manuelle Arbeit bei Kundenanfragen.“ / „Diovis zeigt Fertigungs- und technischen Dienstleistungsbetrieben, wie sich wiederkehrende Büroabläufe vereinfachen lassen.“
2. Problem: „Anfragen landen in E-Mails, Informationen müssen herausgelesen und manuell übertragen werden.“ Als allgemeines Beispiel formulieren, keine unbelegten Kundenaussagen.
3. Video oder Demo: 45–75 Sekunden, eigene Fantasiedaten, als Demo gekennzeichnet.
4. Ablauf: Anfrage -> Daten aufbereiten -> Mitarbeiter prüft -> individuelle Anbindung denkbar.
5. Nutzen: Strukturierter Ablauf, weniger Abtippen als potenzielles Ergebnis; keine unbewiesenen Einsparungszahlen.
6. Vertrauensblock: Technischer Hintergrund, Region Steyr, persönliche Umsetzung; keine erfundenen Referenzen.
7. CTA: „20 Minuten: Gemeinsam prüfen, welcher Ablauf bei Ihnen Zeit kostet.“
8. Impressum, Datenschutzhinweise, Hinweis auf fiktive Demo-Daten.
Videodrehbuch (ca. 60 Sekunden)
0–8 s: „Viele Kundenanfragen kommen als Freitext. Relevante Daten müssen erst herausgesucht werden.“
8–22 s: Fiktive Anfrage laden, relevante Stellen zeigen.
22–40 s: „Mit KI analysieren“, Ergebnis mit Produkt, Menge, Material und Lieferwunsch anzeigen.
40–52 s: Auf fehlende Angaben und erforderliche Mitarbeiterprüfung hinweisen.
52–60 s: „Das ist ein Beispielablauf. Welche Aufgaben sich in Ihrem Unternehmen vereinfachen lassen, finden wir gemeinsam heraus.“ CTA einblenden.
Keine Leistungs- oder Zeitersparnis versprechen, die nicht getestet wurde.
Terminbuchung – Calendly (Free)
- Kostenloses Konto erstellen, Kalender verknüpfen, Zeitzone Europe/Vienna kontrollieren.
- Einen Termin-Typ erstellen: „Diovis – 20 Minuten Prozessanalyse“, Dauer 20 Minuten.
- Verfügbarkeit nur außerhalb der Hauptanstellung anbieten, Mindestvorlaufzeit und ggf. Puffer einstellen.
- Optionale Vorabfrage: „Welcher Büroablauf kostet Sie am meisten Zeit?“
- Terminlink auf Website als normalen Link/Button öffnen (zunächst kein eingebettetes Drittanbieterwidget nötig).
- Auf Handy und Desktop in einem privaten Browserfenster Probebuchung durchführen; Kalender-, Bestätigungs- und Erinnerungsablauf prüfen. Testtermin wieder löschen.
- Datenschutzhinweise auf Drittanbieter aktualisieren.
Abnahmekriterien für Woche 1
[ ] 3 Beispielanfragen auswählbar
[ ] Freies Textfeld mit maximal 3000 Zeichen
[ ] Tatsächlicher API-Aufruf lokal funktionsfähig
[ ] Extraktion der verfügbaren Felder ohne erfundene Werte
[ ] Keine PDF-/CAD-Verarbeitung wird vorgetäuscht
[ ] Fehlerfälle und Ladezustand funktionieren
[ ] API-Key sicher und nur serverseitig
[ ] Desktop- und Mobilansicht geprüft
[ ] Bildschirmvideo aufgenommen, 45–75 Sekunden
[ ] Website mit einer klaren Problem-/Lösungsbotschaft
[ ] Buchungslink eingerichtet und getestet
[ ] Impressum/Datenschutz geprüft
Arbeitsreihenfolge
1. Git-Branch / Backup, bestehendes React-Projekt prüfen.
2. AnfrageDemo als UI mit hart codierten Mock-Ergebnissen.
3. KI-API serverseitig integrieren.
4. Drei Beispielanfragen und Robustheitstests abarbeiten.
5. Bildschirmvideo mit OBS oder nativer Bildschirmaufnahme.
6. Landingpage um Video, Ablauf und CTA ergänzen.
7. Calendly konfigurieren, Link einbauen, Probebuchung.
8. Build und mobile Ansicht testen, veröffentlichen.
Konkrete Anweisung an den Coding-Assistenten
„Arbeite nur im freigegebenen Ordner meiner bestehenden React-Website. Lies zuerst die Projektstruktur, vorhandenes Framework, Routing und Deployment. Lege eine neue Git-Branch an und verändere keine bestehenden Produktivdateien unnötig. Setze das vorliegende Diovis_Demo_Briefing.md Schritt für Schritt um. Beginne mit einem UI-Mock und halte nach einem laufenden Zwischenstand für meine Prüfung an. Anschließend baue eine echte, sichere Backend-Anbindung an die OpenAI Responses API mit strukturiertem Output. Verwende serverseitige Geheimnisse, validiere Eingaben und Ausgaben, implementiere Lade- und Fehlerzustände. Lege keine echten Kundendaten ab und publiziere nichts selbstständig. Gib am Ende die geänderten Dateien, Testbefehle, benötigten Umgebungsvariablen und bekannten Einschränkungen an.“
Aktuelle Referenzen
- OpenAI Responses API und strukturierte Ausgaben: https://developers.openai.com/api/docs/guides/structured-outputs
- Modellunterstützung gpt-5-mini: https://developers.openai.com/api/docs/models/gpt-5-mini
- Vite Umgebungsvariablen: https://vite.dev/guide/env-and-mode
- Calendly Free / Eventtyp: https://calendly.com/help/choose-the-right-calendly-plan-for-your-team
- Calendly Website: https://calendly.com/help/how-to-add-calendly-to-your-website
- OBS Quick Start: https://obsproject.com/kb/quick-start-guide
- WKO Impressum: https://www.wko.at/internetrecht/website-impressum