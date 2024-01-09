<template>
  <div class="p-[50px]">
    <div class="flex">
      <div v-for="(item,key) in cyclesList" :key="key" @click="checkedCard(item)" :class="{'checked-div' : item.id == checkedCycle}" class="div-card mr-[24px]">
        <div>
          <div class="text-[21px] font-semibold text-[#000000]">{{ formatAmount(item.label, 0) }} Cycles</div>
          <div class="text-[18px] text-[#606266] mt-[16px]">¥ {{ item.price }}</div>
        </div>
      </div>
      <div class="div-card" @click="checkedOther('other')" :class="{'checked-div' : 'other' == checkedCycle}">
        自定义…
      </div>
    </div>
    <div class="mt-[40px]" v-if="'other' == checkedCycle">
      <a-input autocomplete="off" allowClear="true" v-model:value="cyclesNumber" placeholder="请输入所需Cycles数量" @keyup="cyclesNumber=cyclesNumber.replace(/\D/g,'')"/>
      <div class="text-[18px]">¥ {{ cyclesNumber ? (cyclesNumber/1000).toFixed(3) : '0.000' }}</div>
    </div>
    <div class="text-center">
      <a-button :disabled="'other' == checkedCycle && cyclesNumber<1000" type="primary" class="ant-btn-s my-[50px]" @click="handlePay">确认充值</a-button>
    </div>
    <div class="bt-css"></div>
    <div>
      <div class="mt-[20px] text-[#595959] font-medium">充值说明</div>
      <div class="text-[14px] text-[#8C8C8C] mt-[10px]">
        1、充值金额不会过期，不支持退款、提现或转增他人<br>
        2、若在充值过程中有任何问题，请联系我们的客服人员为您解答
      </div>
    </div>
  </div>
  <payModal :visible="payVisible" :cyclesNumber="cyclesNumber" @handleCancel="handleCancelPay"></payModal>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import payModal from './payModal.vue';
import { formatAmount } from '@/utils/index'

const cyclesList = ref([
  {id:'1',label:'50000', price:'50'},
  {id:'2',label:'500000', price:'500'},
  {id:'3',label:'5000000', price:'5000'},
]);
const cyclesNumber = ref<any>('');
const checkedCycle = ref('1');
const payVisible = ref(false);
const checkedCard = (item: any) => {
  checkedCycle.value = item.id;
  cyclesNumber.value = item.label;
}
const checkedOther = (value: any) => {
  checkedCycle.value = value;
  cyclesNumber.value = '';
}
const handleCancelPay = () => {
  payVisible.value = false;
}
const handlePay = () => {
  payVisible.value = true;
}
onMounted(() => {
  checkedCard(cyclesList.value[0]);
});
defineExpose({
  cyclesNumber
});
</script>
<style scoped>
.div-card{
  border-radius: 6px;
  border: 2px solid #DCDFE6;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 260px;
  height: 120px;
  cursor: pointer;
}
.checked-div{
  background: #F5F6FF;
  border-color: #484FFF;
}
.bt-css{
  border-top: 1px solid #E9E9E9;
}
</style>