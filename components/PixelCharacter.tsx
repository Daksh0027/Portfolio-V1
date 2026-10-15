"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 16×16 programmer sprite
// 0 = transparent | 1 = skin | 2 = dark (hair/pants) | 3 = accent green | 4 = blue shirt | 5 = dark shirt
const SPRITE: number[][] = [
  [0,0,0,0,0,2,2,2,2,2,2,0,0,0,0,0],
  [0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],
  [0,0,2,2,1,1,1,1,1,1,1,1,2,2,0,0],
  [0,0,2,1,1,1,1,1,1,1,1,1,1,2,0,0],
  [0,0,2,1,2,2,1,1,1,1,2,2,1,2,0,0],
  [0,0,2,1,1,1,1,1,1,1,1,1,1,2,0,0],
  [0,0,2,1,1,3,1,1,1,1,3,1,1,2,0,0],
  [0,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],
  [0,0,4,4,4,4,4,4,4,4,4,4,4,4,0,0],
  [0,1,4,4,4,4,4,4,4,4,4,4,4,4,1,0],
  [0,1,4,4,5,3,3,3,3,3,3,5,4,4,1,0],
  [0,1,4,4,5,5,4,4,4,4,5,5,4,4,1,0],
  [0,0,0,5,5,5,5,5,5,5,5,5,5,0,0,0],
  [0,0,2,2,0,0,2,2,2,2,0,0,2,2,0,0],
  [0,0,2,2,0,0,2,2,2,2,0,0,2,2,0,0],
  [0,0,3,3,0,0,3,3,3,3,0,0,3,3,0,0],
];

const COLOR_MAP: Record<number, string> = {
  0: "transparent",
  1: "#e8c9a0",
  2: "#1a1a2e",
  3: "#c6f19d",
  4: "#2a5caa",
  5: "#1e3a6e",
};

type PixelDef = { row: number; col: number; color: number };

function buildPixels(): PixelDef[] {
  const out: PixelDef[] = [];
  for (let r = 0; r < SPRITE.length; r++)
    for (let c = 0; c < SPRITE[r].length; c++)
      if (SPRITE[r][c] !== 0) out.push({ row: r, col: c, color: SPRITE[r][c] });
  return out;
}
const PIXELS = buildPixels();

interface Props {
  /** pixel size of each cell */
  pixelSize?: number;
  /** if true: fully assembled on mount with pop-in, no scroll build */
  inline?: boolean;
}

export default function PixelCharacter({ pixelSize = 12, inline = false }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pixelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);
  const speechRef = useRef<HTMLDivElement>(null);

  const W = SPRITE[0].length;
  const H = SPRITE.length;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const pixels = pixelRefs.current.filter(Boolean) as HTMLDivElement[];

    if (inline) {
      // ── INLINE MODE: pop in assembled, stagger rows fast ──────────────────
      gsap.set(pixels, { opacity: 0, scale: 0 });
      gsap.set([labelRef.current, speechRef.current], { opacity: 0 });

      const sorted = [...pixels].sort(
        (a, b) => parseInt(a.dataset.row ?? "0") - parseInt(b.dataset.row ?? "0")
      );

      const tl = gsap.timeline({ delay: 0.5 });

      tl.to(sorted, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        stagger: { each: 0.008, from: "start" },
        ease: "back.out(1.5)",
      })
        .to(
          speechRef.current,
          { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.5)" },
          "-=0.1"
        )
        .to(labelRef.current, { opacity: 1, duration: 0.25 }, "-=0.05");

      // idle bob
      gsap.to(containerRef.current, {
        y: -6,
        duration: 1.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.2,
      });
    } else {
      // ── SCROLL MODE: pixels assemble as page scrolls ──────────────────────
      gsap.set(pixels, { opacity: 0, scale: 0 });
      gsap.set([labelRef.current, speechRef.current], { opacity: 0, scale: 0.7 });

      const sorted = [...pixels].sort(
        (a, b) => parseInt(a.dataset.row ?? "0") - parseInt(b.dataset.row ?? "0")
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      tl.to(sorted, {
        opacity: 1, scale: 1,
        duration: 0.6,
        stagger: { each: 0.015, from: "start" },
        ease: "back.out(1.4)",
      }, 0)
        .to(labelRef.current,   { opacity: 1, y: 0, scale: 1, duration: 0.3 }, 0.65)
        .to(speechRef.current,  { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, 0.82);

      gsap.to(containerRef.current, {
        y: -6, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut",
      });
    }
  }, [inline]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        userSelect: "none",
        pointerEvents: "none",
        flexShrink: 0,
      }}
    >
      {/* Speech bubble */}
      <div
        ref={speechRef}
        style={{
          background: "#c6f19d",
          color: "#0c0e0d",
          fontSize: 10,
          fontWeight: 700,
          padding: "5px 10px 18px",
          lineHeight: 1.4,
          maxWidth: 130,
          textAlign: "center",
          clipPath: "polygon(0 0, 100% 0, 100% 72%, 60% 72%, 50% 100%, 40% 72%, 0 72%)",
          letterSpacing: "0.03em",
          transformOrigin: "bottom center",
          marginBottom: 2,
        }}
      >
        HELLO WORLD!
        <br />
        <span style={{ fontSize: 8, opacity: 0.65 }}>{ inline ? "ready to code" : "scroll → full form" }</span>
      </div>

      {/* Sprite */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: W * pixelSize,
          height: H * pixelSize,
          imageRendering: "pixelated",
        }}
      >
        {PIXELS.map((p, i) => (
          <div
            key={`${p.row}-${p.col}`}
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

      {/* Name tag */}
      <div
        ref={labelRef}
        style={{
          marginTop: 4,
          fontSize: 9,
          fontWeight: 700,
          color: "#c6f19d",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          fontFamily: "monospace",
        }}
      >
        DAKSH.EXE
      </div>

      {/* Shadow */}
      <div
        style={{
          width: W * pixelSize * 0.55,
          height: 4,
          background: "radial-gradient(ellipse, rgba(198,241,157,0.2) 0%, transparent 70%)",
          marginTop: 2,
        }}
      />
    </div>
  );
}
