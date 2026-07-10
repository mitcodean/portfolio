// Legal Notice, Impressum

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ImpressumPage() {
  const t = useTranslations("legal.notice");
  const tLegal = useTranslations("legal");

  return (
    <main className="bg-background min-h-screen pt-32 pb-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">
            {tLegal("title")}
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-foreground">
            {t("title")}
          </h1>
          <p className="text-support mt-3 text-sm">{t("updated")}</p>
        </div>

        <div className="space-y-10 text-support leading-relaxed">

          {/* Unternehmensangaben */}
          <section className="rounded-2xl border border-border bg-muted/20 p-7 space-y-4">
            <h2 className="text-lg font-bold text-foreground">
              {t("companyInfo")}
            </h2>

            <div className="space-y-2 text-sm">
              <Row label={t("companyName")} value="Dean-Silviu Mitco" />
              <Row label={t("owner")} value="Dean-Silviu Mitco" />
              <Row label={t("legalForm")} value={t("legalFormValue")} />
              <Row label={t("address")} value={t("addressValue")} />
              <Row label={t("phone")} value="+43 664 9494891" />
              <Row label={t("email")} value="contact@mitcodean.com" />
              <Row label={t("website")} value="www.mitcodean.com" />
              <Row label={t("uid")} value={t("uidValue")} />
              <Row label={t("gisa")} value="39462992" />
              <Row label={t("authority")} value={t("authorityValue")} />
              <Row label={t("member")} value={t("memberValue")} />
            </div>

            <div className="text-sm text-support space-y-1 pt-3 border-t border-border/50">
              <p>{t("authorityAddress")}</p>
              <p>{t("authorityStreet")}</p>
              <p>{t("authorityCity")}</p>
              <a
                href="http://www.bh-steyr-land.gv.at"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {t("authorityLink")}
              </a>
            </div>
          </section>

          {/* Unternehmensgegenstand */}
                    <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">
              {t("businessPurpose")}
            </h2>
            <p className="text-sm">{t("businessPurposeDesc")}</p>

            <ul className="text-sm space-y-1 pl-5 list-disc marker:text-primary">
              <li>{t("purpose1")}</li>
              <li>{t("purpose2")}</li>
              <li>{t("purpose3")}</li>
              <li>{t("purpose4")}</li>
              <li>{t("purpose5")}</li>
              <li>{t("purpose6")}</li>
              <li>{t("purpose7")}</li>
            </ul>
          </section>

          {/* Rechtsgrundlagen */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">
              {t("legalBasis")}
            </h2>
            <p className="text-sm">
              {t("legalBasisDesc")}{" "}
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
              {t("liability")}
            </h2>
            <p className="text-sm">{t("liabilityDesc")}</p>
          </section>

          {/* Urheberrecht */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">
              {t("copyright")}
            </h2>
            <p className="text-sm">{t("copyrightDesc")}</p>
          </section>

          {/* Datenschutz & Verantwortung */}
          <section className="rounded-2xl border border-border bg-muted/20 p-7 space-y-3 text-sm">
            <h2 className="text-lg font-bold text-foreground">
              {t("privacyResponsibility")}
            </h2>

            <div className="space-y-2">
              <Row label={t("responsible")} value="Dean-Silviu Mitco" />
              <Row label={t("address")} value="Eisenstraße 13, 4460 Losenstein" />
              <Row label={t("email")} value="contact@mitcodean.com" />
              <Row label={t("phone")} value="+43 664 9494891" />
              <Row label={t("contentResponsible")} value="Dean-Silviu Mitco" />
              <Row label={t("professionalTitle")} value={t("professionalTitleValue")} />
              <Row label={t("countryOfAward")} value={t("countryOfAwardValue")} />
            </div>
          </section>

          {/* Blattlinie */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">
              {t("editorial")}
            </h2>
            <p className="text-sm">{t("editorialDesc")}</p>
          </section>

          {/* Bilder */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">
              {t("imageCredits")}
            </h2>
            <p className="text-sm">{t("imageCreditsDesc")}</p>
          </section>

          {/* Socials */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-foreground">
              {t("socials")}
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
          <Link href={`/legal-compliance/privacy-policy`} className="hover:text-primary transition-colors">
            → {tLegal("privacy.title")}
          </Link>
          <Link href={`/legal-compliance/terms-and-conditions`} className="hover:text-primary transition-colors">
            → {tLegal("terms.title")}
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
