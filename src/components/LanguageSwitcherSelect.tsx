"use client";
import { useTransition, type ChangeEvent, type ReactNode } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routeForPath, routePath, asLocale } from "@/config/site";

export default function LocaleSwitcherSelect({children,defaultValue,label}:{children:ReactNode;defaultValue:string;label:string}) {
 const router=useRouter();const pathname=usePathname();const[pending,startTransition]=useTransition();
 function change(event:ChangeEvent<HTMLSelectElement>){const locale=asLocale(event.target.value);const route=routeForPath(pathname);startTransition(()=>router.replace(route?routePath(route,locale):pathname,{locale}));}
 return <label className="relative inline-flex min-h-11 items-center text-sm text-neutral"><span className="sr-only">{label}</span><select value={defaultValue} disabled={pending} onChange={change} className="min-h-11 cursor-pointer rounded-lg border border-transparent bg-background py-2 pl-2 pr-7 text-sm text-neutral hover:border-border disabled:opacity-60">{children}</select><span aria-hidden="true" className="pointer-events-none absolute right-2 text-support">⌄</span></label>;
}
