'use client';

import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo';
import ContactForm from '@/components/contact/ContactForm';
import React from 'react';
import ContactMap from '@/components/contact/ContactMap';

const ContactPage = () => {
  return (
    <main>
      <ContactHero />
      <section className="px-4 pb-20 sm:pb-24">
        <div className="mx-auto grid w-full max-w-7xl items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
          <ContactInfo />
          <ContactForm />
        </div>
      </section>
      <ContactMap />
    </main>
  );
};

export default ContactPage;
