'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowRight, PackageCheck, SearchX } from 'lucide-react';
import { US } from 'country-flag-icons/react/3x2';
import { dirPath, profileHref } from '@/data/companyDirectoryData';
import { Pagination } from '@/components/common/PathPagination';

const label = (l) => (l === '0-9' ? '#' : l.toUpperCase());
const initials = (name) =>
  name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();

/* card: spotlight follows the mouse (no React state) */
function CompanyCard({ company, index }) {
  const ref = useRef(null);
  const exporter = company.role === 'export';

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06 }}
    >
      <Link
        ref={ref}
        href={profileHref(company.role, company.slug)}
        onMouseMove={onMove}
        className="group relative flex h-full min-h-[190px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#B31942]/40 hover:shadow-xl dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl dark:hover:border-[#ff8da0]/40"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(200px circle at var(--mx, 50%) var(--my, 50%), rgba(179,25,66,0.12), rgba(10,49,97,0.09) 45%, transparent 70%)',
          }}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 -right-1 select-none text-[100px] font-black leading-none text-slate-900/[0.05] transition-colors group-hover:text-[#B31942]/15 dark:text-white/[0.06]"
        >
          {company.name[0]}
        </span>

        <div className="relative flex items-start justify-between gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A3161]/10 text-sm font-bold text-[#0A3161] transition-colors group-hover:bg-linear-to-br group-hover:from-[#B31942] group-hover:to-[#0A3161] group-hover:text-white dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff]">
            {initials(company.name)}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${exporter ? 'bg-[#0A3161]/10 text-[#0A3161] dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff]' : 'bg-[#B31942]/10 text-[#B31942] dark:bg-[#ff4d6d]/15 dark:text-[#ff8da0]'}`}
          >
            {exporter ? 'Exporter' : 'Importer'}
          </span>
        </div>

        <h3 className="relative mt-4 text-lg font-semibold leading-snug text-slate-900 dark:text-white">
          {company.name}
        </h3>

        <div className="relative mt-auto flex items-center justify-between gap-3 pt-4 text-xs font-semibold text-slate-500 dark:text-white/60">
          <span className="flex items-center gap-1.5">
            <PackageCheck
              className="h-4 w-4 text-[#B31942] dark:text-[#ff8da0]"
              aria-hidden="true"
            />
            {company.shipments.toLocaleString('en-US')} shipments
          </span>
          <span className="flex items-center gap-1.5">
            <US title="United States" className="h-3.5 w-5 rounded-[2px] shadow-sm" />
            US
          </span>
        </div>
        <span className="relative mt-3 flex items-center gap-1 text-xs font-semibold text-[#0A3161] opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-[#7cc4ff]">
          View company
          <ArrowRight
            className="h-3.5 w-3.5 -translate-x-1 transition-transform group-hover:translate-x-0"
            aria-hidden="true"
          />
        </span>
      </Link>
    </motion.li>
  );
}

export default function CdCompanyList({
  role,
  letter,
  items,
  total,
  page,
  totalPages,
  base,
  nearby,
}) {
  const who = role === 'export' ? 'exporters' : 'importers';

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 pb-24 pt-12">
        <div className="mx-auto max-w-5xl">
          {items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center dark:border-white/15">
              <SearchX
                className="mx-auto h-10 w-10 text-slate-400 dark:text-white/40"
                aria-hidden="true"
              />
              <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                No {who} under {label(letter)} yet
              </h2>
              <p className="mt-2 text-slate-600 dark:text-white/70">Try a nearby letter:</p>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {nearby.map((l) => (
                  <Link
                    key={l}
                    href={dirPath(role, l, 1)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-bold text-[#0A3161] transition hover:border-[#B31942]/40 hover:text-[#B31942] dark:border-white/10 dark:bg-white/5 dark:text-[#7cc4ff]"
                  >
                    {label(l)}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <>
              <p className="mb-5 text-sm text-slate-500 dark:text-white/60">
                Showing {items.length} of {total} {who} · page {page} of {totalPages}
              </p>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((c, i) => (
                  <CompanyCard key={c.id} company={c} index={i} />
                ))}
              </ul>
              <Pagination page={page} totalPages={totalPages} base={base} qs="" />
            </>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}
