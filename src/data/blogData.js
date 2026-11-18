import usBillOfLadingArticle from './usBillOfLadingArticle';

export const CATEGORIES = [
  {
    name: 'US Imports',
    slug: 'us-imports',
    description:
      'Ideas and guides for researching US import data: finding suppliers, following shipments and seeing what enters the country.',
  },
  {
    name: 'US Exports',
    slug: 'us-exports',
    description:
      'Articles on US export data: finding buyers, tracking competitors and seeing where goods are shipped.',
  },
  {
    name: 'HS Codes',
    slug: 'hs-codes',
    description:
      'Plain-language help with HS codes: how they work, how to find yours and how to avoid common mistakes.',
  },
  {
    name: 'Trade Guides',
    slug: 'trade-guides',
    description:
      'Step-by-step guides to reading trade documents and doing market research with shipment records.',
  },
];

export const TAG_NAMES = {
  'import-data': 'Import data',
  'export-data': 'Export data',
  'hs-code': 'HS code',
  'bill-of-lading': 'Bill of lading',
  'us-customs': 'US customs',
  'market-research': 'Market research',
  'shipment-data': 'Shipment Data',
  importers: 'Importers',
  'trade-intelligence': 'Trade Intelligence',
  suppliers: 'Suppliers',
  buyers: 'Buyers',
  competitors: 'Competitors',
  shipping: 'Shipping',
};

export const POSTS = [
  {
    slug: 'how-to-read-a-us-bill-of-lading',
    title: 'How to Read a US Bill of Lading: A Field-by-Field Guide',
    excerpt:
      'A bill of lading holds the details behind every shipment. Learn what each field means and how to use it to research buyers, suppliers and routes.',
    image: null,
    category: 'Trade Guides',
    tags: ['bill-of-lading', 'import-data', 'shipping'],
    date: '2026-10-28',
    readTime: '7 min read',
    views: 1840,
    featured: true,
    author: {
      name: 'USImportdata Editorial Team',
      role: 'Trade Data Research & Analysis',
      bio: 'Our editorial team specializes in US import-export data, international trade intelligence, shipment records, and global market trends. We create research-driven content to help businesses make informed trade decisions.',
      image: '/assets/images/authors/user.png',
      profileUrl: '/about',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/',
      },
    },
  },
  {
    slug: 'find-us-importers-for-your-product',
    title: 'How to Find US Importers for Your Product Using Trade Data',
    excerpt:
      'Shipment records show who is already buying products like yours. Here is a simple way to build a list of real US importers.',
    image: null,
    category: 'US Imports',
    tags: ['buyers', 'import-data', 'market-research'],
    date: '2026-10-21',
    readTime: '6 min read',
    views: 2210,
    author: {
      name: 'USImportdata Editorial Team',
      role: 'Trade Data Research & Analysis',
      bio: 'Our editorial team specializes in US import-export data, international trade intelligence, shipment records, and global market trends. We create research-driven content to help businesses make informed trade decisions.',
      image: '/assets/images/authors/user.png',
      profileUrl: '/about',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/',
      },
    },
  },
  {
    slug: 'what-is-an-hs-code-and-how-to-find-yours',
    title: 'What Is an HS Code and How Do You Find the Right One?',
    excerpt:
      'The right HS code affects duties, paperwork and the data you can search. A plain-language guide to finding the correct code for your product.',
    image: null,
    category: 'HS Codes',
    tags: ['hs-code', 'us-customs'],
    date: '2026-10-14',
    readTime: '5 min read',
    views: 2965,
    author: {
      name: 'USImportdata Editorial Team',
      role: 'Trade Data Research & Analysis',
      bio: 'Our editorial team specializes in US import-export data, international trade intelligence, shipment records, and global market trends. We create research-driven content to help businesses make informed trade decisions.',
      image: '/assets/images/authors/user.png',
      profileUrl: '/about',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/',
      },
    },
  },
  {
    slug: 'track-competitors-with-us-export-data',
    title: 'Tracking Competitors With US Export Data',
    excerpt:
      'See where competitors ship, how often and to whom. Use export records to understand a market before you enter it.',
    image: null,
    category: 'US Exports',
    tags: ['competitors', 'export-data', 'market-research'],
    date: '2026-10-07',
    readTime: '6 min read',
    views: 1320,
    author: {
      name: 'USImportdata Editorial Team',
      role: 'Trade Data Research & Analysis',
      bio: 'Our editorial team specializes in US import-export data, international trade intelligence, shipment records, and global market trends. We create research-driven content to help businesses make informed trade decisions.',
      image: '/assets/images/authors/user.png',
      profileUrl: '/about',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/',
      },
    },
  },
  {
    slug: 'us-import-data-for-supplier-research',
    title: 'Using US Import Data to Research New Suppliers',
    excerpt:
      'Look beyond catalogues. Import records reveal which overseas suppliers ship to the US and in what volumes.',
    image: null,
    category: 'US Imports',
    tags: ['suppliers', 'import-data'],
    date: '2026-09-30',
    readTime: '5 min read',
    views: 980,
    author: {
      name: 'USImportdata Editorial Team',
      role: 'Trade Data Research & Analysis',
      bio: 'Our editorial team specializes in US import-export data, international trade intelligence, shipment records, and global market trends. We create research-driven content to help businesses make informed trade decisions.',
      image: '/assets/images/authors/user.png',
      profileUrl: '/about',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/',
      },
    },
  },
  {
    slug: 'understanding-us-customs-data',
    title: 'Understanding US Customs Data: Where It Comes From',
    excerpt:
      'A short explainer on how US customs data is created, what it includes and what it can and cannot tell you.',
    image: null,
    category: 'Trade Guides',
    tags: ['us-customs', 'import-data', 'export-data'],
    date: '2026-09-23',
    readTime: '6 min read',
    views: 760,
    author: {
      name: 'USImportdata Editorial Team',
      role: 'Trade Data Research & Analysis',
      bio: 'Our editorial team specializes in US import-export data, international trade intelligence, shipment records, and global market trends. We create research-driven content to help businesses make informed trade decisions.',
      image: '/assets/images/authors/user.png',
      profileUrl: '/about',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/',
      },
    },
  },
  {
    slug: 'hs-code-chapters-explained',
    title: 'HS Code Chapters Explained With Simple Examples',
    excerpt:
      'Chapters, headings and subheadings made easy. See how a code is built so you can read any HS code with confidence.',
    image: null,
    category: 'HS Codes',
    tags: ['hs-code'],
    date: '2026-09-16',
    readTime: '8 min read',
    views: 1150,
    author: {
      name: 'USImportdata Editorial Team',
      role: 'Trade Data Research & Analysis',
      bio: 'Our editorial team specializes in US import-export data, international trade intelligence, shipment records, and global market trends. We create research-driven content to help businesses make informed trade decisions.',
      image: '/assets/images/authors/user.png',
      profileUrl: '/about',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/',
      },
    },
  },
  {
    slug: 'market-research-with-shipment-records',
    title: 'Market Research With Shipment Records: A Beginner Walkthrough',
    excerpt:
      'Turn raw shipment lines into market insight: volumes, trends, top countries and the companies behind them.',
    image: null,
    category: 'Trade Guides',
    tags: ['market-research', 'import-data', 'export-data'],
    date: '2026-09-09',
    readTime: '9 min read',
    views: 1405,
    author: {
      name: 'USImportdata Editorial Team',
      role: 'Trade Data Research & Analysis',
      bio: 'Our editorial team specializes in US import-export data, international trade intelligence, shipment records, and global market trends. We create research-driven content to help businesses make informed trade decisions.',
      image: '/assets/images/authors/user.png',
      profileUrl: '/about',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/',
      },
    },
  },
  {
    slug: 'build-a-buyer-list-from-export-records',
    title: 'Build a Qualified Buyer List From US Export Records',
    excerpt:
      'Find the companies that actually buy your category, then prioritise them by activity and shipment history.',
    image: null,
    category: 'US Exports',
    tags: ['buyers', 'export-data'],
    date: '2026-09-02',
    readTime: '5 min read',
    views: 890,
    author: {
      name: 'USImportdata Editorial Team',
      role: 'Trade Data Research & Analysis',
      bio: 'Our editorial team specializes in US import-export data, international trade intelligence, shipment records, and global market trends. We create research-driven content to help businesses make informed trade decisions.',
      image: '/assets/images/authors/user.png',
      profileUrl: '/about',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/',
      },
    },
  },
  {
    slug: 'import-and-export-data-what-is-the-difference',
    title: 'Import Data vs Export Data: What Is the Difference?',
    excerpt:
      'Both describe trade, but they answer different questions. Learn when to use each and how to combine them.',
    image: null,
    category: 'Trade Guides',
    tags: ['import-data', 'export-data'],
    date: '2026-08-26',
    readTime: '4 min read',
    views: 640,
    author: {
      name: 'USImportdata Editorial Team',
      role: 'Trade Data Research & Analysis',
      bio: 'Our editorial team specializes in US import-export data, international trade intelligence, shipment records, and global market trends. We create research-driven content to help businesses make informed trade decisions.',
      image: '/assets/images/authors/user.png',
      profileUrl: '/about',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/',
      },
    },
  },
  {
    slug: 'shipping-routes-and-ports-in-trade-data',
    title: 'Shipping Routes and Ports: What Trade Data Reveals',
    excerpt:
      'Loading and unloading ports tell you how goods move. Use them to understand lanes and plan your logistics.',
    image: null,
    category: 'US Imports',
    tags: ['shipping', 'import-data'],
    date: '2026-08-19',
    readTime: '6 min read',
    views: 705,
    author: {
      name: 'USImportdata Editorial Team',
      role: 'Trade Data Research & Analysis',
      bio: 'Our editorial team specializes in US import-export data, international trade intelligence, shipment records, and global market trends. We create research-driven content to help businesses make informed trade decisions.',
      image: '/assets/images/authors/user.png',
      profileUrl: '/about',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/',
      },
    },
  },
  {
    slug: 'common-hs-code-mistakes',
    title: 'Common HS Code Mistakes and How to Avoid Them',
    excerpt:
      'A wrong code can delay a shipment and skew your research. These are the mistakes to watch for.',
    image: null,
    category: 'HS Codes',
    tags: ['hs-code', 'us-customs'],
    date: '2026-08-12',
    readTime: '5 min read',
    views: 1010,
    author: {
      name: 'USImportdata Editorial Team',
      role: 'Trade Data Research & Analysis',
      bio: 'Our editorial team specializes in US import-export data, international trade intelligence, shipment records, and global market trends. We create research-driven content to help businesses make informed trade decisions.',
      image: '/assets/images/authors/user.png',
      profileUrl: '/about',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/',
      },
    },
  },
  {
    slug: 'us-bill-of-lading-data',
    title:
      'US Bill of Lading Data: A Complete Guide to Shipment Records, Fields, and Trade Insights',
    excerpt:
      'Explore US bill of lading data, understand shipment records and document fields, and learn how to identify importers, suppliers, shipping routes, and trade opportunities.',
    image: '/assets/blogs/us-bill-of-lading-cover.webp',
    category: 'US Imports',
    tags: [
      'bill-of-lading',
      'import-data',
      'shipment-data',
      'importers',
      'suppliers',
      'trade-intelligence',
    ],
    date: '2026-11-18',
    readTime: '14 min read',
    views: 0,
    author: {
      name: 'USImportdata Editorial Team',
      role: 'Trade Data Research & Analysis',
      bio: 'Our editorial team specializes in US import-export data, international trade intelligence, shipment records, and global market trends. We create research-driven content to help businesses make informed trade decisions.',
      image: '/assets/images/authors/user.png',
      profileUrl: '/about',
      socialLinks: {
        linkedin: 'https://www.linkedin.com/',
      },
    },
  },
];

/* ------------------------------------------------------------------ */
/* Helpers (same names whether the data is local or from a CMS)        */
/* ------------------------------------------------------------------ */
const byDateDesc = (a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
const slugOf = (name) => CATEGORIES.find((c) => c.name === name)?.slug ?? '';

function extractBlockText(block) {
  if (!block) return '';

  if (typeof block === 'string') return block;

  if (Array.isArray(block)) {
    return block.map(extractBlockText).join(' ');
  }

  return [
    block.text,
    block.caption,
    block.alt,
    block.title,
    block.description,
    block.items,
    block.headers,
    block.rows,
    block.cells,
    block.children,
  ]
    .map(extractBlockText)
    .filter(Boolean)
    .join(' ');
}

function bodyText(post) {
  return getPostContent(post).map(extractBlockText).join(' ');
}

// every post, newest first, with its category slug filled in
export function getAllPosts() {
  return [...POSTS].sort(byDateDesc).map((p) => ({ ...p, categorySlug: slugOf(p.category) }));
}

/**
 * Posts for a listing page, filtered and paginated.
 *   getPosts({ q, category, tag, page, perPage })
 *   -> { posts, page, totalPages, total }
 */
export function getPosts({ q = '', category = '', tag = '', page = 1, perPage = 6 } = {}) {
  let list = getAllPosts();

  if (category) list = list.filter((p) => p.categorySlug === category);
  if (tag) list = list.filter((p) => p.tags?.includes(tag));
  // every word must appear somewhere in the title, excerpt, category, tags or article body
  const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length) {
    list = list.filter((p) => {
      const hay = [
        p.title,
        p.excerpt,
        p.category,
        ...(p.tags ?? []).map((t) => TAG_NAMES[t] ?? t),
        bodyText(p),
      ]
        .join(' ')
        .toLowerCase();
      return words.every((w) => hay.includes(w));
    });
  }

  const total = list.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, Number(page) || 1), totalPages);

  return {
    posts: list.slice((current - 1) * perPage, current * perPage),
    page: current,
    totalPages,
    total,
  };
}

export function getPostBySlug(slug) {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

// posts that share a category or tag with the given one
export function getRelatedPosts(slug, limit = 3) {
  const base = getPostBySlug(slug);
  if (!base) return [];
  return getAllPosts()
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      p,
      score:
        (p.category === base.category ? 2 : 0) + p.tags.filter((t) => base.tags.includes(t)).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || byDateDesc(a.p, b.p))
    .slice(0, limit)
    .map((x) => x.p);
}

export function getFeaturedPost() {
  const all = getAllPosts();
  return all.find((p) => p.featured) ?? all[0] ?? null;
}

export function getCategoryBySlug(slug) {
  const c = CATEGORIES.find((x) => x.slug === slug);
  return c ? { ...c, count: getAllPosts().filter((p) => p.categorySlug === slug).length } : null;
}

export function getTagBySlug(slug) {
  return TAG_NAMES[slug] ? { slug, name: TAG_NAMES[slug] } : null;
}

/* ------------------------------------------------------------------ */
/* Sidebar data: categories with counts, trending, latest, popular tags */
/* ------------------------------------------------------------------ */
export function getSidebarData() {
  const all = getAllPosts();

  const categories = CATEGORIES.map((c) => ({
    ...c,
    count: all.filter((p) => p.categorySlug === c.slug).length,
  }));

  const trending = [...all].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 5);
  const latest = all.slice(0, 4);

  const tagCount = {};
  all.forEach((p) => p.tags?.forEach((t) => (tagCount[t] = (tagCount[t] ?? 0) + 1)));
  const tags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([slug]) => ({ slug, name: TAG_NAMES[slug] ?? slug }));

  return { categories, trending, latest, tags };
}

const CONTENT = {
  'how-to-read-a-us-bill-of-lading': [
    {
      type: 'p',
      children: [
        {
          type: 'text',
          text: 'US bill of lading data helps you identify ',
        },
        {
          type: 'link',
          text: 'importers',
          href: '/companies',
        },
        {
          type: 'text',
          text: ' and ',
        },
        {
          type: 'link',
          text: 'suppliers',
          href: '/import-data',
        },
        {
          type: 'text',
          text: '.',
        },
      ],
    },
    { type: 'h2', text: 'What a bill of lading tells you' },
    {
      type: 'p',
      text: 'Every bill of lading has the same core parts. Once you know them, any shipment record becomes easy to scan.',
    },
    {
      type: 'ul',
      items: [
        'Bill of lading number and bill type, which identify the document.',
        'Shipper and consignee, meaning the exporter and the importer, usually with addresses.',
        'Notify party, the company to be informed when the cargo arrives.',
        'Description of goods and the HS code, which say what was shipped.',
        'Quantity, unit and weight of the cargo.',
        'Port of loading and port of unloading, which show the route.',
        'Vessel and carrier details, and container numbers when they are listed.',
      ],
    },
    { type: 'h2', text: 'Reading a record step by step' },
    {
      type: 'ol',
      items: [
        'Start with the direction: is this an import into the US or an export out of it?',
        'Check the parties. The consignee is the buyer, and the shipper is the seller.',
        'Read the goods description and HS code together to confirm the product.',
        'Look at the origin, destination and ports to understand the route.',
        'Finish with quantity and weight to judge the size of the shipment.',
      ],
    },
    {
      type: 'callout',
      text: 'Descriptions are written by shippers, so the same product can appear under different wording. Searching by HS code as well as by product name gives a more complete picture.',
    },
    { type: 'h2', text: 'Using the details for research' },
    {
      type: 'p',
      text: 'Once you can read a record, you can use it. Group shipments by consignee to see who buys a product, by shipper to see who supplies it, and by port to see how goods move. Repeated shipments between the same two companies are a good sign of an established relationship.',
    },
    { type: 'h3', text: 'Finding buyers' },
    {
      type: 'p',
      text: 'Search for your product or HS code, then list the consignees. Companies that appear often are active buyers worth contacting.',
    },
    { type: 'h3', text: 'Finding suppliers' },
    {
      type: 'p',
      text: 'Search the same way for imports and list the shippers. This shows which overseas suppliers already sell into the US market.',
    },
    { type: 'quote', text: 'A single record is a data point. A pattern of records is a market.' },
    { type: 'h2', text: 'Key takeaways' },
    {
      type: 'ul',
      items: [
        'A bill of lading links a product, two companies and a route in one record.',
        'Use the HS code with the description to avoid missing shipments.',
        'Look for repeated shipments, not one-off records.',
      ],
    },
  ],
  'us-bill-of-lading-data': usBillOfLadingArticle.content,
};

// generic body for posts that do not have their own entry in CONTENT
function genericContent(post) {
  return [
    { type: 'p', text: post.excerpt },
    { type: 'h2', text: 'Why this matters' },
    {
      type: 'p',
      text: 'Trade data turns shipping activity into something you can search, compare and act on. Whether you are looking for buyers, suppliers or market trends, the details inside each record help you decide where to focus.',
    },
    { type: 'h2', text: 'How to get started' },
    {
      type: 'ol',
      items: [
        'Choose whether you are researching imports or exports.',
        'Search by product, HS code or company.',
        'Narrow the results by country and year, then review the records.',
      ],
    },
    {
      type: 'callout',
      text: 'This is sample article text. Replace it with your own content in data/blogData.js.',
    },
    { type: 'h2', text: 'Key takeaways' },
    {
      type: 'ul',
      items: [
        'Start with a clear question about a product, market or company.',
        'Use shipment records to confirm what is really moving.',
        'Compare more than one period before drawing conclusions.',
      ],
    },
  ];
}

export function getPostContent(post) {
  return CONTENT[post.slug] ?? genericContent(post);
}
