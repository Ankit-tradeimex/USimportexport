'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Database } from 'lucide-react';
import AiSearchBar from '../common/AiSearchBar';
import SearchSection from '../common/SearchSection';

const SEARCH_MODES = [
  {
    id: 'ai',
    label: 'AI Search',
    icon: Sparkles,
  },
  {
    id: 'live',
    label: 'Search Live Data',
    icon: Database,
  },
];

export default function SearchToggle() {
  const [activeMode, setActiveMode] = useState('live');

  return (
    <section className="relative overflow-hidden bg-[#f6f9fe] px-5 py-12 transition-colors duration-300 dark:bg-[#0b1120] sm:px-6 lg:py-16">
      {/* Search mode toggle */}
      <div className="relative z-10 mx-auto mb-8 flex w-fit items-center rounded-full border border-neutral-200 bg-white p-1.5 shadow-[0_8px_30px_rgba(15,40,100,0.08)] dark:border-white/10 dark:bg-slate-900 dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
        {SEARCH_MODES.map((mode) => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;

          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => setActiveMode(mode.id)}
              aria-pressed={isActive}
              className={`relative cursor-pointer inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors duration-300 sm:px-7 ${
                isActive
                  ? 'text-white'
                  : 'text-neutral-600 hover:text-neutral-950 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="search-mode-active"
                  className="absolute inset-0 rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161] shadow-md dark:from-[#B31942] dark:to-[#0A3161]"
                  transition={{
                    type: 'spring',
                    stiffness: 350,
                    damping: 30,
                  }}
                />
              )}

              <span className="relative z-10 inline-flex items-center gap-2">
                <Icon size={17} />
                {mode.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search component */}
      <div className="relative z-10 mx-auto w-full">
        <AnimatePresence mode="wait" initial={false}>
          {activeMode === 'ai' ? (
            <motion.div
              key="ai-search"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <AiSearchBar />
            </motion.div>
          ) : (
            <motion.div
              key="live-search"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <SearchSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
