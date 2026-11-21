/*
  SAMPLE company profile data. Nothing here is real.

  getCompanyProfile() returns the same shape your API should return:
    {
      company   : { id, name, slug, hs, description, product }
      address   : 'street, city, state zip'
      record    : ONE shipment record of that company (the B/L card)
      stats     : { total, since 'YYYY-MM', last, topHs, topCountry }          <- "at a glance"
      products  : [{ hs, name, description, count, pct }]                      <- top products
      partners  : [{ country, name, count, pct }]  (top 5, biggest first)      <- trade lanes
      shipments : { rows (newest 10, same shape as the data page rows), total } <- recent shipments table
    }
  The record carries every field of the trade-data page's Bill of Lading sample (import and export),
  and is built from the company, so the same company always shows the same record.
*/
import { findCompany, getSimilarCompanies } from './companySample';
import { slugify } from '../lib/dataSlug';

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STREETS = [
  'Harbor Blvd',
  'Commerce Way',
  'Industrial Pkwy',
  'Port Road',
  'Main St',
  'Freight Ave',
  'Seaport Dr',
];
const CITIES = [
  ['Houston', 'TX', '77002'],
  ['Los Angeles', 'CA', '90021'],
  ['Newark', 'NJ', '07114'],
  ['Savannah', 'GA', '31401'],
  ['Miami', 'FL', '33132'],
  ['Seattle', 'WA', '98134'],
  ['Charleston', 'SC', '29401'],
];
const US_PORTS = [
  'LOS ANGELES CALIFORNIA',
  'LONG BEACH CALIFORNIA',
  'NEW YORK NEWARK AREA NEWARK NEW JERSEY',
  'SAVANNAH GEORGIA',
  'HOUSTON TEXAS',
];
// country -> ports. Names match the ports of the data pages, so the table links resolve
const FOREIGN = [
  ['CHINA', ['SHANGHAI CHN', 'NINGBO CHN', 'SHENZHEN CHN', 'TSINGTAO CHN']],
  ['INDIA', ['NHAVA SHEVA IND', 'MUNDRA IND', 'CHENNAI IND']],
  ['GERMANY', ['HAMBURG DEU', 'BREMERHAVEN DEU']],
  ['SOUTH KOREA', ['BUSAN KOR', 'INCHEON KOR']],
  ['VIETNAM', ['HAIPHONG VNM', 'VUNG TAU CAP ST JACQUES VNM']],
  ['MEXICO', ['VERACRUZ MEX', 'MANZANILLO MEX']],
];
const CARRIERS = [
  ['MAERSK LINE', 'MAEU'],
  ['MSC', 'MSCU'],
  ['CMA CGM', 'CMDU'],
  ['HAPAG-LLOYD', 'HLCU'],
  ['EVERGREEN LINE', 'EGLV'],
];
const VESSELS = [
  'MAERSK ELBA',
  'MSC ISABELLA',
  'CMA CGM MARCO POLO',
  'EVER GIVEN',
  'HAPAG EXPRESS',
];
const PARTNERS = [
  'Sunrise Trading Co Ltd',
  'Orient Global Supply',
  'Meridian Sourcing GmbH',
  'Pacific Rim Partners',
];

const pad = (n, l) => String(n).padStart(l, '0');
const ymd = (d) => `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1, 2)}-${pad(d.getUTCDate(), 2)}`;
const title = (s) =>
  String(s)
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());
// split n into whole parts that follow the weights and add up to n
const split = (n, weights) => {
  const sum = weights.reduce((a, b) => a + b, 0);
  const out = weights.map((w) => Math.floor((n * w) / sum));
  out[0] += n - out.reduce((a, b) => a + b, 0);
  return out;
};

export function getCompanyProfile({ role, slug }) {
  const company = findCompany(role, slug);
  if (!company) return null;

  const seed = [...company.slug].reduce((s, ch) => s + ch.charCodeAt(0) * 31, 7);
  const rand = rng(seed);
  const pick = (list) => list[Math.floor(rand() * list.length)];
  const between = (lo, hi) => Math.round(lo + rand() * (hi - lo));

  const [city, state, zip] = pick(CITIES);
  const address = `${between(100, 9800)} ${pick(STREETS)}, ${city}, ${state} ${zip}`;

  const [foreign, foreignPorts] = pick(FOREIGN);
  const [carrier, scac] = pick(CARRIERS);
  const day = new Date(Date.UTC(2024, 2, 1 + Math.floor(rand() * 92)));
  const exp = role === 'export';
  const partner = pick(PARTNERS);
  const usAddress = `${address.toUpperCase()}, US`;

  const record = {
    date: `${day.getUTCFullYear()}-${pad(day.getUTCMonth() + 1, 2)}-${pad(day.getUTCDate(), 2)}`,
    billType: 'HOUSE BILL',
    masterBl: `${scac}${pad(between(0, 9999999), 7)}`,
    transportType: 'SEA',
    originCountry: exp ? 'UNITED STATES' : foreign,
    destinationCountry: exp ? foreign : 'UNITED STATES',
    shippingCountry: pick(['LIBERIA', 'PANAMA', 'MARSHALL ISLANDS']),
    loadingPort: exp ? pick(US_PORTS) : pick(foreignPorts),
    unloadingPort: exp ? pick(foreignPorts) : pick(US_PORTS),
    // the US company of this profile (importer on an importer page, exporter on an exporter page)
    usName: company.name.toUpperCase(),
    usAddress,
    // the foreign partner (import pages only)
    partnerName: partner.toUpperCase(),
    partnerAddress: `${between(1, 99)} ${pick(['TRADE ROAD', 'INDUSTRIAL AVE', 'HARBOR ST'])}, ${foreign}`,
    hs: company.hs,
    description: `${company.description.toUpperCase()} HS CODE:${company.hs}`,
    qty: between(10, 900),
    unit: exp ? pick(['PALLET', 'CARTON', 'DRUM']) : pick(['COL', 'CTN', 'PKG']),
    weight: between(5000, 120000),
    weightUnit: exp ? 'Kg' : 'KG',
    teu: between(1, 8),
    measurement: `${between(20, 90)} CUBIC METERS`,
    carrier,
    vessel: pick(VESSELS),
    container: `${scac.slice(0, 3)}U${pad(between(0, 9999999), 7)}`,
    scac,
    voyage: `${between(100, 999)}${pick(['E', 'W', 'N'])}`,
    conveyance: `IMO NUMBER/LLOYDS NUMBER: ${between(9000000, 9999999)}`,
  };

  // ---- the rest of the company's activity (sample numbers) ----
  const total = between(40, 420);
  const pct = (n) => Math.round((n / total) * 1000) / 10;
  const wpick = (items, key) => {
    let r = rand() * items.reduce((s, x) => s + x[key], 0);
    return items.find((x) => (r -= x[key]) < 0) || items[0];
  };

  // products: the company's own HS code plus codes of its chapter
  const similar = getSimilarCompanies({
    role,
    hs: company.hs,
    product: company.product,
    exclude: company.slug,
    limit: 40,
  });
  const names = new Map([[company.hs, company.description]]);
  similar.forEach((c) => names.has(c.hs) || names.set(c.hs, c.description));
  const codes = [...names.keys()].slice(0, 5);
  const pcount = split(
    total,
    codes.map((_, i) => Math.pow(0.55, i) + rand() * 0.05),
  );
  const products = codes
    .map((hs, i) => ({
      hs,
      description: names.get(hs),
      name: names.get(hs).split(',')[0],
      count: pcount[i],
      pct: pct(pcount[i]),
    }))
    .filter((p) => p.count > 0);

  // partner countries (origin on an importer page, destination on an exporter page)
  const pool = [...FOREIGN];
  const picked = [];
  while (picked.length < 5 && pool.length)
    picked.push(pool.splice(Math.floor(rand() * pool.length), 1)[0]);
  const ccount = split(
    total,
    picked.map((_, i) => 1 / (i + 1) + rand() * 0.1),
  );
  const partners = picked
    .map(([country], i) => ({
      country,
      name: title(country),
      count: ccount[i],
      pct: pct(ccount[i]),
    }))
    .sort((a, b) => b.count - a.count);
  const portsOf = new Map(FOREIGN);

  // the 10 newest shipments (same shape as the data page rows)
  const last = new Date(`${record.date}T00:00:00Z`).getTime();
  let t = last;
  const rows = Array.from({ length: 10 }, (_, i) => {
    if (i) t -= between(1, 9) * 86400000;
    const p = wpick(products, 'count');
    const c = wpick(partners, 'count');
    const port = exp ? pick(portsOf.get(c.country)) : pick(US_PORTS);
    return {
      id: `${company.slug}-${i}`,
      date: ymd(new Date(t)),
      hs: p.hs,
      description: p.description.toUpperCase(),
      country: c.country,
      countrySlug: slugify(c.country),
      port,
      portSlug: slugify(port),
      qty: between(10, 900),
      unit: exp ? pick(['PALLET', 'CARTON', 'DRUM']) : pick(['COL', 'CTN', 'PKG']),
      weight: between(500, 24000),
    };
  });

  const stats = {
    total,
    since: ymd(new Date(last - between(200, 1100) * 86400000)).slice(0, 7),
    last: record.date,
    topHs: products[0].hs,
    topCountry: partners[0].name,
  };

  return { company, address, record, stats, products, partners, shipments: { rows, total } };
}
