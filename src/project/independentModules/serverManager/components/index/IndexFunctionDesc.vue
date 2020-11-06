<template>
  <div class="index-function-desc">
    <div class="function-block">
      <i class="kqserver-fuwuliebiao function-icon"></i>
      <p class="title">服务列表</p>
      <p class="desc">访问地图、数据、分析、三维等REST服务，访问标准的OGC服务</p>
    </div>
    <div class="function-block">
      <i class="kqserver-service-mana function-icon"></i>
      <p class="title">服务管理</p>
      <p class="desc">您可以快速发布GIS服务，管理已有GIS服务，运维管理整个GIS服务器</p>
    </div>
    <div class="function-block">
      <i class="kqserver-shili function-icon"></i>
      <p class="title">在线示例</p>
      <el-row class="online-example">
        <el-col :span="12">
          <ul>
            <li>Android示范程序</li>
            <li>Leaflet示范程序</li>
            <li>OpenLayers示范程序</li>
          </ul>
        </el-col>
        <el-col :span="12">
          <ul>
            <li>MapboxGL示范程序</li>
            <li>iClient3D for Pugin示范程序</li>
            <li>iClient3D for WebGL示范程序</li>
          </ul>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name:"IndexFunctionDesc"
}
</script>

<style lang="scss" scoped>
  .index-function-desc{
    padding:60px 0;
    text-align: center;
    .function-block{
      display: inline-block;
      box-sizing: border-box;
      width:366px;
      height:280px;
      border:1px solid #dcdcdc;
      border-radius: 5px;
      padding-top:50px;
      vertical-align: middle;
      .function-icon{
        font-size:60px;
        color:#242424;
      }
      .title{
        font-size:16px;
        color:#242424;
      }
      .desc{
        font-size:14px;
        color:#606266;
        padding:0 10%;
        line-height: 24px;
      }
      .online-example{
        ul{
          list-style: none;
          margin:0;
          padding:0 10%;
          font-size:14px;
          color:#606266;
          text-align: left;
          li{
            line-height:26px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .function-block:nth-child(1){
      margin-right:3%;
    }
    .function-block:nth-child(2){
      margin-right:3%;
    }
  }
</style>