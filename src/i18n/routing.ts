import {defineRouting} from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  pathnames: {
    '/': '/',
    '/startseite': {
      de: '/home'
    },
    '/leistungen': {
      de: '/services',
      en: '/services'
    },
    '/contact': {
      de: '/kontakt',
      en: '/contact'
    },
    '/legal-compliance/legal-notice': '/legal-compliance/legal-notice',
    '/legal-compliance/privacy-policy': '/legal-compliance/privacy-policy',
    '/legal-compliance/terms-and-conditions': '/legal-compliance/terms-and-conditions'
  }
});
