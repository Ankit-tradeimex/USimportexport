'use client';
import Link from 'next/link';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { Search, Sparkles } from 'lucide-react';
import { HiArrowLongRight } from 'react-icons/hi2';

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function SearchLiveDataCta() {
  const reduce = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4">
        <div className="relative mx-auto w-full overflow-hidden rounded-[2rem] bg-[#07071f] bg-linear-to-br from-[#0a0a2e] via-[#17104d] to-[#0a1a4a] text-white">
          {/* background: grid + glows */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_80%_80%_at_30%_40%,black,transparent)]" />
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#ff4d6d]/20 blur-[110px]" />
            <div className="absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-[#4da3ff]/25 blur-[110px]" />
          </div>

          <div className="relative px-6 py-16">
            <div className="flex flex-col items-center justify-center">
              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="mt-5 text-center text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl"
              >
                Prefer your own filters?{' '}
                <span className="bg-linear-to-r from-[#7cc4ff] via-white to-[#ff8da0] bg-clip-text text-transparent">
                  Search manually.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="mt-5 max-w-5xl text-center text-base leading-relaxed text-white/75"
              >
                Choose import or export, search by product, HS code or company, and narrow it down
                by country and year. Full control, straight to live US shipment records.
              </motion.p>

              {/* buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="mt-9 flex flex-wrap items-center justify-center gap-3"
              >
                <Link
                  href="/search-live-data"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0A1A4A] shadow-[0_10px_40px_rgba(124,196,255,0.35)] transition hover:scale-[1.03]"
                >
                  {!reduce && (
                    <span className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-[#4da3ff]/25 to-transparent transition-all duration-700 group-hover:left-full" />
                  )}
                  <Search className="h-4 w-4 text-[#B31942]" aria-hidden="true" />
                  Search Live Data
                  <motion.span
                    animate={reduce ? undefined : { x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-lg"
                  >
                    <HiArrowLongRight />
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
