"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Send, CheckCircle2, Loader2, MapPin, Phone, Mail } from "lucide-react";

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay } },
});

type Status = "idle" | "loading" | "success" | "error";

export default function ContactCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
      // Fallback: open mail client
      const subject = encodeURIComponent(`Anfrage von ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
      window.location.href = `mailto:contact@mitcodean.com?subject=${subject}&body=${body}`;
      setStatus("success");
    }
  };

  const inputBase =
    "w-full bg-muted/60 border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-support/40 outline-none transition-all duration-200";
  const inputClass = (name: string) =>
    `${inputBase} ${focused === name ? "border-primary ring-1 ring-primary/30 bg-muted" : "border-border hover:border-primary/30"}`;

  return (
    <section ref={ref} id="contact" className="bg-background py-24 relative overflow-hidden">

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div variants={fadeUp(0)} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-12">
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.2em] mb-3">Kontakt</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight">
            Bereit loszulegen?<br />
            <span className="text-primary">Schreib uns.</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">

          {/* ── LEFT: Form ── */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="relative"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full min-h-[360px] rounded-2xl border border-primary/30 bg-primary/5 text-center p-10 gap-4"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                >
                  <CheckCircle2 size={52} className="text-primary mx-auto" />
                </motion.div>
                <h3 className="text-xl font-bold text-foreground">Nachricht gesendet!</h3>
                <p className="text-support text-sm max-w-xs">
                  Vielen Dank. Wir melden uns so schnell wie möglich bei dir.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
                  className="mt-2 text-xs text-primary hover:text-accent underline underline-offset-4 transition-colors"
                >
                  Neue Nachricht senden
                </button>
              </motion.div>
            ) : (
              <div className="rounded-2xl border border-border bg-muted/40 backdrop-blur-sm p-8 space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-support uppercase tracking-wider">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      placeholder="Max Mustermann"
                      className={inputClass("name")}
                    />
                  </div>
                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-support uppercase tracking-wider">E-Mail *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      placeholder="max@beispiel.at"
                      className={inputClass("email")}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-support uppercase tracking-wider">Nachricht *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    rows={7}
                    placeholder="Erzähl uns von deinem Projekt oder deiner Idee…"
                    className={`${inputClass("message")} resize-y min-h-[140px]`}
                  />
                </div>

                {/* Error */}
                {status === "error" && (
                  <p className="text-xs text-destructive">
                    Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib uns direkt an contact@mitcodean.com
                  </p>
                )}

                {/* Submit */}
                <button
                  onClick={handleSubmit}
                  disabled={status === "loading" || !form.name || !form.email || !form.message}
                  className="group w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-primary text-foreground text-sm font-semibold hover:bg-accent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <><Loader2 size={16} className="animate-spin" /> Wird gesendet…</>
                  ) : (
                    <><Send size={15} /> Nachricht senden</>
                  )}
                </button>

                <p className="text-center text-[11px] text-support/50">
                  Oder direkt: <a href="mailto:contact@mitcodean.com" className="text-primary hover:underline">contact@mitcodean.com</a>
                </p>
              </div>
            )}
          </motion.div>

          {/* ── RIGHT: Map + Info ── */}
          <motion.div
            variants={fadeUp(0.18)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-5"
          >
            {/* Map embed — smaller */}
            <div className="relative rounded-2xl overflow-hidden border border-borderflex-1 min-h-[260px]">
              <iframe
                title="Mitco Dean Standort"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2675.0!2d14.4167!3d47.9167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477397c2e3b3e3e3%3A0x1234567890abcdef!2sEisenstra%C3%9Fe%2013%2C%204460%20Losenstein!5e0!3m2!1sde!2sat!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0F172A]/90 border border-border backdrop-blur-sm text-xs text-foreground">
                <MapPin size={12} className="text-primary shrink-0" />
                Losenstein, Österreich
              </div>
            </div>

            {/* Quick info strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { icon: MapPin, label: "Adresse",  value: "Eisenstraße 13, 4460 Losenstein" },
                { icon: Phone,  label: "Telefon",  value: "+43 664 9494891" },
                { icon: Mail,   label: "E-Mail",   value: "contact@mitcodean.com" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex flex-col gap-2 p-4 rounded-xl border border-border bg-muted">
                  <div className="flex items-center gap-2 text-[10px] text-support uppercase tracking-widest">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-primary" />
                    </div>
                    {label}
                  </div>
                  <p className="text-sm font-semibold text-foreground leading-snug">{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
