"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  ArrowUpRight,
  Check,
  ShoppingCart,
  Calendar,
  Languages,
  Search,
  MapPin,
  Zap,
  Shield,
  Users,
  Clock,
} from "lucide-react";
import Link from "next/link";

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94], delay } },
});

export default function ServicesPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="services" className="bg-background py-24 relative overflow-hidden">

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24">

        {/*1. Hero statement*/}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-primary uppercase tracking-[0.2em] mb-3">
            Leistungen
          </h2>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight max-w-2xl mb-4">
            Digitale Lösungen für Betriebe
          </h2>
          <p className="text-support text-lg max-w-xl leading-relaxed">
            Ich unterstütze Unternehmen ihre <span className="text-neutral"> Prozesse zu optimieren </span> und ihre Online-Präsenz zu stärken.{" "}
            Von der Website-Erstellung über Online-Shops bis hin zu maßgeschneiderten Softwarelösungen sind Teil dieses Ansatzes.
          </p>
        </motion.div>

        {/* Automatisierung ersetzt das Alltägliche, nicht das Sinnvolle*/}
        {/* "Automation is cost-cutting by tightening the corners and not cutting them." */}

        

      </div>
    </section>
  );
}
