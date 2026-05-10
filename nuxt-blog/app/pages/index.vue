<template>
  <div>
    <header class="hero">
      <p class="hero-eyebrow">Welcome to</p>
      <h1 class="hero-title">The Daily Read</h1>
      <p class="hero-subtitle">Stories, ideas and perspectives worth your time.</p>
    </header>

    <div class="container">
      <div class="toolbar">
        <p class="post-count">
          {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'post' : 'posts' }}
        </p>
        <div class="filter-wrap">
          <label for="category-select">Filter:</label>
          <select id="category-select" v-model="selectedCategory">
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat">{{ cat }}</option>
          </select>
        </div>
      </div>

      <div v-if="pending" class="loading">
        <span class="spinner"></span> Loading posts...
      </div>

      <div v-else class="grid">
        <NuxtLink
          v-for="post in filteredPosts"
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

      <p v-if="!pending && filteredPosts.length === 0" class="empty">
        No posts found in this category.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const config = useRuntimeConfig()
const base = config.public.strapiBase

const { data, pending } = await useFetch(`${base}/api/posts?populate=*`)

const posts = computed(() =>
  (data.value?.data ?? []).map(item => ({ id: item.id, ...item.attributes }))
)

const selectedCategory = ref('')
const categories = computed(() => [...new Set(posts.value.map(p => p.category))])
const filteredPosts = computed(() =>
  selectedCategory.value
    ? posts.value.filter(p => p.category === selectedCategory.value)
    : posts.value
)
</script>

<style scoped>
/* Hero */
.hero {
  background: var(--text-primary);
  color: var(--bg);
  text-align: center;
  padding: 4rem 1.5rem 3rem;
  border-bottom: 3px solid var(--accent);
}

.hero-eyebrow {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--accent);
  margin-bottom: 0.75rem;
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  margin-bottom: 0.75rem;
}

.hero-subtitle {
  color: #aaa;
  font-size: 1rem;
}

/* Toolbar */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.post-count {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.filter-wrap {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

select {
  padding: 0.4rem 0.8rem;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-family: var(--font-body);
  background: var(--surface);
  color: var(--text-primary);
  cursor: pointer;
  transition: border-color var(--transition);
}

select:focus {
  outline: none;
  border-color: var(--accent);
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 1.5rem;
}

/* Cards */
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
  color: var(--text-primary);
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
  transition: letter-spacing var(--transition);
}

.post-card:hover .card-read-more {
  letter-spacing: 0.03em;
}

/* States */
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

.empty {
  color: var(--text-muted);
  text-align: center;
  padding: 3rem 0;
  font-size: 0.95rem;
}
</style>