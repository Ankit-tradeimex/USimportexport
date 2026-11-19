import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import HsOverview from '@/components/hs/HsOverview';
import { MODES, modeLabel, parseMode } from '@/data/hsDirectoryData';

const SITE_URL = 'https://usimportdata.com';

// export function generateStaticParams() {
//   return MODES.map((mode) => ({ mode }));
// }

export async function generateMetadata({ params }) {
  const { mode } = await params;
  const m = parseMode(mode);

  if (!m) return {};

  const label = modeLabel(m);

  return {
    title: `${label} – HS Code Directory by Chapter | USImportdata`,
    description: `Browse HS codes by section and chapter and open any code to see ${label} information from US trade data.`,
    alternates: {
      canonical: `${SITE_URL}/hs-code-directory/${mode}`,
    },
  };
}

// Page shell: does not access params directly.
export default function Page({ params }) {
  return (
    <Suspense fallback={<HsOverviewSkeleton />}>
      <HsOverviewContent params={params} />
    </Suspense>
  );
}

// URL params are accessed inside Suspense.
async function HsOverviewContent({ params }) {
  const { mode } = await params;
  const m = parseMode(mode);

  if (!m) notFound();

  return <HsOverview modeKey={mode} mode={m} />;
}

function HsOverviewSkeleton() {
  return (
    <main className="min-h-screen animate-pulse">
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-5 h-4 w-40 rounded bg-neutral-200 dark:bg-slate-800" />
        <div className="mb-4 h-10 w-2/3 rounded-lg bg-neutral-200 dark:bg-slate-800" />
        <div className="mb-10 h-5 w-full max-w-2xl rounded bg-neutral-200 dark:bg-slate-800" />

        <div className="grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-36 rounded-2xl bg-neutral-200 dark:bg-slate-800" />
          ))}
        </div>
      </div>
    </main>
  );
}
