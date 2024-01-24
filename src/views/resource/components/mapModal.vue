<template>
  <div>
    <a-modal v-model:open="mapValue" title="配置映射" @cancel="cancelModal" width="758px" :footer="null">
      <div class="mt-[32px]">
        <a-form :model="formState" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" autocomplete="off"
           ref="formRef">
          <a-form-item label="映射描述" name="des"
            :rules="[{ required: true, message: '请输入映射描述' }]">
            <a-input class="modal-input" v-model:value="formState.des" placeholder="请输入映射描述" />
          </a-form-item>

          <a-form-item label="支持协议" name="name" :rules="[{ required: true, message: '请选择支持协议' }]">
            <a-select class="modal-select" v-model:value="formState.name" placeholder="请选择支持协议">
              <a-select-option value="TCP">TCP</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="云服务器实例" name="instanceId"
            :rules="[{ required: true, message: '请选择云服务器实例' }]">
            <a-select class="modal-select" v-model:value="formState.instanceId" placeholder="请选择云服务器实例" @select="selectCloudInstance">
              <a-select-option :value="item.id" v-for="item in instanceList" :key="item.id">{{ item.name
              }}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="私网端口" name="instancePort"
            :rules="[{ required: true, message: '请输入私网端口' }]">
            <a-input class="modal-input" v-model:value="formState.instancePort" placeholder="请输入" />
          </a-form-item>
          <a-form-item label="公网ip" name="gatewayIp" :rules="[{ required: false }]">
            <div class="leading-[42px]">{{ formState.gatewayIp }}</div>
          </a-form-item>
          <a-form-item label="公网端口" name="gatewayPort" :rules="[{ required: false }]">
            <div class="leading-[42px]">{{ formState.gatewayPort }}</div>
          </a-form-item>
          <div class="text-center mt-[50px]">
            <a-button class="w-[200px] h-[38px]" type="primary" @click="createMap">确定</a-button>
          </div>

        </a-form>
      </div>

    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, toRefs, onMounted, watch } from "vue";
import { apiGetUseInstanceList } from '@/apis/compute';
import { apiNetworkMap, apiPublicNetworkInfo, apiPutNetworkMapById } from "@/apis/mapping";
import { message } from "ant-design-vue";

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
  instancePort: string, //私网端口
  gatewayPort: number | string, //公网端口
  gatewayIp: string, //公网IP
  des: string,//映射描述
  id: string,//映射id
  instanceId: string,//实例id
}

const formState = ref<FormState>({
  name: '',
  instanceName: '',
  instancePort: '',
  gatewayPort: 0,
  gatewayIp: '',
  des: '',
  id: '',
  instanceId: ''
});

const getInstanceList = async () => {
  const res = await apiGetUseInstanceList();
  if (res.code == 200) {
    instanceList.value = res.data
  }
}

const createMap = async () => {
  await formRef.value.validate();
  let param = {
    name: formState.value.des,
    computerId: formState.value.instanceId,
    computerPort: Number(formState.value.instancePort),
    protocol: formState.value.name,
  }
  // 如果有 id 是编辑，没有则是新建
  let res = undefined
  if(formState.value.id){
    res = await apiPutNetworkMapById(formState.value.id, param)
  }else{
    res = await apiNetworkMap(param);
  }
  if(res?.code == 200) {
    emit('createSuccess')
  }else{
    message.error(res.message)
  }
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
      formState.value.instanceId = value.instanceId;
      formState.value.gatewayPort = value.gatewayPort;
      formState.value.instanceName = value.instanceName;
      formState.value.instancePort = value.instancePort;
      formState.value.name = value.protocol;
      formState.value.gatewayIp = value.gatewayIp;
      formState.value.des = value.name;
      formState.value.id = value.id;
    } else {
      formState.value = {
        name: '',
        instanceName: '',
        instancePort: '',
        gatewayPort: '',
        gatewayIp: '',
        des: '',
        id: '',
        instanceId: ''
      }
    }
    console.log("watch:",value);
  }, { deep: true, immediate: true }
);

const selectCloudInstance = ()=>{
  getPublicNetwrokInfo(formState.value.instanceId)
}

const getPublicNetwrokInfo = async(id: string)=>{
  const res = await apiPublicNetworkInfo(id)
  if(res.code===200){
    formState.value.gatewayIp = res.data.publicIp
    formState.value.gatewayPort = res.data.publicPort
  }
}

onMounted(async () => {
  await getInstanceList()
})

</script>

<style scoped lang="less">
:deep(.css-dev-only-do-not-override-kqecok.ant-table-wrapper .ant-table-pagination-right) {
  justify-content: center;
}

// :deep(.ant-select-selector) {
//   height: 36px !important;
// }

// :deep(.ant-input) {
//   height: 36px !important;
// }
</style>