'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ROLES, TYPES, ddPath, modeSlug } from '@/data/productDirectoryData';
import { Segmented } from '@/components/hs/HsModeSwitcher';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* same approach as the HS switcher: survive the re-mount, ignore old URLs while a click loads, keep the scroll */
const memory = { role: null, type: null, scrollY: null, target: null, targetAt: 0 };

function restoreScroll() {
  if (memory.scrollY == null) return;
  const y = memory.scrollY;
  window.scrollTo({ top: y, behavior: 'instant' });
  requestAnimationFrame(() => {
    window.scrollTo({ top: y, behavior: 'instant' });
    memory.scrollY = null;
  });
}

export default function DdModeSwitcher({ mode, letter }) {
  const router = useRouter();
  const [role, setRole] = useState(memory.role ?? mode.role);
  const [type, setType] = useState(memory.type ?? mode.type);

  useIsoLayoutEffect(() => {
    restoreScroll();
  }, []);

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
    memory.target = `${nextRole}-${nextType}`;
    memory.targetAt = Date.now();
    router.push(ddPath(modeSlug(nextRole, nextType), letter, 1), { scroll: false });
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
