'use client';
import Link from 'next/link';
import Image from 'next/image';
import { MotionConfig, motion } from 'framer-motion';
import { CalendarDays, Eye, FileSearch, User } from 'lucide-react';
import { Pagination } from './BlogGrid';

const fmt = (d) =>
  d
    ? new Date(d).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : '';

/* ------------------------------------------------------------------ */
/* One result row: image on the left, text on the right                */
/* ------------------------------------------------------------------ */
function ResultRow({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: Math.min(index, 4) * 0.05 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-xl sm:flex-row dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
    >
      {/* image (1920 x 731 source) */}
      <Link
        href={`/blogs/${post.slug}`}
        tabIndex={-1}
        aria-hidden="true"
        className="relative block aspect-[1920/731] shrink-0 overflow-hidden sm:aspect-auto sm:min-h-[170px] sm:w-[38%]"
      >
        {post.image ? (
          <Image
            src={post.image}
            alt=""
            fill
            sizes="(min-width: 640px) 300px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-linear-to-r from-[#B31942] via-[#5c2150] to-[#0A3161]">
            <span className="text-4xl font-bold text-white/70">{post.title?.[0] ?? 'B'}</span>
          </div>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-6">
        {post.category && (
          <Link
            href={`/blogs/category/${post.categorySlug}`}
            className="mb-2 w-fit rounded-full bg-[#B31942]/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#B31942] transition hover:bg-[#B31942]/20 dark:bg-[#ff4d6d]/15 dark:text-[#ff8da0] dark:hover:bg-[#ff4d6d]/25"
          >
            {post.category}
          </Link>
        )}

        <h2 className="text-lg font-semibold leading-snug text-slate-900 sm:text-xl dark:text-white">
          <Link
            href={`/blogs/${post.slug}`}
            className="transition-colors hover:text-[#B31942] dark:hover:text-[#ff8da0]"
          >
            {post.title}
          </Link>
        </h2>

        {post.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-white/65">
            {post.excerpt}
          </p>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-white/55">
          <span className="flex items-center gap-1.5 font-semibold text-[#0A3161] dark:text-[#7cc4ff]">
            <User className="h-3.5 w-3.5" aria-hidden="true" />
            {post.author?.name ?? 'USimportdata'}
          </span>
          {post.date && (
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
              {fmt(post.date)}
            </span>
          )}
          {typeof post.views === 'number' && (
            <span className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              {post.views.toLocaleString('en-US')} views
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* List                                                                */
/* ------------------------------------------------------------------ */
/**
 * Vertical list of results with pagination (used for search results).
 * Props:
 *  - posts      : posts for the CURRENT page
 *  - page       : current page (1-based)
 *  - totalPages : number of pages
 *  - basePath   : where the pagination links point, e.g. "/blogs/search/code" -> "/blogs/search/code?page=2"
 */
export default function BlogList({ posts = [], page = 1, totalPages = 1, basePath = '/blogs' }) {
  const hrefFor = (n) => (n > 1 ? `${basePath}?page=${n}` : basePath);

  return (
    <MotionConfig reducedMotion="user">
      {posts.length === 0 ? (
        <div className="flex flex-col items-center rounded-3xl border border-dashed border-slate-300 px-6 py-16 text-center dark:border-white/15">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-white/60">
            <FileSearch className="h-7 w-7" aria-hidden="true" />
          </span>
          <p className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
            No articles found
          </p>
          <p className="mt-1 text-sm text-slate-600 dark:text-white/65">
            Try different keywords or browse all articles.
          </p>
          <Link
            href="/blogs"
            className="mt-6 rounded-xl bg-[#0A3161] px-5 py-3 text-sm font-semibold text-white transition hover:scale-[1.03] dark:bg-white dark:text-[#0A1A4A]"
          >
            View all articles
          </Link>
        </div>
      ) : (
        <>
          <div key={page} className="space-y-5">
            {posts.map((p, i) => (
              <ResultRow key={p.slug} post={p} index={i} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} hrefFor={hrefFor} />
        </>
      )}
    </MotionConfig>
  );
}
