import { getMessages } from "@/lib/getMessages";
import type { Locale } from "@/lib/i18n";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ProjectsPage({ params }: Props) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getMessages(typedLocale);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Plattform",
      description: locale === 'de' 
        ? "Moderne E-Commerce-Lösung mit Next.js, Stripe und PostgreSQL"
        : "Modern e-commerce solution with Next.js, Stripe and PostgreSQL",
      tags: ["Next.js", "TypeScript", "Stripe", "Tailwind"],
      image: "/projects/ecommerce.jpg",
      demoLink: "https://demo.example.com",
      githubLink: "https://github.com/username/project",
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description: locale === 'de'
        ? "Produktive Aufgabenverwaltung mit Echtzeit-Updates"
        : "Productive task management with real-time updates",
      tags: ["React", "Node.js", "Socket.io", "MongoDB"],
      image: "/projects/taskapp.jpg",
      demoLink: "https://taskapp.example.com",
      githubLink: "https://github.com/username/taskapp",
      featured: true,
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: locale === 'de'
        ? "Responsive Portfolio mit internationaler Unterstützung"
        : "Responsive portfolio with international support",
      tags: ["Next.js", "i18n", "Framer Motion", "Vercel"],
      image: "/projects/portfolio.jpg",
      demoLink: "https://portfolio.example.com",
      githubLink: "https://github.com/username/portfolio",
      featured: false,
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: locale === 'de'
        ? "Wetter-App mit detaillierten Vorhersagen und Karten"
        : "Weather app with detailed forecasts and maps",
      tags: ["React", "API", "Chart.js", "Geolocation"],
      image: "/projects/weather.jpg",
      demoLink: "https://weather.example.com",
      githubLink: "https://github.com/username/weather",
      featured: false,
    },
    {
      id: 5,
      title: "Blog Platform",
      description: locale === 'de'
        ? "Content-Management-System für Blogging"
        : "Content management system for blogging",
      tags: ["Next.js", "Sanity.io", "SSG", "SEO"],
      image: "/projects/blog.jpg",
      demoLink: "https://blog.example.com",
      githubLink: "https://github.com/username/blog",
      featured: false,
    },
    {
      id: 6,
      title: "Fitness Tracker",
      description: locale === 'de'
        ? "Mobile App für Fitness-Tracking und -Analyse"
        : "Mobile app for fitness tracking and analysis",
      tags: ["React Native", "Firebase", "Charts", "Push Notifications"],
      image: "/projects/fitness.jpg",
      demoLink: "https://fitness.example.com",
      githubLink: "https://github.com/username/fitness",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 pt-24 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              {t.projects?.title || "Projects"}
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            {t.projects?.subtitle || "A selection of my work"}
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <div className="w-2 h-8 bg-rose-500 rounded-full" />
            {locale === 'de' ? 'Herausragende Projekte' : 'Featured Projects'}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects
              .filter(project => project.featured)
              .map((project) => (
                <div 
                  key={project.id}
                  className="group bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-2xl overflow-hidden hover:border-rose-500/50 transition-all duration-500 hover:scale-[1.02]"
                >
                  {/* Project Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-rose-500/20 to-pink-500/20 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-4xl opacity-20">📱</div>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-rose-300 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-zinc-400 mb-6">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 bg-zinc-800/50 text-zinc-300 rounded-full text-sm border border-zinc-700/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4">
                      <a 
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-lg font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {t.projects?.view || "View Project"}
                      </a>
                      
                      <a 
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-zinc-800/50 border border-zinc-700 text-zinc-300 rounded-lg font-medium hover:bg-zinc-700/50 hover:border-zinc-600 transition-all duration-300"
                      >
                        <Github className="w-4 h-4" />
                        {t.projects?.source || "Source Code"}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* All Projects Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <div className="w-2 h-8 bg-rose-500 rounded-full" />
            {locale === 'de' ? 'Alle Projekte' : 'All Projects'}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter(project => !project.featured)
              .map((project) => (
                <div 
                  key={project.id}
                  className="group bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-xl overflow-hidden hover:border-rose-500/30 transition-all duration-300"
                >
                  <div className="h-40 bg-gradient-to-br from-rose-500/10 to-pink-500/10 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-3xl opacity-20">💻</div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-rose-300 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span 
                          key={tag}
                          className="px-2 py-1 bg-zinc-800/30 text-zinc-300 rounded text-xs border border-zinc-700/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3">
                        <a 
                          href={project.demoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-rose-400 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <a 
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-zinc-400 hover:text-rose-400 transition-colors"
                          title="Source Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-rose-400 transition-colors" />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">
              {locale === 'de' 
                ? 'Haben Sie ein Projekt im Sinn?' 
                : 'Have a project in mind?'}
            </h2>
            <p className="text-xl text-zinc-400 mb-8 max-w-2xl mx-auto">
              {locale === 'de'
                ? "Lassen Sie uns gemeinsam etwas Großartiges schaffen!"
                : "Let's build something amazing together!"}
            </p>
            <a 
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-semibold hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              {locale === 'de' ? 'Projekt besprechen' : 'Discuss Project'}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}