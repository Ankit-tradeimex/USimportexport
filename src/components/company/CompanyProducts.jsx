'use client';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const fmt = (n) => Number(n).toLocaleString('en-US');

// products: [{ hs, name, count, pct, href }]   href = that HS code's own data page
export default function CompanyProducts({ heading, intro, products }) {
  if (!products.length) return null;

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

          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <motion.li
                key={p.hs}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link
                  href={p.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#B31942]/40 hover:shadow-lg dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161] px-3 py-1 text-xs font-semibold tracking-wide text-white">
                      HS {p.hs}
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-slate-300 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#B31942] dark:text-white/30 dark:group-hover:text-[#ff8da0]"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="mt-4 text-base font-semibold leading-snug text-slate-900 dark:text-white">
                    {p.name}
                  </h3>

                  <div className="mt-auto pt-5">
                    <div className="flex items-baseline justify-between text-sm">
                      <span className="text-slate-500 dark:text-white/55">
                        {fmt(p.count)} shipments
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-white">{p.pct}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                      <motion.div
                        className="h-full rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161]"
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.max(p.pct, 3)}%` }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.07, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </MotionConfig>
  );
}
