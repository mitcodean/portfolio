import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export const metadata = { title: "404 | Diovis", robots: { index: false, follow: true } };

export default async function UnknownPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (hasLocale(routing.locales, locale)) setRequestLocale(locale);
  notFound();
}
