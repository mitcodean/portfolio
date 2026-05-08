// Privacy Policy, Datenschutzerklärung
import Link from "next/link";

export default function DatenschutzPage() {
  return (
    <main className="bg-background min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">Rechtliches</p>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground">Datenschutzerklärung</h1>
          <p className="text-support mt-3 text-sm">Stand: Jänner 2025 · gemäß DSGVO (EU) 2016/679 und DSG (Österreich)</p>
        </div>

        <div className="space-y-10 text-support text-sm leading-relaxed">

          <Section title="1. Verantwortlicher">
            <p>
              Verantwortlicher im Sinne der DSGVO für die Verarbeitung personenbezogener Daten auf dieser Website ist:
            </p>
            <div className="mt-3 rounded-xl border border-border bg-muted/20 p-5 space-y-1 text-sm">
              <p className="text-foreground font-semibold">Mitco Dean Digital Solutions</p>
              <p>Dean-Silviu Mitco</p>
              <p>Eisenstraße 13, 4460 Losenstein, Österreich</p>
              <p>E-Mail: <a href="mailto:contact@mitcodean.com" className="text-primary hover:underline">contact@mitcodean.com</a></p>
              <p>Tel.: +43 664 9494891</p>
            </div>
          </Section>

          <Section title="2. Welche Daten wir erheben">
            <p>Wir erheben und verarbeiten folgende Kategorien personenbezogener Daten:</p>
            <ul className="mt-3 space-y-2 pl-5 list-disc marker:text-primary">
              <li><strong className="text-foreground">Kontaktdaten:</strong> Name, E-Mail-Adresse, Telefonnummer (bei Kontaktaufnahme)</li>
              <li><strong className="text-foreground">Kommunikationsdaten:</strong> Inhalt von Nachrichten über unser Kontaktformular</li>
              <li><strong className="text-foreground">Nutzungsdaten:</strong> IP-Adresse, Browser, Betriebssystem, Seitenaufrufe (bei Verwendung von Analytics)</li>
              <li><strong className="text-foreground">Technische Daten:</strong> Cookies, Session-Daten (technisch notwendig)</li>
            </ul>
          </Section>

          <Section title="3. Zwecke und Rechtsgrundlagen der Verarbeitung">
            <div className="space-y-4">
              <SubSection label="Kontaktformular & Anfragen">
                <p>
                  Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, verarbeiten wir Ihre Daten
                  zur Bearbeitung Ihrer Anfrage auf Grundlage von <strong className="text-foreground">Art. 6 Abs. 1 lit. b DSGVO</strong> (Vertragsanbahnung)
                  bzw. <strong className="text-foreground">Art. 6 Abs. 1 lit. f DSGVO</strong> (berechtigtes Interesse an der Beantwortung von Anfragen).
                  Daten werden nicht an Dritte weitergegeben.
                </p>
              </SubSection>
              <SubSection label="Website-Betrieb (technisch notwendige Cookies)">
                <p>
                  Technisch notwendige Cookies werden auf Grundlage von <strong className="text-foreground">Art. 6 Abs. 1 lit. f DSGVO</strong> gesetzt.
                  Sie sind für den ordnungsgemäßen Betrieb der Website erforderlich und können nicht deaktiviert werden.
                </p>
              </SubSection>
              <SubSection label="Google Analytics (nur mit Einwilligung)">
                <p>
                  Mit Ihrer Einwilligung verwenden wir Google Analytics 4 (Google Ireland Ltd., Gordon House, Barrow Street, Dublin 4, Irland)
                  zur Analyse des Nutzerverhaltens. Rechtsgrundlage: <strong className="text-foreground">Art. 6 Abs. 1 lit. a DSGVO</strong>.
                  IP-Anonymisierung ist aktiviert. Daten werden auf Servern in der EU gespeichert.
                  Sie können Ihre Einwilligung jederzeit widerrufen (Cookie-Einstellungen).
                </p>
              </SubSection>
            </div>
          </Section>

          <Section title="4. Speicherdauer">
            <p>
              Kontaktanfragen werden nach Abschluss der Bearbeitung gelöscht, spätestens nach <strong className="text-foreground">3 Jahren</strong>,
              sofern keine gesetzliche Aufbewahrungspflicht besteht. Für steuerrechtlich relevante Unterlagen gilt
              eine Aufbewahrungspflicht von <strong className="text-foreground">7 Jahren</strong> gemäß österreichischem Steuerrecht.
              Analytics-Daten werden nach <strong className="text-foreground">14 Monaten</strong> automatisch gelöscht.
            </p>
          </Section>

          <Section title="5. Weitergabe von Daten">
            <p>
              Eine Weitergabe Ihrer personenbezogenen Daten an Dritte erfolgt nur, wenn:
            </p>
            <ul className="mt-3 space-y-1.5 pl-5 list-disc marker:text-primary">
              <li>Sie ausdrücklich eingewilligt haben (Art. 6 Abs. 1 lit. a DSGVO)</li>
              <li>dies zur Vertragserfüllung erforderlich ist (Art. 6 Abs. 1 lit. b DSGVO)</li>
              <li>eine rechtliche Verpflichtung besteht (Art. 6 Abs. 1 lit. c DSGVO)</li>
            </ul>
            <p className="mt-3">
              Eingesetzte Auftragsverarbeiter: Vercel Inc. (Hosting, USA — Standardvertragsklauseln),
              Google LLC (Analytics, USA — Standardvertragsklauseln).
            </p>
          </Section>

          <Section title="6. Ihre Rechte nach DSGVO">
            <p>Sie haben folgende Rechte gegenüber uns als Verantwortlichem:</p>
            <ul className="mt-3 space-y-2 pl-5 list-disc marker:text-primary">
              <li><strong className="text-foreground">Auskunftsrecht</strong> (Art. 15 DSGVO): Auskunft über gespeicherte Daten</li>
              <li><strong className="text-foreground">Berichtigungsrecht</strong> (Art. 16 DSGVO): Korrektur unrichtiger Daten</li>
              <li><strong className="text-foreground">Löschungsrecht</strong> (Art. 17 DSGVO): Löschung Ihrer Daten</li>
              <li><strong className="text-foreground">Einschränkungsrecht</strong> (Art. 18 DSGVO): Einschränkung der Verarbeitung</li>
              <li><strong className="text-foreground">Widerspruchsrecht</strong> (Art. 21 DSGVO): Widerspruch gegen Verarbeitung</li>
              <li><strong className="text-foreground">Datenübertragbarkeit</strong> (Art. 20 DSGVO): Erhalt Ihrer Daten in maschinenlesbarem Format</li>
              <li><strong className="text-foreground">Widerruf von Einwilligungen</strong> (Art. 7 Abs. 3 DSGVO): Jederzeit ohne Angabe von Gründen</li>
            </ul>
            <p className="mt-3">
              Zur Ausübung Ihrer Rechte wenden Sie sich bitte an:{" "}
              <a href="mailto:contact@mitcodean.com" className="text-primary hover:underline">contact@mitcodean.com</a>
            </p>
          </Section>

          <Section title="7. Beschwerderecht">
            <p>
              Sie haben das Recht, sich bei der österreichischen Datenschutzbehörde zu beschweren:
            </p>
            <div className="mt-3 rounded-xl border border-border bg-muted/20 p-5 text-sm space-y-1">
              <p className="text-foreground font-semibold">Österreichische Datenschutzbehörde</p>
              <p>Barichgasse 40–42, 1030 Wien</p>
              <p>Tel.: +43 1 52 152-0</p>
              <p><a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.dsb.gv.at</a></p>
            </div>
          </Section>

          <Section title="8. Cookies">
            <p>
              Wir verwenden Cookies und ähnliche Technologien. Details zu eingesetzten Cookies,
              Zwecken und Ihrer Widerspruchsmöglichkeit entnehmen Sie bitte unserem Cookie-Banner
              beim ersten Besuch sowie den Cookie-Einstellungen (jederzeit aufrufbar über den Link im Footer).
            </p>
            <div className="mt-4 rounded-xl border border-border bg-muted/20 p-5 text-sm space-y-2">
              <p className="text-foreground font-semibold text-xs uppercase tracking-wider">Eingesetzte Cookies</p>
              <div className="space-y-2 text-xs">
                <div className="flex gap-3"><span className="text-support/60 min-w-[160px]">mitcodean_cookie_consent</span><span className="text-foreground">Speichert Ihre Cookie-Einstellungen (1 Jahr)</span></div>
                <div className="flex gap-3"><span className="text-support/60 min-w-[160px]">_ga, _ga_*</span><span className="text-foreground">Google Analytics (nur mit Einwilligung, 14 Monate)</span></div>
              </div>
            </div>
          </Section>

          <Section title="9. Aktualität dieser Erklärung">
            <p>
              Diese Datenschutzerklärung wird bei Änderungen unserer Verarbeitungstätigkeiten oder bei
              Änderungen der Rechtslage aktualisiert. Die aktuelle Version ist stets unter{" "}
              <a href="https://www.mitcodean.com/datenschutz" className="text-primary hover:underline">
                www.mitcodean.com/datenschutz
              </a>{" "}
              abrufbar.
            </p>
          </Section>

        </div>

        <div className="mt-12 flex gap-6 text-xs text-support">
          <Link href="/impressum" className="hover:text-primary transition-colors">→ Impressum</Link>
          <Link href="/agb" className="hover:text-primary transition-colors">→ AGB</Link>
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-bold text-foreground border-b border-border pb-2">{title}</h2>
      {children}
    </section>
  );
}

function SubSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs font-bold text-foreground uppercase tracking-wider mb-1.5">{label}</p>
      {children}
    </div>
  );
}
