<template>
  <div v-if="serviceList.length>0">
    <el-row :gutter="20">
      <el-col :span="colNum" v-for="(item,index) in serviceList" :key="item.name">
        <el-row 
        class="service-container"
        :class="{'grid':displayStyle=='grid','list-table':displayStyle=='list','animated':true,'fadeInUp':displayStyle=='grid','fadeInRight':displayStyle=='list'}"
        :style="'animation-delay:'+index*50+'ms'"
        >
          <div class="left">
            <div :class="{'service-thumburl':serviceTypeConfig[item.serviceType].preview}" @click="openView(item,index)">
              <el-image :src="item.thumburl" :fit="'cover'" v-if="!item.waitThumbnail">
                <div slot="error" class="image-error-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
                <div slot="placeholder" class="image-wait-slot">
                  <span class="dot">加载中...</span>
                </div>
              </el-image>
              <div class="wait-thumbnail" v-else>
                <div>
                  <span>加载中...</span>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <el-row class="service-name">
              <el-tooltip class="item" effect="dark" :content="item.aliasName" placement="bottom">
                <span @click="openUrl(item,index)" class="name">{{item.aliasName}}</span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="编辑服务" placement="bottom">
                <i class="el-icon-edit" @click="edit(item,index)" v-if="buttonAuthorityVerification('serverManagerListEdit',item,serverManagerListEdit)"></i>
              </el-tooltip>
            </el-row>
            <el-row class="service-author-time">
              <el-col :span="12" class="service-author">
                <span :title="item.owner">发布者：{{item.owner}}</span>
              </el-col>
              <el-col :span="12" class="service-time" v-if="displayStyle=='grid'">
                <span>{{createTimeFormat(item.createTime)}}</span>
              </el-col>
              <el-col :span="12" class="service-time" v-else>
                <span>时间：{{createTimeFormat(item.createTime,true)}}</span>
              </el-col>
            </el-row>
            <el-row class="service-desc" v-if="displayStyle=='list'">
              <span>描述：{{item.description?item.description:'暂无描述'}}</span>
            </el-row>
            <el-row class="service-hits-button">
              <el-col :span="leftColNum" class="service-hits">
                <i class="kqserver-yanjing"></i><span>{{item.serviceHits}}</span>
              </el-col>
              <el-col :span="rightColNum" class="button-area">
                <el-tooltip class="item" effect="dark" content="启动服务" placement="bottom">
                  <i class="kqserver-qidong2" @click="runService(item,index)" v-if="buttonAuthorityVerification('serverManagerListRun',item,serverManagerListRun)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="停止服务" placement="bottom">
                  <i class="kqserver-tingzhi2" @click.stop="stopService(item,index)" v-if="buttonAuthorityVerification('serverManagerListStop',item,serverManagerListStop)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="删除服务" placement="bottom">
                  <i class="el-icon-delete" @click="deleteService(item)" v-if="buttonAuthorityVerification('serverManagerListDelete',item,serverManagerListDelete)"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="编辑缩略图" placement="bottom">
                  <i class="kqserver-tupian" @click="thumbnail(item,index)" v-if="buttonAuthorityVerification('serverManagerListThumburl',item,serverManagerListThumburl)"></i>
                </el-tooltip>                
                <el-tooltip class="item" effect="dark" content="授权管理" placement="bottom">
                  <i class="kqserver-quanxian" @click="serverPermissionManage(item)" v-if="buttonAuthorityVerification('serverManagerListPermission',item)"></i>
                </el-tooltip>                 
                <el-tooltip class="item" effect="dark" content="服务迁移" placement="bottom">
                  <i class="kqserver-shujuqianyi" @click="moveService(item,index)" v-if="buttonAuthorityVerification('serverManagerListMove',item)"></i>
                </el-tooltip>                  
                <el-tooltip class="item" effect="dark" content="属性" placement="bottom">
                  <i class="kqserver-shuxing1" @click="attribute(item)" v-if="buttonAuthorityVerification('serverManagerListAttribute',item)"></i>
                </el-tooltip>                
                <el-tooltip class="item" effect="dark" content="缓存管理" placement="bottom">
                  <i class="kqserver-huancunguanli" @click="cache(item)" v-if="buttonAuthorityVerification('serverManagerListCache',item,serverManagerListCache)"></i>
                </el-tooltip>                
              </el-col>
            </el-row>
          </div>
        </el-row>
      </el-col>
    </el-row>
    <pagination
    class="pagination"
    @handleSizeChange="handleSizeChange"
    @handleCurrentChange="handleCurrentChange"
    :pageSizes="[12,24,36]"
    :total="total"
    :pageSize="pageSize"
    :pageIndex="pageIndex"
    ></pagination>
  </div>
  <div v-else class="no-data">
    <el-image :src="noDataImg"></el-image>
    <div class="desc">抱歉，当前暂无数据</div>
  </div>
</template>

<script>
//服务管理列表
import Pagination from 'portal/components/common/page/Pagination'
export default {
  name:"ServerManagerList",
  components:{
    Pagination
  },
  props:{
    displayStyle:{
      type:String,
      default:'grid'
    },
    serviceList:{
      type:Array,
      default:()=>{
        return []
      }
    },
    pageIndex:{
      type:Number,
      default:1
    },
    pageSize:{
      type:Number,
      default:12
    },
    total:{
      type:Number,
      default:0
    },
    serviceTypeConfig:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    typeActiveName:{
      type:String,
      default:""     
    }
  },
  watch:{
    displayStyle(){
      if(this.displayStyle=='grid'){
        this.colNum=6;
        this.leftColNum=4;
        this.rightColNum=20;
      }
      else{
        this.colNum=24;
        this.leftColNum=12;
        this.rightColNum=12;
      }
    }
  },
  data(){
    return {
      colNum:6,
      leftColNum:4,
      rightColNum:20,
      noDataImg:require("./img/nodata.jpg"),
      limits:JSON.parse(sessionStorage.getItem("limits")),
      limitsMapping:{
        "serverManagerListEdit":"limit_serviceinfo",
        "serverManagerListRun":"limit_startService",
        "serverManagerListStop":"limit_stopService",
        "serverManagerListDelete":"limit_deleteService",
        "serverManagerListThumburl":"limit_rebuildPic",
        "serverManagerListPermission":"limit_permissionService",
        "serverManagerListMove":"limit_publishService",
        "serverManagerListAttribute":"limit_viewService",
        "serverManagerListCache":"limit_cacheprocess"
      }
    }
  },
  methods:{
    runService(item,index){//启动服务
      this.$emit("runService",item,index);
    },
    stopService(item,index){//停止服务
      this.$confirm(
        "确定要停止该服务吗？",
        "提示",
        {
          cancelButtonText:"取消",
          confirmButtonText:"确定",
          type: "warning"
        }
      ).then(()=>{
        this.$emit("stopService",item,index);
      }).catch(()=>{
      })
    },
    deleteService(item){//删除服务
      this.$confirm(
        "确定要删除该服务吗？",
        "提示",
        {
          cancelButtonText:"取消",
          confirmButtonText:"确定",
          type: "warning"
        }
      ).then(()=>{
        this.$emit("deleteService",item);
      }).catch(()=>{
      })
    },
    serverPermissionManage(item){//服务授权
      this.$emit("permissionManage",item);
    },
    moveService(item,index){//服务迁移
      this.$emit("moveService",item,index);
    },
    edit(item,index){//服务编辑
      this.$emit('edit',item,index);
    },
    cache(item){//缓存管理
      this.$emit('cache',item)
    },
    attribute(item){//属性
      this.$emit('attribute',item);
    },
    thumbnail(item,index){//修改缩略图
      this.$emit('thumbnail',item,index);
    },
    openView(item,index){
      if(!this.buttonAuthorityVerification("serverManagerListAttribute",item)){
        this.$message({
          type: "warning",
          message:"您当前无权限浏览服务详情"
        });
        return false;
      }
      if(this.serviceTypeConfig[item.serviceType].preview){
        if(item.status=='stopped'){
          this.$message({
            type: "warning",
            message:"服务尚未启动，无法查看"
          });
        }
        else{
          this.$emit("saveHits",item,index);
          if(item.serviceType=='3DService'){
            this.goToIEarth(item);
          }
          else{
            window.open(item.viewurl);
          }
        }
      }
    },
    goToIEarth(item){
      var openUrl = "/manager/thirdParty/IEarth/index.html?";
      // if (this.$store.getters.language == "english") {
      //   openUrl = openUrl + "lang=en&";
      // } else {
        openUrl = openUrl + "lang=zh-cn&";
      // }
      var params = "";
      params = params + "url=" + item.viewurl + "&type=" + 11 + "&name=" + item.name;
      var enCodeData = window.btoa(unescape(encodeURIComponent(params)));
      openUrl += enCodeData;
      window.open(openUrl);
    },
    openUrl(item,index){
      if(!this.buttonAuthorityVerification("serverManagerListAttribute",item)){
        this.$message({
          type: "warning",
          message:"您当前无权限浏览服务详情"
        });
        return false;
      }
      if(item.status=='stopped'){
        this.$message({
          type: "warning",
          message:"服务尚未启动，无法查看"
        });
      }
      else{
        this.$emit("saveHits",item,index);
        window.open(item.url);
      }
    },
    createTimeFormat(time,type){
      if(type){
        return this.globalMethods.dateFormat('YYYY-mm-dd HH:MM:SS',time);
      }else{
        return this.globalMethods.dateFormat('YYYY-mm-dd',time);
      }
    },
    handleSizeChange(val){
      this.$emit("handleSizeChange",val);
    },
    handleCurrentChange(val){
      this.$emit("handleCurrentChange",val);
    },
    serverManagerListRun(item){
      if(item.status=='stopped'){
        return true;
      }
      else{
        return false;
      }
    },
    serverManagerListStop(item){
      if(item.status=='running'){
        return true;
      }
      else{
        return false;
      }
    },
    serverManagerListDelete(item){
      if(item.status=='running'){
        return false;
      }
      else{
        return true;
      }
    },
    serverManagerListCache(item){
      if(item.hasVectorCache||item.hasImageCache){
        return true;
      }else{
        return false;
      }
    },
    serverManagerListThumburl(item){
      if(item.status=='running'){
        return true;
      }
      else{
        return false;
      }
    },
    serverManagerListEdit(item){
      if(item.status=='running'){
        return false;
      }
      else{
        return true;
      }
    },
    buttonAuthorityVerification(buttonName,params,callback){
      let isLogin=this.$store.getters.isLogin;
      let status=true;
      //未登录
      if(!isLogin){
        return false;
      }
      return true;
      //根据分类判断
      if(!this.serviceTypeConfig[this.typeActiveName][buttonName]){
        return false;
      }
      //根据权限判断
      if(this.limitsMapping[buttonName]){
        if(!this.limits[this.limitsMapping[buttonName]]&&!(params.isowner||params.isSuperAdmin)){
          return false;
        }
      }
      //自定义判断
      if(callback){
        status=callback(params);
      }
      return status;
    }
  }
}
</script>

<style lang="scss" scoped>
  .service-container{
    background:#fff;
    border:1px solid #ebebeb;
    margin-bottom:22px;
    &:hover{
      box-shadow: 0 0 8px #ccc;
    }
    .service-thumburl{
      cursor: pointer;
    }
    .service-name{
      color:#3691e9;
      font-size:14px;
      margin-bottom:10px;
      .name{
        vertical-align: top;
        display: inline-block;
        max-width:80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        cursor: pointer;
        outline: none;
      }
      i{
        margin-left:4px;
        cursor: pointer;
      }
    }
    .service-author{
      font-size:12px;
      color:#242424;
      margin-bottom:10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .service-time{
      font-size:12px;
      color:#242424;
      text-align: right;
    }
    .service-hits{
      color:#3691e9;
      font-size:14px;
    }
    .button-area{
      color:#3691e9;
      font-size:14px;
      text-align: right;
      i{
        cursor: pointer;
        outLine:none;
      }
    }
  }
  .grid{
    .left{
      padding-top: 75%;
      position: relative;
      width: 100%;
      overflow: hidden;
      .el-image{
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background:#f3f9f9;
      }
      .wait-thumbnail{
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        background:#f3f9f9;
        div{
          width:100%;
          height:100%;
          display: table;
          text-align: center;
          span{
            display:table-cell;
            vertical-align: middle;
            color: #909399;
            font-size:14px;
          }
        }
      }
    }
    .right{
      margin:12px 8px 8px 8px;
    }
  }
  .list-table{
    .left{
      padding:8px;
      border-right:1px solid #ebebeb;
      float:left;
      .el-image{
        background:#f3f9f9;
        width:240px;
        height:160px;
      }
      .wait-thumbnail{
        width:240px;
        height:160px;
        background:#f3f9f9;
        div{
          width:100%;
          height:100%;
          display: table;
          text-align: center;
          span{
            display:table-cell;
            vertical-align: middle;
            color: #909399;
            font-size:14px;
          }
        }
      }
    }
    .right{
      margin-left:258px;
      padding:16px 12px 0 12px;
      .service-name{
        height:24px;
        margin-bottom:12px;
        margin-top:12px;
      }
      .service-author-time{
        height:24px;
        margin-bottom:12px;
        .service-author{
          font-size:14px;
          color:#818181;
        }
        .service-time{
          font-size:14px;
          color:#818181;
          text-align: left;
        }
      }
      .service-desc{
        font-size:14px;
        color:#818181;
        height:24px;
        margin-bottom:12px;
      }
      .service-hits-button{
        .service-hits{
          i{
            margin-right:6px;
          }
        }
        .button-area{
          text-align:left;
          i{
            margin-right:10px;
          }
        }
      }
    }
  }
  .pagination{
    margin-bottom:20px;
  }
  .no-data{
    height:330px;
    background:#fff;
    border-top:1px solid #ebebeb;
    border-bottom:1px solid #ebebeb;
    text-align: center;
    .el-image{
      width:198px;
      height:192px;
      margin-top:45px;
    }
    .desc{
      padding-top:15px;
      width:198px;
      font-size:15px;
      margin:auto;
      color:#606266;
      text-align: center;
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
</style>