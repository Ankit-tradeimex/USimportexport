/*
  URL helpers for the data pages.

  /data/us-<hs>-<product>-<role>-data[/country-<slug>][/port-<slug>]

  examples
    /data/us-03-fish-import-data
    /data/us-630900-mobile-export-data/country-china/port-ningbo-chn
    /data/us-012121-import-data            (HS code only)
    /data/us-avocado-import-data           (product only)
*/

export const slugify = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

// an HS part must be 2, 4, 6, 8 or 10 digits, so a product like "3d-printers" is not mistaken for a code
const isHs = (t) => /^\d+$/.test(t) && t.length % 2 === 0 && t.length >= 2 && t.length <= 10;

// 'us-630900-mobile-export-data' -> { role: 'export', hs: '630900', product: 'mobile' }   (null if it does not fit)
export function parseTermSlug(slug) {
  const m = /^us-([a-z0-9-]+)-(import|export)-data$/.exec(String(slug).toLowerCase());
  if (!m) return null;
  const parts = m[1].split('-').filter(Boolean);
  let hs = '';
  let rest = parts;
  if (parts.length && isHs(parts[0])) {
    hs = parts[0];
    rest = parts.slice(1);
  }
  const product = rest.join('-');
  if (!hs && !product) return null;
  return { role: m[2], hs, product };
}

export const buildTermSlug = ({ role, hs, product }) =>
  `us-${[hs, slugify(product)].filter(Boolean).join('-')}-${role}-data`;

// full path, filters are path segments (country first, then port)
export function dataPath({ role, hs = '', product = '', country = '', port = '' }) {
  let p = `/data/${buildTermSlug({ role, hs, product })}`;
  if (country) p += `/country-${country}`;
  if (port) p += `/port-${port}`;
  return p;
}

/*
  ['country-china', 'port-ningbo-chn'] -> { country: 'china', port: 'ningbo-chn', canonical: true }
  null = not valid (unknown segment or a repeated one).  canonical false = port came before country (redirect it).
*/
export function parseFilters(segments = []) {
  let country = '';
  let port = '';
  const order = [];
  for (const s of segments) {
    const m = /^(country|port)-([a-z0-9-]+)$/.exec(s);
    if (!m) return null;
    if (m[1] === 'country') {
      if (country) return null;
      country = m[2];
    } else {
      if (port) return null;
      port = m[2];
    }
    order.push(m[1]);
  }
  return { country, port, canonical: order.join() !== 'port,country' };
}

// 'mobile-phones' -> 'Mobile Phones'
export const productName = (product) =>
  String(product || '')
    .split('-')
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ');

/*
  Company list pages.
    /company/us-<hs>-<product>-<importer|exporter>
    /company/us-mobile-exporter
    /company/us-85-mobile-exporter
  A company profile sits under its list:  /company/us-mobile-exporter/nova-shipping
*/
// 'us-85-mobile-exporter' -> { role: 'export', hs: '85', product: 'mobile' }   (null if it does not fit)
export function parseCompanySlug(slug) {
  const m = /^us-([a-z0-9-]+)-(importer|exporter)$/.exec(String(slug).toLowerCase());
  if (!m) return null;
  const parts = m[1].split('-').filter(Boolean);
  let hs = '';
  let rest = parts;
  if (parts.length && isHs(parts[0])) {
    hs = parts[0];
    rest = parts.slice(1);
  }
  const product = rest.join('-');
  if (!hs && !product) return null;
  return { role: m[2] === 'exporter' ? 'export' : 'import', hs, product };
}

export const buildCompanySlug = ({ role, hs = '', product = '' }) =>
  `us-${[hs, slugify(product)].filter(Boolean).join('-')}-${role === 'export' ? 'exporter' : 'importer'}`;

// '/company/us-mobile-exporter'  or, with a company slug, '/company/us-mobile-exporter/nova-shipping'
export const companyPath = (term, companySlug = '') =>
  `/company/${buildCompanySlug(term)}${companySlug ? `/${companySlug}` : ''}`;

// company list for the same term
export const companyHref = ({ role, hs = '', product = '' }) => companyPath({ role, hs, product });

/*
  Where the search form goes.
    { tradeType: 'export', resultType: 'data',    product: 'Mobile', hs: '851713' } -> /data/us-851713-mobile-export-data
    { tradeType: 'import', resultType: 'company', product: 'Mobile', hs: '851713' } -> /company/us-851713-mobile-importer
*/
export function searchUrl({ tradeType, resultType, product = '', hs = '' }) {
  const role = tradeType === 'export' ? 'export' : 'import';
  const term = { role, hs: String(hs).replace(/\D/g, ''), product: slugify(product) };
  return resultType === 'company' ? companyHref(term) : dataPath(term);
}

// an HS code the data pages accept: 2, 4, 6, 8 or 10 digits
export const isValidHs = (hs) =>
  /^\d+$/.test(hs) && hs.length % 2 === 0 && hs.length >= 2 && hs.length <= 10;
