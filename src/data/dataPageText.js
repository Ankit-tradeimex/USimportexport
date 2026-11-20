/*
  Page text for the data pages (title, hero paragraph, headings, FAQs), built from what was searched.
  The wording follows your current pages. The FAQ answers are SAMPLE text: replace them with your own.
*/
import { productName } from '../lib/dataSlug';

const roleWords = (role) =>
  role === 'import'
    ? { Role: 'Import', role: 'import', party: 'importer', geo: 'origin' }
    : { Role: 'Export', role: 'export', party: 'exporter', geo: 'destination' };

export function buildMeta({ role, hs = '', product = '', countryName = '', portName = '' }) {
  const { Role, role: r, party, geo } = roleWords(role);
  const P = productName(product);
  const p = P.toLowerCase();
  const filtered = Boolean(countryName || portName);

  let title;
  let text;
  let heading;

  if (filtered || (hs && product)) {
    title = `US ${P ? `${P} ` : ''}${Role} Data${countryName ? ` From ${countryName}` : ''}${portName ? ` At Port ${portName}` : ''}${hs ? ` By The HS Code ${hs}` : ''}`;
    text = `Search live USA ${p ? `${p} ` : ''}${r}s data${countryName ? ` from ${countryName.toLowerCase()}` : ''}${hs ? ` by the hs code ${hs}` : ''}${portName ? ` at port ${portName.toLowerCase()}` : ''}. Understand USA ${p ? `${p} ` : ''}${r} activities${countryName ? ` ${geo === 'origin' ? 'from' : 'to'} ${countryName.toLowerCase()}` : ''}${portName ? ` at port ${portName.toLowerCase()}` : ''}${hs ? ' under this hs code' : ''}.`;
    heading = `Verified US ${P ? `${P} ` : ''}${Role} Data${hs ? ` Under HS Code ${hs}` : ''}`;
  } else if (hs) {
    title = `US ${Role} Data For HS Code ${hs} – Trends & Statistics`;
    text = `Get comprehensive US ${r} data for HS Code ${hs} with in-depth insights into trade trends, shipment volumes, and ${r} statistics. Analyze detailed records covering product descriptions, ${party} details, country of ${geo}, port data, and quantity to support market research, competitive analysis, and strategic trade decisions.`;
    heading = `Get Detailed US ${Role} Data Under HS Code ${hs}`;
  } else {
    title = `${P} ${Role} Data Of USA | Data Of US ${P} ${Role}`;
    text = `Verified ${p} ${r} data of the USA with our bill of lading reports, which include HS code, date, B/L number, product description, loading & unloading ports, US ${party} name, quantity, etc. Access verified shipment records to track market trends in the US ${p} ${r} industry. Gain insights into US ${p} ${r} volumes, partner countries, and trade activities over time with a verified database.`;
    heading = `Verified USA ${P} ${Role} Data | ${P} ${Role} Statistics`;
  }

  const crumb =
    !product && hs
      ? `HS Code ${hs} ${Role} Live Data`
      : `${P}${hs && product ? ` (HS ${hs})` : ''} ${Role} Live Data`;
  const description = text.length > 160 ? `${text.slice(0, 157).trim()}…` : text;

  return { title, text, heading, crumb, description };
}

export function buildFaqs({ role, hs = '', product = '' }) {
  const { Role, role: r, party, geo } = roleWords(role);
  const p = productName(product).toLowerCase();
  const subject = p || `HS code ${hs}`;
  const label = p ? `${p} ${r} data` : `${r} data by HS code ${hs}`;

  return [
    {
      q: `What features does USImportdata offer for ${label}?`,
      a: `USImportdata offers access to verified ${label}, ${party} and supplier profiles, shipment trends, and analytics tools tailored for ${subject} ${r}.`,
    },
    {
      q: `How can I find US ${label} from USImportdata?`,
      a: `Use the search at the top of this page. Enter a product, an HS code or both, choose Import or Export, and open the matching page. Sign up to see every record.`,
    },
    {
      q: `What type of data does US ${subject} ${r}s include?`,
      a: `Each record can include the shipment date, HS code, product description, ${geo} country, unloading port, quantity, unit, weight and the ${party} name.`,
    },
    p
      ? {
          q: `Which types of ${p} are covered in this data?`,
          a: `The data covers the ${p} products found in US ${r} shipment records. The product descriptions in the table show exactly what each shipment contains.`,
        }
      : {
          q: `Who can benefit from using US ${Role} Data under HS code ${hs}?`,
          a: `Traders, manufacturers, market researchers and analysts use it to study trade trends, find ${party === 'importer' ? 'buyers' : 'suppliers'} and track competitors.`,
        },
    {
      q: `Can I get data for specific HS codes or companies?`,
      a: `Yes. You can search by HS code, by product or by company name. Your dashboard gives you the full filters, all records and downloads.`,
    },
    {
      q: `How can I purchase the US ${label}?`,
      a: `Create a free account to see all records in your dashboard, or contact us through the Contact Us page and our team will guide you to the right plan.`,
    },
  ];
}
