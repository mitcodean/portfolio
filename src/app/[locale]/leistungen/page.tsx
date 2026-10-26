import { permanentRedirect } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { asLocale, routeHref } from "@/config/site";
import { pageMetadata } from "@/lib/site-seo";
import Content from "@/components/site/ServicesPage";
type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props){return pageMetadata(asLocale((await params).locale),"services");}
export default async function Page({params}:Props){const locale=asLocale((await params).locale);setRequestLocale(locale);if(locale!=="de")permanentRedirect(routeHref("services",locale));return <Content locale={locale} />;}
