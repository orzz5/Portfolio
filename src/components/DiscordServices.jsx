import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Bot, 
  Shield, 
  Music, 
  Gamepad2, 
  MessageSquare, 
  Zap, 
  Settings, 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Code,
  Database,
  Globe,
  Lock,
  BarChart3,
  Calendar,
  Gift
} from 'lucide-react';

const DiscordServices = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedService, setSelectedService] = useState(null);

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

  const botTypes = [
    {
      id: 'moderation',
      title: 'Moderation Bots',
      icon: Shield,
      description: 'Advanced server management with automated moderation tools',
      features: ['Auto moderation', 'Warning system', 'Role management', 'Audit logging'],
      color: 'from-red-500 to-pink-600',
      popular: true
    },
    {
      id: 'music',
      title: 'Music Bots',
      icon: Music,
      description: 'High-quality music playback with extensive library support',
      features: ['YouTube/Spotify', 'Playlists', 'Audio effects', 'Voice channels'],
      color: 'from-green-500 to-teal-600',
      popular: true
    },
    {
      id: 'gaming',
      title: 'Gaming Bots',
      icon: Gamepad2,
      description: 'Interactive games and gaming community management tools',
      features: ['Mini games', 'Tournaments', 'Stats tracking', 'LFG system'],
      color: 'from-purple-500 to-indigo-600',
      popular: false
    },
    {
      id: 'utility',
      title: 'Utility Bots',
      icon: Settings,
      description: 'Helpful tools for server management and user convenience',
      features: ['Custom commands', 'Reminders', 'Polls', 'Welcome messages'],
      color: 'from-blue-500 to-cyan-600',
      popular: false
    },
    {
      id: 'economy',
      title: 'Economy Bots',
      icon: Gift,
      description: 'Virtual currency systems with shops and rewards',
      features: ['Virtual currency', 'Shop system', 'Daily rewards', 'Gambling games'],
      color: 'from-yellow-500 to-orange-600',
      popular: true
    },
    {
      id: 'custom',
      title: 'Custom Bots',
      icon: Code,
      description: 'Tailored solutions for your specific server needs',
      features: ['Custom features', 'API integration', 'Database design', 'Unique commands'],
      color: 'from-pink-500 to-purple-600',
      popular: false
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with minimal latency'
    },
    {
      icon: Database,
      title: 'Data Storage',
      description: 'Secure database solutions for persistent data'
    },
    {
      icon: Lock,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security and 99.9% uptime'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Detailed insights and usage statistics'
    },
    {
      icon: Globe,
      title: 'Multi-language',
      description: 'Support for multiple languages and regions'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock maintenance and updates'
    }
  ];


  return (
    <section id="discord" className="py-20 relative">
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
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-accent to-purple-glow rounded-2xl flex items-center justify-center">
                <MessageSquare size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Discord Bot Development
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Create powerful, custom Discord bots that enhance your server experience and automate community management
            </p>
          </motion.div>

          {/* Bot Types Grid */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-purple-accent">Bot Types I Create</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {botTypes.map((bot) => (
                <motion.div
                  key={bot.id}
                  className="glass-effect rounded-xl p-6 border border-purple-accent/20 hover:border-purple-accent/40 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedService(bot)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${bot.color} rounded-lg flex items-center justify-center`}>
                      <bot.icon size={24} className="text-white" />
                    </div>
                    {bot.popular && (
                      <span className="px-2 py-1 bg-purple-accent/20 text-purple-glow text-xs rounded-full font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <h4 className="text-lg font-semibold text-purple-accent mb-2">{bot.title}</h4>
                  <p className="text-sm text-gray-400 mb-4">{bot.description}</p>
                  
                  <div className="space-y-2">
                    {bot.features.slice(0, 3).map((feature) => (
                      <div key={feature} className="flex items-center text-xs text-gray-400">
                        <CheckCircle size={12} className="mr-2 text-green-400" />
                        {feature}
                      </div>
                    ))}
                    {bot.features.length > 3 && (
                      <span className="text-xs text-purple-accent">+{bot.features.length - 3} more features</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Key Features */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-purple-accent">Why Choose My Bots?</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center group"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-accent to-purple-glow rounded-2xl flex items-center justify-center group-hover:shadow-purple-glow-hover transition-all duration-300">
                    <feature.icon size={32} className="text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-purple-accent mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>


                  </motion.div>
      </div>
    </section>
  );
};

export default DiscordServices;
