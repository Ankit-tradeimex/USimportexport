import AboutHero from '@/components/about/AboutHero';
import AboutNumbersSection from '@/components/about/AboutNumbersSection';
import CommitmentSection from '@/components/about/CommitmentSection';
import OurStorySection from '@/components/about/OurStorySection';
import VisionSection from '@/components/about/VisionSection';
import WhoWeAreSection from '@/components/about/WhoWeAreSection';
import WhyChooseSection from '@/components/about/WhyChooseSection';
import Stats from '@/components/common/Stats';
import React from 'react';

const AboutPage = () => {
  return (
    <main>
      <AboutHero />
      <OurStorySection />
      <Stats />
      <WhoWeAreSection />
      <WhyChooseSection />
      <VisionSection />
      <CommitmentSection />
    </main>
  );
};

export default AboutPage;
