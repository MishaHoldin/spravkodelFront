// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2026-02-09',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
    'nuxt-swiper',
    '@nuxtjs/i18n',
    '@nuxtjs/strapi',
  ],

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
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      htmlAttrs: {
        style: 'scroll-behavior: smooth;',
      },
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-XCQ3S6VLDM',
          async: true,
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XCQ3S6VLDM');
          `,
          type: 'text/javascript',
        },
        {
          innerHTML: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-TPHNPB5S');
          `,
          type: "text/javascript",
        },
      ],
      noscript: [
        {
          innerHTML: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TPHNPB5S"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
          `,
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
    inlineStyles: true,
  },

})