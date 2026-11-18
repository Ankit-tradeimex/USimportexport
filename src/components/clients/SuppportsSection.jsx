'use client';
import { useEffect, useRef, useState } from 'react';
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Check, Link2, TrendingUp, Truck } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
const CONTENT = {
  title: 'How USImportdata',
  accent: 'Supports Businesses',
  titleEnd: 'in the US?',
};

const ITEMS = [
  {
    tag: 'Businesses',
    Icon: Briefcase,
    title: 'For Small and Growing Businesses',
    text: 'Accurate US trade data gives small businesses the edge to identify new buyers, analyze competitors, and find profitable product categories. USImportdata helps these businesses discover untapped opportunities and make data-backed decisions to expand confidently in the US and beyond.',
    points: ['Identify new buyers', 'Analyze competitors', 'Find profitable product categories'],
    tone: 'red',
    visual: 'growth',
  },
  {
    tag: 'Supply Chains',
    Icon: Link2,
    title: 'For Large Corporations and Global Brands',
    text: 'Enterprises rely on USImportdata’s database to monitor trade volumes, track partner activity, and assess trade data in real time. Our trade database enables corporations to refine sourcing strategies, benchmark against competitors, and improve overall market visibility.',
    points: ['Monitor trade volumes', 'Track partner activity', 'Benchmark against competitors'],
    tone: 'blue',
    visual: 'network',
  },
  {
    tag: 'Consumer Trends',
    Icon: TrendingUp,
    title: 'For Retailers and Distributors',
    text: 'Retailers use our US import–export data to stay on top of consumer demand trends, monitor product flow, and anticipate changes in market behavior. USImportdata equips retail companies with a clear understanding of what’s moving, where, and at what trade volume or quantity, ensuring they stay one step ahead.',
    points: [
      'Follow consumer demand trends',
      'Monitor product flow',
      'See trade volume and quantity',
    ],
    tone: 'red',
    visual: 'flow',
  },
  {
    tag: 'Market Research Firms',
    Icon: Truck,
    title: 'For Market Researchers and Analysts',
    text: 'Research firms, financial analysts, and consultancies depend on our verified trade data to uncover patterns, validate insights, and forecast trade performance across sectors. We provide the reliable foundation behind data-driven research and market intelligence reports.',
    points: ['Uncover patterns', 'Validate insights', 'Forecast trade performance'],
    tone: 'blue',
    visual: 'forecast',
  },
];

const TONE = {
  red: {
    panel: 'from-[#B31942] via-[#8a1536] to-[#5c2150]',
    chip: 'bg-[#B31942]/10 text-[#B31942] dark:bg-[#ff4d6d]/15 dark:text-[#ff8da0]',
    check: 'text-[#B31942] dark:text-[#ff8da0]',
  },
  blue: {
    panel: 'from-[#0A3161] via-[#17104d] to-[#1c5fb0]',
    chip: 'bg-[#0A3161]/10 text-[#0A3161] dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff]',
    check: 'text-[#0A3161] dark:text-[#7cc4ff]',
  },
};

/* ------------------------------------------------------------------ */
/* Decorative visuals (drawn in code, no real data)                    */
/* ------------------------------------------------------------------ */
function Growth() {
  const bars = [30, 45, 40, 62, 78, 95];
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden="true">
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={22 + i * 34}
          width="20"
          rx="4"
          fill="white"
          fillOpacity={0.35 + i * 0.1}
          initial={{ y: 140, height: 0 }}
          whileInView={{ y: 140 - h, height: h }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
        />
      ))}
      <motion.path
        d="M20 120 L58 100 L92 106 L126 78 L160 58 L194 30 L226 14"
        fill="none"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, delay: 0.6 }}
      />
      <motion.circle
        cx="226"
        cy="14"
        r="5"
        fill="white"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.9 }}
      />
    </svg>
  );
}

function Network() {
  const nodes = [0, 1, 2, 3, 4, 5].map((i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return { x: 120 + 62 * Math.cos(a), y: 80 + 52 * Math.sin(a) };
  });
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden="true">
      {nodes.map((n, i) => (
        <motion.line
          key={`l${i}`}
          x1="120"
          y1="80"
          x2={n.x}
          y2={n.y}
          stroke="white"
          strokeOpacity="0.5"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={`n${i}`}
          cx={n.x}
          cy={n.y}
          r="8"
          fill="white"
          fillOpacity="0.85"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', delay: 0.5 + i * 0.1 }}
          style={{ transformOrigin: `${n.x}px ${n.y}px` }}
        />
      ))}
      <circle cx="120" cy="80" r="18" fill="white" />
      <motion.circle
        cx="120"
        cy="80"
        r="18"
        fill="none"
        stroke="white"
        strokeWidth="2"
        animate={{ r: [18, 34], opacity: [0.7, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
      />
    </svg>
  );
}

function Flow() {
  const lanes = [40, 80, 120];
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden="true">
      {lanes.map((y, i) => (
        <g key={y}>
          <line
            x1="16"
            x2="224"
            y1={y}
            y2={y}
            stroke="white"
            strokeOpacity="0.3"
            strokeWidth="2"
            strokeDasharray="3 6"
          />
          <rect x="16" y={y - 12} width="22" height="24" rx="5" fill="white" fillOpacity="0.45" />
          <rect x="202" y={y - 12} width="22" height="24" rx="5" fill="white" fillOpacity="0.85" />
          {[0, 1, 2].map((k) => (
            <motion.rect
              key={k}
              y={y - 6}
              width="12"
              height="12"
              rx="3"
              fill="white"
              initial={{ x: 40 }}
              animate={{ x: [40, 190] }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: 'linear',
                delay: k * (1 + i * 0.15),
              }}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

function Forecast() {
  return (
    <svg viewBox="0 0 240 160" className="h-full w-full" aria-hidden="true">
      {[40, 80, 120].map((y) => (
        <line
          key={y}
          x1="14"
          x2="226"
          y1={y}
          y2={y}
          stroke="white"
          strokeOpacity="0.18"
          strokeWidth="1"
        />
      ))}
      <line
        x1="150"
        x2="150"
        y1="14"
        y2="146"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="1"
        strokeDasharray="4 4"
      />
      <motion.path
        d="M16 118 C 40 112, 54 80, 78 88 S 118 118, 150 70"
        fill="none"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, delay: 0.2 }}
      />
      <motion.path
        d="M150 70 C 172 52, 196 44, 224 26"
        fill="none"
        stroke="white"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeDasharray="2 8"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.5 }}
      />
      <motion.circle
        cx="150"
        cy="70"
        r="6"
        fill="white"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.4 }}
      />
      <motion.circle
        cx="224"
        cy="26"
        r="6"
        fill="white"
        fillOpacity="0.6"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.4 }}
      />
    </svg>
  );
}

const VISUALS = { growth: Growth, network: Network, flow: Flow, forecast: Forecast };

/* ------------------------------------------------------------------ */
/* Stacking card                                                       */
/* ------------------------------------------------------------------ */
function StackCard({ item, index, total, progress, stack }) {
  const t = TONE[item.tone];
  const Visual = VISUALS[item.visual];
  const target = 1 - (total - 1 - index) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, target]);

  return (
    <div className="lg:sticky lg:h-[520px]" style={stack ? { top: 112 + index * 26 } : undefined}>
      <motion.article
        style={stack ? { scale, transformOrigin: 'top center' } : undefined}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.5 }}
        className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7 lg:h-[440px] lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 dark:border-white/10 dark:bg-[#0c0c2b] dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-black/40"
      >
        {/* text */}
        <div className="flex flex-col justify-center">
          <span
            className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${t.chip}`}
          >
            <item.Icon className="h-3.5 w-3.5" aria-hidden="true" />
            {item.tag}
          </span>
          <h3 className="mt-4 text-2xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {item.title}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-white/70">
            {item.text}
          </p>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {item.points.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-white/85"
              >
                <Check className={`h-4 w-4 shrink-0 ${t.check}`} aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
        </div>

        {/* visual */}
        <div
          className={`relative min-h-[200px] overflow-hidden rounded-2xl bg-linear-to-br ${t.panel} p-4 sm:min-h-[240px]`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
          <span
            className="absolute right-4 top-3 select-none text-5xl font-bold leading-none text-white/15"
            aria-hidden="true"
          >
            0{index + 1}
          </span>
          <div className="relative flex h-full items-center justify-center">
            <Visual />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function SupportsSection() {
  const reduce = useReducedMotion();
  const wrap = useRef(null);
  const [isLg, setIsLg] = useState(false);
  const { scrollYProgress } = useScroll({ target: wrap, offset: ['start start', 'end end'] });

  // the stacking effect only runs on large screens
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsLg(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const stack = isLg && !reduce;

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-4xl text-center text-4xl font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl dark:text-white"
          >
            {CONTENT.title}{' '}
            <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
              {CONTENT.accent}
            </span>{' '}
            {CONTENT.titleEnd}
          </motion.h2>

          <div ref={wrap} className="mt-12 space-y-6 lg:space-y-0">
            {ITEMS.map((item, i) => (
              <StackCard
                key={item.title}
                item={item}
                index={i}
                total={ITEMS.length}
                progress={scrollYProgress}
                stack={stack}
              />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
