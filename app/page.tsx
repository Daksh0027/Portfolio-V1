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
    description: "A responsive movie discovery platform with live TMDB data, authentication, and personalized watchlists.",
    role: "Frontend development",
    year: "2025",
    tags: "React / Vite / Appwrite",
    link: "https://respectro.vercel.app/",
    className: "project-gold",
  },
  {
    number: "02",
    title: "Gemini Clone",
    type: "Conversational AI interface",
    description: "A clean, responsive AI client with live completions and session history handling.",
    role: "Frontend development",
    year: "2025",
    tags: "React / Gemini API",
    link: "https://bot-clone.netlify.app/",
    className: "project-blue",
  },
  {
    number: "03",
    title: "Library System",
    type: "Python transactional tool",
    description: "A reliable inventory and sales management system with a practical command-line workflow.",
    role: "Software development",
    year: "2024",
    tags: "Python / MySQL",
    link: "#contact",
    className: "project-green",
  },
];

const skills = ["React", "TypeScript", "JavaScript", "C++", "Python", "Node.js", "MySQL", "Tailwind CSS"];

export default function Portfolio() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pageRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from("[data-nav]", { y: -20, opacity: 0, duration: 0.6 })
        .from("[data-hero-line]", { y: 55, opacity: 0, duration: 0.85, stagger: 0.08 }, "-=0.25")
        .from("[data-hero-meta]", { y: 18, opacity: 0, duration: 0.65, stagger: 0.06 }, "-=0.45");

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 35,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });
    }, pageRef);

    return () => context.revert();
  }, []);

  return (
    <div ref={pageRef} className="reference-page">
      <div className="reference-light" aria-hidden="true" />
      <div className="reference-grain" aria-hidden="true" />

      <header className="reference-nav" data-nav>
        <a href="#top" className="reference-logo" aria-label="Daksh Shastri home"><span>D</span><b>AKSH</b><i>S</i><b>HASTRI</b></a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Connect</a>
        </nav>
        <a className="reference-nav-cta" href="mailto:dakshshastri0627@gmail.com">Let&apos;s talk <span>↗</span></a>
      </header>

      <main id="top">
        <section className="reference-hero">
          <div className="hero-grid-lines" aria-hidden="true" />
          <div className="hero-smoke" aria-hidden="true">
            <span className="hero-smoke-layer hero-smoke-layer-one" />
            <span className="hero-smoke-layer hero-smoke-layer-two" />
            <span className="hero-smoke-layer hero-smoke-layer-three" />
          </div>
          <div className="hero-topline" data-hero-meta>
            <span>© 2026</span>
            <span>Based in Delhi, India</span>
            <span>Frontend developer</span>
          </div>
          <div className="hero-wordmark" data-hero-line aria-label="Daksh Shastri">
            <span>DAKSH</span>
            <span>SHASTRI</span>
          </div>
          <div className="hero-copy" data-hero-meta>
            <h1>Building digital <em>experiences</em> that make complex ideas feel simple.</h1>
            <a href="#work">Explore selected work <span>↓</span></a>
          </div>
        </section>

        <div className="reference-marquee" aria-hidden="true">
          <div>Frontend development <span>✦</span> Competitive programming <span>✦</span> Product-minded engineering <span>✦</span> Frontend development <span>✦</span></div>
        </div>

        <section id="about" className="reference-section about-section">
          <div className="section-label" data-reveal>( About )</div>
          <div className="about-content" data-reveal>
            <h2>I turn thoughtful systems into <em>useful software.</em></h2>
            <div className="about-detail">
              <p>I&apos;m an Information Technology undergraduate at Bhagwan Parshuram Institute of Technology, currently working as a Front-End Development Intern at Shree Ji Facility Services.</p>
              <p>I bring competitive programming discipline to product work, with a focus on speed, clarity, accessibility, and interfaces that feel considered.</p>
            </div>
          </div>
          <div className="fact-row" data-reveal>
            <div><strong>222</strong><span>LeetCode weekly rank</span></div>
            <div><strong>295</strong><span>CodeChef global rank</span></div>
            <div><strong>2028</strong><span>B.Tech graduation</span></div>
            <div><strong>Delhi</strong><span>Current base</span></div>
          </div>
        </section>

        <section id="work" className="work-section reference-section">
          <div className="work-heading" data-reveal>
            <div className="section-label">( Selected work )</div>
            <h2>Projects built with<br /><em>purpose.</em></h2>
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className={`reference-project ${project.className}`} key={project.number} data-reveal>
                <a className="project-visual" href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel={project.link.startsWith("http") ? "noreferrer" : undefined} aria-label={`View ${project.title}`}>
                  <span className="project-visual-title">{project.title}</span>
                  <span className="project-visual-mark">{project.number}</span>
                </a>
                <div className="project-info">
                  <div className="project-info-top"><span>({project.number})</span><span>{project.type}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <a className="project-link" href={project.link} target={project.link.startsWith("http") ? "_blank" : undefined} rel={project.link.startsWith("http") ? "noreferrer" : undefined}>View project <span>↗</span></a>
                </div>
                <div className="project-meta">
                  <span>Role<strong>{project.role}</strong></span>
                  <span>Published<strong>© {project.year}</strong></span>
                  <span>Built with<strong>{project.tags}</strong></span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="reference-section skills-section" data-reveal>
          <div className="section-label">( Capabilities )</div>
          <div>
            <h2>A practical<br /><em>toolkit.</em></h2>
            <div className="skill-cloud">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
          </div>
        </section>

        <section id="contact" className="reference-contact">
          <div className="contact-top" data-reveal>
            <div className="section-label">( Contact )</div>
            <span>Open to senior / remote</span>
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
            <div><span>Pages</span><a href="#top">Home</a><a href="#work">Work</a><a href="#contact">Contact</a></div>
            <div><span>Social</span><a href="https://github.com/Daksh0027" target="_blank" rel="noreferrer">GitHub</a><a href="https://leetcode.com/u/Daksh0027" target="_blank" rel="noreferrer">LeetCode</a></div>
            <div><span>Direct</span><a href="mailto:dakshshastri0627@gmail.com">dakshshastri0627@gmail.com</a><a href="/bdaf8a32073c89456ece1fd6b2e6cab1.pdf">CV (PDF)</a></div>
            <div className="contact-terminal">Delhi — 2026<br />Built with curiosity<br />© Daksh Shastri</div>
          </div>
        </section>
      </main>
    </div>
  );
}
