import type { Metadata } from "next";
import { routeHref } from "@/config/site";
import { siteCopy } from "@/content/site";
import { inter } from "@/config/fonts";
import type { SiteLocale } from "@/content/services";

export const metadata: Metadata = { title: "404 | Diovis", robots: { index: false, follow: true } };
export function NotFoundContent({ locale }: { locale: SiteLocale }) {
  const c = siteCopy[locale];
  return <main className="page-container flex min-h-[75vh] flex-col items-start justify-center py-24"><p className="mb-5 font-mono text-sm text-red-300">404</p><h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">{c.notFound.title}</h1><p className="mt-5 max-w-xl text-base leading-8 text-support">{c.notFound.text}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href={routeHref("home", locale)} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-accent">{c.common.back}</a><a href={routeHref("services", locale)} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-semibold text-neutral hover:text-foreground">{c.notFound.services}</a></div></main>;
}

export default function NotFound() {
  return <html lang="de" className={inter.variable}><body><NotFoundContent locale="de" /></body></html>;
}
