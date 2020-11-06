<template>
  <div style="padding:0 20px;">
    <div class="container">
      <div class="title">用户具有哪些权利？</div>
      <div class="content">KQGIS Portal中的用户可对自己有权限的资源进行检索、展示、注册、变更、申请、审核、收藏、回收等一些列的资源管理操作。并可在制图、场景、大屏、应用中使用自己权限范围内的资源。</div>
    </div>
    <div class="container">
      <div class="title">您对资源具有最高管理权限</div>
      <div class="content">KQGIS Portal具有一整套对资源的授权管理的机制，可保证您的资源的决定安全。其中您对您个人注册资源具有最高的管理权限，即使是平台管理员也无权干涉您对资源的管理方式。</div>
    </div>
    <div class="container">
      <div class="title">关于平台管理员root</div>
      <div class="content">平台管理员root是为管理平台的基础建设工作而存在的。其中白名单、资源分类、租户管理只有root账号可设置，不对其他用户开放权限。</div>
    </div>
    <div class="container">
      <div class="title">管理员如何授权给其他用户？</div>
      <div class="content">
        如果您当前账号具有操作管理<i class="el-icon-right"></i>站点管理<i class="el-icon-right"></i>组织模块的权限，那么恭喜您，您自己为管理员。管理员具有创建用户、以及给其他用户授权使用相关功能模块的权利。具体授权方式如下：<br>
        ①	可在用户管理中创建用户，并赋予该用户所属维度、及相应机构/岗位；<br>
        ②	权限管理中可新增或修改相关权限；<br>
        ③	角色管理中可新增或修改角色，并可将角色与权限、用户进行关联；<br>
        ④	组织管理中可创建自己维度下的组织机构。<br>
      </div>
    </div>
    <div class="container">
      <div class="title">维度是什么？</div>
      <div class="content">维度是指建立在组织机构上层的一个管理空间。在建立组织机构时，必须将组织机构放置于某个维度下面，不然平台不予以承认。</div>
    </div>
    <div class="container">
      <div class="title">怎样创建维度？</div>
      <div class="content">创建维度可以在管理<i class="el-icon-right"></i>站点管理<i class="el-icon-right"></i>安全配置<i class="el-icon-right"></i>数据字典<i class="el-icon-right"></i>机构维度中进行预设置。</div>
    </div>
  </div>
</template>
<script>
export default {
  name:"UserPermission"
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
