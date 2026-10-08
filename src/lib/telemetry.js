let sentry = null;

export async function initTelemetry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  if (!dsn) return;
  try {
    sentry = await import('@sentry/react');
    sentry.init({
      dsn,
      tracesSampleRate: 0.2,
      environment: import.meta.env.MODE,
    });
  } catch (err) {
    console.warn('Telemetry init failed:', err);
  }
}

export function captureException(err) {
  try {
    if (sentry) sentry.captureException(err);
  } catch {
    /* telemetry unavailable */
  }
}
