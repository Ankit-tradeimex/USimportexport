import { ROLES, TYPES } from './hsDirectoryData';

export { ROLES, TYPES };

export const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('');
export const PER_PAGE = 16;

export const CATEGORIES = {
  food: 'Food & Agriculture',
  chemicals: 'Chemicals',
  electronics: 'Electronics',
  vehicles: 'Vehicles & Parts',
  machinery: 'Machinery',
  textiles: 'Textiles & Apparel',
  metals: 'Metals',
  beverages: 'Beverages',
  pharma: 'Pharmaceuticals',
  energy: 'Energy',
  furniture: 'Furniture & Home',
  art: 'Art & Collectibles',
  aero: 'Aerospace',
  arms: 'Arms & Ammunition',
  animals: 'Live Animals',
  paper: 'Paper & Wood',
  plastics: 'Plastics & Rubber',
  jewellery: 'Jewellery & Gems',
  misc: 'Other Goods',
};

const RAW = `
Automobiles|vehicles
Aircraft Parts|aero
Apparel|textiles
Apple|food
Aluminum|metals
Agricultural Products|food
Antiques|art
Ammunition|arms
Animal Feed|food
Asparagus|food
Avocado|food
Audio Equipment|electronics
Alcoholic Beverages|beverages
Artwork|art
Air Conditioners|machinery
Adhesives|chemicals
Almonds|food
Apricots|food
Aspirin|pharma
Antibiotics|pharma
Aluminum Foil|metals
Acrylic Sheets|plastics
Activated Carbon|chemicals
Air Filters|machinery
Amplifiers|electronics
Antennas|electronics
Automotive Parts|vehicles
Automobile Tires|vehicles
Artificial Flowers|art
Ale|beverages
Anchovies|food
Ammonia|chemicals
Alloy Steel|metals
Agricultural Machinery|machinery
Air Compressors|machinery
Aircraft Engines|aero
Artificial Fibers|textiles
Axles|vehicles
Aquarium Fish|animals
Amber|jewellery
Bananas|food
Batteries|electronics
Beer|beverages
Bicycles|vehicles
Books|paper
Beef|food
Bearings|machinery
Biodiesel|energy
Blankets|textiles
Brass|metals
Cocoa|food
Coffee|food
Cotton|textiles
Copper|metals
Cement|misc
Ceramics|misc
Cosmetics|chemicals
Computers|electronics
Cheese|food
Crude Oil|energy
Dairy Products|food
Diamonds|jewellery
Diesel Fuel|energy
Dolls|misc
Drones|aero
Dyes|chemicals
Electronics|electronics
Eggs|food
Electric Motors|machinery
Engines|machinery
Essential Oils|chemicals
Fertilizers|chemicals
Footwear|textiles
Furniture|furniture
Frozen Fish|food
Fruit Juice|beverages
Garments|textiles
Glass|misc
Gold|jewellery
Grain|food
Granite|misc
Handbags|textiles
Hardware|metals
Honey|food
Home Appliances|furniture
Lithium Batteries|electronics
Leather|textiles
Lumber|paper
Lubricants|energy
Machinery|machinery
Medical Devices|pharma
Mobile Phones|electronics
Motorcycles|vehicles
Marble|misc
Paper|paper
Pharmaceuticals|pharma
Plastics|plastics
Petroleum|energy
Pasta|food
Perfumes|chemicals
Rubber|plastics
Rice|food
Seafood|food
Steel|metals
Solar Panels|energy
Shoes|textiles
Sugar|food
Spices|food
Tea|food
Textiles|textiles
Toys|misc
Tires|vehicles
Tobacco|misc
Televisions|electronics
Tractors|machinery
Watches|jewellery
Wine|beverages
Wheat|food
Wood|paper
Whiskey|beverages
Zinc|metals
Zippers|textiles
`;

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const PRODUCTS = RAW.trim()
  .split('\n')
  .map((line) => {
    const [name, category] = line.split('|');
    return {
      name,
      slug: slugify(name),
      category,
      categoryName: CATEGORIES[category],
      letter: name[0].toLowerCase(),
    };
  });

/* ------------------------------------------------------------------ */
/* Modes: role + type  ->  URL part                                    */
/* ------------------------------------------------------------------ */
const MODE_SLUGS = {
  'import-data': 'us-import-data',
  'export-data': 'us-export-data',
  'import-company': 'us-importer-company',
  'export-company': 'us-exporter-company',
};

export const DEFAULT_DD_MODE = 'us-import-data';
export const DD_MODES = Object.values(MODE_SLUGS);
export const modeSlug = (role, type) => MODE_SLUGS[`${role}-${type}`];

// 'us-import-data' -> { role: 'import', type: 'data' }, or null
export function parseDdMode(slug) {
  const key = Object.keys(MODE_SLUGS).find((k) => MODE_SLUGS[k] === slug);
  if (!key) return null;
  const [role, type] = key.split('-');
  return { role, type };
}

export const ddPath = (slug, letter, page = 1) => `/data-directory/${slug}/${letter}/${page}`;

export function ddTitle({ role, type }, letter) {
  const L = letter.toUpperCase();
  if (type === 'data')
    return `US ${role === 'import' ? 'Import' : 'Export'} Data for Products starting with ${L}`;
  return `US ${role === 'import' ? 'Importers' : 'Exporters'} of Products starting with ${L}`;
}

export function ddIntro({ role, type }, letter) {
  const L = letter.toUpperCase();
  const r = role === 'import' ? 'import' : 'export';
  const who = role === 'import' ? 'importers' : 'exporters';
  if (type === 'data')
    return `Discover accurate US ${r} data by products starting with letter ${L}. Access verified US ${r} data, key product categories, top ${who} in the USA and valuable trade insights to expand opportunities and support confident, data-driven decision-making.`;
  return `Find US ${who} of products starting with letter ${L}. Browse verified ${r} companies by product, see who ships what, and reach the right buyers and suppliers with confidence.`;
}

/* Where a product tile goes. Company -> company page, data -> data page. */
export function getProductHref({ role, type, slug }) {
  if (type === 'company')
    return `/company/us-${slug}-${role === 'export' ? 'exporter' : 'importer'}`;
  return `/data/us-${slug}-${role}`;
}

export const productLinkLabel = ({ role, type }) =>
  type === 'company'
    ? role === 'export'
      ? 'View exporters'
      : 'View importers'
    : role === 'export'
      ? 'View export data'
      : 'View import data';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
export const getLetterCounts = () => {
  const counts = Object.fromEntries(LETTERS.map((l) => [l, 0]));
  PRODUCTS.forEach((p) => (counts[p.letter] += 1));
  return counts;
};

// one page of products for a letter; `q` filters by words in the name or category
export function getProducts({ letter, q = '', page = 1, perPage = PER_PAGE }) {
  const all = PRODUCTS.filter((p) => p.letter === letter);
  const words = String(q).trim().toLowerCase().split(/\s+/).filter(Boolean);
  const list = words.length
    ? all.filter((p) => words.every((w) => `${p.name} ${p.categoryName}`.toLowerCase().includes(w)))
    : all;
  const totalPages = Math.max(1, Math.ceil(list.length / perPage));
  return {
    items: list.slice((page - 1) * perPage, page * perPage),
    total: list.length,
    totalAll: all.length,
    totalPages,
    page,
  };
}

// closest letters that have products (for the empty state)
export function getNearbyLetters(letter, count = 3) {
  const counts = getLetterCounts();
  const i = LETTERS.indexOf(letter);
  return LETTERS.filter((l) => counts[l] > 0)
    .sort((a, b) => Math.abs(LETTERS.indexOf(a) - i) - Math.abs(LETTERS.indexOf(b) - i))
    .slice(0, count);
}
