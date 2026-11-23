import { cache } from 'react';
import { LEGAL_PAGES } from '../data/legalPages';

export const SITE_URL = 'https://usimportdata.com';

// order of the switcher and of the "next" link
export const LEGAL_LIST = [
  { slug: 'terms-of-use', label: 'Terms of Use', href: '/terms-of-use' },
  { slug: 'privacy-policy', label: 'Privacy Policy', href: '/privacy-policy' },
  { slug: 'disclaimer', label: 'Disclaimer', href: '/disclaimer' },
];

// cache() makes generateMetadata and the page share one read
export const getLegalPage = cache(async (slug) => LEGAL_PAGES[slug] || null);

export async function legalMetadata(slug) {
  const page = await getLegalPage(slug);
  if (!page) return {};
  return {
    title: `${page.metaTitle || page.title} | USImportdata`,
    description: page.description,
    alternates: { canonical: `${SITE_URL}/${slug}` },
  };
}
