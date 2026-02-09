// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2026-02-09',
  devtools: { enabled: true },

  // css: ['~/assets/css/main.css'],

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-swiper',
    '@nuxtjs/i18n',
    '@nuxtjs/strapi',
    '@nuxt/fonts',
  ],
  fonts: {
    // Указываем, что приоритет всегда у локальных файлов
    priority: ['local'], 
    families: [
      { name: 'Inter', provider: 'local' },
      { name: 'Epilogue', provider: 'local' }
    ],
    defaults: {
      preload: true,
      display: 'swap'
    }
  },
  // Налаштування Nuxt 4 (структура папок)
  future: {
    compatibilityVersion: 4,
  },
  nitro: {
    externals: {
      inline: ['css-tree'],
    },
    routeRules: {
      "/img/**": { headers: { 'cache-control': `public,max-age=31536000,s-maxage=31536000` } },
      "/fonts/**": { headers: { 'cache-control': `public,max-age=31536000,s-maxage=31536000` } },
      "/_nuxt/**": { headers: { 'cache-control': `public,max-age=31536000,s-maxage=31536000` } },
    }
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
              window.addEventListener('load', function() {
                // Загружаем GTM через 3 секунды после полной загрузки страницы
                // или можно добавить слушатель на 'mousemove' / 'touchstart'
                setTimeout(function() {
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-TPHNPB5S');
                }, 6000); 
              });
            `,
            type: "text/javascript",
          },
      ],
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
    ipx: {
      maxAge: 31536000, // Cache for 1 year
    },
  },
  features: {
    inlineStyles: true, // Инлайнит критический CSS для ускорения LCP
  },

})