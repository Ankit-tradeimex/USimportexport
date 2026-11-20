'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MotionConfig, motion } from 'framer-motion';
import { ChevronDown, ChevronRight, Home, Search } from 'lucide-react';
import { companyPath, dataPath, slugify } from '@/lib/dataSlug';

const fieldBase =
  'h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#B31942]/50 focus:ring-4 focus:ring-[#B31942]/10 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/40 dark:focus:ring-[#ff8da0]/15';

export default function CompanyHero({ ctx, meta }) {
  const router = useRouter();
  const [error, setError] = useState('');

  // uncontrolled inputs: values are read once on submit
  const submit = (e) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const product = String(f.product || '').trim();
    const hs = String(f.hs || '').replace(/\D/g, '');

    if (!product && !hs) return setError('Enter a product, an HS code, or both to search.');
    if (hs && !(hs.length % 2 === 0 && hs.length >= 2 && hs.length <= 10))
      return setError('HS code must have 2, 4, 6, 8 or 10 digits.');
    if (product && !slugify(product)) return setError('Please enter a valid product name.');

    setError('');
    router.push(
      companyPath({
        role: f.role === 'export' ? 'export' : 'import',
        hs,
        product: slugify(product),
      }),
    );
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative px-4 pb-20 pt-8 sm:pb-24">
        {/* background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,49,97,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(10,49,97,0.06)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_40%,black,transparent)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
          <div className="absolute -right-24 top-24 h-96 w-96 rounded-full bg-[#0A3161]/10 blur-[120px] dark:bg-[#4da3ff]/20" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl">
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
                  href="/search-live-data"
                  className="transition hover:text-[#B31942] dark:hover:text-[#ff8da0]"
                >
                  Search Live Data
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-slate-900 dark:text-white">
                {meta.crumb}
              </li>
            </ol>
          </nav>

          {/* left-aligned headline with the search form beside it on wide screens */}
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <motion.h1
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
              >
                <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                  {meta.title}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70"
              >
                {meta.text}
              </motion.p>

              {/* Data | Company */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-7 inline-flex rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-white/5"
              >
                <Link
                  href={dataPath(ctx)}
                  className="rounded-full px-8 py-2 text-sm font-semibold text-slate-600 transition hover:text-[#B31942] dark:text-white/70 dark:hover:text-[#ff8da0]"
                >
                  Data
                </Link>
                <span
                  aria-current="page"
                  className="rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161] px-8 py-2 text-sm font-semibold text-white shadow-md"
                >
                  Company
                </span>
              </motion.div>
            </div>

            {/* search, pre-filled from the URL */}
            <motion.form
              onSubmit={submit}
              noValidate
              role="search"
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0c0c2b]/70"
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="relative sm:col-span-2">
                  <select
                    name="role"
                    defaultValue={ctx.role}
                    aria-label="Importer or exporter"
                    className={`${fieldBase} appearance-none pr-9 font-medium`}
                  >
                    <option
                      className="bg-white text-slate-900 dark:bg-[#12123a] dark:text-white"
                      value="import"
                    >
                      US Importers
                    </option>
                    <option
                      className="bg-white text-slate-900 dark:bg-[#12123a] dark:text-white"
                      value="export"
                    >
                      US Exporters
                    </option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-white/50"
                    aria-hidden="true"
                  />
                </div>
                <input
                  name="product"
                  type="text"
                  defaultValue={ctx.productName}
                  placeholder="Description, e.g. Mobile"
                  aria-label="Product description"
                  className={fieldBase}
                />
                <input
                  name="hs"
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  defaultValue={ctx.hs}
                  placeholder="HS code"
                  aria-label="HS code"
                  className={fieldBase}
                />
                <button
                  type="submit"
                  className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#B31942] to-[#0A3161] px-7 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02] sm:col-span-2"
                >
                  <Search className="h-4 w-4" aria-hidden="true" />
                  Search companies
                </button>
              </div>
              {error && (
                <p role="alert" className="mt-2 px-1 text-xs font-medium text-red-500">
                  {error}
                </p>
              )}
            </motion.form>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
