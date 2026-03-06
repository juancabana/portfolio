import { ref, computed, provide, inject } from 'vue'
import type { InjectionKey, Ref } from 'vue'
import { translations } from '@/data/i18n'
import type { Lang, Translations } from '@/data/i18n'

interface I18nContext {
  lang: Ref<Lang>
  t: Ref<Translations>
  toggleLang: () => void
}

const I18N_KEY: InjectionKey<I18nContext> = Symbol('i18n')

export function provideI18n() {
  const stored = localStorage.getItem('lang')
  const lang = ref<Lang>(stored === 'es' ? 'es' : 'en')

  const t = computed(() => translations[lang.value])

  function toggleLang() {
    lang.value = lang.value === 'en' ? 'es' : 'en'
    localStorage.setItem('lang', lang.value)
  }

  const context: I18nContext = { lang, t, toggleLang }
  provide(I18N_KEY, context)

  return context
}

export function useI18n(): I18nContext {
  const context = inject(I18N_KEY)
  if (!context) {
    throw new Error('useI18n() must be used within a component that calls provideI18n()')
  }
  return context
}
