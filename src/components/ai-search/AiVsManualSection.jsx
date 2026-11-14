'use client';
import { MotionConfig, motion } from 'framer-motion';
import {
  Check,
  Languages,
  MessageSquareText,
  SlidersHorizontal,
  Sparkles,
  Zap,
} from 'lucide-react';

const MANUAL_STEPS = [
  'Choose import or export',
  'Enter the product or HS code',
  'Pick the country',
  'Set the year',
  'Add any extra filters',
  'Press search',
];

const AI_STEPS = ['Type your question in a sentence', 'Get matching records'];

const ROWS = [
  {
    Icon: Zap,
    label: 'Speed to first result',
    ai: 'One sentence, then results',
    manual: 'Fill the filters, then search',
  },
  {
    Icon: Languages,
    label: 'Language',
    ai: 'Ask in your own language',
    manual: 'Filters are in English',
  },
  {
    Icon: MessageSquareText,
    label: 'Learning curve',
    ai: 'None. Write it like you would say it',
    manual: 'Know your HS code or exact product name',
  },
  {
    Icon: SlidersHorizontal,
    label: 'Control',
    ai: 'AI sets the filters, you can adjust them',
    manual: 'You choose every filter yourself',
  },
];

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.5, delay },
});

export default function AiVsManualSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl">
          {/* heading */}
          <motion.div {...fade()} className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0A3161] dark:border-white/10 dark:bg-white/5 dark:text-[#7cc4ff]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              AI search vs manual search
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Same records.{' '}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                Fewer steps.
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-white/70">
              Both ways lead to the same live US shipment data. The difference is how much you have
              to do to get there.
            </p>
          </motion.div>

          {/* versus panels */}
          <div className="relative mt-12 grid gap-6 lg:grid-cols-2">
            {/* VS badge */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-linear-to-br from-[#B31942] to-[#0A3161] text-sm font-bold text-white shadow-lg ring-4 ring-white lg:flex dark:ring-[#07071f]">
              VS
            </div>

            {/* AI */}
            <motion.div
              {...fade(0.05)}
              className="rounded-3xl border border-[#0A3161]/20 bg-white p-6 shadow-lg sm:p-8 dark:border-[#4da3ff]/30 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-[#0A3161] to-[#4da3ff] text-white">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    AI search
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-white/65">Just ask</p>
                </div>
                <span className="ml-auto rounded-full bg-[#0A3161]/10 px-3 py-1 text-xs font-semibold text-[#0A3161] dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff]">
                  {AI_STEPS.length} steps
                </span>
              </div>

              <ol className="mt-6 space-y-3">
                {AI_STEPS.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.12 }}
                    className="flex items-center gap-3 rounded-xl bg-[#0A3161]/5 px-4 py-3 text-sm font-medium text-slate-800 dark:bg-white/5 dark:text-white"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0A3161] text-xs font-bold text-white dark:bg-[#4da3ff] dark:text-[#07071f]">
                      {i + 1}
                    </span>
                    {s}
                  </motion.li>
                ))}
              </ol>

              <div className="mt-5 rounded-xl border border-dashed border-[#0A3161]/25 px-4 py-3 text-sm italic text-slate-600 dark:border-white/20 dark:text-white/70">
                “Fish export data of Maldives with HS code”
              </div>
            </motion.div>

            {/* Manual */}
            <motion.div
              {...fade(0.15)}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-[#B31942] to-[#ff4d6d] text-white">
                  <SlidersHorizontal className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    Manual search
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-white/65">
                    Set every filter yourself
                  </p>
                </div>
                <span className="ml-auto rounded-full bg-[#B31942]/10 px-3 py-1 text-xs font-semibold text-[#B31942] dark:bg-[#ff4d6d]/15 dark:text-[#ff8da0]">
                  {MANUAL_STEPS.length} steps
                </span>
              </div>

              <ol className="mt-6 space-y-3">
                {MANUAL_STEPS.map((s, i) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-800 dark:bg-white/5 dark:text-white"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#B31942] text-xs font-bold text-white dark:bg-[#ff8da0] dark:text-[#07071f]">
                      {i + 1}
                    </span>
                    {s}
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </div>

          {/* comparison rows */}
          <motion.div
            {...fade(0.1)}
            className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:backdrop-blur-xl"
          >
            <div className="hidden grid-cols-[1.1fr_1.5fr_1.5fr] gap-4 border-b border-slate-200 bg-slate-50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-slate-500 sm:grid dark:border-white/10 dark:bg-white/5 dark:text-white/50">
              <span />
              <span className="text-[#0A3161] dark:text-[#7cc4ff]">AI search</span>
              <span className="text-[#B31942] dark:text-[#ff8da0]">Manual search</span>
            </div>
            {ROWS.map(({ Icon, label, ai, manual }, i) => (
              <div
                key={label}
                className={`grid gap-2 px-6 py-4 sm:grid-cols-[1.1fr_1.5fr_1.5fr] sm:items-center sm:gap-4 ${
                  i ? 'border-t border-slate-100 dark:border-white/10' : ''
                }`}
              >
                <p className="flex items-center gap-2.5 text-sm font-semibold text-slate-900 dark:text-white">
                  <Icon className="h-4 w-4 text-slate-400 dark:text-white/50" aria-hidden="true" />
                  {label}
                </p>
                <p className="flex items-start gap-2 text-sm text-slate-700 dark:text-white/80">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#0A3161] dark:text-[#7cc4ff]"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="mr-1 text-xs font-semibold uppercase text-[#0A3161] sm:hidden dark:text-[#7cc4ff]">
                      AI:
                    </span>
                    {ai}
                  </span>
                </p>
                <p className="flex items-start gap-2 text-sm text-slate-700 dark:text-white/80">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#B31942] dark:text-[#ff8da0]"
                    aria-hidden="true"
                  />
                  <span>
                    <span className="mr-1 text-xs font-semibold uppercase text-[#B31942] sm:hidden dark:text-[#ff8da0]">
                      Manual:
                    </span>
                    {manual}
                  </span>
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
