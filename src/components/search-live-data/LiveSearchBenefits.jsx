'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  BarChart3,
  Clock3,
  Globe2,
  Search,
  ShieldCheck,
  Ship,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: 'Competitive Advantage',
    description:
      'Stay ahead of competitors by getting access to quick search US trade data and making strategic choices based on accurate data.',
    color: 'rose',
  },
  {
    icon: Globe2,
    title: 'Market Intelligence',
    description:
      'Gain valuable insights into US market traits, client possibilities, and enterprise dynamics to manual your commercial enterprise approach.',
    color: 'blue',
  },
  {
    icon: TrendingUp,
    title: 'Risk Mitigation',
    description:
      'Identify the dangers which include supply chain disruptions, regulatory adjustments, or marketplace fluctuations to mitigate their impact proactively.',
    color: 'violet',
  },
  {
    icon: ShieldCheck,
    title: 'Opportunity Identification',
    description:
      'Discover new US markets, partners, or merchandise by analyzing live US trade data and statistics and uncovering hidden possibilities.',
    color: 'indigo',
  },
];

const suggestions = [
  'Cotton export data',
  'Cotton exports from India',
  'Cotton export HS code',
  'Cotton export to USA',
];

const colorStyles = {
  rose: 'bg-rose-100 text-[#B31942] dark:bg-rose-400/15 dark:text-rose-300',
  blue: 'bg-sky-100 text-sky-600 dark:bg-sky-400/15 dark:text-sky-300',
  violet: 'bg-violet-100 text-violet-600 dark:bg-violet-400/15 dark:text-violet-300',
  emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-300',
  orange: 'bg-orange-100 text-orange-600 dark:bg-orange-400/15 dark:text-orange-300',
  indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-400/15 dark:text-indigo-300',
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function LiveSearchBenefits() {
  const [query, setQuery] = useState('cotton export');

  return (
    <section
      id="live-search-benefits"
      className="relative overflow-hidden px-4 py-20 dark:bg-slate-950 sm:px-6 lg:px-8"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-40 h-96 w-96 rounded-full bg-[#B31942]/5 blur-[120px] dark:bg-[#ff4d6d]/10" />
        <div className="absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#4da3ff]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#B31942]/10 bg-[#B31942]/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#B31942] dark:border-rose-400/20 dark:bg-rose-400/10 dark:text-rose-300">
            <Search className="h-4 w-4" />
            Live Search Feature
          </div>

          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-[#0A3161] dark:text-white sm:text-4xl lg:text-5xl">
            Benefits of Using the Live Search Feature of{' '}
            <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff5a73] dark:to-[#4da3ff]">
              USImportdata
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
            Get instant, accurate and actionable trade data — faster than ever. Discover
            opportunities and make informed business decisions.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          {/* Left: Search and analytics preview */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Analytics preview */}
            <div className="relative mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_15px_50px_rgba(10,49,97,0.08)] dark:border-white/10 dark:bg-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 dark:border-white/10">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#0A3161] dark:text-sky-400" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-white">
                    Trade Analytics Preview
                  </span>
                </div>

                <span className="rounded-full bg-sky-50 px-3 py-1 text-[10px] font-semibold text-sky-700 dark:bg-sky-400/10 dark:text-sky-300">
                  Illustrative data
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 p-5">
                <div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Sample export value</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight text-[#0A3161] dark:text-white">
                    $12.8B
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <TrendingUp className="h-3.5 w-3.5" />
                    8.5% growth
                  </p>
                </div>

                <div className="flex items-center justify-end">
                  <svg
                    viewBox="0 0 220 100"
                    className="w-full max-w-[220px]"
                    fill="none"
                    aria-label="Illustrative upward trade trend chart"
                    role="img"
                  >
                    <path
                      d="M5 85 L42 63 L78 72 L116 44 L153 55 L190 24 L215 10"
                      stroke="#4DA3FF"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 85 L42 63 L78 72 L116 44 L153 55 L190 24 L215 10 L215 100 L5 100 Z"
                      fill="#4DA3FF"
                      fillOpacity="0.12"
                    />
                    {[42, 78, 116, 153, 190, 215].map((x, i) => (
                      <circle
                        key={x}
                        cx={x}
                        cy={[63, 72, 44, 55, 24, 10][i]}
                        r="3.5"
                        fill="#4DA3FF"
                      />
                    ))}
                  </svg>
                </div>
              </div>

              <div className="grid grid-cols-2 border-t border-slate-100 dark:border-white/10">
                <div className="flex items-center gap-3 p-4">
                  <Globe2 className="h-7 w-7 text-[#4DA3FF]" />
                  <div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Sample destination
                    </p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">
                      Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 border-l border-slate-100 p-4 dark:border-white/10">
                  <Ship className="h-7 w-7 text-[#B31942]" />
                  <div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Sample shipments
                    </p>
                    <p className="text-sm font-semibold text-slate-800 dark:text-white">2.1M</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Benefit cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_8px_30px_rgba(10,49,97,0.045)] transition-shadow hover:shadow-[0_16px_40px_rgba(10,49,97,0.10)] dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.07]"
                >
                  <div
                    className={`mb-5 grid h-12 w-12 place-items-center rounded-2xl ${colorStyles[benefit.color]}`}
                  >
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>

                  <h3 className="text-base font-semibold tracking-tight text-[#0A3161] dark:text-white sm:text-lg">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
