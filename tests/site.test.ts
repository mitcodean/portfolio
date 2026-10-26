import assert from "node:assert/strict";
import { test } from "node:test";
import { services } from "../src/content/services";
import { siteCopy } from "../src/content/site";
import { activeRoute, MAIN_NAVIGATION, PUBLIC_ROUTES, readSiteUrl, routeForPath, routeHref, siteIndexable, type PublicRoute } from "../src/config/site";
import { pageMetadata, pageStructuredData, safeJsonLd } from "../src/lib/site-seo";
import sitemap from "../src/app/sitemap";
import robots from "../src/app/robots";
import { NextRequest } from "next/server";
import proxy from "../src/proxy";
import deMessages from "../src/messages/de.json";
import enMessages from "../src/messages/en.json";
import { createTranslator } from "use-intl/core";

// The reserved .example domain is a test fixture, never a production default.
const origin = "https://diovis.example";
function withSite(config: { url?: string; index?: string }, run: () => void) {
  const previous = { url: process.env.SITE_URL, index: process.env.SITE_INDEXABLE };
  if (config.url === undefined) delete process.env.SITE_URL;
  else process.env.SITE_URL = config.url;
  if (config.index === undefined) delete process.env.SITE_INDEXABLE;
  else process.env.SITE_INDEXABLE = config.index;
  try { run(); } finally {
    if (previous.url === undefined) delete process.env.SITE_URL; else process.env.SITE_URL = previous.url;
    if (previous.index === undefined) delete process.env.SITE_INDEXABLE; else process.env.SITE_INDEXABLE = previous.index;
  }
}

test("the locale proxy preserves an absolute redirect for the unprefixed homepage", () => {
  for (const origin of ["http://localhost:3000", "http://127.0.0.1:3000", "https://mitcodea.com"]) {
    const request = new NextRequest(`${origin}/?demo=1`, {
      headers: { host: new URL(origin).host },
    });
    const response = proxy(request);
    assert.equal(response.status, 307);
    const location = response.headers.get("location");
    assert.ok(location);
    // Construct without a base: a relative Location reproduces the server crash.
    const target = new URL(location);
    // NextURL normalizes loopback IP hosts to localhost.
    assert.equal(target.origin, request.nextUrl.origin);
    assert.match(target.pathname, /^\/de\/?$/);
    assert.equal(target.searchParams.get("demo"), "1");
  }
});

test("already localized pages are not redirected to themselves", () => {
  for (const pathname of ["/de/", "/de/leistungen/", "/en/", "/en/services/"]) {
    const response = proxy(new NextRequest(`http://localhost:3000${pathname}`, {
      headers: { host: "localhost:3000" },
    }));
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("location"), null);
  }
});

test("the confirmed service catalogue contains exactly 13 + 9 + 4 services in both languages", () => {
  for (const locale of ["de", "en"] as const) {
    assert.deepEqual(services[locale].map(category => category.id), ["automatisierung", "it-netzwerke", "websites"]);
    assert.deepEqual(services[locale].map(category => category.groups.flatMap(group => group.items).length), [13, 9, 4]);
    assert.equal(new Set(services[locale].flatMap(category => category.groups.flatMap(group => group.items))).size, 26);
    assert.ok(services[locale].every(category => category.preview.length <= 4 && category.examples.length >= 2));
  }
  const catalogue = services.de.flatMap(category => category.groups.flatMap(group => group.items));
  for (const required of ["Datenmigration zwischen unterschiedlichen Systemen", "Online-Terminbuchung & Kalender-Synchronisierung", "Webanalyse und Conversion-Tracking", "Systemüberwachung und Wartung"]) assert.ok(catalogue.includes(required));
});

test("navigation and language switching resolve to the five real pages and demo parent", () => {
  assert.equal(MAIN_NAVIGATION.length, 5);
  for (const route of Object.keys(PUBLIC_ROUTES) as PublicRoute[]) {
    for (const locale of ["de", "en"] as const) {
      const pathname = PUBLIC_ROUTES[route][locale];
      assert.equal(routeForPath(pathname), route);
      assert.equal(routeForPath(pathname === "/" ? pathname : `${pathname}/`), route);
      assert.ok(routeHref(route, locale).startsWith(`/${locale}/`));
    }
  }
  assert.equal(routeHref("services", "de"), "/de/leistungen/");
  assert.equal(routeHref("services", "en"), "/en/services/");
  assert.equal(activeRoute("examples", "/praxisbeispiele/anfrageassistent"), true);
  assert.equal(activeRoute("home", "/kontakt"), false);
  assert.equal(routeForPath("/does-not-exist"), undefined);
});

test("a domain is never guessed; only a clean HTTPS origin enables absolute SEO URLs", () => {
  for (const value of ["", "diovis.example", "http://diovis.example", "https://user:secret@diovis.example", "https://diovis.example/path", "https://diovis.example/?x=1", "https://diovis.example/#x"]) assert.equal(readSiteUrl(value), null);
  assert.equal(readSiteUrl(` ${origin}/ `)?.href, `${origin}/`);
  withSite({}, () => {
    assert.equal(siteIndexable(), false);
    assert.equal(pageMetadata("de", "home").alternates, undefined);
    assert.equal(pageStructuredData("de", "home"), null);
    assert.deepEqual(sitemap(), []);
    assert.deepEqual(robots().rules, { userAgent: "*", disallow: "/" });
  });
});

test("all public pages have unique metadata, canonical and DE/EN language alternatives", () => withSite({ url: origin, index: "true" }, () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const locale of ["de", "en"] as const) {
    for (const route of Object.keys(PUBLIC_ROUTES) as PublicRoute[]) {
      const metadata = pageMetadata(locale, route);
      titles.add(JSON.stringify(metadata.title));
      descriptions.add(metadata.description);
      assert.equal(metadata.alternates?.canonical, `${origin}${routeHref(route, locale)}`);
      assert.deepEqual(metadata.alternates?.languages, { de: `${origin}${routeHref(route, "de")}`, en: `${origin}${routeHref(route, "en")}`, "x-default": `${origin}${routeHref(route, "de")}` });
      assert.deepEqual(metadata.robots, { index: route !== "demo", follow: true });
      assert.ok(metadata.twitter && "card" in metadata.twitter);
      assert.equal(metadata.twitter.card, "summary_large_image");
    }
  }
  assert.equal(titles.size, 18);
  assert.equal(descriptions.size, 18);
}));

test("the index gate remains closed unless explicitly enabled with a domain", () => {
  withSite({ url: origin }, () => assert.equal(siteIndexable(), false));
  withSite({ index: "true" }, () => assert.equal(siteIndexable(), false));
  withSite({ url: origin, index: "true" }, () => {
    assert.equal(siteIndexable(), true);
    assert.deepEqual(robots().rules, { userAgent: "*", allow: "/", disallow: "/api/" });
    assert.equal(robots().sitemap, `${origin}/sitemap.xml`);
  });
});

test("sitemap contains 16 canonical pages, no duplicate aliases, fabricated dates or AI demo", () => withSite({ url: origin }, () => {
  const entries = sitemap();
  assert.equal(entries.length, 16);
  assert.equal(new Set(entries.map(entry => entry.url)).size, 16);
  for (const entry of entries) {
    assert.equal(entry.lastModified, undefined);
    assert.ok(!entry.url.includes("anfrageassistent"));
    assert.equal(Object.keys(entry.alternates?.languages ?? {}).length, 2);
  }
  assert.ok(entries.some(entry => entry.url === `${origin}/de/leistungen/`));
  assert.ok(!entries.some(entry => entry.url === `${origin}/de/services/`));
}));

test("structured data only asserts confirmed facts and escapes script boundaries", () => withSite({ url: origin }, () => {
  const home = pageStructuredData("de", "home")!;
  assert.deepEqual(home["@graph"].map(item => item["@type"]), ["Organization", "WebSite"]);
  const json = JSON.stringify(home);
  assert.ok(json.includes("HTL Steyr"));
  for (const unsupported of ["address", "LocalBusiness", "aggregateRating", "review", "priceRange", "openingHours", "foundingDate"]) assert.ok(!json.includes(`"${unsupported}"`));
  const serviceGraph = pageStructuredData("de", "services")!["@graph"];
  assert.equal(serviceGraph.filter(item => item["@type"] === "Service").length, 3);
  const crumbs = pageStructuredData("de", "demo")!["@graph"][0].itemListElement as { position: number; item: string }[];
  assert.deepEqual(crumbs.map(item => item.position), [1, 2, 3]);
  assert.equal(crumbs.at(-1)?.item, `${origin}/de/praxisbeispiele/anfrageassistent/`);
  const escaped = safeJsonLd({ name: "</script><script>alert(1)</script>" });
  assert.ok(!escaped.includes("<"));
  assert.equal(JSON.parse(escaped).name, "</script><script>alert(1)</script>");
}));

test("founder copy uses the confirmed education, start date and residence", () => {
  const copy = JSON.stringify(siteCopy.de.about);
  for (const fact of ["HTL Steyr", "Juli 2025", "Losenstein"]) assert.ok(copy.includes(fact));
  for (const claim of ["jahrzehntelang", "zahlreiche Kundenprojekte", "zertifiziertes Team"]) assert.ok(!copy.includes(claim));
});

test("restored hero and relaunch content use the existing DE/EN translation dictionaries", () => {
  const keys = (value: unknown, prefix = ""): string[] => {
    if (value === null || typeof value !== "object") return [prefix];
    return Object.entries(value).flatMap(([key, child]) => keys(child, prefix + "." + key)).sort();
  };
  assert.deepEqual(keys(deMessages.site), keys(enMessages.site));
  assert.deepEqual(keys(deMessages.serviceCatalog), keys(enMessages.serviceCatalog));
  assert.deepEqual(keys(deMessages.hero), keys(enMessages.hero));
  for (const [locale, messages] of [["de", deMessages], ["en", enMessages]] as const) {
    const t = createTranslator({ locale, messages });
    assert.equal(t("site.services.title"), siteCopy[locale].services.title);
    assert.deepEqual(messages.serviceCatalog, services[locale]);
    assert.ok(t("hero.mobileSubtitle").length < t("hero.subtitle").length);
    assert.ok(t("hero.cta").length > 0);
  }
  const en = createTranslator({ locale: "en", messages: enMessages });
  assert.equal(en("hero.headlineStart"), "Discover");
  assert.equal(en("hero.cta"), "Free introductory call");
});
