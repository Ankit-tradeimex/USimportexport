import LegalPage from '@/pages/LegalPage';
import { legalMetadata } from '@/lib/legal';

export const generateMetadata = () => legalMetadata('disclaimer');

export default function Page() {
  return <LegalPage slug="disclaimer" />;
}
