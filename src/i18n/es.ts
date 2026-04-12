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
