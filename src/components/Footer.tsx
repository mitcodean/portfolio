import { Messages } from "@/lib/getMessages";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer({ messages }: { messages?: Messages["footer"] }) {
  const footerMessages = messages || {
    contact: "Contact",
    phone: "Phone",
    email: "Email",
    rights: "All rights reserved."
  };

  return (
    <footer className="bg-background-dark-800 border-t border-neutral/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-accent rounded-lg flex items-center justify-center">
                <span className="text-background-light font-bold text-xl">DM</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-background-light">
                  Dean-Silviu Mitco
                </h2>
                <p className="text-sm text-neutral">
                  Full-Stack Developer
                </p>
              </div>
            </div>
            
            <p className="text-neutral text-sm">
              Creating modern web applications with focus on performance and user experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-background-light mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-neutral hover:text-accent-1 transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#projects" className="text-neutral hover:text-accent-1 transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#contact" className="text-neutral hover:text-accent-1 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-background-light mb-4">
              {footerMessages.contact}
            </h3>
            <address className="not-italic space-y-3">
              <div>
                <p className="text-sm text-neutral">{footerMessages.phone}:</p>
                <a
                  href="tel:+436649494891"
                  className="text-background-light hover:text-accent-1 transition-colors"
                >
                  +43 664 9494891
                </a>
              </div>
              
              <div>
                <p className="text-sm text-neutral">{footerMessages.email}:</p>
                <a
                  href="mailto:mitco.deansilviu@gmail.com"
                  className="text-background-light hover:text-accent-1 transition-colors break-all"
                >
                  mitco.deansilviu@gmail.com
                </a>
              </div>
            </address>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-background-light mb-4">
              Connect
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/deanmitco"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-background-dark-700 flex items-center justify-center text-neutral hover:text-accent-1 hover:bg-background-dark border border-neutral/20 transition-all"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              
              <a
                href="https://linkedin.com/in/deanmitco"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-background-dark-700 flex items-center justify-center text-neutral hover:text-accent-1 hover:bg-background-dark border border-neutral/20 transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              
              <a
                href="mailto:mitco.deansilviu@gmail.com"
                className="w-10 h-10 rounded-lg bg-background-dark-700 flex items-center justify-center text-neutral hover:text-accent-1 hover:bg-background-dark border border-neutral/20 transition-all"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral">
              © {new Date().getFullYear()} Dean-Silviu Mitco. {footerMessages.rights}
            </p>
            
            <p className="text-sm text-neutral">
              Made with <span className="text-accent-1">♥</span> using Next.js & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}