<script setup lang="ts">
import type { IData } from "@@/apis/index/type"

const props = defineProps<{ data: IData["data"] }>()

const html = computed(() => props.data.conclusion.replace("\\r\\n", "<br />"))
</script>

<template>
  <section class="h-full">
    <img src="@@/assets/images/logo.png" class="ml-35px mt-30px h-26px w-194px" alt="Logo">

    <h1 class="mt-37px text-center text-33px text-#FFFFFF font-bold leading-none">
      检测报告
    </h1>

    <div class="w-623px h-1060px flex flex-col mx-auto bg-[url(@@/assets/images/subpage-bg.png)] bg-cover bg-no-repeat px-35px relative mt-42px">
      <div class="font-[AliHYAiHei] text-21px text-#000 mt-35px inline-block leading-none">
        属帽款TOP榜
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

      <section class="flex-1 text-#BC9B6A text-23px font-[AliHYAiHei] flex flex-col items-center justify-center">
        <!-- <div class="text-center leading-63px">
          每一顶都是你的颜值加分神器<br> 保持气场，做最有型的自己
        </div> -->
        <div class="text-center leading-63px" style="white-space:pre-wrap" v-html="html" />
      </section>
    </div>
  </section>
</template>
