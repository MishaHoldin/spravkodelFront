<template>
  <div v-if="pageData">
    <noscript>
      <iframe 
        src="https://www.googletagmanager.com/ns.html?id=GTM-TPHNPB5S"
        height="0" 
        width="0" 
        style="display:none;visibility:hidden"
      ></iframe>
    </noscript>

    <LayoutAppHeader :links="pageData.Header" />

    <main>
        <NuxtPage />
     </main>

    <LayoutAppFooter :data="pageData.footer" />
  </div>
</template>

<script setup>
import { MAIN } from '~/queries/main'
const { locale, locales } = useI18n()
const graphql = useStrapiGraphQL()

const currentLocaleObj = computed(() => locales.value.find(l => l.code === locale.value));
const apiLocale = computed(() => currentLocaleObj.value?.language || locale.value);

// Вшиваем GTM и SEO напрямую
useHead({
  htmlAttrs: {
    lang: locale.value
  },
  link: [
    { rel: 'canonical', href: 'https://spravkodel.com.ua/' },
    { rel: 'alternate', hreflang: 'uk', href: 'https://spravkodel.com.ua/' },
    { rel: 'alternate', hreflang: 'ru', href: 'https://spravkodel.com.ua/ru' },
    { rel: 'alternate', hreflang: 'x-default', href: 'https://spravkodel.com.ua/' }
  ],
  script: [
    {
      children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TPHNPB5S');`,
      type: 'text/javascript'
    }
  ]
})

const { data: pageData } = useAsyncData(
  `layout-data-${apiLocale.value}`,
  async () => {
    const response = await graphql(MAIN, { locale: apiLocale.value });
    return response.data.main;
  },
  { watch: [locale] }
);
</script>