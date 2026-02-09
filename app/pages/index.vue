<template>
  <div class="container">
    <SectionsHero :data="hero" />

    <LazySectionsServices id="services" :data="services" v-if="services" />
    <LazySectionsWorkflow :data="workflow" v-if="workflow" />
    <LazySectionsAdvantages id="advantages" :data="advantages" v-if="advantages" />
    <LazySectionsReviews id="reviews" :data="reviews" v-if="reviews" />
  </div>
</template>

<script setup>
import { MAIN } from '~/queries/main'
const { locale, locales } = useI18n()
const graphql = useStrapiGraphQL()

const currentLocaleObj = computed(() => locales.value.find(l => l.code === locale.value));
const apiLocale = computed(() => currentLocaleObj.value?.language || locale.value);

// Используем transform, чтобы данные начинались сразу с объекта main
const { data: pageData, error } = useAsyncData(
  `home-${apiLocale.value}`,
  async () => {
    const response = await graphql(MAIN, { locale: apiLocale.value });
    return response.data.main; // Упрощаем структуру здесь
  },
  { watch: [locale] }
);

// Вычисляемые блоки для пропсов
const hero = computed(() => pageData.value?.Hero)
const services = computed(() => pageData.value?.Services)
const workflow = computed(() => pageData.value?.workflow)
const advantages = computed(() => pageData.value?.WhyChoseUs)
const reviews = computed(() => pageData.value?.reviews)


</script>