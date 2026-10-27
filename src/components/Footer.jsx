import { motion } from 'framer-motion';
import './Footer.css';

const Footer = ({ onOpenCV }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          {/* Brand Column */}
          <div className="footer__brand">
            <a
              href="#home"
              className="footer__logo"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
            >
              <span className="footer__logo-text">Farooque Alam</span>
              <span className="footer__logo-dot">.</span>
            </a>
            <p className="footer__tagline">
              Full Stack Developer specializing in React, Next.js, Node.js, and TYPO3. Building high-performance digital systems with craftsmanship, human touch, and AI acceleration.
            </p>
            <div className="footer__brand-actions">
              <button
                type="button"
                className="btn btn-outline footer__cv-btn"
                onClick={onOpenCV}
              >
                <span>📄</span> Curriculum Vitae (PDF)
              </button>
              <a
                href="#contact"
                className="btn btn-primary footer__hire-btn"
              >
                Hire Farooque
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer__links">
            <h4 className="footer__heading">Navigation</h4>
            <nav className="footer__nav">
              <a href="#about">About Farooque</a>
              <a href="#experience">Experience & Journey</a>
              <a href="#projects">Featured Projects</a>
              <a href="#skills">Skills Arsenal</a>
              <a href="#ai-studio">AI Suite & Chat</a>
              <a href="#contact">Contact & Inquiries</a>
            </nav>
          </div>

          {/* Connect Column */}
          <div className="footer__social">
            <h4 className="footer__heading">Connect</h4>
            <div className="footer__social-links">
              <a
                href="https://github.com/farooque06"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-item"
              >
                <span className="footer__social-icon">🐙</span>
                <span className="footer__social-text">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/md-farooque-62191024b"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-item"
              >
                <span className="footer__social-icon">💼</span>
                <span className="footer__social-text">LinkedIn</span>
              </a>
              <a
                href="https://wa.me/9779818998937"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-item"
              >
                <span className="footer__social-icon">💬</span>
                <span className="footer__social-text">WhatsApp (+977 9818998937)</span>
              </a>
              <a
                href="mailto:farooqueallam1@gmail.com"
                className="footer__social-item"
              >
                <span className="footer__social-icon">✉️</span>
                <span className="footer__social-text">farooqueallam1@gmail.com</span>
              </a>
              <a
                href="https://instagram.com/farooque_allam"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-item"
              >
                <span className="footer__social-icon">📸</span>
                <span className="footer__social-text">Instagram</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Fully responsive, clean layout */}
        <div className="footer__bottom">
          <div className="footer__bottom-left">
            <p className="footer__copyright">
              © {currentYear} Farooque Alam • Full Stack Software Engineer • Kathmandu, Nepal
            </p>
            <p className="footer__made-with">
              Crafted with React, Node.js & <span className="footer__heart">⚡</span> Gemini AI
            </p>
          </div>

          <div className="footer__bottom-right">
            <button
              type="button"
              className="footer__back-to-top"
              onClick={scrollToTop}
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
