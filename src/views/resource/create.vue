<template>
  <a-modal :footer="null" title="创建实例" width="758px" centered="true" v-model:open="createVisible" @cancel="handleCancel">
    <div class="mt-[30px] ">
      <a-form :model="formData" ref="formRef" :rules="formRules" :label-col="labelCol">
        <a-form-item label="规格：" name="specId">
          <a-radio-group v-model:value="formData.specId" @change="getInstancePrice">
            <a-radio-button v-for="(item,key) in specList" :key="key" :value="item.id">{{ item.core }}核 {{ item.memory }}GB</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item class="more-raido" label="操作系统：" name="imageId">
          <a-radio-group v-model:value="formData.imageId">
            <a-radio-button v-for="(item,key) in imageList" :key="key" :value="item.id">{{ item.name }}</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <!-- <a-form-item label="使用时长：" name="duration">
          <a-radio-group v-model:value="formData.duration">
            <a-radio-button  v-for="(item,key) in durationList" :key="key" :value="item.duration">{{ item.name }}</a-radio-button>
          </a-radio-group>
        </a-form-item> -->
        <a-form-item label="实例名称：" name="name">
          <a-input class="modal-input" autocomplete="off" v-model:value="formData.name" placeholder="请输入实例名称"/>
        </a-form-item>
        <a-form-item label="用户名：" name="username">
          <div class="!text-[16px] font-medium leading-[42px]">{{ formData.username }}</div>
        </a-form-item>
        <a-form-item label="密码：" name="password">
          <a-input-password class="modal-input" autocomplete="off" v-model:value="formData.password" placeholder="请输入密码"/>
        </a-form-item>
        <!-- <div class="ml-[120px] warn-msg h-[62px] bg-[#FFDBD9] leading-[62px] pl-[20px] text-[14px] text-[#262626] rounded-[2px]">
          请妥善保管好密码，如丢失无法找回，可能会造成损失
        </div> -->
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
        <div class="ml-[120px] bg-[#FFFBE6] mt-[20px] border border-solid border-[#FFE58F] rounded-[2px] py-[10px] px-[20px] flex">
          <div class="pt-[2px]">
            <img src="@/assets/images/IconWarning.png" class="h-[14px] w-[14px] mr-[8px]" />
          </div>
          <div class="text-[12px] text-[#595750]">
            为了避免忘记续费影响业务，平台默认自动续费，您可以在<span class="text-[#484FFF] cursor-pointer underline" @click="goRenewal">续费管理</span>中进行设置。<br>
            请妥善保管好密码，如丢失无法找回，可能会造成损失
          </div>
        </div>
        <div class="mt-[30px] pt-[40px] bt-css flex justify-between items-center">
          <div>
            <div class="text-[24px] font-semibold text-[#DC9200]">{{ formatAmount(instanceInfo.cycle,0) }} Cycles / {{ instanceInfo.day }}天</div>
            <div class="text-[14px] flex items-center">账户余额：{{ formatAmount(cycleBalance) }} Cycles
              <a-tooltip color="#FFFFFF">
                    <template #title>
                        <div class="text-[14px] text-[#000000] px-[10px]">
                            Cycle是平台充值币，用于购买平台上的所有资源和服务
                        </div>
                    </template>
                    <img src="@/assets/icons/wenhao.svg" class="h-[16px] w-[16px] ml-[10px] cursor-pointer" />
                </a-tooltip>
            </div>
          </div>
          <div>
            <a-button class="ant-btn-ss mr-[20px]" ghost type="primary" @click="goCycle">充值</a-button>
            <a-button class="ant-btn-ss" type="primary" :loading="loading" @click="handleCreate">创建</a-button>
          </div>
        </div>
      </a-form>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRefs } from 'vue';
import { message } from 'ant-design-vue';
import { apiGetSpec, apiGetImage, apiInstancePrice, apiPostInstance } from '@/apis/compute';
import { apiGetCycleBalance } from '@/apis/cycles';
import { formatAmount } from '@/utils/index'

const props = defineProps({
  createVisible: {
    type: Boolean,
    default: false
  }
});
const { createVisible } = toRefs(props);
const emit = defineEmits(["handleCancelCreate","handleDone"])
const labelCol = { style: { width: '120px' } };
const loading = ref(false);
const specList = ref([]);
const imageList = ref([]);
const cycleBalance = ref(0);
const instanceInfo = ref<any>({});
// const durationList = ref([]);
const formRef = ref();
const formData = reactive({
  specId: 1,
  imageId: 1,
  // duration: 1,
  name: '',
  username: 'ubuntu',
  password: '',
  publicKey:'', //公匙
});
const formRules = computed(() => {

  const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });
  
  return {
    specId: [requiredRule('请选择规格')],
    imageId: [requiredRule('请选择操作系统')],
    username: [requiredRule('请输入用户名称')],
    name: [requiredRule('请输入实例名称')],
    password: [requiredRule('请输入密码')],
  };
});
const goCycle = () => {
  handleCancel();
  window.open("/dashboard/Cycles");
}
const handleCancel = () => {
  formData.name = '';
  formData.password = '';
  formData.publicKey = '';
  formRef.value.resetFields();
  emit('handleCancelCreate');
}

const handleCreateDone = () => {
  handleCancel();
  emit('handleDone');
}

const goRenewal = () => {
  handleCancel();
  window.open("/dashboard/renewal");
}

const handleCreate = async () => {
  await formRef.value.validate();
  const res = await apiPostInstance(formData);
  if (res.code == 200) {
    handleCreateDone();
    handleCancel();
    message.success(res.message)
    // formData.name = ''
  }else{
    message.error(res.message)
  }
}
// 获取规格
const getSpec = async () => {

  const res = await apiGetSpec();
  if (res.code == 200) {
    specList.value = res.data;
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
//获取cycle余额
const getCycleBalances = async () => {

  const res = await apiGetCycleBalance();
  if (res.code == 200) {
    cycleBalance.value = res.data;
  }else{
    message.error(res.message)
  }
}
// 实例的价格和时长，根据规格来的
const getInstancePrice = async () => {

  const res = await apiInstancePrice(formData.specId.toString());
  if (res.code == 200) {
    instanceInfo.value = res.data;
  }else{
    message.error(res.message)
  }
}

// 使用时长
// const getDuration = async () => {

//   const res = await apiGetDuration();
//   if (res.code == 200) {
//     durationList.value = res.data;
//   }else{
//     message.error(res.message)
//   }
// }
//上传文件
const handleUploadAttachement = async (fileData) => {
  console.log(222222222222, fileData)
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
  getSpec();
  getImage();
  getCycleBalances();
  getInstancePrice();
  // getDuration();
})

</script>
<style scoped lang="less">
.warn-msg{
  width: calc(100%-120px);
}
.bt-css{
  border-top: 1px solid #E9E9E9;
}
</style>