'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MotionConfig, animate, motion, useInView } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Building2,
  Check,
  ChevronDown,
  Database,
  FileText,
  Globe2,
  Mail,
  Search,
  Ship,
  ShieldCheck,
  Users,
  Zap,
} from 'lucide-react';

/*
  <ComingSoon title="Clients" />
  <ComingSoon title="Clients" text="..." stage={2} features={[{ icon: 'users', title: '...', text: '...' }]} />

  stage: 0 Planning, 1 Design, 2 Development, 3 Launch   (default 2)
  The wording below is SAMPLE text and needs your review.
*/

const ICONS = {
  search: Search,
  shield: ShieldCheck,
  zap: Zap,
  users: Users,
  database: Database,
  globe: Globe2,
  file: FileText,
  chart: BarChart3,
  mail: Mail,
  building: Building2,
};

const DEFAULT_FEATURES = [
  {
    icon: 'search',
    title: 'Powerful search',
    text: 'Find companies, products and HS codes in a few clicks.',
  },
  {
    icon: 'shield',
    title: 'Verified records',
    text: 'Trade data taken from reliable shipping and customs sources.',
  },
  { icon: 'zap', title: 'Always fresh', text: 'New shipment records are added every day.' },
  {
    icon: 'users',
    title: 'Built for traders',
    text: 'Made for importers, exporters, forwarders and analysts.',
  },
];

const STEPS = [
  { name: 'Planning', text: 'Scope and data sources defined.' },
  { name: 'Design', text: 'Layout and experience designed.' },
  { name: 'Development', text: 'Building and testing the page.' },
  { name: 'Launch', text: 'Going live on USImportdata.' },
];
const PERCENT = [20, 45, 72, 92];

// the live numbers shown on the US import / export overview pages
const STATS = [
  { to: 52, suffix: 'M+', label: 'Import records' },
  { to: 38, suffix: 'M+', label: 'Export records' },
  { to: 190, suffix: '+', label: 'Countries' },
  { to: 12, suffix: 'K+', label: 'HS codes' },
];

// pages that already work
const EXPLORE = [
  {
    icon: Database,
    title: 'US Import Data',
    text: 'Bill of lading records of every shipment entering the USA.',
    href: '/us-import-data',
  },
  {
    icon: Ship,
    title: 'US Export Data',
    text: 'Records of shipments leaving the USA for the world.',
    href: '/us-export-data',
  },
  {
    icon: Search,
    title: 'Search Live Data',
    text: 'Search by product, HS code, importer or exporter.',
    href: '/search-live-data',
  },
  {
    icon: FileText,
    title: 'HS Code Directory',
    text: 'Browse every HS chapter and its codes.',
    href: '/hs-code-directory',
  },
  {
    icon: Globe2,
    title: 'Product Directory',
    text: 'Find any product from A to Z.',
    href: '/data-directory/us-import-data/a/1',
  },
  {
    icon: BarChart3,
    title: 'Blogs',
    text: 'Trade news, guides and market insights.',
    href: '/blogs',
  },
];

const FAQS = [
  {
    q: 'When will this page be live?',
    a: 'We are working on it now and will publish it as soon as it is ready. You do not need to do anything, just visit again.',
  },
  {
    q: 'Can I still search trade data in the meantime?',
    a: 'Yes. Search Live Data, the HS Code Directory, the Product Directory and the US import and export data pages all work today.',
  },
  {
    q: 'Can I ask for something specific?',
    a: 'Of course. Use the contact page and tell us what you are looking for. Our team will get back to you.',
  },
];

const rise = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const glass =
  'rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl';

function Heading({ eyebrow, title, text }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl text-center"
    >
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#B31942] dark:text-[#ff8da0]">
        {eyebrow}
      </span>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
        {title}
      </h2>
      {text && <p className="mt-3 text-slate-600 dark:text-white/70">{text}</p>}
    </motion.div>
  );
}

function CountUp({ to, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return undefined;
    const c = animate(0, to, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (x) => setV(Math.round(x)),
    });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Hero                                                             */
/* ------------------------------------------------------------------ */
function Hero({ title, text, percent }) {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:pt-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(10,49,97,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(10,49,97,0.06)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(ellipse_65%_70%_at_50%_35%,black,transparent)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
        <div className="absolute -left-20 top-10 h-80 w-80 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
        <div className="absolute -right-20 top-40 h-96 w-96 rounded-full bg-[#0A3161]/10 blur-[120px] dark:bg-[#4da3ff]/20" />
      </div>

      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center text-center">
        <div className="relative grid h-28 w-28 place-items-center">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute inset-0 rounded-full border-2 border-[#B31942]/40 dark:border-[#ff8da0]/40"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 2.6, opacity: 0 }}
              transition={{ duration: 3.2, repeat: Infinity, delay: i * 1.05, ease: 'easeOut' }}
            />
          ))}
          <motion.span
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -5, 0] }}
            transition={{
              scale: { type: 'spring', stiffness: 200, damping: 14 },
              opacity: { duration: 0.3 },
              y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
            }}
            className="relative grid h-24 w-24 place-items-center rounded-full bg-linear-to-br from-[#B31942] to-[#0A3161] text-white shadow-2xl"
          >
            <Ship className="h-10 w-10" strokeWidth={1.6} aria-hidden="true" />
          </motion.span>
        </div>

        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="mt-9 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/70"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#B31942] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#B31942]" />
          </span>
          {title}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
            Coming Soon
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.35 }}
          className="mt-4 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70"
        >
          {text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 w-full max-w-xs"
        >
          <div className="flex items-baseline justify-between text-xs font-medium uppercase tracking-widest text-slate-400 dark:text-white/40">
            <span>Under construction</span>
            <span>{percent}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
            <motion.div
              className="relative h-full overflow-hidden rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161]"
              initial={{ width: '0%' }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 1.4, delay: 0.7, ease: 'easeOut' }}
            >
              <motion.span
                aria-hidden="true"
                className="absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/50 to-transparent"
                initial={{ x: '-120%' }}
                animate={{ x: '420%' }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: 2 }}
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-9 flex flex-wrap justify-center gap-3"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-[#B31942] to-[#0A3161] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Home
          </Link>
          <Link
            href="/search-live-data"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#B31942]/40 hover:text-[#B31942] dark:border-white/20 dark:bg-white/5 dark:text-white dark:hover:text-[#ff8da0]"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Search Live Data
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 2. What's coming                                                    */
/* ------------------------------------------------------------------ */
function Features({ features }) {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto w-full max-w-5xl">
        <Heading
          eyebrow="What to expect"
          title="What is coming to this page"
          text="A first look at what we are building."
        />
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
          className="mt-10 grid gap-4 sm:grid-cols-2"
        >
          {features.map((f) => {
            const Icon = ICONS[f.icon] || Zap;
            return (
              <motion.li
                key={f.title}
                variants={rise}
                className={`${glass} group flex gap-4 p-6 transition duration-300 hover:-translate-y-1 hover:border-[#B31942]/40 hover:shadow-lg`}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-linear-to-br from-[#B31942] to-[#0A3161] text-white shadow-md transition group-hover:scale-110">
                  <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-white/70">
                    {f.text}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Roadmap                                                          */
/* ------------------------------------------------------------------ */
function Roadmap({ stage }) {
  const fill = (stage / (STEPS.length - 1)) * 100;
  return (
    <section className="px-4 py-12">
      <div className="mx-auto w-full max-w-5xl">
        <Heading
          eyebrow="Progress"
          title="How we are building it"
          text="Every page goes through the same four steps before it goes live."
        />

        <div className="relative mt-12">
          {/* line behind the steps (wide screens) */}
          <div className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-1 rounded-full bg-slate-200 md:block dark:bg-white/10">
            <motion.div
              className="h-full rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161]"
              initial={{ width: 0 }}
              whileInView={{ width: `${fill}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>

          <motion.ol
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
            className="relative grid gap-8 md:grid-cols-4 md:gap-4"
          >
            {STEPS.map((s, i) => {
              const done = i < stage;
              const active = i === stage;
              return (
                <motion.li
                  key={s.name}
                  variants={rise}
                  className="flex items-start gap-4 md:flex-col md:items-center md:text-center"
                >
                  <span className="relative grid h-12 w-12 shrink-0 place-items-center">
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 animate-ping rounded-full bg-[#B31942]/30"
                      />
                    )}
                    <span
                      className={`relative grid h-12 w-12 place-items-center rounded-full border-2 text-sm font-bold ${
                        done
                          ? 'border-transparent bg-linear-to-br from-[#B31942] to-[#0A3161] text-white shadow-md'
                          : active
                            ? 'border-[#B31942] bg-white text-[#B31942] dark:bg-[#12123a] dark:text-[#ff8da0]'
                            : 'border-slate-300 bg-white text-slate-400 dark:border-white/20 dark:bg-[#12123a] dark:text-white/40'
                      }`}
                    >
                      {done ? <Check className="h-5 w-5" aria-hidden="true" /> : i + 1}
                    </span>
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{s.name}</h3>
                    <p className="mt-0.5 text-sm text-slate-600 dark:text-white/65">{s.text}</p>
                    <span
                      className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                        done
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          : active
                            ? 'bg-[#B31942]/10 text-[#B31942] dark:text-[#ff8da0]'
                            : 'bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-white/40'
                      }`}
                    >
                      {done ? 'Done' : active ? 'In progress' : 'Up next'}
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Numbers                                                          */
/* ------------------------------------------------------------------ */
function Numbers() {
  return (
    <section className="px-4 py-12">
      <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-[#07071f] bg-linear-to-br from-[#0a0a2e] via-[#17104d] to-[#0a1a4a] p-8 shadow-2xl sm:p-12">
        <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-[#B31942]/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-[#4da3ff]/25 blur-3xl" />

        <div className="relative text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#ff8da0]">
            USImportdata
          </span>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            US trade data you can use today
          </h2>
        </div>

        <dl className="relative mt-9 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <dd className="bg-linear-to-r from-[#ff8da0] to-[#7cc4ff] bg-clip-text text-4xl font-semibold text-transparent sm:text-5xl">
                <CountUp to={s.to} suffix={s.suffix} />
              </dd>
              <dt className="mt-1 text-sm text-white/65">{s.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Explore                                                          */
/* ------------------------------------------------------------------ */
function Explore() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto w-full max-w-5xl">
        <Heading
          eyebrow="Meanwhile"
          title="Explore what is already live"
          text="These pages are ready for you right now."
        />
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {EXPLORE.map(({ icon: Icon, title, text, href }) => (
            <motion.li key={title} variants={rise}>
              <Link
                href={href}
                className={`${glass} group flex h-full flex-col p-5 transition duration-300 hover:-translate-y-1 hover:border-[#B31942]/40 hover:shadow-lg`}
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#0A3161]/10 text-[#0A3161] dark:bg-[#4da3ff]/15 dark:text-[#7cc4ff]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <ArrowUpRight
                    className="h-5 w-5 text-slate-300 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#B31942] dark:text-white/30 dark:group-hover:text-[#ff8da0]"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-white/65">
                  {text}
                </p>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 6. FAQ                                                              */
/* ------------------------------------------------------------------ */
function Faq() {
  return (
    <section className="px-4 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <Heading eyebrow="Good to know" title="Quick answers" />
        <div className="mt-8 space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className={`${glass} group open:border-[#B31942]/30`}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-slate-900 dark:text-white [&::-webkit-details-marker]:hidden">
                {f.q}
                <ChevronDown
                  className="h-5 w-5 shrink-0 text-[#B31942] transition group-open:rotate-180 dark:text-[#ff8da0]"
                  aria-hidden="true"
                />
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600 dark:text-white/70">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Closing call to action                                           */
/* ------------------------------------------------------------------ */
function Cta() {
  return (
    <section className="px-4 pb-20 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.55 }}
        className={`${glass} mx-auto flex w-full max-w-5xl flex-col items-center gap-5 p-8 text-center sm:p-12`}
      >
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-linear-to-br from-[#B31942] to-[#0A3161] text-white shadow-md">
          <Mail className="h-5 w-5" aria-hidden="true" />
        </span>
        <h2 className="text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-white">
          Need something sooner?
        </h2>
        <p className="max-w-xl text-slate-600 dark:text-white/70">
          Tell us what you are looking for and our team will help you directly, while we finish this
          page.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/contact-us"
            className="rounded-xl bg-linear-to-r from-[#B31942] to-[#0A3161] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03]"
          >
            Contact Us
          </Link>
          <Link
            href="/"
            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-[#B31942]/40 hover:text-[#B31942] dark:border-white/20 dark:text-white dark:hover:text-[#ff8da0]"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default function ComingSoon({
  title,
  text = 'We are still building this page. Please check back soon.',
  stage = 2,
  features,
}) {
  const s = Math.min(Math.max(Number.isInteger(stage) ? stage : 2, 0), STEPS.length - 1);

  return (
    <MotionConfig reducedMotion="user">
      <Hero title={title} text={text} percent={PERCENT[s]} />
      <Features features={features?.length ? features : DEFAULT_FEATURES} />
      <Roadmap stage={s} />
      <Numbers />
      <Explore />
      <Faq />
      <Cta />
    </MotionConfig>
  );
}
