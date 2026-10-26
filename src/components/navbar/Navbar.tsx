"use client";

import Link from "next/link";
import { usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import LanguageSwitcher from "@/components/LanguageSwitcher";



export default function Navbar() {
  const pathname = usePathname();
  const t = useTranslations();
  const locale = useLocale();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) => {
    if (href.includes("#")) return false;
    const path = href.replace(`/${locale}`, "").replace(/\/$/, "") || "/";
    const current = pathname.replace(/\/$/, "") || "/";
    return current === path || (path !== "/" && current.startsWith(`${path}/`));
  };

  const navItems = [
    { label: t("nav.home"), href: `/${locale}` },
    { label: t("nav.services"), href: `/${locale}/#services` },
    { label: t("nav.examples"), href: `/${locale}/praxisbeispiele` },
    { label: t("nav.about"), href: `/${locale}/#about` },
    { label: t("nav.contact"), href: `/${locale}/contact` },
    // { label: t("nav.portfolio"), href: `/${locale}/portfolio` },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const toggle = menuButtonRef.current;
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); return; }
      if (event.key !== "Tab") return;
      const controls = [toggle, ...Array.from(menuRef.current?.querySelectorAll<HTMLElement>('a[href], button, select, [tabindex="0"]') ?? [])].filter((element): element is HTMLElement => element !== null);
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => { window.removeEventListener("keydown", onKeyDown); toggle?.focus(); };
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-[#0F172A]/90 border-b border-white/10 shadow-lg shadow-black/20"
            : "backdrop-blur-md bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div
            className={`flex items-center justify-between transition-all duration-300 ${
              scrolled ? "h-14" : "h-20"
            }`}
          >
            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="text-lg font-semibold text-foreground hover:text-accent transition flex items-center gap-2"
            >
              <Image
                src="/logo-diovis.svg"
                alt="Diovis logo"
                width={40}
                height={40}
                className="object-contain"
                style={{ mixBlendMode: "screen" }}
              />
              DIOVIS
            </Link>

            {/* Desktop nav */}
            <nav aria-label={t("nav.menuLabel")} className="hidden lg:flex items-center gap-5 xl:gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "location" : undefined}
                  className={`relative text-sm font-medium pb-1 transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-red-300 border-b-2 border-red-400/60"
                      : "text-foreground hover:text-accent"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <LanguageSwitcher />

              {/* CTA button */}
              <Link href={`/${locale}/contact`} className="inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-200 hover:bg-primary/90">
                {t("common.getInTouch")}
              </Link>
            </nav>

            {/* Mobile burger */}
            <motion.button
              ref={menuButtonRef}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden w-11 h-11 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground hover:border-primary/40 transition-colors"
              aria-label={t(menuOpen ? "nav.closeMenu" : "nav.openMenu")}
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? "mobile-navigation" : undefined}
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu – full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label={t("nav.menuLabel")}
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)", pointerEvents: "none" }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-[#0F172A] flex flex-col"
          >
            <div className="h-20 shrink-0" />

            <nav aria-label={t("nav.menuLabel")} className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-6 py-5 sm:px-8 sm:py-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                >
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "location" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between py-4 border-b border-white/5 text-2xl font-semibold transition-colors duration-200 ${
                      isActive(item.href)
                        ? "text-red-300"
                        : "text-foreground/80 hover:text-primary"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="text-sm font-normal text-red-300/80">
                        {t("common.current")}
                      </span>
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex items-center gap-4"
              >
                <LanguageSwitcher />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-auto"
              >
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-full py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors"
                >
                  {t("common.getInTouch")}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
