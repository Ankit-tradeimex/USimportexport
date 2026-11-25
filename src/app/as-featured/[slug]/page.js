import { Suspense } from 'react';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';

import FeaturedDetail from '@/components/featured/FeaturedDetail';
import FeaturedGrid from '@/components/featured/FeaturedGrid';

import { FEATURED_LIST_PATH } from '@/data/featuredData';
import { SITE_URL, getFeatured, getFeaturedList, hostOf } from '@/lib/featured';

/* /as-featured/qz : one publication, with the screenshot of the page where it was published */

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const item = await getFeatured(slug.toLowerCase());
  if (!item) return {};

  return {
    title: `${item.metaTitle || `${item.name} Coverage`} | USImportdata`,
    description: item.description || item.summary || undefined,
    alternates: { canonical: `${SITE_URL}${FEATURED_LIST_PATH}/${item.slug}` },
  };
}

// Synchronous route component: it only renders the Suspense boundary.
export default function Page({ params }) {
  return (
    <Suspense fallback={<DetailFallback />}>
      <FeaturedContent params={params} />
    </Suspense>
  );
}

async function FeaturedContent({ params }) {
  const { slug } = await params;

  // uppercase in the URL goes to the lowercase one
  if (slug !== slug.toLowerCase()) permanentRedirect(`${FEATURED_LIST_PATH}/${slug.toLowerCase()}`);

  const item = await getFeatured(slug);
  if (!item) notFound();

  // the next three publications after this one
  const all = await getFeaturedList();
  const at = all.findIndex((f) => f.slug === item.slug);
  const more = Array.from(
    { length: Math.min(3, all.length - 1) },
    (_, i) => all[(at + 1 + i) % all.length],
  );

  return (
    <>
      <FeaturedDetail item={item} host={hostOf(item.url)} />

      {more.length > 0 && (
        <section className="px-4 pb-14">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
              <h2 className="font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                More coverage
              </h2>
              <Link
                href={FEATURED_LIST_PATH}
                className="text-sm font-semibold text-[#B31942] transition hover:underline dark:text-[#ff8da0]"
              >
                View all
              </Link>
            </div>
            <FeaturedGrid items={more} />
          </div>
        </section>
      )}
    </>
  );
}

function DetailFallback() {
  return (
    <div className="mx-auto w-full max-w-5xl animate-pulse px-4 py-16" aria-hidden="true">
      <div className="mx-auto h-36 w-64 rounded-2xl bg-slate-200 dark:bg-white/10" />
      <div className="mx-auto mt-8 h-12 w-2/3 rounded-2xl bg-slate-200 dark:bg-white/10" />
      <div className="mx-auto mt-5 h-4 w-1/2 rounded-full bg-slate-200 dark:bg-white/10" />
      <div className="mt-14 h-96 rounded-2xl bg-slate-200 dark:bg-white/10" />
    </div>
  );
}
