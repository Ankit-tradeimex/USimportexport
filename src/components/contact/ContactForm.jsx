'use client';
import { useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { Check, Loader2, Send } from 'lucide-react';
import { DATA_TYPES } from '@/data/contactData';
import { PhoneField, SelectField, TextAreaField, TextField } from './FormFields';

/*
  Why this form does not re-render while you type:
  the inputs are uncontrolled (no value / onChange). The browser keeps what you type, and we read every field
  at once with FormData when the form is submitted. The only state here is the send status.
*/
export default function ContactForm() {
  const [status, setStatus] = useState('idle'); // idle | sending | done | error
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return; // native browser validation (required, email, pattern...)

    setStatus('sending');
    setErrors({});
    setMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        form.reset();
        setStatus('done');
      } else {
        setErrors(data.errors ?? {});
        setMessage(data.error ?? 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setMessage('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.55 }}
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl sm:p-8 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
      >
        {status === 'done' ? (
          <div className="flex flex-col items-center py-10 text-center" role="status">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
              <Check className="h-8 w-8" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-2xl font-semibold text-slate-900 dark:text-white">
              Thank you, we got your message
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-white/70">
              Our team will review your requirement and get back to you by email.
            </p>
            <button
              type="button"
              onClick={() => setStatus('idle')}
              className="mt-6 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-white/25 dark:text-white dark:hover:bg-white/10"
            >
              Send another enquiry
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
              Send us an enquiry
            </h2>
            <p className="mt-1.5 text-sm text-slate-600 dark:text-white/65">
              Fields marked * are required.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-5" aria-busy={status === 'sending'}>
              {/* honeypot: hidden from people, bots tend to fill it */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label>
                  Website
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Name"
                  name="name"
                  required
                  autoComplete="name"
                  placeholder="Your name"
                  error={errors.name}
                  maxLength={100}
                />
                <TextField
                  label="Company name"
                  name="company"
                  autoComplete="organization"
                  placeholder="Company name"
                  error={errors.company}
                  maxLength={120}
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <TextField
                  label="Business email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@company.com"
                  error={errors.email}
                  maxLength={160}
                />
                <SelectField
                  label="Data type"
                  name="dataType"
                  options={DATA_TYPES}
                  placeholder="Select data type"
                  error={errors.dataType}
                />
              </div>

              <PhoneField error={errors.phone} />

              <TextAreaField
                label="Query"
                name="query"
                required
                placeholder="Product, HS code, country or market requirement"
                error={errors.query}
              />

              {status === 'error' && message && (
                <p
                  role="alert"
                  className="rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-700 dark:text-red-300"
                >
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-[#B31942] to-[#0A3161] px-6 py-4 text-sm font-semibold text-white shadow-lg transition hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send enquiry
                    <Send
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </MotionConfig>
  );
}
