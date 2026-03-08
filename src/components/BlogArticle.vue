<script setup lang="ts">
import { computed } from 'vue'
import { ArrowLeft, Clock, Calendar } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'
import { renderInlineMarkup } from '@/utils/renderInlineMarkup'
import CodeBlock from '@/components/CodeBlock.vue'
import type { BlogPostFull } from '@/data/blog'

const props = defineProps<{
  post: BlogPostFull
  title: string
  tag: string
  date: string
  readTime: number
}>()

const emit = defineEmits<{
  back: []
}>()

const { lang, t } = useI18n()
const content = computed(() => props.post.content[lang.value])
</script>

<template>
  <article class="animate-article-in">
    <!-- Back button -->
    <button
      class="flex items-center gap-2 text-muted-foreground/70 hover:text-accent-blue transition-colors duration-300 mb-10 cursor-pointer hover:-translate-x-1 active:scale-[0.97]"
      style="font-family: 'Space Mono', monospace; font-size: 0.75rem"
      @click="emit('back')"
    >
      <ArrowLeft class="w-4 h-4" />
      {{ t.blogBackToArticles }}
    </button>

    <!-- Cover image -->
    <div class="rounded-2xl overflow-hidden border border-foreground/5 mb-10 animate-article-cover">
      <img
        :src="post.cover"
        :alt="title"
        class="w-full h-56 md:h-80 object-cover"
        loading="lazy"
      />
    </div>

    <!-- Meta row -->
    <div class="flex flex-wrap items-center gap-4 mb-6 animate-article-meta">
      <span
        class="px-3 py-1 rounded-md border border-accent-blue/15 bg-accent-blue-subtle text-accent-blue"
        style="font-family: 'Space Mono', monospace; font-size: 0.65rem; letter-spacing: 0.05em"
      >
        {{ tag }}
      </span>
      <span
        class="flex items-center gap-1.5 text-muted-foreground/60"
        style="font-family: 'Space Mono', monospace; font-size: 0.65rem"
      >
        <Calendar class="w-3 h-3" />
        {{ date }}
      </span>
      <span
        class="flex items-center gap-1.5 text-muted-foreground/60"
        style="font-family: 'Space Mono', monospace; font-size: 0.65rem"
      >
        <Clock class="w-3 h-3" />
        {{ readTime }} {{ t.blogMinRead }}
      </span>
    </div>

    <!-- Title -->
    <h2
      class="mb-10 animate-article-title"
      style="
        font-family: 'Inter', sans-serif;
        font-size: clamp(1.5rem, 4vw, 2.25rem);
        font-weight: 300;
        line-height: 1.3;
        letter-spacing: -0.02em;
      "
    >
      {{ title }}
    </h2>

    <!-- Divider -->
    <div class="h-px bg-foreground/8 mb-10 animate-article-divider" />

    <!-- Content blocks -->
    <div class="space-y-5 max-w-none">
      <template v-for="(block, i) in content" :key="i">
        <!-- Paragraph -->
        <p
          v-if="block.type === 'paragraph'"
          class="text-muted-foreground/80"
          style="font-family: 'Inter', sans-serif; font-size: 0.95rem; font-weight: 300; line-height: 1.85"
          v-html="renderInlineMarkup(block.text)"
        />

        <!-- Heading -->
        <h3
          v-else-if="block.type === 'heading'"
          class="text-foreground mt-10 mb-4"
          style="font-family: 'Inter', sans-serif; font-size: 1.25rem; font-weight: 400; line-height: 1.4"
        >
          <span class="text-accent-blue mr-2">#</span>
          {{ block.text }}
        </h3>

        <!-- Code -->
        <CodeBlock
          v-else-if="block.type === 'code'"
          :code="block.code"
          :language="block.language"
          :filename="block.filename"
        />

        <!-- Image -->
        <figure v-else-if="block.type === 'image'" class="my-10">
          <div class="rounded-xl overflow-hidden border border-foreground/5">
            <img
              :src="block.src"
              :alt="block.alt"
              class="w-full h-56 md:h-72 object-cover"
              loading="lazy"
            />
          </div>
          <figcaption
            v-if="block.caption"
            class="mt-3 text-muted-foreground/50 text-center"
            style="font-family: 'Space Mono', monospace; font-size: 0.7rem; line-height: 1.6"
          >
            {{ block.caption }}
          </figcaption>
        </figure>

        <!-- Callout -->
        <div
          v-else-if="block.type === 'callout'"
          class="my-8 pl-5 border-l-2 border-accent-blue/40 py-4 pr-4 rounded-r-lg bg-accent-blue-subtle"
        >
          <p
            class="text-muted-foreground/80"
            style="font-family: 'Inter', sans-serif; font-size: 0.88rem; font-weight: 300; line-height: 1.8; font-style: italic"
            v-html="renderInlineMarkup(block.text)"
          />
        </div>

        <!-- List -->
        <ul v-else-if="block.type === 'list'" class="my-5 space-y-3 pl-1">
          <li
            v-for="(item, li) in block.items"
            :key="li"
            class="flex gap-3"
          >
            <span
              class="text-accent-blue mt-1 shrink-0"
              style="font-family: 'Space Mono', monospace; font-size: 0.75rem"
            >
              &bull;
            </span>
            <span
              class="text-muted-foreground/80"
              style="font-family: 'Inter', sans-serif; font-size: 0.9rem; font-weight: 300; line-height: 1.7"
              v-html="renderInlineMarkup(item)"
            />
          </li>
        </ul>
      </template>
    </div>

    <!-- End divider -->
    <div class="mt-16 mb-10 flex items-center gap-4">
      <div class="flex-1 h-px bg-foreground/5" />
      <span
        class="text-accent-blue"
        style="font-family: 'Space Mono', monospace; font-size: 0.7rem"
      >
        &mdash; EOF
      </span>
      <div class="flex-1 h-px bg-foreground/5" />
    </div>

    <!-- Back button bottom -->
    <button
      class="flex items-center gap-2 text-muted-foreground/70 hover:text-accent-blue transition-colors duration-300 cursor-pointer hover:-translate-x-1 active:scale-[0.97]"
      style="font-family: 'Space Mono', monospace; font-size: 0.75rem"
      @click="emit('back')"
    >
      <ArrowLeft class="w-4 h-4" />
      {{ t.blogBackToArticles }}
    </button>
  </article>
</template>

<style scoped>
.animate-article-in {
  animation: articleIn 0.4s ease-out both;
}

.animate-article-cover {
  animation: articleCover 0.6s ease-out 0.1s both;
}

.animate-article-meta {
  animation: articleFadeUp 0.5s ease-out 0.2s both;
}

.animate-article-title {
  animation: articleFadeUp 0.6s ease-out 0.25s both;
}

.animate-article-divider {
  animation: articleDivider 0.8s ease-out 0.3s both;
  transform-origin: left;
}

@keyframes articleIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes articleCover {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes articleFadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes articleDivider {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
</style>
