<template>
  <a-modal :footer="null" title="修改名称" width="758px" centered="true" v-model:open="visible" @cancel="handleCancel">
    <div class="mt-[30px] ">
      <a-form :model="formData" ref="formRef" :rules="formRules" :label-col="labelCol">
        <a-form-item label="实例名称：" name="name">
          <a-input class="modal-input" autocomplete="off" v-model:value="formData.name" placeholder="请输入实例名称"/>
        </a-form-item>
        <div class="mt-[50px] text-center">
          <a-button class="ant-btn-m" type="primary" @click="handleConfirm">确定</a-button>
        </div>
      </a-form>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { computed, reactive, ref, toRefs } from 'vue';

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
});
const { visible } = toRefs(props);
const emit = defineEmits(["handleCancel","handleDone"]);

const labelCol = { style: { width: '120px' } };
const formRef = ref();
const formData = reactive({
  name:'',  
});
const formRules = computed(() => {

  const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });
  
  return {
    name: [requiredRule('请输入实例名称')],
  };
});
const handleCancel = () => {
  formData.name = '';
  formRef.value.resetFields();
  emit('handleCancel');
}
const handleConfirm = async () => {
  await formRef.value.validate();
}
</script>