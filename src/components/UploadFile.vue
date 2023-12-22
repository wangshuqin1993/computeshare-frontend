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
    <div v-if="curBarName == 'StorageDetail'">
      <p class="ant-upload-text">可将文件拖至此处上传</p>
      <p class="ant-upload-hint">您可以将任何文件类型（图像、备份、数据、电影等）上传到S3存储桶<br>上传的文件的最大大小为3GB</p>
    </div>
    <div v-else>
      <p class="ant-upload-text">可将脚本文件拖至此处上传</p>
      <p class="ant-upload-hint">支持扩展名：{{ suffixText }}</p>
    </div>
  </a-upload-dragger>
  <div v-if="curBarName == 'StorageDetail'" class="mt-[20px] flex justify-center">
    <a-upload class="mr-[20px]"
        v-model:fileList="fileList"
        name="file"
        :showUploadList="false"
        :before-upload="beforeUpload"
        :customRequest="handleUploadAttachement"
        :accept="suffixNames"
        @change="handleFileChange"
      >
      <a-button type="primary" ghost class="flex">
        <img src="@/assets/images/update-file.png" class="h-[20px] mr-[8px]">
        上传文件
      </a-button>
    </a-upload>
    <a-upload
      v-model:fileList="fileList"
      name="folder"
      :showUploadList="false"
      :before-upload="beforeUpload"
      :customRequest="handleUploadAttachement"
      :multiple="true"
      @change="handleFileChange"
      :directory="true"
      >
      <a-button type="primary" ghost class="flex">
        <img src="@/assets/images/update-folder.png" class="h-[20px] mr-[8px]">
        上传文件夹
      </a-button>
    </a-upload>
    {{fileList}}
  </div>

</template>

<script setup lang="ts">
import { ref ,toRefs, watch} from "vue";
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
  if (curBarName.value === 'StorageDetail') {
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
watch(() => router.currentRoute.value,
  (value) => {
    curBarName.value = value.name;
  }, { deep: true, immediate: true }
)

defineExpose({
  handleUploadAttachement,
  beforeUpload,
  scriptInfo
})
</script>

<style scoped lang="less">
</style>
