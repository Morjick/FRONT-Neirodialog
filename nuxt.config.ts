// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true, },
  app: {
    // baseURL: 'http://localhost:8080/',
    head: {
      title: 'Главная - Неиродиалог',
      titleTemplate: title => `${title ?? ''} - Неиродиалон`,
    },
  },
  modules: [
    ['@nuxtjs/eslint-module', {
      lintOnStart: false,
    },],
  ],
  plugins: [
    './store/index.ts',
  ],
  ssr: true,
  runtimeConfig: {
    public: {
      baseURL: 'http://localhost:8080/',
    },
    baseRUL: 'http://localhost:8080/',
  },
  telemetry: false,
})
