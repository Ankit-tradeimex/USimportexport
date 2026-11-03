"use client";

import { useState } from "react";

const TRADE_TYPES = [
  { id: "import", label: "Import" },
  { id: "export", label: "Export" },
];

const RESULT_TYPES = [
  { id: "data", label: "Shipment Data" },
  { id: "company", label: "Companies" },
];

const SEARCH_BY = {
  product: {
    label: "Product",
    placeholder: "e.g. Cotton T-shirts, LED lights",
    examples: ["Cotton fabric", "LED lights", "Solar panels"],
  },
  hs: {
    label: "HS Code",
    placeholder: "e.g. 8517 or 85171300",
    examples: ["8517", "6109", "850760"],
  },
  company: {
    label: "Company Name",
    placeholder: "e.g. Apple Inc., Tata Motors",
    examples: ["Apple", "Tesla", "Walmart"],
  },
};

const COUNTRIES = [
  "All Countries",
  "China",
  "India",
  "Vietnam",
  "Mexico",
  "Germany",
  "Japan",
  "South Korea",
  "United Kingdom",
  "Netherlands",
  "Brazil",
  "United Arab Emirates",
  "Singapore",
  "Canada",
];

function Segmented({ label, options, value, onChange }) {
  return (
    <div>
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-neutral-500">
        {label}
      </p>
      <div
        role="group"
        aria-label={label}
        className="inline-flex rounded-xl border border-neutral-200 bg-neutral-100 p-1"
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
                  ? "bg-[#1a1a3a] text-white shadow"
                  : "text-neutral-600 hover:text-neutral-900"
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
 *  - onSearch(query): called with { tradeType, resultType, searchBy, term, country }.
 *    If omitted, the browser goes to /search?<query as URL params>.
 */
export default function SearchSection({ onSearch }) {
  const [tradeType, setTradeType] = useState("import");
  const [resultType, setResultType] = useState("data");
  const [searchBy, setSearchBy] = useState("product");
  const [term, setTerm] = useState("");
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [error, setError] = useState("");

  const field = SEARCH_BY[searchBy];

  const changeSearchBy = (id) => {
    setSearchBy(id);
    setTerm("");
    setError("");
  };

  const changeTerm = (value) => {
    // HS codes are digits only (max 10)
    setTerm(searchBy === "hs" ? value.replace(/\D/g, "").slice(0, 10) : value);
    if (error) setError("");
  };

  const submit = (e) => {
    e.preventDefault();
    const clean = term.trim();
    if (!clean) {
      setError(`Please enter a ${field.label.toLowerCase()} to search.`);
      return;
    }
    if (searchBy === "hs" && clean.length < 2) {
      setError("HS code must be at least 2 digits.");
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
    <section className="bg-[#f6f9fe] px-6 py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600">
            Trade Data Search
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
            Search U.S. import and export data
          </h2>
          <p className="mt-3 text-sm text-neutral-600">
            Look up shipments by product, HS code or company, and filter by
            trade direction and partner country.
          </p>
        </div>

        <form
          onSubmit={submit}
          noValidate
          className="mt-10 rounded-3xl border border-neutral-200 bg-white p-5 shadow-[0_10px_40px_rgba(20,20,60,0.07)] sm:p-8"
        >
          {/* row 1: toggles */}
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

          {/* row 2: inputs */}
          <div className="mt-6 grid gap-3 md:grid-cols-[1fr_220px_auto]">
            <div>
              <label htmlFor="trade-term" className="sr-only">
                {field.label}
              </label>
              <input
                id="trade-term"
                type="text"
                inputMode={searchBy === "hs" ? "numeric" : "text"}
                value={term}
                onChange={(e) => changeTerm(e.target.value)}
                placeholder={field.placeholder}
                aria-invalid={!!error}
                aria-describedby={error ? "trade-error" : undefined}
                className={`h-12 w-full rounded-xl border bg-white px-4 text-sm text-neutral-900 outline-none transition placeholder:text-neutral-400 focus:ring-4 focus:ring-[#5DBAF6]/25 ${
                  error
                    ? "border-red-400 focus:border-red-400"
                    : "border-neutral-200 focus:border-[#5DBAF6]"
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
                className="h-12 w-full rounded-xl border border-neutral-200 bg-white px-3 text-sm text-neutral-900 outline-none transition focus:border-[#5DBAF6] focus:ring-4 focus:ring-[#5DBAF6]/25"
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
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#1a1a3a] px-7 text-sm font-medium text-white transition hover:bg-[#2a2a55] focus:outline-none focus:ring-4 focus:ring-[#5DBAF6]/40"
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

          {/* quick examples */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-neutral-500">
            <span>Try:</span>
            {field.examples.map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => changeTerm(ex)}
                className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-neutral-700 transition hover:border-[#5DBAF6] hover:text-neutral-950"
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