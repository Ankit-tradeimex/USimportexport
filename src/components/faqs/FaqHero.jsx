'use client';
import Link from 'next/link';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import {
  Building2,
  ChevronRight,
  CircleDollarSign,
  Database,
  Headphones,
  HelpCircle,
  Home,
  Info,
  Mail,
  MessageCircle,
  Phone,
  Search,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
const CONTENT = {
  titleTop: 'We have',
  titleAccent: 'answers',
  titleBottom: 'to the most of your questions!',
  text: 'Below mentioned are some of the most common and repeated questions with their answers which are asked from us about US Trade Data. Get answers to your queries below. If still you have any doubts or need clarification, feel free to contact us through email or call. Our support team will surely guide you with your problem and provide you with the best solution.',
};

/* category quick links: anchors by default, or pass onSelect to switch tabs */
const CATEGORIES = [
  { id: 'about', label: 'About us', Icon: Info },
  { id: 'trade-data', label: 'US trade data', Icon: Database },
  { id: 'business', label: 'Business in US', Icon: Building2 },
  { id: 'pricing', label: 'Pricing', Icon: CircleDollarSign },
];

/* orbiting nodes around the support orb */
const NODES = [
  { Icon: Mail, label: 'Email', angle: -90, tone: 'red' },
  { Icon: Phone, label: 'Call', angle: 0, tone: 'blue' },
  { Icon: MessageCircle, label: 'Chat', angle: 90, tone: 'red' },
  { Icon: HelpCircle, label: 'Guidance', angle: 180, tone: 'blue' },
];
const R = 38;

/* ------------------------------------------------------------------ */
/* Right visual: support orb                                           */
/* ------------------------------------------------------------------ */
function SupportOrb() {
  const reduce = useReducedMotion();

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      <div className="pointer-events-none absolute inset-4 rounded-full bg-linear-to-br from-[#B31942]/15 via-transparent to-[#0A3161]/25 blur-3xl dark:from-[#ff4d6d]/20 dark:to-[#4da3ff]/30" />
      <style>{`@keyframes faq-spin { to { transform: rotate(360deg); } }`}</style>

      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          strokeWidth="0.3"
          className="stroke-slate-200 dark:stroke-white/10"
        />
        <circle
          cx="50"
          cy="50"
          r="24"
          fill="none"
          strokeWidth="0.3"
          className="stroke-slate-300 dark:stroke-white/20"
        />
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          strokeWidth="0.35"
          strokeDasharray="1 2.5"
          className="stroke-slate-400 dark:stroke-white/30"
          style={
            reduce
              ? undefined
              : { transformOrigin: '50% 50%', animation: 'faq-spin 70s linear infinite' }
          }
        />
        {NODES.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          return (
            <line
              key={i}
              x1="50"
              y1="50"
              x2={50 + R * Math.cos(rad)}
              y2={50 + R * Math.sin(rad)}
              strokeWidth="0.35"
              strokeLinecap="round"
              className="stroke-slate-300 dark:stroke-white/20"
            />
          );
        })}
      </svg>

      {/* centre orb */}
      <div className="absolute left-1/2 top-1/2 flex h-[32%] w-[32%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-linear-to-br from-[#B31942] to-[#0A3161] text-white shadow-2xl">
        {!reduce &&
          [0, 1].map((r) => (
            <motion.span
              key={r}
              className="absolute inset-0 rounded-full border border-[#B31942]/50 dark:border-white/40"
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut', delay: r * 1.4 }}
            />
          ))}
        <Headphones className="h-9 w-9 sm:h-11 sm:w-11" aria-hidden="true" />
      </div>

      {/* nodes */}
      {NODES.map(({ Icon, label, angle, tone }, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 220, damping: 16 }}
            style={{ left: `${50 + R * Math.cos(rad)}%`, top: `${50 + R * Math.sin(rad)}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{
                duration: 4 + i * 0.4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.3,
              }}
              className="flex flex-col items-center gap-1.5"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-lg sm:h-16 sm:w-16 ${
                  tone === 'red' ? 'from-[#B31942] to-[#ff4d6d]' : 'from-[#0A3161] to-[#4da3ff]'
                }`}
              >
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
              </span>
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-white/80 dark:backdrop-blur">
                {label}
              </span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
/**
 * Props (all optional):
 *  - email         : e.g. "support@yourdomain.com"  -> shows an "Email us" button
 *  - phone         : e.g. "+1 555 000 0000"         -> shows a "Call us" button
 *  - onSelect(id)  : called when a category chip is clicked (to switch tabs). Without it, chips link to #faq-<id>.
 *  - onSearch(q)   : if given, a search box is shown and calls this as the user types.
 * If neither email nor phone is passed, a single "Contact us" button links to /contact-us.
 */
export default function FaqHero({ email, phone, onSelect, onSearch }) {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden px-4 pb-16 pt-8 sm:pb-24">
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(10,49,97,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(10,49,97,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,black,transparent)] dark:bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
          <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#0A3161]/10 blur-[110px] dark:bg-[#4da3ff]/20" />
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
                FAQs
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* copy */}
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl dark:text-white"
              >
                {CONTENT.titleTop}{' '}
                <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                  {CONTENT.titleAccent}
                </span>{' '}
                {CONTENT.titleBottom}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 dark:text-white/70"
              >
                {CONTENT.text}
              </motion.p>

              {/* contact buttons */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22 }}
                className="mt-7 flex flex-wrap items-center gap-3"
              >
                {email || phone ? (
                  <>
                    {email && (
                      <a
                        href={`mailto:${email}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#0A3161] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03] hover:bg-[#0c3d78] dark:bg-white dark:text-[#0A1A4A] dark:hover:bg-white/90"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        Email us
                      </a>
                    )}
                    {phone && (
                      <a
                        href={`tel:${phone.replace(/[^+\d]/g, '')}`}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 dark:border-white/25 dark:bg-white/5 dark:text-white dark:backdrop-blur dark:hover:border-white/50 dark:hover:bg-white/10"
                      >
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        Call us
                      </a>
                    )}
                  </>
                ) : (
                  <Link
                    href="/contact-us"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0A3161] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.03] hover:bg-[#0c3d78] dark:bg-white dark:text-[#0A1A4A] dark:hover:bg-white/90"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Contact us
                  </Link>
                )}
              </motion.div>

              {/* optional search */}
              {onSearch && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="relative mt-7 max-w-xl"
                >
                  <Search
                    className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-white/50"
                    aria-hidden="true"
                  />
                  <input
                    type="search"
                    onChange={(e) => onSearch(e.target.value)}
                    placeholder="Search the FAQs"
                    aria-label="Search the FAQs"
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#B31942]/60 focus:ring-4 focus:ring-[#B31942]/15 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:backdrop-blur"
                  />
                </motion.div>
              )}

              {/* category chips */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38 }}
                className="mt-7 flex flex-wrap gap-2.5"
              >
                {CATEGORIES.map(({ id, label, Icon }) => {
                  const cls =
                    'inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:-translate-y-0.5 hover:border-[#B31942]/40 hover:text-[#B31942] hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:backdrop-blur dark:hover:border-[#ff8da0]/50 dark:hover:text-[#ff8da0]';
                  const inner = (
                    <>
                      <Icon className="h-4 w-4" aria-hidden="true" />
                      {label}
                    </>
                  );
                  return onSelect ? (
                    <button key={id} type="button" onClick={() => onSelect(id)} className={cls}>
                      {inner}
                    </button>
                  ) : (
                    <a key={id} href={`#faq-${id}`} className={cls}>
                      {inner}
                    </a>
                  );
                })}
              </motion.div>
            </div>

            <SupportOrb />
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
