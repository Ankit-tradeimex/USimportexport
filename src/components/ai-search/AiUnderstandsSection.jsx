'use client';
import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import {
  ArrowDownUp,
  Anchor,
  Building2,
  CalendarDays,
  FileSearch,
  Globe2,
  Package,
  Sparkles,
} from 'lucide-react';

/* Each kind = one thing the AI can pick out of a sentence. */
const KINDS = {
  type: {
    Icon: ArrowDownUp,
    label: 'Import or export',
    hint: 'Which direction the trade is going.',
    chip: 'bg-[#B31942]/10 text-[#B31942] ring-[#B31942]/30 dark:bg-[#ff4d6d]/15 dark:text-[#ff8da0] dark:ring-[#ff4d6d]/40',
    dot: 'bg-[#B31942] dark:bg-[#ff8da0]',
  },
  product: {
    Icon: Package,
    label: 'Product',
    hint: 'What is being shipped, in everyday words.',
    chip: 'bg-[#0A3161]/10 text-[#0A3161] ring-[#0A3161]/30 dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff] dark:ring-[#4da3ff]/40',
    dot: 'bg-[#0A3161] dark:bg-[#7cc4ff]',
  },
  hs: {
    Icon: FileSearch,
    label: 'HS code',
    hint: 'A code you give, or one it should find for you.',
    chip: 'bg-indigo-500/10 text-indigo-700 ring-indigo-500/30 dark:bg-indigo-400/15 dark:text-indigo-300 dark:ring-indigo-400/40',
    dot: 'bg-indigo-500 dark:bg-indigo-300',
  },
  country: {
    Icon: Globe2,
    label: 'Country',
    hint: 'Where it comes from or where it goes.',
    chip: 'bg-emerald-500/10 text-emerald-700 ring-emerald-500/30 dark:bg-emerald-400/15 dark:text-emerald-300 dark:ring-emerald-400/40',
    dot: 'bg-emerald-500 dark:bg-emerald-300',
  },
  year: {
    Icon: CalendarDays,
    label: 'Time period',
    hint: 'A year, or words like “last year”.',
    chip: 'bg-amber-500/10 text-amber-700 ring-amber-500/30 dark:bg-amber-400/15 dark:text-amber-300 dark:ring-amber-400/40',
    dot: 'bg-amber-500 dark:bg-amber-300',
  },
  company: {
    Icon: Building2,
    label: 'Company',
    hint: 'An importer, exporter or supplier name.',
    chip: 'bg-violet-500/10 text-violet-700 ring-violet-500/30 dark:bg-violet-400/15 dark:text-violet-300 dark:ring-violet-400/40',
    dot: 'bg-violet-500 dark:bg-violet-300',
  },
  port: {
    Icon: Anchor,
    label: 'Port',
    hint: 'Where cargo is loaded or unloaded.',
    chip: 'bg-cyan-500/10 text-cyan-700 ring-cyan-500/30 dark:bg-cyan-400/15 dark:text-cyan-300 dark:ring-cyan-400/40',
    dot: 'bg-cyan-500 dark:bg-cyan-300',
  },
};

/* Sentences split into pieces. Pieces with a `k` are picked up by the AI. */
const EXAMPLES = [
  {
    id: 'a',
    parts: [
      { t: 'Show me ' },
      { t: 'fish', k: 'product' },
      { t: ' ' },
      { t: 'export', k: 'type' },
      { t: ' data of ' },
      { t: 'Maldives', k: 'country' },
      { t: ' with ' },
      { t: 'HS code', k: 'hs' },
    ],
  },
  {
    id: 'b',
    parts: [
      { t: 'Who ' },
      { t: 'imports', k: 'type' },
      { t: ' ' },
      { t: 'cotton', k: 'product' },
      { t: ' from ' },
      { t: 'India', k: 'country' },
      { t: ' in ' },
      { t: '2024', k: 'year' },
    ],
  },
  {
    id: 'c',
    parts: [
      { t: 'Shipments by ' },
      { t: 'Acme Foods Inc', k: 'company' },
      { t: ' from ' },
      { t: 'Shanghai', k: 'port' },
      { t: ' to ' },
      { t: 'Los Angeles', k: 'port' },
    ],
  },
  {
    id: 'd',
    parts: [
      { t: 'HS ' },
      { t: '0302', k: 'hs' },
      { t: ' ' },
      { t: 'imports', k: 'type' },
      { t: ' from ' },
      { t: 'Norway', k: 'country' },
      { t: ' ' },
      { t: 'last year', k: 'year' },
    ],
  },
];

const plain = (parts) => parts.map((p) => p.t).join('');

export default function AiUnderstandsSection() {
  const [active, setActive] = useState(0);
  const [focus, setFocus] = useState(null);
  const ex = EXAMPLES[active];
  const found = [...new Set(ex.parts.filter((p) => p.k).map((p) => p.k))];

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0A3161] dark:border-white/10 dark:bg-white/5 dark:text-[#7cc4ff]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              What the AI understands
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              It reads your sentence{' '}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                like a trade analyst.
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-white/70">
              From one plain sentence it picks out the product, the countries, the direction of
              trade, the time period and more, then turns them into filters.
            </p>
          </motion.div>

          {/* annotated sentence */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-10 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
          >
            {/* example switcher */}
            <div
              className="flex flex-wrap items-center justify-center gap-2"
              role="tablist"
              aria-label="Example sentences"
            >
              {EXAMPLES.map((e, i) => (
                <button
                  key={e.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  onClick={() => {
                    setActive(i);
                    setFocus(null);
                  }}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                    i === active
                      ? 'bg-[#0A3161] text-white dark:bg-white dark:text-[#0A1A4A]'
                      : 'border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:text-white/70 dark:hover:bg-white/10'
                  }`}
                >
                  Example {i + 1}
                </button>
              ))}
            </div>

            {/* the sentence */}
            <AnimatePresence mode="wait">
              <motion.p
                key={ex.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                aria-label={plain(ex.parts)}
                className="mx-auto mt-9 max-w-4xl text-center text-2xl font-medium leading-[2.6rem] text-slate-900 sm:text-3xl sm:leading-[3.4rem] dark:text-white"
              >
                {ex.parts.map((p, i) =>
                  p.k ? (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: focus && focus !== p.k ? 0.35 : 1 }}
                      transition={{ delay: focus ? 0 : 0.15 + i * 0.07 }}
                      onMouseEnter={() => setFocus(p.k)}
                      onMouseLeave={() => setFocus(null)}
                      className={`relative mx-0.5 inline-block cursor-default rounded-lg px-2 ring-1 ${KINDS[p.k].chip}`}
                    >
                      {p.t}
                      <span className="absolute -top-3.5 left-1/2 hidden -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase leading-none tracking-wider opacity-90 sm:block">
                        {KINDS[p.k].label}
                      </span>
                    </motion.span>
                  ) : (
                    <span key={i}>{p.t}</span>
                  ),
                )}
              </motion.p>
            </AnimatePresence>

            {/* found filters */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/50">
                Filters set
              </span>
              {found.map((k) => (
                <span
                  key={k}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ${KINDS[k].chip}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${KINDS[k].dot}`} />
                  {KINDS[k].label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* what it can pick up */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(KINDS).map(([k, { Icon, label, hint, chip }], i) => {
              const hit = found.includes(k);
              return (
                <motion.div
                  key={k}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onMouseEnter={() => setFocus(k)}
                  onMouseLeave={() => setFocus(null)}
                  className={`flex items-start gap-3.5 rounded-2xl border p-5 transition ${
                    hit
                      ? 'border-slate-300 bg-white shadow-md dark:border-white/25 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.14] dark:to-white/[0.04] dark:shadow-none dark:backdrop-blur-xl'
                      : 'border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/[0.03]'
                  } ${focus === k ? 'scale-[1.02]' : ''}`}
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${chip}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                      {label}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-white/65">
                      {hint}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
