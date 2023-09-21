<!-- 我的资源 -->
<template>
  <div class="m-[20px]">
    <div class="bg-[#FFFFFF] scroll-max-h rounded-[2px] p-[20px] overflow-y-auto">
      <div v-if="noData" class="bg-[#FAFBFF] border border-dashed border-[#A6A6A6] rounded-[8px] py-[100px] px-[120px]">
        <div class="text-[32px] font-medium text-[#000000] mb-[30px]">您还没有云服务器实例</div>
        <div class="text-[#242425] text-[24px]">点击<label class="text-[#484FFF] cursor-pointer font-medium">创建实例</label>，即可拥有一台云服务器，开始搭建您的云上业务！</div>
      </div>
      <div v-else class="gap-[30px] grid grid-cols-4">
        <div class="card-div">
          <div class="flex justify-between items-center mb-[20px]">
            <div class="text-[21px] font-semibold">实例名称</div>
            <a-tooltip placement="bottom" color="#FFFFFF">
              <template #title>
                <div class="text-[14px]">
                  <div v-if="status === 3">
                    <div class="tips-css" @click="operate">访问实例</div>
                    <div class="tips-css">关闭实例</div>
                  </div>
                  <div v-else-if="status === 4" class="tips-css">启动实例</div>
                  <div v-else-if="status === 5" class="tips-css">删除实例</div>
                  <div v-else class="tips-css-none">暂无操作</div>
                </div>
              </template>
              <img src="@/assets/images/more.svg" class="w-[28px] cursor-pointer" />
            </a-tooltip>
          </div>
          <div class="mb-[10px]">
            <label class="card-sub-title">规格：</label>
            <label>2核 4GB</label>
          </div>
          <div class="mb-[10px]">
            <label class="card-sub-title">操作系统：</label>
            <label>Linux 3.2104 LTS 64位</label>
          </div>
          <div class="mb-[10px]">
            <label class="card-sub-title">状态：</label>
            <label class="rounded-[11px] text-[14px] font-medium text-[#FFFFFF] px-[23px] py-[3px]" 
              :class="resourceStatusColor[status]">{{ resourceStatus[status] }}</label>
          </div>
          <div class="mb-[20px]">
            <label class="card-sub-title">到期时间：</label>
            <label>2023.10.07 23:59:59</label>
          </div>
          <div class="border-t text-[14px]">
            <div class="pt-[20px] pb-[5px]">CPU使用率</div>
            <div class="bg-[#F8F9FC] rounded-[5px] h-[49px] echarts-width">
              <Echarts v-if="echartsWidth != ''" :echartsId="`cpucharts1`" :echartsData="echartsData" :echartsXData="echartsXData" :echartsWidth="echartsWidth" seriesName="CPU" areaColor="#5BD171" areaColor1="#94EAAA"></Echarts>
              <div v-if="false" class="text-[#BFBFBF] leading-[49px] text-center">NO Data</div>
            </div>
            <div class="pt-[10px] pb-[5px]">内存使用率</div>
            <div class="bg-[#F8F9FC] rounded-[5px] h-[49px]">
              <Echarts v-if="echartsWidth != ''" :echartsId="`cpucharts2`" :echartsData="echartsData" :echartsXData="echartsXData" :echartsWidth="echartsWidth" seriesName="内存" areaColor="#487DE9" areaColor1="#7EB4F6"></Echarts>
              <div v-if="false" class="text-[#BFBFBF] leading-[49px] text-center">NO Data</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { resourceStatus, resourceStatusColor } from '@/enums/index'
import Footer from "./footer.vue"
import Echarts from "@/components/Echarts.vue";

const noData = ref(false);
const status = ref(4);

const echartsWidth = ref('');
const echartsXData = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
const echartsData = ref([20, 502, 181, 234, 110, 290, 50, 20, 502, 181, 234, 810, 290, 50, 20, 502, 181, 234, 810, 290, 50]);

const operate = ()=>{
  // 访问实例是跳走，需要带走实例id
  window.open('/system')
}

onMounted(() => {
  echartsWidth.value = (document.getElementsByClassName('echarts-width')[0].clientWidth - 2) + 'px';
  console.log("width:::",echartsWidth.value);
})
</script>

<style scoped lang="less">
.scroll-max-h{
  max-height: calc(100vh - 515px);
}
.card-div{
  box-shadow: 0px 0px 20px 0px #EBEBF5;
  border-radius: 8px;
  border: 1px solid #E9E9E9;
  padding: 30px 20px 20px 20px;
}
.card-sub-title{
  font-size: 14px;
  color: #8C8C8C;
}
.border-t{
  border-top: 1px solid #E9E9E9;
}
</style>
