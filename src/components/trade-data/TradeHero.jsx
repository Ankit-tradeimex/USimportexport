'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { HiArrowLongRight } from 'react-icons/hi2';

// Three.js needs the browser, so skip server rendering for the canvas.
const TradeFlowGlobe = dynamic(() => import('./TradeFlowGlobe'), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

function CountUp({ to, decimals = 0, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const c = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: setVal });
    return () => c.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: 'easeOut' },
});

// import = red, export = blue (same colors as the rest of the site)
const ACCENT = {
  import: {
    text: 'from-[#B31942] to-[#7a1230] dark:from-[#ff5a73] dark:to-[#ff9aab]',
    dot: 'bg-[#B31942] dark:bg-[#ff4d6d] dark:shadow-[0_0_8px_#ff4d6d]',
    glow: 'bg-[#ff4d6d]/15',
    pill: 'text-[#B31942] dark:text-[#ff8da0]',
  },
  export: {
    text: 'from-[#0A3161] to-[#1d5fb5] dark:from-[#4da3ff] dark:to-[#9ad0ff]',
    dot: 'bg-[#0A3161] dark:bg-[#4da3ff] dark:shadow-[0_0_8px_#4da3ff]',
    glow: 'bg-[#4da3ff]/15',
    pill: 'text-[#0A3161] dark:text-[#7cc4ff]',
  },
};

export default function TradeHero({ data }) {
  const reduce = useReducedMotion();
  const a = ACCENT[data.type];

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950">
      {/* dark mode only: grid + glows */}
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_80%_65%_at_60%_30%,black,transparent)]" />
        <div
          className={`absolute -left-48 top-24 h-[520px] w-[520px] rounded-full blur-[130px] ${data.type === 'import' ? 'bg-[#ff4d6d]/10' : 'bg-[#4da3ff]/10'}`}
        />
        <div className="absolute -right-32 -top-20 h-[640px] w-[640px] rounded-full bg-[#4da3ff]/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-6 lg:px-6">
        {/* ---------- breadcrumbs ---------- */}
        <motion.nav aria-label="Breadcrumb" {...rise(0)}>
          <ol className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs font-medium text-neutral-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-400 dark:backdrop-blur">
            {data.crumbs.map((c, i) => {
              const last = i === data.crumbs.length - 1;
              return (
                <li key={c.name} className="inline-flex items-center gap-1.5">
                  {i > 0 && (
                    <ChevronRight
                      className="h-3.5 w-3.5 text-neutral-300 dark:text-slate-600"
                      aria-hidden="true"
                    />
                  )}
                  {last ? (
                    <span
                      aria-current="page"
                      className="font-semibold text-neutral-900 dark:text-white"
                    >
                      {c.name}
                    </span>
                  ) : (
                    <Link
                      href={c.href}
                      className="inline-flex items-center gap-1 transition-colors hover:text-neutral-900 dark:hover:text-white"
                    >
                      {i === 0 && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
                      {c.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </motion.nav>

        <div className="mt-8 grid items-center gap-10 lg:grid-cols-2 lg:gap-6">
          {/* ---------- left: copy ---------- */}
          <div>
            <motion.span
              {...rise(0.05)}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-sky-200 dark:backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span
                  className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${a.dot}`}
                />
                <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${a.dot}`} />
              </span>
              {data.eyebrow}
            </motion.span>

            <motion.h1
              {...rise(0.12)}
              className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-neutral-950 dark:text-white sm:text-6xl lg:text-7xl"
            >
              {data.titleTop}{' '}
              <span className={`bg-linear-to-r bg-clip-text text-transparent ${a.text}`}>
                {data.titleAccent}
              </span>
              <span className="mt-3 block text-2xl font-medium tracking-tight text-neutral-500 dark:text-slate-400 sm:text-3xl">
                {data.titleBottom}
              </span>
            </motion.h1>

            <motion.p
              {...rise(0.2)}
              className="mt-6 max-w-lg text-sm leading-relaxed text-neutral-600 dark:text-slate-400"
            >
              {data.description}
            </motion.p>

            <motion.div {...rise(0.28)} className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={data.primaryCta.href}
                className="inline-flex items-center gap-2 rounded-lg gradient px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2a2a55] dark:shadow-[0_10px_30px_rgba(77,163,255,0.35)] dark:hover:brightness-110"
              >
                {data.primaryCta.label}
                <span className="text-lg">
                  <HiArrowLongRight />
                </span>
              </Link>
              <Link
                href={data.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:backdrop-blur dark:hover:border-white/30 dark:hover:bg-white/10"
              >
                {data.secondaryCta.label}
                <span className="text-lg">
                  <HiArrowLongRight />
                </span>
              </Link>
            </motion.div>

            {/* stats */}
            <motion.dl {...rise(0.36)} className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {data.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-[0_8px_30px_rgba(20,20,60,0.05)] dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] dark:backdrop-blur-xl"
                >
                  <dd className="text-2xl font-bold tracking-tight text-neutral-950 dark:text-white">
                    <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
                  </dd>
                  <dt className="mt-0.5 text-[11px] font-medium text-neutral-500 dark:text-slate-400">
                    {s.label}
                  </dt>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---------- right: 3D ---------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[380px] sm:h-[480px] lg:h-[560px]"
          >
            <div
              className={`pointer-events-none absolute inset-[10%] hidden rounded-full blur-3xl dark:block ${a.glow}`}
            />
            <TradeFlowGlobe direction={data.type} />

            {/* floating glass cards */}
            {data.floatCards.map((c, i) => {
              const pos = [
                'left-0 top-6 sm:left-2',
                'right-0 top-[38%] sm:right-2',
                'bottom-6 left-2 sm:left-10',
              ][i];
              return (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + i * 0.15 }}
                  className={`pointer-events-none absolute hidden sm:block ${pos}`}
                >
                  <motion.div
                    animate={reduce ? undefined : { y: [0, -7, 0] }}
                    transition={{
                      duration: 4.5 + i,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.4,
                    }}
                    className="rounded-2xl border border-neutral-200/80 bg-white/90 px-4 py-3 shadow-[0_10px_40px_rgba(15,40,100,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.14] dark:to-white/[0.04] dark:shadow-[0_8px_32px_rgba(0,0,0,0.45)]"
                  >
                    <p className={`text-[10px] font-semibold uppercase tracking-wider ${a.pill}`}>
                      {c.label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-neutral-950 dark:text-white">
                      {c.value}
                    </p>
                    <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-slate-400">
                      {c.sub}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* legend + hint */}
            <div className="pointer-events-none absolute bottom-3 right-2 flex flex-col items-end gap-1.5 text-[11px] font-medium text-neutral-600 sm:right-6 dark:rounded-xl dark:border dark:border-white/10 dark:bg-white/5 dark:px-3 dark:py-2.5 dark:text-slate-300 dark:backdrop-blur">
              <span className="inline-flex items-center gap-2">
                <i className={`h-2 w-2 rounded-full ${a.dot}`} />
                {data.legend}
              </span>
              <span className="text-[10px] font-normal text-neutral-400 dark:text-slate-500">
                Drag to rotate
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
