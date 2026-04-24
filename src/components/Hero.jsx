import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Code, Bot, Sparkles, Zap } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../contexts/LanguageContext';

const Hero = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.9],
      },
    },
  };

  const floatingIcons = [
    { icon: Code, delay: 0, x: -100, y: -50 },
    { icon: Bot, delay: 0.5, x: 100, y: -80 },
    { icon: Sparkles, delay: 1, x: -80, y: 60 },
    { icon: Zap, delay: 1.5, x: 120, y: 40 },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating Icons */}
      {floatingIcons.map((item, index) => (
        <motion.div
          key={index}
          className="absolute text-purple-accent/20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: inView ? 0.3 : 0,
            scale: inView ? 1 : 0,
            x: [item.x, item.x + 20, item.x],
            y: [item.y, item.y - 20, item.y],
          }}
          transition={{
            opacity: { delay: item.delay, duration: 1 },
            scale: { delay: item.delay, duration: 0.5 },
            x: { repeat: Infinity, duration: 4, ease: "easeInOut" },
            y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
          }}
        >
          <item.icon size={40} />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Greeting */}
          <motion.div variants={itemVariants}>
            <p className="text-lg md:text-xl text-purple-glow font-medium mb-4">
              {t('helloIm')}
            </p>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-bold gradient-text mb-6"
          >
            orzz5
          </motion.h1>

          {/* Animated Typing Text */}
          <motion.div variants={itemVariants} className="h-20">
            <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-dark-text mb-4">
              <span className="text-purple-accent">{t('iBuild')} </span>
              <span className="gradient-text">
                <TypeAnimation
                  key={t('iBuild')} // Force re-render when language changes
                  sequence={[
                    t('amazingWebsites'),
                    2000,
                    t('discordBots2'),
                    2000,
                    t('userExperiences'),
                    2000,
                    t('digitalSolutions'),
                    2000,
                    t('customApplications'),
                    2000,
                  ]}
                  speed={50}
                  repeat={Infinity}
                  wrapper="span"
                  cursor={true}
                />
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            {t('heroDescription')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12"
          >
            <motion.a
              href="#projects"
              className="glow-button bg-gradient-to-r from-purple-accent to-purple-glow text-white px-8 py-4 rounded-full font-semibold text-lg shadow-purple-glow hover:shadow-purple-glow-hover transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('viewMyWork')}
            </motion.a>
            
            <motion.a
              href="#contact"
              className="glass-effect border border-purple-accent/50 text-purple-accent px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-accent/10 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('letsConnect')}
            </motion.a>
            
            <motion.a
              href="https://github.com/orzz5"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-effect border border-purple-accent/50 text-purple-accent px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-accent/10 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code size={20} className="mr-2" />
              {t('github')}
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-3xl mx-auto"
          >
            {[
              { number: '50+', label: t('projectsCompleted') },
              { number: '15+', label: t('discordBotsCount') },
              { number: '24/7', label: t('supportAvailable') },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.a
          href="#about"
          className="text-purple-accent hover:text-purple-glow transition-colors duration-200"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        >
          <ArrowDown size={24} />
        </motion.a>
      </motion.div>
    </section>
  );
};

export default Hero;
