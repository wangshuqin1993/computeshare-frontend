<template>
    <a-modal :footer="null" title="请妥善保管您的密钥" width="700px" centered="true" v-model:open="showKeepKeyVisible" @cancel="close">
        <div class="mt-[30px]">
            <a-form :model="keyInfo" ref="formMobileRef" :label-col="labelCol">
                <a-form-item label="access_key：">
                    <div class="flex">
                        <a-input :disabled="true" class="modal-input" v-model:value="keyInfo.access_key" autocomplete="off" />
                        <img src="@/assets/images/copy.svg" class="w-[28px] inline-block ml-[20px] mb-[2px] cursor-pointer" @click="copyToClipboard(keyInfo.access_key)"/>
                    </div>
                </a-form-item>
                <a-form-item label="secret_key：">
                    <div class="flex">
                        <a-input :disabled="true" class="modal-input" v-model:value="keyInfo.secret_key" autocomplete="off" />
                        <img src="@/assets/images/copy.svg" class="w-[28px] inline-block ml-[20px] mb-[2px] cursor-pointer" @click="copyToClipboard(keyInfo.secret_key)"/>
                    </div>
                </a-form-item>
                <div class="text-center mt-[50px]">
                    <a-button class="ant-btn-m" type="primary" @click="close">确认</a-button>
                </div>
            </a-form>
        </div>
    </a-modal>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
import { copyToClipboard } from '@/utils/index'

const props = defineProps({
    showKeepKeyVisible:{
        type: Boolean,
        default: false
    },
    keyInfo:{
        type: Object,
        default: {}
    }
})
const { showKeepKeyVisible, keyInfo } = toRefs(props);
const emit = defineEmits(['closeKeyModal'])
const labelCol = { style: { width: '120px' } };

const close = ()=>{
    emit('closeKeyModal')
}

</script>
<style scoped lang="less">
</style>