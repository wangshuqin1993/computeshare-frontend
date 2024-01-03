<!-- 我的资源 -->
<template>
  <div class="bg-[#FFFFFF]">
    <div class="top-css">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="云服务器">
          <Resoure @changeTabKey="changeTabKey"></Resoure>
        </a-tab-pane>
        <a-tab-pane key="2" tab="网络映射">
          <NetworkMap></NetworkMap>
        </a-tab-pane>
      </a-tabs>
      <div class="flex justify-end absolute w-[36px] top-[18px] right-[40px]">
        <HeaderUser></HeaderUser>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRouter } from "vue-router";
import NetworkMap from './networkMap.vue';
import Resoure from "./resoure.vue";
import HeaderUser from '@/components/HeaderUser.vue';
const router = useRouter();
const curBarName = ref(router.currentRoute.value.name);
const createVisible = ref(false);

const activeKey = ref('1');

const emit = defineEmits(["handleDone"])

// 创建实例
const showCreateModal = () => {
  createVisible.value = true;
}

const changeTabKey = ()=>{
  activeKey.value = '2'
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
