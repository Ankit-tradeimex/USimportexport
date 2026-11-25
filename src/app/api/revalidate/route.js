import { timingSafeEqual } from 'node:crypto';
import { revalidateTag } from 'next/cache';

const TAG = /^[a-z0-9:_-]{1,80}$/i;

// compares in constant time, so the secret can't be guessed from response speed
function sameSecret(given, expected) {
  const a = Buffer.from(given ?? '');
  const b = Buffer.from(expected ?? '');
  return a.length > 0 && a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request) {
  if (!sameSecret(request.headers.get('x-revalidate-secret'), process.env.REVALIDATE_SECRET)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const tags = Array.isArray(body?.tags) ? body.tags : [];
  if (
    tags.length === 0 ||
    tags.length > 20 ||
    !tags.every((t) => typeof t === 'string' && TAG.test(t))
  ) {
    return Response.json({ error: 'Send 1 to 20 valid tags' }, { status: 400 });
  }

  for (const tag of tags) revalidateTag(tag, { expire: 0 }); // expire now: the next visitor gets fresh content
  return Response.json({ revalidated: tags });
}
