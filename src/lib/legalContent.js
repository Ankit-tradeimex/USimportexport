import sanitizeHtml from 'sanitize-html';
import { slugify } from './dataSlug';

const OPTIONS = {
  allowedTags: [
    'h2',
    'h3',
    'h4',
    'p',
    'br',
    'hr',
    'ul',
    'ol',
    'li',
    'strong',
    'b',
    'em',
    'i',
    'u',
    's',
    'a',
    'blockquote',
    'code',
    'pre',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
  ],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
    th: ['colspan', 'rowspan'],
    td: ['colspan', 'rowspan'],
  },
  allowedSchemes: ['http', 'https', 'mailto', 'tel'],
  transformTags: {
    h1: 'h2', // the page already has its own h1
    a: (tagName, attribs) => {
      const external = /^https?:\/\//i.test(attribs.href || '');
      return {
        tagName: 'a',
        attribs: external ? { ...attribs, target: '_blank', rel: 'noopener noreferrer' } : attribs,
      };
    },
  },
};

const ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&nbsp;': ' ',
};
const plain = (html) =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (m) => ENTITIES[m])
    .replace(/\s+/g, ' ')
    .trim();

export function prepareLegalHtml(raw) {
  const clean = sanitizeHtml(String(raw || ''), OPTIONS);

  const used = new Map();
  const toc = [];
  const html = clean.replace(/<h([2-4])>([\s\S]*?)<\/h\1>/g, (whole, level, inner) => {
    const text = plain(inner);
    if (!text) return whole;
    let id = slugify(text) || 'section';
    const seen = used.get(id) || 0;
    used.set(id, seen + 1);
    if (seen) id = `${id}-${seen + 1}`; // two headings with the same text
    toc.push({ id, text, level: Number(level) });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  const words = plain(clean).split(' ').filter(Boolean).length;
  return { html, toc, minutes: Math.max(1, Math.round(words / 200)) };
}
