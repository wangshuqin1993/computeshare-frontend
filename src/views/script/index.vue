<template>
  <Header />
  <div class="m-[20px]">
    <div class="bg-[#FFFFFF] rounded-[2px] mb-[20px] p-[20px]">
      <div v-if="noData">
        <UploadFile></UploadFile>
      </div>
      <div v-else class="h-[228px] overflow-y-auto border border-solid border-[#A6A6A6] rounded-[8px] p-[20px]">
        <pre>{{ uploadContent }}</pre>
      </div>
      <div class="mt-[20px] text-center flex justify-center items-center">
        <a-button type="primary" ghost class="ant-btn-ss flex justify-center items-center">
          <template #icon><img src="@/assets/images/upload-icon.png" class="h-[14px]"></template>
          上传脚本
        </a-button>
        <a-button type="primary" class="ant-btn-ss ml-[20px]">执行脚本</a-button>
      </div>
    </div>
    <ExecutionList></ExecutionList>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UploadFile from '@/components/UploadFile.vue';
import ExecutionList from "./executionList.vue"
import Header from "@/components/Header.vue";

const noData = ref(true);
const uploadContent = ref("asdfasdf\nasdfa\n")

</script>

<style scoped lang="less">
</style>
