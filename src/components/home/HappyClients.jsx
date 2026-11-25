'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Quote, Smile } from 'lucide-react';
import { CLIENTS_HOME, CLIENTS_PATH } from '@/data/happyClientsData';

/*
  Home section "Happy Clients": a wall of client logos. A spotlight moves from logo to logo
  (the highlighted logo turns to full colour). Hover a logo to stop and pick it.
  If the highlighted client has a quote, it shows in a card under the wall.
  Use:  <HappyClients />   (or  <HappyClients items={...} />  to pass your own list)
  The wording of the heading and the text is SAMPLE and needs your review.
*/

const wall = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } };
const pop = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

function Tile({ client, on, onEnter }) {
  return (
    <motion.li variants={pop} onMouseEnter={onEnter} className={on ? 'relative z-10' : ''}>
      <div
        className={`relative flex h-24 items-center justify-center overflow-hidden rounded-2xl border bg-white p-4 transition duration-500 ${
          on
            ? 'scale-[1.07] border-[#B31942]/50 shadow-xl ring-4 ring-[#B31942]/10'
            : 'border-slate-200 shadow-sm dark:border-white/15'
        }`}
      >
        {client.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={client.logo}
            alt={client.name}
            width={160}
            height={64}
            loading="lazy"
            className={`max-h-12 w-auto max-w-full object-contain transition duration-500 ${
              on ? 'opacity-100 grayscale-0' : 'opacity-60 grayscale'
            }`}
          />
        ) : (
          <span
            className={`text-center font-serif text-base font-bold leading-tight transition duration-500 ${
              on ? 'text-[#0A3161]' : 'text-slate-400'
            }`}
          >
            {client.name}
          </span>
        )}

        <span
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 h-1 origin-left bg-linear-to-r from-[#B31942] to-[#0A3161] transition-transform duration-500 ${
            on ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </div>
    </motion.li>
  );
}

export default function HappyClients({ items = CLIENTS_HOME, limit = 12 }) {
  const reduce = useReducedMotion();
  const list = items.slice(0, limit);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // the spotlight moves on every 2.6 seconds, unless the visitor is pointing at the wall
  useEffect(() => {
    if (reduce || paused || list.length < 2) return undefined;
    const id = setInterval(() => setActive((a) => (a + 1) % list.length), 2600);
    return () => clearInterval(id);
  }, [reduce, paused, list.length]);

  if (!list.length) return null;

  const current = list[active] || list[0];
  const hasQuotes = list.some((c) => c.quote);

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative overflow-hidden px-4 py-16 sm:py-24"
        aria-labelledby="happy-clients-title"
      >
        {/* background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(rgba(10,49,97,0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_70%_70%_at_70%_50%,black,transparent)] dark:bg-[radial-gradient(rgba(255,255,255,0.09)_1px,transparent_1px)]" />
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#B31942]/10 blur-[110px] dark:bg-[#ff4d6d]/15" />
          <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#0A3161]/10 blur-[120px] dark:bg-[#4da3ff]/20" />
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[0.9fr_1.4fr]">
          {/* text */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-white/70">
              <Smile className="h-4 w-4 text-[#B31942] dark:text-[#ff8da0]" aria-hidden="true" />
              Happy &amp; Satisfied
            </span>

            <h2
              id="happy-clients-title"
              className="mt-5 text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white"
            >
              Our{' '}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                Happy Clients
              </span>
            </h2>

            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70">
              Importers, exporters and trade teams rely on USImportdata for accurate, shipment-level
              trade data. Here are some of the companies that trust us.
            </p>

            <Link
              href={CLIENTS_PATH}
              className="group mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161] px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.04]"
            >
              View All Clients
              <ArrowRight
                className="h-4 w-4 transition group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </motion.div>

          {/* logo wall */}
          <div>
            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={wall}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3"
            >
              {list.map((c, i) => (
                <Tile
                  key={`${c.name}-${i}`}
                  client={c}
                  on={i === active}
                  onEnter={() => setActive(i)}
                />
              ))}
            </motion.ul>

            {/* quote of the highlighted client (only when the data has quotes) */}
            {hasQuotes && (
              <div className="mt-6 min-h-[8.5rem] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl">
                <AnimatePresence mode="wait">
                  {current.quote && (
                    <motion.figure
                      key={active}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-linear-to-br from-[#B31942] to-[#0A3161] text-white">
                        <Quote className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <blockquote className="text-sm leading-relaxed text-slate-700 sm:text-base dark:text-white/80">
                          {current.quote}
                        </blockquote>
                        <figcaption className="mt-2 text-sm font-semibold text-slate-900 dark:text-white">
                          {current.personName}
                          {current.personName && current.personRole ? ', ' : ''}
                          <span className="font-normal text-slate-500 dark:text-white/55">
                            {current.personRole}
                          </span>
                          {!current.personName && !current.personRole ? current.name : ''}
                        </figcaption>
                      </div>
                    </motion.figure>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
