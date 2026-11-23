import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import ComingSoon from '@/components/common/ComingSoon';
import { comingSoonFor } from '@/data/comingSoon';

/*
  Catch-all for pages that are not built yet. Real pages always win over this route.
  Only the paths listed in data/comingSoon.js show "Coming Soon"; everything else is a normal 404.
*/

// Metadata stays outside the page's Suspense boundary.
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = comingSoonFor(slug);

  if (!page) return {};

  return {
    title: `${page.title} - Coming Soon | USImportdata`,
    robots: { index: false, follow: true }, // do not index a placeholder
  };
}

// Synchronous route component: it only renders the Suspense boundary.
export default function Page({ params }) {
  return (
    <Suspense fallback={<ComingSoonFallback />}>
      <ComingSoonContent params={params} />
    </Suspense>
  );
}

// The route params are read inside Suspense.
async function ComingSoonContent({ params }) {
  const { slug } = await params;
  const page = comingSoonFor(slug);

  if (!page) notFound();

  return (
    <ComingSoon title={page.title} text={page.text} stage={page.stage} features={page.features} />
  );
}

// Shown for a moment while the params load: a quiet placeholder in the same shape as the hero.
function ComingSoonFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4" aria-hidden="true">
      <div className="flex w-full max-w-md animate-pulse flex-col items-center gap-5">
        <div className="h-24 w-24 rounded-full bg-slate-200 dark:bg-white/10" />
        <div className="h-6 w-32 rounded-full bg-slate-200 dark:bg-white/10" />
        <div className="h-12 w-3/4 rounded-xl bg-slate-200 dark:bg-white/10" />
        <div className="h-4 w-2/3 rounded-full bg-slate-200 dark:bg-white/10" />
      </div>
    </div>
  );
}
