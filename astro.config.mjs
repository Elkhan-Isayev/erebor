// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Deployed as a GitHub Pages project site, so the build lives under /erebor.
  // Absolute paths written by hand go through the helpers in src/i18n/config.ts,
  // which prepend import.meta.env.BASE_URL.
  site: 'https://elkhan-isayev.github.io',
  base: '/erebor',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'es', 'fr', 'el', 'uk', 'ru', 'ar'],
    routing: {
      // English is served from the root; every other locale gets a prefix.
      prefixDefaultLocale: false,
    },
  },
  image: {
    responsiveStyles: true,
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
