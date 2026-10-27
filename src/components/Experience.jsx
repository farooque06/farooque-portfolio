import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    period: 'January 2023 — Present',
    role: 'Full Stack Developer',
    company: 'Nirekha Dot Com',
    location: 'Kausaltar, Kathmandu, Nepal',
    type: 'Full-time',
    badge: 'Current Role',
    description: 'Leading client-facing full-stack web applications and enterprise CMS solutions across modern JavaScript and PHP ecosystems.',
    highlights: [
      'Architect and maintain dynamic, high-traffic web applications utilizing React, Angular, PHP, and TYPO3.',
      'Solely handle the German enterprise client project for SCHITTLY, focusing on deep TYPO3 customization, Fluid template integration, and custom extension development according to stringent European standards.',
      'Collaborate directly with cross-functional teams and international stakeholders to deliver end-to-end features on schedule.',
    ],
    skills: ['React', 'Angular', 'TYPO3 CMS', 'PHP', 'MySQL', 'Fluid Templates', 'Client Communication'],
  },
  {
    period: 'March 2022 — June 2022',
    role: 'Frontend Development Intern',
    company: 'Imagio Creations',
    location: 'Sanepa, Kathmandu, Nepal',
    type: 'Internship',
    badge: 'Foundation',
    description: 'Developed modern web interfaces and gained hands-on experience in production frontend development and client deliverables.',
    highlights: [
      'Assisted in developing highly responsive, pixel-perfect web pages using semantic HTML5, SCSS, and PHP.',
      'Ensured full cross-browser compatibility and optimized mobile web rendering for client websites.',
      'Participated in code reviews, design handoffs, and agile development sprint rituals.',
    ],
    skills: ['HTML5', 'SCSS', 'JavaScript', 'PHP', 'Responsive Design', 'Cross-Browser QA'],
  },
];

const EDUCATION = [
  {
    period: 'Completed',
    degree: 'Bachelor of Computer Application (BCA)',
    institution: 'Patan Nistha Campus',
    university: 'Tribhuvan University',
    location: 'Lalitpur, Nepal',
    description: 'Comprehensive 4-year undergraduate degree focusing on software engineering principles, database systems, web technologies, and computational logic.',
    courses: ['Database Management Systems (RDBMS)', 'Object-Oriented Programming (C# / Java)', 'Web Technologies', 'Software Engineering'],
  },
];

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.experience__subtitle',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.experience__header',
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.experience__title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: '.experience__header',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="experience section" ref={sectionRef}>
      <div className="container">
        {/* Header */}
        <div className="experience__header section-title">
          <span className="experience__subtitle section-subtitle">Career Journey</span>
          <h2 className="experience__title">
            Work Experience & <span className="gradient-text">Education</span>
          </h2>
          <p className="experience__description">
            A proven trajectory of building production software, collaborating with international clients, and continuous engineering craftsmanship.
          </p>
        </div>

        <div className="experience__layout">
          {/* Work Experience Timeline */}
          <div className="experience__column">
            <h3 className="experience__col-heading">
              <span className="experience__col-icon">💼</span> Professional Experience
            </h3>

            <div className="experience__timeline">
              {EXPERIENCES.map((exp, idx) => (
                <motion.div
                  key={idx}
                  className="experience__card glass-card"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                >
                  <div className="experience__card-top">
                    <div>
                      <span className="experience__period">{exp.period}</span>
                      <h4 className="experience__role">{exp.role}</h4>
                      <h5 className="experience__company">
                        {exp.company} <span className="experience__loc">• {exp.location}</span>
                      </h5>
                    </div>
                    <span className="experience__badge">{exp.badge}</span>
                  </div>

                  <p className="experience__desc">{exp.description}</p>

                  <ul className="experience__highlights">
                    {exp.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>

                  <div className="experience__skills">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="experience__skill-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Core Strengths */}
          <div className="experience__column">
            <h3 className="experience__col-heading">
              <span className="experience__col-icon">🎓</span> Academic Education
            </h3>

            <div className="experience__timeline">
              {EDUCATION.map((edu, idx) => (
                <motion.div
                  key={idx}
                  className="experience__card glass-card"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="experience__card-top">
                    <div>
                      <span className="experience__period" style={{ color: '#22c55e' }}>
                        Graduated • {edu.period}
                      </span>
                      <h4 className="experience__role">{edu.degree}</h4>
                      <h5 className="experience__company">
                        {edu.institution} <span className="experience__loc">({edu.university})</span>
                      </h5>
                    </div>
                    <span className="experience__badge" style={{ color: '#22c55e', borderColor: '#22c55e', background: 'rgba(34, 197, 94, 0.1)' }}>
                      Degree Completed
                    </span>
                  </div>

                  <p className="experience__desc">{edu.description}</p>

                  <div className="experience__coursework">
                    <h6>Key Study Domains:</h6>
                    <div className="experience__skills">
                      {edu.courses.map((course) => (
                        <span key={course} className="experience__skill-pill" style={{ borderColor: 'rgba(34, 197, 94, 0.3)', color: '#86efac' }}>
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Core Strengths Section */}
              <motion.div
                className="experience__card glass-card experience__strengths-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="experience__strengths-title">
                  <span className="experience__col-icon">⭐</span> Core Strengths from Practice
                </h4>
                <div className="experience__strengths-grid">
                  <div className="strength-item">
                    <span className="strength-icon">🔍</span>
                    <div>
                      <strong>Debugging & Troubleshooting</strong>
                      <p>Deep-dive root cause analysis across complex full-stack traces, database queries, and CMS configurations.</p>
                    </div>
                  </div>
                  <div className="strength-item">
                    <span className="strength-icon">🤝</span>
                    <div>
                      <strong>Team Collaboration & Communication</strong>
                      <p>Clear, empathetic technical discourse with clients in Europe and local teams alike.</p>
                    </div>
                  </div>
                  <div className="strength-item">
                    <span className="strength-icon">⏱️</span>
                    <div>
                      <strong>Time Management & Prioritization</strong>
                      <p>Structured delivery across tight deadlines, multi-project workflows, and independent sprint goals.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
