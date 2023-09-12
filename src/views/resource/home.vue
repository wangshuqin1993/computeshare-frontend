<!-- 壳子 -->
<template>
    <div class="flex dashboard-index bg-[#1D1C1A] rounded-[12px]">
        <div class="dashboard-index-left">
            <a-menu v-model:selectedKeys="selectedKeys" style="width: 312px">
                <a-menu-item v-for="item in menuRouterList" :key="item.name">
                    <!-- <router-link :to="item.name"> -->
                        <div>
                            <span class="text-[16px]-[#fff] mr-[10px]">{{ sidebarName[item.name] }}</span>
                        </div>
                    <!-- </router-link> -->
                </a-menu-item>
            </a-menu>
        </div>
        <div class="p-[32px] dashboard-index-right">
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import { watch, ref, onBeforeMount } from 'vue';
import { useRouter } from "vue-router";
import { sidebarName } from '@/enums/index'

const router = useRouter();
const selectedKeys = ref<any>(['']);
const menuRouterList = ref<any>([]);

onBeforeMount(() => {
    console.log('router', router.options.routes)
    const dashboard: any = router.options.routes.find((val) => { return val.path === '/' });
    
    dashboard.children.map((val: any) => {
        if (val.meta?.isShow) {
            menuRouterList.value.push(val)
        }
    })
    console.log(1111,menuRouterList.value)
})

watch(() => router.currentRoute.value,
  (value) => {
    selectedKeys.value = value.meta.sidebarMap;
    console.log(222222,selectedKeys.value)
  }, { deep: true, immediate: true }
)

</script>

<style scoped lang="less">

.dashboard-index {
  min-height: calc(100% - 114px);

  .dashboard-index-left{

  }

  .dashboard-index-right {
    flex: 1;
  }
}
</style>