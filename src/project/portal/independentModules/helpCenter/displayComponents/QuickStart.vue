<template>
  <div style="padding:0 20px;">
    <div class="container">
      <div class="title">如何登录KQGIS Portal平台？</div>
      <div class="content">在KQGIS Portal初始化启动后，系统会自动新建一个账号——系统管理员（root）账号，而且该账号会一直存在于系统中，不可删除。您可以使用账号root，密码123456登录KQGIS Portal。当然，这是指平台初始状态下，后面以修改后的密码为准。</div>
    </div>
    <div class="container">
      <div class="title">如何构建自己的组织结构？</div>
      <div class="content">在管理<i class="el-icon-right"></i>站点管理<i class="el-icon-right"></i>组织<i class="el-icon-right"></i>组织管理中构建自己的组织结构，并可对机构关联相关的职位。以备后续创建用户使用。</div>
    </div>
    <div class="container">
      <div class="title">如何创建用户？</div>
      <div class="content">
        当前KQGIS Portal暂不支持自主注册用户，只能由管理员在用户管理中进行创建用户。具体路由为：管理<i class="el-icon-right"></i>站点管理<i class="el-icon-right"></i>组织<i class="el-icon-right"></i>用户管理。<br>
        之后要对新建的用户进行权限和角色的附加工作。
      </div>
    </div>
    <div class="container">
      <div class="title">目录配置</div>
      <div class="content">目录配置为资源以及WebApp配置分类管理目录。即列表左边的目录树结构内容。</div>
    </div>
    <div class="container">
      <div class="title">安全配置</div>
      <div class="content">
        安全配置中的数据字典为KQGIS Portal的字典维度，其中已经有机构维度与岗位的字典维度内容，用户可自行创建和维护字典。<br>
        安全配置中的白名单为root账号的特有功能，即对KQGIS Portal中的Java API进行配置，以达到特权请求API的实现。
      </div>
    </div>
    <div class="container">
      <div class="title">怎样注册资源？</div>
      <div class="content">在管理<i class="el-icon-right"></i>个人中心<i class="el-icon-right"></i>我的资源中对各种资源进行注册操作。</div>
    </div>
  </div>
</template>
<script>
export default {
  name:"QuickStart"
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
