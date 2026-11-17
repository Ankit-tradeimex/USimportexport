'use client';
import { MotionConfig } from 'framer-motion';
import { PostCard } from './BlogGrid';

/** "You may also like" row. Pass up to 3 posts; renders nothing if the list is empty. */
export default function RelatedPosts({ posts = [] }) {
  if (!posts.length) return null;

  return (
    <MotionConfig reducedMotion="user">
      <section aria-labelledby="related-heading" className="@container mt-16">
        <h2
          id="related-heading"
          className="mb-8 flex items-center gap-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white"
        >
          <span className="h-7 w-1.5 rounded-full bg-linear-to-b from-[#B31942] to-[#0A3161] dark:from-[#ff8da0] dark:to-[#7cc4ff]" />
          You may also like
        </h2>
        <div className="grid gap-6 @xl:grid-cols-1 @3xl:grid-cols-2">
          {posts.map((p, i) => (
            <PostCard key={p.slug} post={p} index={i} />
          ))}
        </div>
      </section>
    </MotionConfig>
  );
}
