export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      strapiBase: 'http://localhost:1337'
    }
  }
})