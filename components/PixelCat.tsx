"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

// 12×18 pixel cat — sitting, facing right, tail curling down-left
// 0 = transparent
// 1 = dark charcoal body
// 2 = accent green (eyes, collar)
// 3 = warm belly / muzzle
// 4 = nose
const CAT: number[][] = [
  [0,0,1,1,0,0,1,1,0,0,0,0],
  [0,1,2,1,1,0,1,2,1,0,0,0],
  [0,1,1,1,1,1,1,1,1,0,0,0],
  [0,1,1,1,1,1,1,1,1,0,0,0],
  [0,1,2,2,1,1,2,2,1,0,0,0],
  [0,1,1,3,3,1,3,3,1,0,0,0],
  [0,1,1,3,4,3,4,3,1,0,0,0],
  [0,0,1,1,1,1,1,1,0,0,0,0],
  [0,0,2,2,2,2,2,2,0,0,0,0],
  [0,0,1,1,1,1,1,1,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,0,0,0],
  [0,1,1,1,3,3,1,1,1,0,0,0],
  [0,1,1,1,3,3,1,1,1,0,0,0],
  [0,1,1,1,1,1,1,1,1,0,0,0],
  [0,0,1,1,0,0,1,1,0,0,0,0],
  [0,0,1,1,0,0,1,1,0,0,1,0],
  [0,0,1,1,0,0,1,1,0,1,0,0],
  [0,0,1,1,0,0,1,1,1,0,0,0],
];

const COLOR_MAP: Record<number, string> = {
  0: "transparent",
  1: "#2a2d2b",
  2: "#c6f19d",
  3: "#c8b49a",
  4: "#e8a0a0",
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
const TAIL_ROWS = [15, 16, 17];
const EYE_ROW = 4;
const EYE_COLS = [2, 3, 6, 7];

interface Props {
  pixelSize?: number;
}

export default function PixelCat({ pixelSize = 8 }: Props) {
  const pixelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const W = CAT[0].length;
  const H = CAT.length;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pixels = pixelRefs.current.filter(Boolean) as HTMLDivElement[];
    if (pixels.length === 0) return;

    // pop in row by row
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
      delay: 0.8,
    });

    // tail wag — pixels in the last 3 rows oscillate on x
    const tailPixels = pixels.filter(p =>
      TAIL_ROWS.includes(parseInt(p.dataset.row ?? "-1"))
    );

    if (tailPixels.length > 0) {
      gsap.to(tailPixels, {
        x: pixelSize * 0.9,
        duration: 0.55,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
        stagger: { each: 0.09, from: "end" },
      });
    }

    // blink — eye pixels squash briefly
    const eyePixels = pixels.filter(p => {
      const row = parseInt(p.dataset.row ?? "-1");
      const col = parseInt(p.dataset.col ?? "-1");
      return row === EYE_ROW && EYE_COLS.includes(col);
    });

    if (eyePixels.length > 0) {
      const schedBlink = (): ReturnType<typeof setTimeout> => {
        const delay = 2500 + Math.random() * 2500;
        return setTimeout(() => {
          gsap.timeline()
            .to(eyePixels, { scaleY: 0.1, duration: 0.06, ease: "power2.in" })
            .to(eyePixels, { scaleY: 1, duration: 0.1, ease: "power2.out" });
          schedBlink();
        }, delay);
      };
      const timer = schedBlink();
      return () => clearTimeout(timer);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pixelSize]);

  return (
    <div
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
