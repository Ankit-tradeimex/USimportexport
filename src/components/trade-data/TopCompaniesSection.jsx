'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionConfig, animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { Crown } from 'lucide-react';

const ACCENT = {
  import: {
    grad: 'from-[#B31942] to-[#ff4d6d]',
    text: 'text-[#B31942] dark:text-[#ff8da0]',
    soft: 'bg-[#B31942]/8 text-[#B31942] dark:bg-[#ff4d6d]/12 dark:text-[#ff8da0]',
    border: 'border-[#B31942]/30 dark:border-[#ff4d6d]/40',
    glow: 'shadow-[0_20px_60px_rgba(179,25,66,0.25)] dark:shadow-[0_0_60px_rgba(255,77,109,0.35)]',
    blob: 'bg-[#ff4d6d]/15',
    blob2: 'bg-[#4da3ff]/10',
  },
  export: {
    grad: 'from-[#0A3161] to-[#4da3ff]',
    text: 'text-[#0A3161] dark:text-[#7cc4ff]',
    soft: 'bg-[#0A3161]/8 text-[#0A3161] dark:bg-[#4da3ff]/12 dark:text-[#7cc4ff]',
    border: 'border-[#0A3161]/30 dark:border-[#4da3ff]/40',
    glow: 'shadow-[0_20px_60px_rgba(10,49,97,0.25)] dark:shadow-[0_0_60px_rgba(77,163,255,0.4)]',
    blob: 'bg-[#4da3ff]/15',
    blob2: 'bg-[#ff4d6d]/10',
  },
};

const initials = (name) =>
  name
    .replace(/[^\p{L}\s]/gu, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

function CountUp({ to }) {
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

  return <span ref={ref}>{Math.round(val).toLocaleString('en-US')}</span>;
}

// company logo, or initials when no logo was added
function Logo({ company, accent, size = 'h-14 w-14', text = 'text-lg' }) {
  return (
    <span
      className={`grid shrink-0 place-items-center overflow-hidden rounded-2xl ring-1 ring-black/5 dark:ring-white/10 ${size} ${
        company.logo ? 'bg-white' : `bg-linear-to-br ${accent.grad}`
      }`}
    >
      {company.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={company.logo}
          alt={`${company.name} logo`}
          loading="lazy"
          className="h-full w-full object-contain p-2"
        />
      ) : (
        <span className={`font-serif font-bold text-white ${text}`} aria-hidden="true">
          {initials(company.name)}
        </span>
      )}
    </span>
  );
}

const rise = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function TopCompaniesSection({ data }) {
  const c = data.topCompanies;
  if (!c) return null;
  const a = ACCENT[data.type];

  const sorted = [...c.items].sort((x, y) => y.value - x.value);
  const max = sorted[0].value;
  const total = sorted.reduce((s, i) => s + i.value, 0);
  const [first, second, third, ...rest] = sorted;

  // desktop podium order: 2nd, 1st, 3rd
  const podium = [
    { co: second, rank: 2, order: 'lg:order-1', lift: 'lg:mt-14' },
    { co: first, rank: 1, order: 'lg:order-2', lift: '' },
    { co: third, rank: 3, order: 'lg:order-3', lift: 'lg:mt-24' },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-neutral-50/70 dark:bg-[#050816]">
        <div className="pointer-events-none absolute inset-0">
          <div
            className={`absolute left-1/2 top-24 h-80 w-[640px] -translate-x-1/2 rounded-full blur-[130px] ${a.blob}`}
          />
          <div
            className={`absolute -right-24 bottom-10 h-80 w-80 rounded-full blur-[120px] ${a.blob2}`}
          />
          <div className="absolute inset-0 hidden bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)] dark:block" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-16 lg:px-6 lg:py-24">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
              {c.title}
              <span className="mx-2 font-light text-neutral-300 dark:text-slate-600">|</span>
              {c.subtitle}
            </h2>
            <div className={`mx-auto mt-4 h-1 w-20 rounded-full bg-linear-to-r ${a.grad}`} />
            <p className="mt-5 text-sm leading-relaxed text-neutral-600 dark:text-slate-400">
              {c.intro}
            </p>
          </motion.div>

          {/* ---------- podium: top 3 ---------- */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
            className="mt-14 grid items-start gap-5 lg:grid-cols-3"
          >
            {podium.map(({ co, rank, order, lift }) => {
              const win = rank === 1;
              return (
                <motion.div key={co.name} variants={rise} className={`${order} ${lift}`}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`relative overflow-hidden rounded-3xl border p-6 text-center backdrop-blur-xl ${
                      win
                        ? `${a.border} ${a.glow} bg-white dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.16] dark:to-white/[0.04]`
                        : 'border-neutral-200 bg-white shadow-[0_14px_44px_rgba(20,20,60,0.08)] dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.10] dark:to-white/[0.03] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                    }`}
                  >
                    <div className="relative flex flex-col items-center">
                      <Logo
                        company={co}
                        accent={a}
                        size={win ? 'h-24 w-24' : 'h-20 w-20'}
                        text={win ? 'text-3xl' : 'text-2xl'}
                      />
                      <span
                        className={`mt-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${a.soft}`}
                      >
                        Rank #{rank}
                      </span>
                      <h3
                        className={`mt-3 font-serif font-bold text-neutral-950 dark:text-white ${win ? 'text-2xl' : 'text-xl'}`}
                      >
                        {co.name}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-slate-400">{co.industry}</p>

                      <p
                        className={`mt-4 font-serif font-bold leading-none text-neutral-950 dark:text-white ${win ? 'text-4xl' : 'text-3xl'}`}
                      >
                        <CountUp to={co.value} />
                      </p>
                      <p className={`mt-1 text-xs font-semibold tracking-widest ${a.text}`}>
                        {c.unit}
                      </p>

                      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-white/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(co.value / max) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className={`h-full rounded-full bg-linear-to-r ${a.grad}`}
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* ---------- leaderboard: 4 to 10 ---------- */}
          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="mt-8 grid gap-3 lg:grid-cols-2"
          >
            {rest.map((co, i) => (
              <motion.li key={co.name} variants={rise}>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="group flex items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_8px_30px_rgba(20,20,60,0.05)] transition-colors hover:border-neutral-300 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.09] dark:to-white/[0.02] dark:backdrop-blur-xl dark:hover:border-white/25"
                >
                  <span
                    className={`w-7 shrink-0 text-center font-serif text-xl font-bold ${a.text}`}
                  >
                    {i + 4}
                  </span>
                  <Logo company={co} accent={a} size="h-12 w-12" text="text-base" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="truncate text-[15px] font-semibold text-neutral-950 dark:text-white">
                        {co.name}
                      </h3>
                      <p className="shrink-0 text-sm font-bold text-neutral-900 dark:text-white">
                        <CountUp to={co.value} />{' '}
                        <span className={`text-[10px] font-semibold tracking-wider ${a.text}`}>
                          {c.unit}
                        </span>
                      </p>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-slate-400">{co.industry}</p>
                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-neutral-100 dark:bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${(co.value / max) * 100}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.9,
                          delay: 0.2 + i * 0.05,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className={`h-full rounded-full bg-linear-to-r ${a.grad}`}
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.li>
            ))}

            {/* total tile fills the 8th slot on desktop */}
            <motion.li variants={rise} className="hidden lg:block">
              <div
                className={`flex h-full items-center justify-between gap-4 rounded-2xl bg-linear-to-br ${a.grad} p-5 text-white shadow-lg`}
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-white/80">
                    Top 10 combined
                  </p>
                  <p className="mt-1 font-serif text-3xl font-bold leading-none">
                    <CountUp to={total} />{' '}
                    <span className="text-sm font-semibold tracking-wider">{c.unit}</span>
                  </p>
                </div>
                <p className="max-w-[9rem] text-right text-xs leading-snug text-white/80">
                  Shipment volume of the ten largest US importers in 2025
                </p>
              </div>
            </motion.li>
          </motion.ol>
        </div>
      </section>
    </MotionConfig>
  );
}
