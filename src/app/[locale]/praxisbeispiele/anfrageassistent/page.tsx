import { setRequestLocale } from "next-intl/server";
import { asLocale } from "@/config/site";
import { pageMetadata } from "@/lib/site-seo";
import { Breadcrumbs, StructuredData } from "@/components/site/Primitives";
import InquiryProvider from "@/components/inquiry/InquiryProvider";
import AnfrageDemo from "../../sections/anfrage-demo/AnfrageDemo";
type Props={params:Promise<{locale:string}>};
export async function generateMetadata({params}:Props){return pageMetadata(asLocale((await params).locale),"demo");}
export default async function InquiryDemoPage({params}:Props){const locale=asLocale((await params).locale);setRequestLocale(locale);return <main className="pt-28"><StructuredData locale={locale} route="demo" /><div className="page-container"><Breadcrumbs locale={locale} route="demo" /></div><InquiryProvider><AnfrageDemo headingLevel={1} defaultModel={process.env.OPENAI_MODEL==="gpt-4.1-nano"?"gpt-4.1-nano":"gpt-5-nano"} unlimitedLocalTests={process.env.NODE_ENV==="development"&&process.env.INQUIRY_LOCAL_ONLY!=="false"&&process.env.INQUIRY_UNLIMITED_LOCAL_TESTS==="true"} /></InquiryProvider></main>;}
