import Image from "next/image";
import { Check } from "lucide-react";
import { siteCopy } from "@/content/site";
import type { SiteLocale } from "@/content/services";
import { ConversationCTA, Eyebrow, PageIntro, SectionHeading, StructuredData } from "./Primitives";

export default function AboutPageContent({ locale }: { locale: SiteLocale }) {
  const c = siteCopy[locale];
  return <main><StructuredData locale={locale} route="about" /><PageIntro locale={locale} route="about" eyebrow={c.about.eyebrow} title={c.about.title} description={c.about.description} />
    <div aria-hidden="true" data-about-panorama className="relative mb-16 aspect-[32/7] w-full overflow-hidden bg-muted/20 sm:mb-24 sm:aspect-[32/5] lg:aspect-[32/4]">
      <Image src="/images/milky-way.webp" alt="" fill sizes="100vw" className="object-cover object-center" loading="lazy" />
    </div>
    <section aria-labelledby="founder-name" className="page-container pb-16 sm:pb-24"><div className="grid items-start gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16"><figure className="overflow-hidden rounded-2xl border border-border bg-muted/20"><Image src="/images/dean-mitco.webp" alt="Dean-Silviu Mitco, Diovis" width={720} height={960} sizes="(max-width: 1024px) 100vw, 480px" className="aspect-4/5 w-full object-cover object-top sm:max-h-[560px]" /><figcaption className="border-t border-border p-5 text-sm leading-6 text-support">{c.about.role}</figcaption></figure><div><Eyebrow>{c.home.aboutEyebrow}</Eyebrow><h2 id="founder-name" className="text-3xl font-semibold tracking-tight sm:text-4xl">Dean-Silviu Mitco</h2><div className="mt-5 space-y-5 text-base leading-8 text-neutral">{c.about.bio.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div><dl className="mt-7 divide-y divide-border rounded-2xl border border-border bg-muted/20 px-5">{c.about.facts.map(fact => <div key={fact.label} className="py-4"><dt className="text-xs text-support">{fact.label}</dt><dd className="mt-1 text-sm font-medium leading-7">{fact.value}</dd></div>)}</dl></div></div></section>
    <section className="border-y border-border/60 bg-muted/10"><div className="page-container section-space"><SectionHeading eyebrow={c.about.approachEyebrow} title={c.about.approachTitle} /><div className="grid gap-4 md:grid-cols-3">{c.about.principles.map(principle => <div key={principle.title} className="rounded-2xl border border-border bg-background p-6"><Check size={20} aria-hidden="true" className="mb-5 text-red-300" /><h3 className="text-lg font-semibold">{principle.title}</h3><p className="mt-3 text-sm leading-7 text-support">{principle.text}</p></div>)}</div></div></section>
    <section className="page-container section-space" aria-labelledby="collaboration-title"><h2 id="collaboration-title" className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">{c.about.workflowTitle}</h2><ol className="mt-9 grid gap-4 md:grid-cols-3">{c.about.steps.map((step, index) => <li key={step.title} className="rounded-2xl border border-border p-6"><span className="font-mono text-sm text-red-300">0{index + 1}</span><h3 className="mt-5 text-lg font-semibold">{step.title}</h3><p className="mt-3 text-sm leading-7 text-support">{step.text}</p></li>)}</ol></section>
    <ConversationCTA locale={locale} />
  </main>;
}
