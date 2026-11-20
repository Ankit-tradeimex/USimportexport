/*
  SAMPLE company data for the public company list pages. Nothing here is real.

  getCompanyData() returns the same shape your API should return, so swapping it is one change:
    {
      rows  : first COMPANY_PER_PAGE companies   <- the cards
      total : how many companies match in all    <- "Showing 12 of N" and the page count
    }
  A company: { id, name, slug, hs, description }.  Only US companies are listed:
    importer list = US companies that import from other countries
    exporter list = US companies that export to other countries
*/
import { slugify } from '../lib/dataSlug';

export const COMPANY_PER_PAGE = 12;

// each product word must start a word in the description ("mobile" matches Mobile phones, not Automobiles)
const CATALOG = [
  {
    hs: ['851713'],
    descs: [
      'Smartphones and mobile phones, 128GB, packed in cartons',
      'Mobile phones and accessories, palletized',
      'Used mobile phones for refurbishment',
    ],
  },
  {
    hs: ['851762'],
    descs: ['Mobile network routers and wireless access points', 'Mobile base station equipment'],
  },
  {
    hs: ['630900'],
    descs: ['Used clothing and other worn articles in bales', 'Used worn clothing, fumigated'],
  },
  {
    hs: ['080211', '080212'],
    descs: ['Almonds, California shelled nonpareil', 'Almonds in shell, export quality'],
  },
  {
    hs: ['760320'],
    descs: ['Aluminum flakes and powder in drums', 'Aluminum foil rolls for packaging'],
  },
  {
    hs: ['870323', '870324'],
    descs: ['Used passenger vehicles, Toyota Camry 2.5L', 'Automobiles, SUV 3.0L gasoline'],
  },
  {
    hs: ['940320'],
    descs: ['Metal office furniture, knocked down', 'Metal furniture and cabinets'],
  },
  {
    hs: ['392130'],
    descs: ['Plastic foam sheets, non-cellular', 'Plastic sheets for ISO tank liners'],
  },
  {
    hs: ['850760'],
    descs: ['Lithium ion batteries UN3480 class 9', 'Lithium batteries packed with equipment'],
  },
  {
    hs: ['610910'],
    descs: ['Cotton t-shirts, knitted, mens', 'Cotton t-shirts in assorted sizes and colors'],
  },
  { hs: ['100199'], descs: ['Wheat in bulk, US hard red winter', 'Wheat grain, milling quality'] },
  { hs: ['270900'], descs: ['Crude petroleum oil, light sweet'] },
  {
    hs: ['300490'],
    descs: [
      'Pharmaceutical products, medicaments packed for retail',
      'Medicaments in measured doses, temperature controlled',
    ],
  },
  { hs: ['120190'], descs: ['Soybeans in bulk, non-GMO', 'Soybeans for feed processing'] },
  {
    hs: ['870830', '870899'],
    descs: ['Automotive parts, brake pads and discs', 'Automotive parts, assorted spare parts'],
  },
  {
    hs: ['847130'],
    descs: ['Laptop computers, 15 inch', 'Portable computers, laptops and accessories'],
  },
  {
    hs: ['030389', '030499'],
    descs: [
      'Frozen fish, whole round',
      'Frozen fish fillets packed in cartons',
      'Fish frozen in blocks',
    ],
  },
  {
    hs: ['030617'],
    descs: ['Frozen shrimp, head-on shell-on', 'Frozen shrimps, peeled and deveined'],
  },
  {
    hs: ['080440'],
    descs: ['Fresh avocado, Hass, packed in cartons', 'Avocados, fresh, reefer container'],
  },
  {
    hs: ['080810'],
    descs: ['Fresh apples, Gala and Fuji, in cartons', 'Apples, fresh fruit, reefer container'],
  },
  { hs: ['090111'], descs: ['Coffee beans, green, unroasted', 'Green coffee in jute bags, 60kg'] },
];

// first keyword found in a description becomes the company's product (used in its canonical profile URL)
const PRODUCT_WORDS = [
  'mobile',
  'smartphones',
  'clothing',
  'almonds',
  'aluminum',
  'vehicles',
  'automobiles',
  'furniture',
  'plastic',
  'lithium',
  't-shirts',
  'wheat',
  'crude',
  'pharmaceutical',
  'medicaments',
  'soybeans',
  'automotive',
  'laptop',
  'fish',
  'shrimp',
  'avocado',
  'apples',
  'coffee',
];
const productOf = (desc) => {
  const d = desc.toLowerCase();
  return PRODUCT_WORDS.find((w) => new RegExp(`\\b${w}`).test(d)) || slugify(d.split(' ')[0]);
};

const FIRST = [
  'Nova',
  'Atlas',
  'Pioneer',
  'Summit',
  'Liberty',
  'Eagle',
  'Harbor',
  'Pacific',
  'Lone Star',
  'Golden Gate',
  'Blue Ridge',
  'Patriot',
  'Evergreen',
  'Cascade',
  'Midwest',
  'Keystone',
  'Frontier',
  'Bayview',
  'Redwood',
  'Silverline',
  'Northstar',
  'Gulf Coast',
  'Heritage',
  'Sterling',
  'Crescent',
  'Beacon',
  'Ironbridge',
  'Magnolia',
];
const SECOND = [
  'Shipping',
  'Logistics',
  'Trading',
  'Imports',
  'Exports',
  'Distribution',
  'Supply',
  'Freight',
  'Global',
  'Enterprises',
  'Commodities',
  'Sourcing',
  'Trade Partners',
  'Cargo',
];
const LEGAL = ['LLC', 'Inc', 'Corp', 'Co', 'Ltd'];

/* ------------------------------------------------------------------ */
/* Deterministic generator (same data on every request / build)       */
/* ------------------------------------------------------------------ */
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function generate(role, count, seed) {
  const rand = rng(seed);
  const pick = (list) => list[Math.floor(rand() * list.length)];
  const used = new Set();
  const out = [];
  let guard = 0;
  while (out.length < count && guard++ < count * 20) {
    const name = `${pick(FIRST)} ${pick(SECOND)} ${pick(LEGAL)}`;
    const slug = slugify(name);
    if (used.has(slug)) continue; // company slugs must be unique inside a role
    used.add(slug);
    const t = pick(CATALOG);
    const description = pick(t.descs);
    out.push({
      id: `${role}-${out.length}`,
      name,
      slug,
      hs: pick(t.hs),
      description,
      product: productOf(description),
    });
  }
  return out;
}

const ALL = { import: generate('import', 300, 21), export: generate('export', 300, 33) };

/* ------------------------------------------------------------------ */
/* API-shaped function                                                 */
/* ------------------------------------------------------------------ */
export function getCompanyData({ role, hs = '', product = '' }) {
  const wordRes = product
    .split('-')
    .map((w) => w.replace(/[^a-z0-9]/g, ''))
    .filter(Boolean)
    .map((w) => new RegExp(`\\b${w}`, 'i'));

  const matches = ALL[role]
    .filter((c) => (!hs || c.hs.startsWith(hs)) && wordRes.every((re) => re.test(c.description)))
    .sort((a, b) => a.name.localeCompare(b.name));

  return { rows: matches.slice(0, COMPANY_PER_PAGE), total: matches.length };
}

export const listCompanies = (role) => ALL[role];

// one company of a role, or null  (profile page)
export const findCompany = (role, slug) => ALL[role]?.find((c) => c.slug === slug) || null;

// other companies of the same chapter and product first, then the same chapter (profile page, "Explore more")
export function getSimilarCompanies({ role, hs, product, exclude, limit = 5 }) {
  const chapter = hs.slice(0, 2);
  const pool = ALL[role].filter((c) => c.slug !== exclude && c.hs.startsWith(chapter));
  const same = pool.filter((c) => c.product === product);
  const rest = pool.filter((c) => c.product !== product);
  return [...same, ...rest].slice(0, limit);
}
