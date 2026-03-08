import type { Translations } from './i18n'

export interface NavItem {
  labelKey: keyof Translations
  href: string
}

export interface ContactLink {
  label: string
  href: string
}

export interface HeroStat {
  value: string
  labelKey: keyof Translations
  align?: 'left' | 'right' | 'center'
}

export interface FloatingParticle {
  delay: number
  x: string
  y: string
  size: number
}

export const siteConfig = {
  logo: 'Juan David Cabana Trejos.',
  copyrightYear: 2026,

  navItems: [
    { labelKey: 'navExperience', href: '#experience' },
    { labelKey: 'navStack', href: '#stack' },
    { labelKey: 'navBlog', href: '#blog' },
    { labelKey: 'navContact', href: '#contact' },
  ] satisfies NavItem[],

  contactLinks: [
    { label: 'GitHub', href: 'https://github.com/juancabana' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/juan-david-cabana/' },
    { label: 'Email', href: 'mailto:juandaka78@gmail.com' },
  ] satisfies ContactLink[],

  heroStats: {
    years: { value: '2+', labelKey: 'yearsExp' },
    projects: { value: '10+', labelKey: 'projects' },
    companies: { value: '2', labelKey: 'companies' },
  } satisfies Record<string, HeroStat>,

  floatingParticles: [
    { delay: 0, x: '10%', y: '20%', size: 6 },
    { delay: 1.2, x: '85%', y: '15%', size: 4 },
    { delay: 2.5, x: '70%', y: '60%', size: 5 },
    { delay: 0.8, x: '25%', y: '75%', size: 3 },
    { delay: 1.8, x: '50%', y: '30%', size: 4 },
    { delay: 3.2, x: '90%', y: '80%', size: 6 },
  ] satisfies FloatingParticle[],
} as const
