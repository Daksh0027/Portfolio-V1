"use client";

import { useEffect, useRef } from "react";

export default function OrangeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let frame = 0;
    let startTime = 0;
    let lastFrame = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const paintGlow = (
      centerX: number,
      centerY: number,
      radiusX: number,
      radiusY: number,
      colors: [number, string][],
    ) => {
      context.save();
      context.translate(centerX, centerY);
      context.scale(radiusX / radiusY, 1);
      const gradient = context.createRadialGradient(0, 0, 0, 0, 0, radiusY);
      colors.forEach(([stop, color]) => gradient.addColorStop(stop, color));
      context.fillStyle = gradient;
      context.fillRect(-radiusY, -radiusY, radiusY * 2, radiusY * 2);
      context.restore();
    };

    const draw = (time: number) => {
      if (!reducedMotion.matches && time - lastFrame < 32) {
        frame = window.requestAnimationFrame(draw);
        return;
      }
      lastFrame = time;
      if (!startTime) startTime = time;

      context.clearRect(0, 0, width, height);
      const phase = reducedMotion.matches ? 0 : (time - startTime) / 10000;
      const drift = Math.sin(phase) * width * 0.035;
      const lift = Math.sin(phase * 0.72) * height * 0.018;

      paintGlow(
        width * 0.76 + drift,
        height * 1.04 + lift,
        width * 0.88,
        height * 0.57,
        [
          [0, "rgba(255, 78, 5, 0.98)"],
          [0.4, "rgba(255, 62, 4, 0.86)"],
          [0.72, "rgba(209, 46, 5, 0.56)"],
          [1, "rgba(73, 15, 5, 0)"],
        ],
      );

      paintGlow(
        width * 0.27 - drift * 0.65,
        height * 1.08 - lift * 0.5,
        width * 0.82,
        height * 0.53,
        [
          [0, "rgba(196, 57, 13, 0.68)"],
          [0.48, "rgba(151, 38, 9, 0.52)"],
          [0.78, "rgba(83, 22, 8, 0.22)"],
          [1, "rgba(35, 10, 5, 0)"],
        ],
      );

      if (!reducedMotion.matches) frame = window.requestAnimationFrame(draw);
    };

    resize();
    frame = window.requestAnimationFrame(draw);
    const handleResize = () => {
      resize();
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(draw);
    };
    const handleMotionChange = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(draw);
    };

    window.addEventListener("resize", handleResize);
    reducedMotion.addEventListener("change", handleMotionChange);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
      reducedMotion.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-glow" aria-hidden="true" />;
}
