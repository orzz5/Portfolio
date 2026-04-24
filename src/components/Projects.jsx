import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../contexts/LanguageContext';
import { 
  ExternalLink, 
  Github, 
  Eye, 
  Code, 
  Bot,
  ShoppingCart,
  Users,
  Calendar,
  Star,
  Filter
} from 'lucide-react';

const Projects = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [activeFilter, setActiveFilter] = useState('all');

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

  const projects = [];

  const filters = [
    { id: 'all', label: t('allProjects'), icon: Code },
    { id: 'web', label: t('webApps'), icon: Eye },
    { id: 'discord', label: t('discordBots'), icon: Bot },
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const ProjectCard = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        variants={itemVariants}
        className="group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="glass-effect rounded-2xl overflow-hidden border border-purple-accent/20 hover:border-purple-accent/40 transition-all duration-300 h-full">
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                project.category === 'web' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'bg-purple-500/20 text-purple-400'
              }`}>
                {project.category === 'web' ? t('webApps') : t('discordBots')}
              </span>
            </div>

            <motion.div
              className="absolute top-4 right-4 flex space-x-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 20 }}
              transition={{ duration: 0.2 }}
            >
              <motion.a
                href={project.github}
                className="w-8 h-8 bg-purple-dark/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-purple-accent transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={16} />
              </motion.a>
              <motion.a
                href={project.live}
                className="w-8 h-8 bg-purple-dark/80 backdrop-blur-sm rounded-lg flex items-center justify-center text-white hover:bg-purple-accent transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ExternalLink size={16} />
              </motion.a>
            </motion.div>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-purple-accent mb-2 group-hover:text-purple-glow transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 bg-purple-accent/20 text-purple-glow rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium text-purple-accent">{t('keyFeatures')}</h4>
              <div className="flex flex-wrap gap-2">
                {project.features.slice(0, 3).map((feature) => (
                  <div key={feature} className="flex items-center text-xs text-gray-400">
                    <div className="w-1 h-1 bg-purple-accent rounded-full mr-2" />
                    {feature}
                  </div>
                ))}
                {project.features.length > 3 && (
                  <span className="text-xs text-purple-accent">+{project.features.length - 3} {t('featuresCount')}</span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-purple-accent/20">
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
                    <Users size={12} className="mr-1 text-purple-accent" />
                    {project.stats.servers}
                  </div>
                )}
              </div>
              <div className="flex items-center text-xs text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
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

          <motion.div variants={itemVariants} className="text-center pt-8">
            <motion.a
              href="#"
              className="inline-flex items-center space-x-2 glass-effect border border-purple-accent/50 px-6 py-3 rounded-lg text-purple-accent hover:bg-purple-accent/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{t('viewAllProjects')}</span>
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
