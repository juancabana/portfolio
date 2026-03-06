<script setup lang="ts">
import { ref, computed } from 'vue'
import { Award } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'
import { useInView } from '@/composables/useInView'
import { techStack, categoryFilters } from '@/data/stack'
import type { TechCategory } from '@/data/stack'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const isInView = useInView(sectionRef, { rootMargin: '-50px' })
const activeFilter = ref<TechCategory>('all')

const filtered = computed(() =>
  activeFilter.value === 'all'
    ? techStack
    : techStack.filter((tech) => tech.categories.includes(activeFilter.value)),
)
</script>

<template>
  <section id="stack" class="py-32 px-6 md:px-16 lg:px-24">
    <div
      ref="sectionRef"
      class="transition-opacity duration-600"
      :class="isInView ? 'opacity-100' : 'opacity-0'"
    >
      <!-- Section header -->
      <div class="flex items-center gap-6 mb-12">
        <p
          class="text-muted-foreground tracking-[0.3em] uppercase transition-all duration-500"
          :class="isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'"
          style="font-family: 'Space Mono', monospace; font-size: 0.7rem"
        >
          <span class="text-accent-blue mr-2">&mdash;</span>
          {{ t.stackLabel }}
        </p>
        <div
          class="flex-1 h-px bg-foreground/5 transition-transform duration-800 origin-left"
          :class="isInView ? 'scale-x-100' : 'scale-x-0'"
          style="transition-delay: 0.2s"
        />
        <p
          class="text-muted-foreground/40 transition-opacity duration-500"
          :class="isInView ? 'opacity-100' : 'opacity-0'"
          style="font-family: 'Space Mono', monospace; font-size: 0.7rem; transition-delay: 0.4s"
        >
          {{ techStack.length }}+
        </p>
      </div>

      <!-- AWS Certificate Highlight -->
      <div
        class="mb-12 flex items-center gap-4 px-5 py-4 rounded-lg border border-accent-blue/20 bg-accent-blue-subtle cursor-default transition-all duration-300 hover:scale-[1.02] hover:border-accent-blue"
        :class="isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-5 scale-95'"
        style="transition-delay: 0.2s"
      >
        <div class="animate-icon-wobble">
          <Award class="w-6 h-6 text-accent-blue shrink-0" />
        </div>
        <div>
          <p style="font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 400">
            {{ t.awsCertTitle }}
          </p>
          <p
            class="text-muted-foreground/50 mt-0.5"
            style="font-family: 'Space Mono', monospace; font-size: 0.65rem"
          >
            {{ t.awsCertDesc }}
          </p>
        </div>
      </div>

      <!-- Filters -->
      <div
        class="flex flex-wrap gap-2 mb-10 transition-all duration-500"
        :class="isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2.5'"
        style="transition-delay: 0.3s"
      >
        <button
          v-for="(cat, i) in categoryFilters"
          :key="cat.key"
          class="px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
          :class="
            activeFilter === cat.key
              ? 'border-accent-blue/40 bg-accent-blue-subtle text-accent-blue'
              : 'border-foreground/8 text-muted-foreground/50 hover:text-foreground hover:border-foreground/20'
          "
          :style="{
            fontFamily: '\'Space Mono\', monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.02em',
            transitionDelay: isInView ? `${0.3 + i * 0.05}s` : '0s',
          }"
          @click="activeFilter = cat.key"
        >
          {{ t[cat.labelKey] }}
        </button>
      </div>

      <!-- Tech Grid -->
      <TransitionGroup name="tech-grid" tag="div" class="flex flex-wrap gap-2.5">
        <div
          v-for="tech in filtered"
          :key="tech.name"
          class="group px-4 py-2.5 rounded-lg border border-foreground/8 bg-foreground/[0.02] hover:bg-accent-blue-subtle hover:border-accent-blue hover:scale-[1.08] hover:-translate-y-0.5 transition-all duration-300 cursor-default"
        >
          <span style="font-family: 'Inter', sans-serif; font-size: 0.825rem; font-weight: 400">
            {{ tech.name }}
          </span>
        </div>
      </TransitionGroup>

      <!-- Count -->
      <p
        class="mt-8 text-muted-foreground/30 transition-opacity duration-500"
        :class="isInView ? 'opacity-100' : 'opacity-0'"
        style="font-family: 'Space Mono', monospace; font-size: 0.65rem; transition-delay: 0.8s"
      >
        {{ t.showingTech }} {{ filtered.length }} {{ t.ofTech }} {{ techStack.length }}
        {{ t.technologies }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.animate-icon-wobble {
  animation: iconWobble 3s ease-in-out infinite;
  animation-delay: 1s;
}

@keyframes iconWobble {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(10deg);
  }
  75% {
    transform: rotate(-10deg);
  }
}

/* Tech grid transition */
.tech-grid-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.tech-grid-leave-active {
  transition: all 0.3s ease-in;
  position: absolute;
}

.tech-grid-enter-from {
  opacity: 0;
  transform: scale(0.7);
  filter: blur(4px);
}

.tech-grid-leave-to {
  opacity: 0;
  transform: scale(0.7);
  filter: blur(4px);
}

.tech-grid-move {
  transition: transform 0.3s ease;
}
</style>
