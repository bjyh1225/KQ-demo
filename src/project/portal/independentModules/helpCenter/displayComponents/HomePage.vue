<template>
  <div>
    <el-image :src="logoURL" :fit="'contain'"></el-image>
    <div class="summarize">
      KQGIS Portal是集GIS资源的整合、搜索、共享与管理于一体的云GIS门户平台，可提供企业级协同共享与资源管理能力，具备多源异构服务注册、系统监控、日志输出、可视化界面定制等能力。提供丰富多样的Web端应用，如可以进行创建专题图、添加场景、制作大屏、定制应用等。作为云GIS门户平台，整体采用用户中心、资源中心、应用中心、管理中心四大中心来集中输入和输出资源与应用，以公共资源、群组资源、个人资源等方式来多维度的管理、整合和利用资源，并具有灵活强大的二次开发、快速定制门户站点等能力。
    </div>
    <el-row class="desc">
      <el-col :span="8">
        <div class="title"><i class="el-icon-portal-shuben"></i>入门向导</div>
        <div class="content">
          初步接触KQGIS Portal ，可以通过产品介绍了解KQGIS Portal。然后参考安装部署指南，进行该产品的安装部署工作，在安装成功的前提条件下，启动服务，就可以使用KQGIS Portal的所有功能了。
        </div>
        <div class="more">
          <div class="more-a">
            <span>详细内容</span>
            <i class="el-icon-right"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="title"><i class="el-icon-portal-menhuguanli"></i>使用GIS门户</div>
        <div class="content">
          KQGIS Portal 提供多种GIS资源的整合、搜索、共享和管理能力，所有用户都可在门户中对自己权限范围内的资源进行查找、共享、编辑、注册、申请、审核、托管服务、使用群组等操作；开发人员可通过开发授权（Key），使用KQGIS Portal中被保护的所有资源和应用，也可以在自己的应用中集成门户中的资源和应用。
        </div>
        <div class="more">
          <div class="more-a">
            <span>详细内容</span>
            <i class="el-icon-right"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="title"><i class="el-icon-portal-yunguanli"></i>管理GIS门户</div>
        <div class="content">
          一般来说，KQGIS Portal的管理员具有管理中心的管理权限；其具有的管理能力主要有：可对KQGIS Portal门户站点进行配置，实现定制相关站点；对组织机构用户等进行构建，实现多维度组织下的资源管理；对整个系统的字典、白名单、资源目录、系统参数进行配置，实现对云平台的基础建设工作；对托管和注册服务器进行管理，实现资源的注册、监控、托管以及统计等。
        </div>
        <div class="more">
          <div class="more-a">
            <span>详细内容</span>
            <i class="el-icon-right"></i>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="desc">
      <el-col :span="8">
        <div class="title"><i class="el-icon-portal-xitongdingzhi"></i>定制GIS门户</div>
        <div class="content">
          KQGIS Portal作为可定制化的GIS门户平台，提供了灵活、简洁、高性能的开发定制能力，其开发指南可帮助用户进行GIS门户的定制与扩展。可通过首页定制功能快速定制门户界面；<br>可通过REST API、Java  API进行用户基础功能的开发使用，详细接口请查阅：API参考。
        </div>
        <div class="more">
          <div class="more-a">
            <span>详细内容</span>
            <i class="el-icon-right"></i>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="title"><i class="el-icon-portal-ziyuan3"></i>附录资源</div>
        <div class="content">
          附录资源为广大用户提供一些辅助参考资源，帮助大家更好的理解和使用KQGIS Portal。<br>包括KQGIS整体GIS架构、支持的EPSG Code、术语表等。
        </div>
        <div class="more">
          <div class="more-a">
            <span>详细内容</span>
            <i class="el-icon-right"></i>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="footer-desc">
      <el-col :span="12">
        版权所有 © 2020 苍穹数码。保留所有权利。
      </el-col>
      <el-col :span="12">
        注：本文档完成日期为 2020 年 05 月 21 日 ，如果此前的文档（包括电子文档和印刷文档）与本文档不相符合，请以本文档为准。若本文档更新，则以更新后的文档为准。
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:"HomePage",
  data(){
    return {
      logoURL:require("../resource/HomePage/logo.jpg")
    }
  }
}
</script>

<style lang='scss' scoped>
  
  .el-image{
    height:100px;
    width:100%;
    border-bottom:1px solid #cbcbcb;
    margin-bottom:30px;
  }
  .summarize{
    line-height:20px;
    color:#606266;
    padding:0 6px;
    margin-bottom:30px;
    font-size:14px;
  }
  .desc{
    font-size:14px;
    padding:0 6px;
    color:#606266;
    margin-bottom:30px;
    .el-col:nth-child(1){
      padding-right:15px;
    }
    .el-col:nth-child(2){
      padding:0 15px;
    }
    .el-col:nth-child(3){
      padding-left:15px;
    }
    .content{
      line-height:20px;
      margin-bottom:15px;
    }
    .title{
      color:#242424;
      font-size:18px;
      font-weight: bold;
      margin-bottom:20px;
      i{
        font-size:18px;
        margin-right:10px;
      }
    }
    .more{
      @include base-active-color();
      .more-a{
        cursor: pointer;
      }
    }
  }
  .footer-desc{
    border-top:1px solid #cbcbcb;
    font-size:14px;
    color:#606266;
    .el-col:nth-child(1){
      // padding-left:10%;
      padding-top:20px;
      vertical-align: middle;
      text-align: center;
    }
    .el-col:nth-child(2){
      line-height:20px;
      padding:10px 0;
    }
  }
</style>