'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Armchair,
  Briefcase,
  Car,
  Cpu,
  Droplets,
  FileText,
  FlaskConical,
  Footprints,
  Gem,
  Hammer,
  Hexagon,
  Layers,
  Microscope,
  Mountain,
  Palette,
  PawPrint,
  ScrollText,
  Shield,
  Shirt,
  Sprout,
  TreePine,
  UtensilsCrossed,
} from 'lucide-react';
import { CODE_COUNTS, SECTIONS, chapterPath, getChaptersBySection } from '@/data/hsDirectoryData';

const ICONS = {
  1: PawPrint,
  2: Sprout,
  3: Droplets,
  4: UtensilsCrossed,
  5: Mountain,
  6: FlaskConical,
  7: Layers,
  8: Briefcase,
  9: TreePine,
  10: FileText,
  11: Shirt,
  12: Footprints,
  13: Hexagon,
  14: Gem,
  15: Hammer,
  16: Cpu,
  17: Car,
  18: Microscope,
  19: Shield,
  20: Armchair,
  21: Palette,
  22: ScrollText,
};

const range = (s) =>
  s.from === s.to
    ? `Chapter ${String(s.from).padStart(2, '0')}`
    : `Chapters ${String(s.from).padStart(2, '0')}–${String(s.to).padStart(2, '0')}`;

/* ------------------------------------------------------------------ */
/* Chapter card: spotlight follows the mouse (no React state)          */
/* ------------------------------------------------------------------ */
function ChapterCard({ chapter, mode }) {
  const ref = useRef(null);
  const Icon = ICONS[chapter.section];
  const count = CODE_COUNTS[chapter.number];

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
    >
      <Link
        ref={ref}
        href={chapterPath(mode, chapter)}
        onMouseMove={onMove}
        className="group relative flex h-full min-h-[190px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
      >
        {/* spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), rgba(179,25,66,0.13), rgba(10,49,97,0.09) 45%, transparent 70%)',
          }}
        />

        <div className="relative flex items-start justify-between cursor-pointer">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A3161]/10 text-[#0A3161] transition-colors group-hover:bg-[#B31942] group-hover:text-white dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff]">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </span>
          <ArrowUpRight
            className="h-4 w-4 text-slate-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#B31942] dark:text-white/40 dark:group-hover:text-[#ff8da0]"
            aria-hidden="true"
          />
        </div>

        <p className="relative mt-4 text-xs font-bold uppercase tracking-wider text-[#B31942] dark:text-[#ff8da0]">
          Chapter {chapter.code}
        </p>
        <h3 className="relative mt-1 line-clamp-3 text-[15px] font-semibold leading-snug text-slate-900 dark:text-white">
          {chapter.title}
        </h3>
        {count != null && (
          <p className="relative mt-auto pt-3 text-xs font-medium text-slate-500 dark:text-white/55">
            {count.toLocaleString('en-US')} codes
          </p>
        )}
      </Link>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* Explorer                                                            */
/* ------------------------------------------------------------------ */
export default function HsChapterExplorer({ mode }) {
  const [active, setActive] = useState('all');
  const section = SECTIONS.find((s) => s.id === active);
  const chapters = getChaptersBySection(active);

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Browse by{' '}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                section and chapter
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-white/70">
              The HS is grouped into sections, and each section into chapters. Pick a section to
              narrow the list, then open a chapter to see its codes.
            </p>
          </motion.div>

          {/* section rail */}
          <LayoutGroup id="hs-rail">
            <div className="relative mt-10">
              <div
                role="tablist"
                aria-label="HS sections"
                className="flex gap-2 overflow-x-auto px-1 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {[
                  { id: 'all', label: 'All' },
                  ...SECTIONS.map((s) => ({ id: s.id, label: s.id })),
                ].map((t) => {
                  const on = t.id === active;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => setActive(t.id)}
                      className={`relative cursor-pointer shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                        on
                          ? 'border-transparent text-white'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:text-white'
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="hs-rail-pill"
                          transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                          className="absolute inset-0 rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161] shadow-md"
                        />
                      )}
                      <span className="relative">{t.label}</span>
                    </button>
                  );
                })}
              </div>
              {/* fade hints for the scroll edges */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-linear-to-r from-white to-transparent dark:from-[#050518]" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-linear-to-l from-white to-transparent dark:from-[#050518]" />
            </div>
          </LayoutGroup>

          {/* active section label */}
          <div className="mt-6 min-h-[56px] text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {section ? (
                  <>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#B31942] dark:text-[#ff8da0]">
                      Section {section.id} · {range(section)}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                      {section.title}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#B31942] dark:text-[#ff8da0]">
                      All sections
                    </p>
                    <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
                      {chapters.length} chapters
                    </p>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* chapter cards */}
          <motion.ul
            layout
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {chapters.map((c) => (
                <ChapterCard key={c.code} chapter={c} mode={mode} />
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>
    </MotionConfig>
  );
}
