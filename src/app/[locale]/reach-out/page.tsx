"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Send, CheckCircle2, Loader2, MapPin, Phone, Mail,
  Github, Linkedin, Instagram, Twitter, Clock,
  ArrowUpRight, MessageSquare, Zap,
} from "lucide-react";

const socials = [
  { icon: Github,    label: "GitHub",      href: "https://github.com/deanmitco",       hoverColor: "#4ade80" },
  { icon: Linkedin,  label: "LinkedIn",    href: "https://linkedin.com/in/deanmitco",  hoverColor: "#0A66C2" },
  { icon: Instagram, label: "Instagram",   href: "https://instagram.com/deanmitco",    hoverColor: "#E1306C" },
  { icon: Twitter,   label: "X / Twitter", href: "https://twitter.com/deanmitco",      hoverColor: "#e7e9ea" },
  { icon: Mail,      label: "E-Mail",      href: "mailto:contact@mitcodean.com",        hoverColor: "#EA4335" },
];

export default function ReachOutPage() {
  const heroRef  = useRef(null);
  const formRef  = useRef(null);
  const infoRef  = useRef(null);
  const heroInView = useInView(heroRef,  { once: true, margin: "-60px" });
  const formInView = useInView(formRef,  { once: true, margin: "-60px" });
  const infoInView = useInView(infoRef,  { once: true, margin: "-60px" });

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <main className="bg-background min-h-screen overflow-x-hidden">

      {/* FORM + SIDEBAR*/}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_400px] gap-10 items-start">

            {/*RIGHT: Info sidebar*/}
            <div ref={infoRef} className="flex flex-col gap-5">

              {/* Social links */}
              <motion.div initial="hidden" animate={infoInView ? "visible" : "hidden"}
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

              {/* Contact details */}
              <motion.div initial="hidden" animate={infoInView ? "visible" : "hidden"}
                className="rounded-2xl border border-border bg-muted/20 p-6 space-y-4">
                <p className="text-xs font-semibold text-foreground uppercase tracking-widest">Kontaktdaten</p>
                {[
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

              

              
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
