// Terms and Conditions, AGB
import Link from "next/link";

export default function AGBPage() {
  return (
    <main className="bg-background min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">Rechtliches</p>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground">Allgemeine Geschäftsbedingungen</h1>
          <p className="text-support mt-3 text-sm">
            Stand: Jänner 2025 · Mitco Dean Digital Solutions, Dean-Silviu Mitco
          </p>
          <div className="mt-4 p-4 rounded-xl border border-primary/20 bg-primary/5 text-xs text-support leading-relaxed">
            Diese AGB wurden nach dem Muster der WKO Österreich für IT-Dienstleistungsunternehmen erstellt.
            Sie ersetzen keine individuelle Rechtsberatung. Bei Fragen stehen wir unter{" "}
            <a href="mailto:contact@mitcodean.com" className="text-primary hover:underline">contact@mitcodean.com</a> zur Verfügung.
          </div>
        </div>

        <div className="space-y-10 text-support text-sm leading-relaxed">

          <Section title="§ 1 Geltungsbereich und Vertragspartner">
            <p>
              Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen
              <strong className="text-foreground"> Mitco Dean Digital Solutions, Dean-Silviu Mitco</strong>,
              Eisenstraße 13, 4460 Losenstein (nachfolgend „Auftragnehmer") und seinen Auftraggebern
              (nachfolgend „Auftraggeber") über IT-Dienstleistungen, Webentwicklung, digitales Marketing
              und damit verbundene Leistungen.
            </p>
            <p className="mt-3">
              Abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der Auftragnehmer
              stimmt ihrer Geltung ausdrücklich schriftlich zu. Individualvereinbarungen gehen diesen AGB vor.
            </p>
          </Section>

          <Section title="§ 2 Vertragsschluss und Angebote">
            <p>
              Angebote des Auftragnehmers sind freibleibend und unverbindlich. Ein Vertrag kommt erst durch
              schriftliche Auftragsbestätigung des Auftragnehmers oder durch Beginn der Leistungserbringung zustande.
              Mündliche Nebenabreden bedürfen zu ihrer Wirksamkeit der schriftlichen Bestätigung.
            </p>
            <p className="mt-3">
              Kostenvoranschläge werden nach bestem Wissen und Gewissen erstellt. Überschreitungen von bis zu
              <strong className="text-foreground"> 15 %</strong> gelten als vereinbart und werden dem Auftraggeber nicht
              gesondert mitgeteilt. Bei darüber hinausgehenden Überschreitungen erfolgt unverzüglich Information
              und Einholung der Zustimmung.
            </p>
          </Section>

          <Section title="§ 3 Leistungsumfang">
            <p>
              Der Leistungsumfang ergibt sich aus der schriftlichen Auftragsbestätigung sowie allfälligen
              Leistungsbeschreibungen. Zu den Leistungen des Auftragnehmers gehören insbesondere:
            </p>
            <ul className="mt-3 space-y-1.5 pl-5 list-disc marker:text-primary">
              <li>Konzeption, Gestaltung und Entwicklung von Websites und Webanwendungen</li>
              <li>Entwicklung von E-Commerce-Lösungen und Online-Shops</li>
              <li>Suchmaschinenoptimierung (SEO) und digitales Marketing</li>
              <li>Softwareentwicklung, Prozessautomatisierung und ERP-Integration</li>
              <li>Entwicklung mobiler Applikationen</li>
              <li>Laufende Wartung und technischer Support</li>
              <li>Beratungsleistungen im Bereich Digitalisierung und Branding</li>
            </ul>
            <p className="mt-3">
              Änderungen oder Erweiterungen des vereinbarten Leistungsumfangs (Change Requests) bedürfen
              einer schriftlichen Vereinbarung und können zu einer Anpassung von Preis und Lieferzeit führen.
            </p>
          </Section>

          <Section title="§ 4 Pflichten des Auftraggebers">
            <p>
              Der Auftraggeber verpflichtet sich zur rechtzeitigen Bereitstellung aller für die Leistungserbringung
              erforderlichen Unterlagen, Zugangsdaten, Inhalte und Informationen. Verzögerungen, die durch
              verspätete Mitwirkung entstehen, gehen zu Lasten des Auftraggebers und berechtigen den Auftragnehmer
              zur angemessenen Verlängerung der Lieferfrist.
            </p>
            <p className="mt-3">
              Der Auftraggeber stellt sicher, dass bereitgestellte Inhalte (Texte, Bilder, Logos) frei von
              Rechten Dritter sind und deren Nutzung keine gesetzlichen Vorschriften verletzt.
              Er stellt den Auftragnehmer von allen Ansprüchen Dritter frei, die aus einer Verletzung
              dieser Pflicht entstehen.
            </p>
          </Section>

          <Section title="§ 5 Preise, Zahlung und Fälligkeit">
            <p>
              Alle Preise verstehen sich in Euro, netto, zuzüglich der gesetzlichen Umsatzsteuer (20 %),
              sofern nicht ausdrücklich anders vereinbart.
            </p>
            <div className="mt-3 space-y-2">
              <p><strong className="text-foreground">Projektarbeiten:</strong> 50 % bei Auftragserteilung, 50 % bei Projektabnahme. Bei Projekten über 2.000 € netto sind 3-Phasen-Zahlungen möglich (nach Vereinbarung).</p>
              <p><strong className="text-foreground">Wartungsverträge:</strong> monatliche Abrechnung, fällig jeweils am 1. des Monats.</p>
              <p><strong className="text-foreground">Stundensätze:</strong> nach gesonderter Vereinbarung.</p>
            </div>
            <p className="mt-3">
              Bei Zahlungsverzug werden Verzugszinsen in Höhe von <strong className="text-foreground">8 % über dem Basiszinssatz</strong> p.a.
              sowie eine Mahngebühr von <strong className="text-foreground">15 €</strong> je Mahnung verrechnet.
              Der Auftragnehmer behält sich vor, bei Zahlungsverzug die weitere Leistungserbringung bis zur
              vollständigen Zahlung auszusetzen.
            </p>
          </Section>

          <Section title="§ 6 Lieferzeiten und Termine">
            <p>
              Vereinbarte Lieferzeiten gelten nur dann als verbindlich, wenn sie schriftlich als „verbindlich"
              bezeichnet wurden. Lieferverzögerungen durch höhere Gewalt, Streik oder verspätete
              Mitwirkung des Auftraggebers entbinden den Auftragnehmer von der Einhaltung vereinbarter Termine.
            </p>
          </Section>

          <Section title="§ 7 Abnahme und Mängelbehebung">
            <p>
              Nach Fertigstellung wird die Leistung dem Auftraggeber zur Abnahme vorgelegt.
              Die Abnahme gilt als erteilt, wenn der Auftraggeber nicht innerhalb von
              <strong className="text-foreground"> 14 Tagen</strong> schriftlich begründete Mängel rügt.
            </p>
            <p className="mt-3">
              Mängel, die auf fehlerhaften oder unvollständigen Angaben des Auftraggebers beruhen,
              begründen keine Gewährleistungsansprüche. Die Gewährleistungsfrist beträgt
              <strong className="text-foreground"> 2 Jahre</strong> ab Abnahme, eingeschränkt auf
              unentgeltliche Nachbesserung oder Ersatzlieferung.
            </p>
          </Section>

          <Section title="§ 8 Urheberrecht und Nutzungsrechte">
            <p>
              Alle im Rahmen des Auftrags erstellten Werke (Code, Designs, Texte, Konzepte) bleiben
              bis zur vollständigen Bezahlung Eigentum des Auftragnehmers.
            </p>
            <p className="mt-3">
              Mit vollständiger Bezahlung überträgt der Auftragnehmer dem Auftraggeber ein
              <strong className="text-foreground"> einfaches, nicht übertragbares Nutzungsrecht</strong> für den
              vereinbarten Verwendungszweck. Eine Weiterveräußerung oder Übertragung an Dritte bedarf der
              schriftlichen Zustimmung des Auftragnehmers.
            </p>
            <p className="mt-3">
              Der Auftragnehmer behält das Recht, die erbrachten Arbeiten zu Referenzzwecken
              (Portfolio, Marketing) zu verwenden, sofern nicht ausdrücklich anders vereinbart.
            </p>
          </Section>

          <Section title="§ 9 Vertraulichkeit">
            <p>
              Beide Parteien verpflichten sich, alle im Rahmen der Zusammenarbeit erhaltenen vertraulichen
              Informationen streng geheim zu halten und nicht an Dritte weiterzugeben. Diese Verpflichtung
              gilt auch nach Beendigung des Vertragsverhältnisses fort.
            </p>
          </Section>

          <Section title="§ 10 Haftungsbeschränkung">
            <p>
              Der Auftragnehmer haftet für Schäden nur bei Vorsatz und grober Fahrlässigkeit.
              Bei leichter Fahrlässigkeit ist die Haftung auf den <strong className="text-foreground">Auftragswert</strong> begrenzt.
              Eine Haftung für entgangenen Gewinn, mittelbare Schäden und Folgeschäden ist ausgeschlossen,
              soweit gesetzlich zulässig.
            </p>
            <p className="mt-3">
              Der Auftragnehmer übernimmt keine Haftung für die Erreichung bestimmter Platzierungen in
              Suchmaschinen (SEO) oder bestimmter Werbeerfolge (Marketing), da diese von Faktoren abhängen,
              die außerhalb seines Einflussbereichs liegen.
            </p>
          </Section>

          <Section title="§ 11 Laufzeit und Kündigung">
            <p>
              Projektverträge enden mit der Abnahme der vereinbarten Leistung.
              Wartungsverträge werden auf unbestimmte Zeit geschlossen und können von beiden Seiten mit
              einer Frist von <strong className="text-foreground">4 Wochen</strong> zum Monatsende schriftlich gekündigt werden.
            </p>
            <p className="mt-3">
              Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
              Ein wichtiger Grund liegt insbesondere bei Zahlungsverzug von mehr als 30 Tagen vor.
            </p>
          </Section>

          <Section title="§ 12 Datenschutz">
            <p>
              Beide Parteien verpflichten sich zur Einhaltung der datenschutzrechtlichen Bestimmungen,
              insbesondere der DSGVO (EU) 2016/679 und des österreichischen Datenschutzgesetzes (DSG).
              Die Datenschutzerklärung des Auftragnehmers ist unter{" "}
              <a href="/datenschutz" className="text-primary hover:underline">www.mitcodean.com/datenschutz</a>{" "}
              abrufbar.
            </p>
          </Section>

          <Section title="§ 13 Anwendbares Recht und Gerichtsstand">
            <p>
              Es gilt ausschließlich <strong className="text-foreground">österreichisches Recht</strong> unter Ausschluss
              der Kollisionsnormen und des UN-Kaufrechts (CISG).
            </p>
            <p className="mt-3">
              Für alle Streitigkeiten aus oder im Zusammenhang mit diesem Vertrag wird
              <strong className="text-foreground"> Steyr als Gerichtsstand</strong> vereinbart,
              soweit gesetzlich zulässig. Bei Verbraucherverträgen gelten die gesetzlichen Zuständigkeitsregeln.
            </p>
          </Section>

          <Section title="§ 14 Salvatorische Klausel">
            <p>
              Sollten einzelne Bestimmungen dieser AGB unwirksam oder undurchführbar sein,
              so bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. Die unwirksame Bestimmung
              ist durch eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck der unwirksamen
              Bestimmung möglichst nahekommt.
            </p>
          </Section>

        </div>

        <div className="mt-12 flex gap-6 text-xs text-support">
          <Link href="/impressum" className="hover:text-primary transition-colors">→ Impressum</Link>
          <Link href="/datenschutz" className="hover:text-primary transition-colors">→ Datenschutzerklärung</Link>
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
