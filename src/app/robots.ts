import type { MetadataRoute } from "next";
import { readSiteUrl, siteIndexable } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const origin = readSiteUrl();
  const rules = siteIndexable()
    ? [
        { userAgent: "*", allow: "/", disallow: "/api/" },
        { userAgent: "OAI-SearchBot", allow: "/", disallow: "/api/" },
      ]
    : [
        { userAgent: "*", disallow: "/" },
        { userAgent: "OAI-SearchBot", disallow: "/" },
      ];
  return { rules, ...(origin ? { sitemap: new URL("/sitemap.xml", origin).href } : {}) };
}
