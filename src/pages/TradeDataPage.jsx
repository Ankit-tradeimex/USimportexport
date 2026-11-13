'use client';

import { TRADE_DATA } from '../data/tradeData';
import FaqSection from '../components/common/FaqSection';
import BenefitsSection from '../components/trade-data/BenefitsSection';
import BolSampleSection from '../components/trade-data/BolSampleSection';
import FiveYearSection from '../components/trade-data/FiveYearSection';
import MajorInfoSection from '../components/trade-data/MajorInfoSection';
import OverviewSection from '../components/trade-data/OverviewSection';
import TopCompaniesSection from '../components/trade-data/TopCompaniesSection';
import TopHsSection from '../components/trade-data/TopHsSection';
import TopPartnersSection from '../components/trade-data/TopPartnerSection';
import TopPortsSection from '../components/trade-data/TopPortsSection';
import TradeHero from '../components/trade-data/TradeHero';

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
      <BenefitsSection data={data} />
      <FaqSection
        faqs={data.faqs?.items}
        subtitle={data.faqs?.subtitle}
        id={`${data.type}-faq`}
        schema
      />
    </>
  );
}
