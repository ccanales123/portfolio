// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://cesarcanales.dev',
  output: 'static',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: true }
  }
});
