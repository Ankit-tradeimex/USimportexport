'use client';
import { useEffect, useRef, useState } from 'react';
import { MotionConfig, animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { Building2, CalendarClock, Database, Globe2 } from 'lucide-react';

const STATS = [
  {
    Icon: CalendarClock,
    value: 8,
    suffix: '+',
    label: 'Years of experience',
    note: 'In US trade data',
  },
  {
    Icon: Database,
    value: null,
    suffix: '+',
    label: 'Shipment records',
    note: 'TODO: add your number',
  },
  {
    Icon: Globe2,
    value: null,
    suffix: '+',
    label: 'Partner countries',
    note: 'TODO: add your number',
  },
  {
    Icon: Building2,
    value: null,
    suffix: '+',
    label: 'Importers & exporters',
    note: 'TODO: add your number',
  },
];

function CountUp({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce ? value : 0);

  useEffect(() => {
    if (value == null || !inView) return;
    if (reduce) {
      setShown(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  if (value == null) return <span ref={ref}>—</span>;
  return (
    <span ref={ref}>
      {shown.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

export default function AboutNumbersSection({ stats = STATS }) {
  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-16 sm:py-20">
        <div className="relative mx-auto w-full max-w-7xl overflow-hidden rounded-[2rem] bg-[#07071f] bg-linear-to-br from-[#0a0a2e] via-[#17104d] to-[#0a1a4a] px-6 py-14 text-white sm:px-10 sm:py-16">
          {/* background */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_40%,black,transparent)]" />
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#ff4d6d]/20 blur-[110px]" />
            <div className="absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-[#4da3ff]/25 blur-[110px]" />
          </div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-2xl text-center"
            >
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                USimportdata{' '}
                <span className="bg-linear-to-r from-[#7cc4ff] via-white to-[#ff8da0] bg-clip-text text-transparent">
                  in numbers
                </span>
              </h2>
            </motion.div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map(({ Icon, value, suffix, label, note }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-linear-to-br from-white/[0.12] to-white/[0.03] p-6 backdrop-blur-xl"
                >
                  <div
                    className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${
                      i % 2 ? 'bg-[#4da3ff]/25 opacity-40' : 'bg-[#ff4d6d]/25 opacity-40'
                    }`}
                  />
                  <span
                    className={`relative flex h-11 w-11 items-center justify-center rounded-xl ${
                      i % 2 ? 'bg-[#4da3ff]/20 text-[#7cc4ff]' : 'bg-[#ff4d6d]/20 text-[#ff8da0]'
                    }`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p className="relative mt-5 bg-linear-to-r from-white to-white/70 bg-clip-text text-5xl font-bold leading-none tracking-tight text-transparent">
                    <CountUp value={value} suffix={suffix} />
                  </p>
                  <p className="relative mt-3 text-sm font-semibold text-white">{label}</p>
                  {value != null && note && (
                    <p className="relative mt-1 text-xs text-white/55">{note}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
