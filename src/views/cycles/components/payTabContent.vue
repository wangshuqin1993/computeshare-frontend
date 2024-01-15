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
      <a-input autocomplete="off" allowClear="true" v-model:value="cyclesMoney" placeholder="请输入充值金额" @change="setCyclesNum" @keyup="setInputValue"/>
      <div class="text-[18px]">{{ formatAmount(cyclesNumber,0) }} Cycles</div>
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

const emit = defineEmits(['getCycleBalances'])

const cyclesList = ref([
  {id:'1',label:'50000', price:'50'},
  {id:'2',label:'500000', price:'500'},
  {id:'3',label:'5000000', price:'5000'},
]);
const cyclesMoney = ref<any>('');
const cyclesNumber = ref<any>('');
const checkedCycle = ref('1');
const payVisible = ref(false);
const checkedCard = (item: any) => {
  checkedCycle.value = item.id;
  cyclesNumber.value = item.label;
}
const checkedOther = (value: any) => {
  checkedCycle.value = value;
  cyclesMoney.value = '';
  cyclesNumber.value = 0;
}
const handleCancelPay = () => {
  payVisible.value = false;
  // 每次关闭弹框查询一下cycles的余额
  emit('getCycleBalances')
}
const setCyclesNum = () => {
  // cyclesNumber.value = cyclesMoney.value * 1000;
}
const setInputValue = () => {
  var reg = /^[0-9]+(.[0-9]{2})?$/;
  if (!reg.test(cyclesMoney.value)) {
    let cycleList = cyclesMoney.value.toString().split('');
    let dianNum = 0; //记录小数点个数
    let cycleVal = [];
    cycleList.forEach(element => {
      if (element == '.') {
        if (dianNum < 1) {
          cycleVal.push(element)
        }
        dianNum++;
      } else if (/^[0-9]*$/.test(element)) {
        cycleVal.push(element)
      }
    });
    cyclesMoney.value = cycleVal.join('');
    if (cyclesMoney.value.substring(cyclesMoney.value.indexOf('.') + 1).length > 2) {
      cyclesMoney.value = Number(cyclesMoney.value).toFixed(2);
    }
  }
  cyclesNumber.value = cyclesMoney.value * 1000;
}
const handlePay = () => {
  payVisible.value = true;
}
onMounted(() => {
  checkedCard(cyclesList.value[0]);
});
defineExpose({
  cyclesMoney,
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