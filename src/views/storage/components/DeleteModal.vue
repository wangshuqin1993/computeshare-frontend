<template>
  <div>
    <a-modal v-model:open="showVisible" :title="delType == 'file' ? '删除文件' : delType == 'folder' ? '删除文件夹' :'删除存储桶'" centered="true" @ok="handleOk" @cancel="closeModal" width="697px" :footer="null">
      <div>
        <div class="text-[14px] mt-[20px] text-[#595959]">
          <label v-if="delType == 'file'">确认要永久删除文件“{{ bucketKey }}”?</label>
          <label v-else-if="delType == 'folder'">确认要永久删除文件夹“{{ bucketKey }}”吗？</label>
          <label v-else>确认要删除存储桶“{{ bucketName }}”？</label>
        </div>
        <div v-if="delType == 'folder'" class="mt-[20px] bg-[#FFFBE6] border border-solid border-[#FFE58F] rounded-[2px] py-[10px] px-[20px] flex">
          <div class="pt-[2px]">
            <img src="@/assets/images/IconWarning.png" class="h-[14px] w-[14px] mr-[8px]" />
          </div>
          <div class="text-[12px] text-[#595750]">
            该文件夹中的所有对象都将被删除，并且在执行删除操作期间添加的任何新对象也可能被删除。
          </div>
        </div>
        <div class="text-center">
          <a-button :loading="delLoading" type="primary" class="ant-btn-m mt-[50px]" @click="handleOk">删除</a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { toRefs, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { apiDeleteBucket, apiDeleteFileFromS3, apiDeleteFolderFromS3 } from '@/apis/s3_storage';
import { message } from "ant-design-vue";

const route = useRoute()

const props = defineProps({
  showVisible: {
    type: Boolean,
    default: false,
  },
  delType: {
    type: String,
    default: ''
  },
  bucketName: {
    type: String,
    default: ''
  },
  bucketKey: {
    type: String,
    default: ''
  }
});
const { showVisible, delType, bucketName, bucketKey } = toRefs(props);
const emit = defineEmits(['closeModal','loadTable']);

// 删除loading
const delLoading = ref(false)

const handleOk = async () => {
  delLoading.value = true
  let res: any = '';
  if (delType.value == 'storage') { //存储桶
    res = await apiDeleteBucket(bucketName.value);
  } else if (delType.value == 'folder') { //文件夹
    const params = {
      dirName: bucketKey.value,
      prefix: route.query.prefix || route.query.prefixName || ''
    }
    res = await apiDeleteFolderFromS3(bucketName.value, params);
  } else if (delType.value == 'file') { //文件
    const str = route.query.prefix ? route.query.prefix+'/'+bucketKey.value : bucketKey.value
    res = await apiDeleteFileFromS3(bucketName.value, str);
  }
  delLoading.value = false
  if (res.code == 200) {
    message.success(res.message)
    closeModal();
    emit('loadTable');
  }else{
    message.error(res.message)
  }
}

const closeModal = () => {
  emit('closeModal')
}

onMounted(()=>{
  
})
</script>

<style scoped lang="less">



</style>