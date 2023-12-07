<template>
  <div>
    <a-modal v-model:open="mapValue" title="配置映射" @ok="handleOk" @cancel="cancelModal" width="758px" :footer="null">
      <div class="mt-[32px]">
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" autocomplete="off"
          @finish="onFinish" @finishFailed="onFinishFailed" ref="formRef">
          <a-form-item label="支持协议" name="name" :rules="[{ required: true, message: '请选择支持协议' }]">
            <a-select v-model:value="formState.name" placeholder="please select your zone">
              <a-select-option value="TCP">TCP</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="云服务器实例" name="instanceName"
            :rules="[{ required: true, message: '请选择云服务器实例' }]">
            <a-select v-model:value="formState.instanceName" placeholder="please select your zone">
              <a-select-option :value="item.id" v-for="item in instanceList" :key="item.id">{{ item.name
              }}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="私网端口" name="instancePort"
            :rules="[{ required: true, message: '请输入私网端口' }]">
            <a-input v-model:value="formState.instancePort" />
          </a-form-item>
          <a-form-item label="公网ip" name="password" :rules="[{ required: false }]">
            <!-- <a-input v-model:value="formState.password" /> -->
            <div>{{ formState.gatewayIp }}</div>
          </a-form-item>
          <a-form-item label="公网端口" name="password" :rules="[{ required: false }]">
            <!-- <a-input v-model:value="formState.password" /> -->
            <div>{{ formState.gatewayPort }}</div>
          </a-form-item>
          <div class="text-center mt-[50px]">
            <a-button class="w-[200px] h-[38px]" type="primary" @click="primaryBtn">确定</a-button>
          </div>

        </a-form>
      </div>

    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, watch } from "vue";
import { apiGetInstanceList } from '@/apis/compute';
import { apiNetworkMap } from "@/apis/mapping";

const props = defineProps({
  mapValue: {
    type: Boolean,
    default: false,
  },
  formStateData: {
    type: Array as any,
    default: () => { },
  }
})

const { mapValue } = toRefs(props);
const emit = defineEmits(['closeModal', 'createSuccess'])

const formRef = ref()
const instanceList = ref([]);
interface FormState {
  name: string; //协议
  instanceName: string; //实例
  instancePort: number, //私网端口
  gatewayPort: number, //公网端口
  gatewayIp: string, //公网IP
}

const formState = ref<FormState>({
  name: '',
  instanceName: '',
  instancePort: 0,
  gatewayPort: 0,
  gatewayIp: '',
});

const getInstanceList = async () => {
  const res = await apiGetInstanceList();
  if (res.code == 200) {
    instanceList.value = res.data
    console.log(res, 'uuu')
  }
}

const primaryBtn = async () => {
  await formRef.value.validate();
  console.log('kkkk')
  let param = {
    name: formState.value.name,
    computerId: formState.value.instanceName,
    computerPort: formState.value.instancePort,
  }
  const res = await apiNetworkMap(param);
  console.log(res, 'res')
  if (res.code == 200) {
    console.log(res, 'data')
    emit('createSuccess')
  }
}


const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const handleOk = () => {
  cancelModal()
}

const cancelModal = () => {
  emit('closeModal')
}

watch(
  () => props.formStateData,
  (value) => {
    if (formRef.value != undefined) {
      formRef.value.clearValidate();
    }
    if (Object.keys(value).length > 0) {
      formState.value.gatewayPort = value.gatewayPort;
      formState.value.instanceName = value.instanceName;
      formState.value.instancePort = value.instancePort;
      formState.value.name = value.name;
      formState.value.gatewayIp = value.gatewayIp;
    } else {
      formState.value = {
        name: '',
        instanceName: '',
        instancePort: 0,
        gatewayPort: 0,
        gatewayIp: '',
      }
    }
    console.log("watch:",value);
  }, { deep: true, immediate: true }
);

onMounted(async () => {
  await getInstanceList()
})

</script>

<style scoped lang="less">
:deep(.css-dev-only-do-not-override-kqecok.ant-table-wrapper .ant-table-pagination-right) {
  justify-content: center;
}

:deep(.ant-select-selector) {
  height: 36px !important;
}

:deep(.ant-input) {
  height: 36px !important;
}
</style>