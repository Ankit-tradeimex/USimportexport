'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, UserRound } from 'lucide-react';

export default function AuthorCard({ author }) {
  if (!author) return null;

  const { name, role, bio, image, profileUrl, socialLinks = {} } = author;

  return (
    <section className="my-10 overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-white/10 dark:bg-slate-900/60">
      <div className="border-b border-neutral-100 px-6 py-4 dark:border-white/10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400 dark:text-slate-500">
          About the writer
        </p>
      </div>

      <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:p-7">
        {/* Author image */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
          {image ? (
            <Image src={image} alt={name || 'Author'} fill sizes="80px" className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <UserRound size={32} className="text-neutral-400 dark:text-slate-500" />
            </div>
          )}
        </div>

        {/* Author details */}
        <div className="min-w-0 flex-1">
          <h3 className="text-2xl font-semibold tracking-tight text-[#B31942]">{name}</h3>

          {bio && (
            <p className="mt-3 text-sm leading-7 text-neutral-600 dark:text-slate-400">{bio}</p>
          )}

          <div className="mt-5 flex flex-wrap items-center gap-4">
            {profileUrl && (
              <Link
                href={profileUrl}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A3161] transition-colors hover:text-[#B31942] dark:text-blue-300 dark:hover:text-pink-400"
              >
                View author profile
                <ArrowUpRight size={15} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
