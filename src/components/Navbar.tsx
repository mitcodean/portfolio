"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { Menu, X } from "lucide-react";

type NavMessages = {
  nav: {
    about: string;
    projects: string;
    contact: string;
  };
};

export default function Navbar({ messages }: { messages: NavMessages }) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const segments = pathname.split("/");
  const locale = segments[1] || "de";
  
  const navItems = [
    { 
      label: messages.nav.about, 
      href: `/${locale}/about`,
      key: "about"
    },
    { 
      label: messages.nav.projects, 
      href: `/${locale}/projects`,
      key: "projects"
    },
    { 
      label: messages.nav.contact, 
      href: `/${locale}/contact`,
      key: "contact"
    },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 w-full z-50 glass-morphism"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center">
              <span className="text-background-light font-bold text-lg">DM</span>
            </div>
            <span className="text-xl font-bold text-background-light group-hover:text-accent-1 transition-colors">
              Dean-Silviu Mitco
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className={`relative px-1 py-2 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? "text-accent-1"
                    : "text-neutral hover:text-background-light"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-accent rounded-full"
                  />
                )}
              </Link>
            ))}
            
            <div className="ml-4">
              <LanguageSwitcher />
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-neutral hover:text-background-light hover:bg-background-dark-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden py-4 border-t border-neutral/20"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-background-dark-700 text-accent-1"
                      : "text-neutral hover:text-background-light hover:bg-background-dark-700"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="px-4 pt-4 border-t border-neutral/20">
                <LanguageSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}