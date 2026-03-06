import type { Translations } from './i18n'

export type TechCategory = 'all' | 'frontend' | 'backend' | 'tools' | 'cloud' | 'testing' | 'design'

export interface Tech {
  name: string
  categories: TechCategory[]
}

export interface CategoryFilter {
  key: TechCategory
  labelKey: keyof Translations
}

export const categoryFilters: CategoryFilter[] = [
  { key: 'all', labelKey: 'filterAll' },
  { key: 'frontend', labelKey: 'filterFrontend' },
  { key: 'backend', labelKey: 'filterBackend' },
  { key: 'cloud', labelKey: 'filterCloud' },
  { key: 'testing', labelKey: 'filterTesting' },
  { key: 'tools', labelKey: 'filterTools' },
  { key: 'design', labelKey: 'filterDesign' },
]

export const techStack: Tech[] = [
  { name: 'React', categories: ['frontend'] },
  { name: 'TypeScript', categories: ['frontend', 'backend'] },
  { name: 'Next.js', categories: ['frontend'] },
  { name: 'Vue.js', categories: ['frontend'] },
  { name: 'Angular', categories: ['frontend'] },
  { name: 'Tailwind CSS', categories: ['frontend', 'design'] },
  { name: 'JavaScript', categories: ['frontend', 'backend'] },
  { name: 'HTML5', categories: ['frontend'] },
  { name: 'CSS3', categories: ['frontend', 'design'] },
  { name: 'Sass / SCSS', categories: ['frontend', 'design'] },
  { name: 'Styled Components', categories: ['frontend'] },
  { name: 'Material UI', categories: ['frontend', 'design'] },
  { name: 'Redux', categories: ['frontend'] },
  { name: 'Zustand', categories: ['frontend'] },
  { name: 'TanStack Query', categories: ['frontend'] },
  { name: 'React Hook Form', categories: ['frontend'] },
  { name: 'Motion', categories: ['frontend'] },
  { name: 'GraphQL', categories: ['frontend', 'backend'] },
  { name: 'Apollo Client', categories: ['frontend'] },
  { name: 'REST APIs', categories: ['frontend', 'backend'] },
  { name: 'Node.js', categories: ['backend'] },
  { name: 'Express', categories: ['backend'] },
  { name: 'Prisma', categories: ['backend'] },
  { name: 'PostgreSQL', categories: ['backend'] },
  { name: 'MongoDB', categories: ['backend'] },
  { name: 'Firebase', categories: ['backend', 'cloud'] },
  { name: 'Supabase', categories: ['backend', 'cloud'] },
  { name: 'AWS', categories: ['cloud'] },
  { name: 'Docker', categories: ['cloud'] },
  { name: 'Vercel', categories: ['cloud'] },
  { name: 'CI/CD', categories: ['cloud', 'tools'] },
  { name: 'GitHub Actions', categories: ['cloud', 'tools'] },
  { name: 'Jest', categories: ['testing'] },
  { name: 'React Testing Library', categories: ['testing'] },
  { name: 'Cypress', categories: ['testing'] },
  { name: 'Playwright', categories: ['testing'] },
  { name: 'Git', categories: ['tools'] },
  { name: 'Figma', categories: ['design', 'tools'] },
  { name: 'Storybook', categories: ['tools', 'design'] },
  { name: 'Webpack', categories: ['tools'] },
  { name: 'Vite', categories: ['tools'] },
  { name: 'ESLint / Prettier', categories: ['tools'] },
]
