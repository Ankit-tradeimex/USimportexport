'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import Image from 'next/image';
import AnimatedText from '../utils/AnimatedText';

/* ------------------------------------------------------------------ */
/* Content (edit freely)                                               */
/* ------------------------------------------------------------------ */
const STEPS = [
  {
    title: 'Comprehensive US Bill of Lading Data Coverage',
    text: 'Access detailed US trade records with up-to-date USA import-export bill of lading data. Get live insights on US maritime trade, connect with new buyers and suppliers, and filter the US importers-exporters database to build your own list of buyers and suppliers.',
    panel: 'Bill of Lading Data',
    icon: (
      <>
        <path d="M5 20V10M10 20V4M15 20v-7M20 20V8" />
        <path d="M3 20h18" />
      </>
    ),
  },
  {
    title: 'Quick Updates on US Import-Export Trade Activities',
    text: 'Stay informed of the latest US trade activity as it happens. Get quick updates on US trade statistics for a better, faster experience.',
    panel: 'Live Trade Feed',
    icon: (
      <>
        <circle cx="12" cy="13.500" r="7.500" />
        <path d="M12 9.500v4l2.500 1.500M9.500 3h5" />
      </>
    ),
  },
  {
    title: 'Customized USA Trade Data with Advanced Filters',
    text: 'Use filtered live search on US export and import data by company, HS code, country, port and product. These advanced filters fit your specific requirements for US trade activities.',
    panel: 'Advanced Filters',
    icon: (
      <>
        <path d="M4 5h16l-6.200 7.500V19l-3.600-2v-4.500L4 5z" />
      </>
    ),
  },
  {
    title: 'Affordable Pricing',
    text: 'Avail our US trade data services at affordable prices. We provide quality data at a reasonable price.',
    panel: 'Pricing',
    icon: (
      <>
        <path d="M3 12.500V4h8.500l9 9-8.500 8.500-9-9z" transform="translate(0 -0.500)" />
        <circle cx="7.500" cy="8.500" r="1.300" />
      </>
    ),
  },
];

/* ------------------------------------------------------------------ */
/* Right-hand sticky panel visuals (sample data only)                  */
/* ------------------------------------------------------------------ */
const fadeUp = (i) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: 0.08 * i, duration: 0.4, ease: 'easeOut' },
});

/* ------------------------------------------------------------------ */
/* Timeline                                                            */
/* ------------------------------------------------------------------ */
function Node({ index, active, icon }) {
  const done = index < active;
  const current = index === active;
  return (
    <motion.div
      animate={{ scale: current ? 1.1 : 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      className={`relative z-10 grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border-2 transition-colors duration-300 ${
        current
          ? ' gradient text-white shadow-[0_8px_24px_rgba(93,186,246,0.45)]'
          : done
            ? ' bg-[#B31942] text-white'
            : 'border-neutral-200 bg-white text-neutral-400'
      }`}
    >
      {current && (
        <motion.span
          className="absolute inset-0 rounded-full border border-[#B31942]"
          animate={{ scale: [1, 1.6], opacity: [0.7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
        />
      )}
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.700"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        {icon}
      </svg>
    </motion.div>
  );
}

export default function TimelineSection() {
  const [active, setActive] = useState(0);
  const listRef = useRef(null);

  // scroll-linked progress line
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.65', 'end 0.55'],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-[#f6f9fe] px-6 py-20 lg:px-10 lg:py-28">
        <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-[#5DBAF6]/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600">
              Key Features
            </span>
            {/* <h2 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl">
              USImportData Live Search: Key Features of the{" "}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent">
                Live US Import-Export Database
              </span>
            </h2> */}
            <AnimatedText
              text="USImportData Live Search: Key Features of the"
              highlight="Live US Import-Export Database"
              className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl"
              delay={0.2}
              stagger={0.08}
              duration={0.7}
            />
          </motion.div>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            {/* ---------- timeline ---------- */}
            <div ref={listRef} className="relative">
              {/* track */}
              <div className="absolute bottom-6 left-[25px] top-6 w-0.5 rounded-full bg-neutral-200" />
              {/* progress */}
              <motion.div
                style={{ scaleY, transformOrigin: 'top' }}
                className="absolute bottom-6 left-[25px] top-6 w-0.5 rounded-full bg-linear-to-b from-[#B31942] to-[#0A3161]"
              />

              <ol className="relative">
                {STEPS.map((s, i) => (
                  <motion.li
                    key={s.title}
                    onViewportEnter={() => setActive(i)}
                    viewport={{ margin: '-42% 0px -42% 0px' }}
                    className="flex gap-5 pb-16 last:pb-0"
                  >
                    <Node index={i} active={active} icon={s.icon} />

                    <motion.div
                      initial={{ opacity: 0, x: -28 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="pt-1"
                    >
                      <span
                        className={`text-xs font-semibold tracking-widest transition-colors duration-300 ${
                          i === active ? 'text-[#2f7fd6]' : 'text-neutral-400'
                        }`}
                      >
                        STEP 0{i + 1}
                      </span>
                      <h3
                        className={`mt-1.5 text-xl font-semibold leading-snug tracking-tight transition-colors duration-300 ${
                          i === active ? 'text-neutral-950' : 'text-neutral-700'
                        }`}
                      >
                        {s.title}
                      </h3>
                      <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-neutral-600">
                        {s.text}
                      </p>
                    </motion.div>
                  </motion.li>
                ))}
              </ol>
            </div>

            {/* ---------- sticky visual (desktop) ---------- */}
            <div className="hidden lg:block">
              <Image
                src="/assets/images/globalshipping.webp"
                alt="Global Shipping"
                width={500}
                height={600}
                priority
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
