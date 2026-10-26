"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CONTACT_EMAIL } from "@/config/site";
import { contactSchema } from "@/lib/contact/schema";
import type { SiteCopy } from "@/content/site";
import { actionClass } from "./styles";

const initial = { name: "", email: "", phone: "", subject: "", message: "", website: "" };
type Field = keyof typeof initial;
export default function ContactForm({ labels }: { labels: SiteCopy["form"] }) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const controllerRef = useRef<AbortController | null>(null);
  useEffect(() => () => controllerRef.current?.abort(), []);
  function change(field: Field, value: string) { setValues(previous => ({ ...previous, [field]: value })); setErrors(previous => ({ ...previous, [field]: undefined })); if (status === "error") setStatus("idle"); }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (controllerRef.current) return;
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) { const key = issue.path[0] as Field; if (key !== "website") next[key] = labels[`${key}Error` as "nameError"]; }
      setErrors(next);
      requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    setErrors({}); setStatus("loading");
    const controller = new AbortController(); controllerRef.current = controller;
    const timeout = setTimeout(() => controller.abort(), 20_000);
    try {
      const response = await fetch("/api/contact/", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "same-origin", cache: "no-store", body: JSON.stringify(parsed.data), signal: controller.signal });
      const body: unknown = await response.json();
      if (!response.ok || !body || typeof body !== "object" || !("success" in body) || body.success !== true) throw new Error("DELIVERY_FAILED");
      setStatus("success");
    } catch { if (controllerRef.current === controller) setStatus("error"); }
    finally { clearTimeout(timeout); if (controllerRef.current === controller) controllerRef.current = null; }
  }
  if (status === "success") return <div role="status" className="rounded-2xl border border-emerald-300/25 bg-emerald-300/5 p-6"><CheckCircle2 size={25} aria-hidden="true" className="mb-4 text-emerald-200" /><h3 className="text-xl font-semibold">{labels.successTitle}</h3><p className="mt-3 text-sm leading-7 text-neutral">{labels.successText}</p><button type="button" onClick={() => { setValues(initial); setStatus("idle"); }} className={`${actionClass} mt-6 border border-border`}>{labels.another}</button></div>;
  const inputClass = "min-h-12 w-full rounded-xl border border-border bg-background px-4 py-3 text-base leading-6 text-foreground placeholder:text-support focus:border-red-300 focus:outline-2 focus:outline-offset-2 focus:outline-red-300 disabled:opacity-60";
  const field = (key: Field) => ({ id: `contact-${key}`, name: key, value: values[key], disabled: status === "loading", onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => change(key, event.target.value), "aria-invalid": Boolean(errors[key]), ...(errors[key] ? { "aria-describedby": `contact-${key}-error` } : {}) });
  const error = (key: Field) => errors[key] ? <p id={`contact-${key}-error`} className="mt-2 text-xs leading-6 text-red-300">{errors[key]}</p> : null;
  return <form ref={formRef} onSubmit={submit} noValidate className="space-y-5" aria-busy={status === "loading"}>
    <p className="text-xs leading-6 text-support">{labels.required}</p>
    <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-neutral">{labels.name}</label><input {...field("name")} required autoComplete="name" maxLength={100} className={inputClass} />{error("name")}</div><div><label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-neutral">{labels.email}</label><input {...field("email")} type="email" required autoComplete="email" maxLength={254} className={inputClass} />{error("email")}</div></div>
    <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-neutral">{labels.phone}</label><input {...field("phone")} type="tel" autoComplete="tel" maxLength={60} className={inputClass} />{error("phone")}</div><div><label htmlFor="contact-subject" className="mb-2 block text-sm font-medium text-neutral">{labels.subject}</label><select {...field("subject")} className={inputClass}><option value="">{labels.subjectPlaceholder}</option>{labels.subjects.map(subject => <option key={subject}>{subject}</option>)}</select>{error("subject")}</div></div>
    <div><label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-neutral">{labels.message}</label><textarea {...field("message")} required rows={6} maxLength={5000} placeholder={labels.messagePlaceholder} className={`${inputClass} resize-y`} />{error("message")}<p className="mt-1 text-right text-xs text-support">{values.message.length} / 5000</p></div>
    <div hidden aria-hidden="true"><label htmlFor="contact-website">Website<input {...field("website")} tabIndex={-1} autoComplete="off" /></label></div>
    {status === "error" && <p role="alert" className="rounded-xl border border-red-300/30 bg-primary/5 p-4 text-sm leading-7 text-red-200">{labels.failure}</p>}
    <p className="text-xs leading-6 text-support">{labels.privacy} <Link href="/legal-compliance/privacy-policy" prefetch={false} className="text-neutral underline underline-offset-4">{labels.privacyLink}</Link>.</p>
    <button type="submit" disabled={status === "loading"} className={`${actionClass} w-full bg-primary text-white hover:bg-accent disabled:cursor-wait disabled:opacity-60`}>{status === "loading" ? <Loader2 size={17} aria-hidden="true" className="animate-spin motion-reduce:animate-none" /> : <Send size={17} aria-hidden="true" />}{status === "loading" ? labels.sending : labels.submit}</button>
    <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex min-h-11 items-center rounded text-sm text-support underline underline-offset-4 hover:text-foreground">{labels.direct}</a>
  </form>;
}
