'use client';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { ChevronRight, FileText, Folder, Hash, Home } from 'lucide-react';

/**
 * Header for category and tag pages: breadcrumb, title, description, count and a row of sibling chips.
 * Put it ABOVE <BlogShell>.
 *
 * Props:
 *  - type        : 'category' | 'tag'
 *  - title       : e.g. "HS Codes" (tags are shown with a # in front)
 *  - description : optional paragraph under the title
 *  - total       : number of articles
 *  - chips       : [{ name, slug, count? }]  other categories/tags to jump to
 *  - activeSlug  : slug of the current one (highlighted in the chips)
 *  - chipBase    : link base for the chips, e.g. "/blogs/category"
 */
export default function ArchiveHeader({
  type = 'category',
  title,
  description,
  total = 0,
  chips = [],
  activeSlug,
  chipBase,
}) {
  const isTag = type === 'tag';
  const Icon = isTag ? Hash : Folder;
  const label = isTag ? 'Tag' : 'Category';

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-4 pb-12 pt-8 sm:pb-16">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,49,97,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(10,49,97,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_80%_at_30%_30%,black,transparent)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
          <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
          <div className="absolute -right-24 top-10 h-72 w-72 rounded-full bg-[#0A3161]/10 blur-[110px] dark:bg-[#4da3ff]/20" />
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
                  Blogs
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li
                aria-current="page"
                className="max-w-[14rem] truncate font-semibold text-slate-900 sm:max-w-md dark:text-white"
              >
                {label}: {title}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#0A3161] dark:border-white/10 dark:bg-white/5 dark:text-[#7cc4ff]"
            >
              <Icon className="h-3.5 w-3.5 text-[#B31942] dark:text-[#ff8da0]" aria-hidden="true" />
              {label}
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.06 }}
              className="mt-5 break-words text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
            >
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                {isTag ? `#${title}` : title}
              </span>
            </motion.h1>

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.14 }}
                className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70"
              >
                {description}
              </motion.p>
            )}

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#B31942]/10 px-3.5 py-1.5 text-sm font-semibold text-[#B31942] dark:bg-[#ff4d6d]/15 dark:text-[#ff8da0]"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              {total} article{total === 1 ? '' : 's'}
            </motion.p>
          </div>

          {/* sibling chips */}
          {chips.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.28 }}
              className="mt-8 flex flex-wrap items-center gap-2.5"
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/50">
                {isTag ? 'Other tags' : 'Other categories'}
              </span>
              {chips.map((c) => {
                const on = c.slug === activeSlug;
                return (
                  <Link
                    key={c.slug}
                    href={`${chipBase}/${c.slug}`}
                    aria-current={on ? 'page' : undefined}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                      on
                        ? 'border-transparent bg-linear-to-r from-[#B31942] to-[#0A3161] text-white shadow-md'
                        : 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[#B31942]/40 hover:text-[#B31942] hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:backdrop-blur dark:hover:border-[#ff8da0]/50 dark:hover:text-[#ff8da0]'
                    }`}
                  >
                    {isTag ? '#' : ''}
                    {c.name}
                  </Link>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>
    </MotionConfig>
  );
}
