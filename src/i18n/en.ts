// src/i18n/en.ts

export interface Translations {
  meta: { title: string; description: string };
  nav: {
    about: string; experience: string; projects: string;
    skills: string; impact: string; contact: string; cta: string;
    langSwitch: string; themeSwitch: string;
  };
  hero: { tag: string; title: string; summary: string; cta: string; downloadCV: string };
  companies: { label: string };
  about: {
    label: string; title: string;
    p1: string; p2: string; p3: string;
    location: string; remote: string;
    languages: string; spanish: string; english: string;
    native: string; professional: string;
    education: string; degree: string;
  };
  value: {
    label: string; title: string;
    v1t: string; v1d: string;
    v2t: string; v2d: string;
    v3t: string; v3d: string;
    v4t: string; v4d: string;
    v5t: string; v5d: string;
    v6t: string; v6d: string;
  };
  exp: {
    label: string; title: string;
    threePillar: { date: string; loc: string; role: string; bullets: string[]; tech: string[] };
    ibm: { date: string; loc: string; role: string; bullets: string[]; tech: string[] };
    softtek: { date: string; loc: string; role: string; bullets: string[]; tech: string[] };
    globalHitss: { date: string; loc: string; role: string; bullets: string[]; tech: string[] };
  };
  skills: { label: string; title: string };
  projects: {
    label: string; title: string;
    p1t: string; p1d: string;
    p2t: string; p2d: string;
    p3t: string; p3d: string;
  };
  impact: { label: string; title: string; years: string; users: string; components: string; search: string };
  contact: { label: string; title: string; subtitle: string };
}

export const t: Translations = {
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
};
