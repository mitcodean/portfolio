// Legal Notice, Impressum

import Link from "next/link";

export default function ImpressumPage() {
  return (
    <main className="bg-background min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">Rechtliches</p>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground">Impressum</h1>
          <p className="text-support mt-3 text-sm">Stand: Jänner 2025</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-10 text-support leading-relaxed">

          {/* Unternehmensangaben */}
          <section className="rounded-2xl border border-border bg-muted/20 p-7 space-y-3">
            <h2 className="text-lg font-bold text-foreground">Informationen gemäß § 5 ECG / § 63 GewO</h2>
            <div className="space-y-2 text-sm">
              <Row label="Unternehmensname"  value="Mitco Dean Digital Solutions" />
              <Row label="Inhaber"           value="Dean-Silviu Mitco" />
              <Row label="Unternehmensform"  value="Einzelunternehmen (e.U.)" />
              <Row label="Adresse"           value="Eisenstraße 13, 4460 Losenstein, Österreich" />
              <Row label="Telefon"           value="+43 664 9494891" />
              <Row label="E-Mail"            value="contact@mitcodean.com" />
              <Row label="Website"           value="www.mitcodean.com" />
              <Row label="UID-Nummer"        value="[wird nach Gewerbeanmeldung ergänzt]" muted />
              <Row label="GISA-Nummer"       value="[wird nach Gewerbeanmeldung ergänzt]" muted />
              <Row label="Gewerbebehörde"    value="Bezirkshauptmannschaft Kirchdorf an der Krems" />
              <Row label="Mitglied bei"      value="Wirtschaftskammer Österreich (WKO), Sparte Information und Consulting" />
            </div>
          </section>

          {/* Unternehmensgegenstand */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Unternehmensgegenstand</h2>
            <p className="text-sm">
              Mitco Dean Digital Solutions ist ein IT-Dienstleistungsunternehmen mit Sitz in Losenstein, Oberösterreich.
              Gegenstand des Unternehmens ist die Erbringung von Dienstleistungen im Bereich der Informationstechnologie,
              insbesondere:
            </p>
            <ul className="text-sm space-y-1 pl-5 list-disc marker:text-primary">
              <li>Konzeption, Entwicklung und Wartung von Websites und Webanwendungen</li>
              <li>Entwicklung und Betrieb von Online-Shops (E-Commerce-Lösungen)</li>
              <li>Digitale Marketingdienstleistungen (SEO, Google Ads, Social Media Ads, E-Mail-Marketing)</li>
              <li>Softwareentwicklung und Automatisierung von Geschäftsprozessen</li>
              <li>Integration von ERP-Systemen und digitalen Buchungssystemen</li>
              <li>Entwicklung mobiler Applikationen</li>
              <li>Beratung zu digitalen Strategien und Branding</li>
            </ul>
          </section>

          {/* Berufsrecht */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Anwendbare Rechtsvorschriften</h2>
            <p className="text-sm">
              Die Tätigkeit unterliegt der österreichischen Gewerbeordnung (GewO 1994) sowie den einschlägigen
              Bestimmungen des IT-Dienstleistungsgewerbes. Berufsrechtliche Regelungen sind unter{" "}
              <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                www.ris.bka.gv.at
              </a>{" "}
              abrufbar.
            </p>
          </section>

          {/* Haftungsausschluss */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Haftungsausschluss</h2>
            <p className="text-sm">
              Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit
              und Aktualität der Inhalte übernimmt Mitco Dean Digital Solutions keine Gewähr. Als Diensteanbieter sind wir
              gemäß § 7 Abs. 1 ECG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
              Für externe Links zu fremden Websites übernehmen wir keine Haftung, da wir auf deren Inhalte keinen Einfluss haben.
            </p>
          </section>

          {/* Urheberrecht */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">Urheberrecht</h2>
            <p className="text-sm">
              Die durch uns erstellten Inhalte und Werke auf dieser Website unterliegen dem österreichischen Urheberrecht.
              Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
              Urheberrechts bedürfen der schriftlichen Zustimmung von Mitco Dean Digital Solutions.
            </p>
          </section>

          {/* Online Streitbeilegung */}
          <section className="rounded-2xl border border-border bg-muted/20 p-7 space-y-3">
            <h2 className="text-lg font-bold text-foreground">Online-Streitbeilegung (OS)</h2>
            <p className="text-sm">
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                https://ec.europa.eu/consumers/odr
              </a>
              . Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit und nicht verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-12 flex gap-6 text-xs text-support">
          <Link href="/datenschutz" className="hover:text-primary transition-colors">→ Datenschutzerklärung</Link>
          <Link href="/agb" className="hover:text-primary transition-colors">→ AGB</Link>
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
