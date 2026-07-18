"use client";

import { useState, useRef, useEffect } from "react";
import { useInView, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Send, CheckCircle2, Loader2, MapPin, Phone, Mail,
  Github, Linkedin, Instagram, Twitter, Clock,
  ArrowUpRight, Zap,
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

type Status = "idle" | "loading" | "success" | "error";

const socials = [
  { icon: Github,    label: "GitHub",      href: "https://github.com/deanmitco",       hoverColor: "#4ade80" },
  { icon: Linkedin,  label: "LinkedIn",    href: "https://linkedin.com/in/deanmitco",  hoverColor: "#0A66C2" },
  { icon: Instagram, label: "Instagram",   href: "https://instagram.com/deanmitco",    hoverColor: "#E1306C" },
  { icon: Twitter,   label: "X / Twitter", href: "https://twitter.com/deanmitco",      hoverColor: "#e7e9ea" },
  { icon: Mail,      label: "E-Mail",      href: "mailto:contact@mitcodean.com",        hoverColor: "#EA4335" },
];

export default function ContactPage() {
  const t = useTranslations("contact");
  const heroRef  = useRef(null);
  const formRef  = useRef(null);
  const infoRef  = useRef(null);
  const heroInView = useInView(heroRef,  { once: true, margin: "-60px" });
  const formInView = useInView(formRef,  { once: true, margin: "-60px" });
  const infoInView = useInView(infoRef,  { once: true, margin: "-60px" });

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const subjectKeys = ["newWebsite", "eshop", "seo", "maintenance", "app", "consulting", "other"];
  const subjects = subjectKeys.map(key => t(`form.subjects.${key}`));

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
      if (res.ok) {
        setStatus("success");
      } else {
        // Fallback: open mail client
        const s = encodeURIComponent(form.subject || `Anfrage von ${form.name}`);
        const b = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nTelefon: ${form.phone}\n\n${form.message}`);
        window.location.href = `mailto:contact@mitcodean.com?subject=${s}&body=${b}`;
        setStatus("success");
      }
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

      {/* HERO */}
      <section ref={heroRef} className="relative min-h-[20vh] sm:min-h-[30vh] flex flex-col justify-center pt-12 sm:pt-16 overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <motion.p
            variants={fadeUp(0)}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-2 sm:mb-3"
          >
            {t("title")}
          </motion.p>

          <div className="overflow-hidden mb-2 sm:mb-4">
            <motion.h1
              initial={{ y: "110%" }}
              animate={heroInView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.08 }}
              className="text-[clamp(3rem,8vw,7rem)] font-black tracking-tight leading-[0.88] text-center sm:text-left"
            >
              <span className="text-foreground">Let&apos;s </span>
              <span className="text-primary">talk.</span>
            </motion.h1>
          </div>

          <motion.div
            variants={fadeUp(0.32)}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2 sm:gap-4 max-w-3xl mx-auto sm:mx-0 mb-0"
          >
          </motion.div>
        </div>
      </section>

      {/* FORM + SIDEBAR */}
      <section className="py-0 -mt-2 sm:-mt-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">

            {/* Form */}
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
                    <h2 className="text-2xl font-black text-foreground">{t("form.success")}</h2>
                    <p className="text-support max-w-sm leading-relaxed">
                      {t("form.successMessage")}
                    </p>
                    <button
                      onClick={() => { setStatus("idle"); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary font-medium hover:text-accent transition-colors"
                    >
                      <ArrowUpRight size={14} /> {t("form.newMessage")}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" className="rounded-2xl border border-border bg-muted/20 p-8 sm:p-10 space-y-6">
                    {/* Subject selector */}
                    <div>
                      <label className="text-xs font-semibold text-support uppercase tracking-wider block mb-3">
                        {t("form.subject")}
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {subjects.map((s) => (
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
                        <label className="text-xs font-semibold text-support uppercase tracking-wider">{t("form.name")} *</label>
                        <input type="text" name="name" value={form.name} onChange={handleChange}
                          onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                          placeholder={t("form.namePlaceholder")} className={cls("name")} />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-support uppercase tracking-wider">{t("form.email")} *</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange}
                          onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                          placeholder={t("form.emailPlaceholder")} className={cls("email")} />
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-support uppercase tracking-wider">{t("form.phone")} <span className="text-support/40 normal-case font-normal">(optional)</span></label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                        onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                        placeholder={t("form.phonePlaceholder")} className={cls("phone")} />
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-support uppercase tracking-wider">{t("form.message")} *</label>
                      <textarea name="message" value={form.message} onChange={handleChange}
                        onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                        rows={6} placeholder={t("form.messagePlaceholder")}
                        className={`${cls("message")} resize-y min-h-[140px]`} />
                    </div>

                    {status === "error" && (
                      <p className="text-xs text-destructive">
                        {t("form.error")}{" "}
                        <a href="mailto:contact@mitcodean.com" className="underline">contact@mitcodean.com</a>
                      </p>
                    )}

                    <button onClick={handleSubmit}
                      disabled={status === "loading" || !form.name || !form.email || !form.message}
                      className="group w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-primary text-foreground text-sm font-bold hover:bg-accent transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {status === "loading"
                        ? <><Loader2 size={16} className="animate-spin" /> {t("form.sending")}</>
                        : <><Send size={15} /> {t("form.send")}</>}
                    </button>

                    <p className="text-center text-[11px] text-support/35 leading-relaxed">
                      {t("form.privacyNote")}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Info sidebar */}
            <div ref={infoRef} className="flex flex-col gap-5">

              {/* Map */}
              <motion.div variants={fadeUp(0.08)} initial="hidden" animate={infoInView ? "visible" : "hidden"}
                className="relative rounded-2xl overflow-hidden border border-border" style={{ height: 200 }}>
                <iframe
                  title={t("map.title")}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2675.0!2d14.4167!3d47.9167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477397c2e3b3e3e3%3A0x1234567890abcdef!2sEisenstra%C3%9Fe%2013%2C%204460%20Losenstein!5e0!3m2!1sde!2sat!4v1234567890"
                  width="100%" height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85)" }}
                  allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
                <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0F172A]/90 border border-border text-xs text-foreground">
                  <MapPin size={11} className="text-primary shrink-0" /> Losenstein, Austria
                </div>
              </motion.div>

              {/* Contact details */}
              <motion.div variants={fadeUp(0.14)} initial="hidden" animate={infoInView ? "visible" : "hidden"}
                className="rounded-2xl border border-border bg-muted/20 p-6 space-y-4">
                <p className="text-xs font-semibold text-foreground uppercase tracking-widest">{t("information")}</p>
                {[
                  { icon: MapPin, label: t("info.address"),    value: "Eisenstraße 13, 4460 Losenstein", href: "https://maps.google.com/?q=Eisenstraße+13,+4460+Losenstein" },
                  { icon: Phone,  label: t("info.phone"),    value: "+43 664 9494891",                  href: "tel:+436649494891" },
                  { icon: Mail,   label: t("info.email"),     value: "contact@mitcodean.com",             href: "mailto:contact@mitcodean.com" },
                  { icon: Clock,  label: t("info.hours"), value: t("info.hoursValue"),       href: null },
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
                <p className="text-xs font-semibold text-foreground uppercase tracking-widest mb-4">Follow us</p>
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
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <p className="text-xs font-semibold text-primary uppercase tracking-[0.25em] mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-black text-foreground">{t("faq.title")}</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 max-w-5xl">
            {[
              { q: t("faq.q1"), a: t("faq.a1") },
              { q: t("faq.q2"), a: t("faq.a2") },
              { q: t("faq.q3"), a: t("faq.a3") },
              { q: t("faq.q4"), a: t("faq.a4") },
              { q: t("faq.q5"), a: t("faq.a5") },
              { q: t("faq.q6"), a: t("faq.a6") },
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
    </main>
  );
}