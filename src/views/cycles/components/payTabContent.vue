<template>
  <div class="p-[50px]">
    <div class="flex">
      <div v-for="(item,key) in cyclesList" :key="key" @click="checkedCard(item.id)" :class="{'checked-div' : item.id == checkedCycle}" class="div-card mr-[24px]">
        <div>
          <div class="text-[21px] font-semibold text-[#000000]">{{ item.label }} Cycles</div>
          <div class="text-[18px] text-[#606266] mt-[16px]">¥ {{ item.price }}</div>
        </div>
      </div>
      <div class="div-card" @click="checkedCard('other')" :class="{'checked-div' : 'other' == checkedCycle}">
        自定义…
      </div>
    </div>
    <div class="mt-[40px]" v-if="'other' == checkedCycle">
      <a-input autocomplete="off" v-model:value="cyclesNumber" placeholder="请输入所需Cycles数量"/>
      <div class="text-[18px]">¥ 0.00</div>
    </div>
    <div class="text-center">
      <a-button type="primary" class="ant-btn-s my-[50px]" @click="">确认充值</a-button>
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
</template>
<script setup lang="ts">
import { ref } from 'vue';

const cyclesList = ref([
  {id:'1',label:'50,000', price:'50'},
  {id:'2',label:'50,000', price:'50'},
  {id:'3',label:'50,000', price:'50'},
]);
const cyclesNumber = ref('');
const checkedCycle = ref('');
const checkedCard = (id: any) => {
  checkedCycle.value = id;
}
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