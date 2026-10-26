import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { asLocale, routeHref } from "@/config/site";
import { pageMetadata } from "@/lib/site-seo";
import ContactPageContent from "@/components/site/ContactPage";
type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props){return pageMetadata(asLocale((await params).locale),"contact");}
export default async function Page({params}:Props){const locale=asLocale((await params).locale);setRequestLocale(locale);if(locale!=="de")permanentRedirect(routeHref("contact",locale));return <ContactPageContent locale={locale} />;}
