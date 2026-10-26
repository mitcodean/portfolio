"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { activeRoute, MAIN_NAVIGATION, routePath } from "@/config/site";
import { CALENDLY_BOOKING_URL } from "@/config/diovis";
import type { SiteCopy } from "@/content/site";
import type { SiteLocale } from "@/content/services";

export default function Navbar({locale,labels}:{locale:SiteLocale;labels:SiteCopy["navigation"]}) {
 const pathname=usePathname();const details=useRef<HTMLDetailsElement>(null);const summary=useRef<HTMLElement>(null);
 const close=()=>{if(details.current)details.current.open=false;};
 useEffect(()=>{const escape=(event:KeyboardEvent)=>{if(event.key==="Escape"&&details.current?.open){details.current.open=false;summary.current?.focus();}};const media=window.matchMedia("(min-width:1024px)");const resize=()=>{if(media.matches&&details.current)details.current.open=false;};window.addEventListener("keydown",escape);media.addEventListener("change",resize);return()=>{window.removeEventListener("keydown",escape);media.removeEventListener("change",resize);};},[]);
 return <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-xl"><div className="page-container flex h-20 items-center justify-between gap-5"><Link locale={locale} href="/" prefetch={false} aria-label="Diovis" className="flex shrink-0 items-center gap-2 rounded-lg text-lg font-semibold tracking-wide"><Image src="/logo-diovis.svg" alt="" width={39} height={36} className="mix-blend-screen" />DIOVIS</Link>
 <nav aria-label={labels.label} className="hidden items-center gap-4 lg:flex xl:gap-7">{MAIN_NAVIGATION.map(key=><Link key={key} locale={locale} href={routePath(key,locale)} prefetch={false} aria-current={activeRoute(key,pathname)?"page":undefined} className={`rounded py-3 text-sm font-medium transition-colors ${activeRoute(key,pathname)?"text-red-300":"text-neutral hover:text-foreground"}`}>{labels[key]}</Link>)}<LanguageSwitcher /><a href={CALENDLY_BOOKING_URL} target="_blank" rel="noopener noreferrer" aria-label={`${labels.book} (${locale==="de"?"neuer Tab":"new tab"})`} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent">{labels.book}<ArrowUpRight size={15} aria-hidden="true" /></a></nav>
 <details ref={details} className="group lg:hidden" onChange={close}><summary ref={summary} aria-label={labels.menu} className="flex size-11 cursor-pointer list-none items-center justify-center rounded-xl border border-border bg-muted/30 text-foreground"><Menu size={21} aria-hidden="true" className="group-open:hidden" /><X size={21} aria-hidden="true" className="hidden group-open:block" /></summary><nav aria-label={labels.label} className="absolute inset-x-0 top-full max-h-[calc(100dvh-5rem)] overflow-y-auto border-b border-border bg-background shadow-2xl"><div className="page-container flex flex-col gap-1 py-5">{MAIN_NAVIGATION.map(key=><Link key={key} locale={locale} href={routePath(key,locale)} prefetch={false} onClick={close} aria-current={activeRoute(key,pathname)?"page":undefined} className={`rounded-xl px-3 py-3 text-lg font-medium ${activeRoute(key,pathname)?"bg-primary/10 text-red-300":"text-neutral hover:bg-muted/50"}`}>{labels[key]}</Link>)}<div className="my-3 px-1"><LanguageSwitcher /></div><a href={CALENDLY_BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={close} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-accent">{labels.book}<ArrowUpRight size={17} aria-hidden="true" /></a></div></nav></details>
 </div></header>;
}
