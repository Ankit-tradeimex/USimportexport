'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import {
  Menu,
  X,
  ChevronDown,
  Ship,
  Globe2,
  Building2,
  FileSearch,
  ArrowUpRight,
} from 'lucide-react';
import ThemeToggle from '../utils/ThemeToggle';

const navLinks = [
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Search Live Data',
    href: '/search-live-data',
  },
  {
    name: 'Faqs',
    href: '/faqs',
  },
  {
    name: 'Blogs',
    href: '/blogs',
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dataOpen, setDataOpen] = useState(false);
  const [mobileDataOpen, setMobileDataOpen] = useState(false);

  const dataLinks = [
    {
      name: 'US Import Data',
      description: 'Explore incoming shipments and US import records.',
      href: '/import-data',
      icon: Ship,
    },
    {
      name: 'US Export Data',
      description: 'Discover outgoing shipments and export records.',
      href: '/export-data',
      icon: Globe2,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-transparent backdrop-blur-md">
      <nav className="mx-auto flex w-full items-center justify-between px-5 py-3 lg:px-10">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/logos/logo.png"
            alt="US TradeData Logo"
            width={120}
            height={55}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 lg:flex">
          {navLinks.slice(0, 1).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-heading text-base font-semibold text-black dark:text-white transition-colors hover:text-[#B31942]"
            >
              {link.name}
            </Link>
          ))}

          {/* Data Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setDataOpen(true)}
            onMouseLeave={() => setDataOpen(false)}
          >
            <button
              onClick={() => setDataOpen(!dataOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setDataOpen(false);
              }}
              aria-expanded={dataOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 font-heading text-base font-semibold transition-colors ${
                dataOpen ? 'text-[#B31942]' : 'text-black dark:text-white hover:text-[#B31942]'
              }`}
            >
              Data
              <ChevronDown
                size={16}
                className={`transition-transform duration-200 ${dataOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Dropdown Menu */}
            <div
              className={`absolute left-1/2 top-full z-50 w-[390px] -translate-x-1/2 pt-5 transition-all duration-200 ${
                dataOpen ? 'visible translate-y-0 opacity-100' : 'invisible translate-y-2 opacity-0'
              }`}
            >
              <div className="rounded-2xl border border-slate-100 bg-white p-3 shadow-[0_15px_50px_rgba(15,23,42,0.12)]">
                <div className="px-3 pb-3 pt-2">
                  <p className="font-heading text-xs font-bold uppercase tracking-wider text-slate-400">
                    Explore Trade Data
                  </p>
                </div>

                {dataLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setDataOpen(false)}
                      className="group flex items-center gap-4 rounded-xl p-3 transition-all hover:bg-[#fff0f086]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#feeaea] text-[#B31942] transition-colors group-hover:bg-[#fcd8d8]">
                        <Icon size={23} strokeWidth={1.8} />
                      </div>

                      <div className="flex-1">
                        <p className="font-heading text-sm font-bold text-slate-800 transition-colors group-hover:text-[#B31942]">
                          {item.name}
                        </p>

                        <p className="mt-1 font-body text-xs leading-relaxed text-slate-500">
                          {item.description}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={17}
                        className="text-slate-300 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#B31942]"
                      />
                    </Link>
                  );
                })}

                <div className="mt-2 border-t border-slate-100 px-3 py-3">
                  <p className="font-body text-xs text-slate-500">
                    Access US trade intelligence in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Remaining Links */}
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-heading text-base font-semibold text-black dark:text-white transition-colors hover:text-[#B31942]"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-6 lg:flex">
          <ThemeToggle />
          <Link
            href="/login"
            className="font-heading text-base font-semibold text-black dark:text-white transition hover:text-[#B31942]"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="flex items-center gap-2 rounded-lg gradient px-5 py-3 font-heading text-sm font-bold text-white shadow-sm transition-all hover:shadow-md"
          >
            Get Started
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="bg-white dark:bg-slate-950 px-5 py-5 shadow-lg lg:hidden">
          <div className="flex flex-col">
            {navLinks.slice(0, 1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 font-heading text-sm font-semibold text-slate-700 dark:text-white transition-colors hover:text-[#B31942]"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Data Dropdown */}
            <div className="">
              <button
                onClick={() => setMobileDataOpen(!mobileDataOpen)}
                className="flex w-full items-center justify-between py-3 font-heading text-sm font-semibold text-slate-700 dark:text-white transition-colors hover:text-[#B31942]"
                aria-expanded={mobileDataOpen}
              >
                Data
                <ChevronDown
                  size={18}
                  className={`transition-transform ${mobileDataOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {mobileDataOpen && (
                <div className="mb-3 flex flex-col gap-1 pl-3">
                  {dataLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg p-3 hover:bg-[#F0F8FE]"
                      >
                        <Icon size={19} className="text-[#B31942]" />

                        <div>
                          <p className="font-heading text-sm font-semibold text-slate-800 dark:text-white transition-colors hover:text-[#B31942]">
                            {item.name}
                          </p>
                          <p className="font-body text-xs text-slate-500 dark:text-white/70">
                            {item.description}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 font-heading text-sm font-semibold text-slate-700 dark:text-white transition-colors hover:text-[#B31942]"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Actions */}
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="py-2 font-heading text-sm font-semibold text-slate-700 dark:text-white transition hover:text-[#B31942]"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg gradient px-5 py-3 text-center font-heading text-sm font-bold text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
