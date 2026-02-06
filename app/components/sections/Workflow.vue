<template>
  <div
    v-if="data"
    class="lg:pt-[170px] pt-[35px] lg:pb-[135px] pb-[47px] relative"
  >
    <h2
      class="font-inter font-bold lg:text-[37px] text-[18px] tracking-[-0.03em] text-center text-[#fff] drop-shadow-[-41px_-10px_19px_rgba(0,0,0,0.25)]"
    >
      {{ data.title }}
    </h2>

    <div
      class="flex lg:flex-row flex-col sm:justify-between justify-center lg:pt-[145px] pt-[40px] lg:gap-0 gap-[35px] lg:px-[12px] px-[32px]"
    >
      <div
        v-for="(step, index) in data.card"
        :key="index"
        class="flex lg:flex-col flex-row items-center sm:justify-center  lg:gap-0 gap-[16px] w-full"
      >
        <NuxtImg
          v-if="step.img"
          :src="baseUrl + step.img.url"
          class="w-full object-cover lg:max-w-[157px] max-w-[91px]"
          :alt="'Step ' + (index + 1)"
        />

        <div class="lg:text-center text-left">
          <h3
            class="font-inter font-bold lg:text-[24px] text-[14px] tracking-[-0.03em] text-[#fff] lg:pt-[56px]"
          >
            {{ step.cardTitle }}
          </h3>
          <p
            class="font-epilogue font-normal lg:text-[19px] text-[13px] tracking-[-0.03em] lg:max-w-full text-wrap max-w-[132px] text-[#fff] lg:pt-[26px] pt-[10px]"
          >
            {{ step.cardSubtitle }}
          </p>
        </div>
      </div>
    </div>

    <div class="absolute w-full bottom-0">
      <NuxtImg class="w-full" alt="line" src="/Vector 25.svg" />
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
