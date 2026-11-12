'use client';

import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { Anchor, Plane, Truck } from 'lucide-react';

const TYPES = {
  sea: { Icon: Anchor, label: 'Sea port' },
  air: { Icon: Plane, label: 'Airport' },
  land: { Icon: Truck, label: 'Land crossing' },
};

// import = red glow, export = blue glow (same as the rest of the site)
const ACCENT = {
  import: {
    node: '#ff4d6d',
    line: '#ff8da0',
    glow: 'bg-[#ff4d6d]/20',
    tile: 'from-[#B31942] to-[#ff4d6d]',
    hover: 'hover:border-[#ff4d6d]/60 hover:shadow-[0_0_40px_rgba(255,77,109,0.35)]',
    text: 'text-[#ff8da0]',
    bar: 'from-[#ff4d6d] to-[#4da3ff]',
  },
  export: {
    node: '#4da3ff',
    line: '#7cc4ff',
    glow: 'bg-[#4da3ff]/20',
    tile: 'from-[#0A3161] to-[#4da3ff]',
    hover: 'hover:border-[#4da3ff]/60 hover:shadow-[0_0_40px_rgba(77,163,255,0.4)]',
    text: 'text-[#9ad0ff]',
    bar: 'from-[#4da3ff] to-[#ff4d6d]',
  },
};

// network background (viewBox 1200 x 600)
const NODES = [
  [90, 110],
  [230, 300],
  [150, 480],
  [380, 90],
  [470, 410],
  [620, 200],
  [760, 520],
  [860, 120],
  [980, 330],
  [1100, 140],
  [1120, 470],
  [320, 540],
  [700, 330],
  [560, 40],
];
const LINKS = [
  [0, 1],
  [1, 2],
  [0, 3],
  [1, 4],
  [3, 5],
  [4, 5],
  [5, 7],
  [5, 12],
  [12, 6],
  [12, 8],
  [7, 9],
  [8, 9],
  [8, 10],
  [2, 11],
  [11, 4],
  [3, 13],
  [13, 7],
  [4, 12],
];

function Network({ color, line }) {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 1200 600"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
      aria-hidden="true"
    >
      {LINKS.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={NODES[a][0]}
          y1={NODES[a][1]}
          x2={NODES[b][0]}
          y2={NODES[b][1]}
          stroke={line}
          strokeOpacity="0.28"
          strokeWidth="1.2"
          strokeDasharray="4 8"
          animate={reduce ? undefined : { strokeDashoffset: [0, -24] }}
          transition={{ duration: 2.5 + (i % 4) * 0.5, repeat: Infinity, ease: 'linear' }}
        />
      ))}
      {NODES.map(([x, y], i) => (
        <g key={i}>
          <motion.circle
            cx={x}
            cy={y}
            r="14"
            fill={color}
            fillOpacity="0.18"
            animate={reduce ? undefined : { r: [10, 22, 10], fillOpacity: [0.25, 0.05, 0.25] }}
            transition={{
              duration: 3 + (i % 3),
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.3,
            }}
          />
          <circle cx={x} cy={y} r="4" fill={color} />
        </g>
      ))}
    </svg>
  );
}

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};
const card = {
  hidden: { opacity: 0, y: 20, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function TopPortsSection({ data }) {
  const p = data.topPorts;
  const reduce = useReducedMotion();
  if (!p) return null;
  const a = ACCENT[data.type];

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-[#07071f] bg-linear-to-br from-[#0a0a2e] via-[#160d47] to-[#0a0a2e] text-white dark:from-[#04040f] dark:via-[#0d0830] dark:to-[#04040f]">
        <Network color={a.node} line={a.line} />
        <div
          className={`pointer-events-none absolute left-1/2 top-1/2 h-72 w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] ${a.glow}`}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-24">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              {p.title}
            </h2>
            <div className={`mx-auto mt-4 h-1 w-20 rounded-full bg-linear-to-r ${a.bar}`} />
            <p className="mt-5 text-sm leading-relaxed text-white/75">{p.subtitle}</p>
          </motion.div>

          {/* port cards */}
          <motion.ul
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5"
          >
            {p.items.map((it, i) => {
              return (
                <motion.li key={it.name} variants={card} className="h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ${a.hover}`}
                  >
                    {/* light sweep on hover */}
                    {!reduce && (
                      <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent opacity-0 transition-all duration-700 group-hover:left-full group-hover:opacity-100" />
                    )}

                    <div className="flex items-start justify-between">
                      <span
                        className={`grid h-11 w-11 place-items-center overflow-hidden rounded-xl bg-linear-to-br shadow-lg transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110 ${a.tile}`}
                      >
                        {it.logo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={it.logo}
                            alt=""
                            loading="lazy"
                            className="h-full w-full bg-white object-contain p-1"
                          />
                        ) : (
                          <T.Icon
                            className="h-5 w-5 text-white"
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        )}
                      </span>
                    </div>

                    <h3 className="mt-4 text-[15px] font-semibold leading-snug">{it.name}</h3>
                    <p
                      className={`mt-auto pt-3 text-[11px] font-medium uppercase tracking-wider ${a.text}`}
                    >
                      {it.amount ? it.amount + ' Billion Tons' : ``}
                    </p>
                  </motion.div>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </section>
    </MotionConfig>
  );
}
