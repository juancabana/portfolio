<script setup lang="ts">
import { ref } from 'vue'
import { ArrowDown, Award } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'
import { siteConfig } from '@/data/site'
import profileImg from '@/assets/profile.png'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
</script>

<template>
  <section
    ref="sectionRef"
    class="min-h-screen flex flex-col justify-center relative px-6 md:px-16 lg:px-24 pt-24 overflow-hidden"
  >
    <!-- Floating particles -->
    <div
      v-for="(particle, i) in siteConfig.floatingParticles"
      :key="i"
      class="absolute rounded-full bg-accent-blue/20 pointer-events-none animate-float"
      :style="{
        left: particle.x,
        top: particle.y,
        width: `${particle.size}px`,
        height: `${particle.size}px`,
        animationDelay: `${particle.delay}s`,
        animationDuration: `${4 + particle.delay}s`,
      }"
    />

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
      <!-- Text Content -->
      <div class="lg:col-span-7 order-2 lg:order-1">
        <p
          class="text-muted-foreground mb-6 tracking-[0.3em] uppercase animate-slide-in-left"
          style="font-family: 'Space Mono', monospace; font-size: 0.75rem; animation-delay: 0.2s"
        >
          {{ t.heroSubtitle }}
        </p>

        <h1
          style="
            font-family: 'Inter', sans-serif;
            font-size: clamp(2.5rem, 8vw, 6rem);
            font-weight: 300;
            line-height: 1.05;
            letter-spacing: -0.03em;
          "
        >
          <span class="inline-block animate-word" style="animation-delay: 0.4s">
            {{ t.heroLine1 }}
          </span>
          <br />
          <span class="inline-block animate-word" style="animation-delay: 0.55s">
            {{ t.heroLine2 }}
          </span>
          <span
            class="inline-block w-3 h-3 md:w-4 md:h-4 bg-accent-blue rounded-full ml-2 align-middle animate-dot-pop"
            style="animation-delay: 0.9s"
          />
          <span
            class="inline-block w-3 h-3 md:w-4 md:h-4 bg-accent-blue rounded-full ml-2 align-middle animate-dot-pulse"
          />
          <br />
          <span class="text-muted-foreground">
            <span class="inline-block animate-word" style="animation-delay: 0.7s">
              {{ t.heroLine3 }}
            </span>
          </span>
        </h1>

        <!-- Stats line -->
        <div
          class="mt-12 flex items-center gap-4 overflow-hidden animate-fade-in"
          style="animation-delay: 1s"
        >
          <div class="w-16 h-px bg-accent-blue/40 animate-scale-x" style="animation-delay: 1.1s" />
          <p
            class="text-muted-foreground max-w-xs animate-slide-in-right"
            style="
              font-family: 'Space Mono', monospace;
              font-size: 0.75rem;
              line-height: 1.6;
              animation-delay: 1.2s;
            "
          >
            {{ t.heroStats }}
          </p>
        </div>

        <!-- AWS Certificate Badge -->
        <div
          class="mt-8 inline-flex items-center gap-3 px-4 py-3 rounded-lg border border-accent-blue/20 bg-accent-blue-subtle cursor-default transition-all duration-300 hover:scale-[1.03] hover:border-accent-blue animate-slide-up"
          style="animation-delay: 1.4s"
        >
          <div class="animate-icon-wobble">
            <Award class="w-5 h-5 text-accent-blue shrink-0" />
          </div>
          <div>
            <p style="font-family: 'Inter', sans-serif; font-size: 0.8rem; font-weight: 400">
              {{ t.awsBadgeTitle }}
            </p>
            <p
              class="text-muted-foreground/50"
              style="font-family: 'Space Mono', monospace; font-size: 0.6rem"
            >
              {{ t.awsBadgeSubtitle }}
            </p>
          </div>
        </div>
      </div>

      <!-- Photo with edge stats -->
      <div class="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
        <div
          class="relative py-6 px-8 sm:py-8 sm:px-10 animate-photo-reveal"
          style="animation-delay: 0.6s"
        >
          <!-- Glow behind photo -->
          <div
            class="absolute inset-8 rounded-2xl blur-3xl pointer-events-none animate-glow-pulse"
            style="
              background: radial-gradient(
                ellipse at center,
                var(--accent-blue) 0%,
                transparent 70%
              );
            "
          />

          <!-- Main photo -->
          <div
            class="w-60 h-80 sm:w-68 sm:h-[22rem] md:w-76 md:h-[26rem] lg:w-[20rem] lg:h-[28rem] rounded-2xl overflow-hidden relative ring-1 ring-accent-blue/10 hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              :src="profileImg"
              alt="Profile photo"
              class="w-full h-full object-cover object-top"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />
          </div>

          <!-- Left edge — Years -->
          <div
            class="absolute left-0 top-1/3 -translate-y-1/2 bg-background/90 border border-accent-blue/15 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 backdrop-blur-sm shadow-sm hover:scale-[1.08] hover:-translate-x-1 transition-all duration-300 animate-stat-left"
            style="animation-delay: 1.2s"
          >
            <p
              class="text-accent-blue"
              style="font-family: 'Inter', sans-serif; font-size: 1.5rem; font-weight: 300; line-height: 1"
            >
              {{ siteConfig.heroStats.years.value }}
            </p>
            <p
              class="text-muted-foreground/60 mt-1"
              style="font-family: 'Space Mono', monospace; font-size: 0.55rem; letter-spacing: 0.05em"
            >
              {{ t[siteConfig.heroStats.years.labelKey] }}
            </p>
          </div>

          <!-- Right edge — Projects -->
          <div
            class="absolute right-0 top-[55%] bg-background/90 border border-accent-blue/15 rounded-xl px-3.5 py-2.5 sm:px-4 sm:py-3 backdrop-blur-sm shadow-sm hover:scale-[1.08] hover:translate-x-1 transition-all duration-300 animate-stat-right"
            style="animation-delay: 1.4s"
          >
            <p
              class="text-accent-blue text-right"
              style="font-family: 'Inter', sans-serif; font-size: 1.5rem; font-weight: 300; line-height: 1"
            >
              {{ siteConfig.heroStats.projects.value }}
            </p>
            <p
              class="text-muted-foreground/60 mt-1 text-right"
              style="font-family: 'Space Mono', monospace; font-size: 0.55rem; letter-spacing: 0.05em"
            >
              {{ t[siteConfig.heroStats.projects.labelKey] }}
            </p>
          </div>

          <!-- Bottom center — Companies + Open -->
          <div
            class="absolute bottom-0 left-1/2 -translate-x-1/2 bg-background/90 border border-accent-blue/15 rounded-xl px-5 py-2.5 sm:px-6 sm:py-3 backdrop-blur-sm shadow-sm flex items-center gap-4 hover:scale-105 hover:translate-y-1 transition-all duration-300 animate-stat-bottom"
            style="animation-delay: 1.6s"
          >
            <div class="text-center">
              <p
                class="text-accent-blue"
                style="font-family: 'Inter', sans-serif; font-size: 1.25rem; font-weight: 300; line-height: 1"
              >
                {{ siteConfig.heroStats.companies.value }}
              </p>
              <p
                class="text-muted-foreground/60 mt-1"
                style="font-family: 'Space Mono', monospace; font-size: 0.55rem; letter-spacing: 0.05em"
              >
                {{ t[siteConfig.heroStats.companies.labelKey] }}
              </p>
            </div>
            <div class="w-px h-6 bg-accent-blue/15" />
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-accent-blue animate-dot-pulse" />
              <p
                class="text-accent-blue/80"
                style="font-family: 'Space Mono', monospace; font-size: 0.55rem; letter-spacing: 0.05em"
              >
                {{ t.openToWork }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-12 left-6 md:left-16 lg:left-24 animate-bounce-slow">
      <ArrowDown class="w-5 h-5 text-muted-foreground" />
    </div>
  </section>
</template>

<style scoped>
/* Word animation */
.animate-word {
  opacity: 0;
  animation: wordReveal 0.7s ease-out forwards;
}

@keyframes wordReveal {
  from {
    opacity: 0;
    transform: translateY(40px);
    filter: blur(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0);
  }
}

/* Slide animations */
.animate-slide-in-left {
  opacity: 0;
  animation: slideInLeft 0.6s ease-out forwards;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-right {
  opacity: 0;
  animation: slideInRight 0.6s ease-out forwards;
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-up {
  opacity: 0;
  animation: slideUp 0.6s ease-out forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Fade in */
.animate-fade-in {
  opacity: 0;
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Scale X (line) */
.animate-scale-x {
  transform: scaleX(0);
  transform-origin: left;
  animation: scaleX 0.6s ease-out forwards;
}

@keyframes scaleX {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

/* Dot pop */
.animate-dot-pop {
  opacity: 0;
  animation: dotPop 0.5s ease-out forwards;
}

@keyframes dotPop {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  60% {
    transform: scale(1.3);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Dot pulse */
.animate-dot-pulse {
  animation: dotPulse 2s ease-in-out infinite;
}

@keyframes dotPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
}

/* Floating particles */
.animate-float {
  animation: float 4s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.15;
  }
  50% {
    transform: translateY(-20px);
    opacity: 0.4;
  }
}

/* Photo reveal */
.animate-photo-reveal {
  opacity: 0;
  animation: photoReveal 1.2s ease-out forwards;
}

@keyframes photoReveal {
  from {
    opacity: 0;
    transform: scale(0.9) rotate(-2deg);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

/* Glow pulse */
.animate-glow-pulse {
  animation: glowPulse 4s ease-in-out infinite;
}

@keyframes glowPulse {
  0%,
  100% {
    opacity: 0.15;
    transform: scale(1);
  }
  50% {
    opacity: 0.25;
    transform: scale(1.05);
  }
}

/* Stat badges */
.animate-stat-left {
  opacity: 0;
  animation: statLeft 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes statLeft {
  from {
    opacity: 0;
    transform: translateX(-40px) translateY(-50%) rotate(-5deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(-50%) rotate(0deg);
  }
}

.animate-stat-right {
  opacity: 0;
  animation: statRight 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes statRight {
  from {
    opacity: 0;
    transform: translateX(40px) rotate(5deg);
  }
  to {
    opacity: 1;
    transform: translateX(0) rotate(0deg);
  }
}

.animate-stat-bottom {
  opacity: 0;
  animation: statBottom 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes statBottom {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

/* Icon wobble */
.animate-icon-wobble {
  animation: iconWobble 3s ease-in-out infinite;
  animation-delay: 2s;
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

/* Bounce slow */
.animate-bounce-slow {
  animation: bounceSlow 2.5s ease-in-out infinite;
}

@keyframes bounceSlow {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(10px);
  }
}
</style>
