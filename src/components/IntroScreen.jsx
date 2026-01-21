import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './IntroScreen.css';

const IntroScreen = () => {
    const containerRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Animate in on load
        const tl = gsap.timeline();

        tl.fromTo('.intro__text--left',
            { x: -150, opacity: 0, rotateY: -20 },
            { x: 0, opacity: 1, rotateY: 0, duration: 1.2, ease: 'power3.out' }
        );
        tl.fromTo('.intro__text--right',
            { x: 150, opacity: 0, rotateY: 20 },
            { x: 0, opacity: 1, rotateY: 0, duration: 1.2, ease: 'power3.out' },
            '-=1.1'
        );
        tl.fromTo('.intro__icons .intro__icon',
            { opacity: 0, y: -30, scale: 0 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(2)' },
            '-=0.6'
        );
        tl.fromTo('.intro__tagline',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
            '-=0.3'
        );
        tl.fromTo('.intro__tech',
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: 'back.out' },
            '-=0.3'
        );
        tl.fromTo('.intro__click-hint',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
            '-=0.2'
        );
        tl.fromTo('.intro__decoration',
            { opacity: 0 },
            { opacity: 0.3, duration: 1, stagger: 0.2 },
            '-=0.5'
        );

        // Prevent scroll while intro is visible
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    const handleClick = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        // Beautiful exit animation
        const tl = gsap.timeline({
            onComplete: () => {
                setIsVisible(false);
                document.body.style.overflow = '';
            }
        });

        // Pulse effect on center
        tl.to('.intro__center', {
            scale: 1.05,
            duration: 0.2,
            ease: 'power2.out',
        });

        // Center content fades and scales
        tl.to('.intro__center', {
            scale: 0.8,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.in',
        });

        // Decorations fly out
        tl.to('.intro__decoration--1', { x: -200, opacity: 0, duration: 0.8, ease: 'power2.in' }, '-=0.5');
        tl.to('.intro__decoration--2', { x: 200, opacity: 0, duration: 0.8, ease: 'power2.in' }, '-=0.8');
        tl.to('.intro__decoration--3', { x: -200, opacity: 0, duration: 0.8, ease: 'power2.in' }, '-=0.8');
        tl.to('.intro__decoration--4', { x: 200, opacity: 0, duration: 0.8, ease: 'power2.in' }, '-=0.8');

        // Panels slide with bounce
        tl.to(leftRef.current, {
            xPercent: -100,
            duration: 1.2,
            ease: 'power4.inOut',
        }, '-=0.6');

        tl.to(rightRef.current, {
            xPercent: 100,
            duration: 1.2,
            ease: 'power4.inOut',
        }, '-=1.2');

        // Click hint disappears
        tl.to('.intro__click-hint', {
            opacity: 0,
            y: 20,
            duration: 0.3,
        }, '-=1.2');
    };

    if (!isVisible) return null;

    return (
        <div className="intro" ref={containerRef} onClick={handleClick}>
            {/* Left Panel */}
            <div className="intro__panel intro__panel--left" ref={leftRef}>
                <div className="intro__panel-bg">
                    <div className="intro__panel-gradient"></div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="intro__panel intro__panel--right" ref={rightRef}>
                <div className="intro__panel-bg">
                    <div className="intro__panel-gradient"></div>
                </div>
            </div>

            {/* Center Content */}
            <div className="intro__center">
                <div className="intro__icons">
                    <span className="intro__icon">⚛️</span>
                    <span className="intro__icon">💻</span>
                    <span className="intro__icon">🚀</span>
                </div>

                <div className="intro__name">
                    <span className="intro__text intro__text--left">Farooque</span>
                    <span className="intro__text intro__text--right">Alam</span>
                </div>

                <div className="intro__tagline">Full Stack Developer</div>

                <div className="intro__tech-icons">
                    <span className="intro__tech">React</span>
                    <span className="intro__tech">Angular</span>
                    <span className="intro__tech">PHP</span>
                    <span className="intro__tech">TYPO3</span>
                </div>
            </div>

            {/* Click Hint */}
            <div className="intro__click-hint">
                <div className="intro__click-circle">
                    <div className="intro__click-ripple"></div>
                    <div className="intro__click-ripple intro__click-ripple--2"></div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 15l-6-6M9 15V9h6" />
                    </svg>
                </div>
                <span>Click Anywhere to Enter</span>
            </div>

            {/* Decorative Elements */}
            <div className="intro__decoration intro__decoration--1">{'</>'}</div>
            <div className="intro__decoration intro__decoration--2">{'{ }'}</div>
            <div className="intro__decoration intro__decoration--3">{'( )'}</div>
            <div className="intro__decoration intro__decoration--4">{'[ ]'}</div>

            {/* Corner Accents */}
            <div className="intro__corner intro__corner--tl"></div>
            <div className="intro__corner intro__corner--tr"></div>
            <div className="intro__corner intro__corner--bl"></div>
            <div className="intro__corner intro__corner--br"></div>
        </div>
    );
};

export default IntroScreen;
