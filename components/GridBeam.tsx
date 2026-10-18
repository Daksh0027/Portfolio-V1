"use client";

import { useEffect, useRef } from "react";

export default function GridBeam() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const beam = beamRef.current;
    if (!overlay || !beam) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      beam.style.display = "none";
      return;
    }

    let centers: number[] = [];
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let boost = 0.35;
    let targetBoost = 0.35;
    let raf = 0;

    const measure = () => {
      centers = Array.from(
        overlay.querySelectorAll<HTMLSpanElement>(".grid-beam-line"),
      )
        .filter((line) => line.offsetParent !== null)
        .map((line) => line.offsetLeft + line.offsetWidth / 2);
      targetX = centers[Math.min(2, centers.length - 1)] ?? 0;
    };

    const updateTargetY = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      targetY = progress * window.innerHeight;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (centers.length === 0) return;
      const overlayLeft = overlay.getBoundingClientRect().left;
      let best = 0;
      let bestDist = Infinity;
      centers.forEach((center, index) => {
        const distance = Math.abs(center + overlayLeft - event.clientX);
        if (distance < bestDist) {
          bestDist = distance;
          best = index;
        }
      });
      targetX = centers[best];
      targetBoost = 1;
    };

    const onPointerLeave = () => {
      targetBoost = 0.35;
    };

    const tick = () => {
      x += (targetX - x) * 0.08;
      y += (targetY - y) * 0.12;
      boost += (targetBoost - boost) * 0.06;
      beam.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      beam.style.opacity = boost.toFixed(3);
      raf = requestAnimationFrame(tick);
    };

    const onResize = () => {
      measure();
      updateTargetY();
    };

    measure();
    updateTargetY();
    x = targetX;
    y = targetY;
    window.addEventListener("scroll", updateTargetY, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", updateTargetY);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div ref={overlayRef} className="grid-beam-overlay" aria-hidden="true">
      <span className="grid-beam-line" />
      <span className="grid-beam-line" />
      <span className="grid-beam-line" />
      <span className="grid-beam-line" />
      <span className="grid-beam-line" />
      <span className="grid-beam-line" />
      <span ref={beamRef} className="grid-beam" />
    </div>
  );
}
