<script setup lang="ts">
import { provideI18n } from '@/composables/useI18n'
import NavBar from '@/components/NavBar.vue'
import HeroSection from '@/components/HeroSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import StackSection from '@/components/StackSection.vue'
import ContactSection from '@/components/ContactSection.vue'

provideI18n()
</script>

<template>
  <div
    class="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background overflow-x-hidden"
    style="font-family: 'Inter', sans-serif"
  >
    <NavBar />
    <main>
      <HeroSection />
      <ExperienceSection />
      <StackSection />
      <ContactSection />
    </main>
  </div>
</template>
