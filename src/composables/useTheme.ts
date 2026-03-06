import { ref } from 'vue'

export function useTheme() {
  const stored = localStorage.getItem('theme')
  const isDark = ref(stored !== 'light')

  // Apply initial theme
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }

  function toggleTheme() {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return { isDark, toggleTheme }
}
