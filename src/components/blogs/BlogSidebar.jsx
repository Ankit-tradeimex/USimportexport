'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Clock, Flame, Folder, Loader2, Mail, Tag } from 'lucide-react';
import { useBlogSidebarData } from './BlogProvider';
import { subscribeToNewsletter } from '@/lib/blogSidebar';

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */
const CARD =
  'rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl';

function Widget({ title, Icon, children, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay }}
      className={CARD}
    >
      <h3 className="flex items-center gap-2.5 text-base font-semibold text-slate-900 dark:text-white">
        <span className="h-5 w-1 rounded-full bg-linear-to-b from-[#B31942] to-[#0A3161] dark:from-[#ff8da0] dark:to-[#7cc4ff]" />
        {Icon && <Icon className="h-4 w-4 text-[#B31942] dark:text-[#ff8da0]" aria-hidden="true" />}
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </motion.section>
  );
}

const fmt = (d) =>
  d
    ? new Date(d).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      })
    : '';

function Thumb({ post }) {
  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-linear-to-br from-[#B31942] to-[#0A3161]">
      {post.image ? (
        <Image src={post.image} alt="" fill sizes="64px" className="object-cover" />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-lg font-bold text-white/80">
          {post.title?.[0] ?? 'B'}
        </span>
      )}
    </div>
  );
}

function Categories({ items }) {
  return (
    <Widget title="Categories" Icon={Folder} delay={0.05}>
      <ul className="space-y-1">
        {items.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/blogs/category/${c.slug}`}
              className="group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-[#B31942] dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-[#ff8da0]"
            >
              <span className="flex items-center gap-2">
                <ArrowRight
                  className="h-3.5 w-3.5 -translate-x-1 transition group-hover:translate-x-0"
                  aria-hidden="true"
                />
                {c.name}
              </span>
              {typeof c.count === 'number' && c.count > 0 && (
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600 dark:bg-white/10 dark:text-white/70">
                  {c.count}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </Widget>
  );
}

function Trending({ items }) {
  return (
    <Widget title="Trending posts" Icon={Flame} delay={0.1}>
      <ol className="space-y-4">
        {items.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/blogs/${p.slug}`} className="group flex items-start gap-3.5">
              <span className="w-9 shrink-0 bg-linear-to-b from-[#B31942] to-[#0A3161] bg-clip-text text-3xl font-bold leading-none text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="min-w-0">
                <span className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 transition group-hover:text-[#B31942] dark:text-white dark:group-hover:text-[#ff8da0]">
                  {p.title}
                </span>
                {p.category && (
                  <span className="mt-1 block text-xs text-slate-500 dark:text-white/55">
                    {p.category}
                  </span>
                )}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </Widget>
  );
}

function Latest({ items }) {
  return (
    <Widget title="Latest posts" Icon={Clock} delay={0.15}>
      <ul className="space-y-4">
        {items.map((p) => (
          <li key={p.slug}>
            <Link href={`/blogs/${p.slug}`} className="group flex items-center gap-3.5">
              <Thumb post={p} />
              <span className="min-w-0">
                <span className="line-clamp-2 text-sm font-semibold leading-snug text-slate-900 transition group-hover:text-[#B31942] dark:text-white dark:group-hover:text-[#ff8da0]">
                  {p.title}
                </span>
                <span className="mt-1 block text-xs text-slate-500 dark:text-white/55">
                  {fmt(p.date)}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Widget>
  );
}

function Tags({ items }) {
  return (
    <Widget title="Popular tags" Icon={Tag} delay={0.2}>
      <div className="flex flex-wrap gap-2">
        {items.map((t) => (
          <Link
            key={t.slug}
            href={`/blogs/tag/${t.slug}`}
            className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-[#B31942]/40 hover:bg-white hover:text-[#B31942] dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-[#ff8da0]/50 dark:hover:text-[#ff8da0]"
          >
            #{t.name}
          </Link>
        ))}
      </div>
    </Widget>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | loading | done | error

  const submit = async (e) => {
    e.preventDefault();
    if (state === 'loading') return;
    setState('loading');
    try {
      await subscribeToNewsletter(email.trim());
      setState('done');
      setEmail('');
    } catch {
      setState('error');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: 0.25 }}
      className="relative overflow-hidden rounded-3xl bg-[#07071f] bg-linear-to-br from-[#0a0a2e] via-[#17104d] to-[#0a1a4a] p-6 text-white"
    >
      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#ff4d6d]/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-[#4da3ff]/25 blur-3xl" />
      <div className="relative">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
          <Mail className="h-5 w-5 text-[#7cc4ff]" aria-hidden="true" />
        </span>
        <h3 className="mt-4 text-lg font-semibold">Get new articles by email</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-white/70">
          Subscribe to our newsletter for US trade data updates and new posts.
        </p>

        {state === 'done' ? (
          <p className="mt-5 flex items-center gap-2 rounded-xl bg-emerald-400/15 px-4 py-3 text-sm font-medium text-emerald-300">
            <Check className="h-4 w-4" aria-hidden="true" />
            Thanks, you are subscribed.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-5 space-y-2.5">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === 'error') setState('idle');
              }}
              placeholder="Your email address"
              aria-label="Email address"
              className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none backdrop-blur transition placeholder:text-white/45 focus:border-white/40 focus:ring-4 focus:ring-white/10"
            />
            <button
              type="submit"
              disabled={state === 'loading'}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#0A1A4A] transition hover:scale-[1.02] disabled:opacity-70"
            >
              {state === 'loading' ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : null}
              Subscribe
            </button>
            {state === 'error' && (
              <p role="alert" className="text-xs text-[#ff8da0]">
                Could not subscribe right now. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </motion.section>
  );
}

export default function BlogSidebar({ data }) {
  const ctx = useBlogSidebarData();
  const d = data ?? ctx ?? {};

  return (
    <div className="space-y-6">
      {d.categories?.length > 0 && <Categories items={d.categories} />}
      {d.trending?.length > 0 && <Trending items={d.trending} />}
      {d.latest?.length > 0 && <Latest items={d.latest} />}
      {d.tags?.length > 0 && <Tags items={d.tags} />}
      <Newsletter />
    </div>
  );
}
