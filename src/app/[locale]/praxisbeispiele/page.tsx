import { setRequestLocale } from "next-intl/server";
import { asLocale } from "@/config/site";
import { pageMetadata } from "@/lib/site-seo";
import { Breadcrumbs, StructuredData } from "@/components/site/Primitives";
import InquiryShowcase from "@/components/inquiry/InquiryShowcase";
import InquiryProvider from "@/components/inquiry/InquiryProvider";
type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props){return pageMetadata(asLocale((await params).locale),"examples");}
export default async function CaseStudiesPage({params}:Props){const locale=asLocale((await params).locale);setRequestLocale(locale);return <main className="pt-28"><StructuredData locale={locale} route="examples" /><div className="page-container"><Breadcrumbs locale={locale} route="examples" /></div><InquiryProvider><InquiryShowcase standalone /></InquiryProvider></main>;}
