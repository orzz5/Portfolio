import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../contexts/LanguageContext';
import { 
  ExternalLink, 
  Github, 
  Eye, 
  Code, 
  Bot,
  Star,
  X,
  Maximize2,
  Minus,
  Globe,
  Pointer
} from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  const { t } = useTranslation();
  
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
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl aspect-video bg-[#0B0D11] rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Window Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#1A1D23] border-b border-white/5">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Globe size={14} />
                  <span className="text-xs font-medium truncate max-w-[150px] sm:max-w-none">
                    {project.title} — {t('preview')}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 bg-white/5 rounded-lg px-2 py-1 border border-white/10">
                  <button className="p-1 hover:bg-white/10 rounded transition-colors text-gray-400">
                    <Minus size={14} />
                  </button>
                  <button className="p-1 hover:bg-white/10 rounded transition-colors text-gray-400">
                    <Maximize2 size={14} />
                  </button>
                </div>
                <button 
                  onClick={onClose}
                  className="p-1.5 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-all text-gray-400"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content Area - Interactive Iframe */}
            <div className="flex-1 relative bg-[#0F1115]">
              <iframe 
                src={project.live} 
                className="w-full h-full border-none"
                title={project.title}
                loading="lazy"
              />
              
              {/* External Link at Top Right */}
              <div className="absolute top-6 right-6 z-10">
                <a 
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-purple-accent backdrop-blur-md rounded-xl border border-white/10 text-white transition-all duration-300 shadow-xl flex items-center justify-center group"
                >
                  <ExternalLink size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              </div>
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
      image: '/Bots.orzz.png',
      categories: ['web', 'discord'],
      technologies: ['React', 'Tailwind CSS', 'Discord.js', 'Node.js'],
      features: [t('autoModeration'), t('musicTitle'), t('economyTitle'), t('customFeatures')],
      github: 'https://github.com/orzz5/Bots-web',
      live: 'https://bots.orzz.website',
      stats: { stars: 12, forks: 5, servers: 150 },
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

  const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        variants={itemVariants}
        className="group cursor-pointer"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={() => setSelectedProject(project)}
      >
        <div className="glass-effect rounded-2xl overflow-hidden border border-purple-accent/20 hover:border-purple-accent/40 transition-all duration-300 h-full flex flex-col">
          <div className="relative h-56 overflow-hidden bg-purple-dark/20">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1000';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
               <motion.div
                 initial={{ opacity: 0, scale: 0.5 }}
                 animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.5 }}
                 className="p-3 bg-purple-accent rounded-full text-white"
               >
                 <Eye size={24} />
               </motion.div>
            </div>
            
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {project.categories.map(cat => (
                <span key={cat} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  cat === 'web' 
                    ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                    : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
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
                className="w-8 h-8 bg-purple-dark/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-purple-accent transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={16} />
              </motion.a>
              <motion.a
                href={project.live}
                onClick={(e) => e.stopPropagation()}
                target="_blank"
                className="w-8 h-8 bg-purple-dark/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-purple-accent transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink size={16} />
              </motion.a>
            </motion.div>
          </div>

          <div className="p-6 space-y-4 flex-1 flex flex-col">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-accent transition-colors duration-200 font-display">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
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
              <div className="flex items-center space-x-4 text-xs text-gray-400">
                <div className="flex items-center">
                  <Star size={12} className="mr-1 text-yellow-500" />
                  {project.stats.stars}
                </div>
                <div className="flex items-center">
                  <Github size={12} className="mr-1" />
                  {project.stats.forks}
                </div>
                {project.stats.servers && (
                  <div className="flex items-center">
                    <Bot size={12} className="mr-1 text-purple-accent" />
                    {project.stats.servers}
                  </div>
                )}
              </div>
              <div className="flex items-center text-[10px] font-bold text-green-400 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full mr-2 animate-pulse" />
                {project.status}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              {t('projectsTitle')}
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {t('projectsTagline')}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center">
            <div className="inline-flex glass-effect rounded-lg p-1 border border-purple-accent/20">
              {filters.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-md flex items-center space-x-2 transition-all duration-200 ${
                    activeFilter === filter.id
                      ? 'bg-gradient-to-r from-purple-accent to-purple-glow text-white'
                      : 'text-gray-400 hover:text-purple-accent'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <filter.icon size={16} />
                  <span className="text-sm font-medium">{filter.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {filteredProjects.length > 0 ? (
            <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div variants={itemVariants} className="text-center py-16">
              <div className="glass-effect rounded-2xl p-12 border border-purple-accent/20 max-w-2xl mx-auto">
                <Code size={48} className="text-purple-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-purple-accent mb-4">{t('projectsComingSoon')}</h3>
                <p className="text-gray-300 mb-6">
                  {t('projectsSoonDesc')}
                </p>
                <motion.a
                  href="#contact"
                  className="inline-flex items-center space-x-2 glow-button bg-gradient-to-r from-purple-accent to-purple-glow text-white px-6 py-3 rounded-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{t('getNotified')}</span>
                  <ExternalLink size={16} />
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
