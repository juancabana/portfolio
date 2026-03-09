import type { Translations } from './i18n'

export type ExperienceStatus = 'current' | 'past'

export interface Project {
  nameKey: keyof Translations
  descKey: keyof Translations
  url: string
  tags: string[]
  highlightLinks?: HighlightLink[]
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
    highlightLinks: [],
    projects: [
      {
        nameKey: 'proj6Name',
        descKey: 'proj6Desc',
        url: 'https://www.asulado.com/',
        tags: ['Web Sockets', 'Next.JS', 'Clean Arquitecture', 'MUI', 'Axios', 'Azure', 'Redux'],
      },
      {
        nameKey: 'proj5Name',
        descKey: 'proj5Desc',
        url: 'https://www.proteccion.com/contenidos/personas/',
        tags: ['React', 'TypeScript', 'msal', 'SCSS'],
      },
      {
        nameKey: 'proj4Name',
        descKey: 'proj4Desc',
        url: 'https://www.grupomutual.fi.cr/',
        tags: ['Next.JS', 'Micro-Frontends', 'TypeScript', 'Styled-components'],
      },
      {
        nameKey: 'proj3Name',
        descKey: 'proj3Desc',
        url: 'https://www.dislicores.com/',
        tags: ['React', 'Netlify', 'AWS', 'AI Integration', 'Chatbot'],
      },
      {
        nameKey: 'proj2Name',
        descKey: 'proj2Desc',
        url: 'https://www.soatmundial.com.co/',
        tags: ['React', 'Gatsby', 'Micro-frontends', 'SCSS'],
        highlightLinks: [
          { word: 'simuladores', href: 'https://www.proteccion.com/simuladores' },
          { word: 'perfilador financiero', href: 'https://www.proteccion.com/perfilador' },
          { word: 'simulators', href: 'https://www.proteccion.com/simuladores' },
          { word: 'financial profiler', href: 'https://www.proteccion.com/perfilador' },
        ],
      },
      {
        nameKey: 'proj1Name',
        descKey: 'proj1Desc',
        url: 'https://mapadecrecimiento.pragma.com.co/login',
        tags: ['Angular', 'TypeScript', 'Jasmine', 'SCSS'],
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
        nameKey: 'proj7Name',
        descKey: 'proj7Desc',
        url: 'https://portal.sinai.com.co/',
        tags: ['React', 'Bootstrap', '.NET', 'TypeScript', 'CSS'],
      },
    ],
  },
]
