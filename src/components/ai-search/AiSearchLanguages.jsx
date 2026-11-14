'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Languages, Sparkles } from 'lucide-react';

/* Example questions in each language and the filters the AI would set. */
const LANGS = [
  {
    id: 'en',
    name: 'English',
    native: 'English',
    q: 'Fish export data of Maldives with HS code',
    filters: { Type: 'Export', Product: 'Fish', Country: 'Maldives', Extra: 'HS code' },
  },
  {
    id: 'hi',
    name: 'Hindi',
    native: 'हिन्दी',
    q: 'भारत से अमेरिका को चाय का निर्यात डेटा',
    filters: { Type: 'Export', Product: 'Tea', Country: 'India', Extra: 'To the US' },
  },
  {
    id: 'es',
    name: 'Spanish',
    native: 'Español',
    q: 'Importadores de café de Colombia en EE. UU.',
    filters: { Type: 'Import', Product: 'Coffee', Country: 'Colombia', Extra: 'Importers' },
  },
  {
    id: 'fr',
    name: 'French',
    native: 'Français',
    q: 'Données d’exportation de vin de France vers les États-Unis',
    filters: { Type: 'Export', Product: 'Wine', Country: 'France', Extra: 'To the US' },
  },
  {
    id: 'de',
    name: 'German',
    native: 'Deutsch',
    q: 'Maschinen aus Deutschland, die in die USA importiert werden',
    filters: { Type: 'Import', Product: 'Machinery', Country: 'Germany', Extra: 'Into the US' },
  },
  {
    id: 'zh',
    name: 'Chinese',
    native: '中文',
    q: '从中国进口到美国的电子产品数据',
    filters: { Type: 'Import', Product: 'Electronics', Country: 'China', Extra: 'Into the US' },
  },
  {
    id: 'ar',
    name: 'Arabic',
    native: 'العربية',
    q: 'بيانات استيراد التمور من الإمارات إلى الولايات المتحدة',
    filters: { Type: 'Import', Product: 'Dates', Country: 'UAE', Extra: 'Into the US' },
    rtl: true,
  },
  {
    id: 'pt',
    name: 'Portuguese',
    native: 'Português',
    q: 'Exportadores de calçados do Brasil para os EUA',
    filters: { Type: 'Export', Product: 'Footwear', Country: 'Brazil', Extra: 'Exporters' },
  },
];

const MORE = [
  'Japanese',
  'Korean',
  'Turkish',
  'Italian',
  'Russian',
  'Bengali',
  'Tamil',
  'Thai',
  'Indonesian',
  'Vietnamese',
];

export default function AiSearchLanguages() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setActive((i) => (i + 1) % LANGS.length), 4000);
    return () => clearInterval(t);
  }, [reduce, paused]);

  const cur = LANGS[active];

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            {/* ---------- left: copy + language picker ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0A3161] dark:border-white/10 dark:bg-white/5 dark:text-[#7cc4ff]">
                <Languages className="h-3.5 w-3.5" aria-hidden="true" />
                Works in your language
              </span>
              <h2 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                Ask in the language{' '}
                <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                  you think in.
                </span>
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-white/70">
                You do not need to translate your question first. Write it in your own language and
                the AI works out the product, the country and whether you mean imports or exports,
                then sets the filters for you.
              </p>

              {/* language chips */}
              <div className="mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Languages">
                {LANGS.map((l, i) => {
                  const on = i === active;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onClick={() => {
                        setActive(i);
                        setPaused(true);
                      }}
                      className={`relative rounded-full px-4 py-2 text-sm font-semibold transition ${
                        on
                          ? 'text-white'
                          : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10'
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="lang-pill"
                          className="absolute inset-0 rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161]"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{l.native}</span>
                    </button>
                  );
                })}
              </div>

              <p className="mt-6 text-sm text-slate-500 dark:text-white/55">
                And more, including {MORE.slice(0, 6).join(', ')} and others.
              </p>
            </motion.div>

            {/* ---------- right: translation spotlight ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="relative"
            >
              <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-linear-to-br from-[#B31942]/10 via-transparent to-[#0A3161]/15 blur-2xl dark:from-[#ff4d6d]/15 dark:to-[#4da3ff]/20" />

              <div className="relative rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cur.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* what the user types */}
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/50">
                      You type · {cur.name}
                    </p>
                    <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-white/10 dark:bg-white/5">
                      <p
                        dir={cur.rtl ? 'rtl' : 'ltr'}
                        lang={cur.id}
                        className="text-lg font-medium leading-snug text-slate-900 dark:text-white"
                      >
                        {cur.q}
                      </p>
                    </div>

                    {/* arrow */}
                    <div className="my-4 flex items-center gap-3 text-[#0A3161] dark:text-[#7cc4ff]">
                      <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                      <span className="flex items-center gap-1.5 text-xs font-semibold">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                        AI understands
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                      <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                    </div>

                    {/* filters it sets */}
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/50">
                      Filters it sets
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-3">
                      {Object.entries(cur.filters).map(([k, v], i) => (
                        <motion.div
                          key={k}
                          initial={{ opacity: 0, scale: 0.94 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.12 + i * 0.07 }}
                          className="rounded-xl border border-slate-200 px-3.5 py-3 dark:border-white/10 dark:bg-white/5"
                        >
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500 dark:text-white/50">
                            {k}
                          </p>
                          <p
                            className={`mt-0.5 text-sm font-semibold ${
                              k === 'Type'
                                ? v === 'Import'
                                  ? 'text-[#B31942] dark:text-[#ff8da0]'
                                  : 'text-[#0A3161] dark:text-[#7cc4ff]'
                                : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {v}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* progress dots */}
                <div className="mt-6 flex justify-center gap-1.5" aria-hidden="true">
                  {LANGS.map((l, i) => (
                    <span
                      key={l.id}
                      className={`h-1.5 rounded-full transition-all ${
                        i === active
                          ? 'w-6 bg-[#B31942] dark:bg-[#ff8da0]'
                          : 'w-1.5 bg-slate-300 dark:bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
