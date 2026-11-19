import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import FaqSection from '@/components/common/FaqSection';
import { HS_FAQS } from '@/data/faqData';
import { modeLabel } from '@/data/hsDirectoryData';
import HsDirectoryHero from './HsDirectoryHero';
import HsModeSwitcher from './HsModeSwitcher';
import HsChapterExplorer from './HsChapterExplorer';
import HsCodeAnatomy from './HsCodeAnatomy';

export default function HsOverview({ modeKey, mode }) {
  return (
    <>
      <HsDirectoryHero />
      <div className="px-4">
        <HsModeSwitcher mode={mode} />
        <p className="mt-4 text-center text-sm text-slate-500 dark:text-white/55">
          Showing{' '}
          <span className="font-semibold text-slate-700 dark:text-white/80">{modeLabel(mode)}</span>{' '}
          pages
        </p>
      </div>

      <HsChapterExplorer mode={modeKey} />
      <HsCodeAnatomy />

      <FaqSection faqs={HS_FAQS} id="hs-faq" image={null} schema />

      {/* closing call to action */}
      <section className="px-4 pb-20">
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-[#07071f] bg-linear-to-br from-[#0a0a2e] via-[#17104d] to-[#0a1a4a] p-8 text-center shadow-2xl sm:p-12">
          <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-[#B31942]/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-[#4da3ff]/25 blur-3xl" />
          <h2 className="relative text-2xl font-semibold text-white sm:text-4xl">
            Found your HS code? See the real shipments.
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/70">
            Search live US import and export records for any code, company or product.
          </p>
          <Link
            href="/search-live-data"
            className="group relative mt-7 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0A1A4A] shadow-lg transition hover:scale-[1.03]"
          >
            Search live data
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>
    </>
  );
}
