import type { MetadataRoute } from "next";
import { PUBLIC_ROUTES, readSiteUrl, routeHref, type PublicRoute } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = readSiteUrl();
  if (!origin) return [];
  const urls: MetadataRoute.Sitemap = [];
  for (const route of Object.keys(PUBLIC_ROUTES) as PublicRoute[]) {
    if (route === "demo") continue;
    const languages = { de: new URL(routeHref(route, "de"), origin).href, en: new URL(routeHref(route, "en"), origin).href };
    for (const locale of ["de", "en"] as const) urls.push({ url: languages[locale], alternates: { languages } });
  }
  return urls;
}
