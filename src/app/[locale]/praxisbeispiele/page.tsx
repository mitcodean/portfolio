import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import InquiryShowcase from "@/components/inquiry/InquiryShowcase";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "inquiryShowcase" });
  return { title: t("pageTitle"), description: t("description") };
}

export default function CaseStudiesPage() {
  return <main className="pt-20"><InquiryShowcase standalone /></main>;
}
