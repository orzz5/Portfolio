import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown, Code } from 'lucide-react';
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

  return (
    <section id="home" className="min-h-[85vh] flex items-center justify-center relative overflow-hidden">
      <div className="w-full px-6 md:px-10 lg:px-16 z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-sm text-gray-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            {t('availableForWork')}
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mt-6 text-5xl md:text-7xl lg:text-8xl font-bold gradient-text tracking-tight"
          >
            orzz5
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-4 text-xs md:text-sm font-semibold uppercase tracking-[0.3em] text-silver"
          >
            {t('heroRole')}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-6 text-xl md:text-3xl font-bold">
            <span className="text-accent">{t('iBuild')} </span>
            <span className="gradient-text">
              <TypeAnimation
                key={t('iBuild')}
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
          </motion.div>

          <motion.p
            variants={itemVariants}
            className="mt-5 text-base md:text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto"
          >
            {t('heroDescription')}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap justify-center items-center gap-3"
          >
            <motion.a
              href="#projects"
              className="liquid-glass inline-flex items-center justify-center whitespace-nowrap text-white px-6 py-3 rounded-full font-semibold text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('viewMyWork')}
            </motion.a>

            <motion.a
              href="#contact"
              className="liquid-glass inline-flex items-center justify-center whitespace-nowrap text-accent px-6 py-3 rounded-full font-semibold text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('letsConnect')}
            </motion.a>

            <motion.a
              href="https://github.com/orzz5"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass inline-flex items-center justify-center whitespace-nowrap text-accent px-6 py-3 rounded-full font-semibold text-base"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Code size={20} className="mr-2" />
              {t('github')}
            </motion.a>
          </motion.div>

        </motion.div>
      </div>

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
          className="text-accent hover:text-glow transition-colors duration-200"
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
