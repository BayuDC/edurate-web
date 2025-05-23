import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
  css: ['~/assets/app.css'],
  modules: ['@vueuse/nuxt', '@pinia/nuxt'],
  routeRules: {
    '/**': { ssr: false },
  },
  runtimeConfig: {
    public: {
      apiUrl: process.env.API_URL,
    },
  },
});
