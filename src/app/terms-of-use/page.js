import LegalPage from '@/pages/LegalPage';
import { legalMetadata } from '@/lib/legal';

export const generateMetadata = () => legalMetadata('terms-of-use');

export default function Page() {
  return <LegalPage slug="terms-of-use" />;
}
