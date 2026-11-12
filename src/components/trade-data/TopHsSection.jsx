'use client';

import { useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';

// Section band colors: same as your current site (red for import, navy for export).
const BAND = {
  import: {
    bg: 'bg-[#B31942] bg-linear-to-br from-[#B31942] to-[#8f1334] dark:from-[#2b0a15] dark:to-[#0a0612]',
    glowA: 'bg-[#ff4d6d]/25',
    glowB: 'bg-[#4da3ff]/10',
    accent: 'text-[#ffd2da]',
    bar: 'from-white to-[#ffc2cd]',
  },
  export: {
    bg: 'bg-[#0A3161] bg-linear-to-br from-[#0A3161] to-[#06204a] dark:from-[#06122b] dark:to-[#050816]',
    glowA: 'bg-[#4da3ff]/30',
    glowB: 'bg-[#ff4d6d]/10',
    accent: 'text-[#cfe4ff]',
    bar: 'from-white to-[#bcdcff]',
  },
};

const R = 78;
const C = 2 * Math.PI * R;
const GAP = 3;

const fmt = (n) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Donut({ items, active, setActive, totalPct, totalLabel, accent }) {
  let cum = 0;
  const current = active != null ? items[active] : null;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[320px]">
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full -rotate-90"
        role="img"
        aria-label="Share of the top 10 commodities"
      >
        <circle
          cx="100"
          cy="100"
          r={R}
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="20"
        />
        {items.map((it, i) => {
          const len = (it.pct / 100) * C;
          const offset = -(cum / 100) * C;
          cum += it.pct;
          const on = active === i;
          return (
            <motion.circle
              key={it.hs}
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke="white"
              strokeWidth={on ? 25 : 20}
              strokeLinecap="butt"
              strokeDashoffset={offset}
              initial={{ strokeDasharray: `0 ${C}`, opacity: 0 }}
              whileInView={{
                strokeDasharray: `${Math.max(len - GAP, 0.5)} ${C}`,
                opacity: active == null || on ? 1 - i * 0.065 : 0.18,
              }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease: 'easeOut' }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{ cursor: 'pointer', transition: 'stroke-width .2s, opacity .2s' }}
            />
          );
        })}
      </svg>

      {/* centre label */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-12 text-center">
        <motion.span
          key={active ?? 'total'}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="font-serif text-4xl font-bold leading-none text-white"
        >
          {current ? `${current.pct}%` : `${totalPct.toFixed(1)}%`}
        </motion.span>
        <span className={`mt-2 text-[11px] font-medium leading-tight ${accent}`}>
          {current ? current.name : `Top 10 ${totalLabel}`}
        </span>
      </div>
    </div>
  );
}

export default function TopHsSection({ data }) {
  const t = data.topHs;
  const [active, setActive] = useState(null);
  if (!t) return null;
  const b = BAND[data.type];

  const max = Math.max(...t.items.map((i) => i.pct));
  const totalPct = t.items.reduce((s, i) => s + i.pct, 0);
  const totalValue = t.items.reduce((s, i) => s + i.value, 0);

  return (
    <MotionConfig reducedMotion="user">
      <section className={`relative overflow-hidden text-white ${b.bg}`}>
        {/* soft glows + faint grid */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_80%_70%_at_70%_40%,black,transparent)]" />
          <div
            className={`absolute -right-24 top-10 h-[460px] w-[460px] rounded-full blur-[120px] ${b.glowA}`}
          />
          <div
            className={`absolute -left-24 bottom-0 h-[380px] w-[380px] rounded-full blur-[120px] ${b.glowB}`}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-24">
          {/* heading + intro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-4xl"
          >
            <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {t.title}
              <span className="mx-3 hidden font-light text-white/40 sm:inline">|</span>
              <span className="block sm:inline">{t.subtitle}</span>
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-white/80">{t.intro}</p>
          </motion.div>

          <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
            {/* ---------- ranked list ---------- */}
            <motion.ol
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
              className="space-y-2.5"
            >
              {t.items.map((it, i) => (
                <motion.li
                  key={it.hs}
                  variants={{
                    hidden: { opacity: 0, x: -24 },
                    show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
                  }}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(i)}
                  onBlur={() => setActive(null)}
                  tabIndex={0}
                  className={`group relative overflow-hidden rounded-2xl border px-4 py-3 outline-none backdrop-blur-md transition-all duration-300 ${
                    active === i
                      ? 'translate-x-1 border-white/40 bg-white/20'
                      : 'border-white/10 bg-white/[0.07] hover:border-white/25'
                  } ${active != null && active !== i ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/15 font-serif text-sm font-bold">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <p className="text-sm font-semibold leading-snug sm:text-[15px]">
                          {it.name}
                        </p>
                        <span className="rounded-md bg-white/15 px-1.5 py-0.5 text-[10px] font-bold tracking-wide">
                          HS {it.hs}
                        </span>
                      </div>
                      {/* share bar */}
                      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(it.pct / max) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.9,
                            delay: 0.2 + i * 0.07,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`h-full rounded-full bg-linear-to-r ${b.bar}`}
                        />
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold sm:text-base">${fmt(it.value)}B</p>
                      <p className={`text-xs font-medium ${b.accent}`}>{it.pct}%</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </motion.ol>

            {/* ---------- donut panel ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl lg:sticky lg:top-24"
            >
              <Donut
                items={t.items}
                active={active}
                setActive={setActive}
                totalPct={totalPct}
                totalLabel={t.totalLabel}
                accent={b.accent}
              />
              <div className="mt-6 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-2xl bg-white/10 px-3 py-3">
                  <p className="font-serif text-xl font-bold">${fmt(totalValue)}B</p>
                  <p className={`mt-0.5 text-[11px] ${b.accent}`}>Top 10 total value</p>
                </div>
                <div className="rounded-2xl bg-white/10 px-3 py-3">
                  <p className="font-serif text-xl font-bold">{totalPct.toFixed(1)}%</p>
                  <p className={`mt-0.5 text-[11px] ${b.accent}`}>Combined share</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
