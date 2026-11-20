import { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import { DIR_LETTERS, parseDirRole } from '@/data/companyDirectoryData';

export default function Page({ params }) {
  return (
    <Suspense fallback={null}>
      <RedirectContent params={params} />
    </Suspense>
  );
}

async function RedirectContent({ params }) {
  const { role, letter } = await params;

  const l = String(letter).toLowerCase();

  if (!parseDirRole(role) || !DIR_LETTERS.includes(l)) {
    notFound();
  }

  redirect(`/company-directory/${role}/${l}/1`);
}
