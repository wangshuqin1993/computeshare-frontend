<template>
  <div class="m-[20px] scroll-max-h overflow-y-auto">
    <div class="bg-[#FFFFFF] rounded-[2px] px-[40px] py-[20px]">
      <div class="text-[18px] font-medium">账户信息</div>
      <div class="my-[40px] bg-[#A6DBFF] h-[144px] w-[144px] rounded-full"></div>
      <div class="user-card">
        <div class="user-title">用户名</div>
        <div class="flex justify-between">
          <div>16215283198</div>
          <div class="user-link" @click="visibleName=true">更改</div>
        </div>
      </div>
      <div class="user-card">
        <div class="user-title">手机号</div>
        <div class="flex justify-between">
          <div>16215283198</div>
          <div class="user-link" @click="visibleMobile=true">更改</div>
        </div>
      </div>
      <div class="user-card">
        <div class="user-title">密码</div>
        <div class="flex justify-between">
          <div>暂无</div>
          <div class="user-link" @click="visiblePwd=true">{{ isPwd ? '更改' : '设置' }}</div>
        </div>
      </div>
    </div>
  </div>

  <a-modal :footer="null" title="更改用户名" width="700px" centered="true" v-model:open="visibleName" @cancel="visibleName = false;">
    <div class="mt-[30px] ">
      <a-form :model="formData" ref="formRef" :rules="formRules" :label-col="labelCol">
        <a-form-item label="用户名：" name="name">
          <a-input class="modal-input" autocomplete="off" v-model:value="formData.name" placeholder="请输入用户名"/>
          <div class="text-[#8C8C8C] text-[14px] mt-[10px]">用户名只能包含英文、中文、数字、下划线、中划线、大于两个中文或者三个英文字母并小于32个字符</div>
        </a-form-item>
        <div class="text-center mt-[50px]">
          <a-button class="ant-btn-m" type="primary" :loading="loading" @click="handleDone">确认更改</a-button>
        </div>
      </a-form>
    </div>
  </a-modal>

  <a-modal :footer="null" title="更改手机号" width="700px" centered="true" v-model:open="visibleMobile" @cancel="visibleMobile = false;">
    <div class="mt-[30px] ">
      <a-form :model="formMobileData" ref="formMobileRef" :rules="formMobileRules" :label-col="labelCol">
        <a-form-item label="手机号：" name="mobile" >
          <a-input class="modal-input" prefix="+86" v-model:value="formMobileData.mobile" placeholder="请输入手机号" autocomplete="off" />
        </a-form-item>
        <a-form-item label="验证码：" name="code" >
          <div class="flex">
            <a-input class="w-[302px] mr-[10px] modal-input" v-model:value="formMobileData.code" placeholder="请输入验证码" autocomplete="off" />
            <a-button type="primary" class="ant-btn-m">获取验证码</a-button>
          </div>
        </a-form-item>
        <div class="text-center mt-[50px]">
          <a-button class="ant-btn-m" type="primary" :loading="loading" @click="handleMobileDone">确认更改</a-button>
        </div>
      </a-form>
    </div>
  </a-modal>

  <a-modal :footer="null" :title="[isPwd ? '更改密码' : '设置密码']" width="700px" centered="true" v-model:open="visiblePwd" @cancel="visiblePwd = false;">
    <div class="mt-[30px] ">
      <a-form :model="formPwdData" ref="formPwdRef" :rules="formPwdRules" :label-col="labelCol">
        <a-form-item label="当前密码：" name="curPwd" v-if="isPwd">
          <a-input class="modal-input" v-model:value="formPwdData.curPwd" placeholder="请输入密码" autocomplete="off" />
        </a-form-item>
        <a-form-item :label="[isPwd ? '新密码' : '输入密码：']" name="pwd" >
          <a-input class="modal-input" v-model:value="formPwdData.pwd" :placeholder="[isPwd ? '请输入新密码' : '请输入密码']" autocomplete="off" />
        </a-form-item>
        <a-form-item label="确认密码：" name="rePwd" >
          <a-input class="modal-input" v-model:value="formPwdData.rePwd" placeholder="请再次输入密码" autocomplete="off" />
          <div class="text-[#8C8C8C] text-[14px] mt-[10px]">8-20个字符，需同时包含数字、字母及符号。</div>
        </a-form-item>
        <div class="text-center mt-[50px]">
          <a-button class="ant-btn-m" type="primary" :loading="loading" @click="handlePwdDone">确认更改</a-button>
        </div>
      </a-form>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

const labelCol = { style: { width: '120px' } };
const isPwd = ref(false);
const visibleName = ref(false);
const visibleMobile = ref(false);
const visiblePwd = ref(false);
const loading = ref(false);
const formRef = ref();
const formData = reactive({
  name: ''
});
const formMobileRef = ref();
const formMobileData = reactive({
  mobile: '',
  code: '',
});
const formPwdRef = ref();
const formPwdData = reactive({
  curPwd: '',
  pwd: '',
  rePwd: '',
});

const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });  
const formRules = computed(() => {
  return {
    name: [requiredRule('请输入用户名'), { validator: checkName, trigger: "change" }],
  };
}); 
const formMobileRules = computed(() => {
  return {
    mobile: [requiredRule('请输入手机号')],
  };
});
const formPwdRules = computed(() => {
  return {
    pwd: [requiredRule('请输入密码')],
  };
});

const checkName = () => {
  // let reg1 = /^[\u4e00-\u9fa5]{2,}[A-Za-z0-9_-]*{2,32}$/;
  let reg2 = /^([a-zA-Z]{3}[a-zA-Z0-9_-]*){2,32}$/;
  // let reg3 = /^[\u4e00-\u9fa5]{0,}$/;
  
  if (formData.name != '' && formData.name != null && !reg2.test(formData.name)) {
    return Promise.reject("请输入合理的用户名");
  } else {
    return Promise.resolve()
  }
}
const handleDone = () => {
  formRef.value.validate()
  console.log("handleDone.....");
}
const handleMobileDone = () => {
  formMobileRef.value.validate()
  console.log("handleMobileDone.....");
}
const handlePwdDone = () => {
  formPwdRef.value.validate()
  console.log("handlePwdDone.....");
}
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