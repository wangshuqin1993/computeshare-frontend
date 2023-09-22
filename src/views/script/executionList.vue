<template>
  <div class="bg-[#FFFFFF] rounded-[2px] p-[20px]">
    <div class="text-[18px] font-medium mb-[20px]">执行结果</div>
    <div class=" scroll-max-h overflow-y-auto">
      <a-collapse v-model:activeKey="activeKey">
        <a-collapse-panel key="1" header="Task ID">
          <template #extra>
            <div class="flex">
              <div class="w-[190px] rounded-[100px] h-[26px] leading-[26px] text-[14px] font-medium text-[#FFFFFF] pl-[16px]"
                :class="executeStatusColor[status]">
              {{ executeStatus[status] }}
              </div>
              <a-tooltip placement="left" color="#FFFFFF">
                <template #title>
                  <div class="text-[14px]">
                    <div v-if="status === 1" class="tips-css" @click="cancelExecuteScript">取消执行</div>
                    <div v-if="status === 3" class="tips-css" @click="downloadScript">下载结果</div>
                    <div class="tips-css" @click="viewScript">查看脚本</div>
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
  
  <a-modal :title="scriptTitle"  v-model:open="scriptVisible" :footer="null" width="840px">
    <div style="height: 360px">
      <CodeEditor :readOnly="true" :value="scriptValue"></CodeEditor>
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { message } from "ant-design-vue";
import CodeEditor from '@/components/CodeEditor.vue';
import { executeStatus, executeStatusColor } from '@/enums/index';
import { apiScriptList, apiGetScriptById, apiCancelExecuteScript, apiDownloadScript } from '@/apis/script';

const activeKey = ref(['1']);
const status = ref(4);
const scriptTitle = ref('');
const scriptVisible = ref(false);
const scriptValue = ref('');
const listParams = ref({
  page: 1,
  size: 10,
});
const total = ref(0);
const scriptList = ref([]);
const scriptInfo = ref({});

//查看脚本
const viewScript = async () => {
  scriptVisible.value = true;
  scriptTitle.value = '123';
  scriptValue.value = '444';
  
  // let id = 1;

  // const res = await apiExecuteScript(id);
  // if (res.code == 200) {
  //   scriptValue.value = res.reason;
  //   message.success(res.message)
  // }else{
  //   message.error(res.message)
  // }

}
// 取消执行
const cancelExecuteScript = async () => {
  let id = 1;
  const res = await apiCancelExecuteScript(id);
  if (res.code == 200) {
    getScriptList(listParams)
    message.success(res.message)
  }else{
    message.error(res.message)
  }
}
// 下载脚本
const downloadScript = async () => {
  let id = 1;
  const res = await apiDownloadScript(id);
  if (res.code == 200) {
    message.success(res.message)
  }else{
    message.error(res.message)
  }
}

// 单个执行结果详情
const getScriptById = async () => {
  let id = '1';

  const res = await apiGetScriptById(id);
  
  if (res.code == 200) {
    scriptInfo.value = res.data;
    message.success(res.message)
  }else{
    message.error(res.message)
  }
}

// 执行结果
const getScriptList = async (listParams) => {

  const res = await apiScriptList(listParams);
  scriptList.value = res.list;
  listParams.page = res.page;
  listParams.size = res.size;
  total.value = res.total;
}

onMounted(() => {
  getScriptList(listParams);
})
</script>

<style scoped lang="less">
.scroll-max-h{
  max-height: calc(100vh - 679px);
}
</style>
