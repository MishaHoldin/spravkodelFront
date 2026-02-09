<template>
  <div v-if="data" class="pt-[60px] lg:px-0 px-[45px] relative lg:pb-[140px]">
    <h2
      class="font-inter font-bold lg:text-[37px] text-[18px] tracking-[-0.03em] text-center text-[#fff] drop-shadow-[-41px_-10px_19px_rgba(0,0,0,0.25)]"
    >
      {{ data.title }}
    </h2>

    <div
      class="flex items-center lg:gap-[25px] gap-[10px] justify-center pt-[10px]"
    >
      <span class="border-t border-[#fff] lg:w-[85px] w-[29px] h-1"></span>
      <div class="flex items-center">
        <NuxtImg
          v-for="i in 5"
          :key="i"
          class="lg:w-[29px] w-[10px]"
          src="/img/Star 1.svg"
          alt="star"
        />
      </div>
      <span class="border-t border-[#fff] lg:w-[85px] w-[29px] h-1"></span>
    </div>

    <div
      class="flex lg:flex-row flex-col items-center justify-between lg:mt-[85px] mt-[20px] lg:gap-[20px] gap-[40px]"
    >
      <div
        v-for="(item, index) in data.card"
        :key="index"
        class="flex flex-col items-center bg-[url('https://admin.spravkodel.net/uploads/paper_a9bf45588f.svg')] sm:bg-cover bg-contain bg-center h-auto bg-no-repeat lg:p-[64px_38px_57px_38px] p-[42px_17px_51px_17px] w-full max-w-[405px] lg:h-auto sm:h-[420px] justify-center"
      >
        <NuxtImg
          v-if="item.img"
          :src="baseUrl + item.img.url"
          :alt="item.cardTitle"
          class="object-cover w-full lg:max-w-[185px] max-w-[150px]"
        />

        <h3
          class="font-inter font-bold lg:text-[24px] text-[14px] tracking-[-0.03em] text-center text-[#000] lg:pt-[9px] pt-[6px]"
        >
          {{ item.cardTitle }}
        </h3>

        <p
          class="font-epilogue font-normal lg:text-[20px] text-[13px] tracking-[-0.03em] text-center text-[#030303] lg:pt-[20px] pt-[15px] max-w-[307px]"
        >
          {{ item.cardSubtitle }}
        </p>
      </div>
    </div>

    <div
      class="absolute w-full lg:bottom-[-10%] bottom-[-6%] max-w-[1920px] left-0 overflow-hidden"
    >
      <NuxtImg class="w-full object-cover" src="/img/Vector 19.svg" alt="line" />
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
