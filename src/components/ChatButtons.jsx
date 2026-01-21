import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatButtons.css';

const ChatButtons = () => {
    const [isOpen, setIsOpen] = useState(false);

    const phoneNumber = '9779818998937'; // Your WhatsApp number
    const messengerUsername = 'farooque.alam.109904';

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hi%20Farooque!%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.`;
    const messengerUrl = `https://m.me/${messengerUsername}`;

    return (
        <div className="chat-buttons">
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* WhatsApp */}
                        <motion.a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="chat-btn chat-btn--whatsapp"
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            <span className="chat-btn__label">WhatsApp</span>
                        </motion.a>

                        {/* Messenger */}
                        <motion.a
                            href={messengerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="chat-btn chat-btn--messenger"
                            initial={{ opacity: 0, y: 20, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                                <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.301 2.246.464 3.443.464 6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z" />
                            </svg>
                            <span className="chat-btn__label">Messenger</span>
                        </motion.a>
                    </>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
                className={`chat-toggle ${isOpen ? 'chat-toggle--open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ rotate: isOpen ? 45 : 0 }}
            >
                {isOpen ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                        <circle cx="12" cy="10" r="1.5" />
                        <circle cx="8" cy="10" r="1.5" />
                        <circle cx="16" cy="10" r="1.5" />
                    </svg>
                )}
            </motion.button>
        </div>
    );
};

export default ChatButtons;
