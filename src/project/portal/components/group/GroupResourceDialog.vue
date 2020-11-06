<template>
  <div class="group-manage-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="1000px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('group.Shareresourcelist')}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <group-resource-dialog-list
        v-show="!switchDetails"
        :shareResourceList="shareResourceList"
        @tabClick="getResourceNotGroup"
        :pageIndex="pageIndex"
        :pageSize="pageSize"
        :total="total"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @share="share"
        @groupViewDetails='groupViewDetails'
        :initActiveName="initActiveName"
        :tabData="tabData"
        >
        </group-resource-dialog-list>
          <span :class="preservationShare?'grey go-back share':'go-back share'" v-show="switchDetails" @click="share(preservationShareData)">{{preservationShare?$t('group.Shared'):$t('myCenter.Share')}}</span>
          <span class="go-back" v-show="switchDetails" @click="goToList"><i class="el-icon-back"></i>{{$t('group.Backtolist')}}</span>
        <personal-center-service-details-dialog-list v-show="switchDetails" ref='serviceDetails'></personal-center-service-details-dialog-list>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('webAppBuilder.Close')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PersonalCenterServiceDetailsDialogList from "components/personalCenterService/PersonalCenterServiceDetailsDialogList";
import GroupResourceDialogList from './GroupResourceDialogList'
export default {
  name: "GroupResourceDialog",
  components:{
    GroupResourceDialogList,
    PersonalCenterServiceDetailsDialogList
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    groupInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    resourceTypeMap:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    tabData:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
  watch: {
    dialogVisible() {
      if(this.dialogVisible){
        this.initActiveName=new Date();
        this.currentType="";
        this.reset();
        this.getResourceNotGroup('map');
      }
    }
  },
  data(){
    return {
      shareResourceList:[],
      pageIndex:1,
      pageSize:4,
      total:0,
      currentType:"",
      switchDetails:false,
      preservationShare:false,
      preservationShareData:{},
      initActiveName:null
    }
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
      this.switchDetails=false;
      this.preservationShare=false;
    },
    handleSizeChange(val){
      this.pageIndex = 1;
      this.pageSize = val;
      this.getResourceNotGroup(this.currentType);
    },
    handleCurrentChange(val){
      this.pageIndex = val;
      this.getResourceNotGroup(this.currentType);
    },
    reset(){
      this.pageIndex=1;
      this.pageSize=4;
      this.total=0;
    },
    getResourceNotGroup(type){//获取共享的资源
      if(this.currentType!=type){
        this.reset();
      }
      this.currentType=type;
      let resourceType=this.resourceTypeMap[type];
      this.$api.groupApi.selectResourceNotGroup({
        pageIndex:this.pageIndex,
        pageSize:this.pageSize,
        resourceType:resourceType,
        groupId:this.groupInfo.id
      },{loadingText: this.$t("service.searching")})
      .then(res=>{
        let data=res.data.data;
        if(!data.rows){
          data.rows=[];
        }
        this.shareResourceList=data.rows;
        this.pageIndex=data.pageIndex;
        this.pageSize=data.pageSize;
        this.total=data.total;
      })
      .catch(()=>{})
    },
    share(resource){
      this.$api.groupApi.savaGroupByResource({
        resourceType:this.resourceTypeMap[this.currentType],
        resourceId:resource.C_ID,
        groupId:this.groupInfo.id,
        ywSearch:1,
        ywBrowse:1,
        ywEdit:0,
        scope:'Partial'
      },{loadingText:this.$t('group.Beingshared')})
      .then(()=>{
        this.$message({
          type:"success",
          message:this.$t('group.Sharedsuccessfully')
        })
        this.reset();
        this.getResourceNotGroup(this.currentType);
        this.$emit("refreshResource");
        if(this.switchDetails){
          this.preservationShare=true;
        }
      })
      .catch(()=>{})
    },
    groupViewDetails(view){
      this.preservationShareData=view;
      this.switchDetails=true;
      this.$nextTick(() => {
        this.$refs.serviceDetails.viewDetailsList(view);
      });
    },
    goToList(){
      this.switchDetails=false;
    }
  }
};
</script>

<style lang='scss' scoped>

.group-manage-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .dialog-body {
    @include manage-border(
      $types: (
        "bottom"
      )
    );
  }
  .go-back{
      @include base-active-color();
      font-size:14px;
      cursor: pointer;
      right: 0px;
      position: absolute;
      top: -12px;
    }
    .go-back.grey{
      color:#ccc;
    }
    .go-back.share{
      right: 86px;
    }
  .dialog-title {
    padding-bottom: 20px;
    @include manage-border(
      $types: (
        "bottom"
      )
    );
    span {
      @include dialog-title($width: 2px);
      padding-bottom: 18px;
    }
  }
}
</style>