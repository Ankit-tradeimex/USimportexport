import TradeDataPage from '@/components/trade-data/TradeDataPage';
import { TRADE_DATA } from '@/data/tradeData';

export const metadata = {
  title: TRADE_DATA.import.meta.title,
  description: TRADE_DATA.import.meta.description,
  alternates: { canonical: TRADE_DATA.import.path },
};

export default function Page() {
  return <TradeDataPage type="import" />;
}
