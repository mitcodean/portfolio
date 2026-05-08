"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

    const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
      },
    },
  };

  // CTA Projects Button
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen w-full bg-background flex items-center"
      style={{ background: "#0F172A" }}
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Bg-Hero.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          quality={90}
        />
        {/* Dark overlay so text stays readable — layered for depth */}
        <div className="absolute inset-0 bg-[#0F172A]/20" />
        {/* Extra gradient vignette: darker on left where text lives */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/80 via-[#0F172A]/40 to-transparent" /> */}
        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F172A] to-transparent" />
      </div>
      {/* ── Content ── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="max-w-4xl"
        >
          
          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-6"
          >
            <span className="bg-gradient-to-r from-foreground via-foreground to-support bg-clip-text text-transparent transition-all duration-500 cursor-default">
              Schaffen Sie eine
            </span>
            <br />
            <span className="text-primary transition-colors duration-300 cursor-default inline-block origin-left">
              digitale Präsenz,
            </span>
            <br />
            <span className="bg-gradient-to-r from-foreground to-support bg-clip-text text-transparent transition-all duration-500 cursor-default">
              die tatsächlich funktioniert.
            </span>
          </motion.h1>
          
          {/* Sub-copy */}
          <motion.p
            variants={itemVariants}
            className="text-neutral/80 text-lg sm:text-xl max-w-2xl mt-6 leading-relaxed transition-colors duration-300 cursor-default"
          >
            We design and develop solutions that turn visitors into customers.
            <br />
            <span className="text-support text-base hover:text-primary/80 transition-colors duration-300">
              Innovative Strategien. Maßgeschneiderte Technologie. Messbare Ergebnisse.
            </span>
          </motion.p>
          
          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-8 mt-12"
          >
            {/* Erster runder Button - Primär */}
            <Link
              href="#contact"
              className="group relative"
            >
              <Button className="relative text-sm font-medium rounded-full h-12 p-1 ps-6 pe-14 group transition-all duration-500 hover:ps-14 hover:pe-6 w-fit overflow-hidden cursor-pointer">
                <span className="relative z-10 transition-all duration-500">
                  Let's Collaborate
                </span>
                <div className="absolute right-1 w-10 h-10 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-44px)] group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </div>
            </Button>
              
            </Link>
            
            {/* Zweiter runder Button - Outline */}
            <Link
              href="#learn"
              className="group relative"
            >
              <Button
                ref={buttonRef}
                onMouseEnter={handleMouseEnter}
                variant="outline"
                className="relative overflow-hidden group px-6 py-3 h-auto rounded-full cursor-pointer border border-border transition-all duration-300"
              >
                <span
                  className={cn(
                    "absolute w-10 h-10 rounded-full scale-0 transition-transform duration-700 ease-in-out group-hover:scale-[15] pointer-events-none",
                    "bg-primary"
                  )}
                  style={{
                    left: pos.x - 20,
                    top: pos.y - 20,
                  }}
                />
                <span className="relative z-10 transition-colors duration-500 pointer-events-none group-hover:text-primary-foreground">
                  Projects
                </span>
              </Button>
            </Link>
          </motion.div>

        </motion.div>
      </div>
      
      
    </section>
  )
}