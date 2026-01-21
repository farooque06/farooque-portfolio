import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '../assets/profile-casual.jpg';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate section title
            gsap.fromTo(
                '.about__subtitle',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: '.about__header',
                        start: 'top 80%',
                    },
                }
            );

            gsap.fromTo(
                '.about__title',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: '.about__header',
                        start: 'top 80%',
                    },
                }
            );

            // Animate content
            gsap.fromTo(
                '.about__image-wrapper',
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: '.about__content',
                        start: 'top 70%',
                    },
                }
            );

            gsap.fromTo(
                '.about__text',
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: '.about__content',
                        start: 'top 70%',
                    },
                }
            );

            // Animate stats
            gsap.fromTo(
                '.about__stat',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: '.about__stats',
                        start: 'top 80%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const stats = [
        { number: '2+', label: 'Years Experience' },
        { number: '10+', label: 'Projects Completed' },
        { number: '5+', label: 'Happy Clients' },
        { number: '100%', label: 'Dedication' },
    ];

    return (
        <section id="about" className="about section" ref={sectionRef}>
            <div className="container">
                <div className="about__header section-title">
                    <span className="about__subtitle section-subtitle">About Me</span>
                    <h2 className="about__title">
                        Passionate About Creating <span className="gradient-text">Digital Experiences</span>
                    </h2>
                </div>

                <div className="about__content">
                    <div className="about__image-wrapper">
                        <div className="about__image-container">
                            <div className="about__image">
                                <img src={profileImage} alt="Farooque Alam" className="about__image-photo" />
                            </div>
                            <div className="about__image-decoration about__image-decoration--1"></div>
                            <div className="about__image-decoration about__image-decoration--2"></div>
                        </div>
                    </div>

                    <div className="about__text">
                        <p className="about__description">
                            I'm <strong>Farooque Alam</strong>, a Full Stack Developer based in Kathmandu, Nepal.
                            With 2 years of professional experience, I specialize in building dynamic, scalable,
                            and user-friendly web applications using React, Angular, and PHP.
                        </p>
                        <p className="about__description">
                            Currently working at <strong>Nirekha Dot Com</strong>, I develop and maintain web applications
                            using React, Angular, PHP and Typo3. I'm also handling a German client project for SCHITTLY,
                            focusing on TYPO3 customization, template integration, and extension development.
                        </p>
                        <p className="about__description">
                            I'm pursuing my Bachelor's in Computer Application (BCA) from Patan Nistha Campus,
                            affiliated with Tribhuvan University. I love turning complex problems into elegant solutions
                            and continuously expanding my skill set.
                        </p>

                        <div className="about__highlights">
                            <div className="about__highlight">
                                <span className="about__highlight-icon">🚀</span>
                                <span>Fast & Optimized</span>
                            </div>
                            <div className="about__highlight">
                                <span className="about__highlight-icon">📱</span>
                                <span>Responsive Design</span>
                            </div>
                            <div className="about__highlight">
                                <span className="about__highlight-icon">🎨</span>
                                <span>UI/UX Optimization</span>
                            </div>
                            <div className="about__highlight">
                                <span className="about__highlight-icon">🔧</span>
                                <span>Clean Code</span>
                            </div>
                        </div>

                        <motion.a
                            href="#contact"
                            className="btn btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Let's Work Together
                        </motion.a>
                    </div>
                </div>

                <div className="about__stats">
                    {stats.map((stat, index) => (
                        <div key={index} className="about__stat glass-card">
                            <span className="about__stat-number gradient-text">{stat.number}</span>
                            <span className="about__stat-label">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
