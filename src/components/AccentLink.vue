<script setup lang="ts">
defineProps<{
  href: string
  external?: boolean
}>()
</script>

<template>
  <a
    :href="href"
    :target="external !== false ? '_blank' : undefined"
    :rel="external !== false ? 'noopener noreferrer' : undefined"
    class="text-accent-blue hover:text-accent-blue/80 transition-colors duration-300 border-b border-accent-blue/30 hover:border-accent-blue"
  >
    <slot />
  </a>
</template>
