"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useAnimation, useReducedMotion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { activeRoute, MAIN_NAVIGATION, routePath } from "@/config/site";
import { CALENDLY_BOOKING_URL } from "@/config/diovis";
import type { SiteCopy } from "@/content/site";
import type { SiteLocale } from "@/content/services";

function subscribeScroll(notify: () => void) {
  window.addEventListener("scroll", notify, { passive: true });
  return () => window.removeEventListener("scroll", notify);
}
const scrollSnapshot = () => window.scrollY > 20;
const serverSnapshot = () => false;

type Labels = SiteCopy["navigation"] & { current: string; newTab: string };

export default function Navbar({ locale, labels }: { locale: SiteLocale; labels: Labels }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeScroll, scrollSnapshot, serverSnapshot);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!reducedMotion) void controls.start({
      y: [-40, 0], opacity: [0, 1],
      transition: { duration: 0.5, ease: "easeOut" },
    });
  }, [controls, reducedMotion]);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const background = [document.getElementById("main-content"), document.querySelector("footer")];
    const previousInert = background.map(element => element?.inert);
    document.body.style.overflow = "hidden";
    background.forEach(element => { if (element) element.inert = true; });
    const button = toggle.current;
    menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") { setMenuOpen(false); return; }
      if (event.key !== "Tab") return;
      const elements = [
        button,
        ...Array.from(menu.current?.querySelectorAll<HTMLElement>('a[href], button, select, [tabindex="0"]') ?? []),
      ].filter((element): element is HTMLElement => element !== null && !element.hasAttribute("disabled"));
      const first = elements[0];
      const last = elements.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    }
    window.addEventListener("keydown", keydown);
    return () => {
      window.removeEventListener("keydown", keydown);
      document.body.style.overflow = previousOverflow;
      background.forEach((element, index) => { if (element) element.inert = previousInert[index] ?? false; });
      button?.focus();
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const resize = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener("change", resize);
    return () => desktop.removeEventListener("change", resize);
  }, []);

  const bookingLabel = labels.book + " (" + labels.newTab + ")";
  const bookingClass = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent";

  return (
    <>
      <motion.header
        initial={false}
        animate={controls}
        data-scrolled={scrolled}
        className={"fixed top-0 z-50 w-full transition-all duration-300 " + (scrolled
          ? "border-b border-white/10 bg-[#0F172A]/90 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent backdrop-blur-md")}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className={"flex items-center justify-between gap-3 transition-all duration-300 " + (scrolled ? "h-14" : "h-20")}>
            <Link locale={locale} href="/" prefetch={false} aria-label="Diovis" className="flex shrink-0 items-center gap-2 text-lg font-semibold text-foreground transition hover:text-accent">
              <Image src="/logo-diovis.svg" alt="" width={40} height={40} className="h-auto w-10 object-contain mix-blend-screen" />
              DIOVIS
            </Link>
            <nav aria-label={labels.label} className="hidden items-center gap-5 lg:flex xl:gap-8">
              {MAIN_NAVIGATION.map(key => <Link
                key={key}
                locale={locale}
                href={routePath(key, locale)}
                prefetch={false}
                aria-current={activeRoute(key, pathname) ? "page" : undefined}
                className={"relative border-b-2 pb-1 text-sm font-medium transition-colors duration-200 " + (activeRoute(key, pathname)
                  ? "border-red-400/60 text-red-300"
                  : "border-transparent text-foreground hover:text-accent")}
              >{labels[key]}</Link>)}
              <LanguageSwitcher />
              <a href={CALENDLY_BOOKING_URL} target="_blank" rel="noopener noreferrer" aria-label={bookingLabel} className={bookingClass}>
                {labels.book}<ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </nav>
            <motion.button
              ref={toggle}
              type="button"
              whileTap={reducedMotion ? undefined : { scale: 0.9 }}
              onClick={() => setMenuOpen(open => !open)}
              className="flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-foreground transition-colors hover:border-primary/40 lg:hidden"
              aria-label={menuOpen ? labels.close : labels.menu}
              aria-expanded={menuOpen}
              aria-controls={menuOpen ? "mobile-navigation" : undefined}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? "close" : "open"}
                  initial={{ rotate: reducedMotion ? 0 : menuOpen ? -45 : 45, opacity: reducedMotion ? 1 : 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: reducedMotion ? 0 : 45, opacity: reducedMotion ? 1 : 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.15 }}
                >
                  {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && <motion.div
          ref={menu}
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label={labels.label}
          initial={{ opacity: reducedMotion ? 1 : 0, clipPath: reducedMotion ? "none" : "inset(0 0 100% 0)" }}
          animate={{ opacity: 1, clipPath: reducedMotion ? "none" : "inset(0 0 0% 0)" }}
          exit={{ opacity: reducedMotion ? 1 : 0, clipPath: reducedMotion ? "none" : "inset(0 0 100% 0)", pointerEvents: "none" }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-40 flex flex-col bg-[#0F172A]"
        >
          <div className={(scrolled ? "h-14" : "h-20") + " shrink-0 transition-all duration-300"} />
          <nav aria-label={labels.label} className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-6 py-5 sm:px-8 sm:py-8">
            {MAIN_NAVIGATION.map((key, index) => <motion.div
              key={key}
              initial={{ opacity: reducedMotion ? 1 : 0, x: reducedMotion ? 0 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.05 * index, duration: reducedMotion ? 0 : 0.25 }}
            >
              <Link
                locale={locale}
                href={routePath(key, locale)}
                prefetch={false}
                onClick={() => setMenuOpen(false)}
                aria-current={activeRoute(key, pathname) ? "page" : undefined}
                className={"flex items-center justify-between gap-3 border-b py-4 text-2xl font-semibold transition-colors duration-200 " + (activeRoute(key, pathname)
                  ? "border-red-400/60 text-red-300"
                  : "border-white/5 text-foreground/80 hover:text-primary")}
              >
                {labels[key]}
                {activeRoute(key, pathname) && <span className="shrink-0 text-sm font-normal text-red-300/80">{labels.current}</span>}
              </Link>
            </motion.div>)}
            <motion.div initial={{ opacity: reducedMotion ? 1 : 0 }} animate={{ opacity: 1 }} transition={{ delay: reducedMotion ? 0 : 0.3 }} className="mb-6 mt-8 flex items-center gap-4">
              <LanguageSwitcher />
            </motion.div>
            <motion.div initial={{ opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 0.35 }} className="mt-auto">
              <a href={CALENDLY_BOOKING_URL} target="_blank" rel="noopener noreferrer" aria-label={bookingLabel} onClick={() => setMenuOpen(false)} className={bookingClass + " w-full py-4"}>
                {labels.book}<ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </motion.div>
          </nav>
        </motion.div>}
      </AnimatePresence>
    </>
  );
}
