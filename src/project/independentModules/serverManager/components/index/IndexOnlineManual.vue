<template>
  <div class="index-online-manual">
    <p class="title">在线手册</p>
    <p>为您提供使用iServer的参考说明，包括快速入门、产品介绍、JavaDoc与REST API文档等，还提供了基于客户端GIS程序开发工具包iClient，初学者可以从快速入门看起。</p>
    <el-row class="manual-desc">
      <el-col :span="12">
        <ul class="manual-ul">
          <li>快速入门</li>
          <li>产品介绍</li>
          <li>REST API</li>
          <li>Web SDK</li>
        </ul>
      </el-col>
      <el-col :span="12" class="icon-area">
        <img src="~app/serverManager/images/index/icon/manual.jpg">
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:"IndexOnlineManual"
}
</script>

<style lang='scss' scoped>
  .index-online-manual{
    margin:0 auto;
    padding-bottom:30px;
    p{
      text-align: center;
      font-size:14px;
      color:#242424;
    }
    .title{
      font-size:20px;
    }
    .manual-ul{
      list-style: none;
      float: right;
      margin-right: 60px;
      margin-top:40px;
      li{
        width:300px;
        height:36px;
        line-height:36px;
        font-size: 14px;
        color:#606266;
        border:1px solid #dcdcdc;
        border-radius:5px;
        margin-bottom:20px;
        padding-left:30px;
      }
    }
    .icon-area{
      padding-left:60px;
    }
    .manual-desc{
      margin-top:30px;
    }
  }
</style>