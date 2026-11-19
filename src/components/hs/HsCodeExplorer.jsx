'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MotionConfig, motion } from 'framer-motion';
import { ArrowRight, Search, SearchX } from 'lucide-react';
import { CHAPTERS, SAMPLE_CODES, codeLinkLabel, getCodeHref } from '@/data/hsDirectoryData';
import HsChapterJumper from './HsChapterJumper';
import { Pagination } from '@/components/common/PathPagination';

/* ------------------------------------------------------------------ */
/* Code tile: the 6 digits are coloured as chapter / heading / sub     */
/* ------------------------------------------------------------------ */
function CodeTile({ item, mode, index }) {
  const { code, desc } = item;
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay: (index % 4) * 0.05 }}
    >
      <Link
        href={getCodeHref({ ...mode, code })}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#B31942]/40 hover:shadow-xl dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl dark:hover:border-[#ff8da0]/40"
      >
        <span
          className="font-mono text-2xl font-bold tracking-wider"
          aria-label={`HS code ${code}`}
        >
          <span className="text-[#0A3161] dark:text-[#7cc4ff]">{code.slice(0, 2)}</span>
          <span className="text-[#B31942] dark:text-[#ff8da0]">{code.slice(2, 4)}</span>
          <span className="text-[#8b3a8a] dark:text-[#d98fd6]">{code.slice(4, 6)}</span>
        </span>
        <span className="mt-2 line-clamp-2 min-h-[2.5rem] text-[13px] leading-snug text-slate-600 dark:text-white/65">
          {desc}
        </span>
        <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-[#B31942] opacity-0 transition-all duration-300 group-hover:opacity-100 dark:text-[#ff8da0]">
          {codeLinkLabel(mode)}
          <ArrowRight
            className="h-3.5 w-3.5 -translate-x-1 transition-transform group-hover:translate-x-0"
            aria-hidden="true"
          />
        </span>
      </Link>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* Explorer: toolbar + grouped tiles + pagination                      */
/* ------------------------------------------------------------------ */
export default function HsCodeExplorer({
  modeKey,
  mode,
  chapter,
  groups,
  total,
  totalAll,
  page,
  totalPages,
  q,
}) {
  const router = useRouter();
  const timer = useRef(null);
  const base = `/hs-code-directory/${modeKey}/us-hs-code-list/${chapter.slug}`;
  const qs = q ? `?q=${encodeURIComponent(q)}` : '';
  let n = 0; // running index for the stagger

  useEffect(() => () => clearTimeout(timer.current), []);

  // the filter lives in the URL (?q=) so the server can do the filtering; wait until typing pauses
  const onFilter = (e) => {
    const value = e.target.value.trim();
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      router.replace(`${base}/1${value ? `?q=${encodeURIComponent(value)}` : ''}`, {
        scroll: false,
      });
    }, 350);
  };

  const withCodes = Object.keys(SAMPLE_CODES).map(Number);

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 pb-20">
        <div className="mx-auto w-full max-w-7xl">
          {/* toolbar */}
          <div className="relative z-20 -mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-xl backdrop-blur-xl sm:flex-row sm:items-center dark:border-white/10 dark:bg-[#0c0c2b]/80">
            <HsChapterJumper modeKey={modeKey} current={chapter} />
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-white/40"
                aria-hidden="true"
              />
              <input
                type="search"
                defaultValue={q}
                onChange={onFilter}
                placeholder="Filter this chapter: code (8517) or product (smartphone)"
                aria-label="Filter codes in this chapter"
                className="w-full rounded-xl bg-slate-100 py-3 pl-10 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-[#B31942]/30 dark:bg-white/10 dark:text-white dark:placeholder:text-white/40"
              />
            </div>
            <p className="px-2 text-sm font-medium text-slate-500 dark:text-white/55">
              {q ? `${total} of ${totalAll}` : totalAll} {totalAll === 1 ? 'code' : 'codes'}
            </p>
          </div>

          {/* groups */}
          {groups.length > 0 ? (
            <div className="mt-10 space-y-12">
              {groups.map((g) => (
                <div key={g.heading}>
                  <div className="mb-5 flex items-center gap-4">
                    <span className="shrink-0 rounded-xl bg-[#B31942] px-3 py-1.5 font-mono text-sm font-bold text-white shadow-md">
                      {g.heading}
                    </span>
                    <h2 className="text-base font-semibold text-slate-900 sm:text-lg dark:text-white">
                      {g.title}
                    </h2>
                    <span className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
                    <span className="shrink-0 text-xs font-semibold text-slate-400 dark:text-white/40">
                      {g.items.length}
                    </span>
                  </div>
                  <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {g.items.map((item) => (
                      <CodeTile key={item.code} item={item} mode={mode} index={n++} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            /* empty state: no filter match, or no codes for this chapter yet */
            <div className="mx-auto mt-12 max-w-xl rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-white/15 dark:bg-white/5">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0A3161]/10 text-[#0A3161] dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff]">
                <SearchX className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">
                {q ? `No codes match “${q}”` : 'Codes for this chapter are coming soon'}
              </h2>
              <p className="mt-2 text-slate-600 dark:text-white/65">
                {q
                  ? 'Try a shorter code or a different word.'
                  : 'This chapter does not have any codes yet.'}
              </p>
              {!q && (
                <p className="mt-4 text-sm text-slate-500 dark:text-white/55">
                  Chapters with sample codes:{' '}
                  {withCodes.map((c, i) => (
                    <span key={c}>
                      <Link
                        href={`/hs-code-directory/${modeKey}/us-hs-code-list/${chapterSlugFor(c)}/1`}
                        className="font-semibold text-[#B31942] underline-offset-4 hover:underline dark:text-[#ff8da0]"
                      >
                        {String(c).padStart(2, '0')}
                      </Link>
                      {i < withCodes.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              )}
            </div>
          )}

          <Pagination page={page} totalPages={totalPages} base={base} qs={qs} />
        </div>
      </section>
    </MotionConfig>
  );
}

function chapterSlugFor(number) {
  return CHAPTERS.find((c) => c.number === number)?.slug;
}
