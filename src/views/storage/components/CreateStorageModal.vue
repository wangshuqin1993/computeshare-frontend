<template>
  <div>
    <a-modal v-model:open="showVisible" centered="true" title="创建存储桶" @ok="handleOk" @cancel="closeModal" width="697px" :footer="null">
      <div class="mt-[32px]">
        <a-form ref="formRef" :rules="formRules" :model="formData">
          <a-form-item label="存储桶名：" name="name">
            <a-input class="modal-input" v-model:value="formData.name"  :prefix="prefixValue" placeholder="请输入存储桶名称" allow-clear />
            <div class="text-[#8C8C8C] mt-[10px]">
              存储桶格式为“用户名-自定义名称”，为方便管理，建议设置一个易记简洁的用户名，<label class="text-[#1677ff] cursor-pointer text-[14px] underline" @click="goUser">点击此处</label>修改。。<br>
              整个存储桶名称的长度必须介于 3（最小）到 63（最大）个字符之间。<br>
              桶名称只能由小写字母、数字、点（.）和连字符（-）组成。<br>
              存储桶名称必须以字母或数字开头和结尾。<br>
              存储桶名称不得包含两个相邻的句点。<br>
              存储桶名称不得采用 IP 地址格式（例如 192.168.5.4）。
            </div>
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
import { apiCreateBucket } from '@/apis/s3_storage';
import { message } from "ant-design-vue";

const props = defineProps({
  showVisible: {
    type: Boolean,
    default: false,
  },
  prefixValue: {
    type: String,
    default: '',
  }
});
const { showVisible, prefixValue } = toRefs(props);
const emit = defineEmits(['closeModal','loadTable']);

const loading = ref(false);
const formRef = ref();
const formData = reactive({
  name: '',
});

const checkName = () => {

  let reg = /^[a-z0-9][a-z0-9\.-]{1,61}[a-z0-9]$/
  //IP正则表达式
  let reg3 = /^(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d{2}|2[0-4]\d|25[0-5])$/;
  //两个相邻的句点
  let reg4 = /^.*\.{2}.*$/

  if (formData.name != '' && formData.name != null && reg.test(formData.name) && !reg3.test(formData.name) && !reg4.test(formData.name)) {
    return Promise.resolve()
  } else {
    return Promise.reject("请输入正确的名称");
  }
}
const formRules = computed(() => {
    const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });
    return {
        name: [requiredRule(''), { validator: checkName, trigger: "change" }],
    };
});
const handleOk = async () => {
  await formRef.value.validate();
  let param = {
    bucketName: prefixValue.value + formData.name
  }
  loading.value = true;
  const res = await apiCreateBucket(param);
  loading.value = false;
  if (res.code == 200) {
    message.success(res.message)
    closeModal();
    emit('loadTable')
  }else{
    message.error(res.message)
  }
}
const goUser = () => {
  emit('closeModal');
  window.open("/dashboard/user");
}
const closeModal = () => {
  emit('closeModal')
}

onMounted(()=>{
})

defineExpose({
  formData, //抛出form的ref值
})
</script>

<style scoped lang="less">

</style>