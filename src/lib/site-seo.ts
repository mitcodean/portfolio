import type { Metadata } from "next";
import type { SiteLocale } from "@/content/services";
import { services } from "@/content/services";
import { CONTACT_EMAIL, CONTACT_PHONE, FOUNDER_NAME, readSiteUrl, routeHref, siteIndexable, type PublicRoute } from "@/config/site";

const text: Record<SiteLocale, Record<PublicRoute, { title: string; description: string }>> = {
  de: {
    home: { title: "Software & Automatisierung für die Region Steyr | Diovis", description: "Diovis unterstützt Unternehmen in Steyr und Steyr-Land mit Prozessautomatisierung, individueller Softwareentwicklung und IT. Persönlich und bedarfsgerecht." },
    services: { title: "Prozessautomatisierung, Software & IT-Leistungen | Diovis", description: "Individuelle Software, Schnittstellen, KI-Assistenten und IT-Netzwerke für Unternehmen in der Region Steyr. Entdecken Sie die Leistungen von Diovis." },
    about: { title: "Über Diovis – Dean-Silviu Mitco, Software & IT", description: "Der Mensch hinter Diovis: HTL-Steyr-Absolvent mit Softwareentwicklungserfahrung seit Juli 2025. Persönliche Zusammenarbeit für Steyr und Steyr-Land." },
    contact: { title: "Kontakt & kostenloses Erstgespräch | Diovis", description: "Besprechen Sie Software, Prozessautomatisierung oder Ihre IT mit Dean-Silviu Mitco. Kostenloses Erstgespräch, E-Mail und Kontaktformular bei Diovis." },
    examples: { title: "Praxisbeispiele: Automatisierung im Video erleben | Diovis", description: "Sehen Sie den Diovis KI-Anfrageassistenten im Video. Fiktive Fertigungsanfragen strukturieren, offene Angaben erkennen und die Demo selbst ausprobieren." },
    demo: { title: "KI-Anfrageassistent selbst ausprobieren | Diovis", description: "Testen Sie die bestehende KI-Demo mit fiktiven Anfragen. Strukturierte Angaben, offene Fragen und manuelle Prüfung mit serverseitigem Nutzungslimit." },
    legal: { title: "Impressum | Diovis", description: "Bestehende Anbieter- und Kontaktinformationen zu Diovis sowie rechtliche Hinweise." },
    privacy: { title: "Datenschutzerklärung | Diovis", description: "Bestehende Datenschutzhinweise von Diovis und Informationen zur Verarbeitung personenbezogener Daten." },
    terms: { title: "Allgemeine Geschäftsbedingungen | Diovis", description: "Die bestehenden Allgemeinen Geschäftsbedingungen von Diovis im Überblick." },
  },
  en: {
    home: { title: "Software, automation & IT for the Steyr region | Diovis", description: "Diovis supports businesses in Steyr and Steyr-Land with process automation, custom software development and IT. Personal support around your requirements." },
    services: { title: "Process automation, custom software & IT services | Diovis", description: "Custom applications, API integrations, AI assistants and IT networks for businesses in the Steyr region. Explore the services offered by Diovis." },
    about: { title: "About Diovis – Dean-Silviu Mitco, software & IT", description: "Meet the person behind Diovis: IT education at HTL Steyr and professional software experience since July 2025. Personal collaboration in the Steyr region." },
    contact: { title: "Contact & free introductory call | Diovis", description: "Discuss software, process automation or your IT with Dean-Silviu Mitco. Book a free introductory call or contact Diovis by email or form." },
    examples: { title: "Practical examples: see automation in action | Diovis", description: "Watch the Diovis AI inquiry assistant prepare fictional manufacturing inquiries, highlight missing details and support a manual review. Try the demo yourself." },
    demo: { title: "Try the AI inquiry assistant | Diovis", description: "Test the existing AI demo with fictional inquiries. Structured details, open questions and manual review with a server-enforced usage limit." },
    legal: { title: "Legal notice | Diovis", description: "Existing provider and contact information for Diovis and legal notices." },
    privacy: { title: "Privacy notice | Diovis", description: "The existing Diovis privacy notice and information about the processing of personal data." },
    terms: { title: "Terms and conditions | Diovis", description: "The existing terms and conditions of Diovis." },
  },
};

export function pageMetadata(locale: SiteLocale, route: PublicRoute): Metadata {
  const entry = text[locale][route];
  const origin = readSiteUrl();
  const canonical = origin ? new URL(routeHref(route, locale), origin).href : undefined;
  const image = origin ? { url: new URL("/images/diovis-social.png", origin).href, width: 1200, height: 630, alt: "Diovis – Software, Automatisierung & IT" } : undefined;
  return {
    title: { absolute: entry.title }, description: entry.description,
    ...(origin ? { metadataBase: origin, alternates: { canonical, languages: { de: new URL(routeHref(route, "de"), origin).href, en: new URL(routeHref(route, "en"), origin).href, "x-default": new URL(routeHref(route, "de"), origin).href } } } : {}),
    robots: { index: siteIndexable() && route !== "demo", follow: true },
    openGraph: { type: "website", siteName: "Diovis", title: entry.title, description: entry.description, locale: locale === "de" ? "de_AT" : "en_GB", alternateLocale: locale === "de" ? ["en_GB"] : ["de_AT"], ...(canonical ? { url: canonical } : {}), ...(image ? { images: [image] } : {}) },
    twitter: { card: "summary_large_image", title: entry.title, description: entry.description, ...(image ? { images: [image.url] } : {}) },
  };
}

export function pageStructuredData(locale: SiteLocale, route: PublicRoute) {
  const origin = readSiteUrl();
  if (!origin) return null;
  const absolute = (path: string) => new URL(path, origin).href;
  const organizationId = absolute("/#organization");
  const graph: Record<string, unknown>[] = [];
  if (route === "home") graph.push(
    { "@type": "Organization", "@id": organizationId, name: "Diovis", url: origin.href, logo: absolute("/logo-diovis.svg"), email: CONTACT_EMAIL, telephone: CONTACT_PHONE, founder: { "@type": "Person", name: FOUNDER_NAME, alumniOf: { "@type": "EducationalOrganization", name: "HTL Steyr" } }, areaServed: [{ "@type": "City", name: "Steyr" }, { "@type": "AdministrativeArea", name: "Steyr-Land" }] },
    { "@type": "WebSite", "@id": absolute("/#website"), name: "Diovis", url: origin.href, inLanguage: ["de-AT", "en"], publisher: { "@id": organizationId } },
  );
  if (route === "services") for (const category of services[locale]) graph.push({ "@type": "Service", "@id": absolute(`${routeHref(route, locale)}#${category.id}`), name: category.title, description: category.description, url: absolute(`${routeHref(route, locale)}#${category.id}`), provider: { "@id": organizationId }, areaServed: ["Steyr", "Steyr-Land"] });
  if (route !== "home") {
    const keys: PublicRoute[] = route === "demo" ? ["home", "examples", "demo"] : ["home", route];
    graph.push({ "@type": "BreadcrumbList", itemListElement: keys.map((key, index) => ({ "@type": "ListItem", position: index + 1, name: key === "home" ? locale === "de" ? "Startseite" : "Home" : text[locale][key].title.split(" | ")[0], item: absolute(routeHref(key, locale)) })) });
  }
  return { "@context": "https://schema.org", "@graph": graph };
}

export function safeJsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, "\\u003c"); }
