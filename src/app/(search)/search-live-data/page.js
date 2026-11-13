import LiveSearchPage from '@/pages/LiveSearchPage';
import { Suspense } from 'react';

export const metadata = {
  title: 'Search Live US Import-Export Data – USImportdata',
  description:
    'Search live US import and export shipment records by product, HS code or company. Filter by country and year.',
  alternates: { canonical: '/search-live-data' },
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <LiveSearchPage />
    </Suspense>
  );
}
