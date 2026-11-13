'use client';

import Link from 'next/link';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, Globe2, Home, SlidersHorizontal, Sparkles, Zap } from 'lucide-react';
import { HiArrowLongRight } from 'react-icons/hi2';

const ORBIT = [
  { text: 'fish export', lang: 'EN', color: 'from-[#0A3161] to-[#4da3ff]' },
  { text: 'चावल निर्यात', lang: 'HI', color: 'from-[#B31942] to-[#ff4d6d]' },
  { text: 'café Brasil', lang: 'ES', color: 'from-[#6d4bff] to-[#4da3ff]' },
  { text: '电子产品', lang: 'ZH', color: 'from-[#B31942] to-[#ff4d6d]' },
  { text: 'vin France', lang: 'FR', color: 'from-[#0A3161] to-[#4da3ff]' },
];

const TRUST = [
  { Icon: Globe2, label: 'Any language' },
  { Icon: SlidersHorizontal, label: 'No filters needed' },
  { Icon: Zap, label: 'Instant records' },
];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

function Orb() {
  const reduce = useReducedMotion();
  const R = 41; // orbit radius in % of the box

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* glows */}
      <div className="absolute inset-[8%] rounded-full bg-[#4da3ff]/25 blur-3xl" />
      <div className="absolute -bottom-4 -left-4 h-40 w-40 rounded-full bg-[#ff4d6d]/20 blur-3xl" />

      {/* orbit rings */}
      <div className="absolute inset-[9%] rounded-full border border-dashed border-neutral-300 dark:border-white/20" />
      <div className="absolute inset-[24%] rounded-full border border-neutral-200 dark:border-white/10" />

      {/* rotating bubbles (each one counter-rotates so the text stays upright) */}
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
      >
        {ORBIT.map((b, i) => {
          const a = (i / ORBIT.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <div
              key={b.text}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${50 + R * Math.cos(a)}%`, top: `${50 + R * Math.sin(a)}%` }}
            >
              <motion.div
                animate={reduce ? undefined : { rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-neutral-200 bg-white/95 py-1.5 pl-1.5 pr-3.5 text-xs text-neutral-700 shadow-[0_10px_40px_rgba(20,20,60,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.16] dark:to-white/[0.04] dark:text-slate-200"
              >
                <span
                  className={`grid h-6 min-w-6 place-items-center rounded-full bg-linear-to-br px-1.5 text-[9px] font-bold text-white ${b.color}`}
                >
                  {b.lang}
                </span>
                {b.text}
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* the orb */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* pulse rings */}
        {!reduce &&
          [0, 1].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-full border border-[#4da3ff]/50"
              animate={{ scale: [1, 2.1], opacity: [0.6, 0] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 1.5, ease: 'easeOut' }}
            />
          ))}
        <motion.div
          animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative grid h-28 w-28 place-items-center rounded-full bg-[radial-gradient(circle_at_30%_25%,#ff8da0_0%,#B31942_32%,#17104d_78%,#0A3161_100%)] shadow-[0_0_60px_rgba(179,25,66,0.45),inset_-10px_-14px_30px_rgba(5,10,60,0.55)] sm:h-32 sm:w-32 dark:shadow-[0_0_80px_rgba(77,163,255,0.5),inset_-10px_-14px_30px_rgba(2,6,30,0.7)]"
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.55),transparent_45%)]" />
          <Sparkles
            className="relative h-12 w-12 text-white drop-shadow-[0_2px_12px_rgba(255,255,255,0.6)]"
            strokeWidth={1.6}
            aria-hidden="true"
          />
        </motion.div>
      </div>

      {/* "understood as" card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="absolute -bottom-2 right-0 sm:right-2"
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
          className="rounded-2xl border border-neutral-200 bg-white/95 p-3.5 shadow-[0_16px_60px_rgba(20,20,60,0.16)] backdrop-blur-xl dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.16] dark:to-white/[0.04] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
        >
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500 dark:text-slate-400">
            AI understood
          </p>
          <div className="flex flex-wrap gap-1.5">
            {['US Export', 'Fish', 'Maldives', 'HS Code'].map((c) => (
              <span
                key={c}
                className="rounded-full border border-[#0A3161]/20 bg-[#0A3161]/5 px-2.5 py-0.5 text-[11px] font-medium text-[#0A3161] dark:border-[#4da3ff]/30 dark:bg-[#4da3ff]/10 dark:text-sky-200"
              >
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function AiSearchHero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-white dark:bg-slate-950">
        {/* dark mode only: grid + glows */}
        <div className="pointer-events-none absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_80%_65%_at_60%_30%,black,transparent)]" />
          <div className="absolute -left-48 top-24 h-[520px] w-[520px] rounded-full bg-[#ff4d6d]/10 blur-[130px]" />
          <div className="absolute -right-32 -top-20 h-[640px] w-[640px] rounded-full bg-[#4da3ff]/20 blur-[140px]" />
        </div>
        {/* light mode only: soft blobs */}
        <div className="pointer-events-none absolute inset-0 dark:hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_80%_65%_at_60%_30%,black,transparent)]" />

          <div className="absolute -left-20 top-24 h-72 w-72 rounded-full bg-[#B31942]/8 blur-[100px]" />
          <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#4da3ff]/12 blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-6 lg:px-6 lg:pb-24">
          {/* breadcrumbs */}
          <motion.nav aria-label="Breadcrumb" {...rise(0)}>
            <ol className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:backdrop-blur">
              <li>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 transition-colors hover:text-neutral-900 dark:hover:text-white"
                >
                  <Home className="h-3.5 w-3.5" aria-hidden="true" />
                  Home
                </Link>
              </li>
              <ChevronRight
                className="h-3.5 w-3.5 text-neutral-300 dark:text-slate-600"
                aria-hidden="true"
              />
              <li aria-current="page" className="font-semibold text-neutral-900 dark:text-white">
                AI Search
              </li>
            </ol>
          </motion.nav>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
            {/* ---------- left: copy ---------- */}
            <div>
              <motion.span
                {...rise(0.05)}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-sky-200 dark:backdrop-blur"
              >
                <Sparkles
                  className="h-3.5 w-3.5 text-[#B31942] dark:text-[#ff8da0]"
                  aria-hidden="true"
                />
                AI-powered US trade search
              </motion.span>

              <motion.h1
                {...rise(0.12)}
                className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-neutral-950 dark:text-white sm:text-6xl"
              >
                Search US trade data by{' '}
                <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff5a73] dark:via-white dark:to-[#5dbaf6]">
                  just asking
                </span>
              </motion.h1>

              <motion.p
                {...rise(0.2)}
                className="mt-6 max-w-md text-sm leading-relaxed text-neutral-600 dark:text-slate-400"
              >
                No forms and no long filters. Describe the US import or export data you want, in any
                language, and our AI sets the filters and finds the matching shipment records for
                you.
              </motion.p>

              <motion.div {...rise(0.28)} className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="#ai-search"
                  className="inline-flex items-center gap-2 rounded-lg gradient px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2a2a55] dark:shadow-[0_10px_30px_rgba(77,163,255,0.35)] dark:hover:brightness-110"
                >
                  Try AI Search
                  <span className="text-lg">
                    <HiArrowLongRight />
                  </span>
                </Link>
                <Link
                  href="/search-live-data"
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:backdrop-blur dark:hover:border-white/30 dark:hover:bg-white/10"
                >
                  Search manually
                  <span className="text-lg">
                    <HiArrowLongRight />
                  </span>
                </Link>
              </motion.div>

              <motion.ul
                {...rise(0.36)}
                className="mt-10 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-3"
              >
                {TRUST.map(({ Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2.5 rounded-2xl border border-neutral-200 bg-white px-3 py-2.5 text-xs font-medium text-neutral-700 shadow-[0_8px_30px_rgba(20,20,60,0.05)] dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:text-slate-200 dark:backdrop-blur-xl"
                  >
                    <Icon
                      className="h-4 w-4 text-[#0A3161] dark:text-[#4da3ff]"
                      aria-hidden="true"
                    />
                    {label}
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* ---------- right: AI orb with orbiting searches ---------- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <Orb />
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
