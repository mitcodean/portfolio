import { setRequestLocale } from "next-intl/server";
import { asLocale } from "@/config/site";
import { pageMetadata } from "@/lib/site-seo";
import Hero from "./sections/hero/Hero";
import ServicesPreview from "./sections/services-preview/ServicesPreview";
import AboutPreview from "./sections/about-preview/AboutPreview";
import ContactCTA from "./sections/contact/ContactCTA";
import { Problems, PracticePreview } from "@/components/site/HomeSections";
import { StructuredData } from "@/components/site/Primitives";

type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props){return pageMetadata(asLocale((await params).locale),"home");}
export default async function HomePage({params}:Props){const locale=asLocale((await params).locale);setRequestLocale(locale);return <main><StructuredData locale={locale} route="home" /><Hero locale={locale} /><ServicesPreview locale={locale} /><Problems locale={locale} /><PracticePreview locale={locale} /><AboutPreview locale={locale} /><ContactCTA locale={locale} /></main>;}
