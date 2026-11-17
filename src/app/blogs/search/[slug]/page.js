import { Suspense } from 'react';

import SearchHeader from '@/components/blogs/SearchHeader';
import BlogShell from '@/components/blogs/BlogShell';
import BlogList from '@/components/blogs/BlogList';
import { getPosts } from '@/data/blogData';

// const PER_PAGE = 10;

const decode = (s = '') => {
  try {
    return decodeURIComponent(s).trim();
  } catch {
    return String(s).trim();
  }
};

const readKeyword = (routeParams = {}) => {
  const raw = routeParams.query ?? Object.values(routeParams)[0] ?? '';

  return decode(Array.isArray(raw) ? raw.join(' ') : raw);
};

export async function generateMetadata({ params }) {
  const q = readKeyword(await params);

  return {
    title: `Search: ${q} | USimportdata Blogs`,
    robots: {
      index: false,
      follow: true,
    },
  };
}

async function BlogSearchContent({ params, searchParams }) {
  const [routeParams, sp] = await Promise.all([params, searchParams]);

  const q = readKeyword(routeParams);

  const { posts, page, totalPages, total } = getPosts({
    q,
    page: sp?.page,
    perPage: sp.perPage,
  });

  return (
    <>
      <SearchHeader query={q} total={total} />

      <BlogShell>
        <BlogList
          posts={posts}
          page={page}
          totalPages={totalPages}
          basePath={`/blogs/search/${encodeURIComponent(q)}`}
        />
      </BlogShell>
    </>
  );
}

export default function BlogSearchPage({ params, searchParams }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="h-10 w-64 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-72 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900"
              />
            ))}
          </div>
        </div>
      }
    >
      <BlogSearchContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
