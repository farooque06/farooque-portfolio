import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const sectionRef = useRef(null);

    const projects = [
        {
            id: 1,
            title: 'Appointment Scheduling System',
            description: 'Built a dynamic appointment booking system with Angular for the frontend and TYPO3 (PHP) for backend management of appointments.',
            image: null,
            tags: ['Angular', 'TYPO3', 'PHP', 'MySQL'],
            liveUrl: '#',
            githubUrl: '#',
            color: '#DD0031',
        },
        {
            id: 2,
            title: 'MartBus — Mart Billing System',
            description: 'Developed a billing and inventory management system using React for the frontend and TYPO3 (PHP) for the backend to manage products, suppliers, and sales efficiently.',
            image: null,
            tags: ['React', 'TYPO3', 'PHP', 'MySQL'],
            liveUrl: '#',
            githubUrl: '#',
            color: '#61DAFB',
        },
        {
            id: 3,
            title: 'SCHITTLY - German Client Project',
            description: 'Working on TYPO3 customization, template integration, and extension development for a German client.',
            image: null,
            tags: ['TYPO3', 'PHP', 'HTML', 'SCSS'],
            liveUrl: '#',
            githubUrl: '#',
            color: '#FF8700',
        },
        {
            id: 4,
            title: 'Portfolio Website',
            description: 'Modern, animated portfolio website with 3D elements, smooth scroll, and glassmorphism design.',
            image: null,
            tags: ['React', 'Three.js', 'GSAP', 'Framer Motion'],
            liveUrl: '#',
            githubUrl: '#',
            color: '#00d4ff',
        },
    ];

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

            gsap.fromTo(
                '.projects__card',
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: '.projects__grid',
                        start: 'top 80%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e, id) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleMouseLeave = (e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };

    return (
        <section id="projects" className="projects section" ref={sectionRef}>
            <div className="container">
                <div className="projects__header section-title">
                    <span className="projects__subtitle section-subtitle">My Work</span>
                    <h2 className="projects__title">
                        Featured <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="projects__description">
                        Here are some of my projects that showcase my skills in web development.
                    </p>
                </div>

                <div className="projects__grid">
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="projects__card glass-card"
                            onMouseMove={(e) => handleMouseMove(e, project.id)}
                            onMouseLeave={handleMouseLeave}
                            style={{ '--project-color': project.color }}
                        >
                            <div className="projects__card-image">
                                <div className="projects__card-placeholder">
                                    <span>🚀</span>
                                </div>
                                <div className="projects__card-overlay">
                                    <div className="projects__card-links">
                                        <motion.a
                                            href={project.liveUrl}
                                            className="projects__card-link"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                            </svg>
                                        </motion.a>
                                        <motion.a
                                            href={project.githubUrl}
                                            className="projects__card-link"
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </motion.a>
                                    </div>
                                </div>
                            </div>
                            <div className="projects__card-content">
                                <h3 className="projects__card-title">{project.title}</h3>
                                <p className="projects__card-description">{project.description}</p>
                                <div className="projects__card-tags">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="projects__card-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
