<template>
    <a-modal :footer="null" :title="title" width="700px" centered="true" v-model:open="visibleMobile" @cancel="close">
        <div class="mt-[10px]">
            <div class="w-[100%] bg-[#FFFBE6] h-[40px] leading-[40px] mb-[20px] border border-solid border-[#FFE58F] rounded-[2px] pl-[16px]">
                <img src="@/assets/images/warning.svg" class="w-[14px] inline-block mr-[4px] mb-[2px]" />
                <span class="text-[12px] text-[#595750]">这是一个{{title=='查看密钥' ? '谨慎':'危险'}}操作，需要进行身份验证</span>
            </div>
            <a-form :model="formMobileData" ref="formMobileRef" :rules="formMobileRules" :label-col="labelCol">
                <a-form-item label="手机号：" name="telephoneNumber" >
                    <a-input class="modal-input" prefix="+86" v-model:value="formMobileData.telephoneNumber" placeholder="请输入手机号" autocomplete="off" />
                </a-form-item>
                <a-form-item label="验证码：" name="validateCode" >
                    <div class="flex">
                        <a-input class="w-[302px] mr-[10px] modal-input" v-model:value="formMobileData.validateCode" placeholder="请输入验证码" autocomplete="off" />
                        <a-button type="primary" class="ant-btn-m" @click="getSmsCode" :disabled="timerValue"><label v-if="timerValue">( {{ timerValue }} ) </label>获取验证码</a-button>
                    </div>
                </a-form-item>
                <div class="text-center mt-[50px]">
                    <a-button class="ant-btn-m" type="primary" :loading="loading" @click="showKey">确认</a-button>
                </div>
            </a-form>
        </div>
    </a-modal>
</template>
<script setup lang="ts">
import { computed, onBeforeUnmount, reactive, ref, toRefs } from 'vue';
import { message } from 'ant-design-vue';
import { apiSMS } from '@/apis/index'
import { apiVerifySmsCode } from '@/apis/developer'

const props = defineProps({
    visibleMobile:{
        type: Boolean,
        default: false
    },
    title:{
        type: String,
        default: ''
    }
})
const { visibleMobile, title } = toRefs(props);
const emit = defineEmits(['closeCheckKeyModal','showKeyModalFn','delKeyFn'])

const timer = ref();
const timerValue = ref(0);
const close = ()=>{
    emit('closeCheckKeyModal')
}

const labelCol = { style: { width: '120px' } };
const loading = ref(false);
const formMobileRef = ref();
const formMobileData = reactive({
  countryCallCoding: '+86',
  telephoneNumber: '',
  validateCode: '',
});

const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });  

const formMobileRules = computed(() => {
    return {
        telephoneNumber: [requiredRule('请输入手机号'), { validator: checkMobile, trigger: "change" }],
        validateCode: [requiredRule('请输入验证码')],
    };
});

// 校验手机号
const checkMobile = () => {
    let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if (formMobileData.telephoneNumber != '' && formMobileData.telephoneNumber != null && !reg.test(formMobileData.telephoneNumber)) {
        return Promise.reject("请输入正确的手机号");
    } else {
        return Promise.resolve()
    }
}

// 获取验证码
const getSmsCode = async()=>{
    if(!formMobileData.telephoneNumber.trim()) return
  timerValue.value = 60;
  setTimer();
    const params = {
        countryCallCoding: formMobileData.countryCallCoding,
        telephoneNumber: formMobileData.telephoneNumber
    }
    const res = await apiSMS(params)
    if(res.code==200){
        // formMobileData.validateCode = '000000'
        message.success('请查收短信验证码')
    }else{
        message.error(res.message)
    }
}

//确认,打开密钥弹框
const showKey = async() => {
    await formMobileRef.value.validate()
    const res = await apiVerifySmsCode(formMobileData)
    // 验证码校验通过
    if(res.code===200){
        if(title.value == '查看密钥'){
            emit('showKeyModalFn')
        }else{
            // 删除密钥
            emit('delKeyFn')
        }
    }else{
        // 不通过
        message.error(res.message)
    }
    
}

const setTimer = () => {
  timer.value = window.setInterval(() => {
    timerValue.value--;
    if (timerValue.value <= 0) {
      window.clearInterval(timer.value);
    }
  }, 1000);
}
onBeforeUnmount(()=>{ //离开当前组件的生命周期执行的方法
  window.clearInterval(timer.value);
})

</script>
<style scoped lang="less">
.user-card{
    width: 366px;
    border-bottom: 1px solid #E9E9E9;
    padding: 15px 0px 12px 0px;
}
.user-title{
    font-size: 14px;
    font-weight: 500;
    color: rgba(0,0,0,0.65);
    margin-bottom: 10px;
}
.user-link{
    font-weight: 500;
    color: #484FFF;
    cursor: pointer;
}
.scroll-max-h{
    max-height: calc(100vh - 242px);
}
</style>