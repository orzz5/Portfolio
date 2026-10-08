import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Globe, Palette, Command } from 'lucide-react';
import DiscordIcon from './DiscordIcon';
import SmartLink from './SmartLink';
import { GITHUB_URL, DISCORD_PROFILE_URL } from '../lib/constants';
import { useTranslation } from '../contexts/LanguageContext';
import { ACCENTS, applyAccent, getStoredAccentId } from '../lib/accents';

const Navbar = ({ onOpenPalette }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showAccentDropdown, setShowAccentDropdown] = useState(false);
  const [activeAccent, setActiveAccent] = useState(getStoredAccentId());
  const { language, t, changeLanguage } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: t('home'), href: '/#home' },
    { name: t('about'), href: '/#about' },
    { name: t('projects'), href: '/#projects' },
    { name: t('blog'), href: '/blog' },
    { name: t('contact'), href: '/#contact' },
  ];

  const socialLinks = [
    { icon: Github, href: GITHUB_URL, label: 'GitHub' },
    { icon: DiscordIcon, href: DISCORD_PROFILE_URL, label: 'Discord' },
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
  ];

  const selectAccent = (id) => {
    applyAccent(id);
    setActiveAccent(id);
    setShowAccentDropdown(false);
  };

  const accentSwatches = (id) => (
    <span
      className="block w-4 h-4 rounded-full border border-white/30"
      style={{ backgroundColor: ACCENTS.find((a) => a.id === id)?.swatch }}
      aria-hidden="true"
    />
  );

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-effect shadow-glow' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full px-6 md:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SmartLink to="/#home" className="flex items-center space-x-2">
              <img src="/logo.png" alt="orzz5 logo" className="w-8 h-8 object-contain" />
              <span className="text-xl font-bold gradient-text">orzz5</span>
            </SmartLink>
          </motion.div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <SmartLink
                  key={item.name}
                  to={item.href}
                  className="text-dark-text hover:text-brand transition-colors duration-200 font-medium"
                >
                  {item.name}
                </SmartLink>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onOpenPalette}
              aria-label={t('openPalette')}
              className="hidden sm:flex liquid-glass items-center space-x-1.5 text-dark-text hover:text-brand px-2.5 py-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Command size={15} aria-hidden="true" />
              <span className="text-[11px] font-bold">⌘K</span>
            </motion.button>

            <div className="relative">
              <motion.button
                onClick={() => {
                  setShowAccentDropdown(!showAccentDropdown);
                  setShowLangDropdown(false);
                }}
                aria-label={t('accentColor')}
                aria-haspopup="menu"
                aria-expanded={showAccentDropdown}
                className="liquid-glass flex items-center text-dark-text hover:text-brand p-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Palette size={18} aria-hidden="true" />
                <span className="ml-1.5">{accentSwatches(activeAccent)}</span>
              </motion.button>

              <AnimatePresence>
                {showAccentDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-44 glass-effect border border-accent/20 rounded-lg shadow-lg z-50"
                  >
                    <p className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
                      {t('accentColor')}
                    </p>
                    {ACCENTS.map((accent) => (
                      <motion.button
                        key={accent.id}
                        onClick={() => selectAccent(accent.id)}
                        aria-current={activeAccent === accent.id ? 'true' : undefined}
                        className={`w-full flex items-center space-x-3 px-4 py-2.5 text-left hover:bg-brand/10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                          activeAccent === accent.id ? 'bg-brand/15 text-brand' : 'text-dark-text'
                        }`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {accentSwatches(accent.id)}
                        <span className="font-medium text-sm">{t(accent.labelKey)}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <motion.button
                onClick={() => {
                  setShowLangDropdown(!showLangDropdown);
                  setShowAccentDropdown(false);
                }}
                aria-label="Change language"
                aria-haspopup="menu"
                aria-expanded={showLangDropdown}
                className="liquid-glass flex items-center space-x-1 text-dark-text hover:text-brand p-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe size={18} aria-hidden="true" />
                <span className="hidden sm:inline text-sm font-medium">
                  {languages.find(lang => lang.code === language)?.flag}
                </span>
              </motion.button>

              <AnimatePresence>
                {showLangDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 glass-effect border border-accent/20 rounded-lg shadow-lg z-50"
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => {
                          changeLanguage(lang.code);
                          setShowLangDropdown(false);
                        }}
                        aria-current={language === lang.code ? 'true' : undefined}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-brand/10 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                          language === lang.code ? 'bg-brand/15 text-brand' : 'text-dark-text'
                        }`}
                        whileHover={{ x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="text-lg">{lang.flag}</span>
                        <span className="font-medium">{lang.name}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-dark-text hover:text-brand transition-colors duration-200"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon size={20} aria-hidden="true" />
                </motion.a>
              ))}
            </div>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className="md:hidden liquid-glass text-dark-text hover:text-brand p-2 rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden glass-effect border-t border-accent/20"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <SmartLink
                  key={item.name}
                  to={item.href}
                  className="block px-3 py-2 text-dark-text hover:text-brand hover:bg-brand/10 rounded-md transition-all duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </SmartLink>
              ))}

              <div className="flex items-center justify-between px-3 py-2 pt-4">
                <div className="flex items-center space-x-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="text-dark-text hover:text-brand transition-colors duration-200"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <social.icon size={20} aria-hidden="true" />
                    </motion.a>
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  {ACCENTS.map((accent) => (
                    <button
                      key={accent.id}
                      onClick={() => selectAccent(accent.id)}
                      aria-label={t(accent.labelKey)}
                      aria-current={activeAccent === accent.id ? 'true' : undefined}
                      className={`rounded-full transition-transform duration-200 ${
                        activeAccent === accent.id ? 'scale-125 ring-2 ring-white/50' : ''
                      }`}
                    >
                      {accentSwatches(accent.id)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
