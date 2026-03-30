'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useLenisInstance } from '@/components/LenisProvider';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
];

const NAV_OFFSET = -96;

export default function Navigation() {
  const lenis = useLenisInstance();
  const [isCentered, setIsCentered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('theme');
    const initialTheme = savedTheme === 'light' ? 'light' : 'dark';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
    window.localStorage.setItem('theme', nextTheme);
  };

  useEffect(() => {
    const handleScroll = () => {
      const aboutSection = document.getElementById('about');
      const switchAt = aboutSection ? Math.max(40, aboutSection.offsetTop - 8) : 100;
      setIsCentered(window.scrollY >= switchAt);

      // Determine active section
      const sections = ['about', 'skills', 'projects', 'experience', 'contact'];
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === '#') {
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.1 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }
    const element = document.querySelector(href);
    if (!element) return;
    if (lenis) {
      lenis.scrollTo(element as HTMLElement, {
        offset: NAV_OFFSET,
        duration: 1.15,
      });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed inset-x-0 top-5 z-50"
      >
        <div className="mx-auto max-w-[92rem] px-4 md:px-6">
          <div className={`hidden md:flex ${isCentered ? 'justify-center' : 'justify-end'}`}>
            <motion.nav
              layout
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-fit items-center gap-1 rounded-full border border-neutral-800/60 bg-neutral-900/80 px-1.5 py-1.5 shadow-xl backdrop-blur-xl"
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#');
                }}
                className="px-2.5 py-1 text-xs font-semibold text-white transition-colors hover:text-orange-400"
              >
                PS
              </a>
              {navLinks.map((link) => {
                const sectionId = link.href.replace('#', '') || 'home';
                const isActive =
                  activeSection === sectionId || (sectionId === 'home' && activeSection === '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className={`relative rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-full bg-white/10"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </a>
                );
              })}
              <div className="mx-1.5 h-5 w-px bg-neutral-700" />
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-all hover:bg-white/5 hover:text-white"
              >
                {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              </button>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#contact');
                }}
                className="flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium text-black transition-colors hover:bg-neutral-200"
              >
                Book a Call
              </a>
            </motion.nav>
          </div>

          {/* Mobile nav */}
          <nav className="flex items-center justify-between rounded-full border border-neutral-800/60 bg-neutral-900/80 px-3 py-2 backdrop-blur-md md:hidden">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#');
              }}
              className="px-3 py-1.5 text-base font-semibold text-white transition-colors hover:text-orange-400"
            >
              PS
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full text-white transition-all hover:bg-white/5"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 md:hidden"
          >
            <div className="bg-neutral-900/95 backdrop-blur-xl border border-neutral-800 rounded-2xl p-4 shadow-2xl">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="px-4 py-3 text-neutral-300 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="h-px bg-neutral-800 my-2" />
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#contact');
                  }}
                  className="px-4 py-3 bg-white text-black rounded-xl text-center font-medium"
                >
                  Book a Call
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
