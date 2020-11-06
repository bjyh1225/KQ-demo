<template>
  <div style="padding:0 20px;">
    <div class="container">
      <div class="content">当您将地图服务、功能服务、数据服务、三维服务、文件中的一种资源注册到KQGIS Portal平台中的那一刻起，您将对该资源具有最高的管理权限，当然您也可以将该资源共享给其他人。</div>
      <div class="content">关于共享资源，我们分为三种共享权限，分别为可检索、可浏览、可编辑；顾名思义，可检索即为可以检索到，可浏览意味着您可以使用该资源，可编辑即为您可以编辑该资源。</div>
      <div class="content">用户对注册的资源具有最高权限，即具有可检索、可浏览、可编辑三种权限。</div>
    </div>
    <div class="container">
      <div class="title">如何共享资源？</div>
      <div class="content">
        可通过个人中心中的我的资源模块对一种资源进行共享设置，共享设置中分为三种共享范围设置，分别为私有、公共授权、部分授权。私有即仅个人可见；公共授权即对所有用户授予可检索、可浏览、可编辑三种权限中的一项或几项；部分授权即可只对部分用户授予可检索、可浏览、可编辑三种权限中的一项或几项。共享设置界面如下：<br>
        <el-image :src="sharing"></el-image>
      </div>
    </div>
    <div class="container">
      <div class="title">如何进行WebApp的共享？</div>
      <div class="content">
        可对自己的WebApp进行共享，具体共享界面如下：<br>
        <el-image :src="app"></el-image>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"ResourcesAndSharing",
  data(){
    return {
      sharing:require('../resource/ResourcesAndSharing/sharing.png'),
      app:require('../resource/ResourcesAndSharing/app.png')
    }
  }
}
</script>
<style lang="scss" scoped>
  .container{
    margin-bottom:20px;
    .title{
      font-size:16px;
      font-weight: 400;
      color: #1f2f3d;
      margin-bottom:16px;
    }
    .content{
      font-size: 14px;
      color:#606266;
      line-height:24px;
    }
  }
</style>
