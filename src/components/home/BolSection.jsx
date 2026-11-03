"use client";

import { MotionConfig, motion } from "framer-motion";
import { Activity, Boxes, CalendarCheck, TrendingUp } from "lucide-react";


const CARDS = [
  {
    title: "Up-to-date information",
    text: "Access the latest data on US imports and exports to stay ahead of the competition.",
    tag: "Fresh data",
    Icon: CalendarCheck,
  },
  {
    title: "Market analysis",
    text: "Gain insights into US market trends and consumer behavior to make informed business decisions.",
    tag: "Insights",
    Icon: Activity,
  },
  {
    title: "Access Latest US Trade Trends",
    text: "Get access to the latest import-export trade trends in the US market and adjust your strategies accordingly.",
    tag: "Trends",
    Icon: TrendingUp,
  },
  {
    title: "Improve supply chain management",
    text: "Optimize your supply chain by identifying key US suppliers and trade partners.",
    tag: "Suppliers",
    Icon: Boxes,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};


function Card({ card, index }) {
  const { Icon } = card;

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.article
      variants={item}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      onMouseMove={onMove}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-7 shadow-[0_2px_12px_rgba(20,20,60,0.05)] transition-[border-color,box-shadow] duration-300 hover:border-[#B31942]/60 hover:shadow-[0_4px_6px_rgba(93,186,246,0.25)]"
    >
      {/* spotlight that follows the cursor */}
      {/* <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(93,186,246,0.16), transparent 70%)",
        }}
      /> */}


      <motion.span
        whileHover={{ rotate: [0, -8, 8, 0] }}
        transition={{ duration: 0.5 }}
        className="relative grid h-14 w-14 place-items-center rounded-2xl bg-linear-to-r from-[#B31942] to-[#0A3161] text-white"
      >
        <Icon className="h-7 w-7" strokeWidth={1.8} aria-hidden="true" />
      </motion.span>

      <span className="relative mt-6 inline-flex w-fit rounded-full border border-[#B31942]/30 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B31942]">
        {card.tag}
      </span>

      <h3 className="relative mt-4 text-xl font-semibold leading-snug tracking-tight text-neutral-950">
        {card.title}
      </h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-neutral-600">
        {card.text}
      </p>

      {/* animated underline that grows on hover */}
      <div className="relative mt-6 h-0.5 w-full overflow-hidden rounded-full bg-neutral-100">
        <div className="h-full w-0 rounded-full bg-linear-to-r from-[#B31942] to-[#0A3161] transition-all duration-500 group-hover:w-full" />
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */
export default function BolSection() {
  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden bg-white px-6 py-20 lg:px-10 lg:py-28">
        {/* background decoration */}
        {/* <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(26,26,58,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,58,0.05)_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[70%] -translate-x-1/2 rounded-full bg-[#5DBAF6]/20 blur-3xl" /> */}

        <div className="relative mx-auto max-w-7xl">
          {/* heading */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600">
              Bill of Lading Data
            </span>
            <h2 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-neutral-950 sm:text-5xl">
              Explore great possibilities in US trade with{" "}
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent">
                US Bill of Lading Data
              </span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-neutral-600">
              Discover how our platform helps businesses acquire US shipment
              data, with exclusive US import-export data reports under our B/L
              data.
            </p>
          </motion.div>

          {/* cards */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CARDS.map((c, i) => (
              <Card key={c.title} card={c} index={i} />
            ))}
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}