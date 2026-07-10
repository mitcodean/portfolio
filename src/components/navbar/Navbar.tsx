"use client";

import Link from "next/link";
import { usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";

import { useState, useEffect } from "react";
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

  const isActive = (href: string) => {
    // Handle hash links
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      return pathname === path;
    }
    return pathname === href;
  };

  const navItems = [
    { label: t("nav.home"), href: `/${locale}` },
    { label: t("nav.services"), href: `/${locale}/#services` },
    { label: t("nav.about"), href: `/${locale}/#about` },
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
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm font-medium pb-1 transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-accent border-b-2 border-primary"
                      : "text-foreground hover:text-accent"
                  }`}
                >
                  {item.label}
                </Link>
              ))}

              <LanguageSwitcher />

              {/* CTA button */}
              <Link href={`/${locale}/#contact`}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 text-sm font-medium rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                >
                  {t("common.getInTouch")}
                </motion.button>
              </Link>
            </nav>

            {/* Mobile burger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground hover:border-primary/40 transition-colors"
              aria-label="Toggle menu"
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
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-[#0F172A] flex flex-col"
          >
            <div className="h-20 shrink-0" />

            <div className="flex flex-col px-8 py-10 gap-2 flex-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.25 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between py-4 border-b border-white/5 text-2xl font-semibold transition-colors duration-200 ${
                      isActive(item.href)
                        ? "text-primary"
                        : "text-foreground/80 hover:text-primary"
                    }`}
                  >
                    {item.label}
                    {isActive(item.href) && (
                      <span className="text-sm font-normal text-primary/60">
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
                  href={`/${locale}/#contact`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center w-full py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:bg-primary/90 transition-colors"
                >
                  {t("common.getInTouch")}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}