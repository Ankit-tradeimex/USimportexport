'use client';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { flagFor } from '@/lib/countryFlags';

const fmt = (n) => Number(n).toLocaleString('en-US');

/*
  partners: [{ name, count, pct }]  (biggest first, about 5)
  The US sits on the left, each partner country on the right. A line joins them and its thickness shows the
  number of shipments. The moving dashes show the direction: partner -> US for an importer, US -> partner for an exporter.
*/
export default function CompanyLanes({ heading, intro, role, partners }) {
  const reduce = useReducedMotion();
  if (!partners.length) return null;

  const imp = role !== 'export';
  const stroke = imp ? '#ff4d6d' : '#4da3ff';
  const n = partners.length;
  const ys = partners.map((_, i) => (n === 1 ? 50 : 12 + (76 / (n - 1)) * i));
  const max = Math.max(...partners.map((p) => p.count));
  const USFlag = flagFor('UNITED STATES');

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-10">
        <div className="mx-auto w-full max-w-5xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {heading}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600 dark:text-white/70">
            {intro}
          </p>

          <div className="relative mt-8 h-[380px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm sm:h-[430px] dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl">
            {/* soft glow behind the US node */}
            <div className="pointer-events-none absolute left-[14%] top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0A3161]/10 blur-[80px] dark:bg-[#4da3ff]/20" />

            {/* the lines */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {partners.map((p, i) => {
                const d = `M14 50 C 44 50, 44 ${ys[i]}, 72 ${ys[i]}`;
                const w = 2 + (p.count / max) * 6;
                return (
                  <g key={p.name}>
                    <motion.path
                      d={d}
                      fill="none"
                      stroke={stroke}
                      strokeOpacity="0.28"
                      strokeWidth={w}
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
                    />
                    <motion.path
                      d={d}
                      fill="none"
                      stroke={stroke}
                      strokeWidth={Math.max(2, w * 0.45)}
                      strokeLinecap="round"
                      strokeDasharray="4 10"
                      vectorEffect="non-scaling-stroke"
                      animate={reduce ? undefined : { strokeDashoffset: imp ? [0, 14] : [0, -14] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* US node */}
            <div className="absolute left-[14%] top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-white shadow-xl ring-4 ring-[#0A3161]/15 sm:h-20 sm:w-20 dark:bg-[#12123a] dark:ring-[#4da3ff]/25">
                {USFlag && (
                  <USFlag
                    className="h-7 w-10 rounded-[3px] shadow sm:h-8 sm:w-12"
                    title="United States"
                  />
                )}
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-700 dark:text-white/80">
                USA
              </span>
            </div>

            {/* partner nodes */}
            {partners.map((p, i) => {
              const Flag = flagFor(p.name);
              return (
                <motion.div
                  key={p.name}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                  className="absolute flex -translate-y-1/2 items-center gap-2"
                  style={{ left: '73.5%', top: `${ys[i]}%` }}
                >
                  {Flag ? (
                    <Flag
                      className="h-5 w-7 shrink-0 rounded-[3px] shadow ring-1 ring-black/10 sm:h-6 sm:w-9"
                      title={p.name}
                    />
                  ) : (
                    <span className="h-5 w-7 shrink-0 rounded-[3px] bg-slate-200 sm:h-6 sm:w-9 dark:bg-white/15" />
                  )}
                  <span className="min-w-0 leading-tight">
                    <span className="block truncate text-[11px] font-semibold text-slate-900 sm:text-sm dark:text-white">
                      {p.name}
                    </span>
                    <span className="block text-[10px] text-slate-500 sm:text-xs dark:text-white/55">
                      {fmt(p.count)} · {p.pct}%
                    </span>
                  </span>
                </motion.div>
              );
            })}
          </div>

          <p className="mt-3 text-center text-xs text-slate-400 dark:text-white/40">
            Line thickness shows the number of shipments. Dashes move{' '}
            {imp ? 'towards' : 'away from'} the USA.
          </p>
        </div>
      </section>
    </MotionConfig>
  );
}
