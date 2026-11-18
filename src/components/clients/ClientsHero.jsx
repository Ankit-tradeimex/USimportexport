'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MotionConfig, animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { Check, ChevronRight, Home, Users } from 'lucide-react';
import { HiArrowLongRight } from 'react-icons/hi2';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
const CONTENT = {
  badge: 'Our Clients',
  titleTop: 'Empowering Businesses with',
  titleAccent: 'Accurate and Actionable US Trade Data',
  text: 'USImportdata has been a trusted name as a US trade data provider, in the field of US trade intelligence, transforming how companies access and interpret import–export data. We empower organizations and companies with the insights they need to make informed, strategic decisions in one of the world’s most dynamic markets.',
  primary: { label: 'Explore the data', href: '/us-import-data' },
  secondary: { label: 'Contact us', href: '/contact-us' },
  points: [
    'Importers & exporters',
    'Manufacturing & retail',
    'Consumer electronics & market research',
  ],
  stat: { value: 10000, suffix: '+', label: 'clients globally' },
};

/* client names from your content, shown as plain text (no logos) */
const INNER = ['Deloitte', 'Samsung', 'Hyundai', 'Realme'];
const OUTER = ['ExxonMobil', 'Dow Chemical', 'Nikon', 'LG', 'Tata'];

/* ------------------------------------------------------------------ */
/* Count-up                                                            */
/* ------------------------------------------------------------------ */
function CountUp({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return setN(value);
    const c = animate(0, value, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {n.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Right visual: client names orbiting a "10,000+" core                */
/* ------------------------------------------------------------------ */
function Orbit({ names, radius, duration, reverse, tone }) {
  const reduce = useReducedMotion();
  return (
    <div
      className="absolute inset-0"
      style={
        reduce
          ? undefined
          : { animation: `clients-spin ${duration}s linear infinite ${reverse ? 'reverse' : ''}` }
      }
    >
      {names.map((name, i) => {
        const a = (i / names.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <div
            key={name}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${50 + radius * Math.cos(a)}%`, top: `${50 + radius * Math.sin(a)}%` }}
          >
            {/* counter-rotate so the text always stays upright */}
            <span
              className={`block whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold shadow-md sm:px-4 sm:text-sm ${
                tone === 'red'
                  ? 'border-[#B31942]/25 bg-white text-[#B31942] dark:border-[#ff4d6d]/30 dark:bg-[#ff4d6d]/15 dark:text-[#ff8da0] dark:backdrop-blur'
                  : 'border-[#0A3161]/25 bg-white text-[#0A3161] dark:border-[#4da3ff]/30 dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff] dark:backdrop-blur'
              }`}
              style={
                reduce
                  ? undefined
                  : {
                      animation: `clients-spin ${duration}s linear infinite ${reverse ? '' : 'reverse'}`,
                    }
              }
            >
              {name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ClientOrbit() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <style>{`@keyframes clients-spin { to { transform: rotate(360deg); } }`}</style>
      <div className="pointer-events-none absolute inset-6 rounded-full bg-linear-to-br from-[#B31942]/15 via-transparent to-[#0A3161]/25 blur-3xl dark:from-[#ff4d6d]/20 dark:to-[#4da3ff]/30" />

      {/* rings */}
      <div className="absolute inset-[8%] rounded-full border border-dashed border-slate-300 dark:border-white/20" />
      <div className="absolute inset-[24%] rounded-full border border-slate-300 dark:border-white/15" />

      <Orbit names={OUTER} radius={42} duration={90} tone="blue" />
      <Orbit names={INNER} radius={26} duration={70} reverse tone="red" />

      {/* core */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="absolute left-1/2 top-1/2 flex h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-linear-to-br from-[#B31942] to-[#0A3161] text-center text-white shadow-2xl"
      >
        <span className="text-xl font-bold leading-none sm:text-3xl">
          <CountUp value={CONTENT.stat.value} suffix={CONTENT.stat.suffix} />
        </span>
        <span className="mt-1.5 px-2 text-[10px] font-semibold uppercase tracking-wider text-white/80 sm:text-xs">
          {CONTENT.stat.label}
        </span>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
export default function ClientsHero() {
  const reduce = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:pb-24">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,49,97,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(10,49,97,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,black,transparent)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
          <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#0A3161]/10 blur-[120px] dark:bg-[#4da3ff]/20" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-white/60">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-1.5 transition hover:text-[#B31942] dark:hover:text-[#ff8da0]"
                >
                  <Home className="h-3.5 w-3.5" aria-hidden="true" />
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-slate-900 dark:text-white">
                Clients
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
            {/* copy */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0A3161] dark:border-white/10 dark:bg-white/5 dark:text-[#7cc4ff]"
              >
                <Users
                  className="h-3.5 w-3.5 text-[#B31942] dark:text-[#ff8da0]"
                  aria-hidden="true"
                />
                {CONTENT.badge}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl dark:text-white"
              >
                {CONTENT.titleTop}{' '}
                <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                  {CONTENT.titleAccent}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70"
              >
                {CONTENT.text}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link
                  href={CONTENT.primary.href}
                  className="group inline-flex items-center gap-2 rounded-xl bg-[#0A3161] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03] hover:bg-[#0c3d78] dark:bg-white dark:text-[#0A1A4A] dark:hover:bg-white/90"
                >
                  {CONTENT.primary.label}
                  <motion.span
                    animate={reduce ? undefined : { x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-lg"
                  >
                    <HiArrowLongRight />
                  </motion.span>
                </Link>
                <Link
                  href={CONTENT.secondary.href}
                  className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 dark:border-white/25 dark:bg-white/5 dark:text-white dark:backdrop-blur dark:hover:border-white/50 dark:hover:bg-white/10"
                >
                  {CONTENT.secondary.label}
                </Link>
              </motion.div>

              <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-8 flex flex-wrap gap-x-6 gap-y-3"
              >
                {CONTENT.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-white/80"
                  >
                    <Check
                      className="h-4 w-4 text-[#B31942] dark:text-[#ff8da0]"
                      aria-hidden="true"
                    />
                    {p}
                  </li>
                ))}
              </motion.ul>
            </div>

            <ClientOrbit />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
