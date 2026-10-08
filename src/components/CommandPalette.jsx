import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  CornerDownLeft,
  Home,
  User,
  FolderGit2,
  Newspaper,
  Mail,
  Github,
  Palette,
  Globe,
  FileText,
  Rss,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { PROJECTS } from '../lib/projects';
import { BLOG_POSTS } from '../blog/posts';
import { ACCENTS, applyAccent, getStoredAccentId } from '../lib/accents';
import { GITHUB_URL, DISCORD_PROFILE_URL } from '../lib/constants';

const GROUP_LABEL_KEYS = { nav: 'paletteNav', pages: 'palettePages', actions: 'paletteActions' };

export default function CommandPalette({ open, onOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const { t, language, changeLanguage } = useTranslation();

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (open) onClose();
        else onOpen();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onOpen, onClose]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const items = useMemo(() => {
    const go = (path) => {
      onClose();
      navigate(path);
    };

    const nav = [
      { id: 'nav-home', group: 'nav', icon: Home, label: t('home'), hint: '/#home', run: () => go('/#home') },
      { id: 'nav-about', group: 'nav', icon: User, label: t('about'), hint: '/#about', run: () => go('/#about') },
      { id: 'nav-projects', group: 'nav', icon: FolderGit2, label: t('projects'), hint: '/#projects', run: () => go('/#projects') },
      { id: 'nav-contact', group: 'nav', icon: Mail, label: t('contact'), hint: '/#contact', run: () => go('/#contact') },
      { id: 'nav-blog', group: 'nav', icon: Newspaper, label: t('blog'), hint: '/blog', run: () => go('/blog') },
    ];

    const pages = [
      ...PROJECTS.map((p) => ({
        id: `case-${p.slug}`,
        group: 'pages',
        icon: FolderGit2,
        label: t(p.titleKey),
        hint: `/projects/${p.slug}`,
        run: () => go(`/projects/${p.slug}`),
      })),
      ...BLOG_POSTS.map((p) => ({
        id: `post-${p.slug}`,
        group: 'pages',
        icon: FileText,
        label: p.title,
        hint: `/blog/${p.slug}`,
        run: () => go(`/blog/${p.slug}`),
      })),
    ];

    const languagesList = [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Español' },
      { code: 'fr', name: 'Français' },
    ];

    const actions = [
      ...languagesList.map((lang) => ({
        id: `lang-${lang.code}`,
        group: 'actions',
        icon: Globe,
        label: `${t('changeLanguage')}: ${lang.name}`,
        hint: language === lang.code ? '✓' : '',
        run: () => {
          changeLanguage(lang.code);
          onClose();
        },
      })),
      ...ACCENTS.map((accent) => ({
        id: `accent-${accent.id}`,
        group: 'actions',
        icon: Palette,
        label: `${t('accentColor')}: ${t(accent.labelKey)}`,
        hint: getStoredAccentId() === accent.id ? '✓' : '',
        run: () => {
          applyAccent(accent.id);
          onClose();
        },
      })),
      {
        id: 'act-github',
        group: 'actions',
        icon: Github,
        label: 'GitHub',
        hint: 'orzz5',
        run: () => {
          window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
      {
        id: 'act-discord',
        group: 'actions',
        icon: Globe,
        label: 'Discord',
        hint: 'orzz5',
        run: () => {
          window.open(DISCORD_PROFILE_URL, '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
      {
        id: 'act-rss',
        group: 'actions',
        icon: Rss,
        label: t('rssFeed'),
        hint: '/rss.xml',
        run: () => {
          window.open('/rss.xml', '_blank', 'noopener,noreferrer');
          onClose();
        },
      },
    ];

    return [...nav, ...pages, ...actions];
  }, [t, navigate, onClose, changeLanguage, language]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) || item.hint.toLowerCase().includes(q),
    );
  }, [items, query]);

  useEffect(() => {
    setActive((prev) => (prev < filtered.length ? prev : 0));
  }, [filtered.length]);

  const runActive = useCallback(() => {
    filtered[active]?.run();
  }, [filtered, active]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runActive();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  let lastGroup = null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[150] flex items-start justify-center pt-[12vh] px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t('openPalette')}
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-xl glass-effect border border-accent/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center px-4 border-b border-accent/20">
              <Search size={16} className="text-gray-400 flex-shrink-0" aria-hidden="true" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder={t('palettePlaceholder')}
                aria-label={t('palettePlaceholder')}
                className="w-full bg-transparent px-3 py-4 text-sm text-white placeholder:text-gray-500 outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center text-[10px] font-bold text-gray-500 border border-white/15 rounded px-1.5 py-0.5">
                ESC
              </kbd>
            </div>

            <div className="max-h-[50vh] overflow-y-auto py-2" role="listbox" aria-label={t('openPalette')}>
              {filtered.length === 0 ? (
                <p className="px-4 py-6 text-sm text-gray-500 text-center">
                  {t('paletteNoResults')}
                </p>
              ) : (
                filtered.map((item, index) => {
                  const showGroup = item.group !== lastGroup;
                  lastGroup = item.group;
                  return (
                    <div key={item.id}>
                      {showGroup && (
                        <p className="px-4 pt-3 pb-1 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">
                          {t(GROUP_LABEL_KEYS[item.group])}
                        </p>
                      )}
                      <button
                        role="option"
                        aria-selected={index === active}
                        onMouseEnter={() => setActive(index)}
                        onClick={() => item.run()}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100 ${
                          index === active ? 'bg-brand/15 text-brand' : 'text-gray-300'
                        }`}
                      >
                        <item.icon size={16} className="flex-shrink-0" aria-hidden="true" />
                        <span className="flex-1 truncate text-sm font-medium">{item.label}</span>
                        <span className="text-xs text-gray-500 font-mono truncate max-w-[40%]">
                          {item.hint}
                        </span>
                        {index === active && (
                          <CornerDownLeft size={13} className="text-gray-500 flex-shrink-0" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            <div className="hidden sm:flex items-center justify-between px-4 py-2.5 border-t border-accent/20 text-[11px] text-gray-500">
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <ArrowUp size={11} aria-hidden="true" />
                  <ArrowDown size={11} aria-hidden="true" />
                  {t('paletteNavigate')}
                </span>
                <span className="flex items-center gap-1">
                  <CornerDownLeft size={11} aria-hidden="true" />
                  {t('paletteSelect')}
                </span>
              </span>
              <span>⌘K</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
