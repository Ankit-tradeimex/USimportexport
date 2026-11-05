'use client';

import { useId, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { HelpCircle, Mail, Plus } from 'lucide-react';
import Image from 'next/image';
import AnimatedText from '../utils/AnimatedText';

const FAQS = [
  {
    q: 'What types of data does USImportdata provide?',
    a: 'At USImportdata, we provide US import data & US export data. Our US import data includes detailed information about goods entering the country. Our US export data provides insights into goods being shipped out of the country. Our US import-export database typically covers product descriptions, HS codes, quantities, importer & exporter details, origin & destination countries, and port details.',
  },
  {
    q: 'What is USImportdata, and how can it help my business?',
    a: 'USImportdata is a US trade data provider & trade intelligence platform that provides shipment-level US import-export data, including Bill of Lading records, importer-exporter databases, HS code details, product descriptions, and market analysis to help businesses track competitors, find buyers/suppliers, and identify growth opportunities.',
  },
  {
    q: 'What type of trade information is available on USImportdata?',
    a: 'Yes. You can look up any importer or exporter by name to see their shipment history, main products, trading partners and ports. This is useful for tracking competitors and checking a prospective partner.',
  },
  {
    q: 'Is the data from USImportdata updated regularly?',
    a: 'According to the company, the platform provides real-time or frequent updates on the US trade data, shipment trends, and market analysis so businesses can access current trade databases for decision-making.',
  },
  {
    q: 'Can I customize data reports based on my business needs?',
    a: 'Yes, USImportdata offers personalized and customizable trade reports tailored to specific industries, products, countries, and business goals for more targeted market research.',
  },
];

function Item({ item, open, onToggle, index }) {
  const uid = useId();
  const panelId = `${uid}-panel`;
  const btnId = `${uid}-btn`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: 'easeOut' }}
      className={`overflow-hidden rounded-2xl border bg-white transition-[border-color,box-shadow] duration-300 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:backdrop-blur-xl ${
        open
          ? 'border-[#B31942]/60 dark:border-[#ff4d6d]/50 dark:shadow-[0_12px_40px_rgba(77,163,255,0.2)]'
          : 'border-neutral-200 shadow-[0_2px_10px_rgba(20,20,60,0.04)] hover:border-neutral-300 dark:border-white/10 dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] dark:hover:border-white/25'
      }`}
    >
      <h3>
        <button
          id={btnId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex cursor-pointer w-full items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#B31942]/40 sm:px-6 sm:py-5"
        >
          <span
            className={`text-[15px] font-semibold leading-snug transition-colors sm:text-base ${
              open ? 'text-neutral-950 dark:text-white' : 'text-neutral-800 dark:text-slate-300'
            }`}
          >
            {item.q}
          </span>
          <motion.span
            animate={{ rotate: open ? 135 : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${
              open
                ? 'bg-[#B31942] text-white'
                : 'bg-neutral-100 text-neutral-600 dark:bg-white/10 dark:text-slate-300'
            }`}
          >
            <Plus className="h-4 w-4" strokeWidth={2.2} aria-hidden="true" />
          </motion.span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-neutral-600 dark:text-slate-400 sm:px-6 sm:pb-6 sm:text-[15px]">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0); // first one open by default

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="faq"
        className="relative overflow-hidden bg-[#f6f9fe] px-6 py-20 dark:bg-slate-950 lg:px-10 lg:py-28"
      >
        {/* dark mode only: faint grid + colored glows behind the glass */}
        <div className="pointer-events-none absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
          <div className="absolute left-[4%] top-[40%] h-72 w-72 rounded-full bg-[#4da3ff]/20 blur-[110px]" />
          <div className="absolute right-[6%] top-[38%] h-72 w-72 rounded-full bg-[#ff4d6d]/15 blur-[110px]" />
          <div className="absolute bottom-[8%] right-[30%] h-64 w-64 rounded-full bg-[#4da3ff]/15 blur-[110px]" />
          <div className="absolute left-1/2 top-0 h-56 w-[55%] -translate-x-1/2 rounded-full bg-[#4da3ff]/15 blur-[110px]" />
        </div>

        <div className="relative mx-auto max-w-3xl text-center flex flex-col items-center mb-10">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-sky-200 dark:backdrop-blur">
            <HelpCircle className="h-3 w-3 text-[#B31942] dark:text-[#ff7a90]" aria-hidden="true" />
            FAQ
          </span>
          {/* <h2 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl">
                Frequently asked{" "}
                <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent">
                  questions
                </span>
            </h2> */}
          <AnimatedText
            text="Frequently Asked"
            highlight="Questions"
            className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 dark:text-white sm:text-5xl"
            delay={0.2}
            stagger={0.08}
            duration={0.7}
          />
          <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-600 dark:text-slate-400">
            Everything you need to know about US import-export data. Can't find your answer? Our
            team is happy to help.
          </p>
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* ---------- left: heading + help card ---------- */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className=""
            >
              <Image
                src="/assets/images/faq.webp"
                alt="FAQ"
                width={500}
                height={500}
                className="dark:rounded-2xl"
              />
            </motion.div>
          </div>

          {/* ---------- right: accordion ---------- */}
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <Item
                key={f.q}
                item={f}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
              />
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
