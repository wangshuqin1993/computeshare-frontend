<template>
    <Header />
    <div class="m-[20px]">
      <div class="flex">
        <div class="w-[70%]">
          <div class="bg-[#FFFFFFFF] rounded-[2px] mb-[2px] h-[100px] px-[20px] flex justify-between items-center">
            <div class="flex items-center">
              <span class="text-[18px] font-medium">Cycles余额</span>
              <span class="ml-[30px] text-[36px] font-semibold">0.00</span>
            </div>
            <div class="cursor-pointer text-[#484FFF] font-medium" @click="goDetail">充值记录</div>
          </div>
          <div class="bg-[#FFFFFFFF] rounded-[2px] mt-[20px] p-[20px] pl-0">
            <a-tabs v-model:activeKey="activeKey">
              <a-tab-pane key="1" tab="充值">
                <payTabContent ></payTabContent>
              </a-tab-pane>
              <a-tab-pane key="2" tab="兑换">
                <sdkTabContent></sdkTabContent>
              </a-tab-pane>
            </a-tabs>
          </div>
        </div>
        <div class="w-0 flex-1 ml-[20px] bg-[#FFFFFFFF] rounded-[2px]">
          123
        </div>
      </div>
    </div>
</template>
<script setup lang="ts">
import { useRouter} from 'vue-router'
import Header from "@/components/Header.vue";
import payTabContent from "./components/payTabContent.vue"
import { ref } from 'vue';

const router = useRouter()
const activeKey = ref('1');

const goDetail = () => {
  router.push('/dashboard/cyclesDetail')
}
</script>
<style lang="less" scoped>
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
</style>