<template>
  <div>
    <a-drawer
      :title="uploadType == 'suc' ? ' 1 项上传完成' : '正在上传 1 项内容'"
      placement="right"
      rootClassName="drawer-upload"
      :mask="false" :maskClosable="false"
      :closable="false"
      :open="visible"
      @close="visible=false"
    >
      <template #extra>
        <div class="flex">
          <img src="@/assets/images/down.png" @click="showContent=!showContent" :class="[!showContent ? 'up-tran' : 'up-tran2']" class="h-[24px] w-[24px] mr-[20px] cursor-pointer" />
          <img src="@/assets/images/close.png" @click="visible=false" class="h-[24px] w-[24px] cursor-pointer" />
        </div>
      </template>
      <div v-if="showContent">
        <div v-if="uploadType == 'suc'">
          <div class="flex justify-between px-[24px] py-[10px]">
            <div class="flex">
              <img src="@/assets/images/file2.png" class="h-[24px] w-[24px] mr-[10px]" />
              <div class="text-ellipsis">{{ fileName }}</div>
            </div>
            <img src="@/assets/images/success.png" class="h-[24px] w-[24px] " />
          </div>
        </div>
        <div v-else>
          <div class="flex justify-between bg-[#fafafa] px-[24px] py-[10px]">
            <div>正在开始上传...</div>
            <div class="text-[#484FFF] cursor-pointer">取消</div>
          </div>
          <div class="flex justify-between px-[24px] py-[10px]">
            <div class="flex">
              <img src="@/assets/images/file1.png" class="h-[24px] w-[24px] mr-[10px]" />
              <div class="text-ellipsis">{{ fileName }}</div>
            </div>
            <img src="@/assets/images/close.png" class="h-[24px] w-[24px]  cursor-pointer" />
          </div>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const showContent = ref(true); //内容是否显示
const visible = ref(false); // 弹框显示字段
const uploadType = ref(''); // 上传状态，suc 表示上传成功
const fileName = ref('u=4031204076,3430234402&fm=253&fmt=auto&app=120&f=JPEG.webp'); // 上传文件名称

defineExpose({
  visible , uploadType, fileName
});
</script>
<style scoped lang="less">
.text-ellipsis {
    max-width: 200px; //可设置width
    text-overflow: ellipsis; //文字溢出的部分隐藏并用省略号代替
    white-space: nowrap; //文本不自动换行
    overflow: hidden;
}
.up-tran {
  transform: rotate(180deg);
  transition: all .5s, visibility 0s;
}
.up-tran2 {
  transform: rotate(360deg);
  transition: all .5s, visibility 0s;
}
</style>