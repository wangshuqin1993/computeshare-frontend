<!-- 我的资源 -->
<template>
  <Header ref="headRef" @handleDone="getInstanceList" />
  <div class="m-[20px]">
    <div class="bg-[#FFFFFF] scroll-max-h rounded-[2px] p-[20px] overflow-y-auto">
      <div v-if="!instanceList.length" class="bg-[#FAFBFF] border border-dashed border-[#A6A6A6] rounded-[8px] py-[100px] px-[120px]">
        <div class="text-[32px] font-medium text-[#000000] mb-[30px]">您还没有云服务器实例</div>
        <div class="text-[#242425] text-[24px]">点击<label class="text-[#484FFF] cursor-pointer font-medium" @click="showCreateModal">创建实例</label>，即可拥有一台云服务器，开始搭建您的云上业务！</div>
      </div>
      <div v-else class="gap-[30px] grid grid-cols-4">
        <div class="card-div" v-for="(item,key) in instanceList" :key="key">
          <div class="flex justify-between items-center mb-[20px]">
            <div class="text-[21px] font-semibold text-ellipsis pr-[15px]">{{ item.name }}</div>
            <a-tooltip placement="bottom" color="#FFFFFF">
              <template #title>
                <div class="text-[14px]">
                  <div v-if="item.status === 1">
                    <div class="tips-css" @click="operate(item.id)">访问实例</div>
                    <div class="tips-css" @click="instanceStop(item.id)">关闭实例</div>
                  </div>
                  <div v-else-if="item.status === 2" class="tips-css" @click="instanceStart(item.id)">启动实例</div>
                  <div v-else-if="item.status === 3" class="tips-css" @click="instanceDelete(item.id)">删除实例</div>
                  <div v-else class="tips-css-none">暂无操作</div>
                </div>
              </template>
              <img src="@/assets/images/more.svg" class="w-[28px] cursor-pointer" />
            </a-tooltip>
          </div>
          <div class="mb-[10px]">
            <label class="card-sub-title">规格：</label>
            <label>{{ item.core }}核 {{ item.memory }}GB</label>
          </div>
          <div class="mb-[10px]">
            <label class="card-sub-title">操作系统：</label>
            <label>{{ item.imageName }}</label>
          </div>
          <div class="mb-[10px]">
            <label class="card-sub-title">状态：</label>
            <label class="rounded-[11px] text-[14px] font-medium text-[#FFFFFF] px-[23px] py-[3px]" 
              :class="resourceStatusColor[item.status]">{{ resourceStatus[item.status] }}</label>
          </div>
          <div class="mb-[20px]">
            <label class="card-sub-title">到期时间：</label>
            <label>{{ formatDateToLocale(item.expirationTime).format("YYYY/MM/DD HH:mm:ss") }}</label>
          </div>
          <div class="border-t text-[14px]">
            <div class="pt-[20px] pb-[5px]">CPU使用率</div>
            <div class="bg-[#F8F9FC] rounded-[5px] h-[49px] echarts-width">
              <Echarts v-if="echartsWidth != ''" :echartsId="`cpucharts${key}`" :echartsData="echartsData" :echartsXData="echartsXData" :echartsWidth="echartsWidth" seriesName="CPU使用率" areaColor="#5BD171" areaColor1="#94EAAA"></Echarts>
              <div v-if="false" class="text-[#BFBFBF] leading-[49px] text-center">NO Data</div>
            </div>
            <div class="pt-[10px] pb-[5px]">内存使用率</div>
            <div class="bg-[#F8F9FC] rounded-[5px] h-[49px]">
              <Echarts v-if="echartsWidth != ''" :echartsId="`memorycharts${key}`" :echartsData="echartsData" :echartsXData="echartsXData" :echartsWidth="echartsWidth" seriesName="内存使用率" areaColor="#487DE9" areaColor1="#7EB4F6"></Echarts>
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
import { onMounted, ref, onUnmounted } from "vue";
import { message } from "ant-design-vue";
import { formatDateToLocale } from '@/utils/dateUtil';
import { resourceStatus, resourceStatusColor } from '@/enums/index'
import Footer from "./footer.vue"
import Echarts from "@/components/Echarts.vue";
import { apiGetInstanceList, apiInstanceStart, apiInstanceStop, apiInstanceDelete } from '@/apis/compute';
import Header from "@/components/Header.vue";

const instanceList = ref([]);
const headRef = ref();

const echartsWidth = ref('');
const echartsXData = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
const echartsData = ref([20, 502, 181, 234, 110, 10, 10, 10, 10, 10]);
let isLoop = ref()

const operate = (id: string)=>{
  // 访问实例是跳走，需要带走实例id
  window.open(`/system?instanceId=${id}`)
}

// 创建实例
const showCreateModal = () => {
  headRef.value.showCreateModal();
}

//启动实例
const instanceStart = async (id: string) => {
  
  const res = await apiInstanceStart(id);
  if (res.code == 200) {
    getInstanceList()
    message.success(res.message)
  }else{
    message.error(res.message)
  }
}

//关闭实例
const instanceStop = async (id: string) => {
  
  const res = await apiInstanceStop(id);
  if (res.code == 200) {
    getInstanceList()
    message.success(res.message)
  }else{
    message.error(res.message)
  }
}

//删除实例
const instanceDelete = async (id: string) => {
  
  const res = await apiInstanceDelete(id);
  if (res.code == 200) {
    getInstanceList()
    message.success(res.message)
  }else{
    message.error(res.message)
  }
}

// 实例列表
const getInstanceList = async () => {

  const res = await apiGetInstanceList();
  if (res.code == 200) {
    instanceList.value = res.data;
  }else{
    message.error(res.message)
  }
}
onMounted(() => {
  getInstanceList();
  
  setTimeout(() => {
    if (instanceList.value.length > 0) {
      echartsWidth.value = (document.getElementsByClassName('echarts-width')[0].clientWidth - 2) + 'px';
    }
  }, 1000);
  // 开启循环去实时调cpu和内存使用率
  isLoop.value = setInterval(() => {
    // getInstanceList()
  }, 3000);
})

onUnmounted(()=>{
  clearInterval(isLoop.value)
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
.text-ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
