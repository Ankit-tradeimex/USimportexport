'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { Check, Copy, FileText, MapPin, Package, Route, Ship, Users } from 'lucide-react';
import { HiArrowLongRight } from 'react-icons/hi2';
import { AU, KR, US } from 'country-flag-icons/react/3x2';

// add more flags here if your sample uses other countries
const FLAGS = { AU, KR, US };
const ICONS = { doc: FileText, route: Route, parties: Users, cargo: Package, ship: Ship };

const ACCENT = {
  import: {
    grad: 'from-[#B31942] to-[#ff4d6d]',
    text: 'text-[#B31942] dark:text-[#ff8da0]',
    soft: 'bg-[#B31942]/8 dark:bg-[#ff4d6d]/12',
    border: 'border-[#B31942]/25 dark:border-[#ff4d6d]/30',
    stroke: '#ff4d6d',
    blob: 'bg-[#ff4d6d]/12',
    blob2: 'bg-[#4da3ff]/10',
    stamp: 'border-[#B31942]/50 text-[#B31942]/70 dark:border-[#ff4d6d]/50 dark:text-[#ff8da0]/80',
  },
  export: {
    grad: 'from-[#0A3161] to-[#4da3ff]',
    text: 'text-[#0A3161] dark:text-[#7cc4ff]',
    soft: 'bg-[#0A3161]/8 dark:bg-[#4da3ff]/12',
    border: 'border-[#0A3161]/25 dark:border-[#4da3ff]/30',
    stroke: '#4da3ff',
    blob: 'bg-[#4da3ff]/12',
    blob2: 'bg-[#ff4d6d]/10',
    stamp: 'border-[#0A3161]/50 text-[#0A3161]/70 dark:border-[#4da3ff]/50 dark:text-[#7cc4ff]/80',
  },
};

/* one label / value row with a copy button */
function Field({ label, value, accent }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard blocked: ignore */
    }
  };
  return (
    <div className="group relative border-t border-dashed border-neutral-200 py-3 first:border-t-0 dark:border-white/10">
      <dt className={`text-[10px] font-bold uppercase tracking-[0.14em] ${accent.text}`}>
        {label}
      </dt>
      <dd className="mt-1 break-words pr-8 font-mono text-[13px] leading-relaxed text-neutral-800 dark:text-slate-200">
        {value}
      </dd>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="absolute right-0 top-3 grid h-7 w-7 place-items-center rounded-md text-neutral-400 opacity-0 transition hover:bg-neutral-100 hover:text-neutral-700 focus:opacity-100 group-hover:opacity-100 dark:hover:bg-white/10 dark:hover:text-white"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-emerald-500" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
    </div>
  );
}

/* route banner: origin ---ship---> destination */
function RouteBanner({ route, accent }) {
  const reduce = useReducedMotion();
  const path = 'M 30 95 Q 300 -15 570 95';
  const FromFlag = FLAGS[route.from.flag];
  const ToFlag = FLAGS[route.to.flag];

  const End = ({ end, Flag, align }) => (
    <div
      className={`flex items-center gap-3 ${align === 'right' ? 'md:flex-row-reverse md:text-right' : ''}`}
    >
      {Flag && (
        <Flag
          className="h-10 w-14 shrink-0 rounded-lg shadow-lg ring-1 ring-black/10"
          aria-hidden="true"
        />
      )}
      <div>
        <p className="font-serif text-lg font-bold leading-tight text-neutral-950 dark:text-white">
          {end.country}
        </p>
        {end.port && (
          <p className="mt-0.5 inline-flex items-center gap-1 text-xs text-neutral-500 dark:text-slate-400">
            <MapPin className="h-3 w-3" aria-hidden="true" />
            {end.port}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-stretch gap-2 md:flex-row md:items-center md:gap-6">
      <End end={route.from} Flag={FromFlag} />
      <div className="relative min-w-[200px] flex-1">
        <svg viewBox="0 0 600 120" className="h-24 w-full md:h-28" aria-hidden="true">
          <path d={path} fill="none" stroke={accent.stroke} strokeOpacity="0.25" strokeWidth="2" />
          <motion.path
            d={path}
            fill="none"
            stroke={accent.stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 10"
            animate={reduce ? undefined : { strokeDashoffset: [0, -28] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          />
          <circle cx="30" cy="95" r="7" fill={accent.stroke} />
          <circle cx="570" cy="95" r="7" fill={accent.stroke} />
          {!reduce && (
            <g>
              <circle r="16" fill={accent.stroke} fillOpacity="0.25" />
              <circle r="7" fill="#fff" stroke={accent.stroke} strokeWidth="3" />
              <animateMotion dur="6s" repeatCount="indefinite" path={path} />
            </g>
          )}
        </svg>
        <span className="absolute left-1/2 top-1 -translate-x-1/2 rounded-full border border-neutral-200 bg-white px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-600 shadow-sm dark:border-white/10 dark:bg-slate-900 dark:text-slate-300">
          {route.mode} freight
        </span>
      </div>
      <End end={route.to} Flag={ToFlag} align="right" />
    </div>
  );
}

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

export default function BolSampleSection({ data }) {
  const b = data.bolSample;
  if (!b) return null;
  const a = ACCENT[data.type];
  const fieldCount = b.groups.reduce((n, g) => n + g.fields.length, 0);

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-white dark:bg-slate-950">
        <div className="pointer-events-none absolute inset-0">
          <div
            className={`absolute left-1/2 top-40 h-96 w-[720px] -translate-x-1/2 rounded-full blur-[140px] ${a.blob}`}
          />
          <div
            className={`absolute -right-24 bottom-20 h-80 w-80 rounded-full blur-[120px] ${a.blob2}`}
          />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 lg:px-6 lg:py-24">
          {/* heading + intro */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-4xl text-center"
          >
            <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
              {b.title}
            </h2>
            <div className={`mx-auto mt-4 h-1 w-20 rounded-full bg-linear-to-r ${a.grad}`} />
            <p className="mt-5 text-sm leading-relaxed text-neutral-600 dark:text-slate-400">
              {b.intro}
            </p>
          </motion.div>

          {/* ---------- the "document" ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`relative mt-12 overflow-hidden rounded-3xl border bg-neutral-50/80 shadow-[0_24px_80px_rgba(20,20,60,0.12)] backdrop-blur-xl dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.08] dark:to-white/[0.02] dark:shadow-[0_8px_60px_rgba(0,0,0,0.55)] ${a.border}`}
          >
            {/* document header bar */}
            <div
              className={`flex flex-wrap items-center justify-between gap-3 bg-linear-to-r px-5 py-3 text-white ${a.grad}`}
            >
              <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]">
                <FileText className="h-4 w-4" aria-hidden="true" />
                Bill of Lading · Sample record
              </p>
              <p className="text-[11px] font-medium text-white/80">{fieldCount} data fields</p>
            </div>

            <div className="relative p-5 sm:p-8">
              {/* SAMPLE stamp */}
              <span
                className={`pointer-events-none absolute right-6 top-6 hidden rotate-12 rounded-lg border-2 px-3 py-1 text-sm font-black uppercase tracking-[0.3em] sm:block ${a.stamp}`}
                aria-hidden="true"
              >
                Sample
              </span>

              <RouteBanner route={b.route} accent={a} />

              {/* highlight chips */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
                }}
                className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4"
              >
                {b.highlights.map((h) => (
                  <motion.div
                    key={h.label}
                    variants={rise}
                    className={`rounded-2xl px-4 py-3 ${a.soft}`}
                  >
                    <p className={`text-[10px] font-bold uppercase tracking-[0.14em] ${a.text}`}>
                      {h.label}
                    </p>
                    <p className="mt-1 font-serif text-xl font-bold text-neutral-950 dark:text-white">
                      {h.value}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              {/* field groups (masonry columns) */}
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.05 }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
                className="mt-8 gap-5 md:columns-2"
              >
                {b.groups.map((g) => {
                  const Icon = ICONS[g.icon] || FileText;
                  return (
                    <motion.section
                      key={g.title}
                      variants={rise}
                      className="mb-5 break-inside-avoid rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_8px_30px_rgba(20,20,60,0.05)] dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.10] dark:to-white/[0.03] dark:backdrop-blur-xl"
                    >
                      <header className="mb-2 flex items-center gap-3">
                        <span
                          className={`grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br text-white shadow-md ${a.grad}`}
                        >
                          <Icon className="h-4.5 w-4.5" strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <h3 className="font-serif text-lg font-bold text-neutral-950 dark:text-white">
                          {g.title}
                        </h3>
                        <span className="ml-auto text-[11px] text-neutral-400 dark:text-slate-500">
                          {g.fields.length} fields
                        </span>
                      </header>
                      <dl>
                        {g.fields.map((f) => (
                          <Field key={f.label} label={f.label} value={f.value} accent={a} />
                        ))}
                      </dl>
                    </motion.section>
                  );
                })}
              </motion.div>

              {/* CTA */}
              <div className="mt-2 flex flex-col items-center justify-between gap-3 rounded-2xl border border-dashed border-neutral-300 px-5 py-4 text-center sm:flex-row sm:text-left dark:border-white/15">
                <p className="text-sm text-neutral-600 dark:text-slate-400">
                  This is one record. Request the full database to see every shipment, with all{' '}
                  {fieldCount} fields.
                </p>
                <Link
                  href="/data-sample"
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg gradient px-5 py-3 text-sm font-medium text-white transition hover:brightness-110 dark:shadow-[0_10px_30px_rgba(77,163,255,0.35)]"
                >
                  Request Full Sample
                  <span className="text-lg">
                    <HiArrowLongRight />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
