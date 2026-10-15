"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const capabilities = [
  {
    title: "Frontend Engineering",
    description: "Building scalable, high-performance interfaces with a focus on precision and accessibility.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    accent: "#f15a24"
  },
  {
    title: "Interaction Design",
    description: "Creating fluid, natural motions that guide users through complex digital products.",
    skills: ["Framer Motion", "UX Strategy", "Interface Animation", "Prototyping"],
    accent: "#ffffff"
  },
  {
    title: "Technical Logic",
    description: "Applying algorithmic rigor to frontend challenges for optimal efficiency and stability.",
    skills: ["C++", "Competitive Programming", "Data Structures", "System Design"],
    accent: "#f15a24"
  }
];

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="capabilities" className="capabilities-section py-clamp(120px, 15vw, 200px) px-clamp(40px, 8vw, 100px) bg-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-start">

          {/* Left Side: Capability List */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h2 className="text-clamp(3rem, 6vw, 8rem) font-black uppercase leading-none mb-12 tracking-tighter">
              Capabilities
            </h2>

            <div className="flex flex-col gap-2">
              {capabilities.map((cap, idx) => (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className={`group cursor-pointer transition-all duration-300 p-6 border-l-2 ${
                    activeIndex === idx ? "border-accent bg-zinc-900/50" : "border-zinc-800 hover:border-zinc-600"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className={`text-2xl font-bold uppercase transition-colors ${
                      activeIndex === idx ? "text-white" : "text-zinc-500"
                    }`}>
                      {cap.title}
                    </h3>
                    <span className="text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                      0{idx + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Detail View */}
          <div className="w-full md:w-1/2 relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="flex flex-col gap-8"
              >
                <p className="text-2xl md:text-3xl leading-tight font-medium">
                  {capabilities[activeIndex].description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {capabilities[activeIndex].skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 rounded-full border border-zinc-800 text-sm uppercase tracking-widest font-semibold hover:border-accent transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
