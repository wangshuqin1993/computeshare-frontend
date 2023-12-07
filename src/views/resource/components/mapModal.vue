<template>
  <div>
    <a-modal v-model:open="mapValue" title="配置映射" @ok="handleOk" @cancel="cancelModal" width="828px" :footer="null">
      <div class="mt-[32px]">
        <a-form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
          @finish="onFinish" @finishFailed="onFinishFailed" ref="formRef">
          <a-form-item label="支持协议" name="name" :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-select v-model:value="formState.name" placeholder="please select your zone">
              <a-select-option value="TCP">TCP</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="云服务器实例" name="computerId"
            :rules="[{ required: true, message: 'Please input your username!' }]">
            <a-select v-model:value="formState.computerId" placeholder="please select your zone">
              <a-select-option :value="item.id" v-for="item in instanceList" :key="item.id">{{ item.name
              }}</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="私网端口" name="computerPort"
            :rules="[{ required: true, message: 'Please input your password!' }]">
            <a-input v-model:value="formState.computerPort" />
          </a-form-item>
          <a-form-item label="公网ip" name="password" :rules="[{ required: false }]">
            <!-- <a-input v-model:value="formState.password" /> -->
            <div>111</div>
          </a-form-item>
          <a-form-item label="公网端口" name="password" :rules="[{ required: false }]">
            <!-- <a-input v-model:value="formState.password" /> -->
            <div>222</div>
          </a-form-item>
          <div class="text-center">
            <a-button class="w-[200px] h-[38px]" type="primary" @click="primaryBtn">确定</a-button>
          </div>

        </a-form>
      </div>

    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from "vue";
import { apiGetInstanceList } from '@/apis/compute';
import { apiNetworkMap } from "@/apis/mapping";

const props = defineProps({
  mapValue: {
    type: Boolean,
    default: false,
  },
  formStateData: {
    type: Array,
    default: () => { },
  }
})

const { mapValue, formStateData } = toRefs(props);
const emit = defineEmits(['closeModal', 'createSuccess'])

const formRef = ref()
const instanceList = ref([]);
interface FormState {
  name: string;
  computerId: string;
  computerPort: number,
}

const formState = reactive<FormState>({
  name: '',
  computerId: '',
  computerPort: 0,
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
  const res = await apiNetworkMap(formState);
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