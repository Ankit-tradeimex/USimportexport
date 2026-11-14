'use client';
import { useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { BadgeCheck, BarChart3, FileSearch, Handshake } from 'lucide-react';

const CONTENT = {
  title: 'What makes USimportdata the',
  accent: 'best option for US trade data?',
  intro:
    'When it comes to choosing a US trade data provider, there are several reasons why USimportdata stands out from the competition. USimportdata is unique in many ways as your go-to platform for acquiring US trade data with many assets included for a user-friendly experience:',
};

/* TODO: only the "User-Friendly Platform" text was provided. Paste the other three. */
const TABS = [
  {
    id: 'reliability',
    label: 'Reliability And Accuracy',
    Icon: BadgeCheck,
    text: 'At USimportdata, we pride ourselves on the accuracy and reliability of our US trade data. Our team works tirelessly to ensure that our clients receive the most up-to-date and reliable information available, allowing them to make informed decisions with confidence.',
  },
  {
    id: 'detailed',
    label: 'Detailed Information',
    Icon: FileSearch,
    text: 'We offer detailed information on the US market, including detailed information on imports, exports, tariffs, trade partners, and more. With USimportdata, you can access a wealth of data to gain a deep understanding of the market landscape and identify new growth opportunities.',
  },
  {
    id: 'friendly',
    label: 'User-Friendly Platform',
    Icon: Handshake,
    text: 'Our platform is designed with the user in mind, making it easy to navigate and access the information you need quickly and efficiently. The USimportdata user-friendly interface makes it easy to find the US trade data you need to make informed decisions.',
  },
  {
    id: 'market',
    label: 'Market Analysis and Insights',
    Icon: BarChart3,
    text: 'At USimportdata, we provide market insights and analysis as per your requirements for US trade data, helping businesses understand the US market trends, identify opportunities, and make strategic decisions.',
  },
];

export default function WhyChooseSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState('reliability');
  const tab = TABS.find((t) => t.id === active);

  const onKey = (e, i) => {
    if (e.key === 'ArrowRight') setActive(TABS[(i + 1) % TABS.length].id);
    if (e.key === 'ArrowLeft') setActive(TABS[(i - 1 + TABS.length) % TABS.length].id);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <h2 className="text-3xl font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              {CONTENT.title}{' '}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                {CONTENT.accent}
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70">
              {CONTENT.intro}
            </p>
          </motion.div>

          {/* tabs */}
          <div
            role="tablist"
            aria-label="Why choose USimportdata"
            className="mt-10 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50 p-1.5 sm:inline-flex dark:border-white/10 dark:bg-white/5"
          >
            {TABS.map(({ id, label, Icon }, i) => {
              const on = id === active;
              return (
                <button
                  key={id}
                  id={`why-tab-${id}`}
                  role="tab"
                  aria-selected={on}
                  aria-controls="why-panel"
                  tabIndex={on ? 0 : -1}
                  type="button"
                  onClick={() => setActive(id)}
                  onKeyDown={(e) => onKey(e, i)}
                  className={`relative cursor-pointer flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
                    on
                      ? 'text-white'
                      : 'text-slate-600 hover:text-slate-900 dark:text-white/70 dark:hover:text-white'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="why-tab-pill"
                      className="absolute inset-0 rounded-xl bg-linear-to-r from-[#B31942] to-[#0A3161] shadow-md"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <Icon className="relative h-4 w-4" aria-hidden="true" />
                  <span className="relative whitespace-nowrap">{label}</span>
                </button>
              );
            })}
          </div>

          {/* panel */}
          <div
            id="why-panel"
            role="tabpanel"
            aria-labelledby={`why-tab-${active}`}
            className="relative mt-5 overflow-hidden rounded-3xl bg-linear-to-r from-[#B31942] via-[#5c2150] to-[#0A3161] text-white shadow-2xl"
          >
            {/* grid + glow */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_90%_at_80%_50%,black,transparent)]" />
              <div className="absolute -right-16 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#4da3ff]/25 blur-[100px]" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3 }}
                className="relative grid items-center gap-8 px-7 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.3fr_1fr] lg:gap-12"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                    {tab.label}
                  </p>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/95 sm:text-xl">
                    {tab.text}
                  </p>
                </div>

                {/* animated icon */}
                <div className="relative mx-auto flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52">
                  {[0, 1, 2].map((r) => (
                    <motion.span
                      key={r}
                      className="absolute inset-0 rounded-full border border-white/25"
                      animate={reduce ? undefined : { scale: [0.7, 1.15], opacity: [0.6, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: r * 1, ease: 'easeOut' }}
                      style={
                        reduce ? { transform: `scale(${0.7 + r * 0.15})`, opacity: 0.3 } : undefined
                      }
                    />
                  ))}
                  <motion.div
                    animate={reduce ? undefined : { y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative flex h-28 w-28 items-center justify-center rounded-3xl border border-white/25 bg-white/10 backdrop-blur-md sm:h-32 sm:w-32"
                  >
                    <tab.Icon
                      className="h-14 w-14 text-white sm:h-16 sm:w-16"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
