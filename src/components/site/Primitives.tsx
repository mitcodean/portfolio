import "server-only";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, CalendarDays, Check, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CALENDLY_BOOKING_URL } from "@/config/diovis";
import { routePath, type PublicRoute } from "@/config/site";
import { siteCopy } from "@/content/site";
import type { SiteLocale } from "@/content/services";
import { pageStructuredData, safeJsonLd } from "@/lib/site-seo";
import { cn } from "@/lib/utils";
import { actionClass } from "./styles";

export function PageLink({ locale, route, children, secondary = false, anchor, className }: { locale: SiteLocale; route: PublicRoute; children: ReactNode; secondary?: boolean; anchor?: string; className?: string }) {
  return <Link locale={locale} prefetch={false} href={{ pathname: routePath(route, locale), ...(anchor ? { hash: anchor } : {}) }} className={cn(actionClass, secondary ? "border border-border bg-background text-foreground hover:border-support hover:bg-white/5" : "bg-primary text-white hover:bg-accent", className)}>{children}<ArrowRight size={17} aria-hidden="true" className="shrink-0" /></Link>;
}
export function BookingLink({ locale, children, secondary = false, className }: { locale: SiteLocale; children?: ReactNode; secondary?: boolean; className?: string }) {
  const c = siteCopy[locale].common;
  return <a href={CALENDLY_BOOKING_URL} target="_blank" rel="noopener noreferrer" aria-label={`${typeof children === "string" ? children : c.bookLong} (${c.newTab})`} className={cn(actionClass, secondary ? "border border-border bg-background text-foreground hover:border-support hover:bg-white/5" : "bg-primary text-white hover:bg-accent", className)}>{children ?? c.bookLong}<ArrowUpRight size={17} aria-hidden="true" className="shrink-0" /></a>;
}
export function Eyebrow({ children }: { children: ReactNode }) { return <p className="mb-4 text-xs font-semibold uppercase leading-5 tracking-[0.18em] text-red-300">{children}</p>; }
export function SectionHeading({ eyebrow, title, description, id }: { eyebrow: string; title: string; description?: string; id?: string }) {
  return <div className="mb-9 max-w-3xl sm:mb-12"><Eyebrow>{eyebrow}</Eyebrow><h2 id={id} className="text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-4xl">{title}</h2>{description && <p className="mt-4 max-w-2xl text-base leading-8 text-neutral">{description}</p>}</div>;
}
function breadcrumbLabel(locale: SiteLocale, route: PublicRoute) {
  const c = siteCopy[locale];
  if (route === "demo") return locale === "de" ? "Anfrageassistent" : "Inquiry assistant";
  if (route === "legal" || route === "privacy" || route === "terms") return c.footer[route];
  return c.navigation[route];
}
export function Breadcrumbs({ locale, route }: { locale: SiteLocale; route: Exclude<PublicRoute, "home"> }) {
  const keys: PublicRoute[] = route === "demo" ? ["home", "examples", "demo"] : ["home", route];
  return <nav aria-label={locale === "de" ? "Brotkrumennavigation" : "Breadcrumb"} className="mb-8"><ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs leading-6 text-support">{keys.map((key, index) => <li key={key} className="flex items-center gap-2">{index > 0 && <ChevronRight size={12} aria-hidden="true" />}{index === keys.length - 1 ? <span aria-current="page" className="text-neutral">{breadcrumbLabel(locale, key)}</span> : <Link prefetch={false} locale={locale} href={routePath(key, locale)} className="rounded hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4">{breadcrumbLabel(locale, key)}</Link>}</li>)}</ol></nav>;
}
export function PageIntro({ locale, route, eyebrow, title, description }: { locale: SiteLocale; route: Exclude<PublicRoute, "home">; eyebrow: string; title: string; description: string }) {
  return <header className="page-container pb-12 pt-28 sm:pb-16 sm:pt-32"><Breadcrumbs locale={locale} route={route} /><div className="max-w-4xl"><Eyebrow>{eyebrow}</Eyebrow><h1 className="max-w-3xl text-[clamp(2.125rem,4.8vw,3.5rem)] font-semibold leading-[1.12] tracking-tight">{title}</h1><p className="mt-5 max-w-2xl text-base leading-8 text-neutral sm:text-lg">{description}</p></div></header>;
}
export function StructuredData({ locale, route }: { locale: SiteLocale; route: PublicRoute }) {
  const data = pageStructuredData(locale, route);
  return data ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }} /> : null;
}
export function ConversationCTA({ locale }: { locale: SiteLocale }) {
  const c = siteCopy[locale];
  return <section aria-labelledby="conversation-title" className="page-container pb-20 pt-4 sm:pb-24"><div className="relative overflow-hidden rounded-3xl border border-red-400/25 bg-linear-to-br from-primary/10 via-background to-muted/50"><div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-400/70 to-transparent" /><div className="relative grid gap-8 p-6 sm:p-9 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-12 lg:p-10"><div><Eyebrow>{c.cta.eyebrow}</Eyebrow><h2 id="conversation-title" className="max-w-xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl">{c.cta.title}</h2><p className="mt-4 max-w-xl text-sm leading-7 text-neutral">{c.cta.description}</p><ul className="mt-6 space-y-3 text-sm leading-6 text-neutral">{c.cta.topics.map(topic => <li key={topic} className="flex items-start gap-3"><Check size={15} aria-hidden="true" className="mt-1 shrink-0 text-red-300" />{topic}</li>)}</ul></div><div className="rounded-2xl border border-white/10 bg-background/80 p-5 sm:p-7"><div className="flex items-center gap-3"><span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-red-400/25 bg-primary/10 text-red-300"><CalendarDays size={21} aria-hidden="true" /></span><p className="text-sm text-neutral">{c.cta.meeting}</p></div><p className="mt-5 text-3xl font-semibold">{c.cta.duration}</p><p className="mt-1.5 text-sm leading-6 text-support">{c.cta.host}</p><BookingLink locale={locale} className="mt-6 w-full" /><p className="mt-3 text-center text-xs leading-5 text-support">{c.cta.hint}</p></div></div></div></section>;
}
