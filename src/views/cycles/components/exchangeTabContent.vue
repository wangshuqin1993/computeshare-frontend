<template>
  <div class="p-[50px]">
    <a-input autocomplete="off" allowClear="true" v-model:value="cyclesCode" placeholder="请输入兑换码" />
    <div class="text-center">
      <a-button :disabled="cyclesCode.trim()?.length<5" type="primary" class="ant-btn-s my-[50px]" @click="handleExchange">兑换</a-button>
    </div>
  </div>
  <!-- 充值成功 -->
  <a-modal :footer="null" width="700px" centered="true" v-model:open="visibleSuc" @cancel="visibleSuc=false">
    <div class="flex justify-center">
      <img src="@/assets/images/success.png" class="h-[72px] w-[72px]" />
    </div>
    <div class="text-center">
      <div class="my-[20px] text-[18px] font-light">恭喜您成功兑换</div>
      <div class="text-[48px] font-medium">{{ formatAmount(cyclesNumber) }} Cycles</div>
      <a-button class="ant-btn-ss mt-[50px]" type="primary" @click="visibleSuc=false">确定</a-button>
    </div>
  </a-modal>
  <!-- 充值失败 -->
  <a-modal :footer="null" width="700px" centered="true" v-model:open="visibleFail" @cancel="visibleFail=false">
    <div class="flex justify-center">
      <img src="@/assets/images/failPay.png" class="h-[72px] w-[72px]" />
    </div>
    <div class="text-center">
      <div class="my-[20px] text-[24px] font-medium">兑换失败</div>
      <div class="text-[18px] font-light">可能该兑换码已使用或超出有效期</div>
      <a-button class="ant-btn-ss mt-[50px]" type="primary" @click="visibleFail=false">确定</a-button>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { apiCycleRedeem } from '@/apis/cycles';
import { formatAmount } from '@/utils/index'

const emit = defineEmits(["getCycleBalances"])
const visibleSuc = ref(false);
const visibleFail = ref(false);
const cyclesCode = ref('');
const cyclesNumber = ref(0);
const handleExchange = async () => {
  
  let param = {
    redeemCode: cyclesCode.value
  }
  const res = await apiCycleRedeem(param);
  if (res.code == 200) {
    cyclesNumber.value = res.data;
    visibleSuc.value = true
    emit('getCycleBalances');
  } else {
    visibleFail.value = true
  }
}
defineExpose({
  cyclesCode
});
</script>