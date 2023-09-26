<template>
  <a-upload-dragger
    v-model:fileList="fileList"
    name="file"
    :showUploadList="false"
    :multiple="true"
    :before-upload="beforeUpload"
    :customRequest="handleUploadAttachement"
    @drop="handleDrop"
    @change="handleFileChange"
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
import { message, type UploadChangeParam } from 'ant-design-vue';
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
const emit = defineEmits(["refreshList"])
// 上传脚本后拿到脚本信息
const scriptInfo = ref()

const curBarName = ref(router.currentRoute.value.name);

const fileList = ref([]);
const handleUploadAttachement = async (fileData) => {
  let formData = new FormData();
  formData.append('file', fileData.file);
  let res:any = {};
  //文件存储
  if (curBarName.value === 'Storage') {
    res = await apiUploadStorage(formData);
  } else {
    res = await apiUploadScript(formData);
    scriptInfo.value = res.data
  }
  if (res.code == 200) {
    emit('refreshList')
    message.success(res.message);
  } else {
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

const handleFileChange = async(info: UploadChangeParam)=>{
  console.log('handleFileChange',info)
  if (info.event !== undefined) {

  }
}

defineExpose({
  handleUploadAttachement,
  beforeUpload,
  scriptInfo
})
</script>

<style scoped lang="less">
</style>
