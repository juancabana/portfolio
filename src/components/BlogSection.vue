<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowUpRight, Clock } from 'lucide-vue-next'
import { useI18n } from '@/composables/useI18n'
import { useInView } from '@/composables/useInView'
import { highlightText } from '@/utils/renderInlineMarkup'
import { blogArticles, blogPostsMeta } from '@/data/blog'
import BlogArticle from '@/components/BlogArticle.vue'

const { t } = useI18n()
const sectionRef = ref<HTMLElement | null>(null)
const isInView = useInView(sectionRef, { rootMargin: '-50px' })
const activeArticleId = ref<number | null>(null)

const activeArticle = computed(() =>
  activeArticleId.value !== null
    ? blogArticles.find((a) => a.id === activeArticleId.value) ?? null
    : null,
)

const activePost = computed(() =>
  activeArticleId.value !== null
    ? blogPostsMeta.find((p) => p.id === activeArticleId.value) ?? null
    : null,
)

function handleOpen(id: number) {
  activeArticleId.value = id
  const el = document.getElementById('blog')
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

function handleBack() {
  activeArticleId.value = null
  const el = document.getElementById('blog')
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 100
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
</script>

<template>
  <section id="blog" class="py-32 px-6 md:px-16 lg:px-24">
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
          {{ t.blogLabel }}
        </p>
        <div
          class="flex-1 h-px bg-foreground/5 transition-transform duration-800 origin-left"
          :class="isInView ? 'scale-x-100' : 'scale-x-0'"
          style="transition-delay: 0.2s"
        />
      </div>

      <!-- Article detail view -->
      <template v-if="activeArticle && activePost">
        <BlogArticle
          :post="activeArticle"
          :title="t[activePost.titleKey]"
          :tag="t[activePost.tagKey]"
          :date="t[activePost.dateKey]"
          :read-time="activePost.readTime"
          @back="handleBack"
        />
      </template>

      <!-- Blog grid view -->
      <template v-else>
        <!-- Subtitle -->
        <p
          class="text-muted-foreground/70 mb-14 max-w-md transition-all duration-600"
          :class="isInView ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-2.5 blur-[4px]'"
          style="
            font-family: 'Inter', sans-serif;
            font-size: 0.9rem;
            font-weight: 300;
            line-height: 1.6;
            transition-delay: 0.2s;
          "
        >
          {{ t.blogSubtitle }}
        </p>

        <!-- Posts grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="(post, i) in blogPostsMeta"
            :key="post.id"
            class="group rounded-xl border border-foreground/8 bg-foreground/[0.02] hover:border-accent-blue/30 hover:bg-accent-blue-subtle transition-all duration-300 overflow-hidden"
            :class="isInView ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-[30px] blur-[4px]'"
            :style="{
              transitionDelay: `${0.2 + i * 0.12}s`,
              transitionDuration: '0.6s',
            }"
          >
            <!-- Cover image -->
            <div
              class="relative h-44 overflow-hidden cursor-pointer"
              @click="handleOpen(post.id)"
            >
              <img
                :src="blogArticles.find((a) => a.id === post.id)?.cover"
                :alt="t[post.titleKey]"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              <span
                class="absolute bottom-3 left-4 px-2.5 py-1 rounded-md border border-accent-blue/20 bg-background/80 backdrop-blur-sm text-accent-blue"
                style="font-family: 'Space Mono', monospace; font-size: 0.6rem; letter-spacing: 0.05em"
              >
                {{ t[post.tagKey] }}
              </span>
            </div>

            <!-- Content -->
            <div class="p-6 md:p-7">
              <!-- Date + read time -->
              <div class="flex items-center gap-3 mb-4">
                <span
                  class="flex items-center gap-1.5 text-muted-foreground/60"
                  style="font-family: 'Space Mono', monospace; font-size: 0.6rem"
                >
                  <Clock class="w-3 h-3" />
                  {{ post.readTime }} {{ t.blogMinRead }}
                </span>
                <span
                  class="text-muted-foreground/40"
                  style="font-family: 'Space Mono', monospace; font-size: 0.6rem"
                >
                  &middot;
                </span>
                <span
                  class="text-muted-foreground/50"
                  style="font-family: 'Space Mono', monospace; font-size: 0.6rem"
                >
                  {{ t[post.dateKey] }}
                </span>
              </div>

              <!-- Title -->
              <h3
                class="group-hover:text-accent-blue transition-colors duration-300 cursor-pointer"
                style="font-family: 'Inter', sans-serif; font-size: 1.05rem; font-weight: 400; line-height: 1.4"
                @click="handleOpen(post.id)"
              >
                {{ t[post.titleKey] }}
              </h3>

              <!-- Excerpt with highlighted keywords -->
              <p
                class="text-muted-foreground/70 mt-3"
                style="font-family: 'Inter', sans-serif; font-size: 0.83rem; font-weight: 300; line-height: 1.7"
                v-html="highlightText(t[post.excerptKey], post.highlightLinks)"
              />

              <!-- Read more -->
              <button
                class="mt-5 inline-flex items-center gap-2 text-muted-foreground/60 hover:text-accent-blue transition-colors duration-300 cursor-pointer"
                @click="handleOpen(post.id)"
              >
                <span style="font-family: 'Space Mono', monospace; font-size: 0.7rem; letter-spacing: 0.02em">
                  {{ t.readMore }}
                </span>
                <ArrowUpRight class="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </section>
</template>
