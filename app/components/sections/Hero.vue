<template>
  <div
    v-if="data"
    class="container flex justify-between sm:mt-[53px] mt-[33px] sm:pb-[151px] pb-[70px] relative sm:overflow-visible overflow-hidden"
  >
    <div class="flex flex-col max-w-[757px] w-full sm:mt-[30px]">
      <h1
        class="font-inter font-bold sm:text-[49px] text-[20px] tracking-[-0.03em] text-center text-[#fff] [text-shadow:-6px_-1px_0px_rgba(0,0,0,0.25)] sm:pb-[62px] pb-[26px]"
      >
        {{ data.Title }}
      </h1>

      <div
        class="relative flex items-center justify-center w-full max-w-[750px] mx-auto"
      >
        <h2
          class="relative z-10 font-road-rage font-normal sm:text-[25px] text-[11px] text-[#fff] pl-[100px] pr-[60px] leading-tight"
        >
          {{ data.subtitle }}
        </h2>

        <div
          class="absolute inset-0 z-0 flex items-center justify-center sm:max-w-full max-w-[380px] mx-auto"
        >
          <svg
            width="715"
            height="128"
            viewBox="0 0 715 128"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.9876 93.7601C24.3083 98.0358..."
              fill="#F9EE21"
              fill-opacity="0.88"
            />
          </svg>
        </div>
      </div>

      <div
        class="flex items-center sm:justify-between justify-center sm:gap-[80px] gap-[23px] sm:mt-[91px] mt-[25px]"
      >
        <div
          v-for="(item, index) in data.info"
          :key="index"
          class="flex sm:gap-[19px] gap-[10px] items-center"
        >
          <NuxtImg
            class="object-cover sm:w-[42px] w-[17px] sm:h-[34px]"
            :src="baseUrl + item.icon.url"
            :alt="item.name"
          />
          <p
            class="font-turret font-bold sm:text-[18px] text-[12px] text-center text-[#fff] flex sm:max-w-[126px] max-w-[62px]"
          >
            {{ item.name }}
          </p>
        </div>
      </div>

      <div
        class="flex sm:justify-start justify-center sm:gap-[98px] gap-[47px] sm:mt-[43px] mt-[25px]"
      >
        <a
          v-if="data.btns"
          :href="'https://t.me/' + data.btns.btnLink?.replace('@', '')"
          target="_blank"
          rel="noopener noreferrer"
          class="sm:max-w-max max-w-[107px] w-full rounded-[85px] bg-[#60606082] shadow-[-24px_0_12px_0_rgba(0,0,0,0.25)] flex items-center justify-center font-inter font-bold sm:text-[24px] text-[11px] tracking-[-0.03em] text-center text-[#fff] sm:gap-[16px] gap-[8px] sm:p-[25px_36px_20px_27px] p-[10px_10px_10px_12px] hover:bg-[#707070] transition-colors"
        >
          <NuxtImg
            v-if="data.btns.btnIcon"
            class="object-contain sm:w-[34px] w-[17px] h-[34px]"
            :src="baseUrl + data.btns.btnIcon.url"
            :alt="data.btns.btnText"
          />
          {{ data.btns.btnText }}
        </a>

        <a
          v-if="data.btns2"
          :href="'tel:' + data.btns2.btnLink?.replace(/\s+/g, '')"
          class="bg-[#ffffff82] rounded-[85px] w-full flex items-center sm:max-w-[304px] max-w-[146px] sm:gap-[9px] gap-[4px] shadow-[-27px_4px_13px_0_rgba(0,0,0,0.25)] font-inter font-bold sm:text-[24px] text-[11px] text-center text-[#343434] sm:p-[25px_36px_20px_27px] p-[10px_10px_10px_12px] hover:bg-[#ffffffa0] transition-colors"
        >
          <NuxtImg
            v-if="data.btns2.btnIcon"
            class="object-contain sm:w-[34px] w-[17px] h-[34px]"
            :src="baseUrl + data.btns2.btnIcon.url"
            :alt="data.btns2.btnText"
          />
          {{ data.btns2.btnText }}
        </a>
      </div>

      <div
        class="absolute sm:bottom-[1%] bottom-[6%] sm:w-full w-[150%] max-w-[1920px]"
      >
        <NuxtImg src="/Vector 23.svg" class="w-full" alt="line" />
      </div>
    </div>

    <div class="sm:flex hidden justify-start max-w-[762px] w-full">
      <NuxtImg
        v-if="data.mainImage"
        fetchpriority="high"
        :src="baseUrl + data.mainImage.url"
        class="w-full object-cover max-w-[762px] max-h-[576px]"
        alt="Hero Image"
      />
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

// Отримуємо URL Strapi з конфігу
const config = useRuntimeConfig();
const baseUrl = config.public.strapi.url;
</script>
