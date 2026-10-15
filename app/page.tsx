"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "ReSpectro",
    type: "Movie streaming & discovery",
    role: "Frontend developer",
    year: "2025",
    metric: "Stack",
    value: "React / Vite",
    description: "A responsive movie discovery platform with live TMDB data, authentication, and personalized watchlists powered by Appwrite.",
    link: "https://respectro.vercel.app/",
  },
  {
    number: "02",
    title: "Gemini Clone",
    type: "Conversational AI interface",
    role: "Frontend developer",
    year: "2025",
    metric: "Focus",
    value: "AI interface",
    description: "A clean, responsive Gemini-inspired client with live API completions and session history handling.",
    link: "https://bot-clone.netlify.app/",
  },
  {
    number: "03",
    title: "Library System",
    type: "Python transactional tool",
    role: "Software developer",
    year: "2024",
    metric: "Focus",
    value: "Reliable workflows",
    description: "A scalable command-line inventory and sales management system using Python and MySQL connectivity.",
    link: "#contact",
  },
];

const skills = ["React", "TypeScript", "JavaScript", "C++", "Python", "Node.js", "MySQL", "Tailwind CSS"];

export default function Portfolio() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from("[data-nav]", { y: -16, opacity: 0, duration: 0.55 })
        .from("[data-hero-line]", { y: 36, opacity: 0, duration: 0.8, stagger: 0.08 }, "-=0.2")
        .from("[data-hero-meta]", { y: 20, opacity: 0, duration: 0.6 }, "-=0.45")
        .from("[data-orb]", { scale: 0.8, opacity: 0, duration: 1.2 }, "-=0.8");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 36,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            once: true,
          },
        });
      });

      gsap.to("[data-orb]", {
        x: 36,
        y: -24,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, pageRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={pageRef} className="reference-page">
      <div className="reference-light" aria-hidden="true" />
      <div className="reference-orb reference-orb-one" data-orb aria-hidden="true" />
      <div className="reference-orb reference-orb-two" aria-hidden="true" />
      <div className="reference-grain" aria-hidden="true" />

      <header className="reference-nav" data-nav>
        <a href="#top" className="reference-logo">DS<span>.</span></a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
        <a className="reference-nav-cta" href="mailto:dakshshastri0627@gmail.com">Let&apos;s talk <span>↗</span></a>
      </header>

      <main id="top">
        <section className="reference-hero">
          <div className="hero-eyebrow" data-hero-meta>
            <span className="live-mark" />
            Frontend developer &amp; competitive programmer
          </div>
          <div className="hero-display" data-hero-line>
            <h1>DAKSH<br /><em>SHASTRI</em></h1>
          </div>
          <div className="hero-statement" data-hero-meta>
            <p>Building digital experiences that are <em>fast, thoughtful,</em> and made to work.</p>
            <div className="hero-statement-meta">
              <span>Based in Delhi, India</span>
              <span>Available for engineering roles</span>
              <a href="#work">Scroll to explore <span>↓</span></a>
            </div>
          </div>
        </section>

        <section id="about" className="reference-section about-section">
          <div className="section-label" data-reveal>01 / About</div>
          <div className="about-content" data-reveal>
            <h2>I work where <em>clear thinking</em> meets useful software.</h2>
            <div className="about-detail">
              <p>I&apos;m currently studying Information Technology at Bhagwan Parshuram Institute of Technology and working as a Front-End Development Intern at Shree Ji Facility Services.</p>
              <p>My edge is the combination of competitive programming discipline and a strong eye for interaction. I care about the details people feel: speed, hierarchy, accessibility, and the small moments that make a product feel considered.</p>
            </div>
          </div>
          <div className="fact-row" data-reveal>
            <div><strong>222</strong><span>LeetCode weekly contest rank</span></div>
            <div><strong>295</strong><span>CodeChef global contest rank</span></div>
            <div><strong>Pupil</strong><span>Codeforces rating</span></div>
            <div><strong>2028</strong><span>B.Tech graduation target</span></div>
          </div>
        </section>

        <section id="work" className="reference-section work-section">
          <div className="section-heading" data-reveal>
            <div className="section-label">02 / Selected work</div>
            <h2>Things I&apos;ve<br /><em>made.</em></h2>
          </div>
          <div className="project-list">
            <div className="project-list-meta"><span>01 — 03</span><span>Selected work</span></div>
            {projects.map((project) => (
              <article className="reference-project" key={project.number} data-reveal>
                <span className="project-number">({project.number})</span>
                <div className="project-main">
                  <p className="project-type">{project.type}</p>
                  <h3>{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>
                <div className="project-side">
                  <div className="project-facts">
                    <span>Role<strong>{project.role}</strong></span>
                    <span>Year<strong>© {project.year}</strong></span>
                    <span>{project.metric}<strong>{project.value}</strong></span>
                  </div>
                  <a href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel={project.link.startsWith("http") ? "noreferrer" : undefined}>View project <span>↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="reference-section skills-section" data-reveal>
          <div className="section-label">03 / Toolkit</div>
          <div>
            <h2>A practical<br /><em>toolkit.</em></h2>
            <div className="skill-cloud">
              {skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>
          </div>
        </section>

        <section id="contact" className="reference-contact">
          <div className="contact-top" data-reveal>
            <div className="section-label">04 / Contact</div>
            <span>Open to engineering roles / remote</span>
          </div>
          <div className="contact-grid">
            <div>
              <h2 className="contact-heading" data-reveal><em>Let&apos;s</em><br />talk.</h2>
              <p className="contact-note" data-reveal>Have a project, an opportunity, or a good problem to solve?</p>
            </div>
            <div className="contact-actions" data-reveal>
              <a className="contact-pill" href="mailto:dakshshastri0627@gmail.com"><span />dakshshastri0627@gmail.com</a>
              <div className="contact-buttons">
                <a href="mailto:dakshshastri0627@gmail.com">Start a conversation <span>↗</span></a>
                <a href="/bdaf8a32073c89456ece1fd6b2e6cab1.pdf">Download CV <span>↓</span></a>
              </div>
              <a className="contact-social" href="https://github.com/Daksh0027" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
            </div>
          </div>
          <div className="contact-signature" data-reveal>DAKSH SHASTRI</div>
          <div className="contact-bottom" data-reveal>
            <span>Delhi, India · 2026</span>
            <div>
              <a href="https://github.com/Daksh0027" target="_blank" rel="noreferrer">GitHub ↗</a>
              <a href="https://leetcode.com/u/Daksh0027" target="_blank" rel="noreferrer">LeetCode ↗</a>
              <a href="/bdaf8a32073c89456ece1fd6b2e6cab1.pdf">Credentials ↗</a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
