'use client';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { US } from 'country-flag-icons/react/3x2';

export default function CompanySimilar({ title, companies, allHref }) {
  if (!companies.length) return null;

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-10">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {title}
            </h2>
            <Link
              href={allHref}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#B31942] transition hover:gap-2.5 dark:text-[#ff8da0]"
            >
              View all <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {companies.map((c, i) => (
              <motion.li
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link
                  href={c.href}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#B31942]/40 hover:shadow-lg dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
                >
                  <US
                    title="United States"
                    className="h-4 w-6 rounded-[2px] ring-1 ring-black/10"
                  />
                  <h3 className="mt-3 text-base font-semibold leading-snug text-slate-900 group-hover:text-[#B31942] dark:text-white dark:group-hover:text-[#ff8da0]">
                    {c.name}
                  </h3>
                  <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-slate-600 dark:text-white/65">
                    {c.description}
                  </p>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </MotionConfig>
  );
}
