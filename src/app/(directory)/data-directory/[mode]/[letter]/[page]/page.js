import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import DdHero from '@/components/data-directory/DdHero';
import DdModeSwitcher from '@/components/data-directory/DdModeSwitcher';
import DdLetterStrip from '@/components/data-directory/DdLetterStrip';
import DdProductGrid from '@/components/data-directory/DdProductGrid';

import {
  LETTERS,
  ddTitle,
  getLetterCounts,
  getProducts,
  parseDdMode,
} from '@/data/productDirectoryData';

const SITE_URL = 'https://usimportdata.com';

// Validate URL data in one place
function loadRoute({ mode, letter: rawLetter, page }, sp) {
  const m = parseDdMode(mode);
  const letter = String(rawLetter).toLowerCase();
  const pageNum = Number(page);

  if (!m || !LETTERS.includes(letter) || !Number.isInteger(pageNum) || pageNum < 1) {
    return null;
  }

  const q = typeof sp?.q === 'string' ? sp.q.slice(0, 60) : '';
  const data = getProducts({ letter, q, page: pageNum });

  if (pageNum > data.totalPages) return null;

  return { mode, m, letter, pageNum, q, data };
}

// SEO metadata
export async function generateMetadata({ params, searchParams }) {
  const [routeParams, sp] = await Promise.all([params, searchParams]);

  const r = loadRoute(routeParams, sp);

  if (!r) return {};

  const { mode, m, letter, pageNum, q, data } = r;
  const title = ddTitle(m, letter);

  return {
    title: `${title} - Page ${pageNum} | USImportdata`,
    description: `${title}. Browse products by letter and open any product to see verified US ${m.role} ${m.type === 'data' ? 'data' : 'companies'}.`,
    alternates: {
      canonical: `${SITE_URL}/data-directory/${mode}/${letter}/${pageNum}`,
    },
    robots: data.totalAll === 0 || q ? { index: false, follow: true } : undefined,
  };
}

// Route page
export default function Page({ params, searchParams }) {
  return (
    <Suspense fallback={<DdProductPageSkeleton />}>
      <DdProductPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}

// Async content inside Suspense
async function DdProductPageContent({ params, searchParams }) {
  const [routeParams, sp] = await Promise.all([params, searchParams]);

  const r = loadRoute(routeParams, sp);

  if (!r) notFound();

  const { mode, m, letter, pageNum, q, data } = r;

  return (
    <>
      <DdHero
        mode={m}
        modeSlug={mode}
        letter={letter}
        totalAll={data.totalAll}
        totalPages={data.totalPages}
      />

      <div className="px-4">
        <DdModeSwitcher mode={m} letter={letter} />
      </div>

      <DdLetterStrip
        basePath={`/data-directory/${mode}`}
        letter={letter}
        counts={getLetterCounts()}
      />

      <DdProductGrid
        modeSlug={mode}
        mode={m}
        letter={letter}
        items={data.items}
        total={data.total}
        totalAll={data.totalAll}
        page={pageNum}
        totalPages={data.totalPages}
        q={q}
      />
    </>
  );
}

// Suspense fallback
function DdProductPageSkeleton() {
  return (
    <main className="min-h-screen animate-pulse">
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="h-8 w-2/3 rounded-lg bg-slate-200 dark:bg-white/10" />
        <div className="mt-4 h-4 w-1/2 rounded bg-slate-200 dark:bg-white/10" />

        <div className="mt-10 h-12 w-full rounded-xl bg-slate-200 dark:bg-white/10" />

        <div className="mt-8 flex gap-3 overflow-hidden">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-10 min-w-16 rounded-lg bg-slate-200 dark:bg-white/10" />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-36 rounded-2xl bg-slate-200 dark:bg-white/10" />
          ))}
        </div>
      </section>
    </main>
  );
}
