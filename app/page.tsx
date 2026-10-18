"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AmberFlow from "@/components/AmberFlow";
import Capabilities from "@/components/Capabilities";
import StickyWorks from "@/components/StickyWorks";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const stickyProjects: {
  name: string;
  category: string;
  url: string;
  images: [string, string, string];
}[] = [
  {
    name: "ReSpectro",
    category: "Client",
    url: "https://respectro.vercel.app/",
    images: [
      "https://images.pexels.com/photos/1790556/pexels-photo-1790556.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/7991501/pexels-photo-7991501.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/8263369/pexels-photo-8263369.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    ],
  },
  {
    name: "Gemini Clone",
    category: "Personal",
    url: "https://bot-clone.netlify.app/",
    images: [
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/14314636/pexels-photo-14314636.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/25626449/pexels-photo-25626449.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    ],
  },
  {
    name: "Library System",
    category: "Client",
    url: "https://github.com/Daksh0027",
    images: [
      "https://images.pexels.com/photos/5225982/pexels-photo-5225982.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/30752162/pexels-photo-30752162.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
      "https://images.pexels.com/photos/8045884/pexels-photo-8045884.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    ],
  },
];

const socials = [
  { label: "GitHub", href: "https://github.com/Daksh0027" },
  { label: "LeetCode", href: "https://leetcode.com/u/Daksh0027" },
  { label: "CodeChef", href: "https://www.codechef.com/users/gam_pearl_90" },
  { label: "Codeforces", href: "https://codeforces.com" },
];

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
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (reducedMotion) return;

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(".site-wordmark", { y: -12, opacity: 0, duration: 0.55 })
        .from(".hero-nav-links a", { y: -12, opacity: 0, duration: 0.55, stagger: 0.09 }, "-=0.35")
        .from("[data-hero-word]", { y: 42, opacity: 0, duration: 0.85 }, "-=0.25")
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
    const nav = navRef.current;
    if (!nav) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
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
    if (menuOpen) navRef.current?.classList.remove("is-hidden");
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
  }, []);

  return (
    <div ref={pageRef} className="portfolio-page">
      <AmberFlow />
      <header
        ref={navRef}
        className={`site-nav${menuOpen ? " menu-open" : ""}`}
        data-nav
      >
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
          <h1 id="hero-title" className="hero-name" data-hero-word data-fit-text aria-label="Daksh Shastri">
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
          <h2 id="contact-title" data-reveal data-fit-text>Get in Touch</h2>
          <div className="contact-whispers" aria-hidden="true">
            <span>Let&apos;s chat</span>
            <span>Let&apos;s chat</span>
            <span>Let&apos;s chat</span>
            <span>Let&apos;s chat</span>
            <span>Let&apos;s chat</span>
          </div>
          <div className="contact-bottom">
            <a className="contact-cta" href="mailto:dakshshastri0627@gmail.com">
              <span className="contact-cta-label">Book Discovery Call</span>
            </a>
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
