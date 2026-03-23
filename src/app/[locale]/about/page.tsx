import { getMessages } from "@/lib/getMessages";
import type { Locale } from "@/lib/i18n";
import { Calendar, Code, Globe, Target, Award, Users } from "lucide-react";
import Image from "next/image";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getMessages(typedLocale);

  const skills = [
    { name: "Basic Web Programming Languages", level: 100 },
    { name: "TypeScript", level: 90 },
    { name: "React/Next.js", level: 85 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Node.js", level: 80 },
    { name: "C#", level: 85 },
    { name: "MQTT", level: 68 },
    { name: "Microsoft SQL", level: 75 },
  ];

  const timeline = [
    {
      year: "2025 - Heute",
      title: locale === 'de' ? "Sotfwareentwickler" : "Software Developer",
      description: locale === 'de' 
        ? "Entwicklung von Lagerlogistiksysteme und Automatisierung von Mühlen"
        : "Development of warehouse logistics systems and automation of mills",
    },
    {
      year: "2023",
      title: locale === 'de' ? "Praktikum bei ISW GmbH" : "Internship at ISW GmbH",
      description: locale === 'de'
        ? "MAUI App zur auswertung von Reisezeiten Integration odoo Zeitstempel via API"
        : "MAUI app for evaluating travel times; integration of Odoo timestamps via API",
    },
    {
      year: "2023",
      title: locale === 'de' ? "Praktikum bei ENGEL AUSTRIA GmbH" : "Internship at ENGEL AUSTRIA GmbH",
      description: locale === 'de'
        ? "Robotertechnik und Toolsprogrammierung"
        : "Robotics and tool programming",
    },
    {
      year: "2020 - 2025",
      title: "HTL Steyr",
      description: locale === 'de'
        ? "Abschluss in Informationstechnologie mit Schwerpunkt auf Netzwerktechnik"
        : "Degree in Information Technology with a focus on Network Technology",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 pt-24 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              {t.about?.title || "About Me"}
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            {locale === 'de' 
              ? "Passionierter Full-Stack Entwickler mit Fokus auf moderne Webtechnologien und herausragende Benutzererfahrung"
              : "Passionate Full-Stack Developer focused on modern web technologies and outstanding user experience"}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Profile Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">
                {locale === 'de' ? 'Meine Geschichte' : 'My Story'}
              </h2>
              <div className="space-y-4 text-zinc-300">
                <p>
                  {locale === 'de'
                    ? "Als HTL-Absolvent mit Spezialisierung auf Informatik habe ich fundierte Kenntnisse in Softwareentwicklung erworben. Meine Leidenschaft gilt der Erstellung moderner, performanter Webanwendungen, die nicht nur gut aussehen, sondern auch effizient funktionieren."
                    : "As an HTL graduate specializing in computer science, I've acquired solid knowledge in software development. My passion lies in creating modern, performant web applications that not only look good but also function efficiently."}
                </p>
                <p>
                  {locale === 'de'
                    ? "Ich glaube an clean code, Best Practices und kontinuierliches Lernen. Jedes Projekt ist eine neue Herausforderung, die ich mit Begeisterung angehe."
                    : "I believe in clean code, best practices, and continuous learning. Every project is a new challenge that I approach with enthusiasm."}
                </p>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-8">
                <Code className="w-6 h-6 text-rose-400" />
                <h2 className="text-2xl font-semibold">
                  {locale === 'de' ? 'Technische Fähigkeiten' : 'Technical Skills'}
                </h2>
              </div>
              
              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-zinc-300">{skill.name}</span>
                      <span className="text-rose-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats & Timeline */}
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-6">
                {locale === 'de' ? 'Auf einen Blick' : 'At a Glance'}
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-500/10 rounded-lg flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">
                      {locale === 'de' ? 'Erfahrung' : 'Experience'}
                    </p>
                    <p className="text-2xl font-bold">2+ {locale === 'de' ? 'Jahre' : 'Years'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-500/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">
                      {locale === 'de' ? 'Projekte' : 'Projects'}
                    </p>
                    <p className="text-2xl font-bold">15+</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-500/10 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400">
                      {locale === 'de' ? 'Sprachen' : 'Languages'}
                    </p>
                    <p className="text-2xl font-bold">3</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-rose-400" />
                <h3 className="text-xl font-semibold">
                  {locale === 'de' ? 'Werdegang' : 'Journey'}
                </h3>
              </div>
              
              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <div key={index} className="relative pl-8 pb-6 last:pb-0">
                    <div className="absolute left-0 top-1 w-3 h-3 bg-rose-500 rounded-full" />
                    {index < timeline.length - 1 && (
                      <div className="absolute left-[5px] top-4 w-0.5 h-full bg-zinc-700" />
                    )}
                    <div>
                      <p className="text-sm text-rose-400 font-medium">{item.year}</p>
                      <h4 className="text-lg font-semibold mt-1">{item.title}</h4>
                      <p className="text-zinc-400 text-sm mt-1">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-2xl p-8 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <Users className="w-8 h-8 text-rose-400" />
            <h2 className="text-2xl font-semibold">
              {locale === 'de' ? 'Meine Philosophie' : 'My Philosophy'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-rose-300">
                {locale === 'de' ? 'Qualität' : 'Quality'}
              </h3>
              <p className="text-zinc-300">
                {locale === 'de'
                  ? "Jede Codezeile zählt. Ich strebe nach Exzellenz in jedem Projekt."
                  : "Every line of code matters. I strive for excellence in every project."}
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-rose-300">
                {locale === 'de' ? 'Innovation' : 'Innovation'}
              </h3>
              <p className="text-zinc-300">
                {locale === 'de'
                  ? "Immer auf dem neuesten Stand mit den besten Technologien und Praktiken."
                  : "Always up-to-date with the latest technologies and best practices."}
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-rose-300">
                {locale === 'de' ? 'Zusammenarbeit' : 'Collaboration'}
              </h3>
              <p className="text-zinc-300">
                {locale === 'de'
                  ? "Transparente Kommunikation und enge Zusammenarbeit mit Kunden."
                  : "Transparent communication and close collaboration with clients."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}