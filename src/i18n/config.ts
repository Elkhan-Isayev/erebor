/**
 * Supported locales. English is the default and is served without a prefix,
 * every other locale lives under /<code>/.
 */
export const LOCALES = ['en', 'de', 'es', 'fr', 'el', 'uk', 'ru', 'ar'] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

interface LocaleMeta {
  /** Language name written in that language — how it appears in the switcher. */
  name: string;
  dir: 'ltr' | 'rtl';
  /** BCP 47 tag for the lang attribute and hreflang. */
  tag: string;
  /** Locale passed to Intl for numbers and dates. */
  intl: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { name: 'English', dir: 'ltr', tag: 'en', intl: 'en-GB' },
  de: { name: 'Deutsch', dir: 'ltr', tag: 'de', intl: 'de-DE' },
  es: { name: 'Español', dir: 'ltr', tag: 'es', intl: 'es-ES' },
  fr: { name: 'Français', dir: 'ltr', tag: 'fr', intl: 'fr-FR' },
  el: { name: 'Ελληνικά', dir: 'ltr', tag: 'el', intl: 'el-GR' },
  uk: { name: 'Українська', dir: 'ltr', tag: 'uk', intl: 'uk-UA' },
  ru: { name: 'Русский', dir: 'ltr', tag: 'ru', intl: 'ru-RU' },
  ar: { name: 'العربية', dir: 'rtl', tag: 'ar', intl: 'ar' },
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/**
 * The site is served from a subdirectory on GitHub Pages, so every absolute
 * path has to carry the base. Vite exposes it with a trailing slash; strip it
 * so the helpers below can concatenate cleanly. It is '' in a root deploy.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Prefixes a path in /public, e.g. '/media/x.mp4' → '/erebor/media/x.mp4'. */
export function asset(path: string): string {
  return `${BASE}${path}`;
}

/** Path prefix for a locale: '' for the default, '/de' and so on for the rest. */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? '' : `/${locale}`;
}

/** Builds an absolute site path for a locale, e.g. ('de', '/sagas/x') → '/de/sagas/x'. */
export function localePath(locale: Locale, path = '/'): string {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  const built = `${BASE}${localePrefix(locale)}${clean}`;

  if (built === '') return '/';
  // A bare base with no locale and no path still needs its trailing slash.
  return built === BASE ? `${BASE}/` : built;
}

/** Link to a section of a locale's home page, e.g. '/de/#sagas'. */
export function anchorPath(locale: Locale, hash: string): string {
  const home = localePath(locale, '/');
  return `${home.endsWith('/') ? home : `${home}/`}#${hash}`;
}

/** Every locale a page exists in, for hreflang alternates. */
export function alternates(path = '/'): { locale: Locale; href: string; tag: string }[] {
  return LOCALES.map((locale) => ({
    locale,
    href: localePath(locale, path),
    tag: LOCALE_META[locale].tag,
  }));
}
