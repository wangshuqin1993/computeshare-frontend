<template>
  <a-modal :footer="null" title="创建实例" width="930px" centered="true" v-model:open="createVisible" @cancel="handleCancel">
    <div class="mt-[30px] ">
      <a-form :model="formData" ref="importFormRef" :rules="formRules">
        <a-form-item label="规格：" name="param1">
          <a-radio-group v-model:value="formData.param1">
            <a-radio-button value="1">2核 4GB</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item class="more-raido" label="操作系统：" name="param2">
          <a-radio-group v-model:value="formData.param2">
            <a-radio-button value="1">Linux 3.2104 LTS 64位</a-radio-button>
            <a-radio-button value="2">Ubuntu 22.04 64位 UEFI版</a-radio-button>
            <a-radio-button value="3">CentOS 8.4 64位 SCC版</a-radio-button>
            <a-radio-button value="4">CentOS 8.4 64位 SCC版</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="使用时长：" name="param3">
          <a-radio-group v-model:value="formData.param3">
            <a-radio-button value="1">1个月</a-radio-button>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="实例名称：" name="param4">
          <a-input class="modal-input w-[70%]" autocomplete="off" v-model:value="formData.param4" placeholder="请输入实例名称"/>
        </a-form-item>
        <div class="text-center mt-[50px]">
          <a-button class="ant-btn-m" type="primary" :loading="loading" @click="handleCreate">创建</a-button>
        </div>
      </a-form>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { computed, reactive, ref, toRefs } from 'vue';

const props = defineProps({
  createVisible: {
    type: Boolean,
    default: false
  }
});
const { createVisible } = toRefs(props);
const emit = defineEmits(["handleCancelCreate"])
const loading = ref(false);
const formData = reactive({
  param1: '1',
  param2: '2',
  param3: '1',
  param4: '',
});
const formRules = computed(() => {

  const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });
  
  return {
    mobile: [requiredRule('请输入手机号')],
    code: [requiredRule('请输入验证码')],
  };
});

const handleCancel = () => {
  emit('handleCancelCreate');
}
const handleCreate = () => {
  console.log("create.....");
}
</script>
<style scoped lang="less">

</style>