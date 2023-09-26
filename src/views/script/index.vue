<template>
  <Header />
  <div class="m-[20px]">
    <div class="bg-[#FFFFFF] rounded-[2px] mb-[20px] p-[20px]">
      <div v-show="!uploadContent">
        <UploadFile ref="uploadRef" :suffixNames="suffixNames" @refreshList="refreshExecutionList"></UploadFile>
      </div>
      <div v-show="uploadContent" class="h-[228px] overflow-y-auto border border-solid border-[#A6A6A6] rounded-[8px] p-[20px]">
        <!-- <pre>{{ uploadContent }}</pre> -->
        <span v-html="uploadContent"></span>
      </div>
      <div class="mt-[20px] text-center flex justify-center items-center">
        <a-upload
          v-model:file-list="fileList"
          name="file"
          :showUploadList="false"
          :before-upload="beforeUpload"
          :customRequest="handleUploadAttachement"
          :accept="suffixNames"
        >
          <a-button type="primary" ghost class="ant-btn-ss flex justify-center items-center">
            <template #icon><img src="@/assets/images/upload-icon.png" class="h-[14px]"></template>
            上传脚本
          </a-button>
        </a-upload>
        <a-button type="primary" class="ant-btn-ss ml-[20px]" @click="executeScript">执行脚本</a-button>
      </div>
    </div>
    <ExecutionList ref="executionList"></ExecutionList>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from "vue";
import UploadFile from '@/components/UploadFile.vue';
import ExecutionList from "./executionList.vue"
import Header from "@/components/Header.vue";
import { apiExecuteScript } from '@/apis/script'
import { message } from "ant-design-vue";

const suffixNames = ref(".py");
const uploadContent = ref()
const executionList = ref()
const executionId = ref()

const fileList = ref([]);
const uploadRef = ref();
const handleUploadAttachement = async (fileData: any) => {
  uploadRef.value.handleUploadAttachement(fileData);
};

const beforeUpload = (file: any) => {
  return uploadRef.value.beforeUpload(file);
};

// 执行脚本
const executeScript = async () => {
  const res = await apiExecuteScript({id:executionId.value});
  console.log("res:::",res);
  if(res.code==200){
    message.success('正在执行中')
  }else{
    message.error(res.message)
  }
}

const refreshExecutionList = ()=>{
  // executionList.value.getScriptList()
  console.log('那上次：：',uploadRef.value.scriptInfo)
  uploadContent.value = uploadRef.value.scriptInfo.scriptContent.replace(/\n/g, '<br>');
  executionId.value = uploadRef.value.scriptInfo.id
}
</script>

<style scoped lang="less">
</style>
