<template>
  <div>
    <a-modal v-model:open="showDomainCon" title="配置域名" @ok="handleOk" @cancel="closeModal" width="828px" :footer="null">
      <div class="mt-[32px]">
        <a-form layout="inline" :model="formState" class="flex flex-row items-center">
          <a-form-item label="绑定域名：">
            <a-input v-model:value="formState.domainName" placeholder="请输入需绑定域名" allow-clear />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" class="w-[96px]" @click="bindDomain">绑定</a-button>
          </a-form-item>
        </a-form>
        <div class="mt-[32px]">
          <div class="text-[24px] mb-[24px]">已绑定域名列表</div>
          <a-table :columns="columns" :data-source="bindingListData" :pagination="pagination">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'statu'">
                <span
                :class="boundDomainStatusColor[record.status]"
                  class="w-[120px] text-[#ffffff] text-[12px] rounded-full pl-[16px] pr-[16px] py-[4px]">
                  {{boundDomainStatus[record?.status]}}
                </span>
              </template>
              <template v-if="column.key === 'action'">
                <span class="text-[#484FFF] text-[14px]">
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
import { ref, reactive, toRefs, onMounted } from "vue";
import { boundDomainStatus, boundDomainStatusColor } from "@/enums/index";
import { apiBindDomain, apiDomainBindingList, apiNslookup, apiUnbind } from '@/apis/mapping'
import { message } from "ant-design-vue";

const props = defineProps({
  showDomainCon: {
    type: Boolean,
    default: false,
  },
  networkMappingId: {
    type: String,
    default: ''
  }
});
const { showDomainCon, networkMappingId } = toRefs(props);

interface FormState {
  domainName: string;
};

const formState = reactive<FormState>({
  domainName: '',
});

const pagination = reactive({
  // 分页配置器
  pageSize: 5, // 一页的数据限制
  current: 1, // 当前页
  total: 10, // 总数
  size: 'small',
  position: ['bottomCenter'], //指定分页显示的位置
  hideOnSinglePage: false, // 只有一页时是否隐藏分页器
  showQuickJumper: false, // 是否可以快速跳转至某页
  showSizeChanger: false, // 是否可以改变 pageSize
  pageSizeOptions: ['5', '10', '15'], // 指定每页可以显示多少条
  onShowSizeChange: (current: number, pagesize: number) => {
    // 改变 pageSize时的回调
    pagination.current = current;
    pagination.pageSize = pagesize;
    getDomainBindingList()
  },
  onChange: (current: number) => {
    // 切换分页时的回调，
    pagination.current = current;
    getDomainBindingList()
  },
});

const columns = [
  {
    title: '域名',
    dataIndex: 'name',
    key: 'name',
    // width: '50%'
    align: 'center',
  },
  {
    title: '',
    dataIndex: 'statu',
    key: 'statu',
    align: 'center',
    width: '30%'
  },
  {
    title: '操作',
    key: 'action',
    align:'center'
    // width: '30%'
  },
]

const bindingListData = ref([])

const emit = defineEmits(['closeModal']);
const handleOk = () => {
  closeModal()
}

const closeModal = () => {
  emit('closeModal')
}

const unbindClick = async(record: any) => {
  const res = await apiUnbind(record.id)
  if(res.code===200){
    // getDomainBindingList()
    bindingListData.value = bindingListData.value.filter((item:any)=>{
      return item.id != record.id
    })
  }else{
    message.error(res.message)
  }
}

const automaticAnalysisClick = async(record: any) => {
  const index = bindingListData.value.findIndex((item:any)=>{
    return item.id === record.id
  })
  bindingListData.value[index].status = '3'
  const res = await apiNslookup(record.domain, record.networkMappingId)
  if(res.code===200){
    // res.data = true 解析成功, false 解析失败
    res.data ? bindingListData.value[index].status = '1' : bindingListData.value[index].status = '2'
  }else{
    message.error(res.message)
    bindingListData.value[index].status = '2'
  }
}

// 配置域名
const bindDomain = async()=>{
  const params = {
    networkMappingId: networkMappingId.value,
    name: formState.domainName,
    domain: formState.domainName
  }
  const res = await apiBindDomain(params)
  console.log('配置域名:', res)
  if(res.code===200){
    formState.domainName = ''
    getDomainBindingList()
  }else{
    message.error(res.message)
  }
}

// 获取已绑定域名列表
const getDomainBindingList = async()=>{
  const res = await apiDomainBindingList(pagination.current, pagination.pageSize, networkMappingId.value)
  if(res.code===200){
    bindingListData.value = res.data.list
    pagination.total = res.data.total
  }
  console.log('获取已绑定域名列表',res)
}

onMounted(()=>{
  getDomainBindingList()
})
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