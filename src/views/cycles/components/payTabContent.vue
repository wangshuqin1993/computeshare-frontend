<template>
  <div class="p-[50px]">
    <div class="flex">
      <div class="div-card">
        <div class="title">50,000 Cycles</div>
        <div class="sub-text">¥ 50</div>
      </div>
    </div>
    <div class="bt-css"></div>
  </div>
</template>
<script setup lang="ts">
</script>
<style scoped>
.div-card{
  border-radius: 6px;
  border: 2px solid #DCDFE6;
  padding: 30px 50px;
  text-align: center;
  .title{
    @apply text-[21px] font-semibold text-[#000000]
  }
  .sub-text{
    @apply text-[18px] text-[#606266] mt-[16px];
  }
}
.bt-css{
  border-top: 1px solid #E9E9E9;
}
</style>