import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CVModal.css';

const CVModal = ({ isOpen, onClose }) => {
  const [activeView, setActiveView] = useState('formatted'); // 'formatted' | 'pdf'
  const cvPdfPath = '/assets/aistudio/Farooque_Alam_-_CV_846c8fe5.pdf';

  // Prevent background scrolling and pause Lenis smooth scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;

    // Pause Lenis smooth scrolling instance so it doesn't hijack wheel/touch events
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.stop();
    }

    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.classList.add('lenis-stopped');
    document.documentElement.classList.add('lenis-stopped');

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.touchAction = prevBodyTouchAction;
      document.body.classList.remove('lenis-stopped');
      document.documentElement.classList.remove('lenis-stopped');

      // Resume Lenis smooth scroll when modal closes
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.start();
      }

      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="cv-modal-backdrop"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cv-modal-heading"
        data-lenis-prevent="true"
        data-lenis-prevent-wheel="true"
        data-lenis-prevent-touch="true"
        onWheel={(e) => e.stopPropagation()}
      >
        <motion.div
          className="cv-modal-content glass-card"
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 18 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          onWheel={(e) => e.stopPropagation()}
        >
          {/* STICKY HEADER */}
          <div className="cv-modal-header">
            <div className="cv-modal-header-info">
              <div className="cv-modal-tag-row">
                <span className="cv-modal-tag">Official Curriculum Vitae</span>
                <span className="cv-modal-experience-badge">3+ Yrs Exp</span>
              </div>
              <h2 id="cv-modal-heading" className="cv-modal-title">Farooque Alam</h2>
              <p className="cv-modal-subtitle">
                Full Stack Developer • Kathmandu, Nepal • <a href="mailto:farooqueallam1@gmail.com" className="cv-header-link">farooqueallam1@gmail.com</a>
              </p>
            </div>

            <button
              type="button"
              className="cv-modal-close"
              onClick={onClose}
              aria-label="Close CV modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* VIEW TOGGLE TABS */}
          <div className="cv-modal-tabs">
            <button
              type="button"
              className={`cv-tab-btn ${activeView === 'formatted' ? 'active' : ''}`}
              onClick={() => setActiveView('formatted')}
            >
              <span className="cv-tab-icon">📋</span>
              <span>Formatted CV (Mobile Friendly)</span>
            </button>
            <button
              type="button"
              className={`cv-tab-btn ${activeView === 'pdf' ? 'active' : ''}`}
              onClick={() => setActiveView('pdf')}
            >
              <span className="cv-tab-icon">📄</span>
              <span>Original PDF Document</span>
            </button>
          </div>

          {/* SCROLLABLE MODAL BODY - Native scroll with Lenis prevention */}
          <div
            className="cv-modal-body"
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {activeView === 'formatted' ? (
              <div className="cv-formatted-container">
                {/* Contact Snapshot Banner */}
                <div className="cv-quick-contact glass-card">
                  <div className="cv-contact-item">
                    <span className="cv-ci-icon">📍</span>
                    <span>New Baneshwor-31, Kathmandu, Nepal</span>
                  </div>
                  <div className="cv-contact-item">
                    <span className="cv-ci-icon">✉️</span>
                    <a href="mailto:farooqueallam1@gmail.com">farooqueallam1@gmail.com</a>
                  </div>
                  <div className="cv-contact-item">
                    <span className="cv-ci-icon">📱</span>
                    <a href="tel:+9779818998937">+977-9818998937</a>
                  </div>
                </div>

                {/* Professional Summary */}
                <section className="cv-section">
                  <h3 className="cv-section-title">
                    <span className="cv-section-icon">🎯</span> Professional Summary
                  </h3>
                  <div className="cv-section-card glass-card">
                    <p className="cv-text">
                      Full Stack Developer with <strong>3 years of experience</strong> building dynamic, scalable, and user-friendly web applications using <strong>React, Angular, PHP, and TYPO3</strong>. Experienced in client-facing projects, CMS customization, and end-to-end feature development. Comfortable working with modern <strong>AI tools</strong> to accelerate development and research.
                    </p>
                  </div>
                </section>

                {/* Work Experience */}
                <section className="cv-section">
                  <h3 className="cv-section-title">
                    <span className="cv-section-icon">💼</span> Professional Experience
                  </h3>

                  <div className="cv-experience-timeline">
                    {/* Role 1 */}
                    <div className="cv-timeline-item glass-card">
                      <div className="cv-timeline-header">
                        <div>
                          <h4 className="cv-job-title">Full Stack Developer</h4>
                          <span className="cv-job-company">Nirekha Dot Com • Kausaltar, Kathmandu</span>
                        </div>
                        <span className="cv-job-period badge-cyan">January 2023 - Present</span>
                      </div>
                      <ul className="cv-bullets">
                        <li>Develop and maintain dynamic web applications using React, Angular, PHP, and TYPO3.</li>
                        <li>Handle a German client project for <strong>SCHITTLY</strong>, focusing on TYPO3 customization, template integration, and extension development.</li>
                        <li>Deliver robust multi-tenant architectures, RESTful APIs, and secure access-controlled portals.</li>
                      </ul>
                    </div>

                    {/* Role 2 */}
                    <div className="cv-timeline-item glass-card">
                      <div className="cv-timeline-header">
                        <div>
                          <h4 className="cv-job-title">Frontend Development Intern</h4>
                          <span className="cv-job-company">Imagio Creations • Sanepa, Kathmandu</span>
                        </div>
                        <span className="cv-job-period badge-purple">March 2022 - June 2022</span>
                      </div>
                      <ul className="cv-bullets">
                        <li>Assisted in developing responsive web pages using HTML, SCSS, and PHP.</li>
                        <li>Optimized cross-browser compatibility and mobile responsiveness for client web layouts.</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Key Projects */}
                <section className="cv-section">
                  <h3 className="cv-section-title">
                    <span className="cv-section-icon">🚀</span> Featured Production Projects
                  </h3>

                  <div className="cv-projects-grid">
                    <div className="cv-project-card glass-card">
                      <div className="cv-project-top">
                        <h4 className="cv-project-name">SchoolBaba: School Management System</h4>
                        <span className="cv-project-tag">In Active Development</span>
                      </div>
                      <p className="cv-project-desc">
                        Multi-tenant school management platform built with a <strong>Node.js/Express REST API</strong>, <strong>Next.js</strong> frontend, and <strong>PostgreSQL</strong> database.
                      </p>
                      <ul className="cv-project-bullets">
                        <li>Implemented JWT-based authentication with bcrypt password hashing and school-scoped data queries.</li>
                        <li>Architected Role-Based Access Control (RBAC) across admin, teacher, student, and parent roles.</li>
                        <li>Modules include school dashboard, student/parent portals, teacher assignment, bulk CSV import, and printable report documents.</li>
                      </ul>
                      <div className="cv-project-chips">
                        <span>Node.js</span>
                        <span>Next.js</span>
                        <span>PostgreSQL</span>
                        <span>JWT</span>
                        <span>RBAC</span>
                      </div>
                    </div>

                    <div className="cv-project-card glass-card">
                      <div className="cv-project-top">
                        <h4 className="cv-project-name">MartBus: Mart Billing System</h4>
                        <span className="cv-project-tag">Production</span>
                      </div>
                      <p className="cv-project-desc">
                        Full-scale billing and inventory management system with <strong>React</strong> frontend and <strong>TYPO3 (PHP)</strong> backend managing products, suppliers, inventory stock, and high-volume retail transactions.
                      </p>
                      <div className="cv-project-chips">
                        <span>React</span>
                        <span>TYPO3</span>
                        <span>PHP</span>
                        <span>Inventory</span>
                      </div>
                    </div>

                    <div className="cv-project-card glass-card">
                      <div className="cv-project-top">
                        <h4 className="cv-project-name">Appointment Scheduling System</h4>
                        <span className="cv-project-tag">Client Production</span>
                      </div>
                      <p className="cv-project-desc">
                        Dynamic appointment booking system with <strong>Angular</strong> frontend and <strong>TYPO3 (PHP)</strong> for backend appointment management, slot allocation, and calendar syncing.
                      </p>
                      <div className="cv-project-chips">
                        <span>Angular</span>
                        <span>TYPO3</span>
                        <span>PHP</span>
                        <span>Booking</span>
                      </div>
                    </div>

                    <div className="cv-project-card glass-card">
                      <div className="cv-project-top">
                        <h4 className="cv-project-name">RestroBaba & SportsBaba</h4>
                        <span className="cv-project-tag">Web Platforms</span>
                      </div>
                      <p className="cv-project-desc">
                        Web-based restaurant management platform (RestroBaba) and community sports platform (SportsBaba) for streamlined scheduling and order tracking.
                      </p>
                      <div className="cv-project-chips">
                        <span>React</span>
                        <span>Node.js</span>
                        <span>REST</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Education */}
                <section className="cv-section">
                  <h3 className="cv-section-title">
                    <span className="cv-section-icon">🎓</span> Education
                  </h3>
                  <div className="cv-edu-card glass-card">
                    <div className="cv-edu-header">
                      <div>
                        <h4 className="cv-edu-degree">Bachelor of Computer Application (BCA)</h4>
                        <span className="cv-edu-campus">Patan Nistha Campus, Lalitpur • Tribhuvan University</span>
                      </div>
                      <span className="cv-edu-status">Completed</span>
                    </div>
                  </div>
                </section>

                {/* Technical Skills & AI Toolchain */}
                <section className="cv-section">
                  <h3 className="cv-section-title">
                    <span className="cv-section-icon">⚡</span> Technical Arsenal & AI Toolchain
                  </h3>
                  <div className="cv-skills-summary-grid">
                    <div className="cv-skill-group glass-card">
                      <strong className="cv-skill-group-title">Frontend</strong>
                      <p>React, Angular, HTML5, CSS3, SCSS, Responsive Web Design, UI/UX Optimization</p>
                    </div>
                    <div className="cv-skill-group glass-card">
                      <strong className="cv-skill-group-title">Backend</strong>
                      <p>Node.js, PHP, TYPO3 CMS, C#, .NET (basics), REST APIs, JWT Auth</p>
                    </div>
                    <div className="cv-skill-group glass-card">
                      <strong className="cv-skill-group-title">Databases</strong>
                      <p>PostgreSQL, MySQL, SQL Server, Schema Design & Connection Pooling</p>
                    </div>
                    <div className="cv-skill-group glass-card">
                      <strong className="cv-skill-group-title">AI & Productivity</strong>
                      <p>Claude Code CLI, Claude, ChatGPT, Perplexity, Antigravity, Gemini API</p>
                    </div>
                  </div>
                </section>

                {/* Core Strengths */}
                <section className="cv-section">
                  <h3 className="cv-section-title">
                    <span className="cv-section-icon">🛡️</span> Core Strengths
                  </h3>
                  <div className="cv-strengths-row">
                    <span className="cv-strength-pill">🔍 Debugging & Diagnostics</span>
                    <span className="cv-strength-pill">🤝 Team Collaboration & Client Communication</span>
                    <span className="cv-strength-pill">⏱️ Time Management & Sprint Prioritization</span>
                  </div>
                </section>
              </div>
            ) : (
              /* PDF DOCUMENT VIEW */
              <div className="cv-pdf-view-container">
                <div className="cv-pdf-mobile-note">
                  <span>📱 If your browser does not render the PDF iframe below, tap <strong>Download PDF</strong> or <strong>Open in Tab</strong>.</span>
                </div>
                <div className="cv-modal-frame-container">
                  <iframe
                    src={`${cvPdfPath}#toolbar=1&navpanes=0`}
                    title="Farooque Alam Official CV"
                    className="cv-modal-iframe"
                  />
                </div>
              </div>
            )}
          </div>

          {/* STICKY FOOTER ACTIONS */}
          <div className="cv-modal-actions">
            <div className="cv-modal-contact-hint">
              <span>Direct WhatsApp: <strong>+977-9818998937</strong></span>
            </div>

            <div className="cv-modal-buttons">
              <a
                href={cvPdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline cv-btn"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                </svg>
                <span>Open in Tab</span>
              </a>

              <a
                href={cvPdfPath}
                download="Farooque_Alam_CV.pdf"
                className="btn btn-primary cv-btn"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CVModal;
