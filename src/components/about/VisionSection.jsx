'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { Eye, Handshake, Lightbulb, ShieldCheck, TrendingUp } from 'lucide-react';
import { HiArrowLongRight } from 'react-icons/hi2';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
const SITUATION = {
  title: 'Illustrating the present situation of',
  accent: 'the US trade',
  text: 'If you’re equipped to take your enterprise to the next degree with accurate and dependable US trade data, then look no further than USimportdata. With our comprehensive services, customized reviews, and actual-time updates, we are here to aid your enterprise every step of the way. Contact us to know how USimportdata can help you attain your US trade desires. Our know-how permits you to get entry to the most accurate and current US trade data, US trade market developments, and import-export data. Remember, when it comes to trade data, accuracy, and reliability matter – choose USimportdata for all your US trade data needs!',
  cta: { label: 'Contact us', href: '/contact-us' },
};

const VISION = {
  title: 'The vision of USimportdata',
  accent: 'for US trade data',
  text: 'USimportdata is at the forefront of providing US import-export data to businesses around the world. This information empowers agencies to make strategic choices, optimize supply chains, and identify new growth possibilities. At USimportdata, our vision is simple: to be the most precise and best US trade data provider company. We are dedicated to excellence in the whole lot we do, from the accuracy of our information to the satisfaction of our customer support.',
};

/* order matters: 0 + 2 sit on the left, 1 + 3 on the right (large screens) */
const PILLARS = [
  {
    Icon: Handshake,
    title: 'Building Long-Term Relationships',
    text: 'At USimportdata, we are not just a US data provider. We are committed to building long-term relationships with our clients, offering personalized support and guidance to them.',
    tone: 'red',
  },
  {
    Icon: Lightbulb,
    title: 'Driving Innovation and Growth',
    text: 'We believe that access to high-quality trade data is essential for driving innovation and growth. By arming businesses with the information.',
    tone: 'blue',
  },
  {
    Icon: TrendingUp,
    title: 'Empowering Businesses in the US',
    text: 'Our vision at USimportdata is to empower US businesses by providing them with the tools and insights they need to thrive in the global marketplace.',
    tone: 'red',
  },
  {
    Icon: ShieldCheck,
    title: 'Trust in US data presentation',
    text: 'Our vision of transparency is evident in how we present our data. We strive to make our US trade reports easy to understand, so users can quickly find the information they need.',
    tone: 'blue',
  },
];

const TONES = {
  red: {
    grad: 'from-[#B31942] to-[#ff4d6d]',
    ring: 'ring-[#B31942]/50 dark:ring-[#ff4d6d]/60',
    glow: 'shadow-[0_18px_50px_rgba(179,25,66,0.22)] dark:shadow-[0_18px_50px_rgba(255,77,109,0.25)]',
    stroke: 'stroke-[#B31942] dark:stroke-[#ff8da0]',
  },
  blue: {
    grad: 'from-[#0A3161] to-[#4da3ff]',
    ring: 'ring-[#0A3161]/50 dark:ring-[#4da3ff]/60',
    glow: 'shadow-[0_18px_50px_rgba(10,49,97,0.22)] dark:shadow-[0_18px_50px_rgba(77,163,255,0.25)]',
    stroke: 'stroke-[#0A3161] dark:stroke-[#7cc4ff]',
  },
};

/* node angles (deg) around the orbit: NW, NE, SW, SE */
const ANGLES = [-135, -45, 135, 45];
const NODE_R = 38; // % of container

/* ------------------------------------------------------------------ */
/* Orbit diagram                                                       */
/* ------------------------------------------------------------------ */
function VisionOrbit({ active, setActive }) {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px]">
      <div className="pointer-events-none absolute inset-4 rounded-full bg-linear-to-br from-[#B31942]/15 via-transparent to-[#0A3161]/25 blur-3xl dark:from-[#ff4d6d]/20 dark:to-[#4da3ff]/30" />

      <style>{`@keyframes vision-spin { to { transform: rotate(360deg); } }`}</style>

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle
          cx="50"
          cy="50"
          r="22"
          fill="none"
          strokeWidth="0.3"
          className="stroke-slate-300 dark:stroke-white/20"
        />
        <circle
          cx="50"
          cy="50"
          r={NODE_R}
          fill="none"
          strokeWidth="0.3"
          strokeDasharray="1 2.5"
          className="stroke-slate-400 dark:stroke-white/25"
          style={
            reduce
              ? undefined
              : { transformOrigin: '50% 50%', animation: 'vision-spin 60s linear infinite' }
          }
        />
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          strokeWidth="0.3"
          className="stroke-slate-200 dark:stroke-white/10"
        />
        {ANGLES.map((a, i) => {
          const rad = (a * Math.PI) / 180;
          const x = 50 + NODE_R * Math.cos(rad);
          const y = 50 + NODE_R * Math.sin(rad);
          const on = active === i;
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              strokeWidth={on ? 0.9 : 0.35}
              strokeLinecap="round"
              className={`transition-all duration-300 ${on ? TONES[PILLARS[i].tone].stroke : 'stroke-slate-300 dark:stroke-white/20'}`}
            />
          );
        })}
      </svg>

      {/* centre */}
      <div className="absolute left-1/2 top-1/2 flex h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-linear-to-br from-[#B31942] to-[#0A3161] text-white shadow-2xl">
        {!reduce && (
          <motion.span
            className="absolute inset-0 rounded-full border border-[#B31942]/50 dark:border-white/40"
            animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <Eye className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
        <span className="mt-1 text-[11px] font-semibold uppercase tracking-wider sm:text-xs">
          Our vision
        </span>
      </div>

      {/* nodes */}
      {PILLARS.map(({ Icon, tone }, i) => {
        const rad = (ANGLES[i] * Math.PI) / 180;
        const left = 50 + NODE_R * Math.cos(rad);
        const top = 50 + NODE_R * Math.sin(rad);
        const on = active === i;
        return (
          <button
            key={i}
            type="button"
            aria-label={PILLARS[i].title}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            style={{ left: `${left}%`, top: `${top}%` }}
            className={`absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-linear-to-br text-white transition-all duration-300 sm:h-16 sm:w-16 ${TONES[tone].grad} ${
              on
                ? `scale-110 ring-4 ${TONES[tone].ring} ${TONES[tone].glow}`
                : 'opacity-80 shadow-md'
            }`}
          >
            <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pillar card                                                         */
/* ------------------------------------------------------------------ */
function PillarCard({ index, active, setActive }) {
  const { Icon, title, text, tone } = PILLARS[index];
  const on = active === index;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onMouseEnter={() => setActive(index)}
      className={`relative overflow-hidden rounded-3xl border p-6 transition-all duration-300 ${
        on
          ? `border-transparent bg-white ring-2 ${TONES[tone].ring} ${TONES[tone].glow} dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.16] dark:to-white/[0.05] dark:backdrop-blur-xl`
          : 'border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.10] dark:to-white/[0.02] dark:shadow-none dark:backdrop-blur-xl'
      }`}
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br text-white shadow-md ${TONES[tone].grad}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-white/70">{text}</p>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function VisionSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setActive((i) => (i + 1) % PILLARS.length), 3500);
    return () => clearInterval(t);
  }, [reduce, paused]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl space-y-20">
          {/* ---------- present situation ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="relative overflow-hidden rounded-[2rem] bg-[#07071f] bg-linear-to-br from-[#0a0a2e] via-[#17104d] to-[#0a1a4a] px-6 py-12 text-white sm:px-12 sm:py-14"
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_80%_80%_at_20%_40%,black,transparent)]" />
              <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#ff4d6d]/20 blur-[110px]" />
              <div className="absolute -bottom-24 right-10 h-80 w-80 rounded-full bg-[#4da3ff]/25 blur-[110px]" />
            </div>

            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
              <h2 className="text-3xl font-semibold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.6rem]">
                {SITUATION.title}{' '}
                <span className="bg-linear-to-r from-[#ff8da0] via-white to-[#7cc4ff] bg-clip-text text-transparent">
                  {SITUATION.accent}
                </span>
              </h2>
              <div>
                <p className="border-l-2 border-white/25 pl-5 text-[15px] leading-[1.85] text-white/75 sm:text-base">
                  {SITUATION.text}
                </p>
                <Link
                  href={SITUATION.cta.href}
                  className="group mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0A1A4A] shadow-[0_10px_40px_rgba(124,196,255,0.3)] transition hover:scale-[1.03]"
                >
                  {SITUATION.cta.label}
                  <motion.span
                    animate={reduce ? undefined : { x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-lg"
                  >
                    <HiArrowLongRight />
                  </motion.span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* ---------- vision ---------- */}
          <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-4xl text-center"
            >
              <h2 className="text-3xl font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
                {VISION.title}{' '}
                <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                  {VISION.accent}
                </span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70">
                {VISION.text}
              </p>
            </motion.div>

            <div className="mt-14 grid items-center gap-6 lg:grid-cols-[1fr_380px_1fr] lg:gap-8">
              {/* mobile/tablet: orbit first */}
              <div className="order-first lg:order-none lg:col-start-2 lg:row-start-1">
                <VisionOrbit active={active} setActive={setActive} />
              </div>

              <div className="grid gap-5 lg:col-start-1 lg:row-start-1">
                <PillarCard index={0} active={active} setActive={setActive} />
                <PillarCard index={2} active={active} setActive={setActive} />
              </div>
              <div className="grid gap-5 lg:col-start-3 lg:row-start-1">
                <PillarCard index={1} active={active} setActive={setActive} />
                <PillarCard index={3} active={active} setActive={setActive} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
