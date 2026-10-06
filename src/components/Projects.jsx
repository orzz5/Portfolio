import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../contexts/LanguageContext';
import useGithubStats from '../hooks/useGithubStats';
import { 
  ExternalLink, 
  Github, 
  Eye, 
  Code, 
  Bot,
  Star,
  GitFork,
  X,
  Globe,
  ChevronDown
} from 'lucide-react';

const ProjectCard = ({ project, onOpen }) => {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const stats = useGithubStats(project.githubRepo);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${t('preview')}: ${project.title}`}
      className="group cursor-pointer h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <div className="glass-effect rounded-2xl overflow-hidden border border-accent/20 group-hover:border-brand/50 group-focus-visible:border-brand transition-all duration-300 h-full flex flex-col">
        <div className="relative h-44 overflow-hidden bg-ink/60">
          <motion.img
            src={project.image}
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <motion.div
               initial={{ opacity: 0, scale: 0.5 }}
               animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
               className="p-3 bg-brand rounded-full text-[#050505]"
             >
               <Eye size={24} aria-hidden="true" />
             </motion.div>
          </div>
          
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {project.categories.map(cat => (
              <span key={cat} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                cat === 'web' 
                  ? 'bg-white/10 text-gray-200 border border-white/20' 
                  : 'bg-white/5 text-gray-400 border border-white/10'
              }`}>
                {cat === 'web' ? t('webApps') : t('discordBots')}
              </span>
            ))}
          </div>

          <motion.div
            className="absolute top-4 right-4 flex space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
            transition={{ duration: 0.2 }}
          >
            <motion.a
              href={project.github}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} source code on GitHub`}
              className="w-8 h-8 liquid-glass rounded-lg flex items-center justify-center text-white hover:bg-brand hover:text-[#050505] transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Github size={16} aria-hidden="true" />
            </motion.a>
            <motion.a
              href={project.live}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live site`}
              className="w-8 h-8 liquid-glass rounded-lg flex items-center justify-center text-white hover:bg-brand hover:text-[#050505] transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink size={16} aria-hidden="true" />
            </motion.a>
          </motion.div>
        </div>

        <div className="p-6 space-y-3 flex-1 flex flex-col">
          <div>
            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-brand transition-colors duration-200 font-display">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="text-[10px] font-bold px-2 py-1 bg-white/5 text-gray-300 border border-white/10 rounded uppercase tracking-tighter"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
            <div className="flex items-center space-x-4 text-xs text-gray-300">
              {stats && (
                <>
                  <span className="flex items-center" title="GitHub stars">
                    <Star size={12} className="mr-1 text-gray-400" aria-hidden="true" />
                    {stats.stars}
                  </span>
                  <span className="flex items-center" title="GitHub forks">
                    <GitFork size={12} className="mr-1" aria-hidden="true" />
                    {stats.forks}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center text-[10px] font-bold text-green-400 uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse" aria-hidden="true" />
              {project.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectModal = ({ project, isOpen, onClose }) => {
  const { t } = useTranslation();
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const previousFocusRef = useRef(null);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key === 'Tab' && dialogRef.current) {
      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;
    previousFocusRef.current = document.activeElement;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      previousFocusRef.current?.focus?.();
    };
  }, [isOpen, handleKeyDown]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} — ${t('preview')}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl aspect-video bg-[#0B0D11] rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1A1D23] border-b border-white/5">
              <div className="flex items-center space-x-2 text-gray-300">
                <Globe size={14} aria-hidden="true" />
                <span className="text-xs font-medium truncate max-w-[150px] sm:max-w-none">
                  {project.title} — {t('preview')}
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source code on GitHub`}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-all text-gray-300 hover:text-white"
                >
                  <Github size={16} aria-hidden="true" />
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${project.title} in a new tab`}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-all text-gray-300 hover:text-white"
                >
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
                <button 
                  ref={closeBtnRef}
                  onClick={onClose}
                  aria-label="Close preview"
                  className="p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all text-gray-300"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Content Area - Interactive Iframe */}
            <div className="flex-1 relative bg-[#0F1115]">
              <iframe 
                src={project.live} 
                className="w-full h-full border-none"
                title={`${project.title} preview`}
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Projects = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const INITIAL_VISIBLE = 3;

  useEffect(() => {
    setShowAll(false);
  }, [activeFilter]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.9],
      },
    },
  };

  const projects = [
    {
      id: 'bots-testing',
      title: t('botsProjectTitle'),
      description: t('botsProjectDesc'),
      image: '/projects/bots.png',
      categories: ['web', 'discord'],
      technologies: ['React', 'Tailwind CSS', 'Discord.js', 'Node.js'],
      github: 'https://github.com/orzz5/Bots-web',
      githubRepo: 'orzz5/Bots-web',
      live: 'https://bots.orzz.website',
      status: 'Live'
    },
    {
      id: 'weather-app',
      title: t('weatherProjectTitle'),
      description: t('weatherProjectDesc'),
      image: '/projects/weather.png',
      categories: ['web'],
      technologies: ['React', 'Weather API', 'Tailwind CSS'],
      github: 'https://github.com/orzz5/orzz-weather',
      githubRepo: 'orzz5/orzz-weather',
      live: 'https://weather.orzz.website',
      status: 'Live'
    },
    {
      id: 'bio-link',
      title: t('bioProjectTitle'),
      description: t('bioProjectDesc'),
      image: '/projects/bio.png',
      categories: ['web'],
      technologies: ['React', 'Tailwind CSS', 'Vercel'],
      github: 'https://github.com/orzz5/orzz-bio',
      githubRepo: 'orzz5/orzz-bio',
      live: 'https://bio.orzz.website',
      status: 'Live'
    },
    {
      id: 'web-builder',
      title: t('labsProjectTitle'),
      description: t('labsProjectDesc'),
      image: '/projects/labs.png',
      categories: ['web'],
      technologies: ['Web Builder', 'React', 'Tailwind CSS'],
      github: 'https://github.com/orzz5/labs',
      githubRepo: 'orzz5/labs',
      live: 'https://labs.orzz.website',
      status: 'Live'
    }
  ];

  const filters = [
    { id: 'all', label: t('allProjects'), icon: Code },
    { id: 'web', label: t('webApps'), icon: Eye },
    { id: 'discord', label: t('discordBots'), icon: Bot },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.categories.includes(activeFilter));

  const hasMore = filteredProjects.length > INITIAL_VISIBLE;
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, INITIAL_VISIBLE);

  return (
    <section id="projects" className="py-16 lg:py-24 relative">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-10"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold gradient-text tracking-tight mb-4">
              {t('projectsTitle')}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              {t('projectsTagline')}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="inline-flex glass-effect rounded-lg p-1 border border-accent/20" role="group" aria-label="Filter projects">
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  aria-pressed={activeFilter === filter.id}
                  className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200 ${
                    activeFilter === filter.id
                      ? 'bg-brand/15 text-brand border border-brand/40'
                      : 'text-gray-400 hover:text-white border border-transparent'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <filter.icon size={16} aria-hidden="true" />
                  <span className="text-sm font-medium">{filter.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {filteredProjects.length > 0 ? (
            <>
              <motion.div
                layout
                variants={itemVariants}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                <AnimatePresence initial={false}>
                  {visibleProjects.map((project) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -30, scale: 0.95 }}
                      transition={{ duration: 0.5, ease: [0.6, -0.05, 0.01, 0.9] }}
                    >
                      <ProjectCard project={project} onOpen={() => setSelectedProject(project)} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {hasMore && (
                <motion.div variants={itemVariants} layout className="flex justify-center">
                  <motion.button
                    onClick={() => setShowAll(!showAll)}
                    aria-expanded={showAll}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="liquid-glass inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-white font-medium hover:text-brand transition-all duration-300"
                  >
                    <span>{showAll ? t('showLessProjects') : t('showAllProjects')}</span>
                    <motion.span
                      animate={{ rotate: showAll ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown size={16} aria-hidden="true" />
                    </motion.span>
                  </motion.button>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div variants={itemVariants} className="text-center py-16">
              <div className="glass-effect rounded-2xl p-8 border border-accent/20 max-w-2xl mx-auto">
                <Code size={48} className="text-brand mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-2xl font-bold text-accent mb-4">{t('projectsComingSoon')}</h3>
                <p className="text-gray-300 mb-6">
                  {t('projectsSoonDesc')}
                </p>
                <motion.a
                  href="#contact"
                  className="inline-flex items-center space-x-2 bg-brand hover:bg-brand-dark text-[#050505] px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{t('getNotified')}</span>
                  <ExternalLink size={16} aria-hidden="true" />
                </motion.a>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default Projects;
