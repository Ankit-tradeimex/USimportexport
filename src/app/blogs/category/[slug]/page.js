import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import ArchiveHeader from '@/components/blogs/ArchiveHeader';
import BlogShell from '@/components/blogs/BlogShell';
import BlogList from '@/components/blogs/BlogList';

import { CATEGORIES, getCategoryBySlug, getPosts, getSidebarData } from '@/data/blogData';

const SITE_URL = 'https://usimportdata.com';
const PER_PAGE = 10;

// Pre-build every category archive.
export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

// SEO metadata for each category.
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: 'Category not found | USimportdata',
    };
  }

  return {
    title: `${category.name} Articles | USimportdata Blogs`,
    description: category.description,

    alternates: {
      canonical: `${SITE_URL}/blogs/category/${category.slug}`,
    },
  };
}

// Async category archive content.
async function BlogCategoryContent({ params, searchParams }) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);

  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const { posts, page, totalPages, total } = getPosts({
    category: slug,
    page: sp?.page,
    perPage: PER_PAGE,
  });

  const { categories } = getSidebarData();

  return (
    <>
      <ArchiveHeader
        type="category"
        title={category.name}
        description={category.description}
        total={total}
        chips={categories}
        activeSlug={slug}
        chipBase="/blogs/category"
      />

      <BlogShell>
        <BlogList
          posts={posts}
          page={page}
          totalPages={totalPages}
          basePath={`/blogs/category/${encodeURIComponent(slug)}`}
        />
      </BlogShell>
    </>
  );
}

// Main route component.
export default function BlogCategoryPage({ params, searchParams }) {
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
      <BlogCategoryContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
