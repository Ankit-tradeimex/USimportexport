/*
  The ONE place the "As Featured" pages read from. Today: data/featuredData.js.
  When it moves to your API / CMS only these two functions change. They must return the same shape
  (see the field list at the top of data/featuredData.js).
*/
import { cache } from 'react';
import { FEATURED } from '../data/featuredData';

export const SITE_URL = 'https://usimportdata.com';

export const getFeaturedList = cache(async () => FEATURED);

export const getFeatured = cache(async (slug) => FEATURED.find((f) => f.slug === slug) || null);

// 'https://qz.com/abc' -> 'qz.com'  ('' when there is no valid link)
export function hostOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}
