<template>
  <div class="page-container">
    <div class="container">
      <div class="title">1、打开Eclipse</div>
      <div class="content">导入cos3-web-server和cos3-test-service两个微服务代码，分别为网关微服务和打样微服务。</div>
    </div>
    <div class="container">
      <div class="title">2、配置maven文件</div>
      <div class="content">
        通过Eclipse<i class="el-icon-right"></i>Window<i class="el-icon-right"></i>Maven<i class="el-icon-right"></i>User Settings，将源码包中的settings.xml配置于该处。<br>
        注意：settings.xml中localRepository为您本地仓库路径，需提前创建；其他地方不要修改即可。
      </div>
    </div>
    <div class="container">
      <div class="title">3、数据库参数配置</div>
      <div class="content">
        在bootstrap.properties中配置数据库连接参数，需配置项分别为：<br>
        ①spring.datasource.url（数据库连接地址）<br>
        ②spring.datasource.username（数据库连接用户名）<br>
        ③spring.datasource.password（数据库连接密码）<br>
        ④spring.jpa.database（数据库类型MYSQL或者ORACLE）<br>
        ⑤spring.jpa.hibernate.ddl-auto（初次运行，spring.jpa.hibernate.ddl-auto请设置为create，其他时间为update）
      </div>
    </div>
    <div class="container">
      <div class="title">4、新建业务微服务</div>
      <div class="content">
        开发者可以自行新建微服务，进行业务逻辑开发；具体开发方式如下：<br>
        ①新建一个Maven Module项目（注意：创建时Group Id请填写为com.gsoft.cos3，否则不能使用框架里的Swagger2属性），如下图：<br>
        <el-image :src="serverConfig1"></el-image><br>
        ②参考cos3-test-service微服务下pom.xml文件内容进行配置新建微服务；主要是parent和公共微服务依赖及版本信息确认三项，如下图：<br>
        <el-image :src="serverConfig2"></el-image><br>
        <el-image :src="serverConfig3"></el-image><br>
        ③新建代码目录，可自行构建，不做相关要求。然后就可以编写相关业务需求逻辑了，平台中的代码目录为如下图：<br>
        <el-image :src="serverConfig4"></el-image><br>
        您可以在您新建的微服务中使用KQGIS Portal平台提供的中台服务的所有属性，包括所有功能接口与方法函数、安全权限机制、用户组织、swagger2、资源管理整套逻辑等等。
        ④从Eclipse中启动KQGIS Portal<br>
        找到cos3-web-server的入口文件WebServerApplication.java文件并打开，右键Run As<i class="el-icon-right"></i>Java Application即可。
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"ServerDevelopmentExtension",
  data(){
    return {
      serverConfig1:require("../resource/ServerDevelopmentExtension/serverConfig1.png"),
      serverConfig2:require("../resource/ServerDevelopmentExtension/serverConfig2.png"),
      serverConfig3:require("../resource/ServerDevelopmentExtension/serverConfig3.png"),
      serverConfig4:require("../resource/ServerDevelopmentExtension/serverConfig4.png")
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
