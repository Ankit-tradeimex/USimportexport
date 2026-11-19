import { notFound, redirect } from 'next/navigation';
import { LETTERS, parseDdMode } from '@/data/productDirectoryData';

export default async function Page({ params }) {
  const { mode, letter } = await params;
  if (!parseDdMode(mode) || !LETTERS.includes(String(letter).toLowerCase())) notFound();
  redirect(`/data-directory/${mode}/${String(letter).toLowerCase()}/1`);
}
