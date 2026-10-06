"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowUpRight, Code2, Music, Globe, Layers, Terminal,
  Sparkles, Bike, Dumbbell, BookOpen, Award, Calendar,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

const fadeUp = (delay = 0): Variants => ({
  hidden: {
    opacity: 0,
    y: 36,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay,
    },
  },
});

const TECH_STACK = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "C#", ".NET",
  "Framer Motion", "Node.js", "SQL Server", "Figma", "Google Analytics",
];

const HOBBIES = [
  { icon: Bike, key: "motorcycle" },
  { icon: Dumbbell, key: "fitness" },
  { icon: Music, key: "music" },
  { icon: BookOpen, key: "philosophy" },
];

const MINDSET = [
  { icon: Terminal, key: "practical" },
  { icon: Layers, key: "architect" },
  { icon: Sparkles, key: "aesthetics" },
  { icon: Globe, key: "learning" },
];

const TIMELINE = [
  { key: "diovis", active: true },
  { key: "developer", active: true },
  { key: "htl", active: false },
];

function MagneticCTA({ href, children }: { href: string; children: React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const el = useRef<HTMLAnchorElement>(null);
  const handleMove = (e: React.MouseEvent) => {
    const r = el.current!.getBoundingClientRect();
    setPos({ x: e.clientX - r.left - r.width / 2, y: e.clientY - r.top - r.height / 2 });
  };
  const handleLeave = () => setPos({ x: 0, y: 0 });
  return (
    <motion.a
      ref={el}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: pos.x * 0.22, y: pos.y * 0.22 }}
      transition={{ type: "spring", stiffness: 180, damping: 14 }}
      className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-foreground text-sm font-semibold hover:bg-accent transition-colors duration-200"
    >
      {children}
      <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </motion.a>
  );
}

export default function AboutPage() {
  const t = useTranslations("aboutPage");
  const tc = useTranslations("common");

  const heroRef = useRef(null);
  const personRef = useRef(null);
  const techRef = useRef(null);
  const hobbiesRef = useRef(null);
  const timelineRef = useRef(null);

  const heroInView    = useInView(heroRef,    { once: true, margin: "-60px" });
  const personInView  = useInView(personRef,  { once: true, margin: "-60px" });
  const techInView    = useInView(techRef,    { once: true, margin: "-60px" });
  const hobbiesInView = useInView(hobbiesRef, { once: true, margin: "-60px" });
  const timelineInView = useInView(timelineRef, { once: true, margin: "-60px" });

  // Photos parallax
  const photoSection = useRef(null);
  const { scrollYProgress } = useScroll({ target: photoSection, offset: ["start end", "end start"] });
  const img1Y = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">

      {/* PART 1 — THE COMPANY */}

      {/* Hero: Big editorial headline */}
      <section ref={heroRef} className="relative min-h-[70vh] flex flex-col justify-end pb-18 pt-34 overflow-hidden">

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          {/* Label */}
          <motion.p variants={fadeUp(0)} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-8">
            {t("hero.label")}
          </motion.p>

          {/* Giant headline */}
          <motion.h1 variants={fadeUp(0.08)} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            className="text-[clamp(3rem,8vw,7.5rem)] font-black tracking-tight leading-[0.92] text-foreground mb-8 max-w-5xl">
            {t("hero.headline")}<br />
          </motion.h1>

          {/* Sub + CTA row */}
          <motion.div variants={fadeUp(0.18)} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 max-w-5xl">
            <p className="text-support text-lg max-w-md leading-relaxed">
              &quot;William Shakespeare&quot; <br/><br/>
              <br/>
              {t("hero.quote")}
            </p>
            <MagneticCTA href="/contact">{t("hero.cta")}</MagneticCTA>
          </motion.div>
        </div>
      </section>

      {/* Photo strip — full bleed */}
      <section ref={photoSection} className="relative py-20 overflow-hidden bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 items-center justify-center flex-col sm:flex-row">
            
              <Image
                src="/milky-way.jpg"
                alt="Milky Way in red"
                fill
                sizes="width: 100% height: auto"
                className="object-cover"
              />
          </div>
        </div>
      </section>

      {/*Person intro */}
      <section ref={personRef} className="py-28 relative overflow-hidden">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Big divider label */}
          <motion.div variants={fadeUp(0)} initial="hidden" animate={personInView ? "visible" : "hidden"}
            className="flex items-center gap-6 mb-20">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.25em] shrink-0">
              {t("person.label")}
            </span>
            <div className="h-px flex-1 bg-border" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — big number + name */}
            <div>
              <motion.div variants={fadeUp(0.05)} initial="hidden" animate={personInView ? "visible" : "hidden"}>
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight -mt-8 relative z-10">
                  Dean-Silviu<br />
                  <span className="text-primary">Mitco.</span>
                </h2>
              </motion.div>

              <motion.div variants={fadeUp(0.12)} initial="hidden" animate={personInView ? "visible" : "hidden"}
                className="mt-6 space-y-4 text-support leading-relaxed">
                <p className="text-lg text-neutral/90">
                  {t("person.intro1")}
                </p>
                <p>
                  {t("person.intro2")}
                </p>
                <p>
                  {t("person.intro3")}
                </p>
              </motion.div>
            </div>

            {/* Right — developer mindset cards */}
            <motion.div variants={fadeUp(0.15)} initial="hidden" animate={personInView ? "visible" : "hidden"}
              className="space-y-4">
              {MINDSET.map(({ icon: Icon, key }) => (
                <motion.div
                  key={key}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group flex gap-4 p-5 rounded-xl border border-border bg-muted/30 hover:border-primary/30 hover:bg-primary/4 transition-colors duration-200 cursor-default"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{t(`person.cards.${key}.title`)}</p>
                    <p className="text-xs text-support leading-relaxed">{t(`person.cards.${key}.text`)}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tech Stack*/}
      <section ref={techRef} className="py-20 border-y border-border bg-muted/10 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={techInView ? "visible" : "hidden"}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-1">{t("tech.label")}</p>
              <h3 className="text-2xl font-bold text-foreground">{t("tech.title")}</h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-support">
              <Code2 size={13} className="text-primary" />
              {t("tech.hint")}
            </div>
          </motion.div>

          <motion.div variants={fadeUp(0.08)} initial="hidden" animate={techInView ? "visible" : "hidden"}
            className="flex flex-wrap gap-3">
            {TECH_STACK.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={techInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.08 + i * 0.04, duration: 0.4, ease: "easeInOut" }}
                whileHover={{ scale: 1.06, y: -2 }}
                className="px-4 py-2 rounded-full border border-border bg-muted text-sm font-medium text-neutral hover:border-primary/40 hover:text-foreground hover:bg-primary/5 transition-colors duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Timeline*/}
      <section ref={timelineRef} className="py-28 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[340px_1fr] gap-20 items-start">

            {/* Sticky label */}
            <motion.div variants={fadeUp(0)} initial="hidden" animate={timelineInView ? "visible" : "hidden"}
              className="lg:sticky lg:top-32">
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-4">{t("timeline.label")}</p>
              <h2 className="text-3xl font-bold text-foreground leading-tight">
                {t("timeline.title1")}<br />
                <span className="text-primary">{t("timeline.title2")}</span>
              </h2>
              <p className="text-support text-sm mt-4 leading-relaxed">
                {t("timeline.sub")}
              </p>
            </motion.div>

            {/* Timeline items */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

              <div className="space-y-0">
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={fadeUp(0.07 + i * 0.09)}
                    initial="hidden"
                    animate={timelineInView ? "visible" : "hidden"}
                    className="relative pl-10 pb-10 last:pb-0 group"
                  >
                    {/* Dot */}
                    <div className={`absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 transition-all duration-300 ${
                      item.active
                        ? "bg-primary border-primary shadow-[0_0_10px_rgba(178,34,34,0.5)]"
                        : "bg-muted border-border group-hover:border-primary/50"
                    }`} />

                    {/* Content */}
                    <div className={`p-5 rounded-xl border transition-all duration-300 ${
                      item.active
                        ? "border-primary/30 bg-primary/5"
                        : "border-border bg-muted/30 group-hover:border-primary/20 group-hover:bg-primary/3"
                    }`}>
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-primary/80 uppercase tracking-widest">
                          <Calendar size={11} />
                          {t(`timeline.items.${item.key}.year`)}
                        </div>
                        {item.active && (
                          <span className="text-[10px] font-bold uppercase tracking-widest bg-primary text-foreground px-2 py-0.5 rounded-full">
                            {tc("current")}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-foreground">{t(`timeline.items.${item.key}.title`)}</h3>
                      <p className="text-xs font-medium text-support mb-2">{t(`timeline.items.${item.key}.sub`)}</p>
                      <p className="text-sm text-support/80 leading-relaxed">{t(`timeline.items.${item.key}.desc`)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies */}
      <section ref={hobbiesRef} className="py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={hobbiesInView ? "visible" : "hidden"}
            className="mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">{t("hobbies.label")}</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              {t("hobbies.title")}
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOBBIES.map(({ icon: Icon, key }, i) => (
              <motion.div
                key={key}
                variants={fadeUp(0.08 + i * 0.07)}
                initial="hidden"
                animate={hobbiesInView ? "visible" : "hidden"}
                whileHover={{ y: -8, transition: { type: "spring", stiffness: 260, damping: 18 } }}
                className="group relative p-7 rounded-2xl border border-border bg-muted/40 overflow-hidden cursor-default"
              >
                {/* Background glow on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/4 transition-colors duration-300 rounded-2xl" />
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-300">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{t(`hobbies.items.${key}.label`)}</h3>
                  <p className="text-sm text-support leading-relaxed">{t(`hobbies.items.${key}.text`)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA*/}
      <section className="py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-4">
              {t("cta.label")}
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-6 leading-tight">
             {t("cta.title1")} <br />
              <span className="text-primary">{t("cta.title2")}</span>
            </h2>
            <MagneticCTA href="/contact">{t("cta.button")}</MagneticCTA>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
