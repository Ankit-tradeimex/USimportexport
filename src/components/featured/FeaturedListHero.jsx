'use client';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { ChevronRight, Home, Newspaper } from 'lucide-react';

export default function FeaturedListHero({ count }) {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden rounded-b-[2.5rem] bg-linear-to-br from-[#B31942] via-[#6b1d4e] to-[#0A3161] px-4 pb-20 pt-10 text-white sm:pb-24">
        {/* background: grid, glows and a slow light sweep */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_75%_80%_at_50%_40%,black,transparent)]" />
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#ff4d6d]/30 blur-[100px]" />
          <div className="absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-[#4da3ff]/30 blur-[110px]" />
          <motion.div
            className="absolute inset-y-0 w-1/4 -skew-x-12 bg-linear-to-r from-transparent via-white/15 to-transparent"
            initial={{ x: '-120%' }}
            animate={{ x: '520%' }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', repeatDelay: 2 }}
          />
        </div>

        <div className="relative mx-auto w-full max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-12">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/70">
              <li>
                <Link href="/" className="flex items-center gap-1.5 transition hover:text-white">
                  <Home className="h-3.5 w-3.5" aria-hidden="true" />
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-white">
                As Featured
              </li>
            </ol>
          </nav>

          <div className="mx-auto max-w-3xl text-center">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur"
            >
              <Newspaper className="h-3.5 w-3.5" aria-hidden="true" />
              {count} publications
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="mt-5 font-serif text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            >
              As Featured On
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg"
            >
              USImportData.com has been referenced by leading global media platforms, financial
              publications, and policy analysts for accurate, shipment-level trade data, market
              intelligence, verified databases, and actionable import-export insights.
            </motion.p>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
