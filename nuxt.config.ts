// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  
  // Включаем только в разработке, чтобы не тянуть лишний код в билд
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    'nuxt-swiper',
    '@nuxtjs/i18n',
    '@nuxtjs/strapi',
    '@nuxt/scripts', // Добавляем для супер-оптимизации GTM
  ],

  // 1. Оптимизация GTM (через новый модуль Scripts)
  // Это загрузит GTM эффективно, не блокируя отрисовку страницы
  scripts: {
    registry: {
      googleTagManager: {
        id: 'GTM-TPHNPB5S',
      },
    },
  },

  googleFonts: {
    families: {
      'Inter': [500, 700],
      'Epilogue': [400],
      'Fauna One': [400],
      'Corben': [400],
      'Turret Road': [700],
      'Road Rage': [400],
    },
    display: 'swap',
    download: true, // Правильно: шрифты будут храниться локально
    preconnect: true,
    prefetch: true,
  },

  image: {
    strapi: {
      baseURL: process.env.STRAPI_URL || 'http://localhost:1339',
    },
    // Форматы, которые Nuxt Image будет генерировать автоматически
    format: ['webp', 'avif'], 
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },


  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1339',
    prefix: '/api',
    version: 'v5',
    cookieName: 'strapi_jwt'
  },

  app: {
    head: {
      title: 'SPRAVKODEL — Оформлення фінансових довідок та документів онлайн',
      htmlAttrs: {
        lang: 'uk',
        style: 'scroll-behavior: smooth;',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          name: 'description', 
          content: 'Офіційне оформлення фінансових довідок, витягів та договорів без відвідувань.' 
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
    }
  },

  i18n: {
    defaultLocale: 'ua',
    strategy: 'prefix_except_default',
    locales: [
      { code: 'ru', language: 'ru', file: 'ru.json' },
      { code: 'ua', language: 'uk', file: 'uk.json' }
    ],
    lazy: true,
    langDir: 'locales/'
  },

  nitro: {
    compressPublicAssets: true, 
    externals: {
      inline: ['css-tree'],
    },
  },

  vite: {
    build: {
      cssMinify: 'lightningcss',
    },
  },
})