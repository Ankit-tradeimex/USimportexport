// All copy for the import / export pages lives here.
// NUMBERS BELOW ARE PLACEHOLDERS: replace with your real figures before launch.

// Partner countries drawn on the globe (lat / lon).
export const HUBS = [
  { name: 'China', lat: 31, lon: 121 },
  { name: 'India', lat: 19, lon: 73 },
  { name: 'Germany', lat: 51, lon: 10 },
  { name: 'Brazil', lat: -23, lon: -46 },
  { name: 'Japan', lat: 35, lon: 139 },
  { name: 'United Kingdom', lat: 52, lon: -1 },
  { name: 'Vietnam', lat: 10, lon: 106 },
  { name: 'Australia', lat: -33, lon: 151 },
  { name: 'South Korea', lat: 37, lon: 127 },
  { name: 'UAE', lat: 25, lon: 55 },
  { name: 'South Africa', lat: -26, lon: 28 },
  { name: 'Mexico', lat: 20, lon: -99 },
];

export const TRADE_DATA = {
  import: {
    type: 'import',
    path: '/us-import-data',
    crumbs: [{ name: 'Home', href: '/' }, { name: 'US Import Data' }],
    eyebrow: 'U.S. Import Data & Bill of Lading Records',
    titleTop: 'US',
    titleAccent: 'Import Data',
    titleBottom: 'Every shipment entering the USA.',
    description:
      'Access detailed US import records, including importer and supplier details, HS codes, product descriptions, quantity, ports and shipment dates, so you can find verified suppliers and track what your competitors buy.',
    primaryCta: { label: 'Request A Quote', href: '/contact-us' },
    secondaryCta: { label: 'View Sample Data', href: '/data-sample' },
    stats: [
      { to: 52, decimals: 0, suffix: 'M+', label: 'Import Records' },
      { to: 180, decimals: 0, suffix: '+', label: 'Origin Countries' },
      { to: 12, decimals: 0, suffix: 'K+', label: 'HS Codes' },
      { to: 350, decimals: 0, suffix: '+', label: 'US Ports' },
    ],
    floatCards: [
      { label: 'Top Origin', value: 'China', sub: '+4.2% vs last month' },
      { label: 'Top HS Chapter', value: '85 · Electronics', sub: '1.8M shipments' },
      { label: 'Live Feed', value: 'Updated daily', sub: 'New B/L records added' },
    ],
    // PLACEHOLDER: paste your real import copy and numbers here (same shape as the export one).
    overview: {
      title: 'US Import Data Overview',
      paragraphs: [
        "The US import data is a critical and useful resource for businesses and policymakers, providing valuable insights into the flow of goods entering the United States. Even though the US is by far a worldwide powerhouse, a significant part of the United States of America, or USA, is found in North America. The US consists of 50 states and one federal district.  As the world's most developed nation, the US is a powerhouse in terms of imports, ranked as the number 1 importer in the world.",
        'The USA’s neighbors are the Bahamas, Canada, and Mexico. Detailed information in the US bill of lading data allows companies to understand the product description, volume, origin, and destination of imports and the products being imported. Several key trends shape US imports and the overall import market in the US. According to the US import records and US import data, the US imported goods worth $3.50 trillion in 2025, with an increase of 4% from the previous year.',
        'The US had a total import market share of 13.5% globally in 2025, according to the US trade statistics and US import records.   Based on the US import database by HS Code and data on US import products, the Major US imports in 2025 include nuclear reactors and machinery ($665.11 billion), electrical machinery and equipment ($513.56 billion), Vehicles ($337.94 billion), Mineral fuels and mineral oils ($216.42 billion), and pharmaceutical products ($213.82 billion).',
        'Our US import database by Country reports and data on US trade partners indicate that the major import partners of the US in 2025 include Mexico ($538.97 billion), Canada ($392.99 billion), China ($327.49 billion), Taiwan ($205.03 billion), and Vietnam ($201.05 billion). Staying informed about the latest US shipment data and US import records is essential for businesses looking to thrive in the US market. Let us now delve into the details of US import statistics for the year 2025, providing insights into US import statistics, Top US import countries, US trade partners, top US import products, and key markets.',
      ],
      cards: [
        {
          icon: 'rank',
          count: { to: 1, decimals: 0, suffix: '' },
          text: 'The US has been ranked 1st in global imports, making it the biggest importer in the world and showing a strong position in the global import sector.',
        },
        {
          icon: 'share',
          count: { to: 13.5, decimals: 1, suffix: '%' },
          text: 'The US has a 13.5% market share in the global import market, which makes its presence increasingly significant.',
        },
        {
          icon: 'flag',
          flag: 'MX',
          value: 'Mexico',
          text: 'Mexico is the biggest import partner of the USA for goods imports in 2025.',
        },
        {
          icon: 'cog',
          value: 'NUCLEAR REACTORS AND MACHINERY',
          text: 'Nuclear reactors and machinery are the biggest US imports in 2025, playing a huge role in the country’s economy.',
        },
      ],
    },
    legend: 'Imports into the U.S.',
    meta: {
      title: 'US Import Data | US Import Bill of Lading Records – USImportdata',
      description:
        'Search US import data by importer, supplier, HS code, product and port. Verified US Bill of Lading import records, updated frequently.',
    },
  },
  export: {
    type: 'export',
    path: '/us-export-data',
    crumbs: [{ name: 'Home', href: '/' }, { name: 'US Export Data' }],
    eyebrow: 'U.S. Export Data & Shipment Records',
    titleTop: 'US',
    titleAccent: 'Export Data',
    titleBottom: 'Every shipment leaving the USA.',
    description:
      'Explore detailed US export records, including exporter and consignee details, HS codes, product descriptions, quantity, ports and shipment dates, so you can find overseas buyers and benchmark US exporters.',
    primaryCta: { label: 'Request A Quote', href: '/contact-us' },
    secondaryCta: { label: 'View Sample Data', href: '/data-sample' },
    stats: [
      { to: 38, decimals: 0, suffix: 'M+', label: 'Export Records' },
      { to: 190, decimals: 0, suffix: '+', label: 'Destination Countries' },
      { to: 10, decimals: 0, suffix: 'K+', label: 'HS Codes' },
      { to: 300, decimals: 0, suffix: '+', label: 'US Ports' },
    ],
    floatCards: [
      { label: 'Top Destination', value: 'Canada', sub: '+2.7% vs last month' },
      { label: 'Top HS Chapter', value: '27 · Mineral Fuels', sub: '960K shipments' },
      { label: 'Live Feed', value: 'Updated daily', sub: 'New export records added' },
    ],
    overview: {
      title: 'US Export Data Overview',
      paragraphs: [
        'As the best US export data provider, our detailed US Export Database and US Bill of Lading data reports showcase that the USA is a powerhouse in global export trade, with 13.35% of the total world’s export share. Despite being a global powerhouse, the United States of America has a sizable percentage of its territory in North America. The US is composed of 50 states and one federal district. The United States is the second-largest country in North America by land area.',
        "In today's global economy, acquiring export data of the US is crucial for understanding the trade trends of the US. Monitoring real-time US export activities with USimportdata helps you identify business growth opportunities and is an easy way to find profitable US exporters and suppliers with our frequently updated US Exporters and Suppliers Database list.",
        'According to our latest US export records and US export shipment data, the US exported goods worth $2.17 trillion in 2025, with an increase of 6% from the previous year. As per our extensive US Export trade data by product and US export database by HS code reports of 2025, the top US top exports include mineral fuels and oils ($308.91 billion), Nuclear reactors and machinery ($283.61 billion), Electrical machinery and equipment ($226.04 billion), Aircraft, spacecraft, and parts thereof ($164.32 billion), and Precious stones and metals ($149.33 billion).',
        'According to our US export data by country records, the top US export partners in 2025 are Canada ($348.50 billion), Mexico ($334.04 billion), China ($143.54 billion), the Netherlands ($89.64 billion), and the United Kingdom ($79.94 billion). Our B/L database reports on the US export trade statistics provide valuable and accurate information on US active exports. We will now delve into the US export database for 2025, highlighting the top US exports, USA export partners, and US export trends.',
      ],
      // icon: 'rank' | 'share' | 'flag' | 'product'   (flag needs a `flag` country code)
      cards: [
        {
          icon: 'rank',
          count: { to: 2, decimals: 0, suffix: '' },
          text: 'The US has been ranked 2nd in global exports, showing a strong position in the global trade arena.',
        },
        {
          icon: 'share',
          count: { to: 8.8, decimals: 1, suffix: '%' },
          text: 'The US has a 8.8% market share in the global export market, which makes its presence increasingly significant.',
        },
        {
          icon: 'flag',
          flag: 'CA',
          value: 'Canada',
          text: 'Canada is the biggest export partner of the USA for goods exports in 2025.',
        },
        {
          icon: 'product',
          value: 'Mineral Fuels and Mineral Oils',
          text: 'Mineral Fuels and mineral oils are the biggest US exports in 2025, playing a huge role in the country’s economy.',
        },
      ],
    },
    legend: 'Exports from the U.S.',
    meta: {
      title: 'US Export Data | US Export Shipment Records – USImportdata',
      description:
        'Search US export data by exporter, buyer, HS code, product and port. Verified US export shipment records, updated frequently.',
    },
  },
};
