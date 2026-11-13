import AiSearchPage from '@/pages/AiSearchPage';
import { Suspense } from 'react';

export const metadata = {
  title: 'AI Search | Search US Import-Export Data in Any Language – USImportdata',
  description:
    'Ask for US import or export data in your own words and any language. Our AI sets the filters and finds matching shipment records instantly.',
  alternates: { canonical: '/ai-search' },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AiSearchPage />
    </Suspense>
  );
}
