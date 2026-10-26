import { getTranslations } from "next-intl/server";
import { ArrowRight, ArrowUpRight, ClipboardCheck, FileText, ListChecks } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { CALENDLY_BOOKING_URL, INQUIRY_DEMO_PATH } from "@/config/diovis";
import DemoVideo from "./DemoVideo";
import InquiryBookingCTA from "@/app/[locale]/sections/anfrage-demo/InquiryBookingCTA";

export default async function InquiryShowcase({ standalone = false }: { standalone?: boolean }) {
  const t = await getTranslations("inquiryShowcase");
  const Title = standalone ? "h1" : "h2";
  const VideoTitle = standalone ? "h2" : "h3";
  const benefits = [
    { icon: FileText, title: t("benefits.input.title"), description: t("benefits.input.description") },
    { icon: ListChecks, title: t("benefits.overview.title"), description: t("benefits.overview.description") },
    { icon: ClipboardCheck, title: t("benefits.review.title"), description: t("benefits.review.description") },
  ];

  return (
    <section id="praxisbeispiele" aria-labelledby="inquiry-showcase-title" className={cn("relative bg-background py-20 font-sans sm:py-24", standalone && "pt-0 sm:pt-2")}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-9 max-w-4xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-red-400">{t("eyebrow")}</p>
          <Title id="inquiry-showcase-title" className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">{t("title")}</Title>
          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral sm:text-lg sm:leading-8">{t("description")}</p>
        </header>

        <article aria-labelledby="inquiry-video-title" className="overflow-hidden rounded-2xl border border-border bg-white/[0.025] shadow-2xl shadow-black/15">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-background/50 px-5 py-4 sm:px-7">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-full border border-red-400/40 bg-primary/10 font-mono text-xs text-red-300">01</span>
              <VideoTitle id="inquiry-video-title" className="text-sm font-semibold text-foreground sm:text-base">{t("exampleTitle")}</VideoTitle>
            </div>
            <span className="rounded-full border border-amber-300/25 bg-amber-300/5 px-3 py-1.5 text-[11px] leading-5 text-amber-200">{t("exampleBadge")}</span>
          </div>

          <DemoVideo />

          <div className="border-t border-border p-5 sm:p-7 lg:p-8">
            <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
              <div className="max-w-xl xl:max-w-sm">
                <p className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{t("actionTitle")}</p>
                <p className="mt-2 text-sm leading-7 text-support">{t("actionDescription")}</p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
                <Link href={INQUIRY_DEMO_PATH} className="group inline-flex min-h-13 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-center text-sm font-semibold leading-6 text-white transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background">
                  {t("tryDemo")}<ArrowRight size={17} aria-hidden="true" className="shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5" />
                </Link>
                <a href={CALENDLY_BOOKING_URL} target="_blank" rel="noopener noreferrer" aria-label={`${t("bookMeeting")} (${t("newTab")})`} className="inline-flex min-h-13 items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3.5 text-center text-sm font-semibold leading-6 text-foreground transition-colors hover:border-support hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background">
                  {t("bookMeeting")}<ArrowUpRight size={17} aria-hidden="true" className="shrink-0" />
                </a>
              </div>
            </div>
            <p className="mt-4 text-xs leading-6 text-support">{t("demoHint")}</p>
          </div>
        </article>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, description }, index) => (
            <div key={title} className="rounded-2xl border border-border bg-muted/20 p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <Icon size={20} aria-hidden="true" className="text-red-300" />
                <span className="font-mono text-xs text-support">0{index + 1}</span>
              </div>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-support">{description}</p>
            </div>
          ))}
        </div>

        <details className="mt-5 rounded-xl border border-border bg-background px-5 py-1 text-sm text-neutral">
          <summary className="cursor-pointer py-3 leading-6 underline-offset-4 hover:text-foreground focus-visible:rounded focus-visible:outline-2 focus-visible:outline-offset-4">{t("textAlternative")}</summary>
          <p className="max-w-4xl pb-4 leading-7 text-support">{t("workflowText")}</p>
        </details>

        <InquiryBookingCTA hasResult={false} variant="showcase" headingLevel={standalone ? 2 : 3} />
      </div>
    </section>
  );
}
