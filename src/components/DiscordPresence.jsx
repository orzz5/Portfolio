import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Copy, Check } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import useDiscordPresence from '../hooks/useDiscordPresence';
import { DISCORD_USER_ID, DISCORD_PROFILE_URL } from '../lib/constants';

const DiscordPresence = () => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const discordData = useDiscordPresence();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(DISCORD_PROFILE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'idle': return 'bg-yellow-500';
      case 'dnd': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return t('online');
      case 'idle': return t('idle');
      case 'dnd': return t('dnd');
      default: return t('offline');
    }
  };

  const getAvatarUrl = (userId, avatar) => {
    if (!avatar) return null;
    return `https://cdn.discordapp.com/avatars/${userId}/${avatar}.png?size=256`;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div className="glass-effect rounded-2xl border border-accent/20 p-6 hover:border-accent/40 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-accent flex items-center">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.03-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            {t('discordPresence')}
          </h3>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(discordData.status)} ${discordData.status === 'online' ? 'animate-pulse' : ''}`} />
            <span className="text-xs text-gray-400 capitalize">{getStatusText(discordData.status)}</span>
          </div>
        </div>

        {discordData.loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-ink/50 border-2 border-accent/30">
                {discordData.avatar ? (
                  <img
                    src={getAvatarUrl(DISCORD_USER_ID, discordData.avatar)}
                    alt={`${discordData.username}'s avatar`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-accent to-glow">
                  <span className="text-neutral-900 text-xl font-bold">
                    {discordData.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-dark-bg ${getStatusColor(discordData.status)} ${discordData.status === 'online' ? 'animate-pulse' : ''}`} />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h4 className="text-lg font-semibold text-white truncate">
                  {discordData.username}
                </h4>
                <span className="text-sm text-gray-400">
                  #{discordData.discriminator}
                </span>
              </div>
              
              {discordData.activity ? (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    {discordData.activity.emoji && (
                      <img
                        src={discordData.activity.emoji.url}
                        alt={discordData.activity.emoji.name}
                        className="w-4 h-4"
                      />
                    )}
                    <span className="text-sm text-gray-300">
                      {discordData.activity.name}
                    </span>
                  </div>
                  {discordData.activity.state && (
                    <p className="text-xs text-gray-400 mt-1 truncate">
                      {discordData.activity.state}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-400 mt-2">
                  {discordData.status === 'online' ? t('available') : t('offline')}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-accent/20 flex items-center gap-3">
          <a
            href={DISCORD_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 liquid-glass flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-sm text-accent hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.03-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
            </svg>
            <span>{t('viewProfile')}</span>
          </a>
          <button
            onClick={handleCopy}
            aria-label={copied ? t('copied') : t('copyDiscord')}
            className="liquid-glass px-3 py-2.5 rounded-lg text-sm text-accent hover:text-white transition-colors duration-200"
          >
            {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DiscordPresence;
