'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { isValidHs, searchUrl } from '@/lib/dataSlug';
import AnimatedText from '../utils/AnimatedText';

const TRADE_TYPES = [
  { id: 'import', label: 'Import' },
  { id: 'export', label: 'Export' },
];

const RESULT_TYPES = [
  { id: 'data', label: 'Shipment Data' },
  { id: 'company', label: 'Companies' },
];

// each example fills BOTH fields
const EXAMPLES = [
  { product: 'Smartphones', hs: '851713' },
  { product: 'Cotton T-shirts', hs: '6109' },
  { product: 'Lithium batteries', hs: '850760' },
];

function Segmented({ label, options, value, onChange }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase text-center tracking-wide text-neutral-500 dark:text-slate-400">
        {label}
      </p>

      <div
        role="group"
        aria-label={label}
        className="inline-flex rounded-xl border border-neutral-200 bg-neutral-100 p-1 dark:border-slate-700 dark:bg-slate-800"
      >
        {options.map((o) => {
          const active = value === o.id;

          return (
            <button
              key={o.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.id)}
              className={`rounded-lg px-4 cursor-pointer py-2 text-sm font-medium transition ${
                active
                  ? 'bg-[#1a1a3a] text-white shadow dark:bg-emerald-500 dark:text-white'
                  : 'text-neutral-600 hover:text-neutral-900 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const inputClass = (invalid) =>
  `h-12 w-full rounded-xl border bg-white px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:ring-4 focus:ring-[#5DBAF6]/25 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 ${
    invalid
      ? 'border-red-400 focus:border-red-400 dark:border-red-400'
      : 'border-neutral-200 focus:border-[#5DBAF6] dark:border-slate-700 dark:focus:border-blue-400'
  }`;

export default function SearchSection({ onSearch }) {
  const router = useRouter();
  const [tradeType, setTradeType] = useState('import');
  const [resultType, setResultType] = useState('data');
  const [product, setProduct] = useState('');
  const [hs, setHs] = useState('');
  const [error, setError] = useState('');

  const changeHs = (value) => {
    setHs(value.replace(/\D/g, '').slice(0, 10));
    if (error) setError('');
  };

  const changeProduct = (value) => {
    setProduct(value);
    if (error) setError('');
  };

  const submit = (e) => {
    e.preventDefault();

    const cleanProduct = product.trim();

    // you can search with the product, the HS code, or both together
    if (!cleanProduct && !hs) {
      setError('Enter a product, an HS code, or both to search.');
      return;
    }

    // the data pages accept an HS code of 2, 4, 6, 8 or 10 digits
    if (hs && !isValidHs(hs)) {
      setError('HS code must have 2, 4, 6, 8 or 10 digits.');
      return;
    }

    const query = { tradeType, resultType };
    if (cleanProduct) query.product = cleanProduct;
    if (hs) query.hs = hs;

    if (onSearch) {
      onSearch(query);
    } else {
      router.push(searchUrl(query));
    }
  };

  const hsInvalid = !!error && error.startsWith('HS code');

  return (
    <section className="transition-colors duration-300 dark:bg-transparent">
      <div className="mx-auto max-w-3xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Trade Data Search
          </span>

          <AnimatedText
            text="Search U.S."
            highlight="import and export data"
            className="mt-5 text-3xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-4xl"
            delay={0.2}
            stagger={0.08}
            duration={0.7}
          />

          <p className="mt-3 text-sm text-neutral-600 dark:text-slate-400">
            Look up shipments by product, HS code or both, and filter by trade direction and partner
            country.
          </p>
        </div>

        <form
          onSubmit={submit}
          noValidate
          className="mt-10 rounded-3xl border border-neutral-200 bg-white p-5 shadow-[0_10px_40px_rgba(20,20,60,0.07)] transition-colors duration-300 dark:border-slate-700 dark:bg-[#111c30] dark:shadow-[0_10px_40px_rgba(0,0,0,0.2)] sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5">
            <Segmented
              label="Trade type"
              options={TRADE_TYPES}
              value={tradeType}
              onChange={setTradeType}
            />

            <Segmented
              label="Search for"
              options={RESULT_TYPES}
              value={resultType}
              onChange={setResultType}
            />
          </div>

          {/* Row 2: product + HS code (both can be filled) + search */}
          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_220px_auto]">
            <div>
              <label htmlFor="trade-product" className="sr-only">
                Product
              </label>

              <input
                id="trade-product"
                type="text"
                value={product}
                onChange={(e) => changeProduct(e.target.value)}
                placeholder="Product, e.g. Cotton T-shirts"
                aria-invalid={!!error && !hsInvalid}
                aria-describedby={error ? 'trade-error' : undefined}
                className={inputClass(!!error && !hsInvalid)}
              />
            </div>

            <div>
              <label htmlFor="trade-hs" className="sr-only">
                HS code
              </label>

              <input
                id="trade-hs"
                type="text"
                inputMode="numeric"
                value={hs}
                onChange={(e) => changeHs(e.target.value)}
                placeholder="HS code, e.g. 8517"
                aria-invalid={!!error && (hsInvalid || !product.trim())}
                aria-describedby={error ? 'trade-error' : undefined}
                className={inputClass(!!error && (hsInvalid || !product.trim()))}
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#1a1a3a] px-7 text-sm font-medium text-white transition hover:bg-[#2a2a55] focus:outline-none focus:ring-4 focus:ring-[#5DBAF6]/40 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:focus:ring-emerald-400/30"
            >
              Search
              <span aria-hidden="true">→</span>
            </button>
          </div>

          {error && (
            <p id="trade-error" role="alert" className="mt-2 text-xs text-red-500">
              {error}
            </p>
          )}

          {/* Quick examples: each fills both fields */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-slate-400">
            <span>Try:</span>

            {EXAMPLES.map((ex) => (
              <button
                key={ex.hs}
                type="button"
                onClick={() => {
                  setProduct(ex.product);
                  setHs(ex.hs);
                  setError('');
                }}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-neutral-700 transition hover:border-[#5DBAF6] hover:text-neutral-950 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-white"
              >
                {ex.product} · {ex.hs}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}
