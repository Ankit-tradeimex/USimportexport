/*
  Turns ONE company record into the `data` object that BolSampleSection reads:
    { type: 'import' | 'export', bolSample: { title, intro, route, highlights, groups } }
  The groups, field names and highlights are the SAME as the bolSample on the US import / export data
  pages (data/tradeData.js), so both pages show the same fields. A field with no value is left out.

  record = { date (YYYY-MM-DD), billType, masterBl, transportType, originCountry, destinationCountry,
             shippingCountry, loadingPort, unloadingPort, usName, usAddress, partnerName, partnerAddress,
             hs, description, qty, unit, weight, weightUnit, teu, measurement,
             carrier, vessel, container, scac, voyage, conveyance }
*/

// country name -> the flag key BolSampleSection looks up in its FLAGS map (add more as the real data needs)
const ISO = {
  'UNITED STATES': 'US',
  CHINA: 'CN',
  INDIA: 'IN',
  GERMANY: 'DE',
  'SOUTH KOREA': 'KR',
  VIETNAM: 'VN',
  MEXICO: 'MX',
  AUSTRALIA: 'AU',
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const fmt = (n) => Number(n).toLocaleString('en-US');
const str = (v) => (v === '' || v == null ? '' : String(v));
const title = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

// '2024-05-31' -> import page style '31/May/2024', export page style '2024-05-31 00:00:00'
function dateText(iso, role) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
  if (!m) return str(iso);
  return role === 'export'
    ? `${m[1]}-${m[2]}-${m[3]} 00:00:00`
    : `${m[3]}/${MONTHS[+m[2] - 1]}/${m[1]}`;
}

export function buildBolData({ role, record: r, meta }) {
  const exp = role === 'export';

  const shipment = exp
    ? [
        ['Date', dateText(r.date, role)],
        ['Master Bill of Lading', r.masterBl],
        ['Transport Type', r.transportType],
      ]
    : [
        ['Date', dateText(r.date, role)],
        ['Bill Type', r.billType],
        ['Bill of Lading Number', r.masterBl],
        ['Transport Type', r.transportType],
      ];

  const route = exp
    ? [
        ['Origin Country', r.originCountry],
        ['Destination Country', r.destinationCountry],
        ['Loading Port', r.loadingPort],
        ['Unloading Port', r.unloadingPort],
      ]
    : [
        ['Loading Port', r.loadingPort],
        ['Unloading Port', r.unloadingPort],
        ['Origin Country', r.originCountry],
        ['Shipping Country', r.shippingCountry],
        ['Destination Country', r.destinationCountry],
      ];

  const parties = exp
    ? [
        ['US Exporter Name', r.usName],
        ['US Exporter Address', r.usAddress],
      ]
    : [
        ['US Importer Name', r.usName],
        ['US Importer Address', r.usAddress],
        ['Foreign Exporter Name', r.partnerName],
        ['Foreign Exporter Address', r.partnerAddress],
        ['Notify Party Name', r.usName],
        ['Notify Party Address', r.usAddress],
      ];

  const cargo = [
    ['HS Code', r.hs],
    ['Product Description', r.description],
    ['Quantity', r.qty],
    ['Unit', r.unit],
    ['Weight', r.weight],
    ['Weight Unit', r.weightUnit],
    ['TEU', r.teu],
    ...(exp ? [] : [['Measurement', r.measurement]]),
  ];

  const vessel = exp
    ? [
        ['Carrier Name', r.carrier],
        ['Vessel Name', r.vessel],
        ['Container No', r.container],
        ['SCAC Code', r.scac],
        ['Voyage', r.voyage],
      ]
    : [
        ['Carrier Name', r.carrier],
        ['Vessel Name', r.vessel],
        ['Container Number', r.container],
        ['Voyage', r.voyage],
        ['Conveyance', r.conveyance],
      ];

  const groups = [
    { title: 'Shipment', icon: 'doc', fields: shipment },
    { title: 'Route', icon: 'route', fields: route },
    { title: 'Parties', icon: 'parties', fields: parties },
    { title: 'Cargo', icon: 'cargo', fields: cargo },
    { title: 'Vessel & Carrier', icon: 'ship', fields: vessel },
  ]
    .map((g) => ({
      ...g,
      fields: g.fields
        .map(([label, value]) => ({ label, value: str(value) }))
        .filter((f) => f.value),
    }))
    .filter((g) => g.fields.length);

  // same four chips as the trade-data pages: HS Code, Quantity, Weight, TEU
  const highlights = [
    { label: 'HS Code', value: str(r.hs) },
    {
      label: 'Quantity',
      value: r.qty != null ? `${r.qty} ${exp ? title(r.unit) : r.unit || ''}`.trim() : '',
    },
    {
      label: 'Weight',
      value:
        r.weight != null ? `${exp ? fmt(r.weight) : r.weight} ${r.weightUnit || ''}`.trim() : '',
    },
    { label: 'TEU', value: str(r.teu) },
  ].filter((h) => h.value);

  return {
    type: exp ? 'export' : 'import',
    bolSample: {
      title: meta.bolHeading,
      intro: meta.bolIntro,
      route: {
        from: {
          flag: ISO[String(r.originCountry).toUpperCase()],
          country: title(r.originCountry),
          port: r.loadingPort,
        },
        to: {
          flag: ISO[String(r.destinationCountry).toUpperCase()],
          country: title(r.destinationCountry),
          port: exp ? r.unloadingPort : '',
        },
        mode: 'Sea',
      },
      highlights,
      groups,
    },
  };
}
