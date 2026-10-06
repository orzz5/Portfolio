import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../contexts/LanguageContext';
import {
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiAngular,
  SiVite,
  SiWebpack,
  SiGit,
  SiDocker,
  SiJavascript,
  SiPostgresql,
  SiNodedotjs,
  SiGreensock,
  SiFramer,
  SiThreedotjs,
  SiTailwindcss,
  SiSass,
  SiMui,
  SiChakraui,
  SiExpress,
  SiFirebase,
  SiMongodb,
} from 'react-icons/si';

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
    { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
    { name: 'CSS', icon: SiCss3, color: '#1572B6' },
    { name: 'React', icon: SiReact, color: '#61DAFB' },
    { name: 'Next.js', icon: SiNextdotjs, color: '#FFFFFF' },
    { name: 'Vue', icon: SiVuedotjs, color: '#4FC08D' },
    { name: 'Angular', icon: SiAngular, color: '#DD0031' },
    { name: 'Vite', icon: SiVite, color: '#646CFF' },
    { name: 'Webpack', icon: SiWebpack, color: '#8DD6F9' },
    { name: 'Git', icon: SiGit, color: '#F05032' },
    { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  ];

  const bottomRowTechnologies = [
    { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'Sass', icon: SiSass, color: '#CC6699' },
    { name: 'Framer', icon: SiFramer, color: '#0099FF' },
    { name: 'GSAP', icon: SiGreensock, color: '#88CE02' },
    { name: 'Three.js', icon: SiThreedotjs, color: '#FFFFFF' },
    { name: 'MUI', icon: SiMui, color: '#007FFF' },
    { name: 'Chakra', icon: SiChakraui, color: '#319795' },
    { name: 'Express', icon: SiExpress, color: '#FFFFFF' },
  ];

  const TechTile = ({ tech, index, row }) => (
    <motion.div
      key={`${row}-${index}`}
      className="flex-shrink-0 w-20 h-20 glass-effect rounded-2xl border border-accent/20 flex items-center justify-center group hover:border-brand/50 transition-all duration-300"
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="text-center">
        <tech.icon
          size={30}
          style={{ color: tech.color }}
          className="mx-auto mb-1 group-hover:scale-110 transition-transform duration-300"
          aria-hidden="true"
        />
        <span className="text-xs text-gray-300 group-hover:text-white transition-colors duration-300">
          {tech.name}
        </span>
      </div>
    </motion.div>
  );

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
            <h2 className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold gradient-text tracking-tight mb-4">
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
                  <TechTile key={`top-${index}`} tech={tech} index={index} row="top" />
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden mt-6">
              <div className="flex space-x-8 animate-marquee-left">
                {[...bottomRowTechnologies, ...bottomRowTechnologies].map((tech, index) => (
                  <TechTile key={`bottom-${index}`} tech={tech} index={index} row="bottom" />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
