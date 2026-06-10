<script setup lang="ts">
import type { IData } from "@@/apis/index/type"
import type { Swiper as SwiperClass } from "swiper"
import img9FIFTY from "@@/assets/images/9FIFTY.png"
import img9FORTY from "@@/assets/images/9FORTY.png"
import img9SEVENTY from "@@/assets/images/9SEVENTY.png"
import img9TWENTY from "@@/assets/images/9TWENTY.png"
import img39THIRTY from "@@/assets/images/39THIRTY.png"
import imgAFrame from "@@/assets/images/59FIFTY A‑Frame.png"
import imgProfile from "@@/assets/images/59FIFTY Low Profile.png"
import imgCrown from "@@/assets/images/59FIFTY Retro Crown.png"
import imgPanel from "@@/assets/images/59FIFTY Split Panel.png"
import imgJingdian from "@@/assets/images/59FIFTY 经典全封.png"
import imgCASUAL from "@@/assets/images/CASUAL CLASSIC.png"

import { Autoplay } from "swiper/modules"
import { Swiper, SwiperSlide } from "swiper/vue"

// Import Swiper styles
import "swiper/css"
import "swiper/css/autoplay"

const props = defineProps<{ data: IData["data"] }>()

const imagMap = new Map([
  ["59FIFTY 经典全封", imgJingdian],
  ["59FIFTY A‑Frame", imgAFrame],
  ["59FIFTY Split Panel", imgPanel],
  ["59FIFTY Low Profile", imgProfile],
  ["59FIFTY Retro Crown", imgCrown],
  ["9FORTY", img9FORTY],
  ["9TWENTY", img9TWENTY],
  ["CASUAL CLASSIC", imgCASUAL],
  ["9SEVENTY", img9SEVENTY],
  ["9FIFTY", img9FIFTY],
  ["39THIRTY", img39THIRTY]
])

console.log("props: ", props.data)

const isShowMore = ref(false)

const status = ref({
  activeIndex: 0,

  isBeginning: true,
  isEnd: false,
  currentImg: ""
})

function changeIsShowMore() {
  isShowMore.value = !isShowMore.value
}

const swiperInstance = ref<SwiperClass>()

function onSwiper(swiper: SwiperClass) {
  swiperInstance.value = swiper

  status.value.activeIndex = swiper.activeIndex
}

function onSlideChange(swiper: SwiperClass) {
  status.value.currentImg = ""

  status.value.activeIndex = swiper.activeIndex

  status.value.isBeginning = swiper.isBeginning
  status.value.isEnd = swiper.isEnd
}

function onAfterInit(swiper: SwiperClass) {
  console.log("onAfterInit swiper: ", swiper)
  status.value.isBeginning = swiper.isBeginning
  status.value.isEnd = swiper.isEnd
}

function onSubItemClick(item: string) {
  status.value.currentImg = item
}

function slidePrev() {
  swiperInstance.value?.slidePrev()
}

function slideNext() {
  swiperInstance.value?.slideNext()
}

const hatRecommend = computed<{
  images: string[]
  score: number
  brimStyle: string
  sellingPoint: string
  series: string
}[]>(() => {
  const arr = JSON.parse(props.data.hatRecommend1)

  return arr
})

console.log("swiperThree hatRecommend: ", hatRecommend.value)

const currentHat = computed(() => hatRecommend.value[0])
</script>

<template>
  <section class="h-full">
    <img src="@@/assets/images/logo.png" class="ml-35px mt-30px h-26px w-194px" alt="Logo">

    <h1 class="mt-37px text-center text-33px text-#FFFFFF font-bold leading-none">
      检测报告
    </h1>

    <div class="w-623px h-1060px  mx-auto bg-[url(@@/assets/images/subpage-bg.png)] bg-cover bg-no-repeat px-35px relative mt-42px">
      <div class="font-[AliHYAiHei] text-21px text-#000 mt-35px inline-block leading-none">
        脸型特色  大盘点
      </div>

      <!-- 头像图标 -->
      <img src="@@/assets/images/avatar.png" class="absolute left-50% -translate-x-1/2 w-181px -top-42px">

      <div class="text-#BC9B6A text-23px font-[AliHYAiHei] mt-88px mb-21px leading-none">
        你的专属帽款TOP榜 新鲜出炉啦～
      </div>

      <section class="mt-9px font-[SourceHanSansCN-Light] text-17px">
        本推荐基于脸型、头型与偏好综合分析，因佩戴习惯差异，请以实际试戴
        为准
      </section>

      <!-- TOP1适配帽款 -->
      <section class="mt-28px flex items-center">
        <img src="@@/assets/images/newera-icon.png" class="w-38px align-middle mr-10px">

        <div class="text-#000 text-23px font-[AliHYAiHei] leading-none">
          TOP1适配帽款
        </div>
      </section>

      <section class="mt-36px">
        <!-- title区域 -->
        <div class="w-335px h-71px box-border mx-auto flex items-center justify-center bg-[url(@@/assets/images/hat-detail-head-bg.png)] bg-contain bg-no-repeat">
          <p class="text-center">
            <b class="text-22px font-[SourceHanSansCN-Medium] text-#FFF font-900">匹配度</b>
            <span class="text-#000 text-27px font-[AliHYAiHei] ml-7px">{{ currentHat.score }}%</span>
          </p>
        </div>

        <section
          class="w-441px  bg-black mx-auto rounded-34px pt-22px box-border"
          :class="{
            'h-631px': isShowMore,
            'h-553px shadow-2xl shadow-[#BA6F00]': !isShowMore,
          }"
        >
          <div
            class="w-390px mx-auto  bg-contain bg-no-repeat pt-50px"

            :class="{
              'h-553px bg-[url(@@/assets/images/hat-detail-long-area.png)]': isShowMore,
              'h-422px bg-[url(@@/assets/images/hat-detail-short-area.png)]': !isShowMore,
            }"
          >
            <div class="text-center">
              <!-- <img src="@@/assets/images/xinghao.png" class="w-176px inline-block"> -->
              <img :src="imagMap.get(currentHat.series)" class="w-176px inline-block">
            </div>

            <div class="text-22px text-#000 font-[AliHYAiHei] text-center leading-none mt-11px">
              <!-- NE5950 经典全封帽 -->
              {{ currentHat.brimStyle }}
            </div>

            <!-- 帽子大图 -->
            <Swiper
              :speed="200"
              :loop="false"
              :autoplay="false"
              :modules="[Autoplay]"
              :nested="true"
              class="relative"
              @swiper="onSwiper"
              @after-init="onAfterInit"
              @slide-change="onSlideChange"
            >
              <img
                v-if="!status.isBeginning"
                @click="slidePrev"
                src="@@/assets/images/left-icon.png"
                class="w-19px absolute left-0 top-50% -translate-y-50% z-10"
              >

              <img
                v-if="!status.isEnd"
                @click="slideNext"
                src="@@/assets/images/right-icon.png"
                class="w-19px absolute right-0 top-50% -translate-y-50% z-10"
              >

              <SwiperSlide
                v-for="(item, index) in hatRecommend[0].images"
                :key="index"
              >
                <div
                  class="text-center "
                  :class="{
                    'mt-15px': isShowMore,
                    'mt-45px': !isShowMore,
                  }"
                >
                  <img :src="status.currentImg || item" class="w-209px inline-block">
                </div>
              </SwiperSlide>
            </Swiper>

            <!-- <div class="text-center mt-45px bg-blue-6">
              <img src="@@/assets/images/hat-item.png" class="w-249px inline-block">
            </div> -->

            <div
              @click="changeIsShowMore"
              class="flex items-center justify-center w-150px h-25px rounded-full text-#000 mx-auto"
              :class="{
                'mt-10px': isShowMore,
                'mt-50px': !isShowMore,

                'bg-#9E7742': isShowMore,
                'bg-#FFF': !isShowMore,
              }"
            >
              <img src="@@/assets/images/eye-icon.png" class="w-20px inline-block">
              <span class="font-[SourceHanSansCN-Light] text-16px ml-7px">查看更多颜色</span>
            </div>

            <div
              v-show="isShowMore"
              class="h-180px mt-36px grid grid-cols-2 gap-10px overflow-y-scroll px-25px"
            >
              <div
                class="text-center"
                v-for="(item, index) in currentHat.images"
                :key="index"
                @click="onSubItemClick(item)"
              >
                <!-- <img src="@@/assets/images/hat-item.png" class="h-75px"> -->
                <img :src="item" class="h-75px">
              </div>
            </div>
          </div>

          <div
            class="font-[SourceHanSansCN-Medium] text-17px text-#FFF w-390px mt-0px mx-auto leading-none"

            :class="{
              'mt-0px': isShowMore,
              'mt-23px': !isShowMore,
            }"
          >
            <!-- 经典硬顶+可调节后扣，兼顾挺括与便利 -->
            {{ currentHat.sellingPoint }}
          </div>
        </section>
      </section>
    </div>
  </section>
</template>
