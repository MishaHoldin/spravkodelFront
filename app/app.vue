<template>
  <div v-if="pageData">
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

// Спільний запит для всього лейауту
const { data: pageData } = useAsyncData(
  `layout-data-${apiLocale.value}`,
  async () => {
    const response = await graphql(MAIN, { locale: apiLocale.value });
    return response.data.main;
  },
  { watch: [locale] }
);
</script>