import Navbar from "@/components/navbar/Navbar";
import "../globals.css";

import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import Footer from "@/components/footer/Footer";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string }
}) {
  const { locale } = await params;

    // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar/>
      {children}
      <Footer/>
    </NextIntlClientProvider>
  );
}