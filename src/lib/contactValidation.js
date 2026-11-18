import { DATA_TYPES, DIAL_CODES } from '@/data/contactData';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// trim, drop control characters (stops header injection) and cap the length
const clean = (v, max) =>
  String(v ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);

/**
 * Validates the contact form on the server.
 * Returns { ok: true, data } or { ok: false, errors: { field: 'message' } }
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

  if (name.length < 2) errors.name = 'Please enter your name.';
  if (!EMAIL_RE.test(email)) errors.email = 'Please enter a valid email address.';
  if (query.length < 10) errors.query = 'Please tell us a little more (at least 10 characters).';

  if (dataType && !DATA_TYPES.includes(dataType))
    errors.dataType = 'Please choose one of the options.';

  if (phoneDigits) {
    if (!DIAL_CODES.some((d) => d.code === dial)) errors.phone = 'Please choose a country code.';
    else if (
      dial === '+91' ? phoneDigits.length !== 10 : phoneDigits.length < 6 || phoneDigits.length > 14
    ) {
      errors.phone =
        dial === '+91' ? 'Enter a 10-digit mobile number.' : 'Enter a valid phone number.';
    }
  }

  if (Object.keys(errors).length) return { ok: false, errors };

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
