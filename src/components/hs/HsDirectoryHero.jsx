'use client';
import Link from 'next/link';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';

const CONTENT = {
  badge: 'HS Code Directory',
  title: 'Find any US',
  accent: 'HS Code',
  titleEnd: 'in seconds',
  text: 'Browse the Harmonized System by section and chapter, or search by product or code. Open any HS code to see the companies that import or export it, and the shipment data behind it.',
};

const CHIPS = [
  { code: '0101', x: '6%', y: '24%', d: 0 },
  { code: '8517', x: '86%', y: '20%', d: 0.6 },
  { code: '3004', x: '12%', y: '70%', d: 1.1 },
  { code: '8703', x: '90%', y: '62%', d: 0.3 },
  { code: '2709', x: '78%', y: '86%', d: 0.9 },
  { code: '6109', x: '22%', y: '12%', d: 1.4 },
];

export default function HsDirectoryHero() {
  const reduce = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative px-4 pb-24 pt-8 sm:pb-28">
        {/* background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,49,97,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(10,49,97,0.06)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
          <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-[#0A3161]/10 blur-[120px] dark:bg-[#4da3ff]/20" />

          {/* floating code chips (large screens only) */}
          <div className="hidden lg:block">
            {CHIPS.map((c) => (
              <motion.span
                key={c.code}
                style={{ left: c.x, top: c.y }}
                animate={reduce ? undefined : { y: [0, -14, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: c.d }}
                className="absolute rounded-full border border-slate-200 bg-white/80 px-3.5 py-1.5 font-mono text-sm font-semibold text-[#0A3161] shadow-md backdrop-blur dark:border-white/10 dark:bg-white/5 dark:text-[#7cc4ff]"
              >
                {c.code}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-5xl">
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
                HS Code Directory
              </li>
            </ol>
          </nav>

          <div className="text-center">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0A3161] dark:border-white/10 dark:bg-white/5 dark:text-[#7cc4ff]"
            >
              <span className="relative flex h-2 w-2">
                {!reduce && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B31942]/60" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B31942] dark:bg-[#ff8da0]" />
              </span>
              {CONTENT.badge}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
            >
              {CONTENT.title}{' '}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                {CONTENT.accent}
              </span>{' '}
              {CONTENT.titleEnd}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.16 }}
              className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70"
            >
              {CONTENT.text}
            </motion.p>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
