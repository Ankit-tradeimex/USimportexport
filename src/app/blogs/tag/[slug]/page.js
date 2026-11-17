import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import ArchiveHeader from '@/components/blogs/ArchiveHeader';
import BlogShell from '@/components/blogs/BlogShell';
import BlogList from '@/components/blogs/BlogList';

import { TAG_NAMES, getPosts, getSidebarData, getTagBySlug } from '@/data/blogData';

const SITE_URL = 'https://usimportdata.com';
const PER_PAGE = 10;

// Pre-build every tag archive.
export function generateStaticParams() {
  return Object.keys(TAG_NAMES).map((slug) => ({ slug }));
}

// SEO metadata for each tag archive.
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const tag = getTagBySlug(slug);

  if (!tag) {
    return {
      title: 'Tag not found | USimportdata',
    };
  }

  return {
    title: `${tag.name} Articles | USimportdata Blogs`,
    description: `Articles tagged ${tag.name} on the USimportdata blog.`,

    alternates: {
      canonical: `${SITE_URL}/blogs/tag/${tag.slug}`,
    },
  };
}

// Async archive content.
async function BlogTagContent({ params, searchParams }) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);

  const tag = getTagBySlug(slug);

  if (!tag) {
    notFound();
  }

  const { posts, page, totalPages, total } = getPosts({
    tag: slug,
    page: sp?.page,
    perPage: PER_PAGE,
  });

  const { tags } = getSidebarData();

  return (
    <>
      <ArchiveHeader
        type="tag"
        title={tag.name}
        description={`Articles tagged ${tag.name}.`}
        total={total}
        chips={tags}
        activeSlug={slug}
        chipBase="/blogs/tag"
      />

      <BlogShell>
        <BlogList
          posts={posts}
          page={page}
          totalPages={totalPages}
          basePath={`/blogs/tag/${encodeURIComponent(slug)}`}
        />
      </BlogShell>
    </>
  );
}

// Main route component.
export default function BlogTagPage({ params, searchParams }) {
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
      <BlogTagContent params={params} searchParams={searchParams} />
    </Suspense>
  );
}
