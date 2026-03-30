'use client';

import { motion } from 'framer-motion';
import { FormEvent, useRef, useState } from 'react';
import { Mail, Phone, MessageCircle, ArrowUpRight } from 'lucide-react';

// Instagram icon (lucide-react doesn't have brand icons)
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

// Custom SVG icons for social media (lucide-react removed brand icons)
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const socialLinks = [
  {
    name: 'LinkedIn',
    Icon: LinkedInIcon,
    href: 'https://linkedin.com/in/pratiksindhiya',
    color: 'hover:text-blue-500',
  },
  {
    name: 'GitHub',
    Icon: GitHubIcon,
    href: 'https://github.com/pratiksindhiya',
    color: 'hover:text-white',
  },
  {
    name: 'X',
    Icon: XIcon,
    href: 'https://x.com/PrateekSindhiya',
    color: 'hover:text-sky-400',
  },
  {
    name: 'Instagram',
    Icon: InstagramIcon,
    href: 'https://www.instagram.com/im_prateek29/',
    color: 'hover:text-pink-500',
  },
  {
    name: 'WhatsApp',
    Icon: MessageCircle,
    href: 'https://wa.me/919302351349',
    color: 'hover:text-green-500',
  },
];

export default function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const scrollToStatus = () => {
    statusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || isSending) return;

    setIsSending(true);
    setFormStatus({ type: null, message: 'Sending message...' });
    scrollToStatus();

    const formData = new FormData(formRef.current);
    formData.append('_subject', 'New portfolio contact message');
    formData.append('_captcha', 'false');
    formData.append('_template', 'table');

    try {
      const response = await fetch('https://formsubmit.co/ajax/pratiksindhiya3@gmail.com', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setFormStatus({ type: 'success', message: 'Message sent successfully!' });
      formRef.current.reset();
    } catch {
      setFormStatus({
        type: 'error',
        message: 'Message send failed. Please try again.',
      });
    } finally {
      setIsSending(false);
      scrollToStatus();
    }
  };

  return (
    <section
      id="contact"
      className="section-surface relative w-full bg-[#0b0b0b] py-20 md:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm tracking-[0.3em] text-neutral-400 uppercase font-medium">
            Get In Touch
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-white">
            Let&apos;s Work{' '}
            <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent italic">
              Together
            </span>
          </h2>
          <p className="text-neutral-400 text-lg mt-6 max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out.
            I&apos;m always open to discussing new opportunities and ideas.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-16">
          {/* Email Card */}
          <motion.a
            href="mailto:pratiksindhiya3@gmail.com"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative p-8 bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-300"
          >
            {/* Gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-neutral-500 mb-1">Email me at</p>
                <p className="text-base font-medium text-white break-all transition-colors group-hover:text-orange-400 sm:text-lg">
                  pratiksindhiya3@gmail.com
                </p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
          </motion.a>

          {/* Phone Card */}
          <motion.a
            href="tel:+919302351349"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="group relative p-8 bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all duration-300"
          >
            {/* Gradient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-neutral-500 mb-1">Call me at</p>
                <p className="text-lg font-medium text-white group-hover:text-blue-400 transition-colors">
                  +91 9302351349
                </p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
          </motion.a>
        </div>

        {/* Contact Form */}
        <motion.form
          ref={formRef}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
          className="mx-auto mb-14 w-full max-w-3xl rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 sm:p-7"
          onSubmit={handleSubmit}
        >
          <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm text-neutral-400">Your Name</span>
              <input
                type="text"
                name="name"
                required
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-orange-500/70"
                placeholder="Enter your name"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm text-neutral-400">Email</span>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-orange-500/70"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="mt-4 block space-y-2">
            <span className="text-sm text-neutral-400">Message</span>
            <textarea
              name="message"
              rows={5}
              required
              className="w-full resize-none rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition-colors placeholder:text-neutral-500 focus:border-orange-500/70"
              placeholder="Tell me about your project..."
            />
          </label>

          <div className="mt-5 flex items-center justify-between gap-3">
            <p
              ref={statusRef}
              className={`text-xs ${
                formStatus.type === 'success'
                  ? 'text-emerald-400'
                  : formStatus.type === 'error'
                    ? 'text-red-400'
                    : 'text-neutral-500'
              }`}
            >
              {formStatus.message || 'I usually reply within 24 hours.'}
            </p>
            <button
              type="submit"
              disabled={isSending}
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSending ? 'Sending...' : 'Send Message'}
            </button>
          </div>
        </motion.form>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className={`w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 ${social.color} transition-all duration-300 hover:border-neutral-600`}
            >
              <social.Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-24 pt-12 border-t border-neutral-800/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Logo/Name */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center font-bold text-white">
                PS
              </div>
              <div>
                <p className="font-semibold text-white">Pratik Sindhiya</p>
                <p className="text-xs text-neutral-500">Full Stack Developer</p>
              </div>
            </motion.div>

            {/* Navigation */}
            <nav className="flex items-center gap-8 text-sm text-neutral-400">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#skills" className="hover:text-white transition-colors">Skills</a>
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
              <a href="#experience" className="hover:text-white transition-colors">Experience</a>
            </nav>

            {/* Copyright */}
            <p className="text-sm text-neutral-500">
              {new Date().getFullYear()} Pratik Sindhiya. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}
