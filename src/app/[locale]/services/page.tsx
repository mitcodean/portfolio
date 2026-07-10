"use client";

import { useRef, useState } from "react";
import { useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight, Check, X, ShoppingCart, Globe, Search,
  Zap, Shield, BarChart2, Calendar, Languages, MapPin,
  ChevronDown, Star, Package, Cpu, CreditCard, Truck,
  LayoutDashboard, Headphones, RefreshCw,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";


const fadeUp = (delay = 0): Variants => ({
  hidden: {
    opacity: 0,
    y: 32,
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

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "490",
    tagline: "Der erste Schritt online.",
    description: "Perfekt für Betriebe die noch keine Website haben und schnell, sauber und günstig online gehen wollen.",
    color: "border-border",
    featured: false,
    includes: [
      "Bis 3 Seiten",
      "Mobil optimiert (Responsive)",
      "Kontaktformular",
      "Google Maps Integration",
      "Impressum & DSGVO-Seite",
      "Basis On-Page SEO",
      "Ladezeit-Optimierung",
    ],
    notIncluded: ["Blog / News", "Terminbuchung", "Google Analytics", "E-Shop"],
    delivery: "1–2 Wochen",
  },
  {
    id: "business",
    name: "Business",
    price: "990",
    tagline: "Professionell & gefunden werden.",
    description: "Für Unternehmen die mehr wollen als nur online zu sein — sichtbar sein, Vertrauen aufbauen und Kunden gewinnen.",
    color: "border-primary",
    featured: true,
    includes: [
      "Bis 8 Seiten",
      "Vollständiges SEO Setup",
      "Google Analytics Einrichtung",
      "Google Business Profil Setup",
      "Bildoptimierung & Performance",
      "Kontaktformular + Karte",
      "Schnelle Ladezeiten (Core Web Vitals)",
      "Social Media Links",
    ],
    notIncluded: ["Terminbuchung", "Blog", "E-Shop"],
    delivery: "2–3 Wochen",
  },
  {
    id: "premium",
    name: "Premium",
    price: "1.990",
    tagline: "Die komplette digitale Präsenz.",
    description: "Für größere lokale Betriebe die eine vollständige, SEO-optimierte Plattform mit Blog, Terminbuchung und allem Drum und Dran brauchen.",
    color: "border-border",
    featured: false,
    includes: [
      "10+ Seiten",
      "Tiefes SEO & Content-Strategie",
      "Blog / News System",
      "Terminbuchungssystem",
      "Google Business Optimierung",
      "Performance Monitoring Setup",
      "Bildgalerie & Slider",
      "Mehrsprachigkeit (auf Anfrage)",
      "Prioritäts-Support",
    ],
    notIncluded: ["E-Shop"],
    delivery: "3–5 Wochen",
  },
];

const MAINTENANCE = [
  {
    name: "Basic",
    price: "29",
    per: "/Mo",
    includes: ["Updates & Patches", "Tägliche Backups", "Sicherheitsmonitoring"],
    best: false,
  },
  {
    name: "Business",
    price: "49",
    per: "/Mo",
    includes: ["Alles aus Basic", "Kleine Textänderungen", "Uptime-Monitoring", "Monatlicher Report"],
    best: true,
  },
  {
    name: "Marketing",
    price: "99",
    per: "/Mo",
    includes: ["Alles aus Business", "SEO-Monitoring", "Google Profil Updates", "Website-Optimierung"],
    best: false,
  },
];

const ADDONS = [
  { icon: Calendar,   label: "Terminbuchung",    price: "ab 290 €",  desc: "Online-Buchungssystem direkt auf deiner Website integriert." },
  { icon: Languages,  label: "Mehrsprachig",      price: "ab 190 €",  desc: "Zweite (oder dritte) Sprache für internationale Kunden." },
  { icon: Search,     label: "SEO Paket",         price: "ab 290 €",  desc: "Keyword-Recherche, On-Page SEO, Google Search Console Setup." },
  { icon: MapPin,     label: "Google Business",   price: "ab 149 €",  desc: "Einrichtung und Optimierung deines Google Business Profils." },
  { icon: BarChart2,  label: "Analytics Setup",   price: "ab 99 €",   desc: "GA4 + Search Console vollständig eingerichtet und erklärt." },
  { icon: Shield,     label: "DSGVO Paket",       price: "ab 149 €",  desc: "Cookie-Banner, Datenschutz-Check und rechtssichere Texte." },
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

const ESHOP_TIERS = [
  {
    label: "Mini Shop",
    price: "1.200",
    desc: "Bis 50 Produkte, einfache Kategorien, Stripe-Zahlungen.",
    for: "Kleinbetriebe, Handgemachtes, Lokale Angebote",
  },
  {
    label: "Standard Shop",
    price: "2.000",
    desc: "Bis 500 Produkte, Varianten, Rabattcodes, Analytics.",
    for: "KMUs, Regionale Marken, Dienstleister",
  },
  {
    label: "Großer Shop",
    price: "3.500",
    desc: "Unbegrenzt Produkte, Multi-Currency, API-Anbindung, Custom Dashboard.",
    for: "Wachsende Unternehmen, B2B-Shops",
  },
];

const ESHOP_FEATURES = [
  { icon: CreditCard,     label: "Sichere Zahlung",        desc: "Stripe, PayPal, Sofortüberweisung — was deine Kunden wollen." },
  { icon: Package,        label: "Produktverwaltung",      desc: "Intuitives Backend — Produkte hinzufügen, bearbeiten, aktivieren." },
  { icon: Search,         label: "Shop-SEO",               desc: "Jede Produktseite ist SEO-optimiert damit Google dich findet." },
  { icon: Cpu,            label: "Performance",            desc: "Schnelle Ladezeiten auch mit 500+ Produkten. Kein Kompromiss." },
  { icon: Headphones,     label: "Support & Einweisung",   desc: "Wir erklären dir alles bis du dich sicher fühlst." },
  { icon: RefreshCw,      label: "Wartung & Updates",      desc: "Optional: monatliche Pflege damit der Shop läuft." },
];

// ─── FAQ accordion ───────────────────────────────────────────────────────────
const FAQS = [
  { q: "Muss ich Content (Texte/Bilder) selbst liefern?", a: "Wir unterstützen dich dabei. Texte entwickeln wir gemeinsam, Bilder kannst du liefern oder wir verwenden lizenzfreie Fotos. Premium-Fotografie auf Anfrage." },
  { q: "Was passiert nach dem Launch?", a: "Du entscheidest. Entweder du übernimmst alles selbst, oder wir kümmern uns weiter mit einem Wartungspaket. Kein Zwang." },
  { q: "Kann ich die Website später erweitern?", a: "Ja — alle unsere Websites sind modular gebaut. Add-ons wie Terminbuchung oder Blog können jederzeit nachgerüstet werden." },
  { q: "Wie läuft die Bezahlung ab?", a: "50% bei Projektstart, 50% bei Abnahme. Für größere Projekte auch 3-Phasen Zahlungen möglich." },
  { q: "Was kostet Hosting und Domain?", a: "Hosting: ca. 10–15 €/Monat (je nach Anbieter). Domain: ca. 10–20 €/Jahr. Wir helfen dir bei der Auswahl." },
];

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border-b border-border group cursor-pointer"
      onClick={() => setOpen(!open)}
    >
      <div className="flex items-center justify-between py-5 gap-4">
        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200">{q}</p>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={16} className="text-support shrink-0" />
        </motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-sm text-support pb-5 leading-relaxed overflow-hidden"
          >
            {a}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ServicesPage() {
  const heroRef     = useRef(null);
  const pricingRef  = useRef(null);
  const eshopRef    = useRef(null);
  const addonsRef   = useRef(null);
  const maintRef    = useRef(null);
  const faqRef      = useRef(null);

  const heroInView    = useInView(heroRef,    { once: true, margin: "-60px" });
  const pricingInView = useInView(pricingRef, { once: true, margin: "-60px" });
  const eshopInView   = useInView(eshopRef,   { once: true, margin: "-60px" });
  const addonsInView  = useInView(addonsRef,  { once: true, margin: "-60px" });
  const maintInView   = useInView(maintRef,   { once: true, margin: "-60px" });
  const faqInView     = useInView(faqRef,     { once: true, margin: "-60px" });

  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">

      {/* HERO*/}
      <section ref={heroRef} className="relative min-h-[70vh] flex flex-col justify-end pb-20 pt-40 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/7 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <motion.p variants={fadeUp(0)} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-6">
            Mitco Dean Digital Solutions — Leistungen
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-12 items-end">
            <div>
              <div className="overflow-hidden mb-3">
                <motion.h1 initial={{ y: "110%" }} animate={heroInView ? { y: 0 } : {}}
                  transition={{ duration: 0.85, ease: "easeInOut", delay: 0.07 }}
                  className="text-[clamp(3rem,8vw,7rem)] font-black tracking-tight leading-[0.9] text-foreground">
                  Websites.
                </motion.h1>
              </div>
              <div className="overflow-hidden mb-3">
                <motion.h1 initial={{ y: "110%" }} animate={heroInView ? { y: 0 } : {}}
                  transition={{ duration: 0.85, ease: "easeInOut", delay: 0.17 }}
                  className="text-[clamp(3rem,8vw,7rem)] font-black tracking-tight leading-[0.9] text-primary">
                  Marketing.
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 initial={{ y: "110%" }} animate={heroInView ? { y: 0 } : {}}
                  transition={{ duration: 0.85, ease: "easeInOut", delay: 0.27 }}
                  className="text-[clamp(3rem,8vw,7rem)] font-black tracking-tight leading-[0.9] text-foreground/30">
                  Wachstum.
                </motion.h1>
              </div>
            </div>

            <motion.div variants={fadeUp(0.35)} initial="hidden" animate={heroInView ? "visible" : "hidden"}
              className="space-y-6">
              <p className="text-support text-lg leading-relaxed">
                Alles was ein lokaler Betrieb braucht um online zu wachsen — Websites, SEO, E-Shops,
                Marketing und Wartung. Klare Preise, persönliche Betreuung, messbare Ergebnisse.
              </p>
              {/* Anchor nav */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Website Pakete", href: "#pricing" },
                  { label: "E-Shop", href: "#eshop" },
                  { label: "Add-ons", href: "#addons" },
                  { label: "Wartung", href: "#maintenance" },
                  { label: "FAQ", href: "#faq" },
                ].map(({ label, href }) => (
                  <a key={href} href={href}
                    className="text-xs px-3.5 py-2 rounded-full border border-border text-support hover:border-primary/40 hover:text-foreground transition-all duration-200 font-medium">
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* PRICING — 3 cards*/}
      <section id="pricing" ref={pricingRef} className="py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={pricingInView ? "visible" : "hidden"} className="mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">Website Pakete</p>
            <h2 className="text-4xl sm:text-5xl font-black text-foreground leading-tight">
              Klare Preise.<br />
              <span className="text-primary">Keine Überraschungen.</span>
            </h2>
          </motion.div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-5 items-start mb-8">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.id}
                variants={fadeUp(0.08 + i * 0.09)}
                initial="hidden"
                animate={pricingInView ? "visible" : "hidden"}
                whileHover={{ y: plan.featured ? -10 : -6, transition: { type: "spring", stiffness: 280, damping: 20 } }}
                style={{ transformStyle: "preserve-3d", perspective: 800 }}
                className={`relative flex flex-col rounded-2xl border p-7 transition-all duration-300 cursor-default ${
                  plan.featured
                    ? "border-primary bg-primary/5 shadow-2xl shadow-primary/15 ring-1 ring-primary/25 md:-mt-4 md:pb-11"
                    : "border-border bg-muted/20"
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-primary text-foreground text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-primary/30 whitespace-nowrap">
                    <Star size={10} fill="currentColor" /> Beliebt
                  </div>
                )}
                {plan.featured && (
                  <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-2xl -z-10 scale-110 pointer-events-none" />
                )}

                <div className="mb-6">
                  <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mb-2 ${plan.featured ? "text-primary" : "text-support/60"}`}>
                    {plan.name}
                  </p>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`font-black text-foreground ${plan.featured ? "text-5xl" : "text-4xl"}`}>{plan.price}</span>
                    <span className="text-lg text-support font-medium">€</span>
                  </div>
                  <p className="text-sm text-support leading-snug mt-1">{plan.tagline}</p>
                  <p className="text-xs text-support/60 mt-2 leading-relaxed">{plan.description}</p>
                </div>

                <div className="h-px bg-border mb-5" />

                {/* Included */}
                <ul className="space-y-2.5 flex-1 mb-5">
                  {plan.includes.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-neutral">
                      <Check size={13} className="mt-0.5 shrink-0 text-primary" /> {item}
                    </li>
                  ))}
                  {plan.notIncluded.map(item => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-support/35 line-through">
                      <X size={13} className="mt-0.5 shrink-0 text-support/25" /> {item}
                    </li>
                  ))}
                </ul>

                {/* Delivery */}
                <div className="space-y-3 pt-3 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-support">
                    <Zap size={11} className="text-primary" />
                    Lieferzeit: <span className="text-foreground font-semibold">{plan.delivery}</span>
                  </div>
                </div>

                <Link href="#contact"
                  className={`mt-5 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                    plan.featured
                      ? "bg-primary text-foreground hover:bg-accent"
                      : "border border-border text-support hover:border-primary/40 hover:text-foreground"
                  }`}
                >
                  Jetzt anfragen <ArrowUpRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.p variants={fadeUp(0.35)} initial="hidden" animate={pricingInView ? "visible" : "hidden"}
            className="text-center text-xs text-support/50">
            Alle Preise netto, zzgl. 20% USt. · Hosting & Domain nicht inkl. (ca. 10–20 €/Mo) · Kostenlose Erstberatung
          </motion.p>
        </div>
      </section>
      
            <section>
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
              {/* 6. CTA*/}
        <motion.div
          variants={fadeUp(0.3)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <p className="text-support text-sm mb-4">
            Keine Website? Einfach melden — kostenlos und unverbindlich.
          </p>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-foreground text-sm font-semibold hover:bg-accent transition-colors duration-200 group"
          >
            Kostenlose Website Analyse
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>
            </section>


      {/* ══════════════════════════════════════════════════════════════════
          E-SHOP — detailed
      ══════════════════════════════════════════════════════════════════ */}
      <section id="eshop" ref={eshopRef} className="py-28 border-t border-border bg-muted/10 relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            <motion.div variants={fadeUp(0)} initial="hidden" animate={eshopInView ? "visible" : "hidden"}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-xs font-bold text-primary uppercase tracking-widest mb-5">
                <ShoppingCart size={11} /> E-Shop
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-foreground leading-tight mb-5">
                Dein Online-Shop.<br />
                <span className="text-primary">Professionell. Schnell. Dein.</span>
              </h2>
              <p className="text-support text-lg leading-relaxed mb-6">
                Ein E-Shop ist mehr als ein Produktkatalog. Es ist dein 24/7-Verkäufer der nie krank wird,
                nie Pause macht und nie eine schlechte Laune hat.
              </p>
              <p className="text-support leading-relaxed">
                Von der Produktverwaltung über sichere Zahlungen bis zur SEO-Optimierung jeder Produktseite —
                wir kümmern uns um die Technik, du kümmerst dich ums Geschäft.
              </p>
            </motion.div>

            {/* E-Shop tiers */}
            <motion.div variants={fadeUp(0.1)} initial="hidden" animate={eshopInView ? "visible" : "hidden"}
              className="space-y-4">
              {ESHOP_TIERS.map((tier, i) => (
                <motion.div
                  key={tier.label}
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group flex items-start gap-5 p-6 rounded-2xl border border-border bg-background hover:border-primary/30 hover:bg-primary/4 transition-all duration-200 cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <span className="text-xs font-black text-primary">{i + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <p className="text-base font-bold text-foreground">{tier.label}</p>
                      <p className="text-lg font-black text-primary shrink-0">{tier.price} €</p>
                    </div>
                    <p className="text-sm text-support mb-1.5">{tier.desc}</p>
                    <p className="text-xs text-support/50">Für: {tier.for}</p>
                  </div>
                </motion.div>
              ))}

              <Link href="#contact"
                className="group flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-primary text-foreground text-sm font-bold hover:bg-accent transition-colors duration-200">
                <ShoppingCart size={15} /> E-Shop anfragen
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* E-Shop features grid */}
          <motion.div variants={fadeUp(0.15)} initial="hidden" animate={eshopInView ? "visible" : "hidden"}>
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-6">
              Was in jedem E-Shop enthalten ist
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ESHOP_FEATURES.map(({ icon: Icon, label, desc }) => (
                <div key={label}
                  className="group flex flex-col gap-3 p-5 rounded-xl border border-border bg-background hover:border-primary/25 hover:bg-primary/4 transition-all duration-200 cursor-default">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon size={16} className="text-primary" />
                  </div>
                  <p className="text-sm font-bold text-foreground">{label}</p>
                  <p className="text-xs text-support leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>





      {/* ══════════════════════════════════════════════════════════════════
          ADD-ONS
      ══════════════════════════════════════════════════════════════════ */}
      <section id="addons" ref={addonsRef} className="py-28 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[300px_1fr] gap-16 items-start">
            <motion.div variants={fadeUp(0)} initial="hidden" animate={addonsInView ? "visible" : "hidden"}
              className="lg:sticky lg:top-32">
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-4">Erweiterungen</p>
              <h2 className="text-3xl font-black text-foreground leading-tight mb-4">
                Noch mehr<br />
                <span className="text-primary">rausholen.</span>
              </h2>
              <p className="text-support text-sm leading-relaxed">
                Alle Add-ons können nachträglich zu jedem Paket hinzugefügt werden.
                Kein Neustart, kein Komplettumbau.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-4">
              {ADDONS.map(({ icon: Icon, label, price, desc }, i) => (
                <motion.div
                  key={label}
                  variants={fadeUp(0.05 + i * 0.06)}
                  initial="hidden"
                  animate={addonsInView ? "visible" : "hidden"}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className="group flex gap-4 p-5 rounded-xl border border-border bg-muted/20 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-default"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon size={15} className="text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-bold text-foreground">{label}</p>
                      <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{price}</span>
                    </div>
                    <p className="text-xs text-support leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          MAINTENANCE
      ══════════════════════════════════════════════════════════════════ */}
      <section id="maintenance" ref={maintRef} className="py-28 border-t border-border bg-muted/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={maintInView ? "visible" : "hidden"} className="mb-14">
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">Website Wartung</p>
            <h2 className="text-4xl font-black text-foreground leading-tight">
              Wir halten deine Website<br />
              <span className="text-primary">am Laufen.</span>
            </h2>
            <p className="text-support mt-4 max-w-lg leading-relaxed">
              Eine Website ist kein Einmal-Produkt. Updates, Sicherheit, Backups — wir übernehmen das,
              damit du dich auf dein Kerngeschäft konzentrieren kannst.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-5 max-w-3xl">
            {MAINTENANCE.map((m, i) => (
              <motion.div
                key={m.name}
                variants={fadeUp(0.08 + i * 0.08)}
                initial="hidden"
                animate={maintInView ? "visible" : "hidden"}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="flex flex-col rounded-2xl border border-border bg-background p-6 cursor-default hover:border-primary/25 transition-colors duration-200"
              >
                <p className="text-xs text-support uppercase tracking-widest mb-1">{m.name}</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-3xl font-black text-foreground">{m.price} €</span>
                  <span className="text-sm text-support">{m.per}</span>
                </div>
                <div className="h-px bg-border mb-4" />
                <ul className="space-y-2 flex-1">
                  {m.includes.map(item => (
                    <li key={item} className="flex items-start gap-2 text-xs text-neutral">
                      <Check size={11} className="mt-0.5 shrink-0 text-primary" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════════════ */}
      <section id="faq" ref={faqRef} className="py-28 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[300px_1fr] gap-16 items-start">
            <motion.div variants={fadeUp(0)} initial="hidden" animate={faqInView ? "visible" : "hidden"}
              className="lg:sticky lg:top-32">
              <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-4">FAQ</p>
              <h2 className="text-3xl font-black text-foreground leading-tight mb-4">
                Häufige<br />
                <span className="text-primary">Fragen.</span>
              </h2>
              <p className="text-support text-sm leading-relaxed">
                Nicht gefunden was du suchst?{" "}
                <Link href="#contact" className="text-primary hover:text-accent transition-colors underline underline-offset-4">
                  Schreib uns direkt.
                </Link>
              </p>
            </motion.div>

            <motion.div variants={fadeUp(0.1)} initial="hidden" animate={faqInView ? "visible" : "hidden"}>
              {FAQS.map(({ q, a }) => <FAQ key={q} q={q} a={a} />)}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════════════════════ */}
      <section className="py-28 border-t border-border relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[400px] bg-primary/6 rounded-full blur-[140px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-5">Bereit?</p>
            <h2 className="text-5xl sm:text-6xl font-black text-foreground leading-tight mb-6">
              Dein Projekt wartet.
            </h2>
            <p className="text-support text-lg max-w-md mx-auto mb-10 leading-relaxed">
              Kostenlose Erstberatung
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-foreground text-sm font-bold hover:bg-accent transition-colors duration-200">
                Kostenlose Beratung
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link href="tel:+436649494891"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border text-support text-sm font-bold hover:border-primary/40 hover:text-foreground transition-all duration-200">
                +43 664 9494891
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
