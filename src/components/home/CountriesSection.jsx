'use client';

import { MotionConfig, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Globe2 } from 'lucide-react';
// SVG flags (they render on every OS, unlike flag emojis on Windows)
import { AE, BR, CN, DE, GB, IN, JP, KR, MX, NL, SG, VN } from 'country-flag-icons/react/3x2';
import AnimatedText from '../utils/AnimatedText';

/* ------------------------------------------------------------------ */
/* Content (edit freely). `href` values are placeholder routes.        */
/* ------------------------------------------------------------------ */
const COUNTRIES = [
  { name: 'China', slug: 'china', Flag: CN },
  { name: 'India', slug: 'india', Flag: IN },
  { name: 'Vietnam', slug: 'vietnam', Flag: VN },
  { name: 'Mexico', slug: 'mexico', Flag: MX },
  { name: 'Germany', slug: 'germany', Flag: DE },
  { name: 'Japan', slug: 'japan', Flag: JP },
  { name: 'South Korea', slug: 'south-korea', Flag: KR },
  { name: 'United Kingdom', slug: 'united-kingdom', Flag: GB },
  { name: 'Netherlands', slug: 'netherlands', Flag: NL },
  { name: 'Brazil', slug: 'brazil', Flag: BR },
  { name: 'United Arab Emirates', slug: 'united-arab-emirates', Flag: AE },
  { name: 'Singapore', slug: 'singapore', Flag: SG },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

function CountryCard({ c }) {
  const { Flag } = c;
  return (
    <motion.li variants={item}>
      <motion.a
        href={`/country/${c.slug}`}
        whileHover={{ y: -8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group relative flex h-full flex-col items-center overflow-hidden rounded-3xl border border-neutral-200 bg-white px-4 pb-6 pt-7 text-center transition-[border-color,box-shadow] duration-300 hover:border-[#B31942]/60 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#B31942]/50"
      >
        {/* soft glow behind the flag */}

        {/* flag */}
        <div className="relative">
          <div className="absolute -inset-1.5 rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-neutral-100 shadow-[0_8px_24px_rgba(20,20,60,0.18)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-[-4deg]">
            <Flag title={c.name} preserveAspectRatio="xMidYMid slice" className="h-full w-full" />
          </div>
        </div>

        <h3 className="relative mt-5 text-[15px] font-semibold leading-snug tracking-tight text-neutral-950">
          {c.name}
        </h3>
        <p className="relative mt-1 text-xs text-neutral-500">Import &amp; Export data</p>

        <span className="relative mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#B31942] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:translate-y-1">
          Explore
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </motion.a>
    </motion.li>
  );
}

export default function CountriesSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-white px-6 py-20 lg:px-10 lg:py-28">
        {/* <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#cfdbea_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_75%_55%_at_50%_45%,black,transparent)]" />
        <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#5DBAF6]/20 blur-3xl" /> */}

        <div className="relative mx-auto max-w-7xl">
          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600">
              <Globe2 className="h-3 w-3 text-[#B31942]" aria-hidden="true" />
              Global Coverage
            </span>
            {/* <h2 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl">
              Browse more{" "}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent">
                countries
              </span>
            </h2> */}
            <AnimatedText
              text="Browse more"
              highlight="countries"
              className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl"
              delay={0.2}
              stagger={0.08}
              duration={0.7}
            />
            <p className="mt-4 text-base leading-relaxed text-neutral-600">
              Explore US trade data by partner country and see who is buying from and selling to the
              United States.
            </p>
          </motion.div>

          {/* flags grid */}
          <motion.ul
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-6"
          >
            {COUNTRIES.map((c) => (
              <CountryCard key={c.slug} c={c} />
            ))}
          </motion.ul>

          {/* view all */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 flex justify-center"
          >
            <a
              href="/countries"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#1a1a3a] px-7 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_rgba(26,26,58,0.25)] transition hover:bg-[#2a2a55] focus:outline-none focus:ring-4 focus:ring-[#5DBAF6]/40"
            >
              View all countries
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
