import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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

  // Technology logos data
  const topRowTechnologies = [
    { name: 'TypeScript', icon: Code, color: 'text-blue-400' },
    { name: 'HTML5', icon: Code, color: 'text-orange-500' },
    { name: 'CSS', icon: Palette, color: 'text-blue-500' },
    { name: 'React', icon: Layers, color: 'text-cyan-400' },
    { name: 'Next.js', icon: Globe, color: 'text-gray-300' },
    { name: 'Vue', icon: Box, color: 'text-green-500' },
    { name: 'Angular', icon: Layers, color: 'text-red-500' },
    { name: 'Vite', icon: Terminal, color: 'text-purple-400' },
    { name: 'Webpack', icon: Box, color: 'text-blue-400' },
    { name: 'Git', icon: GitBranch, color: 'text-orange-400' },
    { name: 'Docker', icon: Server, color: 'text-blue-500' },
    { name: 'JavaScript', icon: Code, color: 'text-yellow-400' },
    { name: 'TypeScript', icon: Code, color: 'text-blue-400' },
  ];

  const bottomRowTechnologies = [
    { name: 'PostgreSQL', icon: Database, color: 'text-blue-400' },
    { name: 'GSAP', icon: Cpu, color: 'text-green-400' },
    { name: 'Framer', icon: Layers, color: 'text-purple-500' },
    { name: 'Three.js', icon: Box, color: 'text-blue-300' },
    { name: 'WebGL', icon: Globe, color: 'text-purple-400' },
    { name: 'Tailwind', icon: Palette, color: 'text-cyan-400' },
    { name: 'Sass', icon: Palette, color: 'text-pink-400' },
    { name: 'MUI', icon: Box, color: 'text-blue-500' },
    { name: 'Chakra', icon: Box, color: 'text-teal-400' },
    { name: 'Express', icon: Server, color: 'text-gray-400' },
    { name: 'Firebase', icon: Cloud, color: 'text-orange-400' },
    { name: 'MongoDB', icon: Database, color: 'text-green-500' },
    { name: 'PostgreSQL', icon: Database, color: 'text-blue-400' },
    { name: 'GSAP', icon: Cpu, color: 'text-green-400' },
  ];

  return (
    <section id="technologies" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              What I Use
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Tools and technologies I work with daily
            </p>
          </motion.div>

          {/* Marquee Container */}
          <motion.div variants={itemVariants} className="relative">
            {/* Top Row - Moving Right */}
            <div className="relative overflow-hidden">
              <div className="flex space-x-8 animate-marquee-right">
                {[...topRowTechnologies, ...topRowTechnologies].map((tech, index) => (
                  <motion.div
                    key={`top-${index}`}
                    className="flex-shrink-0 w-20 h-20 glass-effect rounded-2xl border border-purple-accent/20 flex items-center justify-center group hover:border-purple-accent/40 transition-all duration-300"
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

            {/* Bottom Row - Moving Left */}
            <div className="relative overflow-hidden mt-8">
              <div className="flex space-x-8 animate-marquee-left">
                {[...bottomRowTechnologies, ...bottomRowTechnologies].map((tech, index) => (
                  <motion.div
                    key={`bottom-${index}`}
                    className="flex-shrink-0 w-20 h-20 glass-effect rounded-2xl border border-purple-accent/20 flex items-center justify-center group hover:border-purple-accent/40 transition-all duration-300"
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

          {/* View All Technologies Button */}
          <motion.div variants={itemVariants} className="text-center mt-12">
            <motion.button
              className="glass-effect border border-purple-accent/50 text-purple-accent px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-accent/10 transition-all duration-300 inline-flex items-center space-x-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Technologies</span>
              <Wrench size={20} />
            </motion.button>
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
