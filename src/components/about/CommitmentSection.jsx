'use client';
import { useEffect, useState } from 'react';
import { MotionConfig, motion, useReducedMotion } from 'framer-motion';
import { SlidersHorizontal, Target, Timer, Users } from 'lucide-react';

const CONTENT = {
  title: 'The commitment of USimportdata',
  accent: 'to US trade data',
  text: 'At USimportdata, we are devoted to excellence in everything we do. This commitment is meditated within the excellence of our US trade data, the reliability of our platform, and the extent of the data details we offer to our clients. USimportdata is the leading US trade data provider - we’re a trusted partner in supporting our clients navigate the complexities of US trade. Our determination to accuracy, reliability, and excellence sets us apart from the opposition and permits our customers to make knowledgeable selections with confidence.',
};

const PILLARS = [
  {
    Icon: Target,
    title: 'Accuracy',
    text: 'Our US trade data is sourced directly from customs authorities, ensuring that you receive the most reliable information available.',
    grad: 'from-[#B31942] to-[#7a1033]',
    glow: 'shadow-[0_24px_60px_rgba(179,25,66,0.35)]',
  },
  {
    Icon: Timer,
    title: 'Timeliness',
    text: 'We update our database in real-time, so you can access the latest trade data whenever you need it.',
    grad: 'from-[#0A3161] to-[#1c5fb0]',
    glow: 'shadow-[0_24px_60px_rgba(10,49,97,0.35)]',
  },
  {
    Icon: SlidersHorizontal,
    title: 'Customization',
    text: 'We offer customized data solutions to meet your specific business needs, giving you the flexibility to focus on what matters most',
    grad: 'from-[#B31942] to-[#7a1033]',
    glow: 'shadow-[0_24px_60px_rgba(179,25,66,0.35)]',
  },
  {
    Icon: Users,
    title: 'Expertise',
    text: 'Our team of data analysts and industry experts are here to help you understand the numbers and provide valuable insights into the USA market trends and opportunities.',
    grad: 'from-[#0A3161] to-[#1c5fb0]',
    glow: 'shadow-[0_24px_60px_rgba(10,49,97,0.35)]',
  },
];

export default function CommitmentSection() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setActive((i) => (i + 1) % PILLARS.length), 4500);
    return () => clearInterval(t);
  }, [reduce, paused]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto w-full max-w-7xl">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <h2 className="text-3xl font-semibold leading-[1.12] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
              {CONTENT.title}{' '}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff8da0] dark:to-[#7cc4ff]">
                {CONTENT.accent}
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-white/70">
              {CONTENT.text}
            </p>
          </motion.div>

          {/* expanding pillars */}
          <div
            className="mt-12 flex flex-col gap-4 lg:h-[420px] lg:flex-row"
            onMouseLeave={() => setPaused(false)}
          >
            {PILLARS.map(({ Icon, title, text, grad, glow }, i) => {
              const on = active === i;
              return (
                <motion.button
                  key={title}
                  type="button"
                  aria-pressed={on}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  onMouseEnter={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                  onFocus={() => {
                    setActive(i);
                    setPaused(true);
                  }}
                  onClick={() => setActive(i)}
                  className={`group relative overflow-hidden rounded-3xl border p-6 text-left transition-all duration-500 ease-out sm:p-7 lg:flex lg:flex-col lg:justify-between ${
                    on ? 'lg:flex-[2.6]' : 'lg:flex-1'
                  } ${
                    on
                      ? `border-transparent bg-linear-to-br text-white ${grad} ${glow}`
                      : 'border-slate-200 bg-white text-slate-900 shadow-sm hover:border-slate-300 dark:border-white/10 dark:bg-transparent dark:bg-linear-to-br dark:from-white/[0.12] dark:to-white/[0.03] dark:text-white dark:shadow-none dark:backdrop-blur-xl'
                  }`}
                >
                  {/* decorative grid on active */}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(ellipse_80%_80%_at_100%_0%,black,transparent)] transition-opacity duration-500 ${
                      on ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* top: icon + number */}
                  <div className="relative flex items-start justify-between">
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-colors duration-500 ${
                        on ? 'bg-white/20 text-white' : `bg-linear-to-br text-white ${grad}`
                      }`}
                    >
                      <Icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                  </div>

                  <div className="relative mt-8 lg:mt-0">
                    <h3 className="text-2xl font-semibold">{title}</h3>
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out lg:max-h-0 lg:opacity-0 ${
                        on ? 'lg:max-h-48 lg:opacity-100' : ''
                      }`}
                    >
                      <p
                        className={`mt-3 text-[15px] leading-relaxed lg:min-w-[300px] ${
                          on
                            ? 'text-white/85'
                            : 'text-slate-600 dark:text-white/70 lg:text-white/85'
                        }`}
                      >
                        {text}
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
