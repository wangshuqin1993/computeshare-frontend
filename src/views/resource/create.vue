<template>
  <a-modal :footer="null" title="创建实例" width="930px" centered="true" v-model:open="createVisible" @cancel="handleCancel">
    <div class="mt-[30px] ">
      <a-form :model="formData" ref="formRef" :rules="formRules" :label-col="labelCol">
        <a-form-item label="规格：" name="specId">
          <a-radio-group v-model:value="formData.specId">
            <a-radio-button v-for="(item,key) in specList" :key="key" :value="item.id">{{ item.core }}核 {{ item.memory }}GB</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item class="more-raido" label="操作系统：" name="imageId">
          <a-radio-group v-model:value="formData.imageId">
            <a-radio-button v-for="(item,key) in imageList" :key="key" :value="item.id">{{ item.name }}</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="使用时长：" name="duration">
          <a-radio-group v-model:value="formData.duration">
            <a-radio-button  v-for="(item,key) in durationList" :key="key" :value="item.duration">{{ item.name }}</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="实例名称：" name="name">
          <a-input class="modal-input w-[70%]" autocomplete="off" v-model:value="formData.name" placeholder="请输入实例名称"/>
        </a-form-item>
        <a-form-item label="用户名：" name="username">
          <div class="!text-[16px] font-medium">ubuntu</div>
        </a-form-item>
        <a-form-item label="密码：" name="password">
          <a-input class="modal-input w-[70%]" autocomplete="off" v-model:value="formData.password" placeholder="请输入密码"/>
        </a-form-item>
        <div class="ml-[120px] w-[500px] h-[62px] bg-[#FFDBD9] leading-[62px] pl-[20px] text-[14px] text-[#262626] rounded-[2px]">
          请妥善保管好密码，如丢失无法找回，可能会造成损失
        </div>
        <div class="text-center mt-[50px]">
          <a-button class="ant-btn-m" type="primary" :loading="loading" @click="handleCreate">创建</a-button>
        </div>
      </a-form>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref, toRefs } from 'vue';
import { message } from 'ant-design-vue';
import { apiGetSpec, apiGetImage, apiGetDuration, apiPostInstance } from '@/apis/compute';

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
const durationList = ref([]);
const formRef = ref();
const formData = reactive({
  specId: 1,
  imageId: 1,
  duration: 1,
  name: '',
  // username: 'ubuntu',
  password: ''
});
const formRules = computed(() => {

  const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });
  
  return {
    name: [requiredRule('请输入实例名称')],
    password: [requiredRule('请输入密码')],
  };
});

const handleCancel = () => {
  emit('handleCancelCreate');
}

const handleCreateDone = () => {
  emit('handleDone');
}

const handleCreate = async () => {
  await formRef.value.validate();
  const res = await apiPostInstance(formData);
  if (res.code == 200) {
    handleCreateDone();
    message.success(res.message)
    formData.name = ''
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
// 使用时长
const getDuration = async () => {

  const res = await apiGetDuration();
  if (res.code == 200) {
    durationList.value = res.data;
  }else{
    message.error(res.message)
  }
}
onMounted(() => {
  getSpec();
  getImage();
  getDuration();
})
</script>
<style scoped lang="less">

</style>