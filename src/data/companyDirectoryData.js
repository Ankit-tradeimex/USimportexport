/*
  Company directory data: A-Z lists of US importers / exporters.
  Every letter is paginated, DIR_PER_PAGE companies per page.

  /company-directory/us-importer/<letter>/1       letter = a-z or 0-9 (names starting with a digit)
  /company-directory/us-exporter/<letter>/1
*/
import { listCompanies } from '@/data/companySample';

export const DIR_PER_PAGE = 12;
export const DIR_LETTERS = [...'abcdefghijklmnopqrstuvwxyz'.split(''), '0-9'];

export const DIR_ROLES = [
  { value: 'import', label: 'Importers', slug: 'us-importer' },
  { value: 'export', label: 'Exporters', slug: 'us-exporter' },
];
export const DEFAULT_DIR_ROLE = 'us-importer';

// 'us-importer' -> 'import'   (null if unknown)
export const parseDirRole = (slug) =>
  DIR_ROLES.find((r) => r.slug === String(slug).toLowerCase())?.value ?? null;
export const dirSlug = (role) => DIR_ROLES.find((r) => r.value === role).slug;
export const dirPath = (role, letter = 'a', page = 1) =>
  `/company-directory/${dirSlug(role)}/${letter}/${page}`;

// profile reached from the directory has no search term in it: /company/us-importer/<company-slug>
export const profileHref = (role, companySlug) => `/company/${dirSlug(role)}/${companySlug}`;

// SAMPLE shipment count, stable per company (your API will return the real number)
const shipmentsOf = (slug) => {
  let h = 0;
  for (const ch of slug) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return 12 + (h % 4800);
};

const letterOf = (name) => (/^[a-z]/i.test(name) ? name[0].toLowerCase() : '0-9');

const byLetter = (role) => {
  const map = {};
  for (const c of listCompanies(role))
    (map[letterOf(c.name)] ||= []).push({ ...c, role, shipments: shipmentsOf(c.slug) });
  for (const k in map) map[k].sort((a, b) => a.name.localeCompare(b.name));
  return map;
};

// { a: 12, b: 20, ... }  used to grey out empty letters
export function getLetterCounts(role) {
  const map = byLetter(role);
  return Object.fromEntries(DIR_LETTERS.map((l) => [l, (map[l] || []).length]));
}

/* API-shaped: { items, total, totalPages } for one letter and page */
export function getCompanies({ role, letter, page = 1, perPage = DIR_PER_PAGE }) {
  const all = byLetter(role)[letter] || [];
  const totalPages = Math.max(1, Math.ceil(all.length / perPage));
  return { items: all.slice((page - 1) * perPage, page * perPage), total: all.length, totalPages };
}

// closest letters that have companies, for the empty state
export function getNearbyLetters(role, letter, count = 4) {
  const counts = getLetterCounts(role);
  const i = DIR_LETTERS.indexOf(letter);
  return DIR_LETTERS.filter((l) => l !== letter && counts[l])
    .sort((a, b) => Math.abs(DIR_LETTERS.indexOf(a) - i) - Math.abs(DIR_LETTERS.indexOf(b) - i))
    .slice(0, count);
}

export const dirTitle = (role, letter) =>
  `US ${role === 'export' ? 'Exporters' : 'Importers'} Directory - ${letter === '0-9' ? 'Names Starting with a Number' : `Companies Starting with ${letter.toUpperCase()}`}`;

export const dirIntro = (role, letter) => {
  const who = role === 'export' ? 'exporters' : 'importers';
  const what = role === 'export' ? 'ship goods out of' : 'bring goods into';
  const l = letter === '0-9' ? 'a number' : `the letter ${letter.toUpperCase()}`;
  return `Browse US ${who} whose names start with ${l}. These companies ${what} the United States, open any name to see its trade profile.`;
};
