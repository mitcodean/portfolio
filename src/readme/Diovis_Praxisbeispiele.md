# Diovis: Video, Praxisbeispiele und interaktive Demo

## Besucherweg

- Startseite `/de/`: Nach dem unveränderten Hero folgt das Demovideo, anstelle der großen
  interaktiven Demo. Eine kurze Erklärung, drei Ablaufpunkte und zwei klar unterschiedliche
  Aktionen führen zur Demo beziehungsweise zum kostenlosen Erstgespräch.
- `/praxisbeispiele` führt über die vorhandene Sprachweiterleitung zur deutschen Seite
  `/de/praxisbeispiele/`. Auf Englisch: `/en/praxisbeispiele/`.
- Die funktionsfähige interaktive Demo liegt unter
  `/de/praxisbeispiele/anfrageassistent/` beziehungsweise `/en/praxisbeispiele/anfrageassistent/`.
  Die beiden neuen Routen sind im bestehenden next-intl-Routing registriert; der Sprachwechsel
  behält die jeweilige Seite bei. Navigation und Footer enthalten „Praxisbeispiele“.
- Der Abschlussbereich verwendet dieselbe Komponente und Designsprache wie die bisherige
  Termin-Einladung. Keine erfundenen Referenzen oder Zahlen zur Zeitersparnis.

## Video und Terminbuchung

Die vorhandene Aufnahme `public/Videos/anfrage-demo-video.mp4` wird auf der Homepage und der
Praxisbeispiele-Seite eingebunden. Sie hat 1920 × 1080 Pixel, etwa 76 Sekunden und rund 4,97 MB.
`public/Videos/anfrage-demo-poster.png` ist ein kleines Vorschaubild aus dieser Aufnahme.

Der Player reserviert 16:9-Platz, zeigt zunächst das Poster und lädt mit `preload="none"` keine
Videodaten vor dem Abspielen. Nach dem bewussten Klick stehen native Play-/Pause-, Lautstärke-
und Vollbildfunktionen bereit. Kein automatischer Start. Ein Fehlerzustand bietet die direkte
Videodatei an; ein aufklappbarer Text beschreibt den gezeigten Ablauf. Die Aufnahme selbst ist
deutsch; die englische Seite kennzeichnet das. Der Beschreibungstext ist kein wortgetreues Untertitel-Transkript.

Die vorhandene Calendly-Adresse ist bereits eingebunden:
`https://calendly.com/mitco-deansilviu/30min`.
Sie wird zentral in `src/config/diovis.ts` unter `CALENDLY_BOOKING_URL` gepflegt.
Alle Termin-Buttons öffnen mit `target="_blank"` und `rel="noopener noreferrer"` einen neuen Tab.
Kein Calendly-Skript und keine automatische Übertragung von Anfrageinhalten.

## Sperre und unveränderte KI

`INQUIRY_UNLIMITED_LOCAL_TESTS=false` in der ignorierten `.env.local` aktiviert auch lokal wieder
die vorhandenen Serverlimits. `POST /api/analyze-inquiry/` reserviert vor dem Provider-Aufruf
atomar einen Versuch: maximal fünf pro signiertem Besucher-Cookie UND Netzwerk in rollierenden
24 Stunden. Die persistenten Dateizähler überleben Neustarts; im öffentlichen Betrieb ist der
bestehende gemeinsame Redis-Speicher erforderlich. Vorhandene Zähler wurden nicht zurückgesetzt.

Globale Tagesgrenze, Mindestabstand, Parallelitätsgrenze, Origin-/Body-Prüfung, Zeitlimits und
Fehlerbehandlung bleiben bestehen. Der API-Schlüssel bleibt ausschließlich serverseitig.
Extraktionslogik, neun Ergebnisfelder, Modellauswahl und Kostenbegrenzung wurden für diese
UI-Umstellung nicht verändert. Die bisherige Demo-Komponente wird auf der neuen Route weiterverwendet.

## Prüfung

- 85 bestehende Extraktions-, SDK-, Fehler- und Schutztests ohne kostenpflichtige API-Aufrufe.
- Browser: Video startet erst nach Klick; zuvor `readyState=0` und `preload=none`.
- Browser: Video→Demo→Zurück-Navigation, mobiler Menüpunkt, Escape und Sprachwechsel DE→EN.
- Responsive Geometrie bei 320, 375, 768 und 1024 Pixeln: kein horizontaler Überlauf, Video in 16:9.
- Interaktive Demo mit einem temporären lokalen Testproxy: Ergebnisdarstellung, manuelle Freigabe,
  API-Fehlermeldung und leere Eingabe. Der Proxy fängt alle POSTs ab und ist kein Teil der Anwendung.
- HTTP: beide neuen Seiten auf DE/EN, Video-Byte-Ranges für das Spulen, Poster, Eingabe-/Origin-Sperren.
- TypeScript, ESLint der geänderten Dateien und Produktionsbuild.

## Dateien dieser UI-Umstellung

- `src/app/[locale]/page.tsx`: Video-Sektion nach dem Hero.
- `src/app/[locale]/praxisbeispiele/page.tsx` (neu): Praxisbeispiele-Seite mit Metadaten.
- `src/app/[locale]/praxisbeispiele/anfrageassistent/page.tsx` (neu): bestehende Demo auf eigener Route.
- `src/components/inquiry/InquiryShowcase.tsx` (neu): Video, Nutzenpunkte und Handlungsoptionen.
- `src/components/inquiry/DemoVideo.tsx` (neu): Player, Vorschau und Fehlerzustand.
- `src/config/diovis.ts` (neu): zentrale Video-, Demo- und Buchungsziele.
- `src/app/[locale]/sections/anfrage-demo/AnfrageDemo.tsx`: Überschriften für die eigenständige Seite.
- `src/app/[locale]/sections/anfrage-demo/InquiryBookingCTA.tsx`: wiederverwendbare Video-Variante.
- `src/components/navbar/Navbar.tsx`: neuer Menüpunkt, passende Breakpoints und Tastaturbedienung.
- `src/components/footer/Footer.tsx`: zusätzlicher Navigationslink.
- `src/i18n/routing.ts`, `src/messages/de.json`, `src/messages/en.json`: Routen und neue Texte.
- `public/Videos/anfrage-demo-poster.png` (neu): Vorschaubild aus dem vorhandenen Video.
- `.env.local`: lokaler Testschalter aus; Schlüssel und produktive Einstellungen unverändert.
- `src/readme/Diovis_KI_Setup.md`, `src/readme/Diovis_Extraction_Review.md`, dieser Bericht: aktualisierte Wege und Limit-Status.

Das vom Benutzer bereitgestellte Video bleibt unverändert. Es wurden keine Abhängigkeiten ergänzt
und nichts veröffentlicht. Schon zuvor vorhandene Änderungen an der KI-Extraktion bleiben erhalten.
