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

const MISSION_WORDS = ["modern.", "schnell.", "messbar.", "lokal.", "persönlich."];

const VALUES = [
  {
    number: "01",
    title: "Design ist keine Dekoration",
    body: "Gutes Design löst Probleme. Jede Entscheidung — Farbe, Abstand, Schrift — dient einem Zweck. Wir gestalten nicht um schön zu sein, sondern um zu wirken.",
  },
  {
    number: "02",
    title: "Code der nicht rostet",
    body: "Wir bauen auf modernen Technologien (Next.js, Tailwind, TypeScript) — nicht auf veralteten WordPress-Templates die in zwei Jahren kaputt sind.",
  },
  {
    number: "03",
    title: "Ehrlichkeit über Buzzwords",
    body: "“SEO-optimiert”, “Performance-fokussiert” — das bedeutet uns etwas Konkretes. Wir erklären was wir tun und warum, keine leeren Versprechen.",
  },
  {
    number: "04",
    title: "Lokal ist unser Vorteil",
    body: "Kein Ticket-System, kein anonymes Team. Du rufst an, wir heben ab. Persönliche Beziehungen bauen wir genauso auf wie Websites — mit Sorgfalt.",
  },
];

const TECH_STACK = [
  "Next.js", "React", "TypeScript", "Tailwind CSS", "C#", ".NET",
  "Framer Motion", "Node.js", "SQL Server", "Figma", "Google Analytics",
];

const HOBBIES = [
  {
    icon: Bike,
    label: "Motorrad",
    text: "Meine Leidenschaft neben dem Programmieren. Auf dem Motorrad bin ich in meinem Element — Freiheit, Fokus, Adrenalin. Es ist kein Hobby, es ist ein Lebensgefühl.",
  },
  {
    icon: Dumbbell,
    label: "Fitness & Sport",
    text: "Regelmäßiges Training im Fitnessstudio ist für mich kein Muss, sondern ein Ausgleich. Disziplin im Sport überträgt sich direkt auf die Arbeit.",
  },
  {
    icon: Music,
    label: "Eigene Musik",
    text: "Ich produziere meine eigene Musik — vom ersten Beat bis zum finalen Mix. Kreativität ist keine Einbahnstraße, sie fließt zwischen Code und Klang.",
  },
  {
    icon: BookOpen,
    label: "Philosophie",
    text: "Warum existieren Dinge so wie sie sind? Stoizismus, Existenzialismus, Erkenntnistheorie — das Denken über das Denken gibt meiner Arbeit einen tieferen Rahmen.",
  },
];


const TIMELINE = [
  {
    year: "2025 – Heute",
    title: "Mitco Dean Digital Solutions",
    sub: "Gründer & Entwickler",
    desc: "Aufbau einer lokalen Digitalagentur mit Fokus auf Websites, SEO und digitale Lösungen für Betriebe in Oberösterreich.",
    active: true,
  },
  {
    year: "2025 – Heute",
    title: "Software Developer",
    sub: "Festanstellung",
    desc: "Entwicklung von Lagerlogistiksystemen und Automatisierung von Mühlen — komplexe Systeme, klare Lösungen.",
    active: true,
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
  {
    year: "2020 – 2025",
    title: "HTL Steyr",
    sub: "Abschluss Informationstechnologie",
    desc: "Spezialisierung auf Netzwerktechnik und Softwareentwicklung. Fundament für alles was danach kam.",
    active: false,
  },
];

function CyclingWord() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % MISSION_WORDS.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-block overflow-hidden" style={{ minWidth: 180 }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0,  opacity: 1 }}
          exit={{   y: -40, opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="text-primary block"
        >
          {MISSION_WORDS[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

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
  const valuesRef = useRef(null);
  const personRef = useRef(null);
  const techRef = useRef(null);
  const hobbiesRef = useRef(null);
  const timelineRef = useRef(null);

  const heroInView    = useInView(heroRef,    { once: true, margin: "-60px" });
  const valuesInView  = useInView(valuesRef,  { once: true, margin: "-60px" });
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
      <section ref={heroRef} className="relative min-h-[92vh] flex flex-col justify-end pb-20 pt-40 overflow-hidden">
        {/* Grid bg */}
        <div/>
        {/* Glow blobs */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          {/* Label */}
          <motion.p variants={fadeUp(0)} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-8">
            Mitco Dean Digital Solutions — Über uns
          </motion.p>

          {/* Giant headline with cycling word */}
          <motion.h1 variants={fadeUp(0.08)} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            className="text-[clamp(3rem,8vw,7.5rem)] font-black tracking-tight leading-[0.92] text-foreground mb-8 max-w-5xl">
            Wir machen das Web<br />
            für lokale Betriebe<br />
            <CyclingWord />
          </motion.h1>

          {/* Sub + CTA row */}
          <motion.div variants={fadeUp(0.18)} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 max-w-5xl">
            <p className="text-support text-lg max-w-md leading-relaxed">
              Eine Agentur aus Oberösterreich mit dem Anspruch, dass jeder lokale Betrieb 
              eine Website verdient, die genauso gut ist wie die der großen Marken.
            </p>
            <MagneticCTA href="#contact">Projekt starten</MagneticCTA>
          </motion.div>

          {/* Horizontal rule with year */}
          <motion.div variants={fadeUp(0.24)} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            className="flex items-center gap-6 mt-16 pt-8 border-t border-white/8">
            <span className="text-xs text-support/40 uppercase tracking-[0.2em]">Est. 2024</span>
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-xs text-support/40 uppercase tracking-[0.2em]">Losenstein, Österreich</span>
          </motion.div>
        </div>
      </section>

      {/* Values: numbered editorial list*/}
      <section ref={valuesRef} className="py-28 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[340px_1fr] gap-20 items-start">
            {/* Sticky label */}
            <motion.div variants={fadeUp(0)} initial="hidden" animate={valuesInView ? "visible" : "hidden"}
              className="lg:sticky lg:top-32">
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-4">Unsere Werte</p>
              <h2 className="text-3xl font-bold text-foreground leading-tight">
                Warum wir<br />
                <span className="text-primary">anders denken.</span>
              </h2>
              <p className="text-support text-sm mt-4 leading-relaxed">
                Nicht jede Agentur ist gleich. Diese vier Prinzipien leiten jede Entscheidung die wir treffen.
              </p>
            </motion.div>

            {/* Values list */}
            <div className="space-y-0 divide-y divide-border">
              {VALUES.map((v, i) => (
                <motion.div
                  key={v.number}
                  variants={fadeUp(0.08 + i * 0.07)}
                  initial="hidden"
                  animate={valuesInView ? "visible" : "hidden"}
                  className="group grid grid-cols-[56px_1fr] gap-6 py-8 hover:bg-primary/3 transition-colors duration-300 rounded-xl px-4 -mx-4 cursor-default"
                >
                  <span className="text-3xl font-black text-primary/20 group-hover:text-primary/40 transition-colors duration-300 leading-none pt-1">
                    {v.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{v.title}</h3>
                    <p className="text-support text-sm leading-relaxed">{v.body}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo strip — full bleed */}
      <section ref={photoSection} className="relative py-20 overflow-hidden bg-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6 items-center justify-center flex-col sm:flex-row">
            {/* Photo 1 */}
            <motion.div style={{ y: img1Y }} className="relative w-full sm:w-80 shrink-0">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50"
                style={{ transform: "rotate(-4deg)", aspectRatio: "3/4" }}>
                <Image src="/about-photo-1.jpg" alt="Dean Silviu Mitco" fill className="object-cover object-top" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 px-3 py-2 rounded-xl bg-[#0F172A]/80 border border-white/10 backdrop-blur-sm">
                  <p className="text-xs font-bold text-foreground">Dean-Silviu Mitco</p>
                  <p className="text-[10px] text-primary">Founder & Developer</p>
                </div>
              </div>
            </motion.div>

            {/* Center quote */}
            <div className="text-center max-w-xs px-4 shrink-0 py-8">
              <span className="text-7xl text-primary/20 font-black leading-none">"</span>
              <p className="text-foreground font-semibold text-lg leading-snug -mt-4">
                Ich baue keine Websites. Ich baue Werkzeuge die Betriebe wachsen lassen.
              </p>
              <p className="text-support text-sm mt-3">— Dean-Silviu Mitco</p>
            </div>

            {/* Photo 2 */}
            <motion.div style={{ y: img2Y }} className="relative w-full sm:w-72 shrink-0">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50"
                style={{ transform: "rotate(4deg)", aspectRatio: "4/5" }}>
                <Image src="/about-photo-2.jpg" alt="Workspace" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent" />
                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-[#0F172A]/80 border border-primary/30 backdrop-blur-sm">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
                  </span>
                  <span className="text-[10px] font-medium text-primary">Available</span>
                </div>
              </div>
            </motion.div>
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
              Der Mensch dahinter
            </span>
            <div className="h-px flex-1 bg-border" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left — big number + name */}
            <div>
              <motion.div variants={fadeUp(0.05)} initial="hidden" animate={personInView ? "visible" : "hidden"}>
                <p className="text-[clamp(5rem,14vw,11rem)] font-black text-white/[0.03] leading-none select-none -ml-2 mb-2">
                  Dean
                </p>
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight -mt-8 relative z-10">
                  Dean-Silviu<br />
                  <span className="text-primary">Mitco.</span>
                </h2>
              </motion.div>

              <motion.div variants={fadeUp(0.12)} initial="hidden" animate={personInView ? "visible" : "hidden"}
                className="mt-6 space-y-4 text-support leading-relaxed">
                <p className="text-lg text-neutral/90">
                  Ich bin kein klassischer Agentur-Typ der in Meetings sitzt und Buzzwords produziert.
                  Ich bin ein Builder — jemand der Ideen in funktionierende Produkte verwandelt,
                  am liebsten mit Kaffee und einem guten Playlist.
                </p>
                <p>
                  Aufgewachsen in Oberösterreich, entwickle ich seit meiner Jugend leidenschaftlich Software.
                  Was als Neugier begann — „wie funktioniert das eigentlich?“ — ist heute mein Beruf und
                  meine tägliche Motivation. Die Technologien ändern sich, die Faszination bleibt.
                </p>
                <p>
                  Mein Ansatz ist pragmatisch: Ich löse echte Probleme mit eleganten Lösungen,
                  ohne unnötige Komplexität. Wenn etwas einfacher geht, geht es einfacher.
                  Und wenn etwas komplex sein muss, dann soll es wenigstens schön komplex sein.
                </p>
              </motion.div>

              {/* Personality tags */}
              <motion.div variants={fadeUp(0.18)} initial="hidden" animate={personInView ? "visible" : "hidden"}
                className="flex flex-wrap gap-2 mt-6">
                {["Builder-Mindset", "Detail-obsessed", "Pragmatisch", "Neugierig", "Lokal verwurzelt"].map(tag => (
                  <span key={tag}
                    className="text-xs px-3 py-1.5 rounded-full border border-border bg-muted text-support hover:border-primary/40 hover:text-foreground transition-all duration-200 cursor-default">
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — developer mindset cards */}
            <motion.div variants={fadeUp(0.15)} initial="hidden" animate={personInView ? "visible" : "hidden"}
              className="space-y-4">
              {[
                {
                  icon: Terminal,
                  title: "Praktisch orientiert",
                  text: "Ich lerne am besten durch Bauen. Jedes Projekt ist ein Experiment — was funktioniert bleibt, was nicht fliegt raus. Keine Theorie ohne Praxis.",
                },
                {
                  icon: Layers,
                  title: "Full-Stack Denker",
                  text: "Von der Datenbank bis zum Pixel — ich verstehe beide Welten. Das macht den Unterschied wenn Design auf Technik trifft und beide sprechen müssen.",
                },
                {
                  icon: Sparkles,
                  title: "Ästhetik trifft Funktion",
                  text: "Schöne Websites die langsam laden sind nutzlos. Schnelle Websites die hässlich sind auch. Ich arbeite an der Grenze zwischen beiden.",
                },
                {
                  icon: Globe,
                  title: "Immer am Lernen",
                  text: "Webentwicklung ändert sich schnell — zu schnell um stehenzubleiben. Neue Tools, neue Frameworks, neue Möglichkeiten: das macht diesen Job aufregend.",
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
              Immer aktuell gehalten
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
                HTL-Absolvent, Software Developer, Gründer — jeder Schritt war ein Baustein.
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
              Ein Mensch, nicht nur ein Entwickler.
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
              Bereit loszulegen?
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground mb-6 leading-tight">
              Lass uns dein Projekt<br />
              <span className="text-primary">zum Leben erwecken.</span>
            </h2>
            <p className="text-support text-lg max-w-md mx-auto mb-10 leading-relaxed">
              Kostenlose Erstberatung, kein Kleingedrucktes. Erzähl mir von deiner Idee — ich höre zu.
            </p>
            <MagneticCTA href="#contact">Kostenlose Beratung</MagneticCTA>
          </motion.div>
        </div>
      </section>

    </main>
  );
}