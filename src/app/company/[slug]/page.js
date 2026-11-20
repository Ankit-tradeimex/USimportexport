import { Suspense } from 'react';
import { notFound, permanentRedirect } from 'next/navigation';

import FaqSection from '@/components/common/FaqSection';
import CompanyHero from '@/components/company/CompanyHero';
import CompanyList from '@/components/company/CompanyList';

import { DASHBOARD } from '@/lib/dashboard';
import { companyPath, parseCompanySlug } from '@/lib/dataSlug';

import { COMPANY_PER_PAGE, getCompanyData } from '@/data/companySample';
import { buildFaqs, buildMeta, termLabel } from '@/data/companyPageText';

const SITE_URL = 'https://usimportdata.com';

/*
  /company/us-mobile-exporter
  /company/us-85-mobile-exporter
  /company/us-85-importer
*/

// Load data after route params have been resolved.
function loadRoute({ slug }) {
  const term = parseCompanySlug(slug);
  if (!term) return null;

  // Redirect uppercase or a wrong format to the canonical version.
  const canonical = companyPath(term);
  if (canonical !== `/company/${slug}`) return { redirect: canonical };

  // API call goes here later.
  const data = getCompanyData(term);
  const meta = buildMeta(term);

  return { term, canonical, data, meta };
}

export async function generateMetadata({ params }) {
  const r = loadRoute(await params);
  if (!r || r.redirect) return {};

  return {
    title: `${r.meta.title} | USImportdata`,
    description: r.meta.description,
    alternates: { canonical: `${SITE_URL}${r.canonical}` },
    robots: r.data.total === 0 ? { index: false, follow: true } : undefined,
  };
}

export default function Page({ params }) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] animate-pulse" aria-hidden="true" />}>
      <CompanyPageContent params={params} />
    </Suspense>
  );
}

async function CompanyPageContent({ params }) {
  const r = loadRoute(await params);

  if (!r) notFound();
  if (r.redirect) permanentRedirect(r.redirect);

  const { term, data, meta } = r;
  const { role, hs, product } = term;

  const ctx = { role, hs, product, productName: product.replace(/-/g, ' ') };

  // Chips with a removal link, but never remove the last remaining part.
  const chips = [];
  if (hs) chips.push({ label: hs, remove: product ? companyPath({ role, product }) : null });
  if (product)
    chips.push({
      label: product.replace(/-/g, ' '),
      remove: hs ? companyPath({ role, hs }) : null,
    });

  return (
    <>
      <CompanyHero ctx={ctx} meta={meta} />

      <CompanyList
        term={term}
        heading={meta.heading}
        chips={chips}
        rows={data.rows}
        total={data.total}
        perPage={COMPANY_PER_PAGE}
      />

      <FaqSection
        faqs={buildFaqs(term)}
        id="company-faq"
        image={null}
        schema
        title="FAQs With"
        highlight="Answers"
        subtitle={`Common questions about US ${role === 'export' ? 'exporters' : 'importers'} of ${termLabel(term)}.`}
      />

      {/* Closing call to action */}
      <section className="px-4 pb-20">
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-[#07071f] bg-linear-to-br from-[#0a0a2e] via-[#17104d] to-[#0a1a4a] p-8 text-center shadow-2xl sm:p-12">
          <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-[#B31942]/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-[#4da3ff]/25 blur-3xl" />

          <h2 className="relative text-2xl font-semibold text-white sm:text-4xl">
            Want the full company list?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/70">
            Sign up to browse every page of {role === 'export' ? 'exporters' : 'importers'} in your
            dashboard.
          </p>

          <div className="relative mt-7 flex flex-wrap justify-center gap-3">
            <a
              href={DASHBOARD.signup}
              className="rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0A1A4A] shadow-lg transition hover:scale-[1.03]"
            >
              Sign up free
            </a>
            <a
              href={DASHBOARD.login}
              className="rounded-xl border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Log in
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
