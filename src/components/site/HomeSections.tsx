import Image from "next/image";
import { Play } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { siteCopy } from "@/content/site";
import type { SiteLocale } from "@/content/services";
import { routePath } from "@/config/site";
import { INQUIRY_VIDEO_POSTER } from "@/config/diovis";
import { Eyebrow, PageLink, SectionHeading } from "./Primitives";

export function Problems({ locale }: { locale: SiteLocale }) {
  const c = siteCopy[locale];
  return <section className="border-y border-border/60 bg-muted/10"><div className="page-container section-space"><SectionHeading eyebrow={c.home.problemsEyebrow} title={c.home.problemsTitle} description={c.home.problemsDescription} /><dl className="overflow-hidden rounded-2xl border border-border bg-background">{c.home.problems.map(item => <div key={item.problem} className="grid gap-4 border-b border-border p-5 last:border-0 sm:p-7 md:grid-cols-2 md:gap-10"><dt><span className="mb-2 block text-xs font-medium text-support">{c.home.problemLabel}</span><span className="text-lg font-medium leading-7 text-foreground">{item.problem}</span></dt><dd><span className="mb-2 block text-xs font-medium text-red-300">{c.home.solutionLabel}</span><p className="text-sm leading-7 text-neutral">{item.solution}</p><Link locale={locale} prefetch={false} href={{ pathname: routePath("services", locale), hash: item.service }} className="mt-3 inline-flex min-h-11 items-center rounded-lg text-sm font-medium text-red-300 underline-offset-4 hover:underline">{c.common.more}<span className="sr-only">: {item.problem}</span><span aria-hidden="true" className="ml-2">→</span></Link></dd></div>)}</dl></div></section>;
}

export function PracticePreview({ locale }: { locale: SiteLocale }) {
  const c = siteCopy[locale];
  return <section className="page-container section-space" aria-labelledby="practice-preview-title"><div className="grid overflow-hidden rounded-2xl border border-border bg-white/[0.025] lg:grid-cols-[1.15fr_1fr]"><Link locale={locale} prefetch={false} href="/praxisbeispiele" aria-label={c.home.practiceVideo} className="group relative flex min-h-52 items-center justify-center overflow-hidden border-b border-border bg-background lg:border-b-0 lg:border-r"><Image src={INQUIRY_VIDEO_POSTER} alt={locale === "de" ? "Vorschaubild des Diovis Anfrageassistenten" : "Preview of the Diovis inquiry assistant"} width={1280} height={640} sizes="(max-width:1024px) 100vw, 700px" className="aspect-video h-full w-full object-cover opacity-70 transition-opacity group-hover:opacity-90" /><span className="absolute flex size-16 items-center justify-center rounded-full border border-red-300/40 bg-primary text-white shadow-lg"><Play size={25} fill="currentColor" aria-hidden="true" className="ml-1" /></span></Link><div className="p-6 sm:p-8 lg:p-9"><Eyebrow>{c.home.practiceEyebrow}</Eyebrow><h2 id="practice-preview-title" className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">{c.home.practiceTitle}</h2><p className="mt-4 text-sm leading-7 text-neutral">{c.home.practiceDescription}</p><div className="mt-6 flex flex-col gap-3"><PageLink locale={locale} route="examples">{c.home.practiceVideo}</PageLink><PageLink locale={locale} route="demo" secondary>{c.home.practiceDemo}</PageLink></div><p className="mt-4 text-xs leading-6 text-support">{c.home.practiceHint}</p></div></div></section>;
}
