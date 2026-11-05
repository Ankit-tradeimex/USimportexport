import TradeDataPage from '@/components/trade-data/TradeDataPage';
import { TRADE_DATA } from '@/data/tradeData';

export const metadata = {
  title: TRADE_DATA.export.meta.title,
  description: TRADE_DATA.export.meta.description,
  alternates: { canonical: TRADE_DATA.export.path },
};

export default function Page() {
  return <TradeDataPage type="export" />;
}
