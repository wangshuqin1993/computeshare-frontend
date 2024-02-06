<template>
  <div>
    <a-drawer
      :title="fileNum.loading > 0  ? `正在上传 ${fileNum.loading} 项内容` : fileNum.cancel > 0  ? fileNum.cancel+' 项上传已取消' : fileNum.suc+ ' 项上传完成' "
      placement="right"
      rootClassName="drawer-upload"
      :mask="false" :maskClosable="false"
      :closable="false"
      :open="visible"
      @close="cancel()"
    >
      <template #extra>
        <div class="flex">
          <img src="@/assets/images/down.png" @click="showContent=!showContent" :class="[!showContent ? 'up-tran' : 'up-tran2']" class="h-[24px] w-[24px] mr-[20px] cursor-pointer" />
          <img src="@/assets/images/close.png" @click="cancel" class="h-[24px] w-[24px] cursor-pointer" />
        </div>
      </template>
      <div v-if="showContent">
        <div v-if="fileNum.loading > 0" class="flex justify-between bg-[#fafafa] px-[24px] py-[10px]">
          <div>正在开始上传...</div>
          <div class="text-[#484FFF] cursor-pointer" @click="cancelUpload">取消</div>
        </div> 
        <div v-for="(data,key) in fileList" :key="key">
          <div v-if="data.type == 'suc'">
            <div class="flex justify-between px-[24px] py-[10px]">
              <div class="flex">
                <img src="@/assets/images/file2.png" class="h-[24px] w-[24px] mr-[10px]" />
                <div class="text-ellipsis">{{ data.fileName }}</div>
              </div>
              <img src="@/assets/images/success.png" class="h-[24px] w-[24px] " />
            </div>
          </div>
          <div v-else-if="data.type == 'cancel' || data.type == 'error'">
            <div class="flex px-[24px] py-[10px]">
              <img src="@/assets/images/file1.png" class="h-[24px] w-[24px] mr-[10px]" />
              <div class="text-ellipsis">{{ data.fileName }}</div>
              <div class="ml-[10px]">已取消上传</div>
            </div>
          </div>
          <div v-else>
            <div class="flex justify-between px-[24px] py-[10px]">
              <div class="flex">
                <img src="@/assets/images/file1.png" class="h-[24px] w-[24px] mr-[10px]" />
                <div class="text-ellipsis">{{ data.fileName  }}</div>
              </div>
              <LoadingOutlined  :style="{fontSize: '20px',color: '#484FFF'}" />
            </div>
          </div>
        </div>
      </div>
    </a-drawer>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { LoadingOutlined } from '@ant-design/icons-vue';

const emit = defineEmits(['cancelUploadFn'])

const showContent = ref(true); //内容是否显示
const visible = ref(false); // 弹框显示字段
const fileInfo = ref<any>({}); // 上传文件
const fileList = ref([])
const fileMap = new Map();
const fileNum = ref({
  loading: 0,
  cancel: 0,
  suc: 0
})

const cancel = () => {
  visible.value = false;
  fileMap.clear();
  emptyData();
}

const cancelUpload = () => {
  emptyData();
  fileMap.forEach(function(data, key) {
    if (data.type == '') { // 有数据正在上传
      emit('cancelUploadFn')
      data.type = 'cancel';
      fileMap.set(key, data);
      fileNum.value.cancel++;
    } else if (data.type == 'cancel' || data.type == 'error') { // 数据上传取消
      fileNum.value.cancel++;
    }
    fileList.value.push(data);
  });
}

const emptyData = () => {
  fileList.value.length = 0; //清空数据
  fileNum.value.cancel = 0;
  fileNum.value.loading = 0;
  fileNum.value.suc = 0;
}

watch(() => fileInfo.value,
  (value) => {
    if (Object.keys(value).length > 0) {
      fileMap.set(fileInfo.value.uid, fileInfo.value);
      emptyData();
      fileMap.forEach(function(data, key) {
        if (data.type == '') { // 有数据正在上传
          fileNum.value.loading++;
        } else if (data.type == 'suc') { // 数据上传成功
          fileNum.value.suc++;
        } else if (data.type == 'cancel' || data.type == 'error') { // 数据上传取消
          fileNum.value.cancel++;
        }
        fileList.value.push(data);
      });
    }
  }, { deep: true, immediate: true }
)

defineExpose({
  visible , fileInfo
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