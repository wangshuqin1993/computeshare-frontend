<!-- 文件存储 -->
<template>
  <div class="m-[20px]">
    <div class="bg-[#FFFFFF] rounded-[2px] mb-[20px] p-[20px]">
      <UploadFile :suffixNames="suffixNames"></UploadFile>
    </div>
    <div class="bg-[#FFFFFF] rounded-[2px] p-[20px]">
      <a-table :columns="tableColumns" :data-source="tableData" :pagination="pagination" :scroll="{x: false, y: 'calc(100vh - 691px)' }">
        <template #bodyCell="{ column, text }">
          <template v-if="column.dataIndex === 'action'">
            <a-tooltip placement="left" color="#FFFFFF">
              <template #title>
                <div class="text-[14px]">
                  <div class="tips-css">下载</div>
                  <div class="tips-css">删除</div>
                </div>
              </template>
              <img src="@/assets/images/more-vertical.svg" class="h-[26px] cursor-pointer" />
            </a-tooltip>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import UploadFile from '@/components/UploadFile.vue';

const suffixNames = ref(".rar .zip .doc .docx .pdf .jpg...");
const tableData = ref([])
const tableColumns = reactive([
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '修改时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    width: '20%'
  },
  {
    title: '文件大小',
    dataIndex: 'size',
    key: 'size',
    width: '15%'
  },
  {
    title: '',
    dataIndex: 'action',
    key: 'action',
    width: '5%'
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
    getTableData(current, pagesize)
  },
  onChange: (current: number) => {
    // 切换分页时的回调，
    pagination.current = current;
    getTableData(current, pagination.pageSize)
  },
});

const getTableData = (page:number = pagination.current, size:number = pagination.pageSize) => {
  console.log("page::",page,size);
}
</script>

<style scoped lang="less">
.scroll-max-h{
  max-height: calc(100vh - 691px);
}
:deep(.ant-table-tbody){
  max-height: calc(100vh - 691px);
  overflow-y: auto;
}
</style>