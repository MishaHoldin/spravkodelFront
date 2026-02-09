<template>
  <div v-if="data" class="container relative pb-[70px]">
    <div class="lg:pt-[30px] lg:pb-[70px] pt-[15px] pb-[25px]">
      <h2
        class="font-inter font-bold lg:text-[37px] text-[18px] tracking-[-0.03em] text-center text-[#fff] drop-shadow-[-41px_-10px_19px_rgba(0,0,0,0.25)]"
      >
        {{ data.title }}
      </h2>
    </div>

    <div
      class="grid lg:grid-cols-2 grid-cols-1 lg:pt-[90px] lg:gap-y-[180px] gap-y-[53px] lg:gap-x-[123px] lg:px-0 px-[32px]"
    >
      <div
        v-for="(card, index) in data.card"
        :key="index"
        class="relative flex items-center justify-center p-[40px] lg:max-w-[600px] max-w-[480px] mx-auto "
      >
        <NuxtImg
          fetchpriority=high
          src="/img/Vector 2.svg"
          class="absolute lg:w-full w-[112%] max-w-[550px] z-0 object-cover sm:block hidden"
          alt="line"
        />

        <div
          class="relative z-10 flex flex-col justify-center lg:gap-[20px] gap-[8px]"
        >
          <div
            class="flex items-center lg:gap-[13px] gap-[8px] lg:pl-[90px] pl-[35px]"
          >
            <NuxtImg
              v-if="card.icon"
              :src="baseUrl + card.icon.url"
              :alt="card.title"
              class="w-[42px] h-[42px] object-contain"
            />
            <h3
              class="font-inter font-bold lg:text-[24px] text-[14px] tracking-[-0.03em] underline decoration-skip-none text-left text-[#fff]"
            >
              {{ card.title }}
            </h3>
          </div>

          <p
            class="font-epilogue font-normal lg:text-[19px] text-[11px] tracking-[-0.03em] text-[#fff] leading-snug lg:max-w-[460px] max-w-[223px] lg:pl-[35px] pl-[15px]"
          >
            {{ card.subtitle }}
          </p>

          <div class="lg:pl-[59px] pl-[35px]">
            <div
              class="inline-flex items-center bg-[#ffffff82] rounded-[123px] lg:px-[15px] lg:py-[10px] px-[10px] py-[5px] max-w-max"
            >
              <NuxtImg
                v-if="card.terminIcon"
                :src="baseUrl + card.terminIcon.url"
                alt="time"
                class="w-[20px] h-[20px] mr-[10px] object-contain"
              />
              <p
                class="font-fauna font-bold lg:text-[14px] text-[10px] tracking-[-0.03em] text-[#030303] whitespace-nowrap"
              >
                {{ card.termin }}
              </p>
            </div>
          </div>

          <div
            class="flex items-center gap-[8px] mt-[10px] lg:pl-[120px] pl-[70px]"
          >
            <NuxtImg
              v-if="card.priceIcon"
              :src="baseUrl + card.priceIcon.url"
              alt="price"
              class="w-[30px] h-[30px] object-contain"
            />
            <p
              class="font-corben font-normal lg:text-[36px] text-[20px] tracking-[-0.03em] text-[#f9ee21]"
            >
              Ціна: {{ card.price }} грн
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute w-full lg:bottom-[-14%] bottom-[-2%] max-w-[1920px]">
      <NuxtImg class="w-full object-cover" src="/img/Vector 24.svg" alt="line" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

const config = useRuntimeConfig();
const baseUrl = config.public.strapi.url;
</script>
