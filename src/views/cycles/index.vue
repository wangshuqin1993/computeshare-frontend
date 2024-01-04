<template>
    <Header />
    <div class="cursor-pointer" @click="goDetail">详情</div>
</template>
<script setup lang="ts">
import { useRouter} from 'vue-router'
import Header from "@/components/Header.vue";

const router = useRouter()

const goDetail = () => {
  router.push('/dashboard/cyclesDetail')
}
</script>
<style lang="less" scoped>

</style>