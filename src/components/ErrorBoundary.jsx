import { Component } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { captureException } from '../lib/telemetry';

function ErrorFallback({ error }) {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center text-red-400">
          <AlertTriangle size={48} aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-white font-display">{t('errorTitle')}</h1>
        <p className="text-gray-400">{t('errorDesc')}</p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center space-x-2 bg-brand hover:bg-brand-dark text-[#050505] px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
          >
            <RefreshCw size={16} aria-hidden="true" />
            <span>{t('reload')}</span>
          </button>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 liquid-glass border border-accent/20 hover:border-brand/50 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            <Home size={16} aria-hidden="true" />
            <span>{t('backHome')}</span>
          </Link>
        </div>
        {import.meta.env.DEV && error?.message ? (
          <pre className="text-left text-xs text-red-300/80 bg-black/40 rounded-lg p-4 overflow-auto max-h-40">
            {error.message}
          </pre>
        ) : null}
      </div>
    </div>
  );
}

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    captureException(error);
    console.error('Render error:', error, info);
  }

  render() {
    if (this.state.error) return <ErrorFallback error={this.state.error} />;
    return this.props.children;
  }
}
