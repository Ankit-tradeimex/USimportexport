/*
  SAMPLE company profile data. Nothing here is real.

  getCompanyProfile() returns the same shape your API should return:
    {
      company : { id, name, slug, hs, description, product }
      address : 'street, city, state zip'
      record  : ONE shipment record of that company (the B/L card)
    }
  The record is built from the company, so the same company always shows the same record.
*/
import { findCompany } from './companySample';

function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const STREETS = [
  'Harbor Blvd',
  'Commerce Way',
  'Industrial Pkwy',
  'Port Road',
  'Main St',
  'Freight Ave',
  'Seaport Dr',
];
const CITIES = [
  ['Houston', 'TX', '77002'],
  ['Los Angeles', 'CA', '90021'],
  ['Newark', 'NJ', '07114'],
  ['Savannah', 'GA', '31401'],
  ['Miami', 'FL', '33132'],
  ['Seattle', 'WA', '98134'],
  ['Charleston', 'SC', '29401'],
];
const US_PORTS = [
  'LOS ANGELES CALIFORNIA',
  'LONG BEACH CALIFORNIA',
  'NEW YORK NEWARK AREA NEWARK NEW JERSEY',
  'SAVANNAH GEORGIA',
  'HOUSTON TEXAS',
];
const FOREIGN = [
  ['CHINA', ['SHANGHAI CHN', 'NINGBO CHN', 'SHENZHEN CHN']],
  ['INDIA', ['NHAVA SHEVA IND', 'MUNDRA IND']],
  ['GERMANY', ['HAMBURG DEU', 'BREMERHAVEN DEU']],
  ['SOUTH KOREA', ['BUSAN KOR', 'INCHEON KOR']],
  ['VIETNAM', ['HAIPHONG VNM', 'VUNG TAU VNM']],
  ['MEXICO', ['VERACRUZ MEX', 'MANZANILLO MEX']],
];
const CARRIERS = [
  ['MAERSK LINE', 'MAEU'],
  ['MSC', 'MSCU'],
  ['CMA CGM', 'CMDU'],
  ['HAPAG-LLOYD', 'HLCU'],
  ['EVERGREEN LINE', 'EGLV'],
];
const VESSELS = [
  'MAERSK ELBA',
  'MSC ISABELLA',
  'CMA CGM MARCO POLO',
  'EVER GIVEN',
  'HAPAG EXPRESS',
];
const PARTNERS = [
  'Sunrise Trading Co Ltd',
  'Orient Global Supply',
  'Meridian Sourcing GmbH',
  'Pacific Rim Partners',
];

const pad = (n, l) => String(n).padStart(l, '0');

export function getCompanyProfile({ role, slug }) {
  const company = findCompany(role, slug);
  if (!company) return null;

  const seed = [...company.slug].reduce((s, ch) => s + ch.charCodeAt(0) * 31, 7);
  const rand = rng(seed);
  const pick = (list) => list[Math.floor(rand() * list.length)];
  const between = (lo, hi) => Math.round(lo + rand() * (hi - lo));

  const [city, state, zip] = pick(CITIES);
  const address = `${between(100, 9800)} ${pick(STREETS)}, ${city}, ${state} ${zip}`;

  const [foreign, foreignPorts] = pick(FOREIGN);
  const [carrier, scac] = pick(CARRIERS);
  const day = new Date(Date.UTC(2024, 2, 1 + Math.floor(rand() * 92)));
  const exp = role === 'export';
  const partner = pick(PARTNERS);

  const record = {
    date: `${day.getUTCFullYear()}-${pad(day.getUTCMonth() + 1, 2)}-${pad(day.getUTCDate(), 2)}`,
    originCountry: exp ? 'UNITED STATES' : foreign,
    destinationCountry: exp ? foreign : 'UNITED STATES',
    loadingPort: exp ? pick(US_PORTS) : pick(foreignPorts),
    unloadingPort: exp ? pick(foreignPorts) : pick(US_PORTS),
    hs: company.hs,
    description: company.description.toUpperCase(),
    qty: between(20, 900),
    unit: pick(['CTN', 'PCS', 'PKG']),
    weight: between(500, 24000),
    shipper: exp ? company.name : partner,
    consignee: exp ? partner : company.name,
    masterBl: `${scac}${pad(between(0, 999999999), 9)}`,
    carrier,
    vessel: pick(VESSELS),
    voyage: `${between(1, 99)}${pick(['E', 'W', 'N'])}`,
    container: `${scac.slice(0, 3)}U${pad(between(0, 9999999), 7)}`,
    teu: pick([1, 2]),
    scac,
  };

  return { company, address, record };
}
