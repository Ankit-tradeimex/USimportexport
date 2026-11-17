'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MotionConfig, motion } from 'framer-motion';
import { ChevronRight, Home, Search } from 'lucide-react';

/**
 * Header for blog search results: breadcrumb, "Search: <query>" title, result count and a box to refine the search.
 * Put it ABOVE <BlogShell>.
 */
export default function SearchHeader({ query, total }) {
  const router = useRouter();
  const [q, setQ] = useState(query);

  const submit = (e) => {
    e.preventDefault();
    const v = q.trim();
    router.push(v ? `/blogs/search/${encodeURIComponent(v)}` : '/blogs');
  };

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
                className="max-w-[14rem] truncate font-semibold uppercase text-slate-900 sm:max-w-md dark:text-white"
              >
                Search: {query}
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="break-words text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
              >
                Search:{' '}
                <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text capitalize text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                  {query}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 text-base text-slate-600 dark:text-white/70"
              >
                {total > 0
                  ? `${total} article${total === 1 ? '' : 's'} found`
                  : 'No articles found. Try different keywords.'}
              </motion.p>
            </div>

            {/* refine */}
            <motion.form
              role="search"
              onSubmit={submit}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="flex w-full max-w-md items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg transition focus-within:border-[#B31942]/50 focus-within:ring-4 focus-within:ring-[#B31942]/15 dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:backdrop-blur-xl"
            >
              <Search
                className="ml-3 h-5 w-5 shrink-0 text-slate-400 dark:text-white/50"
                aria-hidden="true"
              />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search again"
                aria-label="Search articles"
                className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-white/40"
              />
              <button
                type="submit"
                className="shrink-0 rounded-xl bg-linear-to-r from-[#B31942] to-[#0A3161] px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.03]"
              >
                Search
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
