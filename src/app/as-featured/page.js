import { Suspense } from 'react';
import Link from 'next/link';

import FeaturedListHero from '@/components/featured/FeaturedListHero';
import FeaturedGrid from '@/components/featured/FeaturedGrid';

import { SITE_URL, getFeaturedList } from '@/lib/featured';

/* /as-featured : every publication that featured USImportdata */

export const metadata = {
  title: 'USImportData Media Coverage | USImportdata',
  description:
    'USImportData.com has been referenced by leading global media platforms, financial publications, and policy analysts for accurate, shipment-level trade data and market intelligence.',
  alternates: { canonical: `${SITE_URL}/as-featured` },
};

// Synchronous route component: it only renders the Suspense boundary.
export default function Page() {
  return (
    <Suspense fallback={<ListFallback />}>
      <FeaturedListContent />
    </Suspense>
  );
}

async function FeaturedListContent() {
  const items = await getFeaturedList();

  return (
    <>
      <FeaturedListHero count={items.length} />

      <section className="px-4 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl">
          <FeaturedGrid items={items} />
        </div>
      </section>

      {/* closing call to action (sample wording, needs your review) */}
      <section className="px-4 pb-20">
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-[#07071f] bg-linear-to-br from-[#0a0a2e] via-[#17104d] to-[#0a1a4a] p-8 text-center shadow-2xl sm:p-12">
          <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-[#B31942]/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-[#4da3ff]/25 blur-3xl" />

          <h2 className="relative text-2xl font-semibold text-white sm:text-4xl">
            Explore the data behind the headlines
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/70">
            Search shipment-level US import and export records, the same data that reporters and
            analysts rely on.
          </p>
          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <Link
              href="/search-live-data"
              className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0A1A4A] shadow-lg transition hover:scale-[1.03]"
            >
              Search Live Data
            </Link>
            <Link
              href="/contact-us"
              className="rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ListFallback() {
  return (
    <div className="animate-pulse" aria-hidden="true">
      <div className="h-80 rounded-b-[2.5rem] bg-slate-200 dark:bg-white/10" />
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-80 rounded-3xl bg-slate-200 dark:bg-white/10" />
        ))}
      </div>
    </div>
  );
}
