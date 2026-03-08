import type { Translations } from './i18n'

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'code'; code: string; language: string; filename?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'callout'; text: string }
  | { type: 'list'; items: string[] }

export interface BlogPostFull {
  id: number
  slug: string
  cover: string
  content: {
    en: ContentBlock[]
    es: ContentBlock[]
  }
}

export interface BlogPostMeta {
  id: number
  titleKey: keyof Translations
  excerptKey: keyof Translations
  dateKey: keyof Translations
  tagKey: keyof Translations
  readTime: number
  highlightLinks: { word: string; href: string }[]
}

// ── Cover & inline images ─────────────────────────────────────
const COVER_1 =
  'https://images.unsplash.com/photo-1753998941587-5befe71f4572?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RlJTIwZWRpdG9yJTIwZGFyayUyMHRoZW1lJTIwcHJvZ3JhbW1pbmd8ZW58MXx8fHwxNzcyODM3MjM2fDA&ixlib=rb-4.1.0&q=80&w=1080'
const COVER_2 =
  'https://images.unsplash.com/photo-1554350747-ec45fd24f51b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMHRlc3RpbmclMjBxdWFsaXR5JTIwYXNzdXJhbmNlfGVufDF8fHx8MTc3Mjc5MTgxOXww&ixlib=rb-4.1.0&q=80&w=1080'
const COVER_3 =
  'https://images.unsplash.com/photo-1729992530956-912936b9785d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBzeXN0ZW0lMjBjb2xvciUyMHBhbGV0dGUlMjBVSXxlbnwxfHx8fDE3NzI3MzY5MjF8MA&ixlib=rb-4.1.0&q=80&w=1080'
const COVER_4 =
  'https://images.unsplash.com/photo-1737505599162-d9932323a889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwY29ubmVjdGlvbnMlMjBhYnN0cmFjdCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzcyODM3MjM5fDA&ixlib=rb-4.1.0&q=80&w=1080'
const INLINE_1 =
  'https://images.unsplash.com/photo-1635220035700-f2d881d763c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXZhc2NyaXB0JTIwcmVhY3QlMjBkZXZlbG9wZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzcyODM3MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080'
const INLINE_2 =
  'https://images.unsplash.com/photo-1590010358311-55d7c0769a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZXJtaW5hbCUyMGNvbW1hbmQlMjBsaW5lJTIwaW50ZXJmYWNlJTIwZGFya3xlbnwxfHx8fDE3NzI4MzcyMzh8MA&ixlib=rb-4.1.0&q=80&w=1080'
const INLINE_3 =
  'https://images.unsplash.com/photo-1670225597315-782633cfbd2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHBhdHRlcm4lMjBtaW5pbWFsfGVufDF8fHx8MTc3Mjc5MjMxN3ww&ixlib=rb-4.1.0&q=80&w=1080'
const INLINE_4 =
  'https://images.unsplash.com/photo-1756487564871-7ecc5a9c229f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGFyY2hpdGVjdHVyZSUyMGRpYWdyYW0lMjB3aGl0ZWJvYXJkfGVufDF8fHx8MTc3Mjc5MTgxOXww&ixlib=rb-4.1.0&q=80&w=1080'

// ── Blog 1: Redux → Zustand ──────────────────────────────────
const blog1En: ContentBlock[] = [
  { type: 'paragraph', text: 'For three years I used [Redux](https://redux.js.org) across four enterprise codebases. It worked. But every new feature required a slice, actions, reducers, selectors, and middleware — an average of five files for a single piece of state.' },
  { type: 'heading', text: 'The tipping point' },
  { type: 'paragraph', text: 'During a sprint we needed to add a global notification queue. With Redux the PR touched 11 files. I rewrote it with [Zustand](https://zustand-demo.pmnd.rs) in a single file — 23 lines. That was the moment.' },
  {
    type: 'code', language: 'tsx', filename: 'store/notifications.ts',
    code: `import { create } from 'zustand'

interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface NotificationStore {
  items: Notification[]
  add: (n: Omit<Notification, 'id'>) => void
  dismiss: (id: string) => void
}

export const useNotifications = create<NotificationStore>((set) => ({
  items: [],
  add: (n) =>
    set((s) => ({
      items: [...s.items, { ...n, id: crypto.randomUUID() }],
    })),
  dismiss: (id) =>
    set((s) => ({
      items: s.items.filter((i) => i.id !== id),
    })),
}))`,
  },
  { type: 'image', src: INLINE_1, alt: 'Developer workspace with React code', caption: 'The same store that took 11 files with Redux — now lives in one.' },
  { type: 'heading', text: 'Bundle size impact' },
  { type: 'paragraph', text: 'Redux Toolkit ships ~43 kB minified. Zustand is ~1.1 kB. On one project the swap reduced the JS bundle by 12% after tree-shaking — a real win for [Core Web Vitals](https://web.dev/articles/vitals).' },
  { type: 'callout', text: 'Zustand is not a silver bullet. If your team already knows Redux and you have established patterns, the migration cost might not be worth it. Evaluate per-project.' },
  { type: 'heading', text: 'Migration strategy' },
  { type: 'paragraph', text: "We didn't rewrite everything at once. The approach was:" },
  {
    type: 'list', items: [
      'New features always used Zustand stores',
      'Existing Redux slices were migrated one per sprint',
      'We kept Redux DevTools during transition via zustand/middleware',
      'Full migration took 6 sprints (~3 months) across 2 developers',
    ],
  },
  {
    type: 'code', language: 'tsx', filename: 'store/cart.ts',
    code: `import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  total: () => number
}

export const useCart = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        addItem: (item) =>
          set((s) => ({ items: [...s.items, item] })),
        removeItem: (id) =>
          set((s) => ({
            items: s.items.filter((i) => i.id !== id),
          })),
        total: () =>
          get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      }),
      { name: 'cart-storage' }
    )
  )
)`,
  },
  { type: 'heading', text: 'The tradeoffs nobody mentions' },
  { type: 'paragraph', text: 'Zustand has no built-in entity adapter, no RTK Query equivalent, and the community middleware ecosystem is smaller. For complex data fetching patterns I pair it with [TanStack Query](https://tanstack.com/query) — Zustand handles UI state, TanStack handles server state. Clean separation.' },
  { type: 'paragraph', text: 'Three months after full migration: onboarding time for new devs dropped from ~2 days to ~3 hours, bundle shrank 12%, and our DX satisfaction in retros went from a 6 to a 9.' },
]

const blog1Es: ContentBlock[] = [
  { type: 'paragraph', text: 'Durante tres años usé [Redux](https://redux.js.org) en cuatro codebases enterprise. Funcionaba. Pero cada feature nuevo requería un slice, actions, reducers, selectors y middleware — un promedio de cinco archivos para un solo estado.' },
  { type: 'heading', text: 'El punto de quiebre' },
  { type: 'paragraph', text: 'En un sprint necesitábamos agregar una cola de notificaciones global. Con Redux el PR tocó 11 archivos. Lo reescribí con [Zustand](https://zustand-demo.pmnd.rs) en un solo archivo — 23 líneas. Ese fue el momento.' },
  {
    type: 'code', language: 'tsx', filename: 'store/notifications.ts',
    code: `import { create } from 'zustand'

interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface NotificationStore {
  items: Notification[]
  add: (n: Omit<Notification, 'id'>) => void
  dismiss: (id: string) => void
}

export const useNotifications = create<NotificationStore>((set) => ({
  items: [],
  add: (n) =>
    set((s) => ({
      items: [...s.items, { ...n, id: crypto.randomUUID() }],
    })),
  dismiss: (id) =>
    set((s) => ({
      items: s.items.filter((i) => i.id !== id),
    })),
}))`,
  },
  { type: 'image', src: INLINE_1, alt: 'Espacio de trabajo de desarrollo con código React', caption: 'El mismo store que tomaba 11 archivos con Redux — ahora vive en uno solo.' },
  { type: 'heading', text: 'Impacto en el bundle' },
  { type: 'paragraph', text: 'Redux Toolkit pesa ~43 kB minificado. Zustand pesa ~1.1 kB. En un proyecto el cambio redujo el bundle JS un 12% después del tree-shaking — una mejora real para [Core Web Vitals](https://web.dev/articles/vitals).' },
  { type: 'callout', text: 'Zustand no es una bala de plata. Si tu equipo ya conoce Redux y tienen patrones establecidos, el costo de migración podría no valer la pena. Evalúa por proyecto.' },
  { type: 'heading', text: 'Estrategia de migración' },
  { type: 'paragraph', text: 'No reescribimos todo de golpe. El approach fue:' },
  {
    type: 'list', items: [
      'Features nuevos siempre usaron stores de Zustand',
      'Los slices existentes de Redux se migraron uno por sprint',
      'Mantuvimos Redux DevTools durante la transición vía zustand/middleware',
      'La migración completa tomó 6 sprints (~3 meses) entre 2 devs',
    ],
  },
  {
    type: 'code', language: 'tsx', filename: 'store/cart.ts',
    code: `import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  total: () => number
}

export const useCart = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        items: [],
        addItem: (item) =>
          set((s) => ({ items: [...s.items, item] })),
        removeItem: (id) =>
          set((s) => ({
            items: s.items.filter((i) => i.id !== id),
          })),
        total: () =>
          get().items.reduce((sum, i) => sum + i.price * i.qty, 0),
      }),
      { name: 'cart-storage' }
    )
  )
)`,
  },
  { type: 'heading', text: 'Los tradeoffs de los que nadie habla' },
  { type: 'paragraph', text: 'Zustand no tiene entity adapter, ni equivalente a RTK Query, y el ecosistema de middleware es más pequeño. Para patrones complejos de data fetching lo combino con [TanStack Query](https://tanstack.com/query) — Zustand maneja estado de UI, TanStack maneja estado de servidor. Separación limpia.' },
  { type: 'paragraph', text: 'Tres meses después de la migración completa: el tiempo de onboarding para nuevos devs bajó de ~2 días a ~3 horas, el bundle se redujo 12%, y la satisfacción de DX en retros subió de 6 a 9.' },
]

// ── Blog 2: Testing React ─────────────────────────────────────
const blog2En: ContentBlock[] = [
  { type: 'paragraph', text: 'It was a Tuesday. We shipped a new filter panel to production with zero tests. The [React](https://react.dev) component worked perfectly in our staging environment. Three weeks later, a colleague refactored the shared utility it depended on. Nothing broke visually. The regression was silent.' },
  { type: 'heading', text: 'The silent regression' },
  { type: 'paragraph', text: 'The filter was sending wrong query params to the API. Users saw results but they were unfiltered — the component rendered fine but the logic was broken. It took us 12 hours to trace, fix, and verify across 6 affected views.' },
  { type: 'image', src: INLINE_2, alt: 'Terminal showing test output', caption: 'The terminal output nobody wants to see at 11 PM on a Friday.' },
  { type: 'heading', text: 'What I should have written' },
  { type: 'paragraph', text: 'A single [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) test would have caught it. Here\'s the test I wrote after the incident:' },
  {
    type: 'code', language: 'tsx', filename: 'FilterPanel.test.tsx',
    code: `import { render, screen, fireEvent } from '@testing-library/react'
import { FilterPanel } from './FilterPanel'
import { vi } from 'vitest'

describe('FilterPanel', () => {
  it('sends correct query params when filters change', () => {
    const onFilter = vi.fn()
    render(<FilterPanel onFilter={onFilter} />)

    fireEvent.click(screen.getByRole('button', { name: /electronics/i }))
    fireEvent.click(screen.getByRole('button', { name: /apply/i }))

    expect(onFilter).toHaveBeenCalledWith({
      category: 'electronics',
      sort: 'relevance',
      page: 1,
    })
  })

  it('resets all filters to defaults', () => {
    const onFilter = vi.fn()
    render(<FilterPanel onFilter={onFilter} />)

    fireEvent.click(screen.getByRole('button', { name: /electronics/i }))
    fireEvent.click(screen.getByRole('button', { name: /reset/i }))
    fireEvent.click(screen.getByRole('button', { name: /apply/i }))

    expect(onFilter).toHaveBeenCalledWith({
      category: 'all',
      sort: 'relevance',
      page: 1,
    })
  })
})`,
  },
  { type: 'heading', text: 'My testing philosophy now' },
  { type: 'paragraph', text: 'After this incident I adopted a practical framework:' },
  {
    type: 'list', items: [
      'Test behavior, not implementation — use [Testing Library](https://testing-library.com) queries that match what users see',
      'Every bug gets a regression test before the fix ships',
      'Critical user flows get integration tests with MSW for API mocking',
      'Visual regressions are caught via Chromatic + Storybook snapshots',
    ],
  },
  {
    type: 'code', language: 'tsx', filename: 'setup/msw-handlers.ts',
    code: `import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/products', ({ request }) => {
    const url = new URL(request.url)
    const category = url.searchParams.get('category')

    const products = mockProducts.filter(
      (p) => category === 'all' || p.category === category
    )

    return HttpResponse.json({ products, total: products.length })
  }),
]`,
  },
  { type: 'callout', text: 'The goal is not 100% coverage. The goal is confidence. Test the paths that, if broken, cost you hours. Skip the rest.' },
  { type: 'paragraph', text: "Since implementing this approach our production incidents dropped by 60% and the team now treats untested PRs the same way we treat PRs without documentation — they don't get merged." },
]

const blog2Es: ContentBlock[] = [
  { type: 'paragraph', text: 'Era un martes. Desplegamos un nuevo panel de filtros a producción sin tests. El componente de [React](https://react.dev) funcionaba perfecto en staging. Tres semanas después, un colega refactorizó la utilidad compartida de la que dependía. Nada se rompió visualmente. La regresión fue silenciosa.' },
  { type: 'heading', text: 'La regresión silenciosa' },
  { type: 'paragraph', text: 'El filtro enviaba parámetros de query incorrectos a la API. Los usuarios veían resultados pero no estaban filtrados — el componente renderizaba bien pero la lógica estaba rota. Nos tomó 12 horas rastrear, corregir y verificar en 6 vistas afectadas.' },
  { type: 'image', src: INLINE_2, alt: 'Terminal mostrando output de tests', caption: 'El output de terminal que nadie quiere ver a las 11 PM un viernes.' },
  { type: 'heading', text: 'Lo que debí haber escrito' },
  { type: 'paragraph', text: 'Un solo test de [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) lo hubiera detectado. Este es el test que escribí después del incidente:' },
  {
    type: 'code', language: 'tsx', filename: 'FilterPanel.test.tsx',
    code: `import { render, screen, fireEvent } from '@testing-library/react'
import { FilterPanel } from './FilterPanel'
import { vi } from 'vitest'

describe('FilterPanel', () => {
  it('sends correct query params when filters change', () => {
    const onFilter = vi.fn()
    render(<FilterPanel onFilter={onFilter} />)

    fireEvent.click(screen.getByRole('button', { name: /electronics/i }))
    fireEvent.click(screen.getByRole('button', { name: /apply/i }))

    expect(onFilter).toHaveBeenCalledWith({
      category: 'electronics',
      sort: 'relevance',
      page: 1,
    })
  })
})`,
  },
  { type: 'heading', text: 'Mi filosofía de testing ahora' },
  { type: 'paragraph', text: 'Después de este incidente adopté un framework práctico:' },
  {
    type: 'list', items: [
      'Testear comportamiento, no implementación — usar queries de [Testing Library](https://testing-library.com) que coincidan con lo que ven los usuarios',
      'Cada bug recibe un test de regresión antes de que el fix sea desplegado',
      'Los flujos críticos de usuario tienen tests de integración con MSW para mockear APIs',
      'Las regresiones visuales se detectan vía Chromatic + snapshots de Storybook',
    ],
  },
  {
    type: 'code', language: 'tsx', filename: 'setup/msw-handlers.ts',
    code: `import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/products', ({ request }) => {
    const url = new URL(request.url)
    const category = url.searchParams.get('category')

    const products = mockProducts.filter(
      (p) => category === 'all' || p.category === category
    )

    return HttpResponse.json({ products, total: products.length })
  }),
]`,
  },
  { type: 'callout', text: 'El objetivo no es 100% de cobertura. El objetivo es confianza. Testea los paths que, si se rompen, te cuestan horas. Ignora el resto.' },
  { type: 'paragraph', text: 'Desde que implementamos este approach, los incidentes de producción bajaron un 60% y el equipo ahora trata PRs sin tests igual que PRs sin documentación — no se mergean.' },
]

// ── Blog 3: Design Tokens + Tailwind v4 ───────────────────────
const blog3En: ContentBlock[] = [
  { type: 'paragraph', text: 'Every time I join a new project, the first thing I check is how they handle theming. Most codebases I\'ve seen have hardcoded colors everywhere. [Tailwind CSS v4](https://tailwindcss.com) finally makes design tokens a first-class citizen with the new @theme directive.' },
  { type: 'heading', text: 'The @theme directive' },
  { type: 'paragraph', text: 'In Tailwind v4, the `@theme` directive replaces `tailwind.config.js`. Everything lives in CSS now — closer to the platform, easier to reason about.' },
  {
    type: 'code', language: 'css', filename: 'theme.css',
    code: `:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --accent-blue: #0D9488;
  --accent-blue-muted: #0D948866;
  --accent-blue-subtle: #0D948812;
  --muted-foreground: #4a4a5a;
}

.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --accent-blue: #5EEAD4;
  --accent-blue-muted: #5EEAD488;
  --accent-blue-subtle: #5EEAD41A;
  --muted-foreground: #a1a1aa;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-accent-blue: var(--accent-blue);
  --color-accent-blue-muted: var(--accent-blue-muted);
  --color-accent-blue-subtle: var(--accent-blue-subtle);
  --color-muted-foreground: var(--muted-foreground);
}`,
  },
  { type: 'image', src: INLINE_3, alt: 'Abstract geometric pattern representing design system', caption: 'Design tokens are the DNA of your visual language — everything else is derived from them.' },
  { type: 'heading', text: 'Structuring tokens for scale' },
  { type: 'paragraph', text: 'I organize tokens in three layers:' },
  {
    type: 'list', items: [
      'Primitive — raw values: `--teal-400: #5EEAD4`',
      'Semantic — purpose: `--accent-blue: var(--teal-400)`',
      'Component — context: `--button-bg: var(--accent-blue)`',
    ],
  },
  { type: 'heading', text: 'Dark mode with @custom-variant' },
  { type: 'paragraph', text: 'Tailwind v4 introduces [@custom-variant](https://tailwindcss.com/docs/dark-mode) for dark mode scoping. Instead of relying on a media query, you scope to a CSS class:' },
  {
    type: 'code', language: 'css', filename: 'theme.css',
    code: `/* Scope dark mode to the .dark class */
@custom-variant dark (&:is(.dark *));

/* Now use it in your components */
/* <div class="bg-white dark:bg-black"> */`,
  },
  { type: 'heading', text: 'The component layer' },
  {
    type: 'code', language: 'tsx', filename: 'Button.tsx',
    code: `export function Button({ children, variant = 'primary' }: ButtonProps) {
  const styles = {
    primary: 'bg-accent-blue text-background hover:bg-accent-blue/90',
    ghost: 'bg-transparent text-foreground hover:bg-foreground/5',
    outline: 'border border-accent-blue/20 text-accent-blue hover:bg-accent-blue-subtle',
  }

  return (
    <button className={\`px-4 py-2 rounded-lg transition-colors \${styles[variant]}\`}>
      {children}
    </button>
  )
}`,
  },
  { type: 'callout', text: 'Pro tip: export your tokens as a JSON file and share it with your design team via [Tokens Studio](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma). Single source of truth between Figma and code.' },
  { type: 'paragraph', text: 'This approach has survived 3 projects and 2 complete rebrandings. When marketing decides to change the brand color, it\'s a single variable swap — the whole UI adapts automatically.' },
]

const blog3Es: ContentBlock[] = [
  { type: 'paragraph', text: 'Cada vez que me uno a un proyecto nuevo, lo primero que reviso es cómo manejan el theming. La mayoría de codebases que he visto tienen colores hardcodeados por todos lados. [Tailwind CSS v4](https://tailwindcss.com) finalmente hace de los design tokens ciudadanos de primera clase con la nueva directiva @theme.' },
  { type: 'heading', text: 'La directiva @theme' },
  { type: 'paragraph', text: 'En Tailwind v4, la directiva `@theme` reemplaza a `tailwind.config.js`. Todo vive en CSS ahora — más cercano a la plataforma, más fácil de razonar.' },
  {
    type: 'code', language: 'css', filename: 'theme.css',
    code: `:root {
  --background: #ffffff;
  --foreground: #0a0a0a;
  --accent-blue: #0D9488;
  --accent-blue-muted: #0D948866;
  --accent-blue-subtle: #0D948812;
  --muted-foreground: #4a4a5a;
}

.dark {
  --background: #0a0a0a;
  --foreground: #fafafa;
  --accent-blue: #5EEAD4;
  --accent-blue-muted: #5EEAD488;
  --accent-blue-subtle: #5EEAD41A;
  --muted-foreground: #a1a1aa;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-accent-blue: var(--accent-blue);
  --color-accent-blue-muted: var(--accent-blue-muted);
  --color-accent-blue-subtle: var(--accent-blue-subtle);
  --color-muted-foreground: var(--muted-foreground);
}`,
  },
  { type: 'image', src: INLINE_3, alt: 'Patrón geométrico abstracto representando un design system', caption: 'Los design tokens son el ADN de tu lenguaje visual — todo lo demás se deriva de ellos.' },
  { type: 'heading', text: 'Estructurando tokens para escala' },
  { type: 'paragraph', text: 'Organizo tokens en tres capas:' },
  {
    type: 'list', items: [
      'Primitivo — valores crudos: `--teal-400: #5EEAD4`',
      'Semántico — propósito: `--accent-blue: var(--teal-400)`',
      'Componente — contexto: `--button-bg: var(--accent-blue)`',
    ],
  },
  { type: 'heading', text: 'Dark mode con @custom-variant' },
  { type: 'paragraph', text: 'Tailwind v4 introduce [@custom-variant](https://tailwindcss.com/docs/dark-mode) para scoping de dark mode. En vez de depender de un media query, haces scope a una clase CSS:' },
  {
    type: 'code', language: 'css', filename: 'theme.css',
    code: `@custom-variant dark (&:is(.dark *));

/* Ahora úsalo en tus componentes */
/* <div class="bg-white dark:bg-black"> */`,
  },
  { type: 'heading', text: 'La capa de componente' },
  {
    type: 'code', language: 'tsx', filename: 'Button.tsx',
    code: `export function Button({ children, variant = 'primary' }: ButtonProps) {
  const styles = {
    primary: 'bg-accent-blue text-background hover:bg-accent-blue/90',
    ghost: 'bg-transparent text-foreground hover:bg-foreground/5',
    outline: 'border border-accent-blue/20 text-accent-blue hover:bg-accent-blue-subtle',
  }

  return (
    <button className={\`px-4 py-2 rounded-lg transition-colors \${styles[variant]}\`}>
      {children}
    </button>
  )
}`,
  },
  { type: 'callout', text: 'Pro tip: exporta tus tokens como JSON y compártelos con tu equipo de diseño via [Tokens Studio](https://www.figma.com/community/plugin/843461159747178978/tokens-studio-for-figma). Una sola fuente de verdad entre Figma y código.' },
  { type: 'paragraph', text: 'Este approach ha sobrevivido 3 proyectos y 2 rebrandings completos. Cuando marketing decide cambiar el color de marca, es un solo cambio de variable — toda la UI se adapta automáticamente.' },
]

// ── Blog 4: Micro-frontends ──────────────────────────────────
const blog4En: ContentBlock[] = [
  { type: 'paragraph', text: 'The word "micro-frontends" makes some developers excited and others terrified. I\'ve been on both sides. In two years I worked on two implementations: one at a fintech with 8 teams, and one at an e-commerce startup with 3 teams. The outcomes could not have been more different.' },
  { type: 'heading', text: 'The success story' },
  { type: 'paragraph', text: 'The fintech had 8 autonomous teams, each owning a business domain. They needed independent deployments — a change in the payments dashboard shouldn\'t require deploying the analytics module. We used [Module Federation](https://webpack.js.org/concepts/module-federation) with Webpack 5.' },
  {
    type: 'code', language: 'js', filename: 'webpack.config.js',
    code: `const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'payments',
      filename: 'remoteEntry.js',
      exposes: {
        './PaymentsDashboard': './src/PaymentsDashboard',
        './TransactionList': './src/TransactionList',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
      },
    }),
  ],
}`,
  },
  { type: 'image', src: INLINE_4, alt: 'Architecture diagram on whiteboard', caption: 'The architecture diagram from our initial planning session — 8 micro-frontends, 1 shell.' },
  { type: 'heading', text: 'The nightmare' },
  { type: 'paragraph', text: "The startup had 3 developers total. They adopted micro-frontends because it was 'the modern way.' The result: 3 separate repos, 3 build pipelines, shared components duplicated across repos, version mismatches causing runtime crashes, and a DX so painful that deploys took 45 minutes." },
  { type: 'callout', text: 'If you have fewer than 5 teams working on the same product, you probably don\'t need micro-frontends. A well-structured monorepo with [Turborepo](https://turbo.build) will serve you better.' },
  { type: 'heading', text: 'Decision framework' },
  { type: 'paragraph', text: 'After both experiences, here\'s how I evaluate:' },
  {
    type: 'list', items: [
      'Team count — micro-frontends make sense with 5+ teams',
      "Deploy independence — if teams block each other's deploys, it's a signal",
      'Tech diversity — if teams need different frameworks, MFEs enable that',
      'Shared state — if features share heavy state, MFEs add painful complexity',
      'Org maturity — you need strong DevOps, shared linting, and contract testing',
    ],
  },
  { type: 'heading', text: 'The monorepo alternative' },
  {
    type: 'code', language: 'json', filename: 'turbo.json',
    code: `{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}`,
  },
  { type: 'paragraph', text: 'For most teams, a [Turborepo](https://turbo.build) monorepo with shared packages gives you 80% of the benefits (code ownership, independent builds, shared components) without the runtime complexity of module federation. It\'s what I recommend for teams under 5 developers.' },
  { type: 'paragraph', text: 'The fintech still runs micro-frontends successfully — they deploy 30+ times a day across 8 teams. The startup rewrote everything into a [Next.js](https://nextjs.org) monorepo and their deploy time dropped from 45 minutes to 3. Choose the architecture that fits your team, not your ambition.' },
]

const blog4Es: ContentBlock[] = [
  { type: 'paragraph', text: 'La palabra "micro-frontends" emociona a algunos devs y aterroriza a otros. He estado en ambos lados. En dos años trabajé en dos implementaciones: una en una fintech con 8 equipos, y otra en un startup de e-commerce con 3 equipos. Los resultados no pudieron haber sido más diferentes.' },
  { type: 'heading', text: 'La historia de éxito' },
  { type: 'paragraph', text: 'La fintech tenía 8 equipos autónomos, cada uno dueño de un dominio de negocio. Necesitaban deploys independientes — un cambio en el dashboard de pagos no debería requerir deployar el módulo de analytics. Usamos [Module Federation](https://webpack.js.org/concepts/module-federation) con Webpack 5.' },
  {
    type: 'code', language: 'js', filename: 'webpack.config.js',
    code: `const { ModuleFederationPlugin } = require('webpack').container

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'payments',
      filename: 'remoteEntry.js',
      exposes: {
        './PaymentsDashboard': './src/PaymentsDashboard',
        './TransactionList': './src/TransactionList',
      },
      shared: {
        react: { singleton: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, requiredVersion: '^18.0.0' },
      },
    }),
  ],
}`,
  },
  { type: 'image', src: INLINE_4, alt: 'Diagrama de arquitectura en pizarra', caption: 'El diagrama de arquitectura de nuestra sesión de planeación inicial — 8 micro-frontends, 1 shell.' },
  { type: 'heading', text: 'La pesadilla' },
  { type: 'paragraph', text: "El startup tenía 3 devs en total. Adoptaron micro-frontends porque era 'lo moderno.' El resultado: 3 repos separados, 3 pipelines de build, componentes compartidos duplicados entre repos, mismatches de versión causando crashes en runtime, y un DX tan doloroso que los deploys tomaban 45 minutos." },
  { type: 'callout', text: 'Si tienes menos de 5 equipos trabajando en el mismo producto, probablemente no necesitas micro-frontends. Un monorepo bien estructurado con [Turborepo](https://turbo.build) te servirá mejor.' },
  { type: 'heading', text: 'Framework de decisión' },
  { type: 'paragraph', text: 'Después de ambas experiencias, así es como evalúo:' },
  {
    type: 'list', items: [
      'Cantidad de equipos — micro-frontends tienen sentido con 5+ equipos',
      'Independencia de deploy — si los equipos se bloquean entre sí, es una señal',
      'Diversidad tech — si los equipos necesitan frameworks diferentes, MFEs lo habilitan',
      'Estado compartido — si los features comparten estado pesado, MFEs agregan complejidad dolorosa',
      'Madurez organizacional — necesitas DevOps fuerte, linting compartido y contract testing',
    ],
  },
  { type: 'heading', text: 'La alternativa monorepo' },
  {
    type: 'code', language: 'json', filename: 'turbo.json',
    code: `{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "test": {
      "dependsOn": ["build"],
      "outputs": []
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}`,
  },
  { type: 'paragraph', text: 'Para la mayoría de equipos, un monorepo con [Turborepo](https://turbo.build) y paquetes compartidos te da el 80% de los beneficios (ownership de código, builds independientes, componentes compartidos) sin la complejidad runtime de module federation. Es lo que recomiendo para equipos de menos de 5 devs.' },
  { type: 'paragraph', text: 'La fintech sigue corriendo micro-frontends exitosamente — hacen 30+ deploys al día entre 8 equipos. El startup reescribió todo en un monorepo de [Next.js](https://nextjs.org) y su tiempo de deploy bajó de 45 minutos a 3. Elige la arquitectura que se ajuste a tu equipo, no a tu ambición.' },
]

// ── Exports ───────────────────────────────────────────────────
export const blogArticles: BlogPostFull[] = [
  { id: 1, slug: 'redux-to-zustand', cover: COVER_1, content: { en: blog1En, es: blog1Es } },
  { id: 2, slug: 'testing-react', cover: COVER_2, content: { en: blog2En, es: blog2Es } },
  { id: 3, slug: 'design-tokens-tailwind', cover: COVER_3, content: { en: blog3En, es: blog3Es } },
  { id: 4, slug: 'micro-frontends', cover: COVER_4, content: { en: blog4En, es: blog4Es } },
]

export const blogPostsMeta: BlogPostMeta[] = [
  {
    id: 1, titleKey: 'blog1Title', excerptKey: 'blog1Excerpt',
    dateKey: 'blog1Date', tagKey: 'blog1Tag', readTime: 8,
    highlightLinks: [
      { word: 'Redux', href: 'https://redux.js.org' },
      { word: 'Zustand', href: 'https://zustand-demo.pmnd.rs' },
    ],
  },
  {
    id: 2, titleKey: 'blog2Title', excerptKey: 'blog2Excerpt',
    dateKey: 'blog2Date', tagKey: 'blog2Tag', readTime: 6,
    highlightLinks: [
      { word: 'React', href: 'https://react.dev' },
    ],
  },
  {
    id: 3, titleKey: 'blog3Title', excerptKey: 'blog3Excerpt',
    dateKey: 'blog3Date', tagKey: 'blog3Tag', readTime: 10,
    highlightLinks: [
      { word: 'Tailwind v4', href: 'https://tailwindcss.com' },
    ],
  },
  {
    id: 4, titleKey: 'blog4Title', excerptKey: 'blog4Excerpt',
    dateKey: 'blog4Date', tagKey: 'blog4Tag', readTime: 7,
    highlightLinks: [
      { word: 'micro-frontend', href: 'https://micro-frontends.org' },
    ],
  },
]
