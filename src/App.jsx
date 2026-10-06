import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Technologies from './components/Technologies';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import KineticGrid from './components/ui/kinetic-grid';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      anchors: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <LanguageProvider>
      <KineticGrid globalColor="monochrome">
        <div className="relative">
          <div className="relative z-10">
            <Navbar />
            <main>
              <Hero />
              <About />
              <Technologies />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </div>
        </div>
      </KineticGrid>
    </LanguageProvider>
  );
}

export default App;
