<template>
  <nav class="navbar">
    <NuxtLink to="/" class="nav-logo">
      <span class="logo-icon">✒</span>
      <span class="logo-text">The Daily Read</span>
    </NuxtLink>
    <div class="nav-links">
      <NuxtLink to="/" class="nav-link">Home</NuxtLink>
      <NuxtLink to="/search" class="nav-link">Search</NuxtLink>
    </div>
  </nav>
</template>

<script setup>
// No logic needed
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2.5rem;
  background: var(--text-primary);
  color: var(--bg);
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 3px solid var(--accent);
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--bg);
}

.logo-icon {
  font-size: 1.4rem;
  color: var(--accent);
}

.logo-text {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: #ccc;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  transition: color var(--transition);
  position: relative;
  padding-bottom: 2px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent);
  transition: width var(--transition);
}

.nav-link:hover {
  color: #fff;
}

.nav-link:hover::after {
  width: 100%;
}

.router-link-active {
  color: #fff;
}

.router-link-active::after {
  width: 100%;
}
</style>