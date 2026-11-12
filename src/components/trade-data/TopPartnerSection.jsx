'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import {
  BR,
  CA,
  CN,
  DE,
  GB,
  IE,
  IN,
  JP,
  KR,
  MX,
  NL,
  SG,
  TW,
  VN,
} from 'country-flag-icons/react/3x2';

// add more flags here if your data uses other country codes
const FLAGS = { BR, CA, CN, DE, GB, IE, IN, JP, KR, MX, NL, SG, TW, VN };

const ACCENT = {
  import: {
    line: 'from-[#B31942] to-[#ff4d6d]',
    ring: 'ring-[#B31942]/50 dark:ring-[#ff4d6d]/60',
    glow: 'shadow-[0_0_0_6px_rgba(179,25,66,0.12)] dark:shadow-[0_0_24px_rgba(255,77,109,0.55)]',
    text: 'text-[#B31942] dark:text-[#ff8da0]',
    bar: 'from-[#B31942] to-[#ff4d6d]',
    soft: 'bg-[#B31942]/8 dark:bg-[#ff4d6d]/10',
    border: 'border-[#B31942]/30 dark:border-[#ff4d6d]/40',
    blob: 'bg-[#ff4d6d]/15',
    blob2: 'bg-[#4da3ff]/10',
  },
  export: {
    line: 'from-[#0A3161] to-[#4da3ff]',
    ring: 'ring-[#0A3161]/50 dark:ring-[#4da3ff]/60',
    glow: 'shadow-[0_0_0_6px_rgba(10,49,97,0.12)] dark:shadow-[0_0_24px_rgba(77,163,255,0.55)]',
    text: 'text-[#0A3161] dark:text-[#7cc4ff]',
    bar: 'from-[#0A3161] to-[#4da3ff]',
    soft: 'bg-[#0A3161]/8 dark:bg-[#4da3ff]/10',
    border: 'border-[#0A3161]/30 dark:border-[#4da3ff]/40',
    blob: 'bg-[#4da3ff]/15',
    blob2: 'bg-[#ff4d6d]/10',
  },
};

const fmt = (n) =>
  n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function Flag({ code, className }) {
  const F = FLAGS[code];
  return F ? <F className={className} aria-hidden="true" /> : null;
}

export default function TopPartnersSection({ data }) {
  const t = data.topPartners;
  const [active, setActive] = useState(0);
  const listRef = useRef(null);
  const a = ACCENT[data.type];

  // the colored line fills as you scroll down the list
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 65%', 'end 65%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  if (!t) return null;
  const max = Math.max(...t.items.map((i) => i.pct));
  const cur = t.items[active];

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative bg-white dark:bg-slate-950">
        {/* soft color blobs (visible in both modes, stronger in dark) */}
        {/* <div className="pointer-events-none absolute inset-0">
          <div
            className={`absolute -left-24 top-24 h-80 w-80 rounded-full blur-[110px] ${a.blob}`}
          />
          <div
            className={`absolute -right-24 bottom-24 h-80 w-80 rounded-full blur-[110px] ${a.blob2}`}
          />
          <div className="absolute inset-0 hidden bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)] dark:block" />
        </div> */}

        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* ---------- left: sticky title + spotlight ---------- */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
                  {t.title}
                  <span className="mx-2 font-light text-neutral-300 dark:text-slate-600">|</span>
                  {t.subtitle}
                </h2>
                <div className={`mt-4 h-1 w-16 rounded-full bg-linear-to-r ${a.bar}`} />
                <p className="mt-5 text-sm leading-relaxed text-neutral-600 dark:text-slate-400">
                  {t.intro}
                </p>
              </motion.div>

              {/* spotlight: follows the country in view / hovered */}
              <div className="mt-8 hidden lg:block">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={cur.name}
                    initial={{ opacity: 0, y: 16, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3 }}
                    className={`relative overflow-hidden rounded-3xl border p-6 backdrop-blur-xl ${a.border} bg-white/80 shadow-[0_20px_60px_rgba(15,40,100,0.12)] dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)]`}
                  >
                    {/* big blurred flag as backdrop */}
                    <Flag
                      code={cur.flag}
                      className="pointer-events-none absolute -right-10 -top-10 h-44 w-auto rotate-6 opacity-[0.12] blur-[2px]"
                    />
                    <div className="relative flex items-center gap-4">
                      <Flag
                        code={cur.flag}
                        className="h-14 w-20 rounded-lg shadow-lg ring-1 ring-black/10"
                      />
                      <div>
                        <p
                          className={`text-[11px] font-bold uppercase tracking-[0.16em] ${a.text}`}
                        >
                          Rank #{active + 1} of {t.items.length}
                        </p>
                        <p className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">
                          {cur.name}
                        </p>
                      </div>
                    </div>

                    <div className="relative mt-6 grid grid-cols-2 gap-3">
                      <div className={`rounded-2xl px-4 py-3 ${a.soft}`}>
                        <p className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">
                          ${fmt(cur.value)}B
                        </p>
                        <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-slate-400">
                          Trade value, 2025
                        </p>
                      </div>
                      <div className={`rounded-2xl px-4 py-3 ${a.soft}`}>
                        <p className="font-serif text-2xl font-bold text-neutral-950 dark:text-white">
                          {cur.pct}%
                        </p>
                        <p className="mt-0.5 text-[11px] text-neutral-500 dark:text-slate-400">
                          Share of total
                        </p>
                      </div>
                    </div>
                    <p className="relative mt-4 text-sm leading-relaxed text-neutral-600 dark:text-slate-300">
                      {cur.note}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ---------- right: scroll timeline ---------- */}
            <div ref={listRef} className="relative">
              {/* track + progress line */}
              <div
                className="absolute bottom-6 left-5 top-6 w-px bg-neutral-200 dark:bg-white/10"
                aria-hidden="true"
              />
              <motion.div
                style={{ scaleY: fill, transformOrigin: 'top' }}
                className={`absolute bottom-6 left-5 top-6 w-0.5 -translate-x-[0.5px] rounded-full bg-linear-to-b ${a.line}`}
                aria-hidden="true"
              />

              <ol className="space-y-5">
                {t.items.map((it, i) => {
                  const on = active === i;
                  return (
                    <motion.li
                      key={it.name}
                      onViewportEnter={() => setActive(i)}
                      viewport={{ margin: '-42% 0px -42% 0px' }}
                      onMouseEnter={() => setActive(i)}
                      className="relative pl-16"
                    >
                      {/* flag node on the line */}
                      <motion.span
                        animate={{ scale: on ? 1.18 : 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`absolute left-0 top-2 grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-white ring-2 transition-shadow ${
                          on
                            ? `${a.ring} ${a.glow}`
                            : 'ring-neutral-200 dark:bg-slate-900 dark:ring-white/15'
                        }`}
                      >
                        <Flag code={it.flag} className="h-full w-[150%] max-w-none object-cover" />
                      </motion.span>

                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className={`rounded-2xl border p-4 backdrop-blur-xl transition-all duration-300 ${
                          on
                            ? `${a.border} bg-white shadow-[0_14px_44px_rgba(20,20,60,0.12)] dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.14] dark:to-white/[0.04]`
                            : 'border-neutral-200 bg-white/80 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.07] dark:to-white/[0.02]'
                        }`}
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                          <h3 className="font-serif text-lg font-bold text-neutral-950 dark:text-white">
                            <span className={`mr-2 text-sm font-semibold ${a.text}`}>
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            {it.name}
                          </h3>
                          <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                            ${fmt(it.value)}B <span className={`ml-1 ${a.text}`}>({it.pct}%)</span>
                          </p>
                        </div>

                        {/* share bar */}
                        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-neutral-100 dark:bg-white/10">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${(it.pct / max) * 100}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            className={`h-full rounded-full bg-linear-to-r ${a.bar}`}
                          />
                        </div>

                        <p className="mt-3 text-[13px] leading-relaxed text-neutral-600 dark:text-slate-400">
                          {it.note}
                        </p>
                      </motion.div>
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
