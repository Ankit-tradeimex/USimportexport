'use client';
import { useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { Building2, Check, Copy, Mail, MapPin, Phone } from 'lucide-react';
import { CONTACT } from '@/data/contactData';

function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };
  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? 'Copied' : `Copy ${label}`}
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 dark:border-white/10 dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-emerald-500" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

const CARD =
  'rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-xl dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl';

function InfoCard({ Icon, title, tone, children, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
      className={CARD}
    >
      <div className="flex items-start gap-4">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-md ${
            tone === 'red' ? 'from-[#B31942] to-[#ff4d6d]' : 'from-[#0A3161] to-[#4da3ff]'
          }`}
        >
          <Icon className="h-6 w-6" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-white/55">
            {title}
          </h3>
          <div className="mt-1.5 space-y-1.5">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}

const linkCls =
  'break-all text-base font-semibold text-slate-900 transition hover:text-[#B31942] dark:text-white dark:hover:text-[#ff8da0]';

export default function ContactInfo() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="space-y-5">
        <InfoCard Icon={Mail} title="Email us" tone="red" delay={0}>
          <div className="flex items-center justify-between gap-3">
            <a href={`mailto:${CONTACT.email}`} className={linkCls}>
              {CONTACT.email}
            </a>
            <CopyButton value={CONTACT.email} label="email" />
          </div>
        </InfoCard>

        <InfoCard Icon={Phone} title="Call us" tone="blue" delay={0.08}>
          {CONTACT.phones.map((p) => (
            <div key={p} className="flex items-center justify-between gap-3">
              <a href={`tel:${p.replace(/[^+\d]/g, '')}`} className={linkCls}>
                {p}
              </a>
              <CopyButton value={p} label="phone number" />
            </div>
          ))}
        </InfoCard>

        <InfoCard Icon={MapPin} title="Visit us" tone="red" delay={0.16}>
          <p className="text-base font-semibold text-slate-900 dark:text-white">
            {CONTACT.address}
          </p>
        </InfoCard>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.24 }}
          className="relative overflow-hidden rounded-3xl bg-[#07071f] bg-linear-to-br from-[#0a0a2e] via-[#17104d] to-[#0a1a4a] p-6 text-white"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#ff4d6d]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-[#4da3ff]/25 blur-3xl" />
          <div className="relative flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
              <Building2 className="h-5 w-5 text-[#7cc4ff]" aria-hidden="true" />
            </span>
            <div>
              <p className="font-semibold">{CONTACT.company}</p>
              <p className="mt-1 text-sm leading-relaxed text-white/70">
                USimportdata is an exclusive product of TradeImeX.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}
