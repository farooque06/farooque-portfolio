import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__content">
                    <div className="footer__brand">
                        <a href="#home" className="footer__logo" onClick={(e) => { e.preventDefault(); scrollToTop(); }}>
                            <span className="footer__logo-text">Farooque</span>
                            <span className="footer__logo-dot">.</span>
                        </a>
                        <p className="footer__tagline">
                            Building digital experiences with passion and precision.
                        </p>
                    </div>

                    <div className="footer__links">
                        <h4>Quick Links</h4>
                        <nav>
                            <a href="#about">About</a>
                            <a href="#skills">Skills</a>
                            <a href="#projects">Projects</a>
                            <a href="#contact">Contact</a>
                        </nav>
                    </div>

                    <div className="footer__social">
                        <h4>Follow Me</h4>
                        <div className="footer__social-links">
                            <a href="https://github.com/farooque06" target="_blank" rel="noopener noreferrer">GitHub</a>
                            <a href="https://linkedin.com/in/md-farooque-62191024b" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            <a href="https://instagram.com/farooque_allam" target="_blank" rel="noopener noreferrer">Instagram</a>
                        </div>
                    </div>
                </div>

                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © {currentYear} Farooque. All rights reserved.
                    </p>
                    <p className="footer__made-with">
                        Made with <span className="footer__heart">❤️</span> using React
                    </p>
                </div>

                <motion.button
                    className="footer__scroll-top"
                    onClick={scrollToTop}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 19V5M5 12l7-7 7 7" />
                    </svg>
                </motion.button>
            </div>
        </footer>
    );
};

export default Footer;
