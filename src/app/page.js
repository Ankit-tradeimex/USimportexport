import AiSearchBar from '@/components/common/AiSearchBar';
import FaqSection from '@/components/common/FaqSection';
import SearchSection from '@/components/common/SearchSection';
import TestimonialsSection from '@/components/common/TestimonialSection';
import AiTradeIntelligenceSection from '@/components/home/AiTradeIntelligenceSection';
import BlogSection from '@/components/home/BlogSection';
import BolSection from '@/components/home/BolSection';
import CountriesSection from '@/components/home/CountriesSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import Hero from '@/components/home/Hero';
import SearchToggle from '@/components/home/SearchToggle';
import TimelineSection from '@/components/home/TimelineSection';
import TradeDataSection from '@/components/home/TradeDataSection';

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <SearchToggle />
        <FeaturesSection />
        <AiTradeIntelligenceSection />

        <TimelineSection />
        <BolSection />
        <TradeDataSection />
        <TestimonialsSection />
        <CountriesSection />

        <FaqSection />
        <BlogSection />
      </main>
    </>
  );
}
