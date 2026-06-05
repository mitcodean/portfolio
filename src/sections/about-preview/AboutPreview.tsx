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
    text: "",
  },
  {
    icon: Lightbulb,
    title: "Strategie zuerst",
    text: "Bevor wir designen, denken wir. Welches Ziel steht im Fokus? Wer ist betroffen? Was soll passieren? Erst dann bauen wir.",
  },
  {
    icon: Heart,
    title: "Leidenschaft für Details",
    text: "Ladezeiten, Schriftgrößen, Abstände, Farben sind ",
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
      
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section label */}
        <motion.p
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-4xl sm:text-5xl font-bold text-secondary uppercase tracking-[0.2em] mb-3"
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
              className="text-2xl sm:text-4xl font-bold text-foreground leading-[1.1]"
            >
              Wir bauen,{" "}
              <br className="hidden sm:block" />
              sie{" "}
              <span className="relative inline-block text-primary">
                profitieren.
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
                Diovis ist eine Ein-Mann-Agentur
                gegründet mit einer klaren Überzeugung:{" "}
                <span className="text-foreground font-medium">
                  jedes Unternehmen hat das Recht auf eine Individuelle Software-Lösung.
                </span> 
              </p>
              <p>
                Wir bauen ein Werkzeug
              </p>
              <p>
                Trau dich neues auszuprobieren, denn genau darin liegt der Erfolg.<br className="hidden sm:block" />
                <span className="text-foreground font-medium"> „Man kann keine neuen Ozeane entdecken, wenn man nicht den Mut hat, die Küste aus den Augen zu verlieren.“ </span> - André Gide
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

            {/* Traits grid */}
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

          {}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative hidden lg:block"
            style={{ height: 560 }}
          >

          </motion.div>
        </div>
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
