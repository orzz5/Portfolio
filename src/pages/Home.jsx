import { lazy, Suspense, useMemo } from 'react';
import Hero from '../components/Hero';
import usePageMeta from '../hooks/usePageMeta';
import { SITE_URL } from '../lib/constants';
import { PROJECTS } from '../lib/projects';

const About = lazy(() => import('../components/About'));
const Technologies = lazy(() => import('../components/Technologies'));
const Projects = lazy(() => import('../components/Projects'));
const Contact = lazy(() => import('../components/Contact'));

const HOME_TITLE = 'orzz5 - Frontend Developer & Discord Bot Creator';
const HOME_DESC =
  'Frontend developer building React web apps and production Discord bots. Live projects, source code, and contact — all on orzz.website.';

export default function Home() {
  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: PROJECTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: p.titleKey,
        url: `${SITE_URL}/projects/${p.slug}`,
      })),
    }),
    [],
  );

  usePageMeta({
    title: HOME_TITLE,
    description: HOME_DESC,
    path: '/',
    jsonLd,
  });

  return (
    <>
      <Hero />
      <Suspense fallback={null}>
        <About />
        <Technologies />
        <Projects />
        <Contact />
      </Suspense>
    </>
  );
}
