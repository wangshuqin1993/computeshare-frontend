<template>
    <Header />
    <div class="m-[20px] scroll-max-h overflow-y-auto">
        <div class="bg-[#FFFFFF] rounded-[2px] px-[40px] py-[20px]">
            <a-button @click="checkKey">查看密钥</a-button>
            <a-button @click="DelelteKey">删除密钥</a-button>
        </div>
    </div>
    <checkOrDelKeyModal :visibleMobile="visibleMobile" :title="title" @closeCheckKeyModal="closeCheckKeyModal" @showKeyModal="showKeyModal" @delKeyFn="delKeyFn"/>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import Header from "@/components/Header.vue";
import checkOrDelKeyModal from './components/checkOrDelKeyModal.vue'

const visibleMobile = ref(false)
const title = ref('')

const closeCheckKeyModal = ()=>{
    visibleMobile.value = false
}

const checkKey = ()=>{
    title.value = "查看密钥"
    visibleMobile.value = true
}

const DelelteKey = ()=>{
    title.value = "删除密钥"
    visibleMobile.value = true
}

// 打开密钥弹框
const showKeyModal = ()=>{
    visibleMobile.value = false
}

// 删除密钥
const delKeyFn = ()=>{

}

</script>
<style lang="less" scoped>

</style>