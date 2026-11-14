'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Temporarily disable smooth scrolling for page navigation.
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);

    requestAnimationFrame(() => {
      root.style.scrollBehavior = previousBehavior;
    });
  }, [pathname]);

  return null;
}
