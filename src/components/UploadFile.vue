<template>
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
    <p class="ant-upload-hint">支持扩展名：{{ suffixNames }}</p>
  </a-upload-dragger>
</template>

<script setup lang="ts">
import { ref ,toRefs} from "vue";
import { message } from 'ant-design-vue';
import type { UploadChangeParam } from 'ant-design-vue';

const props = defineProps({
  suffixNames:{
    type:String,
    default: '.py'
  }
})
const { suffixNames } = toRefs(props);

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
</style>
