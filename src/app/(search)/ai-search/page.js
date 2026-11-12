'use client';

import { useState } from 'react';

const suggestions = [
  'Find recent shipments from China',
  'Which suppliers ship electronics?',
  'Show import trends for the last year',
];

export default function AiSearchPage() {
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) setSubmittedQuery(trimmedQuery);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16 text-slate-900 sm:px-6">
      <section className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-xl text-white shadow-sm">
            ✦
          </div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-indigo-600">
            Import data, made simple
          </p>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            What would you like to find?
          </h1>
          <p className="mt-3 text-slate-600">
            Ask a question about suppliers, shipments, or trade activity.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-3 shadow-lg shadow-slate-200/60"
        >
          <label htmlFor="ai-search-query" className="sr-only">
            Search import data
          </label>
          <textarea
            id="ai-search-query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                event.currentTarget.form?.requestSubmit();
              }
            }}
            placeholder="Ask anything about import data..."
            rows={3}
            className="w-full resize-none border-0 bg-transparent px-3 py-2 text-base outline-none placeholder:text-slate-400 focus:ring-0"
          />
          <div className="flex items-center justify-between border-t border-slate-100 pt-3">
            <span className="px-3 text-xs text-slate-500">Press Enter to search</span>
            <button
              type="submit"
              disabled={!query.trim()}
              className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Search <>→</>
            </button>
          </div>
        </form>

        {submittedQuery ? (
          <div role="status" className="mt-8 rounded-xl border border-indigo-100 bg-indigo-50 p-5">
            <p className="text-sm font-semibold text-indigo-900">Search request</p>
            <p className="mt-1 text-slate-700">{submittedQuery}</p>
            <p className="mt-3 text-sm text-slate-600">
              Connect this page to your search service to display matching results.
            </p>
          </div>
        ) : (
          <div className="mt-8">
            <p className="mb-3 text-center text-sm font-medium text-slate-500">Try asking</p>
            <div className="flex flex-wrap justify-center gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setQuery(suggestion)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:border-indigo-300 hover:text-indigo-700"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
