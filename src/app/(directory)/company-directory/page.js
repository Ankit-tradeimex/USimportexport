import { redirect } from 'next/navigation';
import { DEFAULT_DIR_ROLE } from '@/data/companyDirectoryData';

export default function Page() {
  redirect(`/company-directory/${DEFAULT_DIR_ROLE}/a/1`);
}
