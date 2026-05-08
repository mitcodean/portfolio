"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  Check,
  ShoppingCart,
  Calendar,
  Languages,
  Search,
  MapPin,
  Zap,
  Shield,
  Users,
  Clock,
} from "lucide-react";
import Link from "next/link";

// ── Pricing cards ──────────────────────────────────────────────────────────
const plans = [
  {
    name: "Starter",
    price: "990 €",
    tagline: "Für kleine Betriebe ohne Website.",
    featured: false,
    includes: [
      "Bis 3 Seiten",
      "Mobil optimiert",
      "Kontaktformular",
      "Google Maps",
      "Impressum + DSGVO",
      "Basis SEO",
    ]
  },
  {
    name: "Business",
    price: "1690 €",
    tagline: "Für Firmen die professioneller wirken wollen.",
    featured: true,
    includes: [
      "Bis 8 Seiten",
      "SEO Setup",
      "Bildoptimierung",
      "Google Analytics",
      "Schnelle Ladezeit",
      "Google Business Setup",
    ]
  },
  {
    name: "Premium",
    price: "2890 €",
    tagline: "Für größere lokale Firmen.",
    featured: false,
    includes: [
      "10+ Seiten",
      "SEO Optimierung",
      "Blog / News",
      "Terminbuchung",
      "Performance Optimierung",
      "Google Business Setup",
    ]
  },
];

const addons = [
  { icon: ShoppingCart, label: "E-Shop", sub: "Ab 1.200 €", href: "/services/eshop", featured: true },
  { icon: Calendar,     label: "Terminbuchung", sub: "Ab 290 €", href: null, featured: false },
  { icon: Languages,    label: "Mehrsprachig", sub: "Ab 190 €", href: null, featured: false },
  { icon: Search,       label: "SEO Paket", sub: "Ab 290 €", href: null, featured: false },
  { icon: MapPin,       label: "Google Business", sub: "Ab 149 €", href: null, featured: false },
];

const maintenance = [
  {
    name: "Basic",
    price: "29 €",
    per: "/Monat",
    includes: ["Updates", "Backup", "Sicherheit"],
  },
  {
    name: "Business",
    price: "49 €",
    per: "/Monat",
    includes: ["Updates", "Backup", "Security", "Kleine Änderungen"],
  },
  {
    name: "Premium",
    price: "99 €",
    per: "/Monat",
    includes: ["SEO", "Google Profil", "Kleine Änderungen", "Website Optimierung"],
  },
];

const whyMe = [
  { icon: MapPin, label: "Fokus auf lokale Betriebe" },
  { icon: Users,  label: "Persönlicher Ansprechpartner" },
  { icon: Shield, label: "DSGVO konform" },
  { icon: Zap,    label: "Schnelle Ladezeiten" },
  { icon: Search, label: "SEO optimiert" },
  { icon: Clock,  label: "Kurze Lieferzeiten" },
];

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay } },
});

export default function ServicesPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="services" className="bg-background py-24 relative overflow-hidden">

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">

        {/* ── 1. Hero statement ─────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
            Leistungen
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight max-w-2xl mb-4">
            Moderne Websites für Betriebe{" "}
            <span className="text-primary">in Österreich.</span>
          </h2>
          <p className="text-support text-lg max-w-xl leading-relaxed">
            Ich unterstütze lokale Unternehmen in{" "}
            <span className="text-neutral">Losenstein, Ternberg, Laussa und Steyr</span>{" "}
            beim Aufbau einer professionellen Online-Präsenz — persönlich, schnell und ohne Agentur-Aufwand.
          </p>
        </motion.div>

        {/* ── 2. Why me ─────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp(0.05)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">
            Warum Mitco Dean
          </p>
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Websites + Marketing + Software — alles aus einer Hand.
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {whyMe.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex flex-col items-start gap-2.5 p-4 rounded-xl border border-border bg-muted hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 cursor-default"
              >
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon size={14} className="text-primary" />
                </div>
                <p className="text-xs font-medium text-foreground leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 3. Pricing ── */}
        <div>
          <motion.div 
          variants={fadeUp(0.1)} 
          initial="hidden" 
          animate={inView ? "visible" : "hidden"} 
          className="mb-10">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-2">
              Website Pakete
              </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Klare Preise — keine versteckten Kosten.
            </h3>
          </motion.div>

          {/* 3-col grid — side cards smaller, center card taller */}
          <div className="grid md:grid-cols-[1fr_1.18fr_1fr] gap-4 items-center">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                variants={fadeUp(0.15 + i * 0.08)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                whileHover={
                  plan.featured
                    ? { y: -10, rotateX: 3, rotateY: -3, scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }
                    : { y: -6, rotateX: 2, rotateY: plan.name === "Starter" ? 4 : -4, scale: 1.01, transition: { type: "spring", stiffness: 300, damping: 20 } }
                }
                style={{ transformStyle: "preserve-3d", perspective: 800 }}
                className={`relative flex flex-col rounded-2xl border transition-all duration-300 cursor-default
                  ${plan.featured
                    ? "border-primary bg-primary/5 shadow-2xl shadow-primary/20 py-10 px-7 ring-1 ring-primary/30"
                    : "border-border bg-muted py-7 px-6 shadow-lg shadow-black/20"
                  }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[11px] font-bold uppercase tracking-widest bg-primary text-foreground px-4 py-1 rounded-full whitespace-nowrap shadow-lg shadow-primary/30">
                    Beliebt
                  </span>
                )}

                {/* Glow behind featured card */}
                {plan.featured && (
                  <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-xl -z-10 scale-110 pointer-events-none" />
                )}

                <div className="mb-5">
                  <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${plan.featured ? "text-primary" : "text-support"}`}>
                    {plan.name}
                  </p>
                  <p className={`font-bold text-foreground ${plan.featured ? "text-4xl" : "text-3xl"}`}>
                    {plan.price}
                  </p>
                  <p className="text-sm text-support mt-1.5 leading-snug">{plan.tagline}</p>
                </div>

                <div className="h-px bg-border mb-5" />

                <ul className="space-y-2.5 flex-1">
                  {plan.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-neutral">
                      <Check size={13} className="mt-0.5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>

                {plan.featured && (
                  <Link
                    href="#contact"
                    className="mt-7 flex items-center justify-center gap-2 py-3 rounded-full bg-primary text-foreground text-sm font-semibold hover:bg-accent transition-colors duration-200"
                  >
                    Jetzt anfragen
                    <ArrowUpRight size={14} />
                  </Link>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 4. Add-ons ── */}
        <motion.div 
        variants={fadeUp(0.2)} 
        initial="hidden" 
        animate={inView ? "visible" : "hidden"}>
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-2">
            Erweiterungen
            </p>
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Noch mehr aus deiner Website holen.
            </h3>

          {/* E-Shop hero card */}
          <Link href="/services/eshop" className="group block mb-4">
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 rounded-2xl border border-primary/40 bg-primary/5 hover:border-primary hover:bg-primary/10 transition-all duration-200 overflow-hidden">
              {/* Background glow */}
              <div className="absolute right-0 top-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
                <ShoppingCart size={22} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-base font-bold text-foreground">E-Shop</p>
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                    Add-on
                  </span>
                </div>
                <p className="text-sm text-support">
                  Vollständiger Online-Shop mit Zahlungsabwicklung, Produktverwaltung & mehr. Ab 1.200 €.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all duration-200">
                Mehr erfahren
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </div>
            </div>
          </Link>

          {/* Other add-ons — responsive grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {addons.filter(a => !a.featured).map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-muted hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-default"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{label}</p>
                  <p className="text-[11px] text-support">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── 5. Maintenance ── */}
        <motion.div 
        variants={fadeUp(0.25)} 
        initial="hidden" 
        animate={inView ? "visible" : "hidden"}>
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-2">
            Website Wartung
            </p>
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Deine Website in sicheren Händen.
            </h3>
          <p className="text-support text-sm mb-8 max-w-lg">
            Updates, Backups und Sicherheit — damit du dich auf dein Geschäft konzentrieren kannst.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
            {maintenance.map((m, i) => (
              <motion.div
                key={m.name}
                whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                className="flex flex-col rounded-2xl border border-border bg-muted p-5 cursor-default hover:border-primary/30 transition-colors duration-200"
              >
                <p className="text-xs text-support uppercase tracking-widest mb-1">{m.name}</p>
                <p className="text-2xl font-bold text-foreground">
                  {m.price}
                  <span className="text-sm font-normal text-support">{m.per}</span>
                </p>
                <div className="h-px bg-border my-3" />
                <ul className="space-y-2 flex-1">
                  {m.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-neutral">
                      <Check size={12} className="shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── 6. CTA ────────────────────────────────────────────────────── */}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <p className="text-support text-sm mb-4">
            Nicht sicher welches Paket passt? Einfach melden — kostenlos und unverbindlich.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-foreground text-sm font-semibold hover:bg-accent transition-colors duration-200 group"
          >
            Kostenlose Website Analyse
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
