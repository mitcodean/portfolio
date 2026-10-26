import type { MetadataRoute } from "next";
import { readSiteUrl, siteIndexable } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const origin = readSiteUrl();
  return { rules: { userAgent: "*", ...(siteIndexable() ? { allow: "/", disallow: "/api/" } : { disallow: "/" }) }, ...(origin ? { sitemap: new URL("/sitemap.xml", origin).href } : {}) };
}
