<template>
  <div>
    <div class="h-[130px] px-[40px] flex justify-between items-center bg-[#ffffff]">
      <div class="menu-title">网络映射</div>
      <a-button type="primary" class="ant-btn-s" @click="createMap">创建映射</a-button>
    </div>
    <div class="m-[20px] bg-[#ffffff] p-[20px] rounded-[2px]">
      <a-table :columns="columns" :data-source="networkMapList" :rowClassName="setRowClassName">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.key === 'domains'">
            <div>{{ text[0]?.name }}</div>
            <div class="text-[#484FFF] underline underline-offset-1 cursor-pointer" v-if="text.length > 1" @click="configurationDomain(record)">{{ `等${text.length}个域名` }}</div>
          </template>
          <template v-if="column.key === 'action'">
            <span class="text-[16px]">
              <span @click="edit(record)" class="text-[#484FFF]">编辑</span>
              <span @click="configurationDomain(record)" class="cursor-pointer text-[#484FFF] mx-[20px]">配域名</span>
              <a-popconfirm title="确定删除吗?" ok-text="确认" cancel-text="取消"
                @confirm="delNetwork(record)">
                <span class="cursor-pointer text-[#F52222]">删除</span>
              </a-popconfirm>
            </span>
          </template></template>
      </a-table>
    </div>
  </div>
  <MapModal :mapValue="mapValue" :formStateData="formStateData" @closeModal="mapValue = false" @createSuccess="createSuccess"></MapModal>
  <DomainModal v-if="showDomainCon" :showDomainCon="showDomainCon" :networkMappingId="networkMappingId"  @closeModal="showDomainCon = false"></DomainModal>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import MapModal from "./components/mapModal.vue";
import DomainModal from "./components/domainModal.vue";
import { apiNetworkMapList, apiDeleteNetworkMapById } from "@/apis/mapping";
import { message } from "ant-design-vue";

const showDomainCon = ref(false);
const mapValue = ref(false);
const formStateData = ref({})
const networkMapList = ref([]);
const networkMappingId = ref('')
const columns = [
  {
    title: '实例',
    dataIndex: 'instanceName',
    key: 'instanceName',
  },
  {
    title: '协议',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '私网端口',
    dataIndex: 'instancePort',
    key: ' instancePort',
    align:'center'
  },
  {
    title: '公网IP',
    key: 'gatewayIp',
    dataIndex: 'gatewayIp',
  },
  {
    title: '公网端口',
    key: 'gatewayPort',
    dataIndex: 'gatewayPort',
    align:'center'
  },
  {
    title: '绑定域名',
    key: 'domains',
    dataIndex: 'domains',
  },
  {
    title: '操作',
    key: 'action',
  },
];

const pagination = reactive({
  // 分页配置器
  pageSize: 10, // 一页的数据限制
  current: 1, // 当前页
  total: 10, // 总数
  size: 'small',
  position: ['bottomCenter'], //指定分页显示的位置
  hideOnSinglePage: false, // 只有一页时是否隐藏分页器
  showQuickJumper: false, // 是否可以快速跳转至某页
  showSizeChanger: false, // 是否可以改变 pageSize
  pageSizeOptions: ['10', '20', '50'], // 指定每页可以显示多少条
  onShowSizeChange: (current: number, pagesize: number) => {
    // 改变 pageSize时的回调
    pagination.current = current;
    pagination.pageSize = pagesize;
    getNetworkMapList()
  },
  onChange: (current: number) => {
    // 切换分页时的回调，
    pagination.current = current;
    getNetworkMapList()
  },
});
const setRowClassName = (record: any, index: number) => {
  return 'rowClass'
}

const createMap = async () => {
  formStateData.value = {};
  mapValue.value = true;
}

const edit = (record: any) => {
  return
  console.log("edit:",record);
  formStateData.value = record;
  mapValue.value = true;
}

const delNetwork = async(record: any) => {
  const res = await apiDeleteNetworkMapById(record.id)
  if(res.code===200){
    getNetworkMapList()
  }else{
    message.error(res.message)
  }
  console.log(record)
}

const configurationDomain = (record:any) => {
  console.log(11111111111111,record)
  networkMappingId.value = record.id
  showDomainCon.value = true;
}

const getNetworkMapList = async () => {
  const params = {
    page: pagination.current,
    size: pagination.pageSize,
  }
  const res = await apiNetworkMapList(params)

  if (res.code === 200) {
    networkMapList.value = res.data.list;
    console.log(res, 'res')
  }else{
    message.error(res.message)
  }
}

const createSuccess = () => {
  mapValue.value = false
  getNetworkMapList();
}

onMounted(() => {
  getNetworkMapList();
})

</script>

<style scoped lang="less">
:deep(.css-dev-only-do-not-override-kqecok.ant-table-wrapper .ant-table-pagination-right) {
  justify-content: center;
}

.menu-title {
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}
:deep(.rowClass){
  height: 90px;
}
</style>