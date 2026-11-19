import { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import { LETTERS, parseDdMode } from '@/data/productDirectoryData';

export default function Page({ params }) {
  return (
    <Suspense fallback={null}>
      <RedirectContent params={params} />
    </Suspense>
  );
}

async function RedirectContent({ params }) {
  const { mode, letter } = await params;

  const normalizedLetter = String(letter).toLowerCase();

  if (!parseDdMode(mode) || !LETTERS.includes(normalizedLetter)) {
    notFound();
  }

  redirect(`/data-directory/${mode}/${normalizedLetter}/1`);
}
