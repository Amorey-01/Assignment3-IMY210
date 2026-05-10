<template>
  <div class="container">
    <div class="search-header">
      <h1 class="page-title">Search</h1>
      <p class="page-subtitle">Find posts by title or author</p>
    </div>

    <div class="search-box">
      <span class="search-icon">🔍</span>
      <input
        v-model="query"
        class="search-input"
        type="text"
        placeholder="e.g. 'Docker' or 'John Doe'..."
        autofocus
      />
      <button v-if="query" class="clear-btn" @click="query = ''">✕</button>
    </div>

    <div v-if="pending" class="loading">
      <span class="spinner"></span> Loading...
    </div>

    <template v-else>
      <p v-if="query" class="results-count">
        {{ results.length }} result{{ results.length !== 1 ? 's' : '' }} for
        <strong>"{{ query }}"</strong>
      </p>

      <div class="grid">
        <NuxtLink
          v-for="post in results"
          :key="post.id"
          :to="`/blogs/${post.slug}`"
          class="post-card"
        >
          <span class="card-category">{{ post.category }}</span>
          <h2 class="card-title">{{ post.title }}</h2>
          <p class="card-author">By {{ post.author }}</p>
          <p class="card-snippet">{{ post.snippet }}</p>
          <span class="card-read-more">Read more →</span>
        </NuxtLink>
      </div>

      <div v-if="query && results.length === 0" class="empty">
        <p class="empty-icon">📭</p>
        <p>No results found for <strong>"{{ query }}"</strong></p>
        <p class="empty-hint">Try a different title or author name.</p>
      </div>

      <div v-if="!query" class="prompt">
        <p class="prompt-icon">✍️</p>
        <p>Start typing to search through posts</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const config = useRuntimeConfig()
const base = config.public.strapiBase

const { data, pending } = await useFetch(`${base}/api/posts?populate=*`)

const posts = computed(() =>
  (data.value?.data ?? []).map(item => ({ ...item }))
)

const query = ref('')

const results = computed(() => {
  const q = query.value.toLowerCase().trim()
  if (!q) return []
  return posts.value.filter(
    p =>
      p.title.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q)
  )
})
</script>

<style scoped>
.search-header {
  margin-bottom: 2rem;
}

.page-title {
  font-family: var(--font-display);
  font-size: 2.2rem;
  margin-bottom: 0.3rem;
}

.page-subtitle {
  color: var(--text-muted);
  font-size: 0.95rem;
}

.search-box {
  display: flex;
  align-items: center;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: var(--radius);
  padding: 0 1rem;
  margin-bottom: 2rem;
  transition: border-color var(--transition);
}

.search-box:focus-within {
  border-color: var(--accent);
}

.search-icon {
  font-size: 1rem;
  margin-right: 0.5rem;
  opacity: 0.5;
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.85rem 0;
  font-size: 1rem;
  font-family: var(--font-body);
  color: var(--text-primary);
  outline: none;
}

.search-input::placeholder {
  color: var(--text-muted);
}

.clear-btn {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.85rem;
  padding: 0.25rem;
  transition: color var(--transition);
}

.clear-btn:hover {
  color: var(--accent);
}

.results-count {
  font-size: 0.88rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 1.5rem;
}

.post-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.75rem;
  transition: box-shadow var(--transition), transform var(--transition);
  position: relative;
  overflow: hidden;
}

.post-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--accent);
  transform: scaleY(0);
  transition: transform var(--transition);
  transform-origin: bottom;
}

.post-card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-3px);
}

.post-card:hover::before {
  transform: scaleY(1);
}

.card-category {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--accent);
  font-weight: 500;
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  line-height: 1.3;
}

.card-author {
  font-size: 0.82rem;
  color: var(--text-muted);
}

.card-snippet {
  font-size: 0.9rem;
  line-height: 1.65;
  color: var(--text-secondary);
  flex: 1;
}

.card-read-more {
  font-size: 0.82rem;
  color: var(--accent);
  font-weight: 500;
  margin-top: 0.5rem;
}

.loading {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-muted);
  padding: 3rem 0;
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

.empty,
.prompt {
  text-align: center;
  padding: 4rem 0;
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 2;
}

.empty-icon,
.prompt-icon {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.empty-hint {
  font-size: 0.85rem;
  margin-top: 0.25rem;
}
</style>