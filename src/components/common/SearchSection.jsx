'use client';

import { useState } from 'react';
import AnimatedText from '../utils/AnimatedText';

const TRADE_TYPES = [
  { id: 'import', label: 'Import' },
  { id: 'export', label: 'Export' },
];

const RESULT_TYPES = [
  { id: 'data', label: 'Shipment Data' },
  { id: 'company', label: 'Companies' },
];

const SEARCH_BY = {
  product: {
    label: 'Product',
    placeholder: 'e.g. Cotton T-shirts, LED lights',
    examples: ['Cotton fabric', 'LED lights', 'Solar panels'],
  },
  hs: {
    label: 'HS Code',
    placeholder: 'e.g. 8517 or 85171300',
    examples: ['8517', '6109', '850760'],
  },
  company: {
    label: 'Company Name',
    placeholder: 'e.g. Apple Inc., Tata Motors',
    examples: ['Apple', 'Tesla', 'Walmart'],
  },
};

const COUNTRIES = [
  'All Countries',
  'China',
  'India',
  'Vietnam',
  'Mexico',
  'Germany',
  'Japan',
  'South Korea',
  'United Kingdom',
  'Netherlands',
  'Brazil',
  'United Arab Emirates',
  'Singapore',
  'Canada',
];

function Segmented({ label, options, value, onChange }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-500 dark:text-slate-400">
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
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
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

/**
 * Props:
 * - onSearch(query): called with { tradeType, resultType, searchBy, term, country }.
 *   If omitted, the browser goes to /search?<query as URL params>.
 */
export default function SearchSection({ onSearch }) {
  const [tradeType, setTradeType] = useState('import');
  const [resultType, setResultType] = useState('data');
  const [searchBy, setSearchBy] = useState('product');
  const [term, setTerm] = useState('');
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [error, setError] = useState('');

  const field = SEARCH_BY[searchBy];

  const changeSearchBy = (id) => {
    setSearchBy(id);
    setTerm('');
    setError('');
  };

  const changeTerm = (value) => {
    setTerm(searchBy === 'hs' ? value.replace(/\D/g, '').slice(0, 10) : value);
    if (error) setError('');
  };

  const submit = (e) => {
    e.preventDefault();

    const clean = term.trim();

    if (!clean) {
      setError(`Please enter a ${field.label.toLowerCase()} to search.`);
      return;
    }

    if (searchBy === 'hs' && clean.length < 2) {
      setError('HS code must be at least 2 digits.');
      return;
    }

    const query = { tradeType, resultType, searchBy, term: clean, country };

    if (onSearch) {
      onSearch(query);
    } else {
      window.location.assign(`/search?${new URLSearchParams(query).toString()}`);
    }
  };

  return (
    <section className="bg-[#f6f9fe] px-6 py-16 transition-colors duration-300 dark:bg-[#0b1120] lg:px-10 lg:py-20">
      <div className="mx-auto max-w-5xl">
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
            Look up shipments by product, HS code or company, and filter by trade direction and
            partner country.
          </p>
        </div>

        <form
          onSubmit={submit}
          noValidate
          className="mt-10 rounded-3xl border border-neutral-200 bg-white p-5 shadow-[0_10px_40px_rgba(20,20,60,0.07)] transition-colors duration-300 dark:border-slate-700 dark:bg-[#111c30] dark:shadow-[0_10px_40px_rgba(0,0,0,0.2)] sm:p-8"
        >
          {/* Row 1: toggles */}
          <div className="flex flex-wrap items-end gap-x-8 gap-y-5">
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

            <Segmented
              label="Search by"
              options={Object.entries(SEARCH_BY).map(([id, v]) => ({
                id,
                label: v.label,
              }))}
              value={searchBy}
              onChange={changeSearchBy}
            />
          </div>

          {/* Row 2: inputs */}
          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_220px_auto]">
            <div>
              <label htmlFor="trade-term" className="sr-only">
                {field.label}
              </label>

              <input
                id="trade-term"
                type="text"
                inputMode={searchBy === 'hs' ? 'numeric' : 'text'}
                value={term}
                onChange={(e) => changeTerm(e.target.value)}
                placeholder={field.placeholder}
                aria-invalid={!!error}
                aria-describedby={error ? 'trade-error' : undefined}
                className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:ring-4 focus:ring-[#5DBAF6]/25 dark:bg-slate-800 dark:text-white dark:placeholder:text-slate-500 ${
                  error
                    ? 'border-red-400 focus:border-red-400 dark:border-red-400'
                    : 'border-neutral-200 focus:border-[#5DBAF6] dark:border-slate-700 dark:focus:border-blue-400'
                }`}
              />
            </div>

            <div>
              <label htmlFor="trade-country" className="sr-only">
                Country
              </label>

              <select
                id="trade-country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-900 outline-none transition focus:border-[#5DBAF6] focus:ring-4 focus:ring-[#5DBAF6]/25 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-400"
              >
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#1a1a3a] px-7 text-sm font-medium text-white transition hover:bg-[#2a2a55] focus:outline-none focus:ring-4 focus:ring-[#5DBAF6]/40 dark:bg-emerald-500 dark:hover:bg-emerald-400 dark:focus:ring-emerald-400/30"
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

          {/* Quick examples */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-neutral-500 dark:text-slate-400">
            <span>Try:</span>

            {field.examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => changeTerm(ex)}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-neutral-700 transition hover:border-[#5DBAF6] hover:text-neutral-950 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-blue-400 dark:hover:text-white"
              >
                {ex}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}
