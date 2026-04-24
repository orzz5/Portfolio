import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Send, Briefcase, ChevronDown, User, Mail, FileText } from 'lucide-react';
<<<<<<< HEAD
import { useTranslation } from '../contexts/LanguageContext';
=======
>>>>>>> f06c400a5636818eb156430333fe5fecb027391f
import DiscordPresence from './DiscordPresence';
import DiscordIcon from './DiscordIcon';

const Contact = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    projectType: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setFormStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          projectType: '',
          message: ''
        });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section ref={ref} className="py-20">
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-purple-accent mb-4">{t('getInTouch')}</h2>
            <p className="text-lg text-gray-300 mb-8">{t('contactTagline')}</p>
          </div>

          <DiscordPresence />

          <motion.div variants={itemVariants} className="text-center mb-8">
<<<<<<< HEAD
            <h3 className="text-2xl font-bold text-purple-accent mb-6">{t('connectOnSocial')}</h3>
=======
            <h3 className="text-2xl font-bold text-purple-accent mb-6">Connect on Social</h3>
>>>>>>> f06c400a5636818eb156430333fe5fecb027391f
            <div className="flex justify-center space-x-4">
              <motion.a
                href="https://github.com/orzz5"
                className="w-12 h-12 bg-purple-accent/20 rounded-lg flex items-center justify-center text-purple-accent hover:bg-purple-accent hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href="https://discord.com/users/667791939453583373"
                className="w-12 h-12 bg-purple-accent/20 rounded-lg flex items-center justify-center text-purple-accent hover:bg-purple-accent hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <DiscordIcon size={20} />
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="glass-effect rounded-2xl p-8 border border-purple-accent/20 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-purple-accent mb-6">{t('sendMessage')}</h3>
              
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-effect rounded-xl p-6 border border-green-500/30 bg-green-900/10"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4l4 6 4l1.5 0 0-2-2-2h4l-1.5 0-2 2-2l4-1.5 0z" />
                      </svg>
                    </div>
                    <h4 className="text-xl font-bold text-green-400">{t('messageSuccess')}</h4>
                    <p className="text-green-300">{t('messageSuccessDesc')}</p>
                  </div>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-purple-accent mb-2">
                    <User size={16} className="inline mr-2" />
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-purple-dark/50 border border-purple-accent/30 rounded-lg text-dark-text placeholder-gray-500 focus:outline-none focus:border-purple-accent focus:ring-2 focus:ring-purple-accent/20 transition-all duration-200"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-purple-accent mb-2">
                    <Mail size={16} className="inline mr-2" />
                    {t('emailAddress')}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-purple-dark/50 border border-purple-accent/30 rounded-lg text-dark-text placeholder-gray-500 focus:outline-none focus:border-purple-accent focus:ring-2 focus:ring-purple-accent/20 transition-all duration-200"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-purple-accent mb-2">
                    <FileText size={16} className="inline mr-2" />
                    {t('subject')}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-purple-dark/50 border border-purple-accent/30 rounded-lg text-dark-text placeholder-gray-500 focus:outline-none focus:border-purple-accent focus:ring-2 focus:ring-purple-accent/20 transition-all duration-200"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-purple-accent mb-2">
                    <Briefcase size={16} className="inline mr-2" />
                    {t('projectType')}
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-purple-dark/50 border border-purple-accent/30 rounded-lg text-dark-text placeholder-gray-500 focus:outline-none focus:border-purple-accent focus:ring-2 focus:ring-purple-accent/20 transition-all duration-200"
                  >
                    <option value="">{t('selectProjectType')}</option>
                    <option value="Web Development">{t('webDevelopment')}</option>
                    <option value="Discord Bot">{t('discordBot')}</option>
                    <option value="UI/UX Design">{t('uiuxDesign')}</option>
                    <option value="Mobile App">{t('mobileApp')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-purple-accent mb-2">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-purple-dark/50 border border-purple-accent/30 rounded-lg text-dark-text placeholder-gray-500 focus:outline-none focus:border-purple-accent focus:ring-2 focus:ring-purple-accent/20 transition-all duration-200 resize-none"
                    placeholder={t('messagePlaceholder')}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full glow-button bg-gradient-to-r from-purple-accent to-purple-glow text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>{t('sending')}</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>{t('send')}</span>
                    </>
                  )}
                </motion.button>
              </form>

              {formStatus && (
                <div className="mt-6 text-center">
                  <p className={`text-sm ${
                    formStatus === 'success' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {formStatus === 'success' 
                      ? t('messageSuccessDesc') 
                      : t('messageError')}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
