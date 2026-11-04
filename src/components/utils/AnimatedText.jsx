'use client';

import { motion, useReducedMotion } from 'framer-motion';

export default function AnimatedText({
  text,
  highlight = '',
  className = '',
  as = 'h2',
  delay = 0,
  stagger = 0.06,
  duration = 0.55,
  gradientClassName = 'bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent dark:from-[#ff5a73] dark:to-[#5dbaf6]',
  once = true,
}) {
  const shouldReduceMotion = useReducedMotion();

  const MotionTag = motion[as] || motion.h2;

  const words = [
    ...text
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({
        word,
        gradient: false,
      })),
    ...highlight
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => ({
        word,
        gradient: true,
      })),
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: stagger,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      filter: 'blur(5px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial={shouldReduceMotion ? false : 'hidden'}
      whileInView={shouldReduceMotion ? undefined : 'visible'}
      viewport={{
        once,
        amount: 0.4,
      }}
      aria-label={`${text} ${highlight}`.trim()}
    >
      <span aria-hidden="true">
        {words.map((item, index) => (
          <motion.span
            key={`${item.word}-${index}`}
            variants={wordVariants}
            className={`mr-[0.25em] inline-block ${item.gradient ? gradientClassName : ''}`}
          >
            {item.word}
          </motion.span>
        ))}
      </span>
    </MotionTag>
  );
}
