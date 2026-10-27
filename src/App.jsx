import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FloatingShapes from './components/FloatingShapes';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import AIFeatures from './components/AIFeatures';
import Contact from './components/Contact';
import Footer from './components/Footer';
import IntroScreen from './components/IntroScreen';
import ChatButtons from './components/ChatButtons';
import CVModal from './components/CVModal';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isCVOpen, setIsCVOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="loader">
        <div className="loader-spinner"></div>
      </div>
    );
  }

  const handleOpenCV = () => setIsCVOpen(true);
  const handleCloseCV = () => setIsCVOpen(false);

  return (
    <>
      <FloatingShapes />
      <IntroScreen />
      <Navbar onOpenCV={handleOpenCV} />
      <main>
        <Hero onOpenCV={handleOpenCV} />
        <About onOpenCV={handleOpenCV} />
        <Experience />
        <Projects />
        <Skills />
        <AIFeatures />
        <Contact />
      </main>
      <Footer onOpenCV={handleOpenCV} />
      <ChatButtons />
      <CVModal isOpen={isCVOpen} onClose={handleCloseCV} />
    </>
  );
}

export default App;
