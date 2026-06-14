import Navbar from "@/components/navbar/Navbar";
import "../globals.css";

import {NextIntlClientProvider} from "next-intl";
import {getMessages} from "next-intl/server";
import Footer from "@/components/footer/Footer";

export default async function LocaleLayout({ children }: { children: React.ReactNode; }) {

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar/>
      {children}
      <Footer/>
    </NextIntlClientProvider>
  );
}