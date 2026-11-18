import ClientNetworkSection from '@/components/clients/ClientNetworkSection';
import ClientsHero from '@/components/clients/ClientsHero';
import ExpertiseSection from '@/components/clients/ExpertiseSection';
import QualitySection from '@/components/clients/QualitySection';
import SupportsSection from '@/components/clients/SuppportsSection';
import React from 'react';

const ClientsPage = () => {
  return (
    <main>
      <ClientsHero />
      <ExpertiseSection />
      <ClientNetworkSection />
      <SupportsSection />
      <QualitySection />
    </main>
  );
};

export default ClientsPage;
