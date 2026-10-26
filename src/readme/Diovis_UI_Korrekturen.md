# Diovis – gezielte Wiederherstellung nach dem Relaunch

Arbeitsbranch: `codex/diovis-website-relaunch`.
Der zuvor uncommittete Relaunch wurde nach Geheimnisprüfung im lokalen Commit
`b6b61eb6` gesichert. Keine Änderungen verworfen und nichts gepusht.

## Originalquellen

Referenz ist Commit `efd4458b`, auch Stand des Branches
`codex/diovis-anfrageassistent-ui`:

- `src/app/[locale]/sections/hero/Hero.tsx`: ursprünglicher Video-Hintergrund,
  vollflächiges Layout, Schriftgrößen 5xl/6xl/7xl/8xl, magnetische Wörter,
  gestaffelte Federanimation und runder CTA mit wanderndem Pfeilkreis.
- `src/components/navbar/Navbar.tsx`: transparente Navigation, Scroll-Schwelle
  von 20 px, Wechsel von h-20 auf h-14, Blur/Rahmen/Schatten, rote aktive Unterlinie,
  Hover-Zustände und animiertes mobiles Vollbild-Menü.
- `src/components/LanguageSwitcherSelect.tsx`: transparenter nativer Sprachschalter,
  graue Schrift, ursprüngliche Abstände und separates Chevron.
- `src/app/[locale]/about/page.tsx` und `public/milky-way.jpg`: ursprüngliches
  dekoratives Querformatmotiv nach dem Seitenintro.

Die alten Dateien dienten gezielt als Referenz. Das neue Routing, die Inhaltsseiten,
SEO-Ausgabe, Kontaktformular- und KI-Implementierung wurden nicht zurückgesetzt.

## Umsetzung

Der ursprüngliche Hero ist wieder vorhanden, einschließlich `flow-animation.mp4`,
seiner Überlagerung, dem unteren Verlauf, Typografie und Wort-Hover. Die H1 lautet
wieder „Entdecke das Potenzial hinter jedem Prozess.“; die alternativen magnetischen
Wörter sind ebenfalls erhalten. Die Texte sind in DE/EN lokalisiert.

Unter der H1 steht die gewünschte vollständige Beschreibung von Software,
Geschäftsprozessautomatisierung und IT-Infrastruktur. Die große ergänzende Botschaft
lautet „Weniger Routinearbeit. Bessere digitale Abläufe.“.

Der ursprüngliche rote Pillen-Button mit verschiebbarem Pfeilkreis heißt jetzt
„Kostenloses Erstgespräch“ und verwendet den vorhandenen Calendly-Link mit neuem Tab.
„Automatisierung live ansehen“ ist als sekundärer Pillen-Button daneben angeordnet
und führt auf die bestehende Praxisbeispielseite. Auf Smartphones stehen beide untereinander.
Die Komponenten rendern echte Links mit korrekter Semantik, ohne verschachtelte Buttons.

**Nachträgliche mobile Korrektur:** Unter 640 px verwendet der Hero die kürzere
Beschreibung „Individuelle Software, automatisierte Abläufe und IT für Ihr Unternehmen.“
Die zusätzliche große Botschaft ist dort ausgeblendet. Die H1 und beide Aktionen
bleiben sichtbar; die vollständige Desktop-Darstellung bleibt erhalten.

Die Navbar nutzt wieder die ursprünglichen Scroll-, Underline-, Hover- und
Menüanimationen. Ihre fünf Links verwenden weiterhin die neuen echten Unterseiten.
Die Demo aktiviert den übergeordneten Punkt „Praxisbeispiele“. Der aktuelle
rechteckige Erstgespräch-Button bleibt erhalten.

Das mobile Menü sperrt den Hintergrund, hält den Tastaturfokus im Menü und gibt ihn
beim Schließen zurück. Escape und der Wechsel zur Desktopansicht schließen es.
Animierte Elemente berücksichtigen reduzierte Bewegung. Das dekorative Hero-Video
lässt sich pausieren und wird bei reduzierter Bewegung ausgeblendet.
Server-HTML bleibt sichtbar; es gibt keine dauerhafte Verbergung wichtiger Texte ohne JavaScript.

Der Sprachschalter hat wieder das Originaldesign. Die aktuelle Routenzuordnung aus
dem Relaunch bleibt erhalten, einschließlich deutscher/englischer URL-Aliase.
Er wird erst bedienbar, wenn die Sprachwechsel-Funktion im Browser bereit ist.

Die bisher getrennten Relaunch-Übersetzungen sind in die vorhandenen
`src/messages/de.json` und `en.json` übernommen. `src/content/site.ts` und
`services.ts` sind nur typisierte Zugriffe auf diese Wörterbücher.
Es gibt keinen zusätzlichen Sprachrouter und keine doppelt gepflegten Übersetzungstabellen.
Ein Vergleich gegen den Sicherungscommit bestätigt: Die akzeptierten Relaunch-Texte
und alle 26 Leistungen sind bei dieser Übernahme unverändert geblieben.

Das echte ursprüngliche `milky-way.jpg` bleibt unverändert. Für die Darstellung
entstand daraus eine WebP-Datei (1.110.096 statt 1.601.144 Byte), die verzerrungsfrei,
mit reserviertem Platz und Lazy Loading eingebunden wird. Das Motiv ist dekorativ
und wird entsprechend vor Screenreadern verborgen.
Die Bildhöhe ist auf Wunsch gegenüber der ersten Wiederherstellung halbiert:
bei 1440 px Ansichtsbreite rund 178 statt 356 px; bei 390 px rund 82 statt 164 px.

## Geänderte Dateien

- `src/app/[locale]/sections/hero/Hero.tsx` und neues `HeroContent.tsx`
- `src/components/navbar/Navbar.tsx`
- `src/components/LanguageSwitcherSelect.tsx`
- `src/components/ui/morphing-cursor.tsx` (Originaleffekt, semantische Spans,
  dekorative Hover-Ebene, Animation nur bei Hover und ohne reduzierte Bewegung)
- `src/app/[locale]/layout.tsx` (lokalisierte Navbar-Beschriftungen)
- `src/components/site/AboutPage.tsx` (Querformatstreifen)
- `src/app/globals.css` (reduzierte Bewegung des Hero-Videos)
- `src/messages/de.json`, `src/messages/en.json`, die beiden `src/content/*`-Zugriffe
- `public/images/milky-way.webp`
- `tests/site.test.ts` und dieser Bericht

## Prüfung

- 24 Website-/Formulartests und 85 bestehende KI-Tests bestanden.
- TypeScript ohne Fehler. ESLint ohne Fehler; drei bestehende Warnungen bleiben.
- 24 Browseransichten: sechs Haupt-/Demoseiten bei 360/390/768/1440 px,
  ohne horizontalen Überlauf. Englische Navbar zusätzlich bei 1024 px geprüft.
- Mobile Sprachwechsel DE → EN und Desktop-Sprachwechsel EN → DE auf allen sechs
  Seiten geprüft: passende Route, HTML-Sprache, Inhalte und aktiver Menüpunkt.
- Ursprünglicher Wort-Hover, Scroll-Verkleinerung von ca. 80 auf 56 px,
  2-px-Unterlinie, mobiles Öffnen/Schließen, Escape, CTA-Ziele und Bildhöhe geprüft.
- Keine echten KI-Aufrufe oder E-Mails. Backend, Modellwahl, Schlüssel, Kontingente,
  Hosting-Konfiguration und produktive Einstellungen unverändert.

Der ausdrücklich wiederhergestellte Hintergrundfilm und die Animationen werden wieder
auf der Startseite verwendet. Die frühere Relaunch-Messung ohne Hero-Video beschreibt
deshalb nicht mehr deren aktuellen Medienbedarf. Das Originalvideo wurde nicht ersetzt.

Produktionsbuild erfolgreich. Anschließend zwölf DE-/EN-Seiten mit HTTP 200 geprüft,
einschließlich unveränderter Canonicals für `mitcodea.com`, JSON-LD, lokalem `noindex`,
sichtbarem Hero im Server-HTML und funktionierender Root-Weiterleitung.
Die Browserkonsole der abschließenden Produktionsprüfung enthält keine Warnungen oder Fehler.
Die geprüften Screenshots und lokalen Messprotokolle liegen im ignorierten Ordner `.diovis/`.
