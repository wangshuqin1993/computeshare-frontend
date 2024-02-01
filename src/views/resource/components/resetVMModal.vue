<template>
  <a-modal :footer="null" title="重置实例" width="758px" centered="true" v-model:open="visible" @cancel="handleCancel">
    <div class="mt-[30px] ">
      <div class="mb-[30px] bg-[#FFFBE6] border border-solid border-[#FFE58F] rounded-[2px] py-[10px] px-[20px] flex">
        <div class="pt-[2px]">
          <img src="@/assets/images/IconWarning.png" class="h-[14px] w-[14px] mr-[8px]" />
        </div>
        <div class="text-[12px] text-[#595750]">
          重置实例后,实例中的所有数据将被永久删除,且此操作无法撤销。
        </div>
      </div>
      <a-form :model="formData" ref="formRef" :rules="formRules" :label-col="labelCol">
        <a-form-item class="more-raido" label="操作系统：" name="imageId">
          <a-radio-group v-model:value="formData.imageId">
            <a-radio-button v-for="(item,key) in imageList" :key="key" :value="item.id">{{ item.name }}</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="用户名：" name="username">
          <div class="!text-[16px] font-medium leading-[42px]">{{ formData.username }}</div>
        </a-form-item>
        <a-form-item label="密码：" name="password">
          <a-input-password class="modal-input" autocomplete="off" v-model:value="formData.password" placeholder="请输入密码"/>
        </a-form-item>
        <a-form-item label="公钥：" name="publicKey" class="!mb-0">
          <a-textarea class="modal-input" v-model:value="formData.publicKey" :auto-size="{ minRows: 4, maxRows: 4 }" placeholder="请输入公钥信息..." show-count :maxlength="500" />
        </a-form-item>
        <div class="ml-[120px]">
          <a-upload 
            :showUploadList="false"
            :multiple="true"
            :customRequest="handleUploadAttachement"
            :before-upload="beforeUpload"
            accept=".pub"
            >
            <label class="text-[#484FFF] text-[14px] font-medium underline cursor-pointer">从本地文件读取</label>
          </a-upload>
        </div>
        <div class="mt-[50px] text-center">
          <a-button class="ant-btn-m" type="primary" @click="handleReset">重置</a-button>
        </div>
      </a-form>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRefs } from 'vue';
import { message } from 'ant-design-vue';
import { apiGetImage, apiResetVm } from '@/apis/compute';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  resetImageId: {
    type: Number,
    default: 0
  },
  id: {
    type: String,
    default: ''
  }
});
const { visible,resetImageId,id } = toRefs(props);
const emit = defineEmits(["handleCancel","handleDone"]);

const labelCol = { style: { width: '120px' } };
const imageList = ref([]);
const formRef = ref();
const formData = reactive({
  imageId: resetImageId.value,
  username: 'root',
  password: '',
  publicKey:'', //公匙
});
const formRules = computed(() => {

  const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });
  
  return {
    imageId: [requiredRule('请选择操作系统')],
    username: [requiredRule('请输入用户名称')],
    password: [requiredRule('请输入密码')],
  };
});

const handleCancel = () => {
  formData.password = '';
  formData.publicKey = '';
  formRef.value.resetFields();
  emit('handleCancel');
}
const handleReset = async () => {
  await formRef.value.validate();

  const res = await apiResetVm(id.value, formData);
  if (res.code == 200) {
    message.success(res.message)
    handleCancel();
    emit('handleDone');
  }else{
    message.error(res.message)
  }
}
// 操作系统
const getImage = async () => {

  const res = await apiGetImage();
  if (res.code == 200) {
    imageList.value = res.data;
  }else{
    message.error(res.message)
  }
}
//上传文件
const handleUploadAttachement = async (fileData) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    formData.publicKey = event.target.result;
  };
  reader.readAsText(fileData.file);
}
//文件后缀名验证
const beforeUpload = (file) => {
  
  let suffixVal = file.name.substring(file.name.indexOf("."), file.name.length);
  if (suffixVal !== '.pub') {
    message.error(`请上传 .pub 的文件`);
    return false;
  }
};

onMounted(() => {
  getImage();
})
</script>