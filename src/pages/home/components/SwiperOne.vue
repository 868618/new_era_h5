<script setup lang="ts">
import type { IData } from "@@/apis/index/type"

const props = defineProps<{ data: IData["data"] }>()
console.log("props: ", props.data)

const title = computed(() => {
  const { faceShape, faceWidthLabel, cheekboneWidthLabel } = props.data

  return `${faceShape}+${faceWidthLabel}+${cheekboneWidthLabel}`
})

const desc = computed(() => {
  const json = JSON.parse(props.data.faceSummary)
  console.log("json: ", json)

  return json
})

console.log("desc: ", desc.value)
</script>

<template>
  <section class="pl-35px h-full">
    <img src="@@/assets/images/logo.png" class="ml-35px mt-30px h-26px w-194px" alt="Logo">

    <h1 class="mt-37px text-center text-33px text-#FFFFFF font-bold leading-none mr-35px">
      检测报告
    </h1>
    <div class="relative mt-39px block box-border ">
      <img src="@@/assets/images/main-bg.png" class="w-full">

      <div class="absolute left-0 top-0 h-full w-full">
        <!-- 钉子图标 -->
        <img src="@@/assets/images/nail.png" class="ml-65px mt-65px w-34px">

        <!-- 头像图标 -->
        <img src="@@/assets/images/avatar.png" class="absolute left-254px w-181px -top-12px">

        <div class="ml-68px mr-110px mt-50px flex items-center justify-between">
          <div class="relative text-22px text-#000 leading-none font-[AliHYAiHei]">
            欢迎开启你的专属帽款报告

            <img src="@@/assets/images/under-shadow.png" class="absolute left-0 w-full -bottom-10px">
          </div>

          <div class="text-center text-22px text-#747474 !font-[SourceHanSansCN-Light]">
            你的脸型是
          </div>
        </div>

        <!-- 鹅蛋脸+比例均衡+标准颧型 -->
        <div class="ml-65px mt-25px text-42px text-#000 leading-none font-[AliHYAiHei]">
          {{ title }}
        </div>

        <section class="ml-65px mt-59px h-622px w-540px bg-[url(@@/assets/images/hat-bg.png)] bg-[100%] bg-no-repeat bg-contain">
          <header class="h-[calc(100%-122px)] relative block text-center">
            <img v-if="props.data.gender === 1" src="@@/assets/images/boy.png" class="h-[calc(100%-28px)] mt-28px inline-block">
            <img v-if="props.data.gender === 2" src="@@/assets/images/girl.png" class="h-[calc(100%-28px)] mt-28px inline-block">

            <img src="@@/assets/images/face-mask.png" class=" absolute left-216px top-105px w-127px">

            <div class="absolute flex items-center justify-center -left-65px h-75px w-180px top-9px bg-[url(@@/assets/images/face-type-bg.png)] bg-cover">
              <div class="flex flex-col items-center">
                <img src="@@/assets/images/face-icon.png" class="w-38px">
                <span class="text-13px mt-6px font-[SourceHanSansCN-Light]]">脸型</span>
              </div>

              <!-- 方脸 -->
              <div class="text-27px font-bold ml-17px">
                {{ props.data.faceProportion }}
              </div>

              <section class="absolute top-50px left-100%">
                <img src="@@/assets/images/line-1.png" class="w-88px">
              </section>
            </div>

            <div class="absolute flex items-center justify-center -left-65px h-75px w-180px top-234px bg-[url(@@/assets/images/face-type-bg.png)] bg-cover">
              <div class="flex flex-col items-center">
                <img src="@@/assets/images/face-icon.png" class="w-38px">
                <span class="text-13px mt-6px font-[SourceHanSansCN-Light]]">面宽</span>
              </div>

              <div class="text-27px font-bold ml-17px">
                {{ props.data.faceWidthLabel }}
              </div>

              <section class="absolute -top-27px left-100%">
                <img src="@@/assets/images/line-2.png" class="w-111px">
              </section>
            </div>

            <div class="absolute flex items-center justify-center -left-65px h-75px w-180px top-410px bg-[url(@@/assets/images/face-type-bg.png)] bg-cover">
              <div class="flex flex-col items-center">
                <img src="@@/assets/images/face-icon.png" class="w-38px">
                <span class="text-13px mt-6px font-[SourceHanSansCN-Light]]">面部比例</span>
              </div>

              <div class="text-27px font-bold ml-17px">
                {{ props.data.faceShape }}
              </div>

              <section class="absolute bottom-12px left-100%">
                <img src="@@/assets/images/line-3.png" class="w-162px">
              </section>
            </div>

            <div class="absolute flex items-center justify-center -right-65px h-75px w-180px top-112px bg-[url(@@/assets/images/face-type-bg.png)] bg-cover">
              <div class="flex flex-col items-center">
                <img src="@@/assets/images/face-icon.png" class="w-38px">
                <span class="text-13px mt-6px font-[SourceHanSansCN-Light]]">颧骨高度</span>
              </div>

              <div class="text-24px font-bold ml-7px">
                {{ props.data.cheekboneHeightLabel }}
              </div>

              <section class="absolute top-21px right-100%">
                <img src="@@/assets/images/line-4.png" class="w-96px">
              </section>
            </div>

            <div class="absolute flex items-center justify-center -right-65px h-75px w-180px top-327px bg-[url(@@/assets/images/face-type-bg.png)] bg-cover">
              <div class="flex flex-col items-center">
                <img src="@@/assets/images/face-icon.png" class="w-38px">
                <span class="text-13px mt-6px font-[SourceHanSansCN-Light]]">颧骨宽度</span>
              </div>

              <div class="text-24px font-bold ml-7px">
                {{ props.data.cheekboneWidthLabel }}
              </div>

              <section class="absolute bottom-50px right-100%">
                <img src="@@/assets/images/line-5.png" class="w-113px">
              </section>
            </div>
          </header>

          <footer class="relative z-10 box-border h-122px flex flex-shrink-0 rounded-b-34px flex-col justify-center bg-#000 px-29px text-#000 text-#FFF">
            <div class="text-22px leading-none font-[AliHYAiHei]">
              天选上镜脸型
            </div>

            <div class="mt-7px text-19px font-[SourceHanSansCN-Light]">
              搭配 <span class="text-#BC9B6A text-22px font-bold font-[AliHYAiHei] mx-2px">New Erakk</span>尽显轮廓优势，颜值与气场完美契合!尽显轮廓优势，颜值与气场完美契合!
            </div>
          </footer>
        </section>

        <section class="ml-65px mt-13px w-540px text-16px text-#000 font-[SourceHanSansCN-Light]">
          本报告仅为面部轮廓特征与比例参数的分析，基于 3D / 图像数据生成标签描述，结果会因拍摄姿势、发型、表情等因素产生差异，仅供日常穿搭、配饰选择参考，不具备医学诊断或专业容貌评估效力。
        </section>

        <section class="text-right">
          <img src="@@/assets/images/logo_black.png" class="mr-110px w-130px">
        </section>
      </div>
    </div>
  </section>
</template>
