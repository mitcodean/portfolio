"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  ArrowRight, Check, CheckCheck, CircleAlert,
  ClipboardCheck, FileText, FlaskConical, Loader2, Paperclip, RotateCcw,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { findInquiryExample, getInquiryExamples } from "@/data/inquiry-examples";
import InquiryBookingCTA from "./InquiryBookingCTA";
import {
  DEFAULT_INQUIRY_MODEL, INQUIRY_MODELS, MAX_INQUIRY_LENGTH, VISITOR_ATTEMPTS,
  inquiryErrorSchema, inquirySuccessSchema, type InquiryModel, type InquiryResult,
} from "@/lib/inquiry/schema";

const focusStyle = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-4 focus-visible:ring-offset-background";

export default function AnfrageDemo({ defaultModel = DEFAULT_INQUIRY_MODEL, unlimitedLocalTests = false }: { defaultModel?: InquiryModel; unlimitedLocalTests?: boolean }) {
  const locale = useLocale();
  const t = useTranslations("inquiryDemo");
  const examples = getInquiryExamples(locale);
  const [inquiry, setInquiry] = useState(examples[0].inquiry);
  const [result, setResult] = useState<InquiryResult | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "reviewed">("idle");
  const [error, setError] = useState<string | null>(null);
  const [model, setModel] = useState<InquiryModel>(defaultModel);
  const [quota, setQuota] = useState<{ remaining: number; resetAt: number } | null>(null);
  const [blockedUntil, setBlockedUntil] = useState(0);
  const controllerRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLHeadingElement>(null);
  const selectedExample = findInquiryExample(inquiry, locale);
  const isLoading = status === "loading";
  const rateLimitDisabled = unlimitedLocalTests;

  useEffect(() => () => {
    controllerRef.current?.abort();
    controllerRef.current = null;
  }, []);

  useEffect(() => {
    if (!blockedUntil) return;
    const timer = setTimeout(() => setBlockedUntil(0), Math.min(Math.max(0, blockedUntil - Date.now()), 2_147_483_647));
    return () => clearTimeout(timer);
  }, [blockedUntil]);

  function changeInquiry(value: string) {
    controllerRef.current?.abort();
    controllerRef.current = null;
    setInquiry(value);
    setResult(null);
    setStatus("idle");
    setError(null);
  }

  async function analyze(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading || controllerRef.current || (!rateLimitDisabled && blockedUntil > Date.now())) return;
    if (!inquiry.trim() || inquiry.length > MAX_INQUIRY_LENGTH) {
      setError(t(inquiry.trim() ? "tooLong" : "emptyError"));
      inputRef.current?.focus();
      return;
    }
    setError(null);
    setResult(null);
    setStatus("loading");

    const controller = new AbortController();
    controllerRef.current = controller;
    const timeout = setTimeout(() => controller.abort("timeout"), 55_000);
    try {
      const response = await fetch("/api/analyze-inquiry/", {
        method: "POST", credentials: "same-origin", cache: "no-store", signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inquiry, model, locale: locale === "de" ? "de" : "en" }),
      });
      const payload: unknown = await response.json();
      if (controllerRef.current !== controller) return;
      if (!response.ok) {
        const parsed = inquiryErrorSchema.safeParse(payload);
        if (!parsed.success) throw new Error("INVALID_OUTPUT");
        const failure = parsed.data;
        if (failure.remainingAttempts !== undefined && failure.resetAt) setQuota({ remaining: failure.remainingAttempts, resetAt: failure.resetAt });
        if (failure.retryAfterSeconds) setBlockedUntil(Date.now() + failure.retryAfterSeconds * 1000);
        if (failure.error === "RATE_LIMITED") setQuota({ remaining: 0, resetAt: Date.now() + (failure.retryAfterSeconds ?? 86400) * 1000 });
        setError(t(`errors.${failure.error}`));
        setStatus("idle");
        return;
      }
      const parsed = inquirySuccessSchema.safeParse(payload);
      if (!parsed.success) throw new Error("INVALID_OUTPUT");
      setResult(parsed.data.result);
      if (parsed.data.rateLimitDisabled) {
        setQuota(null);
        setBlockedUntil(0);
      } else if (parsed.data.remainingAttempts !== null && parsed.data.resetAt !== null) {
        setQuota({ remaining: parsed.data.remainingAttempts, resetAt: parsed.data.resetAt });
      }
      setStatus("ready");
      requestAnimationFrame(() => resultRef.current?.focus({ preventScroll: true }));
    } catch (failure) {
      if (controllerRef.current !== controller) return;
      setError(controller.signal.aborted ? t("errors.TIMEOUT") : failure instanceof Error && failure.message === "INVALID_OUTPUT" ? t("errors.INVALID_OUTPUT") : t("networkError"));
      setStatus("idle");
    } finally {
      clearTimeout(timeout);
      if (controllerRef.current === controller) controllerRef.current = null;
    }
  }

  const fields = result ? [
    { label: t("fields.service"), value: result.service },
    { label: t("fields.quantity"), value: result.quantity === null ? null : `${result.quantity} ${result.unit ?? ""}`.trim() },
    { label: t("fields.material"), value: result.material },
    { label: t("fields.thickness"), value: result.thicknessMm === null ? null : `${result.thicknessMm} mm` },
    { label: t("fields.delivery"), value: result.deliveryWish },
    { label: t("fields.attachment"), value: result.attachmentMentioned === null ? null : t(result.attachmentMentioned ? "attachmentYes" : "attachmentNo") },
  ] : [];

  return (
    <section id="anfrageassistent" aria-labelledby="inquiry-demo-title" className="relative bg-background py-20 font-sans sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-9 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-red-400">{t("eyebrow")}</p>
            <h2 id="inquiry-demo-title" className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">{t("title")}</h2>
            <p className="mt-3 text-xl text-neutral sm:text-2xl" style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}>{t("subtitle")}</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-support">{t("description")}</p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-amber-300/25 bg-amber-300/5 px-3.5 py-2 text-xs font-medium text-amber-200">
            <FlaskConical aria-hidden="true" size={15} />{t("simulation")}
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-white/[0.025] shadow-2xl shadow-black/15">
          <ol aria-label={t("stepsLabel")} className="grid grid-cols-3 border-b border-border bg-background/50 px-2 py-5 sm:px-8">
            {[t("stepInput"), t("stepResult"), t("stepReview")].map((step, index) => {
              const complete = index === 0 ? result !== null : status === "reviewed";
              const current = index === 0 ? !result : index === 1 ? status === "ready" : status === "reviewed";
              return (
                <li key={step} aria-current={current ? "step" : undefined} className={cn("flex items-center justify-center gap-2 text-xs sm:justify-start sm:gap-3 sm:text-sm", current || complete ? "text-foreground" : "text-support")}>
                  <span className={cn("flex size-7 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] sm:size-8", complete ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-200" : current ? "border-red-400/50 bg-primary/15 text-red-300" : "border-border")}>
                    {complete ? <Check size={14} aria-hidden="true" /> : `0${index + 1}`}
                  </span>
                  {step}
                </li>
              );
            })}
          </ol>

          <div className="grid min-w-0 lg:grid-cols-2">
            <form onSubmit={analyze} noValidate className="min-w-0 border-b border-border p-5 sm:p-8 lg:border-r lg:border-b-0">
              <div className="mb-5 flex items-center gap-2.5">
                <FileText size={18} aria-hidden="true" className="text-red-400" />
                <h3 className="font-semibold text-foreground">{t("inputTitle")}</h3>
              </div>
              <p id="inquiry-examples-help" className="mb-3 text-xs leading-5 text-support">{t("examplesHelp")}</p>
              <div role="group" aria-label={t("examplesLabel")} aria-describedby="inquiry-examples-help" className="mb-6 grid gap-2 sm:grid-cols-3">
                {examples.map((example, index) => (
                  <button key={example.id} type="button" aria-pressed={selectedExample?.id === example.id} disabled={isLoading} onClick={() => changeInquiry(example.inquiry)}
                    className={cn("flex min-h-14 items-center gap-2 rounded-xl border px-3 py-3 text-left text-xs leading-5 transition-colors disabled:cursor-wait disabled:opacity-50", focusStyle, selectedExample?.id === example.id ? "border-red-400/50 bg-primary/10 text-foreground" : "border-border text-neutral hover:border-support hover:bg-white/5")}>
                    <span aria-hidden="true" className="font-mono text-red-300">0{index + 1}</span>{example.label}
                  </button>
                ))}
              </div>
              <label htmlFor="inquiry-demo-model" className="mb-2 block text-sm font-medium text-neutral">{t("modelLabel")}</label>
              <select id="inquiry-demo-model" value={model} disabled={isLoading} onChange={event => { changeInquiry(inquiry); setModel(event.target.value as InquiryModel); }}
                className={cn("mb-5 min-h-11 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground disabled:opacity-50", focusStyle)}>
                {INQUIRY_MODELS.map(value => <option key={value} value={value}>{value}</option>)}
              </select>
              <label htmlFor="inquiry-demo-text" className="mb-2 block text-sm font-medium text-neutral">{t("inputLabel")}</label>
              <Textarea ref={inputRef} id="inquiry-demo-text" name="inquiry" value={inquiry} onChange={(event) => changeInquiry(event.target.value)} disabled={isLoading}
                maxLength={MAX_INQUIRY_LENGTH} aria-invalid={Boolean(error)} aria-describedby={`inquiry-demo-hint inquiry-demo-count inquiry-demo-notice${error ? " inquiry-demo-error" : ""}`}
                placeholder={t("placeholder")} className="min-h-56 resize-y rounded-xl border-border bg-background/70 p-4 text-base leading-7 text-foreground placeholder:text-support/70 focus-visible:border-red-400 focus-visible:ring-red-400/30 sm:min-h-64 sm:text-sm" />
              <div className="mt-2 flex flex-wrap items-start justify-between gap-2 text-xs text-support">
                <p id="inquiry-demo-hint" className="max-w-xs leading-5">{selectedExample ? t("preparedHint") : t("customHint")}</p>
                <span id="inquiry-demo-count" className="shrink-0 tabular-nums">{t("characters", { count: inquiry.length, max: MAX_INQUIRY_LENGTH })}</span>
              </div>
              {error && <p id="inquiry-demo-error" role="alert" className="mt-3 text-sm text-red-300">{error}</p>}
              <button type="submit" disabled={isLoading || (!rateLimitDisabled && blockedUntil > 0)} className={cn("mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60", focusStyle)}>
                {isLoading ? <Loader2 size={17} aria-hidden="true" className="animate-spin motion-reduce:animate-none" /> : <ArrowRight size={17} aria-hidden="true" />}
                {isLoading ? t("analyzing") : t("analyze")}
              </button>
              <p className="mt-3 text-center text-xs leading-5 text-support">{t("localOnly")}</p>
              <p role="status" className="mt-3 text-xs leading-5 text-neutral">{rateLimitDisabled ? t("unlimitedLocalTests") : quota ? t("attemptsRemaining", { remaining: quota.remaining, max: VISITOR_ATTEMPTS }) : t("attemptsLimit", { max: VISITOR_ATTEMPTS })}</p>
              {!rateLimitDisabled && quota && <p className="mt-1 text-xs leading-5 text-support">{t("quotaReset", { date: new Date(quota.resetAt).toLocaleString(locale === "de" ? "de-AT" : "en-GB", { timeZone: "Europe/Vienna" }) })}</p>}
              {!rateLimitDisabled && blockedUntil > 0 && <p className="mt-2 text-xs leading-5 text-amber-200">{t("quotaWait", { date: new Date(blockedUntil).toLocaleString(locale === "de" ? "de-AT" : "en-GB", { timeZone: "Europe/Vienna" }) })}</p>}
            </form>

            <div aria-busy={isLoading} className="min-w-0 bg-background/30 p-5 sm:p-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <ClipboardCheck size={18} aria-hidden="true" className="text-red-400" />
                  <h3 ref={resultRef} tabIndex={-1} className="rounded font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground">{t("resultTitle")}</h3>
                </div>
                {result && <span className={cn("rounded-full border px-2.5 py-1 text-[11px]", status === "reviewed" ? "border-emerald-300/25 text-emerald-200" : "border-amber-300/25 text-amber-200")}>{status === "reviewed" ? t("reviewedBadge") : t("reviewPending")}</span>}
              </div>
              <p role="status" aria-live="polite" className="sr-only">{isLoading ? t("analyzing") : status === "reviewed" ? t("reviewedDescription") : result ? t("resultReady") : t("emptyTitle")}</p>
              {!result ? (
                <div className="flex min-h-96 flex-col items-center justify-center rounded-xl border border-dashed border-border px-5 py-10 text-center">
                  <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-border bg-muted/50">
                    {isLoading ? <Loader2 size={24} aria-hidden="true" className="animate-spin text-red-300 motion-reduce:animate-none" /> : <ClipboardCheck size={24} aria-hidden="true" className="text-support" />}
                  </div>
                  <p className="text-base font-medium text-neutral">{isLoading ? t("loadingTitle") : t("emptyTitle")}</p>
                  <p className="mt-2 max-w-xs text-sm leading-6 text-support">{isLoading ? t("loadingDescription") : t("emptyDescription")}</p>
                  <span className="mt-6 rounded-full border border-border px-3 py-1.5 text-[11px] text-support">{t("resultPlaceholder")}</span>
                </div>
              ) : (
                <div className="space-y-5">
                  <p className="text-xs leading-5 text-support">{t("preparedResult", { model })}</p>
                  <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {fields.map(({ label, value }) => (
                      <div key={label} className="min-w-0 rounded-xl border border-border bg-muted/30 p-3.5">
                        <dt className="mb-1.5 text-xs text-support">{label}</dt>
                        <dd className={cn("wrap-break-word text-sm leading-6", value === null ? "italic text-support" : "font-medium text-foreground")}>{value ?? t("notSpecified")}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="flex items-start gap-2 text-xs leading-5 text-support"><Paperclip size={14} aria-hidden="true" className="mt-0.5 shrink-0" /><p>{t("attachmentHint")}</p></div>
                  <div className="rounded-xl border border-border p-4">
                    <h4 className="mb-2 text-sm font-medium text-neutral">{t("summaryTitle")}</h4>
                    <p className="text-sm leading-6 text-support">{result.summary}</p>
                  </div>
                  <div className="rounded-xl border border-amber-300/20 bg-amber-300/5 p-4">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-amber-200"><CircleAlert size={16} aria-hidden="true" />{t("missingTitle")}</h4>
                    {result.missingInformation.length ? <ul className="list-disc space-y-1.5 pl-4 text-sm leading-6 text-neutral">{result.missingInformation.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}</ul> : <p className="text-sm leading-6 text-neutral">{t("noMissingInformation")}</p>}
                  </div>
                  <div className="border-t border-border pt-5">
                    <h4 className="text-sm font-medium text-neutral">{t("reviewTitle")}</h4>
                    <p className="mt-2 text-xs leading-5 text-support">{status === "reviewed" ? t("reviewedDescription") : t("reviewDescription")}</p>
                    <button type="button" aria-pressed={status === "reviewed"} onClick={() => setStatus(status === "reviewed" ? "ready" : "reviewed")}
                      className={cn("mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors sm:w-auto", focusStyle, status === "reviewed" ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-200 hover:bg-emerald-300/15" : "border-border text-foreground hover:border-support hover:bg-white/5")}>
                      {status === "reviewed" ? <CheckCheck size={17} aria-hidden="true" /> : <ClipboardCheck size={17} aria-hidden="true" />}{status === "reviewed" ? t("reviewedButton") : t("reviewButton")}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-4 border-t border-border bg-background/50 px-5 py-4 sm:flex-row sm:items-center sm:px-8">
            <p id="inquiry-demo-notice" className="max-w-3xl text-xs leading-6 text-neutral">{t("notice")}</p>
            <button type="button" onClick={() => changeInquiry("")} className={cn("inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-1 text-xs text-support transition-colors hover:text-foreground", focusStyle)}><RotateCcw size={14} aria-hidden="true" />{t("reset")}</button>
          </div>
        </div>

        <InquiryBookingCTA hasResult={result !== null} />
      </div>
    </section>
  );
}
