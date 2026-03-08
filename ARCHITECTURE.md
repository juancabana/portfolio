# Portfolio - Análisis Arquitectónico Completo

## Resumen del Proyecto

Portfolio personal construido como **SPA** (Single Page Application) con **Vue 3 + Vite**, diseñado como vitrina de un desarrollador frontend senior. Incluye tema oscuro/claro, internacionalización bilingüe (EN/ES) y animaciones sofisticadas.

---

## 1. Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| Vue 3 | ^3.5.29 | Framework UI (Composition API + `<script setup>`) |
| Vite | 7.3.1 | Build tool y dev server |
| TypeScript | 5.9.3 | Tipado estático |
| Tailwind CSS | v4.2.1 | Utility-first CSS con plugin Vite |
| Lucide Vue Next | ^0.577.0 | Iconografía SVG consistente |
| VueUse | ^14.2.1 | Utilidades de composición reactivas |
| Vercel Analytics | ^1.6.1 | Analytics de producción |

---

## 2. Estructura del Proyecto

```
src/
├── App.vue                    # Root: provee i18n + analytics + renderiza secciones
├── main.ts                    # Punto de entrada: crea app Vue
├── components/                # 11 componentes Vue
│   ├── NavBar.vue             # Navegación fija con toggles tema/idioma
│   ├── HeroSection.vue        # Landing hero con foto, stats y partículas
│   ├── ExperienceSection.vue  # Sección de experiencia laboral
│   ├── ExperienceCard.vue     # Card expandible por experiencia
│   ├── StackSection.vue       # Grid filtrable de tecnologías
│   ├── BlogSection.vue        # Grid de posts + vista detalle
│   ├── BlogArticle.vue        # Renderizado de artículos con bloques
│   ├── ContactSection.vue     # Sección de contacto + footer
│   ├── AccentLink.vue         # Link reutilizable con estilo accent
│   └── CodeBlock.vue          # Bloques de código con syntax highlighting
├── composables/               # Lógica reutilizable (hooks)
│   ├── useI18n.ts             # Internacionalización con provide/inject
│   ├── useTheme.ts            # Toggle dark/light mode
│   └── useInView.ts           # Intersection Observer para scroll animations
├── data/                      # Capa de datos centralizada
│   ├── site.ts                # Config del sitio, nav, contacto, stats
│   ├── i18n.ts                # Traducciones EN/ES tipadas (~253 keys)
│   ├── experience.ts          # Experiencia laboral + proyectos
│   ├── stack.ts               # 68 tecnologías con categorías
│   └── blog.ts                # Posts con bloques de contenido i18n
├── utils/
│   └── renderInlineMarkup.ts  # Renderizado de markdown inline a HTML
├── styles/                    # Estilos globales
│   ├── index.css              # Agregador de imports
│   ├── fonts.css              # Google Fonts (Inter, Space Mono)
│   ├── tailwind.css           # Directivas Tailwind v4
│   └── theme.css              # CSS variables + dark mode + @theme
└── assets/
    └── profile.png            # Foto del hero
```

---

## 3. Decisiones Arquitectónicas

### 3.1 SPA sin Router

No usa Vue Router. La navegación se resuelve con **anchor links** (`href="#section"`), cada `<section>` tiene un `id` correspondiente. Decisión correcta para un portfolio de una sola página donde el routing añadiría complejidad innecesaria.

### 3.2 Composition API + `<script setup>`

Todos los componentes usan exclusivamente `<script setup lang="ts">`, la API más moderna y concisa de Vue 3. No hay Options API en ningún archivo.

### 3.3 Capa de datos separada

Todo el contenido está en `src/data/` como archivos TypeScript puros. Los componentes solo consumen datos, nunca los definen inline. Esto permite:
- Actualizar contenido sin tocar componentes
- Tipar las estructuras de datos
- Reutilizar datos entre componentes

### 3.4 i18n custom con provide/inject

En lugar de usar `vue-i18n` (librería externa), implementa un sistema propio:

```typescript
// Patrón Provider en App.vue
provideI18n()

// Consumo en cualquier componente
const { t, lang, toggleLang } = useI18n()
```

- Usa `InjectionKey<I18nContext>` para type-safety
- Persiste idioma en `localStorage`
- Las traducciones se referencian con `keyof Translations`

### 3.5 Theming con CSS Variables + clase `.dark`

```css
:root {
  --background: #ffffff;
  --accent-blue: #0D9488;
}
.dark {
  --background: #0a0a0a;
  --accent-blue: #5EEAD4;
}
```

El toggle añade/remueve la clase `dark` en `document.documentElement`. Tailwind v4 lo conecta con:

```css
@custom-variant dark (&:is(.dark *));
@theme inline {
  --color-background: var(--background);
  --color-accent-blue: var(--accent-blue);
}
```

### 3.6 Sin state management global

No usa Pinia ni Vuex. El estado es local por componente (`ref`, `computed`) o compartido vía `provide/inject` (solo para i18n y theme). Decisión apropiada para la complejidad del proyecto.

---

## 4. Patrones y Convenciones

### 4.1 Nomenclatura

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes | PascalCase | `HeroSection.vue`, `ExperienceCard.vue` |
| Composables | camelCase + prefijo `use` | `useI18n`, `useTheme`, `useInView` |
| Archivos de datos | camelCase | `site.ts`, `stack.ts` |
| Clases CSS custom | kebab-case | `animate-word`, `nav-underline` |
| Translation keys | camelCase | `heroSubtitle`, `expSectionLabel` |
| Animaciones | camelCase | `wordReveal`, `slideInLeft` |

### 4.2 Patrón de Props y Emits tipados

```typescript
const props = defineProps<{
  experience: Experience
  index: number
  isLast: boolean
}>()

const emit = defineEmits<{
  back: []
}>()
```

### 4.3 Computed para estado derivado

```typescript
const isCurrent = computed(() => props.experience.status === 'current')
const filtered = computed(() =>
  activeFilter.value === 'all'
    ? techStack
    : techStack.filter(tech => tech.categories.includes(activeFilter.value))
)
```

### 4.4 Imports con alias `@`

Todos los imports usan el alias `@` → `./src` configurado en `vite.config.ts` y `tsconfig.app.json`:

```typescript
import { useI18n } from '@/composables/useI18n'
import { experiences } from '@/data/experience'
```

### 4.5 Guard en inject

```typescript
export function useI18n(): I18nContext {
  const context = inject(I18N_KEY)
  if (!context) {
    throw new Error('useI18n() must be used within provideI18n()')
  }
  return context
}
```

---

## 5. Sistema de Estilos

### 5.1 Tailwind CSS v4 con @theme

Tailwind v4 se integra como plugin de Vite (no PostCSS). Las variables CSS del tema se mapean a utilidades de Tailwind via `@theme inline`:

```css
@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-muted: var(--muted);
  --color-accent-blue: var(--accent-blue);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

### 5.2 Paleta de colores

| Variable | Light | Dark | Uso |
|---|---|---|---|
| `--background` | `#ffffff` | `#0a0a0a` | Fondo principal |
| `--foreground` | `#0a0a0a` | `#fafafa` | Texto principal |
| `--muted` | `#ececf0` | `#1a1a2e` | Fondos secundarios |
| `--muted-foreground` | `#4a4a5a` | `#a0a0b0` | Texto secundario |
| `--accent-blue` | `#0D9488` (teal) | `#5EEAD4` (teal claro) | Color accent principal |
| `--border` | `rgba(0,0,0,0.1)` | `rgba(255,255,255,0.08)` | Bordes |

### 5.3 Tipografía

- **Inter** (300, 400, 500, 600): Cuerpo, headings, UI general
- **Space Mono** (400, 700): Labels monospace, código, badges técnicos

### 5.4 Patrón de estilo en componentes

Combinación de:
1. **Clases Tailwind** para layout y utilidades responsive
2. **`style` inline** para valores específicos (font-family, tamaños exactos)
3. **`<style scoped>`** para animaciones y pseudoelementos complejos

```html
<!-- Tailwind para layout -->
<div class="flex items-center justify-between gap-4 px-6 md:px-16">

<!-- Style inline para tipografía específica -->
<h1 style="font-family: 'Inter'; font-size: 4rem; font-weight: 300">

<!-- Scoped CSS para animaciones -->
<style scoped>
@keyframes wordReveal { ... }
</style>
```

---

## 6. Sistema de Animaciones

### 6.1 Intersection Observer (`useInView`)

Composable que detecta cuándo un elemento entra al viewport:

```typescript
export function useInView(target: Ref<HTMLElement | null>, options = {}) {
  const { threshold = 0.1, rootMargin = '-80px', once = true } = options
  const isInView = ref(false)
  // IntersectionObserver con cleanup automático
  return isInView
}
```

**Uso típico**: Transiciones CSS condicionales basadas en `isInView`:

```html
<div
  ref="sectionRef"
  :class="isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
  class="transition-all duration-700"
/>
```

### 6.2 Catálogo de Keyframes (30+)

#### Animaciones de entrada
| Nombre | Efecto |
|---|---|
| `wordReveal` | translateY(40px) + blur(8px) → visible |
| `slideInLeft` | translateX(-30px) → 0 |
| `slideInRight` | translateX(20px) → 0 |
| `fadeInDown` | translateY(-15px) + opacity 0 → visible |
| `slideUp` | translateY(20px) → 0 |

#### Animaciones continuas (infinite)
| Nombre | Efecto |
|---|---|
| `float` | translateY(0) → -20px (suave) |
| `dotPulse` | scale 1→1.3, opacity 0.3→1 |
| `glowPulse` | opacity 0.15→0.25, scale 1→1.05 |
| `bounceSlow` | translateY(0) → 10px |
| `sparkleRotate` | rotate 0→15→-15→0 |
| `iconWobble` | rotate 0→10→-10→0 |
| `badgePulse` | scale 1→1.5 (indicador verde) |

#### Animaciones de interacción
| Nombre | Efecto |
|---|---|
| `dotPop` | scale 0→1.3→1 |
| `photoReveal` | scale 0.9 + rotate(-2deg) → normal |
| `statLeft/Right/Bottom` | Posicionamiento con cubic-bezier bounce |
| `nodeGlow` | scale 1→1.5 (timeline) |

### 6.3 Técnicas de stagger

Delays escalonados basados en índice para animaciones secuenciales:

```html
<span
  v-for="(word, i) in words"
  :style="{ animationDelay: `${0.5 + i * 0.12}s` }"
  class="animate-word"
/>
```

### 6.4 Vue Transitions

```vue
<!-- Toggle idioma con fade -->
<Transition name="lang-toggle" mode="out-in">
  <span :key="lang">{{ display }}</span>
</Transition>

<!-- Toggle tema con rotación -->
<Transition name="theme-toggle" mode="out-in">
  <Sun v-if="isDark" :key="'sun'" />
  <Moon v-else :key="'moon'" />
</Transition>

<!-- TransitionGroup para grid filtrable -->
<TransitionGroup name="tech-grid" tag="div">
  <div v-for="tech in filtered" :key="tech.name">...</div>
</TransitionGroup>
```

### 6.5 Optimización de animaciones

- **Propiedades GPU-friendly**: Solo `transform` y `opacity` (nunca `width`/`height`/`top`/`left`)
- **`once: true`** en useInView: Deja de observar tras primera activación
- **Cubic-bezier bounce**: `cubic-bezier(0.34, 1.56, 0.64, 1)` para efecto elástico

---

## 7. TypeScript

### 7.1 Configuración estricta

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### 7.2 Interfaces principales

```typescript
// Experiencia laboral
interface Experience {
  id: number
  companyKey: keyof Translations
  roleKey: keyof Translations
  periodKey: keyof Translations
  status: 'current' | 'past'
  highlightLinks: { word: string; href: string }[]
  projects: Project[]
}

// Tecnología
interface Tech {
  name: string
  categories: TechCategory[]
}
type TechCategory = 'all' | 'frontend' | 'backend' | 'tools' | 'cloud' | 'testing' | 'design'

// Bloques de contenido del blog
type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'code'; code: string; language: string; filename?: string }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'callout'; text: string }
  | { type: 'list'; items: string[] }
```

### 7.3 Type-safe i18n

Todas las referencias a texto usan `keyof Translations`, no strings arbitrarios:

```typescript
companyKey: keyof Translations  // Solo acepta keys existentes en i18n.ts
```

---

## 8. Componentes Destacados

### 8.1 CodeBlock.vue — Syntax Highlighter Custom

Implementa un **tokenizer propio** sin dependencias externas para JS/TS, CSS y JSON:

- **JavaScript**: Keywords, strings, template literals, comments, funciones, operadores
- **CSS**: Variables (`--name`), hex colors, units, at-rules
- **JSON**: Keys, strings, números, booleanos

Incluye header estilo macOS (dots rojos/amarillos/verdes), badge de lenguaje y botón de copiar con feedback visual.

### 8.2 HeroSection.vue — Componente más complejo

6 partículas flotantes + heading animado palabra por palabra + badges de stats con entrada bounce + foto con glow + indicador de scroll. ~15 keyframes únicos.

### 8.3 ExperienceCard.vue — Card interactiva

Timeline visual con nodo + línea de conexión, sección expandible de proyectos con stagger, tags con hover scale, diferenciación visual current/past, badge "Open to Freelance" con pulso.

---

## 9. Utilidades

### renderInlineMarkup.ts

Convierte markdown inline a HTML para usar con `v-html`:

```typescript
// [texto](url) → <a href="url" target="_blank">texto</a>
// `código` → <code class="...">código</code>
```

También incluye `highlightText()` para convertir palabras específicas en links con estilo accent.

---

## 10. Buenas Prácticas Observadas

1. **Separación de concerns**: Datos, lógica (composables), presentación (componentes) y estilos (CSS) claramente separados
2. **Componentes focalizados**: Cada componente tiene una responsabilidad clara
3. **Sin dependencias innecesarias**: i18n custom en vez de librería, syntax highlighter propio
4. **Persistencia de preferencias**: Tema e idioma se guardan en `localStorage`
5. **Semantic HTML**: `<nav>`, `<section>`, `<article>`, `<button>` usados correctamente
6. **Links seguros**: `rel="noopener noreferrer"` en todos los links externos
7. **Lazy loading**: `loading="lazy"` en imágenes de blog
8. **Accesibilidad**: Contraste WCAG AA, atributos title, navegación por teclado
9. **Scoped styles**: Sin contaminación global de CSS
10. **Build paralelo**: `run-p type-check "build-only"` para type-check + build simultáneo

---

## 11. Despliegue

- **Plataforma**: Vercel (integración de analytics nativa)
- **Node**: ^20.19.0 || >=22.12.0
- **Build**: `vite build` con vue-tsc para verificación de tipos
- **Output**: `dist/` (SPA estática)

---

## 12. Resumen de Fortalezas

| Área | Valoración |
|---|---|
| Arquitectura de componentes | Limpia, bien separada |
| TypeScript | Estricto, type-safe en i18n y datos |
| Animaciones | Sofisticadas, GPU-optimizadas, 30+ keyframes |
| Theming | CSS variables + Tailwind v4 @theme |
| i18n | Custom, ligero, tipado |
| Performance | Lazy loading, IntersectionObserver, scoped CSS |
| DX (Developer Experience) | Alias @, composables, datos centralizados |
| Accesibilidad | HTML semántico, contraste, keyboard nav |
