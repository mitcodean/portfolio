import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"], defaultLocale: "de", localeDetection: false,
  // Language alternatives are explicit in page metadata; every path below has a real route.
  alternateLinks: false,
  pathnames: {
    "/": "/", "/services": "/services", "/leistungen": "/leistungen",
    "/about": "/about", "/ueber-uns": "/ueber-uns", "/contact": "/contact", "/kontakt": "/kontakt",
    "/praxisbeispiele": "/praxisbeispiele", "/praxisbeispiele/anfrageassistent": "/praxisbeispiele/anfrageassistent",
    "/legal-compliance/legal-notice": "/legal-compliance/legal-notice",
    "/legal-compliance/privacy-policy": "/legal-compliance/privacy-policy",
    "/legal-compliance/terms-and-conditions": "/legal-compliance/terms-and-conditions",
  },
});
