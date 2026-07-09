"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } },
});

export default function PortfolioPage() {
  const t = useTranslations("portfolio");
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const projects = [
    {
      id: 1,
      title: "E-Commerce Plattform",
      description: "Moderne E-Commerce-Lösung mit Next.js, Stripe und PostgreSQL",
      tags: ["Next.js", "TypeScript", "Stripe", "Tailwind", "PostgreSQL"],
      image: "/projects/ecommerce.jpg",
      demoLink: "#",
      githubLink: "#",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Produktive Aufgabenverwaltung mit Echtzeit-Updates",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      image: "/projects/taskapp.jpg",
      demoLink: "#",
      githubLink: "#",
      featured: true,
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "Responsive Portfolio mit internationaler Unterstützung",
      tags: ["Next.js", "i18n", "Framer Motion", "Vercel"],
      image: "/projects/portfolio.jpg",
      demoLink: "#",
      githubLink: "#",
      featured: false,
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "Wetter-App mit detaillierten Vorhersagen und Karten",
      tags: ["React", "API", "Chart.js", "Geolocation"],
      image: "/projects/weather.jpg",
      demoLink: "#",
      githubLink: "#",
      featured: false,
    },
    {
      id: 5,
      title: "Blog Platform",
      description: "Content-Management-System für Blogging",
      tags: ["Next.js", "Sanity.io", "SSG", "SEO"],
      image: "/projects/blog.jpg",
      demoLink: "#",
      githubLink: "#",
      featured: false,
    },
    {
      id: 6,
      title: "Fitness Tracker",
      description: "Mobile App für Fitness-Tracking und -Analyse",
      tags: ["React Native", "Firebase", "Charts", "Push Notifications"],
      image: "/projects/fitness.jpg",
      demoLink: "#",
      githubLink: "#",
      featured: false,
    },
  ];

  return (
    <main className="bg-background min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div ref={ref} className="text-center mb-16">
          <motion.h1 
            variants={fadeUp(0)} 
            initial="hidden" 
            animate={inView ? "visible" : "hidden"}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("title")}
            </span>
          </motion.h1>
          <motion.p 
            variants={fadeUp(0.08)} 
            initial="hidden" 
            animate={inView ? "visible" : "hidden"}
            className="text-xl text-support max-w-2xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <motion.h2 
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-3xl font-bold mb-8 flex items-center gap-3"
          >
            <div className="w-2 h-8 bg-primary rounded-full" />
            {t("featured")}
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects
              .filter(project => project.featured)
              .map((project, i) => (
                <motion.div 
                  key={project.id}
                  variants={fadeUp(0.12 + i * 0.08)}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="group bg-muted/30 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:scale-[1.02]"
                >
                  {/* Project Image */}
                  <div className="h-56 bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl opacity-20">🚀</span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-background/80 text-xs rounded-full border border-border text-support">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-support mb-6">
                      {project.description}
                    </p>
                    
                    <div className="flex gap-4">
                      <Link 
                        href={project.demoLink}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-foreground rounded-lg font-medium hover:bg-accent transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t("view")}
                      </Link>
                      
                      <Link 
                        href={project.githubLink}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-muted/50 border border-border text-support rounded-lg font-medium hover:border-primary/30 hover:text-foreground transition-all duration-300"
                      >
                        <Github className="w-4 h-4" />
                        {t("source")}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <div className="mb-16">
          <motion.h2 
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="text-3xl font-bold mb-8 flex items-center gap-3"
          >
            <div className="w-2 h-8 bg-primary rounded-full" />
            {t("allProjects")}
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter(project => !project.featured)
              .map((project, i) => (
                <motion.div 
                  key={project.id}
                  variants={fadeUp(0.22 + i * 0.06)}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  className="group bg-muted/30 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300"
                >
                  <div className="h-40 bg-gradient-to-br from-primary/10 to-accent/10 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl opacity-20">💻</span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-support text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="px-2 py-1 bg-muted/30 text-support rounded text-xs border border-border/30">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3">
                        <Link href={project.demoLink} className="text-support hover:text-primary transition-colors" title="Live Demo">
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <Link href={project.githubLink} className="text-support hover:text-primary transition-colors" title="Source Code">
                          <Github className="w-4 h-4" />
                        </Link>
                      </div>
                      <ArrowRight className="w-4 h-4 text-support/50 group-hover:text-primary transition-colors" />
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          variants={fadeUp(0.3)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">
              {t("cta")}
            </h2>
            <p className="text-xl text-support mb-8 max-w-2xl mx-auto">
              {t("ctaSub")}
            </p>
            <Link 
              href="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-primary text-foreground rounded-full font-semibold hover:bg-accent transition-all duration-300 transform hover:scale-105"
            >
              {t("ctaButton")}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}