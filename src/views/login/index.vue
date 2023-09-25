<!-- 登录注册 -->
<template>
<div>
  <div class="flex">
    <img src="@/assets/images/login-pic.jpg" class=" h-screen w-[600px]" />
    <div class="right-w flex justify-center items-center">
        <div class="card-div p-[54px] relative">
          <div class="text-[36px] text-[#2E2E2E] font-medium mb-[36px] text-center">登录天天数链共享算力</div>
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" :tab="[isLogin?'短信登录':'短信注册']">
              <a-form :model="formNoteData" layout="vertical" ref="formNoteRef" :rules="formNoteRules">
                <a-form-item name="telephoneNumber" >
                  <a-input prefix="+86" v-model:value="formNoteData.telephoneNumber" placeholder="请输入手机号" allow-clear autocomplete="off" />
                </a-form-item>
                <a-form-item name="validateCode" >
                  <div class="flex">
                    <a-input class="w-[302px] mr-[10px]" v-model:value="formNoteData.validateCode" placeholder="请输入验证码" allow-clear autocomplete="off" />
                    <a-button type="primary" class="ant-btn-s" @click="getSmsCode">获取验证码</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" :tab="[isLogin?'密码登录':'账号注册']">
              <a-form :model="formPwdData" layout="vertical" ref="formPwdRef" :rules="formPwdRules">
                <a-form-item name="telephoneNumber" >
                  <a-input prefix="+86" @change="resetSlider" v-model:value="formPwdData.telephoneNumber" placeholder="请输入手机号" allow-clear autocomplete="off" />
                </a-form-item>
                <a-form-item name="password" >
                  <a-input-password @change="resetSlider" v-model:value="formPwdData.password" placeholder="请输入密码" allow-clear autocomplete="off" />
                </a-form-item>
                <a-form-item>
                  <div class="flex">
                  <drag-verify ref="drag"></drag-verify>
                  </div>
                </a-form-item>
              </a-form>
            </a-tab-pane>
          </a-tabs>
          <div class="absolute bottom-[54px] w-[482px]">
            <div class="flex items-start">
              <a-radio v-model:checked="isChecked"></a-radio>
              <div>未注册手机号验证后将自动创建账号，登录即代表您已同意<div class="text-[#017AFF]">服务条款、隐私政策</div></div>
            </div>
            <a-button type="primary" class="ant-btn-l w-full my-[20px]" @click="handleDone">{{ isLogin?'登录':'注册' }}</a-button>
            <!-- <div class="text-[#484FFF] cursor-pointer" @click="goRegister">{{ isLogin?'注册账户':'已有账号登录' }}</div> -->
          </div>
        </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import dragVerify from '@/components/demo.vue'
import { message } from 'ant-design-vue';
import { apiSMS, apiSMSLogin, apiPwdLogin } from '@/apis/index'

const router = useRouter();


const activeKey = ref("1");
const isChecked = ref(false);
const isLogin = ref(true);
const formNoteRef = ref();
const formNoteData = reactive({
  countryCallCoding: '+86',
  telephoneNumber: '',
  validateCode: '',
});
const formPwdRef = ref();
const formPwdData = reactive({
  countryCallCoding: '+86',
  telephoneNumber: '',
  password: '',
});
const drag = ref()

// Form rules
const checkMobile = () => {
  let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  let mobile = formNoteData.telephoneNumber;
  if (activeKey.value === '2') {
    mobile = formPwdData.telephoneNumber;
  }
  if (mobile != '' && mobile != null && !reg.test(mobile)) {
    return Promise.reject("请输入正确的手机号");
  } else {
    return Promise.resolve()
  }
}
const formNoteRules = computed(() => {

  const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });
  
  return {
    telephoneNumber: [requiredRule('请输入手机号'), { validator: checkMobile, trigger: "change" }],
    validateCode: [requiredRule('请输入验证码')],
  };
});
const formPwdRules = computed(() => {

  const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });
  
  return {
    telephoneNumber: [requiredRule('请输入手机号'), { validator: checkMobile, trigger: "change" }],
    password: [requiredRule('请输入密码')],
  };
});

// 通过短信验证码登录
const passBySmsCode = async () => {
  const res = await apiSMSLogin(formNoteData)
  console.log('通过短信验证码登录',res)
  if(res.code==200){
    // 拿到token缓存起来
    localStorage.setItem('token',res.data.token)
    router.push('/')
  }else{
    message.error(res.message)
  }
}

// 通过 用户手机和密码 登录
const loginByPwd = async () => {
  const res = await apiPwdLogin(formPwdData);
  console.log("data;;;;",res);

  if(res.code==200){
    // 拿到token缓存起来
    localStorage.setItem('token',res.data.token)
    router.push('/')
  }else{
    message.error(res.message)
  }
}

const handleDone = async () => {
  if (activeKey.value === '1') {
    await formNoteRef.value.validate()
    if (!isChecked.value) {
      message.error("请阅读 服务条款、隐私政策 ，并勾选");
      return false;
    }
    passBySmsCode()
  } else {
    await formPwdRef.value.validate();
    if (!drag.value.confirmSuccess) {
      message.error("请拖动滑块验证");
      return false;
    } else if (!isChecked.value) {
      message.error("请阅读 服务条款、隐私政策 ，并勾选");
      return false;
    }
    loginByPwd();
  }
  
  console.log("handleDone.....");
}
// 重置滑块
const resetSlider = () => {
  if (drag.value.confirmSuccess) {
    drag.value.reset()
  }
}

// 获取验证码
const getSmsCode = async()=>{
  const params = {
    countryCallCoding: formNoteData.countryCallCoding,
    telephoneNumber: formNoteData.telephoneNumber
  }
  const res = await apiSMS(params)
  if(res.code==200){
    formNoteData.validateCode = '000000'
    // message.success('请查收短信验证码')
  }else{
    message.error(res.message)
  }
}

</script>

<style scoped lang="less">
.right-w{
  width: calc(100% - 600px);
}
.card-div{
  width: 590px;
  height: 742px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px 0px #EBEBF5;
  border-radius: 13px;
}
:deep(.ant-tabs-nav-list){
  width: 100%;
}
:deep(.ant-tabs-tab){
  width: 46%;
  justify-content: center;
  font-size: 21px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #595959;
}
:deep(.ant-tabs-tab-active){
  color: #484FFF;
}
</style>
