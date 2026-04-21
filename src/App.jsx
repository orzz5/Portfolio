import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import DiscordServices from './components/DiscordServices';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundAnimation from './components/BackgroundAnimation';

function App() {
  return (
    <div className="relative min-h-screen bg-dark-bg">
      <BackgroundAnimation />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <DiscordServices />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
