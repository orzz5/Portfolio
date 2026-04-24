import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from '../contexts/LanguageContext';
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
  const { t } = useTranslation();
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
      title: t('moderationTitle'),
      icon: Shield,
      description: t('moderationDesc'),
      features: [t('autoModeration'), t('warningSystem'), t('roleManagement'), t('auditLogging')],
      color: 'from-red-500 to-pink-600',
      popular: true
    },
    {
      id: 'music',
      title: t('musicTitle'),
      icon: Music,
      description: t('musicDesc'),
      features: [t('youtubeSpotify'), t('playlists'), t('audioEffects'), t('voiceChannels')],
      color: 'from-green-500 to-teal-600',
      popular: true
    },
    {
      id: 'gaming',
      title: t('gamingTitle'),
      icon: Gamepad2,
      description: t('gamingDesc'),
      features: [t('miniGames'), t('tournaments'), t('statsTracking'), t('lfgSystem')],
      color: 'from-purple-500 to-indigo-600',
      popular: false
    },
    {
      id: 'utility',
      title: t('utilityTitle'),
      icon: Settings,
      description: t('utilityDesc'),
      features: [t('customCommands'), t('reminders'), t('polls'), t('welcomeMessages')],
      color: 'from-blue-500 to-cyan-600',
      popular: false
    },
    {
      id: 'economy',
      title: t('economyTitle'),
      icon: Gift,
      description: t('economyDesc'),
      features: [t('virtualCurrency'), t('shopSystem'), t('dailyRewards'), t('gamblingGames')],
      color: 'from-yellow-500 to-orange-600',
      popular: true
    },
    {
      id: 'custom',
      title: t('customBotsTitle'),
      icon: Code,
      description: t('customBotsDesc'),
      features: [t('customFeatures'), t('apiIntegration'), t('databaseDesign'), t('uniqueCommands')],
      color: 'from-pink-500 to-purple-600',
      popular: false
    }
  ];

  const features = [
    {
      icon: Zap,
      title: t('lightningFast'),
      description: t('lightningFastDesc')
    },
    {
      icon: Database,
      title: t('dataStorage'),
      description: t('dataStorageDesc')
    },
    {
      icon: Lock,
      title: t('secureReliable'),
      description: t('secureReliableDesc')
    },
    {
      icon: BarChart3,
      title: t('analyticsDashboard'),
      description: t('analyticsDashboardDesc')
    },
    {
      icon: Globe,
      title: t('multiLanguage'),
      description: t('multiLanguageDesc')
    },
    {
      icon: Clock,
      title: t('support247'),
      description: t('support247Desc')
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
          <motion.div variants={itemVariants} className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-accent to-purple-glow rounded-2xl flex items-center justify-center">
                <MessageSquare size={32} className="text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              {t('discordBotDev')}
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              {t('discordDesc')}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-purple-accent">{t('botTypesTitle')}</h3>
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
                        {t('popular')}
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
                      <span className="text-xs text-purple-accent">+{bot.features.length - 3} {t('featuresCount')}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-8">
            <h3 className="text-2xl font-bold text-center text-purple-accent">{t('whyChooseTitle')}</h3>
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
