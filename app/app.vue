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
  link: [
    { rel: 'canonical', href: 'https://spravkodel.com.ua/' },
    { rel: 'alternate', hreflang: 'uk', href: 'https://spravkodel.com.ua/' },
    { rel: 'alternate', hreflang: 'ru', href: 'https://spravkodel.com.ua/ru' },
    { rel: 'alternate', hreflang: 'x-default', href: 'https://spravkodel.com.ua/' }
  ],
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