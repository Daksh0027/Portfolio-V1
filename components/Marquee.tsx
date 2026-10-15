"use client";

// Infinite horizontal ticker — pure CSS, zero JS
interface Props {
  items: string[];
  speed?: number; // seconds per full loop
  accent?: boolean;
}

export default function Marquee({ items, speed = 28, accent = false }: Props) {
  const repeated = [...items, ...items, ...items]; // triple for seamless loop

  return (
    <div
      style={{
        overflow: "hidden",
        width: "100%",
        borderTop: "1px solid #1b201d",
        borderBottom: "1px solid #1b201d",
        padding: "14px 0",
        background: accent ? "#141715" : "transparent",
      }}
      aria-hidden="true"
    >
      <div
        style={{
          display: "flex",
          gap: 0,
          animation: `marquee-scroll ${speed}s linear infinite`,
          willChange: "transform",
          whiteSpace: "nowrap",
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: accent ? "#c6f19d" : "#829087",
              paddingRight: 0,
            }}
          >
            {item}
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: 4,
                background: accent ? "#c6f19d" : "#1b201d",
                margin: "0 24px",
                flexShrink: 0,
              }}
            />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-scroll { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
