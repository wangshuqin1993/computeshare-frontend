<template>
  <div class="m-[20px] scroll-max-h overflow-y-auto">
    <div class="bg-[#FFFFFF] rounded-[2px] px-[40px] py-[20px]">
      <div class="text-[18px] font-medium">账户信息</div>
      <div class="my-[40px] bg-[#A6DBFF] h-[144px] w-[144px] rounded-full"></div>
      <div class="user-card">
        <div class="user-title">用户名</div>
        <div class="flex justify-between">
          <div>16215283198</div>
          <div class="user-link">更改</div>
        </div>
      </div>
      <div class="user-card">
        <div class="user-title">手机号</div>
        <div class="flex justify-between">
          <div>16215283198</div>
          <div class="user-link">更改</div>
        </div>
      </div>
      <div class="user-card">
        <div class="user-title">密码</div>
        <div class="flex justify-between">
          <div>暂无</div>
          <div class="user-link">{{ isPwd ? '更改' : '设置' }}</div>
        </div>
      </div>
    </div>
  </div>

  <a-modal :footer="null" title="更改用户名" width="700px" centered="true" v-model:open="visibleName" @cancel="visibleName = false;">
    <div class="mt-[30px] ">
      <a-form :model="formData" ref="formRef" :rules="formRules">
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
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

const isPwd = ref(true);
const visibleName = ref(true);
const loading = ref(false);
const formRef = ref();
const formData = reactive({
  name: ''
});

const formRules = computed(() => {

  const requiredRule = (message: string) => ({ required: true, trigger: 'change', message });
  
  return {
    name: [requiredRule('请输入用户名'), { validator: checkName, trigger: "change" }],
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