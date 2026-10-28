import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = ({ onOpenCV }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'AI Studio', href: '#ai-studio' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="navbar__container">
          <motion.a
            href="#home"
            className="navbar__logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="navbar__logo-text">Farooque</span>
            <span className="navbar__logo-dot">.</span>
          </motion.a>

          <ul className="navbar__links">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <a
                  href={link.href}
                  className="navbar__link"
                  onClick={(e) => {
                    e.preventDefault();
                    if (link.href === '#home') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    } else {
                      scrollToSection(link.href);
                    }
                  }}
                >
                  {link.name}
                  {link.name === 'AI Studio' && <span className="navbar__ai-sparkle">✨</span>}
                  <span className="navbar__link-indicator"></span>
                </a>
              </motion.li>
            ))}
          </ul>

          <div className="navbar__actions">
            <button
              type="button"
              className="navbar__cv-btn"
              onClick={onOpenCV}
              title="View & Download Farooque's Curriculum Vitae"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
              <span>CV</span>
            </button>

            <motion.a
              href="#contact"
              className="navbar__cta btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#contact');
              }}
            >
              Let's Talk
            </motion.a>
          </div>

          <button
            className={`navbar__mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="navbar__mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <button
              className="navbar__mobile-close"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <ul className="navbar__mobile-links">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.href === '#home') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        scrollToSection(link.href);
                      }
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
              <li style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <a
                  href="#contact"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('#contact');
                  }}
                >
                  Let's Talk
                </a>
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenCV();
                  }}
                >
                  View & Download CV (PDF)
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
