'use client';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Pagination (path based: .../1, .../2)                               */
/* ------------------------------------------------------------------ */
function pageList(page, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, total, page, page - 1, page + 1]);
  const nums = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out = [];
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) out.push('…');
    out.push(n);
  });
  return out;
}

export function Pagination({ page, totalPages, base, qs }) {
  if (totalPages <= 1) return null;
  const href = (n) => `${base}/${n}${qs}`;
  const arrow =
    'flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:border-[#B31942]/40 hover:text-[#B31942] dark:border-white/10 dark:bg-white/5 dark:text-white/70';
  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={href(page - 1)} aria-label="Previous page" className={arrow}>
          <ChevronLeft className="h-4 w-4" />
        </Link>
      ) : (
        <span aria-hidden="true" className={`${arrow} pointer-events-none opacity-40`}>
          <ChevronLeft className="h-4 w-4" />
        </span>
      )}
      {pageList(page, totalPages).map((n, i) =>
        n === '…' ? (
          <span key={`e${i}`} className="px-1 text-slate-400 dark:text-white/40">
            …
          </span>
        ) : (
          <Link
            key={n}
            href={href(n)}
            aria-current={n === page ? 'page' : undefined}
            className={`flex h-10 min-w-10 items-center justify-center rounded-xl px-3 text-sm font-semibold transition ${
              n === page
                ? 'bg-linear-to-r from-[#B31942] to-[#0A3161] text-white shadow-md'
                : 'border border-slate-200 bg-white text-slate-700 hover:border-[#B31942]/40 hover:text-[#B31942] dark:border-white/10 dark:bg-white/5 dark:text-white/75'
            }`}
          >
            {n}
          </Link>
        ),
      )}
      {page < totalPages ? (
        <Link href={href(page + 1)} aria-label="Next page" className={arrow}>
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span aria-hidden="true" className={`${arrow} pointer-events-none opacity-40`}>
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
