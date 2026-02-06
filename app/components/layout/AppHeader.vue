<template>
  <header class="w-full pt-[14px] lg:px-[72px] px-[23px]">
    <div class="relative flex items-center lg:justify-between justify-end">
      <nav class="hidden lg:flex items-center mx-auto">
        <template v-for="(item, index) in links" :key="index">
          <a
            :href="anchors[index] || '#'"
            class="font-inter font-bold text-[24px] text-[#fff] leading-none transition-colors hover:text-[#f9ee21e0]"
            :class="{
              'pr-[42px]': index === 0,
              'px-[30px]': index === 1,
              'pl-[42px]': index === 2,
            }"
          >
            {{ item.Link }}
          </a>

          <span
            v-if="index < links.length - 1"
            class="w-[6px] h-[56px] bg-[#f9ee21e0] rounded-[10px] shadow-[-13px_4px_4px_0_rgba(0,0,0,0.25)]"
          ></span>
        </template>
      </nav>

      <button
        @click="isMenuOpen = !isMenuOpen"
        class="lg:hidden z-50 flex flex-col justify-between w-[30px] h-[20px] relative"
        aria-label="Menu"
      >
        <span
          :class="isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''"
          class="w-[36px] h-0 border-t-[3px] border-[#fff] transition-all duration-300 ease-in-out rounded-[30px]"
        ></span>
        <span
          :class="isMenuOpen ? 'opacity-0' : 'opacity-100'"
          class="w-[36px] h-0 border-t-[3px] border-[#fff] transition-all duration-300 ease-in-out rounded-[30px]"
        ></span>
        <span
          :class="isMenuOpen ? '-rotate-45 -translate-y-[8px]' : ''"
          class="w-[36px] h-0 border-t-[3px] border-[#fff] transition-all duration-300 ease-in-out rounded-[30px]"
        ></span>
      </button>

      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-full"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-full"
      >
        <div
          v-if="isMenuOpen"
          class="fixed inset-0 bg-[#1e1e1e] z-40 flex flex-col items-center justify-center gap-8 lg:hidden"
        >
          <a
            v-for="(item, index) in links"
            :key="'mob-' + index"
            @click="isMenuOpen = false"
            :href="anchors[index] || '#'"
            class="font-inter font-bold text-[32px] text-[#fff]"
          >
            {{ item.Link }}
          </a>

          <button
            @click="toggleLanguage"
            class="font-inter font-bold text-[24px] text-[#f9ee21e0] uppercase"
          >
            {{ alternateLocale.code }}
          </button>
        </div>
      </transition>

      <div class="hidden lg:block absolute right-0">
        <button
          @click="toggleLanguage"
          class="font-inter font-bold text-[24px] text-[#fff] hover:text-[#f9ee21e0] transition-colors uppercase"
        >
          {{ alternateLocale.code }}
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  links: {
    type: Array,
    default: () => [],
  },
});

// Масив якорів, які відповідають порядку посилань у Strapi
const anchors = ["#services", "#advantages", "#reviews"];

const { locale, locales, setLocale } = useI18n();
const isMenuOpen = ref(false);

const alternateLocale = computed(() => {
  return locales.value.find((l) => l.code !== locale.value);
});

const toggleLanguage = async () => {
  await setLocale(alternateLocale.value.code);
  isMenuOpen.value = false;
  window.location.reload();
};
</script>
