'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import {
  AlertTriangle,
  Building2,
  Compass,
  Eye,
  Factory,
  FileText,
  Lightbulb,
  Package,
  Search,
  SlidersHorizontal,
} from 'lucide-react';

const C = {
  hs: {
    title: 'Easily Find HS Codes with our Live Search Toolbar',
    subtitle: 'Find US Import-Export Data by HS Code',
    text: 'Sometimes you (the client) are not aware of your product’s HS codes either, so with our live search toolbar, you can check the relevant US trade data by HS code of your product along with other shipping details. Our Live Search Toolbar offers a seamless solution for easily finding HS Codes with just a few clicks. Gain a competitive edge by utilizing our Live Search Toolbar to effortlessly navigate through the complexities of HS Codes, ensuring accuracy and precision in your business endeavors.',
  },
  navigate: {
    title: 'Search and Navigate Live US Trade Data with USImportdata Database',
    text: 'With the USimportdata platform, customers can navigate and search live US trade data easily, supporting them to make knowledgeable selections and pick out new growth possibilities. USimportdata is a leading platform for agencies searching to harness the power of live US shipment data and US Maritime data. By leveraging the platform’s advanced search capabilities and comprehensive US bill of lading database, customers can get the right of entry to treasured insights, track marketplace trends, and US trade records to make informed selections that force commercial enterprise success in the US. Start exploring USimportdata and explore an array of opportunities in the US trade market.',
  },
  why: {
    title: 'Why is Live US Bill of Lading Data Important?',
    text: 'Searching live US trade data and information is essential for corporations in the US and global trade. By accessing the live search feature of US trade data by HS Code, by product, by country, by company and by port, businesses can stay knowledgeable on US market conditions, identify capability risks, and capture new opportunities. Whether you’re a manufacturer looking to source raw materials or a retailer searching to expand your product offerings, gaining access to up-to-date US trade data is fundamental to achievement. By having access to US trade statistics, you can search for your competitors and buyers-suppliers data to know about US trade activities, US Maritime trade data, and buying or selling companions.',
    searchBy: ['HS Code', 'Product', 'Country', 'Company', 'Port'],
  },
  oneStop: {
    title: 'USImportdata: Your One-Stop Solution for Live US Shipment Data',
    text: 'USImportdata offers a comprehensive database of US trade records and US trade activities permitting customers to look for unique goods, agencies, or industries in the USA. With advanced search capabilities and customizable filters, searching for the US trade data you want has never been simpler. Whether you’re a seasoned importer/exporter or simply getting started within the global trade, our platform has the tools you need to prevail in the US market.',
  },
};

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const DEMOS = [
  { q: 'coffee', hs: '0901', desc: 'Coffee, whether or not roasted' },
  { q: 'frozen fish', hs: '0303', desc: 'Fish, frozen' },
  { q: 'smartphones', hs: '8517', desc: 'Telephone sets, including smartphones' },
];

function HsDemo() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState(reduce ? DEMOS[0].q : '');
  const [found, setFound] = useState(reduce);
  const d = DEMOS[i];

  useEffect(() => {
    if (reduce) return;
    let n = 0;
    let t1;
    let t2;
    setTyped('');
    setFound(false);
    const typer = setInterval(() => {
      n += 1;
      setTyped(d.q.slice(0, n));
      if (n >= d.q.length) {
        clearInterval(typer);
        t1 = setTimeout(() => setFound(true), 400);
        t2 = setTimeout(() => setI((x) => (x + 1) % DEMOS.length), 3600);
      }
    }, 90);
    return () => {
      clearInterval(typer);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [i, reduce, d.q]);

  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-full bg-[#4da3ff]/15 blur-3xl" />
      <div className="relative rounded-3xl border border-neutral-200 bg-white p-5 shadow-[0_24px_70px_rgba(20,20,60,0.12)] dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.14] dark:to-white/[0.03] dark:shadow-[0_8px_50px_rgba(0,0,0,0.5)] dark:backdrop-blur-xl">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500 dark:text-slate-400">
          Live search toolbar
        </p>
        <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 dark:border-white/10 dark:bg-white/5">
          <Search className="h-4 w-4 text-[#0A3161] dark:text-[#4da3ff]" aria-hidden="true" />
          <span className="text-sm text-neutral-900 dark:text-white">
            {typed}
            {!found && (
              <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-neutral-700 dark:bg-white" />
            )}
          </span>
        </div>

        <div className="mt-4 min-h-[92px]">
          <AnimatePresence mode="wait">
            {found && (
              <motion.div
                key={d.hs}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-4 rounded-2xl bg-linear-to-r from-[#B31942] to-[#0A3161] p-4 text-white"
              >
                <span className="rounded-lg bg-white/20 px-3 py-2 font-serif text-2xl font-bold">
                  {d.hs}
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/70">
                    HS code found
                  </p>
                  <p className="text-sm font-medium">{d.desc}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <p className="text-xs text-neutral-500 dark:text-slate-400">
          Then see the matching US trade data and shipping details.
        </p>
      </div>
    </div>
  );
}

function HsIntro() {
  return (
    <section className="relative overflow-hidden bg-white py-16 dark:bg-slate-950 lg:py-24">
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#ff4d6d]/10 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#4da3ff]/15 blur-[120px]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-6">
        <motion.div
          {...fade()}
          className="relative border-l-4 border-l-transparent pl-6 [border-image:linear-gradient(to_bottom,#B31942,#0A3161)_1]"
        >
          <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-4xl">
            {C.hs.title}
            <span className="mx-2 font-light text-neutral-300 dark:text-slate-600">|</span>
            <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff5a73] dark:to-[#5dbaf6]">
              {C.hs.subtitle}
            </span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-neutral-600 dark:text-slate-400">
            {C.hs.text}
          </p>
        </motion.div>
        <motion.div {...fade(0.15)}>
          <HsDemo />
        </motion.div>
      </div>
    </section>
  );
}

const BLIPS = [
  [62, 48],
  [128, 92],
  [210, 70],
  [236, 150],
  [170, 210],
  [90, 196],
  [118, 140],
  [190, 120],
];

function Radar() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[340px]">
      <div className="absolute inset-0 rounded-full bg-[#4da3ff]/20 blur-3xl" />
      <svg viewBox="0 0 300 300" className="relative h-full w-full" aria-hidden="true">
        {[140, 105, 70, 35].map((r) => (
          <circle
            key={r}
            cx="150"
            cy="150"
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeDasharray="3 5"
          />
        ))}
        <line x1="10" y1="150" x2="290" y2="150" stroke="rgba(255,255,255,0.12)" />
        <line x1="150" y1="10" x2="150" y2="290" stroke="rgba(255,255,255,0.12)" />
        {BLIPS.map(([x, y], i) => (
          <g key={i}>
            <motion.circle
              cx={x}
              cy={y}
              r="6"
              fill="#7cc4ff"
              fillOpacity="0.35"
              animate={reduce ? undefined : { r: [4, 14, 4], fillOpacity: [0.5, 0, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.45, ease: 'easeOut' }}
            />
            <circle cx={x} cy={y} r="3.5" fill={i % 3 === 0 ? '#ff8da0' : '#7cc4ff'} />
          </g>
        ))}
        <circle cx="150" cy="150" r="9" fill="#fff" />
        <circle cx="150" cy="150" r="16" fill="none" stroke="#fff" strokeOpacity="0.5" />
      </svg>
      {/* rotating sweep */}
      <motion.div
        className="absolute inset-[3.5%] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(124,196,255,0.35)_50deg,transparent_60deg)]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
      {/* floating labels */}
      {[
        ['US shipments', 'left-0 top-[12%]'],
        ['US maritime data', 'right-0 top-[40%]'],
        ['Market trends', 'bottom-[6%] left-[8%]'],
      ].map(([t, pos], i) => (
        <motion.span
          key={t}
          animate={reduce ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          className={`absolute ${pos} rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white backdrop-blur`}
        >
          {t}
        </motion.span>
      ))}
    </div>
  );
}

function Navigate() {
  return (
    <section className="px-4 py-8 lg:px-6">
      <motion.div
        {...fade()}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#0A3161] bg-linear-to-br from-[#0A3161] via-[#0c2a63] to-[#17104d] text-white shadow-[0_30px_100px_rgba(10,49,97,0.35)] dark:from-[#06122b] dark:via-[#0a1740] dark:to-[#120b36]"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_80%_at_80%_50%,black,transparent)]" />
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#ff4d6d]/15 blur-[100px]" />
        </div>
        <div className="relative grid items-center gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[1.2fr_0.8fr] lg:px-14 lg:py-16">
          <div>
            <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              {C.navigate.title}
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-linear-to-r from-[#ff8da0] to-[#7cc4ff]" />
            <p className="mt-6 text-[15px] leading-relaxed text-white/80">{C.navigate.text}</p>
          </div>
          <Radar />
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 3. "Why is Live US Bill of Lading Data Important?"                   */
/* ------------------------------------------------------------------ */
function Sheets() {
  const reduce = useReducedMotion();
  const sheet = (rot, x, z, delay) => (
    <motion.div
      key={rot}
      initial={{ opacity: 0, rotate: 0, x: 0 }}
      whileInView={{ opacity: 1, rotate: rot, x }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ zIndex: z }}
      className="absolute inset-x-6 inset-y-2 rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-slate-900"
    >
      <div className="space-y-2">
        {[90, 60, 78, 45, 70, 55].map((w, i) => (
          <i
            key={i}
            style={{ width: `${w}%` }}
            className="block h-1.5 rounded-full bg-neutral-200 dark:bg-white/15"
          />
        ))}
      </div>
    </motion.div>
  );
  return (
    <div className="relative mx-auto h-[300px] w-full max-w-[340px]">
      {sheet(-9, -22, 1, 0.1)}
      {sheet(8, 22, 2, 0.2)}
      <motion.div
        animate={reduce ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ zIndex: 3 }}
        className="absolute inset-x-6 inset-y-2 rounded-2xl border border-[#0A3161]/30 bg-white p-5 shadow-2xl dark:border-[#4da3ff]/40 dark:bg-slate-900"
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#0A3161] dark:text-[#7cc4ff]">
            <FileText className="h-4 w-4" aria-hidden="true" />
            Bill of lading
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            LIVE
          </span>
        </div>
        <div className="mt-5 space-y-3">
          {[85, 55, 72, 40].map((w, i) => (
            <motion.i
              key={i}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.12 }}
              style={{ width: `${w}%`, transformOrigin: 'left' }}
              className="block h-2 rounded-full bg-linear-to-r from-[#B31942]/70 to-[#0A3161]/70"
            />
          ))}
        </div>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {['HS', 'Port', 'Qty'].map((k) => (
            <div
              key={k}
              className="rounded-lg bg-neutral-100 py-2 text-center text-[10px] font-semibold text-neutral-500 dark:bg-white/10 dark:text-slate-300"
            >
              {k}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

const WHY_POINTS = [
  { Icon: Eye, label: 'Stay knowledgeable on US market conditions' },
  { Icon: AlertTriangle, label: 'Identify capability risks' },
  { Icon: Lightbulb, label: 'Capture new opportunities' },
];

function Why() {
  return (
    <section className="px-4 py-8 lg:px-6">
      <motion.div
        {...fade()}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border-2 border-[#0A3161] bg-white shadow-[0_24px_80px_rgba(10,49,97,0.12)] dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.10] dark:to-white/[0.03] dark:shadow-[0_8px_60px_rgba(0,0,0,0.5)] dark:backdrop-blur-xl"
      >
        <div className="pointer-events-none absolute -right-20 -top-20 hidden h-72 w-72 rounded-full bg-[#4da3ff]/15 blur-[100px] dark:block" />
        <div className="relative grid items-center gap-10 px-6 py-12 sm:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:px-14 lg:py-16">
          <Sheets />
          <div>
            <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-[#0A3161] dark:text-white sm:text-4xl">
              {C.why.title}
            </h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161]" />
            <p className="mt-6 text-[15px] leading-relaxed text-neutral-600 dark:text-slate-400">
              {C.why.text}
            </p>

            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.16em] text-neutral-500 dark:text-slate-400">
              Search live data by
            </p>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
              className="mt-2 flex flex-wrap gap-2"
            >
              {C.why.searchBy.map((s) => (
                <motion.li
                  key={s}
                  variants={{ hidden: { opacity: 0, scale: 0.85 }, show: { opacity: 1, scale: 1 } }}
                  className="rounded-full border border-[#0A3161]/25 bg-[#0A3161]/5 px-3.5 py-1.5 text-xs font-semibold text-[#0A3161] dark:border-[#4da3ff]/30 dark:bg-[#4da3ff]/10 dark:text-sky-200"
                >
                  {s}
                </motion.li>
              ))}
            </motion.ul>

            <ul className="mt-6 grid gap-3 sm:grid-cols-3">
              {WHY_POINTS.map(({ Icon, label }) => (
                <li
                  key={label}
                  className="flex items-start gap-3 rounded-2xl bg-neutral-50 p-3 dark:bg-white/[0.06]"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-linear-to-br from-[#B31942] to-[#0A3161] text-white">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-xs font-medium leading-snug text-neutral-700 dark:text-slate-300">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4. "One-stop solution": editorial split between two drawn rules      */
/* ------------------------------------------------------------------ */
const ONE_STOP = [
  { Icon: Package, label: 'Unique goods' },
  { Icon: Building2, label: 'Agencies' },
  { Icon: Factory, label: 'Industries' },
  { Icon: SlidersHorizontal, label: 'Customizable filters' },
];

function OneStop() {
  return (
    <section className="relative overflow-hidden bg-white py-16 dark:bg-slate-950 lg:py-24">
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute left-1/2 top-1/2 h-72 w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4da3ff]/10 blur-[130px]" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-px origin-left bg-linear-to-r from-[#B31942] via-neutral-300 to-[#0A3161] dark:via-white/20"
        />

        <div className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16">
          <motion.div {...fade()}>
            <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#B31942] dark:text-[#ff8da0]">
              <Compass className="h-4 w-4" aria-hidden="true" />
              All in one place
            </span>
            <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight tracking-tight text-neutral-950 dark:text-white sm:text-4xl lg:text-[2.6rem]">
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff5a73] dark:via-white dark:to-[#5dbaf6]">
                USImportdata:
              </span>{' '}
              Your One-Stop Solution for Live US Shipment Data
            </h2>
          </motion.div>

          <motion.div {...fade(0.15)}>
            <p className="text-[15px] leading-relaxed text-neutral-600 dark:text-slate-400">
              {C.oneStop.text}
            </p>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
              }}
              className="mt-6 grid grid-cols-2 gap-3"
            >
              {ONE_STOP.map(({ Icon, label }) => (
                <motion.li
                  key={label}
                  variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                  className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm font-medium text-neutral-800 shadow-[0_6px_24px_rgba(20,20,60,0.05)] dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.10] dark:to-white/[0.03] dark:text-slate-200 dark:backdrop-blur-xl"
                >
                  <Icon
                    className="h-4.5 w-4.5 text-[#0A3161] dark:text-[#4da3ff]"
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                  {label}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-px origin-right bg-linear-to-r from-[#0A3161] via-neutral-300 to-[#B31942] dark:via-white/20"
        />
      </div>
    </section>
  );
}

export default function LiveDataInfoSections() {
  return (
    <MotionConfig reducedMotion="user">
      <HsIntro />
      <Navigate />
      <Why />
      <OneStop />
    </MotionConfig>
  );
}
