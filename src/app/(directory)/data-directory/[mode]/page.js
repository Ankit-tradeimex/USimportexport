import { notFound, redirect } from 'next/navigation';
import { parseDdMode } from '@/data/productDirectoryData';

export default async function Page({ params }) {
  const { mode } = await params;
  if (!parseDdMode(mode)) notFound();
  redirect(`/data-directory/${mode}/a/1`);
}
