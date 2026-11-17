import { Suspense } from 'react';
import { notFound } from 'next/navigation';

import PostHeader from '@/components/blogs/PostHeader';
import PostBody from '@/components/blogs/PostBody';
import RelatedPosts from '@/components/blogs/RelatedPosts';
import BlogShell from '@/components/blogs/BlogShell';

import {
  TAG_NAMES,
  getAllPosts,
  getPostBySlug,
  getPostContent,
  getRelatedPosts,
} from '@/data/blogData';

const SITE_URL = 'https://usimportdata.com';
const BLOG_PATH = '/blogs';

// Pre-build every sample post.
export function generateStaticParams() {
  return getAllPosts().map((post) => ({
    slug: post.slug,
  }));
}

// SEO metadata for each article.
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article not found | USimportdata',
    };
  }

  const postUrl = `${SITE_URL}${BLOG_PATH}/${post.slug}`;

  const imageUrl = post.image
    ? post.image.startsWith('http')
      ? post.image
      : `${SITE_URL}${post.image}`
    : null;

  return {
    title: `${post.title} | USimportdata Blog`,
    description: post.excerpt,

    alternates: {
      canonical: postUrl,
    },

    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      publishedTime: post.date,
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                width: 1920,
                height: 731,
              },
            ],
          }
        : {}),
    },
  };
}

// Async article content is separated from the route component.
async function BlogPostContent({ params }) {
  const { slug } = await params;

  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const content = getPostContent(post);
  const related = getRelatedPosts(slug, 2);

  const tags = (post.tags ?? []).map((tag) => ({
    slug: tag,
    name: TAG_NAMES[tag] ?? tag,
  }));

  const postUrl = `${SITE_URL}${BLOG_PATH}/${post.slug}`;

  const imageUrl = post.image
    ? post.image.startsWith('http')
      ? post.image
      : `${SITE_URL}${post.image}`
    : null;

  // Structured data for search engines.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    mainEntityOfPage: postUrl,

    author: {
      '@type': 'Organization',
      name: post.author ?? 'USimportdata Team',
    },

    publisher: {
      '@type': 'Organization',
      name: 'USimportdata',
    },

    ...(imageUrl ? { image: imageUrl } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
        }}
      />

      <PostHeader post={post} />

      <BlogShell>
        <PostBody post={post} content={content} tags={tags} />

        <RelatedPosts posts={related} />
      </BlogShell>
    </>
  );
}

// Main route component.
export default function BlogPostPage({ params }) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-7xl px-5 py-20">
          <div className="h-10 w-2/3 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800" />
          <div className="mt-6 h-5 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
          <div className="mt-12 h-96 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-900" />
        </div>
      }
    >
      <BlogPostContent params={params} />
    </Suspense>
  );
}
