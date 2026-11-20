'use client';
import Link from 'next/link';
import { MotionConfig, motion } from 'framer-motion';
import { ChevronRight, Database, Home, MapPin } from 'lucide-react';
import { US } from 'country-flag-icons/react/3x2';
import { DASHBOARD } from '@/lib/dashboard';

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

export default function CompanyProfileHero({ name, address, roleLabel, crumbs }) {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative px-4 pb-14 pt-8">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(10,49,97,0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_65%_70%_at_50%_30%,black,transparent)] dark:bg-[radial-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)]" />
          <div className="absolute -left-24 top-0 h-80 w-80 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
          <div className="absolute -right-24 top-16 h-96 w-96 rounded-full bg-[#0A3161]/10 blur-[120px] dark:bg-[#4da3ff]/20" />
        </div>

        <div className="relative mx-auto w-full max-w-5xl">
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
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  <Link
                    href={c.href}
                    className="transition hover:text-[#B31942] dark:hover:text-[#ff8da0]"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-slate-900 dark:text-white">
                {name}
              </li>
            </ol>
          </nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-9 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-[#B31942] via-white to-[#0A3161]" />

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-start gap-5">
                <motion.span
                  initial={{ rotate: -8, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.15 }}
                  aria-hidden="true"
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-[#B31942] to-[#0A3161] text-2xl font-semibold text-white shadow-lg"
                >
                  {initials(name)}
                </motion.span>

                <div>
                  <h1 className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl">
                    <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                      {name}
                    </span>
                  </h1>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161] px-3.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                      {roleLabel}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white/80">
                      <US title="United States" className="h-3.5 w-5 rounded-[2px]" />
                      USA
                    </span>
                  </div>

                  <p className="mt-3 flex items-start gap-2 text-sm text-slate-600 dark:text-white/70">
                    <MapPin
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#B31942] dark:text-[#ff8da0]"
                      aria-hidden="true"
                    />
                    {address}, United States
                  </p>
                </div>
              </div>

              <a
                href={DASHBOARD.signup}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#B31942] to-[#0A3161] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
              >
                <Database className="h-4 w-4" aria-hidden="true" />
                View Shipment Database
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
