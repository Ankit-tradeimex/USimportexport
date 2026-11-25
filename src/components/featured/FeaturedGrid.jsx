'use client';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { featuredPath } from '@/data/featuredData';

/* the publication's logo on a white tile (it stays white in dark mode so dark logos stay readable) */
export function LogoTile({ item, className = '' }) {
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 dark:border-white/15 ${className}`}
    >
      {item.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.logo}
          alt={item.name}
          loading="lazy"
          className="max-h-full w-auto max-w-full object-contain transition duration-500 group-hover:scale-105"
        />
      ) : (
        <span className="text-center font-serif text-2xl font-bold leading-tight text-slate-800 transition duration-500 group-hover:scale-105">
          {item.name}
        </span>
      )}
    </div>
  );
}

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

// items: featured publications. Every card opens that publication's detail page.
export default function FeaturedGrid({ items }) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.ul
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.08 }}
        variants={grid}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item) => (
          <motion.li key={item.slug} variants={rise}>
            <Link
              href={featuredPath(item.slug)}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#B31942]/40 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B31942] dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
            >
              <LogoTile item={item} className="h-36 w-full" />

              <h3 className="mt-5 font-serif text-xl font-bold text-slate-900 dark:text-white">
                {item.name}
              </h3>

              {item.summary && (
                <p className="mt-2 line-clamp-5 text-sm leading-relaxed text-slate-600 dark:text-white/70">
                  {item.summary}
                </p>
              )}

              <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-[#0A3161] dark:text-[#7cc4ff]">
                Read Full Coverage
                <ArrowRight
                  className="h-4 w-4 transition group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </span>

              {/* bar grows on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-linear-to-r from-[#B31942] to-[#0A3161] transition-transform duration-300 group-hover:scale-x-100"
              />
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </MotionConfig>
  );
}
