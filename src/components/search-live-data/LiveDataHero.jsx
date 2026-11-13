'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ChevronRight,
  Clock,
  Home,
  Layers,
  ScanSearch,
} from 'lucide-react';
import { HiArrowLongRight } from 'react-icons/hi2';

// Fictional example shipments for the animated "live feed" card (not real records).
const FEED = [
  {
    type: 'import',
    product: 'Coffee, not roasted',
    hs: '090111',
    route: 'Santos → Savannah',
    teu: 6,
  },
  { type: 'export', product: 'Raw cotton', hs: '520100', route: 'Houston → Ho Chi Minh', teu: 12 },
  {
    type: 'import',
    product: 'Aluminium bodystock',
    hs: '760612',
    route: 'Busan → Charleston',
    teu: 6,
  },
  {
    type: 'export',
    product: 'Energy drinks',
    hs: '220210',
    route: 'Los Angeles → Melbourne',
    teu: 8,
  },
  { type: 'import', product: 'Smartphones', hs: '851713', route: 'Shenzhen → Long Beach', teu: 4 },
  { type: 'export', product: 'Frozen fish', hs: '030389', route: 'Seattle → Male', teu: 3 },
  { type: 'import', product: 'Wine, in bottles', hs: '220421', route: 'Genoa → Newark', teu: 5 },
  { type: 'export', product: 'Medicaments', hs: '300490', route: 'Newark → Rotterdam', teu: 7 },
];

const TYPE = {
  import: {
    Icon: ArrowDownToLine,
    grad: 'from-[#B31942] to-[#ff4d6d]',
    text: 'text-[#B31942] dark:text-[#ff8da0]',
    soft: 'bg-[#B31942]/10 dark:bg-[#ff4d6d]/15',
  },
  export: {
    Icon: ArrowUpFromLine,
    grad: 'from-[#0A3161] to-[#4da3ff]',
    text: 'text-[#0A3161] dark:text-[#7cc4ff]',
    soft: 'bg-[#0A3161]/10 dark:bg-[#4da3ff]/15',
  },
};

const VISIBLE = 4;

function LiveFeed() {
  const reduce = useReducedMotion();

  const nextId = useRef(VISIBLE + 1);

  const [items, setItems] = useState(() =>
    FEED.slice(0, VISIBLE).map((item, index) => ({
      ...item,
      id: index + 1,
    })),
  );

  useEffect(() => {
    if (reduce) return;

    const interval = setInterval(() => {
      const id = nextId.current++;

      const record = {
        ...FEED[(id - (VISIBLE + 1)) % FEED.length],
        id,
      };

      setItems((previousItems) => [record, ...previousItems].slice(0, VISIBLE));
    }, 2600);

    return () => clearInterval(interval);
  }, [reduce]);

  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="absolute -inset-6 rounded-full bg-[#4da3ff]/15 blur-3xl" />
      <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-[#ff4d6d]/15 blur-3xl" />

      <motion.div
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-[0_30px_90px_rgba(20,20,60,0.16)] dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.14] dark:to-white/[0.03] dark:shadow-[0_8px_60px_rgba(0,0,0,0.55)] dark:backdrop-blur-xl"
      >
        <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50 px-5 py-3 dark:border-white/10 dark:bg-white/5">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-700 dark:text-slate-200">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live shipment feed
          </p>

          <span className="text-[11px] text-neutral-400 dark:text-slate-500">example records</span>
        </div>

        <ul className="h-[320px] space-y-2.5 overflow-hidden p-4">
          <AnimatePresence initial={false} mode="popLayout">
            {items.map((r, i) => {
              const t = TYPE[r.type];

              return (
                <motion.li
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: -24, scale: 0.97 }}
                  animate={{
                    opacity: 1 - i * 0.14,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 28,
                  }}
                  className="flex h-[64px] shrink-0 items-center gap-3 overflow-hidden rounded-2xl border border-neutral-200 bg-white p-3 dark:border-white/10 dark:bg-white/[0.05]"
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-linear-to-br text-white shadow-md ${t.grad}`}
                  >
                    <t.Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-neutral-950 dark:text-white">
                      {r.product}
                    </p>
                    <p className="truncate text-xs text-neutral-500 dark:text-slate-400">
                      {r.route}
                    </p>
                  </div>

                  <div className="shrink-0 text-right">
                    <p
                      className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${t.soft} ${t.text}`}
                    >
                      HS {r.hs}
                    </p>
                    <p className="mt-1 text-[11px] text-neutral-500 dark:text-slate-400">
                      {r.teu} TEU
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>

        <div className="border-t border-neutral-100 px-4 py-3 dark:border-white/10">
          <div className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-xs text-neutral-400 dark:border-white/10 dark:bg-white/5 dark:text-slate-500">
            <ScanSearch className="h-4 w-4" aria-hidden="true" />
            Search by product, HS code or company…
          </div>
        </div>
      </motion.div>
    </div>
  );
}
const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

export default function LiveDataHero() {
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
                Search Live Data
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
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                Live U.S. Trade Data
              </motion.span>

              <motion.h1
                {...rise(0.12)}
                className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-neutral-950 dark:text-white sm:text-6xl lg:text-6xl"
              >
                Search{' '}
                <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff5a73] dark:via-white dark:to-[#5dbaf6]">
                  Live US Data
                </span>
                <span className="mt-3 block text-2xl font-medium tracking-tight text-neutral-500 dark:text-slate-400 sm:text-3xl">
                  Imports and exports, shipment by shipment.
                </span>
              </motion.h1>

              <motion.p
                {...rise(0.2)}
                className="mt-6 max-w-lg text-sm leading-relaxed text-neutral-600 dark:text-slate-400"
              >
                Look up US import and export records by product, HS code or company. Track what is
                moving through US ports, find verified buyers and suppliers, and watch your
                competitors, all from one search.
              </motion.p>

              <motion.div {...rise(0.28)} className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="#search"
                  className="inline-flex items-center gap-2 rounded-lg gradient px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2a2a55] dark:shadow-[0_10px_30px_rgba(77,163,255,0.35)] dark:hover:brightness-110"
                >
                  Start Searching
                  <span className="text-lg">
                    <HiArrowLongRight />
                  </span>
                </Link>
                <Link
                  href="/data-sample"
                  className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:backdrop-blur dark:hover:border-white/30 dark:hover:bg-white/10"
                >
                  View Sample Data
                  <span className="text-lg">
                    <HiArrowLongRight />
                  </span>
                </Link>
              </motion.div>

              {/* highlights */}
              <motion.ul
                {...rise(0.36)}
                className="mt-10 grid max-w-lg grid-cols-1 gap-3 sm:grid-cols-3"
              >
                {[
                  { Icon: Clock, label: 'Updated regularly' },
                  { Icon: Layers, label: 'Import & export' },
                  { Icon: ScanSearch, label: 'HS-code level' },
                ].map(({ Icon, label }) => (
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

            {/* ---------- right: live feed visual ---------- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <LiveFeed />
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
