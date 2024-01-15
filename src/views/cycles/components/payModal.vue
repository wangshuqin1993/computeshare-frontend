<template>
  <!-- 选择支付方式 -->
  <a-modal :title="'购买 ' + formatAmount(cyclesNumber, 0) + ' Cycles'" :footer="null" width="700px" centered="true" v-model:open="visible" @cancel="handleCancel">
    <div class="text-center my-[40px] text-[48px] font-medium">{{ (cyclesNumber / 1000).toFixed(2) }} 元</div>
    <div class="pay-card cursor-pointer" @click="handlePay">
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
      <a-button class="ant-btn-ss mt-[50px]" type="primary" @click="payDone">已完成支付</a-button>
      <div class="mt-[10px] text-[14px] text-[#484FFF] cursor-pointer" @click="contractCustomer">遇到问题？</div>
    </div>
    
  </a-modal>
</template>
<script setup lang="ts">
import { ref, toRefs, onUnmounted } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';
import { formatAmount } from '@/utils/index'
import { message } from 'ant-design-vue';
import { apiRechargeCycles, apiGetRechargeState } from '@/apis/cycles'
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
const { visible,cyclesNumber } = toRefs(props);
const emit = defineEmits(["handleCancel", "handleDone"])

// 订单号，需要全局使用
const outTradeNo = ref('')
const isOrderLoopTimer = ref()

const payVisible = ref(false);

const handlePay = async() => {
  const params = {
    rechargeChannel: 1,//支付宝传1
    cycle: cyclesNumber.value,
    amount: (cyclesNumber.value / 1000).toFixed(2)
  }
  const res = await apiRechargeCycles(params)
  if(res.code === 200){
    outTradeNo.value = res.data.outTradeNo
    handleCancel();
    payVisible.value = true;
    window.open(res.data.url)
    checkOutTradeNoStatus()
  }else{
    message.error(res.message)
  }
}

// 每次关闭弹框都刷新cycles余额
const handleCancel = () => {
  emit('handleCancel');
}

// 查询订单状态
const checkOutTradeNoStatus = async()=>{
  isOrderLoopTimer.value = window.setInterval(async()=>{
    const res = await apiGetRechargeState(outTradeNo.value)
    // 交易成功 || 交易关闭 || 交易结束
    if(res.data === 'TRADE_SUCCESS' || res.data === 'TRADE_CLOSED' || res.data === 'TRADE_FINISHED'){
      payVisible.value = false;
      handleCancel();
      window.clearInterval(isOrderLoopTimer.value)
    }
  },1000)
}

// 支付完成
const payDone = ()=>{
  payVisible.value = false;
  handleCancel();
}

const contractCustomer = () => {
  payVisible.value = false
  handleCancel();
  message.info('请联系客服人员')
}

defineExpose({
  outTradeNo
})

onUnmounted(()=>{
  window.clearInterval(isOrderLoopTimer.value)
})
</script>
<style scoped lang="less">
.pay-card{
  border-radius: 4px;
  border: 2px solid #DCDFE6;
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