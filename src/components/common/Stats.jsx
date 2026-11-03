"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { end: 7, suffix: "+", label: "Years Of Experience" },
  { end: 10, suffix: "k+", label: "Clients" },
  { end: 100, suffix: "+", label: "Countries Covered" },
  { end: 1, suffix: "B+", label: "Reports Delivered" },
];

// Counts from 0 to `end` once the element scrolls into view.
function CountUp({ end, suffix, start }) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!start) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVal(end);
      return;
    }
    const duration = 1600;
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(Math.round(end * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, end]);

  return (
    <>
      {val}
      {suffix}
    </>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="bg-white">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d1a]">
        {/* soft glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[60%] -translate-x-1/2 rounded-full bg-[#5DBAF6]/20 blur-3xl" />

        <div className="relative grid grid-cols-2 divide-white/10 lg:grid-cols-4 lg:divide-x">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-6 py-10 text-center lg:py-14 ${
                i < 2 ? "border-b border-white/10 lg:border-b-0" : ""
              } ${i % 2 === 0 ? "border-r border-white/10 lg:border-r-0" : ""}`}
            >
              <p className="bg-linear-to-b from-white to-[#5DBAF6] bg-clip-text text-5xl font-semibold tracking-tight text-transparent sm:text-6xl">
                <CountUp end={s.end} suffix={s.suffix} start={inView} />
              </p>
              <p className="mt-3 text-xs font-medium uppercase tracking-[0.14em] text-neutral-400 sm:text-sm">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}