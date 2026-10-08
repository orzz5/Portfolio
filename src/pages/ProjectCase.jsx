import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Star,
  GitFork,
  CheckCircle2,
} from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import useGithubStats from '../hooks/useGithubStats';
import usePageMeta from '../hooks/usePageMeta';
import { getProjectBySlug, getNextProject } from '../lib/projects';
import { SITE_URL } from '../lib/constants';
import NotFound from './NotFound';

export default function ProjectCase() {
  const { slug } = useParams();
  const { t, language } = useTranslation();
  const project = getProjectBySlug(slug);
  const stats = useGithubStats(project?.githubRepo);
  const next = getNextProject(slug);

  const content = project ? project.content[language] || project.content.en : null;

  const jsonLd = useMemo(() => {
    if (!project) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: t(project.titleKey),
      description: t(project.descKey),
      url: project.live,
      image: `${SITE_URL}${project.image}`,
      applicationCategory: 'WebApplication',
      operatingSystem: 'Web',
      author: { '@type': 'Person', name: 'orzz5', url: SITE_URL },
      codeRepository: project.github,
    };
  }, [project, t]);

  usePageMeta({
    title: project ? `${t(project.titleKey)} — orzz5` : '404 — orzz5',
    description: project ? t(project.descKey) : '',
    path: project ? `/projects/${project.slug}` : '/projects',
    image: project?.image,
    jsonLd: jsonLd || undefined,
  });

  if (!project) return <NotFound />;

  return (
    <div className="w-full px-6 md:px-10 lg:px-16 py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <div className="space-y-6">
          <Link
            to="/#projects"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-brand transition-colors duration-200 text-sm font-medium"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>{t('backToProjects')}</span>
          </Link>

          <div className="flex items-center space-x-3 text-xs font-bold uppercase tracking-widest">
            <span className="px-3 py-1 rounded-full bg-brand/15 text-brand border border-brand/40">
              {t('caseStudy')}
            </span>
            <span className="flex items-center text-green-400">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse" aria-hidden="true" />
              {project.status}
            </span>
          </div>

          <h1 className="text-[clamp(2.25rem,6vw,4rem)] font-bold gradient-text tracking-tight">
            {t(project.titleKey)}
          </h1>

          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            {t(project.descKey)}
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-brand hover:bg-brand-dark text-[#050505] px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              <span>{t('liveDemo')}</span>
              <ExternalLink size={16} aria-hidden="true" />
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 liquid-glass border border-accent/20 hover:border-brand/50 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
            >
              <Github size={16} aria-hidden="true" />
              <span>{t('sourceCode')}</span>
            </a>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-accent/20 bg-ink/60">
          <img
            src={project.image}
            alt={`${t(project.titleKey)} screenshot`}
            className="w-full h-auto"
            loading="lazy"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="glass-effect rounded-2xl p-6 border border-accent/20 space-y-3">
            <h2 className="text-xl font-bold text-white font-display">{t('challenge')}</h2>
            <p className="text-gray-300 leading-relaxed">{content.challenge}</p>
          </div>
          <div className="glass-effect rounded-2xl p-6 border border-accent/20 space-y-3">
            <h2 className="text-xl font-bold text-white font-display">{t('approach')}</h2>
            <p className="text-gray-300 leading-relaxed">{content.approach}</p>
          </div>
        </div>

        <div className="glass-effect rounded-2xl p-6 border border-accent/20 space-y-4">
          <h2 className="text-xl font-bold text-white font-display">{t('keyFeatures')}</h2>
          <ul className="space-y-3">
            {content.features.map((feature) => (
              <li key={feature} className="flex items-start space-x-3 text-gray-300">
                <CheckCircle2 size={18} className="text-brand mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid sm:grid-cols-2 gap-8">
          <div className="glass-effect rounded-2xl p-6 border border-accent/20 space-y-3">
            <h2 className="text-xl font-bold text-white font-display">{t('techStack')}</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs font-bold px-3 py-1.5 bg-white/5 text-gray-300 border border-white/10 rounded uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="glass-effect rounded-2xl p-6 border border-accent/20 space-y-3">
            <h2 className="text-xl font-bold text-white font-display">{t('repositoryStats')}</h2>
            <div className="flex items-center space-x-6 text-gray-300">
              <span className="flex items-center" title="GitHub stars">
                <Star size={16} className="mr-2 text-yellow-400" aria-hidden="true" />
                {stats ? stats.stars : '—'}
              </span>
              <span className="flex items-center" title="GitHub forks">
                <GitFork size={16} className="mr-2" aria-hidden="true" />
                {stats ? stats.forks : '—'}
              </span>
            </div>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-brand hover:underline text-sm font-medium pt-1"
            >
              <span>{t('sourceCode')}</span>
              <ArrowRight size={14} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-accent/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <span className="text-sm text-gray-400 uppercase tracking-widest font-bold">
            {t('nextProject')}
          </span>
          <Link
            to={`/projects/${next.slug}`}
            className="group inline-flex items-center space-x-2 text-lg font-semibold text-white hover:text-brand transition-colors duration-200"
          >
            <span>{t(next.titleKey)}</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
