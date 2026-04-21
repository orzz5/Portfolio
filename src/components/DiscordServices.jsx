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
  Star, 
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

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$49',
      period: 'one-time',
      features: [
        'Basic bot setup',
        'Up to 10 custom commands',
        '1 month support',
        'Basic features'
      ],
      popular: false,
      color: 'border-gray-600'
    },
    {
      name: 'Professional',
      price: '$149',
      period: 'one-time',
      features: [
        'Advanced bot features',
        'Up to 50 custom commands',
        '3 months support',
        'Database integration',
        'API connections'
      ],
      popular: true,
      color: 'border-purple-accent'
    },
    {
      name: 'Enterprise',
      price: '$299',
      period: 'one-time',
      features: [
        'Custom development',
        'Unlimited commands',
        '6 months support',
        'Advanced analytics',
        'Priority updates',
        'Source code included'
      ],
      popular: false,
      color: 'border-gray-600'
    }
  ];

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Server Owner',
      content: 'The moderation bot transformed our server management. Automated everything we needed!',
      rating: 5,
      server: 'Gaming Community - 10K members'
    },
    {
      name: 'Sarah Johnson',
      role: 'Community Manager',
      content: 'Best music bot we\'ve ever used. High quality audio and amazing features!',
      rating: 5,
      server: 'Music Lounge - 5K members'
    },
    {
      name: 'Mike Williams',
      role: 'Developer',
      content: 'Custom bot development was exactly what we needed. Professional and fast delivery.',
      rating: 5,
      server: 'Dev Community - 2K members'
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

          {/* Pricing Plans */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-purple-accent">Pricing Plans</h3>
            <div className="grid md:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  className={`glass-effect rounded-2xl p-8 border ${plan.popular ? 'border-purple-accent shadow-purple-glow' : plan.color} relative`}
                  whileHover={{ scale: 1.02, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="px-4 py-1 bg-gradient-to-r from-purple-accent to-purple-glow text-white text-sm rounded-full font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <h4 className="text-xl font-bold text-purple-accent mb-2">{plan.name}</h4>
                    <div className="flex items-baseline justify-center">
                      <span className="text-3xl font-bold gradient-text">{plan.price}</span>
                      <span className="text-gray-400 ml-2">/{plan.period}</span>
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-300">
                        <CheckCircle size={16} className="mr-3 text-green-400 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <motion.button
                    className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-accent to-purple-glow text-white hover:shadow-purple-glow-hover'
                        : 'glass-effect border border-purple-accent/50 text-purple-accent hover:bg-purple-accent/10'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-purple-accent">Happy Clients</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="glass-effect rounded-xl p-6 border border-purple-accent/20"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-purple-accent">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                    <div className="text-xs text-gray-500 text-right">
                      {testimonial.server}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="glass-effect rounded-2xl p-12 border border-purple-accent/20">
              <h3 className="text-2xl font-bold gradient-text mb-4">
                Ready to Transform Your Discord Server?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's discuss your requirements and create a custom Discord bot that perfectly fits your community's needs
              </p>
              <motion.div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="#contact"
                  className="glow-button bg-gradient-to-r from-purple-accent to-purple-glow text-white px-8 py-4 rounded-full font-semibold inline-flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start Your Project</span>
                  <ArrowRight size={20} />
                </motion.a>
                <motion.a
                  href="#"
                  className="glass-effect border border-purple-accent/50 text-purple-accent px-8 py-4 rounded-full font-semibold inline-flex items-center justify-center space-x-2 hover:bg-purple-accent/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>View Portfolio</span>
                  <MessageSquare size={20} />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscordServices;
