"use client";

import { ArrowRight, ArrowUpRight, CalendarDays, Check, CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { CALENDLY_BOOKING_URL } from "@/config/diovis";

export default function InquiryBookingCTA({ hasResult, variant = "demo", headingLevel = 3 }: { hasResult: boolean; variant?: "demo" | "showcase"; headingLevel?: 2 | 3 }) {
  const t = useTranslations("inquiryDemo");
  const showcase = useTranslations("inquiryShowcase");
  const isShowcase = variant === "showcase";
  const buttonLabel = isShowcase ? showcase("bookMeeting") : t("ctaButton");
  const Title = headingLevel === 2 ? "h2" : "h3";

  return (
    <section aria-labelledby="inquiry-booking-title" className="relative mt-8 overflow-hidden rounded-3xl border border-red-400/25 bg-linear-to-br from-primary/10 via-background to-muted/50">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-400/70 to-transparent" />
      <div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12 lg:p-10">
        <div>
          <p className="mb-4 flex items-start gap-2 text-xs font-semibold leading-5 tracking-wide text-red-300">
            {hasResult ? <CheckCircle2 size={16} aria-hidden="true" className="mt-0.5 shrink-0" /> : <ArrowRight size={16} aria-hidden="true" className="mt-0.5 shrink-0" />}
            {isShowcase ? showcase("ctaEyebrow") : hasResult ? t("ctaResultEyebrow") : t("ctaEyebrow")}
          </p>
          <Title id="inquiry-booking-title" className="max-w-xl text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            {isShowcase ? showcase("ctaTitle") : hasResult ? t("ctaResultTitle") : t("ctaTitle")}
          </Title>
          <p className="mt-4 max-w-xl text-sm leading-7 text-neutral">
            {isShowcase ? showcase("ctaDescription") : hasResult ? t("ctaResultDescription") : t("ctaDescription")}
          </p>
          <ul className="mt-6 space-y-3 text-sm leading-6 text-neutral">
            {[t("ctaTopics.workflow"), t("ctaTopics.fit"), t("ctaTopics.nextStep")].map(topic => (
              <li key={topic} className="flex items-start gap-3">
                <Check size={15} aria-hidden="true" className="mt-1 shrink-0 text-red-300" />
                {topic}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-background/80 p-5 shadow-xl shadow-black/10 sm:p-7">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-red-400/25 bg-primary/10 text-red-300"><CalendarDays size={21} /></span>
            <p className="text-sm font-medium text-neutral">{t("ctaMeetingLabel")}</p>
          </div>
          <p className="mt-5 text-3xl font-semibold tracking-tight text-foreground">{t("ctaDuration")}</p>
          <p className="mt-1.5 text-sm leading-6 text-support">{t("ctaHost")}</p>
          <a
            href={CALENDLY_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${buttonLabel} (${t("ctaNewTab")})`}
            className="group mt-6 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 text-center text-sm font-semibold leading-6 text-white shadow-lg shadow-primary/15 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            {buttonLabel}
            <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
          </a>
          <p className="mt-3 text-center text-xs leading-5 text-support">{isShowcase ? showcase("bookingHint") : t("ctaExternalHint")}</p>
        </div>
      </div>
    </section>
  );
}
