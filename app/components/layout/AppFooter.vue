<template>
  <div v-if="data" class="container sm:pb-[40px] pb-[75px] sm:pt-[195px] pt-[65px] relative sm:px-[0] px-[24px]">
    
    <div class="absolute top-[-40px] left-[-20px] sm:flex hidden">
      <NuxtImg 
        v-if="data.logo"
        class="w-full object-cover" 
        :src="baseUrl + data.logo.url" 
        alt="footer-logo"
      />
    </div>

    <h2 class="font-inter font-bold sm:text-[37px] text-[18px] tracking-[-0.03em] text-center text-[#fff] drop-shadow-[-41px_-10px_19px_rgba(0,0,0,0.25)]">
      {{ data.title }}
    </h2>

    <div class="flex sm:justify-start justify-center sm:gap-[98px] gap-[47px] sm:mt-[43px] mt-[64px]">
      <button class="sm:max-w-max max-w-[107px] w-full rounded-[85px] bg-[#60606082] shadow-[-24px_0_12px_0_rgba(0,0,0,0.25)] flex items-center justify-center font-inter font-bold sm:text-[24px] text-[11px] tracking-[-0.03em] text-center text-[#fff] sm:gap-[16px] gap-[8px] sm:p-[25px_36px_20px_27px] p-[10px_10px_10px_12px]">
        <NuxtImg class="object-contain sm:w-[34px] w-[17px] h-[34px]" src="/Telegram App.svg" alt="telegram" />
        Telegram
      </button>

      <button class="bg-[#ffffff82] rounded-[85px] w-full flex items-center sm:max-w-[304px] max-w-[146px] sm:gap-[9px] gap-[4px] shadow-[-27px_4px_13px_0_rgba(0,0,0,0.25)] font-inter font-bold sm:text-[24px] text-[11px] text-center text-[#343434] sm:p-[25px_36px_20px_27px] p-[10px_10px_10px_12px]">
        <NuxtImg class="object-contain sm:w-[34px] w-[17px] h-[34px]" src="/Phone.svg" alt="phone" />
        Зателефонувати
      </button>
    </div>

    <div class="mt-[43px] px-[23px] sm:px-0">
      <h3 class="relative inline-block font-inter font-bold sm:text-[25px] text-[15px] tracking-[-0.03em] text-[#fff] after:content-[''] after:absolute after:left-0 after:bottom-[-8px] after:w-full after:h-[12px] after:bg-[url('/Vector 28.svg')] after:bg-no-repeat after:bg-contain">
        {{ data.docs }}
      </h3>
    </div>

    <div class="sm:mt-[60px] mt-[40px] flex flex-col">
      <div class="sm:hidden flex flex-col">
        <p class="font-inter font-bold sm:text-[25px] text-[14px] tracking-[-0.03em] text-[#f9ee21e0] whitespace-pre-line">
          {{ workTimeText }}
        </p>
      </div>

      <h3 class="font-inter font-bold sm:text-[37px] text-[18px] tracking-[-0.03em] text-center text-[#fff] [text-shadow:-41px_-10px_19px_rgba(0,0,0,0.25)] sm:mt-0 mt-[25px]">
        {{ data.contacts }}
      </h3>

      <div class="flex gap-[35px] justify-around sm:pt-[77px] pt-[18px]">
        <div>
          <p class="font-inter font-bold sm:text-[25px] text-[13px] tracking-[-0.03em] text-[#fff] max-w-[758px]">
            {{ data.address }}
          </p>
          <p class="font-inter font-bold sm:text-[25px] text-[13px] tracking-[-0.03em] text-[#fff] pt-[65px] sm:block hidden">
            {{ data.fullname }}
          </p>
        </div>

        <div class="sm:flex hidden flex-col">
          <p class="font-inter font-bold sm:text-[25px] text-[14px] tracking-[-0.03em] text-[#f9ee21e0] whitespace-pre-line">
            {{ workTimeText }}
          </p>
        </div>
      </div>
    </div>

    <div class="sm:hidden flex mt-10">
      <NuxtImg v-if="data.logo" class="w-full object-cover" :src="baseUrl + data.logo.url" alt="footer-logo"/>
    </div>

    <div>
      <span class="border-t-[0.40px] border-[#fff] w-full max-w-[1358px] mx-auto block sm:mt-[77px] mt-[30px]"></span>
      <p class="font-inter font-bold sm:text-[24px] text-[12px] tracking-[-0.03em] text-center text-[#fff] sm:pt-[37px] pt-[17px]">
        {{ data.rigths }}
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: Object
})

const config = useRuntimeConfig()
const baseUrl = config.public.strapi.url

// Обробка Rich Text для графіка роботи
const workTimeText = computed(() => {
  if (!props.data?.worktime?.[0]?.children?.[0]?.text) return '';
  return props.data.worktime[0].children[0].text;
})
</script>