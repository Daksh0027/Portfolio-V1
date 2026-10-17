"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const amberBlob = "/assets/icons/F0RoVtlXTGm2j1Rhm6JnyBF7Sw%20copy.svg";
const amberWave = "/assets/icons/uvugLNhQjNtygFy7Ntap6SiMNlQ%20copy.svg";

export default function AmberFlow() {
  const flowRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLImageElement>(null);
  const waveRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const flow = flowRef.current;
    const blob = blobRef.current;
    const wave = waveRef.current;
    if (!flow || !blob || !wave) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      gsap.set([blob, wave], { transformOrigin: "50% 50%" });

      if (reducedMotion) return;

      gsap.timeline({ repeat: -1, yoyo: true })
        .to(blob, { xPercent: 2.5, yPercent: -1.5, scale: 1.035, duration: 2.8, ease: "sine.inOut" })
        .to(wave, { xPercent: -2, yPercent: 2, scale: 1.045, duration: 3.6, ease: "sine.inOut" }, "<");

      gsap.to(flow, {
        yPercent: -1.2,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, flow);

    return () => context.revert();
  }, []);

  return (
    <div ref={flowRef} className="amber-flow" aria-hidden="true">
      <img ref={blobRef} className="amber-flow-blob" src={amberBlob} alt="" />
      <img ref={waveRef} className="amber-flow-wave" src={amberWave} alt="" />
    </div>
  );
}
