'use client';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DIR_ROLES, dirPath } from '@/data/companyDirectoryData';
import { Segmented } from '@/components/hs/HsModeSwitcher';

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/* same approach as the other switchers: survive the re-mount, ignore old URLs while a click loads, keep the scroll */
const memory = { role: null, scrollY: null, target: null, targetAt: 0 };

function restoreScroll() {
  if (memory.scrollY == null) return;
  const y = memory.scrollY;
  window.scrollTo({ top: y, behavior: 'instant' });
  requestAnimationFrame(() => {
    window.scrollTo({ top: y, behavior: 'instant' });
    memory.scrollY = null;
  });
}

export default function CdRoleSwitcher({ role: current, letter }) {
  const router = useRouter();
  const [role, setRole] = useState(memory.role ?? current);

  useIsoLayoutEffect(() => {
    restoreScroll();
  }, []);

  useEffect(() => {
    const waiting = memory.target && Date.now() - memory.targetAt < 4000;
    if (waiting && current !== memory.target) return;
    memory.target = null;
    memory.role = current;
    setRole(current);
    restoreScroll();
  }, [current]);

  const go = (next) => {
    memory.role = next;
    memory.target = next;
    memory.targetAt = Date.now();
    memory.scrollY = window.scrollY;
    setRole(next);
    router.push(dirPath(next, letter, 1), { scroll: false });
  };

  return (
    <div className="relative z-10 mx-auto -mt-12 flex w-full max-w-md items-end justify-center rounded-3xl border border-slate-200 bg-white/90 px-6 py-5 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0c0c2b]/70">
      <Segmented
        label="Select Role"
        value={role}
        options={DIR_ROLES.map((r) => ({ value: r.value, label: r.label }))}
        onChange={go}
      />
    </div>
  );
}
