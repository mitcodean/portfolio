import React, { type ReactNode } from "react";
import { legalHref, type LegalDocumentData } from "../../lib/legal";

type Locale = "de" | "en";

function TextLink({ href, locale, children }: { href: string; locale: Locale; children: ReactNode }) {
  const safeHref = legalHref(href, locale);
  if (!safeHref) return <>{children}</>;
  const external = safeHref.startsWith("https://");
  return <a href={safeHref} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="text-primary underline underline-offset-4 hover:text-foreground">{children}</a>;
}

// Only these inline conventions are supported; all content remains escaped React text.
export function LegalText({ text, locale }: { text: string; locale: Locale }) {
  const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|https:\/\/[^\s<>]+)/g);
  return <>{tokens.map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) return <strong key={index} className="font-semibold text-foreground"><LegalText text={token.slice(2, -2)} locale={locale} /></strong>;
    if (token.startsWith("`") && token.endsWith("`")) return <code key={index} className="wrap-anywhere text-[0.95em]">{token.slice(1, -1)}</code>;
    const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) return <TextLink key={index} href={link[2]} locale={locale}>{link[1]}</TextLink>;
    if (token.startsWith("https://")) {
      const href = token.replace(/[.,;]+$/, "");
      return <React.Fragment key={index}><TextLink href={href} locale={locale}>{href}</TextLink>{token.slice(href.length)}</React.Fragment>;
    }
    return <React.Fragment key={index}>{token}</React.Fragment>;
  })}</>;
}

export default function LegalDocument({ document, locale, label, related }: {
  document: LegalDocumentData;
  locale: Locale;
  label: string;
  related: { label: string; href: string }[];
}) {
  return <main className="legal-content min-h-screen bg-background pt-32 pb-24">
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <header className="mb-12">
        <p className="mb-3 text-xs font-semibold tracking-[0.25em] text-primary uppercase">{label}</p>
        <h1 className="text-4xl font-black text-foreground sm:text-5xl">{document.title}</h1>
        <p className="mt-3 text-sm text-support">{document.updated}</p>
        {document.notice && <p className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs leading-relaxed text-support">{document.notice}</p>}
        {document.intro.map((text, index) => <p key={index} className="mt-4 text-sm leading-relaxed text-support wrap-anywhere"><LegalText text={text} locale={locale} /></p>)}
      </header>
      <div className="space-y-10 text-sm leading-relaxed text-support">
        {document.sections.map(section => <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="space-y-3">
          <h2 id={`${section.id}-title`} className="border-b border-border pb-2 text-base font-bold text-foreground">{section.title}</h2>
          {section.blocks.map((block, index) => {
            if (block.type === "paragraph") return <p key={index} className="wrap-anywhere"><LegalText text={block.text} locale={locale} /></p>;
            if (block.type === "details") return <dl key={index} className="space-y-4 rounded-2xl border border-border bg-muted/20 p-5 sm:p-7">
              {block.rows.map(row => <div key={row.label} className="grid min-w-0 gap-1 sm:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] sm:gap-4">
                <dt className="min-w-0 wrap-anywhere">{row.label}</dt>
                <dd className="min-w-0 font-medium text-foreground wrap-anywhere"><LegalText text={row.value} locale={locale} /></dd>
              </div>)}
            </dl>;
            const List = block.ordered ? "ol" : "ul";
            return <List key={index} className={`space-y-3 pl-5 marker:text-primary ${block.ordered ? "list-decimal" : "list-disc"}`}>{block.items.map((text, itemIndex) => <li key={itemIndex} className="pl-1 wrap-anywhere"><LegalText text={text} locale={locale} /></li>)}</List>;
          })}
        </section>)}
      </div>
      <nav aria-label={label} className="mt-12 flex flex-wrap gap-x-6 gap-y-3 text-xs text-support">
        {related.map(link => <TextLink key={link.href} href={link.href} locale={locale}>→ {link.label}</TextLink>)}
      </nav>
    </div>
  </main>;
}
