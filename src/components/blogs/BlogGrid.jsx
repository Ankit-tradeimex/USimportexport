'use client';
import Link from 'next/link';
import Image from 'next/image';
import { MotionConfig, motion } from 'framer-motion';
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileSearch,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const fmt = (d) =>
  d
    ? new Date(d).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : '';

const slugify = (s = '') =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/* 1, 2, 3 ... with ellipses around the current page */
function pageList(page, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, total, page - 1, page, page + 1]);
  if (page <= 3) [2, 3, 4].forEach((n) => set.add(n));
  if (page >= total - 2) [total - 3, total - 2, total - 1].forEach((n) => set.add(n));
  const nums = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out = [];
  nums.forEach((n, i) => {
    if (i && n - nums[i - 1] > 1) out.push('…');
    out.push(n);
  });
  return out;
}

/* ------------------------------------------------------------------ */
/* Card                                                                */
/* ------------------------------------------------------------------ */
export function PostCard({ post, index }) {
  const catSlug = post.categorySlug ?? slugify(post.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
    >
      {/* image: 1920 x 731 */}
      <Link
        href={`/blogs/${post.slug}`}
        className="relative block aspect-[1920/731] overflow-hidden"
        tabIndex={-1}
        aria-hidden="true"
      >
        {post.image ? (
          <Image
            src={post.image}
            alt=""
            width={1920}
            height={731}
            sizes="(min-width: 1280px) 280px, (min-width: 640px) 45vw, 100vw"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-r from-[#B31942] via-[#5c2150] to-[#0A3161]">
            <span className="text-3xl font-bold text-white/70">{post.title?.[0] ?? 'B'}</span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {post.category && (
            <Link
              href={`/blogs/category/${catSlug}`}
              className="rounded-full bg-[#B31942]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#B31942] transition hover:bg-[#B31942]/20 dark:bg-[#ff4d6d]/15 dark:text-[#ff8da0] dark:hover:bg-[#ff4d6d]/25"
            >
              {post.category}
            </Link>
          )}
          {post.date && (
            <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-white/55">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              {fmt(post.date)}
            </span>
          )}
        </div>

        <h3 className="mt-3 text-lg font-semibold leading-snug text-slate-900 dark:text-white">
          <Link
            href={`/blogs/${post.slug}`}
            className="line-clamp-2 transition-colors hover:text-[#B31942] dark:hover:text-[#ff8da0]"
          >
            {post.title}
          </Link>
        </h3>

        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-white/65">
            {post.excerpt}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between pt-5">
          {post.readTime ? (
            <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-white/55">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              {post.readTime}
            </span>
          ) : (
            <span />
          )}
          <Link
            href={`/blogs/${post.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A3161] transition-all group-hover:gap-2.5 dark:text-[#7cc4ff]"
          >
            Read more
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Pagination                                                          */
/* ------------------------------------------------------------------ */
export function Pagination({ page, totalPages, hrefFor }) {
  if (totalPages <= 1) return null;

  const base =
    'flex h-11 min-w-11 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition';
  const idle =
    'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[#B31942]/40 hover:text-[#B31942] hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:backdrop-blur dark:hover:border-[#ff8da0]/50 dark:hover:text-[#ff8da0]';
  const off =
    'cursor-not-allowed border-slate-100 bg-slate-50 text-slate-300 dark:border-white/5 dark:bg-white/[0.03] dark:text-white/25';

  return (
    <nav aria-label="Pagination" className="mt-12">
      <ul className="flex flex-wrap items-center justify-center gap-2">
        <li>
          {page > 1 ? (
            <Link
              href={hrefFor(page - 1)}
              rel="prev"
              aria-label="Previous page"
              className={`${base} ${idle} gap-1.5`}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Previous</span>
            </Link>
          ) : (
            <span aria-disabled="true" className={`${base} ${off} gap-1.5`}>
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Previous</span>
            </span>
          )}
        </li>

        {pageList(page, totalPages).map((n, i) =>
          n === '…' ? (
            <li
              key={`gap-${i}`}
              aria-hidden="true"
              className="px-1 text-slate-400 dark:text-white/40"
            >
              …
            </li>
          ) : (
            <li key={n}>
              {n === page ? (
                <span
                  aria-current="page"
                  className={`${base} border-transparent bg-linear-to-r from-[#B31942] to-[#0A3161] text-white shadow-lg`}
                >
                  {n}
                </span>
              ) : (
                <Link href={hrefFor(n)} aria-label={`Page ${n}`} className={`${base} ${idle}`}>
                  {n}
                </Link>
              )}
            </li>
          ),
        )}

        <li>
          {page < totalPages ? (
            <Link
              href={hrefFor(page + 1)}
              rel="next"
              aria-label="Next page"
              className={`${base} ${idle} gap-1.5`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          ) : (
            <span aria-disabled="true" className={`${base} ${off} gap-1.5`}>
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </span>
          )}
        </li>
      </ul>
      <p className="mt-4 text-center text-xs text-slate-500 dark:text-white/50">
        Page {page} of {totalPages}
      </p>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* Grid                                                                */
/* ------------------------------------------------------------------ */
/**
 * Props:
 *  - posts      : posts for the CURRENT page only: [{ slug, title, excerpt, image, category, categorySlug?, date, readTime }]
 *  - page       : current page number (1-based)
 *  - totalPages : total number of pages
 *  - basePath   : path the page links point to (default "/blogs"). Pagination links look like /blogs?page=2
 *  - params     : extra query params to keep in the links, e.g. { q: 'hs code' }
 *  - title      : optional heading above the grid (pass null to hide)
 *
 * Image size: 1920 x 731 (the cards crop to that ratio).
 * The grid adapts to the width of its column: 1 column, then 2, then 3 (3 fit beside the sidebar from about 1280px up).
 */
export default function BlogGrid({
  posts = [],
  page = 1,
  totalPages = 1,
  basePath = '/blogs',
  params = {},
  title = 'Latest articles',
}) {
  const hrefFor = (n) => {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => v && sp.set(k, v));
    if (n > 1) sp.set('page', String(n));
    const qs = sp.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  return (
    <MotionConfig reducedMotion="user">
      <div id="posts" className="@container scroll-mt-24">
        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex items-center gap-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
          >
            <span className="h-7 w-1.5 rounded-full bg-linear-to-b from-[#B31942] to-[#0A3161] dark:from-[#ff8da0] dark:to-[#7cc4ff]" />
            {title}
          </motion.h2>
        )}

        {posts.length === 0 ? (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 px-6 py-16 text-center dark:border-white/15">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-white/60">
              <FileSearch className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
              No articles found
            </p>
            <p className="mt-1 text-sm text-slate-600 dark:text-white/65">
              Try a different search or browse all articles.
            </p>
            <Link
              href={basePath}
              className="mt-6 rounded-xl bg-[#0A3161] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.03] dark:bg-white dark:text-[#0A1A4A]"
            >
              View all articles
            </Link>
          </div>
        ) : (
          <>
            {/* key={page} replays the entrance animation when the page changes */}
            <div key={page} className="grid gap-6 @xl:grid-cols-1 @3xl:grid-cols-2">
              {posts.map((p, i) => (
                <PostCard key={p.slug} post={p} index={i} />
              ))}
            </div>
            <Pagination page={page} totalPages={totalPages} hrefFor={hrefFor} />
          </>
        )}
      </div>
    </MotionConfig>
  );
}
