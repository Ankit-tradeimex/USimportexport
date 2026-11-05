'use client';

import { motion, useReducedMotion } from 'framer-motion';
import {
  Globe2,
  Ship,
  Plane,
  FileText,
  Search,
  TrendingUp,
  BarChart3,
  Target,
  ArrowUpRight,
  CheckCircle2,
  Container,
  Anchor,
} from 'lucide-react';
import Image from 'next/image';
import AnimatedText from '../utils/AnimatedText';

const benefits = [
  {
    icon: TrendingUp,
    title: 'Discover New Opportunities',
    description:
      'Identify potential buyers, suppliers, and high-growth markets using reliable US trade data.',
  },
  {
    icon: Globe2,
    title: 'Expand Into Global Markets',
    description:
      'Explore international trade connections and discover new opportunities for business growth.',
  },
  {
    icon: BarChart3,
    title: 'Make Data-Driven Decisions',
    description:
      'Analyze shipment trends, trade volumes, and market activity to build smarter strategies.',
  },
  {
    icon: Target,
    title: 'Reach the Right Customers',
    description:
      'Find relevant importers and exporters to make your marketing and sales efforts more effective.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.13,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function TradeDataSection() {
  const shouldReduceMotion = useReducedMotion();

  const reveal = shouldReduceMotion
    ? {}
    : {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, amount: 0.2 },
      };

  return (
    <section className="relative overflow-hidden bg-white pb-28 dark:bg-slate-950">
      {/* dark mode only: faint grid + colored glows behind the glass */}
      <div className="pointer-events-none absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
        <div className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-[#4da3ff]/20 blur-[110px]" />
        <div className="absolute right-[8%] top-[35%] h-72 w-72 rounded-full bg-[#ff4d6d]/15 blur-[110px]" />
        <div className="absolute bottom-0 right-[30%] h-64 w-64 rounded-full bg-[#4da3ff]/15 blur-[110px]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-10">
        {/* LEFT: Animated illustration */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: -45 }}
          whileInView={shouldReduceMotion ? {} : { opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
          className="relative mx-auto w-full max-w-[570px] dark:rounded-3xl dark:border dark:border-white/10 dark:bg-white/5 dark:p-3 dark:shadow-[0_8px_40px_rgba(0,0,0,0.4)] dark:backdrop-blur-xl"
        >
          <Image
            src="/assets/images/statistics.gif"
            alt="Trade Data Illustration"
            width={570}
            height={400}
            className="w-full dark:rounded-2xl"
            priority
          />
        </motion.div>

        {/* RIGHT: Content */}
        <motion.div variants={containerVariants} {...reveal} className="flex flex-col">
          <motion.div variants={itemVariants} className="mb-2">
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600 dark:border-white/10 dark:bg-white/5 dark:text-sky-200 dark:backdrop-blur">
              Your Gateway to Comprehensive US Trade Data
            </span>
          </motion.div>

          {/* <h2
            variants={itemVariants}
             className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 sm:text-6xl">
              Exclusive US {" "} <br />
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent">
                Trade Statistics
              </span>
            </h2> */}

          <AnimatedText
            text="Exclusive US"
            highlight="Trade Statistics"
            className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 dark:text-white sm:text-5xl"
            delay={0.2}
            stagger={0.08}
            duration={0.7}
          />

          <motion.p
            variants={itemVariants}
            className="mt-6 text-[15px] leading-relaxed text-neutral-600 dark:text-slate-400"
          >
            We at USImportdata provide exclusive statistics that are included in the US trade
            records. These statistics cover exclusive information related to US trade activities.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-8 grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  whileHover={shouldReduceMotion ? {} : { y: -5, scale: 1.015 }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.035)] transition-colors hover:border-red-200 hover:bg-red-50/40 sm:p-5 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] dark:backdrop-blur-xl dark:hover:border-white/25 dark:hover:bg-white/10"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-[#B31942] transition-colors group-hover:bg-linear-to-r from-[#B31942] to-[#0A3161] group-hover:text-white dark:bg-white/10 dark:text-[#ff7a90] dark:to-[#4da3ff]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="font-heading text-base font-bold text-slate-900 dark:text-white">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
