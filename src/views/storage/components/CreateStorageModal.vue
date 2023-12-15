<template>
  <div>
    <a-modal v-model:open="showVisible" centered="true" title="创建存储桶" @ok="handleOk" @cancel="closeModal" width="697px" :footer="null">
      <div class="mt-[32px]">
        <a-form ref="formRef" :rules="formRules" :model="formData">
          <a-form-item label="存储桶名：" name="name">
            <a-input class="modal-input" v-model:value="formData.name"  prefix="13700000000-" placeholder="请输入用户名" allow-clear />
            <div class="text-[#8C8C8C] mt-[10px]">
              存储桶格式为“用户名-自定义名称”。<br>
              整个存储桶名称的长度必须介于 3（最小）到 63（最大）个字符之间。<br>
              桶名称只能由小写字母、数字、点（.）和连字符（-）组成。<br>
              存储桶名称必须以字母或数字开头和结尾。<br>
              存储桶名称不得包含两个相邻的句点。<br>
              存储桶名称不得采用 IP 地址格式（例如 192.168.5.4）。
            </div>
          </a-form-item>
        </a-form>
        <div class="text-center">
          <a-button type="primary" class="ant-btn-m mt-[50px]" @click="handleOk">创建</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, computed } from "vue";

const props = defineProps({
  showVisible: {
    type: Boolean,
    default: false,
  },
});
const { showVisible } = toRefs(props);
const emit = defineEmits(['closeModal']);

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
  closeModal()
}

const closeModal = () => {
  emit('closeModal')
}

onMounted(()=>{
  
})
</script>

<style scoped lang="less">

</style>