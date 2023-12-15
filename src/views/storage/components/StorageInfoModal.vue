<template>
  <div>
    <a-modal v-model:open="showVisible" centered="true" @ok="handleOk" @cancel="closeModal" width="697px" :footer="null">
      <div class="ant-modal-header">
        <div class="ant-modal-title flex items-center">
          <img src="@/assets/images/IconWarning.png" class="h-[36px] w-[36px] mr-[10px]" />
          此存储桶不为空
        </div>
      </div>
      <div class="mt-[20px]">
        <div class="text-[14px]">必须先清空存储桶，然后才能将其删除。要删除存储桶中的所有文件，请点击操作菜单中的清空选项。</div>
        <div class="text-center">
          <a-button type="primary" class="ant-btn-m mt-[50px]" @click="handleOk">知道了</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { toRefs, onMounted } from "vue";

const props = defineProps({
  showVisible: {
    type: Boolean,
    default: false,
  },
});
const { showVisible } = toRefs(props);
const emit = defineEmits(['closeModal']);


const handleOk = async () => {
  closeModal()
}

const closeModal = () => {
  emit('closeModal')
}

onMounted(()=>{
  
})
</script>

<style scoped lang="less">



</style>