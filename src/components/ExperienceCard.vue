<script setup lang="ts">
import { ref, computed } from 'vue'
import { ChevronDown, Briefcase, Sparkles, ExternalLink } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'
import { useInView } from '@/composables/useInView'
import { highlightText } from '@/utils/renderInlineMarkup'
import type { Experience } from '@/data/experience'

const props = defineProps<{
  experience: Experience
  index: number
  isLast: boolean
}>()

const { t } = useI18n()
const cardRef = ref<HTMLElement | null>(null)
const isInView = useInView(cardRef, { rootMargin: '-80px' })

const isCurrent = computed(() => props.experience.status === 'current')
const expanded = ref(props.experience.status === 'current')

function toggleExpanded() {
  expanded.value = !expanded.value
}
</script>

<template>
  <div ref="cardRef" class="relative grid grid-cols-[auto_1fr] gap-6 md:gap-10">
    <!-- Timeline column -->
    <div class="relative flex flex-col items-center">
      <!-- Timeline node -->
      <div class="relative flex items-center justify-center">
        <!-- Glow ring for current -->
        <div
          v-if="isCurrent"
          class="absolute w-10 h-10 rounded-full animate-node-glow"
          style="
            background: radial-gradient(circle, var(--accent-blue) 0%, transparent 70%);
            opacity: 0.15;
          "
        />
        <div
          class="relative z-10 rounded-full border-2 transition-transform duration-500"
          :class="[
            isCurrent
              ? 'w-4 h-4 bg-accent-blue border-accent-blue shadow-[0_0_12px_var(--accent-blue-muted)]'
              : 'w-3 h-3 bg-background border-foreground/20',
            isInView ? 'scale-100 rotate-0' : 'scale-0 -rotate-180',
          ]"
          :style="{ transitionDelay: `${0.3 + index * 0.2}s` }"
        />
      </div>

      <!-- Connecting line -->
      <div
        v-if="!isLast"
        class="w-px flex-1 mt-2 origin-top transition-transform duration-1000"
        :class="isInView ? 'scale-y-100' : 'scale-y-0'"
        :style="{
          background: isCurrent
            ? 'linear-gradient(to bottom, var(--accent-blue), var(--accent-blue-muted), transparent)'
            : 'linear-gradient(to bottom, var(--foreground) 0%, transparent 100%)',
          opacity: isCurrent ? 0.4 : 0.08,
          transitionDelay: `${0.5 + index * 0.2}s`,
        }"
      />
    </div>

    <!-- Content -->
    <div
      class="transition-all duration-700"
      :class="[
        isInView ? 'opacity-100 translate-x-0 blur-0' : 'opacity-0 -translate-x-[30px] blur-[4px]',
        !isLast ? 'pb-14' : 'pb-0',
      ]"
      :style="{ transitionDelay: `${0.2 + index * 0.15}s` }"
    >
      <!-- Current role banner -->
      <div
        v-if="isCurrent"
        class="mb-5 inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-accent-blue/25 bg-accent-blue-subtle cursor-default hover:scale-[1.03] transition-transform duration-300"
        :class="isInView ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-2.5 scale-90'"
        style="transition-delay: 0.5s"
      >
        <div class="animate-sparkle-rotate">
          <Sparkles class="w-3.5 h-3.5 text-accent-blue" :stroke-width="2.5" />
        </div>
        <span
          class="text-accent-blue"
          style="font-family: 'Space Mono', monospace; font-size: 0.65rem; letter-spacing: 0.08em"
        >
          {{ t.openToFreelance }}
        </span>
        <span class="w-1.5 h-1.5 rounded-full bg-accent-blue animate-badge-pulse" />
      </div>

      <!-- Header row -->
      <div class="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-6">
        <div class="flex items-center gap-3">
          <div
            v-if="isCurrent"
            class="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-accent-blue-subtle border border-accent-blue/15 hover:scale-110 hover:rotate-5 transition-transform duration-200"
          >
            <Briefcase class="w-4 h-4 text-accent-blue" />
          </div>
          <h3
            class="transition-colors duration-300 hover:translate-x-1"
            :style="{
              fontFamily: '\'Inter\', sans-serif',
              fontSize: isCurrent ? '1.35rem' : '1.15rem',
              fontWeight: isCurrent ? 400 : 300,
            }"
          >
            {{ t[experience.companyKey] }}
          </h3>
        </div>
        <span
          class="text-muted-foreground/40 transition-opacity duration-500"
          :class="isInView ? 'opacity-100' : 'opacity-0'"
          :style="{
            fontFamily: '\'Space Mono\', monospace',
            fontSize: '0.7rem',
            transitionDelay: `${0.6 + index * 0.15}s`,
          }"
        >
          {{ t[experience.periodKey] }}
        </span>
      </div>

      <!-- Role + duration -->
      <div
        class="flex items-center gap-3 mt-2 transition-all duration-500"
        :class="isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2.5'"
        :style="{ transitionDelay: `${0.4 + index * 0.15}s` }"
      >
        <p
          :class="isCurrent ? 'text-accent-blue/80' : 'text-muted-foreground/60'"
          style="font-family: 'Space Mono', monospace; font-size: 0.75rem"
        >
          {{ t[experience.roleKey] }}
        </p>
        <span
          class="text-muted-foreground/25"
          style="font-family: 'Space Mono', monospace; font-size: 0.65rem"
        >
          &middot;
        </span>
        <span
          class="text-muted-foreground/30"
          style="font-family: 'Space Mono', monospace; font-size: 0.65rem"
        >
          {{ t[experience.durationKey] }}
        </span>
      </div>

      <!-- Description -->
      <p
        class="text-muted-foreground/70 mt-4 max-w-lg transition-opacity duration-500"
        :class="isInView ? 'opacity-100' : 'opacity-0'"
        :style="{
          fontFamily: '\'Inter\', sans-serif',
          fontSize: '0.875rem',
          fontWeight: 300,
          lineHeight: 1.7,
          transitionDelay: `${0.5 + index * 0.15}s`,
        }"
        v-html="highlightText(t[experience.descKey], experience.highlightLinks)"
      />

      <!-- Marketing line for current role -->
      <p
        v-if="isCurrent"
        class="mt-3 text-muted-foreground/40 italic transition-all duration-500"
        :class="isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2.5'"
        style="
          font-family: 'Inter', sans-serif;
          font-size: 0.8rem;
          font-weight: 300;
          line-height: 1.6;
          transition-delay: 0.8s;
        "
      >
        {{ t.fullTimeNote }}
      </p>

      <!-- Projects toggle -->
      <button
        class="mt-5 flex items-center gap-2 text-muted-foreground/50 hover:text-accent-blue transition-colors duration-300 cursor-pointer hover:translate-x-1 active:scale-[0.97]"
        style="font-family: 'Space Mono', monospace; font-size: 0.7rem"
        @click="toggleExpanded"
      >
        {{ expanded ? t.hideProjects : t.showProjects }} {{ t.projectsWord }}
        ({{ experience.projects.length }})
        <ChevronDown
          class="w-3.5 h-3.5 transition-transform duration-300"
          :class="expanded ? 'rotate-180' : 'rotate-0'"
        />
      </button>

      <!-- Projects -->
      <Transition name="expand">
        <div v-if="expanded" class="overflow-hidden">
          <div class="mt-6 space-y-6">
            <div
              v-for="(project, pi) in experience.projects"
              :key="t[project.nameKey]"
              class="pl-4 border-l border-accent-blue/20 hover:border-accent-blue/50 transition-all duration-300 hover:pl-5"
              :style="{
                opacity: expanded ? 1 : 0,
                transform: expanded ? 'translateX(0)' : 'translateX(-20px)',
                transition: `all 0.4s ease ${pi * 0.1}s`,
              }"
            >
              <a
                :href="project.url"
                target="_blank"
                rel="noopener noreferrer"
                class="group/link inline-flex items-center gap-2 hover:text-accent-blue transition-colors duration-300"
              >
                <h4
                  style="font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 400"
                >
                  {{ t[project.nameKey] }}
                </h4>
                <ExternalLink
                  class="w-3 h-3 text-accent-blue opacity-0 group-hover/link:opacity-100 transition-opacity duration-200"
                />
              </a>
              <p
                class="text-muted-foreground/70 mt-1.5 max-w-md"
                style="
                  font-family: 'Inter', sans-serif;
                  font-size: 0.8rem;
                  font-weight: 300;
                  line-height: 1.6;
                "
              >
                {{ t[project.descKey] }}
              </p>
              <div class="flex flex-wrap gap-1.5 mt-3">
                <span
                  v-for="(tag, ti) in project.tags"
                  :key="tag"
                  class="inline-block px-2.5 py-1 rounded-md border border-accent-blue/10 bg-accent-blue-subtle text-muted-foreground/70 hover:text-accent-blue hover:border-accent-blue/25 hover:scale-110 transition-all duration-200 cursor-default"
                  :style="{
                    fontFamily: '\'Space Mono\', monospace',
                    fontSize: '0.6rem',
                    letterSpacing: '0.02em',
                    animationDelay: `${ti * 0.05}s`,
                  }"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.animate-node-glow {
  animation: nodeGlow 3s ease-in-out infinite;
}

@keyframes nodeGlow {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.15;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.08;
  }
}

.animate-sparkle-rotate {
  animation: sparkleRotate 2s ease-in-out infinite;
}

@keyframes sparkleRotate {
  0%,
  100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(15deg);
  }
  75% {
    transform: rotate(-15deg);
  }
}

.animate-badge-pulse {
  animation: badgePulse 1.5s ease-in-out infinite;
}

@keyframes badgePulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.4;
  }
}

/* Expand transition */
.expand-enter-active {
  transition: all 0.5s ease-in-out;
  max-height: 2000px;
}

.expand-leave-active {
  transition: all 0.5s ease-in-out;
  max-height: 2000px;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
  max-height: 2000px;
  opacity: 1;
}
</style>
