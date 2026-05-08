import type { Locale } from "@/lib/i18n";
import { getMessages } from "@/lib/getMessages";
import { locales } from "@/lib/i18n";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";


interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  
  if (!locales.includes(typedLocale)) notFound();

  const messages = await getMessages(typedLocale);

  return (
    <>
      <Navbar />
      <main className="pt-20">{children}</main>
      <Footer />
    </>
  );
}