import { DATA_TYPES, DIAL_CODES } from '@/data/contactData';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Detect URLs, domains and common link formats.
const LINK_RE =
  /(?:https?:\/\/|ftp:\/\/|www\.)\S+|\b[a-z0-9-]+\.(?:com|org|net|io|co|in|gov|edu|biz|info|dev|app|ai)(?:\/[^\s]*)?/i;

// Detect SQL statements and common SQL injection patterns.
const SQL_RE = [
  /\bSELECT\b[\s\S]*\bFROM\b/i,
  /\bINSERT\s+INTO\b/i,
  /\bUPDATE\b[\s\S]*\bSET\b/i,
  /\bDELETE\s+FROM\b/i,
  /\bDROP\s+(?:TABLE|DATABASE|INDEX|VIEW)\b/i,
  /\bALTER\s+TABLE\b/i,
  /\bCREATE\s+(?:TABLE|DATABASE|INDEX|VIEW)\b/i,
  /\bTRUNCATE\s+TABLE\b/i,
  /\bUNION\s+(?:ALL\s+)?SELECT\b/i,
  /\bEXEC(?:UTE)?\s+/i,
  /\bINFORMATION_SCHEMA\b/i,
  /\bSLEEP\s*\(/i,
  /\bBENCHMARK\s*\(/i,
  /--/,
  /\/\*[\s\S]*?\*\//,
  /;\s*(?:SELECT|INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|TRUNCATE)\b/i,
  /\bOR\s+['"]?\d+['"]?\s*=\s*['"]?\d+['"]?/i,
  /\bAND\s+['"]?\d+['"]?\s*=\s*['"]?\d+['"]?/i,
];

const containsLink = (value) => LINK_RE.test(value);

const containsSql = (value) => SQL_RE.some((pattern) => pattern.test(value));

// Trim, remove control characters and limit length.
const clean = (v, max) =>
  String(v ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);

/**
 * Validates the contact form on the server.
 * Returns { ok: true, data } or { ok: false, errors }
 */
export function validateContact(body = {}) {
  const errors = {};

  const name = clean(body.name, 100).replace(/[\r\n]+/g, ' ');
  const company = clean(body.company, 120).replace(/[\r\n]+/g, ' ');
  const email = clean(body.email, 160).toLowerCase();
  const dataType = clean(body.dataType, 60);
  const dial = clean(body.dialCode, 6);
  const phoneDigits = clean(body.phone, 30).replace(/\D/g, '');
  const query = clean(body.query, 3000);

  if (name.length < 2) {
    errors.name = 'Please enter your name.';
  }

  if (!EMAIL_RE.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (query.length < 10) {
    errors.query = 'Please tell us a little more (at least 10 characters).';
  }

  // Reject links and URLs.
  if (query && containsLink(query)) {
    errors.query = 'Links and URLs are not allowed in this message.';
  }

  // Reject SQL queries and suspicious SQL patterns.
  if (query && containsSql(query)) {
    errors.query = 'SQL queries and database commands are not allowed.';
  }

  if (dataType && !DATA_TYPES.includes(dataType)) {
    errors.dataType = 'Please choose one of the options.';
  }

  if (phoneDigits) {
    if (!DIAL_CODES.some((d) => d.code === dial)) {
      errors.phone = 'Please choose a country code.';
    } else if (
      dial === '+91' ? phoneDigits.length !== 10 : phoneDigits.length < 6 || phoneDigits.length > 14
    ) {
      errors.phone =
        dial === '+91' ? 'Enter a 10-digit mobile number.' : 'Enter a valid phone number.';
    }
  }

  if (Object.keys(errors).length) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: {
      name,
      company,
      email,
      dataType,
      phone: phoneDigits ? `${dial} ${phoneDigits}` : '',
      query,
    },
  };
}
