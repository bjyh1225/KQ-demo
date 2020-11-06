<template>
  <div class="page-container">
    <div class="summarize">
      KQGIS Portal的可部署于多种操作系统，如Windows、Linux系统中。KQGIS Portal的部署分为前端部署和服务端部署（安装部署包请联系相关人员获取），具体部署方式如下：
    </div>
    <div class="container">
      <div class="title"><i class="round"></i>部署于Windows系统下</div>
      <div class="second-title">1、服务端部署：</div>
      <div class="content">
        ①请确保安装JDK1.8；<br>
        ②请确保安装MySQL5.5及以上版本或者Oracle11g及以上版本，并新建一个数据库(数据库名可自定义，MySQL字符集为：utf8 -- UTF-8 Unicode，排序规则为：utf8_general_ci，请严格按照此规则新建数据库，否则可能出现乱码或其他异常问题；Oracle不做要求)；<br>
        ③配置KQGISPortalServer/bootstrap.properties文件中的数据库连接参数(数据库名称、用户名、密码)（现只支持Oracle和MySQL数据库，只需要配置一个空数据库即可，系统会自动创建所需要的表和数据）；<br>
        注意：spring.jpa.hibernate.ddl-auto属性的配置（第一次连接空数据库的时候请确保是create，然后启动；第二次启动请确保修改为update(若不修改为update，还继续使用create，则会清除之前的所有数据，重新创建表和初始化数据)）；<br>
        ④双击KQGISPortalServer/kqportal.bat文件启动，直到提示启动成功，则KQGISPortal后台部署完成。<br>
      </div>
      <div class="second-title">2、客户端部署</div>
      <div class="content">
        ①双击..\KQGISPortalSdk\Package\KQGISPortalClient\启动.BAT即可；<br>
        ②访问地址：http://127.0.0.1:8005/index<br>
        ③初始访问账号：root 123456
      </div>
    </div>
    <div class="container">
      <div class="title"><i class="round"></i>部署于Linux系统下</div>
      <div class="content">
        暂缺
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:"InstallationAndDeployment"
}
</script>
<style lang="scss" scoped>
  .page-container{
    padding:0 20px;
  }
  .summarize{
    line-height:20px;
    color:#606266;
    padding:0 6px;
    margin-bottom:30px;
    font-size:14px;
  }
  .title{
    font-size:16px;
    font-weight: 400;
    color: #1f2f3d;
    margin-bottom:16px;
    .round{
      display: inline-block;
      width:10px;
      height:10px;
      border-radius: 50%;
      background:#1f2f3d;
      margin-right:10px;
    }
  }
  .second-title{
    margin-left:14px;
    font-size: 15px;
    color:#606266;
    line-height:30px;
  }
  .content{
    margin-left:30px;
    font-size: 14px;
    color:#606266;
    line-height:26px;
  }
  .container{
    margin-bottom:20px;
  }
</style>
