import { Suspense } from 'react';
import { notFound, permanentRedirect } from 'next/navigation';

import CdHero from '@/components/company-directory/CdHero';
import CdRoleSwitcher from '@/components/company-directory/CdRoleSwitcher';
import CdCompanyList from '@/components/company-directory/CdCompanyList';
import DdLetterStrip from '@/components/data-directory/DdLetterStrip';

import {
  DIR_LETTERS,
  dirTitle,
  getCompanies,
  getLetterCounts,
  getNearbyLetters,
  parseDirRole,
} from '@/data/companyDirectoryData';

const SITE_URL = 'https://usimportdata.com';

// Validate and load route data
function loadRoute({ role: slug, letter: rawLetter, page }) {
  const role = parseDirRole(slug);
  const letter = String(rawLetter).toLowerCase();

  if (!role || !DIR_LETTERS.includes(letter) || !/^\d+$/.test(page)) {
    return null;
  }

  // Redirect uppercase letters to lowercase URLs
  if (rawLetter !== letter) {
    permanentRedirect(`/company-directory/${slug}/${letter}/${page}`);
  }

  const pageNum = Number(page);

  if (pageNum < 1) return null;

  const data = getCompanies({ role, letter, page: pageNum });

  if (pageNum > data.totalPages) return null;

  return { slug, role, letter, pageNum, data };
}

// SEO metadata
export async function generateMetadata({ params }) {
  const routeParams = await params;
  const r = loadRoute(routeParams);

  if (!r) return {};

  const { slug, role, letter, pageNum, data } = r;
  const title = dirTitle(role, letter);

  return {
    title: `${title} - Page ${pageNum} | USImportdata`,
    description: `${title}. Browse US ${role === 'export' ? 'exporters' : 'importers'} A to Z and open a company to see its trade profile.`,
    alternates: {
      canonical: `${SITE_URL}/company-directory/${slug}/${letter}/${pageNum}`,
    },
    robots: data.total === 0 ? { index: false, follow: true } : undefined,
  };
}

// Route page
export default function Page({ params }) {
  return (
    <Suspense fallback={<CdPageSkeleton />}>
      <CdPageContent params={params} />
    </Suspense>
  );
}

// Async content inside Suspense
async function CdPageContent({ params }) {
  const routeParams = await params;
  const r = loadRoute(routeParams);

  if (!r) notFound();

  const { role, letter, slug, pageNum, data } = r;

  return (
    <>
      <CdHero role={role} letter={letter} total={data.total} />

      <div className="px-4">
        <CdRoleSwitcher role={role} letter={letter} />
      </div>

      <DdLetterStrip
        basePath={`/company-directory/${slug}`}
        letter={letter}
        counts={getLetterCounts(role)}
        letters={DIR_LETTERS}
      />

      <CdCompanyList
        role={role}
        letter={letter}
        items={data.items}
        total={data.total}
        page={pageNum}
        totalPages={data.totalPages}
        base={`/company-directory/${slug}/${letter}`}
        nearby={data.total === 0 ? getNearbyLetters(role, letter) : []}
      />
    </>
  );
}

// Suspense fallback
function CdPageSkeleton() {
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

        <div className="mt-10 space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-slate-200 dark:bg-white/10" />
          ))}
        </div>
      </section>
    </main>
  );
}
