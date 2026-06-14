// Legal Notice, Impressum

import Link from "next/link";

export default function ImpressumPage() {
  return (
    <main className="bg-background min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">
            Rechtliches
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground">
            Impressum
          </h1>
          <p className="text-support mt-3 text-sm">Stand: Jänner 2026</p>
        </div>

        <div className="space-y-10 text-support leading-relaxed">

          {/* Unternehmensangaben */}
          <section className="rounded-2xl border border-border bg-muted/20 p-7 space-y-4">
            <h2 className="text-lg font-bold text-foreground">
              Informationen gemäß § 5 ECG / § 63 GewO
            </h2>

            <div className="space-y-2 text-sm">
              <Row label="Unternehmensname" value="Dean-Silviu Mitco" />
              <Row label="Inhaber" value="Dean-Silviu Mitco" />
              <Row label="Unternehmensform" value="Einzelunternehmen (e.U.)" />
              <Row
                label="Adresse"
                value="Eisenstraße 13, 4460 Losenstein, Österreich"
              />
              <Row label="Telefon" value="+43 664 9494891" />
              <Row label="E-Mail" value="contact@mitcodean.com" />
              <Row label="Website" value="www.mitcodean.com" />
              <Row label="UID-Nummer" value="[wird nach Gewerbeanmeldung ergänzt]" />
              <Row label="GISA-Nummer" value="39462992" />
              <Row
                label="Gewerbebehörde"
                value="Bezirkshauptmannschaft Steyr-Land"
              />
              <Row
                label="Mitglied bei"
                value="Wirtschaftskammer Österreich (WKO), Sparte Information & Consulting"
              />
            </div>

            <div className="text-sm text-support space-y-1 pt-3 border-t border-border/50">
              <p>Bezirkshauptmannschaft Steyr-Land</p>
              <p>Spitalskystraße 10a</p>
              <p>4400 Steyr</p>
              <a
                href="http://www.bh-steyr-land.gv.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Website der Behörde
              </a>
            </div>
          </section>

          {/* Unternehmensgegenstand */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">
              Unternehmensgegenstand
            </h2>
            <p className="text-sm">
              Werbeagentur und IT-Dienstleistungen mit Fokus auf Softwareentwicklung.
              Gegenstand des Unternehmens ist die Erbringung von Dienstleistungen im
              Bereich der Informationstechnologie, insbesondere:
            </p>

            <ul className="text-sm space-y-1 pl-5 list-disc marker:text-primary">
              <li>Konzeption, Entwicklung und Wartung von Websites und Webanwendungen</li>
              <li>Entwicklung und Betrieb von Online-Shops (E-Commerce)</li>
              <li>Digitale Marketingdienstleistungen (SEO, Ads, Social Media, E-Mail)</li>
              <li>Softwareentwicklung & Automatisierung von Geschäftsprozessen</li>
              <li>ERP- & Buchungssystem-Integrationen</li>
              <li>Entwicklung mobiler Applikationen</li>
              <li>Beratung zu digitalen Strategien & Branding</li>
            </ul>
          </section>

          {/* Rechtsgrundlagen */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">
              Anwendbare Rechtsvorschriften
            </h2>
            <p className="text-sm">
              Die Tätigkeit unterliegt der österreichischen Gewerbeordnung (GewO 1994)
              sowie den einschlägigen Bestimmungen des IT-Dienstleistungsgewerbes.
              Berufsrechtliche Regelungen sind abrufbar unter{" "}
              <a
                href="https://www.ris.bka.gv.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                ris.bka.gv.at
              </a>.
            </p>
          </section>

          {/* Haftung */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">
              Haftungsausschluss
            </h2>
            <p className="text-sm">
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt.
              Für Richtigkeit, Vollständigkeit und Aktualität wird keine Gewähr übernommen.
              Für externe Links wird keine Haftung übernommen.
            </p>
          </section>

          {/* Urheberrecht */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Urheberrecht</h2>
            <p className="text-sm">
              Inhalte und Werke auf dieser Website unterliegen dem österreichischen Urheberrecht.
              Jede Verwertung außerhalb der Grenzen des Urheberrechts bedarf der schriftlichen Zustimmung.
            </p>
          </section>

          {/* Datenschutz & Verantwortung */}
          <section className="rounded-2xl border border-border bg-muted/20 p-7 space-y-3 text-sm">
            <h2 className="text-lg font-bold text-foreground">
              Datenschutz & Verantwortung
            </h2>

            <div className="space-y-2">
              <Row label="Verantwortlicher" value="Dean-Silviu Mitco" />
              <Row label="Adresse" value="Eisenstraße 13, 4460 Losenstein" />
              <Row label="E-Mail" value="contact@mitcodean.com" />
              <Row label="Telefon" value="+43 664 9494891" />
              <Row label="Inhaltlich verantwortlich" value="Dean-Silviu Mitco" />
              <Row label="Berufsbezeichnung" value="Software-Entwickler" />
              <Row label="Verleihungsstaat" value="Österreich" />
            </div>
          </section>

          {/* Blattlinie */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Blattlinie</h2>
            <p className="text-sm">
              Bereitstellung von Informationen, Analysen und Fachbeiträgen zu Individualsoftware,
              IT-Infrastruktur, IT-Sicherheit und digitalen Geschäftsprozessen.
              Referenzen und Case Studies dienen als Social Proof.
            </p>
          </section>

          {/* Bilder */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Bildernachweis</h2>
            <p className="text-sm">
              Alle Bilder, Fotos und Grafiken sind urheberrechtlich geschützt.
              Die Bildrechte liegen bei Dean-Silviu Mitco.
            </p>
          </section>

          {/* Socials */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">
              Weitere Onlineauftritte, wo dieses Impressum gilt.
            </h2>

            <div className="text-sm space-y-1">
              <a className="text-primary hover:underline" href="https://x.com/dean_mitco" target="_blank">
                X (Twitter)
              </a>
              <br />
              <a className="text-primary hover:underline" href="https://www.instagram.com/dean_mitco/" target="_blank">
                Instagram
              </a>
              <br />
              <a className="text-primary hover:underline" href="https://www.linkedin.com/in/dean-mitco-248a50219/" target="_blank">
                LinkedIn
              </a>
              <br />
              <a className="text-primary hover:underline" href="https://github.com/DeanMitco" target="_blank">
                GitHub
              </a>
            </div>
          </section>

        </div>

        {/* Footer Links */}
        <div className="mt-12 flex gap-6 text-xs text-support">
          <Link href="/datenschutz" className="hover:text-primary transition-colors">
            → Datenschutzerklärung
          </Link>
          <Link href="/agb" className="hover:text-primary transition-colors">
            → AGB
          </Link>
          <Link href="/impressum" className="hover:text-primary transition-colors">
            → Impressum
          </Link>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value, muted = false }: { label: string; value: string; muted?: boolean }) {
  return (
    <div className="flex gap-3 flex-wrap">
      <span className="text-support/60 min-w-[160px] shrink-0">{label}:</span>
      <span className={muted ? "text-support/40 italic" : "text-foreground font-medium"}>{value}</span>
    </div>
  );
}
