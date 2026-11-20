'use client';
import { useState } from 'react';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { ChartNoAxesColumn, Lock, SearchX, Table2, X } from 'lucide-react';
import { DASHBOARD } from '@/lib/dashboard';
import { dataPath } from '@/lib/dataSlug';
import DataCharts from './DataCharts';

const fmt = (n) => Number(n).toLocaleString('en-US');

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */
// description cut to 3 lines, "Read more" opens it
function Description({ text }) {
  const [open, setOpen] = useState(false);
  const long = text.length > 70;
  return (
    <div>
      <p className={open || !long ? '' : 'line-clamp-3'}>{text}</p>
      {long && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="mt-1 text-xs font-medium text-[#0A3161] hover:underline dark:text-[#7cc4ff]"
        >
          {open ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}

// the exporter / importer name is never shown on the public page: it is a link to sign up
function MaskedName({ label }) {
  return (
    <a
      href={DASHBOARD.signup}
      className="inline-flex items-center gap-1.5 rounded-lg bg-[#B31942]/10 px-2.5 py-1 text-xs font-semibold text-[#B31942] transition hover:bg-[#B31942]/20 dark:bg-[#ff4d6d]/15 dark:text-[#ff8da0]"
    >
      <Lock className="h-3 w-3" aria-hidden="true" />
      {label}
    </a>
  );
}

const linkCls =
  'font-medium text-[#0A3161] transition hover:text-[#B31942] hover:underline dark:text-[#7cc4ff] dark:hover:text-[#ff8da0]';

/* ------------------------------------------------------------------ */
/* Table (desktop) and cards (mobile)                                  */
/* ------------------------------------------------------------------ */
function Rows({ rows, ctx, labels }) {
  const { role, hs, product, country, port } = ctx;
  const hsHref = (code) => dataPath({ role, hs: code }); // a code opens that code's own data page
  const countryHref = (slug) => dataPath({ role, hs, product, country: slug, port });
  const portHref = (slug) => dataPath({ role, hs, product, country, port: slug });

  return (
    <>
      {/* desktop */}
      <div className="hidden overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm md:block dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.1] dark:to-white/[0.02] dark:shadow-none dark:backdrop-blur-xl">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr className="bg-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:bg-white/10 dark:text-white/70">
              {[
                'Date',
                'HS Code',
                'Product Description',
                labels.country,
                'Unloading Port',
                'Qty.',
                'Unit',
                'Weight',
                labels.name,
              ].map((h) => (
                <th key={h} className="px-4 py-4 font-bold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 dark:divide-white/10 dark:text-white/80">
            {rows.map((r, i) => (
              <motion.tr
                key={r.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                className="align-top transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <td className="whitespace-nowrap px-4 py-4">{r.date}</td>
                <td className="px-4 py-4">
                  <Link href={hsHref(r.hs)} className={linkCls}>
                    {r.hs}
                  </Link>
                </td>
                <td className="max-w-[300px] px-4 py-4 text-[13px] leading-snug">
                  <Description text={r.description} />
                </td>
                <td className="px-4 py-4">
                  <Link href={countryHref(r.countrySlug)} className={linkCls}>
                    {r.country}
                  </Link>
                </td>
                <td className="px-4 py-4">
                  <Link href={portHref(r.portSlug)} className={linkCls}>
                    {r.port}
                  </Link>
                </td>
                <td className="px-4 py-4">{fmt(r.qty)}</td>
                <td className="px-4 py-4">{r.unit}</td>
                <td className="px-4 py-4">{fmt(r.weight)}</td>
                <td className="px-4 py-4">
                  <MaskedName label={labels.name} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile */}
      <ul className="space-y-3 md:hidden">
        {rows.map((r, i) => (
          <motion.li
            key={r.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.1] dark:to-white/[0.02] dark:shadow-none"
          >
            <div className="flex items-center justify-between gap-3 text-xs text-slate-500 dark:text-white/55">
              <span>{r.date}</span>
              <Link href={hsHref(r.hs)} className={`${linkCls} text-sm`}>
                {r.hs}
              </Link>
            </div>
            <div className="mt-2 text-sm font-medium text-slate-800 dark:text-white/90">
              <Description text={r.description} />
            </div>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <div>
                <dt className="text-slate-400 dark:text-white/45">{labels.country}</dt>
                <dd>
                  <Link href={countryHref(r.countrySlug)} className={linkCls}>
                    {r.country}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 dark:text-white/45">Unloading Port</dt>
                <dd>
                  <Link href={portHref(r.portSlug)} className={linkCls}>
                    {r.port}
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 dark:text-white/45">Qty. / Unit</dt>
                <dd className="text-slate-700 dark:text-white/80">
                  {fmt(r.qty)} {r.unit}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400 dark:text-white/45">Weight</dt>
                <dd className="text-slate-700 dark:text-white/80">{fmt(r.weight)}</dd>
              </div>
            </dl>
            <div className="mt-3">
              <MaskedName label={labels.name} />
            </div>
          </motion.li>
        ))}
      </ul>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* "1 2 3 Next": only page 1 is public, every other page is a sign-up  */
/* ------------------------------------------------------------------ */
function LockedPager({ shown, total, pages }) {
  const nums = pages <= 4 ? Array.from({ length: pages }, (_, i) => i + 1) : [1, 2, 3, '…', pages];
  return (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
      <p className="text-sm text-slate-500 dark:text-white/55">
        Showing <strong className="text-slate-800 dark:text-white">{shown}</strong> of{' '}
        <strong className="text-slate-800 dark:text-white">{fmt(total)}</strong>
      </p>
      {pages > 1 && (
        <nav aria-label="Pages" className="flex items-center gap-1.5">
          {nums.map((n, i) =>
            n === 1 ? (
              <span
                key={n}
                aria-current="page"
                className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-linear-to-r from-[#B31942] to-[#0A3161] px-3 text-sm font-semibold text-white shadow"
              >
                1
              </span>
            ) : n === '…' ? (
              <span key={`e${i}`} className="px-1 text-slate-400">
                …
              </span>
            ) : (
              <a
                key={n}
                href={DASHBOARD.signup}
                title="Sign up to see more"
                className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 transition hover:border-[#B31942]/40 hover:text-[#B31942] dark:border-white/10 dark:bg-white/5 dark:text-white/70"
              >
                {n}
              </a>
            ),
          )}
          <a
            href={DASHBOARD.signup}
            className="flex h-9 items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-600 transition hover:border-[#B31942]/40 hover:text-[#B31942] dark:border-white/10 dark:bg-white/5 dark:text-white/70"
          >
            Next <Lock className="h-3 w-3" aria-hidden="true" />
          </a>
        </nav>
      )}
    </div>
  );
}

// blurred placeholder rows + sign-up card. The rows are fake: no real data is hidden behind the blur.
function Unlock({ total }) {
  return (
    <div className="relative mt-6 overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10">
      <div aria-hidden="true" className="select-none space-y-2 p-4 blur-[6px]">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="grid grid-cols-6 gap-3 rounded-xl bg-slate-100 p-4 dark:bg-white/10"
          >
            {[0, 1, 2, 3, 4, 5].map((c) => (
              <span
                key={c}
                className="h-3 rounded-full bg-slate-300 dark:bg-white/25"
                style={{ width: `${55 + ((i * 7 + c * 11) % 40)}%` }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/60 p-4 dark:bg-[#07071f]/60">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-2xl dark:border-white/10 dark:bg-[#12123a]">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-[#B31942] to-[#0A3161] text-white">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
            Unlock all {fmt(total)} records
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-white/65">
            Sign up free to see every shipment, the full filters and the names behind them.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <a
              href={DASHBOARD.signup}
              className="rounded-xl bg-linear-to-r from-[#B31942] to-[#0A3161] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.03]"
            >
              Sign up
            </a>
            <a
              href={DASHBOARD.login}
              className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 dark:border-white/25 dark:text-white"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Results section                                                     */
/* ------------------------------------------------------------------ */
export default function DataResults({ ctx, heading, chips, rows, total, chart, perPage }) {
  const [view, setView] = useState('table');
  const labels = {
    country: ctx.role === 'import' ? 'Origin Country' : 'Destination Country',
    name: ctx.role === 'import' ? 'Importer Name' : 'Exporter Name',
  };
  const pages = Math.ceil(total / perPage);

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 pb-10">
        <div className="mx-auto w-full max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
          >
            {heading}
          </motion.h2>

          {/* active search parts: the X removes that part */}
          {chips.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2.5" aria-label="Active filters">
              {chips.map((c) => (
                <li key={c.label}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#B31942] to-[#8a1536] py-1.5 pl-4 pr-2 text-sm font-semibold text-white shadow-md">
                    {c.label}
                    {c.remove ? (
                      <Link
                        href={c.remove}
                        aria-label={`Remove ${c.label}`}
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 transition hover:bg-white/35"
                      >
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                      </Link>
                    ) : (
                      <span className="w-2" />
                    )}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {total === 0 ? (
            <div className="mx-auto mt-8 max-w-xl rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-white/15 dark:bg-white/5">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A3161]/10 text-[#0A3161] dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff]">
                <SearchX className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                No public records for this search
              </h3>
              <p className="mt-2 text-slate-600 dark:text-white/65">
                Try removing a filter above, or search a different product or HS code.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2 text-sm font-semibold">
                <Link
                  href="/hs-code-directory"
                  className="rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:border-[#B31942]/40 dark:border-white/20 dark:text-white"
                >
                  HS Code Directory
                </Link>
                <Link
                  href="/data-directory/us-import-data/a/1"
                  className="rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:border-[#B31942]/40 dark:border-white/20 dark:text-white"
                >
                  Data Directory
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Table View | Graph View */}
              <div
                role="tablist"
                aria-label="View"
                className="mt-6 inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                {[
                  ['table', 'Table View', Table2],
                  ['graph', 'Graph View', ChartNoAxesColumn],
                ].map(([id, label, Icon]) => (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={view === id}
                    onClick={() => setView(id)}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${
                      view === id
                        ? 'bg-linear-to-r from-[#B31942] to-[#0A3161] text-white shadow'
                        : 'text-slate-600 hover:text-slate-900 dark:text-white/65 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {label}
                  </button>
                ))}
              </div>

              <div className="mt-5">
                {view === 'table' ? (
                  <>
                    <Rows rows={rows} ctx={ctx} labels={labels} />
                    <LockedPager shown={rows.length} total={total} pages={pages} />
                    {total > rows.length && <Unlock total={total} />}
                  </>
                ) : (
                  <DataCharts chart={chart} />
                )}
              </div>
            </>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}
