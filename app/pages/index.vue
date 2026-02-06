<template>
  <div class="container">
    <!-- Hero загружается сразу -->
    <SectionsHero v-if="hero" :data="hero" />

    <!-- Остальные блоки загружаем только после hero -->
    <Suspense>
      <template #default>
        <SectionsServices v-if="services" id="services" :data="services" />
        <SectionsWorkflow v-if="workflow" :data="workflow" />
        <SectionsAdvantages v-if="advantages" id="advantages" :data="advantages" />
        <SectionsReviews v-if="reviews" id="reviews" :data="reviews" />
      </template>
      <template #fallback>
        <div>Загрузка контента...</div>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import { MAIN } from '~/queries/main'

const { locale, locales } = useI18n()
const graphql = useStrapiGraphQL()
const route = useRoute()
const siteUrl = 'https://spravkodel.net'
const currentPath = route.path === '/' ? '' : route.path

const currentLocaleObj = computed(() => locales.value.find(l => l.code === locale.value));
const apiLocale = computed(() => currentLocaleObj.value?.language || locale.value);

// Сначала грузим только Hero
const { data: heroData } = await useAsyncData(
  `hero-${apiLocale.value}`,
  async () => {
    const response = await graphql(MAIN, { locale: apiLocale.value });
    return response.data.main.Hero;
  },
  { watch: [locale] }
)

const hero = computed(() => heroData.value)

// После Hero грузим остальные блоки
let services, workflow, advantages, reviews

if (hero.value) {
  const { data: restData } = await useAsyncData(
    `rest-${apiLocale.value}`,
    async () => {
      const response = await graphql(MAIN, { locale: apiLocale.value });
      return response.data.main
    },
    { watch: [locale] }
  )

  services = computed(() => restData.value?.Services)
  workflow = computed(() => restData.value?.workflow)
  advantages = computed(() => restData.value?.WhyChoseUs)
  reviews = computed(() => restData.value?.reviews)
}

// SEO
useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}${currentPath}` },
    { rel: 'alternate', hreflang: 'uk', href: `${siteUrl}${currentPath}` },
    { rel: 'alternate', hreflang: 'en', href: `${siteUrl}/en${currentPath}` },
    { rel: 'alternate', hreflang: 'x-default', href: `${siteUrl}${currentPath}` }
  ],
  meta: [
    { name: 'author', content: 'ТОВ "ІНСАЙТ-ХОЛДИНГ"' },
    { name: 'keywords', content: 'фінансові довідки, витяги, договори, онлайн' }
  ]
})
</script>
