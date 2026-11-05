'use client';

import { TRADE_DATA } from '../../data/tradeData';
import OverviewSection from './OverviewSection';
import TradeHero from './TradeHero';

export default function TradeDataPage({ type }) {
  const data = TRADE_DATA[type];
  if (!data) return null;

  return (
    <>
      <TradeHero data={data} />
      <OverviewSection data={data} />
    </>
  );
}
