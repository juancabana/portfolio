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
      { word: 'experiencia de usuario', href: 'https://portal.sinai.com.co/#hablemos' },
    ],
    projects: [
      {
        nameKey: 'proj4Name',
        descKey: 'proj4Desc',
        url: 'https://portal.sinai.com.co/',
        tags: ['React', 'Bootstrap', '.NET', 'Typescript', 'CSS'],
      },

    ],
  },
]
