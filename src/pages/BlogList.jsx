import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Rss, Calendar, Clock, ArrowRight } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import usePageMeta from '../hooks/usePageMeta';
import { BLOG_POSTS } from '../blog/posts';
import { SITE_URL } from '../lib/constants';

export default function BlogList() {
  const { t } = useTranslation();

  const jsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'orzz5 Blog',
      url: `${SITE_URL}/blog`,
      blogPost: BLOG_POSTS.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        datePublished: p.date,
        url: `${SITE_URL}/blog/${p.slug}`,
      })),
    }),
    [],
  );

  usePageMeta({
    title: `Blog — orzz5`,
    description: 'Notes, write-ups, and lessons from building and shipping projects on orzz.website.',
    path: '/blog',
    jsonLd,
  });

  return (
    <div className="w-full px-6 md:px-10 lg:px-16 py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-12"
      >
        <div className="flex items-start justify-between gap-6">
          <div className="space-y-4">
            <span className="inline-flex px-3 py-1 rounded-full bg-brand/15 text-brand border border-brand/40 text-xs font-bold uppercase tracking-widest">
              {t('blog')}
            </span>
            <h1 className="text-[clamp(2.25rem,6vw,4rem)] font-bold gradient-text tracking-tight">
              {t('blogTitle')}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
              {t('blogTagline')}
            </p>
          </div>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('rssFeed')}
            className="glass-effect rounded-xl p-3 text-gray-300 hover:text-brand transition-colors duration-200"
          >
            <Rss size={20} aria-hidden="true" />
          </a>
        </div>

        <div className="space-y-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group block glass-effect rounded-2xl p-6 border border-accent/20 hover:border-brand/50 transition-all duration-300"
            >
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 uppercase tracking-widest font-bold mb-3">
                <span className="flex items-center">
                  <Calendar size={13} className="mr-1.5" aria-hidden="true" />
                  {new Intl.DateTimeFormat('en', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    timeZone: 'UTC',
                  }).format(new Date(`${post.date}T00:00:00Z`))}
                </span>
                <span className="flex items-center">
                  <Clock size={13} className="mr-1.5" aria-hidden="true" />
                  {post.readingMinutes} {t('minRead')}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white group-hover:text-brand transition-colors duration-200 font-display mb-2">
                {post.title}
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">{post.excerpt}</p>
              <span className="inline-flex items-center space-x-1.5 text-sm font-semibold text-brand">
                <span>{t('readArticle')}</span>
                <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}