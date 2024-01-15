<template>
  <a-modal :footer="null" title="手动续费" width="758px" centered="true" v-model:open="visible" @cancel="handleCancel">
    <div class="mt-[30px] ">
      <div>
        <div class="div-card">
          <div class="title">实例名称：</div>
          <div class="title-value">实例名称</div>
        </div>
        <div class="div-card">
          <div class="title">规格：</div>
          <div class="title-value">2核 4GB</div>
        </div>
        <div class="div-card">
          <div class="title">操作系统：</div>
          <div class="title-value">Ubuntu 22.04</div>
        </div>
      </div>
      <div class="mt-[50px] pt-[40px] bt-css flex justify-between items-center">
        <div>
          <div class="text-[24px] font-semibold text-[#DC9200]">50,000 Cycles / 30天</div>
          <div class="text-[14px] flex items-center">账户余额：0 Cycles
            <a-tooltip color="#FFFFFF">
                  <template #title>
                      <div class="text-[14px] text-[#000000] px-[10px]">
                          Cycle是平台充值币，用于购买平台上的所有资源和服务
                      </div>
                  </template>
                  <img src="@/assets/icons/wenhao.svg" class="h-[16px] w-[16px] ml-[10px] cursor-pointer" />
              </a-tooltip>
          </div>
        </div>
        <div>
          <a-button class="ant-btn-ss mr-[20px]" ghost type="primary" @click="goCycle">充值</a-button>
          <a-button class="ant-btn-ss" type="primary" @click="handlePay">续费</a-button>
        </div>
      </div>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
import { message } from 'ant-design-vue';
import { useRouter } from "vue-router";
import { apiManualCycle } from "@/apis/renewal"

const router = useRouter();

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  instanceInfo: {
    type: Object as any,
    default: {}
  }
});
const { visible, instanceInfo } = toRefs(props);
const emit = defineEmits(["handleCancel","loadTable"]);

const goCycle = () => {
  router.push("/dashboard/Cycles");
}
const handlePay = async () => {
  message.warning("Cycle不足，请先充值再试！");
  const res = await apiManualCycle(instanceInfo.value.id)
  if (res.code === 200) {
    message.success(res.message);
    handleCancel();
    emit('loadTable');
  }else{
    message.error(res.message)
  }
}
const handleCancel = () => {
  emit('handleCancel');
}
</script>
<style scoped lang="less">
.div-card{
  display: flex;
  margin-bottom: 20px;
  align-items: center;
}
.title{
  font-weight: 500;
  color: #8C8C8C;
  width: 70px;
  text-align: right;
}
.title-value{
  margin-left: 20px;
  font-size: 15px;
  font-weight: 500;
  color: #262626;
}
.bt-css{
  border-top: 1px solid #E9E9E9;
}
</style>