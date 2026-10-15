"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// ─── 12×18 pixel cat — sitting, facing right, tail curling down-left ─────────
// 0 = transparent
// 1 = body (dark charcoal, matches the dark palette)
// 2 = accent green (eyes, inner ear, collar)
// 3 = lighter belly/muzzle
// 4 = nose (pink-ish)
const CAT: number[][] = [
  [0,0,1,1,0,0,1,1,0,0,0,0], // ears row 1
  [0,1,2,1,1,0,1,2,1,0,0,0], // ears inner
  [0,1,1,1,1,1,1,1,1,0,0,0], // top of head
  [0,1,1,1,1,1,1,1,1,0,0,0], // forehead
  [0,1,2,2,1,1,2,2,1,0,0,0], // eyes
  [0,1,1,3,3,1,3,3,1,0,0,0], // muzzle top
  [0,1,1,3,4,3,4,3,1,0,0,0], // nose
  [0,0,1,1,1,1,1,1,0,0,0,0], // chin
  [0,0,2,2,2,2,2,2,0,0,0,0], // collar accent
  [0,0,1,1,1,1,1,1,0,0,0,0], // chest
  [0,1,1,1,1,1,1,1,1,0,0,0], // body wide
  [0,1,1,1,3,3,1,1,1,0,0,0], // belly
  [0,1,1,1,3,3,1,1,1,0,0,0], // belly lower
  [0,1,1,1,1,1,1,1,1,0,0,0], // body base
  [0,0,1,1,0,0,1,1,0,0,0,0], // legs top
  [0,0,1,1,0,0,1,1,0,0,1,0], // legs + tail start
  [0,0,1,1,0,0,1,1,0,1,0,0], // paws + tail curve
  [0,0,1,1,0,0,1,1,1,0,0,0], // paws + tail tip
];

const COLOR_MAP: Record<number, string> = {
  0: "transparent",
  1: "#2a2d2b",   // dark charcoal body
  2: "#c6f19d",   // accent green eyes/collar
  3: "#c8b49a",   // warm belly/muzzle
  4: "#e8a0a0",   // nose
};

type PixelDef = { row: number; col: number; color: number };

function buildPixels(): PixelDef[] {
  const out: PixelDef[] = [];
  for (let r = 0; r < CAT.length; r++)
    for (let c = 0; c < CAT[r].length; c++)
      if (CAT[r][c] !== 0) out.push({ row: r, col: c, color: CAT[r][c] });
  return out;
}
const PIXELS = buildPixels();

interface Props {
  pixelSize?: number;
}

export default function PixelCat({ pixelSize = 8 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pixelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tailRef = useRef<HTMLDivElement[]>([]);

  const W = CAT[0].length;
  const H = CAT.length;

  // separate out tail pixels for individual wag animation
  const tailRows = [15, 16, 17];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pixels = pixelRefs.current.filter(Boolean) as HTMLDivElement[];

    // pop in staggered, rows top→bottom
    gsap.set(pixels, { opacity: 0, scale: 0 });

    const sorted = [...pixels].sort(
      (a, b) => parseInt(a.dataset.row ?? "0") - parseInt(b.dataset.row ?? "0")
    );

    gsap.to(sorted, {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      stagger: { each: 0.006, from: "start" },
      ease: "back.out(1.6)",
      delay: 0.7,
    });

    // tail wag — oscillate the tail rows slightly on x
    const tailPixels = pixels.filter(
      p => tailRows.includes(parseInt(p.dataset.row ?? "-1"))
    );

    gsap.to(tailPixels, {
      x: pixelSize * 0.8,
      duration: 0.55,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 1.4,
      stagger: { each: 0.08, from: "end" },
    });

    // blink — toggle eye pixels opacity
    const eyePixels = pixels.filter(p => {
      const col = parseInt(p.dataset.col ?? "-1");
      const row = parseInt(p.dataset.row ?? "-1");
      return row === 4 && (col === 2 || col === 3 || col === 6 || col === 7);
    });

    const blink = () => {
      gsap.timeline()
        .to(eyePixels, { scaleY: 0.1, duration: 0.06, ease: "power2.in" })
        .to(eyePixels, { scaleY: 1, duration: 0.1, ease: "power2.out" });
    };

    // blink every 3–5 seconds randomly
    const schedBlink = () => {
      const t = 3000 + Math.random() * 2000;
      return setTimeout(() => { blink(); schedBlink(); }, t);
    };
    const blinkTimer = schedBlink();

    return () => clearTimeout(blinkTimer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pixelSize]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: "relative",
        width: W * pixelSize,
        height: H * pixelSize,
        imageRendering: "pixelated",
        userSelect: "none",
        pointerEvents: "none",
      }}
    >
      {PIXELS.map((p, i) => (
        <div
          key={`cat-${p.row}-${p.col}`}
          ref={el => { pixelRefs.current[i] = el; }}
          data-row={p.row}
          data-col={p.col}
          style={{
            position: "absolute",
            top: p.row * pixelSize,
            left: p.col * pixelSize,
            width: pixelSize,
            height: pixelSize,
            background: COLOR_MAP[p.color] ?? "transparent",
            imageRendering: "pixelated",
          }}
        />
      ))}
    </div>
  );
}
