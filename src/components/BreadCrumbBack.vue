<template>
  <div class="text-[#121211] text-[24px]">
    <span @click="backRoute($event)" class="backInfo cursor-pointer group ">
      <img src="@/assets/icons/back1.svg" class="w-[16px] hidden group-hover:inline-block" />
      <img src="@/assets/icons/back2.svg" class="w-[16px] inline-block group-hover:hidden" />
      <!-- <svg-icon name="back(B)" size="24" class="mr-[8px] text-red-900" /> -->
      <span class="font-bold align-middle text-[14px] ml-[6px] text-[#8C8C8C] group-hover:text-[#484FFF]">返回</span>
    </span>
    <span class="font-bold align-middle">
      <span class="font-bold">{{ currentName }}</span>
      <slot name="tags"></slot>
    </span>

  </div>
</template>
<script lang='ts' setup>
import { toRefs } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  currentName: {
    type: String,
    default: '',
  },
  isClick: {
    type: Boolean,
    default: true,
  }
});
const router = useRouter();
const { currentName, isClick } = toRefs(props);

const backRoute = (e: Event) => {
  router.go(-1)
}
</script>
<style lang='less' scoped>
.backInfo {
  position: relative;
  margin-right: 32px;

  &::before {
    content: "";
    position: absolute;
    top: 12px;
    right: -16px;
    width: 2px;
    height: 16px;
    background-color: #000000;
    border-radius: 1px;
    display: none;
  }
}

.isclick {
  cursor: pointer;
}


html[data-theme='dark'] {
  .backInfo::before {
    background-color: #ffffff;
  }
}
</style>