'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { Globe2, Loader2, Search, Sparkles } from 'lucide-react';

// Rotating placeholder: shows that any language works.
const EXAMPLES = [
  'Show me fish export data of Maldives with HS code',
  'सेब का आयात डेटा दिखाओ',
  'Datos de importación de café de Brasil 2025',
  'Top importers of electronics from China',
  '显示印度的棉花出口数据',
];

const SUGGESTIONS = [
  { lang: 'EN', text: 'Show me fish export data of Maldives with HS code' },
  { lang: 'EN', text: 'Who imports cotton from India in 2025?' },
  { lang: 'HI', text: 'चावल का निर्यात डेटा दिखाओ' },
  { lang: 'ES', text: 'Datos de importación de café de Brasil' },
  { lang: 'ZH', text: '显示中国电子产品进口数据' },
  { lang: 'FR', text: 'Exportations de vin vers la France' },
];

export default function AiSearchBar() {
  const reduce = useReducedMotion();
  const inputRef = useRef(null);

  const [value, setValue] = useState('');
  const [typed, setTyped] = useState(EXAMPLES[0]);
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);

  // typewriter placeholder (stops while the user is typing)
  useEffect(() => {
    if (reduce || value || focused) return;
    let i = 0;
    let pos = 0;
    let dir = 1;
    let timer;
    const tick = () => {
      const full = EXAMPLES[i];
      pos += dir;
      setTyped(full.slice(0, pos) || ' ');
      let wait = dir === 1 ? 55 : 25;
      if (dir === 1 && pos >= full.length) {
        dir = -1;
        wait = 1600;
      } else if (dir === -1 && pos <= 0) {
        dir = 1;
        i = (i + 1) % EXAMPLES.length;
        wait = 350;
      }
      timer = setTimeout(tick, wait);
    };
    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [reduce, value, focused]);

  const submit = (e) => {
    e.preventDefault();
  };

  const pick = (text) => {
    setValue(text);
    inputRef.current?.focus();
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="mx-auto w-full max-w-3xl">
        {/* badge */}
        <div className="mb-4 flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-sky-200 dark:backdrop-blur">
            <Sparkles
              className="h-3.5 w-3.5 text-[#B31942] dark:text-[#ff8da0]"
              aria-hidden="true"
            />
            AI Search
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500 dark:text-slate-400">
            <Globe2 className="h-3.5 w-3.5" aria-hidden="true" />
            Ask in any language, no filters needed
          </span>
        </div>

        {/* search bar with animated gradient border */}
        <form onSubmit={submit} role="search">
          <motion.div
            animate={reduce ? undefined : { backgroundPosition: ['0% 50%', '200% 50%'] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
            className={`rounded-2xl bg-linear-to-r from-[#B31942] via-[#4da3ff] via-60% to-[#B31942] bg-[length:200%_100%] p-px transition-shadow duration-300 ${
              focused
                ? 'shadow-[0_10px_50px_rgba(77,163,255,0.35)]'
                : 'shadow-[0_10px_40px_rgba(15,40,100,0.10)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)]'
            }`}
          >
            <div className="flex items-center gap-2 rounded-[15px] bg-white p-2 dark:bg-slate-950/95 dark:backdrop-blur-xl">
              <Sparkles
                className="ml-2 hidden h-5 w-5 shrink-0 text-[#0A3161] sm:block dark:text-[#4da3ff]"
                aria-hidden="true"
              />
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={typed}
                aria-label="Describe the trade data you want, in any language"
                maxLength={300}
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-white dark:placeholder:text-slate-500 sm:text-base"
              />
              <button
                type="submit"
                disabled={loading || !value.trim()}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl gradient px-4 py-3 text-sm font-medium text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50 dark:shadow-[0_10px_30px_rgba(77,163,255,0.35)] sm:px-6"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Search className="h-4 w-4" aria-hidden="true" />
                )}
                <span className="hidden sm:inline">{loading ? 'Understanding…' : 'Search'}</span>
                <span className="sr-only sm:hidden">Search</span>
              </button>
            </div>
          </motion.div>
        </form>

        <motion.ul
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
          }}
          className="mt-5 flex flex-wrap justify-center gap-2"
          aria-label="Search suggestions"
        >
          {SUGGESTIONS.map((s) => (
            <motion.li
              key={s.text}
              variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
            >
              <button
                type="button"
                onClick={() => pick(s.text)}
                className="group cursor-pointer inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs text-neutral-700 transition hover:-translate-y-0.5 hover:border-[#0A3161]/40 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:backdrop-blur dark:hover:border-[#4da3ff]/50 dark:hover:bg-white/10"
              >
                <span className="rounded bg-neutral-100 px-1.5 py-0.5 text-[9px] font-bold tracking-wider text-neutral-500 dark:bg-white/10 dark:text-slate-400">
                  {s.lang}
                </span>
                {s.text}
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </MotionConfig>
  );
}
