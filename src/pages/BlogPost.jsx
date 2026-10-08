import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import usePageMeta from '../hooks/usePageMeta';
import { getPostBySlug, BLOG_POSTS } from '../blog/posts';
import { SITE_URL } from '../lib/constants';
import NotFound from './NotFound';

function formatDate(iso) {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}

export default function BlogPost() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const post = getPostBySlug(slug);
  const idx = post ? BLOG_POSTS.findIndex((p) => p.slug === post.slug) : -1;
  const prev = idx > 0 ? BLOG_POSTS[idx - 1] : null;
  const next = idx >= 0 && idx < BLOG_POSTS.length - 1 ? BLOG_POSTS[idx + 1] : null;

  const jsonLd = useMemo(() => {
    if (!post) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.date,
      author: { '@type': 'Person', name: 'orzz5', url: SITE_URL },
      url: `${SITE_URL}/blog/${post.slug}`,
    };
  }, [post]);

  usePageMeta({
    title: post ? `${post.title} — orzz5` : '404 — orzz5',
    description: post ? post.excerpt : '',
    path: post ? `/blog/${post.slug}` : '/blog',
    jsonLd: jsonLd || undefined,
  });

  if (!post) return <NotFound />;

  return (
    <div className="w-full px-6 md:px-10 lg:px-16 py-24 lg:py-32">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto space-y-10"
      >
        <div className="space-y-5">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-brand transition-colors duration-200 text-sm font-medium"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>{t('backToBlog')}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 uppercase tracking-widest font-bold">
            <span className="flex items-center">
              <Calendar size={14} className="mr-1.5" aria-hidden="true" />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center">
              <Clock size={14} className="mr-1.5" aria-hidden="true" />
              {post.readingMinutes} {t('minRead')}
            </span>
          </div>

          <h1 className="text-[clamp(1.9rem,5vw,3.25rem)] font-bold gradient-text tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-300">{post.excerpt}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-6">
          {post.blocks.map((block, i) =>
            block.type === 'h2' ? (
              <h2 key={i} className="text-2xl font-bold text-white font-display pt-2">
                {block.text}
              </h2>
            ) : (
              <p key={i} className="text-gray-300 leading-relaxed text-[1.05rem]">
                {block.text}
              </p>
            ),
          )}
        </div>

        <div className="pt-6 border-t border-accent/10">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
            {prev ? (
              <Link
                to={`/blog/${prev.slug}`}
                className="group flex items-start space-x-3 max-w-[45%]"
              >
                <ArrowLeft size={18} className="mt-0.5 text-brand flex-shrink-0" aria-hidden="true" />
                <span className="block">
                  <span className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">
                    {t('readPrev')}
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-brand transition-colors hidden sm:block">
                    {prev.title}
                  </span>
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                to={`/blog/${next.slug}`}
                className="group flex items-start justify-end space-x-3 max-w-[45%] ml-auto text-right"
              >
                <span className="block">
                  <span className="block text-xs uppercase tracking-widest text-gray-400 font-bold mb-1">
                    {t('readNext')}
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-brand transition-colors hidden sm:block">
                    {next.title}
                  </span>
                </span>
                <ArrowRight size={18} className="mt-0.5 text-brand flex-shrink-0" aria-hidden="true" />
              </Link>
            ) : null}
          </div>
        </div>
      </motion.article>
    </div>
  );
}