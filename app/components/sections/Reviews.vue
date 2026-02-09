<script setup lang="ts">
// Приймаємо дані через пропси
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const containerRef = ref(null);

// Ініціалізація Swiper через composable
const swiper = useSwiper(containerRef, {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    clickable: true,
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
});

// Допоміжний метод для отримання списку карток
const reviewsList = computed(() => props.data?.card || []);
</script>

<template>
  <section v-if="data" class="pt-[110px] pb-[80px] relative">
    <h2
      class="font-inter font-bold lg:text-[37px] tracking-[-0.03em] text-center text-[#fff] [text-shadow:-41px_-10px_19px_rgba(0,0,0,0.25)] lg:mb-12 mb-[35px]"
    >
      {{ data.title }}
    </h2>

    <div class="relative mx-auto px-12">
      <ClientOnly>
        <swiper-container ref="containerRef">
          <swiper-slide
            v-for="(review, index) in reviewsList"
            :key="index"
            :slides-per-view="'auto'"
            :space-between="16"
            :free-mode="true"
            :mousewheel="{ forceToAxis: true }"
            :grab-cursor="true"
            class="bg-[url('https://admin.spravkodel.net/uploads/Rectangle6_61602dc92a.svg')] bg-no-repeat bg-contain bg-center lg:bg-center w-full"
          >
            <div
              class="relative lg:min-h-[400px] flex flex-col items-center lg:justify-center px-[22px] pt-[22px] lg:pb-[22px] pb-[78px]"
            >
              <div class="flex items-end gap-[30px]">
                <NuxtImg
                  src="/img/User Male.svg"
                  alt="user"
                  class="lg:w-[75px] w-[61px]"
                />
                <div class="flex flex-col items-center">
                  <div class="flex gap-1">
                    <NuxtImg
                      v-for="i in 5"
                      :key="i"
                      src="/img/Star 1.svg"
                      alt="star"
                      class="lg:w-[18px] w-[13px]"
                    />
                  </div>
                  <h3
                    class="font-inter font-bold lg:text-[24px] text-[16px] text-center text-[#fff]"
                  >
                    {{ review.name }}
                  </h3>
                </div>
              </div>

              <p
                class="font-epilogue font-normal lg:text-[16px] text-[14px] text-center text-[#fff] leading-tight opacity-90 lg:pt-[30px] pt-[18px]"
              >
                {{ review.description }}
              </p>
            </div>
          </swiper-slide>
        </swiper-container>
      </ClientOnly>

      <button
        @click="swiper.prev()"
        class="absolute lg:left-[-3%] left-[10px] top-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform"
      >
        <NuxtImg src="/img/Arrow 4.svg" alt="arrow" class="lg:w-[45px] w-[33px]" />
      </button>

      <button
        @click="swiper.next()"
        class="absolute lg:right-[-3%] right-[10px] top-1/2 -translate-y-1/2 z-10 hover:scale-110 transition-transform"
      >
        <NuxtImg src="/img/Arrow 3.svg" alt="arrow" class="lg:w-[45px] w-[33px]" />
      </button>
    </div>

    <div
      class="absolute w-full lg:bottom-[-4%] bottom-[-6%] max-w-[1920px] left-0 overflow-hidden"
    >
      <NuxtImg class="w-full object-cover" src="/img/Vector 27.svg" alt="line" />
    </div>
  </section>
</template>

<style scoped>
swiper-slide {
  height: auto;
  display: flex;
}

/* Стилізація точок пагінації через Shadow Parts */
swiper-container::part(pagination) {
  position: relative;
  margin-top: 40px;
}

swiper-container::part(bullet) {
  width: 25.6px;
  height: 25.6px;
  background-color: #a3a3a3; /* Світло-сірий для неактивних */
  opacity: 1;
}

swiper-container::part(bullet-active) {
  background-color: #33312e; /* Темний для активної точки */
  width: 25.6px;
  height: 25.6px;
}

/* Приховуємо стандартні елементи */
swiper-container::part(button-prev),
swiper-container::part(button-next) {
  display: none;
}

@media (max-width: 576px) {
  swiper-container::part(bullet) {
    width: 17px;
    height: 17px;
  }

  swiper-container::part(bullet-active) {
    width: 17px;
    height: 17px;
  }
  swiper-container::part(pagination) {
    position: relative;
    margin-top: 0px;
    padding-top: 25px;
  }
}

/* Приховуємо стандартні елементи */
swiper-container::part(button-prev),
swiper-container::part(button-next) {
  display: none;
}
</style>
