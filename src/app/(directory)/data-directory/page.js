import { redirect } from 'next/navigation';
import { DEFAULT_DD_MODE } from '@/data/productDirectoryData';

export default function Page() {
  redirect(`/data-directory/${DEFAULT_DD_MODE}/a/1`);
}
