import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

// Category Tabs - "All Arsenal" option removed as requested
const TABS = [
  { id: 'frontend', label: 'Frontend & UI', icon: '⚛️', countTag: '6 Tech' },
  { id: 'backend', label: 'Backend & CMS', icon: '⚙️', countTag: '5 Tech' },
  { id: 'database', label: 'Databases & SQL', icon: '🗄️', countTag: '4 Tech' },
  { id: 'ai', label: 'AI Acceleration', icon: '🧠', countTag: '5 Tools' },
  { id: 'tools', label: 'Tools & DevOps', icon: '🛠️', countTag: '4 Tools' },
];

const TAB_INSIGHTS = {
  frontend: {
    title: 'Modern Reactive Frontend Architecture',
    desc: 'Deep hands-on experience crafting production web applications with React, Next.js, Angular, and cross-browser SCSS styling optimized for high performance and UX.',
    highlight: 'React 19 • Next.js • Angular • Responsive SCSS',
  },
  backend: {
    title: 'Scalable APIs & Enterprise CMS Engineering',
    desc: 'Building multi-tenant REST APIs with Node.js/Express, JWT authentication with bcrypt password hashing, and enterprise TYPO3 extension development for German client SCHITTLY.',
    highlight: 'Node.js • TYPO3 • PHP 8+ • JWT Auth & RBAC',
  },
  database: {
    title: 'Relational Modeling & Multi-Tenant Isolation',
    desc: 'Designing school-scoped queries, PostgreSQL connection pooling, schema migrations, and secure RBAC permission tables across production systems.',
    highlight: 'PostgreSQL • MySQL • Schema Design • SQL Server',
  },
  ai: {
    title: 'Autonomous Coding & AI Toolchain Acceleration',
    desc: 'Leveraging Claude Code CLI, ChatGPT, Perplexity, Antigravity, and Gemini API SDKs to accelerate research, unit tests, refactoring, and feature delivery.',
    highlight: 'Claude Code • Gemini API • Perplexity • Antigravity',
  },
  tools: {
    title: 'Developer Environment & Version Control',
    desc: 'Disciplined Git workflows, branch strategies, VS Code dev environment, Webpack bundlers, and Postman API contract testing.',
    highlight: 'Git & GitHub • VS Code • Webpack • Postman QA',
  },
};

const ALL_SKILLS = [
  // Frontend
  {
    category: 'frontend',
    categoryName: 'Frontend',
    name: 'React & React 19',
    icon: '⚛️',
    level: 95,
    tier: 'Expert',
    color: '#61DAFB',
    usage: 'Core SPA library for SchoolBaba & MartBus',
  },
  {
    category: 'frontend',
    categoryName: 'Frontend',
    name: 'Next.js',
    icon: '▲',
    level: 90,
    tier: 'Advanced',
    color: '#00d4ff',
    usage: 'SchoolBaba multi-tenant platform frontend',
  },
  {
    category: 'frontend',
    categoryName: 'Frontend',
    name: 'Angular',
    icon: '🅰️',
    level: 85,
    tier: 'Advanced',
    color: '#DD0031',
    usage: 'Appointment Scheduling booking frontend',
  },
  {
    category: 'frontend',
    categoryName: 'Frontend',
    name: 'HTML5 & Semantic Web',
    icon: '🌐',
    level: 95,
    tier: 'Expert',
    color: '#E34F26',
    usage: 'Accessible, SEO-compliant architectures',
  },
  {
    category: 'frontend',
    categoryName: 'Frontend',
    name: 'CSS3 & SCSS Systems',
    icon: '🎨',
    level: 92,
    tier: 'Expert',
    color: '#CC6699',
    usage: 'Responsive design & complex animations',
  },
  {
    category: 'frontend',
    categoryName: 'Frontend',
    name: 'UI/UX Optimization',
    icon: '✨',
    level: 88,
    tier: 'Advanced',
    color: '#a855f7',
    usage: 'Micro-interactions, mobile UX & web vitals',
  },

  // Backend
  {
    category: 'backend',
    categoryName: 'Backend',
    name: 'Node.js & Express',
    icon: '🟢',
    level: 90,
    tier: 'Expert',
    color: '#339933',
    usage: 'SchoolBaba REST APIs & micro-services',
  },
  {
    category: 'backend',
    categoryName: 'Backend',
    name: 'PHP 8+',
    icon: '🐘',
    level: 88,
    tier: 'Advanced',
    color: '#777BB4',
    usage: 'Backend services at Nirekha Dot Com',
  },
  {
    category: 'backend',
    categoryName: 'Backend',
    name: 'TYPO3 CMS & Extbase',
    icon: '🔷',
    level: 92,
    tier: 'Expert',
    color: '#FF8700',
    usage: 'German client SCHITTLY customization & extensions',
  },
  {
    category: 'backend',
    categoryName: 'Backend',
    name: 'REST APIs & JWT Auth',
    icon: '🔒',
    level: 92,
    tier: 'Expert',
    color: '#00d4ff',
    usage: 'Bcrypt hashing, tokens & RBAC permissions',
  },
  {
    category: 'backend',
    categoryName: 'Backend',
    name: 'C# & .NET',
    icon: '💻',
    level: 68,
    tier: 'Proficient',
    color: '#239120',
    usage: 'Enterprise system fundamentals & OOP',
  },

  // Databases
  {
    category: 'database',
    categoryName: 'Database',
    name: 'PostgreSQL',
    icon: '🐘',
    level: 90,
    tier: 'Expert',
    color: '#336791',
    usage: 'School-scoped tables & high-throughput pooling',
  },
  {
    category: 'database',
    categoryName: 'Database',
    name: 'MySQL',
    icon: '🗄️',
    level: 88,
    tier: 'Advanced',
    color: '#4479A1',
    usage: 'Relational queries, index optimization & joins',
  },
  {
    category: 'database',
    categoryName: 'Database',
    name: 'SQL Server',
    icon: '📊',
    level: 78,
    tier: 'Proficient',
    color: '#CC2927',
    usage: 'Enterprise relational database structures',
  },
  {
    category: 'database',
    categoryName: 'Database',
    name: 'Schema Design & RBAC',
    icon: '🛡️',
    level: 92,
    tier: 'Expert',
    color: '#22c55e',
    usage: 'Multi-tenant isolation & security bounds',
  },

  // AI Tools
  {
    category: 'ai',
    categoryName: 'AI Workflows',
    name: 'Claude Code CLI & Claude',
    icon: '🧠',
    level: 96,
    tier: 'Expert',
    color: '#d97706',
    usage: 'Autonomous terminal refactoring & system logic',
  },
  {
    category: 'ai',
    categoryName: 'AI Workflows',
    name: 'ChatGPT & Prompting',
    icon: '⚡',
    level: 94,
    tier: 'Expert',
    color: '#10b981',
    usage: 'Architecture brainstorming & unit test gen',
  },
  {
    category: 'ai',
    categoryName: 'AI Workflows',
    name: 'Perplexity Deep Research',
    icon: '🔍',
    level: 92,
    tier: 'Expert',
    color: '#06b6d4',
    usage: 'Framework troubleshooting & documentation',
  },
  {
    category: 'ai',
    categoryName: 'AI Workflows',
    name: 'Antigravity & AI APIs',
    icon: '🚀',
    level: 88,
    tier: 'Advanced',
    color: '#8b5cf6',
    usage: 'Agentic workflows & model pipeline piping',
  },
  {
    category: 'ai',
    categoryName: 'AI Workflows',
    name: 'Gemini API Full-Stack',
    icon: '✨',
    level: 90,
    tier: 'Advanced',
    color: '#00d4ff',
    usage: 'Embeddings, live AI twin server endpoints',
  },

  // Tools & DevOps
  {
    category: 'tools',
    categoryName: 'Tools',
    name: 'Git & GitHub',
    icon: '🐙',
    level: 92,
    tier: 'Expert',
    color: '#F05032',
    usage: 'PR reviews, branch hygiene & release tags',
  },
  {
    category: 'tools',
    categoryName: 'Tools',
    name: 'VS Code & Visual Studio',
    icon: '💻',
    level: 94,
    tier: 'Expert',
    color: '#007ACC',
    usage: 'Configured debuggers, linting & extensions',
  },
  {
    category: 'tools',
    categoryName: 'Tools',
    name: 'Webpack & Build Tools',
    icon: '📦',
    level: 82,
    tier: 'Advanced',
    color: '#8DD6F9',
    usage: 'Asset bundling, optimization & Vite pipeline',
  },
  {
    category: 'tools',
    categoryName: 'Tools',
    name: 'Postman & API QA',
    icon: '🚀',
    level: 90,
    tier: 'Expert',
    color: '#FF6C37',
    usage: 'Endpoint validation, mocks & auth headers',
  },
];

const Skills = () => {
  const sectionRef = useRef(null);
  // Default to 'frontend' - 'all' tab removed completely
  const [activeTab, setActiveTab] = useState('frontend');
  const [searchQuery, setSearchQuery] = useState('');

  // Counts per tab
  const counts = useMemo(() => {
    const acc = {};
    TABS.forEach((t) => {
      acc[t.id] = ALL_SKILLS.filter((s) => s.category === t.id).length;
    });
    return acc;
  }, []);

  // Filtered skills based on active tab and search query
  const filteredSkills = useMemo(() => {
    let result = ALL_SKILLS.filter((s) => s.category === activeTab);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      // If user is searching, also check if they match within the current category first,
      // or if not found, fall back to searching across all categories
      const matchInCurrent = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.usage.toLowerCase().includes(q) ||
          s.tier.toLowerCase().includes(q)
      );

      if (matchInCurrent.length > 0) {
        return matchInCurrent;
      }

      // If nothing in current category matches, search across all categories
      return ALL_SKILLS.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.usage.toLowerCase().includes(q) ||
          s.categoryName.toLowerCase().includes(q) ||
          s.tier.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeTab, searchQuery]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills__header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.skills__header',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeInsight = TAB_INSIGHTS[activeTab] || TAB_INSIGHTS.frontend;
  const activeTabMeta = TABS.find((t) => t.id === activeTab) || TABS[0];

  return (
    <section id="skills" className="skills section" ref={sectionRef}>
      <div className="container">
        {/* Section Header */}
        <div className="skills__header section-title">
          <span className="skills__subtitle section-subtitle">Technical Proficiency</span>
          <h2 className="skills__title">
            Technologies & <span className="gradient-text">Engineering Arsenal</span>
          </h2>
          <p className="skills__description">
            Validated across 3 years of production applications, German client systems (SCHITTLY), and cutting-edge AI acceleration.
          </p>
        </div>

        {/* 2-Column Layout: Left Sidebar (Tabs & Search) + Right Content (Cards & Insights) */}
        <div className="skills__layout">
          {/* LEFT SIDEBAR: Category Tabs & Filters */}
          <aside className="skills__sidebar">
            <div className="skills__sidebar-sticky">
              <div className="skills__sidebar-header">
                <span className="skills__sidebar-label">Stack Categories</span>
                <span className="skills__sidebar-badge">5 Domains</span>
              </div>

              {/* Search Filter Box in Sidebar */}
              <div className="skills__search-box">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Filter tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="skills__search-input"
                  aria-label="Filter technology stack"
                />
                {searchQuery && (
                  <button
                    className="skills__search-clear"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear filter"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Vertical Category Tabs on the Left */}
              <div className="skills__vertical-nav" role="tablist" aria-label="Technology Categories">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      role="tab"
                      aria-selected={isActive}
                      className={`skills__vtab-btn ${isActive ? 'active' : ''}`}
                      onClick={() => {
                        setActiveTab(tab.id);
                        if (searchQuery) setSearchQuery('');
                      }}
                    >
                      <div className="skills__vtab-left">
                        <span className="skills__vtab-icon">{tab.icon}</span>
                        <div className="skills__vtab-text">
                          <span className="skills__vtab-title">{tab.label}</span>
                          <span className="skills__vtab-tag">{tab.countTag}</span>
                        </div>
                      </div>
                      <span className="skills__vtab-badge">{counts[tab.id]}</span>

                      {isActive && (
                        <motion.div
                          layoutId="skillsActiveSidebarIndicator"
                          className="skills__vtab-indicator"
                          transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Sidebar Quick Summary Card */}
              <div className="skills__sidebar-card glass-card">
                <div className="skills__sidebar-stat">
                  <span className="skills__sidebar-stat-val">3+</span>
                  <span className="skills__sidebar-stat-txt">Years Production Engineering</span>
                </div>
                <div className="skills__sidebar-stat-divider" />
                <div className="skills__sidebar-meta">
                  <span>Client-verified: <strong>SCHITTLY (DE)</strong></span>
                  <span>Full-Stack: <strong>React • Node • TYPO3</strong></span>
                </div>
              </div>
            </div>
          </aside>

          {/* RIGHT CONTENT: Category Banner, Stats, and Skills Grid */}
          <main className="skills__content">
            {/* Active Category Insight Banner */}
            <div className="skills__insight-card glass-card">
              <div className="skills__insight-content">
                <div className="skills__insight-badge">
                  <span>{activeTabMeta.icon}</span>
                  <span>{activeTabMeta.label}</span>
                </div>
                <div className="skills__insight-body">
                  <h3 className="skills__insight-title">{activeInsight.title}</h3>
                  <p className="skills__insight-desc">{activeInsight.desc}</p>
                  <div className="skills__insight-highlight">
                    <span className="skills__insight-key">Key Stack:</span> {activeInsight.highlight}
                  </div>
                </div>
              </div>
            </div>

            {/* Results Counter if searching */}
            {searchQuery && (
              <div className="skills__search-status">
                <span>
                  Showing <strong>{filteredSkills.length}</strong> results for "<em>{searchQuery}</em>"
                </span>
                <button
                  type="button"
                  className="skills__search-reset-btn"
                  onClick={() => setSearchQuery('')}
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Skills Cards Grid */}
            <motion.div layout className="skills__grid">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    layout
                    initial={{ opacity: 0, scale: 0.94, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -12 }}
                    transition={{ duration: 0.22 }}
                    className="skills__card glass-card"
                    whileHover={{
                      y: -5,
                      boxShadow: `0 16px 36px rgba(0, 0, 0, 0.45), 0 0 25px ${skill.color}35`,
                    }}
                    style={{ '--skill-color': skill.color }}
                  >
                    <div className="skills__card-top">
                      <div
                        className="skills__card-icon"
                        style={{
                          background: `${skill.color}15`,
                          borderColor: `${skill.color}35`,
                        }}
                      >
                        <span>{skill.icon}</span>
                      </div>
                      <div className="skills__card-tier-wrap">
                        <span className="skills__card-category">{skill.categoryName}</span>
                        <span
                          className="skills__card-tier"
                          style={{
                            color: skill.color,
                            borderColor: `${skill.color}45`,
                            backgroundColor: `${skill.color}12`,
                          }}
                        >
                          {skill.tier}
                        </span>
                      </div>
                    </div>

                    <div className="skills__card-body">
                      <h4 className="skills__card-name">{skill.name}</h4>
                      <p className="skills__card-usage">{skill.usage}</p>
                    </div>

                    <div className="skills__card-level">
                      <div className="skills__card-level-header">
                        <span className="skills__card-level-label">Proficiency</span>
                        <span className="skills__card-level-text" style={{ color: skill.color }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="skills__card-level-bar">
                        <motion.div
                          className="skills__card-level-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.7, ease: 'easeOut' }}
                          style={{
                            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredSkills.length === 0 && (
              <div className="skills__empty glass-card">
                <span className="skills__empty-icon">🔍</span>
                <p>No technologies matched "<strong>{searchQuery}</strong>".</p>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Filter
                </button>
              </div>
            )}

            {/* Core Competencies from Farooque's CV */}
            <div className="skills__other">
              <div className="skills__other-header">
                <span className="skills__other-icon">🛡️</span>
                <div>
                  <h3 className="skills__other-title">Core Competencies & Production Architecture</h3>
                  <p className="skills__other-subtitle">
                    Applied across client deliverables, security modules, and international teams
                  </p>
                </div>
              </div>
              <div className="skills__tags">
                {[
                  { label: 'Multi-Tenant Data Isolation', badge: 'SchoolBaba' },
                  { label: 'JWT Auth & Bcrypt Hashing', badge: 'Security' },
                  { label: 'Role-Based Access Control (RBAC)', badge: 'Auth' },
                  { label: 'German Client (SCHITTLY) Delivery', badge: 'TYPO3' },
                  { label: 'Fluid Template Engine & Extbase', badge: 'CMS' },
                  { label: 'PostgreSQL Pool Optimization', badge: 'Database' },
                  { label: 'Cross-Browser SCSS Architecture', badge: 'UI/UX' },
                  { label: 'System Diagnostics & Debugging', badge: 'Core' },
                  { label: 'Time Management & Agile Sprints', badge: 'Team' },
                  { label: 'AI Workflow Integration (Claude / Gemini)', badge: 'Productivity' },
                ].map((item) => (
                  <div key={item.label} className="skills__tag glass-card">
                    <span className="skills__tag-check">✓</span>
                    <span className="skills__tag-name">{item.label}</span>
                    <span className="skills__tag-context">{item.badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Skills;
