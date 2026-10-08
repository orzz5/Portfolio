const STORAGE_KEY = 'accent-color';

export const ACCENTS = [
  { id: 'blue', rgb: '74,158,255', cssRgb: '74 158 255', darkCssRgb: '43 127 232', swatch: '#4a9eff', labelKey: 'accentBlue' },
  { id: 'violet', rgb: '167,139,250', cssRgb: '167 139 250', darkCssRgb: '139 92 246', swatch: '#a78bfa', labelKey: 'accentViolet' },
  { id: 'green', rgb: '52,211,153', cssRgb: '52 211 153', darkCssRgb: '16 185 129', swatch: '#34d399', labelKey: 'accentGreen' },
  { id: 'amber', rgb: '251,191,36', cssRgb: '251 191 36', darkCssRgb: '217 119 6', swatch: '#fbbf24', labelKey: 'accentAmber' },
];

let currentTriplet = ACCENTS[0].rgb;

export function getAccentTriplet() {
  return currentTriplet;
}

export function getAccent(id) {
  return ACCENTS.find((a) => a.id === id) || ACCENTS[0];
}

export function applyAccent(id) {
  const accent = getAccent(id);
  currentTriplet = accent.rgb;
  const root = document.documentElement;
  root.style.setProperty('--brand-rgb', accent.cssRgb);
  root.style.setProperty('--brand-dark-rgb', accent.darkCssRgb);
  root.dataset.accent = accent.id;
  try {
    localStorage.setItem(STORAGE_KEY, accent.id);
  } catch {
    /* storage unavailable */
  }
}

export function initAccent() {
  let stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
  applyAccent(stored || 'blue');
}

export function getStoredAccentId() {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'blue';
  } catch {
    return 'blue';
  }
}
