'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Bell, Check, ChevronRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
const CONTENT = {
  pill: { label: 'Get Our Latest Updates', href: '/blogs' },
  title: 'Unmatched Expertise in',
  accent: 'US Trade Data',
};

/* the paragraph, split into pieces. `em` pieces are highlighted. */
const PARAGRAPH = [
  { t: 'With years of experience and a deep understanding of international trade flows, ' },
  { t: 'USImportdata', em: true },
  {
    t: ' has become a key trade data provider for businesses navigating the complexities of the US import–export ecosystem. Our data covers millions of trade records across product categories, helping clients identify market trends, supplier performance, demand patterns, and competitor activity. Whether it’s understanding HS codes, monitoring shipment volumes, or assessing trade dynamics across regions, USImportdata provides ',
  },
  { t: 'clear, actionable insights', em: true },
  {
    t: ' with our database that power confident business decisions. We help clients overcome common challenges in US trade, from identifying reliable buyers and suppliers to tracking price movements and analyzing market potential.',
  },
];

/* groups taken from the paragraph above */
const GROUPS = [
  {
    title: 'Our data helps you identify',
    tone: 'blue',
    items: ['Market trends', 'Supplier performance', 'Demand patterns', 'Competitor activity'],
  },
  {
    title: 'Challenges we help you overcome',
    tone: 'red',
    items: [
      'Identifying reliable buyers and suppliers',
      'Tracking price movements',
      'Analyzing market potential',
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Scroll-linked paragraph: words light up as you scroll              */
/* ------------------------------------------------------------------ */
function Word({ children, em, progress, start, end }) {
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={
        em
          ? 'bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text font-bold text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]'
          : undefined
      }
    >
      {children}{' '}
    </motion.span>
  );
}

function RevealParagraph() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });

  const words = PARAGRAPH.flatMap((seg) =>
    seg.t
      .split(/\s+/)
      .filter(Boolean)
      .map((w) => ({ w, em: !!seg.em })),
  );
  const n = words.length;

  return (
    <p
      ref={ref}
      className="mx-auto max-w-5xl text-center text-xl leading-[1.7] text-slate-800 sm:text-2xl sm:leading-[1.7] dark:text-white"
    >
      {reduce
        ? words.map((x, i) => (
            <span
              key={i}
              className={x.em ? 'font-bold text-[#B31942] dark:text-[#ff8da0]' : undefined}
            >
              {x.w}{' '}
            </span>
          ))
        : words.map((x, i) => {
            const start = (i / n) * 0.9;
            return (
              <Word key={i} em={x.em} progress={scrollYProgress} start={start} end={start + 0.1}>
                {x.w}
              </Word>
            );
          })}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function ExpertiseSection() {
  const reduce = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-4 py-16 sm:py-24">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,49,97,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(10,49,97,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
          <div className="absolute left-1/2 top-0 h-72 w-[60%] -translate-x-1/2 rounded-full bg-[#4da3ff]/10 blur-[120px] dark:bg-[#4da3ff]/15" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl">
          {/* heading */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
            >
              <Link
                href={CONTENT.pill.href}
                className="group inline-flex items-center gap-3 rounded-full bg-[#0A3161]/10 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-[#0A3161] transition hover:bg-[#0A3161]/15 dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff] dark:hover:bg-[#4da3ff]/25"
              >
                <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#0A3161] text-white">
                  {!reduce && (
                    <span className="absolute inset-0 animate-ping rounded-full bg-[#0A3161]/40" />
                  )}
                  <Bell className="relative h-4 w-4" aria-hidden="true" />
                </span>
                {CONTENT.pill.label}
                <ChevronRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: 0.08 }}
              className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
            >
              {CONTENT.title}{' '}
              <span className="relative inline-block bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                {CONTENT.accent}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                  style={{ transformOrigin: 'left' }}
                  className="absolute -bottom-2 left-0 h-1 w-full rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161] dark:from-[#ff8da0] dark:to-[#7cc4ff]"
                />
              </span>
            </motion.h2>
          </div>

          {/* scroll-reveal paragraph */}
          <div className="mt-14">
            <RevealParagraph />
          </div>

          {/* groups */}
          <div className="mt-16 grid gap-6 lg:grid-cols-2">
            {GROUPS.map((g, gi) => (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: gi * 0.1 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
              >
                <h3
                  className={`text-sm font-semibold uppercase tracking-wider ${
                    g.tone === 'red'
                      ? 'text-[#B31942] dark:text-[#ff8da0]'
                      : 'text-[#0A3161] dark:text-[#7cc4ff]'
                  }`}
                >
                  {g.title}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-3">
                  {g.items.map((item, i) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 18,
                        delay: 0.2 + i * 0.08,
                      }}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold ${
                        g.tone === 'red'
                          ? 'border-[#B31942]/25 bg-[#B31942]/5 text-slate-800 dark:border-[#ff4d6d]/30 dark:bg-[#ff4d6d]/10 dark:text-white'
                          : 'border-[#0A3161]/25 bg-[#0A3161]/5 text-slate-800 dark:border-[#4da3ff]/30 dark:bg-[#4da3ff]/10 dark:text-white'
                      }`}
                    >
                      <Check
                        className={`h-4 w-4 shrink-0 ${
                          g.tone === 'red'
                            ? 'text-[#B31942] dark:text-[#ff8da0]'
                            : 'text-[#0A3161] dark:text-[#7cc4ff]'
                        }`}
                        aria-hidden="true"
                      />
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
