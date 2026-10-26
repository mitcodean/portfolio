import { Code2, Network, PanelTop, Check } from "lucide-react";
import { services, type SiteLocale } from "@/content/services";
import { siteCopy } from "@/content/site";
import { PageLink, SectionHeading } from "@/components/site/Primitives";

export default function ServicesPreview({locale}:{locale:SiteLocale}) {
 const c=siteCopy[locale];const icons=[Code2,Network,PanelTop];
 return <section id="services" className="page-container section-space" aria-labelledby="services-preview-title"><SectionHeading id="services-preview-title" eyebrow={c.home.servicesEyebrow} title={c.home.servicesTitle} description={c.home.servicesDescription} /><div className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">{services[locale].map((service,index)=>{const Icon=icons[index];return <article key={service.id} className={`flex min-w-0 flex-col rounded-2xl border p-6 sm:p-7 ${index===0?"border-red-400/30 bg-linear-to-br from-primary/10 via-background to-muted/40":"border-border bg-muted/20"}`}><div className="mb-6 flex items-center justify-between gap-3"><Icon size={25} aria-hidden="true" className="text-red-300" /><span className="text-xs font-medium text-support">{index===0?c.home.focus:`0${index+1}`}</span></div><h3 className="text-2xl font-semibold leading-tight tracking-tight">{service.title}</h3><p className="mb-5 mt-4 text-sm leading-7 text-support">{service.description}</p><ul className="mb-7 space-y-3">{service.preview.map(item=><li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-neutral"><Check size={14} aria-hidden="true" className="mt-1 shrink-0 text-red-300" />{item}</li>)}</ul><PageLink locale={locale} route="services" anchor={service.id} secondary className="mt-auto w-full">{c.common.details}</PageLink></article>;})}</div></section>;
}
