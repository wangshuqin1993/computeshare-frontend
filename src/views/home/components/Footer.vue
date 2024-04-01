<template>
  <div class=" mx-auto bg-[#0E1016] text-[14px]">
    <div class="text-[#fff] text-left max-w-[1440px] mx-auto md:px-[32px] px-[16px] py-[32px]">

      <div class="md:flex md:justify-between">
        <div class="mb-[20px]">
          <img src="@/assets/icons/logo-w.svg" class="md:h-[32px] h-[26px] md:mb-[32px] mb-[20px]" />
          <div class="footer-info text-[#7e89a3]"> 致力于为企业提供全方位的IT服务 </div>
          <div class="footer-info text-[#7e89a3]"> 助力企业开拓新的商业模式 </div>
        </div>
        <div class="flex">
          <div class="footer-item md:w-[60px] w-full">
            <div class="title">
              产品
            </div>
            <div class="text-[#7e89a3]">人力</div>
            <div class="text-[#7e89a3]">码力</div>
            <div class="text-[#7e89a3]">算力</div>
          </div>
          <div class="footer-item w-[100px]">
            <div class="title">协议与规则</div>
            <div class="text-[#7e89a3]">用户协议</div>
            <div class="text-[#7e89a3]">隐私政策</div>
          </div>
          <div class="footer-item ">
            <div class="title">联系我们</div>
            <div class="text-[#7e89a3]">商务合作</div>
            <div class="text-[#7e89a3]">business@tntlinking.com</div>
          </div>
          <div class="footer-item">
            <div class="title">关注公众号联系客服</div>
            <div class="flex">
              <div class="mr-[20px]">
                <img src="@/assets/images/public.png" class="h-[64px] mb-[6px]">
                <div class="text-[#7e89a3]">关注公众号</div>
              </div>
              <div>
                <img src="@/assets/images/wechat1.png" class="h-[64px] mb-[6px]" />
                <div class="text-[#7e89a3]">联系客服</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="md:pt-[45px] pt-[32px] text-center text-[#7e89a3]">
        <span>Copyright © 版权所有2011-2024 湖北天天数链技术有限公司</span><span>
          <a target="_blank" href="https://beian.miit.gov.cn/"> &nbsp;&nbsp;鄂ICP备2020018985号-1 </a></span><span
          style="width:300px;margin:0 auto;padding:20px 0;">
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42018502004850"
            style="display:inline-block;text-decoration:none;height:16px;line-height:20px;">
            <p style="float:left;height:20px;line-height:20px;margin:0 0 0 5px;">鄂公网安备 42018502004850号</p>
          </a>
        </span>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>

</script>
<style lang='less' scoped>
.footer-item:not(:last-child) {
  margin-right: 32px;

  >div {
    margin-bottom: 10px;
  }
}

.title {
  font-weight: 600;
}
</style>