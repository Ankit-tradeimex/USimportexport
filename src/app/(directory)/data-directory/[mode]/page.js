import { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import { parseDdMode } from '@/data/productDirectoryData';

export default function Page({ params }) {
  return (
    <Suspense fallback={null}>
      <RedirectContent params={params} />
    </Suspense>
  );
}

async function RedirectContent({ params }) {
  const { mode } = await params;

  if (!parseDdMode(mode)) {
    notFound();
  }

  redirect(`/data-directory/${mode}/a/1`);
}
