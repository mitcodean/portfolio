"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight, Zap, Globe, Check,
  Calendar, GitBranch, Bell, BarChart2,
  Search, Smartphone, ShoppingCart, Mail,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,300;1,8..60,400&family=DM+Sans:wght@300;400;500&display=swap');
`;

const fadeUp = (delay = 0): Variants => ({
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay,
    },
  },
});

// Triangle brand mark
function TriangleMark({ size = 40, opacity = 0.08 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 40 46" fill="none" style={{ opacity }} aria-hidden>
      <polygon points="20,2 38,44 2,44" fill="#B22222" />
    </svg>
  );
}

// Single card
function ServiceCard({
  card,
  fromLeft,
}: {
  card: any;
  fromLeft: boolean;
  t: any;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = card.icon;
  const t = useTranslations("services");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -64 : 64, y: 24 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.85, ease: "easeInOut" }}
      className="group relative flex flex-col rounded-2xl border border-white/8 bg-white/[0.025] backdrop-blur-sm overflow-hidden"
      style={{ boxShadow: "0 2px 60px rgba(0,0,0,0.3)" }}
    >
      {/* Top accent line */}
      <div
        className="h-[1.5px] w-full shrink-0"
        style={{ background: "linear-gradient(90deg, transparent, #B22222 40%, transparent)" }}
      />

      {/* Corner triangle brand mark */}
      <div className="absolute top-0 right-0 pointer-events-none overflow-hidden w-24 h-24">
        <svg viewBox="0 0 96 96" fill="none" className="absolute top-0 right-0 w-24 h-24">
          <polygon points="96,0 96,96 0,0" fill="#B22222" opacity="0.75" />
        </svg>
      </div>

      {/* Header block */}
      <div className="px-8 pt-8 pb-6 border-b border-white/6">
        {/* Eyebrow */}
        <div className="flex items-center gap-2.5 mb-5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "rgba(178,34,34,0.12)", border: "1px solid rgba(178,34,34,0.22)" }}
          >
            <Icon size={15} style={{ color: "#B22222" }} />
          </div>
          <span
            className="text-[10px] uppercase tracking-[0.3em] font-medium"
            style={{ color: "#B22222", fontFamily: "'DM Sans', sans-serif" }}
          >
            {card.eyebrow}
          </span>
        </div>

        {/* Headline — Source Serif 4 */}
        <h3 style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>
          <span
            className="block text-[clamp(1.6rem,2.8vw,2.2rem)] font-light leading-tight text-foreground"
          >
            {card.headline}
          </span>
          <span
            className="block text-[clamp(1.6rem,2.8vw,2.2rem)] font-light italic leading-tight text-foreground/35"
          >
            {card.subline}
          </span>
        </h3>
      </div>

      {/* Body */}
      <div className="px-8 py-6 flex flex-col flex-1 gap-6">

        {/* Body text */}
        <p
          className="text-[13.5px] text-support leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {card.body}
        </p>

        {/* Feature rows */}
        <div className="space-y-3">
          {card.items.map(({ icon: FIcon, label, sub }) => (
            <div
              key={label}
              className="flex items-start gap-3 p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-colors duration-200 group/item cursor-default"
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors"
                style={{ background: "rgba(178,34,34,0.1)", border: "1px solid rgba(178,34,34,0.18)" }}
              >
                <FIcon size={12} style={{ color: "#B22222" }} />
              </div>
              <div>
                <p
                  className="text-xs font-semibold text-foreground/90 mb-0.5"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {label}
                </p>
                <p
                  className="text-[11px] text-support/70 leading-snug"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {sub}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Examples strip */}
        <div className="pt-1">
          <p
            className="text-[10px] uppercase tracking-[0.25em] text-white/20 mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {t("examples")}
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0">
                <polygon points="5,0 10,10 0,10" fill="#B22222" />
              </svg>
              <span className="text-[12px] text-support/70">{card.example1}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0">
                <polygon points="5,0 10,10 0,10" fill="#B22222" />
              </svg>
              <span className="text-[12px] text-support/70">{card.example2}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0">
                <polygon points="5,0 10,10 0,10" fill="#B22222" />
              </svg>
              <span className="text-[12px] text-support/70">{card.example3}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-8 pb-8 pt-4 border-t border-white/6 mt-auto">
        <Link
          href={card.href}
          className="group/btn inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors duration-200"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {card.cta}
          <ArrowUpRight
            size={14}
            className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200"
          />
        </Link>
      </div>
    </motion.div>
  );
}

export default function ServicesPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const t = useTranslations("services");

  const CARD_AUTO = {
    icon: Zap,
    eyebrow: t("automation.title").split("—")[0].trim() || "Prozessautomatisierung",
    headline: t("automation.title").split("—")[0]?.trim() + " —",
    subline: t("automation.title").split("—")[1]?.trim() || "",
    body: t("automation.body"),
    items: [
      { icon: Calendar, label: t("automation.items.booking"), sub: t("automation.items.bookingSub") },
      { icon: GitBranch, label: t("automation.items.internal"), sub: t("automation.items.internalSub") },
      { icon: Bell, label: t("automation.items.reminders"), sub: t("automation.items.remindersSub") },
      { icon: BarChart2, label: t("automation.items.analytics"), sub: t("automation.items.analyticsSub") },
    ],
    example1: t("automation.example1"),
    example2: t("automation.example2"),
    example3: t("automation.example3"),

    cta: t("automation.cta"),
    href: "/contact",
  };

  const CARD_WEB = {
    icon: Globe,
    eyebrow: t("webDev.title").split("—")[0].trim() || "Websites & Online-Präsenz",
    headline: t("webDev.title").split("—")[0]?.trim() + " —",
    subline: t("webDev.title").split("—")[1]?.trim() || "",
    body: t("webDev.body"),
    items: [
      { icon: Search, label: t("webDev.items.seo"), sub: t("webDev.items.seoSub") },
      { icon: Smartphone, label: t("webDev.items.mobile"), sub: t("webDev.items.mobileSub") },
      { icon: ShoppingCart, label: t("webDev.items.ecommerce"), sub: t("webDev.items.ecommerceSub") },
      { icon: Mail, label: t("webDev.items.marketing"), sub: t("webDev.items.marketingSub") },
    ],
    example1: t("webDev.example1"),
    example2: t("webDev.example2"),
    example3: t("webDev.example3"),
    cta: t("webDev.cta"),
    href: "/contact",
  };

  return (
    <>
      <style>{FONT_STYLE}</style>
      <section ref={ref} id="services" className="bg-background py-24 relative overflow-hidden">

        {/* Background brand triangles */}
        <div className="absolute top-0 left-0 pointer-events-none">
          <TriangleMark size={260} opacity={0.025} />
        </div>
        <div className="absolute bottom-0 right-0 pointer-events-none rotate-180">
          <TriangleMark size={180} opacity={0.02} />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="mb-14 ">
            <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? "visible" : "hidden"}>
              <h2
                className="text-4xl sm:text-5xl font-bold text-primary uppercase tracking-[0.2em] mb-4 inline-block"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {t("title")}
              </h2>
              <h3
                className="text-xl sm:text-2xl font-light text-foreground leading-tight"
                style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
              >
                {t("subtitle")}
              </h3>
              <div className="mt-2 flex flex-col lg:flex-row gap-10">
                <h4
                  className="text-xl sm:text-2xl font-light text-foreground leading-tight underline"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  {t("process")}
                </h4>
                <h4
                  className="text-xl sm:text-2xl font-light text-foreground leading-tight underline"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  {t("web")}
                </h4>
              </div>
              
            </motion.div>
          <motion.div className="mt-6 flex flex-col lg:flex-row gap-10" variants={fadeUp(0.15)} initial="hidden" animate={inView ? "visible" : "hidden"}>
            <div>
              <motion.p
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-support text-[15px] leading-relaxed max-w-lg mt-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {t("processDesc")}
              </motion.p>
            </div>
            <div>
              <motion.p
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-support text-[15px] leading-relaxed max-w-lg mt-5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {t("webDesc")}
              </motion.p>
            </div>
            
          </motion.div>
          {/* Footer link */}
          <motion.div
            variants={fadeUp(0.45)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mt-10 flex items-center gap-6"
          >
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors duration-200"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
                {t("cta")}
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </Link>
          </motion.div>
            
          </div>

          {/* Two cards */}
          <div className="grid lg:grid-cols-2 gap-5">
            <ServiceCard card={CARD_AUTO} fromLeft={true} />
            <ServiceCard card={CARD_WEB}  fromLeft={false} />
          </div>
        </div>
      </section>
    </>
  );
}
