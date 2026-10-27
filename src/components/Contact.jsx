import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
    const sectionRef = useRef(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/farooque06', icon: '📦' },
        { name: 'LinkedIn', url: 'https://linkedin.com/in/md-farooque-62191024b', icon: '💼' },
        { name: 'Email', url: 'mailto:farooqueallam1@gmail.com', icon: '📧' },
        { name: 'WhatsApp', url: 'https://wa.me/9779818998937', icon: '💬' },
        { name: 'Instagram', url: 'https://instagram.com/farooque_allam', icon: '📸' },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.contact__subtitle',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: '.contact__header',
                        start: 'top 80%',
                    },
                }
            );

            gsap.fromTo(
                '.contact__title',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: '.contact__header',
                        start: 'top 80%',
                    },
                }
            );

            gsap.fromTo(
                '.contact__info',
                { opacity: 0, x: -50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: '.contact__content',
                        start: 'top 70%',
                    },
                }
            );

            gsap.fromTo(
                '.contact__form-wrapper',
                { opacity: 0, x: 50 },
                {
                    opacity: 1,
                    x: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: '.contact__content',
                        start: 'top 70%',
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                access_key: "6d406405-965c-40ed-8a88-6fa675247b91",
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message,
            }),
        });

        const result = await response.json();

        setIsSubmitting(false);

        if (result.success) {
            setIsSubmitted(true);
            setErrorMessage('');
            setFormData({ name: '', email: '', subject: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000);
        } else {
            setErrorMessage(result.message || "Something went wrong. Please try again later.");
            setTimeout(() => setErrorMessage(''), 5000);
        }
    };

    return (
        <section id="contact" className="contact section" ref={sectionRef}>
            <div className="container">
                <div className="contact__header section-title">
                    <span className="contact__subtitle section-subtitle">Get In Touch</span>
                    <h2 className="contact__title">
                        Let's Work <span className="gradient-text">Together</span>
                    </h2>
                    <p className="contact__description">
                        Have a project in mind? Let's discuss how I can help bring your ideas to life.
                    </p>
                </div>

                <div className="contact__content">
                    <div className="contact__info">
                        <h3 className="contact__info-title">Let's talk about everything!</h3>
                        <p className="contact__info-text">
                            Feel free to reach out for collaborations, opportunities, or just a friendly chat.
                            I'm always excited to hear about new projects and challenges.
                        </p>

                        <div className="contact__details">
                            <div className="contact__detail">
                                <span className="contact__detail-icon">📍</span>
                                <div>
                                    <h4>Location</h4>
                                    <p>New Baneshwor-31, Kathmandu, Nepal</p>
                                </div>
                            </div>
                            <div className="contact__detail">
                                <span className="contact__detail-icon">📧</span>
                                <div>
                                    <h4>Email</h4>
                                    <p><a href="mailto:farooqueallam1@gmail.com" className="contact__link">farooqueallam1@gmail.com</a></p>
                                </div>
                            </div>
                            <div className="contact__detail">
                                <span className="contact__detail-icon">📱</span>
                                <div>
                                    <h4>Phone</h4>
                                    <p><a href="tel:+9779818998937" className="contact__link">+977-9818998937</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="contact__social">
                            <h4>Connect with me</h4>
                            <div className="contact__social-links">
                                {socialLinks.map((link) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.url}
                                        className="contact__social-link"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1, y: -5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <span>{link.icon}</span>
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="contact__form-wrapper glass-card">
                        {isSubmitted ? (
                            <motion.div
                                className="contact__success"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <span className="contact__success-icon">✅</span>
                                <h3>Message Sent!</h3>
                                <p>Thank you for reaching out. I'll get back to you soon!</p>
                            </motion.div>
                        ) : (
                            <form className="contact__form" onSubmit={handleSubmit}>
                                {errorMessage && (
                                    <div style={{ padding: '0.75rem 1rem', marginBottom: '1rem', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '8px', color: '#fca5a5', fontSize: '0.9rem' }}>
                                        ⚠️ {errorMessage}
                                    </div>
                                )}
                                <div className="contact__form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder=" "
                                    />
                                    <label htmlFor="name">Your Name</label>
                                </div>

                                <div className="contact__form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder=" "
                                    />
                                    <label htmlFor="email">Your Email</label>
                                </div>

                                <div className="contact__form-group">
                                    <input
                                        type="text"
                                        name="subject"
                                        id="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder=" "
                                    />
                                    <label htmlFor="subject">Subject</label>
                                </div>

                                <div className="contact__form-group">
                                    <textarea
                                        name="message"
                                        id="message"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder=" "
                                    ></textarea>
                                    <label htmlFor="message">Your Message</label>
                                </div>

                                <motion.button
                                    type="submit"
                                    className="contact__form-btn btn btn-primary"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="contact__form-spinner"></span>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send Message
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                                            </svg>
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
