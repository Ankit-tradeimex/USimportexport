'use client';
import { useRef } from 'react';
import { MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import { BadgeDollarSign, Headset, Quote, ShieldCheck } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Content (your text; **bold** parts are marked with the `b` flag)    */
/* ------------------------------------------------------------------ */
const CONTENT = {
  title: 'Commitment to Quality and',
  accent: 'Client Satisfaction',
  intro: [
    { t: 'At ' },
    { t: 'USImportdata', b: true },
    { t: ', we combine advanced data technology with trade expertise to deliver ' },
    { t: '100% verified and up-to-date US import–export data', b: true },
    {
      t: '. We work hard for our clients by combining technological expertise with economic sense to ensure that our US trade database is accurate and updated in every manner. Our main goal is always to satisfy our customers and clients with our US import-export data, and we put a lot of effort into doing so.',
    },
  ],
  lead: 'Our clients trust us for three key reasons:',
  closing: [
    { t: 'With a client-first approach and track record of excellence in data-providing, ' },
    { t: 'USImportdata', b: true },
    { t: ' stands as a ' },
    { t: 'global leader in providing the US trade database', b: true },
    { t: ', helping businesses leverage real data to capture real opportunities.' },
  ],
};

const REASONS = [
  {
    Icon: ShieldCheck,
    label: 'Accuracy',
    text: 'Every dataset is verified and updated regularly to ensure reliability.',
    tone: 'blue',
  },
  {
    Icon: BadgeDollarSign,
    label: 'Affordability',
    text: 'We provide comprehensive trade intelligence & database at reasonable pricing.',
    tone: 'red',
  },
  {
    Icon: Headset,
    label: 'Support',
    text: 'Our responsive customer team ensures that every client gets timely assistance and tailored solutions.',
    tone: 'blue',
  },
];

const TONE = {
  red: 'bg-[#B31942] shadow-[#B31942]/30',
  blue: 'bg-[#0A3161] shadow-[#0A3161]/30 dark:bg-[#1c5fb0]',
};

function Rich({ parts, boldClass = 'font-semibold text-slate-900 dark:text-white' }) {
  return parts.map((p, i) =>
    p.b ? (
      <strong key={i} className={boldClass}>
        {p.t}
      </strong>
    ) : (
      <span key={i}>{p.t}</span>
    ),
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function QualitySection() {
  const list = useRef(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 0.7', 'end 0.6'] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-4 py-16 sm:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
          <div className="absolute -right-24 bottom-24 h-96 w-96 rounded-full bg-[#0A3161]/10 blur-[120px] dark:bg-[#4da3ff]/20" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl">
          {/* heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-4xl text-center text-4xl font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl dark:text-white"
          >
            {CONTENT.title}{' '}
            <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
              {CONTENT.accent}
            </span>
          </motion.h2>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
            {/* left: statement (sticky) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <div className="relative rounded-3xl border border-slate-200 bg-white p-7 shadow-xl sm:p-9 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl">
                <span className="absolute -top-5 left-7 flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-[#B31942] to-[#0A3161] text-white shadow-lg">
                  <Quote className="h-5 w-5" aria-hidden="true" />
                </span>
                <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70">
                  <Rich parts={CONTENT.intro} />
                </p>
              </div>
            </motion.div>

            {/* right: reasons timeline */}
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-6 text-sm font-semibold uppercase tracking-wider text-[#B31942] dark:text-[#ff8da0]"
              >
                {CONTENT.lead}
              </motion.p>

              <div ref={list} className="relative space-y-6 pl-16">
                {/* track + scroll-drawn line */}
                <div className="absolute bottom-6 left-[27px] top-6 w-0.5 rounded-full bg-slate-200 dark:bg-white/15" />
                <motion.div
                  style={{ scaleY: line, transformOrigin: 'top' }}
                  className="absolute bottom-6 left-[27px] top-6 w-0.5 rounded-full bg-linear-to-b from-[#B31942] to-[#0A3161] dark:from-[#ff8da0] dark:to-[#7cc4ff]"
                />

                {REASONS.map((r, i) => (
                  <motion.div
                    key={r.label}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="relative"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }}
                      className={`absolute -left-16 top-1 flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ${TONE[r.tone]}`}
                    >
                      <r.Icon className="h-6 w-6" aria-hidden="true" />
                    </motion.span>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl">
                      <h3 className="flex items-baseline gap-2 text-lg font-semibold text-slate-900 dark:text-white">
                        <span className="text-sm font-bold text-[#B31942] dark:text-[#ff8da0]">
                          0{i + 1}
                        </span>
                        {r.label}
                      </h3>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600 dark:text-white/70">
                        {r.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* closing banner */}
          <motion.div
            initial={{ opacity: 0, y: 36, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative mt-14 overflow-hidden rounded-3xl bg-[#07071f] bg-linear-to-br from-[#0a0a2e] via-[#17104d] to-[#0a1a4a] p-8 text-center shadow-2xl sm:p-12"
          >
            <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-[#B31942]/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-[#4da3ff]/25 blur-3xl" />
            <p className="relative mx-auto max-w-3xl text-lg leading-relaxed text-white/75 sm:text-xl">
              <Rich parts={CONTENT.closing} boldClass="font-semibold text-white" />
            </p>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
