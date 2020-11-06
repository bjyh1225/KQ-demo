<template>
  <div class="page-container">
    <div class="container">
      <div class="content">KQGIS Portal是前后端分离的；这一设计，使得KQGIS Poral具有更强大的可扩展性，能够更好的与实际业务需求结合起来。其必要的开发环境如下：</div>
    </div>
    <div class="container">
      <div class="title">1、JDK</div>
      <div class="content">
        版本要求1.8。<br>
        需在系统变量中新建一个变量JAVA_HOME，设置其值为 JDK 的目录，并在系统的 PATH 环境变量中添加值“%JAVA_HOME%\bin”和“%JAVA_HOME%\lib”。
      </div>
    </div>
    <div class="container">
      <div class="title">2、Eclipse</div>
      <div class="content">版本建议为较新版本，在KQGIS Portal平台开发过程中，我们选择的Java IDE（Integrated Development Environment，集成开发环境）为Eclipse</div>
    </div>
    <div class="container">
      <div class="title">3、Maven环境</div>
      <div class="content">
        版本要求为3.5.3及以上。<br>
        下载安装过程此处不做介绍。<br>
        在使用之前，需进行Maven相关配置；具体配置方法如下：<br>
        ①添加M2_HOME:对应Maven的解压目录即可。<br>
        <el-image :src="maven1"></el-image><br>
        ②编辑Path环境变量：<br>
        <el-image :src="maven2"></el-image><br>
        ③在cmd窗口输入mvn -v查看是否配置成功
      </div>
    </div>
    <div class="container">
      <div class="title">4、Node.js</div>
      <div class="content">
        无具体版本要求，但建议安装较新版本。<br>
        下载安装过程，这里不做介绍。若为安装版的Node.js（建议使用Node.js，并建议安装在系统盘），则安装完之后，已配置好，不需要进行相关配置。
      </div>
    </div>
    <div class="container">
      <div class="title">5、npm</div>
      <div class="content">
        无具体版本要求，但建议安装较新版本。<br>
        若已成功安装了node.js，则由于nodejs集成了npm，所以会默认安装npm，可通过在cmd中输入npm –v进行检查是否安装成功。
      </div>
    </div>
    <div class="container">
      <div class="title">6、MySQL</div>
      <div class="content">
        版本要求为5.5及以上。
      </div>
    </div>
    <div class="container">
      <div class="title">7、Oracle</div>
      <div class="content">
        版本要求为11g及以上。<br>
        MySQL和Oracle数据库可选其一进行安装便可，可根据实际应用场景进行选择。
      </div>
    </div>
    <div class="container">
      <div class="title">8、Visual Studio Code</div>
      <div class="content">
        版本建议为较新版本，具体以个人喜好为主。
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"DevelopmentEnvironmentPreparation",
  data(){
    return {
      maven1:require("../resource/DevelopmentEnvironmentPreparation/maven1.png"),
      maven2:require("../resource/DevelopmentEnvironmentPreparation/maven2.png")
    }
  }
}
</script>
<style lang="scss" scoped>
  .page-container{
    padding:0 20px;
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
  }
</style>
