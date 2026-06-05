"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Send, CheckCircle2, Loader2, MapPin, Phone, Mail,
  Github, Linkedin, Instagram, Twitter, Clock,
  ArrowUpRight, MessageSquare, Zap,
} from "lucide-react";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

// ─── helpers ────────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } },
});

type Status = "idle" | "loading" | "success" | "error";

const socials = [
  { icon: Github,    label: "GitHub",      href: "https://github.com/deanmitco",       hoverColor: "#4ade80" },
  { icon: Linkedin,  label: "LinkedIn",    href: "https://linkedin.com/in/deanmitco",  hoverColor: "#0A66C2" },
  { icon: Instagram, label: "Instagram",   href: "https://instagram.com/deanmitco",    hoverColor: "#E1306C" },
  { icon: Twitter,   label: "X / Twitter", href: "https://twitter.com/deanmitco",      hoverColor: "#e7e9ea" },
  { icon: Mail,      label: "E-Mail",      href: "mailto:contact@mitcodean.com",        hoverColor: "#EA4335" },
];

const SUBJECTS = [
  "Neue Website",
  "E-Shop",
  "SEO / Marketing",
  "Wartungspaket",
  "App Entwicklung",
  "Beratung",
  "Sonstiges",
];

// ─── Animated counter ────────────────────────────────────────────────────────
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = () => {
      start += Math.ceil(to / 40);
      if (start >= to) { setVal(to); return; }
      setVal(start);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── Main ────────────────────────────────────────────────────────────────────
export default function ContactPage() {
  const heroRef  = useRef(null);
  const formRef  = useRef(null);
  const infoRef  = useRef(null);
  const heroInView = useInView(heroRef,  { once: true, margin: "-60px" });
  const formInView = useInView(formRef,  { once: true, margin: "-60px" });
  const infoInView = useInView(infoRef,  { once: true, margin: "-60px" });

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, to: "contact@mitcodean.com" }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      const s = encodeURIComponent(form.subject || `Anfrage von ${form.name}`);
      const b = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nTelefon: ${form.phone}\n\n${form.message}`);
      window.location.href = `mailto:contact@mitcodean.com?subject=${s}&body=${b}`;
      setStatus("success");
    }
  };

  const inputBase = "w-full bg-background border rounded-xl px-4 py-3.5 text-sm text-foreground placeholder:text-support/30 outline-none transition-all duration-200";
  const cls = (name: string) =>
    `${inputBase} ${focused === name ? "border-primary ring-1 ring-primary/25" : "border-border hover:border-primary/30"}`;

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">

      {/* HERO — editorial full-height opener*/}
      <section ref={heroRef} className="relative min-h-[72vh] flex flex-col justify-end pb-20 pt-40 overflow-hidden">
        {/* Grid texture */} 
        <div />
        {/* Glows */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/7 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <motion.p variants={fadeUp(0)} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-6">
            Mitco Dean Digital Solutions — Kontakt
          </motion.p>

          {/* Giant headline — Godly-style split */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: "110%" }}
              animate={heroInView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
              className="text-[clamp(3.2rem,9vw,8rem)] font-black tracking-tight leading-[0.88] text-foreground"
            >
              Lass uns
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: "110%" }}
              animate={heroInView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
              className="text-[clamp(3.2rem,9vw,8rem)] font-black tracking-tight leading-[0.88] text-primary"
            >
              reden.
            </motion.h1>
          </div>

          <motion.div variants={fadeUp(0.32)} initial="hidden" animate={heroInView ? "visible" : "hidden"}
            className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8 max-w-4xl">
            <p className="text-support text-lg max-w-md leading-relaxed">
              Kostenlose Erstberatung. Kein Druck, keine versteckten Absichten.
              Erzähl uns von deiner Idee.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FORM + SIDEBAR*/}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">

            {/*LEFT: Form*/}
            <motion.div ref={formRef} variants={fadeUp(0)} initial="hidden" animate={formInView ? "visible" : "hidden"}>
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center min-h-[540px] rounded-2xl border border-primary/30 bg-primary/5 text-center p-14 gap-5"
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}>
                      <CheckCircle2 size={64} className="text-primary mx-auto" />
                    </motion.div>
                    <h2 className="text-2xl font-black text-foreground">Nachricht gesendet!</h2>
                    <p className="text-support max-w-sm leading-relaxed">
                      Vielen Dank. Wir melden uns innerhalb von 24 Stunden bei dir — versprochen.
                    </p>
                    <button
                      onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:text-accent transition-colors"
                    >
                      <ArrowUpRight size={14} /> Neue Anfrage
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="rounded-2xl border border-border bg-muted/20 p-8 sm:p-10 space-y-6">
                    {/* Subject selector — visual chips */}
                    <div>
                      <label className="text-xs font-semibold text-support uppercase tracking-wider block mb-3">
                        Worum geht es?
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {SUBJECTS.map(s => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setForm(p => ({ ...p, subject: s }))}
                            className={`text-xs px-3.5 py-2 rounded-full border transition-all duration-200 font-medium ${
                              form.subject === s
                                ? "bg-primary border-primary text-foreground"
                                : "border-border bg-transparent text-support hover:border-primary/40 hover:text-foreground"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="h-px bg-border" />

                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-support uppercase tracking-wider">Name *</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange}
                          onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                          placeholder="Max Mustermann" className={cls("name")} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-support uppercase tracking-wider">E-Mail *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange}
                          onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                          placeholder="max@beispiel.at" className={cls("email")} />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-support uppercase tracking-wider">Telefon <span className="text-support/40 normal-case font-normal">(optional)</span></label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                        onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                        placeholder="+43 664 …" className={cls("phone")} />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-support uppercase tracking-wider">Nachricht *</label>
                      <textarea name="message" value={form.message} onChange={handleChange}
                        onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                        rows={6} placeholder="Beschreibe dein Projekt, deine Idee oder deine Frage…"
                        className={`${cls("message")} resize-y min-h-[140px]`} />
                    </div>

                    {status === "error" && (
                      <p className="text-xs text-destructive">
                        Fehler beim Senden. Schreib direkt an{" "}
                        <a href="mailto:contact@mitcodean.com" className="underline">contact@mitcodean.com</a>
                      </p>
                    )}

                    <button onClick={handleSubmit}
                      disabled={status === "loading" || !form.name || !form.email || !form.message}
                      className="group w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-primary text-foreground text-sm font-bold hover:bg-accent transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {status === "loading"
                        ? <><Loader2 size={16} className="animate-spin" /> Wird gesendet…</>
                        : <><Send size={15} /> Nachricht senden</>}
                    </button>

                    <p className="text-center text-[11px] text-support/35 leading-relaxed">
                      Deine Daten werden ausschließlich zur Bearbeitung deiner Anfrage genutzt und nicht weitergegeben.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/*RIGHT: Info sidebar*/}
            <div ref={infoRef} className="flex flex-col gap-5">

              {/* Map */}
              <motion.div variants={fadeUp(0.08)} initial="hidden" animate={infoInView ? "visible" : "hidden"}
                className="relative rounded-2xl overflow-hidden border border-border" style={{ height: 200 }}>
                <iframe
                  title="Mitco Dean Standort"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2675.0!2d14.4167!3d47.9167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477397c2e3b3e3e3%3A0x1234567890abcdef!2sEisenstra%C3%9Fe%2013%2C%204460%20Losenstein!5e0!3m2!1sde!2sat!4v1234567890"
                  width="100%" height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85)" }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F172A]/90 border border-border text-xs text-foreground">
                  <MapPin size={11} className="text-primary shrink-0" /> Losenstein, Österreich
                </div>
              </motion.div>

              {/* Contact details */}
              <motion.div variants={fadeUp(0.14)} initial="hidden" animate={infoInView ? "visible" : "hidden"}
                className="rounded-2xl border border-border bg-muted/20 p-6 space-y-4">
                <p className="text-xs font-semibold text-foreground uppercase tracking-widest">Kontaktdaten</p>
                {[
                  { icon: MapPin, label: "Adresse",    value: "Eisenstraße 13, 4460 Losenstein", href: "https://maps.google.com/?q=Eisenstraße+13,+4460+Losenstein" },
                  { icon: Phone,  label: "Telefon",    value: "+43 664 9494891",                  href: "tel:+436649494891" },
                  { icon: Mail,   label: "E-Mail",     value: "contact@mitcodean.com",             href: "mailto:contact@mitcodean.com" },
                  { icon: Clock,  label: "Erreichbar", value: "Mo – Fr, 16:30 – 21:00 Uhr, Sa. So. 10:00 – 19:30 Uhr",       href: null },
                ].map(({ icon: Icon, label, value, href }) => (
                  <div key={label} className="flex items-start gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                      <Icon size={13} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-[10px] text-support/50 uppercase tracking-wider">{label}</p>
                      {href
                        ? <a href={href} className="text-sm text-neutral hover:text-primary transition-colors font-medium">{value}</a>
                        : <p className="text-sm text-neutral font-medium">{value}</p>}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Social links */}
              <motion.div variants={fadeUp(0.2)} initial="hidden" animate={infoInView ? "visible" : "hidden"}
                className="rounded-2xl border border-border bg-muted/20 p-6">
                <p className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">Folg uns</p>
                <div className="flex flex-wrap gap-2">
                  {socials.map(({ icon: Icon, label, href, hoverColor }) => (
                    <a key={label} href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                      aria-label={label}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background text-support text-xs font-medium transition-all duration-200"
                      onMouseEnter={e => { e.currentTarget.style.color = hoverColor; e.currentTarget.style.borderColor = hoverColor + "50"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = ""; e.currentTarget.style.borderColor = ""; }}
                    >
                      <Icon size={13} />
                      {label}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Fast response promise */}
              <motion.div variants={fadeUp(0.3)} initial="hidden" animate={infoInView ? "visible" : "hidden"}
                className="flex items-start gap-3 px-5 py-4 rounded-2xl border border-primary/20 bg-primary/5">
                <Zap size={16} className="text-primary shrink-0 mt-0.5" />
                <p className="text-xs text-support leading-relaxed">
                  Wir antworten <span className="text-foreground font-semibold">meist innerhalb von 24 Stunden</span>.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ — common questions*/}
      <section id="faq" className="py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">Häufige Fragen.</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 max-w-5xl">
            {[
              {
                q: "Wie lange dauert eine Website?",
                a: "Eine Starter-Website ist in 1–2 Wochen fertig. Business und Premium Projekte dauern je nach Umfang 3–6 Wochen. Wir besprechen den genauen Zeitrahmen beim ersten Gespräch.",
              },
              {
                q: "Was brauche ich um zu starten?",
                a: "Nichts außer einer Idee. Wir führen dich durch den gesamten Prozess — von der Konzeption über den Content bis zum Go-Live.",
              },
              {
                q: "Gibt es laufende Kosten?",
                a: "Hosting und Domain kosten ca. 10–20 €/Monat. Unsere Wartungspakete ab 29 €/Monat sind optional, aber empfohlen.",
              },
              {
                q: "Was wenn ich später Änderungen will?",
                a: "Kein Problem. Mit einem Wartungspaket sind kleine Änderungen inklusive. Größere Anpassungen werden als Einzelleistung abgerechnet.",
              },
              {
                q: "Kann ich meine Website selbst bearbeiten?",
                a: "Ja. Bei Bedarf integrieren wir ein CMS (z.B. Sanity oder Contentful) damit du Texte und Bilder selbst aktualisieren kannst.",
              },
              {
                q: "Macht ihr auch E-Shops?",
                a: "Ja — ab 1.200 € bauen wir vollständige Online-Shops mit Zahlungsabwicklung, Produktverwaltung und mehr.",
              },
            ].map(({ q, a }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.55 }}
                className="group p-6 rounded-2xl border border-border bg-muted/20 hover:border-primary/25 hover:bg-primary/3 transition-all duration-200 cursor-default"
              >
                <p className="text-sm font-bold text-foreground mb-2">{q}</p>
                <p className="text-sm text-support leading-relaxed">{a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <SmoothCursor />
    </main>
  );
}
