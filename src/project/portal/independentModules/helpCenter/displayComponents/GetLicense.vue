<template>
  <div>
    <div class="title">苍穹地理信息KQGIS Portal平台许可说明</div>
    <div class="content">
      <div class="content-title">1、获取必要文件列表</div>
      <p>获取KQGIS Portal平台许可需要以下文件（在KQGIS Portal部署文件中可获取）：</p>
      <el-image :src="getLicense1"></el-image>
      <p>KqGeoLic4dll.dll（区分32、64位）、msvcp120.dll、msvcr120.dll 苍穹地理信息平台许可动态库、KqLicInfo4.exe 苍穹地理信息平台软许可管理工具</p>
    </div>
    <div class="content">
      <div class="content-title">2、配置环境变量</div>
      <p>把KqLicInfo4.exe和KqGeoLic4dll.dll、msvcp120.dll、msvcr120.dll解压到自定义位置（32位或64位根据实际需要选择），如D:\KqGeoLic4</p>
      <el-image :src="getLicense2"></el-image>
      <p>设置path环境变量，在最后加入自定义的存放位</p>
      <el-image :src="getLicense3"></el-image>
    </div>
    <div class="content">
      <div class="content-title" style="margin-bottom:10px;">3、电脑许可信息提取及软许可文件激活</div>
      <el-image :src="getLicense4"></el-image>
      <p>打开KqLicInfo4.exe，填写相应信息后点击“生成本机软许可信息”提取本机信息，把信息文件发给许可发放人员生成许可文件，拿到许可文件后点击“激活本机软许可”激活则可使用。</p>
    </div>
  </div>
</template>

<script>
export default {
  name:"GetLicense",
  data(){
    return {
      getLicense1:require("../resource/GetLicense/getLicense1.png"),
      getLicense2:require("../resource/GetLicense/getLicense2.png"),
      getLicense3:require("../resource/GetLicense/getLicense3.png"),
      getLicense4:require("../resource/GetLicense/getLicense4.png"),
    }
  }
}
</script>

<style lang='scss' scoped>
  .title{
    font-size: 16px;
    font-weight: 400;
    color: #1f2f3d;
    margin-bottom: 16px;
  }
  p{
    font-size: 14px;
    color: #606266;
    line-height: 24px;
    margin:8px;
  }
  .content{
    margin-bottom:15px;
    .content-title{
      font-size: 15px;
      color: #606266;
      margin:8px;
    }
  }
</style>