'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MotionConfig, animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CLIENTS } from '@/data/clientsData';

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */
const CONTENT = {
  title: 'A Growing',
  accent: 'Client Network',
  text: 'USImportdata takes pride in its diverse and expanding client base across the United States and worldwide. With more than 10,000 active users, our trade database platform supports companies of all sizes, from startups exploring new markets to multinational corporations managing complex import–export trade. Our extensive network is proof of our commitment to data accuracy, service quality, and client success.',
  lead: 'Some of our esteemed clients include:',
  stat: { value: 10000, suffix: '+', label: 'active users' },
  cta: { label: 'Join them: contact us', href: '/contact-us' },
};

/* ------------------------------------------------------------------ */
/* Count-up                                                            */
/* ------------------------------------------------------------------ */
function CountUp({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) return setN(value);
    const c = animate(0, value, {
      duration: 2,
      ease: 'easeOut',
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      {n.toLocaleString('en-US')}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Client tile: spotlight follows the mouse (no React state)           */
/* ------------------------------------------------------------------ */
function Tile({ client, index }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 20,
        delay: (index % 3) * 0.07 + Math.floor(index / 3) * 0.06,
      }}
      whileHover={{ y: -6, scale: 1.03 }}
    >
      <div
        ref={ref}
        onMouseMove={onMove}
        className="group relative flex aspect-[3/2] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-xl dark:border-white/10 dark:shadow-none"
      >
        {/* spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(180px circle at var(--mx, 50%) var(--my, 50%), rgba(179,25,66,0.14), rgba(10,49,97,0.10) 45%, transparent 70%)',
          }}
        />
        {client.logo ? (
          <Image
            src={client.logo}
            alt={client.name}
            width={320}
            height={120}
            className="relative h-full w-full object-contain opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
          />
        ) : (
          <span className="relative text-center text-base font-bold leading-tight tracking-tight text-slate-700 transition-colors group-hover:text-[#B31942] sm:text-lg">
            {client.name}
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function ClientNetworkSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-16 sm:py-24">
        <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.4fr] lg:gap-16">
          {/* ---------- left: copy + stat (sticky) ---------- */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                {CONTENT.title}{' '}
                <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                  {CONTENT.accent}
                </span>
              </h2>

              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70">
                {CONTENT.text}
              </p>

              {/* stat */}
              <div className="mt-8 flex items-center gap-5 rounded-3xl bg-[#07071f] bg-linear-to-br from-[#0a0a2e] via-[#17104d] to-[#0a1a4a] p-6 text-white shadow-xl">
                <div className="bg-linear-to-r from-[#7cc4ff] via-white to-[#ff8da0] bg-clip-text text-5xl font-bold leading-none tracking-tight text-transparent sm:text-6xl">
                  <CountUp value={CONTENT.stat.value} suffix={CONTENT.stat.suffix} />
                </div>
                <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  {CONTENT.stat.label}
                </p>
              </div>

              <Link
                href={CONTENT.cta.href}
                className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0A3161] dark:text-[#7cc4ff]"
              >
                {CONTENT.cta.label}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          </div>

          {/* ---------- right: client tiles ---------- */}
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-5 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-white/55"
            >
              {CONTENT.lead}
            </motion.p>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {CLIENTS.map((c, i) => (
                <Tile key={c.name} client={c} index={i} />
              ))}

              {/* "and many more" fills the last row */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 220, damping: 20, delay: 0.3 }}
                className="flex items-center justify-center gap-2.5 rounded-2xl bg-linear-to-r from-[#B31942] to-[#0A3161] p-5 text-center text-base font-semibold text-white shadow-lg sm:col-span-2"
              >
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                and many more
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
