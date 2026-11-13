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
    majorInfo: {
      title: 'Major Information Included in the US Import Data',
      items: [
        { icon: 'date', label: 'Consignment Date' },
        { icon: 'company', label: 'Consignee Name and Address' },
        { icon: 'shipper', label: 'Shipper Name and Address' },
        { icon: 'hs', label: 'HS Code' },
        { icon: 'description', label: 'Product Description' },
        { icon: 'unit', label: 'Unit' },
        { icon: 'weight', label: 'Weight and Quantity' },
        { icon: 'port', label: 'Loading Port' },
        { icon: 'portIn', label: 'Unloading Port' },
        { icon: 'country', label: 'Origin Country' },
      ],
    },
    topHs: {
      title: 'Top 10 US Imports in 2025',
      subtitle: 'US Imports by HS Code',
      intro:
        'When it comes to US imports by HS code, the US is known for its prowess in various commodities such as mineral oils, electronics, machinery, and pharmaceuticals, which are in high demand in the US. As per our reports on US import database by product and HS Code, nuclear reactors and machinery are the biggest US imports worth $665.11 billion in 2025. The top 10 US import commodities in 2025 according to the US trade data and USA Maritime data for the goods entering the country include:',
      totalLabel: 'of all US imports',
      items: [
        { name: 'Nuclear reactors and machinery', hs: '84', value: 665.11, pct: 18.97 },
        { name: 'Electrical machinery and equipment', hs: '85', value: 513.56, pct: 14.65 },
        { name: 'Vehicles', hs: '87', value: 337.94, pct: 9.64 },
        { name: 'Mineral fuels and mineral oils', hs: '27', value: 216.42, pct: 6.17 },
        { name: 'Pharmaceutical products', hs: '30', value: 213.82, pct: 6.1 },
        { name: 'Special combined nomenclature commodities', hs: '99', value: 154.13, pct: 4.4 },
        { name: 'Optical, medical, or surgical instruments', hs: '90', value: 148.18, pct: 4.23 },
        { name: 'Precious stones and metals, pearls', hs: '71', value: 125.67, pct: 3.58 },
        { name: 'Plastics and articles thereof', hs: '39', value: 103.85, pct: 2.96 },
        { name: 'Furniture, bedding, and mattresses', hs: '94', value: 74.01, pct: 2.11 },
      ],
    },
    topPartners: {
      title: 'Top 10 US Import Partners',
      subtitle: 'US Import Data by Country',
      intro:
        'The US is a major player in the global import market, bringing in a wide range of products from all over the world. According to US Import data by country, Mexico is the biggest import partner of the US as Mexico exported goods worth $509.98 billion to the US in 2025. The Top 10 US import partners in 2025 according to the US trade records and US shipment data include:',
      items: [
        {
          name: 'Mexico',
          flag: 'MX',
          value: 538.97,
          pct: 15.4,
          note: 'Vehicles are the biggest US imports from Mexico worth $130.03 billion in 2025.',
        },
        {
          name: 'Canada',
          flag: 'CA',
          value: 392.99,
          pct: 11.2,
          note: 'Electrical machinery and equipment are the biggest US imports from Canada worth $126.67 billion in 2025.',
        },
        {
          name: 'China',
          flag: 'CN',
          value: 327.49,
          pct: 9.3,
          note: 'Mineral fuels and mineral oils are the biggest US imports from China worth $131.9 billion in 2025.',
        },
        {
          name: 'Taiwan',
          flag: 'TW',
          value: 205.03,
          pct: 5.8,
          note: 'Nuclear reactors and machinery are the biggest US imports from Taiwan worth $34.59 billion in 2025.',
        },
        {
          name: 'Vietnam',
          flag: 'VN',
          value: 201.05,
          pct: 5.7,
          note: 'Vehicles are the biggest US imports from Vietnam worth $50.80 billion in 2025.',
        },
        {
          name: 'Germany',
          flag: 'DE',
          value: 159.17,
          pct: 4.5,
          note: 'Electrical machinery and equipment are the biggest US imports from Germany worth $41.78 billion in 2025.',
        },
        {
          name: 'Japan',
          flag: 'JP',
          value: 149.81,
          pct: 4.3,
          note: 'Vehicles are the biggest US imports from Japan worth $38.42 billion in 2025.',
        },
        {
          name: 'Ireland',
          flag: 'IE',
          value: 133.89,
          pct: 3.8,
          note: 'Nuclear reactors and machinery are the biggest US imports from Ireland worth $34.51 billion in 2025.',
        },
        {
          name: 'South Korea',
          flag: 'KR',
          value: 129.04,
          pct: 3.7,
          note: 'Pharmaceutical products are the biggest US imports from South Korea worth $36.02 billion in 2025.',
        },
        {
          name: 'India',
          flag: 'IN',
          value: 107.59,
          pct: 3.1,
          note: 'Natural or cultured pearls, precious stones, and metals are the biggest US imports from India worth $12.36 billion in 2025.',
        },
      ],
    },
    topPorts: {
      title: 'Top 10 US Import Ports in 2025',
      subtitle:
        'The US is home to some of the busiest ports in the world. The top 10 US Import Ports in 2025 include:',
      items: [
        { name: 'Port of Los Angeles', type: 'sea', logo: '/assets/ports/import/los_angeles.svg' },
        {
          name: 'Chicago’s O’Hare International Airport',
          logo: '/assets/ports/import/chicago.webp',
        },
        {
          name: 'New York’s JFK International Airport',
          logo: '/assets/ports/import/JFK.svg',
        },
        { name: 'Port of Houston', logo: '/assets/ports/import/houston.svg' },
        { name: 'Port of Newark', logo: '/assets/ports/import/newark.svg' },
        {
          name: 'Detroit’s Ambassador Bridge',
          logo: '/assets/ports/import/ambassador.webp',
        },
        {
          name: 'Los Angeles International Airport',
          logo: '/assets/ports/import/los_angeles_inter.svg',
        },
        { name: 'Port of Savannah', logo: '/assets/ports/import/savannah.svg' },
        {
          name: 'Port Huron Blue Water Bridge',
          logo: '/assets/ports/import/huron_bridge.svg',
        },
        { name: 'Plaquemines Port', logo: '/assets/ports/import/plaquemines.png' },
      ],
    },
    topCompanies: {
      title: 'Top 10 US Importer Companies in 2025',
      subtitle: 'US Importers Data',
      intro:
        'Based on our multiple and detailed reports of US bill of lading data, US importers data, US import database by company, and the list of US Buyers data, these are the top 10 importers companies in the USA. These numbers as per US Buyers data, which indicate shipment capacity, are given in TEUs (Twenty-foot Equivalent Units). The retail industry uses the majority of the goods that are imported into the US based on US trade activities. In 2025, the top 10 US importers based on their volume of imports, according to the US Importers data include:',
      unit: 'TEU',
      items: [
        {
          name: 'Walmart',
          industry: 'Grocery',
          value: 864800,
          logo: '/assets/companies/import/walmart.png',
        },
        {
          name: 'Target',
          industry: 'Food and beverages',
          value: 590300,
          logo: '/assets/companies/import/target.png',
        },
        {
          name: 'Home Depot',
          industry: 'Construction and design',
          value: 388000,
          logo: '/assets/companies/import/home_depot.png',
        },
        {
          name: 'Lowe’s',
          industry: 'Construction and design',
          value: 287500,
          logo: '/assets/companies/import/lowe.png',
        },
        {
          name: 'Dole Food',
          industry: 'Food products',
          value: 220200,
          logo: '/assets/companies/import/dole_food.png',
        },
        {
          name: 'Samsung America',
          industry: 'Electronics',
          value: 184800,
          logo: '/assets/companies/import/samsung.png',
        },
        {
          name: 'Family Dollar',
          industry: 'Food products',
          value: 168400,
          logo: '/assets/companies/import/family_dollar.jpg',
        },
        {
          name: 'LG Group',
          industry: 'Electronics',
          value: 161600,
          logo: '/assets/companies/import/lg.png',
        },
        {
          name: 'Philips Electronics',
          industry: 'Electronics',
          value: 142900,
          logo: '/assets/companies/import/philips.png',
        },
        {
          name: 'Ikea',
          industry: 'Furniture',
          value: 120500,
          logo: '/assets/companies/import/ikea.png',
        },
      ],
    },
    fiveYear: {
      title: 'Statistical comparison of US import data in the last 5 years',
      partnersLabel: 'Import Partners',
      years: [2021, 2022, 2023, 2024, 2025],
      rows: [
        { name: 'Mexico', flag: 'MX', values: [388.31, 459.2, 480.08, 509.98, 538.97] },
        { name: 'Canada', flag: 'CA', values: [366.47, 448.33, 431.19, 422.17, 392.99] },
        { name: 'China', flag: 'CN', values: [540.07, 575.71, 448.03, 462.63, 327.49] },
        { name: 'Taiwan', flag: 'TW', values: [80.65, 96.07, 89.91, 118.73, 205.03] },
        { name: 'Vietnam', flag: 'VN', values: [108.17, 135.87, 118.94, 142.47, 201.05] },
        { name: 'Germany', flag: 'DE', values: [138.23, 150.46, 163.08, 163.54, 159.17] },
        { name: 'Japan', flag: 'JP', values: [139.11, 154.44, 151.58, 152.06, 149.81] },
        { name: 'Ireland', flag: 'IE', values: [74.02, 82.5, 82.71, 103.75, 133.89] },
        { name: 'South Korea', flag: 'KR', values: [98.77, 120.87, 119.72, 135.46, 129.04] },
        { name: 'India', flag: 'IN', values: [76.92, 90.99, 87.28, 91.23, 107.59] },
      ],
      total: { label: 'Total Imports', values: [2.93, 3.37, 3.17, 3.35, 3.5] },
    },
    bolSample: {
      title: 'Detailed Sample of US Import Bill of Lading Data',
      intro:
        'We attain import data from reliable US government organizations, shipping manifests, and customs ports. Numerous fields are blanketed on these import statistics, including HS codes, product descriptions, quantities, origin and destination countries, and port names. These import data records are crucial pieces of data that help traders and marketers to make wise choices. The US import data and information can be used to accumulate vast information, such as the HS codes and product descriptions. To make you comprehend better and see what our US bill of lading data looks like as a whole, we have provided a sample of the US import data and US bill of lading data.',
      route: {
        from: { country: 'South Korea', flag: 'KR', port: 'Busan' },
        to: { country: 'United States', flag: 'US', port: '' },
        mode: 'Sea',
      },
      highlights: [
        { label: 'HS Code', value: '760612' },
        { label: 'Quantity', value: '12 COL' },
        { label: 'Weight', value: '122386 KG' },
        { label: 'TEU', value: '6' },
      ],
      groups: [
        {
          title: 'Shipment',
          icon: 'doc',
          fields: [
            { label: 'Date', value: '31/May/2024' },
            { label: 'Bill Type', value: 'HOUSE BILL' },
            { label: 'Bill of Lading Number', value: 'MEDU9918378' }, // (?) blurry
            { label: 'Transport Type', value: 'SEA NON-CONTAINER' },
          ],
        },
        {
          title: 'Route',
          icon: 'route',
          fields: [
            { label: 'Loading Port', value: 'BUSAN' },
            { label: 'Unloading Port', value: 'BUSAN' }, // (?) check
            { label: 'Origin Country', value: 'SOUTH KOREA' },
            { label: 'Shipping Country', value: 'LIBERIA' },
            { label: 'Destination Country', value: 'UNITED STATES' },
          ],
        },
        {
          title: 'Parties',
          icon: 'parties',
          fields: [
            { label: 'US Importer Name', value: 'NOVELIS CORPORATION' },
            {
              label: 'US Importer Address',
              value: '3560 LENOX RD. NE, ATLANTA GA 30326, US TE +1 470-449-5678',
            },
            { label: 'Foreign Exporter Name', value: 'NOVELIS KOREA LIMITED' },
            {
              label: 'Foreign Exporter Address',
              value: '23RD FLOOR. 16, TONGIL-RO, JUNG-GU, SEOUL, KOREA 04527 TE +82-54-830-7114',
            },
            { label: 'Notify Party Name', value: 'NOVELIS CORPORATION' },
            { label: 'Notify Party Address', value: '3560 LENOX RD. NE, ATLANTA GA 30326, US' },
          ],
        },
        {
          title: 'Cargo',
          icon: 'cargo',
          fields: [
            { label: 'HS Code', value: '760612' },
            { label: 'Product Description', value: 'ALUMINIUM BODYSTOCK HS CODE:760612' },
            { label: 'Quantity', value: '12' },
            { label: 'Unit', value: 'COL' },
            { label: 'Weight', value: '122386' },
            { label: 'Weight Unit', value: 'KG' },
            { label: 'TEU', value: '6' },
            { label: 'Measurement', value: '86 CUBIC METERS' },
          ],
        },
        {
          title: 'Vessel & Carrier',
          icon: 'ship',
          fields: [
            { label: 'Carrier Name', value: 'WBLV' },
            { label: 'Vessel Name', value: 'TRANCURA' },
            {
              label: 'Container Number',
              value: 'MSMU2887783,CAIU8919126,MEDU2480190,MSDU1785921,MEDU8432909,MEDU8855985',
            }, // (?) blurry
            { label: 'Voyage', value: '417E' },
            { label: 'Conveyance', value: 'IMO NUMBER/LLOYDS NUMBER: 9627916' },
          ],
        },
      ],
    },
    benefits: {
      title: 'Benefits of the US Import Data',
      items: [
        {
          icon: 'revenue',
          text: 'Businesses looking to increase revenue can gain from the US import data.',
        },
        {
          icon: 'expand',
          text: 'The US import data is crucial for businesses looking to expand into other markets.',
        },
        {
          icon: 'marketing',
          text: 'Utilize US import statistics when creating your marketing strategy in the US.',
        },
        {
          icon: 'brand',
          text: 'Establish a strong brand identification in the import market in the US.',
        },
        {
          icon: 'goals',
          text: 'Establish long-term goals for your US business and boost return on investment.',
        },
      ],
    },
    faqs: {
      subtitle:
        'Common questions about US import data. Can’t find your answer? Our team is happy to help.',
      items: [
        {
          q: 'What is the total value of US imports as per the US import data?',
          a: 'US import bill of lading data is the trade records and statistics for the goods that the US imports from other countries under the Bill of Lading Documents. According to the US shipment data, the US imported goods worth $3.50 trillion in 2025, with a growth of 6% from the previous year.',
        },
        {
          q: 'What is the biggest US import commodity, based on the US import data by HS code?',
          a: 'Based on US trade statistics and US import data by HS code, Nuclear reactors and machinery (HS code 84) is the biggest US import commodity with imports of $665.11 billion in 2025.',
        },
        {
          q: 'Who is the biggest import partner of the US?',
          a: 'Mexico is the biggest import partner of the US, with imports worth $538.97 billion in 2025, according to the US trade activities and US- Mexico trade data. The top 10 US imports from Mexico in 2025, based on the US trade records and US-Mexico shipment import data, are: Vehicles: $130.03 billion Electrical machinery and equipment: $85.55 billion Nuclear reactors and machinery: $81.61 billion Mineral fuels and oils: $25.01 billion  Optical, medical, and surgical instruments: $22.33 billion Furniture, bedding, and mattresses: $13.35 billion Beverages, spirits, and vinegar: $11.75 billion Edible fruit and nuts: $10.86 billion Edible vegetables: $9.52 billion Plastics and articles thereof: $7.90 billion.',
        },
        {
          q: 'How has the US-China trade data fluctuated in recent years in terms of imports?',
          a: 'According to our multiple records on US-China Trade data with analysis of US import shipment data from China and all US import records from China, the US imported goods worth $327.49 billion in 2025, with a decline of 29% in imports from the previous year, which shows that the US imports from China accounted for a 14.1% of import share. Henceforth, there has been a major fluctuation in US imports from China, based on the US-China trade data and US trade records. The top 10 US imports from China in 2025 include: Electrical machinery and equipment: $12.67 billion Nuclear reactors and machinery: $85.88 billion Toys, games, and sports requisites: $33.38 billion Furniture, bedding, and mattresses: $20.28 billion Plastics and articles thereof: $16.41 billion  Vehicles: $11.79 billion Optical, medical, or surgical instruments: $11.71 billion Articles of iron or steel: $10.03 billion Footwear: $9.99 billion Articles of apparel and clothing, knitted or crocheted: $8.59 billion.',
        },
        {
          q: 'How can I find buyers and importers in the USA according to my product?',
          a: 'USImportData helps you to connect with profitable US importers and buyers with updated import reports on the US importers database, according to your product. Our search-filtered database on US import records, like US import data by HS Code, US import data by Country, US import data by product, and US import data by company reports are designed according to your product and business requirements.',
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
    majorInfo: {
      title: 'Major Information Included in the US Export Data',
      items: [
        { icon: 'date', label: 'Consignment Date' },
        { icon: 'company', label: 'Name and Address of the exporter' },
        { icon: 'hs', label: 'HS Codes' },
        { icon: 'package', label: 'PKG Unit' },
        { icon: 'tag', label: 'Name of the commodity' },
        { icon: 'description', label: 'Detailed product descriptions.' },
        { icon: 'weight', label: 'Weight and Quantity' },
        { icon: 'codes', label: 'POD codes, trunk POL codes, etc.' },
        { icon: 'route', label: 'Port of origin and destination.' },
        { icon: 'country', label: 'Destination country.' },
      ],
    },

    topPartners: {
      title: 'Top 10 US Export Partners',
      subtitle: 'USA Export Data by Country',
      intro:
        'The US exports are famous for their high-quality goods and services all around the world. According to US export trade statistics by country records, there are several export destinations for the US to export its goods. Canada is the biggest export destination of the US followed by Mexico and China. Canada imported goods worth $352.84 billion from the US in 2025. The top 10 US export partners in 2025 according to US trade records and US export records include:',
      // value = US$ billions, pct = share of total, flag = ISO country code
      items: [
        {
          name: 'Canada',
          flag: 'CA',
          value: 348.5,
          pct: 16.9,
          note: 'Vehicles are the biggest US exports to Canada worth $57.72 billion in 2025.',
        },
        {
          name: 'Mexico',
          flag: 'MX',
          value: 334.04,
          pct: 16.2,
          note: 'Electrical machinery and equipment are the biggest US exports to Mexico worth $51.60 billion in 2025.',
        },
        {
          name: 'China',
          flag: 'CN',
          value: 143.54,
          pct: 7,
          note: 'Mineral fuels and mineral oils are the biggest US exports to China worth $19.73 billion in 2025.',
        },
        {
          name: 'Netherlands',
          flag: 'NL',
          value: 89.64,
          pct: 4.3,
          note: 'Mineral fuels and mineral oils are the biggest US exports to the Netherlands worth $30.55 billion in 2025.',
        },
        {
          name: 'The United Kingdom',
          flag: 'GB',
          value: 79.94,
          pct: 3.9,
          note: 'Mineral fuels and mineral oils are the biggest US exports to the United Kingdom worth $13.33 billion in 2025.',
        },
        {
          name: 'Japan',
          flag: 'JP',
          value: 79.94,
          pct: 3.9,
          note: 'Mineral fuels and mineral oils are the biggest US exports to Japan worth $12.06 billion in 2025.',
        },
        {
          name: 'Germany',
          flag: 'DE',
          value: 75.61,
          pct: 3.7,
          note: 'Vehicles are the biggest US exports to Germany worth $10.41 billion in 2025.',
        },
        {
          name: 'South Korea',
          flag: 'KR',
          value: 65.54,
          pct: 3.2,
          note: 'Mineral fuels and mineral oils are the biggest US exports to South Korea worth $17.21 billion in 2025.',
        },
        {
          name: 'Brazil',
          flag: 'BR',
          value: 49.66,
          pct: 2.4,
          note: 'Mineral fuels and mineral oils are the biggest US exports to Brazil worth $11.11 billion in 2025.',
        },
        {
          name: 'Singapore',
          flag: 'SG',
          value: 46.03,
          pct: 2.2,
          note: 'Mineral fuels and mineral oils are the biggest US exports to Singapore worth $8.56 billion in 2025.',
        },
      ],
    },
    topHs: {
      title: 'Top 10 US Exports in 2025',
      subtitle: 'USA Export Data by HS Code',
      intro:
        'The US is known for its vast export products around the world. Based on our US export trade statistics HS code, The year 2025 was a great year for the US in terms of its export trade. Mineral Fuels and oils are the biggest US exports with a total export value of $308.91 billion in 2025 as per the USA Maritime trade data for the goods going out of the country. The top 10 exports of the US in 2025 according to the US trade data and US Export shipment data include:',
      totalLabel: 'of all US exports',
      // value = US$ billions, pct = share of total
      items: [
        { name: 'Mineral fuels and oils', hs: '27', value: 308.91, pct: 14.18 },
        { name: 'Nuclear reactors and machinery', hs: '84', value: 283.61, pct: 13.02 },
        { name: 'Electrical machinery and equipment', hs: '85', value: 226.04, pct: 10.38 },
        { name: 'Aircraft, spacecraft, and parts thereof', hs: '88', value: 164.32, pct: 7.54 },
        { name: 'Precious stones and metals, pearls', hs: '71', value: 149.33, pct: 6.85 },
        { name: 'Vehicles', hs: '87', value: 131.44, pct: 6.03 },
        { name: 'Optical, medical, or surgical instruments', hs: '90', value: 106.32, pct: 4.88 },
        { name: 'Pharmaceutical products', hs: '30', value: 97.82, pct: 4.49 },
        { name: 'Plastics and articles thereof', hs: '39', value: 77.66, pct: 3.57 },
        { name: 'Special combined nomenclature commodities', hs: '99', value: 71.79, pct: 3.3 },
      ],
    },
    topPorts: {
      title: 'Top 10 US Export Ports in 2025',
      subtitle:
        'The US is home to some of the busiest ports in the world. The top 10 US Export Ports in 2025 include:',
      items: [
        { name: 'Port of Houston', amount: '139.79', logo: '/assets/ports/export/houston.svg' },
        {
          name: 'Port of Corpus Christi',
          amount: '108.09',
          logo: '/assets/ports/export/corpus.png',
        },
        {
          name: 'Port of South Louisiana',
          amount: '82.29',
          logo: '/assets/ports/export/south.png',
        },
        {
          name: 'Port of Hampton Roads Virginia',
          amount: '40.72',
          logo: '/assets/ports/export/hampton.png',
        },
        {
          name: 'Port of Beaumont Texas',
          amount: '29.61',
          logo: '/assets/ports/export/beaumont.png',
        },
        {
          name: 'Port of Greater Baton Rouge Louisiana',
          amount: '22.60',
          logo: '/assets/ports/export/ambassador.webp',
        },
        {
          name: 'Port of New Orleans Louisiana',
          amount: '22.52',
          logo: '/assets/ports/export/orlena.png',
        },
        {
          name: 'Port of Long Beach California',
          amount: '19.13',
          logo: '/assets/ports/export/california.jpg',
        },
        {
          name: 'Port of Los Angeles California',
          amount: '16.29',
          logo: '/assets/ports/export/los_angeles.svg',
        },
        {
          name: 'Port of New York and New Jersey Port Newark',
          amount: '15.25',
          logo: '/assets/ports/export/new_jersey.png',
        },
      ],
    },
    topCompanies: {
      title: 'Top 10 US Export Companies in 2025',
      subtitle: 'US Exports by Company',
      intro:
        'The US is famous for its top-class companies, exporting goods around the world. US Export statistics by company records show that Exxon Mobil Corporation is the biggest export company in the US, with its mineral fuels and oil exports in 2025, you can also access our detailed US Exporters database and records. The top 10 US exporter companies according to the US Suppliers data, based on their export volume in 2025 include:',
      unit: 'TEU',
      items: [
        {
          name: 'Exxon Mobil Corporation',
          industry: 'Mineral fuels',
          value: 316500,
          logo: '/assets/companies/export/exxon.png',
        },
        {
          name: 'Chevron Corporation',
          industry: 'Oil, gas',
          value: 302850,
          logo: '/assets/companies/export/chevron.jpg',
        },
        {
          name: 'Koch Industries',
          industry: 'Petroleum and chemicals',
          value: 200832,
          logo: '/assets/companies/export/koch.png',
        },
        {
          name: 'Apple',
          industry: 'Electronics',
          value: 185000,
          logo: '/assets/companies/export/apple.png',
        },
        {
          name: 'Cargill',
          industry: 'Food products',
          value: 182960,
          logo: '/assets/companies/export/cargill.png',
        },
        {
          name: 'Dow Chemical',
          industry: 'Chemicals',
          value: 151000,
          logo: '/assets/companies/export/dow.png',
        },
        {
          name: 'DeLong',
          industry: 'Animal fodder',
          value: 127078,
          logo: '/assets/companies/export/delong.png',
        },
        {
          name: 'Louis Dreyfus Company',
          industry: 'Cotton',
          value: 102698,
          logo: '/assets/companies/export/ldc.png',
        },
        {
          name: 'CellMark Group',
          industry: 'Paper and packaging',
          value: 91029,
          logo: '/assets/companies/export/cellmark.png',
        },
        {
          name: 'International Paper',
          industry: 'Paper and packaging',
          value: 90367,
          logo: '/assets/companies/export/paper.png',
        },
      ],
    },
    fiveYear: {
      title: 'Statistical comparison of US Export data in the last 5 years',
      partnersLabel: 'Export Partners',
      years: [2021, 2022, 2023, 2024, 2025],
      rows: [
        { name: 'Canada', flag: 'CA', values: [292.82, 255.39, 307.75, 354.99, 352.84] },
        { name: 'Mexico', flag: 'MX', values: [256.31, 211.48, 276.49, 324.37, 323.22] },
        { name: 'China', flag: 'CN', values: [106.44, 124.48, 151.44, 153.83, 147.8] },
        { name: 'Netherlands', flag: 'NL', values: [50.99, 45.3, 53.08, 72.88, 82.18] },
        { name: 'Germany', flag: 'DE', values: [60.06, 57.43, 65.33, 72.92, 76.69] },
        { name: 'Japan', flag: 'JP', values: [74.49, 63.75, 74.56, 80.31, 76.16] },
        { name: 'UK', flag: 'GB', values: [69.06, 58.42, 61.42, 77.3, 74.08] },
        { name: 'South Korea', flag: 'KR', values: [56.5, 50.96, 65.94, 71.47, 64.83] },
        { name: 'France', flag: 'FR', values: [38.41, 28.2, 30.59, 46.94, 45.25] },
        { name: 'Brazil', flag: 'BR', values: [42.86, 34.59, 46.93, 53.57, 44.8] },
      ],
      total: { label: 'Total exports', values: [1.75, 2.06, 2.01, 2.06, 2.17] },
    },
    bolSample: {
      title: 'Detailed Sample of US Export Bill of Lading Database',
      intro:
        'We source reliable Bill of lading US export data from government agencies, shipping companies, and customs ports. Numerous fields are included in this US Bill of lading database, including HS codes, product descriptions, quantities, origin country, destination country, and port names. This US Bill of Lading data contains all essential information that allows you to access our multiple filtered reports for US trade data such as US export data by HS code, US export database by product, US export records by country, US export statistics by Company, and helps to access shipment data of the US with US port data, which we serve to businesses and marketers. This US export trade data contains all the information needed to obtain each product, including its quantity, as well as its HS codes and product descriptions. For your convenience and better comprehension, we have included a sample of this US export bill of lading data so you can see what the US export statistics look like on its whole, with all the information.',
      route: {
        from: { country: 'United States', flag: 'US', port: 'Port of Los Angeles, California' },
        to: { country: 'Australia', flag: 'AU', port: 'Melbourne' },
        mode: 'Sea',
      },
      highlights: [
        { label: 'HS Code', value: '000004' },
        { label: 'Quantity', value: '72 Pallet' },
        { label: 'Weight', value: '72,574.78 Kg' },
        { label: 'TEU', value: '8' },
      ],
      // every field of the sample record, grouped
      groups: [
        {
          title: 'Shipment',
          icon: 'doc',
          fields: [
            { label: 'Date', value: '2024-04-21 00:00:00' },
            { label: 'Master Bill of Lading', value: 'OCE0293289' },
            { label: 'Transport Type', value: 'SEA' },
          ],
        },
        {
          title: 'Route',
          icon: 'route',
          fields: [
            { label: 'Origin Country', value: 'UNITED STATES' },
            { label: 'Destination Country', value: 'AUSTRALIA' },
            { label: 'Loading Port', value: 'THE PORT OF LOS ANGELES LOS ANGELES CALIFORNIA' },
            { label: 'Unloading Port', value: 'MELBOURNE AUSTRALIA' },
          ],
        },
        {
          title: 'Parties',
          icon: 'parties',
          fields: [
            { label: 'US Exporter Name', value: 'INTELLIGENT SCM LLC' },
            {
              label: 'US Exporter Address',
              value:
                'DBA AMERICAN WORLDWIDE AGENCIES3663 N SAM HOUSTON PKWY E HOUSTONTX 77032 UNITED STATES',
            },
          ],
        },
        {
          title: 'Cargo',
          icon: 'cargo',
          fields: [
            { label: 'HS Code', value: '000004' },
            {
              label: 'Product Description',
              value:
                '220210 (HS)ENERGY DRINKSS000004904 220210 (HS)ENERGY DRINKSS000004905FREIGHT PREPAID 220210 (HS)ENERGY DRINKSS000004909 220210 (HS)ENERGY DRINKSS000004910',
            },
            { label: 'Quantity', value: '72' },
            { label: 'Unit', value: 'PALLET' },
            { label: 'Weight', value: '72574.78' },
            { label: 'Weight Unit', value: 'Kg' },
            { label: 'TEU', value: '8' },
          ],
        },
        {
          title: 'Vessel & Carrier',
          icon: 'ship',
          fields: [
            { label: 'Carrier Name', value: 'ANL CONTAINER LINE' },
            { label: 'Vessel Name', value: 'MAERSK RUBICON' },
            { label: 'Container No', value: 'CMAU3718613,TGBU4172955,CAIU7040814,APHU7067595' },
            { label: 'SCAC Code', value: 'ANLC' },
            { label: 'Voyage', value: '0Y1FXS1NLANL' },
          ],
        },
      ],
    },
    benefits: {
      title: 'Benefits of the USA Export Data',
      items: [
        {
          icon: 'performance',
          text: 'Assess the current status and export performance of the US economy.',
        },
        { icon: 'leads', text: 'Generate authentic leads from the US export sector.' },
        { icon: 'demand', text: 'Learn what the most recent product demand in the US is.' },
        { icon: 'competitors', text: 'Monitor your competitors in the US and outperform them.' },
        { icon: 'strategy', text: 'Develop your marketing strategy using US export database.' },
      ],
    },
    faqs: {
      subtitle:
        'Common questions about US export data. Can’t find your answer? Our team is happy to help.',
      items: [
        {
          q: '1. What is the US bill of lading data for exports?',
          a: 'The US Bill of Lading data reports cover detailed US export data with details about the goods, the shipper, the consignee, and the destination country, which helps you to access the US export data by HS Code, product, company, port, and US shipment database to help you find exporters and suppliers in USA with the US Exporters list and reports.',
        },
        {
          q: '2. Who is the biggest export partner of the US?',
          a: 'Canada is the biggest export partner of the US with exports worth $348.50 billion in 2025 according to the US trade activities and US-Canada trade data. The top 10 US exports to Canada in 2025 according to the US export data are: Vehicles: $57.72 billion Nuclear reactors and machinery: $52.76 billion Electrical machinery and equipment: $29.41 billion Mineral fuels and oils: $28.67 billion Plastics and articles thereof: $15.41 billion Optical, medical, or surgical instruments: $10.60 billion Aircraft, spacecraft, and parts thereof: $8.72 billion Precious stones and metals, pearls: $8.54 billion Articles of iron or steel: $7.48 billion Miscellaneous chemical products: $6.66 billion.',
        },
        {
          q: '3. How has the US-China trade data fluctuated in previous years?',
          a: 'The US-China trade data, or US export shipment data to China show a major fluctuation in US-China trade in recent years, as the US exports to China declined by 4% in 2025. The US exports to China accounted for $143.54 billion in 2025 based on the US trade data. Multiple accurate reports on US shipment data, US Bill of lading data, and the analysis of USA exports data by country contain detailed US-China trade data, showcasing these are the top 10 US exports to China. Mineral fuels and oils: $19.73 billion Oil seeds and oleaginous fruits: $15.85 billion Nuclear reactors and machinery: $13.72 billion Electrical machinery and equipment: $11.64 billion Optical, medical, or surgical instruments: $11.30 billion Pharmaceutical products: $9.89 billion Vehicles: $8.13 billion Plastics and articles thereof: $7.44 billion Aircraft, spacecraft, and parts thereof: $6.81 billion Organic chemicals: $4.20 billion.',
        },
        {
          q: '4. What does the US trade balance indicate?',
          a: 'According to the US trade balance data for 2025, the total value of the US trade balance or US trade deficit accounted for -$1.33 trillion, showing a 6% increase in US exports in 2025 as compared to the previous year.',
        },
        {
          q: '5. How can I find suppliers and exporters in the USA according to my product?',
          a: 'USImportData, helps you to connect with profitable US exporters and suppliers with reliable frequently updated data reports on the US exporters database and a list of top US Exporters according to your product and HS code. It provides you with a filtered database and multiple us export record searches, like USA export data by HS Code, US Exports by Country, USA Export records by product, or our wide US Exporters list reports and suppliers data designed according to your product and business.',
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
