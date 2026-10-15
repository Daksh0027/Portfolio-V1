"use client";

import BlueprintMap2D from "@/components/BlueprintMap2D";
import { motion } from "framer-motion";
import Link from 'next/link';

export default function MapPage() {
  return (
    <main data-ui="blueprint-map" className="min-h-[100dvh] bg-[#0c0e0d] text-[#f2f5f3] overflow-hidden relative">
      <motion.div
        key="map"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full h-full flex flex-col items-center justify-center relative min-h-[100dvh]"
      >
        <div className="absolute top-8 left-8 z-[100]">
          <Link 
            href="/"
            className="text-[12px] tracking-[0.1em] text-[#829087] hover:text-[#c6f19d] transition-colors uppercase flex items-center gap-2 px-4 py-2 bg-[#131715]"
          >
            <span className="text-sm leading-none -mt-[2px]">←</span> Return Home
          </Link>
        </div>
        <BlueprintMap2D />
      </motion.div>
    </main>
  );
}
