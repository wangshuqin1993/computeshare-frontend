<!-- 我的资源 -->
<template>
  <div class="m-[20px]">
    <div class="bg-[#FFFFFF] rounded-[2px] mb-[20px] p-[20px]">
      <div v-if="noData">
        <a-upload-dragger
          v-model:fileList="fileList"
          name="file"
          :multiple="true"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          @change="handleChange"
          @drop="handleDrop"
        >
          <p class="ant-upload-drag-icon flex justify-center">
            <img src="@/assets/images/upload.png" class="h-[36px]">
          </p>
          <p class="ant-upload-text">可将脚本文件拖至此处上传</p>
          <p class="ant-upload-hint">支持扩展名：.py</p>
        </a-upload-dragger>
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
import { message } from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue';
import ExecutionList from "./executionList.vue"

const noData = ref(false);
const uploadContent = ref("asdfasdf\nasdfa\n")
const fileList = ref([]);
const handleChange = (info: UploadChangeParam) => {
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};
function handleDrop(e: DragEvent) {
  console.log(e);
}

</script>

<style scoped lang="less">
.card-div{
  box-shadow: 0px 0px 20px 0px #EBEBF5;
  border-radius: 8px;
  border: 1px solid #E9E9E9;
  padding: 30px 20px 20px 20px;
}
.card-sub-title{
  font-size: 14px;
  color: #8C8C8C;
}
.tips-css{
  color: #606266;
  cursor: pointer;
  padding: 10px 20px;
}
.tips-css:hover{
  background-color: #F5F7FA;
}
.tips-css:active{
  background-color: #F5F7FA;
  color: #1989FA;
}
.border-t{
  border-top: 1px solid #E9E9E9;
}
</style>
