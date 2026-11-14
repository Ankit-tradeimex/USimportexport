'use client';
import Link from 'next/link';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import {
  BarChart3,
  Building2,
  Check,
  ChevronRight,
  Home,
  Package,
  Ship,
  TrendingUp,
} from 'lucide-react';
import { HiArrowLongRight } from 'react-icons/hi2';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
const CONTENT = {
  badge: 'About Us',
  titleTop: 'Your Gateway to',
  titleAccent: 'US Trade Data',
  company: 'TradeImeX ® Info Solution Pvt. Ltd.',
  text: 'As an exclusive product of TradeImeX, USimportdata is a leading US trade data-providing platform, imparting comprehensive US import-export data to clients globally.',
  primary: { label: 'Explore the data', href: '/us-import-data' },
  secondary: { label: 'Contact us', href: '/contact-us' },
  chips: ['US importers & exporters', 'Market tendencies', 'Competitor history'],
};

const INSIGHTS = ['US market tendencies', 'Purchaser conduct', 'Competitor history'];

/* decorative chart paths (no real data) */
const IMPORT_LINE =
  'M0 78 C 30 70, 50 40, 80 48 S 130 80, 160 52 S 210 18, 240 28 S 280 34, 300 14';
const EXPORT_LINE =
  'M0 92 C 30 88, 55 70, 85 74 S 135 58, 165 62 S 215 44, 245 50 S 285 40, 300 36';

function MiniBars({ tone }) {
  const hs = [40, 65, 50, 80, 60, 95];
  return (
    <div className="flex h-9 items-end gap-1">
      {hs.map((h, i) => (
        <motion.span
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ delay: 0.9 + i * 0.07, duration: 0.5, ease: 'easeOut' }}
          className={`w-1.5 rounded-sm ${tone === 'red' ? 'bg-[#B31942] dark:bg-[#ff8da0]' : 'bg-[#0A3161] dark:bg-[#7cc4ff]'}`}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Right visual: product preview card with floating tiles              */
/* ------------------------------------------------------------------ */
function BrandPreview() {
  const reduce = useReducedMotion();
  const float = (d) =>
    reduce
      ? undefined
      : {
          y: [0, -8, 0],
          transition: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: d },
        };

  return (
    <div className="relative mx-auto w-full max-w-[540px] py-8 sm:py-10">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-linear-to-br from-[#B31942]/15 via-transparent to-[#0A3161]/20 blur-3xl dark:from-[#ff4d6d]/20 dark:to-[#4da3ff]/25" />

      {/* main card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative mx-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:mx-8 sm:p-7 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.14] dark:to-white/[0.04] dark:shadow-none dark:backdrop-blur-xl"
      >
        {/* brand row */}
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-[#B31942] to-[#0A3161] text-lg font-bold text-white shadow-md">
            U
          </span>
          <div className="leading-tight">
            <p className="text-base font-semibold text-slate-900 dark:text-white">USimportdata</p>
            <p className="text-xs text-slate-500 dark:text-white/55">A product of TradeImeX ®</p>
          </div>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-300" />
            US trade data
          </span>
        </div>

        {/* chart */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
          <div className="mb-2 flex items-center justify-between text-[11px] font-semibold">
            <span className="flex items-center gap-1.5 text-[#B31942] dark:text-[#ff8da0]">
              <span className="h-2 w-2 rounded-full bg-current" /> Imports
            </span>
            <span className="flex items-center gap-1.5 text-[#0A3161] dark:text-[#7cc4ff]">
              <span className="h-2 w-2 rounded-full bg-current" /> Exports
            </span>
          </div>
          <svg viewBox="0 0 300 100" className="h-28 w-full" aria-hidden="true">
            {[25, 50, 75].map((y) => (
              <line
                key={y}
                x1="0"
                x2="300"
                y1={y}
                y2={y}
                strokeWidth="1"
                className="stroke-slate-200 dark:stroke-white/10"
              />
            ))}
            <motion.path
              d={IMPORT_LINE}
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              className="stroke-[#B31942] dark:stroke-[#ff8da0]"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.5, ease: 'easeInOut' }}
            />
            <motion.path
              d={EXPORT_LINE}
              fill="none"
              strokeWidth="3"
              strokeLinecap="round"
              className="stroke-[#0A3161] dark:stroke-[#7cc4ff]"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.6, delay: 0.7, ease: 'easeInOut' }}
            />
          </svg>
        </div>

        {/* insights */}
        <ul className="mt-5 space-y-2.5">
          {INSIGHTS.map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + i * 0.12 }}
              className="flex items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-white/80"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0A3161]/10 text-[#0A3161] dark:bg-[#4da3ff]/20 dark:text-[#7cc4ff]">
                <Check className="h-3 w-3" aria-hidden="true" />
              </span>
              {t}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* floating: importers */}
      <motion.div
        animate={float(0)}
        className="absolute right-0 top-0 w-40 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xl dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.16] dark:to-white/[0.05] dark:shadow-none dark:backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-white">
          <Building2 className="h-4 w-4 text-[#B31942] dark:text-[#ff8da0]" aria-hidden="true" />
          Top US importers
        </div>
        <div className="mt-2.5">
          <MiniBars tone="red" />
        </div>
      </motion.div>

      {/* floating: exporters */}
      <motion.div
        animate={float(1.5)}
        className="absolute bottom-0 left-0 w-40 rounded-2xl border border-slate-200 bg-white p-3.5 shadow-xl dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.16] dark:to-white/[0.05] dark:shadow-none dark:backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-white">
          <Ship className="h-4 w-4 text-[#0A3161] dark:text-[#7cc4ff]" aria-hidden="true" />
          Top US exporters
        </div>
        <div className="mt-2.5">
          <MiniBars tone="blue" />
        </div>
      </motion.div>

      {/* floating: goods */}
      <motion.div
        animate={float(0.8)}
        className="absolute -left-1 top-16 hidden w-36 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:block dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.16] dark:to-white/[0.05] dark:shadow-none dark:backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-white">
          <Package className="h-4 w-4 text-[#0A3161] dark:text-[#7cc4ff]" aria-hidden="true" />
          Leading goods
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-white/60">
          <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
          Imported &amp; exported
        </div>
      </motion.div>

      {/* floating: forecasts */}
      <motion.div
        animate={float(2.2)}
        className="absolute -right-1 bottom-14 hidden w-36 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:block dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.16] dark:to-white/[0.05] dark:shadow-none dark:backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-white">
          <BarChart3 className="h-4 w-4 text-[#B31942] dark:text-[#ff8da0]" aria-hidden="true" />
          Insights
        </div>
        <div className="mt-2 text-[11px] text-slate-500 dark:text-white/60">&amp; forecasts</div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
export default function AboutHero() {
  const reduce = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:pb-24">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,49,97,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(10,49,97,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,black,transparent)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#0A3161]/10 blur-[110px] dark:bg-[#4da3ff]/20" />
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
                About us
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* copy */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0A3161] dark:border-white/10 dark:bg-white/5 dark:text-[#7cc4ff]"
              >
                <span className="relative flex h-2 w-2">
                  {!reduce && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B31942] opacity-60" />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B31942]" />
                </span>
                {CONTENT.badge}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
              >
                {CONTENT.titleTop}{' '}
                <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                  {CONTENT.titleAccent}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.14 }}
                className="mt-4 text-sm font-semibold uppercase tracking-wider text-[#B31942] dark:text-[#ff8da0]"
              >
                {CONTENT.company}
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70"
              >
                {CONTENT.text}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link
                  href={CONTENT.primary.href}
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#0A3161] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03] hover:bg-[#0c3d78] dark:bg-white dark:text-[#0A1A4A] dark:hover:bg-white/90"
                >
                  {CONTENT.primary.label}
                  <motion.span
                    animate={reduce ? undefined : { x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-lg"
                  >
                    <HiArrowLongRight />
                  </motion.span>
                </Link>
                <Link
                  href={CONTENT.secondary.href}
                  className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 dark:border-white/25 dark:bg-white/5 dark:text-white dark:backdrop-blur dark:hover:border-white/50 dark:hover:bg-white/10"
                >
                  {CONTENT.secondary.label}
                </Link>
              </motion.div>

              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
              >
                {CONTENT.chips.map((label) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-white/80"
                  >
                    <Check
                      className="h-4 w-4 text-[#B31942] dark:text-[#ff8da0]"
                      aria-hidden="true"
                    />
                    {label}
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* visual */}
            <BrandPreview />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
