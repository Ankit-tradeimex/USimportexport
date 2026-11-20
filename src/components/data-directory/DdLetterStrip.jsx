'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { LETTERS } from '@/data/productDirectoryData';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* survives the re-mount that a new [letter] causes, so the highlight slides instead of jumping */
const memory = { letter: null, scrollY: null, target: null, targetAt: 0 };

function restoreScroll() {
  if (memory.scrollY == null) return;
  const y = memory.scrollY;
  window.scrollTo({ top: y, behavior: 'instant' });
  requestAnimationFrame(() => {
    window.scrollTo({ top: y, behavior: 'instant' });
    memory.scrollY = null;
  });
}

// '0-9' is the entry for names that do not start with a letter, shown as '#'
const label = (l) => (l === '0-9' ? '#' : l.toUpperCase());

/*
  Shared A-Z strip.  basePath is the part of the URL before the letter, e.g.
    /data-directory/us-import-data      ->  links go to /data-directory/us-import-data/<letter>/1
    /company-directory/us-importer
  letters defaults to a-z; pass [...a-z, '0-9'] to add the '#' entry.
*/
export default function DdLetterStrip({ basePath, letter, counts, letters = LETTERS }) {
  const N = letters.length;
  const [shown, setShown] = useState(memory.letter ?? letter);
  const scroller = useRef(null);
  const index = Math.max(0, letters.indexOf(shown));

  useIsoLayoutEffect(() => {
    restoreScroll();
  }, []);

  useEffect(() => {
    const waiting = memory.target && Date.now() - memory.targetAt < 4000;
    if (waiting && letter !== memory.target) return;
    memory.target = null;
    memory.letter = letter;
    setShown(letter);
    restoreScroll();
  }, [letter]);

  // on small screens keep the selected letter in view (moves only the strip, never the page)
  useEffect(() => {
    const box = scroller.current;
    if (!box) return;
    const w = box.scrollWidth / N;
    box.scrollTo({
      left: Math.max(0, index * w - box.clientWidth / 2 + w / 2),
      behavior: 'smooth',
    });
  }, [index]);

  const pick = (l) => {
    memory.letter = l;
    memory.target = l;
    memory.targetAt = Date.now();
    memory.scrollY = window.scrollY;
    setShown(l);
  };

  return (
    <nav aria-label="A to Z" className="sticky top-4 z-30 mt-8 px-4">
      <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white/90 p-1.5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0c0c2b]/80">
        <div
          ref={scroller}
          className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <div
            className="relative grid min-w-[900px]"
            style={{ gridTemplateColumns: `repeat(${N}, minmax(0, 1fr))` }}
          >
            {/* sliding highlight */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 rounded-xl bg-linear-to-br from-[#B31942] to-[#0A3161] shadow-md transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
              style={{ width: `${100 / N}%`, transform: `translateX(${index * 100}%)` }}
            />
            {letters.map((l) => {
              const on = l === shown;
              const empty = !counts[l];
              const base =
                'relative z-10 flex h-10 items-center justify-center rounded-xl text-sm font-bold transition-colors duration-200';
              if (empty && !on)
                return (
                  <span
                    key={l}
                    aria-disabled="true"
                    title="Nothing under this letter yet"
                    className={`${base} cursor-default text-slate-300 dark:text-white/20`}
                  >
                    {label(l)}
                  </span>
                );
              return (
                <Link
                  key={l}
                  href={`${basePath}/${l}/1`}
                  scroll={false}
                  onClick={() => pick(l)}
                  aria-current={on ? 'page' : undefined}
                  className={`${base} ${on ? 'text-white' : 'text-slate-600 hover:text-[#B31942] dark:text-white/70 dark:hover:text-[#ff8da0]'}`}
                >
                  {label(l)}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
