'use client';

import { MotionConfig, motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, ImageIcon } from 'lucide-react';
import Link from 'next/link';
import AnimatedText from '../utils/AnimatedText';

/* ------------------------------------------------------------------ */
/* PLACEHOLDER posts: replace titles, excerpt, dates and links.        */
/* Image slots are empty on purpose: set `image` to a path or URL      */
/* (e.g. "/blog/featured.jpg") and the photo fills the slot.           */
/* ------------------------------------------------------------------ */
const FEATURED = {
  slug: 'how-to-find-us-buyers-using-import-data',
  title: '10 Tips to Find Verified US Buyers Using Import Data',
  excerpt:
    'Finding the right buyers is the hardest part of exporting to the US. This article gives ten actionable tips to help you search shipment records, shortlist qualified importers, and start conversations with confidence.',
  image: '/assets/images/1.webp', // add image here, recommended 1200 x 750 px
};

const SIDE_POSTS = [
  {
    slug: 'understanding-hs-codes',
    title: 'HS Codes Explained: Why They Matter for Trade Research',
    read: '5 min read',
    date: '21 Oct 2026',
    image: '/assets/images/1.webp', // add image here, recommended 600 x 400 px
  },
  {
    slug: 'reading-us-trade-trends',
    title: 'How to Read US Trade Trends Before Your Competitors',
    read: '6 min read',
    date: '7 Oct 2026',
    image: '/assets/images/2.webp', // add image here, recommended 600 x 400 px
  },
  {
    slug: 'bill-of-lading-data-guide',
    title: "What Is Bill of Lading Data? A Beginner's Guide",
    read: '4 min read',
    date: '30 Sep 2026',
    image: '/assets/images/3.webp', // add image here, recommended 600 x 400 px
  },
];

function ImageSlot({ post, hint, className = '' }) {
  return (
    <div className={`relative overflow-hidden bg-neutral-100 dark:bg-white/10 ${className}`}>
      {post.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-2 flex flex-col items-center justify-center gap-1.5 rounded-[1.25rem] border-2 border-dashed border-neutral-300 text-neutral-400 dark:border-white/20 dark:text-slate-500">
          <ImageIcon className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
          <span className="text-[11px] font-medium">{hint}</span>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function BlogSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-white px-6 py-20 dark:bg-slate-950 lg:px-10 lg:py-28">
        {/* dark mode only: faint grid + colored glows behind the glass panel */}
        <div className="pointer-events-none absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_55%,black,transparent)]" />
          <div className="absolute left-[8%] top-[45%] h-80 w-80 rounded-full bg-[#4da3ff]/20 blur-[110px]" />
          <div className="absolute right-[8%] top-[50%] h-72 w-72 rounded-full bg-[#ff4d6d]/15 blur-[110px]" />
          <div className="absolute left-1/2 top-0 h-56 w-[55%] -translate-x-1/2 rounded-full bg-[#4da3ff]/15 blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-7xl">
          {/* header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-2xl">
              <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-sky-200 dark:backdrop-blur">
                Our Blog
              </span>
              {/* <h2 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl">
                Latest insights on{' '}
                <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent">
                  US trade
                </span>
              </h2> */}
              <AnimatedText
                text="Latest insights on"
                highlight="US trade"
                className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 dark:text-white sm:text-5xl"
                delay={0.2}
                stagger={0.08}
                duration={0.7}
              />
            </div>
            <a
              href="/blogs"
              className="group inline-flex w-fit items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition hover:border-[#5DBAF6] focus:outline-none focus:ring-4 focus:ring-[#5DBAF6]/40 dark:border-white/15 dark:bg-white/5 dark:text-white dark:backdrop-blur dark:hover:bg-white/10"
            >
              View all blogs
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </motion.div>

          {/* white rounded panel, like the reference */}
          <div className="mt-10 rounded-[2rem] bg-white p-4 shadow-[0_20px_60px_rgba(20,20,60,0.08)] sm:p-6 lg:p-8 dark:border dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] dark:backdrop-blur-xl">
            <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-10">
              {/* ---------- featured ---------- */}
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="group flex flex-col"
              >
                <Link
                  href={`/blogs/${FEATURED.slug}`}
                  aria-label={FEATURED.title}
                  className="block rounded-3xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#5DBAF6]/50"
                >
                  <ImageSlot
                    post={FEATURED}
                    hint="Add image · 1200 × 750"
                    className="aspect-[16/10] rounded-3xl"
                  />
                </Link>
                <h3 className="mt-7 text-3xl font-normal leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
                  {FEATURED.title}
                </h3>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-600 dark:text-slate-400">
                  {FEATURED.excerpt}
                </p>
                <Link
                  href={`/blogs/${FEATURED.slug}`}
                  className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1a1a3a] hover:shadow-[0_10px_30px_rgba(26,26,58,0.3)] focus:outline-none focus:ring-4 focus:ring-[#5DBAF6]/40 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 dark:hover:shadow-[0_10px_30px_rgba(77,163,255,0.3)]"
                >
                  Learn More
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </motion.article>

              {/* ---------- side list ---------- */}
              <div className="flex flex-col gap-4">
                {SIDE_POSTS.map((p, i) => (
                  <motion.article
                    key={p.slug}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
                    whileHover={{ x: -4 }}
                    className="group relative flex flex-1 gap-4 rounded-3xl"
                  >
                    <ImageSlot
                      post={p}
                      hint="Add image · 600 × 400"
                      className="aspect-[3/2] w-[44%] shrink-0 self-center rounded-3xl sm:w-[42%]"
                    />
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 py-1">
                      <h3 className="text-base font-semibold leading-snug tracking-tight text-neutral-950 transition-colors group-hover:text-[#2f7fd6] dark:text-white dark:group-hover:text-sky-400 sm:text-lg">
                        <Link
                          href={`/blogs/${p.slug}`}
                          className="after:absolute after:inset-0 after:rounded-3xl focus:outline-none focus-visible:after:ring-4 focus-visible:after:ring-[#5DBAF6]/50"
                        >
                          {p.title}
                        </Link>
                      </h3>
                      <div className="mt-3 flex items-center justify-between gap-2 text-xs font-medium text-neutral-400 dark:text-slate-500 sm:text-sm">
                        <span>{p.read}</span>
                        <span>{p.date}</span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
