<template>
  <div class="index-new-function">
    <p class="title">新增功能</p>
    <p>KQGIS Server主要新增功能、新特性</p>
    <el-row>
      <el-col :span="12" class="icon-area">
        <img src="~app/serverManager/images/index/icon/newfeatures.jpg">
      </el-col>
      <el-col :span="12" class="timeline-area">
        <el-timeline >
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :timestamp="activity.timestamp"
            :hide-timestamp="true"  
          >
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>   
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:"IndexNewFunction",
  data(){
    return {
      activities: [
        {
          content: '新增支持在服务管理中刷新指定工作空间的内容',
          timestamp: '2020-08-13'
        }, 
        {
          content: '新增支持防护跨站脚本的攻击',
          timestamp: '2020-08-12'
        }, 
        {
          content: '基于Shapefile、PostGIS数据源发布的数据服务、新增支持分页查询',
          timestamp: '2020-08-11'
        }, 
        {
          content: '接入天地图服务时、新增支持设置服务访问令牌',
          timestamp: '2020-08-10'
        }, 
        {
          content: '产品包内置的JRE由Oracle JDK变更为Open JDK',
          timestamp: '2020-08-09'
        }
      ]
    }
  }
}
</script>

<style lang='scss' scoped>
  .index-new-function{
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
    .icon-area{
      text-align: right;
      padding-right:60px;
    }
    .timeline-area{
      padding-top:100px;
    }
  }
</style>