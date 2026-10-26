import { getTranslations } from "next-intl/server";
import type { SiteLocale } from "@/content/services";
import HeroContent from "./HeroContent";

export default async function Hero({ locale }: { locale: SiteLocale }) {
  const t = await getTranslations({ locale, namespace: "hero" });
  return <HeroContent locale={locale} labels={{
    headlineStart: t("headlineStart"), headlineStartHover: t("headlineStartHover"),
    headlineMiddle: t("headlineMiddle"), headlineEnd: t("headlineEnd"),
    headlineEndHover: t("headlineEndHover"), subtitle: t("subtitle"),
    mobileSubtitle: t("mobileSubtitle"),
    vision: t("vision"), cta: t("cta"), secondary: t("secondary"),
    newTab: t("newTab"), pauseVideo: t("pauseVideo"), playVideo: t("playVideo"),
  }} />;
}
