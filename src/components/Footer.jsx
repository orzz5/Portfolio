import React from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Globe, ArrowUp } from 'lucide-react';
import DiscordIcon from './DiscordIcon';
import { useTranslation } from '../contexts/LanguageContext';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/orzz5', label: 'GitHub' },
    { icon: DiscordIcon, href: 'https://discord.com/users/667791939453583373', label: 'Discord' }
  ];

  const quickLinks = [
    { name: t('home'), href: '#home' },
    { name: t('about'), href: '#about' },
    { name: t('projects'), href: '#projects' },
    { name: t('discordBots'), href: '#discord' },
    { name: t('contact'), href: '#contact' }
  ];

  const services = [
    { name: t('webDevelopment'), href: '#about' },
    { name: t('discordBotDev'), href: '#discord' },
    { name: t('uiuxDesign'), href: '#about' },
    { name: t('consulting'), href: '#contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-dark-bg pt-20 pb-10 overflow-hidden border-t border-purple-accent/10">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23a855f7 fill-opacity=0.1%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <motion.div 
              className="flex items-center space-x-2 mb-6"
              whileHover={{ scale: 1.05 }}
            >
              <img src="/logo.png" alt="orzz5 logo" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-bold gradient-text">orzz5</span>
            </motion.div>
            <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">
              {t('footerDesc')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center text-gray-400 hover:text-purple-accent hover:border-purple-accent/50 border border-purple-accent/10 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">{t('quickLinks')}</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-purple-accent transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-lg mb-6">{t('services')}</h4>
            <ul className="space-y-4">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href}
                    className="text-gray-400 hover:text-purple-accent transition-colors duration-200"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center lg:items-end justify-center">
            <motion.button
              onClick={scrollToTop}
              className="w-12 h-12 glass-effect rounded-full flex items-center justify-center text-purple-accent border border-purple-accent/20 hover:border-purple-accent/50 hover:shadow-purple-glow mb-4 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp size={24} />
            </motion.button>
            <span className="text-gray-400 text-sm font-medium">{t('backToTop')}</span>
          </div>
        </div>

        <div className="pt-10 border-t border-purple-accent/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            © {currentYear} orzz5. {t('rights')} <span className="text-purple-accent">❤️</span> {t('andLotsOf')} <span className="text-purple-accent">☕</span>
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-purple-accent text-sm transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-purple-accent text-sm transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
