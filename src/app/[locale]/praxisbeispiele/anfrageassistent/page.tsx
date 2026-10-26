import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import AnfrageDemo from "../../sections/anfrage-demo/AnfrageDemo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "inquiryShowcase" });
  return { title: t("demoPageTitle"), description: t("demoPageDescription") };
}

export default function InquiryDemoPage() {
  return (
    <main className="pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <BackToExamples />
      </div>
      <AnfrageDemo
        headingLevel={1}
        defaultModel={process.env.OPENAI_MODEL === "gpt-4.1-nano" ? "gpt-4.1-nano" : "gpt-5-nano"}
        unlimitedLocalTests={process.env.NODE_ENV === "development" && process.env.INQUIRY_LOCAL_ONLY !== "false" && process.env.INQUIRY_UNLIMITED_LOCAL_TESTS === "true"}
      />
    </main>
  );
}

async function BackToExamples() {
  const t = await getTranslations("inquiryShowcase");
  return <Link href="/praxisbeispiele" className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm text-support transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground"><ArrowLeft size={16} aria-hidden="true" />{t("backToExamples")}</Link>;
}
