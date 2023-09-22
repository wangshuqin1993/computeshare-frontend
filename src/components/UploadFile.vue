<template>
  <a-upload-dragger
    v-model:fileList="fileList"
    name="file"
    :showUploadList="false"
    :multiple="true"
    :before-upload="beforeUpload"
    :customRequest="handleUploadAttachement"
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
import { apiUploadScript } from '@/apis/script'

const props = defineProps({
  suffixNames:{
    type:String,
    default: '.py'
  }
})
const { suffixNames } = toRefs(props);

const fileList = ref([]);
const handleUploadAttachement = async (fileData) => {
  console.log("fileData:::", fileData);
  

  const res = await apiUploadScript(fileData.file);
  console.log("res::::",res);
  if (res.code == 200) {
     
    message.success(res.message);
  }else{
    message.error(res.message)
  }
};
function handleDrop(e: DragEvent) {
  console.log(e);
}
//文件后缀名验证
const beforeUpload = (file) => {
  let suffixArr = suffixNames.value.split(' ');
  let suffixVal = file.name.substring(file.name.indexOf("."), file.name.length);
  let isTrue = false;
  suffixArr.forEach((ele:string) => {
    if (ele.indexOf("...") > 0 && suffixVal === ele.substring(0, ele.indexOf("..."))
      || suffixVal === ele) {
      isTrue = true;
    }
  });
  if (!isTrue) {
    message.error(`${file.name} is not a ${suffixNames.value} file`);
  }
  return isTrue;
};


defineExpose({
  handleUploadAttachement,beforeUpload
})
</script>

<style scoped lang="less">
</style>
