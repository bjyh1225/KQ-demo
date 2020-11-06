<template>
  <div style="padding:0 20px;">
    <div class="container">
      <div class="title">资源中心</div>
      <div class="content">KQGIS Portal提供一个资源集中展示中心，面向全部用户（包括游客）；即用户可在此看到有权看到的所有资源。</div>
    </div>
    <div class="container">
      <div class="title">制图</div>
      <div class="content">KQGIS Portal提供一个在线制作地图、以及对地理数据可视化表达与空间分析的WebApp，为用户在线制作和协同分享地图资源、挖掘地理数据价值提供支撑。</div>
    </div>
    <div class="container">
      <div class="title">场景</div>
      <div class="content">KQGIS Portal提供一个三维地球WebApp，实现在线制作三维场景，保存和分享三维场景，进行三维空间分析、量算、运算等。</div>
    </div>
    <div class="container">
      <div class="title">大屏</div>
      <div class="content">KQGIS Portal提供一个在线制作可视化制作大屏的WebApp，帮助用户快速定制交互式的地图可视化应用。</div>
    </div>
    <div class="container">
      <div class="title">应用</div>
      <div class="content">KQGIS Portal提供一个应用定制WebApp，支持在线快读制作Web地图应用，定制后的地图应用支持下载并方便二次开发扩展。</div>
    </div>
    <div class="container">
      <div class="title">管理中心</div>
      <div class="content">KQGIS Portal将平台中的配置管理功能集中于该模块，便于相关人员进行集中管理和配置，以便定制出适合自己的门户平台。</div>
    </div>
    <div class="container">
      <div class="title">个人中心</div>
      <div class="content">KQGIS Portal将资源的注册、申请、审核、收藏、回收，以及个人消息、个人信息放置于一处，方便用户以个人方式对资源进行管理。</div>
    </div>
    <div class="container">
      <div class="title">Java SDK</div>
      <div class="content">KQGIS Portal是可定制的GIS门户平台，您可以使用KQGIS Portal SDK(Software Development Kit，软件开发工具包)对KQGIS Portal进行扩展，以满足不同业务的特殊需求，可使KQGIS Portal门户平台与您的业务系统更好的结合。</div>
    </div>
    <div class="container">
      <div class="title">JavaScript SDK</div>
      <div class="content">KQGIS Portal提供一套基于es6+vue+elementui+sass的前端开发框架，可以帮助您快速搭建自己的系统。</div>
    </div>
  </div>
</template>
<script>
export default {
  name:"PortalInclude"
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
