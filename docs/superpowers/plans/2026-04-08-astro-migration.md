# Portfolio Astro Migration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the portfolio from a single 2,848-line `index.html` to an Astro project with static site generation, component-per-section architecture, and proper EN/ES i18n routing.

**Architecture:** Single scrollable page per language at `/en/` and `/es/`. Each section is an `.astro` component. All CSS extracted to `src/styles/global.css`. All translations in typed TypeScript files. Deploy via Docker + nginx on Railway, identical to current setup.

**Tech Stack:** Astro 4.x, TypeScript, `@astrojs/sitemap`, Node 20, nginx, Docker

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `src/i18n/en.ts` | Create | All English strings, typed as const |
| `src/i18n/es.ts` | Create | All Spanish strings, same shape |
| `src/styles/global.css` | Create | Entire CSS from current `<style>` block |
| `src/layouts/BaseLayout.astro` | Create | `<head>`, meta, hreflang, JSON-LD, theme FOUC, Google Fonts |
| `src/components/Loader.astro` | Create | Splash screen HTML + hide-on-load script |
| `src/components/Nav.astro` | Create | Nav, theme toggle, mobile menu, language switcher |
| `src/components/Hero.astro` | Create | Hero section HTML + typewriter script |
| `src/components/About.astro` | Create | Companies bar + About section |
| `src/components/ValueProps.astro` | Create | "Why Teams Hire Me Back" section |
| `src/components/Experience.astro` | Create | Timeline section |
| `src/components/Skills.astro` | Create | Skill cards grid |
| `src/components/Projects.astro` | Create | Featured projects grid |
| `src/components/Impact.astro` | Create | Metric counters section |
| `src/components/Contact.astro` | Create | Contact section |
| `src/components/Footer.astro` | Create | Footer + back-to-top button |
| `src/pages/index.astro` | Create | 301 redirect to `/en/` |
| `src/pages/en/index.astro` | Create | English page — imports all components with `t` from `en.ts` |
| `src/pages/es/index.astro` | Create | Spanish page — imports all components with `t` from `es.ts` |
| `public/robots.txt` | Move | Copy from `portfolio-cesar/robots.txt` |
| `public/llms.txt` | Move | Copy from `portfolio-cesar/llms.txt` |
| `public/og-image.png` | Move | Generate from `og-image.html` or source file |
| `public/Cesar_Canales_Resume.pdf` | Move | Copy from root |
| `astro.config.mjs` | Create | Astro config with i18n + sitemap |
| `Dockerfile` | Replace | Two-stage: node build → nginx serve |
| `nginx.conf` | Keep | Already has correct cache headers |
| `package.json` | Create | Astro deps |
| `tsconfig.json` | Create | Astro recommended tsconfig |

---

## Task 1: Initialize Astro Project

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `astro.config.mjs`

- [ ] **Step 1: Run Astro scaffold (minimal template)**

```bash
cd /Users/cesar.canales/Documents
npm create astro@latest portfolio-cesar-astro -- --template minimal --no-install --typescript strict
cd portfolio-cesar-astro
```

- [ ] **Step 2: Install dependencies**

```bash
npm install
npm install @astrojs/sitemap
```

- [ ] **Step 3: Replace `astro.config.mjs` with final config**

```javascript
// astro.config.mjs
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

- [ ] **Step 4: Verify tsconfig extends Astro strict**

```json
// tsconfig.json
{
  "extends": "astro/tsconfigs/strict"
}
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```
Expected: Astro dev server running at `http://localhost:4321`

- [ ] **Step 6: Commit**

```bash
git init
git add .
git commit -m "feat: initialize Astro project with i18n and sitemap config"
```

---

## Task 2: Create i18n Translation Files

**Files:**
- Create: `src/i18n/en.ts`
- Create: `src/i18n/es.ts`

- [ ] **Step 1: Create `src/i18n/en.ts`**

```typescript
// src/i18n/en.ts
export const t = {
  meta: {
    title: 'Cesar Canales — Senior Full Stack Engineer',
    description: 'Senior Full Stack Engineer with 8+ years building high-traffic platforms for IBM, 3Pillar Global & enterprise clients. React, TypeScript, Node.js, Java, Spring Boot. Open to new opportunities.',
  },
  nav: {
    about: 'About', experience: 'Experience', projects: 'Projects',
    skills: 'Skills', impact: 'Impact', contact: 'Contact', cta: 'Hire Me',
    langSwitch: 'EN / ES', themeSwitch: 'Switch Theme',
  },
  hero: {
    tag: 'Available for hire',
    title: 'Senior Full Stack Software Engineer',
    summary: '8+ years building high-traffic platforms for <strong>IBM</strong>, <strong>3Pillar Global</strong> &amp; <strong>Softtek</strong>. From migrating 30+ legacy components to optimizing systems serving 1M+ users — I turn complexity into clean, scalable solutions.',
    cta: 'Get in Touch',
    downloadCV: 'Download CV',
  },
  companies: { label: 'Trusted by' },
  about: {
    label: 'About Me', title: 'About Me',
    p1: 'I\'m a software engineer passionate about building products that make a real difference. Based in <strong>Hidalgo, Mexico</strong>, I\'ve spent 8+ years working remotely with international teams, shipping code that serves millions.',
    p2: 'At <strong>IBM</strong>, I modernized the Home Depot platform used by over a million users. At <strong>3Pillar Global</strong>, I\'m building infrastructure that 1,000+ enterprise clients depend on daily. I bring the same intensity to every project — clean architecture, tested code, and systems that scale.',
    p3: 'I believe in TDD, code reviews, and shipping often. I\'m comfortable leading migrations, designing APIs, or jumping into a React codebase. What matters to me is building things that work — reliably and at scale.',
    location: 'Location', remote: 'Remote-first',
    languages: 'Languages', spanish: 'Spanish', english: 'English',
    native: 'Native', professional: 'Professional',
    education: 'Education', degree: 'B.S. Computer Systems Engineering',
  },
  value: {
    label: 'Why Hire Me', title: 'Why Teams Hire Me Back',
    v1t: 'High-Impact Delivery', v1d: 'I\'ve built systems serving 1M+ users and managed platforms for 1,000+ enterprise clients. I ship features that move business metrics.',
    v2t: 'True Full Stack', v2d: 'From React + TypeScript frontends to Java Spring Boot microservices, databases, and CI/CD — I own the entire stack with confidence.',
    v3t: 'Team Multiplier', v3d: 'I introduce best practices — TDD, GitHub Flow, code reviews, Conventional Commits — that elevate the entire team\'s velocity.',
    v4t: 'Legacy Modernization', v4d: 'Migrated 30+ AngularJS components to React at IBM. I know how to modernize codebases without breaking production.',
    v5t: 'Quality-First Mindset', v5d: 'TDD with Jest, integration testing, high coverage — I write code that doesn\'t break at 3am. Reliability is non-negotiable.',
    v6t: 'Remote-Ready', v6d: '8+ years working with distributed teams across time zones. Async communication, documentation, and self-management are second nature.',
  },
  exp: {
    label: 'Experience', title: 'Where I\'ve Made an Impact',
    threePillar: {
      date: 'Jun 2023 — Present', loc: 'Remote',
      role: 'Senior Full Stack Software Engineer',
      bullets: [
        'Built mission-critical data center management system used by 1,000+ enterprise clients',
        'Built reusable UI components leveraging React Hooks (useState, useEffect, useCallback, useMemo) to optimize rendering and side-effect management',
        'Architected global state management with Redux &amp; Context API for real-time monitoring dashboards',
        'Designed reusable component library and internal design system with Material UI',
        'Led backend architecture with Java 11, Spring Boot, Spring Security &amp; Azure AD OAuth2',
        'Implemented observability with Prometheus and Micrometer for real-time metrics',
        'Managed database migrations with Flyway and MySQL; optimized with EhCache &amp; Quartz Scheduler',
      ],
      tech: ['React', 'TypeScript', 'Redux', 'Material UI', 'Vite', 'Spring Boot', 'Java 11', 'Azure AD', 'MySQL'],
    },
    ibm: {
      date: 'May 2022 — Jun 2023', loc: 'Remote',
      role: 'Senior Full Stack Software Engineer',
      bullets: [
        'Optimized features for Home Depot USA platform, impacting over 1,000,000 users',
        'Migrated 30+ critical components from AngularJS to React + Redux',
        'Improved product search efficiency by 20% through GraphQL query optimization',
        'Introduced GitHub Flow, Conventional Commits, and PR workflows; led code reviews to enforce quality standards',
        'Maintained high test coverage with Jest and Testing Library for stable deployments',
      ],
      tech: ['React', 'Redux', 'GraphQL', 'Jest', 'Testing Library'],
    },
    softtek: {
      date: 'Dec 2018 — May 2022', loc: 'Monterrey, Mexico',
      role: 'Full Stack Software Engineer',
      bullets: [
        'Architected streaming system from scratch with React (Redux), Node.js (Express) &amp; MongoDB',
        'Refactored legacy PHP into RESTful APIs using Node.js, reducing technical debt',
        'Managed MongoDB databases including security, indexing &amp; data migration',
        'Configured and maintained Linux servers across dev and production environments',
      ],
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Linux'],
    },
    globalHitss: {
      date: 'Jan 2018 — Dec 2018', loc: 'Queretaro, Mexico',
      role: 'Full Stack Software Engineer',
      bullets: [
        'Developed telecom provisioning systems with Java (Spring), REST APIs, SOAP &amp; Oracle 11G',
        'Performed Oracle 11G database migrations ensuring integrity and high availability',
        'Created Shell Script automation to optimize deployment workflows',
        'Built internal interfaces with AngularJS and HTML5 for critical systems',
      ],
      tech: ['Java', 'Spring', 'Oracle 11G', 'SOAP', 'AngularJS', 'Shell'],
    },
  },
  skills: { label: 'Technical Skills', title: 'What I Work With' },
  projects: {
    label: 'Projects', title: 'Featured Work',
    p1t: 'Enterprise Monitoring Dashboard',
    p1d: 'Mission-critical data center management system with real-time monitoring, used by 1,000+ enterprise clients daily. Built with React, TypeScript, and Spring Boot microservices.',
    p2t: 'Home Depot USA Platform',
    p2d: 'Optimized and modernized the e-commerce platform serving 1M+ users. Migrated 30+ components from AngularJS to React and improved search efficiency by 20%.',
    p3t: 'Video Streaming Platform',
    p3d: 'Architected a complete streaming system from scratch — frontend, backend, and database. Replaced legacy PHP with modern Node.js RESTful APIs.',
  },
  impact: {
    label: 'Impact', title: '8 Years. 1M+ Users. Real Results.',
    years: 'Years Experience', users: 'Users Impacted',
    components: 'Components Migrated', search: 'Search Efficiency',
  },
  contact: {
    label: 'Contact', title: 'Let\'s Build Something<br>Great Together',
    subtitle: 'I\'m currently open to new opportunities. Whether you have a project, a team, or just want to connect — I\'d love to hear from you.',
  },
} as const;

export type Translations = typeof t;
```

- [ ] **Step 2: Create `src/i18n/es.ts`**

```typescript
// src/i18n/es.ts
import type { Translations } from './en';

export const t: Translations = {
  meta: {
    title: 'Cesar Canales — Ingeniero Full Stack Senior',
    description: 'Ingeniero Full Stack Senior con 8+ años construyendo plataformas de alto tráfico para IBM, 3Pillar Global y clientes enterprise. React, TypeScript, Node.js, Java, Spring Boot. Abierto a nuevas oportunidades.',
  },
  nav: {
    about: 'Sobre Mi', experience: 'Experiencia', projects: 'Proyectos',
    skills: 'Habilidades', impact: 'Impacto', contact: 'Contacto', cta: 'Contratame',
    langSwitch: 'ES / EN', themeSwitch: 'Cambiar Tema',
  },
  hero: {
    tag: 'Disponible para contratacion',
    title: 'Ingeniero Full Stack Senior',
    summary: '8+ anos construyendo plataformas de alto trafico para <strong>IBM</strong>, <strong>3Pillar Global</strong> y <strong>Softtek</strong>. Desde migrar 30+ componentes legacy hasta optimizar sistemas que sirven a 1M+ usuarios — convierto la complejidad en soluciones limpias y escalables.',
    cta: 'Contactame',
    downloadCV: 'Descargar CV',
  },
  companies: { label: 'Han confiado en mi' },
  about: {
    label: 'Sobre Mi', title: 'Sobre Mi',
    p1: 'Soy un ingeniero de software apasionado por construir productos que hacen una diferencia real. Basado en <strong>Hidalgo, Mexico</strong>, he pasado 8+ anos trabajando remotamente con equipos internacionales, entregando codigo que sirve a millones.',
    p2: 'En <strong>IBM</strong>, modernize la plataforma de Home Depot utilizada por mas de un millon de usuarios. En <strong>3Pillar Global</strong>, construyo la infraestructura de la que dependen 1,000+ clientes empresariales diariamente. Traigo la misma intensidad a cada proyecto — arquitectura limpia, codigo probado y sistemas que escalan.',
    p3: 'Creo en TDD, code reviews y entregar frecuentemente. Me siento comodo liderando migraciones, disenando APIs o entrando a un codebase de React. Lo que me importa es construir cosas que funcionan — de forma confiable y a escala.',
    location: 'Ubicacion', remote: 'Trabajo remoto',
    languages: 'Idiomas', spanish: 'Espanol', english: 'Ingles',
    native: 'Nativo', professional: 'Profesional',
    education: 'Educacion', degree: 'Ing. en Sistemas Computacionales',
  },
  value: {
    label: 'Por Que Contratarme', title: 'Por Que Los Equipos Me Recontratan',
    v1t: 'Entrega de Alto Impacto', v1d: 'He construido sistemas que sirven a 1M+ usuarios y gestionado plataformas para 1,000+ clientes empresariales. Entrego features que mueven metricas de negocio.',
    v2t: 'Full Stack Real', v2d: 'Desde frontends con React + TypeScript hasta microservicios con Java Spring Boot, bases de datos y CI/CD — domino todo el stack con confianza.',
    v3t: 'Multiplicador de Equipo', v3d: 'Introduzco mejores practicas — TDD, GitHub Flow, code reviews, Conventional Commits — que elevan la velocidad de todo el equipo.',
    v4t: 'Modernizacion Legacy', v4d: 'Migre 30+ componentes de AngularJS a React en IBM. Se como modernizar codebases sin romper produccion.',
    v5t: 'Mentalidad Quality-First', v5d: 'TDD con Jest, testing de integracion, alta cobertura — escribo codigo que no se rompe a las 3am. La confiabilidad no es negociable.',
    v6t: 'Listo para Remoto', v6d: '8+ anos trabajando con equipos distribuidos en diferentes zonas horarias. Comunicacion asincrona, documentacion y autogestion son mi segunda naturaleza.',
  },
  exp: {
    label: 'Experiencia', title: 'Donde He Generado Impacto',
    threePillar: {
      date: 'Jun 2023 — Presente', loc: 'Remoto',
      role: 'Ingeniero Full Stack Senior',
      bullets: [
        'Desarrolle y mantuve un sistema critico de gestion de centros de datos utilizado por 1,000+ clientes empresariales',
        'Construi componentes UI reutilizables aprovechando React Hooks (useState, useEffect, useCallback, useMemo) para optimizar renderizado y manejo de efectos secundarios',
        'Arquitecte la gestion de estado global con Redux y Context API para dashboards de monitoreo en tiempo real',
        'Disene e implemente una libreria de componentes reutilizables y sistema de diseno interno con Material UI',
        'Lidere la arquitectura backend con Java 11, Spring Boot, Spring Security y Azure AD OAuth2',
        'Implemente observabilidad con Prometheus y Micrometer para monitoreo de metricas en tiempo real',
        'Gestione migraciones de base de datos con Flyway y MySQL; optimice rendimiento con EhCache y Quartz Scheduler',
      ],
      tech: ['React', 'TypeScript', 'Redux', 'Material UI', 'Vite', 'Spring Boot', 'Java 11', 'Azure AD', 'MySQL'],
    },
    ibm: {
      date: 'May 2022 — Jun 2023', loc: 'Remoto',
      role: 'Ingeniero Full Stack Senior',
      bullets: [
        'Desarrolle y optimice funcionalidades para la plataforma de Home Depot USA, impactando a mas de 1,000,000 de usuarios',
        'Migre 30+ componentes criticos de AngularJS a React + Redux, modernizando el codebase',
        'Mejore la eficiencia de busqueda de productos en un 20% mediante optimizacion de queries GraphQL',
        'Introduje GitHub Flow, Conventional Commits y flujos de PR; lidere code reviews para asegurar estandares de calidad',
        'Mantuve alta cobertura de tests con Jest y Testing Library, asegurando estabilidad en despliegues frecuentes',
      ],
      tech: ['React', 'Redux', 'GraphQL', 'Jest', 'Testing Library'],
    },
    softtek: {
      date: 'Dic 2018 — May 2022', loc: 'Monterrey, Mexico',
      role: 'Ingeniero Full Stack',
      bullets: [
        'Arquitecte un sistema de streaming desde cero con React (Redux), Node.js (Express) y MongoDB',
        'Refactorice logica legacy de PHP a APIs RESTful con Node.js, reduciendo deuda tecnica',
        'Gestione bases de datos MongoDB incluyendo seguridad, indexacion y migracion de datos',
        'Configure y mantuve servidores Linux en ambientes de desarrollo y produccion',
      ],
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Linux'],
    },
    globalHitss: {
      date: 'Ene 2018 — Dic 2018', loc: 'Queretaro, Mexico',
      role: 'Ingeniero Full Stack',
      bullets: [
        'Desarrolle sistemas de telecomunicaciones para aprovisionamiento de servicios con Java (Spring), APIs REST, SOAP y Oracle 11G',
        'Realice migraciones de base de datos Oracle 11G asegurando integridad y alta disponibilidad',
        'Cree scripts de automatizacion con Shell Scripting para optimizar procesos de despliegue',
        'Construi interfaces internas con AngularJS y HTML5 para sistemas criticos',
      ],
      tech: ['Java', 'Spring', 'Oracle 11G', 'SOAP', 'AngularJS', 'Shell'],
    },
  },
  skills: { label: 'Habilidades Tecnicas', title: 'Con Que Trabajo' },
  projects: {
    label: 'Proyectos', title: 'Trabajo Destacado',
    p1t: 'Dashboard de Monitoreo Empresarial',
    p1d: 'Sistema critico de gestion de centros de datos con monitoreo en tiempo real, utilizado por 1,000+ clientes empresariales diariamente. Construido con React, TypeScript y microservicios Spring Boot.',
    p2t: 'Plataforma Home Depot USA',
    p2d: 'Optimice y modernize la plataforma de e-commerce que sirve a 1M+ usuarios. Migre 30+ componentes de AngularJS a React y mejore la eficiencia de busqueda en un 20%.',
    p3t: 'Plataforma de Streaming',
    p3d: 'Arquitecte un sistema completo de streaming desde cero — frontend, backend y base de datos. Reemplace PHP legacy con APIs RESTful modernas en Node.js.',
  },
  impact: {
    label: 'Impacto', title: '8 Anos. 1M+ Usuarios. Resultados Reales.',
    years: 'Anos de Experiencia', users: 'Usuarios Impactados',
    components: 'Componentes Migrados', search: 'Eficiencia de Busqueda',
  },
  contact: {
    label: 'Contacto', title: 'Construyamos Algo<br>Increible Juntos',
    subtitle: 'Actualmente estoy abierto a nuevas oportunidades. Ya sea que tengas un proyecto, un equipo, o solo quieras conectar — me encantaria escucharte.',
  },
};
```

- [ ] **Step 3: Verify TypeScript is happy**

```bash
npx tsc --noEmit
```
Expected: No errors (es.ts satisfies Translations type)

- [ ] **Step 4: Commit**

```bash
git add src/i18n/
git commit -m "feat: add EN and ES typed translation files"
```

---

## Task 3: Extract Global CSS

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1: Copy entire `<style>` block from the original `index.html`**

Open `/Users/cesar.canales/Documents/portfolio-cesar/index.html`. The `<style>` block starts at line 24 and ends at line 1874 (before `</style></head>`). Copy everything between `<style>` and `</style>` (not the tags themselves) into:

`src/styles/global.css`

- [ ] **Step 2: Verify the file has content**

```bash
wc -l src/styles/global.css
```
Expected: ~1850 lines

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: extract global CSS from index.html"
```

---

## Task 4: Create BaseLayout

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create `src/layouts/BaseLayout.astro`**

```astro
---
// src/layouts/BaseLayout.astro
import '../styles/global.css';
import type { Translations } from '../i18n/en';

interface Props {
  lang: 'en' | 'es';
  t: Pick<Translations, 'meta'>;
}

const { lang, t } = Astro.props;
const canonical = `https://cesarcanales.dev/${lang}/`;
const ogLocale = lang === 'en' ? 'en_US' : 'es_MX';

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://cesarcanales.dev/#person",
      "name": "Cesar Canales",
      "url": "https://cesarcanales.dev",
      "image": { "@type": "ImageObject", "url": "https://cesarcanales.dev/og-image.png", "width": 1200, "height": 630 },
      "jobTitle": "Senior Full Stack Software Engineer",
      "description": "Senior Full Stack Software Engineer with 8+ years of experience building high-traffic platforms for IBM, 3Pillar Global, and Softtek.",
      "telephone": "+52-812-942-9554",
      "address": { "@type": "PostalAddress", "addressLocality": "Hidalgo", "addressCountry": "MX" },
      "alumniOf": { "@type": "CollegeOrUniversity", "name": "Universidad Politecnica de Queretaro" },
      "knowsAbout": ["React", "TypeScript", "Node.js", "Java", "Spring Boot", "Redux", "GraphQL", "MySQL", "PostgreSQL", "MongoDB", "Docker", "Azure", "AWS", "CI/CD", "Agile", "Scrum", "TDD"],
      "sameAs": ["https://linkedin.com/in/cesar-canales-ab8b5279/", "https://github.com/ccanales123"]
    },
    {
      "@type": "WebSite",
      "@id": "https://cesarcanales.dev/#website",
      "name": "Cesar Canales — Portfolio",
      "url": "https://cesarcanales.dev",
      "author": { "@id": "https://cesarcanales.dev/#person" }
    },
    {
      "@type": "ProfilePage",
      "@id": `https://cesarcanales.dev/${lang}/#profilepage`,
      "url": canonical,
      "name": t.meta.title,
      "isPartOf": { "@id": "https://cesarcanales.dev/#website" },
      "about": { "@id": "https://cesarcanales.dev/#person" },
      "dateModified": "2026-04-08T00:00:00Z"
    }
  ]
};
---
<!DOCTYPE html>
<html lang={lang} data-theme="dark">
<head>
  <!-- Theme FOUC prevention — must be first -->
  <script is:inline>
    const theme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  </script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{t.meta.title}</title>
  <meta name="description" content={t.meta.description}>
  <link rel="canonical" href={canonical}>

  <!-- hreflang -->
  <link rel="alternate" hreflang="en" href="https://cesarcanales.dev/en/">
  <link rel="alternate" hreflang="es" href="https://cesarcanales.dev/es/">
  <link rel="alternate" hreflang="x-default" href="https://cesarcanales.dev/en/">

  <!-- Open Graph -->
  <meta property="og:type" content="profile">
  <meta property="og:title" content={t.meta.title}>
  <meta property="og:description" content={t.meta.description}>
  <meta property="og:image" content="https://cesarcanales.dev/og-image.png">
  <meta property="og:url" content={canonical}>
  <meta property="og:site_name" content="Cesar Canales">
  <meta property="og:locale" content={ogLocale}>

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content={t.meta.title}>
  <meta name="twitter:description" content={t.meta.description}>
  <meta name="twitter:image" content="https://cesarcanales.dev/og-image.png">

  <!-- Favicon -->
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230a0a0b'/%3E%3Crect x='1' y='1' width='62' height='62' rx='13' fill='none' stroke='%2300e5a0' stroke-width='1.5' opacity='0.3'/%3E%3Ctext x='32' y='42' font-family='system-ui,sans-serif' font-size='28' font-weight='700' fill='%2300e5a0' text-anchor='middle'%3ECC%3C/text%3E%3C/svg%3E">

  <!-- Google Fonts — non-blocking -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"></noscript>

  <!-- JSON-LD -->
  <script type="application/ld+json" set:html={JSON.stringify(schema)} />
</head>
<body>
  <div class="bg-aurora">
    <div class="bg-orb bg-orb--1"></div>
    <div class="bg-orb bg-orb--2"></div>
    <div class="bg-orb bg-orb--3"></div>
    <div class="bg-orb bg-orb--4"></div>
  </div>
  <div class="bg-dots"></div>
  <div class="scroll-progress" id="scrollProgress"></div>

  <slot />

  <a href="#" class="back-to-top" id="backToTop" aria-label="Back to top">
    <svg viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
  </a>

  <!-- Global scripts: theme, scroll, reveals, tilt, cursor, counters -->
  <script>
    // ═══ THEME ═══
    function getTheme() { return localStorage.getItem('portfolio-theme') || 'dark'; }
    function setTheme(t: string) {
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('portfolio-theme', t);
    }

    document.getElementById('themeToggle')?.addEventListener('click', () => setTheme(getTheme() === 'dark' ? 'light' : 'dark'));
    document.getElementById('mobileThemeToggle')?.addEventListener('click', () => setTheme(getTheme() === 'dark' ? 'light' : 'dark'));

    // ═══ SCROLL PROGRESS ═══
    window.addEventListener('scroll', () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const pct = h > 0 ? (window.scrollY / h) * 100 : 0;
      const el = document.getElementById('scrollProgress');
      if (el) el.style.width = pct + '%';
    }, { passive: true });

    // ═══ BACK TO TOP ═══
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      if (backToTop) backToTop.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });

    // ═══ REVEAL ON SCROLL ═══
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObserver.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => revealObserver.observe(el));

    const staggerObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const children = e.target.querySelectorAll(':scope > *');
          children.forEach((child, i) => setTimeout(() => child.classList.add('visible'), i * 100));
          staggerObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.stagger-children').forEach(el => staggerObserver.observe(el));

    // ═══ TILT 3D ═══
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', (e: Event) => {
        const me = e as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = (me.clientX - rect.left) / rect.width - 0.5;
        const y = (me.clientY - rect.top) / rect.height - 0.5;
        (card as HTMLElement).style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`;
        const spotlight = card.querySelector('.spotlight') as HTMLElement;
        if (spotlight) { spotlight.style.left = `${me.clientX - rect.left}px`; spotlight.style.top = `${me.clientY - rect.top}px`; }
      });
      card.addEventListener('mouseleave', () => { (card as HTMLElement).style.transform = ''; });
    });

    // ═══ IMPACT COUNTERS ═══
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target as HTMLElement;
        const target = parseInt(el.dataset.target || '0');
        const fmt = el.dataset.format;
        const suffix = el.dataset.suffix || '';
        let start = 0;
        const duration = 2000;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const val = Math.floor(progress * target);
          el.textContent = fmt === 'M' ? (val >= 1000000 ? '1M+' : (val / 1000).toFixed(0) + 'K') : val + suffix;
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = fmt === 'M' ? '1M+' : target + suffix;
        };
        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('.impact-number').forEach(el => counterObserver.observe(el));

    // ═══ CURSOR TRAIL ═══
    const trail: HTMLElement[] = [];
    for (let i = 0; i < 8; i++) {
      const dot = document.createElement('div');
      dot.className = 'trail-dot';
      document.body.appendChild(dot);
      trail.push(dot);
    }
    let mouse = { x: -100, y: -100 };
    const positions = trail.map(() => ({ x: -100, y: -100 }));
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });
    function animateTrail() {
      positions[0].x += (mouse.x - positions[0].x) * 0.3;
      positions[0].y += (mouse.y - positions[0].y) * 0.3;
      for (let i = 1; i < trail.length; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.5;
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.5;
      }
      trail.forEach((dot, i) => {
        dot.style.left = positions[i].x + 'px';
        dot.style.top = positions[i].y + 'px';
        dot.style.opacity = String(1 - i / trail.length);
        dot.style.transform = `scale(${1 - i * 0.1})`;
      });
      requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // ═══ NAV ACTIVE SECTION ═══
    const navLinks = document.querySelectorAll('[data-section]');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const id = e.target.id;
          navLinks.forEach(l => { if ((l as HTMLElement).dataset.section === id) l.classList.add('active'); });
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

    // ═══ NAV SCROLL SHADOW ═══
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => { nav?.classList.toggle('scrolled', window.scrollY > 50); }, { passive: true });
  </script>
</body>
</html>
```

- [ ] **Step 2: Verify Astro parses the file without errors**

```bash
npm run dev
```
Expected: Dev server starts, no Astro compilation errors in terminal.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/
git commit -m "feat: add BaseLayout with SEO, hreflang, JSON-LD, theme FOUC fix"
```

---

## Task 5: Create Loader and Nav Components

**Files:**
- Create: `src/components/Loader.astro`
- Create: `src/components/Nav.astro`

- [ ] **Step 1: Create `src/components/Loader.astro`**

```astro
---
// src/components/Loader.astro
---
<div class="loader" id="loader">
  <span class="loader-text">cesar.canales</span>
  <div class="loader-bar"><span></span></div>
</div>

<script>
  window.addEventListener('load', () => {
    document.getElementById('loader')?.classList.add('done');
  });
</script>
```

- [ ] **Step 2: Create `src/components/Nav.astro`**

```astro
---
// src/components/Nav.astro
import type { Translations } from '../i18n/en';

interface Props { t: Translations; lang: 'en' | 'es'; }
const { t, lang } = Astro.props;
const altLang = lang === 'en' ? 'es' : 'en';
const altHref = `/${altLang}/`;
---
<nav>
  <a href={`/${lang}/`} class="nav-logo">CC</a>
  <ul class="nav-links">
    <li><a href="#about" data-section="about">{t.nav.about}</a></li>
    <li><a href="#experience" data-section="experience">{t.nav.experience}</a></li>
    <li><a href="#projects" data-section="projects">{t.nav.projects}</a></li>
    <li><a href="#skills" data-section="skills">{t.nav.skills}</a></li>
    <li><a href="#impact" data-section="impact">{t.nav.impact}</a></li>
  </ul>
  <div class="nav-actions">
    <button class="icon-btn" id="themeToggle" aria-label={t.nav.themeSwitch}>
      <svg class="icon-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
      <svg class="icon-moon" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
    </button>
    <a href={altHref} class="lang-btn desktop-only" id="langToggle">{altLang.toUpperCase()}</a>
    <a href="#contact" class="nav-cta">{t.nav.cta}</a>
    <button class="mobile-menu-btn" id="mobileMenuBtn" aria-label="Menu">
      <svg viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
    </button>
  </div>
</nav>

<div class="mobile-menu" id="mobileMenu">
  <a href="#about">{t.nav.about}</a>
  <a href="#experience">{t.nav.experience}</a>
  <a href="#projects">{t.nav.projects}</a>
  <a href="#skills">{t.nav.skills}</a>
  <a href="#impact">{t.nav.impact}</a>
  <a href="#contact">{t.nav.contact}</a>
  <div class="mobile-menu-actions">
    <button id="mobileThemeToggle">{t.nav.themeSwitch}</button>
    <a href={altHref} id="mobileLangToggle">{t.nav.langSwitch}</a>
  </div>
</div>

<script>
  const btn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');
  btn?.addEventListener('click', () => menu?.classList.toggle('open'));
  menu?.querySelectorAll('a[href^="#"]').forEach(a =>
    a.addEventListener('click', () => menu.classList.remove('open'))
  );
</script>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/Loader.astro src/components/Nav.astro
git commit -m "feat: add Loader and Nav components"
```

---

## Task 6: Create Hero Component

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1: Create `src/components/Hero.astro`**

```astro
---
// src/components/Hero.astro
import type { Translations } from '../i18n/en';

interface Props { t: Translations; }
const { t } = Astro.props;
---
<section class="hero" id="hero">
  <div class="hero-grid-bg"></div>
  <div class="hero-glow"></div>
  <div class="hero-glow-2"></div>
  <div class="hero-left">
    <div class="hero-tag">
      <span class="status-dot"></span>
      <span>{t.hero.tag}</span>
    </div>
    <div class="hero-identity">
      <div class="avatar-ring avatar-pulse">
        <div class="avatar-inner">CC</div>
      </div>
      <h1 class="hero-name">
        Cesar
        <span class="hero-name-gradient">Canales</span>
      </h1>
    </div>
    <p class="hero-title">{t.hero.title}</p>
    <p class="hero-summary" set:html={t.hero.summary}></p>
    <div class="hero-actions">
      <a href="mailto:cesar.canales123@gmail.com" class="btn btn-primary">
        <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
        <span>{t.hero.cta}</span>
      </a>
      <a href="/Cesar_Canales_Resume.pdf" download class="btn btn-outline">
        <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
        <span>{t.hero.downloadCV}</span>
      </a>
    </div>
  </div>
  <div class="hero-right">
    <div class="terminal glow-border">
      <div class="terminal-header">
        <div class="terminal-dot"></div>
        <div class="terminal-dot"></div>
        <div class="terminal-dot"></div>
        <span class="terminal-title">cesar@dev ~ /about</span>
      </div>
      <div class="terminal-body" id="terminalBody"></div>
    </div>
  </div>
</section>

<script>
  // ═══ TYPEWRITER ═══
  const lines = [
    { text: '$ whoami', delay: 0 },
    { text: 'cesar_canales', delay: 400, class: 'accent' },
    { text: '$ cat skills.txt', delay: 900 },
    { text: 'React · TypeScript · Node.js · Java · Spring Boot', delay: 1300, class: 'dim' },
    { text: '$ git log --oneline -3', delay: 1900 },
    { text: 'a1b2c3d feat: 1M+ users on Home Depot platform', delay: 2300, class: 'dim' },
    { text: 'e4f5g6h feat: enterprise dashboard 1k+ clients', delay: 2500, class: 'dim' },
    { text: 'h7i8j9k feat: streaming platform from scratch', delay: 2700, class: 'dim' },
    { text: '$ echo $STATUS', delay: 3200 },
    { text: 'Available for hire ✓', delay: 3600, class: 'success' },
  ];

  const body = document.getElementById('terminalBody');
  if (body) {
    lines.forEach(({ text, delay, class: cls }) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = `t-line${cls ? ' t-' + cls : ''}`;
        body.appendChild(line);
        let i = 0;
        const cursor = document.createElement('span');
        cursor.className = 't-cursor';
        cursor.textContent = '|';
        line.appendChild(cursor);
        function type() {
          if (i < text.length) {
            line.insertBefore(document.createTextNode(text[i++]), cursor);
            setTimeout(type, 35 + Math.random() * 40);
          } else {
            cursor.remove();
          }
        }
        type();
      }, delay);
    });
  }
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: add Hero component with typewriter animation"
```

---

## Task 7: Create About, ValueProps, and Experience Components

**Files:**
- Create: `src/components/About.astro`
- Create: `src/components/ValueProps.astro`
- Create: `src/components/Experience.astro`

- [ ] **Step 1: Create `src/components/About.astro`**

```astro
---
// src/components/About.astro
import type { Translations } from '../i18n/en';

interface Props { t: Translations; }
const { t } = Astro.props;
---
<!-- Trusted By -->
<div class="companies-section">
  <div class="companies-inner">
    <span class="companies-label">{t.companies.label}</span>
    <span class="company-logo">3Pillar Global</span>
    <span class="company-logo">IBM</span>
    <span class="company-logo">Softtek</span>
    <span class="company-logo">Global Hitss</span>
  </div>
</div>

<!-- About -->
<section id="about">
  <div class="reveal">
    <div class="section-label">{t.about.label}</div>
    <h2 class="section-title">{t.about.title}</h2>
  </div>
  <div class="about-grid">
    <div class="about-text reveal-left">
      <p set:html={t.about.p1}></p>
      <p set:html={t.about.p2}></p>
      <p>{t.about.p3}</p>
    </div>
    <div class="about-cards reveal-right">
      <div class="about-card">
        <div class="about-card-label">{t.about.location}</div>
        <div class="about-card-value">Hidalgo, Mexico</div>
        <div class="about-card-sub">{t.about.remote}</div>
      </div>
      <div class="about-card">
        <div class="about-card-label">{t.about.languages}</div>
        <div class="lang-row"><span>{t.about.spanish}</span><span class="lang-badge">{t.about.native}</span></div>
        <div class="lang-row"><span>{t.about.english}</span><span class="lang-badge">{t.about.professional}</span></div>
      </div>
      <div class="about-card">
        <div class="about-card-label">{t.about.education}</div>
        <div class="about-card-value">{t.about.degree}</div>
        <div class="about-card-sub">Univ. Politecnica de Queretaro</div>
      </div>
    </div>
  </div>
</section>
<div class="section-divider"></div>
```

- [ ] **Step 2: Create `src/components/ValueProps.astro`**

```astro
---
// src/components/ValueProps.astro
import type { Translations } from '../i18n/en';

interface Props { t: Translations; }
const { t } = Astro.props;

const values = [
  { icon: '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>', t: t.value.v1t, d: t.value.v1d },
  { icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>', t: t.value.v2t, d: t.value.v2d },
  { icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>', t: t.value.v3t, d: t.value.v3d },
  { icon: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>', t: t.value.v4t, d: t.value.v4d },
] as const;
---
<section class="section-alt" id="value">
  <div class="reveal">
    <div class="section-label">{t.value.label}</div>
    <h2 class="section-title">{t.value.title}</h2>
  </div>
  <div class="value-grid stagger-children">
    {values.map(v => (
      <div class="value-card reveal tilt-card card-spotlight">
        <div class="spotlight"></div>
        <div class="value-icon"><svg viewBox="0 0 24 24" set:html={v.icon} /></div>
        <h3 class="value-title">{v.t}</h3>
        <p class="value-desc">{v.d}</p>
      </div>
    ))}
  </div>
</section>
<div class="section-divider"></div>
```

- [ ] **Step 3: Create `src/components/Experience.astro`**

```astro
---
// src/components/Experience.astro
import type { Translations } from '../i18n/en';

interface Props { t: Translations; }
const { t } = Astro.props;

const jobs = [
  { company: '3Pillar Global', ...t.exp.threePillar },
  { company: 'IBM', ...t.exp.ibm },
  { company: 'Softtek', ...t.exp.softtek },
  { company: 'Global Hitss', ...t.exp.globalHitss },
] as const;
---
<section id="experience">
  <div class="reveal">
    <div class="section-label">{t.exp.label}</div>
    <h2 class="section-title">{t.exp.title}</h2>
  </div>
  <div class="timeline">
    {jobs.map(job => (
      <div class="timeline-item reveal">
        <div class="timeline-date">{job.date}</div>
        <div class="timeline-header">
          <h3 class="timeline-company hover-line">{job.company}</h3>
          <span class="timeline-location">{job.loc}</span>
        </div>
        <p class="timeline-role">{job.role}</p>
        <ul class="timeline-highlights">
          {job.bullets.map(b => <li set:html={b} />)}
        </ul>
        <div class="timeline-tech">
          {job.tech.map(s => <span>{s}</span>)}
        </div>
      </div>
    ))}
  </div>
</section>
<div class="section-divider"></div>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/About.astro src/components/ValueProps.astro src/components/Experience.astro
git commit -m "feat: add About, ValueProps, and Experience components"
```

---

## Task 8: Create Skills, Projects, Impact, Contact, and Footer Components

**Files:**
- Create: `src/components/Skills.astro`
- Create: `src/components/Projects.astro`
- Create: `src/components/Impact.astro`
- Create: `src/components/Contact.astro`
- Create: `src/components/Footer.astro`

- [ ] **Step 1: Create `src/components/Skills.astro`**

Copy the entire `<!-- Skills -->` section HTML from lines 2237–2350 of the original `index.html` into an Astro component. Replace `data-i18n="skills.label"` text content with `{t.skills.label}` and `data-i18n="skills.title"` with `{t.skills.title}`. Remove all `data-i18n` attributes. Keep all skill icons, categories, and items exactly as-is.

```astro
---
// src/components/Skills.astro
import type { Translations } from '../i18n/en';
interface Props { t: Translations; }
const { t } = Astro.props;
---
<section class="section-alt" id="skills">
  <div class="reveal">
    <div class="section-label">{t.skills.label}</div>
    <h2 class="section-title">{t.skills.title}</h2>
  </div>
  <!-- Paste the .skills-grid div from original index.html lines 2252–2348 exactly as-is -->
  <!-- (All SVG icons, skill-item spans, skill-card divs remain unchanged) -->
</section>
<div class="section-divider"></div>
```

**Note:** The skills content (SVG icons, category names, tech names) is static — it does not need i18n. Paste it verbatim from the original HTML.

- [ ] **Step 2: Create `src/components/Projects.astro`**

```astro
---
// src/components/Projects.astro
import type { Translations } from '../i18n/en';
interface Props { t: Translations; }
const { t } = Astro.props;
---
<section id="projects">
  <div class="reveal">
    <div class="section-label">{t.projects.label}</div>
    <h2 class="section-title">{t.projects.title}</h2>
  </div>
  <div class="projects-grid stagger-children">
    <div class="project-card reveal">
      <div class="project-preview">
        <div class="project-preview-icon">
          <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
          <span>Data Center Platform</span>
        </div>
      </div>
      <div class="project-body">
        <div class="project-label">3Pillar Global</div>
        <h3 class="project-name">{t.projects.p1t}</h3>
        <p class="project-desc">{t.projects.p1d}</p>
        <div class="project-tech">
          <span>React</span><span>TypeScript</span><span>Redux</span><span>Spring Boot</span><span>MySQL</span><span>Prometheus</span>
        </div>
        <div class="project-links">
          <a href="#experience">
            <svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            View details
          </a>
        </div>
      </div>
    </div>
    <div class="project-card reveal">
      <div class="project-preview">
        <div class="project-preview-icon">
          <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span>E-Commerce Platform</span>
        </div>
      </div>
      <div class="project-body">
        <div class="project-label">IBM / Home Depot</div>
        <h3 class="project-name">{t.projects.p2t}</h3>
        <p class="project-desc">{t.projects.p2d}</p>
        <div class="project-tech">
          <span>React</span><span>Redux</span><span>GraphQL</span><span>Jest</span>
        </div>
        <div class="project-links">
          <a href="#experience">
            <svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            View details
          </a>
        </div>
      </div>
    </div>
    <div class="project-card reveal">
      <div class="project-preview">
        <div class="project-preview-icon">
          <svg viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>
          <span>Streaming System</span>
        </div>
      </div>
      <div class="project-body">
        <div class="project-label">Softtek</div>
        <h3 class="project-name">{t.projects.p3t}</h3>
        <p class="project-desc">{t.projects.p3d}</p>
        <div class="project-tech">
          <span>React</span><span>Node.js</span><span>Express</span><span>MongoDB</span><span>Redux</span>
        </div>
        <div class="project-links">
          <a href="https://github.com/ccanales123" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
<div class="section-divider"></div>
```

- [ ] **Step 3: Create `src/components/Impact.astro`**

```astro
---
// src/components/Impact.astro
import type { Translations } from '../i18n/en';
interface Props { t: Translations; }
const { t } = Astro.props;
---
<section id="impact">
  <div class="reveal">
    <div class="section-label">{t.impact.label}</div>
    <h2 class="section-title">{t.impact.title}</h2>
  </div>
  <div class="impact-grid">
    <div class="impact-card reveal">
      <div class="impact-number" data-target="8">0</div>
      <div class="impact-label">{t.impact.years}</div>
    </div>
    <div class="impact-card reveal">
      <div class="impact-number" data-target="1000000" data-format="M">0</div>
      <div class="impact-label">{t.impact.users}</div>
    </div>
    <div class="impact-card reveal">
      <div class="impact-number" data-target="30" data-suffix="+">0</div>
      <div class="impact-label">{t.impact.components}</div>
    </div>
    <div class="impact-card reveal">
      <div class="impact-number" data-target="20" data-suffix="%">0</div>
      <div class="impact-label">{t.impact.search}</div>
    </div>
  </div>
</section>
<div class="section-divider"></div>
```

- [ ] **Step 4: Create `src/components/Contact.astro`**

```astro
---
// src/components/Contact.astro
import type { Translations } from '../i18n/en';
interface Props { t: Translations; }
const { t } = Astro.props;
---
<section class="contact-section" id="contact">
  <div class="reveal">
    <div class="section-label">{t.contact.label}</div>
    <h2 class="section-title" set:html={t.contact.title}></h2>
  </div>
  <p class="contact-subtitle reveal">{t.contact.subtitle}</p>
  <div class="contact-buttons reveal">
    <a href="mailto:cesar.canales123@gmail.com" class="btn btn-primary">
      <svg viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
      cesar.canales123@gmail.com
    </a>
    <a href="tel:+528129429554" class="btn btn-outline">
      <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
      +52 812 942 9554
    </a>
  </div>
  <div class="contact-socials reveal">
    <a href="https://linkedin.com/in/cesar-canales-ab8b5279/" target="_blank" rel="noopener" class="social-btn" aria-label="LinkedIn">
      <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
    </a>
    <a href="https://github.com/ccanales123" target="_blank" rel="noopener" class="social-btn" aria-label="GitHub">
      <svg viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
    </a>
  </div>
</section>
```

- [ ] **Step 5: Create `src/components/Footer.astro`**

```astro
---
// src/components/Footer.astro
---
<div class="footer-wrap">
  <footer>
    <span>&copy; 2026 Cesar Canales &middot; Built with Astro</span>
    <div class="footer-links">
      <a href="https://linkedin.com/in/cesar-canales-ab8b5279/" target="_blank">LinkedIn</a>
      <a href="https://github.com/ccanales123" target="_blank">GitHub</a>
      <a href="mailto:cesar.canales123@gmail.com">Email</a>
    </div>
  </footer>
</div>
```

- [ ] **Step 6: Commit**

```bash
git add src/components/
git commit -m "feat: add Skills, Projects, Impact, Contact, and Footer components"
```

---

## Task 9: Create Pages

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/en/index.astro`
- Create: `src/pages/es/index.astro`

- [ ] **Step 1: Create redirect page `src/pages/index.astro`**

```astro
---
// src/pages/index.astro
return Astro.redirect('/en/', 301);
---
```

- [ ] **Step 2: Create `src/pages/en/index.astro`**

```astro
---
// src/pages/en/index.astro
import { t } from '../../i18n/en';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Loader from '../../components/Loader.astro';
import Nav from '../../components/Nav.astro';
import Hero from '../../components/Hero.astro';
import About from '../../components/About.astro';
import ValueProps from '../../components/ValueProps.astro';
import Experience from '../../components/Experience.astro';
import Skills from '../../components/Skills.astro';
import Projects from '../../components/Projects.astro';
import Impact from '../../components/Impact.astro';
import Contact from '../../components/Contact.astro';
import Footer from '../../components/Footer.astro';
---
<BaseLayout lang="en" t={t}>
  <Loader />
  <Nav t={t} lang="en" />
  <main>
    <Hero t={t} />
    <About t={t} />
    <ValueProps t={t} />
    <Experience t={t} />
    <Skills t={t} />
    <Projects t={t} />
    <Impact t={t} />
    <Contact t={t} />
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 3: Create `src/pages/es/index.astro`**

```astro
---
// src/pages/es/index.astro
import { t } from '../../i18n/es';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Loader from '../../components/Loader.astro';
import Nav from '../../components/Nav.astro';
import Hero from '../../components/Hero.astro';
import About from '../../components/About.astro';
import ValueProps from '../../components/ValueProps.astro';
import Experience from '../../components/Experience.astro';
import Skills from '../../components/Skills.astro';
import Projects from '../../components/Projects.astro';
import Impact from '../../components/Impact.astro';
import Contact from '../../components/Contact.astro';
import Footer from '../../components/Footer.astro';
---
<BaseLayout lang="es" t={t}>
  <Loader />
  <Nav t={t} lang="es" />
  <main>
    <Hero t={t} />
    <About t={t} />
    <ValueProps t={t} />
    <Experience t={t} />
    <Skills t={t} />
    <Projects t={t} />
    <Impact t={t} />
    <Contact t={t} />
  </main>
  <Footer />
</BaseLayout>
```

- [ ] **Step 4: Verify dev server renders both routes**

```bash
npm run dev
```

Open http://localhost:4321 — should redirect to http://localhost:4321/en/
Open http://localhost:4321/es/ — should render Spanish version

Check both in browser: page should look identical to the original site.

- [ ] **Step 5: Commit**

```bash
git add src/pages/
git commit -m "feat: add EN, ES, and redirect pages"
```

---

## Task 10: Add Public Files and Update Docker

**Files:**
- Create: `public/robots.txt`
- Create: `public/llms.txt`
- Create: `public/og-image.png` (copy)
- Create: `public/Cesar_Canales_Resume.pdf` (copy)
- Replace: `Dockerfile`

- [ ] **Step 1: Copy static files to `public/`**

```bash
cp /Users/cesar.canales/Documents/portfolio-cesar/robots.txt public/robots.txt
cp /Users/cesar.canales/Documents/portfolio-cesar/llms.txt public/llms.txt
cp /Users/cesar.canales/Documents/portfolio-cesar/Cesar_Canales_Resume.pdf public/Cesar_Canales_Resume.pdf
```

For `og-image.png`: if there is a PNG file in the old project, copy it. If it only has `og-image.html`, open that file in a browser and screenshot it to a 1200×630 PNG, then save to `public/og-image.png`.

- [ ] **Step 2: Replace `Dockerfile`**

```dockerfile
# Dockerfile
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

- [ ] **Step 3: Verify build produces static output**

```bash
npm run build
ls dist/
```

Expected output: `dist/en/index.html`, `dist/es/index.html`, `dist/sitemap-index.xml`, `dist/sitemap-0.xml`, `dist/robots.txt`, `dist/llms.txt`

- [ ] **Step 4: Check HTML source has static content**

```bash
grep -c "<li>" dist/en/index.html
```
Expected: 19 (all experience bullets are in the HTML, not JS)

```bash
grep "hreflang" dist/en/index.html
```
Expected: 3 lines with hreflang (en, es, x-default)

- [ ] **Step 5: Verify Docker build**

```bash
docker build -t portfolio-astro .
docker run -p 8080:8080 portfolio-astro
```

Open http://localhost:8080 — should redirect to http://localhost:8080/en/ and render the full portfolio.

- [ ] **Step 6: Commit**

```bash
git add public/ Dockerfile
git commit -m "feat: add public assets and update Dockerfile for Astro build"
```

---

## Task 11: Final Verification

- [ ] **Step 1: Check `/en/` HTML has all content as static text**

```bash
npm run build
grep "3Pillar Global" dist/en/index.html | wc -l
```
Expected: 3+ matches (company name visible in HTML without JS)

```bash
grep "Home Depot" dist/en/index.html | wc -l
```
Expected: 2+ matches

- [ ] **Step 2: Verify robots.txt and sitemap served correctly**

```bash
docker run -p 8080:8080 portfolio-astro &
sleep 2
curl -s http://localhost:8080/robots.txt | head -3
```
Expected: `User-agent: *` (the actual robots.txt, not HTML)

```bash
curl -s http://localhost:8080/sitemap-index.xml | head -5
```
Expected: XML sitemap content

- [ ] **Step 3: Verify hreflang in both routes**

```bash
curl -s http://localhost:8080/en/ | grep hreflang
```
Expected:
```
<link rel="alternate" hreflang="en" href="https://cesarcanales.dev/en/">
<link rel="alternate" hreflang="es" href="https://cesarcanales.dev/es/">
<link rel="alternate" hreflang="x-default" href="https://cesarcanales.dev/en/">
```

- [ ] **Step 4: Verify canonical per route**

```bash
curl -s http://localhost:8080/en/ | grep canonical
curl -s http://localhost:8080/es/ | grep canonical
```
Expected:
```
<link rel="canonical" href="https://cesarcanales.dev/en/">
<link rel="canonical" href="https://cesarcanales.dev/es/">
```

- [ ] **Step 5: Verify TypeScript has no errors**

```bash
npx tsc --noEmit
```
Expected: No output (zero errors)

- [ ] **Step 6: Final commit**

```bash
git add .
git commit -m "feat: complete Astro migration — static HTML, i18n routing, SEO"
```

---

## Success Criteria Checklist

- [ ] `npm run build` completes with zero errors
- [ ] `/en/` and `/es/` render identical visual design to original site
- [ ] `view-source` on `/en/` shows Experience bullets, About text, and all section headings as plain HTML (no JS required)
- [ ] `hreflang` tags present on both routes
- [ ] `canonical` matches the route URL
- [ ] `robots.txt`, `sitemap.xml`, `llms.txt` serve correct content (not homepage HTML)
- [ ] Theme toggle (dark/light) works and persists across `/en/` → `/es/` navigation
- [ ] All animations work (typewriter, reveals, tilt, counters, cursor trail)
- [ ] Docker build produces a working nginx container
- [ ] TypeScript: zero type errors
