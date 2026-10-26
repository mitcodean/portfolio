# Diovis Anfrageassistent: lokale KI-Demo

Die interaktive Demo unter `/de/praxisbeispiele/anfrageassistent/` nutzt
`POST /api/analyze-inquiry/` (auch ohne abschließenden Slash über Next erreichbar).
Startseite und `/de/praxisbeispiele/` zeigen das Demovideo mit Verlinkung zur interaktiven Demo.
Die echte Auswertung läuft ausschließlich auf dem Server über das offizielle OpenAI JavaScript SDK,
`responses.parse` und `zodTextFormat`. Freigegeben sind ausschließlich `gpt-4.1-nano` und `gpt-5-nano`.
`OPENAI_MODEL` legt die Vorauswahl fest; der Besucher kann zwischen diesen beiden Modellen wechseln.
Beide teilen sich dasselbe Versuchskontingent. Der Freigabeschritt bleibt eine lokale Simulation.

## Lokal konfigurieren und starten

1. Im Projektordner `npm install` ausführen. Die benötigten Pakete und Lockfile sind bereits ergänzt.
2. `.env.example` als Vorlage verwenden und die Einträge in `.env.local` **ergänzen**.
   Die vorhandenen Kontakt-/Resend-Einstellungen nicht überschreiben.
3. Einen eigenen API-Projektschlüssel unter `OPENAI_API_KEY` eintragen. Niemals im Chat,
   in React-Code, in `NEXT_PUBLIC_*`-/`VITE_*`-Variablen oder im Git speichern.
   OpenAI-Projekt muss API-Zugang und Guthaben für das gewählte Modell haben.
   Bei eingeschränkten Schlüsseln muss **Responses: Write** (`api.responses.write` für
   `POST /v1/responses`) erlaubt sein. Leserechte auf die Modellliste allein reichen nicht.
   Projekt-/Benutzerrolle muss den Zugriff ebenfalls erlauben. Berechtigungsänderungen können
   laut OpenAI eine gewisse Zeit benötigen, bis sie wirksam werden.
4. `OPENAI_MODEL=gpt-5-nano` oder `OPENAI_MODEL=gpt-4.1-nano` setzen.
5. Einen stabilen zufälligen `INQUIRY_RATE_LIMIT_SECRET` mit mindestens 32 Zeichen setzen.
   Er wurde für diese lokale Einrichtung bereits erzeugt und in `.env.local` ergänzt.
   Für eine neue Installation: `node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"`.
   Den erzeugten Wert nur in die lokale Umgebungsdatei übernehmen. Schlüsselwechsel setzen
   Besucher-/Netzwerkidentitäten zurück; nicht zum routinemäßigen Zurücksetzen verwenden.
6. Für die lokale Demo die sicheren Vorgaben belassen:
   `INQUIRY_LOCAL_ONLY=true`, `INQUIRY_LIMITER=file`, `INQUIRY_GLOBAL_DAILY_LIMIT=25`.
   Redis ist dafür nicht nötig.
7. `npm run check:inquiry:config` ausführen. Der Check prüft die Responses-Berechtigung
   mit einer absichtlich unvollständigen Anfrage ohne Modellaufruf; er verbraucht keine Demo-Versuche.
   Erst nach erfolgreichem Check die echten Beispiele starten.
8. `npm run dev -- --hostname 127.0.0.1 --port 3000` starten.
   Nach Änderungen an `.env.local` den Server neu starten.
9. `http://127.0.0.1:3000/de/praxisbeispiele/anfrageassistent/` öffnen und ausschließlich fiktive Texte verwenden.

Build: `npm run build`. Für eine lokale Vorschau des Builds funktioniert der vorhandene
Startbefehl `npm run start -- --hostname 127.0.0.1 --port 3000`; Next weist dabei auf die bereits
vorhandene Standalone-Konfiguration hin. Deren Deployment-Einstellungen wurden nicht verändert.

## Tests

- `npm run test:inquiry`: automatisierte Tests ohne echte API-Aufrufe oder API-Kosten.
  Prüft alle drei Briefing-Anfragen und die sechs Mengen-/Konfliktfälle für beide Modelle durch
  das echte SDK mit simuliertem HTTP-Upstream. Dazu kommen wiederholte identische Anfragen mit
  unterschiedlichen Modellantworten, bearbeitete Texte, Zahl-/Maßkontexte, Schemas, fehlende Daten,
  Preis-/Zeichnungsregeln, Fehlerfälle und Limits. Siehe [Prüfbericht](Diovis_Extraction_Review.md).
- `npm run test:inquiry:live`: separat gestarteten lokalen Server und echten API-Schlüssel erforderlich.
  Ruft die **drei fiktiven Briefing-Anfragen** mit dem konfigurierten Modell auf,
  kostet bis zu drei KI-Versuche und hält die 15-Sekunden-Abstände ein.
  Keine automatischen Wiederholungen und kein Zurücksetzen der Kontingente.
  Einzelner Fall: `npm run test:inquiry:live -- --case=welding` (auch `laser` oder `incomplete`).
- `npx tsc --noEmit` und `npm run build` prüfen TypeScript und den Produktionsbuild.

Die automatisierten SDK-Vertragstests ersetzen keinen Qualitätsvergleich echter Modelle.
Live-Ergebnisse können variieren und müssen immer fachlich geprüft werden.

## Eingaben, Ausgaben und Datenschutz

- Nur JSON mit `inquiry` (1–1000 Zeichen), optional `model` und `locale` (`de`/`en`).
  Unbekannte Felder, unbekannte Modelle, leere Texte und überlange Texte werden abgewiesen.
- Request-Body maximal 8 KiB, Lesezeit maximal 5 Sekunden, KI-Zeitlimit 45 Sekunden,
  maximal 2200 Ausgabe-Tokens einschließlich Reasoning, keine SDK-Wiederholungen.
- Das Modell liefert exakt neun Felder: `service`, `quantity`, `unit`, `material`, `thicknessMm`,
  `deliveryWish`, `drawingMentioned`, `missingInformation`, `summary`. Ein einziges striktes
  Zod-Schema definiert das OpenAI-JSON-Schema und validiert Server- und Browser-Ergebnisse.
  Unbekannte Einzelwerte sind `null`; die Fragen sind immer ein Array. Die Oberfläche zeigt
  fehlende Werte als „Nicht angegeben“. `drawingMentioned` ist immer ein Boolean.
- Ein Regelabgleich mit dem tatsächlichen Eingabetext sichert klare Mengen, Materialstärken,
  Materialien und Lieferwünsche ab, ohne zusätzliche Belegzitate vom Modell zu verlangen.
  „50 Haltewinkel“, „50 Stk.“ und „50x“ werden als Stückzahl erkannt, Maße und Zeiträume nicht.
  Unterschiedliche Mengen oder getrennte Positionen ergeben keine willkürlich gewählte Gesamtmenge.
  Unklare Werte bleiben `null` und werden als Rückfrage genannt. Lieferwünsche behalten ihren
  Wortlaut; Anlieferung ist kein Fertigstellungstermin. Die Zusammenfassung entsteht aus geprüften
  Feldern; ungefähre Mengen stehen dort als ungefähr, während die Einheit „Stück“ bleibt.
- Es werden keine Dateien gelesen, keine Preise berechnet, keine Angebote versendet und keine
  Freigaben in Drittsystemen gespeichert. Anfragen/Ausgaben werden hier nicht protokolliert oder gespeichert.
- **Echte KI:** Beim Klick wird der Text an OpenAI übertragen. `store: false` deaktiviert die
  Speicherung des Responses-Objekts; es ist keine Zusage über sämtliche Aufbewahrungsregeln des Anbieters.
  Vor öffentlicher Nutzung sind Datenschutzinformationen und Anbieterbedingungen gesondert zu prüfen.
- Der Calendly-CTA öffnet direkt `https://calendly.com/mitco-deansilviu/30min` in einem neuen Tab.
  Kein Widget, kein vorab geladenes Calendly-Skript und keine automatische Übertragung des Anfragetexts.

## Kontingentschutz

Die regulären Limits sind wieder aktiv: `INQUIRY_UNLIMITED_LOCAL_TESTS=false`
in `.env.local` und `.env.example`. Vorhandene Zähler wurden nicht gelöscht.
Der optionale lokale Testschalter bleibt ausgeschaltet. Produktionsbuilds verwenden immer die
regulären Limits; ein öffentlicher Betrieb mit aktiviertem Testschalter wird verweigert.
Nach einer Umgebungsänderung den Server neu starten.

- **Fünf Versuche pro Besucher UND Netzwerk in einem rollierenden 24-Stunden-Fenster.**
  Die erste Freigabe erfolgt, wenn ein gezählter Versuch aus dem Fenster fällt.
- Signiertes, HttpOnly-/SameSite-Cookie; Netzwerkzähler verhindert zusätzliche Versuche durch
  Cookie-Löschen, neue Browserfenster oder Modellwechsel. Gemeinsame Netze teilen sich fünf Versuche.
  Ohne Anmeldung ist eine exakte Grenze pro realer Person nicht nachweisbar.
- Zusätzlich standardmäßig **25 KI-Aufrufe insgesamt in 24 Stunden**, konfigurierbar mit
  `INQUIRY_GLOBAL_DAILY_LIMIT` (5–500). Dieser globale Zähler begrenzt auch viele verschiedene IPs.
- Mindestens 15 Sekunden Abstand je Besucher/Netzwerk; höchstens zwei gleichzeitige KI-Aufrufe
  über alle Besucher. Reservierungen werden atomar vor dem API-Aufruf verbraucht.
  Auch Fehler, Abbruch und Timeouts zählen; es gibt keinen automatischen Refund oder Retry.
- HTTP 429 enthält `Retry-After`. Reset und Neuladen der UI setzen keine Serverzähler zurück.
- Lokal liegen nur HMAC-pseudonymisierte Zähler/Zeitstempel unter `.diovis/` außerhalb von `public/`.
  Sie überleben Serverneustarts und sind vom Git ausgeschlossen. Keine Anfrageinhalte oder Klartext-IPs.
  Ohne vertrauenswürdigen IP-Header teilen sich alle Aufrufe bewusst EINEN Netzwerkzähler.
- Wenn Zähler nicht erreichbar/beschädigt sind, wird die KI **gesperrt**. Keine unsichere
  In-Memory-Ausweichlösung. Ein nach Prozessabbruch verbliebenes lokales `inquiry-limits.lock`
  kann nur bei **gestopptem Server** entfernt werden. Die JSON-Zähler dabei beibehalten.

## Vor einem späteren öffentlichen Betrieb (hier nicht veröffentlicht)

Anwendungslimits schützen das KI-Budget; sie sind kein vollständiger Schutz gegen volumetrische
DDoS-Angriffe. Dafür braucht es einen vorgeschalteten Hosting-/CDN-Schutz mit WAF/Bot-Limits.

1. Gemeinsame Upstash-Redis-Datenbank bereitstellen. `UPSTASH_REDIS_REST_URL` und
   `UPSTASH_REDIS_REST_TOKEN` serverseitig setzen; `INQUIRY_LIMITER=redis` verwenden.
   Redis verwendet atomare Compare-and-set-Transaktionen. Bei Ausfall bleibt die KI gesperrt.
2. Ein vertrauenswürdiger Reverse Proxy muss `cf-connecting-ip` oder `x-real-ip` **überschreiben**.
   Den passenden Namen als `INQUIRY_TRUSTED_IP_HEADER` setzen und direkten öffentlichen Zugriff
   auf den Origin-Server sperren. Beliebige `X-Forwarded-For`-Werte werden nie vertraut.
3. Alle Instanzen benötigen dieselben Redis-Zugangsdaten und denselben Limit-Schlüssel.
   Erst nach dieser Einrichtung `INQUIRY_LOCAL_ONLY=false` setzen. Ohne Redis/IP-Konfiguration
   verweigert die Anwendung öffentlichen KI-Betrieb.
4. Am Edge für `/api/analyze-inquiry*` ein zusätzliches Request-Limit und Body-Limit setzen,
   Bot-Schutz aktivieren; verdächtige verteilte Aufrufe gegebenenfalls durch Challenge abfangen.
   Origin-Header-Prüfung verhindert Cross-Site-Browseraufrufe, ersetzt aber keine Authentifizierung.
5. Einen separaten OpenAI-Projektschlüssel nur für die Demo mit minimalen API-Berechtigungen,
   niedrigen Projekt-/Modellraten und Budgetbenachrichtigungen verwenden. Budgetwarnungen
   nicht als garantierte harte Kostensperre behandeln; die globale Anwendungssperre bleibt notwendig.
6. Datenschutzprüfung, Anbieter-/Hostinglimits und Limits mit echtem Redis vor Freischaltung testen.
   Vorhandene Kontakt-API und produktive Einstellungen wurden nicht umgestellt.

Der ergänzende `npm audit --omit=dev`-Check meldet auch bestehende kritische Abhängigkeiten,
darunter die vorhandene Next-Version 16.1.1. Das ist vor einem öffentlichen Betrieb separat
zu beheben und erneut zu testen. Hier wurde kein pauschales `npm audit fix --force` ausgeführt.

Offizielle Referenzen: [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs),
[GPT-5 nano](https://developers.openai.com/api/docs/models/gpt-5-nano),
[GPT-4.1 nano](https://developers.openai.com/api/docs/models/gpt-4.1-nano),
[Upstash EVAL](https://upstash.com/docs/redis/sdks/ts/commands/scripts/eval).
