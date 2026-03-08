import type { Translations } from './i18n'

export type ExperienceStatus = 'current' | 'past'

export interface Project {
  nameKey: keyof Translations
  descKey: keyof Translations
  url: string
  tags: string[]
}

export interface HighlightLink {
  word: string
  href: string
}

export interface Experience {
  id: number
  companyKey: keyof Translations
  roleKey: keyof Translations
  periodKey: keyof Translations
  durationKey: keyof Translations
  descKey: keyof Translations
  status: ExperienceStatus
  highlightLinks: HighlightLink[]
  projects: Project[]
}

export const experiences: Experience[] = [
  {
    id: 1,
    companyKey: 'exp1Company',
    roleKey: 'exp1Role',
    periodKey: 'exp1Period',
    durationKey: 'exp1Duration',
    descKey: 'exp1Desc',
    status: 'current',
    highlightLinks: [
      { word: 'frontend architecture', href: 'https://patterns.dev' },
      { word: 'code reviews', href: 'https://google.github.io/eng-practices/review/' },
    ],
    projects: [
      {
        nameKey: 'proj1Name',
        descKey: 'proj1Desc',
        url: 'https://example.com',
        tags: ['React', 'TypeScript', 'Recharts', 'TanStack Query', 'Zustand'],
      },
      {
        nameKey: 'proj2Name',
        descKey: 'proj2Desc',
        url: 'https://example.com',
        tags: ['Next.js', 'Tailwind CSS', 'Stripe', 'Prisma', 'PostgreSQL'],
      },
      {
        nameKey: 'proj3Name',
        descKey: 'proj3Desc',
        url: 'https://example.com',
        tags: ['React', 'Material UI', 'GraphQL', 'Apollo Client', 'AWS'],
      },
    ],
  },
  {
    id: 2,
    companyKey: 'exp2Company',
    roleKey: 'exp2Role',
    periodKey: 'exp2Period',
    durationKey: 'exp2Duration',
    descKey: 'exp2Desc',
    status: 'past',
    highlightLinks: [
      { word: 'React', href: 'https://react.dev' },
      { word: 'performance optimization', href: 'https://web.dev/articles/vitals' },
    ],
    projects: [
      {
        nameKey: 'proj4Name',
        descKey: 'proj4Desc',
        url: 'https://example.com',
        tags: ['React', 'Redux', 'Socket.io', 'Styled Components', 'Jest'],
      },
      {
        nameKey: 'proj5Name',
        descKey: 'proj5Desc',
        url: 'https://example.com',
        tags: ['Vue.js', 'Vuex', 'Firebase', 'Algolia', 'Sass'],
      },
    ],
  },
  {
    id: 3,
    companyKey: 'exp3Company',
    roleKey: 'exp3Role',
    periodKey: 'exp3Period',
    durationKey: 'exp3Duration',
    descKey: 'exp3Desc',
    status: 'past',
    highlightLinks: [
      { word: 'responsive', href: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design' },
    ],
    projects: [
      {
        nameKey: 'proj6Name',
        descKey: 'proj6Desc',
        url: 'https://example.com',
        tags: ['HTML5', 'CSS3', 'JavaScript', 'WordPress', 'PHP'],
      },
      {
        nameKey: 'proj7Name',
        descKey: 'proj7Desc',
        url: 'https://example.com',
        tags: ['React', 'Bootstrap', 'Chart.js', 'Node.js', 'MongoDB'],
      },
    ],
  },
]
