<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowUpRight } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'
import { useInView } from '@/composables/useInView'
import { siteConfig } from '@/data/site'

const { t } = useI18n()
const contentRef = ref<HTMLElement | null>(null)
const isInView = useInView(contentRef, { rootMargin: '-50px' })

const heading1Letters = computed(() => t.value.contactHeading1.split(''))
const heading2Letters = computed(() => t.value.contactHeading2.split(''))
</script>

<template>
  <section
    id="contact"
    class="py-32 px-6 md:px-16 lg:px-24 min-h-[70vh] flex flex-col justify-center relative overflow-hidden"
  >
    <!-- Background glow -->
    <div
      class="absolute inset-0 pointer-events-none opacity-[0.03]"
      style="
        background: radial-gradient(
          ellipse at 20% 80%,
          var(--accent-blue) 0%,
          transparent 50%
        );
      "
    />

    <div
      ref="contentRef"
      class="max-w-5xl mx-auto relative transition-opacity duration-800"
      :class="isInView ? 'opacity-100' : 'opacity-0'"
    >
      <!-- Section label -->
      <p
        class="text-muted-foreground tracking-[0.3em] uppercase mb-10 transition-all duration-500"
        :class="isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'"
        style="font-family: 'Space Mono', monospace; font-size: 0.7rem"
      >
        <span class="text-accent-blue mr-2">&mdash;</span>
        {{ t.contactLabel }}
      </p>

      <!-- Animated heading -->
      <h2
        class="text-muted-foreground/40"
        style="
          font-family: 'Inter', sans-serif;
          font-size: clamp(1.5rem, 5vw, 3rem);
          font-weight: 300;
          line-height: 1.3;
        "
      >
        <span
          v-for="(char, i) in heading1Letters"
          :key="'h1-' + i"
          class="inline-block transition-all duration-400"
          :class="isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'"
          :style="{ transitionDelay: `${0.2 + i * 0.02}s` }"
        >
          {{ char === ' ' ? '\u00A0' : char }}
        </span>
        <br />
        <span class="text-foreground">
          <span
            v-for="(char, i) in heading2Letters"
            :key="'h2-' + i"
            class="inline-block transition-all duration-400"
            :class="isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'"
            :style="{ transitionDelay: `${0.4 + i * 0.03}s` }"
          >
            {{ char === ' ' ? '\u00A0' : char }}
          </span>
        </span>
      </h2>

      <!-- Description -->
      <p
        class="mt-8 text-muted-foreground/70 max-w-md transition-all duration-600"
        :class="
          isInView
            ? 'opacity-100 translate-y-0 blur-0'
            : 'opacity-0 translate-y-[15px] blur-[4px]'
        "
        style="
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
          font-weight: 300;
          line-height: 1.8;
          transition-delay: 0.5s;
        "
      >
        {{ t.contactDesc }}
      </p>

      <!-- Links -->
      <div class="mt-14 flex flex-wrap gap-8">
        <a
          v-for="(link, i) in siteConfig.contactLinks"
          :key="link.label"
          :href="link.href"
          :target="link.href.startsWith('mailto') ? undefined : '_blank'"
          :rel="link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'"
          class="group relative flex items-center gap-2 text-muted-foreground hover:text-accent-blue transition-all duration-300 hover:translate-x-1 hover:scale-105 active:scale-95"
          :class="isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'"
          :style="{
            fontFamily: '\'Space Mono\', monospace',
            fontSize: '0.8rem',
            transitionDelay: `${0.6 + i * 0.1}s`,
          }"
        >
          {{ link.label }}
          <ArrowUpRight
            class="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
          />
          <span
            class="absolute -bottom-1 left-0 right-0 h-px bg-accent-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
          />
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div
      class="mt-32 max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-opacity duration-600 w-full"
      :class="isInView ? 'opacity-100' : 'opacity-0'"
      style="transition-delay: 1s"
    >
      <p
        class="text-muted-foreground/20"
        style="font-family: 'Space Mono', monospace; font-size: 0.65rem"
      >
        &copy; {{ siteConfig.copyrightYear }} &mdash; {{ t.footerRights }}
      </p>
      <p
        class="text-muted-foreground/20"
        style="font-family: 'Space Mono', monospace; font-size: 0.65rem"
      >
        {{ t.footerMade }}
      </p>
    </div>
  </section>
</template>
