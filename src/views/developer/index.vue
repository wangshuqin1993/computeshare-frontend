<template>
    <Header/>
    <div class="bg-[#FFFFFF] rounded-[2px] p-[20px] m-[20px]">
        <!-- 存储信息 -->
        <div class="p-[20px] border border-solid border-[#E9E9E9] rounded-[4px]">
            <p class="text-[18px] font-medium">文件存储SDK</p>
            <p class="text-[14px] text-[#8C8C8C] font-normal">使用访问密钥从SDK以编程方式调用文件存</p>
        </div>
        <!-- 密钥信息 -->
        <div class="p-[20px]">

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