'use client';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { ddIntro, ddPath, ddTitle } from '@/data/productDirectoryData';

export default function DdHero({ mode, modeSlug, letter, totalAll, totalPages }) {
  const L = letter.toUpperCase();
  const title = ddTitle(mode, letter).slice(0, -1); // the letter itself is drawn separately, with the accent

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-4 pb-24 pt-8 sm:pb-28">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,49,97,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(10,49,97,0.06)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
          <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-[#0A3161]/10 blur-[120px] dark:bg-[#4da3ff]/20" />
        </div>

        {/* giant ghost letter */}
        <motion.span
          key={letter}
          aria-hidden="true"
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          className="pointer-events-none absolute left-1/2 top-4 -translate-x-1/2 select-none bg-linear-to-b from-[#B31942]/20 to-transparent bg-clip-text text-[280px] font-black leading-none tracking-tighter text-transparent sm:text-[380px] dark:from-[#ff8da0]/20"
        >
          {L}
        </motion.span>

        <div className="relative mx-auto w-full max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-10">
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
              <li>
                <Link
                  href={ddPath(modeSlug, 'a')}
                  className="transition hover:text-[#B31942] dark:hover:text-[#ff8da0]"
                >
                  Data Directory
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-slate-900 dark:text-white">
                Letter {L}
              </li>
            </ol>
          </nav>

          <div className="pt-6 text-center sm:pt-10">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-4xl text-4xl font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
            >
              {title}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text font-bold text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                {L}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70"
            >
              {ddIntro(mode, letter)}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm font-semibold"
            >
              <span className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[#0A3161] dark:border-white/10 dark:bg-white/5 dark:text-[#7cc4ff]">
                {totalAll} {totalAll === 1 ? 'product' : 'products'}
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-4 py-1.5 text-[#B31942] dark:border-white/10 dark:bg-white/5 dark:text-[#ff8da0]">
                {totalPages} {totalPages === 1 ? 'page' : 'pages'}
              </span>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
