export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      strapiBase: 'http://localhost:1337'
    }
  }
})