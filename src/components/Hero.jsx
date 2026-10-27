import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import profileImage from '../assets/profile-formal.jpg';
import './Hero.css';

const TITLES = [
  'Full Stack Developer',
  'React & Next.js Engineer',
  'Node.js & PostgreSQL Developer',
  'TYPO3 & PHP Specialist',
];

const Hero = ({ onOpenCV }) => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  // Typing animation state
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    const currentTitle = TITLES[currentTitleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < currentTitle.length) {
          setCurrentText(currentTitle.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2200);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTitleIndex((prev) => (prev + 1) % TITLES.length);
        }
      }
    }, isDeleting ? 40 : 85);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTitleIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero__greeting',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      );

      gsap.fromTo(
        '.hero__name',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.4 }
      );

      gsap.fromTo(
        '.hero__title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.7 }
      );

      gsap.fromTo(
        '.hero__description',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.9 }
      );

      gsap.fromTo(
        '.hero__cta',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.1, stagger: 0.1 }
      );

      gsap.fromTo(
        '.hero__scroll',
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 1.5 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero__content">
        <div className="hero__text" ref={textRef}>
          {/* Status & Location Pill */}
          <div className="hero__meta-badges">
            <span className="hero__status-badge">
              <span className="hero__status-pulse"></span>
              Available for Full-Time Roles & Selected Projects
            </span>
            <span className="hero__location-badge">📍 Kathmandu, Nepal</span>
          </div>

          <span className="hero__greeting">Hello, I'm</span>
          <h1 className="hero__name">
            <span className="gradient-text">Farooque Alam</span>
          </h1>

          <div className="hero__title-wrapper">
            <h2 className="hero__title">
              <span className="hero__title-text">{currentText}</span>
              <span className="hero__cursor">|</span>
            </h2>
          </div>

          <p className="hero__description">
            Full Stack Developer with <strong>3 years of experience</strong> building dynamic, scalable web applications with React, Angular, Node.js, and TYPO3. Currently crafting multi-tenant platforms (<strong>SchoolBaba</strong>) and international enterprise client solutions (<strong>SCHITTLY</strong>) with modern AI-accelerated workflows.
          </p>

          <div className="hero__cta-group">
            <motion.a
              href="#projects"
              className="hero__cta btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Projects
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>

            <motion.button
              type="button"
              className="hero__cta btn btn-outline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenCV}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
              View & Download CV
            </motion.button>

            <motion.a
              href="#ai-studio"
              className="hero__cta btn btn-secondary-ai"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#ai-studio')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>✨</span> Chat with AI Twin
            </motion.a>
          </div>
        </div>

        <div className="hero__visual hero__visual--stage">
          {/* Top 3D Workstation HUD Tag */}
          <div className="hero__stage-tag">
            <span className="hero__stage-dot"></span>
            <span>3D Live Workstation • VS Code</span>
          </div>

          {/* Prominent Developer Portrait Card (Full Size, High-Fidelity) */}
          <motion.div
            className="hero__developer-card glass-card"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), 0 0 35px rgba(0, 212, 255, 0.25)' }}
          >
            <div className="hero__dev-photo-wrap">
              <img
                src={profileImage}
                alt="Farooque Alam - Full Stack Developer"
                className="hero__dev-photo"
              />
              <div className="hero__photo-badge hero__photo-badge--status">
                <span className="hero__photo-dot"></span>
                <span>Available for Full-Time</span>
              </div>
              <div className="hero__photo-badge hero__photo-badge--exp">
                <span>3+ Yrs Exp</span>
              </div>
            </div>

            <div className="hero__dev-card-info">
              <div className="hero__dev-card-header">
                <div>
                  <h3 className="hero__dev-name">Farooque Alam</h3>
                  <p className="hero__dev-role">Full Stack Developer</p>
                </div>
                <span className="hero__dev-verified" title="Verified Full Stack Engineer">✓</span>
              </div>

              <div className="hero__dev-card-meta">
                <div className="hero__meta-item">
                  <span className="hero__meta-icon">🏢</span>
                  <span>Nirekha Dot Com</span>
                </div>
                <div className="hero__meta-item">
                  <span className="hero__meta-icon">📍</span>
                  <span>Kathmandu, Nepal</span>
                </div>
              </div>

              <div className="hero__dev-tech-pills">
                <span className="hero__tech-pill">React</span>
                <span className="hero__tech-pill">Next.js</span>
                <span className="hero__tech-pill">Node.js</span>
                <span className="hero__tech-pill">TYPO3</span>
                <span className="hero__tech-pill">PostgreSQL</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Workstation Hint */}
          <div className="hero__stage-hint">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
            </svg>
            <span>Move cursor to tilt 3D laptop & inspect code</span>
          </div>
        </div>
      </div>

      <motion.div
        className="hero__scroll"
        onClick={scrollToAbout}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Scroll Down</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>

      <div className="hero__decoration hero__decoration--1"></div>
      <div className="hero__decoration hero__decoration--2"></div>
      <div className="hero__decoration hero__decoration--3"></div>
    </section>
  );
};

export default Hero;
