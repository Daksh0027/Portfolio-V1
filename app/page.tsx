"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollProgress from "@/components/ScrollProgress";
import PixelCat from "@/components/PixelCat";
import Marquee from "@/components/Marquee";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#";

function useScramble(target: string, trigger: boolean, delay = 0) {
  const [display, setDisplay] = useState(target);
  useEffect(() => {
    if (!trigger) return;
    let iter = 0;
    const id = setTimeout(() => {
      const iv = setInterval(() => {
        iter += 1;
        setDisplay(
          target.split("").map((ch, i) => {
            if (ch === " ") return " ";
            if (i < iter / 1.5) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );
        if (iter >= target.length * 1.8) {
          clearInterval(iv);
          setDisplay(target);
        }
      }, 28);
      return () => clearInterval(iv);
    }, delay);
    return () => clearTimeout(id);
  }, [trigger, target, delay]);
  return display;
}

function AnimatedCounter({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const num = parseInt(value.replace(/\D/g, ""), 10);
    if (isNaN(num)) {
      let iter = 0;
      const iv = setInterval(() => {
        iter++;
        setDisplay(
          value.split("").map((ch, i) => {
            if (i < iter / 1.2) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          }).join("")
        );
        if (iter >= value.length * 2) { clearInterval(iv); setDisplay(value); }
      }, 35);
      return () => clearInterval(iv);
    }
    const prefix = value.replace(/[\d,]+.*/, "");
    const suffix2 = value.replace(/^[^0-9]*[\d,]+/, "");
    let start = 0;
    const total = 60;
    const iv = setInterval(() => {
      start++;
      const v = Math.round((start / total) * num);
      setDisplay(prefix + v + suffix2);
      if (start >= total) { clearInterval(iv); setDisplay(value); }
    }, 18);
    return () => clearInterval(iv);
  }, [visible, value]);

  return (
    <div ref={ref}>
      <div className="stat-number text-3xl md:text-5xl font-bold text-[#c6f19d]" style={{ fontVariantNumeric: "tabular-nums" }}>
        {display}
      </div>
      <p className="mt-3 text-sm text-[#829087]">{label}</p>
    </div>
  );
}

export default function Portfolio() {
  const monumentRef = useRef<HTMLHeadingElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);
  const [catPixelSize, setCatPixelSize] = useState(9);
  const [catTransform, setCatTransform] = useState({ x: 0, y: 0 });

  const heroTagline = useScramble(
    "Frontend developer and competitive programmer building load-bearing web systems in Delhi.",
    heroVisible,
    200
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const h1 = monumentRef.current;
    if (!h1) return;

    const positionCat = () => {
      const fontSize = parseFloat(getComputedStyle(h1).fontSize);
      const px = Math.max(4, Math.round(fontSize / 16));
      setCatPixelSize(px);
      const catH = 18 * px;
      const capTopOffset = (0.88 - 0.72) / 2 * fontSize;
      const y = capTopOffset - catH + px * 2;
      const x = px * 2;
      setCatTransform({ x, y });
    };

    positionCat();
    window.addEventListener("resize", positionCat);
    const fontTimer = setTimeout(positionCat, 300);
    return () => {
      window.removeEventListener("resize", positionCat);
      clearTimeout(fontTimer);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.from(".animate-rise", {
        y: 32,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out"
      });

      if (monumentRef.current) {
        gsap.from(monumentRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: "power4.out"
        });
      }

      sectionsRef.current.forEach((section) => {
        if (!section) return;
        const elements = section.querySelectorAll(".animate-rise, .animate-rise-1, .animate-rise-2, .animate-rise-3");
        gsap.from(elements, {
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 20%",
            toggleActions: "play none none none"
          },
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out"
        });
      });

      const statElements = document.querySelectorAll(".stat-number");
      statElements.forEach((stat) => {
        gsap.from(stat, {
          scrollTrigger: {
            trigger: stat,
            start: "top 85%"
          },
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          ease: "back.out(1.7)"
        });
      });

      document.querySelectorAll("h2[data-wipe]").forEach((heading) => {
        gsap.fromTo(
          heading,
          { backgroundSize: "0% 3px" },
          {
            backgroundSize: "100% 3px",
            duration: 0.9,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: heading,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      const emailLink = document.querySelector('[data-email]');
      if (emailLink) {
        emailLink.addEventListener('mouseenter', () => {
          gsap.to(emailLink, { scale: 1.02, duration: 0.3, ease: "power2.out" });
        });
        emailLink.addEventListener('mouseleave', () => {
          gsap.to(emailLink, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeroVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const addToSectionsRef = (el: HTMLElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="w-full bg-[#0c0e0d] text-[#f2f5f3]">
      <ScrollProgress />
      <header className="sticky top-0 z-50 w-full bg-[#0c0e0d]/95 backdrop-blur-sm border-b border-[#1b201d] px-6 md:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <a href="#hero" className="text-base font-semibold tracking-tight text-[#f2f5f3] hover:text-[#c6f19d] transition-colors">
            Daksh Shastri
          </a>
          <span className="hidden sm:inline-block text-sm text-[#829087]">
            Delhi, India · Available for Engineering Roles
          </span>
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <a href="#work" className="text-[#829087] hover:text-[#f2f5f3] transition-colors">
            Work
          </a>
          <a href="#credentials" className="text-[#829087] hover:text-[#f2f5f3] transition-colors">
            Record
          </a>
          <a href="#contact" className="text-[#829087] hover:text-[#c6f19d] transition-colors">
            Contact
          </a>
        </nav>
      </header>

      <main className="w-full">
        {/* HERO */}
        <section id="hero" ref={heroRef} className="min-h-[92dvh] px-6 md:px-12 flex flex-col justify-between pt-12 pb-16">
          <div className="max-w-3xl">
            <p className="text-xl md:text-2xl text-[#f2f5f3] font-normal leading-relaxed animate-rise">
              {heroTagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 items-center animate-rise-1">
              <a
                href="#work"
                className="px-6 py-3 bg-[#c6f19d] text-[#0c0e0d] text-sm font-semibold tracking-wide hover:bg-[#ffffff] transition-colors"
              >
                Inspect Selected Work
              </a>
              <a
                href="#contact"
                className="px-6 py-3 bg-[#141715] text-[#f2f5f3] text-sm font-medium hover:bg-[#1b201d] transition-colors"
              >
                Send Message
              </a>
            </div>
          </div>

          <div className="mt-16 md:mt-24 flex items-end gap-6 md:gap-10">
            <div className="relative">
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 10,
                  transform: `translate(${catTransform.x}px, ${catTransform.y}px)`,
                }}
              >
                <PixelCat pixelSize={catPixelSize} />
              </div>

              <h1 ref={monumentRef} className="text-[clamp(3.5rem,13vw,12.5rem)] font-bold tracking-[-0.04em] leading-[0.88] text-[#f2f5f3] select-none break-words">
                DAKSH<br />SHASTRI
              </h1>
            </div>
          </div>
        </section>

        <Marquee
          items={["React", "Next.js", "TypeScript", "C++", "Competitive Programming", "BPIT Delhi", "Frontend Engineering", "Node.js", "Appwrite", "MySQL"]}
          speed={30}
        />

        {/* INTRO & STATS */}
        <section ref={addToSectionsRef} className="px-6 md:px-12 py-24 bg-[#141715]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            <div className="md:col-span-6 animate-rise">
              <h2 data-wipe className="text-[clamp(2.25rem,4.5vw,4.5rem)] font-bold tracking-tight leading-[1.02] text-[#f2f5f3]"
                style={{
                  backgroundImage: "linear-gradient(#c6f19d, #c6f19d)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 100%",
                  backgroundSize: "0% 3px",
                  paddingBottom: 4,
                }}
              >
                Algorithmic Rigor in Production
              </h2>
            </div>
            <div className="md:col-span-6 animate-rise-1">
              <p className="text-lg md:text-xl text-[#f2f5f3] leading-relaxed">
                Information Technology undergraduate at Bhagwan Parshuram Institute of Technology and front-end development intern at Shree Ji Facility Services. Translating contest-grade problem solving into responsive, accessible web architecture.
              </p>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-12 animate-rise-2">
            <AnimatedCounter value="CF Pupil" label="Codeforces Competitive Rating" />
            <AnimatedCounter value="Rank 222" label="LeetCode Weekly Contest 451 (Global)" />
            <AnimatedCounter value="Rank 295" label="CodeChef Starters 190 (Global)" />
            <AnimatedCounter value="Intern"   label="Frontend at Shree Ji Facility Services" />
          </div>
        </section>

        <Marquee
          items={["Selected Work", "Open Source", "Production Interfaces", "Algorithms", "ReSpectro", "Gemini Clone", "Python Systems", "Live Demos Available"]}
          speed={22}
          accent
        />

        {/* WORK */}
        <section ref={addToSectionsRef} id="work" className="px-6 md:px-12 py-24 bg-[#141715]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 animate-rise">
            <div>
              <h2 data-wipe className="text-[clamp(2.5rem,6vw,6rem)] font-bold tracking-tight text-[#f2f5f3] leading-none"
                style={{
                  backgroundImage: "linear-gradient(#c6f19d, #c6f19d)",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "0 100%",
                  backgroundSize: "0% 3px",
                  paddingBottom: 4,
                }}
              >
                Selected Work
              </h2>
              <p className="mt-4 text-base md:text-lg text-[#f2f5f3]">
                Production interfaces, conversational AI clients, and scalable transactional engines.
              </p>
            </div>
            <a
              href="https://github.com/Daksh0027"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#c6f19d] hover:underline"
            >
              All Repositories on GitHub →
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* ReSpectro */}
            <div className="lg:col-span-12 bg-[#0c0e0d] p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center animate-rise-1 border border-[#1b201d] hover:border-[#2a302d] transition-colors">
              <div className="md:col-span-6 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-3xl font-bold text-[#f2f5f3]">
                    ReSpectro <span className="text-sm font-normal text-[#829087] ml-2">2025–2026</span>
                  </h3>
                  <p className="text-base text-[#829087] mt-1 font-medium">Movie Streaming & Discovery Platform</p>
                  <p className="text-base text-[#f2f5f3] mt-6 leading-relaxed">
                    Responsive movie discovery and catalog streaming platform built with React and Vite. Integrated with TMDB API for live data feeds, Clerk for authentication, and Appwrite backend for user watchlists.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="text-sm px-3 py-1 bg-[#1b201d] text-[#f2f5f3]">React</span>
                    <span className="text-sm px-3 py-1 bg-[#1b201d] text-[#f2f5f3]">Vite</span>
                    <span className="text-sm px-3 py-1 bg-[#1b201d] text-[#f2f5f3]">Appwrite</span>
                    <span className="text-sm px-3 py-1 bg-[#1b201d] text-[#f2f5f3]">TMDB API</span>
                  </div>
                </div>
                <div className="mt-8">
                  <a
                    href="https://respectro.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-5 py-2.5 bg-[#1b201d] text-sm text-[#c6f19d] hover:bg-[#c6f19d] hover:text-[#0c0e0d] font-semibold transition-colors"
                  >
                    Open Live Demo →
                  </a>
                </div>
              </div>

              <div className="md:col-span-6 bg-[#141715] p-5">
                <div className="flex items-center justify-between pb-3 text-sm text-[#829087]">
                  <span>respectro.vercel.app</span>
                  <span className="text-[#c6f19d]">Streaming Live</span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  <div className="bg-[#1b201d] p-4">
                    <div className="text-sm font-bold text-[#f2f5f3]">Dune: Part Two</div>
                    <div className="text-sm text-[#829087] mt-1">Sci-Fi · 8.6 Rating</div>
                  </div>
                  <div className="bg-[#1b201d] p-4">
                    <div className="text-sm font-bold text-[#f2f5f3]">Oppenheimer</div>
                    <div className="text-sm text-[#829087] mt-1">History · 8.9 Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gemini Clone */}
            <div className="lg:col-span-6 bg-[#0c0e0d] p-8 flex flex-col justify-between animate-rise-2 border border-[#1b201d] hover:border-[#2a302d] transition-colors">
              <div>
                <h3 className="text-2xl font-bold text-[#f2f5f3]">
                  Gemini Clone <span className="text-sm font-normal text-[#829087] ml-2">2025–Present</span>
                </h3>
                <p className="text-sm text-[#829087] mt-1 font-medium">Conversational AI Agent Interface</p>
                <p className="text-base text-[#f2f5f3] mt-4 leading-relaxed">
                  Clean frontend clone of Google Gemini built in React with minimalist CSS architecture. Fully functional and driven by live Gemini API streaming completions with session history handling.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="text-sm px-3 py-1 bg-[#1b201d] text-[#f2f5f3]">React</span>
                  <span className="text-sm px-3 py-1 bg-[#1b201d] text-[#f2f5f3]">Gemini API</span>
                  <span className="text-sm px-3 py-1 bg-[#1b201d] text-[#f2f5f3]">CSS</span>
                </div>

                <div className="mt-6 bg-[#141715] p-4 text-sm">
                  <div className="text-sm text-[#829087] mb-2">Prompt Input Stream</div>
                  <p className="text-sm text-[#f2f5f3] bg-[#0c0e0d] p-3">
                    Analyze time complexity of topological sorting on directed acyclic graph.
                  </p>
                </div>
              </div>
              <div className="mt-8 pt-6">
                <a
                  href="https://bot-clone.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2.5 bg-[#1b201d] text-sm text-[#c6f19d] hover:bg-[#c6f19d] hover:text-[#0c0e0d] font-semibold transition-colors"
                >
                  Open Live Demo →
                </a>
              </div>
            </div>

            {/* Library System */}
            <div className="lg:col-span-6 bg-[#0c0e0d] p-8 flex flex-col justify-between animate-rise-3 border border-[#1b201d] hover:border-[#2a302d] transition-colors">
              <div>
                <h3 className="text-2xl font-bold text-[#f2f5f3]">
                  Library System <span className="text-sm font-normal text-[#829087] ml-2">2024</span>
                </h3>
                <p className="text-sm text-[#829087] mt-1 font-medium">Inventory & Sales Ledger Engine</p>
                <p className="text-base text-[#f2f5f3] mt-4 leading-relaxed">
                  Scalable store management system in Python and MySQL. Handles multi-branch inventory tracking, sales recording, and automated receipt validation through an interactive command-line interface.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="text-sm px-3 py-1 bg-[#1b201d] text-[#f2f5f3]">Python</span>
                  <span className="text-sm px-3 py-1 bg-[#1b201d] text-[#f2f5f3]">MySQL</span>
                  <span className="text-sm px-3 py-1 bg-[#1b201d] text-[#f2f5f3]">CLI</span>
                </div>

                <div className="mt-6 bg-[#141715] p-4 text-sm">
                  <div className="text-sm text-[#829087] mb-2">SQL Transaction Schema</div>
                  <pre className="text-sm text-[#c6f19d] bg-[#0c0e0d] p-3 overflow-x-auto">
                    <code>SELECT id, stock FROM inventory WHERE branch_id = 1;</code>
                  </pre>
                </div>
              </div>
              <div className="mt-8 pt-6">
                <a
                  href="https://github.com/Daksh0027"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2.5 bg-[#1b201d] text-sm text-[#c6f19d] hover:bg-[#c6f19d] hover:text-[#0c0e0d] font-semibold transition-colors"
                >
                  View Source Repository →
                </a>
              </div>
            </div>
          </div>
        </section>

        <Marquee
          items={["Verified Record", "Competitive Programming", "Technical Competencies", "Certifications", "Hackathons", "CTF Contests", "Academic Background"]}
          speed={26}
        />

        {/* CREDENTIALS */}
        <section ref={addToSectionsRef} id="credentials" className="px-6 md:px-12 py-24 bg-[#141715]">
          <div className="mb-16 animate-rise">
            <h2 data-wipe className="text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-tight text-[#f2f5f3] leading-none"
              style={{
                backgroundImage: "linear-gradient(#c6f19d, #c6f19d)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "0 100%",
                backgroundSize: "0% 3px",
                paddingBottom: 4,
              }}
            >
              Verified Technical Record
            </h2>
            <p className="mt-4 text-base md:text-lg text-[#f2f5f3]">
              Languages, frameworks, competitive milestones, and certifications.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-rise-1">
            <div>
              <h3 className="text-xl font-bold text-[#f2f5f3] mb-6">Technical Competencies</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-[#0c0e0d] border border-[#1b201d]">
                  <span className="text-base font-medium text-[#f2f5f3]">Languages</span>
                  <span className="text-sm text-[#829087]">C++, C, C#, Python, JavaScript, TypeScript</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#0c0e0d] border border-[#1b201d]">
                  <span className="text-base font-medium text-[#f2f5f3]">Frontend Architecture</span>
                  <span className="text-sm text-[#829087]">React, Next.js, Vite, Tailwind CSS, HTML & CSS</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#0c0e0d] border border-[#1b201d]">
                  <span className="text-base font-medium text-[#f2f5f3]">Backend & Storage</span>
                  <span className="text-sm text-[#829087]">Node.js, Django, Flask, MySQL, Appwrite</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#0c0e0d] border border-[#1b201d]">
                  <span className="text-base font-medium text-[#f2f5f3]">DevOps & Tooling</span>
                  <span className="text-sm text-[#829087]">Git, GitHub, Vercel, Netlify, Linux</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#f2f5f3] mb-6">Contest & Achievement Record</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-[#0c0e0d] border border-[#1b201d]">
                  <span className="text-base text-[#f2f5f3]">LeetCode Weekly Contest 451</span>
                  <span className="text-sm font-semibold text-[#c6f19d]">Global Rank 222</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#0c0e0d] border border-[#1b201d]">
                  <span className="text-base text-[#f2f5f3]">CodeChef Starters 190</span>
                  <span className="text-sm font-semibold text-[#c6f19d]">Global Rank 295</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#0c0e0d] border border-[#1b201d]">
                  <span className="text-base text-[#f2f5f3]">Codeforces</span>
                  <span className="text-sm font-semibold text-[#c6f19d]">Pupil Division</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#0c0e0d] border border-[#1b201d]">
                  <span className="text-base text-[#f2f5f3]">Smart India Hackathon &apos;24</span>
                  <span className="text-sm text-[#829087]">Qualified to Mentor Round</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#0c0e0d] border border-[#1b201d]">
                  <span className="text-base text-[#f2f5f3]">Cyber Security CTF at MAIT</span>
                  <span className="text-sm text-[#829087]">13th Place</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-[#0c0e0d] border border-[#1b201d]">
                  <span className="text-base text-[#f2f5f3]">IP Addressing & Subnetting</span>
                  <span className="text-sm text-[#829087]">GeeksforGeeks Certification</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section ref={addToSectionsRef} id="contact" className="min-h-[85dvh] px-6 md:px-12 py-24 bg-[#0c0e0d] flex flex-col justify-between">
          <div className="animate-rise">
            <p className="text-xl md:text-2xl text-[#f2f5f3] max-w-xl font-normal leading-relaxed">
              Open for engineering roles, technical internships, and collaborative software projects. Based in Delhi — available worldwide.
            </p>
          </div>

          <div className="my-16 animate-rise-1">
            <a
              data-email
              href="mailto:dakshshastri0627@gmail.com"
              className="block text-[clamp(1.75rem,5.5vw,5.5rem)] font-bold text-[#f2f5f3] hover:text-[#c6f19d] transition-colors tracking-tight break-all"
            >
              dakshshastri0627@gmail.com
            </a>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-12 animate-rise-2">
            <div className="flex items-center gap-6 text-sm font-medium">
              <a
                href="https://github.com/Daksh0027"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f2f5f3] hover:text-[#c6f19d] transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://leetcode.com/u/Daksh0027"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f2f5f3] hover:text-[#c6f19d] transition-colors"
              >
                LeetCode
              </a>
              <a
                href="https://www.codechef.com/users/gam_pearl_90"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f2f5f3] hover:text-[#c6f19d] transition-colors"
              >
                CodeChef
              </a>
            </div>

            <div className="text-sm text-[#829087]">
              <span>Delhi, India · 2026</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
