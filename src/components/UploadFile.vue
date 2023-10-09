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
  >
  <!--     :accept="suffixNames" -->
    <p class="ant-upload-drag-icon flex justify-center">
      <img src="@/assets/images/upload.png" class="h-[36px]">
    </p>
    <p class="ant-upload-text">可将脚本文件拖至此处上传</p>
    <p class="ant-upload-hint">支持扩展名：{{ suffixText }}</p>
  </a-upload-dragger>
  <!-- <FileTips v-if="fileList.length > 0 && curBarName === 'Storage'" :fileList="fileList"></FileTips> -->
</template>

<script setup lang="ts">
import { ref ,toRefs} from "vue";
import { message, type UploadChangeParam } from 'ant-design-vue';
import { useRouter } from "vue-router";
import FileTips from "./FileTips.vue";
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
    try {
      res = await apiUploadStorage(formData);
    } catch (error:any) {
      setFileStatus(fileData.file.uid, 'error');
      message.error('上传失败')
      return
    }
  } else {
    res = await apiUploadScript(formData);
    scriptInfo.value = res.data
  }
  if (res.code == 200) {
    emit('refreshList')
    setFileStatus(fileData.file.uid, 'done');
    message.success(res.message);
  } else {
    setFileStatus(fileData.file.uid, 'error');
    message.error(res.message)
  }
};
const setFileStatus = (fileUid, newStatus) => {
  fileList.value.forEach((ele) => {
    if (ele.uid === fileUid) {
      ele.status = newStatus;
    }
  });
}
function handleDrop(e: DragEvent) {
  console.log(e);
}
//文件后缀名验证
const beforeUpload = (file) => {
  console.log('文件后缀名验证:',file.size)
  if(file.size>102400){
    message.error('目前支持存储不超过 100MB 的文件。后续将持续优化,扩大文件存储上限。')
    return false
  }
  if(suffixNames.value=='.*'){
    return true
  }
  let suffixArr = suffixNames.value.split(',');
  let suffixVal = file.name.substring(file.name.indexOf("."), file.name.length);
  let isTrue = false;
  suffixArr.forEach((ele:string) => {
    if (suffixVal === ele) {
      isTrue = true;
    }
  });
  if (!isTrue) {
    message.error(`请上传${suffixText.value}的文件`);
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
