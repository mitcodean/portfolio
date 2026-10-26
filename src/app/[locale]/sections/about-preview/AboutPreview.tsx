import Image from "next/image";
import { siteCopy } from "@/content/site";
import type { SiteLocale } from "@/content/services";
import { Eyebrow, PageLink } from "@/components/site/Primitives";

export default function AboutPreview({locale}:{locale:SiteLocale}) {
 const c=siteCopy[locale];return <section id="about" className="page-container section-space" aria-labelledby="about-preview-title"><div className="grid items-center gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16"><figure className="relative overflow-hidden rounded-2xl border border-border bg-muted/20"><Image src="/images/dean-mitco.webp" alt="Dean-Silviu Mitco, Diovis" width={720} height={960} sizes="(max-width:1024px) 100vw, 420px" className="aspect-4/5 max-h-[480px] w-full object-cover object-top" /><figcaption className="border-t border-border p-4 text-sm leading-6 text-neutral">Dean-Silviu Mitco <span className="text-support">· Diovis</span></figcaption></figure><div><Eyebrow>{c.home.aboutEyebrow}</Eyebrow><h2 id="about-preview-title" className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{c.home.aboutTitle}</h2><p className="mt-5 max-w-2xl text-base leading-8 text-neutral">{c.home.aboutDescription}</p><p className="mt-4 max-w-2xl text-sm leading-7 text-support">{c.home.aboutSecond}</p><PageLink locale={locale} route="about" secondary className="mt-7 w-full sm:w-auto">{c.home.aboutButton}</PageLink></div></div></section>;
}
