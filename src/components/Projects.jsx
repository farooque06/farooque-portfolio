import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_DATA = [
  {
    id: 'schoolbaba',
    title: 'SchoolBaba: School Management System',
    status: 'In Development',
    category: ['all', 'fullstack', 'nextjs', 'development'],
    tagline: 'Multi-tenant school management platform with school-scoped data isolation',
    description: 'Building a multi-tenant school management platform with a Node.js/Express REST API, a Next.js frontend, and PostgreSQL as the database.',
    deepDive: 'Implemented JWT-based authentication with bcrypt password hashing, role-based access control (RBAC), and school-scoped data queries to ensure complete tenant separation. Planned and ongoing modules include a unified school dashboard, student and parent portal, teacher assignment workflow, bulk CSV import, and customizable printable report cards.',
    architecture: 'Next.js 14 (App Router) + Node.js / Express REST API + PostgreSQL with connection pooling & multi-tenant schema isolation.',
    image: null,
    badgeColor: '#00d4ff',
    tags: ['Next.js', 'Node.js', 'Express', 'PostgreSQL', 'JWT', 'RBAC', 'Multi-Tenant'],
    metrics: 'Multi-Tenant • Role-Based Access • CSV Import',
    liveUrl: '#',
    githubUrl: 'https://github.com/farooque06',
    color: '#00d4ff',
    featured: true,
  },
  {
    id: 'restrobaba',
    title: 'RestroBaba: Restaurant Management',
    status: 'Completed',
    category: ['all', 'fullstack', 'react'],
    tagline: 'Full-cycle restaurant management, live table booking & POS orders',
    description: 'Developed a web-based restaurant management application covering real-time table reservations, digital menu browsing, and cashier billing.',
    deepDive: 'Engineered a streamlined food ordering workflow from customer table selection to kitchen display system (KDS) dispatching. Features dynamic item categorization, real-time bill calculations with discount handling, and daily sales auditing.',
    architecture: 'React + Node.js backend + PostgreSQL relational data store for structured orders, menus, and customer tabs.',
    image: null,
    badgeColor: '#f97316',
    tags: ['React', 'Node.js', 'Express', 'PostgreSQL', 'REST API', 'Billing'],
    metrics: 'Table Booking • KDS Order Dispatch • POS Billing',
    liveUrl: '#',
    githubUrl: 'https://github.com/farooque06',
    color: '#f97316',
    featured: true,
  },
  {
    id: 'sportsbaba',
    title: 'SportsBaba: Sports Platform',
    status: 'Completed',
    category: ['all', 'fullstack', 'react'],
    tagline: 'Tournament scheduling, team management, and match tracking engine',
    description: 'Developed a web-based sports application for organizing tournaments, tracking live fixtures, and managing team rosters.',
    deepDive: 'Provides automated tournament bracket generation, match timing schedules, real-time score updates, player profile statistics, and athletic facility/ground reservation workflows.',
    architecture: 'React with modular state handling, Node.js REST API layer, and real-time score synchronizer.',
    image: null,
    badgeColor: '#22c55e',
    tags: ['React', 'Tailwind CSS', 'Node.js', 'REST API', 'Sports Tech'],
    metrics: 'Brackets & Fixtures • Live Scoreboard • Team Rosters',
    liveUrl: '#',
    githubUrl: 'https://github.com/farooque06',
    color: '#22c55e',
    featured: false,
  },
  {
    id: 'appointment',
    title: 'Appointment Scheduling System',
    status: 'Client Project',
    category: ['all', 'angular', 'typo3'],
    tagline: 'Dynamic appointment booking system with calendar sync & slot management',
    description: 'Built a dynamic appointment booking system with Angular for the frontend and TYPO3 (PHP) for backend management of appointments.',
    deepDive: 'Engineered for smooth client booking experiences with dynamic calendar time slots, automated booking confirmation, conflict prevention algorithms, and a TYPO3 administrative console for practitioner schedules.',
    architecture: 'Angular standalone components + TYPO3 CMS (PHP) backend service + MySQL database.',
    image: null,
    badgeColor: '#DD0031',
    tags: ['Angular', 'TYPO3', 'PHP', 'MySQL', 'Calendar Sync'],
    metrics: 'Angular SPA • TYPO3 Engine • Automated Booking',
    liveUrl: '#',
    githubUrl: 'https://github.com/farooque06',
    color: '#DD0031',
    featured: true,
  },
  {
    id: 'martbus',
    title: 'MartBus: Mart Billing System',
    status: 'Production Deployed',
    category: ['all', 'fullstack', 'react', 'typo3'],
    tagline: 'Comprehensive billing and inventory management system for retail marts',
    description: 'Developed a billing and inventory management system with React for the frontend and TYPO3 (PHP) for the backend, managing products, suppliers, and sales.',
    deepDive: 'Created high-speed barcode checkout capabilities, supplier ledger accounting, low-stock notifications, automated GST/invoice printouts, and multi-period revenue reports for mart managers.',
    architecture: 'React frontend + TYPO3 PHP API backend + MySQL relational database.',
    image: '/billbaba-cover.jpg',
    badgeColor: '#a855f7',
    tags: ['React', 'TYPO3', 'PHP', 'MySQL', 'Inventory', 'POS'],
    metrics: 'Inventory Tracking • Supplier Ledgers • Barcode POS',
    liveUrl: '#',
    githubUrl: 'https://github.com/farooque06/MartBis_backend',
    color: '#a855f7',
    featured: true,
  },
  {
    id: 'schittly',
    title: 'SCHITTLY: German Client Enterprise Portal',
    status: 'International Client',
    category: ['all', 'typo3'],
    tagline: 'Enterprise TYPO3 CMS customization, template integration & custom extensions',
    description: 'Handled an international German client project for SCHITTLY at Nirekha Dot Com, focusing on TYPO3 customization, template integration, and extension development.',
    deepDive: 'Delivered strict European-standard performance optimizations, custom TYPO3 Fluid extensions, responsive multi-language layout adaptations, and seamless client collaboration across timezones.',
    architecture: 'Enterprise TYPO3 CMS (PHP), Fluid Templating Engine, SCSS, JavaScript, MySQL.',
    image: null,
    badgeColor: '#eab308',
    tags: ['TYPO3', 'PHP', 'Fluid Templates', 'Extensions', 'German Client', 'Enterprise CMS'],
    metrics: 'International Client • Custom Extensions • Fluid Templates',
    liveUrl: '#',
    githubUrl: 'https://github.com/farooque06',
    color: '#eab308',
    featured: true,
  },
];

const FILTER_TABS = [
  { key: 'all', label: 'All Projects' },
  { key: 'fullstack', label: 'Full Stack' },
  { key: 'nextjs', label: 'Next.js & Node' },
  { key: 'angular', label: 'Angular & TYPO3' },
  { key: 'development', label: 'In Development' },
];

const Projects = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects__subtitle',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.projects__header',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.projects__title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.projects__header',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredProjects = PROJECTS_DATA.filter((project) =>
    project.category.includes(activeTab)
  );

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  };

  return (
    <section id="projects" className="projects section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="projects__header section-title">
          <div className="projects__eyebrow">
            <span className="projects__badge-live">Real-World Engineering</span>
            <span className="projects__subtitle section-subtitle">Curated Portfolio</span>
          </div>
          <h2 className="projects__title">
            Featured <span className="gradient-text">Projects & Systems</span>
          </h2>
          <p className="projects__description">
            Production applications, multi-tenant architectures, and enterprise client solutions built by Farooque Alam using React, Next.js, Node.js, Angular, and TYPO3.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="projects__tabs">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              className={`projects__tab-btn ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  className="projects__tab-indicator"
                  layoutId="projectTabIndicator"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div className="projects__grid" layout>
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="projects__card glass-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setSelectedProject(project)}
                style={{ '--project-color': project.color }}
              >
                {/* Visual Banner */}
                <div className="projects__card-image">
                  {project.image ? (
                    <img src={project.image} alt={project.title} loading="lazy" />
                  ) : (
                    <div className="projects__card-placeholder">
                      <div className="projects__card-code-preview">
                        <span className="projects__card-code-tag">{project.status}</span>
                        <span className="projects__card-symbol">
                          {project.tags[0] === 'Next.js' ? '▲' : project.tags[0] === 'Angular' ? '🅰️' : '⚛️'}
                        </span>
                        <span className="projects__card-code-line">{project.metrics}</span>
                      </div>
                    </div>
                  )}
                  <div className="projects__status-pill" style={{ borderColor: project.badgeColor, color: project.badgeColor }}>
                    <span className="projects__status-dot" style={{ background: project.badgeColor }}></span>
                    {project.status}
                  </div>
                </div>

                {/* Card Content */}
                <div className="projects__card-content">
                  <div className="projects__card-top">
                    <h3 className="projects__card-title">{project.title}</h3>
                    <p className="projects__card-tagline">{project.tagline}</p>
                  </div>

                  <p className="projects__card-description">{project.description}</p>

                  <div className="projects__card-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="projects__card-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="projects__card-footer">
                    <span className="projects__details-prompt">
                      View Architecture & Details →
                    </span>
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects__quick-link"
                        onClick={(e) => e.stopPropagation()}
                        title="GitHub Repository"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Deep Dive Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
              <motion.div
                className="project-modal glass-card"
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                onClick={(e) => e.stopPropagation()}
                style={{ '--modal-accent': selectedProject.color }}
              >
                <div className="project-modal-header">
                  <div>
                    <span className="project-modal-badge" style={{ color: selectedProject.color, borderColor: selectedProject.color }}>
                      {selectedProject.status}
                    </span>
                    <h3 className="project-modal-title">{selectedProject.title}</h3>
                    <p className="project-modal-tagline">{selectedProject.tagline}</p>
                  </div>
                  <button
                    className="project-modal-close"
                    onClick={() => setSelectedProject(null)}
                    aria-label="Close project modal"
                  >
                    ✕
                  </button>
                </div>

                <div className="project-modal-body">
                  <div className="project-modal-section">
                    <h4>Overview & Problem Solved</h4>
                    <p>{selectedProject.description}</p>
                  </div>

                  <div className="project-modal-section">
                    <h4>Technical Implementation & Key Modules</h4>
                    <p>{selectedProject.deepDive}</p>
                  </div>

                  <div className="project-modal-section">
                    <h4>System Architecture & Database Strategy</h4>
                    <div className="project-modal-arch-box">
                      <code>{selectedProject.architecture}</code>
                    </div>
                  </div>

                  <div className="project-modal-section">
                    <h4>Technology Stack</h4>
                    <div className="projects__card-tags">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="projects__card-tag" style={{ borderColor: selectedProject.color, color: selectedProject.color }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="project-modal-footer">
                  <a
                    href="mailto:farooqueallam1@gmail.com?subject=Inquiry%20regarding%20project:%20"
                    className="btn btn-primary"
                    onClick={() => setSelectedProject(null)}
                  >
                    Discuss a Similar System with Farooque
                  </a>
                  {selectedProject.githubUrl && selectedProject.githubUrl !== '#' && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                    >
                      View GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Projects;
