# Portfolio Astro Migration — Design Spec
**Date:** 2026-04-08  
**Status:** Approved  

---

## Overview

Migrate the existing single-file portfolio (`index.html`, 2,848 lines) to an Astro project with component-per-section architecture, static site generation, and proper i18n routing for EN/ES.

**Goals:**
- All content rendered as static HTML (solves JS-crawlability SEO issue)
- Proper `/en/` and `/es/` routes with `hreflang` tags
- Maintainable codebase (one component per section)
- Identical visual design and UX
- Same deploy target: Railway + Docker

**Non-goals:**
- Redesigning the UI
- Adding new sections
- Migrating to Tailwind CSS
- Adding a blog or Content Collections

---

## Architecture

### Single-page, component-per-section

The site remains a single scrollable page per language. Navigation uses anchor links (`#about`, `#experience`, etc.). The EN/ES toggle navigates between `/en/` and `/es/` URLs instead of manipulating the DOM.

### File Structure

```
portfolio-cesar/
├── public/
│   ├── robots.txt
│   ├── llms.txt
│   ├── og-image.png
│   └── Cesar_Canales_Resume.pdf
├── src/
│   ├── i18n/
│   │   ├── en.ts          ← all English strings, typed as const
│   │   └── es.ts          ← all Spanish strings, same shape
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   ├── Nav.astro
│   │   ├── Loader.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── ValueProps.astro
│   │   ├── Experience.astro
│   │   ├── Skills.astro
│   │   ├── Projects.astro
│   │   ├── Impact.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── pages/
│   │   ├── index.astro    ← 301 redirect to /en/
│   │   ├── en/
│   │   │   └── index.astro
│   │   └── es/
│   │       └── index.astro
│   └── styles/
│       └── global.css     ← CSS variables, reset, keyframe animations
├── astro.config.mjs
├── Dockerfile
├── nginx.conf
└── package.json
```

---

## i18n System

### Translation files

```typescript
// src/i18n/en.ts
export const t = {
  nav: { about: "About", experience: "Experience", projects: "Projects",
         skills: "Skills", impact: "Impact", contact: "Contact", cta: "Hire Me" },
  hero: { tag: "Available for hire", name: "Cesar Canales",
          title: "Senior Full Stack Software Engineer", ... },
  // one key per section
} as const;

export type Translations = typeof t;
```

`es.ts` exports an object with the same shape, all strings in Spanish.

### Data flow

Pages pass translations to components as props:

```astro
---
// src/pages/en/index.astro
import { t } from '../../i18n/en';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Hero from '../../components/Hero.astro';
// ... all other components
---
<BaseLayout lang="en" title={t.meta.title} description={t.meta.description}>
  <Hero t={t} lang="en" />
  ...
</BaseLayout>
```

Every component receives `t: Translations` and `lang: string` as typed props. No global state, no context — pure props.

### Language toggle

The Nav component receives `lang` as a prop and renders a link to the alternate route:

```astro
const altHref = lang === 'en' ? '/es/' : '/en/';
// <a href={altHref}>ES / EN</a>
```

No DOM manipulation. Full page navigation between static routes. The `localStorage.getItem('portfolio-lang')` from the current implementation is removed — the URL is the source of truth for language.

### Theme persistence (dark/light) — FOUC prevention

Since navigating between `/en/` and `/es/` is a full page load, the theme must be applied before first paint. BaseLayout includes an inline `<script>` as the first child of `<head>` (before any stylesheet):

```html
<script is:inline>
  const theme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
</script>
```

This runs synchronously before CSS is parsed, preventing flash of wrong theme.

---

## BaseLayout

Handles all `<head>` content, computed from `lang` prop:

- `<html lang={lang}>`
- `<title>` and `<meta name="description">` — from translation props
- `<link rel="canonical" href="https://cesarcanales.dev/{lang}/">`
- `<link rel="alternate" hreflang="en" href="https://cesarcanales.dev/en/">`
- `<link rel="alternate" hreflang="es" href="https://cesarcanales.dev/es/">`
- `<link rel="alternate" hreflang="x-default" href="https://cesarcanales.dev/en/">`
- Open Graph tags: `og:url`, `og:locale` derived from `lang`
- `og:image` pointing to `https://cesarcanales.dev/og-image.png`
- JSON-LD: `Person` + `WebSite` + `ProfilePage` schema (same as already added to index.html)
- Google Fonts: loaded asynchronously with `preload` pattern (non-render-blocking)

---

## CSS Strategy

### global.css
Contains everything that is shared across components:
- CSS custom properties (`:root` and `[data-theme]` blocks)
- Reset (`*, *::before, *::after`)
- Base `body`, `html`, `::selection` styles
- All `@keyframes` animations (orbFloat, fadeUp, marquee, loaderFill, etc.)
- Scroll progress, back-to-top, and other fixed-position utility styles

### Component `<style>` blocks
Each `.astro` component carries its own scoped CSS for its specific elements. Astro scopes these automatically, preventing leakage between components.

---

## JavaScript / Animations

All current animations are preserved. Each JS block moves into the `<script>` tag of the component that owns it:

| Animation | Component |
|-----------|-----------|
| Loader show/hide | `Loader.astro` |
| Scroll progress bar | `Nav.astro` |
| IntersectionObserver reveals | `global.css` + inline script in `BaseLayout` |
| Marquee (auto-scroll) | `Skills.astro` or `About.astro` |
| Tilt 3D cards | `Projects.astro` |
| Cursor trail | `BaseLayout.astro` (global) |
| Parallax orbs | `Hero.astro` |
| Typewriter effect | `Hero.astro` |
| Theme toggle (dark/light) | `Nav.astro` |
| Back to top button | `Footer.astro` |
| Mobile menu | `Nav.astro` |

Astro deduplicates `<script>` tags automatically. The 400ms artificial delay on the loader is removed (already fixed).

---

## Deploy

### Build

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
```

`npm run build` runs `astro build`, outputting static files to `/dist`.

### astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cesarcanales.dev',
  output: 'static',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: true }
  }
});
```

`@astrojs/sitemap` generates `/sitemap.xml` at build time, including `/en/` and `/es/` — no manual sitemap maintenance needed. `public/sitemap.xml` is removed (replaced by the generated one).

### nginx.conf

Same as current: cache headers for HTML (1h), assets (1y), explicit MIME types for `robots.txt`, `sitemap.xml`, `llms.txt`.

---

## What Does NOT Change

- Visual design — pixel-identical to current site
- All section content and copy
- All animations and interactions
- robots.txt and llms.txt content
- Railway deploy pipeline (same Dockerfile pattern)
- JSON-LD schema (already written, moves to BaseLayout)

---

## Success Criteria

1. `astro build` completes with no errors
2. `/en/` renders the English version, `/es/` renders Spanish — all content visible in HTML source (no JS required to see text)
3. `view-source:https://cesarcanales.dev/en/` shows `<h1>`, section headings, experience bullets in plain HTML
4. `hreflang` tags present and correct on both routes
5. `canonical` matches the current page URL
6. `robots.txt`, `sitemap.xml`, `llms.txt` served correctly (not returning homepage HTML)
7. All animations work identically to current site
8. Docker build succeeds, Railway deploy works
