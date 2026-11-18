'use client';
import Link from 'next/link';
import Image from 'next/image';
import { MotionConfig, motion } from 'framer-motion';
import { CalendarDays, ChevronRight, Clock, Home, Newspaper } from 'lucide-react';

const fmt = (d) =>
  d
    ? new Date(d).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : '';
export default function PostHeader({ post }) {
  const author = post?.author?.name ?? 'USimportdata Team';

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-4 pb-10 pt-8 sm:pb-14">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,49,97,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(10,49,97,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_20%,black,transparent)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
          <div className="absolute -right-24 top-20 h-80 w-80 rounded-full bg-[#0A3161]/10 blur-[110px] dark:bg-[#4da3ff]/20" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500 dark:text-white/60">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-1.5 transition hover:text-[#B31942] dark:hover:text-[#ff8da0]"
                >
                  <Home className="h-3.5 w-3.5" aria-hidden="true" />
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="transition hover:text-[#B31942] dark:hover:text-[#ff8da0]"
                >
                  Blog
                </Link>
              </li>
              {post.category && (
                <>
                  <li aria-hidden="true">
                    <ChevronRight className="h-3.5 w-3.5" />
                  </li>
                  <li>
                    <Link
                      href={`/blogs/category/${post.categorySlug}`}
                      className="transition hover:text-[#B31942] dark:hover:text-[#ff8da0]"
                    >
                      {post.category}
                    </Link>
                  </li>
                </>
              )}
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li
                aria-current="page"
                className="line-clamp-1 max-w-[16rem] font-semibold text-slate-900 sm:max-w-md dark:text-white"
              >
                {post.title}
              </li>
            </ol>
          </nav>

          {/* title block */}
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <Link
                href={`/blogs/category/${post.categorySlug}`}
                className="inline-flex items-center gap-2 rounded-full bg-[#B31942]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#B31942] transition hover:bg-[#B31942]/20 dark:bg-[#ff4d6d]/15 dark:text-[#ff8da0] dark:hover:bg-[#ff4d6d]/25"
              >
                <Newspaper className="h-3.5 w-3.5" aria-hidden="true" />
                {post.category}
              </Link>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-5 text-3xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
            >
              {post.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-600 dark:text-white/70"
            >
              <span className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-[#B31942] to-[#0A3161] text-sm font-bold text-white">
                  {author[0]}
                </span>
                <span className="font-semibold text-slate-900 dark:text-white">{author}</span>
              </span>
              {post.date && (
                <span className="flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  <time dateTime={post.date}>{fmt(post.date)}</time>
                </span>
              )}
              {post.readTime && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  {post.readTime}
                </span>
              )}
            </motion.div>
          </div>

          {/* cover: 1920 x 731 */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-3xl border border-slate-200 shadow-2xl dark:border-white/10 dark:shadow-none"
          >
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                width={post.width ?? 1600}
                height={post.height ?? 900}
                sizes="(min-width: 1280px) 800px, (min-width: 768px) 90vw, 100vw"
                className="h-auto w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="relative flex aspect-[1920/731] w-full items-center justify-center overflow-hidden bg-linear-to-r from-[#B31942] via-[#5c2150] to-[#0A3161]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_90%_at_50%_50%,black,transparent)]" />
                <Newspaper
                  className="relative h-16 w-16 text-white/60 sm:h-24 sm:w-24"
                  strokeWidth={1.2}
                  aria-hidden="true"
                />
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
