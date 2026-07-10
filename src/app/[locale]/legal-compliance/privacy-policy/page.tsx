// Privacy Policy, Datenschutzerklärung
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function DatenschutzPage() {
  const t = useTranslations("legal.privacy");
  const tLegal = useTranslations("legal");

  return (
    <main className="bg-background min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">
            {tLegal("title")}
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground">
            {t("title")}
          </h1>
          <p className="text-support mt-3 text-sm">
            {t("updated")}
          </p>
        </div>

        <div className="space-y-10 text-support text-sm leading-relaxed">

          <Section title={t("section1")}>
            <p>{t("section1Desc")}</p>
            <div className="mt-3 rounded-xl border border-border bg-muted/20 p-5 space-y-1 text-sm">
              <p className="text-foreground font-semibold">{t("company")}</p>
              <p>Dean-Silviu Mitco</p>
              <p>Eisenstraße 13, 4460 Losenstein, Österreich</p>
              <p>E-Mail: <a href="mailto:contact@mitcodean.com" className="text-primary hover:underline">contact@mitcodean.com</a></p>
              <p>Tel.: +43 664 9494891</p>
            </div>
          </Section>

          <Section title={t("section2")}>
            <p>{t("section2Desc")}</p>
            <ul className="mt-3 space-y-2 pl-5 list-disc marker:text-primary">
              <li><strong className="text-foreground">{t("data1")}</strong></li>
              <li><strong className="text-foreground">{t("data2")}</strong></li>
              <li><strong className="text-foreground">{t("data3")}</strong></li>
              <li><strong className="text-foreground">{t("data4")}</strong></li>
            </ul>
          </Section>

          <Section title={t("section3")}>
            <div className="space-y-4">
              <SubSection label={t("section3Contact")}>
                <p>{t("section3ContactDesc")}</p>
              </SubSection>
              <SubSection label={t("section3Cookies")}>
                <p>{t("section3CookiesDesc")}</p>
              </SubSection>
              <SubSection label={t("section3Analytics")}>
                <p>{t("section3AnalyticsDesc")}</p>
              </SubSection>
            </div>
          </Section>

          <Section title={t("section4")}>
            <p>{t("section4Desc")}</p>
          </Section>

          <Section title={t("section6")}>
            <p>{t("section6Desc")}</p>
            <ul className="mt-3 space-y-2 pl-5 list-disc marker:text-primary">
              <li><strong className="text-foreground">{t("section6Item1")}</strong></li>
              <li><strong className="text-foreground">{t("section6Item2")}</strong></li>
              <li><strong className="text-foreground">{t("section6Item3")}</strong></li>
              <li><strong className="text-foreground">{t("section6Item4")}</strong></li>
              <li><strong className="text-foreground">{t("section6Item5")}</strong></li>
              <li><strong className="text-foreground">{t("section6Item6")}</strong></li>
              <li><strong className="text-foreground">{t("section6Item7")}</strong></li>
            </ul>
            <p className="mt-3">
              {t("section6Contact")}{" "}
              <a href="mailto:contact@mitcodean.com" className="text-primary hover:underline">contact@mitcodean.com</a>
            </p>
          </Section>

          <Section title={t("section7")}>
            <p>{t("section7Desc")}</p>
            <div className="mt-3 rounded-xl border border-border bg-muted/20 p-5 text-sm space-y-1">
              <p className="text-foreground font-semibold">{t("authorityName")}</p>
              <p>{t("authorityAddress")}</p>
              <p>{t("authorityPhone")}</p>
              <p><a href="https://www.dsb.gv.at" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.dsb.gv.at</a></p>
            </div>
          </Section>

          <Section title={t("section8")}>
            <p>{t("section8Desc")}</p>
            <div className="mt-4 rounded-xl border border-border bg-muted/20 p-5 text-sm space-y-2">
              <p className="text-foreground font-semibold text-xs uppercase tracking-wider">{t("cookieTitle")}</p>
              <div className="space-y-2 text-xs">
                <div className="flex gap-3"><span className="text-support/60 min-w-[160px]">mitcodean_cookie_consent</span><span className="text-foreground">{t("cookie1")}</span></div>
                <div className="flex gap-3"><span className="text-support/60 min-w-[160px]">_ga, _ga_*</span><span className="text-foreground">{t("cookie2")}</span></div>
              </div>
            </div>
          </Section>

          <Section title={t("section9")}>
            <p>{t("section9Desc")}</p>
          </Section>

        </div>

        <div className="mt-12 flex gap-6 text-xs text-support">
          <Link href="/legal-compliance/legal-notice" className="hover:text-primary transition-colors">→ {tLegal("notice.title")}</Link>
          <Link href="/legal-compliance/terms-and-conditions" className="hover:text-primary transition-colors">→ {tLegal("terms.title")}</Link>
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
