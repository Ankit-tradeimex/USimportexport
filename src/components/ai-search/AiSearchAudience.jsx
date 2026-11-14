'use client';
import { MotionConfig, motion } from 'framer-motion';
import { BarChart3, Handshake, PackageSearch, Sparkles, Ship, Store, Truck } from 'lucide-react';

const PEOPLE = [
  {
    Icon: PackageSearch,
    title: 'Importers & sourcing teams',
    text: 'Find new suppliers, compare countries and see who already ships what you need.',
    ask: 'Top suppliers of ceramic tiles to the US from Spain',
    span: 'lg:col-span-2',
    tone: 'red',
  },
  {
    Icon: Store,
    title: 'Exporters',
    text: 'Spot the US buyers for your product and see where your competitors sell.',
    ask: 'Which US companies import frozen shrimp from Ecuador?',
    span: 'lg:col-span-1',
    tone: 'blue',
  },
  {
    Icon: Handshake,
    title: 'Sales & business development',
    text: 'Build lead lists from real shipments instead of guessing who might buy.',
    ask: 'Importers of organic spices from India',
    span: 'lg:col-span-1',
    tone: 'blue',
  },
  {
    Icon: Truck,
    title: 'Freight forwarders & logistics',
    text: 'Follow lanes, ports and container movement to find shippers and plan capacity.',
    ask: 'Containers of machinery arriving at Savannah from Germany',
    span: 'lg:col-span-2',
    tone: 'red',
  },
  {
    Icon: BarChart3,
    title: 'Market researchers & analysts',
    text: 'Check volumes and year-on-year changes without building a query first.',
    ask: 'Compare US solar panel imports from 2023 to 2025',
    span: 'lg:col-span-2',
    tone: 'red',
  },
  {
    Icon: Ship,
    title: 'Customs brokers & compliance',
    text: 'Look up the right HS code and check records for a product in plain words.',
    ask: 'What is the HS code for lithium-ion batteries?',
    span: 'lg:col-span-1',
    tone: 'blue',
  },
];

const TONES = {
  red: {
    icon: 'from-[#B31942] to-[#ff4d6d]',
    ask: 'border-[#B31942]/25 text-[#B31942] dark:border-[#ff4d6d]/30 dark:text-[#ff8da0]',
    glow: 'from-[#B31942]/10 dark:from-[#ff4d6d]/20',
  },
  blue: {
    icon: 'from-[#0A3161] to-[#4da3ff]',
    ask: 'border-[#0A3161]/25 text-[#0A3161] dark:border-[#4da3ff]/30 dark:text-[#7cc4ff]',
    glow: 'from-[#0A3161]/10 dark:from-[#4da3ff]/20',
  },
};

export default function AiSearchAudience() {
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
              Who it&apos;s for
            </span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Built for anyone who works{' '}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                with US trade.
              </span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-white/70">
              You do not need to be a data expert. If you can describe what you are looking for, you
              can search it.
            </p>
          </motion.div>

          {/* bento grid */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PEOPLE.map(({ Icon, title, text, ask, span, tone }, i) => {
              const t = TONES[tone];
              return (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                  whileHover={{ y: -4 }}
                  className={`group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl sm:p-7 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl ${span}`}
                >
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-linear-to-br ${t.glow} to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  <span
                    className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br ${t.icon} text-white shadow-md`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-5 text-lg font-semibold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/70">
                    {text}
                  </p>
                  <p
                    className={`relative mt-5 rounded-xl border border-dashed px-3.5 py-2.5 text-sm font-medium italic ${t.ask}`}
                  >
                    “{ask}”
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
