"use client";

import { useRef } from "react";
import { motion, useInView} from "framer-motion";
import Link from "next/link";
import { ArrowUpRight,TrendingUp, ShieldCheck, Users, Compass,BadgeCheck,Gauge,Building2,Target,Sparkles,Layers3, Gem, Handshake} from "lucide-react";
import Image from "next/image";

import TiltCard from "@/components/ui/tilt-card";

const FONT_STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,300;1,8..60,400&family=DM+Sans:wght@300;400;500&display=swap');
`;

const fadeUp = (delay = 0) => ({
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94], delay } },
});

const traits = [
  {
    icon: Compass,
    title: "Klare Lösungen statt Komplexität",
    text: "Wir glauben an digitale Lösungen, die verständlich, effizient und langfristig wartbar sind."
    },
  {
    icon: Users,
    title: "Persönliche Zusammenarbeit",
    text: "Direkte Ansprechpartner und ehrliche Kommunikation. Wir begleiten Projekte partnerschaftlich und denken langfristig statt nur bis zum Launch."
    },
  {
    icon: ShieldCheck,
    title: "Qualität bis ins Detail",
    text: "Von Performance und Sicherheit bis zur Benutzerführung – jedes Detail wird bewusst geplant, getestet und kontinuierlich verbessert."
    },
  {
    icon: TrendingUp,
    title: "Mit Blick auf Wachstum",
    text: "Wir entwickeln Lösungen, die nicht nur heute funktionieren, sondern auch morgen mit Ihrem Unternehmen wachsen können."
    },
];

// Triangle SVG mark — brand motif
function TriangleMark({ size = 40, opacity = 0.08 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size * 1.15} viewBox="0 0 40 46" fill="none" style={{ opacity }}>
      <polygon points="20,2 38,44 2,44" fill="#B22222" />
    </svg>
  );
}

export default function AboutPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const scrollRef = useRef(null);

  return (
    <>
      <style>{FONT_STYLE}</style>
      <section
        ref={ref}
        id="about"
        className="bg-background py-28 relative overflow-hidden"
      >
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section label — large, uppercase, editorial */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="mb-14 relative"
          >
            {/* Decorative triangle marks */}
            <div className="w-full h-full bg-primary absolute pointer-events-none rounded-xl"/>
            <div className="w-0 h-0 border-solid border-t-0 border-r-[350px] border-l-0 border-b-[350px] border-l-transparent border-r-primary border-t-transparent border-b-transparent right-0 top-0 absolute pointer-events-none rounded-xl"/>
            
            <div className="relative inline-block">
              <h2
                className="relative text-4xl sm:text-5xl font-bold uppercase tracking-[0.2em]"
                style={{ fontFamily: "'DM Sans', sans-serif", zIndex: 1 }}
              >
                <span className="text-secondary">Über uns</span>
              </h2>
            </div>
          </motion.div>

          {/* Main grid */}
          <div ref={scrollRef} className="grid lg:grid-cols-2 gap-16 items-start">

            {/* LEFT — copy */}
            <div className="space-y-8">

              {/* Editorial subheadline — Source Serif 4 */}
              <motion.h2
                variants={fadeUp(0.05)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="leading-[1.1]"
                style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
              >
                <span className="block text-2xl sm:text-4xl font-light text-foreground">Wir bauen,</span>
                <span className="block text-2xl sm:text-4xl font-light italic">
                  sie{" "}
                  <span className="relative inline-block text-primary">
                    profitieren.
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : {}}
                      transition={{ delay: 0.7, duration: 0.55, ease: "easeOut" }}
                      className="absolute left-0 -bottom-1 h-[2px] w-full bg-primary/35 origin-left rounded-full"
                    />
                  </span>
                </span>
              </motion.h2>

              <motion.div
                variants={fadeUp(0.12)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="space-y-5 leading-relaxed"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <p className="text-lg text-neutral/90">
                  Diovis ist eine Ein-Mann-Agentur, gegründet mit einer klaren Überzeugung:{" "}
                  <span className="text-foreground font-medium">
                    jedes Unternehmen hat das Recht auf eine individuelle Softwarelösung.
                  </span>
                </p>
                <p className="text-support">
                  Wir bauen Werkzeuge, die Zeit freisetzen — damit du dich auf das konzentrieren kannst, was wirklich zählt.
                </p>
                {/* Editorial quote — Source Serif 4 italic */}
                <blockquote
                  className="border-l-2 border-primary/40 pl-5 py-1 mt-2"
                  style={{ fontFamily: "'Source Serif 4', Georgia, serif" }}
                >
                  <p className="text-xl font-light italic text-foreground/60 leading-snug">
                    „Man kann keine neuen Ozeane entdecken, wenn man nicht den Mut hat, die Küste aus den Augen zu verlieren."
                  </p>
                  <footer className="mt-2 text-xs uppercase tracking-widest text-support/50"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}>
                    André Gide
                  </footer>
                </blockquote>
              </motion.div>

              {/* CTA */}
              <motion.div variants={fadeUp(0.18)} initial="hidden" animate={inView ? "visible" : "hidden"}>
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors duration-200"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  Mehr über uns erfahren
                  <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </Link>
              </motion.div>

              {/* Traits grid */}
              <motion.div
                variants={fadeUp(0.22)}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid sm:grid-cols-2 gap-4 pt-4"
              >
                {traits.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="group p-5 rounded-xl border border-border bg-muted/40 hover:border-primary/30 hover:bg-primary/5 transition-all duration-200 cursor-default relative overflow-hidden"
                  >
                    {/* Tiny triangle accent on hover */}
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                        <polygon points="28,0 28,28 0,0" fill="#B22222" opacity="0.15" />
                      </svg>
                    </div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon size={15} className="text-primary" />
                      </div>
                      <p className="text-sm font-semibold text-foreground"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}>{title}</p>
                    </div>
                    <p className="text-xs text-support leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}>{text}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              variants={fadeUp(0.1)}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative hidden lg:block"
              style={{ height: 580 }}
            >
              {/* Photo frame */}
              <motion.div
                className="absolute left-4 top-0 w-[78%]"
              >
                <TiltCard>
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40 aspect-[3/4] bg-muted">
                    <Image
                      src="/dean.jpg"
                      alt="Dean Silviu Mitco"
                      fill
                      className="object-cover object-top rounded-2xl overflow-hidden"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" />

                    
                    <div className="absolute bottom-4 left-4 right-4 px-4 py-3 rounded-xl bg-[#0F172A]/80 border border-white/10 backdrop-blur-sm">
                      <p
                        className="text-xs font-bold text-foreground"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        Dean-Silviu Mitco
                      </p>

                      <p
                        className="text-[10px] text-primary mt-0.5"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          letterSpacing: "0.1em",
                        }}
                      >
                        FOUNDER & DEVELOPER
                      </p>
                    </div>

                  </div>
                </TiltCard>
              </motion.div>
              
            </motion.div>
            
          </div>
        </div>
      </section>
    </>
  );
}
