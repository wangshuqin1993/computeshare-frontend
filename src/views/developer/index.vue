<template>
    <Header/>
    <div class="rounded-[2px] p-[20px] m-[20px] bg-[#FFFFFF] scroll-max-h overflow-y-auto">
        <!-- 存储信息 -->
        <div class="border border-solid border-[#E9E9E9] rounded-[4px]">
            <div class="p-[20px]">
                <p class="text-[18px] font-medium mb-[5px]">文件存储SDK</p>
                <p class="text-[14px] text-[#8C8C8C] font-normal">使用访问密钥从SDK以编程方式调用文件存 </p>
            </div>
            <div class="w-[100%] mb-[18px] line"></div>
            <div class="p-[20px]">
                <p class="text-[16px] font-medium text-[#595959]">下载路径</p>
                <div class="text-[14px] font-normal mt-[14px]">
                    <div>
                        <span class="w-[45px] inline-block">Go：</span>
                        <span>https://github.com/aws/aws-sdk-go</span>
                    </div>
                    <div>
                        <span class="w-[45px] inline-block">Java：</span>
                        <span>https://github.com/aws/aws-sdk-java</span>
                    </div>
                </div>
                <div class="w-[100%] my-[18px] line"></div>
                <p class="text-[16px] font-medium text-[#595959] mb-[10px]">配置凭证</p>
                <p class="text-[14px] font-medium">您可以使用任何文本编辑器在您的主目录中创建一个。将以下内容添加到您的凭据文件中，并将 &lt;YOUR_ACCESS_KEY&gt; 和替换 &lt;YOUR_SECRET_KEY&gt; 为您的凭据。</p>
                <div class="rounded-[4px] bg-[#FAFBFF] p-[20px] mt-[14px] mb-[20px] text-[14px]">
                    <p>
                        <span class="text-[#C8AD26]">host_base = </span>
                        <span class="text-[#60A210]">computeshare.newtouch.com:8333</span>
                    </p>
                    <p class="py-[10px]">
                        <span class="text-[#C8AD26]">access_key = </span>
                        <span class="text-[#60A210]">&lt;YOUR_ACCESS_KEY&gt;</span>
                    </p>
                    <p>
                        <span class="text-[#C8AD26]">secret_key = </span>
                        <span class="text-[#60A210]">&lt;YOUR_SECRET_KEY&gt;</span>
                    </p>
                </div>
            </div>
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
                        <template v-if="column.key === 'accessKey'">
                            <span>{{ getPonitStr(text,2,2) }}</span>
                        </template>
                        <template v-if="column.key === 'secretKey'">
                            <span>{{ getPonitStr(text,2,2) }}</span>
                        </template>
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
import { computed, onMounted, reactive, ref } from 'vue';
import Header from "@/components/Header.vue";
import checkOrDelKeyModal from './components/checkOrDelKeyModal.vue';
import showKeyModal from './components/showKeyModal.vue';
import { getPonitStr } from '@/utils/index'
import { apiCreateKey, apiS3User } from '@/apis/developer'
import { message } from 'ant-design-vue';
import { transTimestamp } from '@/utils/dateUtil';

const visibleMobile = ref(false)
const showKeepKeyVisible = ref(false)
const title = ref('')
const keyInfo = ref({
    access_key: 'ptif2233yntj8r2ptife',
    secret_key: 'ptif2233yntj8r2ptife'
})

const secretKeyColumns = [
  {
    title: 'access_key',
    dataIndex: 'accessKey',
    key: 'accessKey',
  },
  {
    title: 'secret_key',
    dataIndex: 'secretKey',
    key: 'secretKey',
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

const secretKeyList = ref([
    {
        access_key: 'mo11111111111111111111111111111111111111ng',
        secret_key: 'Ab2222222222222222222222222222222222222234',
        time: '2023.09.08 17:18'
    }
])

const closeCheckKeyModal = ()=>{
    visibleMobile.value = false
}

const checkKey = ()=>{
    title.value = "查看密钥"
    visibleMobile.value = true
}

const DelelteKey = ()=>{
    title.value = "删除密钥"
    visibleMobile.value = true
}

// 打开密钥弹框
const showKeyModalFn = ()=>{
    visibleMobile.value = false
}

// 删除密钥
const delKeyFn = ()=>{

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
        secretKeyList.value = [res.data]
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
</style>