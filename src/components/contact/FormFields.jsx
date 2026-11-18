'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { DIAL_CODES } from '@/data/contactData';
import { FLAGS } from './countries';

/*
  Small field components. None of them hold the text the user types:
  the browser keeps the values and ContactForm reads them all at once with FormData when the form is sent.
  So typing in any field re-renders nothing.
*/

const input =
  'w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#B31942]/60 focus:ring-4 focus:ring-[#B31942]/15 user-invalid:border-red-500 aria-[invalid=true]:border-red-500 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40 dark:focus:border-[#ff8da0]/60 dark:focus:ring-[#ff8da0]/15';

function Wrap({ label, name, required, error, hint, children }) {
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <label htmlFor={name} className="text-sm font-semibold text-slate-800 dark:text-white/90">
          {label}
          {required && (
            <span className="ml-0.5 text-[#B31942] dark:text-[#ff8da0]" aria-hidden="true">
              *
            </span>
          )}
        </label>
        {hint && <span className="text-xs text-slate-400 dark:text-white/45">{hint}</span>}
      </div>
      {children}
      {error && (
        <p
          id={`${name}-error`}
          role="alert"
          className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export function TextField({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  autoComplete,
  error,
  maxLength,
}) {
  return (
    <Wrap label={label} name={name} required={required} error={error}>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={input}
      />
    </Wrap>
  );
}

export function SelectField({ label, name, options, placeholder = 'Select an option', error }) {
  return (
    <Wrap label={label} name={name} error={error}>
      <select
        id={name}
        name={name}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        className={`${input} appearance-none bg-[length:1rem] bg-[right_1rem_center] bg-no-repeat pr-10`}
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2394a3b8'%3E%3Cpath d='M5.3 7.3a1 1 0 011.4 0L10 10.6l3.3-3.3a1 1 0 111.4 1.4l-4 4a1 1 0 01-1.4 0l-4-4a1 1 0 010-1.4z'/%3E%3C/svg%3E\")",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </Wrap>
  );
}

export function TextAreaField({
  label,
  name,
  required,
  placeholder,
  error,
  rows = 5,
  maxLength = 3000,
}) {
  return (
    <Wrap label={label} name={name} required={required} error={error}>
      <textarea
        id={name}
        name={name}
        rows={rows}
        required={required}
        minLength={10}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`${input} resize-y`}
      />
    </Wrap>
  );
}

function Flag({ iso, className = 'h-4 w-6' }) {
  const F = FLAGS[iso];
  return F ? (
    <F
      className={`${className} shrink-0 rounded-[3px] object-cover shadow-sm`}
      aria-hidden="true"
    />
  ) : null;
}

/*
  Phone field: a searchable country-code dropdown with flags + the number input.
  Local state is only the chosen country and whether the list is open. A hidden input carries the code
  into FormData, and the number input stays uncontrolled.
*/
export function PhoneField({ error }) {
  const [iso, setIso] = useState('IN');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const boxRef = useRef(null);
  const listRef = useRef(null);
  const searchRef = useRef(null);

  const current = DIAL_CODES.find((d) => d.iso === iso) ?? DIAL_CODES[0];
  const isIndia = current.code === '+91';

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^\+/, '');
    if (!q) return DIAL_CODES;
    return DIAL_CODES.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.code.replace('+', '').startsWith(q) ||
        d.iso.toLowerCase() === q,
    );
  }, [query]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  const choose = (d) => {
    setIso(d.iso);
    close();
  };

  // close when clicking outside
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) close();
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // focus the search box on open, and start on the selected country
  useEffect(() => {
    if (open) {
      searchRef.current?.focus();
      setActive(
        Math.max(
          0,
          DIAL_CODES.findIndex((d) => d.iso === iso),
        ),
      );
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => setActive(0), [query]);

  // keep the highlighted row in view
  useEffect(() => {
    listRef.current?.children[active]?.scrollIntoView({ block: 'nearest' });
  }, [active, open]);

  const onKey = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filtered[active]) choose(filtered[active]);
    }
  };

  return (
    <Wrap
      label="Mobile / phone number"
      name="phone"
      error={error}
      hint={isIndia ? 'Format: +91 (10 digits)' : undefined}
    >
      <div className="flex gap-2">
        <div ref={boxRef} className="relative shrink-0">
          <input type="hidden" name="dialCode" value={current.code} />
          <button
            type="button"
            onClick={() => (open ? close() : setOpen(true))}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-label={`Country code: ${current.name} ${current.code}`}
            className={`${input} flex w-[8.5rem] items-center gap-2 px-3`}
          >
            <Flag iso={current.iso} />
            <span className="font-medium">{current.code}</span>
            <ChevronDown
              className={`ml-auto h-4 w-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}
              aria-hidden="true"
            />
          </button>

          {open && (
            <div
              onKeyDown={onKey}
              className="absolute left-0 top-full z-30 mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-white/15 dark:bg-[#12123a] dark:shadow-black/50"
            >
              <div className="relative border-b border-slate-100 p-2 dark:border-white/10">
                <Search
                  className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  aria-hidden="true"
                />
                <input
                  ref={searchRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search country or code"
                  aria-label="Search country or code"
                  className="w-full rounded-lg bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:bg-white/5 dark:text-white dark:placeholder:text-white/40"
                />
              </div>
              <ul
                ref={listRef}
                role="listbox"
                aria-label="Country codes"
                className="max-h-64 overflow-y-auto py-1"
              >
                {filtered.length === 0 && (
                  <li className="px-4 py-3 text-sm text-slate-500 dark:text-white/55">
                    No country found
                  </li>
                )}
                {filtered.map((d, i) => {
                  const selected = d.iso === iso;
                  return (
                    <li
                      key={d.iso}
                      role="option"
                      aria-selected={selected}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => choose(d)}
                      className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm ${
                        i === active ? 'bg-slate-100 dark:bg-white/10' : ''
                      }`}
                    >
                      <Flag iso={d.iso} />
                      <span className="min-w-0 flex-1 truncate text-slate-800 dark:text-white/90">
                        {d.name}
                      </span>
                      <span className="text-slate-500 dark:text-white/55">{d.code}</span>
                      {selected && (
                        <Check
                          className="h-4 w-4 text-[#B31942] dark:text-[#ff8da0]"
                          aria-hidden="true"
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          placeholder={isIndia ? 'e.g. 9999999999' : 'Phone number'}
          pattern={isIndia ? '\\d{10}' : '[\\d\\s\\-]{6,20}'}
          title={isIndia ? 'Enter a 10-digit mobile number' : 'Enter a valid phone number'}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? 'phone-error' : undefined}
          className={input}
        />
      </div>
    </Wrap>
  );
}
