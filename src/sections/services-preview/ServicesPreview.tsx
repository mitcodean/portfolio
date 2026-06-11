"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ArrowUpRight, Zap, Globe, Check,
  Calendar, GitBranch, Bell, BarChart2,
  Search, Smartphone, ShoppingCart, Mail,
} from "lucide-react";

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,300;1,8..60,400&family=DM+Sans:wght@300;400;500&display=swap');
`;

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay } },
});

// ─── Data ─────────────────────────────────────────────────────────────────────
const CARD_AUTO = {
  icon: Zap,
  eyebrow: "Prozessautomatisierung",
  headline: "Prozesse automatisieren —",
  subline: "statt Zeit zu verlieren.",
  body: "Viele Abläufe im Unternehmen laufen noch manuell ab – von Anfragen über Terminvereinbarungen bis zur Dokumentation. Wir automatisieren wiederkehrende Prozesse und schaffen Strukturen, die Zeit sparen und Fehler reduzieren.",
  items: [
    { icon: Calendar,  label: "Terminbuchung",             sub: "Automatische Kalender-Sync. Kunden buchen selbst." },
    { icon: GitBranch, label: "Interne Abläufe",  sub: "Regelbasierte Abläufe ohne manuelles Eingreifen." },
    { icon: Bell,      label: "Automatische Erinnerungen",  sub: "E-Mail, SMS, Slack — zur richtigen Zeit." },
    { icon: BarChart2, label: "Auswertungen & Kennzahlen",        sub: "KPIs und Prozessstatus live auf einem Dashboard." },
  ],
  examples: [
    "Anfrage → CRM → Angebot",
    "Terminbuchung ohne Telefonate",
    "Rechnungserstellung automatisieren",
  ],
  cta: "Prozess analysieren",
  href: "/contact",
};

const CARD_WEB = {
  icon: Globe,
  eyebrow: "Websites & Online-Präsenz",
  headline: "Mehr als nur eine Website —",
  subline: "ein digitaler Vertriebskanal.",
  body: "Eine Website entscheidet oft über den ersten Eindruck. Wir entwickeln moderne Unternehmenswebsites und Online-Shops, die professionell auftreten und bei Google & KI gefunden werden.",
  items: [
    { icon: Search,       label: "SEO & lokale Sichtbarkeit", sub: "Google My Business, Core Web Vitals, strukturierte Daten." },
    { icon: Smartphone,   label: "Mobile-First Design",       sub: "65 % der Nutzer browsen mobil. Jedes Detail stimmt." },
    { icon: ShoppingCart, label: "E-Commerce & Online-Shop",  sub: "Von einfachem Katalog bis vollautomatisiertem Shop." },
    { icon: Mail,         label: "Digitales Marketing",        sub: "SEO, Google Ads, E-Mail — messbar und strategisch." },
  ],
  examples: [
    "Website für Handwerksbetriebe",
    "Unternehmensauftritt für KMU",
    "Online-Shop mit Bestellsystem",
  ],
  cta: "Website anfragen",
  href: "/contact",
};

// ─── Triangle brand mark ──────────────────────────────────────────────────────
function TriangleMark({ size = 40, opacity = 0.08 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 40 46" fill="none" style={{ opacity }} aria-hidden>
      <polygon points="20,2 38,44 2,44" fill="#B22222" />
    </svg>
  );
}

// ─── Single card ──────────────────────────────────────────────────────────────
function ServiceCard({
  card,
  fromLeft,
}: {
  card: typeof CARD_AUTO;
  fromLeft: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = card.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromLeft ? -64 : 64, y: 24 }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.85, ease }}
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

      {/* ── Header block ── */}
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

      {/* ── Body ── */}
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
            Beispiele
          </p>
          <div className="flex flex-col gap-2">
            {card.examples.map((ex) => (
              <div key={ex} className="flex items-center gap-2">
                <svg
  width="10"
  height="10"
  viewBox="0 0 10 10"
  className="shrink-0"
>
  <polygon points="5,0 10,10 0,10" fill="#B22222" />
</svg>
                <span
                  className="text-[12px] text-support/70"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {ex}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer CTA ── */}
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

// ─── Section ─────────────────────────────────────────────────────────────────
export default function ServicesPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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

          {/* ── Header ── */}
          <div className="mb-14 ">
            <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? "visible" : "hidden"}>
              <h2
                className="text-4xl sm:text-5xl font-bold text-primary uppercase tracking-[0.2em] mb-4 inline-block"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Leistungen
              </h2>
              <h3
                className="text-xl sm:text-2xl font-light text-foreground leading-tight"
                style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
              >
                Digitale Lösungen <span className="italic text-foreground/50">für Unternehmen</span>
              </h3>
              <div className="mt-2 flex flex-col lg:flex-row gap-10">
              <h4
                className="text-xl sm:text-2xl font-light text-foreground leading-tight underline"
                style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
              >
                Prozessoptimierung
              </h4>
              <h4
                className="text-xl sm:text-2xl font-light text-foreground leading-tight underline"
                style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
              >
                Webentwicklung & Websites
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
              unterstützt Unternehmen dabei, <span className="text-neutral">Prozesse zu digitalisieren</span> und Arbeitsabläufe <span className="text-neutral">effizienter</span> zu gestalten. 
              Durch individuelle Softwarelösungen und Automatisierungen reduzieren wir manuelle Arbeit, vermeiden unnötige Zwischenschritte und schaffen mehr Zeit für das Wesentliche.
              <br /><br />
              Jedes Unternehmen arbeitet anders. 
              Deshalb entwickeln wir Lösungen, die sich an bestehende Abläufe anpassen und dort unterstützen, wo sie den größten Mehrwert schaffen.
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
              Eine professionelle <span className="text-neutral">Website</span> ist heute mehr als nur eine digitale Visitenkarte. 
              Sie schafft Vertrauen, macht Ihr Unternehmen online sichtbar und hilft dabei, neue Kunden zu gewinnen.
              
              <br /><br />
              Wir entwickeln moderne Websites mit Fokus auf Webdesign, Benutzerfreundlichkeit (UX), Suchmaschinenoptimierung (SEO), Performance und zuverlässiges Hosting. 
              Das Ergebnis sind schnelle, professionelle und suchmaschinenfreundliche Webseiten, die sowohl bei Besuchern als auch bei Google überzeugen.
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
              Alle Leistungen ansehen
              <ArrowUpRight
                size={15}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
              />
            </Link>
          </motion.div>
            
          </div>

          {/* Two cards side by side */}
          <div className="grid lg:grid-cols-2 gap-5">
            <ServiceCard card={CARD_AUTO} fromLeft={true} />
            <ServiceCard card={CARD_WEB}  fromLeft={false} />
          </div>
        </div>
      </section>
    </>
  );
}
