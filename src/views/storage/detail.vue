<!-- 文件存储 -->
<template>
  <Header />
  <div class="p-[20px] scroll-contain-h">
    <div class="bg-[#FFFFFF] rounded-[2px] mb-[20px] p-[20px]">
      <UploadFile :suffixNames="suffixNames" :suffixText="suffixText" @refreshList="getTableData"></UploadFile>
    </div>
    <div class="bg-[#FFFFFF] rounded-[2px] p-[20px]">
      <div class="flex justify-end">
        <a-input v-model:value="searchVal" @keyup.enter="getTableData" allow-clear placeholder="按名称查找" class="mb-[20px] w-[40%]">
          <template #suffix>
            <a-tooltip title="Search" @click="getTableData">
              <img src="@/assets/icons/search.svg" class="w-[28px] cursor-pointer" />
            </a-tooltip>
          </template>
        </a-input>
        <a-button type="primary" class="ant-btn-s ml-[20px]" @click="fileVisible = true;">创建文件夹</a-button>
      </div>
      <a-table :columns="tableColumns" :data-source="tableData" :pagination="pagination" :scroll="{x: false, y: 'calc(100vh - 691px)' }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <a-tooltip placement="left" color="#FFFFFF">
              <template #title>
                <div class="text-[14px]">
                  <div class="tips-css" @click="viewStorage(record)">查看</div>
                  <div class="tips-css" @click="copyStorage(record, 'S3 URL')">复制 S3 URL</div>
                  <div class="tips-css" @click="copyStorage(record, 'URL')">复制 URL</div>
                  <div class="tips-css" @click="downloadStorage(record)">下载文件</div>
                  <div class="tips-css" @click="delStorage(record)">删除</div>
                </div>
              </template>
              <img src="@/assets/images/more-vertical.svg" class="h-[26px] cursor-pointer" />
            </a-tooltip>
          </template>
        </template>
      </a-table>
    </div>
  </div>
  <CreateFileModal :showVisible="fileVisible" :bucketName="bucketName" @loadTable="getTableData" @closeModal="fileVisible=false"></CreateFileModal>
  <DeleteModal :showVisible="delVisible" :delType="delType" :bucketName="bucketName" @closeModal="delVisible=false" @loadTable="getTableData"></DeleteModal>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import UploadFile from '@/components/UploadFile.vue';
import Header from "@/components/Header.vue";
import { useRouter, useRoute } from "vue-router";
import { transTimestamp } from '@/utils/dateUtil';
import { apiGetBucketList, apiDownloadFileFromS3 } from '@/apis/s3_storage';
import { message } from 'ant-design-vue';
import { getfilesize, downloadRequest } from '@/utils/index'
import CreateFileModal from './components/CreateFileModal.vue';
import DeleteModal from './components/DeleteModal.vue';

const router = useRouter();
const route = useRoute();
const bucketName = (route.query.bucketName || '').toString();
const searchVal = ref('');
const fileVisible = ref(false); // 创建文件夹
const delVisible = ref(false); //删除。。。
const delType = ref('folder'); //删除文件：file，文件夹：folder，存储桶：storage
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
    width: '5%',
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
  const res = await apiGetBucketList(bucketName, '');
  if (res.code == 200) {
    tableData.value = res.data;
  }else{
    message.error(res.message)
  }
}
const copyStorage = (item: any, copyType: string) => {
  message.success("已复制 " + copyType);
  console.log("copyStorage:",item, copyType);
}
// 查看
const viewStorage = async (item: any) => {
  router.push("/dashboard/storageDetail?bucketName=" + item.bucket);
}
// 下载
const downloadStorage = async (item:any) => {
  const data = await apiDownloadFileFromS3(item.bucket, item.id);
  try {
    await downloadRequest(data,item.bucket)
    message.success('下载成功')
  } catch (error:any) {
    message.error('下载失败')
  }
}
const delStorage = async (item: any) => {
  delVisible.value = true;
  delType.value = 'folder'; //删除文件：file，文件夹：folder
  console.log("delStorage:", item);

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
