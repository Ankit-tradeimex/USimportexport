import { NextResponse } from 'next/server';
import { validateContact } from '@/lib/contactValidation';

const hits = new Map();
function tooMany(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

async function deliver(data) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!key || !from || !to) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[contact form] email service not configured. Enquiry:', data);
      return;
    }
    throw new Error('Email service is not configured');
  }

  // plain text only, so nothing the visitor typed is ever interpreted as HTML
  const text = [
    `Name: ${data.name}`,
    `Company: ${data.company || '-'}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || '-'}`,
    `Data type: ${data.dataType || '-'}`,
    '',
    'Query:',
    data.query,
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email,
      subject: `New enquiry from ${data.name}`,
      text,
    }),
  });
  if (!res.ok) throw new Error(`Email provider error ${res.status}`);
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // honeypot: real visitors never see or fill this field, bots usually do. Pretend it worked.
  if (body?.website) return NextResponse.json({ ok: true });

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
  if (tooMany(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a few minutes.' },
      { status: 429 },
    );
  }

  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json(
      { error: 'Please check the highlighted fields.', errors: result.errors },
      { status: 400 },
    );
  }

  try {
    await deliver(result.data);
  } catch (err) {
    console.error('[contact form] delivery failed:', err.message);
    return NextResponse.json(
      { error: 'We could not send your message right now. Please email us directly.' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
