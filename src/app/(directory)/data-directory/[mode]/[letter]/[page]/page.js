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

// Read and validate everything from the URL in one place.
async function load({ params, searchParams }) {
  const [{ mode, letter: rawLetter, page }, sp] = await Promise.all([params, searchParams]);

  const m = parseDdMode(mode);
  const letter = String(rawLetter).toLowerCase();
  const pageNum = Number(page);

  if (!m || !LETTERS.includes(letter) || !Number.isInteger(pageNum) || pageNum < 1) {
    return null;
  }

  const q = typeof sp?.q === 'string' ? sp.q.slice(0, 60) : '';

  const data = getProducts({
    letter,
    q,
    page: pageNum,
  });

  if (pageNum > data.totalPages) return null;

  return { mode, m, letter, pageNum, q, data };
}

export async function generateMetadata(props) {
  const r = await load(props);

  if (!r) return {};

  const { mode, m, letter, pageNum, q, data } = r;

  const title = ddTitle(m, letter);

  return {
    title: `${title} - Page ${pageNum} | USImportdata`,
    description: `${title}. Browse products by letter and open any product to see verified US ${m.role} ${m.type === 'data' ? 'data' : 'companies'}.`,
    alternates: {
      canonical: `${SITE_URL}/data-directory/${mode}/${letter}/${pageNum}`,
    },
    // Keep empty and filtered pages out of search results.
    robots: data.totalAll === 0 || q ? { index: false, follow: true } : undefined,
  };
}

// Synchronous page shell.
export default function Page(props) {
  return (
    <Suspense fallback={<DdPageSkeleton />}>
      <DdPageContent props={props} />
    </Suspense>
  );
}

// URL-dependent rendering inside Suspense.
async function DdPageContent({ props }) {
  const r = await load(props);

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

      <DdLetterStrip modeSlug={mode} letter={letter} counts={getLetterCounts()} />

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

function DdPageSkeleton() {
  return (
    <main className="min-h-screen animate-pulse">
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-5 h-4 w-40 rounded bg-neutral-200 dark:bg-slate-800" />

        <div className="mb-4 h-10 w-2/3 rounded-lg bg-neutral-200 dark:bg-slate-800" />

        <div className="mb-8 h-5 w-full max-w-2xl rounded bg-neutral-200 dark:bg-slate-800" />

        <div className="mb-8 h-32 rounded-2xl bg-neutral-200 dark:bg-slate-800" />

        <div className="mb-8 h-12 rounded-xl bg-neutral-200 dark:bg-slate-800" />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="h-48 rounded-2xl bg-neutral-200 dark:bg-slate-800" />
          ))}
        </div>
      </div>
    </main>
  );
}
