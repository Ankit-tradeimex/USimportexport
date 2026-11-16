import FaqSection from '@/components/common/FaqSection';
import FaqHero from '@/components/faqs/FaqHero';
import React from 'react';
import { FAQ_PAGE_DATA } from '@/data/faqData';

const FaqPage = () => {
  return (
    <main>
      <FaqHero />
      <FaqSection
        faqs={FAQ_PAGE_DATA.ABOUT}
        title="About USimportdata -"
        highlight="US Trade data provide"
        subtitle=""
        image={null}
      />
      <FaqSection
        faqs={FAQ_PAGE_DATA.US_TRADE_DATA}
        title="US Trade Data/"
        highlight="US Import-Export Data"
        subtitle=""
        image={null}
      />
      <FaqSection
        faqs={FAQ_PAGE_DATA.BUSINESS_DATA}
        title="Business in "
        highlight="the US"
        subtitle=""
        image={null}
      />
      <FaqSection
        faqs={FAQ_PAGE_DATA.PRICING}
        title=""
        highlight="Pricing"
        subtitle=""
        image={null}
      />
    </main>
  );
};

export default FaqPage;
