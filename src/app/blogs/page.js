import { Suspense } from 'react';

import BlogHero from '@/components/blogs/BlogHero';
import BlogShell from '@/components/blogs/BlogShell';
import BlogGrid from '@/components/blogs/BlogGrid';
import { getPosts } from '@/data/blogData';

export const metadata = {
  title: 'Our Blogs - US Trade Data Blogs: Latest Trade Insights',
  description:
    'USImportData is a trusted source for US trade data and offers comprehensive insights into the import and export activities of the United States.',
  alternates: { canonical: '/blogs' },
};

// const PER_PAGE = 6;

// This component handles dynamic search parameters.
async function BlogContent({ searchParams }) {
  const sp = (await searchParams) ?? {};

  const q = typeof sp.q === 'string' ? sp.q : '';

  const { posts, page, totalPages, total } = getPosts({
    q,
    page: sp.page,
    perPage: sp.perPage,
  });

  return (
    <BlogShell>
      <BlogGrid
        posts={posts}
        page={page}
        totalPages={totalPages}
        params={{ q }}
        title={q ? `${total} result${total === 1 ? '' : 's'} for “${q}”` : 'Latest articles'}
      />
    </BlogShell>
  );
}

export default function BlogPage({ searchParams }) {
  return (
    <>
      <BlogHero />

      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-5 py-20">
            <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-80 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900"
                />
              ))}
            </div>
          </div>
        }
      >
        <BlogContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}
