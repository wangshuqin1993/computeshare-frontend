<template>
  <div>
    <a-modal v-model:open="daomainValue" title="配置域名" @ok="handleOk" @cancel="closeModal" width="828px" :footer="null">
      <div class="mt-[32px]">
        <a-form layout="inline" :model="formState" class="flex flex-row items-center">
          <a-form-item label="绑定域名：">
            <a-input v-model:value="formState.domainName" placeholder="请输入需绑定域名" allow-clear />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" class="w-[96px]">绑定</a-button>
          </a-form-item>
        </a-form>
        <div class="mt-[32px]">
          <div class="text-[24px] mb-[24px]">已绑定域名列表</div>
          <a-table :columns="columns" :data-source="data">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'statu'">
                <span
                  class="w-[120px] bg-[#00C900] text-[#ffffff] text-[12px] rounded-full pr-[100px] pl-[16px] py-[2px]">
                  状态正常

                </span>
              </template>
              <template v-if="column.key === 'action'">
                <span class="text-[#484FFF]">
                  <span class="cursor-pointer mr-[20px]" @click="automaticAnalysisClick(record)">自动解析</span>
                  <span class="cursor-pointer" @click="unbindClick(record)">解绑</span>
                </span>
              </template>
            </template>
          </a-table>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs } from "vue";
import { boundDomainStatus } from "@/enums/index";

const props = defineProps({
  daomainValue: {
    type: Boolean,
    default: false,
  }
});

interface FormState {
  domainName: string;
};


const formState = reactive<FormState>({
  domainName: '',
});



const { daomainValue } = toRefs(props);

const columns = [
  {
    title: '域名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '',
    dataIndex: 'statu',
    key: 'statu',
    align: 'right',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const data = [
  {
    name: '11111',
  },
  {
    name: '22222222',
  }
]


const emit = defineEmits(['closeModal']);
const handleOk = () => {
  closeModal()
}

const closeModal = () => {
  emit('closeModal')
}

const unbindClick = (record: any) => {
  console.log(record, 'record')
}

const automaticAnalysisClick = (record: any) => {
  console.log(record, 'record')

}
</script>

<style scoped lang="less">
:deep(.ant-input-affix-wrapper),
:deep(.ant-input),
.ant-btn {
  height: 36px !important;
}

:deep(.ant-form-item-control) {
  width: 500px;
}

:deep(.css-dev-only-do-not-override-kqecok.ant-table-wrapper .ant-table-pagination-right) {
  justify-content: center;
}
</style>