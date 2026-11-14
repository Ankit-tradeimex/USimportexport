'use client';
import LiveDataHero from '@/components/search-live-data/LiveDataHero';
import SearchSection from '@/components/common/SearchSection';
import AiSearchCta from '@/components/search-live-data/AiSearchCta';
import React from 'react';
import LiveSearchBenefits from '@/components/search-live-data/LiveSearchBenefits';
import LiveDataInfoSections from './LiveDataInfoSections';

const LiveSearchPage = () => {
  return (
    <main>
      <LiveDataHero />
      <div id="search" className="py-10">
        <SearchSection />
      </div>
      <AiSearchCta />
      <LiveSearchBenefits />
      <LiveDataInfoSections />
    </main>
  );
};

export default LiveSearchPage;
