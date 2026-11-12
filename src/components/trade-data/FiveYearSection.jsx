'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  MotionConfig,
  animate,
  motion,
  useInView,
  useReducedMotion,
} from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Pause, Play, Quote, RotateCcw } from 'lucide-react';
import {
  BR,
  CA,
  CN,
  DE,
  FR,
  GB,
  IE,
  IN,
  JP,
  KR,
  MX,
  NL,
  TW,
  VN,
} from 'country-flag-icons/react/3x2';

// add more flags here if your data uses other country codes
const FLAGS = { BR, CA, CN, DE, FR, GB, IE, IN, JP, KR, MX, NL, TW, VN };

const ACCENT = {
  import: {
    bar: 'from-[#B31942] to-[#ff4d6d]',
    text: 'text-[#B31942] dark:text-[#ff8da0]',
    panel:
      'from-[#B31942] via-[#7d1740] to-[#0A3161] dark:from-[#4a0d20] dark:via-[#1c0b2e] dark:to-[#06122b]',
    blob: 'bg-[#ff4d6d]/12',
    blob2: 'bg-[#4da3ff]/10',
    dot: '#ff4d6d',
  },
  export: {
    bar: 'from-[#0A3161] to-[#4da3ff]',
    text: 'text-[#0A3161] dark:text-[#7cc4ff]',
    panel:
      'from-[#0A3161] via-[#3a2a6b] to-[#B31942] dark:from-[#06122b] dark:via-[#1a1240] dark:to-[#4a0d20]',
    blob: 'bg-[#4da3ff]/12',
    blob2: 'bg-[#ff4d6d]/10',
    dot: '#4da3ff',
  },
};

/* number that tweens to its new value */
function Tween({ value, decimals = 2, prefix = '', suffix = '' }) {
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  const from = useRef(value);

  useEffect(() => {
    if (reduce) {
      setShown(value);
      from.current = value;
      return;
    }
    const c = animate(from.current, value, {
      duration: 0.8,
      ease: 'easeOut',
      onUpdate: (v) => {
        from.current = v;
        setShown(v);
      },
    });
    return () => c.stop();
  }, [value, reduce]);

  return (
    <>
      {prefix}
      {shown.toFixed(decimals)}
      {suffix}
    </>
  );
}

export default function FiveYearSection({ data }) {
  const f = data.fiveYear;
  const reduce = useReducedMotion();
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { once: true, amount: 0.35 });

  const last = f ? f.years.length - 1 : 0;
  const [yi, setYi] = useState(last); // start on the latest year so content is always visible
  const [playing, setPlaying] = useState(false);

  // start the race once, when the section scrolls into view
  useEffect(() => {
    if (!inView || reduce) return;
    setYi(0);
    setPlaying(true);
  }, [inView, reduce]);

  // advance one year at a time
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setYi((i) => {
        if (i >= last) {
          setPlaying(false);
          return i;
        }
        return i + 1;
      });
    }, 2300);
    return () => clearInterval(id);
  }, [playing, last]);

  if (!f) return null;
  const a = ACCENT[data.type];

  const gmax = Math.max(...f.rows.flatMap((r) => r.values));
  const rankIn = (yearIdx) => {
    const order = [...f.rows]
      .sort((x, y) => y.values[yearIdx] - x.values[yearIdx])
      .map((r) => r.name);
    return (name) => order.indexOf(name) + 1;
  };
  const rankNow = rankIn(yi);
  const rankPrev = yi > 0 ? rankIn(yi - 1) : null;
  const sorted = [...f.rows].sort((x, y) => y.values[yi] - x.values[yi]);

  const tot = f.total.values;
  const totalNow = tot[yi];
  const totalChange = yi > 0 ? ((tot[yi] - tot[yi - 1]) / tot[yi - 1]) * 100 : null;

  // totals sparkline
  const sw = 240;
  const sh = 70;
  const tmin = Math.min(...tot);
  const tmax = Math.max(...tot);
  const sx = (i) => 10 + (i * (sw - 20)) / last;
  const sy = (v) => sh - 12 - ((v - tmin) / (tmax - tmin || 1)) * (sh - 28);

  const pick = (i) => {
    setPlaying(false);
    setYi(i);
  };
  const toggle = () => {
    if (!playing && yi >= last) setYi(0); // replay
    setPlaying((p) => !p);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-neutral-50/70 dark:bg-[#050816]">
        <div className="pointer-events-none absolute inset-0">
          <div
            className={`absolute -left-24 top-32 h-80 w-80 rounded-full blur-[120px] ${a.blob}`}
          />
          <div
            className={`absolute -right-24 bottom-20 h-80 w-80 rounded-full blur-[120px] ${a.blob2}`}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-24">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-center"
          >
            <h2 className="mx-auto max-w-4xl font-serif text-3xl font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
              {f.title}
            </h2>
            <div className="mt-5 flex items-center justify-center gap-3" aria-hidden="true">
              <span className="h-0.5 w-20 bg-[#0A3161] dark:bg-[#4da3ff]" />
            </div>
          </motion.div>

          <div ref={wrapRef} className="mt-12 grid gap-5 lg:grid-cols-[340px_1fr]">
            {/* ---------- left: year + total panel ---------- */}
            <motion.aside
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className={`relative overflow-hidden rounded-3xl bg-linear-to-br p-6 text-white shadow-[0_24px_70px_rgba(10,20,80,0.35)] lg:sticky lg:top-24 lg:self-start ${a.panel}`}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

              <p className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                Year
              </p>
              <div className="relative h-24 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={f.years[yi]}
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="font-serif text-7xl font-bold leading-none tracking-tight"
                  >
                    {f.years[yi]}
                  </motion.p>
                </AnimatePresence>
              </div>

              <div className="relative mt-4 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-white/70">
                  {f.total.label}
                </p>
                <p className="mt-1 font-serif text-3xl font-bold">
                  <Tween value={totalNow} prefix="$" suffix=" trillion" />
                </p>
                {totalChange != null && (
                  <p
                    className={`mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                      totalChange >= 0
                        ? 'bg-emerald-400/20 text-emerald-200'
                        : 'bg-red-400/20 text-red-200'
                    }`}
                  >
                    {totalChange >= 0 ? (
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <ArrowDownRight className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {Math.abs(totalChange).toFixed(1)}% vs {f.years[yi - 1]}
                  </p>
                )}

                {/* totals sparkline */}
                <svg viewBox={`0 0 ${sw} ${sh}`} className="mt-3 w-full" aria-hidden="true">
                  <polyline
                    points={tot.map((v, i) => `${sx(i)},${sy(v)}`).join(' ')}
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {tot.map((v, i) => (
                    <circle
                      key={i}
                      cx={sx(i)}
                      cy={sy(v)}
                      r={i === yi ? 6 : 3.5}
                      fill={i === yi ? '#fff' : 'rgba(255,255,255,0.55)'}
                      style={{ transition: 'r .3s' }}
                    />
                  ))}
                </svg>
              </div>

              {/* year pills + play */}
              <div className="relative mt-5 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={toggle}
                  aria-label={playing ? 'Pause' : yi >= last ? 'Replay' : 'Play'}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white text-neutral-900 shadow-lg transition hover:scale-105"
                >
                  {playing ? (
                    <Pause className="h-4 w-4" fill="currentColor" />
                  ) : yi >= last ? (
                    <RotateCcw className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" fill="currentColor" />
                  )}
                </button>
                {f.years.map((yr, i) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => pick(i)}
                    aria-pressed={i === yi}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      i === yi
                        ? 'bg-white text-neutral-900'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    {yr}
                  </button>
                ))}
              </div>
            </motion.aside>

            {/* ---------- right: the race ---------- */}
            <div>
              <ol className="space-y-2">
                {sorted.map((r) => {
                  const Flag = FLAGS[r.flag];
                  const v = r.values[yi];
                  const rank = rankNow(r.name);
                  const delta = rankPrev ? rankPrev(r.name) - rank : 0;
                  return (
                    <motion.li
                      key={r.name}
                      layout
                      transition={{ type: 'spring', stiffness: 260, damping: 30 }}
                      className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-[0_6px_24px_rgba(20,20,60,0.05)] dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.10] dark:to-white/[0.03] dark:backdrop-blur-xl"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-6 text-center font-serif text-lg font-bold ${a.text}`}>
                          {rank}
                        </span>
                        {Flag && (
                          <Flag
                            className="h-4 w-6 shrink-0 rounded-[3px] shadow-sm"
                            aria-hidden="true"
                          />
                        )}
                        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-neutral-950 dark:text-white">
                          {r.name}
                        </span>

                        {delta !== 0 && (
                          <span
                            className={`inline-flex items-center text-[10px] font-bold ${
                              delta > 0
                                ? 'text-emerald-600 dark:text-emerald-400'
                                : 'text-red-500 dark:text-red-400'
                            }`}
                            title={`${delta > 0 ? 'Up' : 'Down'} ${Math.abs(delta)} place${Math.abs(delta) > 1 ? 's' : ''} vs ${f.years[yi - 1]}`}
                          >
                            {delta > 0 ? (
                              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                            ) : (
                              <ArrowDownRight className="h-3 w-3" aria-hidden="true" />
                            )}
                            {Math.abs(delta)}
                          </span>
                        )}

                        <span className="w-[88px] shrink-0 text-right text-sm font-bold text-neutral-900 dark:text-white">
                          <Tween value={v} prefix="$" suffix="B" />
                        </span>
                      </div>

                      {/* bar (scaled to the largest value across ALL years so growth is visible) */}
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-100 dark:bg-white/10">
                        <motion.div
                          animate={{ width: `${(v / gmax) * 100}%` }}
                          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                          className={`h-full rounded-full bg-linear-to-r ${a.bar}`}
                        />
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </div>

          <details
            open
            className="group mx-auto mt-8 max-w-7xl rounded-2xl border border-neutral-200 bg-white/80 dark:border-white/10 dark:bg-white/[0.04]"
          >
            <summary className="cursor-pointer list-none px-5 py-3 text-center text-sm font-semibold text-neutral-700 dark:text-slate-300">
              View the full 5-year data table
              <span className="ml-2 inline-block transition-transform group-open:rotate-180">
                ▾
              </span>
            </summary>
            <div className="overflow-x-auto px-3 pb-4">
              <table className="w-full min-w-160 text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-neutral-500 dark:text-slate-400">
                    <th className="px-3 py-2">{f.partnersLabel}</th>
                    {f.years.map((y) => (
                      <th key={y} className="px-3 py-2">
                        Value in {y}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {f.rows.map((r) => (
                    <tr
                      key={r.name}
                      className="border-t border-neutral-100 text-neutral-600 dark:border-white/5 dark:text-slate-300"
                    >
                      <th
                        scope="row"
                        className="px-3 py-2 font-semibold text-neutral-900 dark:text-white"
                      >
                        {r.name}
                      </th>
                      {r.values.map((v, i) => (
                        <td key={i} className="px-3 py-2">
                          ${v.toFixed(2)} billion
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-t-2 border-neutral-200 font-semibold text-neutral-900 dark:border-white/15 dark:text-white">
                    <th scope="row" className="px-3 py-2">
                      {f.total.label}
                    </th>
                    {f.total.values.map((v, i) => (
                      <td key={i} className="px-3 py-2">
                        ${v.toFixed(2)} trillion
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </details>
        </div>
      </section>
    </MotionConfig>
  );
}
