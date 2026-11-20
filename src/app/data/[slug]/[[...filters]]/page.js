import { Suspense } from 'react';
import { notFound, permanentRedirect } from 'next/navigation';

import FaqSection from '@/components/common/FaqSection';
import DataHero from '@/components/data-page/DataHero';
import DataResults from '@/components/data-page/DataResults';
import DataFacets from '@/components/data-page/DataFacets';

import { DASHBOARD } from '@/lib/dashboard';
import { dataPath, parseFilters, parseTermSlug, productName } from '@/lib/dataSlug';

import { TEASER_ROWS, getTradeData, resolveFilters } from '@/data/tradeDataSample';

import { buildFaqs, buildMeta } from '@/data/dataPageText';

const SITE_URL = 'https://usimportdata.com';

/*
  /data/us-630900-mobile-export-data
  /data/us-630900-mobile-export-data/country-china
  /data/us-630900-mobile-export-data/country-china/port-ningbo-chn
*/

// Load data after route params have been resolved.
function loadRoute({ slug, filters = [] }) {
  const term = parseTermSlug(slug);
  const f = parseFilters(filters);

  if (!term || !f) return null;

  const names = resolveFilters(term.role, f.country, f.port);

  if (!names) return null;

  // Redirect incorrect URL formats to their canonical version.
  const canonical = dataPath({
    ...term,
    country: f.country,
    port: f.port,
  });

  const requested = `/data/${slug}${filters.length ? `/${filters.join('/')}` : ''}`;

  if (canonical !== requested) {
    return { redirect: canonical };
  }

  // API call goes here later.
  const data = getTradeData({
    ...term,
    country: f.country,
    port: f.port,
  });

  const meta = buildMeta({
    ...term,
    countryName: names.countryName,
    portName: names.portName,
  });

  return { term, f, canonical, data, meta };
}

// Metadata remains separate from the page's Suspense boundary.
export async function generateMetadata({ params }) {
  const routeParams = await params;

  const r = loadRoute({
    ...routeParams,
    filters: routeParams.filters ?? [],
  });

  if (!r || r.redirect) return {};

  return {
    title: `${r.meta.title} | USImportdata`,
    description: r.meta.description,
    alternates: {
      canonical: `${SITE_URL}${r.canonical}`,
    },
    robots: r.data.total === 0 ? { index: false, follow: true } : undefined,
  };
}

// Synchronous route component.
export default function Page({ params }) {
  return (
    <Suspense fallback={<DataPageFallback />}>
      <DataPageContent params={params} />
    </Suspense>
  );
}

// Dynamic route data is accessed inside Suspense.
async function DataPageContent({ params }) {
  const routeParams = await params;

  const r = loadRoute({
    ...routeParams,
    filters: routeParams.filters ?? [],
  });

  if (!r) notFound();

  if (r.redirect) permanentRedirect(r.redirect);

  const { term, f, data, meta } = r;
  const { role, hs, product } = term;

  const ctx = {
    role,
    hs,
    product,
    productName: product.replace(/-/g, ' '),
    country: f.country,
    port: f.port,
  };

  // Filter chips with individual removal links.
  const chips = [];

  if (hs) {
    chips.push({
      label: hs,
      remove: product
        ? dataPath({
            role,
            product,
            country: f.country,
            port: f.port,
          })
        : null,
    });
  }

  if (f.country) {
    chips.push({
      label: f.country,
      remove: dataPath({
        role,
        hs,
        product,
        port: f.port,
      }),
    });
  }

  if (f.port) {
    chips.push({
      label: f.port,
      remove: dataPath({
        role,
        hs,
        product,
        country: f.country,
      }),
    });
  }

  return (
    <>
      <DataHero ctx={ctx} meta={meta} />

      <DataResults
        ctx={ctx}
        heading={meta.heading}
        chips={chips}
        rows={data.rows}
        total={data.total}
        chart={data.chart}
        perPage={TEASER_ROWS}
      />

      {data.total > 0 && <DataFacets ctx={ctx} facets={data.facets} />}

      <FaqSection
        faqs={buildFaqs(term)}
        id="data-faq"
        image={null}
        schema
        title="FAQs With"
        highlight="Answers"
        subtitle={`Common questions about ${productName(product) || `HS code ${hs}`} ${role} data.`}
      />

      {/* Closing call to action */}
      <section className="px-4 pb-20">
        <div className="relative mx-auto w-full max-w-5xl overflow-hidden rounded-3xl bg-[#07071f] bg-linear-to-br from-[#0a0a2e] via-[#17104d] to-[#0a1a4a] p-8 text-center shadow-2xl sm:p-12">
          <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-[#B31942]/30 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-[#4da3ff]/25 blur-3xl" />

          <h2 className="relative text-2xl font-semibold text-white sm:text-4xl">
            Want every record, not just a preview?
          </h2>

          <p className="relative mx-auto mt-3 max-w-xl text-white/70">
            Sign up to see all shipments, full filters and the{' '}
            {role === 'import' ? 'importer' : 'exporter'} names in your dashboard.
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

function DataPageFallback() {
  return <div className="min-h-[60vh] animate-pulse" aria-hidden="true" />;
}
