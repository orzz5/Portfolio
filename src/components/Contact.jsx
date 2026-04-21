import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Mail, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Twitter, 
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Briefcase,
  FileText
} from 'lucide-react';
import DiscordPresence from './DiscordPresence';
import DiscordIcon from './DiscordIcon';

const Contact = () => {
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
  const [discordStatus, setDiscordStatus] = useState('offline');

  useEffect(() => {
    // Simulate Discord status check (in real implementation, you'd use Discord API)
    const checkDiscordStatus = () => {
      // This would be a real API call to Discord's status endpoint
      setDiscordStatus('online'); // or 'idle', 'dnd', 'offline'
    };
    
    checkDiscordStatus();
    const interval = setInterval(checkDiscordStatus, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

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

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@orzz5.dev',
      link: 'mailto:hello@orzz5.dev',
      description: 'Get a response within 24 hours'
    },
    {
      icon: DiscordIcon,
      title: 'Discord',
      value: 'orzz5#1234',
      link: 'https://discord.com/users/667791939453583373',
      description: 'Click to view profile - Real-time status available'
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/orzz5', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: DiscordIcon, href: 'https://discord.com/users/667791939453583373', label: 'Discord', color: 'hover:text-purple-400' }
  ];

  const projectTypes = [
    'Web Development',
    'Discord Bot',
    'UI/UX Design',
    'Mobile App',
    'API Development',
    'Other'
  ];

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
        // Handle validation errors or other errors
        if (data.errors) {
          // Display validation errors
          const errorMessages = Object.values(data.errors).join(', ');
          setFormStatus(`error: ${errorMessages}`);
        } else {
          setFormStatus(`error: ${data.message || 'Failed to send message'}`);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus('error: Failed to send message. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 relative">
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
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
              Let's Work Together
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing!
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-purple-accent mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.link}
                      className="glass-effect rounded-xl p-6 border border-purple-accent/20 hover:border-purple-accent/40 transition-all duration-300 block group"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-accent to-purple-glow rounded-lg flex items-center justify-center flex-shrink-0 group-hover:shadow-purple-glow-hover transition-all duration-300">
                          <info.icon size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-lg font-semibold text-purple-accent">{info.title}</h4>
                            {info.title === 'Discord' && (
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  discordStatus === 'online' ? 'bg-green-400 animate-pulse' : 
                                  discordStatus === 'idle' ? 'bg-yellow-400' : 
                                  discordStatus === 'dnd' ? 'bg-red-400' : 'bg-gray-400'
                                }`} />
                                <span className="text-xs text-gray-400 capitalize">{discordStatus}</span>
                              </div>
                            )}
                          </div>
                          <p className="text-dark-text font-medium mb-1">{info.value}</p>
                          <p className="text-sm text-gray-400">{info.description}</p>
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-2xl font-bold text-purple-accent mb-6">Connect on Social</h3>
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="glass-effect rounded-xl p-4 border border-purple-accent/20 hover:border-purple-accent/40 transition-all duration-300 flex items-center space-x-3 group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <social.icon size={20} className={`text-gray-400 group-hover:text-white transition-colors duration-200`} />
                      <span className="text-gray-300 group-hover:text-purple-accent transition-colors duration-200 font-medium">
                        {social.label}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Discord Presence Widget */}
              <DiscordPresence />

              {/* Availability */}
              <motion.div variants={itemVariants} className="glass-effect rounded-xl p-6 border border-purple-accent/20">
                <div className="flex items-center space-x-3 mb-4">
                  <Clock size={24} className="text-purple-accent" />
                  <h4 className="text-lg font-semibold text-purple-accent">Availability</h4>
                </div>
                <div className="space-y-2 text-sm text-gray-300">
                  <div className="flex items-center">
                    <CheckCircle size={16} className="mr-2 text-green-400" />
                    Available for new projects
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={16} className="mr-2 text-green-400" />
                    Quick response time
                  </div>
                  <div className="flex items-center">
                    <CheckCircle size={16} className="mr-2 text-green-400" />
                    Free consultation
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="glass-effect rounded-2xl p-8 border border-purple-accent/20">
                <h3 className="text-2xl font-bold text-purple-accent mb-6">Send a Message</h3>
                
                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg flex items-center space-x-3"
                  >
                    <CheckCircle size={20} className="text-green-400" />
                    <span className="text-green-400">Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {formStatus && formStatus.startsWith('error:') && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-center space-x-3"
                  >
                    <AlertCircle size={20} className="text-red-400" />
                    <span className="text-red-400">{formStatus.replace('error:', '')}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-purple-accent mb-2">
                        <User size={16} className="inline mr-2" />
                        Your Name
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
                        Email Address
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
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-purple-accent mb-2">
                      <FileText size={16} className="inline mr-2" />
                      Subject
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
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-purple-dark/50 border border-purple-accent/30 rounded-lg text-dark-text focus:outline-none focus:border-purple-accent focus:ring-2 focus:ring-purple-accent/20 transition-all duration-200"
                    >
                      <option value="">Select a project type</option>
                      {projectTypes.map((type) => (
                        <option key={type} value={type} className="bg-purple-dark">
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-purple-accent mb-2">
                      <DiscordIcon size={16} className="inline mr-2" />
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-purple-dark/50 border border-purple-accent/30 rounded-lg text-dark-text placeholder-gray-500 focus:outline-none focus:border-purple-accent focus:ring-2 focus:ring-purple-accent/20 transition-all duration-200 resize-none"
                      placeholder="Tell me about your project..."
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
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-400">
                  <p>I'll respond to your message within 24 hours.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
