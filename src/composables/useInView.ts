import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useInView(
  target: Ref<HTMLElement | null>,
  options: UseInViewOptions = {},
) {
  const { threshold = 0.1, rootMargin = '-80px', once = true } = options
  const isInView = ref(false)
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    if (!target.value) return

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          if (entry.isIntersecting) {
            isInView.value = true
            if (once && observer && target.value) {
              observer.unobserve(target.value)
            }
          } else if (!once) {
            isInView.value = false
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(target.value)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return isInView
}
