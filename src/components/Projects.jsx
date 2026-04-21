import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
      category: 'web',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      features: ['Real-time inventory', 'Payment processing', 'Admin dashboard', 'Responsive design'],
      github: '#',
      live: '#',
      stats: { stars: 245, forks: 89, watchers: 12 },
      status: 'completed'
    },
    {
      id: 2,
      title: 'Discord Community Bot',
      description: 'Multi-purpose Discord bot with moderation, music, games, and custom commands for server management.',
      image: 'https://images.unsplash.com/photo-1516035069379-86924e7d6bb4?w=800&h=400&fit=crop',
      category: 'discord',
      technologies: ['Discord.js', 'Node.js', 'SQLite', 'Webhooks'],
      features: ['Moderation tools', 'Music player', 'Custom commands', 'Welcome messages'],
      github: '#',
      live: '#',
      stats: { stars: 189, forks: 45, servers: '500+' },
      status: 'completed'
    },
    {
      id: 3,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates, drag-and-drop, and team features.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop',
      category: 'web',
      technologies: ['React', 'Firebase', 'Material-UI', 'Redux'],
      features: ['Real-time sync', 'Drag & drop', 'Team collaboration', 'Mobile app'],
      github: '#',
      live: '#',
      stats: { stars: 156, forks: 67, users: '1.2k' },
      status: 'completed'
    },
    {
      id: 4,
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media management with scheduling and performance tracking.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      category: 'web',
      technologies: ['Vue.js', 'Chart.js', 'Express', 'PostgreSQL'],
      features: ['Multi-platform support', 'Analytics', 'Scheduling', 'Team management'],
      github: '#',
      live: '#',
      stats: { stars: 298, forks: 112, users: '3.5k' },
      status: 'completed'
    },
    {
      id: 5,
      title: 'Discord Music Bot',
      description: 'Advanced music bot with high-quality audio, playlists, radio stations, and voice channel management.',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=400&fit=crop',
      category: 'discord',
      technologies: ['Discord.js', 'YouTube API', 'Spotify API', 'Node.js'],
      features: ['HD audio', 'Playlists', 'Radio stations', 'Voice management'],
      github: '#',
      live: '#',
      stats: { stars: 412, forks: 156, servers: '1k+' },
      status: 'completed'
    },
    {
      id: 6,
      title: 'Portfolio Website',
      description: 'Modern portfolio website with 3D animations, dark mode, and optimized performance.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=400&fit=crop',
      category: 'web',
      technologies: ['React', 'Three.js', 'TailwindCSS', 'Framer Motion'],
      features: ['3D animations', 'Dark mode', 'Performance optimized', 'SEO friendly'],
      github: '#',
      live: '#',
      stats: { stars: 178, forks: 89, visitors: '10k+' },
      status: 'completed'
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects', icon: Code },
    { id: 'web', label: 'Web Apps', icon: Eye },
    { id: 'discord', label: 'Discord Bots', icon: Bot },
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
          {/* Project Image */}
          <div className="relative h-48 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-dark/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                project.category === 'web' 
                  ? 'bg-blue-500/20 text-blue-400' 
                  : 'bg-purple-500/20 text-purple-400'
              }`}>
                {project.category === 'web' ? 'Web App' : 'Discord Bot'}
              </span>
            </div>

            {/* Action Buttons */}
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

          {/* Project Content */}
          <div className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-bold text-purple-accent mb-2 group-hover:text-purple-glow transition-colors duration-200">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Technologies */}
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

            {/* Features */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-purple-accent">Key Features:</h4>
              <div className="flex flex-wrap gap-2">
                {project.features.slice(0, 3).map((feature) => (
                  <div key={feature} className="flex items-center text-xs text-gray-400">
                    <div className="w-1 h-1 bg-purple-accent rounded-full mr-2" />
                    {feature}
                  </div>
                ))}
                {project.features.length > 3 && (
                  <span className="text-xs text-purple-accent">+{project.features.length - 3} more</span>
                )}
              </div>
            </div>

            {/* Stats */}
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
          {/* Section Title */}
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Explore my latest work showcasing frontend development and Discord bot creation expertise
            </p>
          </motion.div>

          {/* Filter Buttons */}
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

          {/* Projects Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>

          {/* View More Button */}
          <motion.div variants={itemVariants} className="text-center pt-8">
            <motion.a
              href="#"
              className="inline-flex items-center space-x-2 glass-effect border border-purple-accent/50 px-6 py-3 rounded-lg text-purple-accent hover:bg-purple-accent/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Projects</span>
              <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
