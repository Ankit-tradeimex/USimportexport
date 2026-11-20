'use client';
import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Check, Minus, Plus } from 'lucide-react';
import { dataPath } from '@/lib/dataSlug';

const linkCls =
  'font-medium text-[#0A3161] transition hover:text-[#B31942] dark:text-[#7cc4ff] dark:hover:text-[#ff8da0]';

function Card({ title, delay, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay }}
      className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.1] dark:to-white/[0.02] dark:shadow-none dark:backdrop-blur-xl"
    >
      <h3 className="bg-linear-to-r from-[#B31942] to-[#0A3161] px-5 py-3.5 text-center text-base font-semibold text-white">
        {title}
      </h3>
      <div className="max-h-[360px] overflow-y-auto p-4">{children}</div>
    </motion.div>
  );
}

/* HS code tree: chapter -> 6-digit codes. A code opens that code's own data page. */
function HsTree({ tree, role }) {
  const [open, setOpen] = useState(() => new Set());
  const toggle = (code) =>
    setOpen((s) => {
      const n = new Set(s);
      n.has(code) ? n.delete(code) : n.add(code);
      return n;
    });

  if (!tree.length)
    return (
      <p className="py-6 text-center text-sm text-slate-500 dark:text-white/55">No HS codes</p>
    );

  return (
    <ul className="space-y-1">
      {tree.map((n) => {
        const on = open.has(n.code);
        return (
          <li
            key={n.code}
            className="border-b border-slate-100 pb-1 last:border-0 dark:border-white/10"
          >
            <div className="flex items-center gap-2.5 py-1.5">
              <button
                type="button"
                aria-expanded={on}
                aria-label={`${on ? 'Collapse' : 'Expand'} chapter ${n.code}`}
                onClick={() => toggle(n.code)}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-[#B31942] text-white transition hover:scale-110"
              >
                {on ? (
                  <Minus className="h-3 w-3" aria-hidden="true" />
                ) : (
                  <Plus className="h-3 w-3" aria-hidden="true" />
                )}
              </button>
              <Link href={dataPath({ role, hs: n.code })} className={`${linkCls} text-[15px]`}>
                {n.code} ({n.count})
              </Link>
            </div>
            <AnimatePresence initial={false}>
              {on && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden pl-8"
                >
                  {n.children.map((c) => (
                    <li key={c.code} className="py-1">
                      <Link href={dataPath({ role, hs: c.code })} className={`${linkCls} text-sm`}>
                        {c.code} ({c.count})
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

function List({ items, href, active }) {
  if (!items.length)
    return <p className="py-6 text-center text-sm text-slate-500 dark:text-white/55">No data</p>;
  return (
    <ul className="space-y-1">
      {items.map((i) => (
        <li
          key={i.slug}
          className="border-b border-slate-100 py-2 last:border-0 dark:border-white/10"
        >
          <Link
            href={href(i.slug)}
            className={`${linkCls} flex items-center justify-between gap-2 text-[15px]`}
          >
            <span>
              {i.name} ({i.count})
            </span>
            {active === i.slug && (
              <Check className="h-4 w-4 shrink-0 text-[#B31942]" aria-label="Selected" />
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function DataFacets({ ctx, facets }) {
  const { role, hs, product, country, port } = ctx;
  const geo = role === 'import' ? 'Origin Country' : 'Destination Country';

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-10">
        <div className="mx-auto grid w-full max-w-7xl gap-5 lg:grid-cols-3">
          <Card title="HS CODE" delay={0}>
            <HsTree tree={facets.hs} role={role} />
          </Card>
          <Card title={geo} delay={0.08}>
            <List
              items={facets.countries}
              href={(slug) => dataPath({ role, hs, product, country: slug, port })}
              active={country}
            />
          </Card>
          <Card title="Unloading Port" delay={0.16}>
            <List
              items={facets.ports}
              href={(slug) => dataPath({ role, hs, product, country, port: slug })}
              active={port}
            />
          </Card>
        </div>
      </section>
    </MotionConfig>
  );
}
