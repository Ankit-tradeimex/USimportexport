"use client";

import dynamic from "next/dynamic";
import TickerBar from "./TickerBar";
import { HiArrowLongRight } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import Stats from "../common/Stats";

// Three.js needs the browser, so skip server rendering for the canvas.
const TradeGlobe = dynamic(() => import("./TradeGlobe"), {
  ssr: false,
  loading: () => <div className="h-full w-full" />,
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-2 pb-10 pt-10 lg:px-4">
        <div className="grid items-center lg:grid-cols-2">
          {/* ---------- left: copy ---------- */}
          <div>
            <span className="inline-flex items-center rounded-full border border-neutral-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-neutral-600">
              Explore the Latest U.S. Trade Trends with US-Importdata
            </span>

            <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tight text-neutral-950 sm:text-6xl lg:text-7xl">
              The Best U.S. <br />Import-Export Trade 
              
              <span className="bg-linear-to-r from-[#B31942] to-[#0A3161] bg-clip-text text-transparent">&nbsp;Data Provider.</span>
            </h1>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-neutral-600">
              As an exclusive product of TradeImeX, USImportdata is a trusted source for US import-export trade data that provides you with complete insights into the US trade activities with its frequently updated US Import-Export database.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact-us" className="inline-flex items-center gap-2 rounded-lg gradient px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2a2a55]">
                Request A Quote
                <span className="text-lg">
                  <HiArrowLongRight/>
                </span>
              </Link>
              <Link href="/data-sample" className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-5 py-3 text-sm font-medium text-neutral-900 transition hover:bg-neutral-50">
                View Sample Data
                <span className="text-lg">
                  <HiArrowLongRight/>
                </span>
              </Link>
            </div>
          </div>

          {/* ---------- right: interactive 3D ---------- */}
          <div className="relative h-[380px] sm:h-[460px] lg:h-[540px]">
            <TradeGlobe/>
            <div className="pointer-events-none absolute bottom-10 right-20 flex flex-col gap-1.5 text-[11px] font-medium text-neutral-600">
              <span className="inline-flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-[#0A3161]" />
                Exports from the U.S.
              </span>
              <span className="inline-flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-[#B31942]" />
                Imports into the U.S.
              </span>
            </div>
          </div>
        </div>

        {/* ---------- bottom: ticker ---------- */}
        <div className="my-6">
          <TickerBar />
        </div>
        <Stats/>




        <div className="grid items-center lg:grid-cols-2 gap-20">
          {/* ---------- left: copy ---------- */}
          <div>

            <p className="mt-6 text-sm leading-relaxed text-neutral-600">
                Our detailed US import data and US export reports contain all import and export records and trade statistics of the USA. Our US Bill of Lading records for import data of the USA and trade data of USA cover all the major trade data fields such as product description, HS code, date of shipment, US exporter/importer details, quantity, port, and more. Access US port data and live US maritime data for goods trade via sea route with our exclusive B/L trade reports for the US.
            </p>
             <p className="mt-6 text-sm leading-relaxed text-neutral-600">
                Being a leading US import-export data provider and a trusted source of US trade statistics, USImportdata helps you to find profitable buyers and suppliers in the USA according to your product needs with our US importers data and US exporters data. Our live US shipment data and import-export data help you target the US market, access our filtered records, and detailed US import-export data by country, HS code, company, product, and port.
            </p>
             <p className="mt-6 text-sm leading-relaxed text-neutral-600">
                We empower businesses to optimize their trade strategies with our US import data and US export statistics by helping to find verified company suppliers & buyers in the US and understand their competitor company’s import-export activities.            
              </p>

            
          </div>

          {/* ---------- right: interactive 3D ---------- */}
          <div className="relative">
            <Image src="/assets/images/navigate.gif" alt="Interactive Navigation" width={500} height={500} />
           
          </div>
        </div>
      </div>
    </section>
  );
}
