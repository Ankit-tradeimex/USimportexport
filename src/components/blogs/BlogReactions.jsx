'use client';

import { useEffect, useState } from 'react';
import { Heart, Lightbulb, Target, ThumbsUp } from 'lucide-react';

const REACTIONS = [
  {
    id: 'helpful',
    label: 'Helpful',
    emoji: '👍',
    icon: ThumbsUp,
  },
  {
    id: 'love',
    label: 'Love',
    emoji: '❤️',
    icon: Heart,
  },
  {
    id: 'insightful',
    label: 'Insightful',
    emoji: '💡',
    icon: Lightbulb,
  },
  {
    id: 'valuable',
    label: 'Valuable',
    emoji: '🎯',
    icon: Target,
  },
];

export default function BlogReactions({ slug }) {
  const storageKey = `blog-reactions-${slug}`;

  const [myReaction, setMyReaction] = useState(null);
  const [counts, setCounts] = useState({
    helpful: 0,
    love: 0,
    insightful: 0,
    valuable: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        const parsed = JSON.parse(saved);

        if (
          REACTIONS.some((reaction) => reaction.id === parsed.myReaction) &&
          parsed.counts &&
          typeof parsed.counts === 'object'
        ) {
          setMyReaction(parsed.myReaction);

          setCounts((current) => ({
            ...current,
            ...Object.fromEntries(
              Object.keys(current).map((key) => [
                key,
                Math.max(0, Number(parsed.counts[key]) || 0),
              ]),
            ),
          }));
        }
      }
    } catch (error) {
      console.error('Unable to load blog reactions:', error);
    }

    setMounted(true);
  }, [storageKey]);

  const handleReaction = (reactionId) => {
    if (!mounted) return;

    const nextCounts = { ...counts };
    let nextReaction = reactionId;

    if (myReaction === reactionId) {
      nextCounts[reactionId] = Math.max(0, nextCounts[reactionId] - 1);

      nextReaction = null;
    } else {
      if (myReaction) {
        nextCounts[myReaction] = Math.max(0, nextCounts[myReaction] - 1);
      }

      nextCounts[reactionId] += 1;
    }

    setCounts(nextCounts);
    setMyReaction(nextReaction);

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({
          myReaction: nextReaction,
          counts: nextCounts,
        }),
      );
    } catch (error) {
      console.error('Unable to save blog reactions:', error);
    }
  };

  const totalReactions = Object.values(counts).reduce((total, count) => total + count, 0);

  return (
    <section className="my-12 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-white/10 dark:bg-slate-900/60 sm:p-8">
      <div className="text-center">
        <span className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0A3161] dark:bg-blue-400/10 dark:text-blue-300">
          YOUR FEEDBACK MATTERS
        </span>

        <h3 className="text-xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-2xl">
          How did you find this article?
        </h3>

        <p className="mt-2 text-sm text-neutral-500 dark:text-slate-400">
          Let us know what you think about this article.
        </p>
      </div>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        {REACTIONS.map((reaction) => {
          const active = myReaction === reaction.id;
          const Icon = reaction.icon;

          return (
            <button
              key={reaction.id}
              type="button"
              onClick={() => handleReaction(reaction.id)}
              disabled={!mounted}
              aria-pressed={active}
              className={`group flex min-w-[105px] flex-col items-center gap-2 rounded-xl border px-4 py-4 transition-all duration-200 ${
                active
                  ? 'border-[#0A3161] bg-blue-50 shadow-sm dark:border-blue-400/60 dark:bg-blue-400/10'
                  : 'border-neutral-200 bg-white hover:border-blue-300 hover:bg-blue-50/50 dark:border-white/10 dark:bg-slate-950/40 dark:hover:border-blue-400/40 dark:hover:bg-blue-400/5'
              }`}
            >
              <span className="text-2xl" aria-hidden="true">
                {reaction.emoji}
              </span>

              <span
                className={`text-xs font-semibold ${
                  active
                    ? 'text-[#0A3161] dark:text-blue-300'
                    : 'text-neutral-600 dark:text-slate-300'
                }`}
              >
                {reaction.label}
              </span>

              <span className="text-xs font-medium tabular-nums text-neutral-400 dark:text-slate-500">
                {counts[reaction.id]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <p className="text-xs text-neutral-400 dark:text-slate-500">
          {totalReactions} {totalReactions === 1 ? 'reaction' : 'reactions'}
        </p>

        {myReaction && (
          <p className="mt-2 text-sm font-medium text-[#0A3161] dark:text-blue-300">
            Thanks for sharing your feedback!
          </p>
        )}
      </div>
    </section>
  );
}
