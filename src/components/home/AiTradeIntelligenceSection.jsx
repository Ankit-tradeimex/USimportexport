'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionConfig, animate, motion, useInView, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Building2,
  FileSearch,
  FileText,
  Globe2,
  Lightbulb,
  Search,
  Ship,
  Users,
} from 'lucide-react';
import AnimatedText from '../utils/AnimatedText';

/* ------------------------------------------------------------------ */
/* Content (edit freely)                                               */
/* x / y = where the card sits around the globe on desktop, in %       */
/* ------------------------------------------------------------------ */
const NODES = [
  {
    id: 'search',
    title: 'Smart Trade Search',
    text: 'Search using natural language',
    Icon: Search,
    tone: 'blue',
    x: 50,
    y: 12,
  },
  {
    id: 'buyer',
    title: 'Buyer Discovery',
    text: 'Find potential US buyers',
    Icon: Users,
    tone: 'red',
    x: 13,
    y: 26,
  },
  {
    id: 'shipment',
    title: 'Shipment Analysis',
    text: 'Understand trade shipments',
    Icon: BarChart3,
    tone: 'blue',
    x: 87,
    y: 26,
  },
  {
    id: 'supplier',
    title: 'Supplier Discovery',
    text: 'Explore trusted suppliers',
    Icon: Ship,
    tone: 'blue',
    x: 9,
    y: 52,
  },
  {
    id: 'company',
    title: 'Company Intelligence',
    text: 'Analyze company trade activity',
    Icon: Building2,
    tone: 'blue',
    x: 91,
    y: 52,
  },
  {
    id: 'hs',
    title: 'HS Code Intelligence',
    text: 'Get insights on HS codes',
    Icon: FileSearch,
    tone: 'blue',
    x: 17,
    y: 78,
  },
  {
    id: 'market',
    title: 'Market Insights',
    text: 'Discover trends & opportunities',
    Icon: Lightbulb,
    tone: 'red',
    x: 83,
    y: 78,
  },
  {
    id: 'report',
    title: 'AI Report Generation',
    text: 'Create detailed trade reports',
    Icon: FileText,
    tone: 'blue',
    x: 50,
    y: 90,
  },
];

// PLACEHOLDER numbers (taken from the design mockup): replace with your real figures.
const STATS = [
  { label: 'Shipments', to: 1.2, decimals: 1, suffix: 'K+', Icon: Ship },
  { label: 'Companies', to: 850, decimals: 0, suffix: '+', Icon: Building2 },
  { label: 'HS Codes', to: 320, decimals: 0, suffix: '+', Icon: Globe2 },
];
const BARS = [28, 44, 36, 60, 50, 76, 68, 94]; // placeholder chart values (%)

// full class strings so Tailwind can see them
const TONE = {
  blue: {
    tile: 'from-[#0A3161] to-[#4da3ff]',
    base: 'stroke-[#0A3161]/40 dark:stroke-[#4da3ff]/50',
    flow: 'stroke-[#0A3161] dark:stroke-[#4da3ff]',
  },
  red: {
    tile: 'from-[#B31942] to-[#ff4d6d]',
    base: 'stroke-[#B31942]/45 dark:stroke-[#ff4d6d]/50',
    flow: 'stroke-[#B31942] dark:stroke-[#ff4d6d]',
  },
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 26, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/* ------------------------------------------------------------------ */
/* Count-up number                                                     */
/* ------------------------------------------------------------------ */
function CountUp({ to, decimals = 0, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Center: animated "AI Trade Intelligence" globe (pure SVG + CSS)     */
/* ------------------------------------------------------------------ */
const R = 96;
// each meridian's width keeps changing, so the wireframe looks like it is rotating
const MERIDIANS = [0, 1, 2, 3].map((i) => {
  const phi = (i * Math.PI) / 4;
  return Array.from({ length: 9 }, (_, k) => R * Math.abs(Math.cos(phi + (k * Math.PI) / 8)));
});
const PARALLELS = [-60, -30, 0, 30, 60].map((deg) => {
  const a = (deg * Math.PI) / 180;
  const rx = R * Math.cos(a);
  return { y: 100 + R * Math.sin(a), rx, ry: rx * 0.16 };
});

// a dot travelling around an ellipse
function orbit(rx, ry, steps = 36) {
  const pts = Array.from({ length: steps + 1 }, (_, i) => {
    const t = (i / steps) * Math.PI * 2;
    return { x: 200 + rx * Math.cos(t), y: 200 + ry * Math.sin(t) };
  });
  return { cx: pts.map((p) => p.x), cy: pts.map((p) => p.y) };
}
const ORBIT_A = orbit(188, 66);
const ORBIT_B = orbit(180, 56);

function GlobeCore() {
  const reduce = useReducedMotion();
  const loop = (duration) => (reduce ? {} : { duration, repeat: Infinity, ease: 'linear' });

  return (
    <div className="relative h-[250px] w-[250px] sm:h-[280px] sm:w-[280px] lg:h-[300px] lg:w-[300px]">
      {/* glow */}
      <div className="absolute -inset-10 rounded-full bg-[#4da3ff]/25 blur-3xl dark:bg-[#4da3ff]/35" />
      <div className="absolute -inset-4 rounded-full bg-[#ff4d6d]/10 blur-2xl dark:bg-[#ff4d6d]/15" />

      {/* sphere */}
      <div className="relative h-full w-full overflow-hidden rounded-full bg-[radial-gradient(circle_at_30%_25%,#8fc4ff_0%,#3f7fe8_38%,#123a9c_75%,#0a1f6b_100%)] shadow-[0_20px_60px_rgba(18,58,156,0.45),inset_-20px_-24px_50px_rgba(5,15,70,0.55)] dark:bg-[radial-gradient(circle_at_30%_25%,#4f8dff_0%,#2552c9_35%,#0e1f66_72%,#070d2e_100%)] dark:shadow-[0_0_80px_rgba(77,163,255,0.45),inset_-20px_-24px_50px_rgba(2,6,30,0.7)]">
        {/* wireframe */}
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
          {PARALLELS.map((p) => (
            <path
              key={p.y}
              d={`M ${100 - p.rx} ${p.y} A ${p.rx} ${p.ry} 0 0 0 ${100 + p.rx} ${p.y}`}
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="0.6"
            />
          ))}
          {MERIDIANS.map((kf, i) => (
            <motion.ellipse
              key={i}
              cx="100"
              cy="100"
              ry={R}
              rx={kf[0]}
              animate={reduce ? undefined : { rx: kf }}
              transition={loop(22)}
              fill="none"
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="0.6"
            />
          ))}
        </svg>

        {/* moving light sweep */}
        <motion.div
          className="absolute -inset-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.18)_40deg,transparent_90deg)]"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={loop(9)}
        />
        {/* top-left shine */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(255,255,255,0.5),transparent_42%)]" />

        {/* label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.span
            animate={reduce ? undefined : { opacity: [0.92, 1, 0.92] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="bg-gradient-to-b from-white to-[#cfe4ff] bg-clip-text text-6xl font-black leading-none tracking-tight text-transparent drop-shadow-[0_4px_18px_rgba(255,255,255,0.35)] lg:text-7xl"
          >
            AI
          </motion.span>
          <span className="mt-2 text-[11px] font-bold uppercase leading-tight tracking-[0.2em] text-white lg:text-xs">
            Trade
            <br />
            Intelligence
          </span>
        </div>
      </div>

      {/* orbit rings + travelling dots */}
      <svg
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -inset-[18%] h-[136%] w-[136%]"
        aria-hidden="true"
      >
        <g transform="rotate(-22 200 200)">
          <ellipse
            cx="200"
            cy="200"
            rx="188"
            ry="66"
            fill="none"
            className="stroke-[#B31942]/60 dark:stroke-[#ff4d6d]/70"
            strokeWidth="1.4"
          />
          <motion.circle
            r="5"
            className="fill-[#B31942] dark:fill-[#ff4d6d]"
            style={{ filter: 'drop-shadow(0 0 6px rgba(255,77,109,0.9))' }}
            animate={reduce ? undefined : { cx: ORBIT_A.cx, cy: ORBIT_A.cy }}
            transition={loop(11)}
            cx={ORBIT_A.cx[0]}
            cy={ORBIT_A.cy[0]}
          />
        </g>
        <g transform="rotate(24 200 200)">
          <ellipse
            cx="200"
            cy="200"
            rx="180"
            ry="56"
            fill="none"
            className="stroke-[#0A3161]/50 dark:stroke-[#4da3ff]/70"
            strokeWidth="1.4"
          />
          <motion.circle
            r="5"
            className="fill-[#0A3161] dark:fill-[#7cc4ff]"
            style={{ filter: 'drop-shadow(0 0 6px rgba(77,163,255,0.9))' }}
            animate={
              reduce
                ? undefined
                : { cx: ORBIT_B.cx.slice().reverse(), cy: ORBIT_B.cy.slice().reverse() }
            }
            transition={loop(14)}
            cx={ORBIT_B.cx[0]}
            cy={ORBIT_B.cy[0]}
          />
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Feature card                                                        */
/* ------------------------------------------------------------------ */
function NodeCard({ node, index, onHover }) {
  const { Icon } = node;
  const reduce = useReducedMotion();
  const tone = TONE[node.tone];

  return (
    <motion.div variants={item} className="h-full">
      {/* gentle idle float */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{
          duration: 4 + (index % 3),
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.25,
        }}
        className="h-full"
      >
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          onHoverStart={() => onHover?.(node.id)}
          onHoverEnd={() => onHover?.(null)}
          className="group relative flex h-full cursor-default flex-col items-center rounded-2xl border border-neutral-200/80 bg-white/85 px-4 pb-4 pt-6 text-center shadow-[0_10px_40px_rgba(15,40,100,0.10)] backdrop-blur-xl transition-colors hover:border-[#B31942]/40 dark:border-white/10 dark:bg-white/[0.06] dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] dark:hover:border-white/30"
        >
          <span
            className={`absolute -top-6 grid h-12 w-12 place-items-center rounded-2xl bg-linear-to-br ${tone.tile} text-white shadow-[0_8px_24px_rgba(10,49,97,0.35)] dark:shadow-[0_0_24px_rgba(77,163,255,0.5)]`}
          >
            <Icon className="h-6 w-6" strokeWidth={1.8} aria-hidden="true" />
          </span>
          <h3 className="mt-3 text-[15px] font-semibold leading-snug tracking-tight text-neutral-950 dark:text-white">
            {node.title}
          </h3>
          <p className="mt-1 text-[13px] leading-snug text-neutral-600 dark:text-slate-400">
            {node.text}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Analytics overview panel                                            */
/* ------------------------------------------------------------------ */
function Overview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="rounded-3xl border border-neutral-200/80 bg-white/85 p-5 shadow-[0_16px_60px_rgba(15,40,100,0.10)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.06] dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)] sm:p-7"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-xl">
          US Trade Analytics Overview
        </h3>
        <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live Data
        </span>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-[repeat(3,1fr)_1.7fr] md:gap-0">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center text-center md:border-r md:border-neutral-200 md:px-4 dark:md:border-white/10"
          >
            <s.Icon
              className="h-7 w-7 text-[#0A3161] dark:text-[#4da3ff]"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            <p className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 dark:text-white">
              <CountUp to={s.to} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-sm text-neutral-500 dark:text-slate-400">{s.label}</p>
          </div>
        ))}

        {/* bar chart */}
        <div className="flex h-32 items-end gap-2 md:pl-6" aria-hidden="true">
          {BARS.map((h, i) => (
            <motion.div
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: `${h}%`, transformOrigin: 'bottom' }}
              className="flex-1 rounded-t-md bg-linear-to-t from-[#0A3161] to-[#4da3ff] dark:from-[#6d4bff] dark:to-[#4da3ff] dark:shadow-[0_0_14px_rgba(109,75,255,0.45)]"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function AiTradeIntelligenceSection() {
  const reduce = useReducedMotion();
  const [hoverId, setHoverId] = useState(null);

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-linear-to-b from-white to-[#eef4ff] px-6 py-20 dark:from-slate-950 dark:to-[#050816] lg:px-10 lg:py-28">
        {/* light mode: soft color blobs */}
        <div className="pointer-events-none absolute inset-0 dark:hidden">
          <div className="absolute left-[8%] top-[22%] h-80 w-80 rounded-full bg-[#4da3ff]/15 blur-[100px]" />
          <div className="absolute right-[8%] top-[40%] h-72 w-72 rounded-full bg-[#B31942]/10 blur-[100px]" />
        </div>
        {/* dark mode: grid + glows */}
        <div className="pointer-events-none absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
          <div className="absolute left-1/2 top-[38%] h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-[#4da3ff]/20 blur-[120px]" />
          <div className="absolute left-[6%] top-[55%] h-72 w-72 rounded-full bg-[#ff4d6d]/15 blur-[110px]" />
          <div className="absolute bottom-[10%] right-[8%] h-72 w-72 rounded-full bg-[#6d4bff]/20 blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto flex max-w-3xl flex-col items-center text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-sky-200 dark:backdrop-blur">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B31942] opacity-75 dark:bg-sky-400" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#B31942] dark:bg-sky-400" />
              </span>
              AI-Powered Trade Intelligence
            </span>
            <AnimatedText
              text="One AI Platform for"
              highlight="Complete US Trade Intelligence"
              className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 dark:text-white sm:text-5xl"
              delay={0.2}
              stagger={0.08}
              duration={0.7}
            />
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600 dark:text-slate-400">
              Search, analyze and understand US trade in one place, from shipment data to buyers,
              suppliers and market trends.
            </p>
          </motion.div>

          {/* ---------- desktop: cards orbiting the globe ---------- */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="relative mx-auto mt-24 hidden h-[660px] w-full max-w-[1100px] lg:block"
          >
            {/* connectors */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 z-0 h-full w-full"
              aria-hidden="true"
            >
              {NODES.map((n) => {
                const tone = TONE[n.tone];
                const active = hoverId === n.id;
                return (
                  <g key={n.id}>
                    <line
                      x1="50"
                      y1="50"
                      x2={n.x}
                      y2={n.y}
                      vectorEffect="non-scaling-stroke"
                      strokeWidth={active ? 2.4 : 1.2}
                      className={`${tone.base} transition-all duration-300`}
                    />
                    <motion.line
                      x1="50"
                      y1="50"
                      x2={n.x}
                      y2={n.y}
                      vectorEffect="non-scaling-stroke"
                      strokeWidth={active ? 3 : 2}
                      strokeLinecap="round"
                      strokeDasharray="3 12"
                      className={tone.flow}
                      animate={reduce ? undefined : { strokeDashoffset: [0, -30] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                      opacity={active ? 1 : 0.7}
                    />
                  </g>
                );
              })}
            </svg>

            {/* globe */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.7 },
                show: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            >
              <GlobeCore />
            </motion.div>

            {/* cards */}
            {NODES.map((n, i) => (
              <div
                key={n.id}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
                className="absolute z-20 w-[200px] -translate-x-1/2 -translate-y-1/2"
              >
                <NodeCard node={n} index={i} onHover={setHoverId} />
              </div>
            ))}
          </motion.div>

          {/* ---------- mobile / tablet: globe on top, cards in a grid ---------- */}
          <div className="mt-16 lg:hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="flex justify-center py-8"
            >
              <GlobeCore />
            </motion.div>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5"
            >
              {NODES.map((n, i) => (
                <NodeCard key={n.id} node={n} index={i} />
              ))}
            </motion.div>
          </div>

          {/* ---------- analytics panel ---------- */}
          <div className="mt-16 lg:mt-4">
            <Overview />
          </div>

          {/* ---------- bottom pill ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="mt-10 flex justify-center"
          >
            <motion.div
              animate={reduce ? undefined : { backgroundPosition: ['0% 50%', '200% 50%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="rounded-full bg-linear-to-r from-[#B31942] via-[#4da3ff] via-60% to-[#B31942] bg-[length:200%_100%] p-px shadow-[0_10px_40px_rgba(77,163,255,0.25)]"
            >
              <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 rounded-full bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.08em] dark:bg-slate-950 sm:px-8 sm:text-sm">
                <span className="text-[#0A3161] dark:text-[#4da3ff]">One Platform</span>
                <motion.span
                  animate={reduce ? undefined : { x: [0, 6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-[#B31942] dark:text-[#ff4d6d]"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </motion.span>
                <span className="text-neutral-950 dark:text-white">
                  Complete Trade Intelligence
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
