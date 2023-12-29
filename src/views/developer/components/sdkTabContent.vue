<template>
  <div class="p-[20px]">
    <p class="text-[14px] text-[#8C8C8C] font-normal">使用访问密钥从sdk以编程方式调用文件存储 </p>
    <p class="text-[16px] font-medium text-[#595959] mt-[20px]">下载路径</p>
    <div class="text-[14px] font-normal mt-[14px]">
        <div>
            <span class="w-[45px] inline-block">Go：</span>
            <span>https://github.com/aws/aws-sdk-go</span>
        </div>
        <div>
            <span class="w-[45px] inline-block">Java：</span>
            <span>https://github.com/aws/aws-sdk-java</span>
        </div>
    </div>
    <div class="w-[100%] my-[18px] line"></div>
    <p class="text-[16px] font-medium text-[#595959] mb-[10px]">配置凭证</p>
    <p class="text-[14px] font-medium">您可以使用任何文本编辑器在您的主目录中创建一个。将以下内容添加到您的凭据文件中，并将 &lt;YOUR_ACCESS_KEY&gt; 和替换 &lt;YOUR_SECRET_KEY&gt; 为您的凭据。</p>
    <div class="rounded-[4px] bg-[#FAFBFF] p-[20px] mt-[14px] mb-[20px] text-[14px]">
        <p>
          <span class="text-[#C8AD26]">access_key = </span>
          <span class="text-[#60A210]">&lt;YOUR_ACCESS_KEY&gt;</span>
        </p>
        <p class="py-[10px]">
            <span class="text-[#C8AD26]">secret_key = </span>
            <span class="text-[#60A210]">&lt;YOUR_SECRET_KEY&gt;</span>
        </p>
        <p>
            <span class="text-[#C8AD26]">host_base = </span>
            <span class="text-[#60A210]">computeshare.newtouch.com:8333</span>
        </p>
        <p class="py-[10px]">
            <span class="text-[#C8AD26]">host_bucket = </span>
            <span class="text-[#60A210]">computeshare.newtouch.com:8333</span>
        </p>
        <p>
            <span class="text-[#C8AD26]">use_https = </span>
            <span class="text-[#60A210]">False</span>
        </p>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style lang="less" scoped>
.line {
  border-top: 1px solid #E9E9E9;
}
</style>