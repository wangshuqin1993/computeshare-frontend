<template>
  <div class="m-[20px] scroll-max-h overflow-y-auto">
    <div class="bg-[#FFFFFF] rounded-[2px] px-[40px] py-[20px]">
      <div class="text-[18px] font-medium">账户信息</div>
      <div class="my-[40px] bg-[#A6DBFF] h-[144px] w-[144px] rounded-full"></div>
      <div class="user-card">
        <div class="user-title">用户名</div>
        <div class="flex justify-between">
          <div>{{ userInfo.name || userInfo.telephoneNumber }}</div>
          <div class="user-link" @click="visibleName=true">更改</div>
        </div>
      </div>
      <div class="user-card">
        <div class="user-title">手机号</div>
        <div class="flex justify-between">
          <div>{{ userInfo.telephoneNumber }}</div>
          <div class="user-link" @click="visibleMobile=true">更改</div>
        </div>
      </div>
      <div class="user-card">
        <div class="user-title">密码</div>
        <div class="flex justify-between">
          <div>{{ isPwd ? '******' : '暂无' }}</div>
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

  <a-modal :footer="null" :title="[isPwd ? '更改密码' : '设置密码']" width="700px" centered="true" v-model:open="visiblePwd" @cancel="visiblePwd = false;">
    <div class="mt-[30px] ">
      <a-form :model="formPwdData" ref="formPwdRef" :rules="formPwdRules" :label-col="labelCol">
        <a-form-item label="当前密码：" name="oldPassword" v-if="isPwd">
          <a-input class="modal-input" v-model:value="formPwdData.oldPassword" placeholder="请输入密码" autocomplete="off" />
        </a-form-item>
        <a-form-item :label="[isPwd ? '新密码' : '输入密码：']" name="newPassword" >
          <a-input class="modal-input" v-model:value="formPwdData.newPassword" :placeholder="[isPwd ? '请输入新密码' : '请输入密码']" autocomplete="off" />
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
import { computed, onMounted, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import { apiSMS } from '@/apis/index'
import { apiGetUser, apiUpdateUser, apiUpdatePassword, apiUpdatePhone } from '@/apis/user';

const labelCol = { style: { width: '120px' } };
const isPwd = ref(false);
const visibleName = ref(false);
const visibleMobile = ref(false);
const visiblePwd = ref(false);
const loading = ref(false);
const userInfo = ref<any>({});
const formRef = ref();
const formData = reactive({
  name: '',
  icon: '',
});
const formMobileRef = ref();
const formMobileData = reactive({
  countryCallCoding: '+86',
  telephoneNumber: '',
  validateCode: '',
});
const formPwdRef = ref();
const formPwdData = reactive({
  oldPassword: '',
  newPassword: '',
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
    telephoneNumber: [requiredRule('请输入手机号'), { validator: checkMobile, trigger: "change" }],
    validateCode: [requiredRule('请输入验证码')],
  };
});
const formPwdRules = computed(() => {
  return {
    oldPassword: [requiredRule('请输入密码')],
    newPassword: [requiredRule('请输入密码'), { validator: checkPwd, trigger: "change" }],
    rePwd: [requiredRule('请再次输入密码'), { validator: checkRePwd, trigger: "blur" }],
  };
});

const checkPwd = () => {
  //8-20个字符，需同时包含数字、字母及符号。
  let reg = /^(?=.*[a-zA-Z])(?=.*\d)[\s\S]{8,20}$/;
  
  if (formPwdData.newPassword != '' && formPwdData.newPassword != null && !reg.test(formPwdData.newPassword)) {
    return Promise.reject("请输入正确的密码");
  } else {
    return Promise.resolve()
  }
}
const checkRePwd = () => {
  if (formPwdData.rePwd != '' && formPwdData.rePwd != null && formPwdData.newPassword != formPwdData.rePwd) {
    return Promise.reject("确认密码输入错误");
  } else {
    return Promise.resolve()
  }
}
const checkMobile = () => {
  let reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  
  if (formMobileData.telephoneNumber != '' && formMobileData.telephoneNumber != null && !reg.test(formMobileData.telephoneNumber)) {
    return Promise.reject("请输入正确的手机号");
  } else {
    return Promise.resolve()
  }
}
const checkName = () => {
  //用户名只能包含英文、中文、数字、下划线、中划线、大于两个中文或者三个英文字母并小于32个字符
  let reg4 = /^((?=.*[\u4e00-\u9fa5]{2,})|(?=.*[a-zA-Z]{3,}))[\u4E00-\u9FA5A-Za-z0-9_-]{3,32}$/;

  
  if (formData.name != '' && formData.name != null && !reg4.test(formData.name)) {
    return Promise.reject("请输入合理的用户名");
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
//修改用户名
const handleDone = async () => {
  formRef.value.validate()

  const res = await apiUpdateUser(formData);
  if (res.code == 200) {
    visibleName.value = false;
    userInfo.value.name = formData.name;
    message.success(res.message);
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
//修改手机号
const handleMobileDone = async () => {
  formMobileRef.value.validate()

  const res = await apiUpdatePhone(formMobileData);
  if (res.code == 200) {
    visibleMobile.value = false;
    userInfo.value.telephoneNumber = formMobileData.telephoneNumber;
    message.success(res.message);
  }else{
    message.error(res.message)
  }
}
//修改密码
const handlePwdDone = async () => {
  formPwdRef.value.validate()

  const res = await apiUpdatePassword(formPwdData);
  if (res.code == 200) {
    visiblePwd.value = false;
    message.success(res.message);
  }else{
    message.error(res.message)
  }
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