'use client';

import { MotionConfig, motion } from 'framer-motion';
import {
  Anchor,
  Barcode,
  CalendarDays,
  Building2,
  Container,
  FileText,
  Globe2,
  Hash,
  Package,
  Route,
  Ruler,
  Scale,
  Ship,
  Tag,
} from 'lucide-react';

const ICONS = {
  date: CalendarDays,
  company: Building2,
  shipper: Ship,
  hs: Hash,
  description: FileText,
  unit: Ruler,
  weight: Scale,
  port: Anchor,
  portIn: Container,
  country: Globe2,
  package: Package,
  tag: Tag,
  codes: Barcode,
  route: Route,
};

const ACCENT = {
  import: {
    tile: 'from-[#B31942] to-[#e0455f] dark:from-[#ff4d6d] dark:to-[#ff8da0]',
    num: 'text-[#B31942]/15 group-hover:text-[#B31942]/40 dark:text-white/10 dark:group-hover:text-[#ff4d6d]/50',
    line: 'from-[#B31942] to-transparent dark:from-[#ff4d6d]',
    hover: 'hover:border-[#B31942]/40 dark:hover:border-[#ff4d6d]/40',
    glow: 'bg-[#ff4d6d]/10',
    bar: 'from-[#B31942] to-[#0A3161] dark:from-[#ff4d6d] dark:to-[#4da3ff]',
  },
  export: {
    tile: 'from-[#0A3161] to-[#1d5fb5] dark:from-[#4da3ff] dark:to-[#9ad0ff]',
    num: 'text-[#0A3161]/15 group-hover:text-[#0A3161]/40 dark:text-white/10 dark:group-hover:text-[#4da3ff]/50',
    line: 'from-[#0A3161] to-transparent dark:from-[#4da3ff]',
    hover: 'hover:border-[#0A3161]/40 dark:hover:border-[#4da3ff]/40',
    glow: 'bg-[#4da3ff]/10',
    bar: 'from-[#0A3161] to-[#B31942] dark:from-[#4da3ff] dark:to-[#ff4d6d]',
  },
};

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const card = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function MajorInfoSection({ data }) {
  const m = data.majorInfo;
  if (!m) return null;
  const a = ACCENT[data.type];

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-neutral-50/70 dark:bg-[#050816]">
        {/* dark mode only: glows so the glass blur is visible */}
        <div className="pointer-events-none absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
          <div
            className={`absolute left-1/2 top-1/2 h-72 w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px] ${a.glow}`}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-24">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
              {m.title}
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: 'easeOut' }}
              className={`mx-auto mt-4 h-1 w-20 origin-center rounded-full bg-linear-to-r ${a.bar}`}
            />
          </motion.div>

          {/* cards */}
          <motion.ul
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
          >
            {m.items.map((it, i) => {
              const Icon = ICONS[it.icon] || FileText;
              return (
                <motion.li key={it.label} variants={card} className="h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`group relative flex h-full min-h-[150px] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_8px_30px_rgba(20,20,60,0.05)] transition-shadow hover:shadow-[0_18px_50px_rgba(20,20,60,0.12)] dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:backdrop-blur-xl ${a.hover}`}
                  >
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-xl bg-linear-to-br text-white shadow-[0_8px_20px_rgba(10,49,97,0.25)] transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 dark:shadow-[0_0_22px_rgba(77,163,255,0.4)] ${a.tile}`}
                    >
                      <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
                    </span>

                    <h3 className="mt-5 text-[15px] font-semibold leading-snug text-neutral-900 dark:text-white">
                      {it.label}
                    </h3>
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>
    </MotionConfig>
  );
}
