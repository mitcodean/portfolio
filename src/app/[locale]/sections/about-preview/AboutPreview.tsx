"use client";

import { useRef } from "react";
import { useInView} from "framer-motion";
import Link from "next/link";
import { ArrowUpRight,TrendingUp, ShieldCheck, Users, Compass} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, type Variants } from "framer-motion";

import TiltCard from "@/components/ui/tilt-card";

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,300;1,8..60,400&family=DM+Sans:wght@300;400;500&display=swap');
`;

const fadeUp = (delay = 0): Variants => ({
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: "easeOut",
      delay,
    },
  },
});

export default function AboutPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const scrollRef = useRef(null);

  const t = useTranslations("about");

  const traits = [
    {
      icon: Compass,
      title: t("traits.simple"),
      text: t("traits.simpleDesc"),
    },
    {
      icon: Users,
      title: t("traits.personal"),
      text: t("traits.personalDesc"),
    },
    {
      icon: ShieldCheck,
      title: t("traits.quality"),
      text: t("traits.qualityDesc"),
    },
    {
      icon: TrendingUp,
      title: t("traits.growth"),
      text: t("traits.growthDesc"),
    },
  ];

  return (
    <>
      <style>{FONT_STYLE}</style>
      <section
        ref={ref}
        id="about"
        className="bg-background py-16 sm:py-20 lg:py-28 relative overflow-hidden"
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section label */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mb-10 sm:mb-14 relative overflow-hidden rounded-xl"
          >
            {/* Decorative triangle marks — hidden on mobile to avoid overflow/clutter */}
            <div className="w-full h-full bg-primary absolute pointer-events-none rounded-xl"/>
            <div className="hidden sm:block w-0 h-0 border-solid border-t-0 border-r-[350px] border-l-0 border-b-[350px] border-l-transparent border-r-primary border-t-transparent border-b-transparent right-0 top-0 absolute pointer-events-none rounded-xl"/>

            <div className="relative inline-block px-1 py-1">
              <h2
                className="relative text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[0.1em] sm:tracking-[0.2em] break-words"
                style={{ fontFamily: "'DM Sans', sans-serif", zIndex: 1 }}
              >
                <span className="text-secondary">{t("title")}</span>
              </h2>
            </div>
          </motion.div>

          {/* Main grid */}
          <div ref={scrollRef} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* LEFT — copy */}
            <div className="space-y-6 sm:space-y-8">

              {/* subheadline */}
              <motion.h2
                variants={fadeUp(0.05)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="leading-[1.15] sm:leading-[1.1]"
                style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
              >
                <span className="block text-xl sm:text-2xl lg:text-4xl font-light text-foreground">{t("subtitle").split(",")[0]}</span>
                <span className="block text-xl sm:text-2xl lg:text-4xl font-light italic">

                  <span className="relative inline-block text-primary">
                    {t("subtitle").split(",")[1]?.trim() || t("subtitle")}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : {}}
                      transition={{ delay: 0.7, duration: 0.55, ease: "easeOut" }}
                      className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary/35 origin-left rounded-full"
                    />
                  </span>
                </span>
              </motion.h2>

              <motion.div
                variants={fadeUp(0.12)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="space-y-4 sm:space-y-5 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <p className="text-base sm:text-lg text-neutral/90">
                  {t("description")}
                </p>
                <p className="text-sm sm:text-base text-support">
                  {t("description2")}
                </p>
                {/* Editorial quote — Source Serif 4 italic */}
                <blockquote
                  className="border-l-2 border-primary/40 pl-4 sm:pl-5 py-1 mt-2"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  <p className="text-lg sm:text-xl font-light italic text-foreground/60 leading-snug">
                    &quot;{t("quote")}&quot;
                  </p>
                  <footer className="mt-2 text-xs uppercase tracking-widest text-support/50"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                      {t("quoteAuthor")}
                  </footer>
                </blockquote>
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeUp(0.18)} initial="hidden" animate={inView ? "visible" : "hidden"}>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors duration-200 py-2 -my-2"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {t("cta")}
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </Link>
              </motion.div>

              {/* Traits grid */}
              <motion.div
                variants={fadeUp(0.22)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-2 sm:pt-4"
              >
                {traits.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="group p-4 sm:p-5 rounded-xl border border-border bg-muted/40 active:border-primary/30 active:bg-primary/5 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-default relative overflow-hidden"
                  >
                    {/* Tiny triangle accent on hover */}
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <polygon points="28,0 28,28 0,0" fill="#B22222" opacity="0.15" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2.5 mb-2.5 sm:mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon size={15} className="text-primary" />
                      </div>
                      <p className="text-sm font-semibold text-foreground"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}>{title}</p>
                    </div>
                    <p className="text-xs text-support leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>{text}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* RIGHT — photo (now visible on all breakpoints, not just lg) */}
            <motion.div
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative w-full h-[340px] xs:h-[400px] sm:h-[460px] lg:h-[580px]"
            >
              {/* Photo frame */}
              <motion.div
                className="absolute inset-x-0 mx-auto w-[80%] sm:w-[65%] top-0 lg:left-4 lg:inset-x-auto lg:mx-0 lg:w-[78%]"
              >
                <div className="relative w-full h-[340px] xs:h-[400px] sm:h-[460px] lg:h-[580px]">
                  <div className="absolute inset-x-0 mx-auto w-[80%] sm:w-[65%] top-0 lg:left-4 lg:inset-x-auto lg:mx-0 lg:w-[78%]">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40 aspect-[3/4] bg-muted">
                      <img
                        src="/dean.jpg"
                        alt="Dean Silviu Mitco"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" />
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl bg-[#0F172A]/80 border border-white/10 backdrop-blur-sm">
                        <p className="text-xs font-bold text-foreground">Dean-Silviu Mitco</p>
                        <p className="text-[10px] text-primary mt-0.5 tracking-[0.1em]">FOUNDER & DEVELOPER</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
}
