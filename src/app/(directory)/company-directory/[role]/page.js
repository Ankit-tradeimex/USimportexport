import { Suspense } from 'react';
import { notFound, redirect } from 'next/navigation';
import { parseDirRole } from '@/data/companyDirectoryData';

export default function Page({ params }) {
  return (
    <Suspense fallback={null}>
      <RedirectContent params={params} />
    </Suspense>
  );
}

async function RedirectContent({ params }) {
  const { role } = await params;

  if (!parseDirRole(role)) {
    notFound();
  }

  redirect(`/company-directory/${role}/a/1`);
}
