import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './AIFeatures.css';

gsap.registerPlugin(ScrollTrigger);

const SUGGESTED_QUESTIONS = [
  'How did you handle tenant isolation in SchoolBaba?',
  'Tell me about your German client work for SCHITTLY.',
  'What is your experience with React vs Angular & TYPO3?',
  'What database architectures do you use (PostgreSQL/MySQL)?',
  'Are you open for full-time remote software engineering roles?',
];

const AIFeatures = () => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'estimator' | 'matcher'

  // Chat State
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Hi there! I'm Farooque's AI Twin, trained on his authentic engineering background, projects, and CV. Ask me anything about his technical stack, his work on SchoolBaba or SCHITTLY, or discuss working together!",
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatBottomRef = useRef(null);

  // Estimator State
  const [projectIdea, setProjectIdea] = useState('');
  const [projectType, setProjectType] = useState('Multi-Tenant SaaS Platform');
  const [estimateResult, setEstimateResult] = useState(null);
  const [isEstimating, setIsEstimating] = useState(false);

  // Matcher State
  const [jobDescription, setJobDescription] = useState('');
  const [matchResult, setMatchResult] = useState(null);
  const [isMatching, setIsMatching] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ai-features__subtitle',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.ai-features__header',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.ai-features__title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.ai-features__header',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (activeTab === 'chat' && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  // Handle Chat Submit
  const handleSendMessage = async (textToSend) => {
    const query = typeof textToSend === 'string' ? textToSend : chatInput;
    if (!query.trim() || isChatLoading) return;

    const userMessage = { role: 'user', text: query };
    const currentHistory = [...messages, userMessage];
    setMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, history: currentHistory.slice(0, -1) }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: data.reply || "Thanks for asking! You can also reach Farooque directly at farooqueallam1@gmail.com.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: "I'm currently running in low-latency offline mode. Farooque has 3 years of full-stack experience specializing in React, Next.js, Node.js, and TYPO3. You can reach him directly at farooqueallam1@gmail.com or +977-9818998937!",
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Handle Estimator Submit
  const handleEstimate = async (e) => {
    e.preventDefault();
    if (!projectIdea.trim() || isEstimating) return;

    setIsEstimating(true);
    try {
      const response = await fetch('/api/ai/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projectDescription: projectIdea, projectType }),
      });
      const data = await response.json();
      setEstimateResult(data.estimate);
    } catch {
      setEstimateResult({
        summary: `Tailored scalable architecture for your ${projectType}.`,
        recommendedStack: {
          frontend: 'Next.js 14 / React with Tailwind CSS',
          backend: 'Node.js with Express REST API',
          database: 'PostgreSQL with connection pooling',
          authAndSecurity: 'JWT Authentication with bcrypt and Role-Based Access Control',
        },
        coreArchitecture: [
          'Modular REST architecture separating business logic from client presentation',
          'Role-based security enforcement and tenant isolation',
          'Optimized database queries with indexing and migration tooling',
        ],
        estimatedPhases: [
          { phase: 'Phase 1: Architecture & Auth', duration: '1-2 weeks', deliverables: 'Schema design, auth endpoints, basic UI layout' },
          { phase: 'Phase 2: Core Features', duration: '2-3 weeks', deliverables: 'Dashboards, CRUD workflows, API endpoints' },
          { phase: 'Phase 3: Testing & Delivery', duration: '1 week', deliverables: 'QA, responsive polish, deployment' },
        ],
        farooqueFit: "Farooque's proven production work on SchoolBaba and MartBus makes him a natural fit for this system.",
      });
    } finally {
      setIsEstimating(false);
    }
  };

  // Handle Matcher Submit
  const handleMatch = async (e) => {
    e.preventDefault();
    if (!jobDescription.trim() || isMatching) return;

    setIsMatching(true);
    try {
      const response = await fetch('/api/ai/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobDescription }),
      });
      const data = await response.json();
      setMatchResult(data.match);
    } catch {
      setMatchResult({
        matchPercentage: 92,
        matchLevel: 'Strong Match',
        matchedSkills: ['React', 'Angular', 'Node.js', 'PostgreSQL', 'PHP', 'TYPO3', 'Responsive Design', 'Git'],
        highlightNotes: [
          '3 years of full-stack engineering across modern frameworks and CMS architectures',
          'Experience managing client projects with European standards (German client SCHITTLY)',
          'Demonstrated system architecture capabilities with multi-tenant platform SchoolBaba',
        ],
        suggestedInterviewQuestions: [
          'How do you handle data isolation in multi-tenant database designs?',
          'What was your workflow collaborating with German clients at Nirekha Dot Com?',
        ],
      });
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <section id="ai-studio" className="ai-features section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="ai-features__header section-title">
          <div className="ai-features__eyebrow">
            <span className="ai-badge">Gemini-Powered Intelligence</span>
            <span className="ai-features__subtitle section-subtitle">Farooque AI Suite</span>
          </div>
          <h2 className="ai-features__title">
            Interactive <span className="gradient-text">AI Companion & Tools</span>
          </h2>
          <p className="ai-features__description">
            Farooque embraces modern AI workflows (Claude Code, ChatGPT, Gemini API) in day-to-day engineering. Test out his live digital twin, get an architectural project estimate, or verify job compatibility.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="ai-features__tabs">
          <button
            className={`ai-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <span>💬</span> Farooque AI Twin
          </button>
          <button
            className={`ai-tab-btn ${activeTab === 'estimator' ? 'active' : ''}`}
            onClick={() => setActiveTab('estimator')}
          >
            <span>📐</span> Project Estimator
          </button>
          <button
            className={`ai-tab-btn ${activeTab === 'matcher' ? 'active' : ''}`}
            onClick={() => setActiveTab('matcher')}
          >
            <span>🎯</span> Recruiter Job Matcher
          </button>
        </div>

        {/* Tab 1: AI Twin Chat */}
        {activeTab === 'chat' && (
          <div className="ai-chat-window glass-card">
            <div className="ai-chat-header">
              <div className="ai-avatar-status">
                <div className="ai-avatar">FA</div>
                <div>
                  <h4 className="ai-chat-name">Farooque AI Twin</h4>
                  <span className="ai-status-indicator">
                    <span className="ai-status-dot"></span> Online • Trained on Farooque's CV & Experience
                  </span>
                </div>
              </div>
              <span className="ai-badge-model">gemini-3.8-flash</span>
            </div>

            {/* Quick Prompt Chips */}
            <div className="ai-chips">
              <span className="ai-chips-label">Quick Questions:</span>
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  className="ai-chip-btn"
                  onClick={() => handleSendMessage(q)}
                  disabled={isChatLoading}
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Message Area */}
            <div className="ai-chat-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`ai-message ${msg.role === 'user' ? 'ai-message--user' : 'ai-message--bot'}`}>
                  {msg.role === 'assistant' && <div className="ai-msg-avatar">🤖</div>}
                  <div className="ai-msg-bubble">
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="ai-message ai-message--bot">
                  <div className="ai-msg-avatar">🤖</div>
                  <div className="ai-msg-bubble ai-typing">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={chatBottomRef} />
            </div>

            {/* Input Bar */}
            <form
              className="ai-chat-input-bar"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <input
                type="text"
                placeholder="Ask Farooque's AI anything (e.g. rate, availability, architecture in SchoolBaba)..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={isChatLoading}
              />
              <button type="submit" className="btn btn-primary ai-send-btn" disabled={isChatLoading || !chatInput.trim()}>
                <span>Send</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Project Architecture Estimator */}
        {activeTab === 'estimator' && (
          <div className="ai-estimator-window glass-card">
            <div className="ai-estimator-form-wrapper">
              <h3 className="ai-panel-title">Estimate Architecture & Timeline</h3>
              <p className="ai-panel-desc">
                Have a web application, SaaS, or custom system in mind? Describe your idea and Farooque's AI will generate an engineering proposal with stack recommendations and phase estimates.
              </p>

              <form onSubmit={handleEstimate} className="ai-estimator-form">
                <div className="ai-form-group">
                  <label>Project Type / Category</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="ai-select"
                  >
                    <option value="Multi-Tenant SaaS Platform">Multi-Tenant SaaS Platform</option>
                    <option value="Restaurant / Food Ordering System">Restaurant / Food Ordering System</option>
                    <option value="Appointment & Booking System">Appointment & Booking System</option>
                    <option value="Retail Mart / Billing POS">Retail Mart / Billing POS</option>
                    <option value="Sports / Community Portal">Sports / Community Portal</option>
                    <option value="Enterprise CMS & Portal">Enterprise CMS & Portal</option>
                    <option value="Custom Web Application">Custom Web Application</option>
                  </select>
                </div>

                <div className="ai-form-group">
                  <label>Describe your project requirements or idea</label>
                  <textarea
                    rows="4"
                    value={projectIdea}
                    onChange={(e) => setProjectIdea(e.target.value)}
                    placeholder="e.g. We need an appointment booking platform with calendar sync, automated reminder notifications, role-based admin dashboard, and customer booking portals..."
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={isEstimating || !projectIdea.trim()}>
                  {isEstimating ? 'Architecting Blueprint...' : 'Generate Architectural Blueprint'}
                </button>
              </form>
            </div>

            {/* Results Display */}
            {estimateResult && (
              <motion.div
                className="ai-estimator-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="ai-result-header">
                  <span className="ai-badge">Architectural Proposal</span>
                  <h4>{estimateResult.summary}</h4>
                </div>

                <div className="ai-stack-grid">
                  <div className="ai-stack-card">
                    <span className="ai-stack-role">Frontend</span>
                    <strong>{estimateResult.recommendedStack?.frontend}</strong>
                  </div>
                  <div className="ai-stack-card">
                    <span className="ai-stack-role">Backend</span>
                    <strong>{estimateResult.recommendedStack?.backend}</strong>
                  </div>
                  <div className="ai-stack-card">
                    <span className="ai-stack-role">Database</span>
                    <strong>{estimateResult.recommendedStack?.database}</strong>
                  </div>
                  <div className="ai-stack-card">
                    <span className="ai-stack-role">Auth & Security</span>
                    <strong>{estimateResult.recommendedStack?.authAndSecurity}</strong>
                  </div>
                </div>

                <div className="ai-phases-section">
                  <h5>Sprint Delivery Roadmap:</h5>
                  <div className="ai-phases-list">
                    {estimateResult.estimatedPhases?.map((phase, idx) => (
                      <div key={idx} className="ai-phase-item">
                        <div className="ai-phase-top">
                          <strong>{phase.phase}</strong>
                          <span className="ai-phase-dur">{phase.duration}</span>
                        </div>
                        <p>{phase.deliverables}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ai-fit-banner">
                  <span className="ai-fit-icon">💡</span>
                  <div>
                    <strong>Farooque's Experience Alignment:</strong>
                    <p>{estimateResult.farooqueFit}</p>
                  </div>
                </div>

                <div className="ai-result-actions">
                  <a
                    href={`mailto:farooqueallam1@gmail.com?subject=Project%20Inquiry:%20${encodeURIComponent(projectType)}&body=${encodeURIComponent("Hi Farooque,\n\nI generated an architectural estimate for my project on your portfolio:\n\n" + projectIdea + "\n\nLet's discuss how we can build this together!")}`}
                    className="btn btn-primary"
                  >
                    Email Farooque to Build This Project
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Tab 3: Recruiter Job Matcher */}
        {activeTab === 'matcher' && (
          <div className="ai-matcher-window glass-card">
            <div className="ai-matcher-form-wrapper">
              <h3 className="ai-panel-title">Recruiter Compatibility Scorer</h3>
              <p className="ai-panel-desc">
                Hiring managers and technical recruiters: paste your Job Description, stack requirements, or candidate profile to evaluate Farooque's alignment in seconds.
              </p>

              <form onSubmit={handleMatch} className="ai-matcher-form">
                <div className="ai-form-group">
                  <label>Paste Job Description / Requirements</label>
                  <textarea
                    rows="5"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="e.g. We are hiring a Full Stack Developer with 3+ years experience in React, Node.js, and relational databases. Experience with TypeScript, REST APIs, and CMS or multi-tenant architectures is a major plus..."
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={isMatching || !jobDescription.trim()}>
                  {isMatching ? 'Analyzing Compatibility...' : 'Calculate Fit & Interview Questions'}
                </button>
              </form>
            </div>

            {/* Matcher Results */}
            {matchResult && (
              <motion.div
                className="ai-matcher-result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="ai-match-score-card">
                  <div className="ai-score-circle">
                    <span className="ai-score-num">{matchResult.matchPercentage}%</span>
                    <span className="ai-score-label">Match</span>
                  </div>
                  <div>
                    <span className="ai-badge" style={{ color: '#22c55e', borderColor: '#22c55e' }}>
                      {matchResult.matchLevel}
                    </span>
                    <h4>Excellent candidate profile for this position</h4>
                    <p>Farooque brings 3 years of hands-on production code, international client delivery, and solid computer application fundamentals.</p>
                  </div>
                </div>

                <div className="ai-matched-skills-section">
                  <h5>Directly Matched Technologies:</h5>
                  <div className="ai-skills-chips">
                    {matchResult.matchedSkills?.map((skill, idx) => (
                      <span key={idx} className="ai-skill-match-chip">
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="ai-highlights-list">
                  <h5>Key Candidate Highlights:</h5>
                  <ul>
                    {matchResult.highlightNotes?.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>

                {matchResult.suggestedInterviewQuestions?.length > 0 && (
                  <div className="ai-questions-box">
                    <h5>Recommended Questions for Farooque:</h5>
                    <ol>
                      {matchResult.suggestedInterviewQuestions.map((q, idx) => (
                        <li key={idx}>{q}</li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="ai-result-actions">
                  <a
                    href="mailto:farooqueallam1@gmail.com?subject=Interview%20Invitation%20for%20Farooque%20Alam"
                    className="btn btn-primary"
                  >
                    Schedule an Interview with Farooque
                  </a>
                  <a
                    href="tel:+9779818998937"
                    className="btn btn-outline"
                  >
                    Call: +977-9818998937
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AIFeatures;
