<template>
  <div class="system-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="1000px"
      :modal="true"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>属性</span>
        </div>
      </template>
      <el-row class="dialog-body"> 
        <el-row>
          <el-col :span="6">
            <el-image :src="serviceInfo.thumburl" class="thumburl">
              <div slot="error" class="image-error-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
              <div slot="placeholder" class="image-wait-slot">
                <span class="dot">加载中...</span>
              </div>
            </el-image>
          </el-col>
          <el-col :span="18" class="service">
            <div class="service-name">{{serviceInfo.aliasName}}</div>
            <el-row class="service-owner">
              <el-col :span="8">
                发布者：{{serviceInfo.owner}}
              </el-col>
              <el-col :span="8">
                时间：{{serviceInfo.createTime}}
              </el-col>
              <el-col :span="8">
                点击量：{{serviceInfo.serviceHits}}
              </el-col>
            </el-row>
            <div class="service-desc">
              <span>描述：{{serviceInfo.description?serviceInfo.description:'暂无描述'}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="service-info">
          <el-divider content-position="left">常规</el-divider>
          <div class="item">服务名称：{{serviceInfo.name}}</div>
          <div class="item">服务别名：{{serviceInfo.aliasName}}</div>
          <div v-if="scaleShow">
            <div class="item">矢量格式：{{serviceInfo.vectorformat}}</div>
            <div class="item">影像格式：{{serviceInfo.imageformat}}</div>
            <div class="item">地图浏览主题：{{serviceInfo.isDefaultTheme?'默认主题':'浅色主题'}}</div>
            <div >
              <span>空间范围：</span>
              <div class="service-rect">{{serviceInfo.rect}}</div>
            </div>
            <div>
              <span>空间参考：</span>
              <div class="service-prj">{{serviceInfo.prj}}</div>
            </div>
          </div>
        </el-row>
        <el-row class="service-scale" v-if="scaleShow">
          <el-divider content-position="left">缓存</el-divider>
          <div class="item">比例尺模式：{{serviceInfo.scalemodeValue}}</div>
          <div class="item">比例尺：</div>
          <el-table :data="serviceInfo.scales||[]" border height="300">
            <el-table-column
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              v-for="(item,ix) in tableCol"
              :key="ix"
            ></el-table-column>
            <el-table-column :label="'模式'" :min-width="'30%'">
              <template slot-scope="scope">
                <span v-if="scope.row.static">静态</span>
                <span v-else>动态</span>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ServerManagerAttributeDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    serviceInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    serviceTypeConfig:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  computed:{
    scaleShow(){
      if(!this.serviceInfo.serviceType){
        return false;
      }
      if(this.serviceTypeConfig[this.serviceInfo.serviceType].scale){
        return true;
      }
      else{
        return false;
      }
    }
  },
  data(){
    return {
      tableCol:[
        {
          prop:"id",
          label:"级别",
          minWidth:"30%"
        },
        {
          prop:"scaleHandle",
          label:"比例尺",
          minWidth:"30%"
        }
      ]
    }
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    }
  },
};
</script>

<style lang="scss" scoped>
.system-dialog {
  .dialog-title {
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 20px;
    span {
      padding-bottom: 18px;
      box-shadow: #1890ff 0px 2px 0px;
    }
  }
  .dialog-body {
    padding: 0 20px;
    padding-bottom:20px;
    border-bottom: 1px solid #ebeef5;
    .thumburl{
      width:100%;
      height:140px;
      background:#f3f9f9;
    }
    .service{
      padding-left:20px;
      .service-name{
        font-size:16px;
        color:#3691e9;
        margin-bottom:16px;
      }
      .service-owner{
        font-size:14px;
        color:#606266;
        margin-bottom:16px;
        .el-col:nth-child(3){
          text-align:center;
        }
      }
      .service-desc{
        font-size:14px;
        color:#606266;
      }
    }
    .service-info{
      font-size:14px;
      color:#606266;
      .item{
        margin:10px 0;
      }
      .service-rect{
        background:#f8f8f8;
        border-radius:10px;
        padding:10px 20px;
        margin:10px 0;
      }
      .service-prj{
        background:#f8f8f8;
        border-radius:10px;
        padding:10px 20px;
        margin:10px 0;
        line-height:30px;
      }
    }
    .service-scale{
      font-size:14px;
      color:#606266;
      .item{
        margin:10px 0;
      }
      .el-table{
        margin-bottom:20px;
      }
    }
    .el-divider{
      /deep/ .el-divider__text{
        color:#3691e9;
      }
    }
    //图片失败
    .el-image{
      /deep/ .image-error-slot{
        height:100%;
        width: 100%;
        text-align: center;
        display: table;
        i{
          display:table-cell;
          vertical-align: middle;
          color: #909399;
          font-size:24px;
        }
      }
      /deep/ .image-wait-slot{
        height:100%;
        width: 100%;
        text-align: center;
        display: table;
        .dot{
          display:table-cell;
          vertical-align: middle;
          color: #909399;
          font-size:14px;
        }
      }
    }
  }
  /deep/.el-dialog__body {
    border: none;
    padding: 10px 20px;
  }
}
</style>
