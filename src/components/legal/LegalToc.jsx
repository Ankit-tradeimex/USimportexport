'use client';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, List } from 'lucide-react';

/*
  Table of contents built from the headings of the page content.
  items: [{ id, text, level }]  (h2 and h3 are listed). The section being read is highlighted.
  Wide screens: a sticky card beside the text. Small screens: a fold-out list above the text.
*/
export default function LegalToc({ items }) {
  const list = items.filter((i) => i.level <= 3);
  const [active, setActive] = useState(list[0]?.id || '');
  const fold = useRef(null);

  useEffect(() => {
    const els = list.map((i) => document.getElementById(i.id)).filter(Boolean);
    if (!els.length) return undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (seen[0]) setActive(seen[0].target.id);
      },
      { rootMargin: '-15% 0px -70% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  if (!list.length) return null;

  const go = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
    setActive(id);
    fold.current?.removeAttribute('open');
  };

  const links = (
    <ol className="space-y-0.5">
      {list.map((i) => {
        const on = active === i.id;
        return (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              onClick={(e) => go(e, i.id)}
              aria-current={on ? 'location' : undefined}
              className={`block rounded-lg border-l-2 py-1.5 pr-2 text-sm transition ${
                i.level === 3 ? 'pl-7' : 'pl-3'
              } ${
                on
                  ? 'border-[#B31942] bg-[#B31942]/8 font-semibold text-[#B31942] dark:border-[#ff8da0] dark:bg-white/10 dark:text-[#ff8da0]'
                  : 'border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:text-white/65 dark:hover:border-white/30 dark:hover:text-white'
              }`}
            >
              {i.text}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* small screens */}
      <details
        ref={fold}
        className="group mb-6 rounded-2xl border border-slate-200 bg-white shadow-sm lg:hidden print:hidden dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:backdrop-blur-xl"
      >
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-semibold text-slate-900 dark:text-white [&::-webkit-details-marker]:hidden">
          <span className="flex items-center gap-2.5">
            <List className="h-4 w-4 text-[#B31942] dark:text-[#ff8da0]" aria-hidden="true" />
            On this page
          </span>
          <ChevronDown className="h-5 w-5 transition group-open:rotate-180" aria-hidden="true" />
        </summary>
        <nav aria-label="On this page" className="px-3 pb-4">
          {links}
        </nav>
      </details>

      {/* wide screens */}
      <nav
        aria-label="On this page"
        className="sticky top-28 hidden max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:block print:hidden dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:backdrop-blur-xl"
      >
        <p className="mb-3 flex items-center gap-2 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 dark:text-white/45">
          <List className="h-3.5 w-3.5" aria-hidden="true" />
          On this page
        </p>
        {links}
      </nav>
    </>
  );
}
