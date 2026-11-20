/*
  SAMPLE text for the company profile page. It needs your review.
  Every FAQ answer is built from the company's own record, nothing is hard-coded about other companies.
  FAQ items carry both { q, a } and { question, answer } so they fit whichever keys FaqSection reads.
*/
import { productName } from '../lib/dataSlug';

export const roleWords = (role) =>
  role === 'export'
    ? { one: 'Exporter', many: 'Exporters', verb: 'exports', ing: 'exporting', dir: 'to' }
    : { one: 'Importer', many: 'Importers', verb: 'imports', ing: 'importing', dir: 'from' };

const title = (s) =>
  String(s || '')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

export function buildProfileMeta({ company, role }) {
  const w = roleWords(role);
  const product = productName(company.product);
  return {
    title: `${company.name} - US ${product} ${w.one}`,
    description: `${company.name} is a US ${w.one.toLowerCase()} of ${product.toLowerCase()}. See its address and a sample shipment record, and open its full shipment history.`,
    bolHeading: `B/L ${role === 'export' ? 'Export' : 'Import'} data of ${company.name}`,
    bolIntro: `Below is a sample bill of lading record of ${company.name}, a US ${w.one.toLowerCase()} of ${product.toLowerCase()}. Sign up to see every shipment of this company.`,
    ctaTitle: `Discover Verified US ${product} ${w.many} Database`,
    ctaText: `Get verified shipment records and more US ${product.toLowerCase()} ${w.many.toLowerCase()} for your business.`,
    similarTitle: `Explore more ${product} ${w.many} like ${company.name}`,
  };
}

export function buildProfileFaqs({ company, role, address, record }) {
  const w = roleWords(role);
  const partnerCountry = title(
    role === 'export' ? record.destinationCountry : record.originCountry,
  );
  const items = [
    [
      `What does ${company.name} ${role === 'export' ? 'export' : 'import'}?`,
      `${company.name} ${w.verb} ${company.description.toLowerCase()} (HS code ${company.hs}).`,
    ],
    [
      `Where is ${company.name} located?`,
      `${company.name} is located at ${address}, United States.`,
    ],
    [
      `Which country does ${company.name} ${role === 'export' ? 'export to' : 'import from'}?`,
      `In the sample record on this page, ${company.name} ${w.verb} ${w.dir} ${partnerCountry}.`,
    ],
    [
      `How can I see more shipments of ${company.name}?`,
      `Sign up for the dashboard to see every shipment record of ${company.name}.`,
    ],
  ];
  return items.map(([q, a]) => ({ q, a, question: q, answer: a }));
}
