import HsOverview from '@/components/hs/HsOverview';
import { DEFAULT_MODE, parseMode } from '@/data/hsDirectoryData';

const SITE_URL = 'https://usimportdata.com';

export const metadata = {
  title: 'HS Code Directory – US Import & Export HS Codes by Chapter | USImportdata',
  description:
    'Browse the Harmonized System (HS) code directory by section and chapter. Find the HS code for your product and see the US importers, exporters and shipment data behind it.',
  alternates: { canonical: `${SITE_URL}/hs-code-directory` },
};

export default function Page() {
  return <HsOverview modeKey={DEFAULT_MODE} mode={parseMode(DEFAULT_MODE)} />;
}
