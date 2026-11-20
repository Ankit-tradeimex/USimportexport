import { Suspense } from 'react';
import { notFound, permanentRedirect } from 'next/navigation';

import FaqSection from '@/components/common/FaqSection';
import CompanyProfileHero from '@/components/company/CompanyProfileHero';
import BolSampleSection from '@/components/trade-data/BolSampleSection';
import CompanySimilar from '@/components/company/CompanySimilar';

import { DASHBOARD } from '@/lib/dashboard';
import { buildBolData } from '@/lib/companyBol';
import { companyPath, parseCompanySlug, productName } from '@/lib/dataSlug';

import { getSimilarCompanies } from '@/data/companySample';
import { getCompanyProfile } from '@/data/companyProfileSample';
import { buildProfileFaqs, buildProfileMeta, roleWords } from '@/data/companyProfileText';

const SITE_URL = 'https://usimportdata.com';

/*
  /company/us-mobile-exporter/nova-shipping-llc     (from a search)
  /company/us-exporter/nova-shipping-llc            (from the directory: no product in the URL)
  Both show the same page. The canonical is always the one with the company's own HS chapter and product.
*/

// 'us-85-mobile-exporter' or just 'us-exporter' -> role
function roleOf(slug) {
  const t = parseCompanySlug(slug);
  if (t) return t.role;
  const m = /^us-(importer|exporter)$/.exec(String(slug).toLowerCase());
  return m ? (m[1] === 'exporter' ? 'export' : 'import') : null;
}

function loadRoute({ slug, company }) {
  const role = roleOf(slug);
  if (!role) return null;

  // Redirect uppercase to the lowercase URL.
  const requested = `/company/${slug}/${company}`;
  if (requested !== requested.toLowerCase()) return { redirect: requested.toLowerCase() };

  // API call goes here later.
  const profile = getCompanyProfile({ role, slug: company });
  if (!profile) return null;

  const term = { role, hs: profile.company.hs.slice(0, 2), product: profile.company.product };
  const canonical = companyPath(term, profile.company.slug);
  const meta = buildProfileMeta({ company: profile.company, role });

  return { role, term, canonical, meta, ...profile };
}

export async function generateMetadata({ params }) {
  const r = loadRoute(await params);
  if (!r || r.redirect) return {};

  return {
    title: `${r.meta.title} | USImportdata`,
    description: r.meta.description,
    alternates: { canonical: `${SITE_URL}${r.canonical}` },
  };
}

export default function Page({ params }) {
  return (
    <Suspense fallback={<div className="min-h-[60vh] animate-pulse" aria-hidden="true" />}>
      <CompanyProfileContent params={params} />
    </Suspense>
  );
}

async function CompanyProfileContent({ params }) {
  const r = loadRoute(await params);

  if (!r) notFound();
  if (r.redirect) permanentRedirect(r.redirect);

  const { role, term, company, address, record, meta } = r;
  const w = roleWords(role);
  const listHref = companyPath(term);

  const similar = getSimilarCompanies({
    role,
    hs: company.hs,
    product: company.product,
    exclude: company.slug,
  });

  return (
    <>
      <CompanyProfileHero
        name={company.name}
        address={address}
        roleLabel={w.one}
        crumbs={[{ label: `US ${productName(company.product)} ${w.many}`, href: listHref }]}
      />

      <BolSampleSection data={buildBolData({ role, record, meta })} />

      {/* Call to action band */}
      <section className="px-4 py-10">
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-[#07071f] bg-linear-to-br from-[#0a0a2e] via-[#17104d] to-[#0a1a4a] p-8 text-center shadow-2xl sm:p-12">
          <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-[#B31942]/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-[#4da3ff]/25 blur-3xl" />

          <h2 className="relative text-2xl font-semibold text-white sm:text-4xl">
            {meta.ctaTitle}
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-white/70">{meta.ctaText}</p>

          <div className="relative mt-7">
            <a
              href={DASHBOARD.signup}
              className="inline-block rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#0A1A4A] shadow-lg transition hover:scale-[1.03]"
            >
              Get more shipment data
            </a>
          </div>
        </div>
      </section>

      <CompanySimilar
        title={meta.similarTitle}
        companies={similar.map((c) => ({ ...c, href: companyPath(term, c.slug) }))}
        allHref={listHref}
      />

      <FaqSection
        faqs={buildProfileFaqs({ company, role, address, record })}
        id="company-profile-faq"
        image={null}
        schema
        title="FAQs With"
        highlight="Answers"
        subtitle={`Common questions about ${company.name}.`}
      />
    </>
  );
}
