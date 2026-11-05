'use client';

import dynamic from 'next/dynamic';
import TickerBar from './TickerBar';
import { HiArrowLongRight } from 'react-icons/hi2';
import { Typewriter } from 'react-simple-typewriter';
import Link from 'next/link';
import Image from 'next/image';
import Stats from '../common/Stats';
import { motion } from 'framer-motion';

// Three.js needs the browser, so skip server rendering for the canvas.
const TradeGlobe = dynamic(() => import('./TradeGlobe'), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-950">
      {/* dark mode only: faint grid + colored glows (hidden in light mode) */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0
  bg-[linear-gradient(rgba(10,49,97,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(10,49,97,0.035)_1px,transparent_1px)]
  dark:bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)]
  [background-size:56px_56px]
  [mask-image:radial-gradient(ellipse_80%_65%_at_60%_30%,black,transparent)]"
        />
        <div className="absolute -left-48 top-24 h-[520px] w-[520px] rounded-full bg-[#ff4d6d]/10 blur-[130px]" />
        <div className="absolute -right-32 -top-20 h-[640px] w-[640px] rounded-full bg-[#4da3ff]/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-2 pb-10 pt-10 lg:px-4">
        <div className="grid items-center lg:grid-cols-2">
          {/* ---------- left: copy ---------- */}
          <div className="flex flex-col items-center lg:items-start justify-center ">
            <span className="text-center lg:text-start inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-sky-200 dark:backdrop-blur">
              {/* pulsing dot: dark mode only */}
              <span className="relative hidden h-1.5 w-1.5 dark:flex">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sky-400" />
              </span>
              Explore the Latest U.S. Trade Trends with US-Importdata
            </span>

            <motion.h1
              // initial={{ opacity: 0, y: 24 }}
              // whileInView={{ opacity: 1, y: 0 }}
              // viewport={{ once: true, amount: 0.5 }}
              // transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
              className="text-center lg:text-start mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-neutral-950 dark:text-white sm:text-6xl lg:text-7xl"
            >
              The Best U.S. <br />
              Import-Export <br />
              <span className="inline-grid align-baseline text-center lg:text-start">
                {/* invisible longest phrase keeps the heading from jumping */}
                <span
                  className="invisible col-start-1 row-start-1 whitespace-nowrap"
                  aria-hidden="true"
                >
                  Intelligence Partner.
                </span>
                <span className="col-start-1 row-start-1 whitespace-nowrap bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff5a73] dark:via-white dark:to-[#5dbaf6]">
                  <Typewriter
                    words={[
                      'Trade Data Provider.',
                      'Data Platform.',
                      'Intelligence Partner.',
                      'Research Platform.',
                    ]}
                    loop={0} // 0 = repeat forever
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                    deleteSpeed={40}
                    delaySpeed={1800} // how long each phrase stays before deleting
                  />
                </span>
              </span>
            </motion.h1>

            <motion.p
              // initial={{ opacity: 0, y: 24 }}
              // whileInView={{ opacity: 1, y: 0 }}
              // viewport={{ once: true, amount: 0.5 }}
              // transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
              className="text-center lg:text-start mt-6 max-w-md text-sm leading-relaxed text-neutral-600 dark:text-slate-400"
            >
              As an exclusive product of TradeImeX, USImportdata is a trusted source for US
              import-export trade data that provides you with complete insights into the US trade
              activities with its frequently updated US Import-Export database.
            </motion.p>

            <motion.div
              // initial={{ opacity: 0, y: 24 }}
              // whileInView={{ opacity: 1, y: 0 }}
              // viewport={{ once: true, amount: 0.5 }}
              // transition={{ duration: 0.6, delay: 1, ease: 'easeOut' }}
              className="mt-8 flex flex-wrap items-center gap-3 justify-center lg:justify-start"
            >
              <Link
                href="/contact-us"
                className="inline-flex items-center gap-2 rounded-lg gradient px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2a2a55] dark:shadow-[0_10px_30px_rgba(77,163,255,0.35)] dark:hover:brightness-110"
              >
                Request A Quote
                <span className="text-lg">
                  <HiArrowLongRight />
                </span>
              </Link>
              <Link
                href="/data-sample"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:backdrop-blur dark:hover:border-white/30 dark:hover:bg-white/10"
              >
                View Sample Data
                <span className="text-lg">
                  <HiArrowLongRight />
                </span>
              </Link>
            </motion.div>
          </div>

          {/* ---------- right: interactive 3D ---------- */}
          <div className="relative h-[380px] sm:h-[460px] lg:h-[540px]">
            {/* dark mode only: soft glow behind the globe */}
            <div className="pointer-events-none absolute inset-[10%] hidden rounded-full bg-[#4da3ff]/15 blur-3xl dark:block" />
            <TradeGlobe />
            <div className="pointer-events-none absolute bottom-10 right-20 flex flex-col gap-1.5 text-[11px] font-medium text-neutral-600 dark:rounded-xl dark:border dark:border-white/10 dark:bg-white/5 dark:px-3 dark:py-2.5 dark:text-slate-300 dark:backdrop-blur">
              <span className="inline-flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-[#0A3161] dark:bg-[#00bc7d] dark:shadow-[0_0_8px_#4da3ff]" />
                Exports from the U.S.
              </span>
              <span className="inline-flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-[#B31942] dark:bg-[#b31942] dark:shadow-[0_0_8px_#ff4d6d]" />
                Imports into the U.S.
              </span>
            </div>
          </div>
        </div>

        {/* ---------- bottom: ticker ---------- */}
        <div className="my-6">
          <TickerBar />
        </div>
        <Stats />

        <div className="grid items-center lg:grid-cols-2 gap-20">
          {/* ---------- left: copy ---------- */}
          <div>
            <p className="mt-6 text-sm leading-relaxed text-neutral-600 dark:text-slate-400">
              Our detailed US import data and US export reports contain all import and export
              records and trade statistics of the USA. Our US Bill of Lading records for import data
              of the USA and trade data of USA cover all the major trade data fields such as product
              description, HS code, date of shipment, US exporter/importer details, quantity, port,
              and more. Access US port data and live US maritime data for goods trade via sea route
              with our exclusive B/L trade reports for the US.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-neutral-600 dark:text-slate-400">
              Being a leading US import-export data provider and a trusted source of US trade
              statistics, USImportdata helps you to find profitable buyers and suppliers in the USA
              according to your product needs with our US importers data and US exporters data. Our
              live US shipment data and import-export data help you target the US market, access our
              filtered records, and detailed US import-export data by country, HS code, company,
              product, and port.
            </p>
            <p className="mt-6 text-sm leading-relaxed text-neutral-600 dark:text-slate-400">
              We empower businesses to optimize their trade strategies with our US import data and
              US export statistics by helping to find verified company suppliers & buyers in the US
              and understand their competitor company’s import-export activities.
            </p>
          </div>

          {/* ---------- right: interactive 3D ---------- */}
          <div className="relative dark:overflow-hidden dark:rounded-3xl dark:border dark:border-white/10 dark:bg-white/5 dark:p-3 dark:backdrop-blur">
            <Image
              src="/assets/images/navigate.gif"
              alt="Interactive Navigation"
              width={500}
              height={500}
              className="dark:rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
