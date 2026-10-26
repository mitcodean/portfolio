"use client";
import { createContext, useCallback, useContext, useEffect, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Consent={necessary:true;externalMedia:boolean};
const CONSENT_COOKIE="mitcodean_cookie_consent";
const EVENT="diovis-consent-change";
const CookieContext=createContext({externalMediaAllowed:false,openCookieSettings:()=>{}});
export function useCookieConsent(){return useContext(CookieContext);}
function snapshot(){return document.cookie.split("; ").find(part=>part.startsWith(`${CONSENT_COOKIE}=`))?.slice(CONSENT_COOKIE.length+1)??"";}
function serverSnapshot(){return null;}
function subscribe(notify:()=>void){window.addEventListener(EVENT,notify);return()=>window.removeEventListener(EVENT,notify);}
function parse(value:string|null):Consent|null{if(!value)return null;try{const data=JSON.parse(decodeURIComponent(value));return {necessary:true,externalMedia:data.externalMedia===true};}catch{return null;}}
export function CookieConsentProvider({children}:{children:React.ReactNode}){
 const t=useTranslations("cookieBanner");const stored=useSyncExternalStore(subscribe,snapshot,serverSnapshot);const consent=parse(stored);
 const[settingsOpen,setSettingsOpen]=useState(false);
 const openCookieSettings=useCallback(()=>setSettingsOpen(true),[]);
 useEffect(()=>{window.addEventListener("open-cookie-settings",openCookieSettings);return()=>window.removeEventListener("open-cookie-settings",openCookieSettings);},[openCookieSettings]);
 function save(next:Consent){document.cookie=`${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(next))}; Max-Age=31536000; Path=/; SameSite=Lax`;window.dispatchEvent(new Event(EVENT));setSettingsOpen(false);}
 return <CookieContext.Provider value={{externalMediaAllowed:consent?.externalMedia??false,openCookieSettings}}>{children}{stored!==null&&(consent===null||settingsOpen)&&<section role="dialog" aria-labelledby="privacy-dialog-title" className="fixed inset-x-0 bottom-0 z-[100] max-h-[85dvh] overflow-y-auto rounded-t-2xl border border-border bg-background/95 p-5 shadow-2xl backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-md sm:rounded-2xl"><h2 id="privacy-dialog-title" className="text-lg font-semibold">{t("title")}</h2><p className="mt-2 text-sm leading-6 text-support">{t("description")}</p><div className="my-4 space-y-3 rounded-xl border border-border bg-muted/20 p-3 text-xs leading-6 text-support"><label className="flex gap-3"><input type="checkbox" checked disabled className="mt-1.5 shrink-0 accent-red-600" /><span><span className="block font-medium text-neutral">{t("necessaryTitle")}</span>{t("necessaryDescription")}</span></label></div><div className="flex flex-wrap gap-2"><button type="button" onClick={()=>save({necessary:true,externalMedia:false})} className="min-h-11 rounded-xl border border-border px-4 py-2 text-xs font-medium text-neutral hover:bg-muted">{t("necessaryOnly")}</button></div><p className="mt-3 text-xs leading-6 text-support">{t("changeNote")} <Link prefetch={false} href="/legal-compliance/privacy-policy" className="underline underline-offset-4">{t("privacyLink")}</Link></p></section>}</CookieContext.Provider>;
}
