"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Code2, Lightbulb, Heart, MapPin } from "lucide-react";

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay } },
});

// Traits that make Mitco Dean stand out
const traits = [
  {
    icon: Code2,
    title: "Technik & Ästhetik",
    text: "Websites die nicht nur funktionieren — sondern begeistern. Jede Zeile Code ist durchdacht, jedes Detail bewusst gesetzt.",
  },
  {
    icon: MapPin,
    title: "Lokal & persönlich",
    text: "Kein anonymes Agenturmodell. Du sprichst direkt mit der Person, die deine Website baut — in Losenstein, Steyr oder per Video.",
  },
  {
    icon: Lightbulb,
    title: "Strategie zuerst",
    text: "Bevor wir designen, denken wir. Welches Ziel hat deine Website? Wer sieht sie? Was soll passieren? Erst dann bauen wir.",
  },
  {
    icon: Heart,
    title: "Leidenschaft für Details",
    text: "Ladezeiten, Schriftgrößen, Abstände, Farben — diese \"Kleinigkeiten\" entscheiden darüber ob Besucher bleiben oder gehen.",
  },
];

export default function AboutPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Parallax for the two tilted photos
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start end", "end start"] });
  const img1Y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      ref={ref}
      id="about"
      className="bg-background py-28 relative overflow-hidden"
    >
      
      {/* Glow top-right */}
      <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-primary/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section label ── */}
        <motion.p
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-5"
        >
          Über uns
        </motion.p>

        {/* ── Main grid: text left, photos right ── */}
        <div ref={scrollRef} className="grid lg:grid-cols-2 gap-16 items-start">

          {/* LEFT — copy */}
          <div className="space-y-8">
            <motion.h2
              variants={fadeUp(0.05)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="text-4xl sm:text-5xl font-bold text-foreground leading-[1.1]"
            >
              Wir bauen Websites,{" "}
              <br className="hidden sm:block" />
              die{" "}
              <span className="relative inline-block text-primary">
                Ergebnisse liefern.
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ delay: 0.7, duration: 0.55, ease: "easeOut" }}
                  className="absolute left-0 -bottom-1 h-[3px] w-full bg-primary/35 origin-left rounded-full"
                />
              </span>
            </motion.h2>

            <motion.div
              variants={fadeUp(0.12)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="space-y-5 text-support leading-relaxed"
            >
              <p className="text-lg text-neutral/90">
                Mitco Dean Digital Solutions ist eine Ein-Mann-Agentur aus dem Herzen Oberösterreichs —
                gegründet mit einer klaren Überzeugung:{" "}
                <span className="text-foreground font-medium">
                  Lokale Betriebe verdienen Websites auf dem Niveau großer Marken.
                </span>
              </p>
              <p>
                Viele Agenturen liefern Templates, die nach zwei Wochen fertig sind und drei Jahre lang nicht
                angefasst werden. Wir bauen anders. Jede Website ist ein maßgeschneidertes Werkzeug — 
                optimiert für Google und designed um Besucher zu Kunden zu machen.
              </p>
              <p>
                Ob du ein Gasthaus in Losenstein bist, ein Installateur in Steyr oder eine Physiotherapiepraxis
                in Ternberg — wir sprechen deine Sprache und verstehen, was lokale Kunden von einer Website erwarten.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              variants={fadeUp(0.18)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors duration-200"
              >
                Mehr über uns erfahren
                <ArrowUpRight
                  size={15}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
                />
              </Link>
            </motion.div>

            {/* ── Traits grid ── */}
            <motion.div
              variants={fadeUp(0.22)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid sm:grid-cols-2 gap-4 pt-4"
            >
              {traits.map(({ icon: Icon, title, text }) => (
                <div
                  key={title}
                  className="group p-5 rounded-2xl border border-border bg-muted/40 hover:border-primary/30 hover:bg-primary/5 transition-all duration-250 cursor-default"
                >
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-primary" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">{title}</p>
                  </div>
                  <p className="text-xs text-support leading-relaxed">{text}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — two tilted photos with parallax */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative hidden lg:block"
            style={{ height: 560 }}
          >
            {/* Glow behind photos */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 bg-primary/12 rounded-full blur-[70px]" />
            </div>

            {/* Photo 1 — larger, left, tilted -6deg */}
            <motion.div
              style={{ y: img1Y }}
              className="absolute left-0 top-10 w-[58%] z-10"
            >
              <div
                className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40"
                style={{ transform: "rotate(-6deg)", aspectRatio: "3/4" }}
              >
                <Image
                  src="/about-photo-1.jpg"
                  alt="Dean Silviu Mitco — Mitco Dean Digital Solutions"
                  fill
                  className="object-cover object-top"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent" />
                {/* Name tag */}
                <div className="absolute bottom-4 left-4 right-4 px-3 py-2.5 rounded-xl bg-[#0F172A]/80 border border-white/10 backdrop-blur-sm">
                  <p className="text-xs font-bold text-foreground">Dean-Silviu Mitco</p>
                  <p className="text-[10px] text-primary mt-0.5">Founder & Developer</p>
                </div>
              </div>
            </motion.div>

            {/* Photo 2 — smaller, right, tilted +5deg */}
            <motion.div
              style={{ y: img2Y }}
              className="absolute right-0 top-48 w-[50%] z-20"
            >
              <div
                className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40"
                style={{ transform: "rotate(5deg)", aspectRatio: "4/3" }}
              >
                <Image
                  src="/about-photo-2.jpg"
                  alt="Mitco Dean — Arbeitsplatz & Workflow"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/50 via-transparent to-transparent" />
                
              </div>
            </motion.div>

            {/* Floating stat card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-6 left-8 z-30 px-4 py-3 rounded-2xl border border-border bg-muted/90 backdrop-blur-sm shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  
                </div>
                <div>
                  <p className="text-xs font-bold text-foreground">fasdfas</p>
                  <p className="text-[10px] text-support">sagafg</p>
                </div>
              </div>
            </motion.div>

            {/* Corner decoration lines */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.2 } : {}}
              transition={{ delay: 0.8 }}
              className="absolute top-0 right-4 w-10 h-10 border-t-2 border-r-2 border-primary/60 rounded-tr-lg pointer-events-none"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 0.2 } : {}}
              transition={{ delay: 0.9 }}
              className="absolute bottom-0 left-0 w-10 h-10 border-b-2 border-l-2 border-primary/60 rounded-bl-lg pointer-events-none"
            />
          </motion.div>
        </div>

        {/* ── Bottom marquee strip ── */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mt-20 border-t border-border pt-8 overflow-hidden"
        >
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {[
              "Websites", "SEO", "Google Ads", "Branding", "E-Shops",
              "Mobile Apps", "Terminbuchung", "Google Business", "Wartung",
              "Websites", "SEO", "Google Ads", "Branding", "E-Shops",
              "Mobile Apps", "Terminbuchung", "Google Business", "Wartung",
            ].map((item, i) => (
              <span key={i} className="text-sm font-medium text-support/40 uppercase tracking-widest shrink-0">
                {item}
                <span className="ml-12 text-primary/30">·</span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Marquee keyframe — add to your global CSS or tailwind config */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </section>
  );
}
