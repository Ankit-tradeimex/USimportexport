'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Info, Link2, Quote, Tag } from 'lucide-react';
import { FaFacebookF, FaLinkedinIn, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { HiArrowLongRight } from 'react-icons/hi2';

const slugify = (s = '') =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

/* ------------------------------------------------------------------ */
/* Content renderer                                                    */
/* ------------------------------------------------------------------ */
function Blocks({ blocks }) {
  return (
    <div className="space-y-6 text-[17px] leading-[1.85] text-slate-700 dark:text-white/75">
      {blocks.map((b, i) => {
        switch (b.type) {
          case 'h2':
            return (
              <h2
                key={i}
                id={slugify(b.text)}
                className="scroll-mt-28 pt-4 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl dark:text-white"
              >
                {b.text}
              </h2>
            );
          case 'h3':
            return (
              <h3 key={i} className="pt-2 text-xl font-semibold text-slate-900 dark:text-white">
                {b.text}
              </h3>
            );
          case 'ul':
            return (
              <ul
                key={i}
                className="list-disc space-y-2 pl-6 marker:text-[#B31942] dark:marker:text-[#ff8da0]"
              >
                {b.items.map((t, j) => (
                  <li key={j} className="pl-1">
                    {t}
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol
                key={i}
                className="list-decimal space-y-2 pl-6 marker:font-semibold marker:text-[#B31942] dark:marker:text-[#ff8da0]"
              >
                {b.items.map((t, j) => (
                  <li key={j} className="pl-1">
                    {t}
                  </li>
                ))}
              </ol>
            );
          case 'quote':
            return (
              <blockquote
                key={i}
                className="relative rounded-3xl bg-linear-to-br from-[#0A3161] via-[#17104d] to-[#5c2150] p-7 text-xl font-medium leading-relaxed text-white shadow-xl"
              >
                <Quote className="mb-2 h-7 w-7 text-white/40" aria-hidden="true" />
                {b.text}
              </blockquote>
            );
          case 'callout':
            return (
              <div
                key={i}
                className="flex gap-4 rounded-2xl border border-[#0A3161]/20 bg-[#0A3161]/5 p-5 text-[15px] leading-relaxed text-slate-700 dark:border-[#4da3ff]/30 dark:bg-[#4da3ff]/10 dark:text-white/80"
              >
                <Info
                  className="mt-0.5 h-5 w-5 shrink-0 text-[#0A3161] dark:text-[#7cc4ff]"
                  aria-hidden="true"
                />
                <p>{b.text}</p>
              </div>
            );
          case 'image':
            return (
              <figure key={i}>
                <Image
                  src={b.src}
                  alt={b.alt ?? ''}
                  width={1920}
                  height={731}
                  sizes="(min-width: 1280px) 800px, 100vw"
                  className="h-auto w-full rounded-2xl"
                />
                {b.caption && (
                  <figcaption className="mt-2 text-center text-sm text-slate-500 dark:text-white/55">
                    {b.caption}
                  </figcaption>
                )}
              </figure>
            );
          default:
            return <p key={i}>{b.text}</p>;
        }
      })}
    </div>
  );
}


function Share({ title }) {
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);
  useEffect(() => setUrl(window.location.href), []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    {
      label: 'Share on X',
      Icon: FaXTwitter,
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
    },
    {
      label: 'Share on LinkedIn',
      Icon: FaLinkedinIn,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    },
    {
      label: 'Share on Facebook',
      Icon: FaFacebookF,
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    },
    { label: 'Share on WhatsApp', Icon: FaWhatsapp, href: `https://wa.me/?text=${t}%20${u}` },
  ];
  const btn =
    'flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:-translate-y-0.5 hover:border-[#B31942]/40 hover:text-[#B31942] hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:border-[#ff8da0]/50 dark:hover:text-[#ff8da0]';

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="mr-1 text-sm font-semibold text-slate-900 dark:text-white">Share</span>
      {links.map(({ label, Icon, href }) => (
        <a
          key={label}
          href={url ? href : '#'}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={btn}
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
        </a>
      ))}
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Link copied' : 'Copy link'}
        className={btn}
      >
        {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Link2 className="h-4 w-4" />}
      </button>
    </div>
  );
}

export default function PostBody({ post, content, tags = [] }) {
  return (
    <article>
      <Blocks blocks={content} />

      {/* tags + share */}
      <div className="mt-12 space-y-6 border-t border-slate-200 pt-8 dark:border-white/10">
        {tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-900 dark:text-white">
              <Tag className="h-4 w-4 text-[#B31942] dark:text-[#ff8da0]" aria-hidden="true" />
              Tags
            </span>
            {tags.map((t) => (
              <Link
                key={t.slug}
                href={`/blog/tag/${t.slug}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-[#B31942]/40 hover:bg-white hover:text-[#B31942] dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-[#ff8da0]/50 dark:hover:text-[#ff8da0]"
              >
                #{t.name}
              </Link>
            ))}
          </div>
        )}
        <Share title={post.title} />
      </div>

      {/* CTA */}
      <div className="relative mt-12 overflow-hidden rounded-3xl bg-[#07071f] bg-linear-to-br from-[#0a0a2e] via-[#17104d] to-[#0a1a4a] p-8 text-white sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#ff4d6d]/25 blur-[90px]" />
        <div className="pointer-events-none absolute -bottom-16 left-1/4 h-56 w-56 rounded-full bg-[#4da3ff]/25 blur-[90px]" />
        <div className="relative">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to research{' '}
            <span className="bg-linear-to-r from-[#7cc4ff] via-white to-[#ff8da0] bg-clip-text text-transparent">
              real US shipments?
            </span>
          </h3>
          <p className="mt-3 max-w-xl text-base leading-relaxed text-white/75">
            Search live US import and export records by product, HS code or company, or just ask our
            AI.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/search-live-data"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#0A1A4A] shadow-[0_10px_40px_rgba(124,196,255,0.3)] transition hover:scale-[1.03]"
            >
              Search Live Data
              <HiArrowLongRight className="text-lg transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/ai-search"
              className="inline-flex items-center rounded-xl border border-white/25 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur transition hover:border-white/50 hover:bg-white/10"
            >
              Try AI Search
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
