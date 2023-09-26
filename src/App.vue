<template>
  <a-config-provider>
    <template #renderEmpty>
      <NoDate />
    </template>
    <router-view></router-view>
  </a-config-provider>
</template>

<script setup lang="ts">
import NoDate from '@/components/NoData.vue';
</script>

<style scoped lang="less">
</style>
