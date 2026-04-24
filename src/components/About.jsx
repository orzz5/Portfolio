import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../contexts/LanguageContext';
import { 
  Code2, 
  Palette, 
  Zap, 
  Globe, 
  Bot, 
  Database, 
  Smartphone, 
  Cloud,
  GitBranch,
  Terminal,
  Rocket
} from 'lucide-react';

const About = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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

  const skills = [
    {
      category: t('frontendDev'),
      icon: Code2,
      level: 95,
      technologies: ['React', 'Vue.js', 'TypeScript', 'TailwindCSS', 'Next.js'],
      color: 'from-blue-500 to-purple-600'
    },
    {
      category: t('designTitle'),
      icon: Palette,
      level: 85,
      technologies: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      color: 'from-pink-500 to-purple-600'
    },
    {
      category: t('discordDevTitle'),
      icon: Bot,
      level: 90,
      technologies: ['Discord.js', 'Node.js', 'Python', 'Webhooks'],
      color: 'from-purple-500 to-indigo-600'
    },
    {
      category: t('backendDev'),
      icon: Database,
      level: 75,
      technologies: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
      color: 'from-green-500 to-teal-600'
    },
    {
      category: t('mobileDev'),
      icon: Smartphone,
      level: 70,
      technologies: ['React Native', 'Flutter', 'Progressive Web Apps'],
      color: 'from-orange-500 to-red-600'
    },
    {
      category: t('cloudDev'),
      icon: Cloud,
      level: 80,
      technologies: ['AWS', 'Vercel', 'Docker', 'CI/CD'],
      color: 'from-cyan-500 to-blue-600'
    }
  ];

  const services = [
    {
      icon: Rocket,
      title: t('webDevTitle'),
      description: t('webDevDesc'),
    },
    {
      icon: Bot,
      title: t('discordDevTitle'),
      description: t('discordDevDesc'),
    },
    {
      icon: Palette,
      title: t('designTitle'),
      description: t('designDesc'),
    },
    {
      icon: Zap,
      title: t('perfOptTitle'),
      description: t('perfOptDesc'),
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              {t('aboutMe')}
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {t('aboutTagline')}
            </p>
          </motion.div>

          {/* About Content */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold text-purple-accent mb-4">
                {t('aboutMe')}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t('aboutDescription')}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                {[t('problemSolver'), t('creativeThinker'), t('teamPlayer'), t('fastLearner')].map((trait) => (
                  <span
                    key={trait}
                    className="px-4 py-2 glass-effect border border-purple-accent/30 rounded-full text-sm font-medium text-purple-accent"
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>
            
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-effect rounded-2xl p-8 border border-purple-accent/20">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Code2, label: t('cleanCode'), value: '100%' },
                    { icon: Zap, label: t('performance'), value: 'A+' },
                    { icon: GitBranch, label: t('versionControl'), value: 'Git Pro' },
                    { icon: Terminal, label: t('debugging'), value: t('expert') },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-accent to-purple-glow rounded-lg flex items-center justify-center">
                        <item.icon size={24} className="text-white" />
                      </div>
                      <div className="text-sm font-medium text-purple-accent">{item.label}</div>
                      <div className="text-xs text-gray-400 mt-1">{item.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Skills Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-3xl font-bold text-center gradient-text">{t('skillsExpertise')}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  className="glass-effect rounded-xl p-6 border border-purple-accent/20 hover:border-purple-accent/40 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-br ${skill.color} rounded-lg flex items-center justify-center mr-3`}>
                      <skill.icon size={20} className="text-white" />
                    </div>
                    <h4 className="text-lg font-semibold text-purple-accent">{skill.category}</h4>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-400">Proficiency</span>
                      <span className="text-purple-accent font-medium">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-purple-dark/50 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {skill.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-1 bg-purple-accent/20 text-purple-glow rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-3xl font-bold text-center gradient-text">{t('whatIOffer')}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-accent to-purple-glow rounded-2xl flex items-center justify-center group-hover:shadow-purple-glow-hover transition-all duration-300">
                    <service.icon size={32} className="text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-purple-accent mb-2">{service.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
