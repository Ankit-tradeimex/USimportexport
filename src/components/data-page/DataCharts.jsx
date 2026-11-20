'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';

const COLORS = [
  '#B31942',
  '#0A3161',
  '#4da3ff',
  '#ff8da0',
  '#5c2150',
  '#1c5fb0',
  '#ff4d6d',
  '#7cc4ff',
  '#8b3a8a',
];
const fmt = (n) => Number(n).toLocaleString('en-US');
const short = (n) =>
  n >= 1e6
    ? `${+(n / 1e6).toFixed(1)}M`
    : n >= 1e3
      ? `${+(n / 1e3).toFixed(n >= 1e5 ? 0 : 1)}K`
      : String(n);

// round the top of the scale up to 1, 2, 5 x 10^n
function niceMax(v) {
  if (v <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p;
}

/* ------------------------------------------------------------------ */
/* Bar chart (SVG)                                                     */
/* ------------------------------------------------------------------ */
function Bars({ data }) {
  const [hover, setHover] = useState(null);
  const W = 900;
  const H = 360;
  const m = { l: 70, r: 16, t: 24, b: 44 };
  const pw = W - m.l - m.r;
  const ph = H - m.t - m.b;
  const max = niceMax(Math.max(...data.map((d) => d.weight)));
  const slot = pw / data.length;
  const bw = Math.min(70, slot * 0.58);
  const ticks = [0, 1, 2, 3, 4].map((i) => (max / 4) * i);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Bar chart of total net weight by HS code"
    >
      <defs>
        <linearGradient id="bar-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#B31942" />
          <stop offset="100%" stopColor="#0A3161" />
        </linearGradient>
      </defs>

      {ticks.map((t) => {
        const y = m.t + ph - (t / max) * ph;
        return (
          <g key={t}>
            <line
              x1={m.l}
              x2={W - m.r}
              y1={y}
              y2={y}
              className="stroke-slate-200 dark:stroke-white/10"
            />
            <text
              x={m.l - 10}
              y={y + 4}
              textAnchor="end"
              className="fill-slate-500 text-[12px] dark:fill-white/55"
            >
              {short(t)}
            </text>
          </g>
        );
      })}
      <text
        transform={`translate(16 ${m.t + ph / 2}) rotate(-90)`}
        textAnchor="middle"
        className="fill-slate-500 text-[12px] dark:fill-white/55"
      >
        Total Net Weight (Kg)
      </text>

      {data.map((d, i) => {
        const h = (d.weight / max) * ph;
        const x = m.l + slot * i + (slot - bw) / 2;
        const on = hover === i;
        return (
          <g key={d.code} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <motion.rect
              x={x}
              rx="6"
              width={bw}
              fill="url(#bar-grad)"
              opacity={hover === null || on ? 1 : 0.45}
              initial={{ y: m.t + ph, height: 0 }}
              whileInView={{ y: m.t + ph - h, height: h }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.07, ease: 'easeOut' }}
            />
            <rect x={m.l + slot * i} y={m.t} width={slot} height={ph} fill="transparent" />
            <text
              x={x + bw / 2}
              y={H - 16}
              textAnchor="middle"
              className={`text-[12px] ${on ? 'fill-[#B31942] font-semibold dark:fill-[#ff8da0]' : 'fill-slate-600 dark:fill-white/65'}`}
            >
              {d.code}
            </text>
            {on && (
              <g>
                <rect
                  x={Math.min(Math.max(x + bw / 2 - 62, m.l), W - m.r - 124)}
                  y={m.t + ph - h - 44}
                  width="124"
                  height="34"
                  rx="8"
                  className="fill-slate-900 dark:fill-white"
                />
                <text
                  x={Math.min(Math.max(x + bw / 2, m.l + 62), W - m.r - 62)}
                  y={m.t + ph - h - 22}
                  textAnchor="middle"
                  className="fill-white text-[12px] font-semibold dark:fill-slate-900"
                >
                  {d.code}: {fmt(d.weight)} kg
                </text>
              </g>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Pie (donut) chart (SVG)                                             */
/* ------------------------------------------------------------------ */
function Pie({ data }) {
  const [hover, setHover] = useState(null);
  const total = data.reduce((s, d) => s + d.weight, 0);
  const R = 120;
  const r = 70;
  const C = 150;

  let a0 = -Math.PI / 2;
  const slices = data.map((d, i) => {
    const frac = d.weight / total;
    // a full circle cannot be drawn as one arc, so keep it just under
    const a1 = a0 + Math.min(frac, 0.9999) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const p = (rad, a) => [C + rad * Math.cos(a), C + rad * Math.sin(a)];
    const [x0, y0] = p(R, a0);
    const [x1, y1] = p(R, a1);
    const [x2, y2] = p(r, a1);
    const [x3, y3] = p(r, a0);
    const path = `M${x0} ${y0} A${R} ${R} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${r} ${r} 0 ${large} 0 ${x3} ${y3} Z`;
    const mid = (a0 + a1) / 2;
    a0 = a1;
    return {
      ...d,
      frac,
      path,
      dx: Math.cos(mid) * 8,
      dy: Math.sin(mid) * 8,
      color: COLORS[i % COLORS.length],
    };
  });

  const active = hover != null ? slices[hover] : null;

  return (
    <div className="grid items-center gap-8 md:grid-cols-[320px_1fr]">
      <svg
        viewBox="0 0 300 300"
        className="mx-auto h-auto w-full max-w-[320px]"
        role="img"
        aria-label="Pie chart of total net weight by HS code"
      >
        {slices.map((s, i) => (
          <motion.path
            key={s.code}
            d={s.path}
            fill={s.color}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{
              opacity: hover === null || hover === i ? 1 : 0.4,
              scale: 1,
              x: hover === i ? s.dx : 0,
              y: hover === i ? s.dy : 0,
            }}
            transition={{ duration: 0.4, delay: hover === null ? i * 0.06 : 0 }}
            style={{ transformOrigin: '150px 150px' }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="cursor-pointer stroke-white dark:stroke-[#0c0c2b]"
            strokeWidth="2"
          />
        ))}
        <text
          x={C}
          y={C - 4}
          textAnchor="middle"
          className="fill-slate-900 text-[22px] font-bold dark:fill-white"
        >
          {active ? `${(active.frac * 100).toFixed(1)}%` : short(total)}
        </text>
        <text
          x={C}
          y={C + 18}
          textAnchor="middle"
          className="fill-slate-500 text-[11px] dark:fill-white/55"
        >
          {active ? active.code : 'kg in total'}
        </text>
      </svg>

      <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
        {slices.map((s, i) => (
          <li
            key={s.code}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className={`flex items-center justify-between gap-3 rounded-xl border px-3 py-2 text-sm transition ${
              hover === i
                ? 'border-[#B31942]/40 bg-slate-50 dark:bg-white/10'
                : 'border-slate-200 dark:border-white/10'
            }`}
          >
            <span className="flex items-center gap-2 font-medium text-slate-800 dark:text-white/90">
              <span className="h-3 w-3 rounded-full" style={{ background: s.color }} />
              {s.code}
            </span>
            <span className="text-slate-500 dark:text-white/55">{(s.frac * 100).toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Graph view                                                          */
/* ------------------------------------------------------------------ */
export default function DataCharts({ chart }) {
  const [kind, setKind] = useState('bar');

  if (!chart.length) return null;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Top HS Code Distribution
        </h3>
        <div
          role="radiogroup"
          aria-label="Chart type"
          className="inline-flex rounded-full border border-slate-200 bg-slate-50 p-1 dark:border-white/10 dark:bg-white/5"
        >
          {[
            ['bar', 'Bar Chart'],
            ['pie', 'Pie Chart'],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={kind === id}
              onClick={() => setKind(id)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                kind === id
                  ? 'bg-linear-to-r from-[#B31942] to-[#0A3161] text-white shadow'
                  : 'text-slate-600 hover:text-slate-900 dark:text-white/65 dark:hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">{kind === 'bar' ? <Bars data={chart} /> : <Pie data={chart} />}</div>
      <p className="mt-3 text-center text-xs text-slate-400 dark:text-white/40">
        Based on all matching shipments, by total net weight.
      </p>
    </div>
  );
}
