import React from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Mail, 
  MapPin,
  Heart,
  ArrowUp,
  Code,
  Bot
} from 'lucide-react';
import DiscordIcon from './DiscordIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/orzz5', label: 'GitHub' },
    { icon: DiscordIcon, href: 'https://discord.com/users/667791939453583373', label: 'Discord' }
  ];

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Discord Bots', href: '#discord' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    { name: 'Web Development', icon: Code },
    { name: 'Discord Bots', icon: Bot },
    { name: 'UI/UX Design', icon: Code },
    { name: 'Consulting', icon: Code }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-purple-dark to-purple-medium border-t border-purple-accent/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23a855f7 fill-opacity=0.1%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-accent to-purple-glow rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">O5</span>
                </div>
                <span className="text-xl font-bold gradient-text">orzz5</span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Creating exceptional digital experiences and powerful Discord bots that make communities thrive.
              </p>
              <div className="flex items-center space-x-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-purple-accent/20 rounded-lg flex items-center justify-center text-purple-accent hover:bg-purple-accent hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-purple-accent">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <motion.a
                      href={link.href}
                      className="text-gray-300 hover:text-purple-accent transition-colors duration-200 text-sm"
                      whileHover={{ x: 5 }}
                    >
                      {link.name}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-purple-accent">Services</h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service.name}>
                    <motion.div
                      className="flex items-center text-gray-300 hover:text-purple-accent transition-colors duration-200 text-sm cursor-pointer"
                      whileHover={{ x: 5 }}
                    >
                      <service.icon size={14} className="mr-2" />
                      {service.name}
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold text-purple-accent">Contact</h3>
              <div className="space-y-3">
                <motion.a
                  href="mailto:hello@orzz5.dev"
                  className="flex items-center text-gray-300 hover:text-purple-accent transition-colors duration-200 text-sm"
                  whileHover={{ x: 5 }}
                >
                  <Mail size={14} className="mr-2" />
                  hello@orzz5.dev
                </motion.a>
                <motion.div
                  className="flex items-center text-gray-300 text-sm"
                  whileHover={{ x: 5 }}
                >
                  <MapPin size={14} className="mr-2" />
                  Available Worldwide
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-purple-accent/20"
          >
            <div className="glass-effect rounded-xl p-6 border border-purple-accent/20">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-purple-accent mb-2">
                  Stay Updated
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Get notified about new projects and Discord bot releases
                </p>
                <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-purple-dark/50 border border-purple-accent/30 rounded-lg text-dark-text placeholder-gray-500 focus:outline-none focus:border-purple-accent focus:ring-2 focus:ring-purple-accent/20 transition-all duration-200"
                  />
                  <motion.button
                    className="px-6 py-2 bg-gradient-to-r from-purple-accent to-purple-glow text-white rounded-lg font-medium hover:shadow-purple-glow-hover transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Subscribe
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-purple-accent/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center md:text-left text-sm text-gray-400"
            >
              <p>
                © {currentYear} orzz5. All rights reserved. Made with{' '}
                <Heart size={14} className="inline text-red-500 fill-current" /> and lots of{' '}
                <Code size={14} className="inline text-purple-accent" />
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center space-x-6 text-sm text-gray-400"
            >
              <motion.button
                onClick={scrollToTop}
                className="flex items-center space-x-1 text-purple-accent hover:text-purple-glow transition-colors duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
              >
                <span>Back to top</span>
                <ArrowUp size={16} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
