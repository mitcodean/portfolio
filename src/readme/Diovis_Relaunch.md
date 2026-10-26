# Diovis Website-Relaunch – Bestandsaufnahme und Abnahme

Nachfolgende gezielte Wiederherstellung von Hero, Navigation, Sprachschalter und
Über-uns-Querformatbild: siehe [Diovis_UI_Korrekturen.md](Diovis_UI_Korrekturen.md).
Dieser Bericht dokumentiert den ursprünglichen Relaunch-Stand; insbesondere die
Messung ohne Hero-Video ist nach der ausdrücklich gewünschten Wiederherstellung historisch.

Arbeitsbranch: `codex/diovis-website-relaunch`, Ausgangsstand `efd4458b`.
Keine Veröffentlichung und keine Änderung von Hosting oder produktiven Zugangsdaten.

## Bestandsaufnahme vor der Umsetzung

- Next.js 16.1.1 App Router, React 19, TypeScript, Tailwind 4, next-intl (DE/EN).
- Markenbasis: Navy `#0F172A`, Rot `#B22222`, helle Texte, abgerundete Karten und feine Rahmen.
- Die Homepage hatte keinen individuellen HTML-Titel und keinen Canonical. 20 Elemente hatten
  im initialen Produktions-HTML `opacity:0`; ein 6,51-MB-Hintergrundvideo startete automatisch.
- Die bisherigen Leistungs- und Kontakt-URLs hatten im lokalen Produktionsbetrieb
  Weiterleitungsschleifen. Header/Footer führten teilweise nur zu Startseitenankern.
- Über-uns und Leistungen enthielten eine Portfolio-/Agenturausrichtung, nicht bestätigte
  Preispakete und für den B2B-Schwerpunkt wenig hilfreiche Inhalte.
- Das Kontaktformular zeigte auch bei Versandfehlern Erfolg und öffnete automatisch ein Mailprogramm.
- Video, Anfrageassistent, Zod-Schema, API-Anbindung und serverseitige Limits sind vorhanden.
- Ein echtes Gründerfoto ist unter `public/Dean.jpg` vorhanden; Originalgröße 2,46 MB.
- Impressum, Datenschutz und AGB bleiben als Inhalte erhalten. Unbestätigte Geschäftsadresse,
  UID-Platzhalter und bestehende Rechtstexte sind vor einer Veröffentlichung gesondert zu prüfen.
- Die Produktivdomain war zunächst nicht eindeutig aus dem Projekt ableitbar. Der Inhaber
  hat anschließend `mitcodea.com` bestätigt; `SITE_URL` ist auf `https://mitcodea.com` gesetzt.

Die Vorher-Messung liegt lokal unter `.diovis/relaunch-baseline.json`. Sie ist eine Messung von
ausgeliefertem HTML und referenzierten Skriptgrößen im lokalen Produktionsbetrieb, kein Lighthouse-
oder Core-Web-Vitals-Ergebnis. Homepage: 129.554 Byte HTML, 818.184 Byte referenziertes JavaScript
(258.568 Byte Gzip-Schätzung). Über-uns: 31 zunächst unsichtbare Elemente.

## Redaktionelle Leitplanken

Persönlicher Ansprechpartner: Dean-Silviu Mitco. IT-Ausbildung an der HTL Steyr abgeschlossen;
Berufserfahrung in Softwareentwicklung seit Juli 2025. Junges, inhabergeführtes Unternehmen.
Wohnort Losenstein; Einzugsgebiet Steyr, Steyr-Land und Umgebung. Kein behaupteter Firmensitz in
Steyr, keine erfundenen Kundenprojekte, Bewertungen, Zertifikate oder Teammitglieder.
Die Angebote folgen ausschließlich dem bestätigten Katalog (13 Automatisierungs-/Software-,
9 IT-/Netzwerk- und 4 Web-/Sichtbarkeitsleistungen). Keine unbelegten Einsparungs- oder Preisversprechen.

## Fachliche Grundlage

- [Google: JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics):
  wichtige Inhalte und konsistente Canonicals bereits im HTML bereitstellen.
- [Google: Organization](https://developers.google.com/search/docs/appearance/structured-data/organization):
  nur relevante und bestätigte Unternehmensdaten auszeichnen; keine erfundene Adresse ergänzen.
- [Google: hilfreiche Inhalte](https://developers.google.com/search/docs/fundamentals/creating-helpful-content):
  konkrete Inhalte für tatsächliche Besucher; regionale Begriffe natürlich und ohne Stadtseiten-Serien.
- [next-intl Routing](https://next-intl.dev/docs/routing/configuration):
  vorhandene Internationalisierung erhalten; öffentliche Pfade und Sprachwechsel konsistent halten.

## Umsetzung und Prüfprotokoll

### UI/UX und Inhalte

- Die bestehende Navy-/Rot-Marke, das Logo, dunkle Karten, Rahmen, Rundungen und
  Termin-CTAs bleiben erhalten. Einheitliche Inter-Schrift, Abstände, Inhaltsbreiten,
  Kontraste, Fokuszustände und reduzierte Bewegung ersetzen uneinheitliche Effekte.
- Hauptnavigation und Footer führen auf fünf tatsächliche Seiten. Das mobile Menü
  verwendet ein natives `details`/`summary`, funktioniert ohne JavaScript und lässt sich
  mit Escape schließen. Der Sprachwechsel behält die aktuelle Unterseite bei.
- Startseite: klare Positionierung, priorisierte Leistungskarten, Problem-/Lösungsbeispiele,
  Video-Vorschau als verlinktes Standbild, echte Gründer-Vorschau und ruhiger Gesprächs-CTA.
- Leistungen: alle 26 bestätigten Angebote in drei Bereichen, verständlich gruppiert,
  mit Nutzen, möglichen Anwendungen, Bereichsnavigation und passenden Kontaktwegen.
- Über uns: echtes Gründerfoto, abgeschlossene HTL-IT-Ausbildung, Softwareentwicklungserfahrung
  seit Juli 2025, persönliche Arbeitsweise und nachvollziehbarer Zusammenarbeitsablauf.
  Losenstein ist ausdrücklich Wohnort; Steyr und Steyr-Land sind Einzugsgebiet.
- Kontakt: vorhandene E-Mail-/Telefon-/Calendly-Daten, klare Formularlabels, passende
  Themenauswahl, Feldfehler, Versand-, Erfolgs- und Fehlerzustand. Kein fingierter Versanderfolg.
- Praxisbeispiele: vorhandenes Video, schriftliche Ablaufbeschreibung und Einstieg in
  den unveränderten Anfrageassistenten. Wiedergabe erst auf Klick, `preload="none"`.
- Calendly öffnet weiterhin über normale Links in einem neuen Tab mit `noopener noreferrer`.
  Kein neues Widget, keine Tracking- oder Analyseintegration und kein eingebetteter Standortplan.
- Die Cookie-Hinweise beschreiben jetzt die tatsächlich verwendeten notwendigen Funktionen.
  Eine Zustimmung zu einer nicht mehr eingebundenen Google-Karte wird nicht angeboten.
  Speicherung der Auswahl und die vorhandene Consent-Schnittstelle bleiben erhalten.

### Routing und SEO

| Seite | Deutsch | Englisch |
|---|---|---|
| Startseite | `/de/` | `/en/` |
| Leistungen | `/de/leistungen/` | `/en/services/` |
| Über uns | `/de/ueber-uns/` | `/en/about/` |
| Kontakt | `/de/kontakt/` | `/en/contact/` |
| Praxisbeispiele | `/de/praxisbeispiele/` | `/en/praxisbeispiele/` |
| Anfrageassistent | `/de/praxisbeispiele/anfrageassistent/` | `/en/praxisbeispiele/anfrageassistent/` |

Bestehende anderssprachige Aliase, `/projects`, `/portfolio`, `/reach-out`, `/home`
und `/startseite` bleiben als permanente Weiterleitungen erhalten. Die bisherigen
Weiterleitungsschleifen sind behoben. Unbekannte Pfade liefern HTTP 404 mit hilfreichen
Links und `noindex`; sprachabhängige 404-Seiten sind vorhanden.

Die öffentlichen Inhaltsseiten werden beim Build als statisches HTML erzeugt (SSG).
Texte, Überschriften, Navigation und Metadaten sind ohne Client-JavaScript vorhanden.
Die Interaktion der Demo bleibt clientseitig, ihre KI-Auswertung serverseitig.
`html lang` stimmt in DE/EN auch nach einem Sprachwechsel. Die wichtigsten Seiten
haben eindeutige Titel, Descriptions, eine H1 und nachvollziehbare Überschriften.

`SITE_URL=https://mitcodea.com` liefert Canonicals, DE-/EN-/x-default-Hreflang,
absolute Social-URLs, Sitemap und JSON-LD. Die Sitemap enthält 16 eindeutige kanonische
Inhalts-/Rechtsseiten; die interaktive Demo wird nicht indexiert. Es werden keine
beliebigen Änderungsdaten oder Alias-URLs in die Sitemap geschrieben.

JSON-LD: Organization und WebSite auf der Startseite, drei Service-Einträge auf der
Leistungsseite, BreadcrumbList bei Unterseiten. Keine Anschrift, LocalBusiness-Klassifikation,
Bewertungen, Öffnungszeiten, Preise oder unbestätigten Unternehmensdaten. Die Ausgabe
wird gegen Script-Abschlusszeichen abgesichert. Social-Grafik und Favicons nutzen das echte Logo.

Die regionalen Begriffe richten sich auf Softwareentwicklung, Geschäftsprozessautomatisierung,
Schnittstellen und IT für Steyr/Steyr-Land. Losenstein wird als Wohnort genannt. Die Recherche
war qualitativ; es wurden keine Suchvolumen oder Rankingversprechen abgeleitet. Es gibt keine
automatisch vervielfachten Stadtseiten und keine behauptete SPS-/Industrieanlagen-Spezialisierung.

### Notwendige SEO-Konfiguration vor einer späteren Veröffentlichung

1. Die kanonische Domain ist durch den Inhaber bestätigt: `https://mitcodea.com`.
2. `SITE_URL=https://mitcodea.com` in der jeweiligen Server-/Build-Umgebung setzen,
   ohne Unterpfad, Zugangsdaten, Query oder Fragment. Lokal und in `.env.example` ist dies
   bereits vorbereitet. Bestehende E-Mail-/Versandadressen sind eigenständige Einstellungen.
3. Für lokale Vorschauen und Staging `SITE_INDEXABLE=false` belassen. Erst im ausdrücklich
   freigegebenen Produktivbuild `SITE_INDEXABLE=true` setzen.
4. Danach neu bauen und den Server neu starten. Die statischen Metadaten entstehen beim Build.
5. Auf dem tatsächlich veröffentlichten System Canonicals, Hreflang, Sitemap, robots.txt,
   Weiterleitungen, HTTPS und HTTP-Status erneut prüfen. Anschließend Sitemap in der
   Google Search Console einreichen, URL-Prüfung und Rich Results Test/Schema-Validator nutzen.

**Aktueller Stand:** Die bestätigte Origin `https://mitcodea.com` ist in der lokalen
`.env.local` und der schlüsselfreien `.env.example` konfiguriert. Dadurch enthält der lokale
Build absolute Canonicals, Sprachalternativen, Social-URLs, JSON-LD und 16 Sitemap-Einträge
für diese Domain. `SITE_INDEXABLE=false` bleibt gesetzt: Die lokale Vorschau liefert weiterhin
`noindex` und eine robots-Sperre. Die Freigabe für Suchmaschinen erfolgt erst für einen
ausdrücklich genehmigten Produktivbuild. Keine DNS-, Hosting- oder produktiven Einstellungen
wurden geändert; die Bestätigung der Domain ist keine Veröffentlichungsfreigabe.

Nach der Domain-Ergänzung erneut geprüft: Produktionsbuild erfolgreich, 21 Website-/
Formulartests bestanden. Zwölf ausgelieferte DE-/EN-Seiten enthalten die korrekten
`https://mitcodea.com`-Canonicals, drei Sprachalternativen, gültiges JSON-LD und die absolute
Social-Bild-URL. Alle 16 Sitemap-Einträge verwenden diese Origin. `noindex` und die lokale
robots-Sperre bleiben aktiv. Protokoll: `.diovis/relaunch-domain-check.json` (nicht versioniert).

### Sicherheit und Formular

Die Dateien der KI-API, Extraktionsregeln, Zod-Datenstruktur und Kontingentverwaltung wurden
nicht geändert. Weiterhin: zwei freigegebene Modelle, fünf Versuche je Besucher UND Netzwerk
in 24 Stunden, globales Limit, Mindestabstand, Parallelitätsgrenze, persistente Zähler,
abgesicherte Besucheridentität, begrenzte Ein-/Ausgabe, Timeout und keine automatischen Retries.
`INQUIRY_UNLIMITED_LOCAL_TESTS=false`; vorhandene Zähler wurden nicht zurückgesetzt.
`.env.local`, API-Schlüssel und Hosting-/Standalone-Konfiguration bleiben unverändert.

Für eine spätere öffentliche KI-Demo gelten weiterhin die Redis-/vertrauenswürdiger-Proxy-
Voraussetzungen aus `Diovis_KI_Setup.md`; der aktuelle lokale Modus wird nicht öffentlich geöffnet.

Das Kontaktformular nutzt gemeinsam im Browser und auf dem Server ein Zod-Schema.
JSON-Typ, Origin, Bodygröße, Lesedauer, Feldlängen und ein Honeypot werden geprüft.
Der Empfänger kommt ausschließlich vom Server. Benutzereingaben werden für HTML-E-Mails
escaped; Providerfehler und Inhalte werden nicht protokolliert oder an Besucher ausgegeben.
Erfolg erscheint ausschließlich nach Annahme durch Resend, nicht als Garantie einer Zustellung
im Posteingang. Bestehende Resend-/Kontakt-Konfiguration wird weiterverwendet.

Interner Geheimnis-Scan: 131 Projektdateien und 58 Dateien unter `.next/static`, drei lokale
Geheimniswerte geprüft, keine Treffer. Es wurden nur Ergebniszahlen ausgegeben, keine Werte.
Nur die schlüsselfreie `.env.example` wird versioniert.

### Tatsächlich ausgeführte Prüfungen

- `npm run test:site`: **23/23 bestanden**. Leistungskatalog, Routen, Domain-/Indexierungsgate,
  eindeutige Metadaten, Canonicals/Hreflang, Sitemap, strukturierte Daten und Formularhandler
  einschließlich ungültiger Eingaben, HTML-Escaping, Fehlern und fehlender Konfiguration.
- Regression für den Aufruf ohne Sprachpräfix: `/` muss absolut auf `/de/` weiterleiten.
  Ein nachträgliches Umschreiben des next-intl-Location-Headers zu `/de/` verursachte im
  Next-Proxy-Adapter `ERR_INVALID_URL` und HTTP 500. Die originale absolute Weiterleitung
  bleibt jetzt erhalten; localhost, Loopback-IP, Produktiv-Origin, Query-Parameter und bereits
  lokalisierte Pfade werden getestet. Die ursprüngliche HTTP-Prüfung erfasste nur die bereits
  sprachpräfixierten Seiten; der direkte Root-Aufruf gehört jetzt zur Abnahme.
  Nach der Korrektur im Entwicklungsserver und nach erfolgreichem Produktionsbuild geprüft:
  Root-Aufruf über localhost und Loopback-IP leitet mit 307 weiter und endet auf HTTP 200;
  der bestehende Leistungs-Alias bleibt eine permanente 308-Weiterleitung. Für die lokale
  Weiterarbeit läuft anschließend ausschließlich `next dev` auf Port 3000.
- `npm run test:inquiry`: **85/85 bestanden**. Bestehende SDK-/Schema-/Extraktions-/Limit-Tests
  für beide Modelle, einschließlich der sechs Mengen-/Konfliktfälle und drei Demo-Anfragen.
- `npm run build`: **erfolgreich**, statische Unternehmensseiten in DE/EN.
- `npx tsc --noEmit`: erfolgreich. `npm run lint`: keine Fehler; drei bereits bestehende
  Warnungen in `postcss.config.mjs`, `smooth-cursor.tsx` und `demoData.js`.
- HTTP-Prüfung am lokalen Produktionsbuild: zwölf Haupt-/Demoseiten HTTP 200, eine H1,
  passende HTML-Sprache und Descriptions; elf permanente Weiterleitungen, 18 funktionierende
  interne Links, 404/noindex für unbekannte Pfade; Favicons, Social-Bild, robots und Sitemap HTTP 200.
- Browser: sechs Seiten bei **360/390/768/1440 px**, insgesamt 24 Ansichten, kein horizontaler
  Überlauf. Zusätzlich englische Desktopnavigation am 1024-px-Übergang geprüft.
- Browser: mobiles Menü, Escape/Fokusrückgabe, Sprachwechsel auf derselben Unterseite,
  Formular-Pflichtfelder/Fokus, Versandfehler und Erfolg, alle drei Demobeispiele, bearbeiteter
  Text samt Modell im Request, leere Anfrage, Ergebnis, offene Werte, simulierte Freigabe und
  KI-Fehleranzeige geprüft. Video startet auf Klick und lässt sich per Tastatur pausieren.
- Axe am lokalen Testaufbau auf sechs Seiten: keine automatisch erkannten WCAG-A/AA-Verstöße.
  Gradient-Kontraste und Video-Untertitel werden als manuelle Prüfung gemeldet. Basis-Text-/
  Button-Farbpaare liegen zwischen 5,14:1 und 9,85:1. Dies ist keine WCAG-Zertifizierung.
- Die Browser-POSTs liefen über einen temporären lokalen Mock-Proxy, der **keine** POSTs an
  echte Dienste weiterleitet. Nur fiktive Angaben; keine echten E-Mails, kostenpflichtigen
  KI-Aufrufe oder zurückgesetzten Kontingente. Der Test-Proxy wurde danach beendet und entfernt.

### Vorher/Nachher: lokale Produktionsmessung vor Ergänzung der Domain

| Homepage-Messwert | Vorher | Nachher |
|---|---:|---:|
| HTML | 129.554 Byte | 105.504 Byte |
| Referenzierte JS-Dateien | 818.184 Byte | 583.810 Byte |
| Gzip-Schätzung derselben Dateien | 258.568 Byte | 183.233 Byte |
| Initial unsichtbare Elemente | 20 | 0 |
| Automatisch startende Videos | 1 | 0 |

Das sind rund 28,6 % weniger referenziertes JavaScript, ohne ein initiales 6,51-MB-
Hintergrundvideo. Das Gründerfoto wird als WebP mit 78.530 statt 2.464.526 Byte verwendet;
das Original bleibt erhalten. Schriften werden mit `display: swap` eingebunden. Das Video
auf der Praxisbeispielseite hat reservierte Abmessungen und lädt bedarfsgerecht.

Diese Werte beschreiben lokale Dateien/HTML und eine Gzip-Schätzung, keine gemessenen
Lighthouse-Punkte oder Core Web Vitals. LCP, INP und CLS müssen auf dem späteren Hosting
mit realen Geräten/Netzen beziehungsweise Felddaten geprüft werden. Rohmessungen und
Screenshots liegen lokal im ignorierten `.diovis/`-Ordner.

### Vor Veröffentlichung noch gesondert zu klären

- **Produktive Übernahme und Indexierungsfreigabe** wie oben beschrieben. Die Domain selbst
  ist bestätigt und lokal eingetragen.
- **Bestehende Rechtstexte**: offizielle Unternehmens-/Registerangaben, tatsächliche Geschäfts-
  und Zustellanschrift, UID-/Gewerbe-Platzhalter sowie Domainbezüge bestätigen. Vorhandene
  Datenschutzhinweise für OpenAI, Resend, Calendly und notwendige Cookies fachlich prüfen lassen.
  Keine Rechtsprüfung oder Bestätigung der inhaltlichen Vollständigkeit durch diesen Relaunch.
- **Englische AGB**: `section14Desc2`, `section15` und `section15Desc` fehlen bereits im Bestand.
  Die vorhandenen Texte bleiben erhalten; fehlende Übersetzungen werden nicht durch technische
  Schlüsselnamen oder erfundene Klauseln ersetzt. Vor Veröffentlichung fachlich übersetzen lassen.
- **Video**: Die bestehende MP4 enthält eine Audiospur und hat keine verifizierte synchronisierte
  Untertiteldatei. Der sichtbare schriftliche Ablauf ist vorhanden; für eine vollständige
  Beurteilung der Video-Barrierefreiheit werden Toninhalt und passende Untertitel benötigt.
- **Abhängigkeiten**: `npm audit --omit=dev` meldet im bereits bestehenden Paketbestand
  22 Befunde (2 kritisch, 14 hoch, 5 mittel, 1 niedrig), darunter Next.js 16.1.1 und transitiv
  `proxy-addr`. Das ist eine Paketprüfung, kein Nachweis der konkreten Ausnutzbarkeit jeder
  Meldung. Vor Veröffentlichung gezielt aktualisieren und anschließend Build, Demo und Routing
  erneut prüfen. Kein pauschales `audit fix --force`, keine Paket-/Lockfile- oder Hostingänderung.
- **Externe Abnahme** nach genehmigter Veröffentlichung: Search Console, strukturierte Daten,
  mobile Performance/Core Web Vitals, tatsächlicher E-Mail-Versand und Kalenderterminablauf.

Es fehlen für die neue Darstellung keine erfundenen Referenzen, Teamfotos oder Kundenzahlen.
Das echte Foto und der bestätigte Kalenderlink sind vorhanden. Ein offizieller Standort wird
erst nach Bestätigung zusätzlich ausgezeichnet.

### Geänderte Dateien nach Aufgabenbereich

- Inhalte: `src/content/site.ts`, `src/content/services.ts`, Cookie-Hinweise in
  `src/messages/de.json` und `src/messages/en.json`.
- Gemeinsame Darstellung: `src/components/site/*`, `navbar/Navbar.tsx`, `footer/Footer.tsx`,
  `LanguageSwitcherSelect.tsx`, `cookie/CookieConsent.tsx`, `cookie/CookieSettingsButton.tsx`,
  `src/app/globals.css`, beide App-Layouts und `src/config/fonts.ts`.
- Seiten: Homepage und deren Hero-/Leistungs-/About-/CTA-Sections; Services/Leistungen,
  About/Über-uns, Contact/Kontakt; Praxisbeispiele-/Demo-Seitenrahmen;
  Aliase und 404-Seiten. Rechtstext-Seiten nur für Metadata, Sprache, Links, Struktur und
  Kontrast; vorhandene Textformulierungen bleiben erhalten.
- Demo-Einbettung: `inquiry/InquiryProvider.tsx` (gezielte Sprachpakete), minimale Abstände
  in `InquiryShowcase.tsx`. Analysekomponente, Video-Komponente und KI-Backend unverändert.
- SEO/Routing: `src/config/site.ts`, `src/lib/site-seo.ts`, `src/i18n/routing.ts`, `src/proxy.ts`,
  `src/app/robots.ts`, `src/app/sitemap.ts` und `.env.example`.
- Kontakt: `src/components/site/ContactForm.tsx`, `src/lib/contact/schema.ts`,
  `src/lib/contact/handler.ts`, `src/app/api/contact/route.ts`.
- Assets: `public/images/dean-mitco.webp`, `public/images/diovis-social.png`,
  `public/apple-touch-icon.png`, `src/app/favicon.ico`.
- Tests/Dokumentation: `tests/site.test.ts`, `tests/contact.test.ts`, Testskript in
  `package.json`, dieser Bericht und Verweise in der vorhandenen Demo-Dokumentation.

### Git und Veröffentlichung

Alle Relaunch-Änderungen stehen lokal auf `codex/diovis-website-relaunch` zur Prüfung bereit.
Kein Wechsel auf main, kein Merge, Force-Push, Git-Push, Deployment oder Hosting-Eingriff.
Die bestehende Live-Website bleibt unverändert. Zugangsdaten und lokale Kontingente bleiben erhalten.
