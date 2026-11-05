'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionConfig, animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { Fuel, Medal, PieChart, Cog } from 'lucide-react';
import { CA, CN, DE, IN, JP, MX, NL, GB, VN, KR } from 'country-flag-icons/react/3x2';

// add more flags here if your data uses other country codes
const FLAGS = { CA, CN, DE, IN, JP, MX, NL, GB, VN, KR };
const ICONS = { rank: Medal, share: PieChart, product: Fuel, cog: Cog, flag: null }; // flag is handled separately

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
    const c = animate(0, to, { duration: 1.4, ease: 'easeOut', onUpdate: setVal });
    return () => c.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const pop = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function StatCard({ card }) {
  const Flag = card.icon === 'flag' ? FLAGS[card.flag] : null;
  const Icon = ICONS[card.icon];

  return (
    <motion.div variants={pop} className="h-full">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="flex h-full flex-col items-center rounded-2xl border border-[#0A3161]/80 bg-white px-5 py-7 text-center shadow-[0_10px_40px_rgba(10,49,97,0.08)] transition-shadow hover:shadow-[0_16px_50px_rgba(10,49,97,0.16)] dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:backdrop-blur-xl dark:hover:border-white/25"
      >
        <div className="grid h-16 place-items-center text-[#0A3161] dark:text-[#4da3ff]">
          {Flag ? (
            <Flag className="h-11 w-16 overflow-hidden rounded-md shadow-md" aria-hidden="true" />
          ) : (
            <Icon className="h-14 w-14" strokeWidth={1.4} aria-hidden="true" />
          )}
        </div>

        <p className="mt-4 font-serif text-xl font-bold uppercase leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-2xl">
          {card.count ? (
            <CountUp to={card.count.to} decimals={card.count.decimals} suffix={card.count.suffix} />
          ) : (
            card.value
          )}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-slate-400">
          {card.text}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function OverviewSection({ data }) {
  const o = data.overview;
  if (!o) return null;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-white dark:bg-slate-950">
        {/* dark mode only: glows so the glass blur is visible */}
        <div className="pointer-events-none absolute inset-0 hidden dark:block">
          <div className="absolute -right-24 top-10 h-96 w-96 rounded-full bg-[#4da3ff]/15 blur-[120px]" />
          <div className="absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-[#ff4d6d]/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-14 lg:px-6 lg:py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
            {/* ---------- left: copy ---------- */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <h2 className="text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
                {o.title}
              </h2>
              <div className="mt-2 h-1 w-14 rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161] dark:from-[#ff4d6d] dark:to-[#4da3ff]" />
              {o.paragraphs.map((p) => (
                <p
                  key={p.slice(0, 40)}
                  className="mt-5 text-sm leading-relaxed text-neutral-600 dark:text-slate-400"
                >
                  {p}
                </p>
              ))}
            </motion.div>

            {/* ---------- right: 2 x 2 stat cards ---------- */}
            <motion.div
              variants={list}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {o.cards.map((c) => (
                <StatCard key={c.text.slice(0, 30)} card={c} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
