<template>
    <Header />
    <div class="m-[20px] scroll-contain-h">
      <div class="flex">
        <div class="w-[70%]">
          <div class="bg-[#FFFFFFFF] rounded-[2px] mb-[2px] h-[100px] px-[20px] flex justify-between items-center">
            <div class="flex items-center">
              <span class="text-[18px] font-medium">Cycles余额</span>
              <span class="ml-[30px] text-[36px] font-semibold">{{ formatAmount(cycleBalance) }}</span>
            </div>
            <!--  @click="goDetail" -->
            <div class="cursor-pointer text-[#484FFF] font-medium">充值记录</div>
          </div>
          <div class="bg-[#FFFFFFFF] rounded-[2px] mt-[20px] p-[20px] pl-0">
            <a-tabs v-model:activeKey="activeKey" @change="handleTabs">
              <a-tab-pane key="1" tab="充值">
                <payTabContent ref="payTabRef" @getCycleBalances="getCycleBalances"></payTabContent>
              </a-tab-pane>
              <a-tab-pane key="2" tab="兑换">
                <exchangeTabContent ref="exchangeTabRef" @getCycleBalances="getCycleBalances"></exchangeTabContent>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
        <div class="w-0 flex-1 ml-[20px] p-[20px] bg-[#FFFFFFFF] rounded-[2px]">
          <div class="text-[18px] font-medium mb-[10px]">Cycle是平台充值币</div>
          <div class="text-[12px] font-light text-[#8C8C8C]">用于购买平台上的所有资源和服务,每个Cycle的购买价格为0.001元,至少1000个Cycles起</div>
          <div class="right-title">云服务器</div>
          <div class="right-desc">
            <div>租用云服务器</div>
            <div>50,000 Cycles /30天</div>
          </div>
          <div class="right-desc2">
            <div>适用于测试环境搭建</div>
            <div>（ ¥50 /30天 ）</div>
          </div>
          <div class="right-title">文件存储</div>
          <div class="right-desc">
            <div>租用S3存储空间</div>
            <div>5 Cycles / GB / 30天</div>
          </div>
          <div class="right-desc2">
            <div>适用于测试环境搭建</div>
            <div>（ ¥0.005 /30天 ）</div>
          </div>
          <div class="right-title">沙箱服务</div>
          <div class="right-desc">
            <div>使用沙箱服务</div>
            <div>Coming Soon</div>
          </div>
          <div class="right-desc2">
            <div>适用于测试环境搭建</div>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter} from 'vue-router'
import { message } from 'ant-design-vue';
import Header from "@/components/Header.vue";
import { apiGetCycleBalance } from '@/apis/cycles';
import { formatAmount } from '@/utils/index'
import payTabContent from "./components/payTabContent.vue";
import exchangeTabContent from './components/exchangeTabContent.vue';

const router = useRouter()
const activeKey = ref('1');
const payTabRef = ref();
const exchangeTabRef = ref();
const cycleBalance = ref(0.00)

//获取cycle余额
const getCycleBalances = async () => {

  const res = await apiGetCycleBalance();
  if (res.code == 200) {
    cycleBalance.value = res.data;
  }else{
    message.error(res.message)
  }
}

const handleTabs = () => {
  if (activeKey.value == '1') {
    payTabRef.value.cyclesMoney = '';
    payTabRef.value.cyclesNumber = 0;
  } else {
    if (exchangeTabRef.value) {
      exchangeTabRef.value.cyclesCode = '';
    }
  }
}
const goDetail = () => {
  router.push('/dashboard/cyclesDetail')
}

onMounted(() => {
  getCycleBalances();
});
</script>
<style scoped>
:deep(.ant-tabs-top > .ant-tabs-nav){
  margin-bottom: 0px !important;
}
:deep(.ant-tabs .ant-tabs-tab){
  padding: 12px 30px;
  font-size: 18px;
}
:deep(.ant-tabs .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn){
  color: #262626;
  font-weight: 600;
}
.right-title{
  @apply text-[14px] font-semibold mt-[20px] mb-[10px];
}
.right-desc{
  @apply flex justify-between text-[14px] font-light;
}
.right-desc2{
  @apply flex justify-between text-[12px] font-light text-[#8C8C8C];
}
</style>