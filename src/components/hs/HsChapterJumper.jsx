'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Layers, Search } from 'lucide-react';
import { CHAPTERS, SAMPLE_CODES, chapterPath } from '@/data/hsDirectoryData';

/* "Chapter 01 ▾" button that opens a searchable list of every chapter */
export default function HsChapterJumper({ modeKey, current }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const box = useRef(null);
  const input = useRef(null);

  useEffect(() => {
    if (!open) return;
    input.current?.focus();
    const close = (e) => {
      if (e.type === 'keydown' ? e.key === 'Escape' : !box.current?.contains(e.target))
        setOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', close);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', close);
    };
  }, [open]);

  const text = q.trim().toLowerCase();
  const list = text
    ? CHAPTERS.filter((c) => c.code.startsWith(text) || c.title.toLowerCase().includes(text))
    : CHAPTERS;

  return (
    <div ref={box} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl bg-linear-to-r from-[#B31942] to-[#0A3161] px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.02]"
      >
        <Layers className="h-4 w-4" aria-hidden="true" />
        Chapter {current.code}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-30 mt-2 w-[min(92vw,380px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#12123a]"
          >
            <div className="relative border-b border-slate-200 dark:border-white/10">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-white/40"
                aria-hidden="true"
              />
              <input
                ref={input}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Find a chapter: 85 or electrical"
                aria-label="Find a chapter"
                className="w-full bg-transparent py-3.5 pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-white/40"
              />
            </div>
            <ul role="listbox" className="max-h-[340px] overflow-y-auto p-1.5">
              {list.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-slate-500 dark:text-white/50">
                  No chapter found
                </li>
              )}
              {list.map((c) => {
                const on = c.number === current.number;
                const hasCodes = Boolean(SAMPLE_CODES[c.number]);
                return (
                  <li key={c.code} role="option" aria-selected={on}>
                    <Link
                      href={chapterPath(modeKey, c)}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                        on
                          ? 'bg-[#0A3161]/10 dark:bg-[#4da3ff]/15'
                          : 'hover:bg-slate-100 dark:hover:bg-white/10'
                      }`}
                    >
                      <span className="flex h-8 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0A3161]/10 text-xs font-bold text-[#0A3161] dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff]">
                        {c.code}
                      </span>
                      <span className="line-clamp-2 flex-1 font-medium text-slate-800 dark:text-white/90">
                        {c.title}
                      </span>
                      {hasCodes && (
                        <span
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500"
                          title="Has sample codes"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
