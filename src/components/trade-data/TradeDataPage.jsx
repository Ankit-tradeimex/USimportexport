'use client';

import { TRADE_DATA } from '../../data/tradeData';
import BolSampleSection from './BolSampleSection';
import FiveYearSection from './FiveYearSection';
import MajorInfoSection from './MajorInfoSection';
import OverviewSection from './OverviewSection';
import TopCompaniesSection from './TopCompaniesSection';
import TopHsSection from './TopHsSection';
import TopPartnersSection from './TopPartnerSection';
import TopPortsSection from './TopPortsSection';
import TradeHero from './TradeHero';

export default function TradeDataPage({ type }) {
  const data = TRADE_DATA[type];
  if (!data) return null;

  return (
    <>
      <TradeHero data={data} />
      <OverviewSection data={data} />
      <MajorInfoSection data={data} />
      <TopHsSection data={data} />
      <TopPartnersSection data={data} />
      <TopPortsSection data={data} />
      <TopCompaniesSection data={data} />
      <FiveYearSection data={data} />
      <BolSampleSection data={data} />
    </>
  );
}
