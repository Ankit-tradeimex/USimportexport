import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import HsChapterHeader from '@/components/hs/HsChapterHeader';
import HsModeSwitcher from '@/components/hs/HsModeSwitcher';
import HsCodeExplorer from '@/components/hs/HsCodeExplorer';

import {
  SECTIONS,
  getAdjacentChapters,
  getChapterBySlug,
  getCodePage,
  getHeadingCount,
  modeLabel,
  parseMode,
} from '@/data/hsDirectoryData';

const SITE_URL = 'https://usimportdata.com';

// Read and validate everything from the URL in one place.
async function load({ params, searchParams }) {
  const [{ mode, chapter: slug, page }, sp] = await Promise.all([params, searchParams]);

  const m = parseMode(mode);
  const chapter = getChapterBySlug(slug);
  const pageNum = Number(page);

  if (!m || !chapter || !Number.isInteger(pageNum) || pageNum < 1) {
    return null;
  }

  const q = typeof sp?.q === 'string' ? sp.q.slice(0, 60) : '';

  const data = getCodePage({
    chapter: chapter.number,
    q,
    page: pageNum,
  });

  if (pageNum > data.totalPages) return null;

  return { mode, m, chapter, pageNum, q, data };
}

export async function generateMetadata(props) {
  const r = await load(props);

  if (!r) return {};

  const { mode, m, chapter, pageNum, data, q } = r;

  const title = `${modeLabel(m)} – HS Code List (Chapter ${chapter.code}: ${chapter.title} - ${pageNum}) | USImportdata`;

  return {
    title,
    description: `HS code list for Chapter ${chapter.code} (${chapter.title}). Browse the codes and open any one to see ${modeLabel(m)} information from US trade data.`,
    alternates: {
      canonical: `${SITE_URL}/hs-code-directory/${mode}/us-hs-code-list/${chapter.slug}/${pageNum}`,
    },
    // Keep thin pages and filtered pages out of search results.
    robots: data.totalAll === 0 || q ? { index: false, follow: true } : undefined,
  };
}

// Synchronous page shell.
export default function Page(props) {
  return (
    <Suspense fallback={<HsChapterSkeleton />}>
      <HsChapterContent props={props} />
    </Suspense>
  );
}

// All URL-dependent rendering happens inside Suspense.
async function HsChapterContent({ props }) {
  const r = await load(props);

  if (!r) notFound();

  const { mode, m, chapter, pageNum, q, data } = r;

  const { prev, next } = getAdjacentChapters(chapter);

  const section = SECTIONS.find((s) => s.id === chapter.section);

  return (
    <>
      <HsChapterHeader
        mode={m}
        modeKey={mode}
        chapter={chapter}
        section={section}
        prev={prev}
        next={next}
        stats={{
          codes: data.totalAll,
          headings: getHeadingCount(chapter.number),
        }}
        page={pageNum}
        totalPages={data.totalPages}
      />

      <div className="px-4">
        <HsModeSwitcher mode={m} chapter={chapter} />
      </div>

      <div className="pt-12">
        <HsCodeExplorer
          modeKey={mode}
          mode={m}
          chapter={chapter}
          groups={data.groups}
          total={data.total}
          totalAll={data.totalAll}
          page={pageNum}
          totalPages={data.totalPages}
          q={q}
        />
      </div>
    </>
  );
}

function HsChapterSkeleton() {
  return (
    <main className="min-h-screen animate-pulse">
      <div className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-5 h-4 w-44 rounded bg-neutral-200 dark:bg-slate-800" />

        <div className="mb-4 h-10 w-2/3 rounded-lg bg-neutral-200 dark:bg-slate-800" />

        <div className="mb-8 h-5 w-full max-w-2xl rounded bg-neutral-200 dark:bg-slate-800" />

        <div className="mb-8 h-32 rounded-2xl bg-neutral-200 dark:bg-slate-800" />

        <div className="mb-6 h-12 rounded-xl bg-neutral-200 dark:bg-slate-800" />

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((item) => (
            <div key={item} className="h-16 rounded-xl bg-neutral-200 dark:bg-slate-800" />
          ))}
        </div>
      </div>
    </main>
  );
}
