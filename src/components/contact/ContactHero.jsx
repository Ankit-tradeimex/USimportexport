'use client';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { ChevronRight, Headphones, Home, Mail, Phone } from 'lucide-react';
import { CONTACT } from '@/data/contactData';

export default function ContactHero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-4 pb-12 pt-8 sm:pb-16">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,49,97,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(10,49,97,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_80%_at_50%_30%,black,transparent)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
          <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#0A3161]/10 blur-[110px] dark:bg-[#4da3ff]/20" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-white/60">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-1.5 transition hover:text-[#B31942] dark:hover:text-[#ff8da0]"
                >
                  <Home className="h-3.5 w-3.5" aria-hidden="true" />
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-slate-900 dark:text-white">
                Contact us
              </li>
            </ol>
          </nav>

          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0A3161] dark:border-white/10 dark:bg-white/5 dark:text-[#7cc4ff]"
            >
              <Headphones
                className="h-3.5 w-3.5 text-[#B31942] dark:text-[#ff8da0]"
                aria-hidden="true"
              />
              Contact our experts
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
            >
              Tell us your{' '}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                data requirement
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70"
            >
              Share what you are looking for, such as a product, HS code, country or market, and our
              team will guide you to the right US trade data.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.26 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 rounded-xl bg-[#0A3161] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03] hover:bg-[#0c3d78] dark:bg-white dark:text-[#0A1A4A] dark:hover:bg-white/90"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                Email us
              </a>
              <a
                href={`tel:${CONTACT.phones[0].replace(/[^+\d]/g, '')}`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 dark:border-white/25 dark:bg-white/5 dark:text-white dark:backdrop-blur dark:hover:border-white/50 dark:hover:bg-white/10"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call us
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
