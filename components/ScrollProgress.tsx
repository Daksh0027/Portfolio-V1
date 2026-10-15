"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const progress = progressRef.current;
    if (!progress) return;

    gsap.to(progress, {
      scrollTrigger: {
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3
      },
      scaleX: 1,
      transformOrigin: "left center",
      ease: "none"
    });
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "3px",
        zIndex: 9998,
        backgroundColor: "rgba(130, 144, 135, 0.2)"
      }}
    >
      <div
        ref={progressRef}
        style={{
          height: "100%",
          backgroundColor: "#c6f19d",
          transformOrigin: "left center",
          transform: "scaleX(0)"
        }}
      />
    </div>
  );
}
