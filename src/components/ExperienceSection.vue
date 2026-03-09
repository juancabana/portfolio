<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { useInView } from '@/composables/useInView'
import { experiences } from '@/data/experience'
import ExperienceCard from '@/components/ExperienceCard.vue'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const isInView = useInView(sectionRef, { rootMargin: '-50px' })
</script>

<template>
  <section id="experience" class="py-32 px-6 md:px-16 lg:px-24">
    <div
      ref="sectionRef"
      class="max-w-5xl mx-auto transition-opacity duration-600"
      :class="isInView ? 'opacity-100' : 'opacity-0'"
    >
      <!-- Section header -->
      <div class="flex items-center gap-6 mb-6">
        <p
          class="text-muted-foreground tracking-[0.3em] uppercase transition-all duration-500"
          :class="isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'"
          style="font-family: 'Space Mono', monospace; font-size: 0.7rem"
        >
          <span class="text-accent-blue mr-2">&mdash;</span>
          {{ t.expSectionLabel }}
        </p>
        <div
          class="flex-1 h-px bg-foreground/5 transition-transform duration-800 origin-left"
          :class="isInView ? 'scale-x-100' : 'scale-x-0'"
          style="transition-delay: 0.2s"
        />
      </div>

      <!-- Marketing subtitle -->
      <p
        class="text-muted-foreground/70 mb-8 max-w-md transition-all duration-600"
        :class="isInView ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-2.5 blur-[4px]'"
        style="
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          font-weight: 300;
          line-height: 1.6;
          transition-delay: 0.2s;
        "
      >
        {{ t.expSubtitle1 }}
        <br />
        {{ t.expSubtitle2 }}
      </p>

      <!-- Introduction -->
      <div
        class="mb-16 max-w-2xl space-y-4 transition-all duration-700"
        :class="isInView ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-3 blur-[4px]'"
        style="transition-delay: 0.3s"
      >
        <p
          class="text-muted-foreground/60"
          style="
            font-family: 'Inter', sans-serif;
            font-size: 0.85rem;
            font-weight: 300;
            line-height: 1.7;
          "
        >
          {{ t.expIntro1 }}
        </p>
        <p
          class="text-muted-foreground/60"
          style="
            font-family: 'Inter', sans-serif;
            font-size: 0.85rem;
            font-weight: 300;
            line-height: 1.7;
          "
        >
          {{ t.expIntro2 }}
        </p>
        <p
          class="text-muted-foreground/60"
          style="
            font-family: 'Inter', sans-serif;
            font-size: 0.85rem;
            font-weight: 300;
            line-height: 1.7;
          "
        >
          {{ t.expIntro3 }}
        </p>
        <p
          class="text-muted-foreground/60"
          style="
            font-family: 'Inter', sans-serif;
            font-size: 0.85rem;
            font-weight: 300;
            line-height: 1.7;
          "
        >
          {{ t.expIntro4 }}
        </p>
      </div>

      <!-- Timeline -->
      <div class="max-w-3xl">
        <ExperienceCard
          v-for="(exp, i) in experiences"
          :key="exp.id"
          :experience="exp"
          :index="i"
          :is-last="i === experiences.length - 1"
        />
      </div>
    </div>
  </section>
</template>
