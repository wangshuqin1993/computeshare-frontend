<!-- 我的资源 -->
<template>
  <div class="bg-[#FFFFFF]">
    <div class="top-css">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="云服务器">
          <Resoure></Resoure>
        </a-tab-pane>
        <a-tab-pane key="2" tab="网络映射">
          <NetworkMap></NetworkMap>
        </a-tab-pane>
      </a-tabs>
      <div class="flex justify-end absolute w-[36px] top-[18px] right-[40px]">
        <a-tooltip placement="bottom" color="#FFFFFF">
          <template #title>
            <div class="text-[14px]">
              <div class="tips-css" @click="goUser">账户设置</div>
              <div class="tips-css" @click="logout">退出</div>
            </div>
          </template>
          <img src="@/assets/images/user-logo.png" class="h-[36px] w-[36px] cursor-pointer " />
        </a-tooltip>
      </div>
    </div>

    <!-- <div class="h-[130px] px-[40px] flex justify-between items-center">
      <div class="menu-title">{{ sidebarName[curBarName] }}</div>
      <a-button v-if="curBarName === 'Resource'" type="primary" class="ant-btn-s"
        @click="createVisible = true;">创建实例</a-button>
    </div> -->
  </div>

  <!-- <CreateModal v-if="curBarName === 'Resource'" :createVisible="createVisible"
    @handleCancelCreate="createVisible = false;" @handleDone="handleDone"></CreateModal> -->
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRouter } from "vue-router";
import { sidebarName } from '@/enums/index';
import CreateModal from "@/views/resource/create.vue";
import NetworkMap from './networkMap.vue';
import Resoure from "./resoure.vue";
const router = useRouter();
const curBarName = ref(router.currentRoute.value.name);
const createVisible = ref(false);

const activeKey = ref('1');

const emit = defineEmits(["handleDone"])

const handleDone = () => {
  createVisible.value = false
  emit('handleDone')
}
// 创建实例
const showCreateModal = () => {
  createVisible.value = true;
}

const goUser = () => {
  window.open("/dashboard/user");
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

watch(() => router.currentRoute.value,
  (value) => {
    curBarName.value = value.name;
  }, { deep: true, immediate: true }
)

defineExpose({
  showCreateModal
})
</script>
<style lang="less" scoped>
.top-css {
  height: 72px;
  box-shadow: 0px 1px 4px 0px rgba(0, 21, 41, 0.12);
}

.menu-title {
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.85);
}

:deep(.ant-tabs-nav-list) {
  height: 72px !important;
}

:deep(.ant-tabs-tab-btn) {
  font-size: 16px;
  color: #262626;
}

:deep(.ant-tabs-nav) {
  padding-left: 40px;
  padding-right: 40px;
}

:deep(.ant-tabs-top > .ant-tabs-nav) {
  margin-bottom: 0;
}
</style>
