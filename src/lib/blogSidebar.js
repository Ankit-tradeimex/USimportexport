const SAMPLE = {
  categories: [
    { name: 'US Imports', slug: 'us-imports', count: 0 },
    { name: 'US Exports', slug: 'us-exports', count: 0 },
    { name: 'HS Codes', slug: 'hs-codes', count: 0 },
    { name: 'Trade Guides', slug: 'trade-guides', count: 0 },
  ],
  trending: [
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
    },
  ],
  latest: [
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
    },
  ],
  tags: [
    { name: 'Import data', slug: 'import-data' },
    { name: 'Export data', slug: 'export-data' },
    { name: 'HS code', slug: 'hs-code' },
    { name: 'Bill of lading', slug: 'bill-of-lading' },
    { name: 'US customs', slug: 'us-customs' },
  ],
};

export async function getBlogSidebarData() {
  return SAMPLE;
}

export async function subscribeToNewsletter(email) {
  const res = await fetch('/api/newsletter', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error('Subscription failed');
}
