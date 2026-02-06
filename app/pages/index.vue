<template>
  <div class="container">
    <SectionsHero :data="hero" />

    <div ref="servicesRef">
      <LazySectionsServices
        v-if="servicesVisible"
        id="services"
        :data="services"
      />
    </div>

    <div ref="workflowRef">
      <LazySectionsWorkflow v-if="workflowVisible" :data="workflow" />
    </div>

    <div ref="advantagesRef">
      <LazySectionsAdvantages
        v-if="advantagesVisible"
        id="advantages"
        :data="advantages"
      />
    </div>

    <div ref="reviewsRef">
      <LazySectionsReviews v-if="reviewsVisible" id="reviews" :data="reviews" />
    </div>
  </div>
</template>

<script setup>
import { MAIN } from "~/queries/main";
const { locale, locales } = useI18n();
const graphql = useStrapiGraphQL();

const currentLocaleObj = computed(() =>
  locales.value.find((l) => l.code === locale.value),
);
const apiLocale = computed(
  () => currentLocaleObj.value?.language || locale.value,
);

// Используем transform, чтобы данные начинались сразу с объекта main
const { data: pageData, error } = useAsyncData(
  `home-${apiLocale.value}`,
  async () => {
    const response = await graphql(MAIN, { locale: apiLocale.value });
    return response.data.main; // Упрощаем структуру здесь
  },
  { watch: [locale] },
);

// Вычисляемые блоки для пропсов
const hero = computed(() => pageData.value?.Hero);
const services = computed(() => pageData.value?.Services);
const workflow = computed(() => pageData.value?.workflow);
const advantages = computed(() => pageData.value?.WhyChoseUs);
const reviews = computed(() => pageData.value?.reviews);

const route = useRoute();
const siteUrl = "https://spravkodel.net";
const currentPath = route.path === "/" ? "" : route.path;

useHead({
  link: [
    // 1. Canonical URL
    {
      rel: "canonical",
      href: `${siteUrl}${currentPath}`,
    },
    // 2. Hreflang (пример для украинского и английского)
    {
      rel: "alternate",
      hreflang: "uk",
      href: `${siteUrl}${currentPath}`,
    },
    {
      rel: "alternate",
      hreflang: "en",
      href: `${siteUrl}/en${currentPath}`,
    },
    {
      rel: "alternate",
      hreflang: "x-default",
      href: `${siteUrl}${currentPath}`,
    },
  ],
  // Дополнительно закроем дыры по Keywords и Author из вашего скриншота
  meta: [
    { name: "author", content: 'ТОВ "ІНСАЙТ-ХОЛДИНГ"' },
    {
      name: "keywords",
      content: "фінансові довідки, витяги, договори, онлайн",
    },
  ],
});

// Состояния видимости
const servicesVisible = ref(false);
const workflowVisible = ref(false);
const advantagesVisible = ref(false);
const reviewsVisible = ref(false);

// Рефы на контейнеры
const servicesRef = ref(null);
const workflowRef = ref(null);
const advantagesRef = ref(null);
const reviewsRef = ref(null);

onMounted(() => {
  const observerOptions = {
    root: null,
    rootMargin: "200px", // Начинаем загрузку за 200px до появления
    threshold: 0.01,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target === servicesRef.value) servicesVisible.value = true;
        if (entry.target === workflowRef.value) workflowVisible.value = true;
        if (entry.target === advantagesRef.value)
          advantagesVisible.value = true;
        if (entry.target === reviewsRef.value) reviewsVisible.value = true;

        // Перестаем следить за элементом после того, как он загрузился
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Запускаем слежку
  if (servicesRef.value) observer.observe(servicesRef.value);
  if (workflowRef.value) observer.observe(workflowRef.value);
  if (advantagesRef.value) observer.observe(advantagesRef.value);
  if (reviewsRef.value) observer.observe(reviewsRef.value);
});
</script>
