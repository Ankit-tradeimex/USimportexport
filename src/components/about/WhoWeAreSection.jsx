'use client';
import { MotionConfig, motion } from 'framer-motion';
import { ShieldCheck, UserCheck, Zap } from 'lucide-react';

const CONTENT = {
  title: 'Who We Are and',
  accent: 'What We Do',
  intro:
    'USimportdata is a renowned and dependable provider of US import-export data, providing complete and actual-time insights into the USA market. With 7+ years of experience within the industry, we’ve established ourselves as a trusted source of trade data for groups of all sizes, from small agencies to multinational agencies. At USimportdata, we apprehend the importance of data-pushed choice-making in the ultra-modern competitive commercial enterprise landscape. Our platform offers an extensive variety of offerings to help businesses navigate the complexities of the US trade, which include:',
  years: { value: '8+', label: 'Years of experience' },
};

const OFFERINGS = [
  {
    Icon: ShieldCheck,
    title: 'Accurate US Trade Data Analysis',
    text: 'Our team of experts compiles and analyzes vast amounts of US import-export data from various reliable sources to provide our clients with accurate and actionable insights. Whether you need information on market trends, competitor analysis, or regulatory changes, USimportdata has got you covered. With USimportdata, you will get hassle-free and easy access to accurate US trade data.',
    tone: 'red',
  },
  {
    Icon: UserCheck,
    title: 'Personalized Data',
    text: 'We are aware that each business has different demands and specifications in the US. That’s why we offer personalized data tailored to your US market, industry, and business goals. Our reports are easy to understand, visually engaging, and packed with valuable insights to help you make informed decisions. Our personalized US trade data helps you thrive in your business with confidence.',
    tone: 'blue',
  },
  {
    Icon: Zap,
    title: 'Immediate results',
    text: 'Time is of the essence in the hectic world of global trade. With USimportdata, you can access quick updates on US trade data, market trends, and regulatory changes to stay ahead of the curve. Our platform is constantly updated with the latest information, ensuring that you always have the most current US import-export information at your fingertips.',
    tone: 'red',
  },
];

const TONES = {
  red: {
    bar: 'from-[#B31942] to-[#ff4d6d]',
    icon: 'from-[#B31942] to-[#ff4d6d]',
    num: 'text-[#B31942]/10 dark:text-[#ff8da0]/15',
    glow: 'from-[#B31942]/10 dark:from-[#ff4d6d]/20',
  },
  blue: {
    bar: 'from-[#0A3161] to-[#4da3ff]',
    icon: 'from-[#0A3161] to-[#4da3ff]',
    num: 'text-[#0A3161]/10 dark:text-[#7cc4ff]/15',
    glow: 'from-[#0A3161]/10 dark:from-[#4da3ff]/20',
  },
};

export default function WhoWeAreSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl">
          {/* top: heading + intro */}
          <div className="grid items-start gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
                {CONTENT.title}{' '}
                <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                  {CONTENT.accent}
                </span>
              </h2>

              <div className="mt-7 inline-flex items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl">
                <span className="bg-linear-to-br from-[#B31942] to-[#0A3161] bg-clip-text text-5xl font-bold leading-none text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                  {CONTENT.years.value}
                </span>
                <span className="text-sm font-semibold leading-snug text-slate-700 dark:text-white/80">
                  {CONTENT.years.label}
                  <br />
                  <span className="font-normal text-slate-500 dark:text-white/55">
                    in US trade data
                  </span>
                </span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="border-l-2 border-[#B31942]/40 pl-6 text-base leading-[1.85] text-slate-600 sm:text-lg dark:border-[#ff8da0]/40 dark:text-white/70"
            >
              {CONTENT.intro}
            </motion.p>
          </div>

          {/* offerings */}
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {OFFERINGS.map(({ Icon, title, text, tone }, i) => {
              const t = TONES[tone];
              return (
                <motion.article
                  key={title}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:shadow-none dark:backdrop-blur-xl"
                >
                  <span
                    className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br ${t.icon} text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="relative mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                    {title}
                  </h3>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-slate-600 dark:text-white/70">
                    {text}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
