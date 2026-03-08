export type Lang = 'en' | 'es'

export const translations = {
  en: {
    // Nav
    navExperience: 'Experience',
    navStack: 'Stack',
    navContact: 'Contact',
    lightMode: 'Light mode',
    darkMode: 'Dark mode',
    availableForProjects: 'Available for projects',

    // Hero
    heroSubtitle: 'Systems Engineer - Frontend Developer',
    heroLine1: 'I build',
    heroLine2: 'digital',
    heroLine3: 'solutions',
    heroStats: '+8 clients · full-time employed · open to projects',
    awsBadgeTitle: 'AWS Cloud Practitioner',
    awsBadgeSubtitle: 'Amazon Web Services — Certified',
    yearsExp: 'YEARS EXP.',
    projects: 'PROJECTS',
    companies: 'COMPANIES',
    openToWork: 'AVAILABLE',

    // Experience
    expSectionLabel: 'Experience',
    expSubtitle1: '2+ years building digital products.',
    expSubtitle2: 'Currently employed — available for collaborations.',
    openToFreelance: 'OPEN TO FREELANCE PROJECTS',
    fullTimeNote: 'Full-time employed — available for select projects in parallel.',
    hideProjects: 'Hide',
    showProjects: 'View',
    projectsWord: 'projects',

    // Experience data
    exp1Company: 'Pragma SA.',
    exp1Role: 'Middle Senior Frontend Developer',
    exp1Period: '2024 — Present',
    exp1Duration: '+2 years',
    exp1Desc:
      'Leading frontend architecture and working with 5 different clients on high-impact projects. Responsible for defining code standards, code reviews, and team mentoring.',
    exp2Company: 'Siempre.NET',
    exp2Role: 'Frontend Developer',
    exp2Period: 'Jul. 2022 — Sep. 2022',
    exp2Duration: '3 months',
    exp2Desc:
      'Responsible for developing and maintaining interfaces, creating reusable components and responsive design to deliver an intuitive, modern, and visually appealing user experience.',

    // Projects
    proj1Name: 'Fintech Dashboard',
    proj1Desc:
      'Real-time financial panel with complex data visualization, interactive reports, and portfolio management.',
    proj2Name: 'E-Commerce Platform',
    proj2Desc:
      'Sales platform with dynamic catalog, shopping cart, payment gateway, and admin panel.',
    proj3Name: 'SaaS Admin Panel',
    proj3Desc:
      'Multi-tenant admin panel with roles, permissions, analytics, and subscription management.',
    proj4Name: 'Sinai Platform',
    proj4Desc:
      'Educational platform that centralizes and automates academic processes into a single system, providing administrators, teachers, and students with tools for management, traceability, reports, and real-time tracking to facilitate decision-making.',
    proj6Name: 'Corporate Website Redesign',
    proj6Desc:
      'Complete corporate site redesign with mobile-first approach, SEO optimized, and headless CMS.',
    proj7Name: 'Internal Tools Dashboard',
    proj7Desc:
      'Internal tools for inventory management and operations team reports.',

    // Stack
    stackLabel: 'Tech Stack',
    filterAll: 'All',
    filterFrontend: 'Frontend',
    filterBackend: 'Backend',
    filterCloud: 'Cloud & DevOps',
    filterTesting: 'Testing',
    filterTools: 'Tools',
    filterDesign: 'Design',
    awsCertTitle: 'AWS Certified Cloud Practitioner',
    awsCertDesc: 'Cloud computing fundamentals, AWS architecture, security, and pricing',
    showingTech: 'Showing',
    ofTech: 'of',
    technologies: 'technologies',

    // Blog
    navBlog: 'Blog',
    blogLabel: 'Blog',
    blogSubtitle: 'Thoughts on frontend architecture, tooling, and lessons learned building products at scale.',
    blogMinRead: 'min read',
    readMore: 'Read more',
    blog1Title: 'From Redux to Zustand: A Migration Story',
    blog1Excerpt: 'How we migrated a large-scale React app from Redux to Zustand — reducing boilerplate by 80% and bundle size by 12%.',
    blog1Date: 'Jan 2025',
    blog1Tag: 'State Management',
    blog2Title: 'Testing React Components: The Pragmatic Way',
    blog2Excerpt: 'A silent regression taught me the hard way why testing React components matters more than coverage numbers.',
    blog2Date: 'Nov 2024',
    blog2Tag: 'Testing',
    blog3Title: 'Design Tokens + Tailwind v4: A Practical Guide',
    blog3Excerpt: 'How Tailwind v4 finally makes design tokens first-class citizens with the new @theme directive.',
    blog3Date: 'Sep 2024',
    blog3Tag: 'Design Systems',
    blog4Title: 'Micro-Frontends: When (Not) to Use Them',
    blog4Excerpt: 'Two projects, opposite outcomes. A decision framework for evaluating the micro-frontend architecture.',
    blog4Date: 'Jul 2024',
    blog4Tag: 'Architecture',
    blogBackToArticles: 'Back to articles',

    // Contact
    contactLabel: 'Contact',
    contactHeading1: "Let's talk about your",
    contactHeading2: 'next project',
    contactDesc:
      'Always open to new opportunities, interesting collaborations, or simply a good conversation about technology.',
    footerRights: 'All rights reserved',
    footerMade: 'Designed & developed by me',
  },
  es: {
    // Nav
    navExperience: 'Experiencia',
    navStack: 'Stack',
    navContact: 'Contacto',
    lightMode: 'Modo claro',
    darkMode: 'Modo oscuro',
    availableForProjects: 'Disponible para proyectos',

    // Hero
    heroSubtitle: 'Ingeniero de sistemas - Frontend Developer',
    heroLine1: 'Construyo',
    heroLine2: 'soluciones',
    heroLine3: 'digitales',
    heroStats: '+8 clientes · empleado full-time · abierto a proyectos',
    awsBadgeTitle: 'AWS Cloud Practitioner',
    awsBadgeSubtitle: 'Amazon Web Services — Certificado',
    yearsExp: 'AÑOS EXP.',
    projects: 'PROYECTOS',
    companies: 'EMPRESAS',
    openToWork: 'DISPONIBLE',

    // Experience
    expSectionLabel: 'Experiencia',
    expSubtitle1: '2+ años construyendo productos digitales.',
    expSubtitle2: 'Actualmente empleado — disponible para colaboraciones.',
    openToFreelance: 'ABIERTO A PROYECTOS FREELANCE',
    fullTimeNote: 'Empleo full-time — disponible para proyectos selectos en paralelo.',
    hideProjects: 'Ocultar',
    showProjects: 'Ver',
    projectsWord: 'proyectos',

    // Experience data
    exp1Company: 'Pragma SA.',
    exp1Role: 'Middle Senior Frontend Developer',
    exp1Period: '2024 — Presente',
    exp1Duration: '+2 años',
    exp1Desc:
      'Liderando la arquitectura frontend y trabajando con 5 clientes distintos en proyectos de alto impacto. Responsable de definir estándares de código, code reviews y mentoring del equipo.',
    exp2Company: 'Siempre.NET',
    exp2Role: 'Frontend Developer',
    exp2Period: 'Jul. 2022 — Sept. 2022',
    exp2Duration: '3 meses',
    exp2Desc:
      'Responsable de desarrollar y mantener interfaces, creando componentes reutilizables y un diseño responsivo para ofrecer una experiencia de usuario intuitiva, moderna y visualmente atractiva.',

    // Projects
    proj1Name: 'Fintech Dashboard',
    proj1Desc:
      'Panel financiero en tiempo real con visualización de datos complejos, reportes interactivos y gestión de portafolios.',
    proj2Name: 'E-Commerce Platform',
    proj2Desc:
      'Plataforma de ventas con catálogo dinámico, carrito de compras, pasarela de pagos y panel de administración.',
    proj3Name: 'SaaS Admin Panel',
    proj3Desc:
      'Panel de administración multi-tenant con roles, permisos, analytics y gestión de suscripciones.',
    proj4Name: 'Plataforma  Sinai',
    proj4Desc:
      'Plataforma educativa que centraliza y automatiza los procesos académicos en un solo sistema, proporcionando a directivos, docentes y estudiantes herramientas para la gestión, trazabilidad, reportes y seguimiento en tiempo real, facilitando la toma de decisiones.',
    proj6Name: 'Corporate Website Redesign',
    proj6Desc:
      'Rediseño completo del sitio corporativo con enfoque mobile-first, SEO optimizado y CMS headless.',
    proj7Name: 'Internal Tools Dashboard',
    proj7Desc:
      'Herramientas internas para gestión de inventario y reportes del equipo de operaciones.',

    // Stack
    stackLabel: 'Stack Técnico',
    filterAll: 'Todo',
    filterFrontend: 'Frontend',
    filterBackend: 'Backend',
    filterCloud: 'Cloud & DevOps',
    filterTesting: 'Testing',
    filterTools: 'Herramientas',
    filterDesign: 'Diseño',
    awsCertTitle: 'AWS Certified Cloud Practitioner',
    awsCertDesc: 'Fundamentos de cloud computing, arquitectura AWS, seguridad y pricing',
    showingTech: 'Mostrando',
    ofTech: 'de',
    technologies: 'tecnologías',

    // Blog
    navBlog: 'Blog',
    blogLabel: 'Blog',
    blogSubtitle: 'Reflexiones sobre arquitectura frontend, herramientas y lecciones aprendidas construyendo productos a escala.',
    blogMinRead: 'min lectura',
    readMore: 'Leer más',
    blog1Title: 'De Redux a Zustand: Una Historia de Migración',
    blog1Excerpt: 'Cómo migramos una app React a gran escala de Redux a Zustand — reduciendo boilerplate un 80% y el bundle un 12%.',
    blog1Date: 'Ene 2025',
    blog1Tag: 'State Management',
    blog2Title: 'Testing de Componentes React: El Camino Pragmático',
    blog2Excerpt: 'Una regresión silenciosa me enseñó por las malas por qué testear componentes React importa más que los números de cobertura.',
    blog2Date: 'Nov 2024',
    blog2Tag: 'Testing',
    blog3Title: 'Design Tokens + Tailwind v4: Guía Práctica',
    blog3Excerpt: 'Cómo Tailwind v4 finalmente hace de los design tokens ciudadanos de primera clase con la nueva directiva @theme.',
    blog3Date: 'Sep 2024',
    blog3Tag: 'Design Systems',
    blog4Title: 'Micro-Frontends: Cuándo (No) Usarlos',
    blog4Excerpt: 'Dos proyectos, resultados opuestos. Un framework de decisión para evaluar la arquitectura micro-frontend.',
    blog4Date: 'Jul 2024',
    blog4Tag: 'Arquitectura',
    blogBackToArticles: 'Volver a artículos',

    // Contact
    contactLabel: 'Contacto',
    contactHeading1: 'Hablemos de tu',
    contactHeading2: 'próximo proyecto',
    contactDesc:
      'Siempre abierto a nuevas oportunidades, colaboraciones interesantes o simplemente una buena conversación sobre tecnología.',
    footerRights: 'Todos los derechos reservados',
    footerMade: 'Diseñado & desarrollado por mí',
  },
} as const

export type TranslationKey = keyof (typeof translations)['en']
export type Translations = { [K in TranslationKey]: string }
