<template>
  <div class="bg-[#FFFFFF]">
    <div class="top-css py-[18px] px-[40px] flex justify-end">
      <a-tooltip placement="bottom" color="#FFFFFF">
        <template #title>
          <div class="text-[14px]">
            <div class="tips-css" @click="goUser">账户设置</div>
            <div class="tips-css" @click="logout">退出</div>
          </div>
        </template>
        <div class="bg-[#A6DBFF] h-[36px] w-[36px] rounded-full cursor-pointer"></div>
      </a-tooltip>
    </div>
    <div class="h-[130px] px-[40px] flex justify-between items-center">
      <div class="menu-title">{{ sidebarName[curBarName] }}</div>
      <a-button v-if="curBarName === 'Resource'" type="primary" class="ant-btn-s" @click="createVisible = true;">创建实例</a-button>
    </div>
  </div>
  <CreateModal v-if="curBarName === 'Resource'" :createVisible="createVisible" @handleCancelCreate="createVisible=false;" @handleDone="handleDone"></CreateModal>
</template>
<script setup lang="ts">
import { watch, ref } from 'vue';
import { useRouter } from "vue-router";
import { sidebarName } from '@/enums/index';
import CreateModal from "@/views/resource/create.vue";

const router = useRouter();
const curBarName = ref(router.currentRoute.value.name);
const createVisible = ref(false);
const emit = defineEmits(["handleDone"])

const handleDone = ()=>{
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
.top-css{
  height: 72px;
  box-shadow: 0px 1px 4px 0px rgba(0,21,41,0.12);
}
.menu-title{
  font-size: 24px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(0,0,0,0.85);
}
</style>