<!-- 文件存储 -->
<template>
  <Header @handleDone="getTableData" />
  <div class="p-[20px] scroll-contain-h">
    <div class="bg-[#FFFFFF] rounded-[2px] p-[20px]">
      <div class="flex justify-end">
        <a-input v-model:value="searchVal" @keyup.enter="getTableData" @change="checkChange" allow-clear placeholder="按名称查找存储桶" class="mb-[20px] w-[40%]">
          <template #suffix>
            <img @click="getTableData" src="@/assets/icons/search.svg" class="w-[28px] cursor-pointer" />
          </template>
        </a-input>
      </div>
      <!-- :scroll="{x: false, y: 'calc(100vh - 400px)' }" -->
      <a-table :columns="tableColumns" :data-source="tableData" :pagination="pagination" >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <div class="text-[14px] flex">
              <a-button type="link" @click="viewStorage(record)">查看</a-button>
              <a-button type="link" @click="clearStorage(record)">清空</a-button>
              <a-button type="link" danger @click="delStorage(record)">删除</a-button>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>
  <StorageInfoModal :showVisible="infoVisible" @closeModal="infoVisible=false"></StorageInfoModal>
  <ClearStorageModal :showVisible="clearVisible" :bucketName="tempBucketName" @closeModal="clearVisible=false"></ClearStorageModal>
  <DeleteModal :showVisible="delVisible" :delType="delType" :bucketName="tempBucketName" @loadTable="getTableData" @closeModal="delVisible=false"></DeleteModal>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import Header from "@/components/Header.vue";
import { transTimestamp } from '@/utils/dateUtil';
import { apiBucketList, apiGetBucketList } from '@/apis/s3_storage';
import { message } from 'ant-design-vue';
import { useRouter, useRoute } from "vue-router";
import StorageInfoModal from './components/StorageInfoModal.vue';
import ClearStorageModal from './components/ClearStorageModal.vue';
import DeleteModal from './components/DeleteModal.vue';

const route = useRoute()
const router = useRouter();
const searchVal = ref('');
const infoVisible = ref(false); //存储桶提示信息,此存储桶不为空
const clearVisible = ref(false); //清空存储桶
const delVisible = ref(false); //删除。。。
const delType = ref('storage'); //删除文件：file，文件夹：folder，存储桶：storage
const tempBucketName = ref('');
const tableData = ref([])
const tableColumns = reactive([
  {
    title: '存储桶名称',
    dataIndex: 'bucket',
    key: 'bucket',
    width: '34%',
  },
  {
    title: '修改时间',
    dataIndex: 'createdTime',
    key: 'createdTime',
    width: '33%',
    customRender: ({ text: date }) =>  transTimestamp(date*1),
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: '34%',
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
  const params = {
    page: pagination.current,
    size: pagination.pageSize,
    name: searchVal.value
  }
  const res = await apiBucketList(params);
  if (res.code == 200) {
    tableData.value = res.data.list;
  }else{
    message.error(res.message)
  }
}
// 查看
const viewStorage = (item: any) => {
  router.push("/dashboard/storageDetail?bucketName=" + item.bucket);
  console.log("viewStorage:",item);
}
// 清空
const clearStorage = (item: any) => {
  tempBucketName.value = item.bucket;
  clearVisible.value = true;
}
// 删除
const delStorage = async (item: any) => {
  tempBucketName.value = item.bucket;
  const params = {
    page: 1,
    size: 10,
    prefix: '',
    name: ''
  }
  const res = await apiGetBucketList(tempBucketName.value,params);
  if (res.code == 200) {
    if (res.data.list.length > 0) {
      infoVisible.value = true; //存储桶不为空
    } else {
      delVisible.value = true; //删除存储桶
    }
  }else{
    message.error(res.message)
  }
}
onMounted(() => {
  getTableData();
})

watch(() => route.fullPath,
  () => {
    if(route.fullPath.indexOf('Storage') != -1){
      pagination.current = 1
      pagination.pageSize = 10
      searchVal.value = ''
      getTableData();
    }
  }
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
