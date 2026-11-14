'use client';
import AiSearchAudience from '@/components/ai-search/AiSearchAudience';
import AiSearchDemoStrip from '@/components/ai-search/AiSearchDemoStrip';
import AiSearchExamples from '@/components/ai-search/AiSearchExamples';
import AiSearchHero from '@/components/ai-search/AiSearchHero';
import AiSearchLanguages from '@/components/ai-search/AiSearchLanguages';
import AiUnderstandsSection from '@/components/ai-search/AiUnderstandsSection';
import AiVsManualSection from '@/components/ai-search/AiVsManualSection';
import SearchLiveDataCta from '@/components/ai-search/SearchLiveDataCta';
import AiSearchBar from '@/components/common/AiSearchBar';
import FaqSection from '@/components/common/FaqSection';
import AiTradeIntelligenceSection from '@/components/home/AiTradeIntelligenceSection';
import { AI_SEARCH_FAQS } from '@/data/faqData';
import React from 'react';

const AiSearchPage = () => {
  return (
    <main>
      <AiSearchHero />
      <section id="ai-search" className="py-10">
        <AiSearchBar />
      </section>
      <SearchLiveDataCta />
      <AiTradeIntelligenceSection />
      <AiSearchDemoStrip />
      <AiSearchLanguages />

      <AiSearchExamples />
      <AiUnderstandsSection />

      <AiVsManualSection />
      <AiSearchAudience />
      <FaqSection
        faqs={AI_SEARCH_FAQS}
        subtitle="Everything you need to know about AI Search. Can't find your answer? Our team is happy to help."
        id="ai-search-faq"
        schema
      />
    </main>
  );
};

export default AiSearchPage;
