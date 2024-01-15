<template>
  <Header />
  <div class="p-[20px] scroll-contain-h">
    <div class="bg-[#FFFFFF] rounded-[2px] p-[20px]">
      <a-table :columns="tableColumns" :data-source="tableData" :pagination="pagination" >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'cycle'">
             <div>{{ record.symbol }} {{ formatAmount(record.cycle) }} Cycles</div>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import Header from "@/components/Header.vue";
import { transTimestamp } from '@/utils/dateUtil';
import { formatAmount } from '@/utils/index'
import { apiGetOrderList } from '@/apis/order'
import { message } from "ant-design-vue";


const tableData = ref([])
const tableColumns = reactive([
  {
    title: '订单号',
    dataIndex: 'orderNo',
    key: 'orderNo',
  },
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
    title: '金额',
    dataIndex: 'cycle',
    key: 'cycle',
  },
  {
    title: '购买时间',
    dataIndex: 'createTime',
    key: 'createTime',
    customRender: ({ text: date }) =>  transTimestamp(date*1),
  }
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
  const res = await apiGetOrderList(params);
  if (res.code == 200) {
    tableData.value = res.data.data;
    pagination.total = res.data.total
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