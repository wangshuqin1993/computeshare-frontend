<template>
  <a-tooltip placement="bottom" color="#FFFFFF">
    <template #title>
      <div class="text-[14px]">
        <div class="tips-css" @click="goUser">账户设置</div>
        <div class="tips-css" @click="goCycles">我的Cycles</div>
        <div class="tips-css" @click="goOrder">我的订单</div>
        <div class="tips-css" @click="goRenewal">续费管理</div>
        <div class="tips-css" @click="goDeveloper">开发者选项</div>
        <div class="tips-css" @click="logout">退出</div>
      </div>
    </template>
    <img src="@/assets/images/user-logo.png" class="h-[36px] w-[36px] cursor-pointer " />
  </a-tooltip>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goUser = () => {
  window.open("/dashboard/user");
}

const goCycles = () => {
  window.open("/dashboard/cycles");
}

const goOrder = () => {
  window.open("/dashboard/order");
}

const goRenewal = () => {
  window.open("/dashboard/renewal");
}

const goDeveloper = ()=>{
  window.open("/dashboard/developer");
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>