<template>
  <div class="bg-[#FFFFFF] rounded-[2px] mt-[20px] px-[46px] py-[20px]">
    <div class="text-[18px] font-semibold mb-[26px]">教程与工具</div>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="(item,key) in toolsList" :key="key">
        <div class="font-semibold">{{ item.title }}</div>
        <div class="font-light mt-[10px]" v-for="(subItem,subKey) in item.content" :key="subKey">{{ subItem.text }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const toolsList = ref([
  { title: '快速入门', content: [{ text: '什么是云服务器 >'},{ text: '产品优势 >'},{ text: '应用场景 >'},{ text: '云服务使用须知 >'}]},
  { title: '用户指南', content: [{ text: '云服务器计费说明 >'},{ text: '迁移云服务器 >'},{ text: '迁移自建数据库 >'},{ text: '如何配置内网互通 >'}]},
  { title: '最佳实践', content: [{ text: '建站零基础 >'},{ text: '如何打造博客 >'},{ text: '如何选择镜像 >'},{ text: '更多最佳实践 >'}]},
  { title: '常见问题', content: [{ text: '续费概述 >'},{ text: '升降配方式概述 >'},{ text: '退款说明 >'},{ text: '更多常见问题 >'}]},
]);
</script>

<style scoped lang="less">
</style>
