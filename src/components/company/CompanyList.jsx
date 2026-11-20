'use client';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowUpRight, Lock, SearchX, X } from 'lucide-react';
import { US } from 'country-flag-icons/react/3x2';
import { DASHBOARD } from '@/lib/dashboard';
import { companyPath } from '@/lib/dataSlug';

const fmt = (n) => Number(n).toLocaleString('en-US');

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */
const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
// cards tip up into place one after another
const item = {
  hidden: { opacity: 0, y: 22, rotateX: -16 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

function CompanyCard({ company, term }) {
  return (
    <motion.li variants={item} style={{ transformPerspective: 900 }}>
      <Link
        href={companyPath(term, company.slug)}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 pl-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B31942] dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
      >
        {/* edge bar grows on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1.5 origin-top scale-y-[0.28] bg-linear-to-b from-[#B31942] to-[#0A3161] transition-transform duration-300 group-hover:scale-y-100"
        />

        <div className="flex items-start justify-between gap-3">
          <US
            title="United States"
            className="h-5 w-[30px] rounded-[3px] shadow-sm ring-1 ring-black/10"
          />
          <ArrowUpRight
            className="h-5 w-5 text-slate-300 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#B31942] dark:text-white/30 dark:group-hover:text-[#ff8da0]"
            aria-hidden="true"
          />
        </div>

        <h3 className="mt-4 text-lg font-semibold leading-snug text-slate-900 dark:text-white">
          {company.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-white/70">
          {company.description}
        </p>
      </Link>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* "1 2 3 Next": only page 1 is public, every other page is a sign-up  */
/* ------------------------------------------------------------------ */
function LockedPager({ shown, total, pages }) {
  const nums = pages <= 4 ? Array.from({ length: pages }, (_, i) => i + 1) : [1, 2, 3, '…', pages];
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
      <p className="text-sm text-slate-500 dark:text-white/55">
        Showing <strong className="text-slate-800 dark:text-white">{shown}</strong> of{' '}
        <strong className="text-slate-800 dark:text-white">{fmt(total)}</strong> companies
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

// blurred placeholder cards + sign-up card. The cards are fake: no real company is hidden behind the blur.
function Unlock({ total, one }) {
  return (
    <div className="relative mt-8 overflow-hidden rounded-3xl border border-slate-200 dark:border-white/10">
      <div
        aria-hidden="true"
        className="grid select-none gap-3 p-4 blur-[6px] sm:grid-cols-2 lg:grid-cols-3"
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className="space-y-3 rounded-xl bg-slate-100 p-5 dark:bg-white/10">
            <span className="block h-4 w-8 rounded bg-slate-300 dark:bg-white/25" />
            <span className="block h-4 w-3/4 rounded-full bg-slate-300 dark:bg-white/25" />
            <span className="block h-3 w-full rounded-full bg-slate-300 dark:bg-white/25" />
            <span className="block h-3 w-2/3 rounded-full bg-slate-300 dark:bg-white/25" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/60 p-4 dark:bg-[#07071f]/60">
        <div className="max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-2xl dark:border-white/10 dark:bg-[#12123a]">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-[#B31942] to-[#0A3161] text-white">
            <Lock className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">
            See all {fmt(total)} companies
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-white/65">
            Sign up free to browse every {one} on the list and open their profiles.
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
/* List section                                                        */
/* ------------------------------------------------------------------ */
export default function CompanyList({ term, heading, chips, rows, total, perPage }) {
  const pages = Math.ceil(total / perPage);
  const one = term.role === 'export' ? 'exporter' : 'importer';

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 pb-14">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {heading}
          </h2>

          {/* active search parts: the X removes that part */}
          {chips.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2.5" aria-label="Active filters">
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
                No public companies for this search
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
                  href="/data-directory/us-importer-company/a/1"
                  className="rounded-xl border border-slate-300 px-4 py-2 text-slate-700 hover:border-[#B31942]/40 dark:border-white/20 dark:text-white"
                >
                  Data Directory
                </Link>
              </div>
            </div>
          ) : (
            <>
              <motion.ul
                key={rows[0]?.id}
                variants={grid}
                initial="hidden"
                animate="show"
                className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {rows.map((c) => (
                  <CompanyCard key={c.id} company={c} term={term} />
                ))}
              </motion.ul>

              <LockedPager shown={rows.length} total={total} pages={pages} />
              {total > rows.length && <Unlock total={total} one={one} />}
            </>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}
