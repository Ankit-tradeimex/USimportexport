'use client';

import Link from 'next/link';
import ContactForm from '../contact/ContactForm';

const BRAND = 'TradeImeX';

const COMPANY_LINKS = [
  { label: 'About Us', href: '/about' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Clients', href: '/clients' },
  { label: 'Faqs', href: '/faqs' },
  { label: 'Contact Us', href: '/contact-us' },
];

const DATA_LINKS = [
  { label: 'US Import data', href: '/us-import-data', target: '' },
  { label: 'US Export Data', href: '/us-export-data', target: '' },
  {
    label: 'Global Trade Data',
    href: 'https://www.tradeimex.in/global-trade-data',
    target: '_blank',
  },
  { label: 'Search Live Data', href: '/search-live-data', target: '' },
  { label: 'Product Directory', href: '/data-directory', target: '' },
  { label: 'HS Code Directory', href: '/hs-code-directory', target: '' },
];

const TOP_IMPORTS = [
  { label: 'Oil Import Data', href: '/us-import-data/oil' },
  { label: 'Car Import Data', href: '/us-import-data/car' },
  { label: 'Food Import Data', href: '/us-import-data/food' },
  { label: 'Surgical Equipment Import Data', href: '/us-import-data/surgical-equipment' },
  { label: 'Pharmaceutical Import Data', href: '/us-import-data/pharmaceutical' },
];

const TOP_EXPORTS = [
  { label: 'Pharmaceutical Export Data', href: '/us-export-data/pharmaceutical' },
  { label: 'Electronics Export Data', href: '/us-export-data/electronics' },
  { label: 'Oil Export Data', href: '/us-export-data/oil' },
  { label: 'Vehicles Export Data', href: '/us-export-data/vehicles' },
  { label: 'Soybean Export Data', href: '/us-export-data/soybean' },
];

const LEGAL_LINKS = [
  { label: 'Terms Of Use', href: '/terms-of-use' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Disclaimer', href: '/disclaimer' },
];

const SOCIALS = [
  {
    label: 'Facebook',
    href: '#',
    d: 'M22 12a10 10 0 1 0-11.5 9.9v-7H7.9V12h2.6V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z',
  },
  {
    label: 'X (Twitter)',
    href: '#',
    d: 'M18.2 2.2h3.4l-7.4 8.5 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9.100L.9 2.200h7l4.800 6.400 5.500-6.400zm-1.200 18h1.900L6.900 4H4.900l12.100 16.200z',
  },
  {
    label: 'LinkedIn',
    href: '#',
    d: 'M20.4 20.5h-3.6v-5.6c0-1.300 0-3-1.800-3s-2.100 1.400-2.100 2.900v5.700H9.300V9h3.400v1.600h.1c.5-.9 1.600-1.800 3.400-1.800 3.600 0 4.300 2.400 4.300 5.500v6.200zM5.300 7.400a2.100 2.100 0 1 1 0-4.100 2.100 2.100 0 0 1 0 4.100zM7.100 20.500H3.600V9h3.500v11.500z',
  },
  {
    label: 'YouTube',
    href: '#',
    d: 'M23 12s0-3.400-.4-5a2.600 2.600 0 0 0-1.800-1.800C19.200 4.800 12 4.800 12 4.800s-7.200 0-8.800.4A2.600 2.600 0 0 0 1.400 7C1 8.600 1 12 1 12s0 3.400.4 5a2.600 2.600 0 0 0 1.800 1.800c1.600.4 8.800.4 8.800.4s7.200 0 8.800-.4a2.600 2.600 0 0 0 1.800-1.800c.4-1.600.4-5 .4-5zM9.800 15.200V8.800L15.500 12l-5.700 3.200z',
  },
];

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

function FooterLinks({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              target={l.target}
              className="group inline-flex items-center gap-1.5 text-sm text-neutral-400 transition hover:text-[#B31942]"
            >
              <span className="h-px w-0 bg-[#B31942] transition-all duration-300 group-hover:w-3" />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

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

export default function Footer({ onChatClick }) {
  return (
    <footer className="relative overflow-hidden bg-[#07070f] text-neutral-300">
      {/* decorative glow + top hairline */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5DBAF6]/60 to-transparent" />
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#5DBAF6]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-2 pb-8 pt-16 lg:pt-20">
        <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12">
          {/* About */}
          <div className="lg:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
              About Us
            </h3>
            <p className="mt-5 text-sm leading-7 text-neutral-400">
              {BRAND} is the best platform when it comes to providing{' '}
              <strong className="font-semibold text-white">US import-export data</strong>. We follow
              cutting-edge techniques to design{' '}
              <strong className="font-semibold text-white">US Trade Data</strong> along with
              customizable trade reports and provide you with the best and error-free database.
              Contact us now for a quote and avail exclusive benefits.
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
          <div className="lg:col-span-5 lg:row-span-2">
            <ContactForm theme="dark" />
          </div>

          {/* Top imports */}
          <div className="lg:col-span-3">
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
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-neutral-400 transition hover:border-[#B31942] hover:bg-[#B31942]/10 hover:text-[#B31942]"
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
