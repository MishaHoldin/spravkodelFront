<template>
  <div v-if="data" class="pt-[60px] sm:px-0 px-[45px] relative sm:pb-[140px]">
    <h2
      class="font-inter font-bold sm:text-[37px] text-[18px] tracking-[-0.03em] text-center text-[#fff] drop-shadow-[-41px_-10px_19px_rgba(0,0,0,0.25)]"
    >
      {{ data.title }}
    </h2>

    <div class="flex items-center sm:gap-[25px] gap-[10px] justify-center pt-[10px]">
      <span class="border-t border-[#fff] sm:w-[85px] w-[29px] h-1"></span>
      <div class="flex items-center">
        <NuxtImg v-for="i in 5" :key="i" class="sm:w-[29px] w-[10px]" src="/Star 1.svg" alt="star"/>
      </div>
      <span class="border-t border-[#fff] sm:w-[85px] w-[29px] h-1"></span>
    </div>

    <div class="flex sm:flex-row flex-col items-center justify-between sm:mt-[85px] mt-[20px] sm:gap-[20px] gap-[40px]">
      <div 
        v-for="(item, index) in data.card" 
        :key="index"
        class="flex flex-col items-center bg-[url('/paper.svg')] sm:bg-cover bg-contain h-auto bg-no-repeat sm:p-[64px_38px_57px_38px] p-[42px_17px_51px_17px] w-full max-w-[405px]"
      >
        <NuxtImg 
          v-if="item.img"
          :src="baseUrl + item.img.url" 
          :alt="item.cardTitle"
          class=" object-cover w-full sm:max-w-[185px] max-w-[150px]"
        />
        
        <h3 class="font-inter font-bold sm:text-[24px] text-[14px] tracking-[-0.03em] text-center text-[#000] sm:pt-[9px] pt-[6px]">
          {{ item.cardTitle }}
        </h3>
        
        <p class="font-epilogue font-normal sm:text-[20px] text-[13px] tracking-[-0.03em] text-center text-[#030303] sm:pt-[20px] pt-[15px] max-w-[307px]">
          {{ item.cardSubtitle }}
        </p>
      </div>
    </div>

    <div class="absolute w-full sm:bottom-[-10%] bottom-[-6%] max-w-[1920px] left-0 overflow-hidden">
      <NuxtImg class="w-full object-cover" src="/Vector 19.svg" alt="line"/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const config = useRuntimeConfig()
const baseUrl = config.public.strapi.url
</script>