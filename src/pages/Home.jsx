'use client';

import FaqSection from '@/components/common/FaqSection';
import TestimonialsSection from '@/components/common/TestimonialSection';
import AiTradeIntelligenceSection from '@/components/home/AiTradeIntelligenceSection';
import AsFeatured from '@/components/home/AsFeatured';
import BlogSection from '@/components/home/BlogSection';
import BolSection from '@/components/home/BolSection';
import CountriesSection from '@/components/home/CountriesSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HappyClients from '@/components/home/HappyClients';
import Hero from '@/components/home/Hero';
import SearchToggle from '@/components/home/SearchToggle';
import TimelineSection from '@/components/home/TimelineSection';
import TradeDataSection from '@/components/home/TradeDataSection';

export default function Home() {
  return (
    <>
      <Hero />
      <SearchToggle />
      <FeaturesSection />
      <AsFeatured />
      <AiTradeIntelligenceSection />
      <TimelineSection />
      <BolSection />
      <TradeDataSection />
      <HappyClients />
      <TestimonialsSection />
      <CountriesSection />
      <FaqSection />
      <BlogSection />
    </>
  );
}
