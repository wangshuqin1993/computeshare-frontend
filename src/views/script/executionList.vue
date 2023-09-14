<template>
  <div class="bg-[#FFFFFF] rounded-[2px] p-[20px]">
    <div class="text-[18px] font-medium mb-[20px]">执行结果</div>
    <div class=" scroll-max-h overflow-y-auto">
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel key="1" header="Task ID">
          <template #extra>
            <div class="flex">
              <div class="w-[190px] rounded-[100px] h-[26px] leading-[26px] text-[14px] font-medium text-[#FFFFFF] pl-[16px]"
                :class="[status === 1 ? 'bg-[#6A9DCB]' : status === 2 ? 'bg-[#008FFF]' : status === 3 ? 'bg-[#00C900]' : 'bg-[#AEAEAE]']">
              {{ executeStatus[status] }}
              </div>
              <a-tooltip placement="left" color="#FFFFFF">
                <template #title>
                  <div class="text-[14px]">
                    <div v-if="status === 1" class="tips-css">取消执行</div>
                    <div v-if="status === 3" class="tips-css">下载结果</div>
                    <div class="tips-css">查看脚本</div>
                  </div>
                </template>
                <img src="@/assets/images/more-vertical.svg" class="h-[26px] cursor-pointer ml-[12px]" />
              </a-tooltip>
            </div>
          </template>
          <div>
            <div v-if="status === 1" class="text-[#8C8C8C] py-[30px] text-center">NO Data</div>
            <div v-else>待添加</div>
          </div>
        </a-collapse-panel>
      </a-collapse>
      <div class="text-center mt-[20px] cursor-pointer text-[#484FFF]">加载更多…</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { executeStatus } from '@/enums/index';

const activeKey = ref(['1']);
const status = ref(1);

</script>

<style scoped lang="less">
.scroll-max-h{
  max-height: calc(100vh - 679px);
}
</style>
