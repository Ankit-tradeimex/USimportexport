'use client';

import { useEffect, useRef, useState } from 'react';
import AnimatedText from '../utils/AnimatedText';

/* ------------------------------------------------------------------ */
/* Content (edit freely)                                               */
/* ------------------------------------------------------------------ */
const FILTERS = ['Country', 'HS Code', 'Company', 'Port', 'Product'];

const FEATURES = [
  {
    title: 'Simultaneous US Trade Insights',
    text: 'See US import and US export data side by side. Live search gives you insights across both directions of trade in a single view.',
    art: 'insights',
  },
  {
    title: 'Improved Decision-Making',
    text: 'Live import-export search and customized reports by company help your team make faster, better-informed decisions.',
    art: 'decision',
  },
  {
    title: 'Enhanced Market Intelligence',
    text: 'Connect with new importers and exporters in the USA. Find high-paying buyers or quality suppliers from our verified data.',
    art: 'market',
  },
  {
    title: 'Increased Transparency',
    text: 'Transparency matters in global trade. Live search gives your business clear visibility into US shipment data.',
    art: 'transparency',
  },
];

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */
const NAVY = '#0A3161';
const SKY = '#B31942';

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// transform helpers so SVG shapes scale/rotate around themselves
const fromBottom = { transformBox: 'fill-box', transformOrigin: '50% 100%' };
const fromCenter = { transformBox: 'fill-box', transformOrigin: '50% 50%' };

/* ------------------------------------------------------------------ */
/* Illustrations                                                       */
/* ------------------------------------------------------------------ */
function Insights() {
  const bars = [
    { x: 40, h: 24 },
    { x: 64, h: 36 },
    { x: 88, h: 29 },
    { x: 112, h: 50 },
    { x: 136, h: 62 },
  ];
  return (
    <>
      <rect
        x="20"
        y="14"
        width="160"
        height="94"
        rx="10"
        fill="#fff"
        stroke={NAVY}
        strokeWidth="1.5"
      />
      <circle cx="31" cy="24" r="2" fill={SKY} />
      <circle cx="39" cy="24" r="2" fill="#cbd5e1" />
      <circle cx="47" cy="24" r="2" fill="#cbd5e1" />
      {bars.map((b, i) => (
        <rect
          key={b.x}
          x={b.x}
          y={96 - b.h}
          width="16"
          height={b.h}
          rx="3"
          fill={i === bars.length - 1 ? NAVY : SKY}
          opacity={i === bars.length - 1 ? 1 : 0.55 + i * 0.1}
          className="transition-transform duration-500 group-hover:scale-y-[1.12]"
          style={{ ...fromBottom, transitionDelay: `${i * 40}ms` }}
        />
      ))}
      <polyline
        points="48,64 72,52 96,60 120,40 144,28"
        fill="none"
        stroke={NAVY}
        strokeWidth="1.6"
        strokeDasharray="3 3"
        strokeLinecap="round"
      />
      <circle cx="144" cy="28" r="4" fill="#fff" stroke={NAVY} strokeWidth="1.6" />
    </>
  );
}

function Decision() {
  const rows = [34, 62, 90];
  return (
    <>
      {rows.slice(0, 2).map((y) => (
        <g key={y}>
          <rect x="28" y={y - 13} width="144" height="26" rx="13" fill="#fff" stroke="#cbd5e1" />
          <circle cx="44" cy={y} r="7" fill="#f1f5f9" />
          <path
            d={`M41.5 ${y - 2.5} l5 5 M46.5 ${y - 2.5} l-5 5`}
            stroke="#94a3b8"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <rect x="60" y={y - 3} width="64" height="6" rx="3" fill="#e2e8f0" />
        </g>
      ))}
      <g className="transition-transform duration-500 group-hover:translate-x-1.5">
        <rect
          x="28"
          y="77"
          width="144"
          height="26"
          rx="13"
          fill="#eaf6ff"
          stroke={SKY}
          strokeWidth="1.8"
        />
        <circle cx="44" cy="90" r="7" fill={SKY} />
        <path
          d="M40.5 90 l2.7 2.8 l5-5.6"
          fill="none"
          stroke="#fff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect x="60" y="87" width="52" height="6" rx="3" fill={NAVY} />
        <rect x="128" y="83" width="36" height="14" rx="7" fill={NAVY} />
        <rect x="134" y="88.5" width="24" height="3" rx="1.5" fill="#fff" />
      </g>
    </>
  );
}

function Market() {
  const C = 2 * Math.PI * 34;
  const segs = [
    { frac: 0.4, color: NAVY },
    { frac: 0.35, color: SKY },
    { frac: 0.25, color: '#bfe3fb' },
  ];
  let start = 0;
  return (
    <>
      <g
        className="transition-transform duration-700 group-hover:rotate-[70deg]"
        style={fromCenter}
      >
        <circle cx="72" cy="60" r="34" fill="none" stroke="#f1f5f9" strokeWidth="14" />
        {segs.map((s) => {
          const len = s.frac * C - 3; // small gap between segments
          const el = (
            <circle
              key={s.color}
              cx="72"
              cy="60"
              r="34"
              fill="none"
              stroke={s.color}
              strokeWidth="14"
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-start}
              transform="rotate(-90 72 60)"
            />
          );
          start += s.frac * C;
          return el;
        })}
      </g>
      <text x="72" y="64" textAnchor="middle" fontSize="11" fontWeight="700" fill={NAVY}>
        USA
      </text>
      {[
        { y: 38, c: NAVY, w: 40 },
        { y: 60, c: SKY, w: 32 },
        { y: 82, c: '#bfe3fb', w: 24 },
      ].map((r) => (
        <g key={r.y}>
          <circle cx="132" cy={r.y} r="4.5" fill={r.c} />
          <rect x="142" y={r.y - 3} width={r.w} height="6" rx="3" fill="#cbd5e1" />
        </g>
      ))}
    </>
  );
}

function Transparency() {
  return (
    <>
      <circle cx="152" cy="30" r="3" fill={SKY} />
      <circle cx="170" cy="52" r="2" fill={NAVY} />
      <circle cx="34" cy="100" r="3" fill={SKY} opacity="0.6" />
      <circle cx="28" cy="30" r="2" fill={NAVY} opacity="0.5" />
      <line
        x1="118"
        y1="82"
        x2="148"
        y2="108"
        stroke={NAVY}
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="92" cy="58" r="36" fill="#fff" stroke={NAVY} strokeWidth="2" />
      <path
        d="M60 58 Q92 30 124 58 Q92 86 60 58 Z"
        fill="#eaf6ff"
        stroke={NAVY}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <g className="transition-transform duration-500 group-hover:translate-x-2">
        <circle cx="92" cy="58" r="11" fill={SKY} />
        <circle cx="92" cy="58" r="4.5" fill={NAVY} />
        <circle cx="95" cy="55" r="1.6" fill="#fff" />
      </g>
    </>
  );
}

const ART = {
  insights: Insights,
  decision: Decision,
  market: Market,
  transparency: Transparency,
};

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function FeaturesSection() {
  const [headRef, headIn] = useInView();
  const [gridRef, gridIn] = useInView(0.1);

  return (
    <section className="relative isolate overflow-hidden bg-white px-6 py-20 dark:bg-slate-950 lg:px-10 lg:py-28">
      {/* Dark mode background: subtle grid and ambient glows */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden dark:block">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_25%,black,transparent)]" />
        <div className="absolute -left-48 top-20 h-[500px] w-[500px] rounded-full bg-[#ff4d6d]/10 blur-[130px]" />
        <div className="absolute -right-32 top-40 h-[600px] w-[600px] rounded-full bg-[#4da3ff]/15 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* ---------- header ---------- */}
        <div
          ref={headRef}
          className={`grid items-end gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-16 motion-safe:transition-all motion-safe:duration-700 ${
            headIn ? 'opacity-100 translate-y-0' : 'motion-safe:translate-y-6 motion-safe:opacity-0'
          }`}
        >
          <div>
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-sky-200 dark:backdrop-blur">
              Why Choose Us
            </span>
            {/* <h2 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl">
              Access US Import-Export Data By{" "}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent">
                Country, HS Code, Company, Port, and Products
              </span>
            </h2> */}

            <AnimatedText
              text="Access US Import-Export Data By"
              highlight="Country, HS Code, Company, Port, and Products"
              className="mt-5 dark:text-white  text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl"
              delay={0.2}
              stagger={0.08}
              duration={0.7}
            />
            <div className="mt-6 flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <span
                  key={f}
                  className="rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-medium text-neutral-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:backdrop-blur"
                >
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 text-[15px] leading-relaxed text-neutral-600 dark:text-slate-400">
            <p>
              Discover answers to your questions about US import and export data. Our live search
              comes with advanced filters for HS code, company, country, port and product, so you
              can stay informed and access US maritime shipment data without hassle.
            </p>
            <p>
              Our importers-exporters database helps you find top US buyers and suppliers with ease.
              Search US buyers data and US suppliers data to get a list of the top importers and
              exporters for your product, and enjoy the benefits below.
            </p>
          </div>
        </div>

        {/* ---------- cards ---------- */}
        <div ref={gridRef} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => {
            const Art = ART[f.art];
            return (
              <article
                key={f.title}
                style={{ transitionDelay: gridIn ? `${i * 150}ms` : '0ms' }}
                className={`group relative flex flex-col rounded-3xl border border-neutral-200 bg-white p-3 shadow-[0_2px_10px_rgba(20,20,60,0.04)] transition-all duration-700 hover:-translate-y-1.5 hover:border-[#B31942]/60 dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_10px_40px_rgba(0,0,0,0.2)] dark:backdrop-blur-xl dark:hover:border-[#5dbaf6]/40 ${
                  gridIn ? 'opacity-100' : 'motion-safe:translate-y-8 motion-safe:opacity-0'
                }`}
              >
                {/* illustration */}
                <div className="relative h-44 overflow-hidden rounded-2xl bg-gradient-to-br from-[#eaf6ff] via-white to-[#f4f8ff] ring-1 ring-inset ring-[#B31942]/20 dark:from-[#152b45] dark:via-[#111c30] dark:to-[#17243a] dark:ring-white/10">
                  <div className="absolute inset-0 bg-[radial-gradient(#5DBAF6_0.8px,transparent_0.8px)] opacity-25 [background-size:14px_14px] dark:opacity-20" />
                  <svg
                    viewBox="0 0 200 120"
                    className="absolute inset-0 h-full w-full"
                    aria-hidden="true"
                  >
                    <Art />
                  </svg>
                </div>

                {/* text */}
                <div className="flex flex-1 flex-col px-3 pb-4 pt-5">
                  <span className="text-xs font-semibold tracking-widest text-[#B31942] dark:text-[#ff7188]">
                    {' '}
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight text-neutral-950 dark:text-white">
                    {' '}
                    {f.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-slate-400">
                    {' '}
                    {f.text}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* ---------- CTA ---------- */}
        <div className="mt-12 flex justify-center">
          <a
            href="#search"
            className="inline-flex items-center gap-2 rounded-xl gradient px-6 py-3.5 text-sm font-medium text-white transition dark:shadow-[0_10px_30px_rgba(77,163,255,0.25)] dark:hover:brightness-110"
          >
            Explore Live Trade Data
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
