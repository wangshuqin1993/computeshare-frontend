<template>
    <a-modal :footer="null" title="更改手机号" width="700px" centered="true" v-model:open="visibleMobile" @cancel="visibleMobile = false;">
        <div class="mt-[30px] ">
        <a-form :model="formMobileData" ref="formMobileRef" :rules="formMobileRules" :label-col="labelCol">
            <a-form-item label="手机号：" name="telephoneNumber" >
            <a-input class="modal-input" prefix="+86" v-model:value="formMobileData.telephoneNumber" placeholder="请输入手机号" autocomplete="off" />
            </a-form-item>
            <a-form-item label="验证码：" name="validateCode" >
            <div class="flex">
                <a-input class="w-[302px] mr-[10px] modal-input" v-model:value="formMobileData.validateCode" placeholder="请输入验证码" autocomplete="off" />
                <a-button type="primary" class="ant-btn-m" @click="getSmsCode">获取验证码</a-button>
            </div>
            </a-form-item>
            <div class="text-center mt-[50px]">
            <a-button class="ant-btn-m" type="primary" :loading="loading" @click="handleMobileDone">确认更改</a-button>
            </div>
        </a-form>
        </div>
    </a-modal>
</template>
<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { apiSMS } from '@/apis/index'
import { apiGetUser } from '@/apis/user';

const labelCol = { style: { width: '120px' } };
const isPwd = ref(false);
const visibleMobile = ref(false);
const loading = ref(false);
const userInfo = ref<any>({});
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

const checkMobile = () => {
    let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;

    if (formMobileData.telephoneNumber != '' && formMobileData.telephoneNumber != null && !reg.test(formMobileData.telephoneNumber)) {
        return Promise.reject("请输入正确的手机号");
    } else {
        return Promise.resolve()
    }
}

//获取用户信息
const getUserInfo = async () => {
    const res = await apiGetUser();
    if (res.code == 200) {
        isPwd.value = res.data.pwdConfig;
        userInfo.value = res.data;
    }else{
        message.error(res.message)
    }
}

// 获取验证码
const getSmsCode = async()=>{
    const params = {
        countryCallCoding: formMobileData.countryCallCoding,
        telephoneNumber: formMobileData.telephoneNumber
    }
    const res = await apiSMS(params)
    if(res.code==200){
        formMobileData.validateCode = '000000'
    }else{
        message.error(res.message)
    }
}

//确认
const handleMobileDone = async () => {
    await formMobileRef.value.validate()
}

onMounted(() => {
    getUserInfo();
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