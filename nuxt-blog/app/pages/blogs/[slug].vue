<template>
  <div>
    <div v-if="pending" class="container">
      <div class="loading"><span class="spinner"></span> Loading post...</div>
    </div>

    <template v-else-if="post">
      <!-- Post hero -->
      <div class="post-hero">
        <div class="post-hero-inner">
          <span class="category-badge">{{ post.category }}</span>
          <h1 class="post-title">{{ post.title }}</h1>
          <p class="post-meta">By <strong>{{ post.author }}</strong></p>
        </div>
      </div>

      <!-- Post body -->
      <div class="container">
        <NuxtLink to="/" class="back-link">← Back to all posts</NuxtLink>
        <article class="content" v-html="renderedContent"></article>
      </div>
    </template>

    <div v-else class="container">
      <p class="empty">Post not found.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'

const route = useRoute()
const config = useRuntimeConfig()
const base = config.public.strapiBase

const { data, pending } = await useFetch(
  `${base}/api/posts?filters[slug][$eq]=${route.params.slug}&populate=*`
)

const post = computed(() => {
  const items = data.value?.data ?? []
  if (items.length === 0) return null
  return { id: items[0].id, ...items[0].attributes }
})

const renderedContent = computed(() =>
  post.value ? marked(post.value.content) : ''
)
</script>

<style scoped>
/* Hero */
.post-hero {
  background: var(--text-primary);
  color: var(--bg);
  padding: 4rem 1.5rem 3rem;
  border-bottom: 3px solid var(--accent);
}

.post-hero-inner {
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.category-badge {
  display: inline-block;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--accent);
  font-weight: 600;
  border: 1px solid var(--accent);
  padding: 0.2em 0.6em;
  border-radius: 3px;
  width: fit-content;
}

.post-title {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 5vw, 3rem);
  line-height: 1.2;
}

.post-meta {
  color: #aaa;
  font-size: 0.9rem;
}

/* Body */
.back-link {
  display: inline-block;
  margin-bottom: 2.5rem;
  color: var(--text-muted);
  font-size: 0.88rem;
  transition: color var(--transition);
}

.back-link:hover {
  color: var(--accent);
}

/* Markdown content */
.content {
  max-width: 720px;
  font-size: 1.05rem;
  line-height: 1.85;
  color: #333;
}

.content :deep(h2) {
  font-family: var(--font-display);
  font-size: 1.6rem;
  margin: 2.5rem 0 1rem;
  color: var(--text-primary);
}

.content :deep(h3) {
  font-family: var(--font-display);
  font-size: 1.2rem;
  margin: 2rem 0 0.75rem;
}

.content :deep(p) {
  margin-bottom: 1.25rem;
}

.content :deep(ul),
.content :deep(ol) {
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.content :deep(li) {
  margin-bottom: 0.4rem;
}

.content :deep(strong) {
  color: var(--text-primary);
}

.content :deep(code) {
  background: #f0ece6;
  padding: 0.15em 0.45em;
  border-radius: 4px;
  font-size: 0.87em;
  font-family: 'Courier New', monospace;
  color: var(--accent);
}

.content :deep(pre) {
  background: #1a1a1a;
  color: #f9f6f1;
  padding: 1.25rem 1.5rem;
  border-radius: var(--radius);
  overflow-x: auto;
  margin-bottom: 1.5rem;
  border-left: 4px solid var(--accent);
}

.content :deep(pre code) {
  background: none;
  color: inherit;
  padding: 0;
  font-size: 0.9em;
}

.content :deep(blockquote) {
  border-left: 4px solid var(--accent);
  padding: 0.75rem 1.25rem;
  margin: 1.5rem 0;
  background: #fdf5f5;
  border-radius: 0 var(--radius) var(--radius) 0;
  color: var(--text-secondary);
  font-style: italic;
}

/* States */
.loading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-muted);
  padding: 4rem 0;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty {
  color: var(--text-muted);
  padding: 4rem 0;
}
</style>