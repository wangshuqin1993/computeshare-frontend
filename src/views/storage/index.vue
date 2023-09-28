<!-- 文件存储 -->
<template>
  <Header />
  <div class="m-[20px]">
    <div class="bg-[#FFFFFF] rounded-[2px] mb-[20px] p-[20px]">
      <UploadFile :suffixNames="suffixNames" :suffixText="suffixText" @refreshList="getTableData"></UploadFile>
    </div>
    <div class="bg-[#FFFFFF] rounded-[2px] p-[20px]">
      <a-table :columns="tableColumns" :data-source="tableData" :pagination="pagination" :scroll="{x: false, y: 'calc(100vh - 691px)' }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <a-tooltip placement="left" color="#FFFFFF">
              <template #title>
                <div class="text-[14px]">
                  <div class="tips-css" @click="downloadStorage(record.id,record.name)">下载</div>
                  <div class="tips-css" @click="delStorage(record.id)">删除</div>
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
import { createVNode, onMounted, reactive, ref } from 'vue';
import UploadFile from '@/components/UploadFile.vue';
import Header from "@/components/Header.vue";
import { transTimestamp } from '@/utils/dateUtil';
import { apiStorageList, apiDownloadStorage, apiDelStorage } from '@/apis/storage';
import { Modal, message } from 'ant-design-vue';
import { getfilesize, downloadRequest } from '@/utils/index'

const suffixNames = ref(".*");
const suffixText = ref(".rar .zip .doc .docx .pdf .jpg...");
const tableData = ref([])
const tableColumns = reactive([
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '修改时间',
    dataIndex: 'lastModify',
    key: 'lastModify',
    width: '30%',
    customRender: ({ text: date }) =>  transTimestamp(date*1),
  },
  {
    title: '文件大小',
    dataIndex: 'size',
    key: 'size',
    width: '15%',
    align:'center',
    customRender: ({ text: date }) =>  getfilesize(date),
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
    getTableData()
  },
  onChange: (current: number) => {
    // 切换分页时的回调，
    pagination.current = current;
    getTableData()
  },
});

const getTableData = async () => {
  const parentId = '';
  const res = await apiStorageList(parentId, {page:pagination.current, size:pagination.pageSize});
  if (res.code == 200) {
    tableData.value = res.data;
  }else{
    message.error(res.message)
  }
}
const downloadStorage = async (id: string, name:string) => {
  const data = await apiDownloadStorage(id);
  try {
    await downloadRequest(data,name)
    message.success('下载成功')
  } catch (error:any) {
    message.error('下载失败')
  }
}
const delStorage = async (id: string) => {
  Modal.confirm({
    title: () => "删除",
    content: () => createVNode('div', { style: 'color:rgba(0, 0, 0, 0.8);' }, "确认删除该数据吗?"),
    okText: '确定',
    cancelText: '取消',
    async onOk() {
      const res = await apiDelStorage([id]);
      if (res.code == 200) {
        message.success(res.message)
        getTableData();
      }else{
        message.error(res.message)
      }
    },
    onCancel() {

    },
  });

}
onMounted(() => {
  getTableData();
})
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
