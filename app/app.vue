<template>
  <div v-if="pageData">
    <LayoutAppHeader :links="pageData.Header" />
    <main>
      <NuxtPage />
    </main>
    <LazyLayoutAppFooter :data="pageData.footer" :btns="pageData.Hero" />
  </div>
</template>

<script setup>
import "~/assets/css/main.css";
import { MAIN } from "~/queries/main";
const { locale, locales } = useI18n();
const graphql = useStrapiGraphQL();
const route = useRoute()
const currentLocaleObj = computed(() =>
  locales.value.find((l) => l.code === locale.value),
);
const apiLocale = computed(
  () => currentLocaleObj.value?.language || locale.value,
);
const headData = computed(() => {
  const baseUrl = 'https://spravkodel.net';
  
  // 1. Обработка путей
  const cleanPath = route.path.replace(/^\/(ru|uk)(\/|$)/, '/') || '/';
  const path = cleanPath === '/' ? '' : cleanPath;

  // 2. Локализация контента (Title и Description)
  const isRu = locale.value === 'ru';
  
  const title = isRu 
    ? 'SPRAVKODEL — Оформление финансовых справок и документов онлайн' 
    : 'SPRAVKODEL — Оформлення фінансових довідок та документів онлайн';

  const description = isRu
    ? 'Официальное оформление финансовых справок, выписок и договоров без посещений. Быстрая помощь с документами от ООО "ИНСАЙТ-ХОЛДИНГ".'
    : 'Офіційне оформлення фінансових довідок, витягів та договорів без відвідувань. Швидка допомога з документами від ТОВ "ІНСАЙТ-ХОЛДИНГ".';

  return {
    title,
    // Исправляем ошибку со скриншота: добавляем lang в тег <html>
    htmlAttrs: {
      lang: locale.value 
    },
    meta: [
      { name: 'description', content: description },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'utf-8' }
    ],
    link: [
      { rel: "canonical", href: `${baseUrl}${route.path}` },
      { rel: "alternate", hreflang: "uk", href: `${baseUrl}${path}` },
      { rel: "alternate", hreflang: "ru", href: `${baseUrl}/ru${path}` },
      { rel: "alternate", hreflang: "x-default", href: `${baseUrl}${path}` },
    ]
  };
});

useHead(headData);

const { data: pageData } = useAsyncData(
  `layout-data-${apiLocale.value}`,
  async () => {
    const response = await graphql(MAIN, { locale: apiLocale.value });
    return response.data.main;
  },
  { watch: [locale] },
);
</script>
