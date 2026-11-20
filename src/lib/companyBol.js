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

const fmt = (n) => Number(n).toLocaleString('en-US');
const str = (v) => (v === '' || v == null ? '' : String(v));
const title = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

export function buildBolData({ role, record: r, meta }) {
  const groups = [
    {
      title: 'Shipment',
      icon: 'cargo',
      fields: [
        ['Date', r.date],
        ['HS Code', r.hs],
        ['Product Description', r.description],
        ['Quantity', r.qty != null ? fmt(r.qty) : ''],
        ['Unit', r.unit],
        ['Weight (Kg)', r.weight != null ? fmt(r.weight) : ''],
      ],
    },
    {
      title: 'Route',
      icon: 'route',
      fields: [
        ['Origin Country', r.originCountry],
        ['Destination Country', r.destinationCountry],
        ['Loading Port', r.loadingPort],
        ['Unloading Port', r.unloadingPort],
      ],
    },
    {
      title: 'Parties',
      icon: 'parties',
      fields: [
        ['Shipper', r.shipper],
        ['Consignee', r.consignee],
      ],
    },
    {
      title: 'Carrier & Container',
      icon: 'ship',
      fields: [
        ['Master B/L No', r.masterBl],
        ['Carrier', r.carrier],
        ['Vessel', r.vessel],
        ['Voyage', r.voyage],
        ['Container No', r.container],
        ['TEU', r.teu],
        ['SCAC', r.scac],
      ],
    },
  ]
    .map((g) => ({
      ...g,
      fields: g.fields
        .map(([label, value]) => ({ label, value: str(value) }))
        .filter((f) => f.value),
    }))
    .filter((g) => g.fields.length);

  const highlights = [
    { label: 'Date', value: str(r.date) },
    { label: 'HS Code', value: str(r.hs) },
    { label: 'Quantity', value: r.qty != null ? `${fmt(r.qty)} ${r.unit || ''}`.trim() : '' },
    { label: 'Weight (Kg)', value: r.weight != null ? fmt(r.weight) : '' },
  ].filter((h) => h.value);

  return {
    type: role === 'export' ? 'export' : 'import',
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
          port: r.unloadingPort,
        },
        mode: 'ocean',
      },
      highlights,
      groups,
    },
  };
}
