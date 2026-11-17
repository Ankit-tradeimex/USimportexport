'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  Anchor,
  Bookmark,
  ChevronRight,
  FileText,
  Home,
  Newspaper,
  Search,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useBlogSidebarData } from './BlogProvider';

/* ------------------------------------------------------------------ */
/* Content (edit freely)                                               */
/* ------------------------------------------------------------------ */
const CONTENT = {
  badge: 'The USimportdata Blog',
  titleTop: 'US trade insights,',
  titleAccent: 'guides & updates',
  text: 'Practical articles on US import and export data, HS codes, bills of lading and market trends, written to help you find buyers, suppliers and new opportunities.',
};

const DEFAULT_TOPICS = [
  { name: 'US Imports', slug: 'us-imports' },
  { name: 'US Exports', slug: 'us-exports' },
  { name: 'HS Codes', slug: 'hs-codes' },
  { name: 'Trade Guides', slug: 'trade-guides' },
];

/* ------------------------------------------------------------------ */
/* Visual: layered article cards with mouse parallax                   */
/* ------------------------------------------------------------------ */
function Lines({ widths }) {
  return (
    <div className="space-y-2">
      {widths.map((w, i) => (
        <div
          key={i}
          className="h-2 rounded-full bg-slate-200 dark:bg-white/15"
          style={{ width: w }}
        />
      ))}
    </div>
  );
}

function Card({ cover, chip, chipTone, readTime, className = '', style }) {
  return (
    <motion.div
      style={style}
      className={`absolute w-[250px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl sm:w-[280px] dark:border-white/10 dark:bg-[#12123a]/80 dark:shadow-none dark:backdrop-blur-xl ${className}`}
    >
      <div className="relative h-28 overflow-hidden sm:h-32">{cover}</div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
              chipTone === 'red'
                ? 'bg-[#B31942]/10 text-[#B31942] dark:bg-[#ff4d6d]/15 dark:text-[#ff8da0]'
                : 'bg-[#0A3161]/10 text-[#0A3161] dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff]'
            }`}
          >
            {chip}
          </span>
          <span className="text-[10px] font-medium text-slate-400 dark:text-white/45">
            {readTime}
          </span>
        </div>
        <div className="mt-3">
          <Lines widths={['92%', '68%']} />
        </div>
        <div className="mt-4 flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-linear-to-br from-[#B31942] to-[#0A3161]" />
          <div className="h-2 w-16 rounded-full bg-slate-200 dark:bg-white/15" />
        </div>
      </div>
    </motion.div>
  );
}

function BlogVisual() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 90, damping: 18 });
  const sy = useSpring(my, { stiffness: 90, damping: 18 });

  // different depth per layer
  const backX = useTransform(sx, (v) => v * -14);
  const backY = useTransform(sy, (v) => v * -14);
  const midX = useTransform(sx, (v) => v * 10);
  const midY = useTransform(sy, (v) => v * 10);
  const frontX = useTransform(sx, (v) => v * 26);
  const frontY = useTransform(sy, (v) => v * 26);
  const tagX = useTransform(sx, (v) => v * 40);
  const tagY = useTransform(sy, (v) => v * 40);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const float = (d) =>
    reduce
      ? undefined
      : {
          y: [0, -9, 0],
          transition: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: d },
        };

  return (
    <div
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto h-[420px] w-full max-w-[520px] sm:h-[480px]"
    >
      <div className="pointer-events-none absolute inset-6 rounded-full bg-linear-to-br from-[#B31942]/15 via-transparent to-[#0A3161]/25 blur-3xl dark:from-[#ff4d6d]/20 dark:to-[#4da3ff]/30" />

      <motion.div style={{ x: backX, y: backY }} className="absolute left-0 top-0">
        <motion.div animate={float(0)}>
          <Card
            chipTone="blue"
            chip="US Exports"
            readTime="6 min read"
            className="!relative -rotate-6"
            cover={
              <div className="h-full w-full bg-linear-to-br from-[#0A3161] to-[#4da3ff]">
                <svg
                  viewBox="0 0 200 80"
                  className="absolute inset-0 h-full w-full"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M0 62 C 30 58, 50 30, 80 38 S 130 62, 160 34 S 190 18, 200 14"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeOpacity="0.9"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.8, delay: 0.4, ease: 'easeInOut' }}
                  />
                </svg>
                <TrendingUp
                  className="absolute bottom-3 right-3 h-6 w-6 text-white/60"
                  aria-hidden="true"
                />
              </div>
            }
          />
        </motion.div>
      </motion.div>

      {/* middle card: red, HS digits */}
      <motion.div style={{ x: midX, y: midY }} className="absolute right-0 top-[22%]">
        <motion.div animate={float(1.2)}>
          <Card
            chipTone="red"
            chip="HS Codes"
            readTime="4 min read"
            className="!relative rotate-3"
            cover={
              <div className="h-full w-full bg-linear-to-br from-[#B31942] to-[#7a1033]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:22px_22px]" />
                <span className="absolute bottom-3 left-4 font-mono text-3xl font-bold tracking-widest text-white/90">
                  HS 0302
                </span>
                <FileText
                  className="absolute right-3 top-3 h-6 w-6 text-white/60"
                  aria-hidden="true"
                />
              </div>
            }
          />
        </motion.div>
      </motion.div>

      {/* front card: mixed, ship */}
      <motion.div style={{ x: frontX, y: frontY }} className="absolute bottom-0 left-[8%]">
        <motion.div animate={float(2.4)}>
          <Card
            chipTone="blue"
            chip="Trade Guides"
            readTime="8 min read"
            className="!relative -rotate-2"
            cover={
              <div className="h-full w-full bg-linear-to-r from-[#B31942] via-[#5c2150] to-[#0A3161]">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:26px_26px] [mask-image:radial-gradient(ellipse_80%_90%_at_70%_50%,black,transparent)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/25 bg-white/15 backdrop-blur">
                    <Anchor className="h-7 w-7 text-white" aria-hidden="true" />
                  </span>
                </div>
              </div>
            }
          />
        </motion.div>
      </motion.div>

      {/* floating tags */}
      <motion.div style={{ x: tagX, y: tagY }} className="absolute right-2 top-2 z-10">
        <motion.span
          animate={reduce ? undefined : { rotate: [-4, 4, -4] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex items-center gap-1.5 rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161] px-3.5 py-1.5 text-xs font-bold text-white shadow-lg"
        >
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
          New articles
        </motion.span>
      </motion.div>
      <motion.div style={{ x: tagX, y: tagY }} className="absolute bottom-10 right-0 z-10">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-[#B31942] shadow-xl dark:border-white/10 dark:bg-white/10 dark:text-[#ff8da0] dark:backdrop-blur">
          <Bookmark className="h-5 w-5" aria-hidden="true" />
        </span>
      </motion.div>
    </div>
  );
}

export default function BlogHero({ topics }) {
  const router = useRouter();
  const ctx = useBlogSidebarData();
  const [q, setQ] = useState('');
  const chips = (topics ?? ctx?.categories ?? DEFAULT_TOPICS).slice(0, 5);

  const submit = (e) => {
    e.preventDefault();
    const v = q.trim();
    router.push(v ? `/blogs/search/${encodeURIComponent(v)}` : '/blogs');
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:pb-24">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,49,97,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(10,49,97,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,black,transparent)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
          <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#0A3161]/10 blur-[120px] dark:bg-[#4da3ff]/20" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl">
          {/* breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-white/60">
              <li>
                <Link
                  href="/"
                  className="flex items-center gap-1.5 transition hover:text-[#B31942] dark:hover:text-[#ff8da0]"
                >
                  <Home className="h-3.5 w-3.5" aria-hidden="true" />
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5" />
              </li>
              <li aria-current="page" className="font-semibold text-slate-900 dark:text-white">
                Blogs
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
            {/* copy */}
            <div>
              <motion.span
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#0A3161] dark:border-white/10 dark:bg-white/5 dark:text-[#7cc4ff]"
              >
                <Newspaper
                  className="h-3.5 w-3.5 text-[#B31942] dark:text-[#ff8da0]"
                  aria-hidden="true"
                />
                {CONTENT.badge}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white"
              >
                {CONTENT.titleTop}{' '}
                <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                  {CONTENT.titleAccent}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70"
              >
                {CONTENT.text}
              </motion.p>

              {/* search */}
              <motion.form
                role="search"
                onSubmit={submit}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26 }}
                className="mt-8 flex max-w-xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg transition focus-within:border-[#B31942]/50 focus-within:ring-4 focus-within:ring-[#B31942]/15 dark:border-white/10 dark:bg-white/5 dark:shadow-none dark:backdrop-blur-xl"
              >
                <Search
                  className="ml-3 h-5 w-5 shrink-0 text-slate-400 dark:text-white/50"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search articles, e.g. HS code, bill of lading"
                  aria-label="Search articles"
                  className="min-w-0 flex-1 bg-transparent px-1 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-white/40"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-linear-to-r from-[#B31942] to-[#0A3161] px-5 py-2.5 text-sm font-semibold text-white transition hover:scale-[1.03]"
                >
                  Search
                </button>
              </motion.form>

              {/* topics */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36 }}
                className="mt-6 flex flex-wrap items-center gap-2.5"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-white/50">
                  Popular topics
                </span>
                {chips.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/blogs/category/${c.slug}`}
                    className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-[#B31942]/40 hover:text-[#B31942] hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:backdrop-blur dark:hover:border-[#ff8da0]/50 dark:hover:text-[#ff8da0]"
                  >
                    {c.name}
                  </Link>
                ))}
              </motion.div>
            </div>

            {/* visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <BlogVisual />
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
