import { useEffect, useState, useCallback, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { MotionConfig } from 'framer-motion';
import Lenis from 'lenis';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import KineticGrid from './components/ui/kinetic-grid';
import CommandPalette from './components/CommandPalette';
import ErrorBoundary from './components/ErrorBoundary';
import { useTranslation } from './contexts/LanguageContext';
import { setLenis, scrollToHash, scrollToTop } from './lib/scroll';
import Home from './pages/Home';

const ProjectCase = lazy(() => import('./pages/ProjectCase'));
const BlogList = lazy(() => import('./pages/BlogList'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const NotFound = lazy(() => import('./pages/NotFound'));

function Layout() {
  const { t } = useTranslation();
  const location = useLocation();
  const [paletteOpen, setPaletteOpen] = useState(false);

  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

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
    setLenis(lenis);

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (location.hash) {
      scrollToHash(location.hash);
    } else {
      scrollToTop(true);
    }
  }, [location.pathname, location.hash]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-brand focus:text-[#050505] focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold"
      >
        {t('skipToContent')}
      </a>
      <div className="relative z-10">
        <Navbar onOpenPalette={openPalette} />
        <main id="main-content">
          <ErrorBoundary>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/:slug" element={<ProjectCase />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
      <CommandPalette open={paletteOpen} onOpen={openPalette} onClose={closePalette} />
      <Analytics />
      <SpeedInsights />
    </>
  );
}

function App() {
  return (
    <MotionConfig>
      <ErrorBoundary>
        <KineticGrid globalColor="monochrome">
          <div className="relative">
            <Layout />
          </div>
        </KineticGrid>
      </ErrorBoundary>
    </MotionConfig>
  );
}

export default App;
