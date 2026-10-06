"use client";

import { useTranslations } from "next-intl";
import { useCookieConsent } from "@/components/cookie/CookieConsent";

const MAP_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2675.0!2d14.4167!3d47.9167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477397c2e3b3e3e3%3A0x1234567890abcdef!2sEisenstra%C3%9Fe%2013%2C%204460%20Losenstein!5e0!3m2!1sde!2sat!4v1234567890";

export default function GoogleMapEmbed({ title, className }: { title: string; className?: string }) {
  const { externalMediaAllowed, openCookieSettings } = useCookieConsent();
  const t = useTranslations("cookieBanner");

  if (!externalMediaAllowed) {
    return (
      <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted/80 p-6 text-center ${className ?? ""}`}>
        <p className="max-w-xs text-sm text-support">{t("mapBlocked")}</p>
        <button onClick={openCookieSettings} className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted">
          {t("enableMap")}
        </button>
      </div>
    );
  }

  return (
    <iframe
      title={title}
      src={MAP_URL}
      width="100%"
      height="100%"
      style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85)" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className={`absolute inset-0 h-full w-full ${className ?? ""}`}
    />
  );
}
