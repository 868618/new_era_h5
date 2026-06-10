<script setup lang="ts">
import type { IData } from "@@/apis/index/type"
import { injectLocal, provideLocal } from "@vueuse/core"

const props = defineProps<{ data: IData["data"] }>()
console.log("props: ---", props.data)

const faceFeatureAndSuggestions = computed<{ html: string }[]>(() => {
  const json: { text: string, highlightList: { word: string }[] }[] = JSON.parse(props.data.faceFeatureAndSuggestions)

  const result = json.map((i) => {
    const keywords = i.highlightList.map(item => item.word)

    const pattern = new RegExp(keywords.join("|"), "g")

    const html = i.text.replace(pattern, match => `<span class="custom-bg-${match.length}">${match}</span>`)

    return { ...i, html }
  })

  return result
})

const hatRecommend = computed(() => {
  const arr = JSON.parse(props.data.hatRecommend)

  const result = arr.map((i: any) => {
    const images = JSON.parse(i.images)

    return { ...i, images }
  })

  console.log("result: ", result)

  return result
})

console.log("swiperTwo hatRecommend: ", hatRecommend.value)
</script>

<template>
  <section class="h-full">
    <img src="@@/assets/images/logo.png" class="ml-35px mt-30px h-26px w-194px" alt="Logo">

    <h1 class="mt-37px text-center text-33px text-#FFFFFF font-bold leading-none">
      检测报告
    </h1>

    <div class="w-623px h-full mx-auto bg-[url(@@/assets/images/subpage-bg.png)] bg-contain bg-no-repeat px-35px relative mt-42px">
      <div class="font-[AliHYAiHei] text-21px text-#000 mt-35px inline-block">
        脸型特色  大盘点
      </div>

      <!-- 头像图标 -->
      <img src="@@/assets/images/avatar.png" class="absolute left-50% -translate-x-1/2 w-181px -top-42px">

      <div class="text-#BC9B6A text-23px font-[AliHYAiHei] mt-89px mb-21px">
        一起解锁你的专属亮点&搭配公式～
      </div>

      <section
        v-for="(item, index) in faceFeatureAndSuggestions"
        :key="index"
        class="mt-9px flex flex-col gap-y-23px"
      >
        <div class="flex  gap-x-11px text-17px font-[SourceHanSansCN-Medium] font-bold">
          <img src="@@/assets/images/check-mark-icon.png" class="w-20px h-16px mt-6px">

          <!-- 轮廓线条清晰硬朗，面部结构稳定立体，与 1233<span class="custom-bg-3">圆润弧</span>的设计风格高度契合，能完美展现帽款的设计细节和独特魅力 -->
          <div class="text-#000 flex-1leading-25px" v-html="item.html" />
        </div>
      </section>

      <!-- <section class="mt-9px flex flex-col gap-y-23px">
        <div class="flex gap-x-11px text-17px font-[SourceHanSansCN-Medium] font-bold">
          <img src="@@/assets/images/check-mark-icon.png" class="w-20px h-16px mt-6px">

          <div class="text-#000 flex-1 leading-25px">
            轮廓线条清晰硬朗，面部结构稳定立体，与 <span class="custom-bg-4">面部结构</span>的设计风格高度契合，能完美展现帽款的设计细节和独特魅力
          </div>
        </div>
      </section>

      <section class="mt-9px flex flex-col gap-y-23px">
        <div class="flex gap-x-11px text-17px font-[SourceHanSansCN-Medium] font-bold">
          <img src="@@/assets/images/check-mark-icon.png" class="w-20px h-16px mt-6px">

          <div class="text-#000 flex-1 leading-25px">
            面部比例小巧紧凑，搭配 <span class="custom-bg-5">高顶帽搭配</span> 可纵向拉长面部比例。
          </div>
        </div>
      </section> -->

      <section class="mt-56px text-#000 text-23px font-[AliHYAiHei]">
        <img src="@@/assets/images/newera-icon.png" class="w-38px align-middle mr-10px">

        帽型适配小贴士
      </section>

      <!-- 推荐帽款 -->
      <section class="grid grid-cols-2 gap-9px mt-24px overflow-y-scroll h-460px">
        <div
          v-for="(item, index) in hatRecommend"
          :key="index"
          class="w-273px h-227px bg-[url(@@/assets/images/hat-item-bg.png)] bg-[100%] bg-contain bg-no-repeat"
        >
          <section class="flex flex-col h-full pb-15px">
            <div class="flex-1 flex items-center justify-center">
              <!-- <img src="@@/assets/images/hat-tmp.png" class="w-148px"> -->
              <img :src="item.images[0]" class="w-148px">
            </div>

            <div class="h-65px flex flex-col justify-center pl-77px">
              <div class="text-#000 text-16px font-[SourceHanSansCN-Medium] relative max-w-170px">
                <!-- 脸型拉长魔法大师 -->
                {{ item.sellingPoint }}

                <img src="@@/assets/images/face-icon-mini.png" class="w-16px absolute -left-29px top-50% -translate-y-50%">
              </div>

              <div class="text-#FFF text-13px font-[SourceHanSansCN-Medium] mt-6px">
                <!-- 适合圆脸、方脸 -->
                {{ item.crownStyle }}
              </div>
            </div>
          </section>
        </div>

        <template v-if="false">
          <div class="w-273px h-227px bg-[url(@@/assets/images/hat-item-bg.png)] bg-[100%] bg-contain bg-no-repeat">
            <section class="flex flex-col h-full pb-15px">
              <div class="flex-1 flex items-center justify-center">
                <img src="@@/assets/images/hat-tmp.png" class="w-148px">
              </div>

              <div class="h-65px flex flex-col justify-center pl-77px">
                <div class="text-#000 text-16px font-[SourceHanSansCN-Medium] relative">
                  脸型拉长魔法大师

                  <img src="@@/assets/images/face-icon-mini.png" class="w-16px absolute -left-29px top-50% -translate-y-50%">
                </div>

                <div class="text-#FFF text-13px font-[SourceHanSansCN-Medium] mt-6px">
                  适合圆脸、方脸
                </div>
              </div>
            </section>
          </div>

          <div class="w-273px h-227px bg-[url(@@/assets/images/hat-item-bg.png)] bg-[100%] bg-contain bg-no-repeat">
            <section class="flex flex-col h-full pb-15px">
              <div class="flex-1 flex items-center justify-center">
                <img src="@@/assets/images/hat-tmp.png" class="w-148px">
              </div>

              <div class="h-65px flex flex-col justify-center pl-77px">
                <div class="text-#000 text-16px font-[SourceHanSansCN-Medium] relative">
                  脸型拉长魔法大师

                  <img src="@@/assets/images/face-icon-mini.png" class="w-16px absolute -left-29px top-50% -translate-y-50%">
                </div>

                <div class="text-#FFF text-13px font-[SourceHanSansCN-Medium] mt-6px">
                  适合圆脸、方脸
                </div>
              </div>
            </section>
          </div>

          <div class="w-273px h-227px bg-[url(@@/assets/images/hat-item-bg.png)] bg-[100%] bg-contain bg-no-repeat">
            <section class="flex flex-col h-full pb-15px">
              <div class="flex-1 flex items-center justify-center">
                <img src="@@/assets/images/hat-tmp.png" class="w-148px">
              </div>

              <div class="h-65px flex flex-col justify-center pl-77px">
                <div class="text-#000 text-16px font-[SourceHanSansCN-Medium] relative">
                  脸型拉长魔法大师

                  <img src="@@/assets/images/face-icon-mini.png" class="w-16px absolute -left-29px top-50% -translate-y-50%">
                </div>

                <div class="text-#FFF text-13px font-[SourceHanSansCN-Medium] mt-6px">
                  适合圆脸、方脸
                </div>
              </div>
            </section>
          </div>
        </template>
      </section>
    </div>
  </section>
</template>

<style   lang="less">
.custom-relative {
  position: relative;
  font-size: 22px;
  font-family: "AliHYAiHei";
  color: #000;
  padding: 0 3px;
}

.custom-bg-3 {
  .custom-relative();
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 99px;
    height: 46px;
    background: url("@@/assets/images/text-bg.png") no-repeat center;
    background-size: 100% 100%;
    z-index: 10;
    transform: translate(-45%, -45%);
  }
}

.custom-bg-4 {
  .custom-relative();
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 115px;
    height: 51px;
    background: url("@@/assets/images/text-bg.png") no-repeat center;
    background-size: 100% 100%;
    z-index: 10;
    transform: translate(-45%, -45%);
  }
}

.custom-bg-5 {
  .custom-relative();
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 133px;
    height: 50px;
    background: url("@@/assets/images/text-bg.png") no-repeat center;
    background-size: 100% 100%;
    z-index: 10;
    transform: translate(-45%, -50%);
  }
}

.custom-bg-6 {
  .custom-relative();
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 162px;
    height: 53px;
    background: url("@@/assets/images/text-bg.png") no-repeat center;
    background-size: 100% 100%;
    z-index: 10;
    transform: translate(-50%, -50%);
  }
}

.custom-bg-7 {
  .custom-relative();
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 179px;
    height: 53px;
    background: url("@@/assets/images/text-bg.png") no-repeat center;
    background-size: 100% 100%;
    z-index: 10;
    transform: translate(-50%, -50%);
  }
}

.custom-bg-8 {
  .custom-relative();
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 203px;
    height: 53px;
    background: url("@@/assets/images/text-bg.png") no-repeat center;
    background-size: 100% 100%;
    z-index: 10;
    transform: translate(-50%, -50%);
  }
}

.custom-bg-9 {
  .custom-relative();
  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    width: 222px;
    height: 53px;
    background: url("@@/assets/images/text-bg.png") no-repeat center;
    background-size: 100% 100%;
    z-index: 10;
    transform: translate(-50%, -50%);
  }
}
</style>
