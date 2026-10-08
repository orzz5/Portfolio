import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, SearchX } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import usePageMeta from '../hooks/usePageMeta';

export default function NotFound() {
  const { t } = useTranslation();

  usePageMeta({
    title: `404 — orzz5`,
    description: '',
    path: '/404',
    robots: 'noindex,nofollow',
    jsonLd: undefined,
  });

  return (
    <div className="w-full px-6 py-32 lg:py-40 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center space-y-6 max-w-xl"
      >
        <div className="flex justify-center text-brand">
          <SearchX size={56} aria-hidden="true" />
        </div>
        <p className="text-[clamp(4rem,12vw,7rem)] font-bold gradient-text leading-none">
          404
        </p>
        <h1 className="text-2xl font-bold text-white font-display">{t('notFoundTitle')}</h1>
        <p className="text-gray-400">{t('notFoundDesc')}</p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 bg-brand hover:bg-brand-dark text-[#050505] px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          <Home size={16} aria-hidden="true" />
          <span>{t('backHome')}</span>
        </Link>
      </motion.div>
    </div>
  );
}