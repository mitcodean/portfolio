"use client";

import { useTranslations } from "next-intl";
import { Github, Linkedin, Mail, Instagram, Twitter, ChevronRight, ArrowUp } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {

const pathname = usePathname();
  const t = useTranslations();
  const tLegalNotice = useTranslations("legal.notice");
  const tLegalPrivacy = useTranslations("legal.privacy");
  const tLegalTerms = useTranslations("legal.terms");

  const segments = pathname.split("/");
  const locale = segments[1] || "en";

    const legalItems = [
    { label: tLegalNotice("title"), href: `/${locale}/legal-compliance/legal-notice` },
    { label: tLegalPrivacy("title"), href: `/${locale}/legal-compliance/privacy-policy` },
    { label: tLegalTerms("title"), href: `/${locale}/legal-compliance/terms-and-conditions` },
  ];

  const socials = [
    {
      href: "https://github.com/DeanMitco",
      label: "GitHub",
      icon: Github,
      hoverClass: "hover:text-[#4ade80] hover:border-[#4ade80]/40 hover:bg-[#4ade80]/5",
    },
    {
      href: "https://www.linkedin.com/in/dean-mitco-248a50219/",
      label: "LinkedIn",
      icon: Linkedin,
      hoverClass: "hover:text-[#0A66C2] hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/5",
    },
    {
      href: "https://www.instagram.com/dean_mitco/",
      label: "Instagram",
      icon: Instagram,
      hoverClass: "hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:bg-[#E1306C]/5",
      // Instagram gets a gradient glow via inline style on the icon wrapper
      instagram: true,
    },
    {
      href: "https://x.com/dean_mitco",
      label: "X / Twitter",
      icon: Twitter,
      hoverClass: "hover:text-[#e7e9ea] hover:border-[#e7e9ea]/30 hover:bg-white/5",
    },
    {
      href: "mailto:contact@mitcodean.com",
      label: "Email",
      icon: Mail,
      hoverClass: "hover:text-[#EA4335] hover:border-[#EA4335]/40 hover:bg-[#EA4335]/5",
    },
  ];

    const navLinks = [
    { label: t("nav.about"), href: `/${locale}/#about` },
    { label: t("nav.services"), href: `/${locale}/#services` },
    // { label: t("nav.portfolio"), href: `/${locale}/portfolio` },
    { label: t("nav.contact"), href: `/${locale}/#contact` },
  ];


  return (
    <footer className="bg-background border-t border-border relative overflow-hidden">

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand Column */}
          <div className="space-y-5">

            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src="/logo-diovis.svg"
                  alt="Diovis logo"
                  fill
                  className="object-contain"
                  style={{ mixBlendMode: "screen" }}
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground leading-tight">Diovis</p>
              </div>
            </div>

            <p className="text-support text-sm leading-relaxed">
              {t("footer.description")}
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-foreground text-sm font-semibold hover:bg-accent transition-colors duration-200"
            >
              {t("footer.contact")}
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-5">
              {t("footer.navigation")}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative flex items-center text-sm text-support hover:text-primary hover:pl-5 transition-all duration-200"
                  >
                    <ChevronRight
                      size={12}
                      className="absolute left-0 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-primary"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-5">
              {t("footer.contactTitle")}
            </h3>
            <address className="not-italic space-y-4">
              <div>
                <p className="text-xs text-support/60 uppercase tracking-wider mb-1">{t("contact.info.phone")}</p>
                <a
                  href="tel:+436649494891"
                  className="text-sm text-neutral hover:text-primary transition-colors"
                >
                  +43 664 9494891
                </a>
              </div>
              <div>
                <p className="text-xs text-support/60 uppercase tracking-wider mb-1">{t("contact.info.email")}</p>
                <a
                  href="mailto:contact@mitcodean.com"
                  className="text-sm text-neutral hover:text-primary transition-colors break-all"
                >
                  contact@mitcodean.com
                </a>
              </div>
              <div>
                <p className="text-xs text-support/60 uppercase tracking-wider mb-1">{t("contact.info.address")}</p>
                <p className="text-sm text-neutral leading-relaxed">
                  Eisenstraße 13<br />
                  4460 Losenstein, Austria
                </p>
              </div>
            </address>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xs font-semibold text-foreground uppercase tracking-widest mb-5">
              Connect
            </h3>
            <div className="flex flex-wrap gap-2">
              {socials.map(({ href, label, icon: Icon, hoverClass, instagram }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className={`group w-9 h-9 rounded-lg border border-border bg-muted flex items-center justify-center text-support transition-all duration-200 ${hoverClass}`}
                >
                  {instagram ? (
                    <span className="transition-all duration-200 group-hover:[filter:drop-shadow(0_0_4px_#E1306C)] group-hover:opacity-100">
                      <Icon
                        size={15}
                        className="transition-all duration-200 group-hover:[color:url(#ig-gradient)]"
                        style={{ display: "block" }}
                      />
                      {/* Hidden SVG gradient definition for Instagram */}
                      <svg width="0" height="0" className="absolute">
                        <defs>
                          <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#f09433" />
                            <stop offset="25%" stopColor="#e6683c" />
                            <stop offset="50%" stopColor="#dc2743" />
                            <stop offset="75%" stopColor="#cc2366" />
                            <stop offset="100%" stopColor="#bc1888" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </span>
                  ) : (
                    <Icon size={15} />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-support">
            © {new Date().getFullYear()} Dean-Silviu Mitco. {t("footer.rights")}
          </p>

          <div className="flex items-center gap-6">
            <div className="flex gap-4 text-xs text-support items-center">

              {legalItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <span className="w-1 h-1 rounded-full bg-border inline-block" />
              
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="w-8 h-8 rounded-full border border-border bg-muted flex items-center justify-center text-support hover:text-primary hover:border-primary/40 transition-all duration-200"
              aria-label="Back to top"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
