'use client';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { chapterPath, modeLabel, overviewPath } from '@/data/hsDirectoryData';

function NavLink({ chapter, modeKey, dir }) {
  if (!chapter) return <span />;
  const prev = dir === 'prev';
  return (
    <Link
      href={chapterPath(modeKey, chapter)}
      className="group flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-[#B31942]/40 hover:text-[#B31942] dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:text-[#ff8da0]"
    >
      {prev && (
        <ChevronLeft
          className="h-4 w-4 transition-transform group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
      )}
      <span>Chapter {chapter.code}</span>
      {!prev && (
        <ChevronRight
          className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

export default function HsChapterHeader({
  mode,
  modeKey,
  chapter,
  section,
  prev,
  next,
  stats,
  page,
  totalPages,
}) {
  const label = modeLabel(mode);

  const tiles = [
    { v: stats.codes, l: 'HS codes' },
    { v: stats.headings, l: 'Headings' },
    { v: `${page}/${totalPages}`, l: 'Page' },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-4 pb-20 pt-8 sm:pb-24">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,49,97,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(10,49,97,0.06)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_70%_at_30%_40%,black,transparent)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
          <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#0A3161]/10 blur-[120px] dark:bg-[#4da3ff]/20" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl">
          <nav aria-label="Breadcrumb" className="mb-8">
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
                  href={overviewPath(modeKey)}
                  className="transition hover:text-[#B31942] dark:hover:text-[#ff8da0]"
                >
                  HS Code Directory
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-slate-900 dark:text-white">
                Chapter {chapter.code}
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
            {/* left: big number + title */}
            <div className="relative">
              <motion.span
                aria-hidden="true"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                className="pointer-events-none absolute -left-2 -top-10 select-none bg-linear-to-br from-[#B31942]/25 to-[#0A3161]/20 bg-clip-text text-[150px] font-black leading-none tracking-tighter text-transparent sm:text-[210px] dark:from-[#ff8da0]/25 dark:to-[#7cc4ff]/20"
              >
                {chapter.code}
              </motion.span>

              <div className="relative pt-16 sm:pt-24">
                <motion.span
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  className="inline-flex flex-wrap items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0A3161] dark:border-white/10 dark:bg-white/5 dark:text-[#7cc4ff]"
                >
                  Section {section.id}
                  <span className="text-slate-300 dark:text-white/25">·</span>
                  {section.title}
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.16 }}
                  className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
                >
                  <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                    {chapter.title}
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.24 }}
                  className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70"
                >
                  {label} – HS code list for Chapter {chapter.code}. Open a code to see{' '}
                  {mode.type === 'company'
                    ? `the ${mode.role === 'export' ? 'exporters' : 'importers'} that use it`
                    : `the ${mode.role} shipment data for it`}
                  .
                </motion.p>
              </div>
            </div>

            {/* right: stats + chapter navigation */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-xl backdrop-blur-xl sm:p-6 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03]"
            >
              <dl className="grid grid-cols-3 gap-3">
                {tiles.map((t) => (
                  <div
                    key={t.l}
                    className="rounded-2xl bg-slate-50 px-3 py-4 text-center dark:bg-white/5"
                  >
                    <dt className="text-2xl font-bold text-slate-900 sm:text-3xl dark:text-white">
                      {t.v}
                    </dt>
                    <dd className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-white/50">
                      {t.l}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 flex items-center justify-between gap-3">
                <NavLink chapter={prev} modeKey={modeKey} dir="prev" />
                <NavLink chapter={next} modeKey={modeKey} dir="next" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
