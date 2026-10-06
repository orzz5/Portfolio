import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../contexts/LanguageContext';
import { 
  Rocket, 
  Palette, 
  Zap, 
  Bot, 
  Github,
  Globe,
  Scale
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
    <section id="about" className="py-16 lg:py-24 relative">
      <div className="w-full px-6 md:px-10 lg:px-16">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight mb-4">
              {t('aboutMe')}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              {t('aboutTagline')}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-accent mb-3">
                {t('aboutMe')}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {t('aboutDescription')}
              </p>
              <div className="flex flex-wrap gap-3 pt-4" aria-label="Core stack">
                {['React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Discord.js'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 glass-effect border border-brand/30 rounded-full text-sm font-medium text-brand"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            
            <motion.div
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass-effect rounded-2xl p-8 border border-accent/20">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Rocket, label: t('projectsCompleted'), value: '4' },
                    { icon: Github, label: t('publicRepos'), value: '4' },
                    { icon: Globe, label: t('siteLanguages'), value: '3' },
                    { icon: Scale, label: t('license'), value: 'MIT' },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="text-center"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-brand to-brand-dark rounded-lg flex items-center justify-center">
                        <item.icon size={24} className="text-[#050505]" aria-hidden="true" />
                      </div>
                      <div className="text-sm font-medium text-accent">{item.label}</div>
                      <div className="text-xs text-gray-300 mt-1">{item.value}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold gradient-text text-center">{t('whatIOffer')}</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-brand to-brand-dark rounded-2xl flex items-center justify-center group-hover:shadow-glow-hover transition-all duration-300">
                    <service.icon size={32} className="text-[#050505]" aria-hidden="true" />
                  </div>
                  <h4 className="text-lg font-semibold text-accent mb-2">{service.title}</h4>
                  <p className="text-sm text-gray-300 leading-relaxed">{service.description}</p>
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
