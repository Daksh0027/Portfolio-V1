"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

type StickyProject = {
  name: string;
  category: string;
  blurb: string;
  url: string;
  images: [string, string, string];
};

function WorkCard({
  project,
  index,
  total,
  progress,
}: {
  project: StickyProject;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const container = useRef<HTMLDivElement>(null);
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div ref={container} className="h-[85vh]">
      <motion.div
        className="works-sticky-card sticky overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        style={{ scale, "--card-offset": `${index * 28}px` } as unknown as React.CSSProperties}
      >
        <div className="flex flex-wrap items-start justify-between gap-4 md:gap-6">
          <div className="flex items-start gap-4 md:gap-8">
            <span className="works-card-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <span className="works-card-category">{project.category}</span>
              <h3 className="works-card-name">{project.name}</h3>
              <p className="works-card-blurb">{project.blurb}</p>
            </div>
          </div>
          <a
            className="works-card-cta"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Project
          </a>
        </div>
        <div className="mt-6 flex gap-4 md:mt-10 md:gap-6">
          <div className="flex w-[40%] flex-col gap-4 md:gap-6">
            <img
              className="h-[clamp(130px,16vw,230px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
              src={project.images[0]}
              alt={`${project.name} preview one`}
              loading="lazy"
            />
            <img
              className="h-[clamp(160px,22vw,340px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
              src={project.images[1]}
              alt={`${project.name} preview two`}
              loading="lazy"
            />
          </div>
          <div className="w-[60%]">
            <img
              className="h-full w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
              src={project.images[2]}
              alt={`${project.name} preview three`}
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function StickyWorks({ projects }: { projects: StickyProject[] }) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="relative">
      {projects.map((project, index) => (
        <WorkCard
          key={project.name}
          project={project}
          index={index}
          total={projects.length}
          progress={scrollYProgress}
        />
      ))}
    </div>
  );
}
