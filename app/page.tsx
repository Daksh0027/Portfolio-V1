"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const projects = [
  { number: "01", name: "Project A", industry: "Healthcare", year: "2024", domain: "PROJECTA.COM", description: "A clearer digital experience for a healthcare team building trust at every touchpoint.", tags: "WEB DESIGN · BRAND IDENTITY · PRODUCT DESIGN", tone: "work-warm" },
  { number: "02", name: "Project B", industry: "Web3", year: "2024", domain: "PROJECTB.COM", description: "A focused product identity and web system for a new kind of digital community.", tags: "BRAND STRATEGY · WEB DESIGN · DEVELOPMENT", tone: "work-blue" },
  { number: "03", name: "Project C", industry: "AI Automation", year: "2025", domain: "PROJECTC.COM", description: "An approachable interface that makes powerful automation feel simple and human.", tags: "PRODUCT DESIGN · UX/UI · WEB DEVELOPMENT", tone: "work-red" },
  { number: "04", name: "Project D", industry: "Cybersecurity", year: "2025", domain: "PROJECTD.COM", description: "A confident brand and responsive platform for a team protecting what matters.", tags: "WEB DESIGN · BRAND IDENTITY · MARKETING MATERIALS", tone: "work-violet" },
];

const services = [
  ["01", "Strategy", "Clear, actionable plans to align business vision with long-term goals and measurable success."],
  ["02", "Brand Identity", "Memorable designs that capture the essence of your brand and connect with your audience."],
  ["03", "Web Design", "Beautiful, user-friendly websites that create seamless experiences and elevate your business."],
  ["04", "Web Development", "Webflow and Framer sites designed to grow with your business and perform at the highest level."],
  ["05", "Web Apps", "Custom applications tailored to streamline operations and enhance user engagement."],
  ["06", "UX/UI", "User-centered designs that enhance usability, streamline interactions, and elevate experience."],
  ["07", "Pitch Decks", "Compelling presentations that tell your story, showcase value, and captivate investors."],
  ["08", "Illustrations", "Unique and engaging visuals that enhance storytelling, captivate audiences, and bring ideas to life."],
];

const testimonials = [
  ["Alex Morgan", "Founder, Company A", "The placeholder team brought clarity to a complex idea and gave us a system we could actually use."],
  ["Jordan Lee", "Marketing Lead, Company B", "Every detail felt intentional. The new direction made our story easier to understand."],
  ["Taylor Reed", "CEO, Company C", "A thoughtful partner from the first workshop through launch. The work made an immediate difference."],
  ["Morgan Ellis", "Product Lead, Company D", "They found the simple answer inside a complicated problem and made it feel effortless."],
  ["Casey Hart", "Founder, Company E", "The process was focused, collaborative, and far more strategic than we expected."],
  ["Riley Chen", "Director, Company F", "The finished product feels distinct without losing any of the clarity our customers need."],
  ["Sam Taylor", "Founder, Company G", "A rare mix of sharp thinking, strong taste, and the care to finish every last detail."],
  ["Jamie Brooks", "COO, Company H", "We left with a brand and website that finally feel like the same company."],
];

const tags = ["DESIGNER", "STRATEGIST", "BUILDER", "CURIOUS", "INDEPENDENT"];

export default function Portfolio() {
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const context = gsap.context(() => {
      if (!reducedMotion) {
        gsap.timeline({ defaults: { ease: "power3.out" } })
          .from("[data-nav]", { y: -20, opacity: 0, duration: 0.6 })
          .from("[data-hero-word]", { x: -70, opacity: 0, duration: 1 }, "-=0.2")
          .from("[data-hero-copy]", { y: 30, opacity: 0, duration: 0.7 }, "-=0.45");
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.from(element, { y: 45, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: element, start: "top 84%", once: true } });
        });
      }
    }, pageRef);

    const hero = heroRef.current;
    const handlePointer = (event: PointerEvent): void => {
      if (!hero || reducedMotion) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      hero.style.setProperty("--mouse-x", `${x * 3}%`);
      hero.style.setProperty("--mouse-y", `${y * 3}%`);
    };
    window.addEventListener("pointermove", handlePointer);
    return () => { window.removeEventListener("pointermove", handlePointer); context.revert(); };
  }, []);

  return (
    <div ref={pageRef} className="portfolio-page">
      <header className="site-nav" data-nav>
        <a className="site-wordmark" href="#top">YOUR NAME</a>
        <nav aria-label="Primary navigation">
          <a href="#works">Work</a><a href="#services">Services</a><a href="#about">About</a><a href="#testimonials">Testimonials</a>
        </nav>
        <a className="connect-button" href="#contact">Connect <span>↗</span></a>
        <button className="menu-button" type="button" aria-label="Open menu"><span /><span /></button>
      </header>

      <main id="top">
        <section ref={heroRef} className="hero-section">
          <div className="hero-columns" aria-hidden="true" />
          <div className="hero-gradient" aria-hidden="true"><span /><span /><span /></div>
          <div className="hero-name" data-hero-word><span>YOUR</span><span>NAME</span></div>
          <div className="hero-content" data-hero-copy>
            <h1>Crafting digital <em>experiences</em> that elevate SaaS &amp; AI innovators.</h1>
            <div className="hero-meta"><span>© 2026</span><span>BASED IN [CITY]</span><span>DESIGNER</span></div>
          </div>
        </section>

        <section id="works" className="works-section light-section">
          <div className="section-divider-heading" data-reveal>SELECTED WORKS</div>
          <div className="work-mosaic" data-reveal aria-label="Project preview gallery">
            {Array.from({ length: 12 }, (_, index) => <div className={`mosaic-tile mosaic-${index + 1}`} key={index}><span>{String(index + 1).padStart(2, "0")}</span></div>)}
          </div>
          <div className="project-list">
            {projects.map((project) => (
              <article className="project-row" key={project.number} data-reveal>
                <a className={`project-image ${project.tone}`} href="#contact" aria-label={`View ${project.name}`}><span>{project.name}</span><b>{project.number}</b><i>↗</i></a>
                <div className="project-copy">
                  <div className="project-title-line"><span>({project.number})</span><h3>{project.name}</h3></div>
                  <p>{project.description}</p>
                  <a className="text-link" href="#contact">View project <span>↗</span></a>
                </div>
                <div className="project-details"><span>Live site<strong>{project.domain}</strong></span><span>Industry<strong>{project.industry}</strong></span><span>Published<strong>© {project.year}</strong></span><span>Deliverables<strong>{project.tags}</strong></span></div>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="services-section dark-section">
          <div className="section-divider-heading services-heading" data-reveal>SERVICES</div>
          <div className="services-grid-lines" aria-hidden="true" />
          <div className="services-list">
            {services.map(([number, name, description]) => <article className="service-row" key={number} data-reveal><span>{number}</span><h3>{name}</h3><p>{description}</p></article>)}
          </div>
        </section>

        <section className="process-section light-section" data-reveal>
          <div className="section-label">( How I work )</div>
          <div className="process-list">
            <div><span>STRATEGY</span><p>We start with a discovery survey and workshop to define the mission, keywords, and market position. Then we map the structure, audience, and user flow.</p></div>
            <div><span>IDENTITY</span><p>I shape the visual identity through typography, color, graphics, and a flexible set of rules that can move across the website, product, and marketing.</p></div>
            <div><span>LAUNCH</span><p>Every detail is refined before the work ships. I build in the chosen platform or hand off a clear system your team can keep moving with.</p></div>
          </div>
        </section>

        <section id="about" className="about-page-section dark-section">
          <div className="section-label">( About YOUR NAME )</div>
          <div className="section-divider-heading about-heading" data-reveal>ABOUT YOUR NAME</div>
          <div className="about-stat-row" data-reveal><div><strong>$[X]M+</strong><span>Total seed funding raised</span></div><div><strong>[X]x</strong><span>Increased revenue by</span></div><div><strong>[X]%</strong><span>Increased website traffic by</span></div></div>
          <div className="about-overlap" data-reveal><h2>Designing for<br /><em>impact and clarity.</em></h2><div><p>I believe good design is less about decoration and more about creating the shortest path between an idea and the person who needs it.</p><p>My practice brings strategy, identity, and digital product thinking into one clear direction. The result is work that feels distinctive and works hard.</p></div></div>
          <div className="background-block" data-reveal><div><h3>From marketing<br />to design freedom</h3><p>I started close to the audience, learning how people make decisions and what makes a message stay with them.</p><p>That perspective still guides the way I build brands: with enough character to be remembered and enough structure to grow.</p><p>Today, I work independently with ambitious teams building what comes next.</p></div><div className="portrait-placeholder" aria-label="Portrait placeholder"><span>PORTRAIT<br />PLACEHOLDER</span></div></div>
          <div className="personal-block" data-reveal><h3>How curiosity shapes<br />my perspective</h3><p>Outside of work, I look for new places, good conversations, and anything that makes me see a familiar problem from a different angle.</p></div>
          <div className="personality-tags">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <p className="featured-line">Featured in — PLACEHOLDER PUBLICATION · PLACEHOLDER AWARD · PLACEHOLDER GALLERY</p>
        </section>

        <section id="testimonials" className="testimonials-section dark-section">
          <div className="section-label">( Kind words )</div><h2 data-reveal>Don&apos;t just take<br /><em>my word for it.</em></h2><p className="testimonials-subtitle">Happy customers</p>
          <div className="testimonial-scatter">{testimonials.map(([name, role, quote], index) => <article className={`testimonial-card testimonial-card-${index + 1}`} key={name} data-reveal><div className="testimonial-portrait" aria-hidden="true">{String(index + 1).padStart(2, "0")}</div><span className="testimonial-logo">COMPANY {String.fromCharCode(65 + index)}</span><strong>{name}</strong><small>{role}</small><p>“{quote}”</p></article>)}</div>
        </section>

        <section id="contact" className="cta-section"><div className="cta-gradient" aria-hidden="true" /><a className="cta-button" href="mailto:hello@example.com">Book discovery call <span>↗</span></a><h2>GET IN<br />TOUCH</h2></section>
      </main>

      <footer className="site-footer dark-section"><div className="footer-wordmark">YOUR NAME</div><div className="footer-links"><div><span>Explore</span><a href="#works">Work</a><a href="#services">Services</a><a href="#about">About</a><a href="#testimonials">Testimonials</a></div><div><span>Connect</span><a href="mailto:hello@example.com">Email</a><a href="#contact">Coaching</a><a href="#contact">Privacy</a></div><div><span>Social</span><a href="#contact">LinkedIn</a><a href="#contact">Instagram</a><a href="#contact">YouTube</a></div></div><div className="footer-bottom"><span>© 2026</span><span>YOUR NAME — INDEPENDENT DESIGNER</span></div></footer>
    </div>
  );
}
