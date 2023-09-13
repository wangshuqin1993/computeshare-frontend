<!-- 登录注册 -->
<template>
<div>
  <div class="flex">
    <img src="@/assets/images/login-pic.jpg" class=" h-screen w-[600px]" />
    <div class="right-w flex justify-center items-center">
        <div class="card-div p-[54px] relative">
          <div class="text-[36px] text-[#2E2E2E] font-medium mb-[36px] text-center">登录共享算力</div>
          <a-tabs v-model:activeKey="activeKey">
            <a-tab-pane key="1" :tab="[isLogin?'短信登录':'短信注册']">
              <a-form :model="formNoteData" layout="vertical" ref="formRef" :rules="formRules">
                <a-form-item name="mobile" >
                  <a-input prefix="+86" v-model:value="formNoteData.mobile" placeholder="请输入手机号" allow-clear autocomplete="off" />
                </a-form-item>
                <a-form-item name="code" >
                  <div class="flex">
                    <a-input class="w-[302px] mr-[10px]" v-model:value="formNoteData.code" placeholder="请输入验证码" allow-clear autocomplete="off" />
                    <a-button type="primary" class="ant-btn-s">获取验证码</a-button>
                  </div>
                </a-form-item>
              </a-form>
            </a-tab-pane>
            <a-tab-pane key="2" :tab="[isLogin?'密码登录':'账号注册']">
              <a-form :model="formPwdData" layout="vertical" ref="formRef" :rules="formRules">
                <a-form-item name="mobile" >
                  <a-input prefix="+86" v-model:value="formPwdData.mobile" placeholder="请输入手机号" allow-clear autocomplete="off" />
                </a-form-item>
                <a-form-item name="pwd" >
                  <a-input-password v-model:value="formPwdData.pwd" placeholder="请输入密码" allow-clear autocomplete="off" />
                </a-form-item>
                <a-form-item name="rePwd" v-if="!isLogin">
                  <a-input-password v-model:value="formPwdData.rePwd" placeholder="请再次输入密码" allow-clear autocomplete="off" />
                </a-form-item>
                <a-form-item name="code" >
                  <div class="flex">
                    <a-input @blur="checkCode" class="w-[302px] mr-[10px]" v-model:value="formPwdData.code" placeholder="请输入校验码" allow-clear autocomplete="off" />
                    <CaptchaInput ref="captchaRef"></CaptchaInput>
                  </div>
                </a-form-item>
              </a-form>
            </a-tab-pane>
          </a-tabs>
          <div class="absolute bottom-[54px] text-center w-[482px]">
            <a-radio v-model:checked="isChecked"></a-radio>未注册手机号验证后将自动创建账号，登录即代表您已同意<label class="text-[#017AFF]">服务条款、隐私政策</label>
            <a-button type="primary" class="ant-btn-l w-full my-[20px]">{{ isLogin?'登录':'注册' }}</a-button>
            <!-- <div class="text-[#484FFF] cursor-pointer" @click="goRegister">{{ isLogin?'注册账户':'已有账号登录' }}</div> -->
          </div>
        </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import CaptchaInput from '@/components/CaptchaInput.vue';

const activeKey = ref("1");
const isChecked = ref(false);
const isLogin = ref(true);
const captchaRef = ref()
const formNoteData = reactive({
  mobile: '',
  code: '',
});
const formPwdData = reactive({
  mobile: '',
  pwd: '',
  rePwd: '',
  code: '',
});

// Form rules
const checkMobile = () => {
  let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  
  if (formNoteData.mobile != '' && formNoteData.mobile != null && !reg.test(formNoteData.mobile)) {
    return Promise.reject("请输入正确的手机号");
  } else {
    return Promise.resolve()
  }
}
const formRules = computed(() => {

  const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });
  
  return {
    mobile: [requiredRule('请输入手机号'), { validator: checkMobile, trigger: "change" }],
    code: [requiredRule('请输入验证码')],
  };
});

const checkCode = () => {
  console.log("formPwdData.code:",formPwdData.code)
  console.log("identifyCode:",captchaRef.value?.identifyCode)
}
const goRegister = () => {
  isLogin.value = !isLogin.value;
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
