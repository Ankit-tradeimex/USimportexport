'use client';

import { useId, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { HelpCircle, Plus } from 'lucide-react';
import Image from 'next/image';
import AnimatedText from '../utils/AnimatedText';
import { HOME_FAQS } from '../../data/faqData';

/* ---- answer renderer: turns plain text into paragraphs, lists and links ---- */
// emails and http(s) links become clickable
const LINK_RE = /([\w.+-]+@[\w-]+(?:\.[\w-]+)+|https?:\/\/[^\s]+?(?=[.,;:!?)]*(?:\s|$)))/g;
const NUM_RE = /^\s*\d+[.)]\s+/;
const BULLET_RE = /^\s*[-•*]\s+/;

function linkify(text) {
  return text.split(LINK_RE).map((part, i) => {
    if (i % 2 === 0) return part; // plain text
    const href = part.includes('@') && !part.startsWith('http') ? `mailto:${part}` : part;
    const external = href.startsWith('http');
    return (
      <a
        key={i}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="font-medium text-[#B31942] underline decoration-[#B31942]/40 underline-offset-4 transition-colors hover:decoration-[#B31942] dark:text-[#ff8da0] dark:decoration-[#ff8da0]/40 dark:hover:decoration-[#ff8da0]"
      >
        {part}
      </a>
    );
  });
}

function Answer({ text }) {
  const blocks = String(text)
    .trim()
    .split(/\n{2,}/);
  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        const lines = block
          .split('\n')
          .map((l) => l.trim())
          .filter(Boolean);
        if (lines.length && lines.every((l) => NUM_RE.test(l))) {
          return (
            <ol
              key={i}
              className="list-decimal space-y-1.5 pl-5 marker:font-semibold marker:text-[#B31942] dark:marker:text-[#ff8da0]"
            >
              {lines.map((l, j) => (
                <li key={j} className="pl-1">
                  {linkify(l.replace(NUM_RE, ''))}
                </li>
              ))}
            </ol>
          );
        }
        if (lines.length && lines.every((l) => BULLET_RE.test(l))) {
          return (
            <ul
              key={i}
              className="list-disc space-y-1.5 pl-5 marker:text-[#B31942] dark:marker:text-[#ff8da0]"
            >
              {lines.map((l, j) => (
                <li key={j} className="pl-1">
                  {linkify(l.replace(BULLET_RE, ''))}
                </li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{linkify(lines.join(' '))}</p>;
      })}
    </div>
  );
}

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
            <div className="px-5 pb-5 text-sm leading-relaxed text-neutral-600 dark:text-slate-400 sm:px-6 sm:pb-6 sm:text-[15px]">
              <Answer text={item.a} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FaqSection({
  faqs = HOME_FAQS,
  title = 'Frequently Asked',
  highlight = 'Questions',
  subtitle = "Everything you need to know about US import-export data. Can't find your answer? Our team is happy to help.",
  image = '/assets/images/faq.webp',
  id = 'faq',
  schema = false,
}) {
  const [openIndex, setOpenIndex] = useState(0); // first one open by default
  if (!faqs?.length) return null;

  const jsonLd = schema
    ? JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }).replace(/</g, '\\u003c')
    : null;

  return (
    <MotionConfig reducedMotion="user">
      <section
        id={id}
        className="relative overflow-hidden bg-[#f6f9fe] px-6 py-20 dark:bg-slate-950 lg:px-10 lg:py-28"
      >
        {jsonLd && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
        )}

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
          <AnimatedText
            text={title}
            highlight={highlight}
            className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 dark:text-white sm:text-5xl"
            delay={0.2}
            stagger={0.08}
            duration={0.7}
          />
          <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-600 dark:text-slate-400">
            {subtitle}
          </p>
        </div>

        <div
          className={`relative mx-auto grid gap-12 ${
            image ? 'max-w-7xl lg:grid-cols-[0.8fr_1.2fr] lg:gap-20' : 'max-w-7xl'
          }`}
        >
          {/* ---------- left: image (hidden when `image` is null) ---------- */}
          {image && (
            <div className="lg:sticky lg:top-24 lg:self-start">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className=""
              >
                <Image
                  src={image}
                  alt="FAQ"
                  width={500}
                  height={500}
                  className="dark:rounded-2xl"
                />
              </motion.div>
            </div>
          )}

          {/* ---------- right: accordion ---------- */}
          <div className="space-y-3">
            {faqs.map((f, i) => (
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
