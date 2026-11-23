import LegalPage from '@/pages/LegalPage';
import { legalMetadata } from '@/lib/legal';

export const generateMetadata = () => legalMetadata('privacy-policy');

export default function Page() {
  return <LegalPage slug="privacy-policy" />;
}
