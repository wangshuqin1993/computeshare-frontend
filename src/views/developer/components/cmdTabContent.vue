<template>
  <div class="p-[20px]">
    <p class="text-[14px] text-[#8C8C8C] font-normal">使用访问密钥从SDK以编程方式调用文件存 </p>
    <p class="title">安装工具</p>
    <p class="title-sub">在终端执行以下命令安装一个免费的命令行工具</p>
    <div class="div-bg text-[#E34594]">
        sudo apt install s3cmd
    </div>
    <div class="w-[100%] my-[18px] line"></div>
    <p class="title">配置凭证</p>
    <p class="title-sub">在终端执行以下命令来更改配置文件的内容</p>
    <div class="div-bg text-[#E34594]">
        sudo apt install s3cmd
    </div>
    <p class="title-sub">将以下内容添加到文件中，并将 &lt;YOUR_ACCESS_KEY&gt;和&lt;YOUR_SECRET_KEY&gt;替换为您的凭据。</p>
    <div class="div-bg">
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
<style scoped>
.line {
  border-top: 1px solid #E9E9E9;
}
.title{
  @apply text-[16px] font-medium text-[#595959] mt-[20px];
}
.title-sub{
  @apply text-[rgba(0,0,0,0.65)] text-[14px] font-medium mt-[10px];
}
.div-bg{
  @apply rounded-[4px] bg-[#FAFBFF] p-[20px] mt-[14px] mb-[20px] text-[14px];
}
</style>