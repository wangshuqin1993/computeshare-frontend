<template>
  <div class="tips-card" v-if="showTips">
    <div class="px-[30px]">
      <div class="border-btm flex py-[30px] justify-between">
        <div class="text-[18px] leading-[25px] font-medium text-ellipsis w-[260px]">
          <div v-if="runNum > 0">正在上传（{{ runNum }}/{{ fileList.length }}）</div>
          <div v-else>上传完成（{{ sucNum }}/{{ fileList.length }}）</div>
        </div>
        <div class="flex">
          <img @click="showCard=!showCard" :class="{'rotate-180' : showCard}" src="@/assets/images/up.png" class="mr-[18px] h-[25px] cursor-pointer" />
          <img @click="showTips=false" src="@/assets/images/close.png" class="h-[25px] cursor-pointer" />
        </div>
      </div>
    </div>
    <div v-if="showCard" class="max-h-[260px] overflow-y-auto px-[30px] pb-[30px]">
      <div class="mt-[30px] flex justify-between" v-for="(item,key) in fileList" :key="key">
        <div class="flex items-center">
          <img v-if="item.status === 'done'" src="@/assets/images/file2.png" class="mr-[20px] h-[25px]" />
          <img v-else src="@/assets/images/file1.png" class="mr-[20px] h-[25px]" />
          <div class="text-ellipsis w-[200px]">#{{ fileList.length-key }} {{ item.name }}</div>
        </div>
        <div class="flex items-center">
          <div v-if="item.status === 'error'" class="text-[#8C8C8C] text-[14px]">上传失败</div>
          <img v-if="item.status === 'uploading'" src="@/assets/images/running.png" class="ml-[10px] h-[27px]" />
          <img v-else-if="item.status === 'done'" src="@/assets/images/success.png" class="ml-[10px] h-[27px]" />
          <img v-else-if="item.status === 'error'" src="@/assets/images/fail.png" class="ml-[10px] h-[27px]" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue';
const props = defineProps({
  fileList: {
    type: Array as any,
    default: () => {
      return []
    },
    required: true
  }
});
const { fileList } = toRefs(props);
const showTips = ref(false);
const showCard = ref(false);
const runNum = ref(0);
const sucNum = ref(0);
const setFileNumber = (fileData) => {
  runNum.value = 0;
  sucNum.value = 0;
  fileData.forEach((ele) => {
    if (ele.status === 'uploading') { //running
      runNum.value ++;
    } else if (ele.status === 'done') { //suc
      sucNum.value++;
    }
  })
  if (fileData.length > 0) {
    showTips.value = true;
  }
}
watch(
  () => props.fileList,
  (newVal, oldVal) => {
    setFileNumber(newVal);
  }, 
  { deep: true, immediate: true }
);
onMounted(() => {
  setFileNumber(fileList.value);
})
</script>
<style scoped lang="less">
.tips-card{
  position: fixed;
  z-index: 99;
  bottom: 0px;
  right: 20px;
  width: 409px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 0px #EBEBF5;
  border-radius: 30px 30px 0px 0px;
  border: 1px solid #E9E9E9;
}
.border-btm{
  border-bottom: 1px solid #E9E9E9;
}
</style>