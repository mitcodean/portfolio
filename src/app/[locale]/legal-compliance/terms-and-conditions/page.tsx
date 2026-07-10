// Terms and Conditions, AGB
import Link from "next/link";

import { useTranslations } from "next-intl";

export default function AGBPage() {
  const t = useTranslations("legal.terms");
  const tLegal = useTranslations("legal");

  return (
    <main className="bg-background min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">
            {tLegal("terms.title")}
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground">
            {t("title")}
          </h1>
          <p className="text-support mt-3 text-sm">
            {t("updated")}
          </p>
          <div className="mt-4 p-4 rounded-xl border border-primary/20 bg-primary/5 text-xs text-support leading-relaxed">
            {t("notice")}
          </div>
        </div>

        <div className="space-y-10 text-support text-sm leading-relaxed">

                    <Section title={t("section1")}>
            <p>{t("section1Desc")}</p>
            <p className="mt-3">{t("section1Desc2")}</p>
          </Section>

          <Section title={t("section2")}>
            <p>{t("section2Desc")}</p>
            <p className="mt-3">{t("section2Desc2")}</p>
          </Section>

          <Section title={t("section3")}>
            <p>{t("section3Desc")}</p>
            <ul className="mt-3 space-y-1.5 pl-5 list-disc marker:text-primary">
              <li>{t("section3Item1")}</li>
              <li>{t("section3Item2")}</li>
              <li>{t("section3Item3")}</li>
              <li>{t("section3Item4")}</li>
              <li>{t("section3Item5")}</li>
              <li>{t("section3Item6")}</li>
              <li>{t("section3Item7")}</li>
            </ul>
            <p className="mt-3">{t("section3Desc2")}</p>
          </Section>

          <Section title={t("section4")}>
            <p>{t("section4Desc")}</p>
            <p className="mt-3">{t("section4Desc2")}</p>
          </Section>

          <Section title={t("section5")}>
            <p>{t("section5Desc")}</p>
            <div className="mt-3 space-y-2">
              <p><strong className="text-foreground">{t("section5Item1")}</strong></p>
              <p><strong className="text-foreground">{t("section5Item2")}</strong></p>
              <p><strong className="text-foreground">{t("section5Item3")}</strong></p>
            </div>
            <p className="mt-3">{t("section5Desc2")}</p>
          </Section>

          <Section title={t("section6")}>
            <p>{t("section6Desc")}</p>
          </Section>

          <Section title={t("section7")}>
            <p>{t("section7Desc")}</p>
            <p className="mt-3">{t("section7Desc2")}</p>
          </Section>

          <Section title={t("section8")}>
            <p>{t("section8Desc")}</p>
            <p className="mt-3">{t("section8Desc2")}</p>
            <p className="mt-3">{t("section8Desc3")}</p>
          </Section>

          <Section title={t("section9")}>
            <p>{t("section9Desc")}</p>
          </Section>

          <Section title={t("section10")}>
            <p>{t("section10Desc")}</p>
            <p className="mt-3">{t("section10Desc2")}</p>
          </Section>

          <Section title={t("section11")}>
            <p>{t("section11Desc")}</p>
            <p className="mt-3">{t("section11Desc2")}</p>
          </Section>

          <Section title={t("section12")}>
            <p>{t("section12Desc")}</p>
          </Section>

          <Section title={t("section13")}>
            <p>{t("section13Desc")}</p>
            <p className="mt-3">{t("section13Desc2")}</p>
          </Section>

          <Section title={t("section14")}>
            <p>{t("section14Desc")}</p>
          </Section>

        </div>

        <div className="mt-12 flex gap-6 text-xs text-support">
          <Link href="/legal-compliance/legal-notice" className="hover:text-primary transition-colors">→ {tLegal("notice.title")}</Link>
          <Link href="/legal-compliance/privacy-policy" className="hover:text-primary transition-colors">→ {tLegal("privacy.title")}</Link>
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
