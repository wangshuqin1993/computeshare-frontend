<template>
    <Header/>
    <div class="rounded-[2px] p-[20px] m-[20px] bg-[#FFFFFF] scroll-max-h overflow-y-auto">
        <!-- 存储信息 -->
        <div class="border border-solid border-[#E9E9E9] rounded-[4px]">
            <div class="p-[20px]">
                <p class="text-[18px] font-medium mb-[5px]">文件存储SDK</p>
            </div>
            <a-tabs v-model:activeKey="activeKey">
              <a-tab-pane key="1" tab="cmd">
                <cmdTabContent ></cmdTabContent>
              </a-tab-pane>
              <a-tab-pane key="2" tab="sdk">
                <sdkTabContent></sdkTabContent>
              </a-tab-pane>
            </a-tabs>
        </div>
        <!-- 密钥信息 -->
        <div class="border border-solid border-[#E9E9E9] rounded-[4px] mt-[20px]">
            <div class="p-[20px]">
                <p class="text-[18px] font-medium mb-[5px]">访问密钥</p>
                <p class="text-[14px] text-[#8C8C8C] font-normal">使用访问密钥从SDK以编程方式调用文件存储 </p>
            </div>
            <div class="w-[100%] line"></div>
            <div class="p-[20px]">
                <div class="w-[100%] flex justify-end mb-[20px]">
                    <a-button type="primary" class="w-[156px] h-[38px] text-[14px] text-center rounded-[5px] font-normal" @click="createNewKey">创建密钥</a-button>
                </div>
                <a-table :columns="secretKeyColumns" :data-source="secretKeyList">
                    <template #bodyCell="{ column, text, record }">
                        <!-- <template v-if="column.key === 'accessKey'">
                            <span>{{ getPonitStr(text,2,2) }}</span>
                        </template>
                        <template v-if="column.key === 'secretKey'">
                            <span>{{ getPonitStr(text,2,2) }}</span>
                        </template> -->
                        <template v-if="column.key === 'action'">
                            <a-tooltip placement="left" color="#FFFFFF">
                                <template #title>
                                    <div class="text-[14px] w-[120px]">
                                        <div @click="checkKey(record)" class="w-[114px] h-[34px] leading-[34px] pl-[20px] text-[14px] cursor-pointer text-[#000] hover:text-[#484FFF] hover:bg-[#F5F7FA]">查看密钥</div>
                                        <div @click="DelelteKey(record)" class="w-[114px] h-[34px] leading-[34px] pl-[20px] text-[14px] cursor-pointer text-[#000] hover:text-[#484FFF] hover:bg-[#F5F7FA]">删除</div>
                                    </div>
                                </template>
                                <img src="@/assets/images/more-vertical.svg" class="h-[26px] cursor-pointer" />
                            </a-tooltip>
                        </template>
                    </template>
                </a-table>
            </div>
        </div>
    </div>
    <checkOrDelKeyModal v-if="visibleMobile" :visibleMobile="visibleMobile" :title="title" @closeCheckKeyModal="closeCheckKeyModal" @showKeyModalFn="showKeyModalFn" @delKeyFn="delKeyFn"/>
    <showKeyModal :showKeepKeyVisible="showKeepKeyVisible" :keyInfo="keyInfo" @closeKeyModal="closeKeyModal"/>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Header from "@/components/Header.vue";
import checkOrDelKeyModal from './components/checkOrDelKeyModal.vue';
import showKeyModal from './components/showKeyModal.vue';
import cmdTabContent from './components/cmdTabContent.vue';
import sdkTabContent from './components/sdkTabContent.vue';
import { apiCreateKey, apiS3User, apiGetKey, apiDelKey } from '@/apis/developer'
import { message } from 'ant-design-vue';
import { transTimestamp } from '@/utils/dateUtil';

const visibleMobile = ref(false)
const showKeepKeyVisible = ref(false)
const title = ref('')
const keyInfo = ref({})
const activeKey = ref('1');

// 密钥 id 
const id = ref('')

interface phoneCodeParams {
  countryCallCoding: string,
  telephoneNumber: string,
  validateCode: string,
}

const secretKeyColumns = [
  {
    title: 'access_key',
    dataIndex: 'accessKey',
    key: 'accessKey',
    // customRender: ({ text }) =>  getPonitStr(text,2,2),
  },
  {
    title: 'secret_key',
    dataIndex: 'secretKey',
    key: 'secretKey',
    // customRender: ({ text }) =>  getPonitStr(text,2,2),
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: ' createTime',
    customRender: ({ text: date }) =>  transTimestamp(date*1),
  },
  {
    title: '',
    key: 'action',
    align: 'right'
  },
];

const secretKeyList = ref([{}])

const closeCheckKeyModal = ()=>{
    visibleMobile.value = false
}

const checkKey = (record:any)=>{
    title.value = "查看密钥"
    visibleMobile.value = true
    id.value = record.id
}

const DelelteKey = (record:any)=>{
    title.value = "删除密钥"
    visibleMobile.value = true
    id.value = record.id
}

// 打开密钥弹框
const showKeyModalFn = async(formMobileData:phoneCodeParams)=>{
    console.log(111111111111111,id.value,formMobileData)
    visibleMobile.value = false
    const res = await apiGetKey(id.value, formMobileData)
    if(res.code===200){
        keyInfo.value = res.data
        showKeepKeyVisible.value = true
    }else{
        message.error(res.message)
    }
}

// 删除密钥
const delKeyFn = async(formMobileData:phoneCodeParams)=>{
    console.log(222222222222222,id.value,formMobileData)
    visibleMobile.value = false
    const res = await apiDelKey(id.value, formMobileData)
    if(res.code===200){
        getKeyList()
    }else{
        message.error(res.message)
    }
}

// 保管密钥弹框
const showKeepModalFn = ()=>{
    showKeepKeyVisible.value = true
}

// 关闭密钥弹框
const closeKeyModal = ()=>{
    showKeepKeyVisible.value = false
}

// 创建密钥
const createNewKey = async()=>{
    const res = await apiCreateKey()
    if(res.code===200){
        getKeyList()
    }else{
        message.error(res.message)
    }
}

const getKeyList = async()=>{
    const res = await apiS3User()
    // debugger
    if(res.code===200){
        secretKeyList.value = res.data
    }else{
        message.error(res.message)
    }
}

onMounted(()=>{
    getKeyList()
})

</script>
<style lang="less" scoped>
.line {
  border-top: 1px solid #E9E9E9;
}
.scroll-max-h{
  max-height: calc(100vh - 242px);
}
:deep(.ant-tabs-top > .ant-tabs-nav){
  margin-bottom: 0px !important;
}
:deep(.ant-tabs .ant-tabs-tab){
  padding: 12px 30px;
}
</style>