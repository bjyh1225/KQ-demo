<template>
  <div class="group-resource-tab">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabData" :key="item.name">
        <group-resource-list 
        :resourceType="resourceTypeMap[item.name]" 
        :groupInfo="groupInfo" 
        :name="item.name" 
        :initTimeStamp="initTimeStamp"
        :activeName="activeName"
        ></group-resource-list>
      </el-tab-pane>
    </el-tabs>
    <el-button class="share-resource-btn base-btn" icon="el-icon-plus" @click="openGroupResourceDialog" v-if="groupInfo.currentState==1||(groupInfo.currentState==2&&groupInfo.groupContributeType==2)">{{$t('group.Contributedresources')}}</el-button>
    <group-resource-dialog 
    :dialogVisible="groupResourceDialogVisible"
    @dialogClose="closeGroupResourceDialog"
    :groupInfo="groupInfo"
    :resourceTypeMap="resourceTypeMap"
    :tabData="tabData"
    @refreshResource="refreshResource"
    ></group-resource-dialog>
  </div>
</template>

<script>
import GroupResourceList from './GroupResourceList'
import GroupResourceDialog from './GroupResourceDialog'
export default {
  name:"GroupResourceTab",
  components:{
    GroupResourceList,
    GroupResourceDialog
  },
  props:{
    groupInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    initTask:{
      default:0
    }
  },
  watch:{
    initTask(){
      this.initTimeStamp=new Date();
      this.activeName='map';
    }
  },
  data(){
    return {
      activeName:"map",
      resourceTypeMap:{
        "map":"mapService",
        "data":"dataService",
        "function":"functionService",
        "sceneService":"sceneService",
        "file":"fileService",
        "mapbuilder":"mapbuilder",
        "scene":"scenebuilder",
        "bigscreen":"bigbuilder",
        "app":"appbuilder",
        "fileData":"data"
      },
      tabData:[
        {
          label:this.$t('group.Map'),
          name:"map"
        },
        {
          label:this.$t('portalStatistics.DataService'),
          name:"data"
        },
        {
          label:this.$t('group.Functions'),
          name:"function"
        },
        {
          label:this.$t('group.ThreeD'),
          name:"sceneService"
        },
        {
          label:this.$t('group.Datas'),
          name:"fileData"
        },
        {
          label:this.$t('service.Files'),
          name:"file"
        },
        {
          label:this.$t('group.Mapping'),
          name:"mapbuilder"
        },
        {
          label:this.$t('group.Scene'),
          name:"scene"
        },
        {
          label:this.$t('group.Bigscreen'),
          name:"bigscreen"
        },
        {
          label:this.$t('group.Apps'),
          name:"app"
        }
      ],
      initTimeStamp:null,
      groupResourceDialogVisible:false
    }
  },
  methods:{
    tabClick(){
      this.initTimeStamp=new Date();
    },
    openGroupResourceDialog(){//打开资源共享列表弹出窗
      this.groupResourceDialogVisible=true;
    },
    closeGroupResourceDialog(){//关闭资源共享列表弹出窗
      this.groupResourceDialogVisible=false;
    },
    refreshResource(){
      this.tabClick();
    }
  }
}
</script>

<style lang="scss" scoped>
  
  .group-resource-tab{
    position: relative;
    .share-resource-btn{
      position:absolute;
      right:0;
      top:0;
      padding:10px;
    }
    /deep/ .el-tabs__active-bar{
      @include base-bg-color();
    }
    /deep/ .el-tabs__item:hover{
      @include base-active-color();
    }
    /deep/ .el-tabs__item.is-active{
      @include base-active-color();
    }
    /deep/ .el-tabs__nav-wrap::after{
      background: #dfdfdf;
      height:1px;
    }
    /deep/.el-tabs__content {
     overflow: visible;
    }
    /deep/ .el-tabs__item{
      padding:0 12px;
    }
  }
</style>