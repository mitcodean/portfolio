"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, useReducedMotion, type Variants } from "motion/react";
import { ArrowUpRight, Pause, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticText } from "@/components/ui/morphing-cursor";
import { Link } from "@/i18n/navigation";
import { routePath } from "@/config/site";
import { CALENDLY_BOOKING_URL } from "@/config/diovis";
import type { SiteLocale } from "@/content/services";

type Labels = {
  headlineStart: string; headlineStartHover: string; headlineMiddle: string;
  headlineEnd: string; headlineEndHover: string; subtitle: string; mobileSubtitle: string; vision: string;
  cta: string; secondary: string; newTab: string; pauseVideo: string; playVideo: string;
};

// Layout, background, spring entrance, magnetic words and sliding circular CTA
// are restored from efd4458b, with the current routes and booking destination.
export default function HeroContent({ locale, labels }: { locale: SiteLocale; labels: Labels }) {
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (inView && !reducedMotion) void controls.start("visible");
  }, [controls, inView, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) video.current?.pause();
  }, [reducedMotion]);

  const container: Variants = {
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const item: Variants = {
    visible: {
      opacity: [0, 1], x: [-40, 0],
      transition: { type: "spring", damping: 15, stiffness: 120 },
    },
  };

  return (
    <section ref={ref} aria-labelledby="home-title" className="relative flex min-h-screen w-full items-center bg-background py-28 sm:py-32" style={{ background: "#0F172A" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <video ref={video} autoPlay={!reducedMotion} muted loop playsInline preload="none" className="diovis-hero-video h-full w-full object-cover">
          <source src="/flow-animation.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#0F172A]/20" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0F172A] to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Visible server HTML remains available before hydration or without JavaScript. */}
        <motion.div variants={container} initial={false} animate={controls}>
          <motion.h1 id="home-title" variants={item} className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl">
            <span className="cursor-default text-foreground transition-colors duration-500">
              &quot;<MagneticText text={labels.headlineStart} hoverText={labels.headlineStartHover} />
              {labels.headlineMiddle}
              <MagneticText text={labels.headlineEnd} hoverText={labels.headlineEndHover} />.&quot;
            </span>
          </motion.h1>

          <motion.p variants={item} className="mt-6 max-w-2xl cursor-default text-lg leading-relaxed text-neutral/80 transition-colors duration-300 sm:text-xl">
            <span className="sm:hidden">{labels.mobileSubtitle}</span>
            <span className="hidden sm:inline">{labels.subtitle}<br /><br /></span>
          </motion.p>

          <motion.p variants={item} className="mt-6 hidden sm:block">
            <span className="inline-block origin-left cursor-default text-4xl text-support duration-300 sm:text-5xl">{labels.vision}</span>
          </motion.p>

          <motion.div variants={item} className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
            <Button
              render={<a href={CALENDLY_BOOKING_URL} target="_blank" rel="noopener noreferrer" />}
              nativeButton={false}
              role="link"
              aria-label={labels.cta + " (" + labels.newTab + ")"}
              className="group relative h-12 w-fit cursor-pointer overflow-hidden rounded-full p-1 ps-6 pe-14 text-sm font-medium text-white transition-all duration-500 hover:ps-14 hover:pe-6"
            >
              <span className="relative z-10 transition-all duration-500">{labels.cta}</span>
              <span className="absolute right-1 flex h-10 w-10 items-center justify-center rounded-full bg-background text-foreground transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                <ArrowUpRight size={16} aria-hidden="true" />
              </span>
            </Button>
            <Button
              render={<Link locale={locale} href={routePath("examples", locale)} prefetch={false} />}
              nativeButton={false}
              role="link"
              variant="outline"
              className="relative h-12 w-fit cursor-pointer rounded-full border-border bg-background/40 px-6 text-sm font-medium text-foreground transition-all duration-300 hover:border-support hover:bg-muted"
            >
              {labels.secondary}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {!reducedMotion && <button
        type="button"
        aria-label={paused ? labels.playVideo : labels.pauseVideo}
        onClick={() => {
          const element = video.current;
          if (!element) return;
          if (element.paused) {
            void element.play().then(() => setPaused(false)).catch(() => setPaused(true));
          } else {
            element.pause(); setPaused(true);
          }
        }}
        className="absolute bottom-4 right-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/15 bg-background/80 text-neutral hover:text-foreground"
      >
        {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
      </button>}
    </section>
  );
}
