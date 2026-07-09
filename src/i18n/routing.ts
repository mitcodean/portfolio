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
      de: '/services'
    },
    '/leistungen': {
      de: '/services'
    },
    '/contact': {
      de: '/kontakt'
    }
  }
});