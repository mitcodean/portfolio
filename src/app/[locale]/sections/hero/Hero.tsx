import { ArrowDown, ClipboardCheck, FileText, Workflow } from "lucide-react";
import { siteCopy } from "@/content/site";
import type { SiteLocale } from "@/content/services";
import { BookingLink, Eyebrow, PageLink } from "@/components/site/Primitives";

export default function Hero({ locale }: { locale: SiteLocale }) {
  const c = siteCopy[locale];
  const nodes = [
    { icon: FileText, title: c.home.diagramInput, note: c.home.diagramInputNote },
    { icon: Workflow, title: c.home.diagramProcess, note: c.home.diagramProcessNote },
    { icon: ClipboardCheck, title: c.home.diagramReview, note: c.home.diagramReviewNote },
  ];
  return <section aria-labelledby="home-title" className="relative overflow-hidden border-b border-border/60 bg-background pb-16 pt-32 sm:pb-20 sm:pt-40">
    <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-20 size-[600px] rounded-full bg-[radial-gradient(circle,rgba(178,34,34,0.09),transparent_65%)]" />
    <div className="page-container relative grid items-center gap-12 lg:grid-cols-[1.25fr_0.9fr] lg:gap-14">
      <div><Eyebrow>{c.home.eyebrow}</Eyebrow><h1 id="home-title" className="max-w-3xl text-[clamp(2.25rem,4.7vw,4rem)] font-semibold leading-[1.1] tracking-tight"><span className="block">{c.home.title}</span><span className="mt-1 block text-neutral">{c.home.accent}</span></h1><p className="mt-6 max-w-xl text-base leading-8 text-neutral sm:text-lg">{c.home.description}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><BookingLink locale={locale}>{c.common.book}</BookingLink><PageLink locale={locale} route="examples" secondary>{c.home.secondary}</PageLink></div><p className="mt-6 max-w-xl text-xs leading-6 text-support">{c.home.region}</p></div>
      <div className="relative rounded-2xl border border-border bg-white/[0.025] p-5 shadow-2xl shadow-black/10 sm:p-7"><div className="mb-6 flex items-center justify-between gap-3 border-b border-border pb-4"><p className="text-sm font-medium text-neutral">{c.home.diagramLabel}</p><span aria-hidden="true" className="font-mono text-xs text-red-300">01 → 03</span></div><ol>{nodes.map(({icon:Icon,title,note},index)=><li key={title}>{index>0&&<div className="flex justify-center py-2.5"><ArrowDown size={18} aria-hidden="true" className="text-red-300/70" /></div>}<div className={`flex gap-4 rounded-xl border p-4 ${index===1?"border-red-400/35 bg-primary/10":"border-border bg-background/65"}`}><span className="mt-0.5 text-red-300"><Icon size={21} aria-hidden="true" /></span><div><p className="text-sm font-semibold leading-6">{title}</p><p className="mt-1 text-xs leading-6 text-support">{note}</p></div></div></li>)}</ol><p className="mt-6 text-xs leading-6 text-support">{c.home.diagramHint}</p></div>
    </div>
  </section>;
}
