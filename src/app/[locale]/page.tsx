import { getMessages } from "@/lib/getMessages";
import type { Locale } from "@/lib/i18n";
import { ArrowRight, Sparkles, Code, Palette, Rocket } from "lucide-react";
import Link from "next/link";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getMessages(typedLocale);

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: locale === 'de' ? "Full-Stack Entwicklung" : "Full-Stack Development",
      description: locale === 'de'
        ? "Von Frontend bis Backend - komplette Lösungen"
        : "From frontend to backend - complete solutions",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: locale === 'de' ? "Modernes Design" : "Modern Design",
      description: locale === 'de'
        ? "Ästhetische und benutzerfreundliche Oberflächen"
        : "Aesthetic and user-friendly interfaces",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: locale === 'de' ? "Hohe Performance" : "High Performance",
      description: locale === 'de'
        ? "Optimierte Anwendungen für beste Geschwindigkeit"
        : "Optimized applications for best speed",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid" />
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-rose-400" />
            <span className="text-sm">
              {t.cta?.available || "Available for new projects"}
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mt-4">
            <span className="block text-zinc-300">Dean-Silviu</span>
            <span className="block bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              Mitco
            </span>
          </h1>

          <div className="mt-8">
            <h2 className="text-3xl md:text-4xl font-semibold">
              {t.hero?.title || "HTL Graduate & Full-Stack Developer"}
            </h2>
            <p className="mt-4 text-xl text-zinc-400 max-w-2xl">
              {t.hero?.subtitle || "I build modern web applications with focus on performance and UX."}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-12">
            <Link 
              href={`/${locale}/projects`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-full font-medium hover:from-rose-600 hover:to-pink-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-rose-500/20"
            >
              {t.cta?.view_projects || "View Projects"}
              <ArrowRight className="w-4 h-4" />
            </Link>
            
            <Link 
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-full font-medium hover:bg-zinc-700/50 transition-all duration-300"
            >
              {t.cta?.get_in_touch || "Get in Touch"}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-zinc-800/20">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-16">
            {locale === 'de' ? 'Was ich biete' : 'What I Offer'}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8 hover:border-rose-500/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-rose-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                  <div className="text-rose-400">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <Link 
              href={`/${locale}/about`}
              className="group bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-2xl p-8 hover:from-rose-500/20 hover:to-pink-500/20 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 group-hover:text-rose-300 transition-colors">
                {locale === 'de' ? 'Über mich' : 'About Me'}
              </h3>
              <p className="text-zinc-400 mb-6">
                {locale === 'de'
                  ? "Erfahren Sie mehr über meinen Werdegang und Fähigkeiten"
                  : "Learn more about my journey and skills"}
              </p>
              <ArrowRight className="w-5 h-5 text-rose-400 group-hover:translate-x-2 transition-transform" />
            </Link>

            <Link 
              href={`/${locale}/projects`}
              className="group bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-2xl p-8 hover:from-rose-500/20 hover:to-pink-500/20 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 group-hover:text-rose-300 transition-colors">
                {locale === 'de' ? 'Projekte' : 'Projects'}
              </h3>
              <p className="text-zinc-400 mb-6">
                {locale === 'de'
                  ? "Entdecken Sie meine bisherigen Arbeiten"
                  : "Discover my previous work"}
              </p>
              <ArrowRight className="w-5 h-5 text-rose-400 group-hover:translate-x-2 transition-transform" />
            </Link>

            <Link 
              href={`/${locale}/contact`}
              className="group bg-gradient-to-br from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-2xl p-8 hover:from-rose-500/20 hover:to-pink-500/20 transition-all duration-300"
            >
              <h3 className="text-2xl font-bold mb-4 group-hover:text-rose-300 transition-colors">
                {locale === 'de' ? 'Kontakt' : 'Contact'}
              </h3>
              <p className="text-zinc-400 mb-6">
                {locale === 'de'
                  ? "Treten Sie mit mir in Kontakt für Ihr Projekt"
                  : "Get in touch with me for your project"}
              </p>
              <ArrowRight className="w-5 h-5 text-rose-400 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}