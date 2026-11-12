"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AmberFlow from "@/components/AmberFlow";
import Capabilities from "@/components/Capabilities";
import StickyWorks from "@/components/StickyWorks";
import SplineRobot from "@/components/SplineRobot";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const stickyProjects: {
  name: string;
  category: string;
  blurb: string;
  url: string;
  images: [string, string, string];
}[] = [
  {
    name: "Greppa",
    category: "AI / DevTools",
    blurb:
      "Large-repository code intelligence engine. Indexes codebases with tree-sitter AST parsing into a symbol graph, ranks files with PageRank centrality, and answers questions via hybrid retrieval and a multi-step agent loop with file/line citations. FastAPI, Next.js 14, PostgreSQL/pgvector, Redis, Gemini.",
    url: "https://github.com/Daksh0027",
    images: [
      "/assets/Greppa/Screenshot 2026-10-19 201844.png",
      "/assets/Greppa/Screenshot 2026-10-19 203308.png",
      "/assets/Greppa/Screenshot 2026-10-19 203620.png",
    ],
  },
  {
    name: "OmniDocs",
    category: "AI / SaaS",
    blurb:
      "Multi-document RAG chat platform. Ingests PDFs/DOCX with OCR fallback and Gemini embeddings, combining vector and full-text search with reranking, streaming answers, and cross-document comparison tables. FastAPI, Next.js, Clerk, PostgreSQL/pgvector, Redis.",
    url: "https://github.com/Daksh0027",
    images: [
      "/assets/Omni/Screenshot 2026-10-19 205557.png",
      "/assets/Omni/Screenshot 2026-10-19 205711.png",
      "/assets/Omni/Screenshot 2026-10-19 205732.png",
    ],
  },
  {
    name: "Respectro",
    category: "Client",
    blurb:
      "Movie and TV discovery app on the TMDB API, built with React 19, Vite and Tailwind CSS 4. Parallel search, genre and media-type filters, infinite scroll, Clerk authentication and Appwrite-backed trending-search analytics.",
    url: "https://respectro.vercel.app/",
    images: [
      "/assets/images/Screenshot_2026-10-17_223843.png",
      "/assets/images/Screenshot_2026-10-17_223921.png",
      "/assets/images/image copy.png",
    ],
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com/Daksh0027" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/daksh-shastri-5728b924a" },
  { label: "LeetCode", href: "https://leetcode.com/u/Daksh0027" },
  { label: "CodeChef", href: "https://www.codechef.com/users/gam_pearl_90" },
  { label: "Codeforces", href: "https://codeforces.com/profile/Daksh0027" },
];

export default function Portfolio() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showWorks, setShowWorks] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);
  const menuPanelRef = useRef<HTMLElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const menuWasOpenRef = useRef(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reducedMotion) {
        setShowWorks(true);
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-grid-line", {
          scaleY: 0,
          transformOrigin: "bottom center",
          duration: 1.1,
          stagger: 0.14,
        }, 0)
        .fromTo(".site-wordmark",
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55 },
          0.25)
        .fromTo(".hero-nav-links a",
          { y: -12, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.09 },
          "-=0.35")
        .fromTo("[data-hero-word]",
          { y: 42, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85 },
          "-=0.25")
        .fromTo("[data-hero-copy]",
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65 },
          "-=0.42")
        .call(() => setShowWorks(true), [], "+=0.2");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 26,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: element, start: "top 88%", once: true },
        });
      });
    }, page);

    return () => context.revert();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 80) {
        nav.classList.add("is-scrolled");
      } else {
        nav.classList.remove("is-scrolled");
      }
      if (y > lastY + 2 && y > 140) {
        nav.classList.add("is-hidden");
      } else if (y < lastY - 2 || y <= 140) {
        nav.classList.remove("is-hidden");
      }
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    if (menuOpen) {
      menuWasOpenRef.current = true;
      nav.classList.remove("is-hidden");
      nav.classList.add("is-scrolled");
      document.body.style.overflow = "hidden";
      const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") setMenuOpen(false);
      };
      document.addEventListener("keydown", onKeyDown);
      const focusTimer = window.setTimeout(() => {
        menuPanelRef.current?.querySelector("a")?.focus({ preventScroll: true });
      }, 420);
      return () => {
        document.removeEventListener("keydown", onKeyDown);
        window.clearTimeout(focusTimer);
        document.body.style.overflow = "";
      };
    }
    nav.classList.remove("is-scrolled");
    if (menuWasOpenRef.current) {
      menuButtonRef.current?.focus({ preventScroll: true });
      menuWasOpenRef.current = false;
    }
    return undefined;
  }, [menuOpen]);

  useEffect(() => {
    const fit = () => {
      document.querySelectorAll<HTMLElement>("[data-fit-text]").forEach((title) => {
        const container = title.parentElement;
        if (!container) return;
        const style = getComputedStyle(container);
        const available = container.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        title.style.padding = "0 0 0.16em";
        title.style.width = "max-content";
        title.style.fontSize = "10px";
        const textWidth = title.getBoundingClientRect().width;
        if (textWidth > 0 && available > 0) {
          title.style.fontSize = `${(10 * available * 0.978) / textWidth}px`;
        }
        title.style.width = "100%";
      });
    };

    fit();
    window.addEventListener("resize", fit);
    document.fonts?.ready.then(fit);
    return () => window.removeEventListener("resize", fit);
  }, [showWorks]);

  return (
    <div ref={pageRef} className="portfolio-page">
      <AmberFlow />
      <header
        ref={navRef}
        className={`site-nav${menuOpen ? " menu-open" : ""}`}
        data-nav
      >
        <a className="site-wordmark" href="#top" aria-label="Daksh Shastri, home">
          <span>D</span>
          <span className="wordmark-expand">AKSH</span>
          <span className="wordmark-gap">&nbsp;</span>
          <span>S</span>
          <span className="wordmark-expand">HASTRI</span>
        </a>
        <nav className="hero-nav-links" aria-label="Main navigation">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#connect">Connect</a>
        </nav>
        <button
          ref={menuButtonRef}
          data-testid="menu-toggle-button"
          className={`menu-button${menuOpen ? " is-open" : ""}`}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>
      <button
        type="button"
        data-testid="menu-backdrop"
        className={`menu-backdrop${menuOpen ? " is-open" : ""}`}
        aria-hidden="true"
        tabIndex={-1}
        onClick={closeMenu}
      />
      <nav
        ref={menuPanelRef}
        id="site-menu"
        data-testid="site-menu-panel"
        className={`menu-panel${menuOpen ? " is-open" : ""}`}
        aria-label="Main navigation"
        aria-hidden={!menuOpen}
        inert={!menuOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) setMenuOpen(false);
        }}
      >
        <a data-testid="menu-link-works" href="#projects" onClick={closeMenu}>
          <span className="menu-link-index" aria-hidden="true">01</span>
          Selected work
        </a>
        <a data-testid="menu-link-services" href="#skills" onClick={closeMenu}>
          <span className="menu-link-index" aria-hidden="true">02</span>
          Skills
        </a>
        <a data-testid="menu-link-connect" href="#connect" onClick={closeMenu}>
          <span className="menu-link-index" aria-hidden="true">03</span>
          Connect
        </a>
        <div className="menu-foot">
          <div className="menu-socials" data-testid="menu-social-links">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label}</a>
            ))}
          </div>
          <a className="menu-email" data-testid="menu-email-link" href="mailto:dakshshastri0627@gmail.com">dakshshastri0627@gmail.com</a>
        </div>
      </nav>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-grid-lines" aria-hidden="true">
            <span className="hero-grid-line" />
            <span className="hero-grid-line" />
            <span className="hero-grid-line" />
            <span className="hero-grid-line" />
          </div>
          <h1 id="hero-title" className="hero-name" data-hero-word data-fit-text aria-label="Daksh Shastri">
            {"DAKSH SHASTRI".split(" ").map((word, wordIndex) => (
              <span className="hero-word" key={`word-${wordIndex}`} aria-hidden="true">
                {word.split("").map((letter, index) => (
                  <span key={`${wordIndex}-${index}`}>{letter}</span>
                ))}
              </span>
            ))}
          </h1>
          <div className="hero-content" data-hero-copy>
            <p className="hero-statement">Thoughtful interfaces for the real world.</p>
            <div className="hero-meta">
              <span>© 2026</span>
              <span>Based in Delhi, India</span>
              <span>Frontend Developer</span>
            </div>
          </div>
        </section>

        <section id="projects" className="works-section" aria-labelledby="works-title" style={{ opacity: showWorks ? 1 : 0, transition: 'opacity 0.5s ease' }}>
          <div className="works-heading" data-reveal>
            <h2 id="works-title" data-fit-text>Selected Works</h2>
          </div>
          <StickyWorks projects={stickyProjects} />
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <div className="section-grid" aria-hidden="true" />
          <h2 id="about-title" className="about-display" data-reveal data-fit-text>About Daksh</h2>
          <div className="about-roles" data-reveal aria-label="A few things about me">
            <span>Student</span>
            <span>Developer</span>
            <span>Problem solver</span>
            <span>Delhi, India</span>
          </div>
          <div className="about-inner">
            <div className="about-portrait" data-reveal aria-label="3D Robot">
              <SplineRobot />
              <span className="about-portrait-caption">Daksh Shastri<br />Frontend developer</span>
            </div>
            <div className="about-copy" data-reveal>
              <p>
                I build thoughtful, high-performance interfaces where complex ideas feel clear and natural to use.
              </p>
              <p>
                I’m pursuing a B.Tech in Information Technology and bring the same precision I’ve developed through
                competitive programming to frontend engineering, interaction, and accessibility.
              </p>
              <div className="about-facts">
                <div><span className="label">Academic</span><strong>Information Technology · 2024–2028</strong></div>
                <div><span className="label">Focus</span><strong>Frontend Engineering &amp; Interaction Design</strong></div>
                <div><span className="label">Location</span><strong>Delhi, India</strong></div>
              </div>
              <div className="achievement-list">
                <div><strong>Specialist</strong><span className="label">Codeforces</span></div>
                <div><strong>222</strong><span className="label">LeetCode · Contest 451</span></div>
                <div><strong>295</strong><span className="label">CodeChef · Starters 190</span></div>
              </div>
            </div>
          </div>
          <div className="about-capabilities" data-reveal>
            <Capabilities />
          </div>
          <p className="about-footnote" data-reveal>
            Smart India Hackathon ’24 · Cyber Security CTF · Public Relations Associate
          </p>
        </section>

        <section id="connect" className="contact-section" aria-labelledby="contact-title">
          <div className="section-grid" aria-hidden="true" />
          <h2 id="contact-title" data-reveal data-fit-text>Get in Touch</h2>
          <div className="contact-whispers" aria-hidden="true">
            <span>Let&apos;s chat</span>
            <span>Let&apos;s chat</span>
            <span>Let&apos;s chat</span>
            <span>Let&apos;s chat</span>
            <span>Let&apos;s chat</span>
          </div>
          <div className="contact-bottom">
            <a
              className="contact-cta"
              data-testid="contact-download-cta"
              href="/portfolio-source.zip"
              download="daksh-shastri-portfolio-source.zip"
            >
              <span className="contact-cta-label">Book Discovery Call</span>
            </a>
            <a
              className="contact-cta"
              data-testid="contact-resume-cta"
              href="https://drive.google.com/file/d/1CCIZ3fWyfG24rsKEB9FVKVQ3k0JlDCH_/view?usp=drive_link"
              target="_blank"
              rel="noreferrer"
            >
              <span className="contact-cta-label">Download Resume</span>
            </a>
            <span className="contact-cta-note" data-testid="contact-download-note">
              Downloads this portfolio&apos;s full source code (zip)
            </span>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a className="footer-name" href="#top" aria-label="Daksh Shastri, back to top">Daksh<br />Shastri</a>
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#connect">Connect</a>
        </nav>
        <a className="footer-email" href="mailto:dakshshastri0627@gmail.com">dakshshastri0627@gmail.com</a>
        <div className="footer-bottom">
          <span className="copyright">© 2026 Daksh Shastri</span>
          <div className="social-links" aria-label="Social profiles">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label}</a>
            ))}
            <a
              data-testid="footer-resume-link"
              href="https://drive.google.com/file/d/1CCIZ3fWyfG24rsKEB9FVKVQ3k0JlDCH_/view?usp=drive_link"
              target="_blank"
              rel="noreferrer"
            >
              Resume ↓
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
