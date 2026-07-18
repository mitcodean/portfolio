"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
  {
    icon: Bike,
    label: "Motorrad",
    text: "Meine Leidenschaft neben dem Programmieren. Freiheit, Fokus und Adrenalin. Es ist kein Hobby, es ist ein Lebensgefühl.",
  },
  {
    icon: Dumbbell,
    label: "Fitness & Sport",
    text: "Regelmäßiges Training im Fitnessstudio ist für mich ein Ausgleich. Das körperliche Training hilft mir mal von meinen Gedanken abzuschalten und den Kopf frei zu bekommen.",
  },
  {
    icon: Music,
    label: "Eigene Musik",
    text: "Ich produziere meine eigene Musik. Das heißt vom ersten Beat bis zum finalen Mix. Es hilft mir Kreativität zu bewahren.",
  },
  {
    icon: BookOpen,
    label: "Philosophie",
    text: "Warum existieren Dinge so wie sie sind? Stoizismus, Existenzialismus und Erkenntnistheorie. Das Denken über das Denken gibt mir einen tieferen Rahmen.",
  },
];


const TIMELINE = [
  {
    year: "2025 – Heute",
    title: "Mitco Dean Digital Solutions",
    sub: "Gründer & Entwickler",
    desc: "Aufbau einer IT/Software Firma mit fokus auf Prozessoptimierung und Webentwicklung.",
    active: true,
  },
  {
    year: "2025 – Heute",
    title: "Software Developer",
    sub: "Festanstellung",
    desc: "Entwicklung von Lagerlogistiksystemen und Automatisierung von Mühlen.",
    active: true,
  },
  {
    year: "2020 – 2025",
    title: "HTL Steyr",
    sub: "Abschluss Informationstechnologie",
    desc: "Spezialisierung auf Netzwerktechnik und Softwareentwicklung. Gutes Fundament für das Arbeitsleben.",
    active: false,
  },
  {
    year: "2023",
    title: "Praktikum bei ISW GmbH",
    sub: "Internship",
    desc: "MAUI-App zur Auswertung von Reisezeiten, Integration von Odoo-Zeitstempeln via API.",
    active: false,
  },
  {
    year: "2023",
    title: "Praktikum bei ENGEL AUSTRIA GmbH",
    sub: "Internship",
    desc: "Robotertechnik und Toolsprogrammierung in einem internationalen Industrieumfeld.",
    active: false,
  },
  
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
            Über uns
          </motion.p>

          {/* Giant headline */}
          <motion.h1 variants={fadeUp(0.08)} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            className="text-[clamp(3rem,8vw,7.5rem)] font-black tracking-tight leading-[0.92] text-foreground mb-8 max-w-5xl">
            Nicht in den Sternen liegt unser Schicksal, sondern in uns selbst.<br />
          </motion.h1>

          {/* Sub + CTA row */}
          <motion.div variants={fadeUp(0.18)} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 max-w-5xl">
            <p className="text-support text-lg max-w-md leading-relaxed">
              &quot;William Shakespeare&quot; <br/><br/>
              <br/>
              Wir müssen unsere träume verwirklichen, obwohl Hindernisse und Herausforderungen auf dem Weg liegen.
            </p>
            <MagneticCTA href="/contact">Projekt starten</MagneticCTA>
          </motion.div>
        </div>
      </section>

      {/* Photo strip — full bleed */}
      <section ref={photoSection} className="relative py-20 overflow-hidden bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 items-center justify-center flex-col sm:flex-row">
            

            

            
          </div>
        </div>
      </section>

      {/*Person intro */}
      <section ref={personRef} className="py-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Big divider label */}
          <motion.div variants={fadeUp(0)} initial="hidden" animate={personInView ? "visible" : "hidden"}
            className="flex items-center gap-6 mb-20">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold text-primary uppercase tracking-[0.25em] shrink-0">
              Wer bin ich?
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
                  Ich will neues lernen, bauen und erkunden, das zeichnet mich aus. 
                  Komplexe Probleme zu lösen und diese zu vereinfachen war schon immer meine Leidenschaft. 
                  Etwas effizient zu gestalten und zu optimieren ist für mich ein muss, sonst fühle ich mich unwohl. 
                  Ich bin ein Mensch der gerne die Dinge hinterfragt.
                </p>
                <p>
                  Aufgewachsen in Oberösterreich, hatte ich als kleiner Junge einen Kontaktpunkt zum Programmieren durch meinen Bruder.
                  Was als Neugier begann ist heute mein Beruf und meine tägliche Motivation.
                </p>
                <p>
                  Mein Ansatz ist pragmatisch: keine unnötige Komplexität. Wenn etwas einfacher geht, geht es einfacher.
                  Und wenn etwas komplex sein muss, dann soll es wenigstens schön komplex sein.
                </p>
              </motion.div>
            </div>

            {/* Right — developer mindset cards */}
            <motion.div variants={fadeUp(0.15)} initial="hidden" animate={personInView ? "visible" : "hidden"}
              className="space-y-4">
              {[
                {
                  icon: Terminal,
                  title: "Praktisch orientiert",
                  text: "Ich lerne am besten durch Bauen. Probieren geht über Studieren.",
                },
                {
                  icon: Layers,
                  title: "Architekt",
                  text: "Architektur ist wichtig, deswegen muss man entscheidungen vor dem implementieren richtig treffen.",
                },
                {
                  icon: Sparkles,
                  title: "Ästhetik trifft Funktion",
                  text: "Funktionalität und Ästhetik sind keine Gegensätze. Ich strebe nach beidem, nicht nur nach einem.",
                },
                {
                  icon: Globe,
                  title: "Immer am Lernen",
                  text: "Neue Tools, neue Frameworks, neue Möglichkeiten.",
                },
              ].map(({ icon: Icon, title, text }, i) => (
                <motion.div
                  key={title}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group flex gap-4 p-5 rounded-xl border border-border bg-muted/30 hover:border-primary/30 hover:bg-primary/4 transition-colors duration-200 cursor-default"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground mb-1">{title}</p>
                    <p className="text-xs text-support leading-relaxed">{text}</p>
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
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-1">Tech Stack</p>
              <h3 className="text-2xl font-bold text-foreground">Die Werkzeuge die ich täglich nutze.</h3>
            </div>
            <div className="flex items-center gap-2 text-xs text-support">
              <Code2 size={13} className="text-primary" />
              Guter Überblick über meine Technologien
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
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-4">Werdegang</p>
              <h2 className="text-3xl font-bold text-foreground leading-tight">
                Der Weg<br />
                <span className="text-primary">bis hierher.</span>
              </h2>
              <p className="text-support text-sm mt-4 leading-relaxed">
                HTL-Absolvent, Software Developer
              </p>
              {/* Award icon accent */}
              <div className="mt-8 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Award size={20} className="text-primary" />
              </div>
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
                          {item.year}
                        </div>
                        {item.active && (
                          <span className="text-[10px] font-bold uppercase tracking-widest bg-primary text-foreground px-2 py-0.5 rounded-full">
                            Aktuell
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                      <p className="text-xs font-medium text-support mb-2">{item.sub}</p>
                      <p className="text-sm text-support/80 leading-relaxed">{item.desc}</p>
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
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">Wenn ich nicht code</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Hobbys
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOBBIES.map(({ icon: Icon, label, text }, i) => (
              <motion.div
                key={label}
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
                  <h3 className="text-base font-bold text-foreground mb-2">{label}</h3>
                  <p className="text-sm text-support leading-relaxed">{text}</p>
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
              Lass uns tratschen
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-6 leading-tight">
             Hat meine Person <br />
              <span className="text-primary">deine Interesse geweckt?</span>
            </h2>
            <MagneticCTA href="/contact">Ich rede gerne, auch wenn es nicht um Projekte geht</MagneticCTA>
          </motion.div>
        </div>
      </section>

    </main>
  );
}