import type { SiteLocale } from "@/content/services";

// Contact details already present in the existing project. No office address is inferred.
export const CONTACT_EMAIL = "contact@mitcodean.com";
export const CONTACT_PHONE = "+43 664 9494891";
export const CONTACT_PHONE_HREF = "tel:+436649494891";
export const FOUNDER_NAME = "Dean-Silviu Mitco";

// Real filesystem routes avoid the existing localized-rewrite redirect loops.
export const PUBLIC_ROUTES = {
  home: { de: "/", en: "/" },
  services: { de: "/leistungen", en: "/services" },
  examples: { de: "/praxisbeispiele", en: "/praxisbeispiele" },
  about: { de: "/ueber-uns", en: "/about" },
  contact: { de: "/kontakt", en: "/contact" },
  demo: { de: "/praxisbeispiele/anfrageassistent", en: "/praxisbeispiele/anfrageassistent" },
  legal: { de: "/legal-compliance/legal-notice", en: "/legal-compliance/legal-notice" },
  privacy: { de: "/legal-compliance/privacy-policy", en: "/legal-compliance/privacy-policy" },
  terms: { de: "/legal-compliance/terms-and-conditions", en: "/legal-compliance/terms-and-conditions" },
} as const;
export type PublicRoute = keyof typeof PUBLIC_ROUTES;
export const MAIN_NAVIGATION = ["home", "services", "examples", "about", "contact"] as const;
export function routePath(route: PublicRoute, locale: SiteLocale) { return PUBLIC_ROUTES[route][locale]; }
export function routeHref(route: PublicRoute, locale: SiteLocale) { return `/${locale}${routePath(route, locale) === "/" ? "/" : `${routePath(route, locale)}/`}`; }
export function routeForPath(pathname: string): PublicRoute | undefined {
  const path = pathname.replace(/\/$/, "") || "/";
  return (Object.keys(PUBLIC_ROUTES) as PublicRoute[]).find(key => Object.values(PUBLIC_ROUTES[key]).some(value => value === path));
}
export function activeRoute(route: PublicRoute, pathname: string) {
  const current = routeForPath(pathname);
  return route === current || (route === "examples" && current === "demo");
}
export function asLocale(value: string): SiteLocale { return value === "en" ? "en" : "de"; }

export function readSiteUrl(value = process.env.SITE_URL): URL | null {
  if (!value?.trim()) return null;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash || url.pathname !== "/") return null;
    return url;
  } catch { return null; }
}
export function siteIndexable() { return Boolean(readSiteUrl() && process.env.SITE_INDEXABLE === "true"); }
