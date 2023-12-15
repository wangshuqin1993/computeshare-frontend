<template>
    <Header />
    <div class="m-[20px] scroll-max-h overflow-y-auto">
        <div class="bg-[#FFFFFF] rounded-[2px] px-[40px] py-[20px]">
            <a-button @click="checkKey">查看密钥</a-button>
            <a-button @click="DelelteKey">删除密钥</a-button>
            <a-button @click="showKeepModalFn">保管密钥</a-button>
        </div>
    </div>
    <checkOrDelKeyModal v-if="visibleMobile" :visibleMobile="visibleMobile" :title="title" @closeCheckKeyModal="closeCheckKeyModal" @showKeyModalFn="showKeyModalFn" @delKeyFn="delKeyFn"/>
    <showKeyModal :showKeepKeyVisible="showKeepKeyVisible" :keyInfo="keyInfo" @closeKeyModal="closeKeyModal"/>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import Header from "@/components/Header.vue";
import checkOrDelKeyModal from './components/checkOrDelKeyModal.vue';
import showKeyModal from './components/showKeyModal.vue';

const visibleMobile = ref(false)
const showKeepKeyVisible = ref(false)
const title = ref('')
const keyInfo = ref({
    access_key: 'ptif2233yntj8r2ptife',
    secret_key: 'ptif2233yntj8r2ptife'
})

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
const showKeyModalFn = ()=>{
    visibleMobile.value = false
}

// 删除密钥
const delKeyFn = ()=>{

}

// 保管密钥弹框
const showKeepModalFn = ()=>{
    showKeepKeyVisible.value = true
}

// 关闭密钥弹框
const closeKeyModal = ()=>{
    showKeepKeyVisible.value = false
}

</script>
<style lang="less" scoped>

</style>