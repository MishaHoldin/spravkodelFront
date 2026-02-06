<template>
  <div v-if="data" class="container relative pb-[70px]">
    <div class="sm:pt-[30px] sm:pb-[70px] pt-[15px] pb-[25px]">
      <h2
        class="font-inter font-bold sm:text-[37px] text-[18px] tracking-[-0.03em] text-center text-[#fff] drop-shadow-[-41px_-10px_19px_rgba(0,0,0,0.25)]"
      >
        {{ data.title }}
      </h2>
    </div>

    <div class="grid sm:grid-cols-2 grid-cols-1 sm:pt-[90px] sm:gap-y-[180px] gap-y-[53px] sm:gap-x-[123px] sm:px-0 px-[32px]">
      
      <div 
        v-for="(card, index) in data.card" 
        :key="index"
        class="relative flex items-center justify-center p-[40px] sm:max-w-[600px] max-w-[480px] mx-auto"
      >
        <NuxtImg
          src="/Vector 2.svg"
          class="absolute sm:w-full w-[112%] max-w-[550px] z-0 object-cover"
          alt="line"
        />

        <div class="relative z-10 flex flex-col justify-center sm:gap-[20px] gap-[8px]">
          
          <div class="flex items-center sm:gap-[13px] gap-[8px] sm:pl-[90px] pl-[35px]">
            <NuxtImg 
              v-if="card.icon"
              :src="baseUrl + card.icon.url" 
              :alt="card.title" 
              class="w-[42px] h-[42px] object-contain" 
            />
            <h3 class="font-inter font-bold sm:text-[24px] text-[14px] tracking-[-0.03em] underline decoration-skip-none text-left text-[#fff]">
              {{ card.title }}
            </h3>
          </div>

          <p class="font-epilogue font-normal sm:text-[19px] text-[11px] tracking-[-0.03em] text-[#fff] leading-snug sm:max-w-[470px] max-w-[223px] sm:pl-[35px] pl-[15px]">
            {{ card.subtitle }}
          </p>

          <div class="sm:pl-[59px] pl-[35px]">
            <div class="inline-flex items-center bg-[#ffffff82] rounded-[123px] sm:px-[15px] sm:py-[10px] px-[10px] py-[5px] max-w-max">
              <NuxtImg 
                v-if="card.terminIcon"
                :src="baseUrl + card.terminIcon.url" 
                alt="time" 
                class="w-[20px] h-[20px] mr-[10px] object-contain" 
              />
              <p class="font-fauna font-bold sm:text-[14px] text-[10px] tracking-[-0.03em] text-[#030303] whitespace-nowrap">
                {{ card.termin }}
              </p>
            </div>
          </div>

          <div class="flex items-center gap-[8px] mt-[10px] sm:pl-[120px] pl-[70px]">
            <NuxtImg 
              v-if="card.priceIcon"
              :src="baseUrl + card.priceIcon.url" 
              alt="price" 
              class="w-[30px] h-[30px] object-contain" 
            />
            <p class="font-corben font-normal sm:text-[36px] text-[20px] tracking-[-0.03em] text-[#f9ee21]">
              Ціна: {{ card.price }} грн
            </p>
          </div>

        </div>
      </div>
    </div>

    <div class="absolute w-full sm:bottom-[-34%] bottom-[-15%] max-w-[1920px]">
      <NuxtImg src="/Vector 24.svg" alt="line"/>
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