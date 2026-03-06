<script setup lang="ts">
import { provideI18n } from '@/composables/useI18n'
import NavBar from '@/components/NavBar.vue'

provideI18n()
</script>

<template>
  <div
    class="min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background overflow-x-hidden"
    style="font-family: 'Inter', sans-serif"
  >
    <NavBar />
    <main>
      <!-- Sections will be added here -->
    </main>
  </div>
</template>
