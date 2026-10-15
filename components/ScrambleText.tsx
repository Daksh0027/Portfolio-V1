"use client";

import { useEffect, useRef, useState } from "react";

import React from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

interface Props {
  text: string;
  className?: string;
  delay?: number;
  tag?: keyof React.JSX.IntrinsicElements;
}

export default function ScrambleText({ text, className, delay = 0, tag: Tag = "span" }: Props) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const iterRef = useRef(0);

  useEffect(() => {
    let started = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          observer.disconnect();

          setTimeout(() => {
            iterRef.current = 0;
            frameRef.current = setInterval(() => {
              iterRef.current += 1;
              setDisplay(
                text
                  .split("")
                  .map((char, idx) => {
                    if (char === " ") return " ";
                    if (idx < iterRef.current / 1.2) return char;
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                  })
                  .join("")
              );
              if (iterRef.current >= text.length * 1.5) {
                clearInterval(frameRef.current!);
                setDisplay(text);
              }
            }, 30);
          }, delay);
        }
      },
      { threshold: 0.3 }
    );

    const el = document.querySelector(`[data-scramble="${text.slice(0, 12)}"]`);
    if (el) observer.observe(el);

    return () => {
      observer.disconnect();
      if (frameRef.current) clearInterval(frameRef.current);
    };
  }, [text, delay]);

  return (
    <Tag
      data-scramble={text.slice(0, 12)}
      className={className}
      aria-label={text}
    >
      {display}
    </Tag>
  );
}
