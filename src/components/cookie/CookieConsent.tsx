"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

type Consent = { necessary: true; externalMedia: boolean };
type CookieContextValue = {
  externalMediaAllowed: boolean;
  openCookieSettings: () => void;
};

const CONSENT_COOKIE = "mitcodean_cookie_consent";
const CookieContext = createContext<CookieContextValue>({
  externalMediaAllowed: false,
  openCookieSettings: () => {},
});

function readConsent(): Consent | null {
  const item = document.cookie.split("; ").find((part) => part.startsWith(`${CONSENT_COOKIE}=`));
  if (!item) return null;
  try {
    const stored = JSON.parse(decodeURIComponent(item.slice(CONSENT_COOKIE.length + 1))) as { externalMedia?: unknown };
    return { necessary: true, externalMedia: stored.externalMedia === true };
  } catch {
    return null;
  }
}

export function useCookieConsent() {
  return useContext(CookieContext);
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const t = useTranslations("cookieBanner");
  const [consent, setConsent] = useState<Consent | null>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [draftExternalMedia, setDraftExternalMedia] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    const handleOpen = () => setSettingsOpen(true);
    window.addEventListener("open-cookie-settings", handleOpen);
    return () => window.removeEventListener("open-cookie-settings", handleOpen);
  }, []);

  const saveConsent = useCallback((next: Consent) => {
    document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(next))}; Max-Age=31536000; Path=/; SameSite=Lax`;
    setConsent(next);
    setSettingsOpen(false);
  }, []);

  const openCookieSettings = useCallback(() => {
    setDraftExternalMedia(consent?.externalMedia ?? false);
    setSettingsOpen(true);
  }, [consent]);

  return (
    <CookieContext.Provider value={{ externalMediaAllowed: consent?.externalMedia ?? false, openCookieSettings }}>
      {children}
      {(consent === null || settingsOpen) && (
        <section
          aria-label={t("title")}
          aria-modal="true"
          role="dialog"
          className="fixed inset-x-0 bottom-0 z-[100] border-t-2 border-red-500 bg-background/95 p-5 shadow-2xl backdrop-blur-xl sm:bottom-5 sm:left-5 sm:right-auto sm:max-w-lg sm:rounded-2xl sm:border-2"
        >
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-foreground">{t("title")}</h2>
              <p className="mt-1 text-sm leading-relaxed text-support">{t("description")}</p>
            </div>

            <div className="space-y-3 rounded-xl border-2 border-red-500/80 bg-muted/30 p-3 text-sm shadow-[0_0_0_1px_rgba(239,68,68,0.15)]">
              <label className="flex items-start gap-3">
                <input type="checkbox" checked disabled className="mt-1 accent-red-600" />
                <span>
                  <span className="block font-semibold text-foreground">{t("necessaryTitle")}</span>
                  <span className="text-support">{t("necessaryDescription")}</span>
                </span>
              </label>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={draftExternalMedia}
                  disabled={!settingsOpen}
                  onChange={(event) => setDraftExternalMedia(event.target.checked)}
                  className="mt-1 accent-red-600"
                />
                <span>
                  <span className="block font-semibold text-foreground">{t("externalTitle")}</span>
                  <span className="text-support">{t("externalDescription")}</span>
                </span>
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              <button onClick={() => saveConsent({ necessary: true, externalMedia: true })} className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-foreground hover:opacity-90">
                {t("acceptAll")}
              </button>
              {settingsOpen ? (
                <button onClick={() => saveConsent({ necessary: true, externalMedia: draftExternalMedia })} className="rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted">
                  {t("save")}
                </button>
              ) : null}
              <button onClick={() => saveConsent({ necessary: true, externalMedia: false })} className="rounded-full border border-border px-4 py-2 text-sm text-support hover:bg-muted hover:text-foreground">
                {t("necessaryOnly")}
              </button>
              {!settingsOpen && (
                <button onClick={() => setSettingsOpen(true)} className="rounded-full px-3 py-2 text-sm text-support underline underline-offset-4 hover:text-foreground">
                  {t("settings")}
                </button>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-support/70">
              <p>{t("changeNote")}</p>
              <Link href="/legal-compliance/privacy-policy" className="underline underline-offset-2 hover:text-foreground">
                {t("privacyLink")}
              </Link>
            </div>
          </div>
        </section>
      )}
    </CookieContext.Provider>
  );
}
