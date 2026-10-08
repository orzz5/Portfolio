import { useEffect } from 'react';
import { SITE_URL } from '../lib/constants';

const JSON_LD_ID = 'route-jsonld';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href) {
  if (!href) return;
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(data) {
  document.getElementById(JSON_LD_ID)?.remove();
  if (!data) return;
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = JSON_LD_ID;
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

export default function usePageMeta({
  title,
  description,
  path = '/',
  image = '/og.png',
  robots,
  jsonLd,
}) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const imageAbs = image.startsWith('http') ? image : `${SITE_URL}${image}`;

    if (title) document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', imageAbs);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', imageAbs);
    upsertCanonical(url);

    if (robots) {
      upsertMeta('name', 'robots', robots);
    } else {
      document.head.querySelector('meta[name="robots"]')?.remove();
    }

    upsertJsonLd(jsonLd);

    return () => {
      upsertJsonLd(null);
    };
  }, [title, description, path, image, robots, jsonLd]);
}
