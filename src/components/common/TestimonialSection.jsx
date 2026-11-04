'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import AnimatedText from '../utils/AnimatedText';

/* ------------------------------------------------------------------ */
/* PLACEHOLDER testimonials: replace with real client quotes, names    */
/* and companies (with permission) before launch.                      */
/* ------------------------------------------------------------------ */
const ROW_ONE = [
  {
    name: 'Client Name',
    role: 'Procurement Head, Company A',
    text: 'Finding verified US buyers used to take weeks. With this data we shortlisted qualified importers in a single afternoon.',
  },
  {
    name: 'Client Name',
    role: 'Founder, Company B',
    text: 'The HS code and port filters are exactly what we needed. Our sales team now starts every week with fresh, relevant leads.',
  },
  {
    name: 'Client Name',
    role: 'Export Manager, Company C',
    text: 'Clean, reliable shipment records and quick support. It has become part of our daily market research routine.',
  },
  {
    name: 'Client Name',
    role: 'Sourcing Lead, Company D',
    text: "We mapped our competitors' suppliers and found better partners within days. Great value for the price.",
  },
  {
    name: 'Client Name',
    role: 'Director, Company E',
    text: 'Customized reports saved our analysts hours every week. The data is easy to search and easy to trust.',
  },
  {
    name: 'Client Name',
    role: 'CEO, Company F',
    text: 'Real visibility into US trade flows helped us time our shipments and negotiate better with our partners.',
  },
];

const ROW_TWO = [
  {
    name: 'Client Name',
    role: 'Supply Chain Manager, Company G',
    text: 'Identifying key suppliers and tracking trade trends became simple. Our decisions are now driven by data, not guesses.',
  },
  {
    name: 'Client Name',
    role: 'Business Analyst, Company H',
    text: 'Frequent updates and a wide range of filters. It is the most practical trade database we have used.',
  },
  {
    name: 'Client Name',
    role: 'Owner, Company I',
    text: 'As a small business we could finally compete. We found new buyers in the US that we would never have reached otherwise.',
  },
  {
    name: 'Client Name',
    role: 'Trade Consultant, Company J',
    text: 'I recommend it to all my clients. The coverage of bill of lading data is excellent and support is very responsive.',
  },
  {
    name: 'Client Name',
    role: 'Marketing Head, Company K',
    text: 'Targeted outreach to active importers improved our response rate noticeably. Worth every penny.',
  },
  {
    name: 'Client Name',
    role: 'Logistics Director, Company L',
    text: 'Clear, transparent shipment data that helps us plan capacity and spot demand early.',
  },
];

const initials = (name, i) => String.fromCharCode(65 + (i % 26));

function Card({ t, i }) {
  return (
    <figure className="relative flex h-full flex-col rounded-3xl border border-neutral-200 bg-white p-6 shadow-[0_2px_12px_rgba(20,20,60,0.05)]">
      <Quote
        className="absolute right-5 top-5 h-8 w-8 text-[#B31942]/25"
        strokeWidth={1.5}
        aria-hidden="true"
      />
      <div className="flex gap-0.5 text-amber-400" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, k) => (
          <Star key={k} className="h-4 w-4 fill-current" strokeWidth={0} aria-hidden="true" />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-neutral-700">
        “{t.text}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-4">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161] text-sm font-semibold text-white">
          {initials(t.name, i)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-neutral-950">{t.name}</p>
          <p className="truncate text-xs text-neutral-500">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

function ArrowButton({ innerRef, dir }) {
  const Icon = dir === 'prev' ? ChevronLeft : ChevronRight;
  return (
    <button
      ref={innerRef}
      type="button"
      aria-label={dir === 'prev' ? 'Previous testimonials' : 'Next testimonials'}
      className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition hover:border-[#B31942] hover:bg-[#B31942] hover:text-white focus:outline-none focus:ring-4 focus:ring-[#B31942]/30 disabled:opacity-40"
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

/**
 * A normal slider: it rests on the slides, glides to the next ones, and rests
 * again. `reverse` makes it advance in the opposite direction (left to right).
 */
function SliderRow({ items, reverse = false, delay = 3500, animate }) {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation]}
        loop
        speed={5000}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        grabCursor
        // navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
        // onBeforeInit={(swiper) => {
        //   swiper.params.navigation.prevEl = prevRef.current;
        //   swiper.params.navigation.nextEl = nextRef.current;
        // }}
        autoplay={
          animate
            ? {
                delay,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
                reverseDirection: reverse,
              }
            : false
        }
        className="!px-1 !py-3"
      >
        {items.map((t, i) => (
          <SwiperSlide key={i} className="!h-auto">
            <Card t={t} i={i} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default function TestimonialsSection() {
  const [animate, setAnimate] = useState(true);
  // Swiper reads the current time while rendering, which Next.js rejects during
  // prerender. Render the sliders only after mount (client side).
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setAnimate(!mq.matches);
    const on = (e) => setAnimate(!e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#f6f9fe] py-20 lg:py-28">
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600">
          Client Testimonials
        </span>
        {/* <h2 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl">
          Trusted by{" "}
          <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent">
            10k+ businesses
          </span>{" "}
          worldwide
        </h2> */}
        <AnimatedText
          text="Trusted by 10k+ "
          highlight="businesses worldwide"
          className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl"
          delay={0.2}
          stagger={0.08}
          duration={0.7}
        />
        <p className="mt-4 text-base text-neutral-600">
          See what importers, exporters and trade professionals say about our US trade data.
        </p>
      </div>

      {/* two sliders: top moves left, bottom moves right */}
      <div className="relative mx-auto mt-14 max-w-7xl space-y-6 px-6 lg:px-10">
        {mounted ? (
          <>
            <SliderRow items={ROW_ONE} animate={animate} delay={0} />
            <SliderRow items={ROW_TWO} reverse animate={animate} delay={0} />
          </>
        ) : (
          // reserves space so the page doesn't jump when the sliders mount
          <div className="h-[620px]" aria-hidden="true" />
        )}
      </div>
    </section>
  );
}
