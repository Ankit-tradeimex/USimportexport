'use client';
import { useRef } from 'react';
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import { Compass, Lightbulb, Rocket, Quote } from 'lucide-react';

const CONTENT = {
  eyebrow: 'Our story',
  title: 'Why we built',
  accent: 'USimportdata',
  quote:
    'In the fast-paced world of international trade, staying ahead of the competition is important for businesses to thrive and grow.',
  closing:
    'Look no further than USimportdata in case you’re an aspiring or seasoned dealer or trader trying to enter the enormous United States marketplace.',
};

const CHAPTERS = [
  {
    Icon: Compass,
    label: 'The need',
    text: 'Due to the ever-changing marketplace dynamics and global trade regulations, gaining access to correct and updated US trade data is important for making informed business choices. This is where USimportdata, your trusted US trade data provider, is available.',
    tone: 'red',
  },
  {
    Icon: Lightbulb,
    label: 'What we do',
    text: 'By collating and analyzing facts from various assets, USimportdata gives valuable insights into the US market tendencies, purchaser conduct, and competitor history.',
    tone: 'blue',
  },
  {
    Icon: Rocket,
    label: 'What you discover',
    text: 'With our US trade data, discover specific insights and forecasts of the leading goods imported and exported from the USA and the pinnacle US importers, exporters, and companies.',
    tone: 'red',
  },
];

const TONES = {
  red: { bg: 'from-[#B31942] to-[#ff4d6d]', text: 'text-[#B31942] dark:text-[#ff8da0]' },
  blue: { bg: 'from-[#0A3161] to-[#4da3ff]', text: 'text-[#0A3161] dark:text-[#7cc4ff]' },
};

export default function OurStorySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.2fr] lg:gap-16">
          {/* ---------- left: heading + quote (sticky) ---------- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0A3161] dark:border-white/10 dark:bg-white/5 dark:text-[#7cc4ff]">
                {CONTENT.eyebrow}
              </span>
              <h2 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
                {CONTENT.title}{' '}
                <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                  {CONTENT.accent}
                </span>
              </h2>
            </motion.div>

            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.12 }}
              className="relative mt-8 overflow-hidden rounded-3xl bg-linear-to-br from-[#0A3161] via-[#17104d] to-[#5c2150] p-7 text-white shadow-xl sm:p-8"
            >
              <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#ff4d6d]/25 blur-3xl" />
              <Quote className="relative h-8 w-8 text-white/40" aria-hidden="true" />
              <blockquote className="relative mt-3 text-lg font-medium leading-relaxed sm:text-xl">
                {CONTENT.quote}
              </blockquote>
            </motion.figure>
          </div>

          {/* ---------- right: timeline ---------- */}
          <div ref={ref} className="relative">
            {/* track + fill */}
            <div className="absolute bottom-6 left-6 top-6 w-0.5 -translate-x-1/2 rounded-full bg-slate-200 dark:bg-white/10" />
            <motion.div
              style={{ scaleY: fill, transformOrigin: 'top' }}
              className="absolute bottom-6 left-6 top-6 w-0.5 -translate-x-1/2 rounded-full bg-linear-to-b from-[#B31942] to-[#0A3161]"
            />

            <ol className="space-y-8">
              {CHAPTERS.map(({ Icon, label, text, tone }, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="relative flex gap-5"
                >
                  <span
                    className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-lg ring-4 ring-white dark:ring-[#07071f] ${TONES[tone].bg}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="flex-1 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl">
                    <p
                      className={`text-xs font-semibold uppercase tracking-wider ${TONES[tone].text}`}
                    >
                      0{i + 1} · {label}
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-600 sm:text-base dark:text-white/70">
                      {text}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>

            {/* closing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="mt-8 rounded-3xl border border-[#B31942]/20 bg-linear-to-r from-[#B31942]/5 to-[#0A3161]/5 p-6 sm:ml-[68px] dark:border-white/15 dark:from-[#ff4d6d]/10 dark:to-[#4da3ff]/10"
            >
              <p className="text-base font-semibold leading-relaxed text-slate-900 sm:text-lg dark:text-white">
                {CONTENT.closing}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
