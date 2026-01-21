import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import profileImage from '../assets/profile-formal.jpg';
import './Hero.css';

const Hero = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);

    // Typing animation state
    const titles = ['Frontend Developer', 'Backend Developer', 'Full Stack Developer'];
    const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Typing effect
    useEffect(() => {
        const currentTitle = titles[currentTitleIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing
                if (currentText.length < currentTitle.length) {
                    setCurrentText(currentTitle.slice(0, currentText.length + 1));
                } else {
                    // Pause before deleting
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                // Deleting
                if (currentText.length > 0) {
                    setCurrentText(currentText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentTitleIndex, titles]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.hero__greeting',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
            );

            gsap.fromTo(
                '.hero__name',
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, delay: 0.4 }
            );

            gsap.fromTo(
                '.hero__title',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.7 }
            );

            gsap.fromTo(
                '.hero__description',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, delay: 0.9 }
            );

            gsap.fromTo(
                '.hero__cta',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.8, delay: 1.1, stagger: 0.1 }
            );

            gsap.fromTo(
                '.hero__scroll',
                { opacity: 0 },
                { opacity: 1, duration: 1, delay: 1.5 }
            );
        }, heroRef);

        return () => ctx.revert();
    }, []);

    const scrollToAbout = () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="home" className="hero" ref={heroRef}>
            <div className="hero__content">
                <div className="hero__text" ref={textRef}>
                    <span className="hero__greeting">Hello, I'm</span>
                    <h1 className="hero__name">
                        <span className="gradient-text">Farooque Alam</span>
                    </h1>
                    <div className="hero__title-wrapper">
                        <h2 className="hero__title">
                            <span className="hero__title-text">{currentText}</span>
                            <span className="hero__cursor">|</span>
                        </h2>
                    </div>
                    <p className="hero__description">
                        Frontend and Backend Developer with 2 years of experience in React, Angular, and PHP.
                        Passionate about building dynamic, scalable, and user-friendly web applications.
                    </p>
                    <div className="hero__cta-group">
                        <motion.a
                            href="#projects"
                            className="hero__cta btn btn-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            View My Work
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </motion.a>
                        <motion.a
                            href="#contact"
                            className="hero__cta btn btn-outline"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.preventDefault();
                                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Get In Touch
                        </motion.a>
                    </div>
                </div>

                <div className="hero__visual">
                    <div className="hero__avatar-container">
                        <div className="hero__avatar-ring"></div>
                        <div className="hero__avatar-ring hero__avatar-ring--delayed"></div>
                        <div className="hero__avatar">
                            <img src={profileImage} alt="Farooque Alam" className="hero__avatar-img" />
                        </div>
                    </div>
                </div>
            </div>

            <motion.div
                className="hero__scroll"
                onClick={scrollToAbout}
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span>Scroll Down</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
            </motion.div>

            <div className="hero__decoration hero__decoration--1"></div>
            <div className="hero__decoration hero__decoration--2"></div>
            <div className="hero__decoration hero__decoration--3"></div>
        </section>
    );
};

export default Hero;
