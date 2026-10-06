import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../contexts/LanguageContext';
import { 
  Code, 
  Database, 
  Globe, 
  Cpu, 
  Palette,
  Server,
  Cloud,
  GitBranch,
  Terminal,
  Layers,
  Box,
  Wrench
} from 'lucide-react';

const Technologies = () => {
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
        staggerChildren: 0.1,
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

  const topRowTechnologies = [
    { name: 'TypeScript', icon: Code, color: 'text-gray-300' },
    { name: 'HTML5', icon: Code, color: 'text-gray-300' },
    { name: 'CSS', icon: Palette, color: 'text-gray-300' },
    { name: 'React', icon: Layers, color: 'text-gray-300' },
    { name: 'Next.js', icon: Globe, color: 'text-gray-300' },
    { name: 'Vue', icon: Box, color: 'text-gray-300' },
    { name: 'Angular', icon: Layers, color: 'text-gray-300' },
    { name: 'Vite', icon: Terminal, color: 'text-gray-300' },
    { name: 'Webpack', icon: Box, color: 'text-gray-300' },
    { name: 'Git', icon: GitBranch, color: 'text-gray-300' },
    { name: 'Docker', icon: Server, color: 'text-gray-300' },
    { name: 'JavaScript', icon: Code, color: 'text-gray-300' },
    { name: 'TypeScript', icon: Code, color: 'text-gray-300' },
  ];

  const bottomRowTechnologies = [
    { name: 'PostgreSQL', icon: Database, color: 'text-gray-300' },
    { name: 'GSAP', icon: Cpu, color: 'text-gray-300' },
    { name: 'Framer', icon: Layers, color: 'text-gray-300' },
    { name: 'Three.js', icon: Box, color: 'text-gray-300' },
    { name: 'WebGL', icon: Globe, color: 'text-gray-300' },
    { name: 'Tailwind', icon: Palette, color: 'text-gray-300' },
    { name: 'Sass', icon: Palette, color: 'text-gray-300' },
    { name: 'MUI', icon: Box, color: 'text-gray-300' },
    { name: 'Chakra', icon: Box, color: 'text-gray-300' },
    { name: 'Express', icon: Server, color: 'text-gray-400' },
    { name: 'Firebase', icon: Cloud, color: 'text-gray-300' },
    { name: 'MongoDB', icon: Database, color: 'text-gray-300' },
    { name: 'PostgreSQL', icon: Database, color: 'text-gray-300' },
    { name: 'GSAP', icon: Cpu, color: 'text-gray-300' },
  ];

  return (
    <section id="technologies" className="py-16 lg:py-24 relative overflow-hidden">
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
              {t('whatIUse')}
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              {t('toolsDaily')}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="relative">
            <div className="relative overflow-hidden">
              <div className="flex space-x-8 animate-marquee-right">
                {[...topRowTechnologies, ...topRowTechnologies].map((tech, index) => (
                  <motion.div
                    key={`top-${index}`}
                    className="flex-shrink-0 w-20 h-20 glass-effect rounded-2xl border border-accent/20 flex items-center justify-center group hover:border-accent/40 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-center">
                      <tech.icon 
                        size={32} 
                        className={`${tech.color} mx-auto mb-1 group-hover:scale-110 transition-transform duration-300`} 
                      />
                      <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {tech.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden mt-6">
              <div className="flex space-x-8 animate-marquee-left">
                {[...bottomRowTechnologies, ...bottomRowTechnologies].map((tech, index) => (
                  <motion.div
                    key={`bottom-${index}`}
                    className="flex-shrink-0 w-20 h-20 glass-effect rounded-2xl border border-accent/20 flex items-center justify-center group hover:border-accent/40 transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-center">
                      <tech.icon 
                        size={32} 
                        className={`${tech.color} mx-auto mb-1 group-hover:scale-110 transition-transform duration-300`} 
                      />
                      <span className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {tech.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes marquee-right {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-left {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee-right {
          animation: marquee-right 30s linear infinite;
        }

        .animate-marquee-left {
          animation: marquee-left 35s linear infinite;
        }

        .animate-marquee-right:hover,
        .animate-marquee-left:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Technologies;
