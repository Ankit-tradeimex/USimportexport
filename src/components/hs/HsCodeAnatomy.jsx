'use client';
import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';

/* Example: HS 8517.13 (smartphones). Check the wording against the version of the HS you use. */
const PARTS = [
  {
    key: 'chapter',
    digits: '85',
    label: 'Chapter',
    title: 'Electrical machinery and equipment',
    text: 'The first two digits tell you the broad kind of product. Chapter 85 covers electrical machinery and equipment, including phones and electronics.',
    color: 'bg-[#0A3161] text-white dark:bg-[#1c5fb0]',
    ring: 'ring-[#0A3161]/30 dark:ring-[#4da3ff]/40',
  },
  {
    key: 'heading',
    digits: '17',
    label: 'Heading',
    title: 'Telephone sets and other apparatus for communication',
    text: 'Digits three and four narrow it down to a heading. Together with the chapter they make the 4-digit code 8517.',
    color: 'bg-[#B31942] text-white',
    ring: 'ring-[#B31942]/30 dark:ring-[#ff4d6d]/40',
  },
  {
    key: 'sub',
    digits: '13',
    label: 'Subheading',
    title: 'Smartphones',
    text: 'Digits five and six give the subheading, the 6-digit code 8517.13. These six digits are shared by almost every country.',
    color: 'bg-[#5c2150] text-white dark:bg-[#8b3a8a]',
    ring: 'ring-[#5c2150]/30 dark:ring-[#c77dc4]/40',
  },
  {
    key: 'ext',
    digits: '00',
    label: 'National digits',
    title: 'Added by each country',
    text: 'Each country can add more digits for its own duties and statistics. The US adds digits to make its 8 and 10-digit tariff codes.',
    color: 'bg-slate-200 text-slate-700 dark:bg-white/15 dark:text-white/80',
    ring: 'ring-slate-300 dark:ring-white/30',
  },
];

export default function HsCodeAnatomy() {
  const [active, setActive] = useState('chapter');
  const part = PARTS.find((p) => p.key === active);

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              How to read an{' '}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                HS code
              </span>
            </h2>
            <p className="mt-3 text-slate-600 dark:text-white/70">
              Every pair of digits narrows the product down. Tap a part to see what it means.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-10 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
          >
            {/* digits */}
            <div
              role="tablist"
              aria-label="Parts of an HS code"
              className="flex items-end justify-center gap-2 sm:gap-3"
            >
              {PARTS.map((p, i) => {
                const on = p.key === active;
                return (
                  <div key={p.key} className="flex items-end gap-2 sm:gap-3">
                    {i === 3 && (
                      <span className="pb-3 text-3xl font-bold text-slate-300 sm:text-5xl dark:text-white/25">
                        .
                      </span>
                    )}
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      onMouseEnter={() => setActive(p.key)}
                      onFocus={() => setActive(p.key)}
                      onClick={() => setActive(p.key)}
                      className="group flex flex-col items-center gap-2 outline-none"
                    >
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider transition-opacity sm:text-xs ${on ? 'opacity-100 text-slate-700 dark:text-white' : 'opacity-50 text-slate-500 dark:text-white/60'}`}
                      >
                        {p.label}
                      </span>
                      <motion.span
                        animate={{ y: on ? -6 : 0, scale: on ? 1.06 : 1 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                        className={`flex h-16 w-14 items-center justify-center rounded-2xl font-mono text-3xl font-bold shadow-lg ring-4 transition-[box-shadow,opacity] sm:h-24 sm:w-24 sm:text-5xl ${p.color} ${on ? p.ring : 'ring-transparent opacity-70'}`}
                      >
                        {p.digits}
                      </motion.span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* explanation */}
            <div className="mt-10 min-h-[110px] text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={part.key}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-xl font-semibold text-slate-900 dark:text-white">
                    {part.title}
                  </p>
                  <p className="mx-auto mt-2 max-w-xl text-slate-600 dark:text-white/70">
                    {part.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
