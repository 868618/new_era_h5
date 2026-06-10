<script setup lang="ts">
import type { IData } from "@@/apis/index/type"
import { getReportDetail } from "@@/apis/index"
import { injectLocal, provideLocal } from "@vueuse/core"

// import Swiper JS
import Swiper from "swiper"

import { Navigation, Pagination } from "swiper/modules"
import { useRoute } from "vue-router"
import SwiperFour from "./components/SwiperFour.vue"
import SwiperOne from "./components/SwiperOne.vue"
import SwiperThree from "./components/SwiperThree.vue"
import SwiperTwo from "./components/SwiperTwo.vue"

// import Swiper styles
import "swiper/css"

import "swiper/css/navigation"

import "swiper/css/pagination"

const data = ref()

const route = useRoute()
console.log("route: -------", route.query.detectionId)

getReportDetail(route.query.detectionId as string).then((res) => {
  if (res.code === 200) {
    console.log("reportDetail.data : ", res)

    data.value = res.data
  }
})

const hatRecommend = computed<{
  images: string[]
  score: number
  brimStyle: string
  sellingPoint: string
  series: string
}[]>(() => {
  if (!data.value) return []

  const arr = JSON.parse(data.value.hatRecommend)

  const result = arr.map((i: any) => {
    const images = JSON.parse(i.images)

    return { ...i, images }
  })

  return result
})

console.log("Index -----  hatRecommend: ", hatRecommend.value)

const status = reactive({
  isBeginning: true,
  isEnd: false
})

const swiperInstance = ref<Swiper>()

watch(() => data.value, async () => {
  if (data.value) {
    await nextTick()

    swiperInstance.value = new Swiper(".custom-swiper", {
      loop: false,

      nested: true,

      initialSlide: 0,

      modules: [Navigation, Pagination],

      // If we need pagination
      pagination: {
        el: ".swiper-pagination"
      },

      observer: true,

      on: {

        afterInit(swiperInstance) {
          status.isBeginning = swiperInstance.isBeginning
          status.isEnd = swiperInstance.isEnd
        },

        slideChange(swiperInstance) {
          status.isBeginning = swiperInstance.isBeginning
          status.isEnd = swiperInstance.isEnd
        }
      }

    })
  }
})

function slideNext() {
  console.log("slideNext: ")
  swiperInstance.value?.slideNext()
}
function slidePrev() {
  swiperInstance.value?.slidePrev()
}
</script>

<template>
  <section v-if="data" class="h-full">
    <!-- <section class="swiper h-1310px"> -->

    <img
      v-if="!status.isBeginning"
      @click="slidePrev"
      src="@@/assets/images/prev-icon.png"
      class="w-46px h-140px fixed left-0 top-55% z-10"
    >

    <img
      v-if="!status.isEnd"
      @click="slideNext"
      src="@@/assets/images/next-icon.png"
      class="w-46px h-140px fixed right-0 top-55% z-10"
    >

    <section class="custom-swiper swiper h-full">
      <section class="swiper-wrapper box-border">
        <section class="swiper-slide w-full h-full">
          <SwiperOne :data="data" />
        </section>

        <section class="swiper-slide w-full h-full">
          <SwiperTwo :data="data" />
        </section>

        <!-- swiper第3页 -->
        <!-- <section class="swiper-slide w-full h-full">
          <SwiperThree :data="data" />
        </section> -->

        <section
          v-for="(item, index) in hatRecommend"
          :key="index"
          class="swiper-slide w-full h-full"
        >
          <SwiperThree :data="{ ...data, hatRecommend1: JSON.stringify([{ ...item }]) }" />
        </section>

        <section class="swiper-slide w-full h-full">
          <SwiperFour :data="data" />
        </section>
      </section>

      <!-- 底部swiper指示点 -->
      <div class="swiper-pagination" />
    </section>
  </section>
</template>

<style  scoped lang="less">
:deep(.swiper-pagination) {
  /* background-color: red !important; */
}

:deep(.swiper-pagination-bullet) {
  background-color: #a7a8ac !important;
  width: 7px !important;
  height: 7px !important;
  opacity: 1 !important;
}

:deep(.swiper-pagination-bullet-active) {
  width: 96px !important;
  height: 7px !important;
  border-radius: unset !important;
  background: url("@@/assets/images/swiper-pagination-bullet-active.png") no-repeat center !important;
  background-size: 100% !important;
}
</style>
