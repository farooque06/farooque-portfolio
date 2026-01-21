import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
    const sectionRef = useRef(null);

    const skillCategories = [
        {
            title: 'Frontend Development',
            skills: [
                { name: 'React', icon: '⚛️', level: 90, color: '#61DAFB' },
                { name: 'Angular', icon: '🅰️', level: 85, color: '#DD0031' },
                { name: 'HTML', icon: '🌐', level: 95, color: '#E34F26' },
                { name: 'CSS', icon: '🎨', level: 90, color: '#264DE4' },
                { name: 'SCSS', icon: '💅', level: 85, color: '#CC6699' },
            ],
        },
        {
            title: 'Backend Development',
            skills: [
                { name: 'Node.js', icon: '🟢', level: 80, color: '#339933' },
                { name: 'PHP', icon: '🐘', level: 85, color: '#777BB4' },
                { name: 'TYPO3', icon: '🔷', level: 85, color: '#FF8700' },
                { name: '.NET', icon: '🔵', level: 60, color: '#512BD4' },
                { name: 'C#', icon: '💻', level: 65, color: '#239120' },
            ],
        },
        {
            title: 'Database & Tools',
            skills: [
                { name: 'MySQL', icon: '🗄️', level: 85, color: '#4479A1' },
                { name: 'SQL Server', icon: '📊', level: 75, color: '#CC2927' },
                { name: 'Git', icon: '📦', level: 90, color: '#F05032' },
                { name: 'GitHub', icon: '🐙', level: 88, color: '#181717' },
                { name: 'Webpack', icon: '📦', level: 75, color: '#8DD6F9' },
            ],
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate header
            gsap.fromTo(
                '.skills__subtitle',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: '.skills__header',
                        start: 'top 80%',
                    },
                }
            );

            gsap.fromTo(
                '.skills__title',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: '.skills__header',
                        start: 'top 80%',
                    },
                }
            );

            // Animate skill cards
            gsap.fromTo(
                '.skills__card',
                { opacity: 0, y: 50, scale: 0.9 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: '.skills__grid',
                        start: 'top 80%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="skills" className="skills section" ref={sectionRef}>
            <div className="container">
                <div className="skills__header section-title">
                    <span className="skills__subtitle section-subtitle">My Skills</span>
                    <h2 className="skills__title">
                        Technologies I <span className="gradient-text">Work With</span>
                    </h2>
                    <p className="skills__description">
                        I'm constantly learning and expanding my skill set to stay current with the latest technologies.
                    </p>
                </div>

                {skillCategories.map((category, catIndex) => (
                    <div key={category.title} className="skills__category">
                        <h3 className="skills__category-title">{category.title}</h3>
                        <div className="skills__grid">
                            {category.skills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    className="skills__card glass-card"
                                    whileHover={{
                                        y: -10,
                                        boxShadow: `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${skill.color}30`
                                    }}
                                    style={{ '--skill-color': skill.color }}
                                >
                                    <div className="skills__card-icon">
                                        <span>{skill.icon}</span>
                                    </div>
                                    <h3 className="skills__card-name">{skill.name}</h3>
                                    <div className="skills__card-level">
                                        <div className="skills__card-level-bar">
                                            <motion.div
                                                className="skills__card-level-fill"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                transition={{ duration: 1, delay: (catIndex * 5 + index) * 0.05 }}
                                                style={{ background: skill.color }}
                                            />
                                        </div>
                                        <span className="skills__card-level-text">{skill.level}%</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Other Skills */}
                <div className="skills__other">
                    <h3 className="skills__category-title">Other Skills</h3>
                    <div className="skills__tags">
                        {['Responsive Web Design', 'UI/UX Optimization', 'Debugging', 'Team Collaboration', 'Communication', 'Time Management', 'VS Code', 'Visual Studio'].map((skill) => (
                            <span key={skill} className="skills__tag">{skill}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
