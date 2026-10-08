import { motion } from 'framer-motion';
import { Github, ArrowUp } from 'lucide-react';
import DiscordIcon from './DiscordIcon';
import SmartLink from './SmartLink';
import { GITHUB_URL, DISCORD_PROFILE_URL } from '../lib/constants';
import { useTranslation } from '../contexts/LanguageContext';
import { scrollToTop } from '../lib/scroll';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: GITHUB_URL, label: 'GitHub' },
    { icon: DiscordIcon, href: DISCORD_PROFILE_URL, label: 'Discord' }
  ];

  const quickLinks = [
    { name: t('home'), href: '/#home' },
    { name: t('about'), href: '/#about' },
    { name: t('projects'), href: '/#projects' },
    { name: t('blog'), href: '/blog' },
    { name: t('contact'), href: '/#contact' }
  ];

  const services = [
    { name: t('webDevelopment'), href: '/#about' },
    { name: t('uiuxDesign'), href: '/#about' },
    { name: t('consulting'), href: '/#contact' }
  ];

  return (
    <footer className="relative bg-dark-bg pt-16 pb-8 overflow-hidden border-t border-accent/10">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff fill-opacity=0.1%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

      <div className="w-full px-6 md:px-10 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <motion.div
              className="flex items-center space-x-2 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <img src="/logo.png" alt="orzz5 logo" className="w-10 h-10 object-contain" />
              <span className="text-2xl font-bold gradient-text">orzz5</span>
            </motion.div>
            <p className="text-gray-300 mb-6 max-w-sm leading-relaxed">
              {t('footerDesc')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 liquid-glass rounded-lg flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/50 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 mb-6">{t('quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <SmartLink
                    to={link.href}
                    className="text-gray-300 hover:text-brand transition-colors duration-200"
                  >
                    {link.name}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-gray-400 mb-6">{t('services')}</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <SmartLink
                    to={service.href}
                    className="text-gray-300 hover:text-brand transition-colors duration-200"
                  >
                    {service.name}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center lg:items-end justify-center">
            <motion.button
              onClick={() => scrollToTop()} aria-label={t('backToTop')}
              className="w-12 h-12 liquid-glass rounded-full flex items-center justify-center text-accent hover:border-accent/50 hover:shadow-glow mb-4 transition-all duration-300"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp size={24} aria-hidden="true" />
            </motion.button>
            <span className="text-gray-400 text-sm font-medium">{t('backToTop')}</span>
          </div>
        </div>

        <div className="pt-8 border-t border-accent/10">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} orzz5. {t('rights')} <span className="text-accent">❤️</span> {t('andLotsOf')} <span className="text-accent">☕</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
