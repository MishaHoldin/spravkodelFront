// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-swiper',
    '@nuxtjs/i18n',
    '@nuxtjs/strapi',
    'nuxt-vitalizer'
  ],

  // Налаштування Nuxt 4 (структура папок)
  future: {
    compatibilityVersion: 4,
  },

  nitro: {
    externals: {
      inline: ['css-tree'],
    },
    routeRules: {
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/favicon.ico': { headers: { 'cache-control': 'public, max-age=604800' } },
    },
  },
  app: {
    head: {
      title: 'SPRAVKODEL — Оформлення фінансових довідок та документів онлайн',

      meta: [
        { 
          name: 'description', 
          content: 'Офіційне оформлення фінансових довідок, витягів та договорів без відвідувань. Швидка допомога з документами від ТОВ "ІНСАЙТ-ХОЛДИНГ".' 
        },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      htmlAttrs: {
        lang: 'uk',
        style: 'scroll-behavior: smooth;',
      },
      script: [
      {
        innerHTML: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TPHNPB5S');
        `,
          type: "text/javascript",
        defer: true,
      },
      ],
    //   noscript: [
    //   {
    //     innerHTML: `
    //       <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TPHNPB5S"
    //       height="0" width="0" style="display:none;visibility:hidden"></iframe>
    //     `,
    //   },
    // ],
    },

  },
  i18n: {
    defaultLocale: 'ua',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'ru', 
        language: 'ru', 
        file: 'ru.json'
      },
      {
        code: 'ua', 
        language: 'uk', 
        file: 'uk.json'
      }
    ],
  },
  strapi:{
      url: process.env.STRAPI_URL || 'https://admin.spravkodel.net',
      token: process.env.STRAPI_TOKEN || undefined,
      prefix: '/api',
      admin: '/admin',
      version: 'v5',
      cookie: {},
      cookieName: 'strapi_jwt'
  },
  runtimeConfig: {
    strapi: {
      url: 'https://admin.spravkodel.net'
    },
    public: {
      strapi: {
        url: 'https://admin.spravkodel.net'
      }
    }
  },
  image: {
    strapi: {
      baseURL: process.env.STRAPI_URL,
    },
  },
  features: {
    inlineStyles: true, // Инлайнит критический CSS для ускорения LCP
  },
  vitalizer: {
    // Remove the render-blocking entry CSS
    disableStylesheets: 'entry',
    disablePrefetchLinks: true
  }
})