/*
  SAMPLE shipment data for the public data pages. Nothing here is real.

  getTradeData() returns the same shape your API should return, so swapping it is one change:
    {
      rows    : first TEASER_ROWS shipments (newest first)       <- the table
      total   : how many shipments match in all                  <- "Unlock all N records"
      facets  : { hs: tree, countries: [], ports: [] }           <- the three boxes (counts over ALL matches)
      chart   : top 9 HS codes by total net weight               <- bar / pie chart
    }
  Exporter / importer names are not included on purpose: the public page only shows a masked link.
*/
import { slugify } from '../lib/dataSlug';

export const TEASER_ROWS = 10;

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */
// weight: how often it appears.  descs: bill-of-lading style descriptions (must contain the product words)
const TEMPLATES = [
  {
    w: 5,
    hs: ['851713'],
    units: ['PCS', 'CTN'],
    qty: [20, 900],
    kg: [300, 9000],
    descs: [
      'SMARTPHONES / MOBILE PHONES 128GB BLACK',
      'MOBILE PHONES AND ACCESSORIES PALLETIZED',
      'USED MOBILE PHONES FOR REFURBISHMENT',
    ],
  },
  {
    w: 2,
    hs: ['851762'],
    units: ['CTN', 'PCS'],
    qty: [10, 300],
    kg: [200, 4000],
    descs: ['MOBILE NETWORK ROUTERS AND WIRELESS ACCESS POINTS', 'MOBILE BASE STATION EQUIPMENT'],
  },
  {
    w: 4,
    hs: ['630900'],
    units: ['BAL'],
    qty: [10, 60],
    kg: [9000, 22000],
    descs: [
      'USED CLOTHING & OTHER WORN ARTICLES FREIGHT PREPAID',
      'USED WORN CLOTHING UN-MUTILATED AND FUMIGATED',
      'BALES SHIPPER LOAD STOW & COUNT USED CLOTHING',
    ],
  },
  {
    w: 4,
    hs: ['080211', '080212'],
    units: ['BAG', 'CTN', 'PKG'],
    qty: [300, 1200],
    kg: [10000, 24000],
    descs: [
      'ALMONDS CALIFORNIA SHELLED NONPAREIL',
      'ALMONDS IN SHELL EXPORT QUALITY',
      'BAGS OF RAW ALMONDS 25KG',
    ],
  },
  {
    w: 3,
    hs: ['760320'],
    units: ['PKG', 'CTN'],
    qty: [20, 120],
    kg: [20000, 70000],
    descs: ['ALUMINUM FLAKES AND POWDER IN DRUMS', 'ALUMINUM FOIL ROLLS FOR PACKAGING'],
  },
  {
    w: 3,
    hs: ['870323', '870324'],
    units: ['UNT'],
    qty: [1, 8],
    kg: [1500, 12000],
    descs: [
      'USED PASSENGER VEHICLES TOYOTA CAMRY 2.5L',
      'AUTOMOBILES SUV 3.0L GASOLINE USED',
      '2020 PASSENGER CAR GASOLINE AUTOMOBILE',
    ],
  },
  {
    w: 2,
    hs: ['940320'],
    units: ['CRT', 'PCS'],
    qty: [10, 80],
    kg: [3000, 16000],
    descs: ['METAL OFFICE FURNITURE KNOCKED DOWN', 'METAL FURNITURE AND CABINETS'],
  },
  {
    w: 2,
    hs: ['392130'],
    units: ['PCS', 'CTN'],
    qty: [1, 20],
    kg: [2000, 9000],
    descs: ['PLASTIC FOAM SHEETS NON-CELLULAR', 'PLASTIC SHEETS ISO TANK LIQUID'],
  },
  {
    w: 3,
    hs: ['850760'],
    units: ['CTN', 'PCS'],
    qty: [30, 600],
    kg: [600, 12000],
    descs: ['LITHIUM ION BATTERIES UN3480 CLASS 9', 'LITHIUM BATTERIES PACKED WITH EQUIPMENT'],
  },
  {
    w: 3,
    hs: ['610910'],
    units: ['CTN', 'PCS'],
    qty: [100, 900],
    kg: [1500, 9000],
    descs: ['COTTON T-SHIRTS KNITTED MENS', 'COTTON T-SHIRTS ASSORTED SIZES AND COLORS'],
  },
  {
    w: 2,
    hs: ['100199'],
    units: ['TNE'],
    qty: [500, 5000],
    kg: [500000, 5000000],
    descs: ['WHEAT IN BULK US HARD RED WINTER', 'WHEAT GRAIN MILLING QUALITY'],
  },
  {
    w: 2,
    hs: ['270900'],
    units: ['BBL'],
    qty: [20000, 90000],
    kg: [2600000, 12000000],
    descs: ['CRUDE PETROLEUM OIL LIGHT SWEET'],
  },
  {
    w: 3,
    hs: ['300490'],
    units: ['CTN', 'PKG'],
    qty: [20, 500],
    kg: [200, 7000],
    descs: [
      'PHARMACEUTICAL PRODUCTS MEDICAMENTS PACKED FOR RETAIL',
      'MEDICAMENTS IN MEASURED DOSES TEMPERATURE CONTROLLED',
    ],
  },
  {
    w: 2,
    hs: ['120190'],
    units: ['TNE'],
    qty: [800, 6000],
    kg: [800000, 6000000],
    descs: ['SOYBEANS IN BULK NON-GMO', 'SOYBEANS FOR FEED PROCESSING'],
  },
  {
    w: 3,
    hs: ['870830', '870899'],
    units: ['CTN', 'PKG'],
    qty: [30, 400],
    kg: [1500, 14000],
    descs: ['AUTOMOTIVE PARTS BRAKE PADS AND DISCS', 'AUTOMOTIVE PARTS ASSORTED SPARE PARTS'],
  },
  {
    w: 3,
    hs: ['847130'],
    units: ['CTN', 'PCS'],
    qty: [50, 800],
    kg: [500, 8000],
    descs: ['LAPTOP COMPUTERS 15 INCH', 'PORTABLE COMPUTERS LAPTOPS AND ACCESSORIES'],
  },
  {
    w: 3,
    hs: ['030389', '030499'],
    units: ['CTN', 'KGS'],
    qty: [300, 1500],
    kg: [8000, 24000],
    descs: [
      'FROZEN FISH WHOLE ROUND',
      'FROZEN FISH FILLETS PACKED IN CARTONS',
      'FISH FROZEN IN BLOCKS',
    ],
  },
  {
    w: 2,
    hs: ['030617'],
    units: ['CTN', 'KGS'],
    qty: [300, 1200],
    kg: [8000, 22000],
    descs: ['FROZEN SHRIMP HEAD-ON SHELL-ON', 'FROZEN SHRIMPS PEELED AND DEVEINED'],
  },
  {
    w: 2,
    hs: ['080440'],
    units: ['CTN', 'BOX'],
    qty: [400, 1800],
    kg: [8000, 22000],
    descs: ['FRESH AVOCADO HASS PACKED IN CARTONS', 'AVOCADOS FRESH REEFER CONTAINER'],
  },
  {
    w: 2,
    hs: ['080810'],
    units: ['CTN', 'BOX'],
    qty: [400, 1800],
    kg: [9000, 22000],
    descs: ['FRESH APPLES GALA AND FUJI IN CARTONS', 'APPLES FRESH FRUIT REEFER CONTAINER'],
  },
  {
    w: 2,
    hs: ['090111'],
    units: ['BAG', 'CTN'],
    qty: [200, 600],
    kg: [12000, 28000],
    descs: ['COFFEE BEANS GREEN UNROASTED', 'GREEN COFFEE IN JUTE BAGS 60KG'],
  },
];

// ordered by how common they are in the sample
const COUNTRIES = {
  import: [
    'CHINA',
    'INDIA',
    'VIETNAM',
    'MEXICO',
    'GERMANY',
    'JAPAN',
    'SOUTH KOREA',
    'THAILAND',
    'ITALY',
    'TURKEY',
    'MALAYSIA',
    'BRAZIL',
  ],
  export: {
    CHINA: ['TSINGTAO CHN', 'NINGBO CHN', 'SHANGHAI CHN', 'SHENZHEN CHN', 'XIAMEN CHN'],
    INDIA: ['NHAVA SHEVA IND', 'MUNDRA IND', 'CHENNAI IND'],
    VIETNAM: ['VUNG TAU CAP ST JACQUES VNM', 'HAIPHONG VNM'],
    MALAYSIA: ['KAJANG MYS', 'PORT KLANG MYS'],
    SPAIN: ['ALGECIRAS ESP', 'VALENCIA ESP'],
    BAHAMAS: ['FREEPORT GRAND BAHAMA I BHS', 'NASSAU BHS'],
    'SOUTH KOREA': ['BUSAN KOR', 'INCHEON KOR'],
    GERMANY: ['HAMBURG DEU', 'BREMERHAVEN DEU'],
    MEXICO: ['VERACRUZ MEX', 'MANZANILLO MEX'],
    BELGIUM: ['ANTWERP BEL'],
    PERU: ['CALLAO PER'],
    GUATEMALA: ['PUERTO BARRIOS GTM'],
  },
};

const US_PORTS = [
  'NEW YORK NEWARK AREA NEWARK NEW JERSEY',
  'LOS ANGELES CALIFORNIA',
  'LONG BEACH CALIFORNIA',
  'SAVANNAH GEORGIA',
  'HOUSTON TEXAS',
  'CHARLESTON SOUTH CAROLINA',
  'SEATTLE WASHINGTON',
  'NORFOLK VIRGINIA',
];

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

const pad = (n) => String(n).padStart(2, '0');

function generate(role, count, seed) {
  const rand = rng(seed);
  const between = ([lo, hi]) => Math.round(lo + rand() * (hi - lo));
  const pick = (list) => list[Math.floor(rand() * list.length)];
  const common = (list) => list[Math.floor(Math.pow(rand(), 1.8) * list.length)]; // favours the first entries
  const totalW = TEMPLATES.reduce((s, t) => s + t.w, 0);

  const out = [];
  for (let i = 0; i < count; i++) {
    let r = rand() * totalW;
    const t = TEMPLATES.find((x) => (r -= x.w) < 0) || TEMPLATES[0];
    const hs = pick(t.hs);

    const suffix = pick([
      '',
      '',
      ' FREIGHT PREPAID',
      ` HS CODE: ${hs}`,
      ` PO# 24GM${between([100, 999])}`,
    ]);

    let country;
    let port;
    if (role === 'import') {
      country = common(COUNTRIES.import);
      port = common(US_PORTS);
    } else {
      country = common(Object.keys(COUNTRIES.export));
      port = pick(COUNTRIES.export[country]);
    }

    const day = new Date(Date.UTC(2024, 2, 1 + Math.floor(rand() * 92)));
    out.push({
      id: `${role}-${i}`,
      date: `${day.getUTCFullYear()}-${pad(day.getUTCMonth() + 1)}-${pad(day.getUTCDate())}`,
      hs,
      description: pick(t.descs) + suffix,
      country,
      countrySlug: slugify(country),
      port,
      portSlug: slugify(port),
      qty: between(t.qty),
      unit: pick(t.units),
      weight: Math.round(between(t.kg) * 100) / 100,
    });
  }
  return out;
}

const ALL = { import: generate('import', 420, 7), export: generate('export', 420, 11) };

/* ------------------------------------------------------------------ */
/* API-shaped functions                                                */
/* ------------------------------------------------------------------ */
// 'china' -> 'CHINA', or null if that country / port does not exist at all in this role's data
export function resolveFilters(role, countrySlug, portSlug) {
  const rows = ALL[role];
  const c = countrySlug ? rows.find((r) => r.countrySlug === countrySlug) : null;
  const p = portSlug ? rows.find((r) => r.portSlug === portSlug) : null;
  if ((countrySlug && !c) || (portSlug && !p)) return null;
  return { countryName: c?.country || '', portName: p?.port || '' };
}

const countBy = (rows, key, slugKey) => {
  const m = new Map();
  rows.forEach((r) =>
    m.set(r[slugKey], {
      name: r[key],
      slug: r[slugKey],
      count: (m.get(r[slugKey])?.count || 0) + 1,
    }),
  );
  return [...m.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
};

export function getTradeData({ role, hs = '', product = '', country = '', port = '' }) {
  // each product word must start a word in the description ("mobile" matches MOBILE PHONES, not AUTOMOBILES)
  const wordRes = product
    .split('-')
    .filter(Boolean)
    .map((w) => new RegExp(`\\b${w.replace(/[^a-z0-9]/g, '')}`, 'i'));
  const matches = ALL[role].filter(
    (r) =>
      (!hs || r.hs.startsWith(hs)) &&
      (!country || r.countrySlug === country) &&
      (!port || r.portSlug === port) &&
      wordRes.every((re) => re.test(r.description)),
  );

  const rows = [...matches]
    .sort((a, b) => b.date.localeCompare(a.date) || a.id.localeCompare(b.id))
    .slice(0, TEASER_ROWS);

  // HS tree: chapter (2 digits) -> 6-digit codes
  const tree = new Map();
  matches.forEach((r) => {
    const ch = r.hs.slice(0, 2);
    const node = tree.get(ch) || { code: ch, count: 0, children: new Map() };
    node.count += 1;
    node.children.set(r.hs, (node.children.get(r.hs) || 0) + 1);
    tree.set(ch, node);
  });
  const hsTree = [...tree.values()]
    .map((n) => ({
      code: n.code,
      count: n.count,
      children: [...n.children]
        .map(([code, count]) => ({ code, count }))
        .sort((a, b) => b.count - a.count),
    }))
    .sort((a, b) => b.count - a.count);

  // chart: total net weight per HS code
  const weight = new Map();
  matches.forEach((r) => weight.set(r.hs, (weight.get(r.hs) || 0) + r.weight));
  const chart = [...weight]
    .map(([code, kg]) => ({ code, weight: Math.round(kg) }))
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 9);

  return {
    rows,
    total: matches.length,
    facets: {
      hs: hsTree,
      countries: countBy(matches, 'country', 'countrySlug'),
      ports: countBy(matches, 'port', 'portSlug'),
    },
    chart,
  };
}
