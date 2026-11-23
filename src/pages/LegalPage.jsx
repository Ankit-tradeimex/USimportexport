import { Suspense } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Mail } from 'lucide-react';

import LegalHero from '@/components/legal/LegalHero';
import LegalToc from '@/components/legal/LegalToc';

import { LEGAL_LIST, getLegalPage } from '@/lib/legal';
import { prepareLegalHtml } from '@/lib/legalContent';

const PROSE = [
  'text-[15.5px] leading-[1.85] text-slate-700 dark:text-white/75',
  '[&_h2]:mt-12 [&_h2]:scroll-mt-28 [&_h2]:border-l-4 [&_h2]:border-[#B31942] [&_h2]:pl-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:leading-snug [&_h2]:tracking-tight [&_h2]:text-slate-900 dark:[&_h2]:border-[#ff8da0] dark:[&_h2]:text-white',
  '[&>h2:first-child]:mt-0',
  '[&_h3]:mt-8 [&_h3]:scroll-mt-28 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-slate-900 dark:[&_h3]:text-white',
  '[&_h4]:mt-6 [&_h4]:scroll-mt-28 [&_h4]:font-semibold [&_h4]:text-slate-900 dark:[&_h4]:text-white',
  '[&_p]:mt-4',
  '[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:marker:text-[#B31942]',
  '[&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:marker:font-semibold [&_ol]:marker:text-[#B31942]',
  '[&_a]:font-medium [&_a]:text-[#B31942] [&_a]:underline [&_a]:decoration-[#B31942]/30 [&_a]:underline-offset-4 [&_a:hover]:decoration-[#B31942] dark:[&_a]:text-[#ff8da0]',
  '[&_strong]:font-semibold [&_strong]:text-slate-900 dark:[&_strong]:text-white',
  '[&_blockquote]:mt-6 [&_blockquote]:rounded-r-xl [&_blockquote]:border-l-4 [&_blockquote]:border-[#B31942] [&_blockquote]:bg-[#B31942]/5 [&_blockquote]:px-5 [&_blockquote]:py-3 [&_blockquote]:italic dark:[&_blockquote]:bg-white/5',
  '[&_hr]:my-10 [&_hr]:border-slate-200 dark:[&_hr]:border-white/10',
  '[&_table]:mt-6 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:text-sm',
  '[&_th]:border [&_th]:border-slate-200 [&_th]:bg-slate-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold dark:[&_th]:border-white/10 dark:[&_th]:bg-white/5',
  '[&_td]:border [&_td]:border-slate-200 [&_td]:px-3 [&_td]:py-2 dark:[&_td]:border-white/10',
  '[&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[13px] dark:[&_code]:bg-white/10',
  '[&_pre]:mt-4 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:bg-slate-100 [&_pre]:p-4 dark:[&_pre]:bg-white/5',
].join(' ');

// '2026-11-23' -> 'November 23, 2026'
const dateText = (iso) => {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime())
    ? ''
    : d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      });
};

// Synchronous route component: it only renders the Suspense boundary.
export default function LegalPage({ slug }) {
  return (
    <Suspense fallback={<LegalFallback />}>
      <LegalContent slug={slug} />
    </Suspense>
  );
}

async function LegalContent({ slug }) {
  const page = await getLegalPage(slug);
  if (!page) notFound();

  const { html, toc, minutes } = prepareLegalHtml(page.content);

  const at = LEGAL_LIST.findIndex((p) => p.slug === slug);
  const next = LEGAL_LIST[(at + 1) % LEGAL_LIST.length];

  return (
    <>
      <LegalHero
        slug={slug}
        title={page.title}
        intro={page.description}
        updatedText={dateText(page.updatedAt)}
        minutes={minutes}
        pages={LEGAL_LIST}
      />

      <section className="px-4 pb-16">
        <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[260px_1fr] lg:items-start">
          <aside>
            <LegalToc items={toc} />
          </aside>

          <div className="min-w-0">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 print:border-0 print:p-0 print:shadow-none dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl">
              {html ? (
                <div className={PROSE} dangerouslySetInnerHTML={{ __html: html }} />
              ) : (
                <p className="text-slate-600 dark:text-white/70">
                  This page is being updated. Please check back soon.
                </p>
              )}
            </article>

            {/* next legal page */}
            <Link
              href={next.href}
              className="group mt-6 flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#B31942]/40 hover:shadow-lg print:hidden dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
            >
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-white/45">
                  Next
                </span>
                <span className="mt-0.5 block text-lg font-semibold text-slate-900 dark:text-white">
                  {next.label}
                </span>
              </span>
              <ArrowRight
                className="h-5 w-5 text-[#B31942] transition group-hover:translate-x-1 dark:text-[#ff8da0]"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* closing call to action */}
      <section className="px-4 pb-20 print:hidden">
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-[#07071f] bg-linear-to-br from-[#0a0a2e] via-[#17104d] to-[#0a1a4a] p-8 text-center shadow-2xl sm:p-12">
          <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-[#B31942]/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-[#4da3ff]/25 blur-3xl" />

          <span className="relative mx-auto grid h-12 w-12 place-items-center rounded-xl bg-white/10 text-white">
            <Mail className="h-5 w-5" aria-hidden="true" />
          </span>
          <h2 className="relative mt-4 text-2xl font-semibold text-white sm:text-3xl">
            Questions about this page?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/70">
            Our team is happy to explain anything on this page. Send us a message and we will get
            back to you.
          </p>
          <div className="relative mt-7">
            <Link
              href="/contact-us"
              className="inline-block rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0A1A4A] shadow-lg transition hover:scale-[1.03]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

// Shown for a moment while the content loads.
function LegalFallback() {
  return (
    <div className="mx-auto w-full max-w-6xl animate-pulse px-4 py-16" aria-hidden="true">
      <div className="h-5 w-40 rounded-full bg-slate-200 dark:bg-white/10" />
      <div className="mt-8 h-14 w-2/3 max-w-lg rounded-2xl bg-slate-200 dark:bg-white/10" />
      <div className="mt-5 h-4 w-1/2 max-w-md rounded-full bg-slate-200 dark:bg-white/10" />
      <div className="mt-14 grid gap-10 lg:grid-cols-[260px_1fr]">
        <div className="hidden h-64 rounded-2xl bg-slate-200 lg:block dark:bg-white/10" />
        <div className="h-96 rounded-3xl bg-slate-200 dark:bg-white/10" />
      </div>
    </div>
  );
}
