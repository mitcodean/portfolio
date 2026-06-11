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
              <Row label="Unternehmensname"  value="Dean-Silviu Mitco" />
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
              Dean-Silviu Mitco ist ein IT-Dienstleistungsunternehmen mit Sitz in Losenstein, Oberösterreich.
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
              und Aktualität der Inhalte übernimmt Dean-Silviu Mitco keine Gewähr. Als Diensteanbieter sind wir
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
              Urheberrechts bedürfen der schriftlichen Zustimmung von Dean-Silviu Mitco.
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



{/* Auto Generated */}


<h1 className="adsimple-123221242">Impressum</h1>
<p className="adsimple-123221242">Informationen über den Diensteanbieter.</p>
<p>
<strong>Dean-Silviu Mitco</strong>
</p>
<p className="adsimple-123221242">Dean-Silviu Mitco</p>
<p className="adsimple-123221242">Eisenstraße 13, <br />4460 Losenstein, <br />Österreich</p>
<p>
<strong>Tel.:</strong> +43 664 9494891<br />
<strong>E-Mail:</strong> <a href="mailto:contact@mitcodean.com">contact@mitcodean.com</a>
</p>
<p>
<strong>Unternehmensgegenstand:</strong> Werbeagentur und Dienstleistungen in der IT mit fokus auf Softwareentwicklung<br />
<strong>GISA (Gewerbeinformationssystem Austria):</strong> 39462992<br />
<strong>Mitglied bei:</strong> z.B. WKO, Landesinnung, etc.<br />
<strong>Berufsrecht:</strong> Muster Berufsrechtliche Regelung<br />
z.B: www.ris.bka.gv.at</p>
<p>
<strong>Aufsichtsbehörde:</strong>
<br />Bezirkshauptmannschaft Steyr-Land<br />Spitalskystraße 10a,<br />
4400 Steyr<br />
<strong>Webseite:</strong> <a href="http://www.bh-steyr-land.gv.at" target="_blank" rel="noopener">http://www.bh-steyr-land.gv.at</a>
</p>
<p>
<strong>Berufsbezeichnung:</strong> Software-Entwickler<br />
<strong>Verleihungsstaat:</strong> Österreich</p>
<p>
<strong>Datenschutz Verantwortlicher</strong>
<br />Dean-Silviu Mitco<br />
Eisenstraße 13,<br />
4460 Losenstein<br />
<strong>E-Mail:</strong> <a href="mailto:contact@mitcodean.com">contact@mitcodean.com</a>
<br />
<strong>Tel.:</strong> +43 664 9494891<br />
<strong>Impressum:</strong> <a href="https://www.mitcodean.de/impressum/" target="_blank" rel="noopener">https://www.mitcodean.de/impressum/</a>
</p>
<h2 id="zusatz" className="adsimple-123221242">Zusatz für große Webseiten</h2>
<p>
<strong>Verantwortlich für den Inhalt:</strong> Dean-Silviu Mitco<br />
<strong>Blattlinie</strong>
<br />Bereitstellung von Informationen, Analysen und Fachbeiträgen zu den Themen Individualsoftware, IT-Infrastruktur, IT-Sicherheit sowie digitale Geschäftsprozesse für Unternehmen und Entscheidungsträger.<br />
Referenzen, Fallstudien (Case Studies) und Kundenstimmen (Testimonials) dienen als objektiver Social Proof.</p>
<h2 id="bildernachweis" className="adsimple-123221242">Bildernachweis</h2>
<p className="adsimple-123221242">Die Bilder, Fotos und Grafiken auf dieser Webseite sind urheberrechtlich geschützt.</p>
<p>
<strong>Die Bilderrechte liegen bei:</strong>
<br />Dean-Silviu Mitco</p>
<h2 id="onlineauftritte" className="adsimple-123221242">Weitere Onlineauftritte</h2>
<p>
<strong>Dieses Impressum gilt auch für</strong>
<br />
<a href="https://x.com/dean_mitco" target="_blank" rel="noopener">https://x.com/dean_mitco</a>
<br />
<a href="https://www.instagram.com/dean_mitco/" target="_blank" rel="noopener">https://www.instagram.com/dean_mitco/</a>
<br />
<a href="https://www.linkedin.com/in/dean-mitco-248a50219/" target="_blank" rel="noopener">https://www.linkedin.com/in/dean-mitco-248a50219/</a>
<br />
<a href="https://github.com/DeanMitco" target="_blank" rel="noopener">https://github.com/DeanMitco</a>
</p>
<p>Alle Texte sind urheberrechtlich geschützt.</p>
<p className="text-sm text-support/60 mt-4">
  Quelle: Erstellt mit dem <a href="https://www.adsimple.at/impressum-generator/" title="Impressum Generator Österreich von AdSimple" className="underline hover:no-underline">
    Impressum Generator
  </a> von AdSimple
</p>





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
