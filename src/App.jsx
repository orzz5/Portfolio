import { useEffect, Suspense, lazy } from 'react';
import { MotionConfig } from 'framer-motion';
import Lenis from 'lenis';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import KineticGrid from './components/ui/kinetic-grid';
import { useTranslation } from './contexts/LanguageContext';

const About = lazy(() => import('./components/About'));
const Technologies = lazy(() => import('./components/Technologies'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  const { t } = useTranslation();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

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
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <KineticGrid globalColor="monochrome">
          <div className="relative">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-brand focus:text-[#050505] focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
            >
              {t('skipToContent')}
            </a>
            <div className="relative z-10">
              <Navbar />
              <main id="main-content">
                <Hero />
                <Suspense fallback={null}>
                  <About />
                  <Technologies />
                  <Projects />
                  <Contact />
                </Suspense>
              </main>
              <Footer />
            </div>
          </div>
        </KineticGrid>
      </LanguageProvider>
    </MotionConfig>
  );
}

export default App;
