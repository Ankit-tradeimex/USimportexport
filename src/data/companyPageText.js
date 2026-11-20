/*
  SAMPLE text for the company list pages. It needs your review.
  FAQ items carry both { q, a } and { question, answer } so they fit whichever keys FaqSection reads.
*/
import { productName } from '@/lib/dataSlug';

const words = ({ role }) =>
  role === 'export'
    ? { noun: 'Exporters', one: 'exporter', verb: 'exporting', dir: 'to other countries' }
    : { noun: 'Importers', one: 'importer', verb: 'importing', dir: 'from other countries' };

// 'Mobile (HS 85)', 'Mobile', 'HS code 85'
export function termLabel({ hs = '', product = '' }) {
  const p = productName(product);
  if (p && hs) return `${p} (HS ${hs})`;
  return p || `HS code ${hs}`;
}

export function buildMeta(term) {
  const w = words(term);
  const label = termLabel(term);
  const title = `US ${label} ${w.noun}`;
  return {
    crumb: title,
    title,
    heading: `${w.noun} of ${label}`,
    text: `Browse US companies ${w.verb} ${label} ${w.dir}. Open a company to see its profile.`,
    description: `List of US ${w.noun.toLowerCase()} of ${label}. Browse US companies ${w.verb} ${label} ${w.dir} and open each company profile.`,
  };
}

export function buildFaqs(term) {
  const w = words(term);
  const label = termLabel(term);
  const items = [
    [
      `What does this list show?`,
      `It shows US companies ${w.verb} ${label} ${w.dir}, each with the product it trades.`,
    ],
    [
      `Are these only US companies?`,
      `Yes. Every company listed here is based in the United States and works as an ${w.one}.`,
    ],
    [
      `How many companies can I see without an account?`,
      `The first 12 companies are shown here. Sign up to see every page of the list.`,
    ],
    [`What can I find on a company profile?`, `Open any company card to go to its profile page.`],
  ];
  return items.map(([q, a]) => ({ q, a, question: q, answer: a }));
}
