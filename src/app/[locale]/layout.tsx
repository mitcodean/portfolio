import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteCopy } from "@/content/site";
import { CookieConsentProvider } from "@/components/cookie/CookieConsent";
import { inter } from "@/config/fonts";

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale} className={inter.variable}>
      <body>
        <NextIntlClientProvider locale={locale} messages={{ LocaleSwitcher: messages.LocaleSwitcher, cookieBanner: messages.cookieBanner }}>
          <CookieConsentProvider>
            <div id="page-top">
              <a href="#main-content" className="skip-link">{siteCopy[locale].navigation.skip}</a>
              <Navbar locale={locale} labels={{
                ...siteCopy[locale].navigation,
                current: messages.common.current,
                newTab: siteCopy[locale].common.newTab,
              }} />
              <div id="main-content" tabIndex={-1}>{children}</div>
              <Footer locale={locale} />
            </div>
          </CookieConsentProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
