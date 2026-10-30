import { getTranslations, setRequestLocale } from "next-intl/server";
import { asLocale } from "@/config/site";
import { pageMetadata } from "@/lib/site-seo";
import { parseLegalDocument } from "@/lib/legal";
import LegalDocument from "@/components/legal/LegalDocument";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  return pageMetadata(asLocale((await params).locale), "legal");
}

export default async function Page({ params }: Props) {
  const locale = asLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "legal" });
  const document = parseLegalDocument(t.raw("notice"), "notice");
  const paths = {
    notice: "/legal-compliance/legal-notice",
    privacy: "/legal-compliance/privacy-policy",
    terms: "/legal-compliance/terms-and-conditions",
  } as const;
  const related = (["notice", "privacy", "terms"] as const)
    .filter(key => key !== "notice")
    .map(key => ({ label: t(key + ".title"), href: paths[key] }));
  return <LegalDocument document={document} locale={locale} label={t("title")} related={related} />;
}
