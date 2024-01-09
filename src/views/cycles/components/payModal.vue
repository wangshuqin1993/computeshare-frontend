<template>
  <!-- 选择支付方式 -->
  <a-modal :title="title" :footer="null" width="700px" centered="true" v-model:open="visible" @cancel="handleCancel">
    <div class="text-center my-[40px] text-[48px] font-medium">50.00 元</div>
    <div class="pay-card" @click="handlePay">
      <div class="pay-left">
        <img src="@/assets/images/alipay.png" class="h-[34px] w-[34px] mr-[20px]" />
        <span>支付宝支付</span>
      </div>
    </div>
    <div class="pay-card !border-[#ECECEC]">
      <div class="pay-left">
        <img src="@/assets/images/wechat.png" class="h-[34px] w-[34px] mr-[20px]" />
        <span class="text-[#A8A8A8]">微信支付</span>
      </div>
      <div class="text-[#A8A8A8] text-[12px]">Coming Soon…</div>
    </div>
    <div class="pay-card !border-[#ECECEC]">
      <div class="pay-left">
        <img src="@/assets/images/bankCard.png" class="h-[34px] w-[34px] mr-[20px]" />
        <span class="text-[#A8A8A8]">银行卡支付</span>
      </div>
      <div class="text-[#A8A8A8] text-[12px]">Coming Soon…</div>
    </div>
  </a-modal>
  <!-- 支付中 -->
  <a-modal :footer="null" width="700px" centered="true" v-model:open="payVisible" @cancel="payVisible=false">
    <div class="text-center mt-[50px]">
      <LoadingOutlined  :style="{fontSize: '72px',color: '#484FFF'}" />
      <div class="mt-[30px] text-[24px] font-medium">支付中…</div>
      <div class="mt-[20px] text-[18px] font-light">支付过程需要花费一些时间，请耐心等待...</div>
      <a-button class="ant-btn-ss mt-[50px]" type="primary" @click="payVisible=false">已完成支付</a-button>
      <div class="mt-[10px] text-[14px] text-[#484FFF] cursor-pointer">遇到问题？</div>
    </div>
    
  </a-modal>
</template>
<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  cyclesNumber: {
    type: Number,
    default: 0.00
  }
});
const { visible } = toRefs(props);
const emit = defineEmits(["handleCancel", "handleDone"])

const title = ref('购买50,000 Cycles');
const payVisible = ref(false);

const handlePay = () => {
  handleCancel();
  payVisible.value = true;
}
const handleCancel = () => {
  emit('handleCancel');
}
</script>
<style scoped lang="less">
.pay-card{
  border-radius: 4px;
  border: 2px solid #DCDFE6;
  cursor: pointer;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.pay-left{
  display: flex;
  align-items: center;

}
:deep(.ant-modal .ant-modal-title){
  font-size: 21px !important;
}
</style>