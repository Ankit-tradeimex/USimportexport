'use client';
import AiSearchDemoStrip from '@/components/ai-search/AiSearchDemoStrip';
import AiSearchHero from '@/components/ai-search/AiSearchHero';
import SearchLiveDataCta from '@/components/ai-search/SearchLiveDataCta';
import AiSearchBar from '@/components/common/AiSearchBar';
import AiTradeIntelligenceSection from '@/components/home/AiTradeIntelligenceSection';
import React from 'react';

const AiSearchPage = () => {
  return (
    <main>
      <AiSearchHero />
      <div className="py-10">
        <AiSearchBar />
      </div>
      <SearchLiveDataCta />
      <AiTradeIntelligenceSection />
      <AiSearchDemoStrip />
    </main>
  );
};

export default AiSearchPage;
