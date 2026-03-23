import { getMessages } from "@/lib/getMessages";
import type { Locale } from "@/lib/i18n";
import { Mail, Phone, MapPin, Send } from "lucide-react";

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getMessages(typedLocale);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 pt-24 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              {t.contact.title}
            </span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form */}
          <div className="space-y-8">
            <div className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <Send className="w-6 h-6 text-rose-400" />
                {locale === 'de' ? 'Schreiben Sie mir' : 'Send me a message'}
              </h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                    {t.contact.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                    placeholder={locale === 'de' ? "Ihr Name" : "Your name"}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                    {t.contact.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                    placeholder={locale === 'de' ? "ihre@email.com" : "your@email.com"}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-zinc-300 mb-2">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder={locale === 'de' ? "Ihre Nachricht..." : "Your message..."}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-lg hover:from-rose-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {t.contact.send}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-2xl p-8">
              <h2 className="text-2xl font-semibold mb-6">
                {locale === 'de' ? 'Kontaktinformationen' : 'Contact Information'}
              </h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4 p-4 bg-zinc-800/20 rounded-xl hover:bg-zinc-800/40 transition-all duration-300">
                  <div className="w-12 h-12 bg-rose-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">
                      {locale === 'de' ? 'E-Mail' : 'Email'}
                    </p>
                    <a 
                      href="mailto:mitco.deansilviu@gmail.com"
                      className="text-lg hover:text-rose-400 transition-colors break-all"
                    >
                      mitco.deansilviu@gmail.com
                    </a>
                    <p className="text-zinc-500 text-sm mt-2">
                      {locale === 'de' 
                        ? 'Antwort innerhalb von 24 Stunden' 
                        : 'Response within 24 hours'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-zinc-800/20 rounded-xl hover:bg-zinc-800/40 transition-all duration-300">
                  <div className="w-12 h-12 bg-rose-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">
                      {t.contact.phone}
                    </p>
                    <a 
                      href="tel:+436649494891"
                      className="text-lg hover:text-rose-400 transition-colors"
                    >
                      +43 664 9494891
                    </a>
                    <p className="text-zinc-500 text-sm mt-2">
                      {locale === 'de' 
                        ? 'Mo-Fr: 9:00 - 18:00 Uhr' 
                        : 'Mon-Fri: 9:00 AM - 6:00 PM'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-zinc-800/20 rounded-xl hover:bg-zinc-800/40 transition-all duration-300">
                  <div className="w-12 h-12 bg-rose-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-rose-400" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-400 mb-1">
                      {locale === 'de' ? 'Standort' : 'Location'}
                    </p>
                    <p className="text-lg">
                      {locale === 'de' ? 'Österreich' : 'Austria'}
                    </p>
                    <p className="text-zinc-500 text-sm mt-2">
                      {locale === 'de' 
                        ? 'Remote & Vor-Ort Projekte möglich' 
                        : 'Remote & on-site projects available'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Response Info */}
            <div className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4 text-rose-300">
                {locale === 'de' ? 'Schnelle Antwort' : 'Quick Response'}
              </h3>
              <p className="text-zinc-300 mb-4">
                {locale === 'de'
                  ? "Ich bemühe mich, auf alle Anfragen innerhalb von 24 Stunden zu antworten. Für dringende Projekte, nutzen Sie bitte die Telefonnummer."
                  : "I strive to respond to all inquiries within 24 hours. For urgent projects, please use the phone number."}
              </p>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse" />
                {locale === 'de' ? 'Aktuell verfügbar' : 'Currently available'}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links (Optional) */}
        <div className="mt-16 text-center">
          <p className="text-zinc-400 mb-6">
            {locale === 'de' 
              ? 'Oder finden Sie mich auf' 
              : 'Or find me on'}
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href="https://github.com/deanmitco"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-rose-400 transition-colors p-3 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50"
            >
              <span className="text-lg">GitHub</span>
            </a>
            <a 
              href="https://linkedin.com/in/deanmitco"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-rose-400 transition-colors p-3 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50"
            >
              <span className="text-lg">LinkedIn</span>
            </a>
            <a 
              href="mailto:mitco.deansilviu@gmail.com"
              className="text-zinc-400 hover:text-rose-400 transition-colors p-3 bg-zinc-800/30 rounded-lg hover:bg-zinc-800/50"
            >
              <span className="text-lg">Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}