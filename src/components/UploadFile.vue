<template>
  <a-upload-dragger
    v-model:fileList="fileList"
    name="file"
    :showUploadList="false"
    :multiple="true"
    :before-upload="beforeUpload"
    :customRequest="handleUploadAttachement"
    @drop="handleDrop"
    :accept="suffixNames"
  >
    <p class="ant-upload-drag-icon flex justify-center">
      <img src="@/assets/images/upload.png" class="h-[36px]">
    </p>
    <p class="ant-upload-text">可将脚本文件拖至此处上传</p>
    <p class="ant-upload-hint">支持扩展名：{{ suffixText }}</p>
  </a-upload-dragger>
</template>

<script setup lang="ts">
import { ref ,toRefs} from "vue";
import { message } from 'ant-design-vue';
import { useRouter } from "vue-router";
import { apiUploadScript } from '@/apis/script';
import { apiUploadStorage } from '@/apis/storage';

const router = useRouter();
const props = defineProps({
  suffixNames:{
    type:String,
    default: '.py'
  },
  suffixText: {
    type:String,
    default: '.py'
  }
})
const { suffixNames,suffixText } = toRefs(props);

const curBarName = ref(router.currentRoute.value.name);
console.log("curBarName:::",curBarName.value);
const fileList = ref([]);
const handleUploadAttachement = async (fileData) => {
  console.log(222222,fileList.value)
  console.log(11111111,fileData.file)
  console.log("fileData:::", fileData);
  // debugger
  let res:any = {};
  //文件存储
  if (curBarName.value === 'Storage') {
    res = await apiUploadStorage(JSON.stringify(fileData.file));
  } else {
    res = await apiUploadScript(JSON.stringify(fileData.file));
  }
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
  let suffixArr = suffixNames.value.split(',');
  let suffixVal = file.name.substring(file.name.indexOf("."), file.name.length);
  let isTrue = false;
  suffixArr.forEach((ele:string) => {
    if (suffixVal === ele) {
      isTrue = true;
    }
  });
  if (!isTrue) {
    message.error(`${file.name} is not a ${suffixText.value} file`);
  }
  return isTrue;
};


defineExpose({
  handleUploadAttachement,beforeUpload
})
</script>

<style scoped lang="less">
</style>
