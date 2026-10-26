"use client";
import { useCookieConsent } from "./CookieConsent";
export default function CookieSettingsButton({ label }: { label: string }) {
  const { openCookieSettings } = useCookieConsent();
  return <button type="button" onClick={openCookieSettings} className="inline-flex min-h-11 items-center rounded text-xs text-support hover:text-foreground">{label}</button>;
}
