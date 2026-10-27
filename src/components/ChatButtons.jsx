import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ChatButtons.css';

const SUGGESTED_PROMPTS = [
  'What is SchoolBaba and how does multi-tenancy work?',
  'Tell me about your German client project for SCHITTLY.',
  'What are your primary backend and database skills?',
  'Are you available for full-time remote or freelance roles?',
];

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    text: "Hi! I'm Farooque's AI Twin, trained on his authentic CV, 3 years of production experience, and projects like SchoolBaba and SCHITTLY. How can I assist you today?",
    time: 'Just now',
  },
];

const ChatButtons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState('ai'); // 'ai' | 'whatsapp' | 'channels'
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeechEnabled, setIsSpeechEnabled] = useState(false);
  const messagesEndRef = useRef(null);

  const phoneNumber = '9779818998937';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hi%20Farooque!%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect.`;
  const messengerUrl = `https://m.me/farooque.alam.109904`;

  useEffect(() => {
    if (isOpen && activeChannel === 'ai') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, activeChannel]);

  const speakText = (text) => {
    if (!isSpeechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.replace(/[*_#`]/g, ''));
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Ignore audio synthesis errors gracefully
    }
  };

  const handleSendMessage = async (queryText) => {
    const textToSend = typeof queryText === 'string' ? queryText : inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsg = {
      role: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: updatedHistory.slice(0, -1),
        }),
      });

      const data = await response.json();
      const botReply = data.reply || "Thanks for reaching out! You can also contact Farooque directly at farooqueallam1@gmail.com.";
      
      const botMsg = {
        role: 'assistant',
        text: botReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
      speakText(botReply);
    } catch {
      const fallbackReply = "I'm currently running in low-latency offline mode. Farooque has 3 years of full-stack experience specializing in React, Next.js, Node.js, and TYPO3. You can reach him directly at farooqueallam1@gmail.com or WhatsApp at +977-9818998937!";
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: fallbackReply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="floating-chat-container">
      {/* Floating Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="ai-chatbot-window glass-card"
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            onWheel={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="ai-chatbot-header">
              <div className="ai-chatbot-avatar-area">
                <div className="ai-chatbot-avatar">FA</div>
                <div className="ai-chatbot-status-info">
                  <div className="ai-chatbot-title-row">
                    <span className="ai-chatbot-name">Farooque AI Twin</span>
                    <span className="ai-chatbot-model-pill">Gemini 3.8</span>
                  </div>
                  <span className="ai-chatbot-status">
                    <span className="ai-chatbot-status-dot"></span> Online • Trained on Farooque's CV
                  </span>
                </div>
              </div>

              <div className="ai-chatbot-header-controls">
                <button
                  type="button"
                  className={`ai-chatbot-ctrl-btn ${isSpeechEnabled ? 'active' : ''}`}
                  onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
                  title={isSpeechEnabled ? 'Speech audio enabled' : 'Enable speech audio'}
                >
                  {isSpeechEnabled ? '🔊' : '🔇'}
                </button>
                <button
                  type="button"
                  className="ai-chatbot-ctrl-btn"
                  onClick={handleClearChat}
                  title="Clear conversation"
                >
                  🔄
                </button>
                <button
                  type="button"
                  className="ai-chatbot-ctrl-btn"
                  onClick={() => setIsOpen(false)}
                  title="Minimize chat"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Channel Tabs */}
            <div className="ai-chatbot-channel-tabs">
              <button
                type="button"
                className={`ai-channel-tab ${activeChannel === 'ai' ? 'active' : ''}`}
                onClick={() => setActiveChannel('ai')}
              >
                <span>🤖</span> AI Assistant
              </button>
              <button
                type="button"
                className={`ai-channel-tab ${activeChannel === 'whatsapp' ? 'active' : ''}`}
                onClick={() => setActiveChannel('whatsapp')}
              >
                <span>💬</span> WhatsApp Direct
              </button>
              <button
                type="button"
                className={`ai-channel-tab ${activeChannel === 'channels' ? 'active' : ''}`}
                onClick={() => setActiveChannel('channels')}
              >
                <span>📬</span> Email & Social
              </button>
            </div>

            {/* Tab 1: AI Chat View */}
            {activeChannel === 'ai' && (
              <div className="ai-chatbot-body">
                {/* Quick Suggestion Chips */}
                <div className="ai-chatbot-quick-chips">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      className="ai-quick-chip"
                      onClick={() => handleSendMessage(prompt)}
                      disabled={isLoading}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Message Thread */}
                <div className="ai-chatbot-messages-thread">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`ai-chat-bubble-row ${msg.role === 'user' ? 'user' : 'bot'}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="ai-chat-bot-icon">🤖</div>
                      )}
                      <div className="ai-chat-bubble-content">
                        <p>{msg.text}</p>
                        <span className="ai-chat-timestamp">{msg.time}</span>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="ai-chat-bubble-row bot">
                      <div className="ai-chat-bot-icon">🤖</div>
                      <div className="ai-chat-bubble-content ai-typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Bar */}
                <form
                  className="ai-chatbot-input-bar"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Ask Farooque's AI anything..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    className="ai-chatbot-send-btn"
                    disabled={isLoading || !inputMessage.trim()}
                    aria-label="Send message"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                  </button>
                </form>
              </div>
            )}

            {/* Tab 2: WhatsApp Channel */}
            {activeChannel === 'whatsapp' && (
              <div className="ai-channel-content">
                <div className="ai-channel-card">
                  <div className="ai-channel-icon-whatsapp">💬</div>
                  <h4>Direct WhatsApp Message</h4>
                  <p>Connect with Farooque Alam directly on his mobile/WhatsApp (+977-9818998937) for quick project inquiries and immediate availability.</p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary ai-channel-btn"
                    style={{ background: '#25D366', borderColor: '#25D366', color: '#000' }}
                  >
                    Open WhatsApp Chat
                  </a>
                </div>
              </div>
            )}

            {/* Tab 3: Email & Social Channels */}
            {activeChannel === 'channels' && (
              <div className="ai-channel-content">
                <div className="ai-channel-card">
                  <h4>Direct Inquiries</h4>
                  <div className="ai-direct-links">
                    <a href="mailto:farooqueallam1@gmail.com" className="ai-direct-link">
                      <span>📧</span> farooqueallam1@gmail.com
                    </a>
                    <a href="tel:+9779818998937" className="ai-direct-link">
                      <span>📱</span> +977-9818998937
                    </a>
                    <a href={messengerUrl} target="_blank" rel="noopener noreferrer" className="ai-direct-link">
                      <span>⚡</span> Facebook Messenger
                    </a>
                    <a href="https://linkedin.com/in/md-farooque-62191024b" target="_blank" rel="noopener noreferrer" className="ai-direct-link">
                      <span>💼</span> LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button */}
      <motion.button
        className={`floating-chat-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open AI Chatbot"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <div className="floating-trigger-inner">
            <span className="floating-bot-icon">🤖</span>
            <span className="floating-trigger-badge">Farooque AI</span>
          </div>
        )}
      </motion.button>
    </div>
  );
};

export default ChatButtons;
