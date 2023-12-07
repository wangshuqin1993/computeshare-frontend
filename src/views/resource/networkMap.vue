<template>
  <div>
    <div class="h-[130px] px-[40px] flex justify-between items-center bg-[#ffffff]">
      <div class="menu-title">网络映射</div>
      <a-button type="primary" class="ant-btn-s" @click="createMap">创建映射</a-button>
    </div>
    <div class="m-[20px] bg-[#ffffff] p-[20px] rounded-[2px]">
      <a-table :columns="columns" :data-source="networkMapList">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.key === 'domains'">
            <div>{{ text[0] }}</div>
            <div class="text-[#484FFF]" v-if="text.length > 1">{{ `等${text.length}个域名` }}</div>
          </template>
          <template v-if="column.key === 'action'">
            <span class="text-[16px]">
              <span @click="edit(record)" class="cursor-pointer text-[#484FFF]">编辑</span>
              <span @click="configurationDomain" class="cursor-pointer text-[#484FFF] mx-[20px]">配域名</span>
              <a-popconfirm title="Are you sure delete this domain?" ok-text="确认" cancel-text="取消"
                @confirm="confirm(record)">
                <span class="cursor-pointer text-[#F52222]">删除</span>
              </a-popconfirm>
            </span>
          </template></template>
      </a-table>
    </div>
  </div>
  <MapModal :mapValue="mapValue" :formStateData="formStateData" @closeModal="mapValue = false" @createSuccess="createSuccess"></MapModal>
  <DomainModal :daomainValue="daomainValue" @closeModal="daomainValue = false"></DomainModal>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import MapModal from "./components/mapModal.vue";
import DomainModal from "./components/domainModal.vue";
import { apiNetworkMap, apiNetworkMapList, apiNetworkMapById, apiDeleteNetworkMapById } from "@/apis/mapping";

const daomainValue = ref(false);
const mapValue = ref(false);
const formStateData = ref({})
const networkMapList = ref([]);
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
    title: 'Action',
    key: 'action',
  },
];


const createMap = async () => {
  formStateData.value = {};
  mapValue.value = true;
}

const edit = (record: any) => {
  console.log("edit:",record);
  formStateData.value = record;
  mapValue.value = true;
}

const confirm = (record: any) => {
  console.log(record)
}

const configurationDomain = () => {
  daomainValue.value = true;
}

const getNetworkMapList = async () => {
  const params = {
    page: 1,
    size: 10,
  }
  const res = await apiNetworkMapList(params)

  if (res.code === 200) {
    networkMapList.value = res.data.list;
    console.log(res, 'res')
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
</style>