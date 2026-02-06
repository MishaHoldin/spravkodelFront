<template>
  <div class="container">
    <SectionsHero :data="hero" />

    <SectionsServices id="services" :data="services" />

    <SectionsWorkflow :data="workflow" />
    
    <SectionsAdvantages id="advantages" :data="advantages" />

    <SectionsReviews id="reviews" :data="reviews" />
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


const route = useRoute()
const siteUrl = 'https://spravkodel.net'
const currentPath = route.path === '/' ? '' : route.path

useHead({
  link: [
    // 1. Canonical URL
    {
      rel: 'canonical',
      href: `${siteUrl}${currentPath}`,
    },
    // 2. Hreflang (пример для украинского и английского)
    {
      rel: 'alternate',
      hreflang: 'uk',
      href: `${siteUrl}${currentPath}`,
    },
    {
      rel: 'alternate',
      hreflang: 'en',
      href: `${siteUrl}/en${currentPath}`,
    },
    {
      rel: 'alternate',
      hreflang: 'x-default',
      href: `${siteUrl}${currentPath}`,
    }
  ],
  // Дополнительно закроем дыры по Keywords и Author из вашего скриншота
  meta: [
    { name: 'author', content: 'ТОВ "ІНСАЙТ-ХОЛДИНГ"' },
    { name: 'keywords', content: 'фінансові довідки, витяги, договори, онлайн' }
  ]
})

</script>