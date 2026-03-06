<script setup lang="ts">
import { ref } from 'vue'
import { Sun, Moon, Languages } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'
import { useTheme } from '@/composables/useTheme'
import { siteConfig } from '@/data/site'

const { t, lang, toggleLang } = useI18n()
const { isDark, toggleTheme } = useTheme()
const hoveredIndex = ref<number | null>(null)
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 px-6 md:px-16 lg:px-24 py-6 flex justify-between items-center animate-fade-in-down"
    style="backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px)"
  >
    <a
      href="#"
      class="hover:scale-105 active:scale-95 transition-transform duration-200"
      style="font-family: 'Space Mono', monospace; font-size: 0.8rem; letter-spacing: 0.1em"
    >
      {{ siteConfig.logo }}
    </a>

    <div class="hidden md:flex items-center gap-8">
      <a
        v-for="(item, i) in siteConfig.navItems"
        :key="item.href"
        :href="item.href"
        class="relative text-muted-foreground hover:text-foreground transition-colors duration-300"
        style="font-family: 'Space Mono', monospace; font-size: 0.7rem; letter-spacing: 0.05em"
        @mouseenter="hoveredIndex = i"
        @mouseleave="hoveredIndex = null"
      >
        {{ t[item.labelKey] }}
        <span
          v-if="hoveredIndex === i"
          class="absolute -bottom-1 left-0 right-0 h-px bg-accent-blue nav-underline"
        />
      </a>
    </div>

    <div class="flex items-center gap-3">
      <!-- Language toggle -->
      <button
        class="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer px-2 py-1 rounded-md hover:bg-foreground/5"
        :title="lang === 'en' ? 'Cambiar a Español' : 'Switch to English'"
        @click="toggleLang"
      >
        <Languages class="w-3.5 h-3.5" />
        <Transition name="lang-toggle" mode="out-in">
          <span
            :key="lang"
            style="font-family: 'Space Mono', monospace; font-size: 0.6rem; letter-spacing: 0.05em"
          >
            {{ lang === 'en' ? 'EN' : 'ES' }}
          </span>
        </Transition>
      </button>

      <!-- Theme toggle -->
      <button
        class="text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer p-1 rounded-md hover:bg-foreground/5 hover:scale-110 hover:rotate-15 active:scale-90"
        :title="isDark ? t.lightMode : t.darkMode"
        @click="toggleTheme"
      >
        <Transition name="theme-toggle" mode="out-in">
          <Sun v-if="isDark" :key="'sun'" class="w-4 h-4" />
          <Moon v-else :key="'moon'" class="w-4 h-4" />
        </Transition>
      </button>

      <!-- Available indicator -->
      <div
        class="w-2 h-2 rounded-full bg-green-500 animate-pulse-scale"
        :title="t.availableForProjects"
      />
    </div>
  </nav>
</template>

<style scoped>
.animate-fade-in-down {
  animation: fadeInDown 0.8s ease-out 1.2s both;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.nav-underline {
  animation: scaleIn 0.2s ease-out both;
}

@keyframes scaleIn {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

.lang-toggle-enter-active,
.lang-toggle-leave-active {
  transition: all 0.2s ease;
}

.lang-toggle-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.lang-toggle-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.theme-toggle-enter-active,
.theme-toggle-leave-active {
  transition: all 0.25s ease;
}

.theme-toggle-enter-from {
  opacity: 0;
  transform: rotate(-90deg) scale(0.5);
}

.theme-toggle-leave-to {
  opacity: 0;
  transform: rotate(90deg) scale(0.5);
}

.animate-pulse-scale {
  animation: pulseScale 2s ease-in-out infinite;
}

@keyframes pulseScale {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.6;
  }
}
</style>
