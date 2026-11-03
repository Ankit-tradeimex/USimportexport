"use client";

import Link from "next/link";
import { useState } from "react";

/* ------------------------------------------------------------------ */
/* Content (edit freely; hrefs are placeholders)                       */
/* ------------------------------------------------------------------ */
const BRAND = "TradeImeX";

const COMPANY_LINKS = [
  { label: "About Us", href: "/about-us" },
  { label: "Blogs", href: "/blogs" },
  { label: "Clients", href: "/clients" },
  { label: "Faqs", href: "/faqs" },
  { label: "Contact Us", href: "/contact-us" },
];

const DATA_LINKS = [
  { label: "Import data", href: "/import-data" },
  { label: "Export Data", href: "/export-data" },
  { label: "Global Trade Data", href: "/global-trade-data" },
  { label: "Search Live Data", href: "/search-live-data" },
  { label: "Product Directory", href: "/product-directory" },
  { label: "HS Code Directory", href: "/hs-code-directory" },
];

const TOP_IMPORTS = [
  { label: "Oil Import Data", href: "/us-import-data/oil" },
  { label: "Car Import Data", href: "/us-import-data/car" },
  { label: "Food Import Data", href: "/us-import-data/food" },
  { label: "Surgical Equipment Import Data", href: "/us-import-data/surgical-equipment" },
  { label: "Pharmaceutical Import Data", href: "/us-import-data/pharmaceutical" },
];

const TOP_EXPORTS = [
  { label: "Pharmaceutical Export Data", href: "/us-export-data/pharmaceutical" },
  { label: "Electronics Export Data", href: "/us-export-data/electronics" },
  { label: "Oil Export Data", href: "/us-export-data/oil" },
  { label: "Vehicles Export Data", href: "/us-export-data/vehicles" },
  { label: "Soybean Export Data", href: "/us-export-data/soybean" },
];

const LEGAL_LINKS = [
  { label: "Terms Of Use", href: "/terms-of-use" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Disclaimer", href: "/disclaimer" },
];

const SOCIALS = [
  { label: "Facebook", href: "#", d: "M22 12a10 10 0 1 0-11.5 9.9v-7H7.9V12h2.6V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" },
  { label: "X (Twitter)", href: "#", d: "M18.2 2.2h3.4l-7.4 8.5 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9.100L.9 2.200h7l4.800 6.400 5.500-6.400zm-1.200 18h1.900L6.900 4H4.900l12.100 16.200z" },
  { label: "LinkedIn", href: "#", d: "M20.4 20.5h-3.6v-5.6c0-1.300 0-3-1.800-3s-2.100 1.400-2.100 2.900v5.700H9.300V9h3.400v1.600h.1c.5-.9 1.600-1.800 3.400-1.800 3.600 0 4.300 2.400 4.300 5.500v6.200zM5.300 7.400a2.100 2.100 0 1 1 0-4.100 2.100 2.100 0 0 1 0 4.100zM7.100 20.500H3.600V9h3.500v11.500z" },
  { label: "YouTube", href: "#", d: "M23 12s0-3.400-.4-5a2.600 2.600 0 0 0-1.800-1.800C19.200 4.800 12 4.800 12 4.800s-7.200 0-8.800.4A2.600 2.600 0 0 0 1.400 7C1 8.600 1 12 1 12s0 3.400.4 5a2.600 2.600 0 0 0 1.800 1.800c1.600.4 8.800.4 8.800.4s7.200 0 8.800-.4a2.600 2.600 0 0 0 1.800-1.800c.4-1.600.4-5 .4-5zM9.800 15.200V8.800L15.500 12l-5.700 3.200z" },
];

const PHONE_CODES = [
  { code: "+1", label: "US +1" },
  { code: "+91", label: "IN +91" },
  { code: "+44", label: "UK +44" },
  { code: "+86", label: "CN +86" },
  { code: "+971", label: "AE +971" },
  { code: "+49", label: "DE +49" },
  { code: "+65", label: "SG +65" },
  { code: "+61", label: "AU +61" },
];

/* ------------------------------------------------------------------ */
/* Small pieces                                                        */
/* ------------------------------------------------------------------ */
const inputBase =
  "h-12 w-full rounded-xl border border-white/10 bg-white/5 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-[#5DBAF6] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#5DBAF6]/20";

function Icon({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const UserIcon = () => (
  <Icon>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21a8 8 0 0 1 16 0" />
  </Icon>
);
const MailIcon = () => (
  <Icon>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Icon>
);
const BuildingIcon = () => (
  <Icon>
    <rect x="5" y="3" width="14" height="18" rx="1.500" />
    <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3" />
  </Icon>
);

function Field({ id, label, icon, children, className = "" }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-neutral-200">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500">
            {icon}
          </span>
        )}
        {children}
      </div>
    </div>
  );
}

function FooterLinks({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-1.5 text-sm text-neutral-400 transition hover:text-[#5DBAF6]"
            >
              <span className="h-px w-0 bg-[#5DBAF6] transition-all duration-300 group-hover:w-3" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Contact form                                                        */
/* ------------------------------------------------------------------ */
const EMPTY = {
  name: "",
  email: "",
  phoneCode: "+1",
  phone: "",
  company: "",
  tradeType: "",
  requirement: "",
};

function ContactForm({ onSubmit }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      er.email = "Please enter a valid email.";
    if (form.phone && form.phone.replace(/\D/g, "").length < 6)
      er.phone = "Please enter a valid phone number.";
    return er;
  };

  const submit = async (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("sending");
    try {
      if (onSubmit) {
        await onSubmit(form);
      } else {
        console.info("Footer contact form (no onSubmit handler set):", form);
      }
      setStatus("success");
      setForm(EMPTY);
    } catch {
      setStatus("error");
    }
  };

  const errText = (key) =>
    errors[key] ? (
      <p role="alert" className="mt-1.5 text-xs text-red-400">
        {errors[key]}
      </p>
    ) : null;

  if (status === "success") {
    return (
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-[#5DBAF6]/15 text-[#5DBAF6]">
          <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.200" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m5 12.500 4.500 4.500L19 7.500" />
          </svg>
        </span>
        <h4 className="mt-5 text-lg font-semibold text-white">Thanks, we got it!</h4>
        <p className="mt-2 max-w-xs text-sm text-neutral-400">
          Our team will get back to you shortly with a quote.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-medium text-[#5DBAF6] hover:underline"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7"
    >
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
        Contact Us
      </h3>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <Field id="ft-name" label="Name" icon={<UserIcon />}>
            <input
              id="ft-name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={set("name")}
              placeholder="Name"
              aria-invalid={!!errors.name}
              className={`${inputBase} pl-10 pr-3 ${errors.name ? "border-red-400/70" : ""}`}
            />
          </Field>
          {errText("name")}
        </div>

        <div>
          <Field id="ft-email" label="Email" icon={<MailIcon />}>
            <input
              id="ft-email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={set("email")}
              placeholder="E-Mail"
              aria-invalid={!!errors.email}
              className={`${inputBase} pl-10 pr-3 ${errors.email ? "border-red-400/70" : ""}`}
            />
          </Field>
          {errText("email")}
        </div>

        <div>
          <label htmlFor="ft-phone" className="mb-2 block text-sm font-medium text-neutral-200">
            Phone number:
          </label>
          <div
            className={`flex h-12 overflow-hidden rounded-xl border bg-white/5 transition focus-within:border-[#5DBAF6] focus-within:ring-4 focus-within:ring-[#5DBAF6]/20 ${
              errors.phone ? "border-red-400/70" : "border-white/10"
            }`}
          >
            <select
              aria-label="Country code"
              value={form.phoneCode}
              onChange={set("phoneCode")}
              className="h-full cursor-pointer border-r border-white/10 bg-[#14142a] pl-3 pr-1 text-xs font-medium text-neutral-200 outline-none"
            >
              {PHONE_CODES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              id="ft-phone"
              type="tel"
              autoComplete="tel-national"
              value={form.phone}
              onChange={set("phone")}
              placeholder="201-555-0123"
              className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-neutral-500"
            />
          </div>
          {errText("phone")}
        </div>

        <Field id="ft-company" label="Company" icon={<BuildingIcon />}>
          <input
            id="ft-company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={set("company")}
            placeholder="Company"
            className={`${inputBase} pl-10 pr-3`}
          />
        </Field>
      </div>

      <div className="mt-5">
        <label htmlFor="ft-type" className="mb-2 block text-sm font-medium text-neutral-200">
          Import/Export
        </label>
        <div className="relative">
          <select
            id="ft-type"
            value={form.tradeType}
            onChange={set("tradeType")}
            className={`${inputBase} cursor-pointer appearance-none bg-[#14142a] px-3.5 pr-10 ${
              form.tradeType ? "" : "text-neutral-500"
            }`}
          >
            <option value="">Select...</option>
            <option value="import">Import</option>
            <option value="export">Export</option>
            <option value="both">Both</option>
          </select>
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="ft-req" className="mb-2 block text-sm font-medium text-neutral-200">
          Describe Your Requirement
        </label>
        <textarea
          id="ft-req"
          rows={4}
          value={form.requirement}
          onChange={set("requirement")}
          placeholder="Describe Your Requirement..."
          className="w-full resize-y rounded-xl border border-white/10 bg-white/5 px-3.5 py-3 text-sm text-white outline-none transition placeholder:text-neutral-500 focus:border-[#5DBAF6] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#5DBAF6]/20"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="mt-4 text-sm text-red-400">
          Something went wrong. Please try again.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#5DBAF6] text-sm font-semibold text-[#07070f] transition hover:bg-[#7ccaff] focus:outline-none focus:ring-4 focus:ring-[#5DBAF6]/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending..." : "Submit"}
        {status !== "sending" && <span aria-hidden="true">→</span>}
      </button>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Floating chat button                                                */
/* ------------------------------------------------------------------ */
function ChatButton({ onClick }) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3">
      <span className="hidden rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 shadow-lg sm:block">
        Chat with us <span aria-hidden="true">👋</span>
      </span>
      <button
        type="button"
        onClick={onClick}
        aria-label="Chat with us"
        className="grid h-14 w-14 place-items-center rounded-full bg-[#5DBAF6] text-[#07070f] shadow-[0_8px_30px_rgba(93,186,246,0.45)] transition hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#5DBAF6]/40"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
          <path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
        </svg>
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */
/**
 * Props:
 *  - onSubmit(form): async handler for the contact form (e.g. POST to your API).
 *  - onChatClick(): called when the floating chat button is clicked.
 */
export default function Footer({ onSubmit, onChatClick }) {
  return (
    <footer className="relative overflow-hidden bg-[#07070f] text-neutral-300">
      {/* decorative glow + top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5DBAF6]/60 to-transparent" />
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#5DBAF6]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-10 lg:pt-20">
        <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12">
          {/* About */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
              About Us
            </h3>
            <p className="mt-5 text-sm leading-7 text-neutral-400">
              {BRAND} is the best platform when it comes to providing{" "}
              <strong className="font-semibold text-white">
                US import-export data
              </strong>
              . We follow cutting-edge techniques to design{" "}
              <strong className="font-semibold text-white">US Trade Data</strong>{" "}
              along with customizable trade reports and provide you with the
              best and error-free database. Contact us now for a quote and
              avail exclusive benefits.
            </p>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <FooterLinks title="Company" links={COMPANY_LINKS} />
          </div>

          {/* Our Data */}
          <div className="lg:col-span-2">
            <FooterLinks title="Our Data" links={DATA_LINKS} />
          </div>

          {/* Contact form spans both rows on desktop */}
          <div className="lg:col-span-4 lg:row-span-2">
            <ContactForm onSubmit={onSubmit} />
          </div>

          {/* Top imports */}
          <div className="lg:col-span-4">
            <FooterLinks title="US Top Imports Data" links={TOP_IMPORTS} />
          </div>

          {/* Top exports */}
          <div className="lg:col-span-4">
            <FooterLinks title="US Top Exports Data" links={TOP_EXPORTS} />
          </div>
        </div>

        {/* bottom bar */}
        <div className="mt-16 flex flex-col items-center gap-5 border-t border-white/10 pt-8 text-sm text-neutral-500 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-neutral-400 transition hover:border-[#5DBAF6] hover:bg-[#5DBAF6]/10 hover:text-[#5DBAF6]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>

          <nav aria-label="Legal" className="flex flex-wrap items-center justify-center gap-x-2">
            {LEGAL_LINKS.map((l, i) => (
              <span key={l.label} className="flex items-center gap-2">
                <a href={l.href} className="transition hover:text-white">
                  {l.label}
                </a>
                {i < LEGAL_LINKS.length - 1 && <span aria-hidden="true">|</span>}
              </span>
            ))}
          </nav>

          <p className="text-center md:pr-20 md:text-right">
            © 2026 {BRAND}™ . All Rights Reserved.
          </p>
        </div>
      </div>

      <ChatButton onClick={onChatClick} />
    </footer>
  );
}