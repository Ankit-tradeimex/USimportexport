'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import {
  Building2,
  Check,
  Copy,
  FileSearch,
  Globe2,
  Package,
  Search,
  Sparkles,
  Ship,
  TrendingUp,
} from 'lucide-react';

const USE_CASES = [
  {
    id: 'suppliers',
    Icon: Building2,
    label: 'Find suppliers',
    blurb: 'See who is shipping a product to the US, and from where.',
    queries: [
      { q: 'Who exports cotton fabric from India to the US?', tag: 'Exporters' },
      { q: 'Top suppliers of ceramic tiles to the US from Spain', tag: 'Suppliers' },
      { q: 'Furniture exporters from Vietnam shipping to California', tag: 'Exporters' },
    ],
  },
  {
    id: 'buyers',
    Icon: Package,
    label: 'Find buyers',
    blurb: 'Find the US companies importing the product you sell.',
    queries: [
      { q: 'Which US companies import frozen shrimp from Ecuador?', tag: 'Importers' },
      { q: 'Importers of organic spices from India', tag: 'Importers' },
      { q: 'Who buys leather goods from Italy in the US?', tag: 'Importers' },
    ],
  },
  {
    id: 'hs',
    Icon: FileSearch,
    label: 'HS codes',
    blurb: 'Describe a product in plain words and get the matching code.',
    queries: [
      { q: 'HS code for stainless steel kitchen sinks', tag: 'HS code' },
      { q: 'Fish export data of Maldives with HS code', tag: 'HS + records' },
      { q: 'What is the HS code for lithium-ion batteries?', tag: 'HS code' },
    ],
  },
  {
    id: 'market',
    Icon: TrendingUp,
    label: 'Market research',
    blurb: 'Understand volumes, trends and who is growing.',
    queries: [
      { q: 'US coffee imports by country in 2025', tag: 'By country' },
      { q: 'Compare US solar panel imports from 2023 to 2025', tag: 'Year on year' },
      { q: 'Top 10 countries exporting medical devices to the US', tag: 'Top 10' },
    ],
  },
  {
    id: 'logistics',
    Icon: Ship,
    label: 'Shipments & ports',
    blurb: 'Track routes, ports and individual shipment records.',
    queries: [
      { q: 'Shipments from Shanghai to Los Angeles port this year', tag: 'Port to port' },
      { q: 'Containers of machinery arriving at Savannah from Germany', tag: 'Containers' },
      { q: 'Bill of lading records for tea imports from Sri Lanka', tag: 'Bill of lading' },
    ],
  },
  {
    id: 'global',
    Icon: Globe2,
    label: 'Your language',
    blurb: 'Ask in the language you think in. The AI sets the filters.',
    queries: [
      { q: 'भारत से अमेरिका को चाय का निर्यात डेटा', tag: 'Hindi' },
      { q: 'Importadores de café de Colombia en EE. UU.', tag: 'Spanish' },
      { q: 'Données d’exportation de vin de France vers les États-Unis', tag: 'French' },
    ],
  },
];

function QueryRow({ item, index }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(item.q);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.35 }}
      className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-[#0A3161]/30 hover:shadow-md dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl dark:hover:border-white/25"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0A3161]/10 text-[#0A3161] dark:bg-white/10 dark:text-[#7cc4ff]">
        <Search className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-medium leading-snug text-slate-900 dark:text-white">
          “{item.q}”
        </p>
        <span className="mt-1.5 inline-block rounded-full bg-[#B31942]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#B31942] dark:bg-[#ff4d6d]/15 dark:text-[#ff8da0]">
          {item.tag}
        </span>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy this search'}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
      >
        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
      </button>
    </motion.li>
  );
}

export default function AiSearchExamples() {
  const [active, setActive] = useState(USE_CASES[0].id);
  const current = USE_CASES.find((u) => u.id === active);

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
              Example searches
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Not sure what to ask?{' '}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                Start with one of these.
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-white/70">
              Pick what you are trying to do and see the kind of question that works. Copy one into
              the search bar, or change it to fit your product.
            </p>
          </motion.div>

          {/* body */}
          <div className="mt-12 grid gap-6 lg:grid-cols-[300px_1fr]">
            {/* use-case tabs */}
            <div
              role="tablist"
              aria-label="Use cases"
              className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0"
            >
              {USE_CASES.map(({ id, Icon, label }) => {
                const on = id === active;
                return (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={on}
                    type="button"
                    onClick={() => setActive(id)}
                    className={`relative flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-semibold transition ${
                      on
                        ? 'text-white'
                        : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="example-tab"
                        className="absolute inset-0 rounded-2xl bg-linear-to-r from-[#0A3161] to-[#17104d] shadow-lg dark:from-[#B31942] dark:to-[#0A3161]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <Icon className="relative h-4 w-4" aria-hidden="true" />
                    <span className="relative whitespace-nowrap">{label}</span>
                  </button>
                );
              })}
            </div>

            {/* queries panel */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7 dark:border-white/10 dark:bg-white/[0.03]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#B31942] to-[#0A3161] text-white">
                      <current.Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                        {current.label}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600 dark:text-white/65">
                        {current.blurb}
                      </p>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3">
                    {current.queries.map((item, i) => (
                      <QueryRow key={item.q} item={item} index={i} />
                    ))}
                  </ul>

                  <div className="mt-6 flex justify-end">
                    <Link
                      href="#ai-search"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#0A3161] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.03] hover:bg-[#0c3d78] dark:bg-white dark:text-[#0A1A4A] dark:hover:bg-white/90"
                    >
                      <Sparkles className="h-4 w-4" aria-hidden="true" />
                      Try it in the search bar
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
