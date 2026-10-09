import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, Send, Briefcase, User, Mail, FileText } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import DiscordPresence from './DiscordPresence';
import DiscordIcon from './DiscordIcon';
import { GITHUB_URL, DISCORD_PROFILE_URL } from '../lib/constants';

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
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => (prev[name] ? { ...prev, [name]: '' } : prev));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');
    setFormErrors({});

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
      } else if (response.status === 400 && data.errors) {
        const fieldKeys = {
          name: 'errNameShort',
          email: 'errEmailInvalid',
          subject: 'errSubjectShort',
          message: 'errMessageShort',
        };
        const mapped = {};
        for (const [field, serverMessage] of Object.entries(data.errors)) {
          mapped[field] = serverMessage.includes('too long')
            ? t('errTooLong')
            : t(fieldKeys[field] || 'messageError');
        }
        setFormErrors(mapped);
        setFormStatus('error');
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldError = (field) =>
    formErrors[field] ? (
      <p className="text-red-400 text-xs mt-1.5" role="alert">
        {formErrors[field]}
      </p>
    ) : null;

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
    <section ref={ref} id="contact" className="py-16 lg:py-24">
      <div className="w-full px-6 md:px-10 lg:px-16">
      <motion.div
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight mb-4">{t('getInTouch')}</h2>
            <p className="text-lg md:text-xl text-gray-300">{t('contactTagline')}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-6">
              <motion.div variants={itemVariants} className="text-center">
                <h3 className="text-2xl font-bold text-accent mb-4">{t('connectOnSocial')}</h3>
                <div className="flex justify-center space-x-4">
              <motion.a
                href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                className="w-12 h-12 liquid-glass rounded-xl flex items-center justify-center text-accent"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href={DISCORD_PROFILE_URL} target="_blank" rel="noopener noreferrer" aria-label="Discord"
                className="w-12 h-12 liquid-glass rounded-xl flex items-center justify-center text-accent"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <DiscordIcon size={20} />
              </motion.a>
            </div>
          </motion.div>

              <DiscordPresence />
            </div>

            <motion.div variants={itemVariants}>
              <div className="glass-effect rounded-2xl p-8 border border-accent/20">
              <h3 className="text-2xl font-bold text-accent mb-4">{t('sendMessage')}</h3>
              
              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status" className="glass-effect rounded-xl p-8 border border-green-500/30 bg-green-900/10"
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-accent mb-2">
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
                    minLength={2}
                    maxLength={200}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/30 transition-all duration-200"
                    placeholder="John Doe"
                  />
                  {fieldError('name')}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-accent mb-2">
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
                    maxLength={254}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/30 transition-all duration-200"
                    placeholder="john@example.com"
                  />
                  {fieldError('email')}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-accent mb-2">
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
                    minLength={3}
                    maxLength={300}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/30 transition-all duration-200"
                    placeholder="Project Inquiry"
                  />
                  {fieldError('subject')}
                </div>

                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-accent mb-2">
                    <Briefcase size={16} className="inline mr-2" />
                    {t('projectType')}
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/30 transition-all duration-200 [&>option]:bg-neutral-900 [&>option]:text-white"
                  >
                    <option value="">{t('selectProjectType')}</option>
                    <option value="Web Development">{t('webDevelopment')}</option>
                    <option value="Discord Bot">{t('discordBot')}</option>
                    <option value="UI/UX Design">{t('uiuxDesign')}</option>
                    <option value="Mobile App">{t('mobileApp')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-accent mb-2">
                    {t('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    minLength={10}
                    maxLength={5000}
                    rows={5}
                    className="w-full px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand/60 focus:ring-2 focus:ring-brand/30 transition-all duration-200 resize-none"
                    placeholder={t('messagePlaceholder')}
                  />
                  {fieldError('message')}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-brand hover:bg-brand-dark text-[#050505] px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[#050505] border-t-transparent rounded-full animate-spin" />
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
          </div>
        </motion.div>
      </motion.div>
      </div>
    </section>
  );
};

export default Contact;
