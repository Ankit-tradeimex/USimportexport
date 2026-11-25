'use client';
import { useRef } from 'react';
import Link from 'next/link';
import {
  MotionConfig,
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FEATURED, FEATURED_LIST_PATH, featuredPath } from '@/data/featuredData';

/*
  Home section "As Featured": two rows of logo tiles that glide in opposite directions.
  Hover or focus a row to pause it. Every tile opens that publication's detail page.
  Use:  <AsFeatured />   (or  <AsFeatured items={...} />  to pass your own list)
*/

function Tile({ item, hidden }) {
  return (
    <Link
      href={featuredPath(item.slug)}
      aria-label={`${item.name}: read the coverage`}
      tabIndex={hidden ? -1 : undefined}
      className="group relative flex h-24 w-48 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white px-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-[#B31942]/40 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B31942] dark:border-white/15 dark:shadow-none"
    >
      {item.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.logo}
          alt={item.name}
          width={160}
          height={64}
          loading="lazy"
          className="max-h-12 w-auto max-w-full object-contain opacity-70 grayscale transition duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
        />
      ) : (
        <span className="text-center font-serif text-lg font-bold leading-tight text-slate-700 transition duration-300 group-hover:text-[#0A3161]">
          {item.name}
        </span>
      )}

      {/* slides up on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 translate-y-full bg-linear-to-r from-[#B31942] to-[#0A3161] py-1.5 text-center text-[11px] font-semibold uppercase tracking-wider text-white transition duration-300 group-hover:translate-y-0"
      >
        Read coverage
      </span>
    </Link>
  );
}

/* one endless row. dir -1 moves left, +1 moves right. Two copies of the list make the loop seamless. */
function Row({ items, dir = -1, speed = 38 }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const track = useRef(null);
  const paused = useRef(false);

  useAnimationFrame((_, delta) => {
    if (reduce || paused.current || !track.current) return;
    const half = track.current.scrollWidth / 2;
    if (!half) return;
    let next = x.get() + dir * speed * (Math.min(delta, 50) / 1000);
    if (next <= -half) next += half;
    if (next > 0) next -= half;
    x.set(next);
  });

  const pause = () => {
    paused.current = true;
  };
  const play = () => {
    paused.current = false;
  };

  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={play}
      onFocus={pause}
      onBlur={play}
      className={`[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ${
        reduce ? 'overflow-x-auto' : 'overflow-hidden'
      }`}
    >
      <motion.ul ref={track} style={{ x }} className="flex w-max py-3">
        {[0, 1].map((copy) =>
          items.map((item) => (
            <li
              key={`${copy}-${item.slug}`}
              aria-hidden={copy === 1 ? true : undefined}
              className="mr-5 shrink-0"
            >
              <Tile item={item} hidden={copy === 1} />
            </li>
          )),
        )}
      </motion.ul>
    </div>
  );
}

export default function AsFeatured({ items = FEATURED }) {
  if (!items.length) return null;

  // second row starts from the middle, so the two rows never line up
  const shift = Math.floor(items.length / 2);
  const second = [...items.slice(shift), ...items.slice(0, shift)];

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative overflow-hidden py-16 sm:py-20"
        aria-labelledby="as-featured-title"
      >
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#B31942]/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[#0A3161]/30 to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-72 w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B31942]/8 blur-[120px] dark:bg-[#ff4d6d]/12" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#0A3161]/8 blur-[110px] dark:bg-[#4da3ff]/15" />
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-3xl px-4 text-center"
          >
            <h2
              id="as-featured-title"
              className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl"
            >
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                As Featured
              </span>
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161]" />
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70">
              USImportData.com has been referenced by leading global media platforms, financial
              publications, and policy analysts for accurate, shipment-level trade data, market
              intelligence, verified databases, and actionable import-export insights.
            </p>
          </motion.div>

          <div className="mt-10 space-y-2">
            <Row items={items} dir={-1} />
            <Row items={second} dir={1} speed={30} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-10 flex justify-center px-4"
          >
            <Link
              href={FEATURED_LIST_PATH}
              className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.04]"
            >
              Discover More
              <ArrowRight
                className="h-4 w-4 transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
