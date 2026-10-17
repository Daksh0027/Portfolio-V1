"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AmberFlow from "@/components/AmberFlow";
import Capabilities from "@/components/Capabilities";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    name: "ReSpectro",
    category: "Entertainment",
    year: "2025",
    url: "https://respectro.vercel.app/",
    description:
      "A movie and series discovery platform with live TMDB data, Clerk authentication, and Appwrite-powered watchlists.",
    technologies: "React · Vite · Appwrite · TMDB",
    preview: "respectro",
  },
  {
    name: "Gemini Clone",
    category: "AI / Productivity",
    year: "2025",
    url: "https://bot-clone.netlify.app/",
    description:
      "A responsive AI interface with live Gemini API responses, streaming output, and conversation history.",
    technologies: "React · Gemini API · CSS",
    preview: "gemini",
  },
  {
    name: "Library System",
    category: "Operations / CLI",
    year: "2024",
    url: "https://github.com/Daksh0027",
    description:
      "A Python and MySQL management system for inventory, sales records, and store operations.",
    technologies: "Python · MySQL",
    preview: "library",
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com/Daksh0027" },
  { label: "LeetCode", href: "https://leetcode.com/u/Daksh0027" },
  { label: "CodeChef", href: "https://www.codechef.com/users/gam_pearl_90" },
  { label: "Codeforces", href: "https://codeforces.com" },
];

function ProjectArtwork({ kind }: { kind: string }) {
  if (kind === "respectro") {
    return (
      <div className="project-artwork respectro-art" data-ui="project-preview">
        <div className="art-topbar">
          <span className="art-brand">ReSpectro</span>
          <span>Discover</span>
          <span>Movies</span>
          <span>Series</span>
          <span className="art-avatar">D</span>
        </div>
        <div className="respectro-content">
          <p>Find your next favourite</p>
          <strong>Stories worth<br />staying up for.</strong>
          <div className="art-poster-row" aria-hidden="true">
            <span className="poster poster-one" />
            <span className="poster poster-two" />
            <span className="poster poster-three" />
            <span className="poster poster-four" />
          </div>
        </div>
      </div>
    );
  }

  if (kind === "gemini") {
    return (
      <div className="project-artwork gemini-art" data-ui="project-preview">
        <div className="gemini-sidebar">
          <span className="gemini-mark">G</span>
          <span>＋</span>
          <span>◷</span>
        </div>
        <div className="gemini-content">
          <span className="gemini-greeting">Hello, Daksh</span>
          <strong>Start with<br />an idea.</strong>
          <div className="gemini-prompt">Ask anything <span>↑</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-artwork library-art" data-ui="project-preview">
      <div className="library-topbar"><strong>Library System</strong><span>Inventory</span><span>Sales</span><span>Reports</span></div>
      <div className="library-content">
        <p>Inventory overview</p>
        <strong>Keep every<br />record in order.</strong>
        <div className="library-table" aria-hidden="true">
          <span /><span /><span />
          <span /><span /><span />
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}

const lightLinePositions = [19, 40, 60, 80, 99.7];

function FallingLineLights() {
  const lineRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lines = lineRefs.current;
    const timers: number[] = [];

    const clearTimers = () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };

    const schedule = (index: number, delay: number) => {
      timers[index] = window.setTimeout(() => {
        lines[index]?.classList.add("is-falling");
      }, delay);
    };

    const handleAnimationEnd = (index: number) => {
      lines[index]?.classList.remove("is-falling");
      if (!reducedMotion.matches) schedule(index, 1600 + Math.random() * 4400);
    };
    const animationEndHandlers = lines.map(
      (_, index) => () => handleAnimationEnd(index),
    );

    const onMotionPreferenceChange = () => {
      clearTimers();
      lines.forEach((line, index) => {
        line?.classList.remove("is-falling");
        if (!reducedMotion.matches) schedule(index, Math.random() * 3000);
      });
    };

    lines.forEach((line, index) => {
      line?.addEventListener("animationend", animationEndHandlers[index]);
      if (!reducedMotion.matches) schedule(index, Math.random() * 3000);
    });
    reducedMotion.addEventListener("change", onMotionPreferenceChange);

    return () => {
      clearTimers();
      reducedMotion.removeEventListener("change", onMotionPreferenceChange);
      lines.forEach((line, index) => {
        line?.removeEventListener("animationend", animationEndHandlers[index]);
        line?.classList.remove("is-falling");
      });
    };
  }, []);

  return (
    <div className="hero-light-lines" aria-hidden="true">
      {lightLinePositions.map((position, index) => (
        <span
          key={position}
          ref={(line) => { lineRefs.current[index] = line; }}
          className="hero-light-streak"
          style={{ left: `${position}%` }}
        />
      ))}
    </div>
  );
}

export default function Portfolio() {
  const pageRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reducedMotion) return;

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from("[data-nav]", { y: -16, opacity: 0, duration: 0.6 })
        .from("[data-hero-word]", { y: 42, opacity: 0, duration: 0.85 }, "-=0.18")
        .from("[data-hero-copy]", { y: 22, opacity: 0, duration: 0.65 }, "-=0.42");

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
    const title = document.querySelector<HTMLElement>(".hero-name");
    if (!title) return;

    const fit = () => {
      title.style.padding = "0";
      title.style.width = "max-content";
      title.style.fontSize = "10px";
      const container = title.parentElement;
      if (!container) return;
      const textWidth = title.offsetWidth;
      const available = container.clientWidth;
      if (textWidth > 0 && available > 0) {
        title.style.fontSize = `${(10 * available) / textWidth}px`;
      }
    };

    fit();
    window.addEventListener("resize", fit);
    document.fonts?.ready.then(fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div ref={pageRef} className="portfolio-page">
      <AmberFlow />
      <header className="site-nav" data-nav>
        <a className="site-wordmark" href="#top" aria-label="Daksh Shastri, home">DS</a>
        <nav className="hero-nav-links" aria-label="Main navigation">
          <a href="#works">Work</a>
          <a href="#capabilities">Services</a>
          <a href="#contact">Connect</a>
        </nav>
        <button
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
        <nav
          id="site-menu"
          className={`menu-panel${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
          aria-hidden={!menuOpen}
          inert={!menuOpen}
          onKeyDown={(event) => {
            if (event.key === "Escape") setMenuOpen(false);
          }}
        >
          <a href="#works" onClick={closeMenu}>Selected work</a>
          <a href="#capabilities" onClick={closeMenu}>Services</a>
          <a href="#contact" onClick={closeMenu}>Connect</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section" aria-labelledby="hero-title">
          <FallingLineLights />
          <div className="hero-grid-lines" aria-hidden="true">
            <span className="hero-grid-line" />
            <span className="hero-grid-line" />
            <span className="hero-grid-line" />
            <span className="hero-grid-line" />
          </div>
          <h1 id="hero-title" className="hero-name" data-hero-word aria-label="Daksh Shastri">
            {"DAKSH SHASTRI".split("").map((letter, index) => (
              <span key={`${letter}-${index}`} aria-hidden="true">{letter === " " ? "\u00a0" : letter}</span>
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

        <section id="works" className="works-section" aria-labelledby="works-title">
          <div className="works-heading" data-reveal>
            <h2 id="works-title">Selected Works</h2>
            <p>Useful things, built with care.</p>
          </div>
          <div className="works-index" aria-hidden="true">
            {projects.map((project) => <span key={project.name}>{project.category}</span>)}
            <span>Recent projects</span>
          </div>
          <div className="project-list">
            {projects.map((project) => {
              // Map project preview to case study slug
              const slug = project.preview === "respectro" ? "respectro" :
                           project.preview === "gemini" ? "gemini-clone" :
                           "library-system";

              return (
                <article className="project-row" key={project.name} data-reveal>
                  <a
                    className={`project-image project-image-${project.preview}`}
                    href={`/works/${slug}`}
                    aria-label={`Open ${project.name}`}
                  >
                    <ProjectArtwork kind={project.preview} />
                    <span className="project-open" aria-hidden="true">↗</span>
                  </a>
                  <div className="project-info">
                    <div className="project-copy">
                      <div className="project-title-line">
                        <h3>{project.name}</h3>
                        <span className="project-year">{project.year}</span>
                      </div>
                      <p>{project.description}</p>
                    </div>
                    <div className="project-meta">
                      <span className="project-category">{project.category}</span>
                      <span className="project-tech">{project.technologies}</span>
                      <a href={`/works/${slug}`}>View project <span>↗</span></a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <div className="section-grid" aria-hidden="true" />
          <h2 id="about-title" className="about-display" data-reveal>About Daksh</h2>
          <div className="about-roles" data-reveal aria-label="A few things about me">
            <span>Student</span>
            <span>Developer</span>
            <span>Problem solver</span>
            <span>Delhi, India</span>
          </div>
          <div className="about-inner">
            <div className="about-portrait" data-reveal aria-label="Daksh Shastri monogram">
              <span className="about-monogram" aria-hidden="true">DS</span>
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

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div className="section-grid" aria-hidden="true" />
          <h2 id="contact-title" data-reveal>Get in Touch</h2>
          <div className="contact-whispers" aria-hidden="true">
            <span>Let&apos;s chat</span>
            <span>Let&apos;s chat</span>
            <span>Let&apos;s chat</span>
            <span>Let&apos;s chat</span>
            <span>Let&apos;s chat</span>
          </div>
          <div className="contact-bottom">
            <a className="contact-button" href="mailto:dakshshastri0627@gmail.com">Start a conversation <span>↗</span></a>
            <p>Have an idea in mind?<br />I&apos;d love to hear about it.</p>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a className="footer-name" href="#top" aria-label="Daksh Shastri, back to top">Daksh<br />Shastri</a>
        <nav className="footer-nav" aria-label="Footer navigation">
          <a href="#works">Work</a>
          <a href="#capabilities">Services</a>
          <a href="#contact">Connect</a>
        </nav>
        <a className="footer-email" href="mailto:dakshshastri0627@gmail.com">dakshshastri0627@gmail.com</a>
        <div className="footer-bottom">
          <span className="copyright">© 2026 Daksh Shastri</span>
          <div className="social-links" aria-label="Social profiles">
            {socials.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">{social.label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
