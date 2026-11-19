'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MotionConfig, motion } from 'framer-motion';
import {
  ArrowRight,
  Armchair,
  Car,
  Cog,
  Cpu,
  FlaskConical,
  Fuel,
  Gem,
  Hammer,
  Layers,
  Package,
  Palette,
  PawPrint,
  Pill,
  Plane,
  Search,
  SearchX,
  Shield,
  Shirt,
  Sprout,
  TreePine,
  Wine,
} from 'lucide-react';
import {
  ddPath,
  getNearbyLetters,
  getProductHref,
  productLinkLabel,
} from '@/data/productDirectoryData';
import { Pagination } from '@/components/common/PathPagination';

const ICONS = {
  food: Sprout,
  chemicals: FlaskConical,
  electronics: Cpu,
  vehicles: Car,
  machinery: Cog,
  textiles: Shirt,
  metals: Hammer,
  beverages: Wine,
  pharma: Pill,
  energy: Fuel,
  furniture: Armchair,
  art: Palette,
  aero: Plane,
  arms: Shield,
  animals: PawPrint,
  paper: TreePine,
  plastics: Layers,
  jewellery: Gem,
  misc: Package,
};

/* ------------------------------------------------------------------ */
/* Product card: spotlight follows the mouse (no React state)          */
/* ------------------------------------------------------------------ */
function ProductCard({ product, mode, index }) {
  const ref = useRef(null);
  const Icon = ICONS[product.category] || Package;

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
    >
      <Link
        ref={ref}
        href={getProductHref({ ...mode, slug: product.slug })}
        onMouseMove={onMove}
        className="group relative flex h-full min-h-[150px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#B31942]/40 hover:shadow-xl dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl dark:hover:border-[#ff8da0]/40"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), rgba(179,25,66,0.12), rgba(10,49,97,0.09) 45%, transparent 70%)',
          }}
        />

        <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A3161]/10 text-[#0A3161] transition-colors group-hover:bg-[#B31942] group-hover:text-white dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className="relative mt-4 text-[11px] font-bold uppercase tracking-wider text-[#B31942] dark:text-[#ff8da0]">
          {product.categoryName}
        </p>
        <h3 className="relative mt-1 text-lg font-semibold leading-snug text-slate-900 dark:text-white">
          {product.name}
        </h3>
        <span className="relative mt-auto flex items-center gap-1 pt-3 text-xs font-semibold text-[#0A3161] opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-[#7cc4ff]">
          {productLinkLabel(mode)}
          <ArrowRight
            className="h-3.5 w-3.5 -translate-x-1 transition-transform group-hover:translate-x-0"
            aria-hidden="true"
          />
        </span>
      </Link>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* Grid: filter + cards + pagination                                   */
/* ------------------------------------------------------------------ */
export default function DdProductGrid({
  modeSlug,
  mode,
  letter,
  items,
  total,
  totalAll,
  page,
  totalPages,
  q,
}) {
  const router = useRouter();
  const timer = useRef(null);
  const base = `/data-directory/${modeSlug}/${letter}`;
  const qs = q ? `?q=${encodeURIComponent(q)}` : '';

  useEffect(() => () => clearTimeout(timer.current), []);

  // the filter lives in the URL (?q=) so the server filters; wait until typing pauses
  const onFilter = (e) => {
    const value = e.target.value.trim();
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      router.replace(`${base}/1${value ? `?q=${encodeURIComponent(value)}` : ''}`, {
        scroll: false,
      });
    }, 350);
  };

  const nearby = getNearbyLetters(letter);

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 pb-20 pt-10">
        <div className="mx-auto w-full max-w-7xl">
          {/* toolbar */}
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Get Verified US {mode.role === 'import' ? 'Import' : 'Export'}{' '}
              {mode.type === 'data' ? 'Data' : 'Companies'} by{' '}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                Product Category
              </span>
            </h2>
            <div className="relative w-full sm:w-72">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-white/40"
                aria-hidden="true"
              />
              <input
                type="search"
                defaultValue={q}
                onChange={onFilter}
                placeholder={`Filter products under ${letter.toUpperCase()}`}
                aria-label="Filter products"
                className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#B31942]/30 dark:border-white/10 dark:bg-white/10 dark:text-white dark:placeholder:text-white/40"
              />
            </div>
          </div>

          {items.length > 0 ? (
            <>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {items.map((p, i) => (
                  <ProductCard key={p.slug} product={p} mode={mode} index={i} />
                ))}
              </ul>
              <p className="mt-6 text-center text-sm text-slate-500 dark:text-white/55">
                {q ? `${total} of ${totalAll}` : totalAll} {totalAll === 1 ? 'product' : 'products'}{' '}
                starting with {letter.toUpperCase()}
              </p>
            </>
          ) : (
            <div className="mx-auto max-w-xl rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-white/15 dark:bg-white/5">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A3161]/10 text-[#0A3161] dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff]">
                <SearchX className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                {q
                  ? `No products match “${q}”`
                  : `No products start with ${letter.toUpperCase()} yet`}
              </h3>
              <p className="mt-2 text-slate-600 dark:text-white/65">
                {q ? 'Try a different word.' : 'Try one of the nearby letters:'}
              </p>
              {!q && (
                <div className="mt-4 flex justify-center gap-2">
                  {nearby.map((l) => (
                    <Link
                      key={l}
                      href={ddPath(modeSlug, l, 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-[#B31942] to-[#0A3161] text-sm font-bold text-white shadow-md transition hover:scale-105"
                    >
                      {l.toUpperCase()}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} base={base} qs={qs} />
        </div>
      </section>
    </MotionConfig>
  );
}
