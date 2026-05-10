<template>
  <div>
    <NavBar />
    <main class="container">
      <NuxtPage />
    </main>
  </div>
</template>

<style>
@import './app/assets/css/main.css';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Georgia', serif;
  background: #f9f6f1;
  color: #1a1a1a;
}

a {
  color: inherit;
  text-decoration: none;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}
</style>