'use client';

import Image from 'next/image';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import {
  BadgeCheck,
  Eye,
  Flame,
  Gauge,
  Globe2,
  Lightbulb,
  Megaphone,
  Target,
  TrendingUp,
  UserPlus,
} from 'lucide-react';

const ICONS = {
  revenue: TrendingUp,
  expand: Globe2,
  marketing: Megaphone,
  brand: BadgeCheck,
  goals: Target,
  performance: Gauge,
  leads: UserPlus,
  demand: Flame,
  competitors: Eye,
  strategy: Lightbulb,
};

// import = red, export = blue (same as the rest of the site)
const ACCENT = {
  import: {
    grad: 'from-[#B31942] to-[#ff4d6d]',
    hex: '#B31942',
    hexDark: '#ff4d6d',
    text: 'text-[#B31942] dark:text-[#ff8da0]',
    hover: 'hover:border-[#B31942]/40 dark:hover:border-[#ff4d6d]/40',
    blob: 'bg-[#ff4d6d]/15',
    blob2: 'bg-[#4da3ff]/10',
  },
  export: {
    grad: 'from-[#0A3161] to-[#4da3ff]',
    hex: '#0A3161',
    hexDark: '#4da3ff',
    text: 'text-[#0A3161] dark:text-[#7cc4ff]',
    hover: 'hover:border-[#0A3161]/40 dark:hover:border-[#4da3ff]/40',
    blob: 'bg-[#4da3ff]/15',
    blob2: 'bg-[#ff4d6d]/10',
  },
};

/* ------------------------------------------------------------------ */
/* Animated dashboard illustration (used when no `image` is given)     */
/* ------------------------------------------------------------------ */
const BARS = [30, 44, 36, 58, 48, 70, 54, 64, 40, 74, 60, 80];
const LINE = [
  [12, 72],
  [38, 58],
  [64, 66],
  [90, 42],
  [116, 52],
  [142, 30],
  [168, 46],
  [194, 24],
  [220, 40],
  [246, 20],
  [272, 34],
];
const R = 34;
const C = 2 * Math.PI * R;

function Dashboard({ accent }) {
  const reduce = useReducedMotion();
  const float = (d, delay = 0, amp = 8) =>
    reduce
      ? {}
      : {
          animate: { y: [0, -amp, 0] },
          transition: { duration: d, repeat: Infinity, ease: 'easeInOut', delay },
        };
  const linePath = LINE.map(([x, y], i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ');

  return (
    <div className="relative mx-auto aspect-[1.05/1] w-full max-w-[560px]">
      {/* glow */}
      <div className={`absolute inset-[12%] rounded-full blur-3xl ${accent.blob}`} />

      {/* globe outline, top right */}
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute -right-2 -top-4 h-[28%] w-[28%] text-neutral-300 dark:text-white/20"
        {...float(7, 0.4, 6)}
        aria-hidden="true"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="44" />
          <ellipse cx="50" cy="50" rx="44" ry="14" />
          <motion.ellipse
            cx="50"
            cy="50"
            ry="44"
            rx="30"
            animate={reduce ? undefined : { rx: [4, 44, 4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <line x1="50" y1="6" x2="50" y2="94" />
        </g>
      </motion.svg>

      {/* faint donut card, top left */}
      <motion.div
        {...float(6, 0.2, 6)}
        className="absolute left-0 top-[6%] grid h-[22%] w-[22%] place-items-center rounded-xl border border-neutral-200 bg-neutral-100/80 dark:border-white/10 dark:bg-white/5"
        aria-hidden="true"
      >
        <div className="h-[55%] w-[55%] rounded-full border-[6px] border-neutral-200 border-t-neutral-300 dark:border-white/10 dark:border-t-white/25" />
      </motion.div>

      {/* main browser window */}
      <motion.div
        {...float(5.5, 0, 7)}
        className="absolute left-[14%] top-[10%] w-[68%] overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_24px_70px_rgba(20,20,60,0.15)] dark:border-white/10 dark:bg-slate-900/80 dark:shadow-[0_8px_50px_rgba(0,0,0,0.55)] dark:backdrop-blur-xl"
      >
        <div className="flex items-center gap-1.5 border-b border-neutral-100 bg-neutral-100 px-3 py-2 dark:border-white/10 dark:bg-white/5">
          <i className="h-2 w-2 rounded-full bg-neutral-400 dark:bg-white/40" />
          <i className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-white/25" />
          <i className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-white/25" />
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            {/* skeleton text lines */}
            <div className="mt-2 flex-1 space-y-2" aria-hidden="true">
              {[100, 78, 90, 64, 84].map((w, i) => (
                <motion.i
                  key={i}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
                  style={{ width: `${w}%`, transformOrigin: 'left' }}
                  className="block h-1 rounded-full bg-neutral-200 dark:bg-white/15"
                />
              ))}
            </div>

            {/* donut */}
            <div className="relative h-20 w-20 shrink-0">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
                <circle
                  cx="50"
                  cy="50"
                  r={R}
                  fill="none"
                  strokeWidth="11"
                  className="stroke-neutral-100 dark:stroke-white/10"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r={R}
                  fill="none"
                  strokeWidth="11"
                  strokeLinecap="round"
                  className="stroke-[var(--acc)] dark:stroke-[var(--acc-dark)]"
                  style={{ '--acc': accent.hex, '--acc-dark': accent.hexDark }}
                  initial={{ strokeDasharray: `0 ${C}` }}
                  whileInView={{ strokeDasharray: `${C * 0.75} ${C}` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: 0.3, ease: 'easeOut' }}
                />
              </svg>
              <span className="absolute inset-0 grid place-items-center text-xs font-bold text-neutral-900 dark:text-white">
                75%
              </span>
            </div>
          </div>

          {/* bars + line chart */}
          <svg viewBox="0 0 290 100" className="mt-4 w-full" aria-hidden="true">
            {BARS.map((h, i) => (
              <motion.rect
                key={i}
                x={8 + i * 24}
                y={96 - h}
                width="14"
                height={h}
                rx="3"
                className="fill-neutral-100 dark:fill-white/10"
                style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 + i * 0.05, ease: 'easeOut' }}
              />
            ))}
            <motion.path
              d={linePath}
              fill="none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-[var(--acc)] dark:stroke-[var(--acc-dark)]"
              style={{ '--acc': accent.hex, '--acc-dark': accent.hexDark }}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: 0.6, ease: 'easeInOut' }}
            />
            {LINE.filter((_, i) => i % 2 === 0).map(([x, y], i) => (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r="3.5"
                className="fill-[var(--acc)] dark:fill-[var(--acc-dark)]"
                style={{ '--acc': accent.hex, '--acc-dark': accent.hexDark }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 + i * 0.15 }}
              />
            ))}
          </svg>
        </div>
      </motion.div>

      {/* small document card, right */}
      <motion.div
        {...float(6.5, 0.8, 7)}
        className="absolute right-0 top-[34%] w-[20%] rounded-xl border border-neutral-200 bg-white p-2.5 shadow-lg dark:border-white/10 dark:bg-slate-900/80 dark:backdrop-blur"
        aria-hidden="true"
      >
        <div className="space-y-1.5">
          {[100, 70, 90, 60, 80, 50].map((w, i) => (
            <i
              key={i}
              style={{ width: `${w}%` }}
              className="block h-0.5 rounded-full bg-neutral-200 dark:bg-white/15"
            />
          ))}
        </div>
      </motion.div>

      {/* mini bar card, bottom left */}
      <motion.div
        {...float(5, 0.5, 8)}
        className="absolute bottom-[10%] left-[6%] w-[34%] rounded-xl border border-neutral-200 bg-white p-3 shadow-xl dark:border-white/10 dark:bg-slate-900/80 dark:backdrop-blur"
        aria-hidden="true"
      >
        <div className="flex h-12 items-end gap-1">
          {[40, 70, 50, 85, 60, 95, 55, 80].map((h, i) => (
            <motion.i
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.06 }}
              style={{ height: `${h}%`, transformOrigin: 'bottom' }}
              className={`flex-1 rounded-sm bg-linear-to-t ${accent.grad}`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const row = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function BenefitsSection({ data }) {
  const b = data.benefits;
  if (!b) return null;
  const a = ACCENT[data.type];

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-neutral-50/70 dark:bg-[#050816]">
        <div className="pointer-events-none absolute inset-0">
          <div
            className={`absolute -left-24 top-20 h-80 w-80 rounded-full blur-[120px] ${a.blob}`}
          />
          <div
            className={`absolute -right-24 bottom-10 h-80 w-80 rounded-full blur-[120px] ${a.blob2}`}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* ---------- left: heading + benefits ---------- */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-4xl lg:text-5xl">
                  {b.title}
                </h2>
                <div className={`mt-4 h-1 w-20 rounded-full bg-linear-to-r ${a.grad}`} />
              </motion.div>

              <motion.ul
                variants={list}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="mt-8 space-y-3"
              >
                {b.items.map((it, i) => {
                  const Icon = ICONS[it.icon] || BadgeCheck;
                  return (
                    <motion.li key={it.text} variants={row}>
                      <motion.div
                        whileHover={{ x: 6 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                        className={`group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_8px_30px_rgba(20,20,60,0.05)] transition-colors dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.10] dark:to-white/[0.03] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] dark:backdrop-blur-xl ${a.hover}`}
                      >
                        <span
                          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-linear-to-br text-white shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${a.grad}`}
                        >
                          <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <p className="flex-1 text-[15px] font-medium leading-snug text-neutral-800 dark:text-slate-200">
                          {it.text}
                        </p>
                        <span
                          className={`font-serif text-2xl font-bold opacity-20 transition-opacity group-hover:opacity-60 ${a.text}`}
                          aria-hidden="true"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </motion.div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>

            {/* ---------- right: illustration ---------- */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {b.image ? (
                <Image
                  src={b.image}
                  alt={b.title}
                  width={560}
                  height={520}
                  className="mx-auto h-auto w-full max-w-[560px]"
                />
              ) : (
                <Dashboard accent={a} />
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
