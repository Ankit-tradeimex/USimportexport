'use client';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import {
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Home,
  Printer,
  Scale,
  ScrollText,
  ShieldCheck,
} from 'lucide-react';

const ICONS = { 'terms-of-use': ScrollText, 'privacy-policy': ShieldCheck, disclaimer: Scale };

// pages: [{ slug, label, href }]  (the three legal pages, for the switcher)
export default function LegalHero({ slug, title, intro, updatedText, minutes, pages }) {
  const Icon = ICONS[slug] || ScrollText;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-4 pb-14 pt-8 sm:pb-20">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(10,49,97,0.13)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_75%_at_50%_30%,black,transparent)] dark:bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]" />
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
          <div className="absolute -right-24 top-16 h-96 w-96 rounded-full bg-[#0A3161]/10 blur-[120px] dark:bg-[#4da3ff]/20" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-10 print:hidden">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500 dark:text-white/60">
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
                {title}
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/70"
              >
                <Icon
                  className="h-3.5 w-3.5 text-[#B31942] dark:text-[#ff8da0]"
                  aria-hidden="true"
                />
                Legal
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
              >
                <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                  {title}
                </span>
              </motion.h1>

              {intro && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.16 }}
                  className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70"
                >
                  {intro}
                </motion.p>
              )}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="mt-6 flex flex-wrap items-center gap-3 text-sm"
              >
                {updatedText && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-[#0A3161]/8 px-3.5 py-1.5 font-medium text-[#0A3161] dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff]">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    Last updated {updatedText}
                  </span>
                )}
                <span className="inline-flex items-center gap-2 rounded-full bg-[#B31942]/8 px-3.5 py-1.5 font-medium text-[#B31942] dark:bg-[#ff4d6d]/15 dark:text-[#ff8da0]">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {minutes} min read
                </span>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 px-3.5 py-1.5 font-medium text-slate-700 transition hover:border-[#B31942]/40 hover:text-[#B31942] print:hidden dark:border-white/20 dark:text-white/80 dark:hover:text-[#ff8da0]"
                >
                  <Printer className="h-4 w-4" aria-hidden="true" />
                  Print
                </button>
              </motion.div>

              {/* switch between the legal pages */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.32 }}
                className="mt-8 inline-flex max-w-full flex-wrap gap-1 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm print:hidden dark:border-white/10 dark:bg-white/5"
              >
                {pages.map((p) =>
                  p.slug === slug ? (
                    <span
                      key={p.slug}
                      aria-current="page"
                      className="rounded-xl bg-linear-to-r from-[#B31942] to-[#0A3161] px-5 py-2 text-sm font-semibold text-white shadow-md"
                    >
                      {p.label}
                    </span>
                  ) : (
                    <Link
                      key={p.slug}
                      href={p.href}
                      className="rounded-xl px-5 py-2 text-sm font-semibold text-slate-600 transition hover:text-[#B31942] dark:text-white/70 dark:hover:text-[#ff8da0]"
                    >
                      {p.label}
                    </Link>
                  ),
                )}
              </motion.div>
            </div>

            {/* floating document sheets */}
            <div
              className="relative mx-auto hidden h-80 w-full max-w-xs lg:block print:hidden"
              aria-hidden="true"
            >
              <motion.div
                className="absolute inset-0 rotate-[-9deg] rounded-3xl border border-slate-200 bg-white/60 dark:border-white/10 dark:bg-white/5"
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute inset-0 rotate-[6deg] rounded-3xl border border-slate-200 bg-white/80 dark:border-white/10 dark:bg-white/10"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.3 },
                  scale: { duration: 0.5, delay: 0.3 },
                  y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 },
                }}
                className="absolute inset-0 flex flex-col rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl dark:border-white/15 dark:bg-[#12123a]"
              >
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-br from-[#B31942] to-[#0A3161] text-white shadow-lg">
                  <Icon className="h-7 w-7" strokeWidth={1.7} />
                </span>
                <div className="mt-6 space-y-3">
                  <span className="block h-2.5 w-3/4 rounded-full bg-slate-200 dark:bg-white/20" />
                  <span className="block h-2 w-full rounded-full bg-slate-100 dark:bg-white/10" />
                  <span className="block h-2 w-11/12 rounded-full bg-slate-100 dark:bg-white/10" />
                  <span className="block h-2 w-2/3 rounded-full bg-slate-100 dark:bg-white/10" />
                </div>
                <div className="mt-auto space-y-2.5">
                  {[0, 1].map((i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span className="block h-2 flex-1 rounded-full bg-slate-100 dark:bg-white/10" />
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
