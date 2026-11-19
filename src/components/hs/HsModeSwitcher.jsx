'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROLES, TYPES, chapterPath, overviewPath } from '@/data/hsDirectoryData';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const memory = { role: null, type: null, scrollY: null, target: null, targetAt: 0 };

function restoreScroll() {
  if (memory.scrollY == null) return;
  const y = memory.scrollY;
  window.scrollTo({ top: y, behavior: 'instant' });
  // once more after layout settles, then forget it
  requestAnimationFrame(() => {
    window.scrollTo({ top: y, behavior: 'instant' });
    memory.scrollY = null;
  });
}

/*
  One segmented group. The highlight is a plain element moved with a CSS transform
  (no layout measuring), so it cannot be thrown off by scrolling or by the page changing around it.
*/
export function Segmented({ label, value, options, onChange }) {
  const index = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  );
  const n = options.length;

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/50">
        {label}
      </span>

      <div
        role="radiogroup"
        aria-label={label}
        className="relative grid auto-cols-fr grid-flow-col rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-white/5"
      >
        {/* sliding highlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-1 left-1 rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161] shadow-md transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] motion-reduce:transition-none"
          style={{
            width: `calc((100% - 0.5rem) / ${n})`,
            transform: `translateX(${index * 100}%)`,
          }}
        />

        {options.map((o) => {
          const on = o.value === value;
          return (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => !on && onChange(o.value)}
              className={`relative cursor-pointer z-10 rounded-full px-6 py-2 text-center text-sm font-semibold transition-colors duration-200 ${
                on
                  ? 'text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-white/65 dark:hover:text-white'
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// `chapter` is optional: on a chapter page the switcher stays on the same chapter
export default function HsModeSwitcher({ mode, chapter }) {
  const router = useRouter();

  // start from the last selection so the highlight slides instead of jumping
  const [role, setRole] = useState(memory.role ?? mode.role);
  const [type, setType] = useState(memory.type ?? mode.type);

  // the page has swapped: put the scroll position back before it is painted
  useIsoLayoutEffect(() => {
    restoreScroll();
  }, []);

  // follow the URL only when it really changes (first load, back button, finished navigation).
  // While a click is still loading the URL is still the old one: that must not pull the highlight back.
  useEffect(() => {
    const key = `${mode.role}-${mode.type}`;
    const waiting = memory.target && Date.now() - memory.targetAt < 4000;
    if (waiting && key !== memory.target) return;

    memory.target = null;
    setRole(mode.role);
    setType(mode.type);
    memory.role = mode.role;
    memory.type = mode.type;
    restoreScroll();
  }, [mode.role, mode.type]);

  const go = (nextRole, nextType) => {
    memory.role = nextRole;
    memory.type = nextType;
    memory.scrollY = window.scrollY;

    const key = `${nextRole}-${nextType}`;
    memory.target = key;
    memory.targetAt = Date.now();
    const href = chapter ? chapterPath(key, chapter) : overviewPath(key);
    router.push(href, { scroll: false });
  };

  return (
    <div className="relative z-10 mx-auto -mt-12 flex w-full max-w-2xl flex-wrap items-end justify-center gap-x-10 gap-y-5 rounded-3xl border border-slate-200 bg-white/90 px-6 py-5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0c0c2b]/70">
      <Segmented
        label="Select Role"
        value={role}
        options={ROLES}
        onChange={(v) => {
          setRole(v);
          go(v, memory.type ?? type);
        }}
      />
      <Segmented
        label="Select Type"
        value={type}
        options={TYPES}
        onChange={(v) => {
          setType(v);
          go(memory.role ?? role, v);
        }}
      />
    </div>
  );
}
