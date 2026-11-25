'use client';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowLeft, ChevronRight, ExternalLink, Home, ImageIcon, Maximize2 } from 'lucide-react';
import { FEATURED_LIST_PATH } from '@/data/featuredData';
import { LogoTile } from '@/components/featured/FeaturedGrid';

/*
  item: one publication (see data/featuredData.js). host: 'qz.com' (shown in the frame's address bar).
  The screenshot of the page where it was published sits in a browser-style frame that scrolls inside
  itself, so a tall full-page screenshot works too.
*/
export default function FeaturedDetail({ item, host }) {
  const title = item.title || item.name;
  const text = item.description || item.summary;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-4 pb-16 pt-8">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(10,49,97,0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_20%,black,transparent)] dark:bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]" />
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
          <div className="absolute -right-24 top-32 h-96 w-96 rounded-full bg-[#0A3161]/10 blur-[120px] dark:bg-[#4da3ff]/20" />
        </div>

        <div className="relative mx-auto w-full max-w-5xl">
          <nav aria-label="Breadcrumb" className="mb-10">
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
                  href={FEATURED_LIST_PATH}
                  className="transition hover:text-[#B31942] dark:hover:text-[#ff8da0]"
                >
                  As Featured
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-slate-900 dark:text-white">
                {item.name}
              </li>
            </ol>
          </nav>

          {/* logo, heading, text */}
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 16 }}
              className="relative"
            >
              <span
                aria-hidden="true"
                className="absolute -inset-3 rounded-[1.75rem] bg-linear-to-br from-[#B31942]/30 to-[#0A3161]/30 blur-xl"
              />
              <LogoTile item={item} className="relative h-36 w-64 shadow-xl" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="mt-8 font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-5xl"
            >
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                {title}
              </span>
            </motion.h1>

            {text && (
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2 }}
                className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70"
              >
                {text}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-7 flex flex-wrap justify-center gap-3"
            >
              {item.url && (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-[#B31942] to-[#0A3161] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
                >
                  Read the Original Article
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              <Link
                href={FEATURED_LIST_PATH}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#B31942]/40 hover:text-[#B31942] dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:text-[#ff8da0]"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                All Coverage
              </Link>
            </motion.div>
          </div>

          {/* the page where it was published */}
          <motion.figure
            initial={{ opacity: 0, y: 50, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
            style={{ transformPerspective: 1200 }}
            className="mt-14 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/15 dark:bg-[#12123a]"
          >
            <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-100 px-4 py-3 dark:border-white/10 dark:bg-white/10">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </span>
              <span className="min-w-0 flex-1 truncate rounded-lg bg-white px-3 py-1 text-center text-xs text-slate-500 dark:bg-white/10 dark:text-white/60">
                {host || item.name}
              </span>
              {item.image && (
                <a
                  href={item.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open the screenshot in full size"
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-slate-500 transition hover:bg-white hover:text-[#B31942] dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-[#ff8da0]"
                >
                  <Maximize2 className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>

            <div className="max-h-[640px] overflow-y-auto bg-white [scrollbar-width:thin]">
              {item.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.image}
                  alt={`${title}: the page where USImportdata was featured`}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              ) : (
                <div className="flex h-72 flex-col items-center justify-center gap-3 text-slate-400">
                  <ImageIcon className="h-10 w-10" strokeWidth={1.4} aria-hidden="true" />
                  <p className="text-sm font-medium">Screenshot coming soon</p>
                </div>
              )}
            </div>
            <figcaption className="sr-only">
              Screenshot of the page where {item.name} featured USImportdata
            </figcaption>
          </motion.figure>
        </div>
      </section>
    </MotionConfig>
  );
}
