'use client';
import { MotionConfig, motion } from 'framer-motion';
import { CalendarDays, Hash, Package } from 'lucide-react';
import { flagFor } from '@/lib/countryFlags';

const fmt = (n) => Number(n).toLocaleString('en-US');

export default function CompanyGlance({ total, sinceText, topHs, topCountry, role }) {
  const Flag = flagFor(topCountry);
  const items = [
    { icon: Package, label: 'Shipments', value: fmt(total) },
    { icon: CalendarDays, label: 'Active since', value: sinceText },
    { icon: Hash, label: 'Top HS code', value: topHs },
    {
      label: role === 'export' ? 'Top destination' : 'Top origin',
      value: topCountry,
      flag: Flag,
    },
  ];

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-16">
        <motion.dl
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
          className="mx-auto grid w-full max-w-5xl grid-cols-2 divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-4 lg:divide-x dark:divide-white/10 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
        >
          {items.map(({ icon: Icon, flag: F, label, value }) => (
            <motion.div
              key={label}
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              className="flex items-center gap-3.5 border-b border-slate-100 px-5 py-5 last:border-b-0 max-lg:odd:border-r lg:border-b-0 dark:border-white/10"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-linear-to-br from-[#B31942] to-[#0A3161] text-white shadow-md">
                {F ? (
                  <F className="h-5 w-7 rounded-[3px]" title={value} />
                ) : (
                  <Icon className="h-5 w-5" aria-hidden="true" />
                )}
              </span>
              <div className="min-w-0">
                <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-white/45">
                  {label}
                </dt>
                <dd className="mt-0.5 truncate text-lg font-semibold text-slate-900 dark:text-white">
                  {value}
                </dd>
              </div>
            </motion.div>
          ))}
        </motion.dl>
      </section>
    </MotionConfig>
  );
}
