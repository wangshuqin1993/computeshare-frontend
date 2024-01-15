<template>
  <Header />
  <div class="p-[20px] scroll-contain-h">
    <div class="bg-[#FFFFFF] rounded-[2px] p-[20px]">
      <div class="mb-[20px] bg-[#FFFBE6] mt-[20px] border border-solid border-[#FFE58F] rounded-[2px] py-[10px] px-[20px] flex">
        <div class="pt-[2px]">
          <img src="@/assets/images/IconWarning.png" class="h-[14px] w-[14px] mr-[8px]" />
        </div>
        <div class="text-[12px] text-[#595750]">
          · 为了避免忘记续费影响业务，平台默认自动续费。生效期间所有服务将于到期前9天开始进行续费扣款，如扣款失败会通过短信通知，然后次日继续扣款截止扣款成功或到期。<br>
          · 自动续费扣款仅可扣除Cycle，请保证Cycle充足。<br>
          · 未停服的资源，续费后直接延长有效期，已停服的资源，会自动释放掉，不支持重新续费。
        </div>
      </div>
      <a-table :columns="tableColumns" :data-source="tableData" :pagination="pagination" >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <div class="text-[14px] flex">
              <a-popconfirm title="确定关闭自动续费吗?" ok-text="确认" cancel-text="取消" @confirm="closeAutoPay(record.id)">
                <a-button type="link" >关闭自动续费</a-button>
              </a-popconfirm>
              <a-button type="link" @click="openAutoPay(record.id)">打开自动续费</a-button> 
              <a-button type="link" @click="getInstanceInfo(record.id)">手动续费</a-button>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>
  <handlePayModal :visible="payVisible" @instanceInfo="instanceInfo" @handleCancel="payVisible=false"></handlePayModal>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import Header from "@/components/Header.vue";
import { transTimestamp } from '@/utils/dateUtil';
import { renewalStatus } from '@/enums/index';
import handlePayModal from './components/handlePayModal.vue'
import { apiGetRenewalList, apiCloseCycle, apiOpenCycle, apiGetInstanceInfo } from '@/apis/renewal';
import { message } from "ant-design-vue";

const payVisible = ref(false)
const instanceInfo = ref();
const tableData = ref([])
const tableColumns = reactive([
  {
    title: '名称',
    dataIndex: 'productName',
    key: 'productName',
  },
  {
    title: '描述',
    dataIndex: 'productDesc',
    key: 'productDesc',
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
    customRender: ({ text }) =>  renewalStatus[text],
  },
  {
    title: '到期时间',
    dataIndex: 'dueTime',
    key: 'dueTime',
    customRender: ({ text: date }) =>  transTimestamp(date*1),
  },
  {
    title: '续费时间',
    dataIndex: 'renewalTime',
    key: 'renewalTime',
    customRender: ({ text: date }) =>  transTimestamp(date*1),
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
  },
])
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
  pageSizeOptions: ['10', '20', '30'], // 指定每页可以显示多少条
  onShowSizeChange: (current: number, pagesize: number) => {
    // 改变 pageSize时的回调
    pagination.current = current;
    pagination.pageSize = pagesize;
    getTableData()
  },
  onChange: (current: number) => {
    // 切换分页时的回调，
    pagination.current = current;
    getTableData()
  },
});

const getTableData = async () => {
  const params = {
    page: pagination.current,
    size: pagination.pageSize
  }
  const res = await apiGetRenewalList(params);
  if (res.code == 200) {
    tableData.value = res.data.data;
    pagination.total = res.data.total
  }else{
    message.error(res.message)
  }
}

//打开自动续费
const openAutoPay = async(id: any) => {
  const res = await apiOpenCycle(id)
  if(res.code===200){
    getTableData()
  }else{
    message.error(res.message)
  }
}
// 关闭自动续费
const closeAutoPay = async(id: any) => {
  const res = await apiCloseCycle(id)
  if(res.code===200){
    getTableData()
  }else{
    message.error(res.message)
  }
}
// 手动续费弹框的实例信息
const getInstanceInfo = async (id:any) => {
  const res = await apiGetInstanceInfo(id)
  if (res.code === 200) {
    instanceInfo.value = res.data;
    payVisible.value = true;
  }else{
    message.error(res.message)
  }
}

onMounted(() => {
  getTableData();
});
</script>
<style lang="less" scoped>

</style>