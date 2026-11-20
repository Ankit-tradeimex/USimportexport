/*
  HS code directory data.

  Sections and chapters follow the standard Harmonized System layout (chapter 77 is reserved and has no entry;
  chapters 98 and 99 are US special provisions). Titles are shortened so they fit on cards: check them
  against your own data before publishing.

  When your API is ready, replace the arrays with fetched data and keep the helper functions.
*/

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */
// from / to = first and last chapter number of the section
export const SECTIONS = [
  { id: '1', title: 'Live Animals; Animal Products', from: 1, to: 5 },
  { id: '2', title: 'Vegetable Products', from: 6, to: 14 },
  { id: '3', title: 'Animal or Vegetable Fats and Oils', from: 15, to: 15 },
  { id: '4', title: 'Prepared Foodstuffs, Beverages and Tobacco', from: 16, to: 24 },
  { id: '5', title: 'Mineral Products', from: 25, to: 27 },
  { id: '6', title: 'Chemical and Allied Industries', from: 28, to: 38 },
  { id: '7', title: 'Plastics and Rubber', from: 39, to: 40 },
  { id: '8', title: 'Hides, Skins, Leather and Furskins', from: 41, to: 43 },
  { id: '9', title: 'Wood, Cork and Straw Products', from: 44, to: 46 },
  { id: '10', title: 'Pulp, Paper and Paperboard', from: 47, to: 49 },
  { id: '11', title: 'Textiles and Textile Articles', from: 50, to: 63 },
  { id: '12', title: 'Footwear, Headgear and Umbrellas', from: 64, to: 67 },
  { id: '13', title: 'Stone, Cement, Ceramic and Glass', from: 68, to: 70 },
  { id: '14', title: 'Pearls, Precious Stones and Metals', from: 71, to: 71 },
  { id: '15', title: 'Base Metals and Articles', from: 72, to: 83 },
  { id: '16', title: 'Machinery and Electrical Equipment', from: 84, to: 85 },
  { id: '17', title: 'Vehicles, Aircraft and Vessels', from: 86, to: 89 },
  { id: '18', title: 'Optical, Medical and Precision Instruments', from: 90, to: 92 },
  { id: '19', title: 'Arms and Ammunition', from: 93, to: 93 },
  { id: '20', title: 'Miscellaneous Manufactured Articles', from: 94, to: 96 },
  { id: '21', title: 'Works of Art and Antiques', from: 97, to: 97 },
  { id: '22', title: 'US Special Classification Provisions', from: 98, to: 99 },
];

/* ------------------------------------------------------------------ */
/* Chapters  [number, short title]                                     */
/* ------------------------------------------------------------------ */
const RAW_CHAPTERS = [
  [1, 'Live animals'],
  [2, 'Meat and edible meat offal'],
  [3, 'Fish and crustaceans, molluscs and other aquatic invertebrates'],
  [4, 'Dairy produce; birds’ eggs; natural honey; edible products of animal origin'],
  [5, 'Products of animal origin, not elsewhere specified'],
  [6, 'Live trees and other plants; bulbs, roots; cut flowers and ornamental foliage'],
  [7, 'Edible vegetables and certain roots and tubers'],
  [8, 'Edible fruit and nuts; peel of citrus fruit or melons'],
  [9, 'Coffee, tea, maté and spices'],
  [10, 'Cereals'],
  [11, 'Milling products; malt; starches; inulin; wheat gluten'],
  [12, 'Oil seeds and oleaginous fruits; miscellaneous grains, seeds and fruit; straw and fodder'],
  [13, 'Lac; gums, resins and other vegetable saps and extracts'],
  [14, 'Vegetable plaiting materials; vegetable products not elsewhere specified'],
  [15, 'Animal or vegetable fats and oils; prepared edible fats; waxes'],
  [16, 'Preparations of meat, fish or crustaceans, molluscs'],
  [17, 'Sugars and sugar confectionery'],
  [18, 'Cocoa and cocoa preparations'],
  [19, 'Preparations of cereals, flour, starch or milk; pastrycooks’ products'],
  [20, 'Preparations of vegetables, fruit, nuts or other parts of plants'],
  [21, 'Miscellaneous edible preparations'],
  [22, 'Beverages, spirits and vinegar'],
  [23, 'Residues and waste from the food industries; prepared animal fodder'],
  [24, 'Tobacco and manufactured tobacco substitutes'],
  [25, 'Salt; sulphur; earths and stone; plastering materials, lime and cement'],
  [26, 'Ores, slag and ash'],
  [27, 'Mineral fuels, mineral oils and products of their distillation'],
  [28, 'Inorganic chemicals; compounds of precious metals, rare-earth metals and isotopes'],
  [29, 'Organic chemicals'],
  [30, 'Pharmaceutical products'],
  [31, 'Fertilizers'],
  [32, 'Tanning or dyeing extracts; dyes, pigments, paints, varnishes and inks'],
  [33, 'Essential oils and resinoids; perfumery, cosmetic or toilet preparations'],
  [34, 'Soap, washing and lubricating preparations, waxes, candles'],
  [35, 'Albuminoidal substances; modified starches; glues; enzymes'],
  [36, 'Explosives; pyrotechnic products; matches; pyrophoric alloys'],
  [37, 'Photographic or cinematographic goods'],
  [38, 'Miscellaneous chemical products'],
  [39, 'Plastics and articles thereof'],
  [40, 'Rubber and articles thereof'],
  [41, 'Raw hides and skins (other than furskins) and leather'],
  [42, 'Articles of leather; saddlery; travel goods, handbags and similar containers'],
  [43, 'Furskins and artificial fur; manufactures thereof'],
  [44, 'Wood and articles of wood; wood charcoal'],
  [45, 'Cork and articles of cork'],
  [46, 'Manufactures of straw, esparto or other plaiting materials; basketware'],
  [47, 'Pulp of wood or other fibrous cellulosic material; recovered paper'],
  [48, 'Paper and paperboard; articles of paper pulp, paper or paperboard'],
  [49, 'Printed books, newspapers, pictures and other printed products'],
  [50, 'Silk'],
  [51, 'Wool, fine or coarse animal hair; horsehair yarn and woven fabric'],
  [52, 'Cotton'],
  [53, 'Other vegetable textile fibres; paper yarn and woven fabrics'],
  [54, 'Man-made filaments; strip and the like of man-made textile materials'],
  [55, 'Man-made staple fibres'],
  [56, 'Wadding, felt and nonwovens; special yarns; twine, cordage, ropes and cables'],
  [57, 'Carpets and other textile floor coverings'],
  [58, 'Special woven fabrics; tufted fabrics; lace; tapestries; embroidery'],
  [59, 'Impregnated, coated or laminated textile fabrics; industrial textile articles'],
  [60, 'Knitted or crocheted fabrics'],
  [61, 'Articles of apparel and clothing accessories, knitted or crocheted'],
  [62, 'Articles of apparel and clothing accessories, not knitted or crocheted'],
  [63, 'Other made-up textile articles; sets; worn clothing; rags'],
  [64, 'Footwear, gaiters and the like; parts of such articles'],
  [65, 'Headgear and parts thereof'],
  [66, 'Umbrellas, walking-sticks, whips, riding-crops and parts thereof'],
  [67, 'Prepared feathers and down; artificial flowers; articles of human hair'],
  [68, 'Articles of stone, plaster, cement, asbestos, mica or similar materials'],
  [69, 'Ceramic products'],
  [70, 'Glass and glassware'],
  [71, 'Pearls, precious and semi-precious stones, precious metals; imitation jewellery; coin'],
  [72, 'Iron and steel'],
  [73, 'Articles of iron or steel'],
  [74, 'Copper and articles thereof'],
  [75, 'Nickel and articles thereof'],
  [76, 'Aluminium and articles thereof'],
  [78, 'Lead and articles thereof'],
  [79, 'Zinc and articles thereof'],
  [80, 'Tin and articles thereof'],
  [81, 'Other base metals; cermets; articles thereof'],
  [82, 'Tools, implements, cutlery, spoons and forks of base metal'],
  [83, 'Miscellaneous articles of base metal'],
  [84, 'Nuclear reactors, boilers, machinery and mechanical appliances; parts thereof'],
  [85, 'Electrical machinery and equipment; sound and television recorders and reproducers'],
  [86, 'Railway or tramway locomotives, rolling-stock and track fixtures'],
  [87, 'Vehicles other than railway or tramway rolling stock; parts and accessories'],
  [88, 'Aircraft, spacecraft, and parts thereof'],
  [89, 'Ships, boats and floating structures'],
  [90, 'Optical, photographic, measuring, medical or surgical instruments and apparatus'],
  [91, 'Clocks and watches and parts thereof'],
  [92, 'Musical instruments; parts and accessories'],
  [93, 'Arms and ammunition; parts and accessories'],
  [94, 'Furniture; bedding, mattresses; lamps and lighting fittings; prefabricated buildings'],
  [95, 'Toys, games and sports requisites; parts and accessories'],
  [96, 'Miscellaneous manufactured articles'],
  [97, 'Works of art, collectors’ pieces and antiques'],
  [98, 'Special classification provisions'],
  [99, 'Temporary legislation; temporary modifications under trade agreements'],
];

const pad = (n) => String(n).padStart(2, '0');

const STOP = new Set(['and', 'or', 'of', 'the', 'in', 'to', 'for', 'with']);

// uses only the first part of the title (before ; , or a bracket), so URLs stay short and readable
function slugify(s) {
  const words = s
    .split(/[;,(]/)[0]
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .split(' ')
    .slice(0, 5);
  while (words.length > 1 && STOP.has(words[words.length - 1])) words.pop();
  return words.join('-');
}

export const CHAPTERS = RAW_CHAPTERS.map(([n, title]) => {
  const section = SECTIONS.find((s) => n >= s.from && n <= s.to);
  return {
    number: n,
    code: pad(n),
    title,
    slug: `Ch-${pad(n)}-${slugify(title)}`, // e.g. Ch-01-live-animals
    section: section.id,
  };
});

/*
  Optional: number of codes per chapter, e.g. { 1: 480, 85: 6100 }.
  A chapter card shows its count only when it is listed here.
*/
export const CODE_COUNTS = {};

/* ------------------------------------------------------------------ */
/* Modes: role + type                                                  */
/* ------------------------------------------------------------------ */
export const ROLES = [
  { value: 'export', label: 'Export' },
  { value: 'import', label: 'Import' },
];
export const TYPES = [
  { value: 'company', label: 'Company' },
  { value: 'data', label: 'Data' },
];

export const DEFAULT_MODE = 'export-company';
export const MODES = ROLES.flatMap((r) => TYPES.map((t) => `${r.value}-${t.value}`));

// 'export-company' -> { role: 'export', type: 'company' }, or null if it is not valid
export function parseMode(mode) {
  const [role, type] = String(mode || '').split('-');
  if (!ROLES.some((r) => r.value === role) || !TYPES.some((t) => t.value === type)) return null;
  return { role, type };
}

export function modeLabel({ role, type }) {
  return `US ${role === 'export' ? 'exporter' : 'importer'} ${type}`;
}

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
export const getSections = () => SECTIONS;
export const getChapters = () => CHAPTERS;
export const getChaptersBySection = (id) =>
  id === 'all' ? CHAPTERS : CHAPTERS.filter((c) => c.section === id);
export const getChapterBySlug = (slug) =>
  CHAPTERS.find((c) => c.slug.toLowerCase() === String(slug).toLowerCase()) || null;

export const chapterPath = (mode, chapter, page = 1) =>
  `/hs-code-directory/${mode}/us-hs-code-list/${chapter.slug}/${page}`;
export const overviewPath = (mode) => `/hs-code-directory/${mode}`;

// matches a chapter number ("85", "8517" -> chapter 85) or words in the title
export function searchChapters(query, limit = 6) {
  const q = String(query || '')
    .trim()
    .toLowerCase();
  if (!q) return [];
  if (/^\d+$/.test(q)) {
    const lead = q.length >= 2 ? q.slice(0, 2) : q;
    return CHAPTERS.filter((c) =>
      q.length >= 2 ? c.code === lead : c.code.startsWith(lead),
    ).slice(0, limit);
  }
  const words = q.split(/\s+/);
  return CHAPTERS.filter((c) => words.every((w) => c.title.toLowerCase().includes(w))).slice(
    0,
    limit,
  );
}

/*
  Where a search goes. Change this one function when you decide the final search URL.
  Assumption: the live-data search reads ?type=import|export&by=data|company&q=<text>.
*/
export function searchHref({ role, by, q }) {
  const p = new URLSearchParams({ type: role, by, q });
  return `/search-live-data?${p.toString()}`;
}

/* ------------------------------------------------------------------ */
/* SAMPLE codes (chapters 01, 03, 85, 87 only)                         */
/*  Replace with your real data. Shape: chapter number -> headings,    */
/*  each heading -> its 6-digit codes as [code, description].          */
/* ------------------------------------------------------------------ */
const h = (heading, title, codes) => ({ heading, title, codes });

export const SAMPLE_CODES = {
  1: [
    h('0101', 'Live horses, asses, mules and hinnies', [
      ['010121', 'Pure-bred breeding horses'],
      ['010129', 'Other horses'],
      ['010130', 'Asses'],
      ['010190', 'Other (mules and hinnies)'],
    ]),
    h('0102', 'Live bovine animals', [
      ['010221', 'Pure-bred breeding cattle'],
      ['010229', 'Other cattle'],
      ['010231', 'Pure-bred breeding buffalo'],
      ['010239', 'Other buffalo'],
      ['010290', 'Other bovine animals'],
    ]),
    h('0103', 'Live swine', [
      ['010310', 'Pure-bred breeding swine'],
      ['010391', 'Other swine, weighing less than 50 kg'],
      ['010392', 'Other swine, weighing 50 kg or more'],
    ]),
    h('0104', 'Live sheep and goats', [
      ['010410', 'Sheep'],
      ['010420', 'Goats'],
    ]),
    h('0105', 'Live poultry', [
      ['010511', 'Fowls, weighing not more than 185 g'],
      ['010512', 'Turkeys, weighing not more than 185 g'],
      ['010513', 'Ducks, weighing not more than 185 g'],
      ['010514', 'Geese, weighing not more than 185 g'],
      ['010515', 'Guinea fowls, weighing not more than 185 g'],
      ['010594', 'Fowls, weighing more than 185 g'],
      ['010599', 'Other poultry'],
    ]),
    h('0106', 'Other live animals', [
      ['010611', 'Primates'],
      ['010613', 'Camels and other camelids'],
      ['010614', 'Rabbits and hares'],
      ['010619', 'Other mammals'],
      ['010620', 'Reptiles'],
      ['010631', 'Birds of prey'],
      ['010632', 'Psittaciformes (parrots and similar)'],
      ['010633', 'Ostriches; emus'],
      ['010639', 'Other birds'],
      ['010641', 'Bees'],
      ['010649', 'Other insects'],
      ['010690', 'Other live animals'],
    ]),
  ],
  3: [
    h('0301', 'Live fish', [
      ['030111', 'Ornamental freshwater fish'],
      ['030119', 'Other ornamental fish'],
      ['030191', 'Trout'],
      ['030192', 'Eels'],
      ['030193', 'Carp'],
      ['030199', 'Other live fish'],
    ]),
    h('0302', 'Fish, fresh or chilled (excluding fillets and other fish meat)', [
      ['030211', 'Trout'],
      ['030214', 'Atlantic salmon and Danube salmon'],
      ['030221', 'Halibut'],
      ['030222', 'Plaice'],
      ['030223', 'Sole'],
      ['030231', 'Albacore or longfinned tunas'],
      ['030232', 'Yellowfin tunas'],
      ['030233', 'Skipjack or stripe-bellied bonito'],
      ['030234', 'Bigeye tunas'],
    ]),
    h('0306', 'Crustaceans, live, fresh, chilled, frozen, dried, salted or in brine', [
      ['030611', 'Rock lobster and other sea crawfish, frozen'],
      ['030612', 'Lobsters, frozen'],
      ['030614', 'Crabs, frozen'],
      ['030616', 'Cold-water shrimps and prawns, frozen'],
      ['030617', 'Other shrimps and prawns, frozen'],
    ]),
    h('0307', 'Molluscs, live, fresh, chilled, frozen, dried, salted or in brine', [
      ['030711', 'Oysters, live, fresh or chilled'],
      ['030719', 'Oysters, other'],
      ['030731', 'Mussels, live, fresh or chilled'],
      ['030739', 'Mussels, other'],
    ]),
  ],
  85: [
    h('8501', 'Electric motors and generators (excluding generating sets)', [
      ['850110', 'Motors of an output not exceeding 37.5 W'],
      ['850120', 'Universal AC/DC motors, output exceeding 37.5 W'],
      ['850131', 'DC motors and generators, output not exceeding 750 W'],
      ['850132', 'DC motors and generators, output 750 W to 75 kW'],
      ['850133', 'DC motors and generators, output 75 kW to 375 kW'],
      ['850134', 'DC motors and generators, output exceeding 375 kW'],
      ['850140', 'Other AC motors, single-phase'],
      ['850151', 'Other AC motors, multi-phase, output not exceeding 750 W'],
      ['850152', 'Other AC motors, multi-phase, output 750 W to 75 kW'],
      ['850153', 'Other AC motors, multi-phase, output exceeding 75 kW'],
      ['850161', 'AC generators, output not exceeding 75 kVA'],
      ['850162', 'AC generators, output 75 kVA to 375 kVA'],
      ['850163', 'AC generators, output 375 kVA to 750 kVA'],
      ['850164', 'AC generators, output exceeding 750 kVA'],
    ]),
    h('8504', 'Electrical transformers, static converters and inductors', [
      ['850410', 'Ballasts for discharge lamps or tubes'],
      ['850421', 'Liquid dielectric transformers, up to 650 kVA'],
      ['850422', 'Liquid dielectric transformers, 650 to 10,000 kVA'],
      ['850423', 'Liquid dielectric transformers, over 10,000 kVA'],
      ['850431', 'Other transformers, up to 1 kVA'],
      ['850432', 'Other transformers, 1 to 16 kVA'],
      ['850433', 'Other transformers, 16 to 500 kVA'],
      ['850434', 'Other transformers, over 500 kVA'],
      ['850440', 'Static converters'],
      ['850450', 'Other inductors'],
      ['850490', 'Parts'],
    ]),
    h('8507', 'Electric accumulators, including separators', [
      ['850710', 'Lead-acid, for starting piston engines'],
      ['850720', 'Other lead-acid accumulators'],
      ['850730', 'Nickel-cadmium accumulators'],
      ['850750', 'Nickel-metal hydride accumulators'],
      ['850760', 'Lithium-ion accumulators'],
      ['850780', 'Other accumulators'],
      ['850790', 'Parts'],
    ]),
    h(
      '8517',
      'Telephone sets, including smartphones; other apparatus for transmission or reception of voice, images or data',
      [
        ['851713', 'Smartphones'],
        ['851714', 'Other telephones for cellular networks or other wireless networks'],
        ['851718', 'Other telephone sets'],
        ['851761', 'Base stations'],
        [
          '851762',
          'Machines for the reception, conversion and transmission of voice, images or data (including switching and routing apparatus)',
        ],
        ['851769', 'Other apparatus'],
        ['851770', 'Parts'],
      ],
    ),
    h(
      '8523',
      'Discs, tapes, solid-state storage devices and other media for recording sound or other phenomena',
      [
        ['852321', 'Cards incorporating a magnetic stripe'],
        ['852329', 'Other magnetic media'],
        ['852341', 'Optical media, unrecorded'],
        ['852349', 'Other optical media'],
        ['852351', 'Solid-state non-volatile storage devices'],
        ['852352', 'Smart cards'],
        ['852359', 'Other semiconductor media'],
        ['852380', 'Other media'],
      ],
    ),
  ],
  87: [
    h(
      '8703',
      'Motor cars and other motor vehicles principally designed for the transport of persons',
      [
        ['870310', 'Vehicles for travelling on snow; golf cars and similar vehicles'],
        ['870321', 'Spark-ignition, cylinder capacity not over 1,000 cc'],
        ['870322', 'Spark-ignition, 1,000 to 1,500 cc'],
        ['870323', 'Spark-ignition, 1,500 to 3,000 cc'],
        ['870324', 'Spark-ignition, over 3,000 cc'],
        ['870331', 'Diesel, not over 1,500 cc'],
        ['870332', 'Diesel, 1,500 to 2,500 cc'],
        ['870333', 'Diesel, over 2,500 cc'],
        ['870340', 'Hybrid, spark-ignition, not plug-in'],
        ['870350', 'Hybrid, diesel, not plug-in'],
        ['870360', 'Plug-in hybrid, spark-ignition'],
        ['870370', 'Plug-in hybrid, diesel'],
        ['870380', 'Electric motor only'],
        ['870390', 'Other'],
      ],
    ),
    h('8704', 'Motor vehicles for the transport of goods', [
      ['870410', 'Dumpers designed for off-highway use'],
      ['870421', 'Diesel, gross vehicle weight not over 5 tonnes'],
      ['870422', 'Diesel, 5 to 20 tonnes'],
      ['870423', 'Diesel, over 20 tonnes'],
      ['870431', 'Spark-ignition, not over 5 tonnes'],
      ['870432', 'Spark-ignition, over 5 tonnes'],
      ['870490', 'Other'],
    ]),
    h('8708', 'Parts and accessories of motor vehicles', [
      ['870810', 'Bumpers and parts thereof'],
      ['870821', 'Safety seat belts'],
      ['870829', 'Other parts and accessories of bodies'],
      ['870830', 'Brakes and servo-brakes; parts'],
      ['870840', 'Gear boxes and parts'],
      ['870850', 'Drive-axles with differential'],
      ['870870', 'Road wheels and parts and accessories'],
      ['870880', 'Suspension systems and parts'],
      ['870891', 'Radiators and parts'],
      ['870892', 'Silencers and exhaust pipes; parts'],
      ['870893', 'Clutches and parts'],
      ['870894', 'Steering wheels, steering columns and steering boxes'],
      ['870899', 'Other parts'],
    ]),
    h('8711', 'Motorcycles (including mopeds) and cycles fitted with an auxiliary motor', [
      ['871110', 'Reciprocating piston engine, not over 50 cc'],
      ['871120', 'Reciprocating piston engine, 50 to 250 cc'],
      ['871130', 'Reciprocating piston engine, 250 to 500 cc'],
      ['871140', 'Reciprocating piston engine, 500 to 800 cc'],
      ['871150', 'Reciprocating piston engine, over 800 cc'],
      ['871160', 'With electric motor for propulsion'],
      ['871190', 'Other'],
    ]),
  ],
};

/* all codes of a chapter as one flat list, in order */
export function getChapterCodes(number) {
  return (SAMPLE_CODES[number] || []).flatMap((hd) =>
    hd.codes.map(([code, desc]) => ({ code, desc, heading: hd.heading, headingTitle: hd.title })),
  );
}

export const getHeadingCount = (number) => (SAMPLE_CODES[number] || []).length;

/*
  One page of codes. `q` filters by code prefix or by words in the description / heading.
  Returns codes grouped by heading for the page, plus paging info.
*/
export function getCodePage({ chapter, q = '', page = 1, perPage = 24 }) {
  const all = getChapterCodes(chapter);
  const text = String(q).trim().toLowerCase();
  const words = text.split(/\s+/).filter(Boolean);
  const list = !text
    ? all
    : /^\d+$/.test(text)
      ? all.filter((c) => c.code.startsWith(text))
      : all.filter((c) =>
          words.every((w) => `${c.desc} ${c.headingTitle}`.toLowerCase().includes(w)),
        );

  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const items = list.slice((page - 1) * perPage, page * perPage);

  const groups = [];
  for (const c of items) {
    let g = groups[groups.length - 1];
    if (!g || g.heading !== c.heading)
      groups.push((g = { heading: c.heading, title: c.headingTitle, items: [] }));
    g.items.push(c);
  }
  return { groups, total, totalAll: all.length, totalPages, page };
}

export function getAdjacentChapters(chapter) {
  const i = CHAPTERS.findIndex((c) => c.number === chapter.number);
  return { prev: CHAPTERS[i - 1] || null, next: CHAPTERS[i + 1] || null };
}

/* Link behind a code tile. The data-page URL is a placeholder until that page exists. */
export function getCodeHref({ role, type, code }) {
  if (type === 'company')
    return `/company/us-${code}-${role === 'export' ? 'exporter' : 'importer'}`;
  return `/data/us-${code}-${role}-data`;
}

export const codeLinkLabel = ({ role, type }) =>
  type === 'company'
    ? role === 'export'
      ? 'View exporters'
      : 'View importers'
    : role === 'export'
      ? 'View export data'
      : 'View import data';
