<template>
  <div>
    <a-modal v-model:open="showVisible" centered="true" title="创建文件夹" @ok="handleOk" @cancel="closeModal" width="697px" :footer="null">
      <div class="mt-[32px]">
        <a-form ref="formRef" :rules="formRules" :model="formData">
          <a-form-item label="文件夹名称：" name="name">
            <a-input class="modal-input" v-model:value="formData.name" placeholder="请输入文件夹名称" allow-clear />
          </a-form-item>
        </a-form>
        <div class="text-center">
          <a-button :loading="loading" type="primary" class="ant-btn-m mt-[50px]" @click="handleOk">创建</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, computed } from "vue";
import { apiS3CreateFolder } from '@/apis/s3_storage'
import { message } from "ant-design-vue";

const props = defineProps({
  showVisible: {
    type: Boolean,
    default: false,
  },
  bucketName: {
    type: String,
    default: ''
  },
});
const { showVisible, bucketName } = toRefs(props);
const emit = defineEmits(['closeModal','loadTable']);

const loading = ref(false);
const formRef = ref();
const formData = reactive({
  name: '',
});

const formRules = computed(() => {
    const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });
    return {
        name: [requiredRule('')],
    };
});

const handleOk = async () => {
  await formRef.value.validate();
  let param = {
    dirName: formData.name
  }
  loading.value = true;
  const res = await apiS3CreateFolder(bucketName.value, param);
  loading.value = false;
  if (res.code == 200) {
    message.success(res.message)
    closeModal()
    emit('loadTable');
  }else{
    message.error(res.message)
  }
}

const closeModal = () => {
  emit('closeModal')
}

onMounted(()=>{
  
})
</script>

<style scoped lang="less">



</style>