import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '../assets/profile-casual.jpg';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = ({ onOpenCV }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        '.about__subtitle',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.about__header',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.about__title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.about__header',
            start: 'top 80%',
          },
        }
      );

      // Animate content
      gsap.fromTo(
        '.about__image-wrapper',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.about__content',
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        '.about__text',
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.about__content',
            start: 'top 70%',
          },
        }
      );

      // Animate stats
      gsap.fromTo(
        '.about__stat',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.about__stats',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: '3+', label: 'Years Experience' },
    { number: '6+', label: 'Full Systems & Client Projects' },
    { number: 'BCA', label: 'Degree Completed' },
    { number: '100%', label: 'Commitment to Quality' },
  ];

  return (
    <section id="about" className="about section" ref={sectionRef}>
      <div className="container">
        <div className="about__header section-title">
          <span className="about__subtitle section-subtitle">About Farooque</span>
          <h2 className="about__title">
            Engineering High-Performance <span className="gradient-text">Web Platforms</span>
          </h2>
        </div>

        <div className="about__content">
          <div className="about__image-wrapper">
            <div className="about__image-container">
              <div className="about__image">
                <img src={profileImage} alt="Farooque Alam" className="about__image-photo" />
              </div>
              <div className="about__image-decoration about__image-decoration--1"></div>
              <div className="about__image-decoration about__image-decoration--2"></div>
            </div>
          </div>

          <div className="about__text">
            <p className="about__description">
              I'm <strong>Farooque Alam</strong>, a Full Stack Developer based in <strong>Kathmandu, Nepal</strong>.
              With <strong>3 years of production experience</strong>, I build scalable, reliable web applications across modern JavaScript ecosystems (React, Next.js, Angular, Node.js) and robust backend environments (PHP, TYPO3, PostgreSQL, MySQL).
            </p>
            <p className="about__description">
              Currently at <strong>Nirekha Dot Com</strong>, I develop dynamic web applications and actively handle an international German client project for <strong>SCHITTLY</strong>, focusing on tailored TYPO3 customization, template integration, and custom extension architecture under strict European standards.
            </p>
            <p className="about__description">
              I hold a completed <strong>Bachelor of Computer Application (BCA)</strong> from Patan Nistha Campus, affiliated with Tribhuvan University. Beyond standard development, I leverage modern AI tools (Claude Code, ChatGPT, Perplexity, Antigravity, and Gemini APIs) to accelerate research, eliminate boilerplate, and focus on deep architectural reliability.
            </p>

            <div className="about__highlights">
              <div className="about__highlight">
                <span className="about__highlight-icon">🏢</span>
                <span>Multi-Tenant Architecture</span>
              </div>
              <div className="about__highlight">
                <span className="about__highlight-icon">🌍</span>
                <span>German Client Experience</span>
              </div>
              <div className="about__highlight">
                <span className="about__highlight-icon">🤖</span>
                <span>AI-Accelerated Workflow</span>
              </div>
              <div className="about__highlight">
                <span className="about__highlight-icon">🛡️</span>
                <span>Clean Security (JWT/RBAC)</span>
              </div>
            </div>

            <div className="about__actions">
              <motion.a
                href="#contact"
                className="btn btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Let's Work Together
              </motion.a>

              <motion.button
                type="button"
                className="btn btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenCV}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" />
                </svg>
                Curriculum Vitae (PDF)
              </motion.button>
            </div>
          </div>
        </div>

        {/* Human Philosophy Grid */}
        <div className="about__philosophy-grid">
          <div className="about__philosophy-card glass-card">
            <span className="philosophy-icon">📐</span>
            <h4>Architecture Over Shortcuts</h4>
            <p>From schema normalization to multi-tenant school isolation in SchoolBaba, I focus on predictable, clean code that scales easily.</p>
          </div>
          <div className="about__philosophy-card glass-card">
            <span className="philosophy-icon">🤝</span>
            <h4>Client Transparency</h4>
            <p>Direct communication, honest progress demos, and clear documentation. Experienced with international timezones and remote setups.</p>
          </div>
          <div className="about__philosophy-card glass-card">
            <span className="philosophy-icon">⚡</span>
            <h4>Modern AI Augmentation</h4>
            <p>I embrace AI as a developer co-pilot to write rock-solid test cases, benchmark performance, and ship faster without compromising quality.</p>
          </div>
        </div>

        <div className="about__stats">
          {stats.map((stat, index) => (
            <div key={index} className="about__stat glass-card">
              <span className="about__stat-number gradient-text">{stat.number}</span>
              <span className="about__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
