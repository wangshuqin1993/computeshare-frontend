<!-- 壳子 -->
<template>
    <div class="flex dashboard-index rounded-[12px]">
        <div class="dashboard-index-left">
          <img src="@/assets/images/menu-logo.png" class="h-[38px] my-[32px] mx-[24px]" />
          <a-menu theme="dark" v-model:selectedKeys="selectedKeys" style="width: 312px">
              <a-menu-item v-for="item in menuRouterList" :key="item.name">
                  <router-link :to="item.name">
                      <div class="flex items-center">
                        <img :src="getImageURL(`${item.name}.png`)" class="h-[20px] mr-[17px]" />
                        <span>{{ sidebarName[item.name] }}</span>
                      </div>
                  </router-link>
              </a-menu-item>
          </a-menu>
        </div>
        <div class="dashboard-index-right bg-[#F6F6FB] h-screen overflow-hidden">
          <Header />
          <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, onBeforeMount } from 'vue';
import { useRouter } from "vue-router";
import useAssets from "@/stores/useAssets";
import Header from "@/components/Header.vue";
import { sidebarName } from '@/enums/index'

const { getImageURL } = useAssets();
const router = useRouter();
const curBarName = ref(router.currentRoute.value.name);
const selectedKeys = ref<any>(['']);
const menuRouterList = ref<any>([]);

onBeforeMount(() => {
  const dashboard: any = router.options.routes.find((val) => { return val.path === '/' });
  
  dashboard.children.map((val: any) => {
    if (val.meta?.isShow) {
      if (curBarName.value === 'User') {
        if (val.name === 'User') {
          menuRouterList.value.push(val)
        }
      } else if(val.name !== 'User'){
        menuRouterList.value.push(val)
      }
    }
  })
})

watch(() => router.currentRoute.value,
  (value) => {
    selectedKeys.value = value.meta.sidebarMap;
  }, { deep: true, immediate: true }
)

</script>

<style scoped lang="less">

.dashboard-index {
  min-height: calc(100% - 114px);

  .dashboard-index-left{
    height: 100vh;
    background: #001529;
    box-shadow: 2px 0px 6px 0px rgba(0,21,41,0.35);
  }

  .dashboard-index-right {
    flex: 1;
  }
}
:deep(.ant-menu){
  font-size: 16px; 
  font-weight: 500;
}
:deep(.ant-menu .ant-menu-item){
  border-radius: 0px;
}
:deep(.ant-menu-vertical .ant-menu-item){
  padding-left: 24px;
  height: 60px;
  line-height: 60px;
  width: 100%;
  margin: 0;
}
:deep(.ant-menu-dark .ant-menu-item-selected){
  background-color: #484FFF;
}
</style>