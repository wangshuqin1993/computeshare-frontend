<!-- 文件存储 -->
<template>
  <Header :prefixName="prefixName"/>
  <div class="p-[20px] scroll-contain-h">
    <div class="bg-[#FFFFFF] rounded-[2px] mb-[20px] p-[20px]">
      <UploadFile :prefixName="prefixName" :suffixNames="suffixNames" :suffixText="suffixText" @refreshList="getTableData"></UploadFile>
    </div>
    <div class="bg-[#FFFFFF] rounded-[2px] p-[20px]">
      <div class="flex justify-end">
        <a-input v-model:value="searchVal" @keyup.enter="getTableData" @change="checkChange" allow-clear placeholder="按名称查找" class="mb-[20px] w-[40%]">
          <template #suffix>
            <img @click="getTableData" src="@/assets/icons/search.svg" class="w-[28px] cursor-pointer" />
          </template>
        </a-input>
        <a-button type="primary" class="ant-btn-s ml-[20px]" @click="createFile">创建文件夹</a-button>
      </div>
      <!-- :scroll="{x: false, y: 'calc(100vh - 691px)' }" -->
      <a-table :columns="tableColumns" :data-source="tableData" :pagination="pagination" >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'name'">
            <div class="flex items-center">
              <img v-if="record.etag" src="@/assets/images/file-img.png" class="h-[20px] mr-[8px]">
              <img v-else src="@/assets/images/folder-img.png" class="h-[20px] mr-[8px]">
              <span>{{ record.name }}</span>
            </div>
          </template>
          <template v-if="column.dataIndex === 'action'">
            <a-tooltip placement="left" color="#FFFFFF">
              <template #title>
                <div class="text-[14px]">
                  <div v-if="!record.etag" class="tips-css" @click="viewStorage(record)">查看</div>
                  <div class="tips-css" @click="copyToClipboard(record.s3Url,'已复制 S3 URI')">复制 S3 URI</div>
                  <div class="tips-css" @click="copyToClipboard(record.url,'已复制 URL')">复制 URL</div>
                  <div v-if="record.etag" class="tips-css" @click="downloadStorage(record)">下载文件</div>
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
  <CreateFileModal ref="createFileRef" :prefixName="prefixName" :showVisible="fileVisible" :bucketName="bucketName" @loadTable="getTableData" @closeModal="fileVisible=false"></CreateFileModal>
  <DeleteModal :showVisible="delVisible" :delType="delType" :bucketName="bucketName" :bucketKey="bucketKey" @closeModal="delVisible=false" @loadTable="getTableData"></DeleteModal>
  
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import UploadFile from '@/components/UploadFile.vue';
import Header from "@/components/Header.vue";
import { useRouter, useRoute } from "vue-router";
import { transTimestamp } from '@/utils/dateUtil';
import { apiGetBucketList, apiDownloadFileFromS3 } from '@/apis/s3_storage';
import { message } from 'ant-design-vue';
import { getfilesize, downloadRequest, copyToClipboard } from '@/utils/index'
import CreateFileModal from './components/CreateFileModal.vue';
import DeleteModal from './components/DeleteModal.vue';

const router = useRouter();
const route = useRoute();
const bucketName = ref<any>('');
const prefixName = ref<any>('');
const createFileRef = ref();
const bucketKey = ref('');
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
const checkChange = (row) => {
  if (row.type == 'click') {
    getTableData();
  }
}
const getTableData = async () => {
  // 改赋值，返回才可以刷新界面
  bucketName.value = route.query.bucketName || ''
  prefixName.value = route.query.prefix || route.query.prefixName || ''
  const params = {
    page: pagination.current,
    size: pagination.pageSize,
    prefix: prefixName.value,
    name: searchVal.value
  }
  const res = await apiGetBucketList(bucketName.value, params);
  if (res.code == 200) {
    tableData.value = res.data.list;
    pagination.total = res.data.total
  }else{
    message.error(res.message)
  }
}
const createFile = () => {
  fileVisible.value = true;
  createFileRef.value.formData.name = ''; //清空字段
}
// 查看
const viewStorage = async (item: any) => {
  // router.push("/dashboard/storageDetail?bucketName=" + item.name);
  const str = item.prefix ? item.prefix+'/'+item.name : item.name
  router.push("/dashboard/storageDetail?bucketName=" + bucketName.value + "&prefixName=" + encodeURIComponent(item.name) + "&prefix="+encodeURIComponent(str));
}
// 下载
const downloadStorage = async (item:any) => {
  const str = item.prefix ? item.prefix+'/'+item.name : item.name
  const data = await apiDownloadFileFromS3(bucketName.value, str);
  try {
    await downloadRequest(data,item.name)
    message.success('下载成功')
  } catch (error:any) {
    message.error('下载失败')
  }
}
const delStorage = async (item: any) => {
  delVisible.value = true;
  bucketKey.value = item.name;
  if (item.etag) {
    delType.value = 'file'; //删除文件：file
  } else {
    delType.value = 'folder'; //删除文件夹：folder
  }

}
onMounted(() => {
  getTableData();
})

watch(() => route.fullPath,
  () => {
    if(route.fullPath.indexOf('storageDetail') != -1){
      pagination.current = 1
      pagination.pageSize = 10
      prefixName.value = ''
      searchVal.value = ''
      getTableData();
    }
  }
  // {
  //   immediate:true
  // }
)
</script>

<style scoped lang="less">
.scroll-max-h{
  max-height: calc(100vh - 691px);
}
:deep(.ant-table-tbody){
  // max-height: calc(100vh - 691px);
  // overflow-y: auto;
}
</style>
