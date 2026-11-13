'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ChevronRight,
  Languages,
  Loader2,
  Sparkles,
  TableProperties,
  TextCursorInput,
} from 'lucide-react';

// Example requests. Records are fictional examples, shown only to illustrate the result.
const EXAMPLES = [
  {
    lang: 'English',
    text: 'Show me fish export data of Maldives with HS code',
    translated: null,
    chips: [
      ['Data', 'US Export'],
      ['Product', 'Fish'],
      ['Country', 'Maldives'],
      ['HS Code', 'Included'],
    ],
    rows: [
      { type: 'export', product: 'Frozen fish', route: 'Seattle → Male', hs: '030389' },
      { type: 'export', product: 'Frozen fish', route: 'Seattle → Male', hs: '030389' },
      { type: 'export', product: 'Fish fillets', route: 'Miami → Male', hs: '030499' },
    ],
  },
  {
    lang: 'हिन्दी',
    text: 'भारत से कॉफी का आयात डेटा दिखाओ',
    translated: 'Show coffee import data from India',
    chips: [
      ['Data', 'US Import'],
      ['Product', 'Coffee'],
      ['Country', 'India'],
    ],
    rows: [
      { type: 'import', product: 'Coffee, not roasted', route: 'Chennai → Savannah', hs: '090111' },
      {
        type: 'import',
        product: 'Coffee, not roasted',
        route: 'Tuticorin → Charleston',
        hs: '090111',
      },
      { type: 'import', product: 'Coffee, roasted', route: 'Mumbai → Newark', hs: '090121' },
    ],
  },
  {
    lang: 'Español',
    text: 'Datos de importación de café de Brasil 2025',
    translated: 'Coffee import data from Brazil, 2025',
    chips: [
      ['Data', 'US Import'],
      ['Product', 'Coffee'],
      ['Country', 'Brazil'],
      ['Year', '2025'],
    ],
    rows: [
      { type: 'import', product: 'Coffee, not roasted', route: 'Santos → Savannah', hs: '090111' },
      { type: 'import', product: 'Coffee, not roasted', route: 'Santos → Houston', hs: '090111' },
      {
        type: 'import',
        product: 'Coffee, decaffeinated',
        route: 'Vitória → Norfolk',
        hs: '090112',
      },
    ],
  },
];

const T = {
  import: {
    Icon: ArrowDownToLine,
    grad: 'from-[#B31942] to-[#ff4d6d]',
    soft: 'bg-[#B31942]/10 text-[#B31942] dark:bg-[#ff4d6d]/15 dark:text-[#ff8da0]',
  },
  export: {
    Icon: ArrowUpFromLine,
    grad: 'from-[#0A3161] to-[#4da3ff]',
    soft: 'bg-[#0A3161]/10 text-[#0A3161] dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff]',
  },
};

/* a dashed arrow between two steps; lights up while data "flows" through it */
function Connector({ active, vertical }) {
  const reduce = useReducedMotion();
  return (
    <div
      className={`relative flex items-center justify-center ${vertical ? 'h-10 w-full lg:hidden' : 'hidden w-16 lg:flex'}`}
      aria-hidden="true"
    >
      <div
        className={`${vertical ? 'h-full w-0 border-l-2' : 'h-0 w-full border-t-2'} border-dashed transition-colors duration-500 ${
          active ? 'border-[#4da3ff]' : 'border-neutral-300 dark:border-white/15'
        }`}
      />
      {active && !reduce && (
        <motion.span
          className="absolute h-2.5 w-2.5 rounded-full bg-[#4da3ff] shadow-[0_0_12px_#4da3ff]"
          initial={vertical ? { top: 0, opacity: 1 } : { left: 0, opacity: 1 }}
          animate={vertical ? { top: '100%', opacity: 0 } : { left: '100%', opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeIn' }}
        />
      )}
      <ChevronRight
        className={`absolute h-5 w-5 transition-colors duration-500 ${vertical ? 'rotate-90' : ''} ${active ? 'text-[#4da3ff]' : 'text-neutral-300 dark:text-slate-600'}`}
      />
    </div>
  );
}

function Step({ n, Icon, title, on, children }) {
  return (
    <div
      className={`relative flex min-h-[300px] flex-col rounded-3xl border p-5 transition-all duration-500 ${
        on
          ? 'border-[#4da3ff]/50 bg-white shadow-[0_20px_70px_rgba(77,163,255,0.22)] dark:border-[#4da3ff]/50 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.16] dark:to-white/[0.04]'
          : 'border-neutral-200 bg-white shadow-[0_10px_40px_rgba(20,20,60,0.06)] dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.08] dark:to-white/[0.02]'
      } dark:backdrop-blur-xl`}
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className={`grid h-10 w-10 place-items-center rounded-xl bg-linear-to-br text-white shadow-md transition-all duration-500 ${on ? 'from-[#B31942] to-[#0A3161] scale-105' : 'from-neutral-400 to-neutral-500 dark:from-white/20 dark:to-white/10'}`}
        >
          <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400 dark:text-slate-500">
            Step {n}
          </p>
          <h3 className="font-serif text-lg font-bold leading-tight text-neutral-950 dark:text-white">
            {title}
          </h3>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function AiSearchDemoStrip() {
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { amount: 0.3 });

  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState(reduce ? EXAMPLES[0].text : '');
  // 0 typing, 1 thinking, 2 understood, 3 results
  const [phase, setPhase] = useState(reduce ? 3 : 0);
  const ex = EXAMPLES[idx];

  useEffect(() => {
    if (reduce || !inView) return;
    const timers = [];
    let n = 0;
    setTyped('');
    setPhase(0);
    const typer = setInterval(() => {
      n += 1;
      setTyped(ex.text.slice(0, n));
      if (n >= ex.text.length) {
        clearInterval(typer);
        timers.push(setTimeout(() => setPhase(1), 350));
        timers.push(setTimeout(() => setPhase(2), 1300));
        timers.push(setTimeout(() => setPhase(3), 2500));
        timers.push(setTimeout(() => setIdx((i) => (i + 1) % EXAMPLES.length), 6800));
      }
    }, 38);
    return () => {
      clearInterval(typer);
      timers.forEach(clearTimeout);
    };
  }, [idx, reduce, inView, ex.text]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-neutral-50/70 dark:bg-[#050816]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-1/2 top-24 h-80 w-[720px] -translate-x-1/2 rounded-full bg-[#4da3ff]/12 blur-[130px]" />
          <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#ff4d6d]/10 blur-[120px]" />
          <div className="absolute inset-0 hidden bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)] dark:block" />
        </div>

        <div ref={wrapRef} className="relative mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-24">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-sky-200 dark:backdrop-blur">
              <Sparkles
                className="h-3.5 w-3.5 text-[#B31942] dark:text-[#ff8da0]"
                aria-hidden="true"
              />
              See it in action
            </span>
            <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
              From one sentence to{' '}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff5a73] dark:to-[#5dbaf6]">
                shipment records
              </span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-neutral-600 dark:text-slate-400">
              Watch how a plain request, in any language, becomes the right filters and matching US
              trade data.
            </p>
          </motion.div>

          {/* language tabs */}
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
            role="tablist"
            aria-label="Example language"
          >
            {EXAMPLES.map((e, i) => (
              <button
                key={e.lang}
                type="button"
                role="tab"
                aria-selected={i === idx}
                onClick={() => setIdx(i)}
                className={`relative rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                  i === idx
                    ? 'border-transparent bg-[#0A3161] text-white dark:bg-[#4da3ff] dark:text-slate-950'
                    : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 dark:border-white/10 dark:bg-white/5 dark:text-slate-300'
                }`}
              >
                {e.lang}
              </button>
            ))}
          </div>

          {/* ---------- the 3 steps ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="mt-8 grid items-stretch gap-0 lg:grid-cols-[1fr_auto_1fr_auto_1fr]"
          >
            {/* 1: type */}
            <Step n={1} Icon={TextCursorInput} title="You type" on={phase === 0}>
              <div className="flex min-h-[84px] items-start gap-3 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                <Sparkles
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#0A3161] dark:text-[#4da3ff]"
                  aria-hidden="true"
                />
                <p className="text-sm leading-relaxed text-neutral-900 dark:text-white">
                  {typed}
                  {phase === 0 && (
                    <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-neutral-700 dark:bg-white" />
                  )}
                </p>
              </div>
              <p className="mt-auto pt-4 text-xs text-neutral-500 dark:text-slate-400">
                No dropdowns. Just write what you need.
              </p>
            </Step>

            <Connector active={phase >= 1} />
            <Connector active={phase >= 1} vertical />

            {/* 2: understand */}
            <Step n={2} Icon={Languages} title="AI understands" on={phase === 1 || phase === 2}>
              <div className="min-h-[150px]">
                <AnimatePresence mode="wait">
                  {phase === 1 && (
                    <motion.div
                      key="think"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-sm text-neutral-500 dark:text-slate-400"
                    >
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                      Reading your request…
                    </motion.div>
                  )}
                  {phase >= 2 && (
                    <motion.div
                      key={`chips-${idx}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {ex.translated && (
                        <p className="mb-3 rounded-xl bg-neutral-100 px-3 py-2 text-xs text-neutral-600 dark:bg-white/[0.07] dark:text-slate-300">
                          <span className="font-semibold">Translated:</span> “{ex.translated}”
                        </p>
                      )}
                      <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-400 dark:text-slate-500">
                        Filters set
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {ex.chips.map(([k, v], i) => (
                          <motion.span
                            key={k}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: i * 0.12,
                              type: 'spring',
                              stiffness: 300,
                              damping: 20,
                            }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[#0A3161]/20 bg-[#0A3161]/5 px-3 py-1 text-xs text-[#0A3161] dark:border-[#4da3ff]/30 dark:bg-[#4da3ff]/10 dark:text-sky-200"
                          >
                            <span className="font-semibold">{k}:</span> {v}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <p className="mt-auto pt-4 text-xs text-neutral-500 dark:text-slate-400">
                Product, country, HS code and year are filled in for you.
              </p>
            </Step>

            <Connector active={phase >= 3} />
            <Connector active={phase >= 3} vertical />

            {/* 3: results */}
            <Step n={3} Icon={TableProperties} title="You get records" on={phase === 3}>
              <ul className="min-h-[150px] space-y-2">
                {phase >= 3 &&
                  ex.rows.map((r, i) => {
                    const t = T[r.type];
                    return (
                      <motion.li
                        key={`${idx}-${i}`}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.15, duration: 0.45, ease: 'easeOut' }}
                        className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-2.5 dark:border-white/10 dark:bg-white/[0.05]"
                      >
                        <span
                          className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-linear-to-br text-white ${t.grad}`}
                        >
                          <t.Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-xs font-semibold text-neutral-950 dark:text-white">
                            {r.product}
                          </p>
                          <p className="truncate text-[11px] text-neutral-500 dark:text-slate-400">
                            {r.route}
                          </p>
                        </div>
                        <span
                          className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-bold ${t.soft}`}
                        >
                          HS {r.hs}
                        </span>
                      </motion.li>
                    );
                  })}
              </ul>
              <p className="mt-auto pt-4 text-xs text-neutral-500 dark:text-slate-400">
                Example records, shown for illustration.
              </p>
            </Step>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
